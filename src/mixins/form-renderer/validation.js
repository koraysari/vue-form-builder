import Validation from "@/libraries/validation";
import {EVENT_CONSTANTS} from "@/configs/events";
import {ALERT_DIALOG} from "@/libraries/alert-dialog";

const VALIDATION_MIXIN = {
    data: () => ({
        validationErrors: {}
    }),

    methods: {
        /**
         * Run the validation process
         */
        runValidation() {
            // always clear validation before run...
            this.$set(this, 'validationErrors', {})

            // run the validation
            const result = this.$form.Validation.run()

            var except = [];

            Object.entries(this.formData.sections).forEach(section => {
                let [sectionId, sectionItem] = section

                if(sectionItem.logic && this.valueContainer.hasOwnProperty(sectionItem.logicControlId) && !sectionItem.logicControlValue.includes(this.valueContainer[sectionItem.logicControlId])) {
                    except = except.concat(sectionItem.controls);
                }
            })

            //console.log(except);

            var newExcept = [];

            except.forEach(function(element) {
                if(result.errorBuckets.hasOwnProperty(element)) {
                    newExcept.push(element);
                }
            })

/*             console.log(Object.keys(result.errorBuckets).length, newExcept.length);
            console.log(newExcept);
            console.log(Object.keys(result.errorBuckets)); */

            // field-error handling
            if (result.errors() && Object.keys(result.errorBuckets).length != newExcept.length) {
                // use set for reactive...
                this.$set(this, 'validationErrors', result.errorBuckets)

                if (this.$form.validationErrorShowAlert) {
                    ALERT_DIALOG.show(this.$form.validationErrorAlertText)
                }

                return
            }

            // ok emit to all listener if they want to know the validation is ok or not
            this.$formEvent.$emit(EVENT_CONSTANTS.RENDERER.VALIDATION_OK, true)
        }
    },

    /**
     * Dependencies Injection into the Form-Renderer.
     */
    created() {
        // create validation instance
        this.$form.Validation = new Validation(
            this.valueContainer,
            this.formData.controls,
            this.$form.validationClosures || {},
            this.formData.sections,
        )

        // listen to validation invoke
        this.$formEvent.$on(EVENT_CONSTANTS.RENDERER.RUN_VALIDATION, this.runValidation);
    }
}

export {VALIDATION_MIXIN}