<template>

    <span>
        <VuePhoneNumberInput :id="control.uniqueId" v-if="control.isPhone" v-model="tel" @update="onUpdate" :dropdownOptions="dropdownOptions" defaultCountry="TR" mode="auto" disabledFormatting="false" validCharactersOnly="true"/>
        <input v-else :id="control.uniqueId"
            type="number"
            :class="controlFieldClass"
            :value="number"
            :name="control.name"
            :placeholder="control.placeholderText"
            @input="convertToNumber($event.target.value)"
        />
    </span>
</template>

<script>
    import {CONTROL_FIELD_EXTEND_MIXIN} from "@/mixins/control-field-extend-mixin";
    import VuePhoneNumberInput from 'vue-phone-number-input';

    /**
     * Number Control
     * Later
     * @focusin="previewMode = number"
     * @focusout="updatedPreview"
     */
    export default {
        name: "NumberControl",
        mixins: [CONTROL_FIELD_EXTEND_MIXIN],

        components: {
            VuePhoneNumberInput,
        },
        
        props: {
            valueContainer: {
                type: Object,
                default: () => ({})
            }
        },

        data: () => ({
            number: 0,
            stopDefaultValueAssign: true,

            previewMode: "0",
            tel: '',
            dropdownOptions : {
                showDialCodeInSelection : true,
                showDialCodeInList : true,
                showFlags : true
            }
        }),

        methods: {
            /**
             * Convert to Number before Emit V-Model
             * @param value
             */
            convertToNumber(value) {
                let convertedVal = this.isRealNumber ? parseFloat(value) : parseInt(value, 10)

                // emit now
                this.updateValue(convertedVal)

                // re-assign val
                //this.updatedPreview()
                this.number = convertedVal
            },

            /**
             * Updated Preview Mode (Mask preview, eg: 1,123,456.00) for Number
             * TODO: Available only v2.1
             */
            updatedPreview() {

            },

            /**
             * Specific set value for the Number Control from the v-model
             */
            setValue(val) {
                this.convertToNumber(val)
            },

            onUpdate (payload) {
                this.updateValue(payload.formattedNumber);
            }
        },

        computed: {
            /**
             * Check if the num control is using int or float/double
             * @returns {boolean}
             */
            isRealNumber() {
                return this.control.isReal
            },
        },

        created() {
            // set default value (if exists)
            if (this.control.defaultValue) {
                this.convertToNumber(this.control.defaultValue)
            }

            if(this.control.isPhone && this.valueContainer[this.control.uniqueId]) {
                this.tel = (this.valueContainer[this.control.uniqueId] + '').substring(1);
            }
        },
    }
</script>

<style src="vue-phone-number-input/dist/vue-phone-number-input.css"></style>