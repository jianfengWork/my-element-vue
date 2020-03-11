<template>
  <div>
    <div class="MB20">
      <el-button type="primary" @click="clearTinymceEditor">清空</el-button>
      <el-button @click="disabled = !disabled">{{disabled ? '启用' : '禁用'}}</el-button>
    </div>
    <TinymceEditor ref="editor" :value="content" :disabled="disabled" @input="newValue"></TinymceEditor>
    <div v-html="content"></div>
    <!-- {{ content }} -->
  </div>
</template>

<script>
import TinymceEditor from "@/components/simpleTinymce/simpleTiny";
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      content: '<p>Tinymce富文本编辑器</p>',
      disabled: false
    };
  },
  methods: {
    newValue(val) {
      console.log(val);
      this.content = val
    },
    clearTinymceEditor() {
      this.$refs.editor.clear();
    }
  }
};
</script>

<style lang="scss">
.MB20 {
  margin-bottom: 20px;
}
</style>
