<template>
        <span>
            <input :id="control.uniqueId"
                type="text"
                :class="controlFieldClass"
                :value="value"
                :name="control.name || control.uniqueId"
                :placeholder="control.placeholderText"
                @input="updateValue($event.target.value)"
            />
            <span v-if="control.counter" class="totalCharacter">{{ value ? value.length : 0 }} karakter</span>
        </span>
</template>

<script>
    import {CONTROL_FIELD_EXTEND_MIXIN} from "@/mixins/control-field-extend-mixin";

    /**
     * InputControl doesn't need to setValue. We can eventually assign the bind the value into the <input>
     * Safe safe...
     */
    export default {
        name: "InputControl",
        mixins: [CONTROL_FIELD_EXTEND_MIXIN],
    }
</script>

<style scoped>
    .totalCharacter {
        color: red;
        font-size: 11px;
        float: right;
    }
</style>