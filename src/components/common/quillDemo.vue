<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>富文本编辑器-示例1</h5>
            </div>
            <div class="ibox-content col-md-12">
              <div id="app">
                <quill-editor ref="myTextEditor"
                              v-model="content"
                              :config="editorOption">
                </quill-editor>
                <hr color="red">
                <div style="border: 1px solid blue;">
                  {{ content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'dictionary',
    data: function () {
      return {
        name: 'app',
        content: '<h2>Example</h2>',
        editorOption: {}
      }
    },
    components: {
      quillEditor
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .devStyle {
    display: none;
  }

  .debuggerStyle {
    color: red;
    font-weight: bolder;
  }

  .errors {
    color: #f00;
    display: block;
  }
  .fl{
  float: left;
  }
  .fr{
  float: right;
  }
  .cf{
  clear: both;
  zoom: 1;
  }
</style>
