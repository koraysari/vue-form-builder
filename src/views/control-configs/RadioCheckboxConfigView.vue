<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>Display Mode</label>
            <select :class="styles.FORM.FORM_CONTROL"
                    v-model="control.displayMode">

                <option v-for="item in listDisplayModes"
                        :key="item.val"
                        :value="item.val"
                        v-text="item.description">
                </option>

            </select>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Display Position</label>
            <select :class="styles.FORM.FORM_CONTROL"
                    v-model="control.position">

                <option v-for="item in listPositions"
                        :key="item.val"
                        :value="item.val"
                        v-text="item.description">
                </option>

            </select>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>
                List Selections
                <span class="pointer"
                      @click="addListItem"
                      v-html="$form.getIcon('addOutline', '16px', '16px', 'green')">
                </span>
            </label>

            <!-- Im using div instead of table. Table too small :( -->
            <draggable
                :list="control.items"
                ghost-class="ghost"
                :move="checkMove"
                @start="dragging = true"
                @end="dragging = false"
            >
                <div :class="['list-selection', 'form-inline']" v-for="(listItem, iItem) in control.items" :key="iItem">

                    <div class="tool-block">
                        <span class="pointer"
                            @click="removeListItem(iItem)"
                            v-html="$form.getIcon('close', '16px', '16px', 'red')">
                        </span>
                    </div>
                    <div :class="styles.FORM.FORM_GROUP + ' col-6 px-0 w-100'">
                        <label>Item Value</label>
                        <input type="text" :class="styles.FORM.FORM_CONTROL + ' w-100'"
                            placeholder="Radio/Checkbox-Value"
                            v-model="listItem.value">
                    </div>

                    <div :class="styles.FORM.FORM_GROUP + ' col-6 px-0 w-100'">
                        <label>Label Text</label>
                        <input type="text" :class="styles.FORM.FORM_CONTROL + ' w-100'"
                            placeholder="Label text"
                            v-model="listItem.text">
                    </div>
                </div>
            </draggable>
        </div>

        <div :class="styles.FORM.FORM_GROUP">
            <label>Fast Addition</label>
            <textarea class="w-100" rows="10" v-model="fast_addition"></textarea>
            <button @click="fastAddition">Add</button>
        </div>
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";
    import {RADIO_CHECKBOX_POSITION, RADIO_CHECKBOX_STYLE} from "@/configs/control-config-enum";
    import ListItem from "@/libraries/list-item.class";
    import draggable from 'vuedraggable'

    export default {
        name: "RadioCheckboxConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN],

        data: () => ({
            fast_addition: ''
        }),

        components: {
            draggable,
        },

        methods: {
            /**
             * Add new List-Item for the Current Radio/Checkbox
             */
            addListItem() {
                this.control.items.push(
                    new ListItem('', '')
                )
            },

            /**
             * Remove list-Item by Index of the Array
             */
            removeListItem(index) {
                this.control.items.splice(index, 1)
            },

            checkMove: function(e) {
                window.console.log("Future index: " + e.draggedContext.futureIndex);
            },

            fastAddition: function() {
                var a = this.fast_addition.split(","),
                    i;

                for (i = 0; i < a.length; i++) {
                    this.control.items.push(new ListItem(a[i], a[i]));
                }

                this.fast_addition = "";
            }
        },

        computed: {
            /**
             * Configuration for the displayMode
             */
            listDisplayModes: () => RADIO_CHECKBOX_STYLE,

            /**
             * Configuration for the position
             */
            listPositions: () => RADIO_CHECKBOX_POSITION
        }
    }
</script>