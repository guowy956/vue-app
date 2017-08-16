<template>
  <div>
    <vue-file-upload v-bind:url='url'
                     ref="vueFileUploader"
                     v-bind:filters = "filters"
                     v-bind:events = 'cbEvents'
                     v-bind:request-options = "reqopts"
                     v-bind:autoUpload = "isAutoUpload"
                     v-bind:label = "showLabel"
                     v-bind:icon="myIcon"></vue-file-upload>
  </div>
</template>
<script>
  import VueFileUpload from 'vue-file-upload';
  export default{
    props: ['showLabel', 'myIcon', 'elementKey', 'groupId', 'activityId'],
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
            //保存关系
            var that = this;
            var fileUploadRelationParams = {};
            fileUploadRelationParams.groupId = that.groupId;
            fileUploadRelationParams.activityId = that.activityId;
            fileUploadRelationParams.functionKey = 'images';
            fileUploadRelationParams.elementKey = that.elementKey;
            fileUploadRelationParams.fileUploadId = response.data.id;

            that.$utils.ajax(that)(basePath2 + 'fileUploadRelation', fileUploadRelationParams, function (res) {
              if(typeof (res.body) === 'string'){
                res.body = JSON.parse(res.body);
              }
              if (res.body.code == '200') {
                that.myCallback(that.elementKey, response.data.md5);
              }else if(res.body.code == '401'){
                that.$utils.clearLocalData("accessToken");
                that.$utils.clearLocalData("orgData");
                that.$utils.clearLocalData("hrData");
                that.$parent.$emit('changeLogin','N');
              }else{
                that.$utils.alert(res.body.message)
              }
            }, function (res) {
              that.$utils.alert(that.failedMsg);
            },"post");
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
      },
      myCallback(key, md5){
        switch (key) {
          case '1':
            this.$parent.images.md5_1 = md5;
            break;
          case '2':
            this.$parent.images.md5_2 = md5;
            break;
          case '3':
            this.$parent.images.md5_3 = md5;
            break;
          case '4':
            this.$parent.images.md5_4 = md5;
            break;
          case '5':
            this.$parent.images.md5_5 = md5;
            break;
          case '6':
            this.$parent.images.md5_6 = md5;
            break;
          case '7':
            this.$parent.images.md5_7 = md5;
            break;
          case '8':
            this.$parent.images.md5_8 = md5;
            break;
        }
      }
    },
    components:{
      VueFileUpload
    }
  }
</script>
