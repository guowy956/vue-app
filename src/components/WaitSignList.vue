<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title" >
              <h5>待签约申请单列表</h5>
            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3">
                  <span>产品名称:</span>
                  <select2 :options="productNameList" v-model="searchParams.productName" @myMethod="callbackPName">
                  </select2>
                </div>
                <div class="col-sm-3">
                  <span>订单编号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.orderNum">
                </div>
                <div class="col-sm-3">
                  <span>订单状态:</span>
                  <select2 :options="options.status" v-model="searchParams.status" @myclick="callbackStatus">
                  </select2>
                </div>
                <div class="row aa">
                  <div class="col-sm-3">
                    <span>客户姓名:</span>
                    <input type="text" class="selectInput" v-model="searchParams.proposer">
                  </div>
                </div>
              </div>

              <div class="row aa">
                <div class="col-sm-3">
                  <span>身份证号:</span>
                  <input type="text" class="selectInput idNum" v-model="searchParams.idNum" @blur='valIdNum'>
                </div>
                <div class="col-sm-3">
                  <span>销售姓名:</span>
                  <input type="text" class="selectInput" v-model="searchParams.salesman">
                </div>
                <div class="col-sm-3">
                  <span>客户电话:</span>
                  <input type="text" class="selectInput" v-model="searchParams.phone">
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-3">
                  <span>批复时间:</span>
                  <input type="text" class="selectInput" id="sDate">
                </div>
                <div class="col-sm-3">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至:</span>
                  <input type="text" class="selectInput" id="eDate">
                </div>
                <div class="col-sm-3">
                  <span>订单类型:</span>
                  <select2 :options="options.orderType" v-model="searchParams.orderType" @myclick="callbackOrderType">
                  </select2>
                </div>
                <p class='btn btn-primary' @click='initTable'><i class='fa fa-paste'></i>查询</p>
                <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
              </div>
            </div>
            <div class="ibox-title">
              <h5>复议次数</h5>
            </div>
            <div class="ibox-content" style="padding-bottom: 3px">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">已使用次数:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{used}}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">剩余次数:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{left}}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox float-e-margins">
              <div class="ibox-content">
              <!--如果冻结列不好使，给tableDiv也设置一个position:relative;-->
              <div id="tableDiv" style="overflow-x:auto;">
                <table class="table table-bordered">
                  <thead>
                    <tr class="firstTr">
                      <th>序号</th>
                      <th>申请编号</th>
                      <th>申请产品名称</th>
                      <th>订单状态</th>
                      <th>剩余签约时间</th>
                      <th>申请人员</th>
                      <th>申请金额</th>
                      <th>申请期限</th>
                      <th>批复产品</th>
                      <th>批复期限</th>
                      <th>批复金额</th>
                      <th>批复费率</th>
                      <th>复议情况</th>
                      <th>客服</th>
                      <th>销售人员</th>
                      <th>团队经理</th>
                      <th>批复时间</th>
                      <th>订单类型</th>
                      <th>订单来源</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in items" class="odd">
                      <td>{{ getNum(index) }}</td>
                      <td>
                      <router-link :to="'/financialformShow/list2/'+item.orderNum + '/' +item.status">
                      <a>{{ item.orderNum }}</a>
                      </router-link>
                      </td>
                      <td>{{ item.productName }}</td>
                      <td>{{ item.status | convertStatus }}</td>
                      <!--<td>{{ item.remaining }}</td>-->
                      <!--剩余签约时间-->
                      <td>{{ countTime_3(item.confirmAmountTime) }}</td>
                      <td>{{ item.proposer }}</td>
                      <td v-if="item.expectAmount">{{ toMoney(item.expectAmount) }}元</td>
                      <td v-if="!item.expectAmount"></td>
                      <td>{{ item.term }}</td>
                      <td>{{ item.actualProductName }}</td>
                      <td>{{ item.approvalTerm }}</td>
                      <td v-if="item.approvalAmount">{{ toMoney(item.approvalAmount) }}元</td>
                      <td v-if="!item.approvalAmount"></td>
                      <td v-if="item.expenseRate">{{ item.expenseRate }}%</td>
                      <td v-if="!item.expenseRate"></td>
                      <td>{{ isFuyi[item.isFuyi] }}</td>
                      <td>{{ item.customService }}</td>
                      <td>{{ item.salesman }}</td>
                      <td>{{ item.teamManager }}</td>
                      <td>{{ item.approvalTime }}</td>
                      <td>{{ item.orderType |  convertOrderType }}</td>
                      <td>{{ item.orderSource | covertSource}}</td>
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
                    <li class="paginate_button previous"><a @click="before()">上一页</a></li>
                    <li class="paginate_button" v-for="n in pageSize">
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
  //select2-引入select2组件
  import select2 from './common/select2/select2_List.vue';
  var vm
  export default {
    name: 'WaitSignList',
    components: {//select2-定义select2在当前组件中的名称
      'select2': select2,
    },
    data:function () {
      return {
        used: "",
        left: "",
        newPageSize:0,
        startNum:1,
        jumpNum:1,
        productList:[],
        items: [ ],
        isFuyi:{"false":"否","true":"是"},
        recordsTotal: 0,
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
          status: [
            { id: '000', text: '全部' },
            { id: '400', text: '信审通过' },
            { id: '600', text: '确认金额' },
            { id: '500', text: '订单超时' },
            { id: '510', text: '放弃签约' },
            { id: '610', text: '待签约' }
          ],
          orderType: [
            { id: '000', text: '全部' },
            { id: '1', text: '银谷普惠' },
            { id: '2', text: '云钱袋' },
          ],
        },
        productNameList:[
          { id: '', text: '全部' },
        ],
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
      /**
       * confirmAmountTime 确认金额时间 签约倒计时  15
       * confirmAmountTime+15-now = 剩余签约时间
       * @param value
       * @returns {*}
       */
      countTime_3: function (value) {
        if(!value){
          return "-";
        }
        var n = new Date(value).getTime();
        var d = 24 * 60 * 60 * 1000;
        var d15 = 15 * d;
        var now = new Date().getTime();
        var m = n+d15-now;
        var res = parseInt(m/d);
        if(res<=0){
          return "-";
        }
        return res;
      },
      toMoney: function (value) {
        return toMoney(value)
      },
      initTable: function () {
        if(this.valIdNum()){
          var that = this;
          that.$utils.ajax(that)(basePath2+'order/waitSigned', this.searchParams, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
              that.items = response.body.data.data;
              that.used = response.body.data.used;
              that.left = response.body.data.left;
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
                value.id = item.productCode;
                value.text = item.productName;
                that.productNameList.push(value);
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
        this.searchParams.idNum = '';
        this.searchParams.productName = '';
        this.searchParams.status = "000";
        this.searchParams.proposer = '';
        this.searchParams.salesman = '';
        this.searchParams.startApprovalTime = '';
        this.searchParams.endApprovalTime = '';
        this.searchParams.phone = '';
        this.searchParams.orderNum = '';
        this.searchParams.orderType = '000';
      },
      callbackStatus: function(value){
        this.searchParams.status = value;
      },
      callbackPName: function(value){
        this.searchParams.productName = value;
      },
      callbackOrderType: function(value){
        this.searchParams.orderType = value;
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.productName', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.orderNum', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.status', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.proposer', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.idNum', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.salesman', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.phone', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.orderType', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },

    mounted: function () {
      var that = this;
      this.queryProduct();
      this.initTable();
      this.watchSearchParams();
      $('#sDate').datetimepicker({
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
        that.searchParams.startApprovalTime=$("#sDate").val();
        that.setSearchParamsStart();
      });
      $('#eDate').datetimepicker({
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
        that.searchParams.endApprovalTime=$("#eDate").val();
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
  /*table.table input {*/
    /*border: none;*/
    /*text-align: center;*/
  /*}*/
  .wrapper {
    height: 100%;
  }
  .select, .selectInput{
    width: 65%;
    border: 1px solid rgb(229, 230, 231);
    height: 34px;
    padding: 5px;
    border-radius: 5px !important;
    background-color: rgb(255, 255, 255);
  }
  .select2-container{
    width:65%;
  }
  th, td {
    white-space: nowrap;
  }
  .aa{
    padding:5px;
    text-align: center;
  }
  .num {
    font-weight:bold;
    color:#337ab7;
  }
  .fl{
    float: left;
  }
  .cf{
    clear: both;
  }
</style>
