<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title" >
              <h5>客户搜索情况表</h5>
            </div>
            <div class="ibox-content">
              <form id="searchForm" href="#">
                <!--<div class="row aa" >-->
                  <!--<div class="col-sm-3" v-for="(item,index) in queryColumnsItems">-->
                    <!--<span>{{item.columnName}}:</span>-->
                    <!--<input type="text"  :id="item.columnCode"  class="selectInput" :name="item.columnCode"  @click='time_click(item.columnCode)' />-->
                  <!--</div>-->
                <!--</div>-->
                <div class="row aa">
                  <div class="col-sm-3 searchMargin" > <span>银行三方账户:</span>
                    <select2 :options="options.businessType" v-model="reportSearchParams.businessType" style="width: 53%"
                             @myclick=""></select2>
                  </div>
                  <div class="col-sm-3 searchMargin" v-if="field.field_1"> <span>客户姓名:</span>
                    <input type="text" class="selectInput" v-model="reportSearchParams.customerName">
                  </div>
                  <div class="col-sm-3 searchMargin"v-if="field.field_2"> <span>身份证号:</span>
                    <input type="text" class="selectInput" v-model="reportSearchParams.idCard">
                  </div>
                  <div class="col-sm-3 searchMargin" v-if="field.field_3"> <span>进件编号:</span>
                    <input type="text" class="selectInput" v-model="reportSearchParams.loanCode">
                  </div>
                  <div class="col-sm-3 searchMargin" v-if="field.field_4">
                    <span>产品名称:</span>
                    <select2 :options="options.productNameList" v-model="reportSearchParams.lendProductName" @myMethod="callbackPName">
                    </select2>
                  </div>

                  <div class="col-sm-3 searchMargin orderS" v-if="field.field_5"> <span>订单状态:</span>
                    <select2 :options="options.loanstatus" v-model="reportSearchParams.status"
                    @myclick="callbackStatus"></select2>
                  </div>
                  <div class="col-sm-3 searchMargin"v-if="field.field_9"> <span>&nbsp;&nbsp;&nbsp;&nbsp;营业部:</span>
                    <select2 :options="options.orgs" v-model="reportSearchParams.loanStoreId"></select2>
                  </div>
                  <div class="col-sm-3 searchMargin" v-if="field.field_10"> <span>客户经理:</span>
                    <input type="text" class="selectInput" v-model="reportSearchParams.customerManager">
                  </div>
                  <div class="col-sm-3 searchMargin" v-if="field.field_11"> <span>逾期期数:</span>
                    <select2 :options="options.overduePeriodsList" v-model="reportSearchParams.overduePeriods"
                             @myclick="callbackOverduePeriods"></select2>
                  </div>
                  <div class="col-sm-3 searchMargin orderS" v-if="field.field_13"> <span>交易状态:</span>
                    <select2 :options="options.transactionStatus"
                             @myclick="" v-model="reportSearchParams.dealStatus"></select2>
                  </div>
                  <div class="col-sm-3 searchMargin orderS" v-if="field.field_14"> <span>交易结果:</span>
                    <select2 :options="options.transactionResult"
                             @myclick="" v-model="reportSearchParams.dealResult"></select2>
                  </div>
                  <div class="col-sm-3 searchMargin" v-show="field.field_6">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;还款日:</span>
                    <!--<input type="text" class="selectInput" id="repaymentDateSelect2">-->
                    <select2 :options="options.repaymentDateList"
                             @myclick="" v-model="reportSearchParams.repaymentDate"></select2>
                  </div>
                  <div class="col-sm-12">
                    <div class="col-sm-3 searchMargin" v-show="field.field_7">
                      <span>签约日期:</span>
                      <input type="text" class="selectInput" id="signingStartDate">
                    </div>
                    <div class="col-sm-3 searchMargin" v-show="field.field_7">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至:</span>
                      <input type="text" class="selectInput" id="signingEndDate">
                    </div>
                    <div class="col-sm-3 searchMargin" v-show="field.field_8">
                      <span>放款时间:</span>
                      <input type="text" class="selectInput" id="actualRepaymentStartDate">
                    </div>
                    <div class="col-sm-3 searchMargin" v-show="field.field_8">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至:</span>
                      <input type="text" class="selectInput" id="actualRepaymentEndDate">
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="col-sm-3 searchMargin" v-show="field.field_12">
                      <span>交易时间:</span>
                      <input type="text" class="selectInput" id="transaction_start_time">
                    </div>
                    <div class="col-sm-3 searchMargin" v-show="field.field_12">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至:</span>
                      <input type="text" class="selectInput" id="transaction_end_time">
                    </div>
                    <div class="col-sm-3 searchMargin" v-show="field.field_15">
                      <span>订单完成时间:</span>
                      <input type="text" class="selectInput" id="order_start_time" style="width: 53%">
                    </div>
                    <div class="col-sm-3 searchMargin" v-show="field.field_15">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至:</span>
                      <input type="text" class="selectInput" id="order_end_time">
                    </div>
                  </div>
                </div>
                <div class="row aa">
                  <p class='btn btn-primary' @click='initTable'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                  <span v-for="re in reportInfo">
                    <a :href="exportXLS" target="_blank" v-if="re == 2">
                    <button type="button" class="btn btn-info">导出</button>
                  </a>
                  </span>
                </div>
              </form>
            </div>
            <div class="ibox float-e-margins">
              <div class="ibox-content">
                <div style="overflow-x:auto;">
                  <table class="table table-bordered">
                    <thead>
                    <tr class="firstTr" >
                      <th v-for="(item,index) in reportInfoItems">
                        <div>
                        {{reportInfoItems[index].columnName}}
                        </div>
                      </th>
                      <th>
                        操作
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in columnNamesL" class="odd">
                      <td v-for="items in item">
                        {{showFild(items)=="undefined"? "" :showFild(items)}}
                      </td>
                      <td>
                        <span v-for="re in reportInfo">
                          <button v-if="re == 1" class="btn btn-primary"@click="huaKou(item,index)" :disabled="!show && timerIndex==index ">
                            <span v-show="show || timerIndex!=index" >划扣</span>
                            <span v-show="!show && timerIndex==index" class="count">{{count}} s</span>
                          </button>
                          </span>
                        <p class='btn btn-primary' @click='toDetail(item)'>详情</p>
                      </td>
                    </tr>
                    <tr>

                    </tr>
                  </table>
                  </tbody>
                </div>

                <div class="row">
                  <div class="dataTables_info col-sm-5">
                    显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项
                  </div>
                  <div class="dataTables_paginate paging_simple_numbers col-sm-7" style="text-align:right;">
                    <ul class="pagination">
                      <li class="paginate_button previous"><a @click="first()">首页</a></li>
                      <li style="width: 11%" v-if="showFirst">
                        <a @click="before()">
                          上一页</a>
                      </li>
                      <li class="paginate_button" v-for="index in indexs" :class="{ 'active': cur == index}">
                        <a @click="btnClick(index)">{{index}}</a>
                      </li>
                      <li style="width: 11%" v-if="showLast"><a @click="next()">下一页</a></li>
                      <li class="paginate_button next"><a>共<i>{{all}}</i>页</a></li>
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
    <div class="modal-backdrop fade in" style="display: none"></div>
    <div class="modal inmodal in" tabindex="-1" id="win1"> 
      <div class="modal-dialog modal-lg" style="width: 87%"> 
        <div class="modal-content"> 
          <div class="modal-header"> 
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true"
                                                                           @click="closeWin1()">×</span><span
              class="sr-only">Close</span> 
            </button>
              <h4 class="modal-title">还款明细</h4> 
          </div>
           
          <div class="modal-body">  <p> 

            <div class="col-sm-9" id="wrap">
              <div id="tit">
                <!--tab选项-->
                <span class="tabShow" :class="index == 0 ? 'actives' : ''" v-for="(showItem, index) in showList" @click="tabChange()">
                      <a style="color: #666">
                          {{showItem.name}}
                      </a>
                    </span>
              </div>
              <ul id="con">
                <!--tab选项所对应内容-->
                <li :style="index == 0 ? 'display: block' : 'display: none'" v-for="(showItem, index) in showList">
                  <label class="titleDistance">
                        <div v-if="showItem.id==1">
                          <table class="table table-bordered" style="text-align: center !important;"> 
                            <thead> 
                            <tr> 
                              <th style="width: 4%">序号</th>
                               
                              <th>期数</th>
                               
                              <th>应还总额</th>
                               
                              <th>已还总额</th>
                               
                              <th>逾期欠款</th>
                               
                              <th>应还本金</th>
                               
                              <th>应还利息</th>
                               
                              <th>应还违约金</th>
                               
                              <th>应还罚息</th>
                               
                              <th>已还本金</th>
                               
                              <th>已还利息</th>
                               
                              <th>已还违约金</th>
                               
                              <th>已还罚息</th>
                               
                              <th>状态</th>
                               
                              <th>交易时间</th>
                               
                              <th>还款时间</th>
                               
                            </tr>
                             
                            </thead>
                             
                            <tbody> 
                            <tr v-for="(item,index) in itemsDetail"> 
                              <td>{{ getNum(index) }}</td>
                               
                              <td>{{ item.period }}</td>
                               
                              <td>{{ item.planRepaymentTotal }}</td>
                               
                              <td>{{ item.actualRepaymentTotal }}</td>
                               
                              <td>{{ item.currentPeriodOverdueTotal }}</td>
                               
                              <td>{{ item.planRepaymentPrincipal }}</td>
                               
                              <td>{{ item.planRepaymentInterest }}</td>
                               
                              <td>{{ item.penaltyMoney }}</td>
                               
                              <td>{{ item.penaltyInterest }}</td>
                               
                              <td>{{ item.actualPrincipal }}</td>
                               
                              <td>{{ item.actualInterest }}</td>
                               
                              <td>{{ item.actualPenalty }}</td>
                               
                              <td>{{ item.actualPenaltyInterest }}</td>
                               
                              <td>{{ item.statusDesc }}</td>
                               
                              <td>{{ item.currentActualTime }}</td>
                               
                              <td>{{ item.currentEndDate }}</td>
                               
                            </tr>
                             
                            </tbody>
                             
                          </table>
                        </div>
                        <div v-if="showItem.id==2">
                        <table class="table table-bordered" style="text-align: center !important;"> 
                          <thead> 
                          <tr> 
                            <th style="width: 4%">序号</th>
                             
                            <th>交易金额</th>
                             
                            <th>交易时间</th>
                             
                            <th>减免金额</th>
                             
                            <th>交易类型</th>
                             
                            <th>支付流水号</th>
                             
                            <th>交易结果</th>
                             
                            <th>失败原因</th>
                             
                            <th>还款性质</th>
                             
                            <th>提报系统</th>
                             
                            <th>提报组织</th>
                             
                          </tr>
                           
                          </thead>
                           
                          <tbody> 
                          <tr v-for="(item,index) in itemsJournal"> 
                            <td>{{ getNum(index) }}</td>
                             
                            <td>{{ item.repaymentTotalMoney }}</td>
                             
                            <td>{{ item.repaymentDate }}</td>
                             
                            <td>{{ item.relieveMoney }}</td>
                             
                            <td>{{ item.transactionFlowType }}</td>
                             
                            <td>{{ item.paySeriaNo }}</td>
                             
                            <td>{{ item.status }}</td>
                             
                            <td>{{ item.statusDesc }}</td>
                             
                            <td>{{ item.repaymentProperty }}</td>
                             
                            <td>{{ item.forwardSystem }}</td>
                             
                            <td>{{ item.forwardOrg }}</td>
                             
                          </tr>
                           
                          </tbody>
                           
                        </table></div>
                        <div v-if="showItem.id==3">3</div>
                  </label>
                </li>
              </ul>
            </div>



              <h4 class="modal-title" style="text-align: center"></h4> 

                     </p> 
          </div>
           
          <div class="modal-footer"> 
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin1()">关闭</button>
             
          </div>
           
        </div>
         
      </div>
       
    </div>

    <div class="modal inmodal in" tabindex="-1" id="win2"> 
      <div class="modal-dialog modal-lg"> 
        <div class="modal-content"> 
          <div class="modal-header"> 
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
              class="sr-only">Close</span> 
            </button>
              <h4 class="modal-title">还款流水</h4> 
          </div>
           
          <div class="modal-body">  <p> 
            <table class="table table-bordered" style="text-align: center !important;"> 
              <thead> 
              <tr> 
                <th style="width: 4%">序号</th>
                 
                <th>交易金额</th>
                 
                <th>交易时间</th>
                 
                <th>减免金额</th>
                 
                <th>交易类型</th>
                 
                <th>支付流水号</th>
                 
                <th>交易结果</th>
                 
                <th>失败原因</th>
                 
                <th>还款性质</th>
                 
                <th>冲账结果</th>
                 
                <th>提报系统</th>
                 
                <th>提报组织</th>
                 
              </tr>
               
              </thead>
               
              <tbody> 
              <tr v-for="(item,index) in items"> 
                <td>{{ getNum(index) }}</td>
                 
                <td>{{ item.repaymentTotalMoney }}</td>
                 
                <td>{{ item.repaymentDate }}</td>
                 
                <td>{{ item.relieveMoney }}</td>
                 
                <td>{{ item.transactionFlowType }}元</td>
                 
                <td>{{ item.paySeriaNo }}</td>
                 
                <td>{{ item.status }}</td>
                 
                <td>{{ item.statusDesc }}</td>
                 
                <td>{{ item.repaymentProperty }}</td>
                 
                <td>成功，失败</td>
                 
                <td>{{ item.forwardSystem }}</td>
                 
                <td>{{ item.forwardOrg }}</td>
                 
              </tr>
               
              </tbody>
               
            </table>
              </p> 
          </div>
           
          <div class="modal-footer"> 
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin2()">关闭</button>
          </div>
           
        </div>
         
      </div>
       
    </div>


  </div>
</template>
<script>
  //select2-引入select2组件
  import select2 from './common/select2/select2_List.vue';
  var vm
  const TIME_COUNT = 5;
  export default {
    name: 'customerSearch',
    components: {//select2-定义select2在当前组件中的名称
      'select2': select2,
    },
    data:function () {
      return {
        show: true,
        count: '',
        timer: null,
        timerIndex:0,
        //timer: 10,       //默认倒数30秒
        stop : false,   //默认是停止的，但界面加载之后会变成false
        Interval:null,  //setInterval的对象
        btnName:"划扣",
        showList:[{
            child:"1",
            id:"1",
            name :"还款明细"
        },{
          child:"2",
          id:"2",
          name :"还款流水"
        },{
          child:"3",
          id:"3",
          name :"合同跟踪"
        }],
        used: "",
        left: "",
        exportFlag: "0",
        reportInfo: [],
        reportInfoItems:[],
        queryColumnsItems:[],
        columnNames:"",
        columnNamesL:[],
        all: 0, //总页数
        cur: 1, //当前页码
        newPageSize:0,
        startNum:1,
        jumpNum:1,
        productList:[],
        items: [],
        itemsDetail: [],  //还款明细
        itemsJournal: [], //还款流水
        items: [],
        isFuyi:{"false":"否","true":"是"},
        recordsTotal: 0,
        field:{
          field_1:false,
          field_2:false,
          field_3:false,
          field_4:false,
          field_5:false,
          field_6:false,
          field_7:false,
          field_8:false,
          field_9:false,
          field_10:false,
          field_11:false,
          field_12:false,
          field_13:false,
          field_14:false,
          field_15:false,
        },
        searchParams: {
          productName: "",
          start: 0,
          length: 10,
          status: "000",
          orderType: "000",
          startApprovalTime: "",
          endApprovalTime: "",
          productName: "",
          orderNum: "",
          proposer: "",
          idNum: "",
          salesman: "",
          phone: ""
        },
        withholdSearchParams:{
          loanCode: "",
          repayDate: "",
        },
        reportSearchParams:{
          businessType: "",
          customerName: "",
          idCard: "",
          loanCode: "",
          lendProductName: "",
          status: "",
          repaymentDate: "",
          signingDate: "",
          actualRepaymentDate: "",
          loanStoreId: "",
          customerManager: "",
          overduePeriods: "",
          curPage: 0,
          limit: 10,
          actualRepaymentEndDate: "",
          actualRepaymentStartDate: "",
          signingEndDate: "",
          signingStartDate: "",
          order_start_time:"",
          order_end_time:"",
          transaction_start_time:"",
          transaction_end_time:"",
          dealStatus:"",
          dealResult:"",
        },
        detailParams: {
          loanCode: "",
        },
        streamParams: {
          loanCode: "", dealDate: "",
        },
        labels: {
          cancel: "取消",
          finish: "完成",
          next: "下一步",
          previous: "上一步"
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          examine: false
        },
        options:{
          loanstatus: [],
          orderType: [
            { id: '', text: '全部' },
            { id: '1', text: '银谷普惠' },
            { id: '2', text: '云钱袋' },
          ],
          businessType: [
            { id: '', text: '全部' },
            { id: '1', text: '三方' },
            { id: '2', text: '银行' },
          ],
          productNameList:[
            { id: '', text: '全部' },
          ],
          transactionStatus:[
            { id: '', text: '全部' },
            { id: '1', text: '待交易' },
            { id: '2', text: '交易中' },
            { id: '3', text: '已交易' },
          ],
          transactionResult:[
            { id: '', text: '全部' },
            { id: '1', text: '成功' },
            { id: '2', text: '失败' },
          ],
          orgs: [],
          overduePeriodsList:[],
          repaymentDateList:[],
        },

      }
    },
    computed: {
      exportXLS: function () {
        var accessToken = this.$utils.getLocalData("accessToken");
        if(!accessToken){
          this.$utils.clearLocalData("accessToken");
          this.$utils.clearLocalData("orgData");
          this.$utils.clearLocalData("hrData");
          this.$parent.$emit('changeLogin', 'N');
          return false;
        }

        var url = basePath2 + 'download/exportCustomerSearch?curPage='+this.reportSearchParams.curPage+"&limit="+this.reportSearchParams.limit;
        if(this.reportSearchParams.customerName){
          url += "&customerName="+this.reportSearchParams.customerName;
        }
        if(this.reportSearchParams.idCard){
          url += "&idCard="+this.reportSearchParams.idCard;
        }
        if(this.reportSearchParams.loanCode){
          url += "&loanCode="+this.reportSearchParams.loanCode;
        }
        if(this.reportSearchParams.lendProductName){
          url += "&lendProductName="+this.reportSearchParams.lendProductName;
        }
        if(this.reportSearchParams.status){
          url += "&status="+this.reportSearchParams.status;
        }
        if(this.reportSearchParams.repaymentDate){
          url += "&repaymentDate="+this.reportSearchParams.repaymentDate;
        }
        if(this.reportSearchParams.signingDate){
          url += "&signingDate="+this.reportSearchParams.signingDate;
        }
        if(this.reportSearchParams.actualRepaymentDate){
          url += "&actualRepaymentDate="+this.reportSearchParams.actualRepaymentDate;
        }
        if(this.reportSearchParams.loanStoreId){
          url += "&loanStoreId="+this.reportSearchParams.loanStoreId;
        }
        if(this.reportSearchParams.customerManager){
          url += "&customerManager="+this.reportSearchParams.customerManager;
        }
        if(this.reportSearchParams.overduePeriods){
          url += "&overduePeriods="+this.reportSearchParams.overduePeriods;
        }
        if(this.reportSearchParams.actualRepaymentEndDate){
          url += "&actualRepaymentEndDate="+this.reportSearchParams.actualRepaymentEndDate;
        }
        if(this.reportSearchParams.actualRepaymentStartDate){
          url += "&actualRepaymentStartDate="+this.reportSearchParams.actualRepaymentStartDate;
        }
        if(this.reportSearchParams.signingEndDate){
          url += "&signingEndDate="+this.reportSearchParams.signingEndDate;
        }
        if(this.reportSearchParams.signingStartDate){
          url += "&signingStartDate="+this.reportSearchParams.signingStartDate;
        }
        url += "&accessToken="+accessToken;
        return url;
      },
      indexs: function(index) {
        var left = 1;
        var right = this.all;
        var ar = [];
        if (this.all >= 11) {
          if (this.cur > 5 && this.cur < this.all - 4) {
            left = this.cur - 5;
            right = this.cur + 4;
          } else {
            if (this.cur <= 5) {
              left = 1;
              right = 10;
            } else {
              right = this.all;
              left = this.all - 9;
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      },
      showLast: function() {
        if (this.cur == this.all) {
          return false
        }
        return true
      },
      showFirst: function() {
        if (this.cur == 1) {
          return false
        }
        return true
      }  ,
      end: function () {
        var res = parseInt(this.reportSearchParams.curPage) + parseInt(this.reportSearchParams.limit)
        if (res > this.recordsTotal) {
          res = this.recordsTotal
        }
        return res
      },
      pageSize: function () {
        var a = parseInt(this.recordsTotal / this.reportSearchParams.limit)
        var b = a + 1
        this.newPageSize=this.recordsTotal % this.reportSearchParams.limit == 0 ? a : b
        return this.newPageSize;
      },
      startNum: function () {
        if(this.recordsTotal==0){
          return 0;
        }else{
          return this.reportSearchParams.curPage+1
        }
      }
    },
    filters:{
      //转换订单状态
      convertStatus : function(value){
        if(value=='400'){
          return "信审通过";
        }else if(value=='500'){
          return "订单超时";
        }else if(value=='510'){
          return "放弃签约";
        }else if(value=='600'){
          return "确认金额";
        }else if(value=='610'){
          return "待签约";
        }else if(value=='620'){
          return "已签约";
        }else{
          return "-";
        }
      },
      covertSource : function(value){
        if(value=='0' || value=='1' || value==null){
          return "信审通过";
        }else if(value=='2') {
          return "LoanApp";
        }else if(value=='3'){
          return "新银谷普惠运营系统";
        }else {
          return "--";
        }
      },
      convertOrderType : function(value){
        if(value=='1'){
          return "银谷普惠";

        }else if(value=='2'){
          return "云钱袋";
        }else{
          return "--";
        }
      },

    },
    methods: {
      showFild:function(item){
        return item.split("__")[0];
      },
      tabChange: function () {
        var that  = this;
        $('#tit span').click(function() {
          var i = $(this).index();
          that.flag = i;
          $(this).addClass('actives').siblings().removeClass('actives');
          $('#con li').eq(i).show().siblings().hide();
        });
      },
      huaKou(item,index){
        if (!this.timer) {
          this.xxxxx(item);
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
              this.timerIndex = index;
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      xxxxx: function (item) {
        var that = this;
        that.withholdSearchParams.loanCode = "";
        that.withholdSearchParams.repayDate = "";
        console.log(item);
        for (var i = 0; i < item.length; i++) {
          if (item[i].split("__")[1] == "loanCode") {
            that.withholdSearchParams.loanCode = item[i].split("__")[0]
          }
          if (item[i].split("__")[1] == "repaymentEndDate") {
            that.withholdSearchParams.repayDate = item[i].split("__")[0]
          }
        }
      that.$utils.ajax(that)(basePath2+'/afterLoanCustomerSearch/customerSearchWithhold', that.withholdSearchParams, function (response) {
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
          that.$utils.alert(response.body.message)
          that.initReportInfo();
          that.initTable();
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
      switchSelect:function(index){
//        1客户姓名 2身份证号 3进件编号 4产品名称 5订单状态 6还款日 7签约日期 8放款日期 9营业部 10客户经理 11逾期期数 12订单完成时间 13交易时间 14交易状态 15交易结果
//        客户姓名 身份证号 进件编号 产品名称 订单状态 还款日 营业部 客户经理 逾期期数 订单完成时间 交易时间 交易状态 交易结果 签约开始时间 签约结束时间 放款开始时间 放款结束时间
        var that = this;
        switch (index){
          case "客户姓名":
            that.field.field_1 = true;
            break;
          case "身份证号":
            that.field.field_2 = true;
            break;
          case "进件编号":
            that.field.field_3 = true;
            break;
          case "产品名称":
            that.field.field_4 = true;
            break;
          case "订单状态":
            that.field.field_5 = true;
            break;
          case "还款日":
            that.field.field_6 = true;
            break;
          case "签约开始时间":
            that.field.field_7 = true;
            break;
          case "签约结束时间":
            that.field.field_7 = true;
            break;
          case "放款开始时间":
            that.field.field_8 = true;
            break;
          case "放款结束时间":
            that.field.field_8 = true;
            break;
          case "营业部":
            that.field.field_9 = true;
            break;
          case "客户经理":
            that.field.field_10 = true;
            break;
          case "逾期期数":
            that.field.field_11 = true;
            break;
          case "订单完成时间":
            that.field.field_15 = true;
            break;
          case "交易时间":
            that.field.field_12 = true;
            break;
          case "交易状态":
            that.field.field_13 = true;
            break;
          case "交易结果":
            that.field.field_14 = true;
            break;
        }
      },
      initReportInfo:function(){
          var that = this;
          that.$utils.ajax(that)(basePath2+'reportInfo/roleId', {}, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
              that.reportInfoItems = response.body.data.resultColumns;
              that.queryColumnsItems = response.body.data.queryColumns;
              that.reportInfo = response.body.data.reportInfo.operation.split(",");
              for(var i = 0 ;i<that.queryColumnsItems.length; i++){
                var columnName = that.queryColumnsItems[i].columnName;
                that.switchSelect(columnName);
              }
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
      toMoney: function (value) {
        return toMoney(value)
      },
      replaceAll:function(str){
        if(str!=null)
        str = str.replace(/}{/g,',')
        return str;
        },
      openWin1: function () {
        $('#win1').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      }, openWin2: function () {
        $('#win2').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      }, closeWin1: function () {
        $('#win1').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      }, closeWin2: function () {
        $('#win2').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
//      还款明细
      toDetail: function (item) {
        var customerName ="";
        var customerIDCard ="";
        var loanCode = "";
        var actualRepaymentDate = "";
        if (item){
          for(var  i =0;i<item.length;i++) {
            if (item[i].split("__")[1] == "loanCode" && item[i].split("__")[1] !="undefined" ) {
              loanCode = item[i].split("__")[0];
            }
            if (item[i].split("__")[1] == "customerName" && item[i].split("__")[1] !="undefined" ) {
              customerName = item[i].split("__")[0];
            }
            if (item[i].split("__")[1] == "customerIDCard" && item[i].split("__")[1] !="undefined" ) {
              customerIDCard = item[i].split("__")[0];
            }if (item[i].split("__")[1] == "actualRepaymentDate" && item[i].split("__")[1] !="undefined" ) {
              actualRepaymentDate = item[i].split("__")[0];
            }
          }
//          var url = "/#/customerDetail/"+loanCode+"/"+customerName+"/"+customerIDCard+"/"+dealDate;
//          window.location.href = url;
          var url = "/customerDetail/"+loanCode+"/"+customerName+"/"+(isNull(customerIDCard) ? "-" : customerIDCard)+"/"+actualRepaymentDate;
          this.$router.push(url);
        }else {
          alert("item is empty");
        }
      },
      initOrgs: function () {//select2-初始化option
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'org/options', {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.orgs = response.body.data;
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
      initTable: function () {
          var that = this;
          that.$utils.ajax(that)(basePath2+'afterLoanCustomerSearch/list', that.reportSearchParams, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
              that.columnNamesL =[];
              that.items = response.body.data.rows;
              for(var i = 0 ;i<that.items.length; i++){
                  var columnBase = [];
                  for(var j = 0 ;j<that.reportInfoItems.length; j++){
                    var columnCodes = that.reportInfoItems[j].columnCode;
                    that.columnNames = that.items[i][columnCodes];
                    columnBase.push(that.columnNames+"__"+columnCodes);
                  }
                that.columnNamesL.push(columnBase);

              }
              that.recordsTotal = response.body.data.total;
              var t = parseInt(that.recordsTotal % that.reportSearchParams.limit)
              if (t == 0){
                that.all = parseInt(that.recordsTotal / that.reportSearchParams.limit);
              } else {
                that.all = parseInt(that.recordsTotal / that.reportSearchParams.limit) + 1;
              }
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
          },"post");
      },
      btnClick: function(items) { //页码点击事件
        debugger
        if (items != this.cur) {
          this.cur = items
        }
        this.reportSearchParams.curPage = (items-1) * parseInt(this.searchParams.length);
        this.initTable()
      },
      before : function () {
        var that = this;
        that.cur--;
        that.btnClick(that.cur--);
      },
      next : function () {
        var that = this;
        that.cur++;
        that.btnClick(that.cur++);
      },
      first : function(){
        if(this.all>0){
          this.reportSearchParams.curPage = 0;
          this.cur=1;
          this.initTable()
        }
      },
      final : function(){
        if(this.all>0){
          this.reportSearchParams.curPage = this.reportSearchParams.limit*(this.all-1);
          this.cur=this.all;
          this.initTable()
        }
      },
      jump : function (pageNo) {
        this.jumpNum=pageNo;
        this.reportSearchParams.curPage = (pageNo-1) * parseInt(this.reportSearchParams.limit);
        this.initTable()
      },
      getNum : function(index){
        //计算序号
        return parseInt(this.startNum) + parseInt(index);
      },
      //查询产品种类
      queryProduct : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'product/all',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var values = response.body.data;
            if(values){
              $(values).each(function (i, item) {
                var value = {};
//                value.id = item.productCode;
                value.id = item.productName;
                value.text = item.productName;
                that.options.productNameList.push(value);
              });
            }
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
      //查询订单状态
      loanStatusList : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'afterLoanCustomerSearch/loanStatusList', {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.loanstatus = response.body.data;
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
      //重置查询条件
      resetSearch : function(){
        $('.selectInput').val('');
        $('.select-container').find(".select2-chosen").text("");
        this.reportSearchParams.businessType = '';
        this.reportSearchParams.idCard = '';
        this.reportSearchParams.customerName = '';
        this.reportSearchParams.loanCode = '';
        this.reportSearchParams.lendProductName = '';
        this.reportSearchParams.status = '';
        this.reportSearchParams.repaymentDate = '';
        this.reportSearchParams.signingStartDate = '';
        this.reportSearchParams.signingEndDate = '';
        this.reportSearchParams.actualRepaymentStartDate = '';
        this.reportSearchParams.actualRepaymentEndDate = '';
        this.reportSearchParams.loanStoreId = '';
        this.reportSearchParams.customerManager = '';
        this.reportSearchParams.overduePeriods = '';
        this.reportSearchParams.dealStatus = '';
        this.reportSearchParams.dealResult = '';

      },
      callbackOverduePeriods: function(value){
        this.reportSearchParams.overduePeriods = value;
      },
      callbackStatus: function(value){
        this.reportSearchParams.status = value;
      },
      callbackPName: function(value){
        this.reportSearchParams.lendProductName = value;
      },
      callbackOrderType: function(value){
        this.reportSearchParams.orderType = value;
      },
      setOverduePeriodsList: function(value){
        this.options.overduePeriodsList.push({ id: '', text: '全部' });
        for(var i=1;i<=36;i++){
          this.options.overduePeriodsList.push({ id: '' + i, text: '' + i });

        }
      },
      setRepaymentDateList: function(value){
        this.options.repaymentDateList.push({ id: '', text: '全部' });
        for(var i=1;i<=31;i++){
          this.options.repaymentDateList.push({ id: '' + i, text: '' + i });

        }
      },
      setSearchParamsStart: function () {
        this.reportSearchParams.curPage = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('reportSearchParams.businessType', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.idNum', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.customerName', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.idCard', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.loanCode', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
          this.$watch('reportSearchParams.lendProductName', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.status', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.repaymentDate', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.signingStartDate', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.signingEndDate', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.actualRepaymentStartDate', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.actualRepaymentEndDate', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.actualRepaymentDate', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.loanStoreId', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.customerManager', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.overduePeriods', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.transactionResult', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.transactionStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.dealStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('reportSearchParams.dealResult', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },

    mounted: function () {
      var that = this;
      that.initReportInfo();
      that.initOrgs();
      that.queryProduct();
      that.watchSearchParams();
      that.setOverduePeriodsList();
      that.setRepaymentDateList();
      that.loanStatusList();
      that.initTable();
      //交易时间--开始
      $('#transaction_start_time').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.transaction_start_time=$("#transaction_start_time").val();
        that.setSearchParamsStart();
      });
      //交易时间--结束
      $('#transaction_end_time').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.transaction_end_time=$("#transaction_end_time").val();
        that.setSearchParamsStart();
      });
      //还款日
      /*$('#repaymentDateSelect2').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.repaymentDate=$("#repaymentDateSelect2").val();
        that.setSearchParamsStart();
      });*/
      //签约日期--开始
      $('#signingStartDate').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.signingStartDate=$("#signingStartDate").val();
        that.setSearchParamsStart();
      });
      //订单完成时间--开始
      $('#order_start_time').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.order_start_time=$("#order_start_time").val();
        that.setSearchParamsStart();
      });
      //订单完成时间--结束
      $('#order_end_time').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.order_end_time=$("#order_end_time").val();
        that.setSearchParamsStart();
      });
      //签约日期--结束
      $('#signingEndDate').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.signingEndDate=$("#signingEndDate").val();
        that.setSearchParamsStart();
      });
      //还款日期开始
      $('#actualRepaymentStartDate').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.reportSearchParams.actualRepaymentStartDate=$("#actualRepaymentStartDate").val();
        that.setSearchParamsStart();
      });
      //还款日期结束
      $('#actualRepaymentEndDate').datetimepicker({
      language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    }).on('changeDate', function(ev) {
        that.reportSearchParams.actualRepaymentEndDate=$("#actualRepaymentEndDate").val();
        that.setSearchParamsStart();
      });

      //给table外面的div滚动事件绑定一个函数
      $("#tableDiv").scroll(function(){
        var left=$("#tableDiv").scrollLeft();//获取滚动的距离
        var trs=$("#tableDiv table tr");//获取表格的所有tr
        var ths=$('#tableDiv table tr:first th');//获取表头
        trs.each(function(i){
          //对每一个tr（每一行）进行处理
          // 获得每一行下面的所有的td，然后选中下标为0的，即第一列，设置position为相对定位
          //相对于父div左边的距离为滑动的距离，然后设置个背景颜色，覆盖住后面几列数据滑动到第一列下面的情况
          //如果有必要也可以设置一个z-index属性
          $(this).children().eq(0).css({"position":"relative","top":"0px","left":left,"z-index":"0","background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(1).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(2).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(3).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(4).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(5).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
        });
        ths.eq(0).css({"background-color":"#F0F0F0"});
        ths.eq(1).css({"background-color":"#F0F0F0"});
        ths.eq(2).css({"background-color":"#F0F0F0"});
        ths.eq(3).css({"background-color":"#F0F0F0"});
        ths.eq(4).css({"background-color":"#F0F0F0"});
        ths.eq(5).css({"background-color":"#F0F0F0"});
      });
    }

  }

</script>
<style>
  .searchMargin{
    margin-bottom: 10px;
  }
  .actives{
    color: #999;
    border-bottom: none;
    background-color: #fff;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  .titleDistance{
    margin-right: 10px;
  }
  .selectInput[disabled]{
    cursor: not-allowed;
    background-color: #eee;
    opacity: 1;
  }

  .page-bar .active a {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
</style>





