<template>
    <div class="sidebar-form-configuration">
        <h5>Section Configuration</h5>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Headline</label>
            <input type="text"
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="sectionConfiguration.headline">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Headline Additional Class (CSS)</label>
            <input type="text"
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="sectionConfiguration.headlineAdditionalClass">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Sub-Headline</label>
            <input type="text"
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="sectionConfiguration.subHeadline">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Sub-Headline Additional Class (CSS)</label>
            <input type="text"
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="sectionConfiguration.subHeadlineAdditionalClass">
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                Show Section Headline?
                <input type="checkbox" v-model="sectionConfiguration.isShowHeadline">
            </label>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                Sort in reverse for pdf?
                <input type="checkbox" v-model="sectionConfiguration.sortReverse">
            </label>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                Add a conditional question to the section?
                <input type="checkbox" v-model="sectionConfiguration.logic">
            </label>
        </div>

        <div v-if="sectionConfiguration.logic" :class="styles.FORM.FORM_GROUP">
            <label>Condition Question</label>
            <select type="text" @change="changeCondition($event)"
                    :class="styles.FORM.FORM_CONTROL"
                    v-model="sectionConfiguration.logicControlId"
            >
                <option v-for="controlName in controlNames"
                        :key="controlName.controlId"
                        :value="controlName.controlId">
                        {{controlName.filedname}}
                </option>
            </select>
        </div>

        <div v-if="sectionConfiguration.logic" :class="styles.FORM.FORM_GROUP">
            <div>Condition Answers</div>
            <div v-for="controlOption in controlOptions" :key="controlOption.value">
                <input name="logic_answers[]" type="checkbox" :value="controlOption.value" v-model="sectionConfiguration.logicControlValue">
                {{controlOption.text}}
            </div>
        </div>

        <div class="buttons">
            <button :class="styles.BUTTON.PRIMARY" @click="save(false)">
                Save
            </button>
            <button :class="styles.BUTTON.INFO" @click="save(true)">
                Save & Close
            </button>
        </div>
    </div>
</template>

<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import {SIDEBAR_BODY_MIXIN} from "@/mixins/sidebar-body-mixin";
    import {SECTION_DEFAULT_DATA} from "@/configs/section";

    export default {
        name: "SidebarSectionConfiguration",
        mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],

        data: () => ({
            dataKey: "sectionConfiguration",
            sectionConfiguration: Object.assign({}, SECTION_DEFAULT_DATA),
            controlNames: [],
            controlOptions: []
        }),

        created() {
            // retrieve the data from `GlobalSidebar` passed in
            this.sectionConfiguration = Object.assign({}, this.sectionConfiguration, this.dataPackage)

            var pureIds = Object.keys(this.formData.controls);

            for (var _i = 0, _pureIds = pureIds; _i < _pureIds.length; _i++) {
                var controlId = _pureIds[_i];

                if (this.formData.controls[controlId].type != 'radio') {
                    continue;
                } // option text generation


                var controlObj = this.formData.controls[controlId];
                var fieldName = "".concat(controlObj.label, " - #").concat(controlObj.uniqueId); // if name is exist => use it instead of uniqueID

                if (controlObj.name) {
                    fieldName = "".concat(controlObj.label, " - ").concat(controlObj.name);
                } // add it to the list

                this.controlNames.push({
                        filedname: fieldName,
                        controlId: controlId,
                    });

            } // do we need to mark the border??
        },

        methods: {
            changeCondition(event) {
                this.controlOptions = this.formData.controls[event.target.value].items;
            }
        }
    }
</script>