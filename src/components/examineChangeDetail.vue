<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5 style="margin-top: 5px;">审核详情</h5>
              <div class="creat_butten" style="text-align: right">
                <button class="btn btn-primary" type="button">
                  <a style="color: #FFFFFF" :href="urlHandler('examineChange')">返回</a>
                </button>
              </div>
            </div>
            <div class="ibox-content" v-for="data in items">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">订单号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.orderNum==null ? "--":data.orderNum }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">还款日:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.repaymentDay==null ? "--":data.repaymentDay }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">申请人工号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.applyEmpno==null ? "--":data.applyEmpno }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">申请人姓名:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.applyEmpname }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">申请时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.applyTime }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">审核人编号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.auditorEmpno }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">审核人姓名:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.auditorEmpname }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">审核时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.auditTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">审核状态:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ statusUtil[data.status]}}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <label class="col-sm-2 control-label">驳回原因:</label>
                    <div class="col-sm-9">
                      <textarea v-model="params.reason" class="form-control"></textarea>
                    </div>
                  </div>
                </div>
                <div class="ibox-content">
                  <div class="form-group" style="text-align: center">
                    <button class="btn btn-primary" v-if="data.status == 0 " type="button" @click="update(1)" :disabled="buttonDisabled.popUpdate">审核通过</button>
                    <button class="btn btn-white"   v-if="data.status == 0 " type="button" @click="update(2)" :disabled="buttonDisabled.popUpdate">驳回</button>
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

import { quillEditor } from 'vue-quill-editor'
 var vm;
  export default {
    name: 'examineChangeDetail',
     components: {//select2-定义select2在当前组件中的名称
      quillEditor
    },
    data: function() {
      return {
      editorOption: {},
        items:[],
        itemsFile:[],
        searchParams: {
          orderNum: this.$route.params.orderNum,
          status: "",
        },
        params:{
          id:"",
          status:"",
          reason:""
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          deleteLine: false
        },
         statusUtil:{"1":"已审核","0":"未审核","2":"驳回"},
      }
    },
    methods: {
    urlHandler: function (path) {
        return "#/"+path;
      },
      initTable: function () {
        var that = this;
        debugger
        that.$utils.ajax(that)(basePath2+'/changeRepayment/list',that.searchParams, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          var code = response.body.code;
          if (code == '200') {
            that.items = response.body.data;
            that.params.reason = response.body.data[0].reason;
            that.itemsFile = response.body.data[0].fileUploadRelations;
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
      update : function (indexs) {
        this.buttonDisabled.popUpdate = true;
        var that = this;
        debugger
        that.params.id = that.items[0].id;
        var  url =  "changeRepayment/approval?id="+that.items[0].id+"&status="+indexs+"&reason="+that.params.reason;
        that.$utils.ajax(that)(basePath2+url, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.initTable()
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(this.failedMsg);
        },"put");
        this.buttonDisabled.popUpdate = false;
      },
      openIOUPdf:function(name) {
        var that = this;
        if(that.itemsFile!=null){
          window.open("../../static/html/changingTheCard.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken")+"&flag="+name,
              '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
              }
      },
    },
    mounted: function () {
      this.initTable();
    }
  }
</script>
<style>
  .help-block {
    margin-top: 8px !important;
  }
</style>
