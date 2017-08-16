<template>
  <div>
    <vue-file-upload v-bind:url='url'
                     ref="vueFileUploader"
                     v-bind:filters = "filters"
                     v-bind:events = 'cbEvents'
                     v-bind:request-options = "reqopts"
                     v-bind:autoUpload = "isAutoUpload"
                     v-bind:label = "showLabel" v-bind:icon="myIcon"></vue-file-upload>
  </div>
</template>
<script>
  import VueFileUpload from 'vue-file-upload';
  export default{
    props: ['showLabel', 'myIcon'],
    data(){
      return{
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
        console.log(files);
        this.file = files[0];
      },
      uploadItem(file){
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
