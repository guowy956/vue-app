<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>申请单列表</h5>
            </div>
            <div class="ibox-content">
              <table class="table table-bordered" style="table-layout:fixed;">
                <thead>
                <tr>
                  <th style="width: 4%">序号</th>
                  <th style="width: 15%">申请编号</th>
                  <th style="width: 13%">产品名称</th>
                  <th style="width: 8%">费率</th>
                  <th>订单状态</th>
                  <th>申请人员</th>
                  <th>申请金额</th>
                  <th style="width: 6%">销售人员</th>
                  <th style="width: 6%">团队经理</th>
                  <th>贷款用途</th>
                  <th style="width: 5%">客服</th>
                  <th style="width: 6%">申请期限</th>
                  <th>申请时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in items">
                  <td>{{ getNum(index) }}</td>
                  <!--<router-link :to="'/ShowList/' + $route.params.groupId + '/' + item.id">-->
                  <!--<div class="col-md-3">-->
                  <!--<a data-toggle="collapse" class="faq-question">-->
                  <!--{{ item.subject }}-->
                  <!--</a>-->
                  <!--<p class="time-p"><i class="fa fa-clock-o"></i> {{ item.createTime }}</p>-->
                  <!--</div>-->
                  <!--</router-link>-->
                  <td>
                    <router-link :to="'/financialForm/list1/'+item.orderNum+'/'+item.proposer +'/'+item.status">
                      <a>{{ item.orderNum}}</a>
                    </router-link>
                  </td>
                  <td>{{ item.productName}}</td>
                  <td v-if="item.expenseRate">{{ item.expenseRate}}%</td>
                  <td v-if="!item.expenseRate"></td>
                  <td>{{ item.status | convertStatus }}</td>
                  <td>{{ item.proposer }}</td>
                  <td v-if="item.expectAmount">{{ toMoney(item.expectAmount) }}元</td>
                  <td v-if="!item.expectAmount"></td>
                  <td>{{ item.salesman==null ? '--':item.salesman }}</td>
                  <td>{{ item.teamManager==null ? '--':item.teamManager }}</td>
                  <td>{{ item.purpose==null ? '--':item.purpose }}</td>
                  <td>{{ item.customService==null ? '--':item.customService }}</td>
                  <td>{{ item.term }}</td>
                  <td>{{ item.applicationTime }}</td>
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
  import '../../static/js/plugins/datapicker/bootstrap-datepicker.js';

  export default {
    name: 'ApplyList',
    data :function () {
      return {
        newPageSize:0,
        startNum : 1,
        jumpNum : 1,
        items : [],
        recordsTotal : 0,
        searchParams : {
          status : '000',
          start : 0,
          length : 10
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
        that.$utils.ajax(that)(basePath2+'order',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            //debugger
            that.items = response.body.data.data;
            //console.log(that.items);
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
      getNum : function(index){
        //计算序号
        return parseInt(this.startNum) + parseInt(index);
      }
    },

    mounted: function () {
      //初始加载查询方法
      this.initTable();
    }
  }
</script>
<style>
  table td{
    word-wrap:break-word;word-break:break-all;
    white-space:normal;
    }
</style>
