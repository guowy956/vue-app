<template>
  <!--<h1>变更组织</h1>-->
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>信息检索</h5>
            </div>
            <div class="ibox-content col-md-12">
              <div class="row aa">
                <div class="col-sm-3">
                  <span>身份证号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.idNum" @blur='valIdNum'>
                </div>
                <div class="col-sm-3">
                  <span class="btn btn-primary" @click="searchList()"><i class="fa fa-paste"></i>查询</span>
                </div>
              </div>
            </div>
            <div class="ibox-content">
              <table class="table table-bordered" style="text-align: center !important;">
                <thead>
                <tr>
                  <th style="width: 4%">序号</th>
                  <th style="width: 17%">申请编号</th>
                  <th style="width: 13%">产品名称</th>
                  <th>订单状态</th>
                  <th>申请人员</th>
                  <th>团队经理</th>
                  <th>批复期限</th>
                  <th>批复金额</th>
                  <th>拒绝原因</th>
                  <th>可再次进件时间</th>
                  <th>还款状态</th>
                  <th>签约营业部</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in items">
                  <td>{{ getNum(index) }}</td>
                  <td>{{ item.orderNum }}</td>
                  <td>{{ item.productName }}</td>
                  <td>{{ item.orderStatus }}</td>
                  <td>{{ item.proposer }}</td>
                  <td>{{ item.teamManager==null ? '--':item.teamManager }}</td>
                  <td>{{ item.approvalTerm }}</td>
                  <td v-if="item.approvalAmount">{{ toMoney(item.approvalAmount) }}元</td>
                  <td v-if="!item.approvalAmount"></td>
                  <td>{{item.refuseReason}}</td>
                  <td>{{ item.nextAllowApplyTime }}</td>
                  <td></td>
                  <td>{{ item.orgName }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../static/js/plugins/datapicker/bootstrap-datepicker.js';

  export default {
    name: 'searchInfo',
    data :function() {
      return {
        newPageSize:0,
        startNum : 1,
        jumpNum : 1,
        items : [],
        searchParams : {
          start : 0,
          length : 10,
          idNum: ""
        },
      }
    },
    methods: {
      toMoney: function (value) {
        return toMoney(value)
      },
      searchList : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'order/customer/history?idNum=' +that.searchParams.idNum, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.data.data;
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
      //检验身份证号
      valIdNum : function(){
        if(this.searchParams.idNum != null && this.searchParams.idNum != ""){
          var idNum1 = this.searchParams.idNum;
          var reg = new RegExp(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/);
          if(!idNum1.match(reg)){
            this.$utils.alert("身份证格式不正确");
            return false;
          }
        }
        return true;
      },
      getNum : function(index){
        //计算序号
        return parseInt(this.startNum) + parseInt(index);
      }
    },
    mounted: function () {
      //初始加载查询方法
//      this.initTable();
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .devStyle {
    display: none;
  }
  .debuggerStyle {
    color: red;
    font-weight: bolder;
  }
  .errors {
    color: #f00;
    display: block;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .cf{
    clear: both;
    zoom: 1;
  }
</style>
