<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-content" style="padding-bottom: 5px">
              <div class="row aa">
                <div class="col-sm-3">
                  <span>订单编号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.orderNum">
                </div>
                <div class="col-sm-3">
                  <span>客户姓名:</span>
                  <input type="text" class="selectInput" v-model="searchParams.proposer">
                </div>
                <div class="col-sm-3">
                  <span>身份证号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.idNum" @blur='valIdNum'>
                </div>
                <div class="col-sm-3">
                  <p class='btn btn-primary' @click='initTable'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch'><i class='fa fa-paste'></i>重置</p>
                </div>
              </div>
            </div>
            <div class="ibox float-e-margins">
              <div class="ibox-content">
                <table class="table table-bordered" style="text-align: center !important;">
                   <thead>
                     <tr>
                       <th style="width: 4%">序号</th>
                       <th style="width: 15%">申请编号</th>
                       <th style="width: 13%">产品名称</th>
                       <th style="width: 8%">费率</th>
                       <th>订单状态</th>
                       <th style="width: 6%">申请人员</th>
                       <th>申请金额</th>
                       <th>贷款用途</th>
                       <th style="width: 6%">申请期限</th>
                       <th>申请时间</th>
                       <th style="width: 6%">附件数量</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr v-for="(item,index) in items">
                       <td>{{ getNum(index) }}</td>
                       <td>
                       <router-link :to="'/picList' + '/'+item.orderNum+'/'+ item.proposer+'/'+0+'/'+ 3">
                       <a>{{ item.orderNum }}</a>
                       </router-link>
                       </td>
                       <td>{{ item.productName }}</td>
                       <td v-if="item.expenseRate">{{ item.expenseRate }}%</td>
                       <td v-if="!item.expenseRate"></td>
                       <td>{{ item.status | convertStatus }}</td>
                       <td>{{ item.proposer }}</td>
                       <td v-if="item.expectAmount">{{ toMoney(item.expectAmount) }}元</td>
                       <td v-if="!item.expectAmount"></td>
                       <td>{{ item.purpose }}</td>
                       <td>{{ item.term }}</td>
                       <td>{{ item.applicationTime }}</td>
                       <td>{{ item.num }}</td>
                     </tr>
                   </tbody>
                 </table>
                <div class="row">
                  <div class="dataTables_info col-sm-5">
                    显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项
                  </div>
                  <div class="dataTables_paginate paging_simple_numbers col-sm-7" style="text-align:right;">
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
  </div>
</template>
<script>
  import Select2Async from './common/select2/select2Async.vue';
  var vm
  export default {
    name: 'PictureList',
    components: {//select2-定义select2在当前组件中的名称
      'select2Async': Select2Async
    },
    data :function () {
      return {
        newPageSize:0,
        startNum : 1,
        jumpNum : 1,
        recordsTotal: 0,
        items: [ ],
        searchParams: {
          groupId: this.$route.params.groupId,
          start: 0,
          length: 10
        },
        labels: {
          cancel: "取消",
          finish: "完成",
          next: "下一步",
          previous: "上一步"
        },
        select2Style: {//select2-style样式
          width: '67%'
        }
      }
    },
    computed: {
      end: function () {
        var res = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
        if (res > this.recordsTotal) {
          res = this.recordsTotal
        }
        return res
      },
      pageSize: function () {
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
        }else if(value=='130'){
          return "删除";
        }else{
          return "-";
        }
      }
    },
    methods: {
      toMoney: function (value) {
        return toMoney(value)
      },
      initTable: function () {
        if(this.valIdNum()){
          var that = this;
          that.$utils.ajax(that)(basePath2+'order/scanningcopy', this.searchParams, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
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
        }
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
      },
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
      //重置查询条件
      resetSearch:function(){
        $(".selectInput").val('');
        this.searchParams.orderNum="";
        this.searchParams.proposer="";
        this.searchParams.idNum="";
      }
    },
    mounted: function () {
      vm = this;
      this.initTable();
    },
    created : function () {
      /**
       * 渲染初始页面
       *      在创建App.vue时，首先调用“登录探针”接口，测试是否已登录。
       *      如果已登录则渲染首页，未登录则渲染登录页，其它情况提示“fail”
       * @type {created}
       */
      var that = this;
      that.$utils.ajax(that)(basePath2+'loginTest',that.searchParams, function (response) {
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
          that.$parent.$emit('changeLogin','Y');
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
    }

  }
</script>
<style>
  @import '/static/css/plugins/dataTables/dataTables.bootstrap.css';
  @import '/static/css/jquery-filer.css';
  @import '/static/css/jquery.filer.css';
  @import "/static/css/jquery.filer-dragdropbox-theme.css";

  .col-sm-3 table{
    text-align: center;
    margin-bottom: 0px
  }
  table td{
    padding: 5px;
  }
  label {
    color: #666666;
  }
  textarea {
    border-radius: 5px;
  }
  .wrapper {
    height: 100%;
  }
  .num {
    font-weight:bold;
    color:#337ab7;
  }
  .aa{
    text-align: center;
  }
</style>
