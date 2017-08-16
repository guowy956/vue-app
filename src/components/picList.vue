<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="setTimeout"> 
      <input type="text" readonly v-model="recordOrderConsumeTime" >
    </div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>扫描件</h5>
              <div class="creat_butten" style="text-align: right">
                <button type="button" @click="goback()" class="btn btn-primary">返回</button>
                <!--<button class="btn btn-primary" type="button" v-if="financialForm_list2">
                  <router-link :to="'/financialForm/list2' + '/'+this.$route.params.orderNum+'/'+ this.$route.params.orderName+'/'+ this.$route.params.status">
                    <a style="color: #FFFFFF" >返回</a>
                  </router-link>
                </button>
                <button class="btn btn-primary" type="button" v-if="financialForm_list1">
                  <router-link :to="'/financialForm/list1' + '/'+this.$route.params.orderNum+'/'+ this.$route.params.orderName+'/'+ this.$route.params.status">
                    <a style="color: #FFFFFF" >返回</a>
                  </router-link>
                </button>
                <button class="btn btn-primary" type="button" v-if="pictureList_">
                  <router-link :to="'/pictureList'">
                    <a style="color: #FFFFFF" >返回</a>
                  </router-link>
                </button>
                <button class="btn btn-primary" type="button" v-if="financialFormShow_list4">
                  <router-link :to="'/financialformShow/list4'+ '/'+this.$route.params.orderNum+'/'+ this.$route.params.status">
                    <a style="color: #FFFFFF" >返回</a>
                  </router-link>
                </button>-->
              </div>
            </div>
            <div class="ibox-content">
              <form method="get" class="form-horizontal" style="margin-left: -40px"
                    data-vv-scope="form-1">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-4 control-label"><span class="important">*</span>订单编号:</label>
                    <div class="col-sm-8">
                      <p>
                        <label class="control-label"><span class="important">{{params.orderId}}</span>

                        </label>
                      </p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-4 control-label"><span class="important">*</span>客户名称:</label>
                    <div class="col-sm-8">
                      <p>
                        <label class="control-label"><span class="important">{{params.customerName}}</span>

                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-group" style="text-align: left">
                    <label class="col-sm-2 control-label">相关文件:</label>
                    <div class="col-sm-9" id="f1">
                      <fileupload
                        @mymethod="setUploadedFiles"
                        @selectAll="selectAllPic"
                        @notSelectAll="notSelectAllPic"
                        @deletePic="deletePic"
                      ></fileupload>
                    </div>
                  </div>
                </div>
                <div class="form-group" style="text-align: left" v-if="isGroup">
                  <label class="col-sm-2 control-label">已上传的文件:</label>
                  <div class="col-sm-9" id="f1">
                    <div id="imgls">
                      <div>
                        <ul class="uls">
                          <li v-for="(file,index) in uploadedFiles" class="lis">
                            <img v-bind:src="downloadFile(file.fileMd5,file.fileSuffix)" class="img_"
                            />
                            <div>
                              <input type="checkbox" v-model="checkedFileMd5" :value="file.fileMd5"
                                     style="position: absolute;">&nbsp;&nbsp;&nbsp;&nbsp;
                              {{(file.fileType.length == 4) ? statusObj[file.fileType] : statusObj[file.fileType.substring(0,4)]}}
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <a target="_blank" :href="openWin1Pdf(file.fileMd5,file.fileSuffix)" v-show="file.fileType == 'D019'">预览</a>
                              <!--<a @click="openWin1(file.fileMd5,file.fileSuffix)" v-show="file.fileType == 'D019'">预览</a>-->
                              <a @click="openWin1(file.fileMd5,file.fileSuffix)" v-show="file.fileType != 'D019'">预览</a>
                            </div> <a style="position: absolute;" @click='delImage(file.fileMd5)'>
                            <span class="glyphicon glyphicon-remove"></span>
                          </a>

                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import '../../static/js/plugins/datapicker/bootstrap-datepicker.js';
	import Upload from './common/uploadPic/UploadPic.vue';
	import fileupload from './common/uploadPic/fileuploadPic.vue';

	var vm;
	export
	default {
		name: 'PicList',
		components: {
			'upload': Upload,
			fileupload
		},
		data() {
			return {
				searchParams: {
					start: 0,
					length: 4,
					status: 'Waited',
					groupId: this.$route.params.orderNum,
					email: ""
				},
				buttonDisabled: {
					submit: false,
					finishSave: false,
					deleteLine: false
				},
				params: {
					id: "23",
					groupId: this.$route.params.orderNum,
					orderName: this.$route.params.orderName,
					categoryName: "0",
					orderId: this.$route.params.orderNum,
					customerName: this.$route.params.orderName,
					flag: this.$route.params.flag,
					status: this.$route.params.status,
				},
        recordOrderConsumeTime: "",
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        int: "",
        timer: "",
        order_recordOrderConsumeTime_orderNum_hour: "order_recordOrderConsumeTime_orderNum_hour_" + this.$route.params.orderNum,
        order_recordOrderConsumeTime_orderNum_minute: "order_recordOrderConsumeTime_orderNum_minute_" + this.$route.params.orderNum,
        order_recordOrderConsumeTime_orderNum_second: "order_recordOrderConsumeTime_orderNum_second_" + this.$route.params.orderNum,
				items: [],
				topath: 'ShowList',
				tabIndex: 1,
				activityId: '',
				accountOptShow: true,
				lines: [],
				groupInfo: {}, //组信息
				uploadId: 0,
				uploadIds: [],
				uploadedFiles: [],
				checkedFileMd5: [],
				msg: "",
				filePath: "",
				failedMsg: '服务器异常，请联系管理员',
				isGroup:false,
				financialForm_list2:false,
				financialForm_list1:false,
				pictureList_:false,
				financialFormShow_list4:false,
				statusObj: {
					"D001": "申请表",
						"D002": "身份证明",
						"D003": "征信报告签字版",
						"D004": "收入证明",
						"D005": "住址证明",
						"D006": "工作证明",
						"D007": "私营业主类",
						"D008": "物业资料",
						"D009": "其他资料",
						"D010": "社保证明",
						"D011": "关系证明",
						"D012": "迟缴证明",
						"D013": "资产证明",
						"D014": "担保证明",
						"D015": "按揭或购房合同",
						"D016": "银行卡",
						"D017": "教育证明",
						"D018": "还款流水",
						"D019": "征信报告原版",
						"D020": "结婚证",
						"D021": "商业保险合同或保单",
						"D022": "车辆登记证",
						"D023": "公积金证明",
						"D024": "表彰证书",
						"D025": "负债证明",
						"D026": "财力证明",
						"D027": "婚庆证明",
						"D028": "经营证明",
						"D029": "授权证明",
						"D030": "连带证明",
				},
			};
		},
		methods: {
      goback: function () {
        history.back(-1);
      },
//      计时器开始
      timeStart: function () {
        this.hour = isNull(this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_hour)) ? 0 : this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_hour);
        this.minute = isNull(this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_minute)) ? 0 : this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_minute);
        this.second = isNull(this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_second)) ? 0 : this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_second);
        this.int = setInterval(this.timeTimer,50);
      },
      timeTimer: function () {
        this.millisecond = this.millisecond+50;
        if(this.millisecond>=1000)
        {
          this.millisecond = 0;
          this.second = this.second+1;
        }
        if(this.second>=60)
        {
          this.second = 0;
          this.minute = this.minute+1;
        }
        if(this.minute>=60)
        {
          this.minute = 0;
          this.hour = this.hour + 1;
        }
        this.recordOrderConsumeTime = this.hour+'时'+this.minute+'分'+this.second+'秒';
        this.$utils.saveLocalData(this.order_recordOrderConsumeTime_orderNum_hour, this.hour);
        this.$utils.saveLocalData(this.order_recordOrderConsumeTime_orderNum_minute, this.minute);
        this.$utils.saveLocalData(this.order_recordOrderConsumeTime_orderNum_second, this.second);
      },
      timeStop: function () {
        window.clearInterval(this.int);
      },
			//预览
			openWin1: function (md5, type) {
				var _this = this;
				_this.filePath = basePath4 + "preview/" + md5 + "/" + type;
				window.open("../../static/img/upload/uploadPreview.html?filePath="+basePath4 + "preview/" + md5 + "/" + type,'_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
			},
						//预览PDF
			openWin1Pdf: function (md5, type) {
				var _this = this;
				_this.filePath = basePath4 + "preview/" + md5 + "/" + type;
				return basePath4 + "preview/" + md5 + "/" + type;
				//window.open("../../static/img/upload/uploadPreview.html?filePath="+basePath4 + "preview/" + md5 + "/" + type,'_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
			},
			//查看图片
			setUploadedFiles: function () {
				var _this = this;
				var picId = this.$route.params.orderNum;
				if (picId) {
					var url = basePath4 + 'api/order/' + this.$route.params.orderNum + '/scanningcopy'+"?accessToken="+this.$utils.getLocalData("accessToken");
					this.$http.get(url, {}).then(function (res) {
						this.uploadedFiles = res.body.data;
						this.isGroup = true ;
						console.log(this.uploadedFiles);
					}, function (res) {
						console.warn(res);
					});
				}
			},
			//预览 --- 查看图片
			downloadFile: function (md5, type) {
        if (type.indexOf("pdf") != -1) {
          return "http://" + host + "/static/img/PDF.png";
        }
				return basePath4 + "preview/" + md5 + "/" + type +"?thumbnails=true&accessToken="+this.$utils.getLocalData("accessToken");
				console.log(basePath4 + "preview/" + md5 + "/" + type);
			},
			//全选
			selectAllPic: function () {
				var _this = this;
				_this.checkedFileMd5 = [];
				_this.uploadedFiles.forEach(function (item, i) {
					_this.checkedFileMd5.push(item.fileMd5);
				});
			},
			//全清
			notSelectAllPic: function () {
				var _this = this;
				_this.checkedFileMd5 = [];
			},
			//批量删除
			deletePic: function () {
				var that = this;
				if (that.checkedFileMd5.length > 0) {
					this.buttonDisabled.deleteLine = true;
					if (confirm("确定要删除吗？")) {
						for (var i = 0; i < that.checkedFileMd5.length; i++) {
							console.log(that.checkedFileMd5[i])
							that.del(that.checkedFileMd5[i]);
							this.buttonDisabled.deleteLine = false;
						}
					}
				} else {
					that.$utils.alert("请选中图片");
					return;
				}
			},
			//图片删除
			delImage: function (fileMd5) {
				this.buttonDisabled.deleteLine = true;
				if (confirm("确定要删除吗？")) {
					var that = this;
					that.del(fileMd5);
					this.buttonDisabled.deleteLine = false;
				}
			},
			//删除方法
			del: function (fileMd5) {
				var that = this;
				that.$utils.ajax(that)(basePath4 + 'api/order/' + this.$route.params.orderNum + '/scanningcopy/' + fileMd5, {}, function (response) {
					if (typeof (response.body) === 'string') {
						response.body = JSON.parse(response.body);
					}
					if (response.body.code == '200') {
						that.setUploadedFiles();
					} else if (response.body.code == '401') {
						that.$utils.clearLocalData("accessToken");
						that.$utils.clearLocalData("orgData");
						that.$utils.clearLocalData("hrData");
						that.$parent.$emit('changeLogin', 'N');
					} else {
						that.$utils.alert(response.body.message)
					}
				}, function (response) {
					that.$utils.alert(this.failedMsg);
				}, "delete");
			},
		},
		mounted: function () {
      vm = this;
      this.timeStart();
			var that = this;
			that.setUploadedFiles();
			if(that.params.flag == 1 ){
			that.financialForm_list1 = true;
			that.financialForm_list2 = false;
			}else if(that.params.flag == 2 ){
			that.financialForm_list2 = true;
			that.financialForm_list1 = false;
			}else if(that.params.flag == 3 ){
			that.pictureList_ = true;
			}else if(that.params.flag == 4 ){
			that.financialFormShow_list4 = true;
			}


		},
		created: function () {
			/**
			 * 渲染初始页面
			 *      在创建App.vue时，首先调用“登录探针”接口，测试是否已登录。
			 *      如果已登录则渲染首页，未登录则渲染登录页，其它情况提示“fail”
			 * @type {created}
			 */
			var that = this;
			that.$utils.ajax(that)(basePath2 + 'loginTest', that.searchParams, function (response) {
				if (typeof (response.body) === 'string') {
					response.body = JSON.parse(response.body);
				}
				if (response.body.code == '200') {
					that.$parent.$emit('changeLogin', 'Y');
				} else if (response.body.code == '401') {
					that.$utils.clearLocalData("accessToken");
					that.$utils.clearLocalData("orgData");
					that.$utils.clearLocalData("hrData");
					that.$parent.$emit('changeLogin', 'N');
				} else {
					that.$utils.alert(response.body.message)
				}
			}, function (response) {
				that.$utils.alert("服务异常");
			}, "get");
		}
	}
</script>
<style>
	.modal {
		overflow: auto !important;
	}
	.table tr {
		text-align: center;
	}
	.datepicker {
		z-index: 10000 !important;
	}
	.uls {
		list-style: none outside none;
	}
	.lis {
		float:left;
		margin: 15px 10px;
		display: inline;
		text-align:center;
		font-szie:18px;
	}
	#imgls {
		overflow: hidden;
		text-align: center;
		margin-top: 10%;
	}
	#imglse {
		overflow: hidden;
		text-align: center;
		margin-top: 1%;
	}
	.img_ {
		width: 210px;
		height: 250px;
		margin: auto;
		display: inline;
		margin-bottom: 10px;
	}
  .setTimeout{
    text-align: center;
    position: fixed;
    z-index: 9999;
    top: 20px;
    left: 89%;
  }
  .setTimeout input{
    border: none;
    color: red;
    font-size: 18px;
    background: transparent;
  }
	.room_img{
	display: flex;
}
</style>
