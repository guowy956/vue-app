<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5>账号变更审核列表</h5>

            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3"> <span>借款人姓名:</span>

                  <input type="text" class="selectInput" v-model="searchParams.loanName">
                </div>
                <div class="col-sm-3"> <span>进件编号:</span>

                  <input type="text" class="selectInput" v-model="searchParams.orderNum">
                </div>
                <div class="col-sm-3"> <span>订单状态:</span>

                  <select2 :options="options.orderStatus" v-model="searchParams.orderStatus"
                           @myclick="callbackRepStatus"></select2>
                </div>
                <div class="col-sm-3 orderS"> <span>账户属性:</span>

                  <select2 :options="options.accountType" v-model="searchParams.accountType"
                           @myclick="callbackStatus"></select2>
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-3" style="width: 100%;text-align: center">
                  <p class='btn btn-primary' @click='initTable'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                </div>
              </div>
            </div>
            <div class="ibox float-e-margins">

              <div class="ibox-content">
                <!--如果冻结列不好使，给tableDiv也设置一个position:relative;-->
                <div id="tableDiv" style="overflow-x:auto;">
                  <!--<div class="col-sm-3 orderS" style="margin-bottom: 10px;">
                    <select2 :options="options.accountType" v-model="searchParams.accountType"
                             @myclick="callbackStatus"></select2>
                    <p class='btn btn-primary' style="margin-left: 10px;margin-top: 5px;" @click='resetSearch()'><i class='fa fa-paste'></i>调单</p>
                  </div>-->
                  <table class="table table-bordered">
                    <thead>
                    <tr class="firstTr">
                      <!--<th><input type="checkbox" @click="selectAll()" id="sa"/></th>-->
                      <th>序号</th>
                      <th>进件编号</th>
                      <th>借款人姓名</th>
                      <th>订单状态</th>
                      <th class="zindex">接单时间</th>
                      <th class="zindex">审核人员</th>
                      <th class="zindex">审核时间</th>
                      <th class="zindex">门店</th>
                      <th class="zindex">变更状态</th>
                      <th class="zindex">失败原因</th>
                      <th class="zindex">账户属性</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in items">
                      <!--<td><input type="checkbox" name="cb"/></td>-->
                      <td>{{ index + startNum }}</td>
                      <td>
                        <router-link :to="'/examineDetail/'+item.orderNum+'/'+item.id"> <a>
                          {{item.orderNum}}
                        </a>
                        </router-link>
                      </td>
                      <td>{{item.loanName}}</td>
                      <td>{{orderStatusUtils[item.orderStatus]}}</td>
                      <td>{{transfers(item.createTime)}}</td>
                      <td>{{item.operatorName}}</td>
                      <td v-if="item.status!=0">{{transfers(item.auditTime)}}</td>
                      <td v-if="item.status==0">--</td>
                      <td>{{item.salesDeptName}}</td>
                      <td v-if="item.status!=4">{{statusUtil[item.status]}}</td>
                      <td v-if="item.status==4">
                        {{statusUtil[item.status]}}&nbsp;&nbsp;
                        <a @click="notice(item.id)">通知</a>
                      </td>
                      <td v-if="item.status==5"><a @click="openWin(item)">查看详情</a></td>
                      <td v-if="item.status!=5">-</td>
                      <td>{{Bstatus[item.accountType]}}</td>
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

    <div v-show="isWinShow" class="win" id="win">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">错误信息</h4>
          </div>
          <form class="form-horizontal m-t">
            <div class="modal-body">
              {{failReasonTmp}}
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-show="isWinShow" class="modal-backdrop fade in" id="pop"></div>

  </div>
</template>
<script>
  //select2-引入select2组件
  import Select2 from './common/select2/select2_userRelation.vue';
  var vm
  export
  default {
    name: 'examine',
    components: { //select2-定义select2在当前组件中的名称
      'select2': Select2,
    },
    data: function () {
      return {
        isWinShow: false,
        failReasonTmp: "",
        teamEmps: [],
        jumpNum: 1,
        items: [],
        recordsTotal: 0,
        searchParams: {
          start: 0,
          length: 10,
          loanName: "",
          orderNum: "",
          orderStatus: "",
          idNumber: "",
          accountType: "",
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
        orderStatusUtils: {
          "100": "待保存",
          "110": "已保存",
          "112": "已删除",
          "120": "待质检",
          "200": "预约取消",
          "300": "信审中",
          "310": "信审补件",
          "311": "门店已补件",
          "350": "信审拒绝",
          "360": "同意信审拒绝",
          "400": "信审通过",
          "410": "欺诈",
          "500": "订单超时",
          "510": "放弃签约",
          "600": "确认金额",
          "610": "待签约",
          "620": "已签约",
          "625": "变更银行卡",
          "650": "募集中",
          "700": "募集中",
          "710": "初审审核驳回",
          "715": "门店取消",
          "720": "初审审核通过",
          "730": "待面签",
          "735": "变更还款日",
          "740": "门店拒绝",
          "750": "终审待审核",
          "760": "终审审核驳回",
          "770": "终审审核通过",
          "780": "放款中",
          "800": "已放款",
          "820": "放款失败",
          "900": "结清"
        },
        statusUtil: {
          "0": "未审核",
          "1": "已审核",
          "2": "驳回",
          "3": "结算确认",
          "4": "开户成功",
          "5": "开户失败",
          "6": "已通知",
        },
        Bstatus: {
          "1": "三方账户",
          "2": "银行"
        },
        options: {
          orderStatus: [
            {id:"",text:"全部"},
            {id:"100",text:"待保存"},
            {id:"110",text:"已保存"},
            {id:"112",text:"已删除"},
            {id:"120",text:"待质检"},
            {id:"200",text:"预约取消"},
            {id:"300",text:"信审中"},
            {id:"310",text:"信审补件"},
            {id:"311",text:"门店已补件"},
            {id:"350",text:"信审拒绝"},
            {id:"360",text:"同意信审拒绝"},
            {id:"400",text:"信审通过"},
            {id:"410",text:"欺诈"},
            {id:"500",text:"订单超时"},
            {id:"510",text:"放弃签约"},
            {id:"600",text:"确认金额"},
            {id:"610",text:"待签约"},
            {id:"620",text:"已签约"},
            {id:"625",text:"变更银行卡"},
            {id:"650",text:"募集中"},
            {id:"700",text:"募集中"},
            {id:"710",text:"初审审核驳回"},
            {id:"715",text:"门店取消"},
            {id:"720",text:"初审审核通过"},
            {id:"730",text:"待面签"},
            {id:"735",text:"变更还款日"},
            {id:"740",text:"门店拒绝"},
            {id:"750",text:"终审待审核"},
            {id:"760",text:"终审审核驳回"},
            {id:"770",text:"终审审核通过"},
            {id:"780",text:"放款中"},
            {id:"800",text:"已放款"},
            {id:"820",text:"放款失败"},
            {id:"900",text:"结清"}
          ],
          status: [{
            id: '',
            text: '请选择'
          }, {
            id: '0',
            text: '未审核'
          }, {
            id: '1',
            text: '已审核'
          }, {
            id: '2',
            text: '驳回'
          }, {
            id: '3',
            text: '结算确认'
          }, {
            id: '4',
            text: '开户成功'
          }, {
            id: '5',
            text: '开户失败'
          },{
            id: '6',
            text: '已通知'
          }, ],
          accountType: [{
            id: '',
            text: '全部'
          }, {
            id: '2',
            text: ' 银行'
          }, {
            id: '1',
            text: '三方账户'
          }, ],
        },
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
      }
    },
    methods: {
      // 后加的
      closeWin : function () {
        this.failReasonTmp = "";
          this.isWinShow = false;
      },
      openWin : function (item) {
        this.failReasonTmp = item.failReason;
        this.isWinShow = true;
      },
      notice: function (id) {
        var that = this;
        that.$utils.ajax(that)(basePath2+'modBankcardRecord/notice?id='+id,{}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            alert("通知成功");
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
      initTeamEmps: function (orderNum) {
        var that = this;
        var myParams = {};
        myParams.orderNum = orderNum;
        that.$utils.ajax(that)(basePath2+'team/options',myParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.teamEmps = response.body.data;
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
      selectAll: function () {
        debugger
        if($("#sa").is(':checked')){
          $("input[name='cb']").prop("checked",true);
        }else{
          $("input[name='cb']").prop("checked",false);
        }
      },
      initTable: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + '/modBankcardRecord/page', this.searchParams, function (response) {
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
          that.$utils.alert(this.failedMsg);
        }, "get");
      },
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
      //重置查询条件
      resetSearch: function () {
        $('.selectInput').val("");
        $('.col-sm-3').find(".select2-chosen").text("请选择");
        $('#account1').find(".select2-chosen").text("请选择");
        $('#account2').find(".select2-chosen").text("请选择");
        $('.orderS').find(".select2-chosen").text("全部");
        this.searchParams.loanName = "";
        this.searchParams.orderNum = "";
        this.searchParams.idNumber = "";
        this.searchParams.orderStatus = "";
        this.searchParams.accountType = "";
      },
      transfers: function (longDate) {
        var date2 = new Date(longDate);
        var str2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()+" "+date2.getHours()+"/"+date2.getMinutes()+"/"+date2.getSeconds();
        return str2
      },
      callbackStatus: function (value) {
        this.searchParams.accountType = value;
      },
      callbackRepStatus: function (value) {
        this.searchParams.orderStatus = value;
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.loanName', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.orderNum', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.orderStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.accountType', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },
    mounted: function () {
      this.initTable();
      this.watchSearchParams();
      //给table外面的div滚动事件绑定一个函数
      $("#tableDiv").scroll(function () {
        var left = $("#tableDiv").scrollLeft(); //获取滚动的距离
        var trs = $("#tableDiv table tr"); //获取表格的所有tr
        var ths = $('#tableDiv table tr:first th');
        trs.each(function (i) {
          $(this).children().eq(0).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "z-index": "0",
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(1).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(2).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(3).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(4).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(5).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
        });
        ths.eq(0).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(1).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(2).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(3).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(4).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(5).css({
          "background-color": "#F0F0F0"
        });
      });
      //this.initTeamEmps();
    }

  }
</script>
<style>
  @import'/static/css/plugins/dataTables/dataTables.bootstrap.css';
  @import'/static/css/jquery-filer.css';
  @import'/static/css/jquery.filer.css';
  @import"/static/css/jquery.filer-dragdropbox-theme.css";
  .col-sm-3 table {
    text-align: center;
    margin-bottom: 0px
  }
  table td {
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
  .select, .selectInput {
    width: 65%;
    border: 1px solid rgb(229, 230, 231);
    height: 34px;
    padding: 5px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
  }
  .aa {
    padding:5px;
    text-align: center;
  }
  .num {
    font-weight:bold;
    color:#337ab7;
  }
  .zindex {
    z-index: -10;
  }
  .select2-container {
    width:65%;
  }
  #account1 .select2-container {
    width:40%;
  }
  #account2 .select2-container {
    width:40%;
  }
</style>
