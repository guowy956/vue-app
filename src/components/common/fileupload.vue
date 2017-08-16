<template>
  <div>
    <vue-file-upload v-bind:url='url'
                     ref="vueFileUploader"
                     v-bind:filters = "filters"
                     v-bind:events = 'cbEvents'
                     v-bind:request-options = "reqopts"
                     v-on:onAdd = "onAddItem"></vue-file-upload>
    <table class="table table-striped table-bordered table-hover ">
      <tbody>
        <tr>
          <td>名称</td>
          <td>大小</td>
          <td>进度</td>
          <td>状态</td>
          <td>操作</td>
        </tr>
        <tr v-if="files.length==0">
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr v-for="file in files">
          <td v-text="file.name"></td>
          <td v-text="file.size"></td>
          <td v-text="file.progress"></td>
          <td v-text="onStatus(file)"></td>
          <td>
            <button type="button" @click="uploadItem(file)" class="btn btn-primary start">
              <i class="glyphicon glyphicon-upload"></i>
              <span>上传</span>
            </button>
            <button type="button" @click="deleteItem(file)" class="btn btn-primary start">
              <i class="glyphicon glyphicon-upload"></i>
              <span>删除</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" @click="uploadAll" class="btn btn-primary start">
      <i class="glyphicon glyphicon-upload"></i>
      <span>上传所有文件</span>
    </button>
    <button type="button" @click="clearAll" class="btn btn-primary start">
      <i class="glyphicon glyphicon-upload"></i>
      <span>清空所有文件</span>
    </button>
  </div>
</template>
<script>
  import VueFileUpload from 'vue-file-upload';
  export default{
    data(){
      return{
        url: basePath4+'fileupload',
        files:[],
        //文件过滤器，只能上传图片
        filters:[
          {
            name:"imageFilter",
            fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              //return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
              return true;
            }
          }
        ],
        //回调函数绑定
        cbEvents:{
          onCompleteUpload:(file,response,status,header)=>{
            this.$parent.uploadIds.push(response.data.id);
          }
        },
        //xhr请求附带参数
        reqopts:{
          formData:{
            tokens:'tttttttttttttt'
          },
          responseType:'json',
          withCredentials:false
        }
      }
    },
    methods:{
      onStatus(file){
        if(file.isSuccess){
          return "上传成功";
        }else if(file.isError){
          return "上传失败";
        }else if(file.isUploading){
          return "正在上传";
        }else{
          return "待上传";
        }
      },
      onAddItem(files){
        console.log(files);
        this.files = files;
      },
      uploadItem(file){
        //单个文件上传
        file.upload();
      },
      uploadAll(){
        //上传所有文件
        this.$refs.vueFileUploader.uploadAll();
      },
      clearAll(){
        //清空所有文件
        this.$refs.vueFileUploader.clearAll();
      }
    },
    components:{
      VueFileUpload
    }
  }
</script>
