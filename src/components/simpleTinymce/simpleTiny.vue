<template>
  <div>
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick" style="z-index:2050;" />
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import zh_CN from './js/zh_CN'
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    baseUrl: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    }
  },
  data() {
    // language_url: `/tinymce/langs/zh_CN.js`, // 会有问题，We're sorry but app doesn't work properly without JavaScript enabled. Please enable it to continue.
    // skin_url: `/tinymce/skins/ui/oxide`,
    return {
      init: {
        language_url: zh_CN,
        language: "zh_CN",
        // skin_url: `/tinymce/skins/ui/oxide`,
        // content_css: `/tinymce/skins/content/default/content.css`,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        }
      },
      myValue: this.value
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    clear() {
      this.myValue = "";
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
