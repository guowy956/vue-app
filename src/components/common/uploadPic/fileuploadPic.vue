<template>
  <div>
    <vue-file-upload v-bind:url='url' ref="vueFileUploader" v-bind:filters="filters"
                     v-bind:events='cbEvents' v-bind:request-options="reqopts" v-on:onAdd="onAddItem"
                     multiple></vue-file-upload>
    <div id="imglse">
      <ul class="uls">
        <li v-for="(item , index) in imgs" class="lis">
          <img :src="item" width="125px" height="130px" />
          <div style="font-size: 14px;">{{onStatus(files[index])}}
            <a style="position: absolute;padding : 2px" @click='delete_img_(index)'>
              <span class="glyphicon glyphicon-remove"></span>
            </a>
          </div>
          <div style="color: #5cb85c;font-size: 16px" v-if="files[index].progress!=100">{{files[index].progress}}%</div>
        </li>
      </ul>
    </div>
    <button type="button" @click="uploadAll" class="btn btn-primary start"> <i class="glyphicon glyphicon-upload"></i>
      <span>上传所有文件</span>
    </button>
    <button type="button" @click="clearAll" class="btn btn-primary start"> <i class="glyphicon glyphicon-upload"></i>
      <span>清空所有文件</span>
    </button>
    <button class='btn btn-primary' @click='setUploadedFiles()' type="button"><i class='fa fa-paste'></i>刷新</button>
    <button class='btn btn-primary' @click='selectAllPic()' type="button"><i class='fa fa-paste'></i>全选</button>
    <button class='btn btn-primary' @click='notSelectAllPic()' type="button"><i class='fa fa-paste'></i>反选</button>
    <button class='btn btn-primary' @click='deletePic()' type="button"><i class='fa fa-paste'></i>删除</button>
    <div style="padding: 5px 0px"><span style="color: #337ab7">支持上传的文件类型:png，pdf，jpeg，jpg，JPG，PNG，JPEG；</span></div>
    <div title="D001为申请表，D002为身份证明，D003为征信报告签字版（图片），D004为收入证明，D005为住址证明，D006为工作证明，D007为私营业主类，D008为物业资料，D009为其他资料，D010为社保证明、D011为关系证明、D012为迟缴证明、D013为资产证明、D014为担保证明、D015为按揭或购房合同、D016为银行卡、D017为教育证明，D018为还款流水, D019为征信报告原版（PDF）,D020为结婚证，D021为商业保险合同或保单，D022为车辆登记证，D023为公积金证明，D024为表彰证书,D025为负债证明,D026为财力证明，D027为婚庆证明，D028为经营证明，D029为授权证明，D030为连带证明。如收入证明多页就以D004-01或者D004- （2）…来命名，其他类型同理，上传后系统自动匹配，后续无需再对上传资料进行归类选择">
      <span class="important">图片编码规则</span>
    </div>
  </div>
</template>
<script>
  import VueFileUpload from 'vue-file-upload';
  export
  default {
    data() {
      return {
        files: [],
        imgs: [],
        imgLength:[],
        flag:0,
        isShow: false,
        filters: [{
          name: "imageFilter",
          fn(file) {
            var type = file.type.slice(file.type.lastIndexOf('/') + 1);
            var types = "|" + file.type.slice(file.type.lastIndexOf('/') + 1) + "|";
            var BigStr = file.name.substring(5,9);
            var PicNames ;
            if(BigStr != "PNG" && BigStr != "PDF"){
              PicNames =  file.name.replace("." + type, '')
            }else{
              PicNames =  file.name.replace("." + BigStr, '')
            }
            var reg = new RegExp(/^[Dd]{1}\d{3}(-(\d{1,3}|([（(]\d{1,3}[)）])))?/i);
            if (!PicNames.match(reg)) {
              return false;
            }
            return '|png|pdf|PNG|jpg|JPG|jpeg|JPEG|'.indexOf(types) !== -1;
          }
        }],
        //回调函数绑定
        cbEvents: {
          onCompleteUpload: (file, response, status, header) => {
            if(response.success == true){
              this.scanningCopyNew(response.data.fileKey,response.data.fileName,response.data.fileType,file);
            }
            if(response.success != true){
              file.isSuccess = false;
              file.isError = true;
              this.errorMsg = response.message;
            }
            //this.$parent.uploadIds.push(response.data.id);
          }
        },
        //xhr请求附带参数
        reqopts: {
          headers: {
            'Accept-system':'PHYY'
          },
          formData: {
            tokens: 'tttttttttttttt',
          },
          responseType: 'json',
          withCredentials: false
        },
        searchParams:{
          name:"",
          md5:"",
          type:"",
        },
        errorMsg: "",
        allowUpload: true,
//        maxSize: 10485760
        maxSize: 3145728
      }
    },
    computed: {
      url: function () {
        return pic430;
      },
    },
    methods: {
      onStatus(file) {
        var that = this;
        if (file.isSuccess) {
          this.isShow = false;
          return "上传成功";
        } else if (file.isError) {
          this.isShow = true;
          return "上传失败("+this.errorMsg+")";
        } else if (file.isUploading) {
          this.isShow = false;
          return "正在上传";
        } else {
          var fileSize = file.size;
          if(fileSize > this.maxSize){
            this.allowUpload = false;
            return "上传单张照片不能大于3兆";
          }else {
            return "待上传";
          }
        }
      },
      onAddItem(files) {
        var that = this;
        this.files = files;
        var img1 = event.target.files;
        var leng = img1.length;
        for (var i = 0; i < leng; i++) {
          var picName = img1[i].name;
          var str = img1[i].type;
          var index = str.lastIndexOf("\/");
          str = str.substring(index + 1, str.length);
          var BigStr = picName.substring(5,9);
          var PicNames ;
          if(BigStr != "PNG" && BigStr != "PDF"&& BigStr != "JPG"&& BigStr != "JPEG"){
            PicNames =  img1[i].name.replace("." + str, '')
          }else{
            PicNames =  img1[i].name.replace("." + BigStr, '')
          }
//          var reg = new RegExp(/^[Dd]{1}\d{3}(-(\d{1,3}|([（(]\d{1,3}[)）])))?/i);
//          if (!PicNames.match(reg) || that.stripscript(PicNames)) {
          var fName = img1[i].name; //文件名称
          var names = "D001,D002,D003,D004,D005,D006,D007,D008,D009,D010,D011,D012,D013,D014,D015,D016,D017,D018,D019,D020,D021,D022,D023,D024,D025,D026,D027,D028,D029,D030";
          var arr = names.split(",");
          var fileNameAllow = null;
          $(arr).each(function (i, item) {
            if(fName.indexOf(item)>-1){  // 包含names中的名称
              fileNameAllow = fName;
            }
          });
          if(!fileNameAllow){
            that.$utils.alert(img1[i].name + "  文件编码不正确");
          } else {
            var reader = new FileReader();
            reader.readAsDataURL(img1[i]);
            if (picName.toString() === "D019.pdf") {
              that.imgs.push("../../../static/img/upload/zxbg.png");
              that.imgLength.push("../../../static/img/upload/zxbg.png");
            } else {
              reader.onload = function (e) {
                that.imgs.push(e.target.result);
                that.imgLength.push(e.target.result);
              }
            }
          }
        }
        this.isShow = true;
      },

      stripscript:function (str) {
        if(str.split("-").length>1){
          return true;
        }
        return false;
      } ,
      RegFileName: function (strs) {
        var reg = new RegExp(/^[Dd]{1}\d{3}(-(\d{1,3}|([（(]\d{1,3}[)）])))?/i);
        var matches = strs.match(reg);
        return matches && strs == matches[0];
      },
      uploadItem(file) {
        //单个文件上传
        file.upload();
      },
      uploadAll() {
        //上传所有文件
        if(this.allowUpload){
          this.$refs.vueFileUploader.uploadAll();
        }else {
          alert("请删除不符合条件的文件再上传！");
        }
      },

      clearAll() {
        //清空所有文件
        var _this = this;
        _this.imgs = [];
        this.$refs.vueFileUploader.clearAll();
      },
      delete_img_: function (index) {
        this.imgs.splice(index, 1);
        this.files.splice(index, 1);
        this.errorMsg = ""
        this.isAllowUpload();
      },
      // 判断文件是否允许上传
      isAllowUpload: function () {
        var that = this;
        that.allowUpload = true;
        if(this.files){
          $(files).each(function(i,item){
            if(item.size > this.maxSize){
              that.allowUpload = false;
              return false;
            }
          });
        }
      },
      setUploadedFiles: function () {
        var vm = this;
        vm.$emit('mymethod', "")
      },
      selectAllPic: function () {
        var vm = this;
        vm.$emit('selectAll', "")
      },
      notSelectAllPic: function () {
        var vm = this;
        vm.$emit('notSelectAll', "")
      },
      deletePic: function () {
        var vm = this;
        vm.$emit('deletePic', "")
        vm.errorMsg = ""
      },
      scanningCopyNew:function(fileKey,fileName,fileType,file){
        var that = this;
        var url = basePath2+'/foreign/order/'+this.$route.params.orderNum+'/scanningcopynew';
        //var url = basePath2+'/foreign/order/'+this.$route.params.orderNum+'/scanningcopynew?name='+fileName +"&md5="+fileKey +"&type="+fileType +"&orderNum="+this.$route.params.orderNum;
        that.searchParams.name = fileName
        that.searchParams.md5 =fileKey
        that.searchParams.type = fileType
        that.$utils.ajax(that)(url, that.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          debugger

          that.flag = that.flag+1;
          if(that.flag == that.imgLength.length){
            that.imgLength = [];
            that.flag = 0;
            that.$emit('mymethod', "")
          }


          if (response.body.code == '200') {
            file.isSuccess = true;
            file.isError = false;
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
            file.isSuccess = false;
            file.isError = true;
            that.errorMsg = response.body.message;
            //that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");

        },"POST");
      }
    },
    components: {
      VueFileUpload
    }
  }
</script>
<style>
  a:hover, a:visited {
    color:#8B8B7A;
  }

</style>

