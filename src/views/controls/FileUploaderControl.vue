<template>
  <div>
    <ul>
      <li v-for="file in files" v-bind:key="file.id">
        {{ file.name }} - Error: {{ file.error }}, Success: {{ file.success }}
      </li>
    </ul>
    <VueUploadComponent
      ref="upload"
      v-model="files"
      post-action="/file/uploader"
      :id="control.uniqueId"
      :class="controlClasses"
      :multiple="control.isMultiple"
      :accept="control.accept"
      :maximum="maximumFilesCanBeUploaded"
      :headers="configuredHeaders"
      :data="configuredPostData"
      @input-file="inputFile"
      @input-filter="inputFilter"
    >
      <button
        :class="control.buttonClasses"
        v-text="control.buttonLabel"
      ></button>
    </VueUploadComponent>
    <button
      type="button"
      class="btn btn-success button"
      v-if="!$refs.upload || !$refs.upload.active"
      @click.prevent="$refs.upload.active = true"
    >
      <i class="fa fa-arrow-up" aria-hidden="true"></i>
      Yüklemeye Başla 
    </button>
    <button
      type="button"
      class="btn btn-danger button"
      v-else
      @click.prevent="$refs.upload.active = false"
    >
      <i class="fa fa-stop" aria-hidden="true"></i>
      Yüklemeyi Durdur
    </button>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";
import VueUploadComponent from "vue-upload-component";

/**
 * File Uploader Control
 * Usage:
 */
export default {
  name: "FileUploaderControl",
  components: {
    VueUploadComponent,
  },
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],

  data: () => ({
    files: [],
  }),

  watch: {
    files: function() {

    }
  },

  methods: {
    /**
     * Has changed
     * @param  Object|undefined   newFile   Read only
     * @param  Object|undefined   oldFile   Read only
     * @return undefined
     */
    inputFile: function(newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log("response", newFile.response);
        if (newFile.xhr) {
          //  Get the response status code
          console.log("status", newFile.xhr.status);
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   Read and write
     * @param  Object|undefined   oldFile   Read only
     * @param  Function           prevent   Prevent changing
     * @return undefined
     */
    inputFilter: function(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent();
        }
      }

      // Create a blob field
      newFile.blob = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    },
  },

  computed: {
    controlClasses() {
      return this.control.additionalFieldClass;
    },

    /**
     * Get the maximum files for multiple uploader
     * @returns {number}
     */
    maximumFilesCanBeUploaded() {
      if (this.control.isMultiple) {
        return this.control.maximumFiles;
      }

      return 1;
    },

    configuredHeaders() {
      if (!this.control.headers.length) {
        return {};
      }

      const headerItems = {};
      this.control.headers.forEach((keyValueItem) => {
        headerItems[keyValueItem.key] = keyValueItem.value;
      });

      return headerItems;
    },

    configuredPostData() {
      /* if (!this.control.postData.length) {
        return {};
      } */

      const postItems = {};
      this.control.postData.forEach((keyValueItem) => {
        postItems[keyValueItem.key] = keyValueItem.value;
      });

      postItems['accelerator_id'] = this.control.postActionURL;

      return postItems;
    },
  },
};
</script>

<style>
  .file-uploads {
    overflow: inherit !important;
    margin-right: 5px;
  }
</style>
