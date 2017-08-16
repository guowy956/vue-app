<template>
  <!--<h1>变更组织</h1>-->
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>业绩核对列表</h5>
            </div>
            <div class="ibox-content col-md-12">
              <form id="searchForm" href="#">
                <table style="width: 100%">
                  <tr>
                    <td style="width: 25%;">
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">进件编号：</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" v-model="searchParams.orderNum" maxlength="64">
                          <p v-if="debugShow" class="debugCss">searchParams.orderNum: {{ searchParams.orderNum }}</p>
                        </div>
                      </div>
                    </td>
                    <td style="width: 25%;">
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">客户经理：</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" v-model="searchParams.salesman" maxlength="32">
                          <p v-if="debugShow" class="debugCss">searchParams.salesman: {{ searchParams.salesman }}</p>
                        </div>
                      </div>
                    </td>
                    <td style="width: 25%;">
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">团队经理：</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" v-model="searchParams.teamManager" maxlength="32">
                          <p v-if="debugShow" class="debugCss">searchParams.teamManager: {{ searchParams.teamManager
                            }}</p>
                        </div>
                      </div>
                    </td>
                    <td style="width: 25%;">
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">产品名称：</label>
                        <div class="col-sm-6">
                          <select2 :options="options.products" v-model="searchParams.productName"
                                   :select2Style="select2Style"></select2>
                          <p v-if="debugShow" class="debugCss">searchParams.productName: {{ searchParams.productName
                            }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">区域：</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" v-model="searchParams.region" maxlength="32">
                          <p v-if="debugShow" class="debugCss">searchParams.region: {{ searchParams.region }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">营业部：</label>
                        <div class="col-sm-6">
                          <select2 :options="options.orgs" v-model="searchParams.department"
                                   :select2Style="select2Style"></select2>
                          <p v-if="debugShow" class="debugCss">searchParams.department: {{ searchParams.department }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">订单类型：</label>
                        <div class="col-sm-6">
                          <select2 :options="options.orderTypes" v-model="searchParams.orderType"
                                   :select2Style="select2Style"></select2>
                          <p v-if="debugShow" class="debugCss">searchParams.orderType: {{ searchParams.orderType }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">放款时间：</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="monthPicker1" placeholder="格式如：2017-05-01"
                                 maxlength="7">
                          <p v-if="debugShow" class="debugCss">searchParams.loanTimeStart: {{ searchParams.loanTimeStart
                            }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="form-group">
                        <label class="col-sm-5 control-label searchLabel">至：</label>
                        <div class="col-sm-6">
                          <input type="text" class="form-control" id="monthPicker2" placeholder="格式如：2017-05-01"
                                 maxlength="7">
                          <p v-if="debugShow" class="debugCss">searchParams.loanTimeEnd: {{ searchParams.loanTimeEnd
                            }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3"></td>
                    <td>
                      <div class="form-group">
                        <div class="col-sm-12 searchBtnTd">
                          <button type="button" class="btn btn-primary" @click="initTable()">查询</button>
                          <button type="button" class="btn btn-primary" @click="resetSearch()">重置</button>
                          <a :href="exportXLS" target="_blank" v-if="exportFlag == '1'">
                            <button type="button" class="btn btn-info">导出</button>
                          </a>
                          <a :href="exportXLSAll" target="_blank" v-if="exportFlag == '1'">
                            <button type="button" class="btn btn-info">上月业绩</button>
                          </a>
                          <!--<button v-if="exportFlag == '1'" type="button" class="btn btn-info" @click="exportXLS">导出</button>-->
                          <!--<button v-if="exportFlag == '1'" type="button" class="btn btn-info" @click="exportXLSAll">上月业绩</button>-->
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <div class="ibox float-e-margins">
              <div class="ibox-content">
                <div id="tableDiv" style="overflow-x:auto;">
                  <table class="table table-bordered">
                    <thead>
                    <tr class="firstTr">
                      <th>序号</th>
                      <th>进件编号</th>
                      <th>借款人姓名</th>
                      <th>放款金额</th>
                      <th class="zindex">还款期限</th>
                      <th class="zindex">综合费率</th>
                      <th class="zindex">产品名称</th>
                      <th class="zindex">区域</th>
                      <th class="zindex">营业部</th>
                      <th class="zindex">客户经理</th>
                      <th class="zindex">团队经理</th>
                      <th class="zindex">放款时间</th>
                      <th class="zindex">订单类型</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in items">
                      <td>{{ index + startNum }}</td>
                      <td>{{item.orderNum}}</td>
                      <td>{{item.proposer}}</td>
                      <td>{{item.actualAmount}}</td>
                      <td>{{item.approvalTerm}}</td>
                      <td>{{item.expenseRate}}</td>
                      <td>{{item.productName}}</td>
                      <td>{{item.region }}</td>
                      <td>{{item.orgName}}</td>
                      <td>{{item.salesman}}</td>
                      <td>{{item.teamManager}}</td>
                      <td>{{item.loanTime}}</td>
                      <td>{{item.orderType}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="dataTables_info col-sm-5">显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项</div>
                  <div class="dataTables_paginate paging_simple_numbers col-sm-7"
                       style="text-align:right;">
                    <ul class="pagination">
                      <li class="paginate_button previous"><a @click="first()">首页</a>

                      </li>
                      <li class="paginate_button previous"><a @click="before()">上一页</a>

                      </li>
                      <li class="paginate_button" v-for="n in pageSize">
                        <a @click="jump(n)" v-if="(jumpNum<5 && n<10) || (n >=jumpNum-4 && n <=jumpNum+4) ||
                                                (jumpNum > pageSize-5 && n>pageSize-9)">
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
  import select2 from './common/select2/select2.vue';
  // import './tmpDB/PerformanceDB';   // 没有连接口前用来测试的数据
  export default {
    name: 'performance',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    data: function () {
      return {
        debugShow: false,     // 是否为测试模式，测试模式会显示参数值
        select2Style: {       //select2-style样式
          width: '100%'
        },
        // 下拉选项
        options: {
          products: [],
          orgs: [
            {id: 'CODE_1', text: '营业部1'},
            {id: 'CODE_2', text: '营业部2'}
          ],
          orderTypes: [
            {id: '1', text: '银谷普惠'},
            {id: '2', text: '云钱袋'}
          ]
        },
        // 查询条件
        searchParams: {
          start: 0,
          length: 10,
          orderNum: "",
          salesman: "",
          teamManager: "",
          productName: "",
          region: "",
          orderType: "",
          department: "",
          loanTimeStart: "",
          loanTimeEnd: "",
        },
        // 列表数据
        items: [],
        XLS: [],
        // 分页
        newPageSize: 0,
        jumpNum: 1,
        recordsTotal: 13,
        exportFlag: "0",
        exportFlagRole: ['借款人服务部经理','运营审核','超级管理员']
        // 其他
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
        return this.recordsTotal % this.searchParams.length == 0 ? a : b
      },
      startNum: function () {
        return parseInt(this.searchParams.start) + 1;
      },
      exportXLS: function () {
        var accessToken = this.$utils.getLocalData("accessToken");
        if(!accessToken){
          this.$utils.clearLocalData("accessToken");
          this.$utils.clearLocalData("orgData");
          this.$utils.clearLocalData("hrData");
          this.$parent.$emit('changeLogin', 'N');
          return false;
        }
        if(this.calculation()!= false){
          var url = basePath2 + 'performance/export/current?start='+this.searchParams.start+"&length="+this.searchParams.length;
          if(this.searchParams.orderNum){
            url += "&orderNum="+this.searchParams.orderNum;
          }
          if(this.searchParams.salesman){
            url += "&salesman="+this.searchParams.salesman;
          }
          if(this.searchParams.teamManager){
            url += "&teamManager="+this.searchParams.teamManager;
          }
          if(this.searchParams.productName){
            url += "&productName="+this.searchParams.productName;
          }
          if(this.searchParams.region){
            url += "&region="+this.searchParams.region;
          }
          if(this.searchParams.orderType){
            url += "&orderType="+this.searchParams.orderType;
          }
          if(this.searchParams.department){
            url += "&department="+this.searchParams.department;
          }
          url += "&loanTimeStart="+this.searchParams.loanTimeStart;
          url += "&loanTimeEnd="+this.searchParams.loanTimeEnd;
          url += "&accessToken="+accessToken;
//          window.open(url);
          return url;
        }
      },
      exportXLSAll: function () {
        var accessToken = this.$utils.getLocalData("accessToken");
        if(!accessToken){
          this.$utils.clearLocalData("accessToken");
          this.$utils.clearLocalData("orgData");
          this.$utils.clearLocalData("hrData");
          this.$parent.$emit('changeLogin', 'N');
          return false;
        }
        var url = basePath2 + 'performance/export/all?accessToken='+accessToken;
        if(this.searchParams.orderNum){
          url += "&orderNum="+this.searchParams.orderNum;
        }
        if(this.searchParams.salesman){
          url += "&salesman="+this.searchParams.salesman;
        }
        if(this.searchParams.teamManager){
          url += "&teamManager="+this.searchParams.teamManager;
        }
        if(this.searchParams.productName){
          url += "&productName="+this.searchParams.productName;
        }
        if(this.searchParams.region){
          url += "&region="+this.searchParams.region;
        }
        if(this.searchParams.department){
          url += "&department="+this.searchParams.department;
        }
        if(this.searchParams.orderType){
          url += "&orderType="+this.searchParams.orderType;
        }
//        window.open(url);
        return url;
      },
    },
    methods: {
      before: function () {
        if (parseInt(this.searchParams.start) > 1) {
          this.jumpNum = this.jumpNum - 1;
          this.searchParams.start = parseInt(this.searchParams.start) - parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      next: function () {
        if (parseInt(this.end) < parseInt(this.recordsTotal)) {
          this.jumpNum = this.jumpNum + 1;
          this.searchParams.start = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      jump: function (pageNo) {
        this.jumpNum = pageNo;
        this.searchParams.start = (pageNo - 1) * parseInt(this.searchParams.length);
        this.initTable()
      },
      first: function () {
        if (this.pageSize > 0) {
          this.searchParams.start = 0;
          this.jumpNum = 1;
          this.initTable()
        }
      },
      final: function () {
        if (this.pageSize > 0) {
          this.searchParams.start = parseInt(this.pageSize-1) * parseInt(this.searchParams.length);
          this.jumpNum = this.pageSize;
          this.initTable()
        }

      },
      calculation: function () {
        var that  = this;
        var first_  = that.searchParams.loanTimeStart;
        var second_ = that.searchParams.loanTimeEnd;
        if(first_ && second_){
          if(that.DateDiff(first_,second_)>=31){
            that.$utils.alert("时间区间不可超过31天")
            return false;
          }
        }
        return true;
      },
      DateDiff : function  (sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
        var  aDate;  var oDate1; var oDate2; var iDays;
        aDate  =  sDate1.split("-");
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) ;   //转换为12-18-2002格式
        aDate  =  sDate2.split("-");
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24) ;   //把相差的毫秒数转换为天数
        return  iDays;
      },
      initTable: function () {
        var that = this;
        if(that.calculation()!= false){
          that.$utils.ajax(that)(basePath2 + 'performance/list', this.searchParams, function (response) {
            if (typeof (response.body) === 'string') {
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
              that.items = response.body.data.data;
              that.recordsTotal = response.body.data.recordsTotal;
            } else if (response.body.code == '401') {
              that.$utils.clearLocalData("accessToken");
              that.$utils.clearLocalData("orgData");
              that.$utils.clearLocalData("hrData");
              that.$parent.$emit('changeLogin', 'N');
            } else {
              that.$utils.alert(response.body.message)
            }
          }, function (response) {
            that.$utils.alert("error");
          }, "get");
        }
      },
      initProducts: function () {//select2-初始化option
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'product/all', {}, function (response) {
          if (response.body.code == '200') {
            var products = response.body.data;
            var items = [];
            if (products) {
              $(products).each(function (i, item) {
                var pro = {};
                pro.id = item.productName;
                pro.text = item.productName;
                items.push(pro);
              });
            }
            that.options.products = items;
          } else if (response.body.code == '401') {
          } else {
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        }, "get");
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
      resetSearch: function () {
        this.searchParams.orderNum = "";
        this.searchParams.salesman = "";
        this.searchParams.teamManager = "";
        this.searchParams.productName = "";
        this.searchParams.region = "";
        this.searchParams.orgName = "";
        this.searchParams.orderType = "";
        this.defaultShowNow();
      },
      search: function () {
        this.initTable();
      },
      exportFlagInit: function () {
        var role = this.$utils.getLocalData("role");
        if (!isNull(role)){
          for(var i=0;i<this.exportFlagRole.length;i++){
            if(this.exportFlagRole[i] == role.name){
              this.exportFlag = '1';
              break;
            }
          }
        }
      },
      defaultShowNow: function () {
        var that = this;
        var now = new Date();
        var nowstr = now.getFullYear()+"-";+now.getDate();
        var mon = parseInt(now.getMonth())+1;
        if(mon<10){
          mon = 0+""+mon;
        }
        nowstr += mon;
        nowstr += "-";
        var ddd = now.getDate();
        if(ddd<10){
          ddd = 0 + "" +ddd;
        }
        nowstr += ddd;
        $("#monthPicker1").val(nowstr);
        $("#monthPicker2").val(nowstr);
        that.searchParams.loanTimeStart = nowstr;
        that.searchParams.loanTimeEnd = nowstr;
      }
    },
    mounted: function () {
      var that = this;
      that.exportFlagInit();
      that.initOrgs();
      that.initProducts();
      that.initTable();
      $('#monthPicker1').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function (ev) {
        that.searchParams.loanTimeStart = $("#monthPicker1").val();
      });
      $('#monthPicker2').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function (ev) {
        that.searchParams.loanTimeEnd = $("#monthPicker2").val();
      });
      that.defaultShowNow();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .searchLabel {
    text-align: right;
    padding-top: 8px;
  }

  .searchBtnTd {
    text-align: right;
    padding-right: 20px;
  }

  .debugCss {
    color: blue;
  }

  .readOnlyCss {
    background-color: #fff;
  }
</style>
