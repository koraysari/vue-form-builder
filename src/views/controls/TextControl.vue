<template>
    <span>
        <textarea
                :id="control.uniqueId"
                type="text"
                :class="controlFieldClass"
                v-model="totalCharacter"
                :rows="control.rows"
                :name="control.name"
                :placeholder="control.placeholderText"
                @input="updateValue($event.target.value)"
        ></textarea>
        <span class="totalCharacter">{{ totalCharacter ? totalCharacter.length : 0 }} karakter</span>
    </span>
</template>

<script>
    import {CONTROL_FIELD_EXTEND_MIXIN} from "@/mixins/control-field-extend-mixin";

    /**
     * TextControl doesn't need to setValue. We can eventually assign the bind the value into the <textarea>
     * Safe safe...
     */
    export default {
        name: "TextControl",
        mixins: [CONTROL_FIELD_EXTEND_MIXIN],
    }
</script>

<style scoped>
    .totalCharacter {
        color: red;
        font-size: 14px;
        line-height: 14px;
        float: right;
    }
</style>