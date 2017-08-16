<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title" >
              <h5>已质检列表</h5>
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
                <div class="col-sm-3">
                  <span>客户姓名:</span>
                  <input type="text" class="selectInput" v-model="searchParams.proposer">
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-3">
                  <span>团队经理:</span>
                  <input type="text" class="selectInput" v-model="searchParams.teamManager">
                </div>
                <div class="col-sm-3">
                  <span>身份证号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.idNum" @blur='valIdNum'>
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
                  <span>质检时间:</span>
                  <input type="text" class="selectInput" id="sDate" placeholder="">
                </div>
                <div class="col-sm-3">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至:</span>
                  <input type="text" class="selectInput" id="eDate" placeholder="">
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

            <div class="ibox float-e-margins">
              <!--如果冻结列不好使，给tableDiv也设置一个position:relative;-->
              <div class="ibox-content">
                <div id="tableDiv" style="width:100%;overflow-x:auto;">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th style="width: 5%">序号</th>
                      <th style="width: 10%">申请编号</th>
                      <th style="width: 6%">申请人员</th>
                      <th style="width: 6%">订单状态</th>
                      <th style="width: 10%">产品名称</th>
                      <th style="width: 6%">贷款用途</th>
                      <th style="width: 6%">销售人员</th>
                      <th style="width: 6%">团队经理</th>
                      <th style="width: 6%">申请期限</th>
                      <th style="width: 10%">申请时间</th>
                      <th style="width: 10%">质检时间</th>
                      <th style="width: 6%">客服</th>
                      <th style="width: 6%">订单类型</th>
                      <th style="width: 6%">拒绝时间</th>
                      <th style="width: 6%">费率</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in items">
                      <td>{{ getNum(index) }}</td>
                      <td>
                        <router-link :to="'/financialformShow/list4/'+item.orderNum + '/' +item.status">
                          <a>{{ item.orderNum }}</a>
                        </router-link>
                      </td>
                      <td>{{ item.proposer }}</td>
                      <td>{{ item.status | convertStatus }}</td>
                      <td>{{ item.productName }}</td>
                      <td>{{ item.purpose }}</td>
                      <td>{{ item.salesman }}</td>
                      <td>{{ item.teamManager }}</td>
                      <td>{{ item.term }}</td>
                      <td>{{ item.applicationTime }}</td>
                      <td>{{ item.checkedTime}}</td>
                      <td>{{ item.customService }}</td>
                      <td>{{ item.orderType |  convertOrderType }}</td>
                      <td>{{ item.refuseTime  }}</td>
                      <td v-if="item.expenseRate">{{ item.expenseRate }}%</td>
                      <td v-if="!item.expenseRate"></td>
                    </tr>
                    </tbody>
                  </table>
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
  var vm;
  export default {
    name: 'AlreadyQualityList',
    components: {//select2-定义select2在当前组件中的名称
      'select2': select2,
    },
    data : function () {
      return {
        newPageSize : 0,
        startNum : 1,
        jumpNum : 1,
        productList:[],
        items: [],
        recordsTotal: 0,
        searchParams: {
          teamManager: "",
          productName: "",
          start: 0,
          length: 10,
          status: "000",
          orderType: "000",
          startCheckedTime: "",
          endCheckedTime: "",
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
        select2Style: {//select2-style样式
          width: '67%'
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          examine: false
        },
        options:{
          teamManagers: [],
          status: [
            { id: '000', text: '全部' },
            { id: '300', text: '信审审核中' },
            { id: '400', text: '信审通过' },
            { id: '350', text: '信审拒绝' },
            { id: '310', text: '信审补件' },
            { id: '200', text: '预约取消' }
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
      },
    },
    filters:{
      //转换订单状态
      convertStatus : function(value){
        if(value=='200'){
          return "预约取消";
        }else if(value=='300'){
          return "信审中";
        }else if(value=='310'){
          return "信审补件";
        }else if(value=='350'){
          return "信审拒绝";
        }else if(value=='360'){
          return "同意信审拒绝";
        }else if(value=='400'){
          return "信审通过";
        }else if(value=='410'){
          return "欺诈";
        }else if(value=='600'){
          return "确认金额";
        }else if(value=='610'){
          return "信审通过";
        }else if(value=='620'){
          return "信审通过";
        }else if(value=='700'){
          return "信审通过";
        }else if(value=='710'){
          return "信审通过";
        }else if(value=='715'){
          return "信审通过";
        }else if(value=='720'){
          return "信审通过";
        }else if(value=='730'){
          return "信审通过";
        }else if(value=='740'){
          return "信审通过";
        }else if(value=='750'){
          return "信审通过";
        }else if(value=='760'){
          return "信审通过";
        }else if(value=='770'){
          return "信审通过";
        }else if(value=='780'){
          return "信审通过";
        }else if(value=='800'){
          return "信审通过";
        }else{
          return "-";
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
      initTable: function () {
        if(this.valIdNum()){
          var that = this;
          that.$utils.ajax(that)(basePath2+'/order/checked', this.searchParams, function (response) {
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
        $('.selectInput').val("");
        $('.select-container').find(".select2-chosen").text("");
        this.searchParams.orderNum="";
        this.searchParams.productName="";
        this.searchParams.idNum="";
        this.searchParams.proposer="";
        this.searchParams.salesman="";
        this.searchParams.startCheckedTime="";
        this.searchParams.endCheckedTime="";
        this.searchParams.phone="";
        this.searchParams.status="000";
        this.searchParams.orderType="000";
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
        that.searchParams.startCheckedTime=$("#sDate").val();
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
        that.searchParams.endCheckedTime=$("#eDate").val();
        that.setSearchParamsStart();
      });
      //给table外面的div滚动事件绑定一个函数
      $("#tableDiv").scroll(function(){
        var left=$("#tableDiv").scrollLeft();//获取滚动的距离
        var trs=$("#tableDiv table tr");//获取表格的所有tr
        trs.each(function(i){
          //对每一个tr（每一行）进行处理
          // 获得每一行下面的所有的td，然后选中下标为0的，即第一列，设置position为相对定位
          //相对于父div左边的距离为滑动的距离，然后设置个背景颜色，覆盖住后面几列数据滑动到第一列下面的情况
          //如果有必要也可以设置一个z-index属性
          $(this).children().eq(0).css({"position":"relative","top":"0px","left":left});
          $(this).children().eq(1).css({"position":"relative","top":"0px","left":left});
          $(this).children().eq(2).css({"position":"relative","top":"0px","left":left});
          $(this).children().eq(3).css({"position":"relative","top":"0px","left":left});
          $(this).children().eq(4).css({"position":"relative","top":"0px","left":left});
          $(this).children().eq(5).css({"position":"relative","top":"0px","left":left});
        });
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
  .aa{
    padding:10px;
    text-align: center;
  }
  .select, .selectInput{
    width: 65%;
    border: 1px solid rgb(229, 230, 231);
    height: 34px;
    padding: 5px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
  }
  .input-daterange .dateInput{
    width: 88% !important;
    display: inline-block;
  }
  .num {
    font-weight:bold;
    color:#337ab7;
  }
</style>
