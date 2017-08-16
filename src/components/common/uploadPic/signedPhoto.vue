<template>
  <div>
    <vue-file-upload v-bind:url='url' ref="vueFileUploader" v-bind:filters="filters"
                     v-bind:events='cbEventsSP' v-bind:request-options="reqopts" v-on:onAdd="onAddItem"
                     multiple></vue-file-upload>
    <table class="table table-striped table-bordered table-hover ">
      <tbody>
      <tr v-for="(file,index) in imgs">
        <td>{{ getNum(index) }}</td>
        <td v-text="file.name"></td>
        <td v-text="file.size"></td>
        <td v-text="">{{file.progress}}%</td>
        <td v-text="onStatus(file)"></td>
      </tr>
      </tbody>
    </table>
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
				filters: [{
					name: "imageFilter",
					fn(file) {
						var types = "|" + file.type.slice(file.type.lastIndexOf('/') + 1) + "|";
						return '|png|gif|bmp|jpeg|jpg|jpe|'.indexOf(types) !== -1;
					}
				}],
				//回调函数绑定
			  cbEventsSP: {
         onCompleteUpload:(file, response, status, header)=>{
            this.files.splice(0, 1);
            this.imgs.splice(0, 1);
            this.$emit('mymethod', "")
          }
			  },
				//xhr请求附带参数
				reqopts: {
					formData: {
						tokens: 'tttttttttttttt'
					},
					responseType: 'json',
					withCredentials: false
				}
			}
		},
		computed: {
			url: function () {
				return basePath2 + '/contract/' + this.$route.params.orderNum + '/uploadFace' + "?accessToken=" + this.$utils.getLocalData("accessToken");
			}
		},
		methods: {
			onStatus(file) {
				var that = this;
				if (file.isSuccess) {
					return "上传成功";
				} else if (file.isError) {
					return "上传失败";
				} else if (file.isUploading) {
					return "正在上传";
				} else {
					return "待上传";
				}
			},
			onAddItem(files) {
				var that = this;
				for(var i = 0 ;i<files.length; i++){
			  that.imgs.push(files[i]);
			}
			  this.files = files;
				that.uploadAll();
			},
			getNum : function(index){
        //计算序号
        return parseInt(0) + parseInt(index)+1;
      },
			uploadItem(file) {//单个文件上传
				file.upload();
			},
			uploadAll() {//上传所有文件
				this.$refs.vueFileUploader.uploadAll();
			},
			clearAll() {//清空所有文件
				var _this = this;
				_this.files = [];
				this.$refs.vueFileUploader.clearAll();
			},
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
