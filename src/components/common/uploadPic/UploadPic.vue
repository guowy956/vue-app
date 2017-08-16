<template>
  <form id="myForm" method="post" action="" enctype="multipart/form-data" class="form-horizontal m-t">
    <div class="row fileupload-buttonbar">
      <p id="showFile"></p>
      <div class="col-lg-7">
        <span class="btn btn-success fileinput-button">
            <i class="glyphicon glyphicon-plus"></i>
            <span>选择文件</span>
            <input type="file" id="file1" name="file" @change="fileChange()">
        </span>
        <button type="submit" class="btn btn-primary start">
          <i class="glyphicon glyphicon-upload"></i>
          <span>上传</span>
        </button>
        <span class="fileupload-process"></span>
      </div>
    </div>
  </form>
</template>

<script>
import '../../../../static/js/jquery.form.js'

export default {
  name: 'upload',
  data () {
    return {
      msg: 'about'
    }
  },
  methods: {
    showRequest: function (formData, jqForm, options) {
//      var queryString = $.param(formData);
//      alert('About to submit: \n\n' + queryString);
      return true;
    },
    showResponse: function (responseText, statusText, xhr, $form) {
      this.$parent.uploadId = responseText.data.id;
      alert("上传成功！");
    },
    fileChange: function () {
      var name = $("#file1").val();
      var n = name.lastIndexOf("\\\\");
      if (n > 0) {
        $("#showFile").text(name.substring(n+1));
        return;
      }
      n = name.lastIndexOf("//");
      if (n > 0) {
        $("#showFile").text(name.substring(n+1));
        return;
      }
      n = name.lastIndexOf("\\");
      if (n > 0) {
        $("#showFile").text(name.substring(n+1));
        return;
      }
      n = name.lastIndexOf("/");
      if (n > 0) {
        // console.log("5name=" + name + ", n=" + n + ", sub=" + name.substring(n+1));
        $("#showFile").text(name.substring(n+1));
        return;
      }
      $("#showFile").text(name);
      return;
    }
  },
  mounted: function () {
    var options = {
      beforeSubmit: this.showRequest,
      success: this.showResponse,
      url: basePath4+'fileupload',
      type: 'post',
      dataType: 'json'
    };
    $('#myForm').ajaxForm(options);
  }
}
</script>
