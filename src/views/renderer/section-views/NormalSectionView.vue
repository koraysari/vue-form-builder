<template>
    <div class="normal-section" v-if="checkLogic()">
        <div class="headline-block" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
        </div>

        <div :class="containerClasses">
            <ControlView v-for="controlId in section.controls"
                         :key="controlId"
                         :control="controls[controlId]"
                         :parent-id="section.uniqueId"
                         :value-container="valueContainer"
                         :validation-errors="validationErrors"
            />
        </div>
    </div>
</template>

<script>
    import {RENDERER_SECTION_VIEW_MIXIN} from "@/mixins/renderer-section-view-mixin";

    /**
     * @property {Object} section
     * @property {Object} rows RowId - RowData
     * @property {Object} controls ControlId - ControlData
     * @property {Array} section.rows
     * @property {Array} section.controls
     */
    export default {
        name: "NormalSectionView",
        mixins: [RENDERER_SECTION_VIEW_MIXIN],
        data: () => ({

        }),

        methods: {
            checkLogic() {
                if(!this.section.logic) return 1;
                return this.section.logicControlValue.includes(this.valueContainer[this.section.logicControlId]);
            }
        }

    }
</script>
