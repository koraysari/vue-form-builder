<template>
    <div :id="control.uniqueId">
        <div v-if="isSameBlock" class="radio-checkbox" :class="lineNextClasses">

            <label v-for="listItem in control.items.filter(i => i && i.text != 'Diğer')"
                   :key="listItem.text"
                   :class="positionClasses">
                <!--- For structural, line/next is same --->
                <input :type="control.type"
                       :class="control.additionalFieldClass"
                       :name="inputName"
                       :value="listItem.value"
                       v-model="valueContainer[controlName]"
                >

                {{listItem.text}}

                <!--- Line By Line will need this <br> --->
                <br v-if="displayMode === 'line'" />
            </label>

            <span v-if="control.items.some((item => item.text === 'Diğer'))">
                <label class="text-left"><input :name="inputName" v-model="diger" type="checkbox" class="" value="Diğer" @change="digerChange"> Diğer <!----><br></label>
                <input type="text" class="form-control md-field" v-model="digerValue" @change="digerChangeEvent">
            </span>


        </div>
        <div v-else>
            <!--- Double/Size --->
            <div :class="styles.ROW" class="radio-checkbox">

                <div :class="[styles.COLUMNS.COL6, positionClasses]"
                     v-for="listItem in control.items.filter(i => i && i.text != 'Diğer')"
                     :key="listItem.text">

                    <label>
                        <!--- Input things are same, hmm - TODO: DRY ?? --->
                        <input :type="control.type"
                               :class="control.additionalFieldClass"
                               :name="inputName"
                               :value="listItem.value"
                               v-model="valueContainer[controlName]"
                        >

                        {{listItem.text}}

                        <input v-if="listItem.text == 'Diğer' || listItem.text == 'DİĞER'" type="text" class="form-control md-field" v-model="digerValue" @change="digerChangeEvent">
                        
                    </label>
                </div>

                <div v-if="control.items.some((item => item.text === 'Diğer'))" :class="[styles.COLUMNS.COL6, positionClasses]">
                    <label><input :name="inputName" v-model="diger" type="checkbox" class="" value="Diğer" @change="digerChange"> Diğer <!----><br></label>
                    <input type="text" class="form-control md-field" v-model="digerValue" @change="digerChangeEvent">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {CONTROL_FIELD_EXTEND_MIXIN} from "@/mixins/control-field-extend-mixin";
    import {RADIO_CHECKBOX_POSITION, RADIO_CHECKBOX_STYLE} from "@/configs/control-config-enum";

    /**
     * Radio/Checkbox List Control
     * Probably, we can use them together. Because the only main difference is input[type=radio|checkbox]
     * @property {ListItem[]} control.items
     */
    export default {
        name: "RadioCheckboxControl",
        mixins: [CONTROL_FIELD_EXTEND_MIXIN],
        props: {
            valueContainer: {
                type: Object,
                default: () => ({})
            }
        },

        data: () => ({
            stopDefaultValueAssign: true,
            defaultBucket: '',
            digerValue: '',
            diger: false,
        }),

        created() {
            // special case for Form-Builder since we can't use the
            // valueContainer (value container only available on Renderer)
            if (!this.valueContainer[this.controlName]) {
                this.valueContainer[this.controlName] = ''
            }
            this.valueContainer[this.controlName] = this.valueContainer[this.controlName].filter(i => i || i != '"Diğer"' );
        },

        mounted() {
            if (this.control.defaultValue) {
                // assign default value for control
                if (this.isRadio) {
                    this.updateValue(this.control.defaultValue)
                } else {
                    this.updateValue([this.control.defaultValue])
                }
            }
        },

        computed: {
            /**
             * Check if the current instance control is radio??
             * @returns {boolean}
             */
            isRadio() {
                return this.control.type === 'radio'
            },

            /**
             * Quick Access to The Control.DisplayMode
             * @returns {string}
             */
            displayMode() {
                return this.control.displayMode
            },

            /**
             * Check if the displayMode either line or next. Because both of them are in the same `div` block
             * @returns {boolean}
             */
            isSameBlock() {
                return this.displayMode === RADIO_CHECKBOX_STYLE.line.val
                    || this.displayMode === RADIO_CHECKBOX_STYLE.next.val
            },

            /**
             * Get classes for view mode of Line - Next
             * @returns {Object}
             */
            lineNextClasses() {
                return {
                    'line': this.displayMode === 'line',
                    'next': this.displayMode === 'next',
                }
            },

            /**
             * Get position class depends on the configuration
             * @returns {Object}
             */
            positionClasses() {
                return {
                    'text-center': this.control.position === RADIO_CHECKBOX_POSITION.center.val,
                    'text-right': this.control.position === RADIO_CHECKBOX_POSITION.right.val,
                    'text-left': this.control.position === RADIO_CHECKBOX_POSITION.left.val,
                }
            },

            /**
             * Generate the :name for the input[type=checkbox|radio]
             * @returns {string|string}
             */
            inputName() {
                // For input[name] of Radio, they need to be the same.
                // If Control Name is Empty => Use ID instead (otherwise, control will break =)) )
                if (this.isRadio) {
                    return this.controlName
                }

                // For Checkbox, name will always be Array Mode (name[])
                return (this.controlName) + "[]"
            }
        },

        methods: {
            digerChangeEvent () {
                if(this.isRadio) {
                    this.updateValue(this.digerValue);
                } else {
                    var difference = this.value.filter(x => this.control.items.some((item => item.value === x)));
                    if(this.digerValue && this.diger) {
                        difference.push(this.digerValue);
                    }
                    this.updateValue(difference.filter(i => i && i != "Diğer"));
                }
            },
            digerChange() {
                if(!this.diger) {
                    this.digerValue = '';
                }
                this.digerChangeEvent();
            }
        },

        watch: {
            value: function (newValue, oldValue) {
                if(newValue == 'Diğer') {
                    if(this.isRadio) {
                        this.updateValue(this.digerValue);
                    }
                }
            }
        },
    }
</script>