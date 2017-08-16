<template>
  <div>
    <vue-file-upload v-bind:url='url'
                     ref="vueFileUploader"
                     v-bind:filters = "filters"
                     v-bind:events = 'cbEvents'
                     v-bind:request-options = "reqopts"
                     v-bind:autoUpload = "isAutoUpload"
                     v-bind:label = "showLabel" v-bind:icon="myIcon" v-on:onAdd="onAddItem"></vue-file-upload>
    <table v-if="step" class="table table-striped table-bordered table-hover ">
      <tbody>
      <tr>
        <td v-text="file.name"></td>
        <td v-text="file.size"></td>
        <td v-text="step"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import VueFileUpload from 'vue-file-upload';
  export default{
    props: ['showLabel', 'myIcon'],
    data(){
      return{
        step: "",
        isAutoUpload: true,
        url: basePath4+'fileupload',
        file:{},
        //文件过滤器，只能上传图片
        filters:[
          {
            name:"imageFilter",
            fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
          }
        ],
        //回调函数绑定
        cbEvents:{
          onCompleteUpload:(file,response,status,header)=>{
            if(response.code == 200){
              this.$parent.md5 = response.data.md5;
              this.$parent.suffix = response.data.suffix;
              this.$parent.fileSize = response.data.fileSize;
              this.$emit('myMethod', "")
//              this.$emit('myMethods', "")
              this.step = "";
            }
            //alert(response.message);
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
        this.step = "上传中...";
        console.log(files);
        this.file = files[0];
      },
      uploadItem(file){
      console.log(file);
        //单个文件上传
        file.upload();
        this.$refs.vueFileUploader.clearAll();
      }
    },
    components:{
      VueFileUpload
    }
  }
</script>
