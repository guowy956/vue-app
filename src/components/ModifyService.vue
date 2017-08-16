<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>内勤调单</h5>
            </div>
            <div class="ibox-content" style="padding: 5px">
              <table class="table tableApp">
                <tr>
                  <td class="col-sm-4">
                    <label class="col-sm-4 margin">申请编号：</label>
                    <div class="col-sm-8">
                      <input type="text" v-model="searchParams.orderNum" placeholder="请输入申请编号" class="form-control border">
                    </div>
                  </td>
                  <td class="col-sm-4">
                    <div class="col-sm-12">
                      <button type="button" class="btn btn-info" @click="search()">查询</button>
                      <button type="button" class="btn btn-info" @click="resetSearch()">重置</button>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div class="ibox-content">
              <table class="table table-bordered" style="table-layout:fixed;">
                <thead>
                <tr>
                  <th style="width: 5%">序号</th>
                  <th style="width: 15%">申请编号</th>
                  <th style="width: 10%">产品名称</th>
                  <th style="width: 15%">团队经理</th>
                  <th style="width: 15%">销售人员</th>
                  <th style="width: 15%">客服</th>
                  <th style="width: 15%">申请时间</th>
                  <th style="width: 10%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in items">
                  <td>{{ getNum(index) }}</td>
                  <td>{{ item.orderNum}}</td>
                  <td>{{ item.productName}}</td>
                  <td>{{item.teamManagerEmpno}}&nbsp;&nbsp;{{ item.teamManager}}</td>
                  <td>{{ item.salesmanEmpno }}&nbsp;&nbsp;{{ item.salesman}}</td>
                  <td>{{ item.customServiceEmpno }}&nbsp;&nbsp;{{ item.customService}}</td>
                  <td>{{ item.applicationTime }}</td>
                  <td>
                    <button class="btn btn-info" @click="openWin(item)"><i class="fa fa-paste"></i>调单</button>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="row">
                <div class="dataTables_info col-sm-4">
                  显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项
                </div>
                <div class="dataTables_paginate paging_simple_numbers col-sm-8" style="text-align:right;">
                  <ul class="pagination">
                    <li class="paginate_button previous"><a @click="first()">首页</a></li>
                    <li class="paginate_button previous"><a @click="before()">上一页</a></li>
                    <li class="paginate_button" v-for="(n,index) in pageSize" >
                      <a @click="jump(n)" v-if="(jumpNum<5 && n<10) || (n >=jumpNum-4 && n <=jumpNum+4) ||
                                                (jumpNum > newPageSize-5 && n>newPageSize-9)">
                        <span :class="{num : jumpNum == n}" >
                          {{n}}
                        </span>
                      </a>
                    </li>
                    <li class="paginate_button next"><a @click="next()">下一页</a></li>
                    <li class="paginate_button next"><a @click="final()">尾页</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-show="isWinShow" class="win" id="win">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>

          <form class="form-horizontal m-t">
            <div class="modal-body">
              <div class="form-group">
                <label class="col-sm-3 control-label">申请编号：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params.orderNum" disabled="">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">团队经理：</label>
                <div class="col-sm-8" id="teamManagerDiv">
                  <select2 :options="options.teamManagers" v-model="params.teamManagerNo" :select2Style="select2Style" @myMethod="callback_0"></select2>
                  <input type="hidden" v-model="params.teamManagerNo"/>
                  <input type="hidden" v-model="params.teamManagerName"/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">销售人员：</label>
                <div class="col-sm-8" id="saleDiv">
                  <select2 :options="options.sales" v-model="params.salesmanNo" :select2Style="select2Style" @myMethod="callback_2"></select2>
                  <input type="hidden" v-model="params.salesmanNo"/>
                  <input type="hidden" v-model="params.salesmanName"/>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">客服/内勤：</label>
                <div class="col-sm-8" id="serviceDiv">
                  <select2 :options="options.services" v-model="params.serviceNo" :select2Style="select2Style" @myMethod="callback_1"></select2>
                  <input type="hidden" v-model="params.serviceNo"/>
                  <input type="hidden" v-model="params.serviceName"/>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
              <button type="button" class="btn btn-primary" @click="update()">修改</button>
            </div>
          </form>


        </div>
      </div>
    </div>
    <div v-show="isWinShow" class="modal-backdrop fade in" id="pop"></div>
  </div>
</template>
<style>
  table tr th {
    text-align: center;
  }
  .num {
    font-weight:bold;
    color:#337ab7;
  }
</style>
<script>
  import select2 from './common/select2/select2.vue';

  export default {
    name: 'ModifyService',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    data :function () {
      return {
        newPageSize:0,
        startNum : 1,
        jumpNum : 1,
        items : [],
        recordsTotal : 0,
        searchParams : {
          orderNum: "",
          start : 0,
          length : 10
        },
        // 后加的
        showParams: {
          modalShow: true,
          devStyle: 'devStyle',
          winShow: 'winShow'
        },
        isWinShow: false,
        params: {
          orderNum: "",
          teamManagerNo: "",
          teamManagerName: "",
          serviceNo: "",
          serviceName: "",
          salesmanNo: "",
          salesmanName: ""
        },
        winTitle: '调单',
        options:{
          teamManagers: [],
          sales: [],
          services: []
        },
        select2Style: {//select2-style样式
          width: '100%'
        }
      }
    },

    computed: {
      end : function () {
        var res = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
        if(res > this.recordsTotal){
          res = this.recordsTotal
        }
        return res
      },
      pageSize : function () {
        var a = parseInt(this.recordsTotal / this.searchParams.length)
        var b = a + 1
        this.newPageSize=this.recordsTotal % this.searchParams.length == 0 ? a : b
        return this.newPageSize;
      },
      startNum: function () {
        if(this.recordsTotal==0){
          return 0;
        }else{
          return this.searchParams.start+1
        }
      }
    },
    filters:{
      //转换订单状态
      convertStatus : function(value){
        if(value=='100'){
          return "待保存";
        }else if(value=='110'){
          return "已保存";
        }else if(value=='112'){
          return "已删除";
        }else{
          return "-";
        }
      }
    },
    methods: {
      toMoney: function (value) {
        return toMoney(value)
      },
      initTable : function () {

        var that = this;
        that.$utils.ajax(that)(basePath2+'modifyService',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data.data;
            that.recordsTotal = response.body.data.recordsTotal;
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
      before : function () {
        if(parseInt(this.searchParams.start)>0){
          this.jumpNum=this.jumpNum-1;
          this.searchParams.start = parseInt(this.searchParams.start)-parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      next : function () {
        if(parseInt(this.end) < parseInt(this.recordsTotal)) {
          this.jumpNum=this.jumpNum+1;
          this.searchParams.start = parseInt(this.searchParams.start)+parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      first : function(){
        if(this.newPageSize>0){
          this.searchParams.start = 0;
          this.jumpNum=1;
          this.initTable()
        }
      },
      final : function(){
        if(this.newPageSize>0){
          this.searchParams.start = this.searchParams.length*(this.newPageSize-1);
          this.jumpNum=this.newPageSize;
          this.initTable()
        }
      },
      jump : function (pageNo) {
        this.jumpNum=pageNo;
        this.searchParams.start = (pageNo-1) * parseInt(this.searchParams.length);
        this.initTable()
      },
      search : function () {
        this.searchParams.start = 0
        this.initTable()
      },
      resetSearch : function () {
        this.searchParams.orderNum = ""
      },
      getNum : function(index){
        //计算序号
        return parseInt(this.startNum) + parseInt(index);
      },

      // 后加的
      closeWin : function () {
        this.clearWin()
        this.isWinShow = false;
      },
      openWin : function (item) {
        this.isWinShow = true;
        this.initTeamManagers(item.orderNum);
        this.initSales(item.orderNum);
        this.initServices(item.orderNum);
        this.initParams(item);
      },
      clearWin : function () {
        this.params.orderNum = "";
        this.params.teamManagerNo = "";
        this.params.teamManagerName = "";
        this.params.serviceNo = "";
        this.params.serviceName = "";
        this.params.salesmanNo = "";
        this.params.salesmanName = "";
        this.options.teamManagers = [];
        this.options.sales = [];
        this.options.services = [];
        this.errors.clear();
      },
      initParams: function (item) {
        this.params.orderNum = item.orderNum?item.orderNum:"";
        this.params.teamManagerNo = item.teamManagerEmpno;
        this.params.teamManagerName = item.teamManager;
        this.params.serviceNo = item.customServiceEmpno?item.customServiceEmpno:"";
        this.params.serviceName = item.customService?item.customService:"";
        this.params.salesmanNo = item.salesmanEmpno?item.salesmanEmpno:"";
        this.params.salesmanName = item.salesman?item.salesman:"";
      },
      initTeamManagers: function (orderNum) {
        var that = this;
        var myParams = {};
        myParams.orderNum = orderNum;
        that.$utils.ajax(that)(basePath2+'team/manager/options',myParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.teamManagers = response.body.data;
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
      initSales: function (orderNum) {
        var that = this;
        var myParams = {};
        myParams.orderNum = orderNum;
        that.$utils.ajax(that)(basePath2+'team/sale/options',myParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.sales = response.body.data;
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
      initServices: function (orderNum) {
        var that = this;
        var myParams = {};
        myParams.orderNum = orderNum;
        that.$utils.ajax(that)(basePath2+'team/service/options',myParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.services = response.body.data;
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
      callback_0: function (value, text) {
        this.params.teamManagerNo = value;
        this.params.teamManagerName = text;
      },
      callback_1: function(value, text){
        this.params.serviceNo = value;
        this.params.serviceName = text;
      },
      callback_2: function(value, text){
        this.params.salesmanNo = value;
        this.params.salesmanName = text;
      },
      update: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'modifyService', that.params, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            debugger
            that.closeWin();
            that.initTable();
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
            that.$utils.alert(response.body.message)
            that.closeWin();
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"put");
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.orderNum', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },

    mounted: function () {
      //初始加载查询方法
      this.initTable();
      this.watchSearchParams();
    }
  }
</script>
<style>
  table td{
    word-wrap:break-word;word-break:break-all;
    white-space:normal;
  }
  .win{
    position: fixed;z-index: 2050!important;top: 100px;right: 0;bottom: 0;left: 0;overflow: auto;
  }
</style>
