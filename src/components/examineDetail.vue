<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <!--<h1>变更组织</h1>-->
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>审核详细</h5>
            </div>
            <div class="ibox-content col-md-12">
              <div class="col-sm-7">
                <p style="height:30px">
                  <a v-show="itemDict.accountType == 2"><div  tabindex="-1" class="focus examineTab" v-on:click="check_btn('变更证明')">变更证明</div></a>
                  <a v-show="itemDict.accountType == 1"><div  tabindex="-1" class="focus examineTab" v-on:click="check_btn('变更银行卡协议')">变更银行卡协议</div></a>
                  <a><div  tabindex="-1" class="focus examineTab" v-on:click="check_btn('银行卡复印件')">银行卡复印件</div></a>
                  <a><div  tabindex="-1" class="focus examineTab" v-on:click="check_btn('身份证件')">身份证件</div></a>
                </p>
                <p style="text-align: center;">共{{fileLength}}张 || 下载</p>
                <div id="viewer2" class="viewer">
                  <!--<div style="text-align: center; padding: 10px">共{{fileLength}}张 || 下载</div>-->
                  <div class="iviewer_rotate_down iviewer_common iviewer_button" v-on:click="next_file()"
                       v-show="left_right"></div>
                  <div class="iviewer_rotate_up   iviewer_common iviewer_button" v-on:click="up_file()"
                       v-show="left_right"></div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-horizontal m-t" id="postForm">
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">进件编号:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ itemDict.orderNum==null ? "--":itemDict.orderNum }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">产品名称：</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.productName==null ? "--":items.productName }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">签约金额（元）:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{items.signingAmount}}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">总服务费（元）:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.totalServiceFee }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">放款金额（元）:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.actualAmount }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">还款期限:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.approvalTerm }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">费率:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.expenseRate }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <label class="col-sm-5 control-label">月还日:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.repaymentPaymentDay }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">签约日期:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.signingDay }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">客户姓名:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ itemDict.loanName }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">注册电话:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ items.mobile }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">预留手机号:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ itemDict.phoneNew }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">身份证号:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ itemDict.idNumber }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">开户行（新）:</label>
                      <!--<label class="col-sm-5 control-label">订单状态:</label>-->
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ itemDict.bankBameNameNew }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">开户行支行（新）:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ itemDict.bankBranchNameNew }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">开户行卡号（新）:</label>
                      <div class="col-sm-6"> <span class="help-block m-b-none">{{ itemDict.bankCardNumberNew }}</span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-21">
                      <label class="col-sm-5 control-label">审核意见:</label>
                      <div class="col-sm-6" v-if="itemDict.status==0 || itemDict.status==2">
                        <textarea v-model="params.remark" class="form-control"></textarea>
                      </div>
                      <div class="col-sm-6" v-if="itemDict.status!=0 && itemDict.status!=2">
                        {{ params.remark }}
                      </div>
                    </div>
                  </div>
                  <div class="form-group org_btn" style="text-align: center" v-show="itemDict.status==0 ">
                    <button class="btn btn-primary" v-on:click="update(1)" :disabled="buttonDisabled.addSave">审核通过</button>
                    <button class="btn btn-primary" v-on:click="update(2)" :disabled="buttonDisabled.popSave">驳回</button>
                    <!--<button class="btn btn-primary" v-on:click="update(3)" :disabled="buttonDisabled.popSave">拒绝</button>-->
                  </div>
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
   import '../../static/js/lun/jquery.iviewer_1.js';

   var iv2
   export
   default {
      name: 'examineDetail',
      components: { //select2-定义select2在当前组件中的名称
      },
      data: function () {
         return {
            statusUtil: {
                  "0": "未审核",
                  "1": "已审核",
                  "2": "驳回",
                  "3": "结算确认",
                  "4": "开户成功",
                  "5": "开户失败",
                  "6": "已通知",
            },
            accountType: {
              "0": "全部",
              "1": "三方账户",
              "2": "银行",
            },
            Bstatus: {
               "1": "三方账户",
               "0": "银行"
            },
            editorOption: {},
            items: "",
            itemDict: "",
            itemsFile: [],
            itemsFileMd5: [],
            index: "",
            fileLength: "",
            left_right: true,
            buttonDisabled: {
               popSave: false,
               popUpdate: false,
               deleteLine: false
            },
            searchParams: {
               orderNum: this.$route.params.orderNum,
               id: this.$route.params.ID,
               loanName: "",
               orderStatus: "",
               accountType: "",
            },
            params: {
               remark: ""
            }
         }
      },
      methods: {
         transfers: function (longDate) {
            var date2 = new Date(longDate);
            var str2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
            return str2
         },
         urlHandler: function (path) {
            return "#/" + path;
         },
         initTable: function () {
            var that = this;
            that.$utils.ajax(that)(basePath2 + '/modBankcardRecord', that.searchParams, function (response) {
               if (typeof (response.body) === 'string') {
                  response.body = JSON.parse(response.body);
               }
               var code = response.body.code;
               if (code == '200') {
                  that.items = response.body.data;
                  that.itemDict = response.body.data.dict;
                  debugger
                  that.params.remark = that.itemDict.remark
                  that.itemsFile = that.itemDict.fileUploadRelations
                   debugger
                  that.itemsFileMd5.push(that.itemsFile[0].md5 + "_" + that.itemsFile[0].suffix)
                  if (that.itemsFileMd5.length != 0) {
                     var name = that.itemsFileMd5[0].split("_")[0];
                     var type = that.itemsFileMd5[0].split("_")[1];
                     that.left_right = true;
                     iv2 = $("#viewer2").iviewer({
                        src: that.fileShow_(name, type),
                     });
                     if (that.itemsFile[0].purpose == "变更证明" && that.itemsFile[0].purpose != null) {
                        that.check_btn("变更证明");
                     } else if (that.itemsFile[0].purpose == "身份证件" && that.itemsFile[0].purpose != null) {
                        that.check_btn("身份证件");
                     } else if (that.itemsFile[0].purpose == "银行卡复印件" && that.itemsFile[0].purpose != null) {
                        that.check_btn("银行卡复印件");
                     } else if (that.itemsFile[0].purpose == "变更银行卡协议" && that.itemsFile[0].purpose != null) {
                        that.check_btn("变更银行卡协议");
                     }
                  } else {
                     that.left_right = false;
                  }
               } else if (response.body.code == '401') {
                  that.$utils.clearLocalData("accessToken");
                  that.$utils.clearLocalData("orgData");
                  that.$utils.clearLocalData("hrData");
                  that.$parent.$emit('changeLogin', 'N');
               } else {
                  that.$utils.alert(response.body.message)
               }
            }, function (response) {
               that.$utils.alert("fail");
            }, "get");
         },
         check_btn: function (fileName) {
            var that = this;
            that.itemsFileMd5 = [];
            for (var i = 0; i < that.itemsFile.length; i++) {
               if (that.itemsFile[i].purpose == fileName) {
                  that.itemsFileMd5.push(that.itemsFile[i].md5 + "_" + that.itemsFile[i].suffix)
               }
            }
            if (that.itemsFileMd5.length != 0) {
               that.fileLength = that.itemsFileMd5.length
               var name = that.itemsFileMd5[0].split("_")[0];
               var type = that.itemsFileMd5[0].split("_")[1];
               var file_path = that.fileShow_(name, type);
               iv2.iviewer('loadImage', file_path);
            } else {
               that.left_right = false;
            }
         },
         fileShow_: function (md5, type) {
            var _this = this;
            _this.filePath = basePath4 + "preview/" + md5 + "/" + type
            return _this.filePath;
         },
         next_file: function () {
            debugger
            var that = this;
            that.index++;
            if (that.index == that.itemsFileMd5.length) {
               that.index = 0;
            }
            var split = that.itemsFileMd5[that.index];
            var fileShow = split;
            var path_ = fileShow.split("_")[1];
            var type_ = fileShow.split("_")[0];
            var file_path = that.fileShow_(type_, path_);
            iv2.iviewer('loadImage', file_path);
            return false;
         },
         up_file: function () {
            debugger
            var that = this;
            that.index--;
            if (that.index < 0) {
               that.index = that.itemsFileMd5.length - 1;
            }
            var split = that.itemsFileMd5[that.index];
            var fileShow = split;
            var path_ = fileShow.split("_")[1];
            var type_ = fileShow.split("_")[0];
            var file_path = that.fileShow_(type_, path_);
            iv2.iviewer('loadImage', file_path);
            return false;
         },
         update: function (indexs) {
            this.buttonDisabled.popUpdate = true;
            var that = this;
            debugger
            that.params.id = that.itemDict.id;
            var url = "/modBankcardRecord/approval?id=" + that.params.id + "&status=" + indexs + "&accountType=" + that.itemDict.accountType + "&remark=" + that.params.remark;
            that.$utils.ajax(that)(basePath2 + url, {}, function (response) {
               if (typeof (response.body) === 'string') {
                  response.body = JSON.parse(response.body);
               }
               if (response.body.code == '200') {
                  //that.initTable()
                 window.location.href="#/examine";
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
            }, "put");
            this.buttonDisabled.popUpdate = false;
         },
         openIOUPdf: function (name) {
            var that = this;
            if (that.itemsFile != null) {
               window.open("../../static/html/changingTheCard.html?orderNum=" + this.$route.params.orderNum + "&accessToken=" + this.$utils.getLocalData("accessToken") + "&flag=" + name,
                  '_blank', 'height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
            }
         },
      },
      mounted: function () {
         this.initTable();
      }
   }
</script>
<style>
   .focus {
      background: #FFFFFF;
      outline: none;
      width:100px;
      height:30px;
      <!--line-height:200px;
      --> <!--border-radius:50%;
      --> margin-bottom: 20px
   }
   .focus:focus {
      background: #c3c3c3
   }
   .help-block {
      margin-top: 8px !important;
   }
   .yj {
      padding:10px;
      width:300px;
      height:50px;
      border: 2px solid #000000;
      -moz-border-radius: 15px;
      -webkit-border-radius: 15px;
      border-radius:15px;
   }
   #idContainer img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
   * {
      margin: 0;
      padding: 0;
   }
   ul, li {
      list-style: none;
   }
   .tabClick {
      background: #f3f3f3;
      overflow: hidden;
   }
   .tabClick li {
      height: 40px;
      line-height: 40px;
      width: 50%;
      float: left;
      text-align: center;
   }
   .tabClick li.active {
      color: white;
      transition: 0.1s;
      font-weight: bold;
      background-color:gray
   }
   .tabList {
      width: 100%;
   }
   .viewer {
      width: 100%;
      height: 700px;
      border: 1px solid black;
      position: relative;
   }
   .wrapper {
      overflow: hidden;
   }
   .hide_it {
      display : none;
   }
  .examineTab{
    text-align:center;
    line-height:30px ;
    border:1px solid #A1A1A1 ;
    float:left; margin-right: 2%
  }
</style>
