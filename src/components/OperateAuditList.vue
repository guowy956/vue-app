<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5>运营审核列表</h5>
            </div>
            <div class="ibox-content">

              <div class="row aa">
                <div class="col-sm-3"> <span>客户姓名:</span>
                  <input type="text" class="selectInput" v-model="searchParams.customerName">
                </div>
                <div class="col-sm-3"> <span>进件编号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.orderNum">
                </div>
                <div class="col-sm-3"> <span>订单状态:</span>
                  <select2 :options="options.approvalStatus" v-model="searchParams.approvalStatus" :select2Style="select2Style"></select2>
                </div>
                <div class="col-sm-3"> <span>放款状态:</span>
                  <select2 :options="options.drawStatus" v-model="searchParams.drawStatus" :select2Style="select2Style"></select2>
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-3"> <span>还款状态:</span>
                  <select2 :options="options.status" v-model="searchParams.status" :select2Style="select2Style"></select2>
                </div>
                <div class="col-sm-3"> <span>逾期状态:</span>
                  <select2 :options="options.overdueStatus" v-model="searchParams.overdueStatus" :select2Style="select2Style"></select2>
                </div>
                <div class="col-sm-3"> <span>订单类型:</span>
                  <select2 :options="options.dataFlag" v-model="searchParams.dataFlag" :select2Style="select2Style"></select2>
                </div>
                <div class="col-sm-3" style="text-align: center">
                  <p class='btn btn-primary' @click='initTable'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                </div>
              </div>
            </div>
            <div class="ibox-title">
              <h5>面签次数</h5>
            </div>
            <div class="ibox-content" style="padding-bottom: 3px">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-6 control-label">每月可延长面签时长总次数: {{num.extendTime}} 次</label>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">每次可延长订单面签时长: {{num.extendDays}} 天</label>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">当前面签时长为: {{num.initDays}} 天</label>
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
                      <th><div style="width: 170px;">订单编号</div></th>
                      <th><div style="width: 50px;">合同</div></th>
                      <th><div style="width: 50px;">申请人员</div></th>
                      <th><div style="width: 50px;">客服</div></th>
                      <th><div style="width: 50px;">团队经理</div></th>
                      <th class="zindex"><div style="width: 100px;">合同金额</div></th>
                      <th class="zindex"><div style="width: 50px;">合同期限</div></th>
                      <th class="zindex"><div style="width: 150px;">批复产品</div></th>
                      <th class="zindex"><div style="width: 70px;">产品费率</div></th>
                      <th class="zindex"><div style="width: 80px;">订单状态</div></th>
                      <th class="zindex"><div style="width: 80px;">驳回倒计时</div></th>
                      <!--<th class="zindex"><div style="width: 150px;">合同签订时间</div></th>-->
                      <th class="zindex"><div style="width: 150px;">签约时间</div></th>
                      <th class="zindex"><div style="width: 150px;">待面签剩余天数</div></th>
                      <th class="zindex"><div style="width: 150px;">延长面签</div></th>
                      <th class="zindex"><div style="width: 150px;">信审批复时间</div></th>
                      <th class="zindex"><div style="width: 150px;">确认金额时间</div></th>
                      <th class="zindex"><div style="width: 150px;">审核时间</div></th>
                      <th class="zindex"><div style="width: 150px;">放款时间</div></th>
                      <th class="zindex"><div style="width: 80px;">放款失败原因</div></th>
                      <th class="zindex"><div style="width: 150px;">首个还款日</div></th>
                      <th class="zindex"><div style="width: 100px;">变更还款日状态</div></th>
                      <th class="zindex"><div style="width: 100px;">账号变更</div></th>
                      <th class="zindex"><div style="width: 100px;">申请提前结清</div></th>
                      <th class="zindex"><div style="width: 100px;">放款状态</div></th>
                      <th class="zindex"><div style="width: 100px;">还款状态</div></th>
                      <th class="zindex"><div style="width: 100px;">减免状态</div></th>
                      <th class="zindex"><div style="width: 50px;">应还期数</div></th>
                      <th class="zindex"><div style="width: 50px;">已还期数</div></th>
                      <th class="zindex"><div style="width: 100px;">剩余还款金额</div></th>
                      <th class="zindex"><div style="width: 70px;">逾期状态</div></th>
                      <th class="zindex"><div style="width: 70px;">账号属性</div></th>
                      <th class="zindex"><div style="width: 70px;">订单类型</div></th>
                      <th class="zindex"><div style="width: 70px;">还款状态</div></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in items">
                      <!-- 序号 -->
                      <td>{{ index + startNum }}</td>
                      <!-- 订单编号 -->
                      <td v-if="!item.globalID && null315Show==1"> <a @click="to315Detail(item.loanCode)">{{ item.loanCode }}</a></td>
                      <td v-if="!item.globalID && null315Show==2">
                        <router-link :to="'/financialformShow/list3/' +item.loanCode + '/' +item.status"> <a>{{ item.loanCode }}</a>
                        </router-link>
                      </td>
                      <td v-if="item.globalID == 1"> <a @click="to315Detail(item.loanCode)">{{ item.loanCode }}</a>
                      </td>
                      <td v-if="item.globalID == 2">
                        <router-link :to="'/financialformShow/list3/'+item.loanCode + '/' +item.status"> <a>{{ item.loanCode }}</a></router-link>
                      </td>
                      <!-- 合同 -->
                      <td v-if="!item.globalID && null315Show==1"> <a @click="to315Contract(item.loanCode)">合同</a>
                      </td>
                      <td v-if="!item.globalID && null315Show==2">
                        <router-link :to="'/contractDetail/'+item.loanCode+'/'+1"> <a>合同</a></router-link>
                      </td>
                      <td v-if="item.globalID == 1"> <a @click="to315Contract(item.loanCode)">合同</a>
                      </td>
                      <td v-if="item.globalID == 2">
                        <router-link :to="'/contractDetail/'+item.loanCode+'/'+1"> <a>合同</a></router-link>
                      </td>
                      <!-- 申请人员 -->
                      <td>{{ item.customerName }}</td>
                      <!-- 客服 -->
                      <td>{{ item.customerService==null ? '未确定':item.customerService }}</td>
                      <!-- 团队经理 -->
                      <td>{{ item.teamManager }}</td>
                      <!-- 合同金额 -->
                      <td v-if="item.loanPrincipal">{{ toMoney(item.loanPrincipal) }}元</td>
                      <td v-if="!item.loanPrincipal"></td>
                      <!-- 合同期限 -->
                      <td>{{ item.repaymentPeriod }}</td>
                      <!-- 批复产品 -->
                      <td>{{ item.loanProductName }}</td>
                      <!--产品费率-->
                      <td v-if="item.monthlyRate">{{ formatRate3(item.monthlyRate) }}</td>
                      <td v-if="!item.monthlyRate"></td>
                      <!-- 订单状态 -->
                      <td>{{ item.approvalStatusText }}</td>
                      <!-- 驳回倒计时 -->
                      <td v-if="item.approvalStatus==760">{{ countTime_2(item.finalauditrejectTime) }}</td>
                      <td v-if="item.approvalStatus!=760"></td>
                      <!--<td>{{ item.rejectCountdown }}</td>-->
                      <!-- 合同签订时间 -->
                      <!--<td>{{ item.signingDate }}</td>-->
                      <!-- 签约时间 -->
                      <td>{{ item.interviewTime }}</td>
                      <!-- 待面签剩余天数 -->
                      <td>{{ item.dayRemaining }}</td>
                      <!-- 延长面签 功能按钮 -->
                      <td>
                        <p v-if="(item.approvalStatusText=='待面签' || item.approvalStatusText=='审核驳回') && item.interviewTime" class='btn btn-primary' @click='waitSigning(item)'>延长面签</p>
                      </td>
                      <!-- 信审批复时间 -->
                      <td>{{ item.orderApprovalTime==null ? '未确定':item.orderApprovalTime }}</td>
                      <!--确认金额时间 -->
                      <td>{{ item.confirmAmountTime==null ? '未确定':item.confirmAmountTime }}</td>
                      <!-- 审核时间 -->
                      <td>{{ item.approvalTimeEnd==null ? '':item.approvalTimeEnd }}</td>
                      <!-- 放款时间 -->
                      <td>{{ item.realLendDate }}</td>
                      <!-- 放款失败原因 -->
                      <td v-if="item.drawStatus=='放款失败'"><a @click="openWin(item,1)">查看详情</a></td>
                      <td v-if="item.drawStatus!='放款失败'"></td>
                      <!-- 首个还款日 -->
                      <td>{{ item.repaymentFirstDate }}</td>
                      <!-- 变更还款日状态 -->
                      <td v-if="item.changeRepaymentStatus">{{ changeRepaymentStatusUtil[item.changeRepaymentStatus] }}</td>
                      <td v-if="!item.changeRepaymentStatus"></td>
                      <!-- 账号变更 -->
                      <td v-if="item.modBankcardRecordStatus">{{ modBankcardRecordStatusUtil[item.modBankcardRecordStatus] }}</td>
                      <td v-if="!item.modBankcardRecordStatus"></td>
                      <!-- 申请提前结清 -->
                      <!--<td>{{ item.advanceRepaymentStatus }}</td>-->
                      <td>--</td>
                      <!-- 放款状态 -->
                      <td>{{ item.drawStatus }}</td>
                      <!--还款状态-->
                      <td>{{ item.status}}</td>
                      <!--减免状态-->
                      <!--<td>{{item.reliefStatus}}</td>-->
                      <td>--</td>
                      <!--应还期数-->
                      <td>{{ item.repaymentPeriod }}</td>
                      <!--已还期数-->
                      <td>{{ item.payPeriod }}</td>
                      <!--剩余还款金额-->
                      <td v-if="item.lastRepaymentTotal">{{ toMoney(item.lastRepaymentTotal) }}</td>
                      <td v-if="!item.lastRepaymentTotal"></td>
                      <!-- 逾期状态 -->
                      <!--<td>{{item.overdueStatus}}</td>-->
                      <td v-if="getOverdueStatus(item)">逾期</td>
                      <td v-if="!getOverdueStatus(item)"></td>
                      <!-- 账号属性 -->
                      <td>{{ Bstatus[item.accountType] }}</td>
                      <!-- 订单类型 -->
                      <td>{{ item.dataFlag }}</td>
                      <!-- 还款状态 -->
                      <td>{{ item.repayDateType }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="dataTables_info col-sm-4">显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项</div>
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
            <h4 class="modal-title">{{ winTitle }}</h4>
          </div>
          <form class="form-horizontal m-t">
            <div class="modal-body">
              {{ reasonShow }}
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
  import Select2 from './common/select2/select2.vue';
  var vm
  export
  default {
    name: 'OperateAuditList',
    components: { //select2-定义select2在当前组件中的名称
      'select2': Select2,
    },
    data: function () {
      return {
        isWinShow: false,
        winTitle: "",
        reasonShow: "",
        select2Style: {//select2-style样式
          width: '65%'
        },
        modBankcardRecordStatusUtil: {
          "0": "未审核",
          "1": "已审核",
          "2": "驳回",
          "3": "结算确认",
          "4": "开户成功",
          "5": "开户失败",
          "6": "已通知",
        },
        changeRepaymentStatusUtil: {
          "1": "待审核",
          "2": "通过",
          "3": "驳回"
        },
        all: 0, //总页数
        cur: 1, //当前页码
        // 进件老数据315
        host315: "http://10.0.129.210:8091/",
        null315Show: 2, //globalID为空的时候显示什么：1、金管运营 2、普惠运营
        isTest315: 'N', // 是否为测试：Y:是 N:否
        newPageSize: 0,
        startNum: 1,
        jumpNum: 1,
        items: [],
        recordsTotal: 0,
        Bstatus: {
          "1": "三方账户",
          "0": "未确定",
          "2": "银行"
        },
        searchParams: {
          start: 0,
          length: 10,
          customerName: "",
          orderNum: "",
          approvalStatus: "",
          drawStatus: "",
          status: "",
          accountModifyStatus: "",
          changeRepaymentStatus: "",
          reliefStatus: "",
          advanceRepaymentStatus: "",
          overdueStatus: "",
          dataFlag: ""
        },
        signParams:{
          orderNum:""
        },
        num:{
          extendDays:"",
          extendTime:"",
          initDays:""//面签天数
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
        options: {
          status: [ //还款状态
            {
              id: '',
              text: '请选择'
            }, {
              id: '1',
              text: '未完成还款'
            }, {
              id: '2',
              text: '已完成全部还款'
            }, {
              id: '3',
              text: '提前结清申请'
            }, {
              id: '4',
              text: '提前结清'
            }, ],
          approvalStatus: [{
            id: '',
            text: '全部'
          }, {
            id: '1',
            text: '募集中'
          }, {
            id: '4',
            text: '待面签'
          }, {
            id: '5',
            text: '待审核'
          }, {
            id: '6',
            text: '审核通过'
          }, {
            id: '7',
            text: '审核拒绝'
          }, {
            id: '8',
            text: '审核驳回'
          }],
          drawStatus: [{
            id: '',
            text: '请选择'
          }, {
            id: '1',
            text: '未放款'
          }, {
            id: '2',
            text: '放款中'
          }, {
            id: '3',
            text: '放款成功'
          }, {
            id: '4',
            text: '放款失败'
          }, {
            id: '5',
            text: '拒绝贷款'
          }],
          reliefStatus: [{
            id: '',
            text: '请选择'
          }, {
            id: '1',
            text: '审核中'
          }, {
            id: '2',
            text: '驳回'
          }, {
            id: '3',
            text: '通过'
          }, ],
          dataFlag: [{
            id: '',
            text: '请选择'
          }, {
            id: '0',
            text: '银谷在线'
          }, {
            id: '1',
            text: '云钱袋'
          }, {
            id: '2',
            text: '线下CRM'
          }, ],
          overdueStatus: [{
            id: '',
            text: '请选择'
          }, {
            id: 1,
            text: '逾期'
          }, ],
          accountModifyStatus: [{
            id: '',
            text: '全部'
          }, {
            id: '0',
            text: '待审核'
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
          }, {
            id: '6',
            text: '已通知'
          }, {
            id: '7',
            text: '已完成'
          }],
          changeRepaymentStatus: [
            {id: '',text: '全部'},
            {id: '1',text: '待审核'},
            {id: '2',text: '通过'},
            {id: '3',text: '驳回'},
          ],
          advanceRepaymentStatus: [{
            id: '',
            text: '请选择'
          }, {
            id: '1',
            text: '待审核'
          }, {
            id: '2',
            text: '审核通过'
          }, {
            id: '3',
            text: '审核拒绝'
          }, {
            id: '4',
            text: '驳回'
          }, ],
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
        return this.recordsTotal % this.searchParams.length == 0 ? a : b
      },
      startNum: function () {
        return parseInt(this.searchParams.start) + 1;
      }
    },
    methods: {
      waitSigning: function (item) {
        if(!confirm("确定延长面签？")){
          return false;
        }
        var that = this;
        that.signParams.orderNum = item.loanCode ;
        that.$utils.ajax(that)(basePath2 + 'interview/extend', that.signParams, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.initTable();
            that.getInterviewConfig();
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
      getInterviewConfig: function () {
        var that = this;
        debugger
        that.$utils.ajax(that)(basePath2 + '/interview/getInterviewConfig',{}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.num.extendDays = response.body.data.extendDays
            that.num.extendTime = response.body.data.extendTime
            that.num.initDays = response.body.data.initDays
            console.log(response.body.data)
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
      closeWin: function () {
        this.isWinShow = false;
        this.winTitle = "";
        this.reasonShow = "";
      },
      openWin: function (item, index) {
        if(index == 1){
          this.winTitle = "放款失败原因";
          this.reasonShow = item.remarks;
        }
        this.isWinShow = true;
      },
      getOverdueStatus: function (item) {
        if(item.status && item.status.indexOf("逾期")>-1){
          return true;
        }else{
          return false;
        }
      },
      /**
       * finalauditrejectTime 驳回时间 运营驳回后倒计时10
       * finalauditrejectTime+10-now=驳回倒计时
       * @param value
       * @returns {*}
       */
      countTime_2: function (value) {
        if(!value){
          return "";
        }
        var n = new Date(value).getTime();
        var d = 24 * 60 * 60 * 1000;
        var d10 = 10 * d;
        var now = new Date().getTime();
        var m = n+d10-now;
        var res = parseInt(m/d);
        return res;
      },
      initHost315: function () {
        if (_host315) {
          this.host315 = _host315;
        }
      },
      toMD5: function (str) {
        var md5String = hex_md5(str);
        return md5String;
      },
      // 构建url，如："http://10.0.129.210:8091/Backstage/LoginJsonp?number=YG0001256&token=D638D4ECC95E35F9ED509D4C6772AB49";
      build315LoginUrl: function () {
        var hrData = this.$utils.getLocalData("hrData");
        var empNo = hrData.e0127;
        if (this.isTest315 == 'Y') {
          empNo = "YG0001256";
        }
        // 注：token的值 为number=YG0001256&key=yingu 进行 MD5加密生成
        var tokenString = "number=" + empNo + "&key=yingu";
        var token = this.toMD5(tokenString);
        token = token.toUpperCase();
        var url = this.host315 + "Backstage/LoginJsonp?number=" + empNo + "&token=" + token;
        return url;
      },
      build315DetailUrl: function (orderNum) {
        if (this.isTest315 == 'Y') {
          orderNum = 'BD1201705040002';
        }
        var url = this.host315 + "XinDai/Contract_Detail_True/" + orderNum;
        return url;
      },
      build315ContractUrl: function (orderNum) {
        if (this.isTest315 == 'Y') {
          orderNum = 'BD1201705040002';
        }
        var url = this.host315 + "ContractCompliance/ContractCompliance_Detail/" + orderNum;
        return url;
      },
      // 315数据详情页
      to315Detail: function (orderNum) {
        var that = this;
        $.ajax({
          url: that.build315LoginUrl(),
          type: "GET",
          dataType: "JSONP",
          jsonp: "callback",
          success: function (data) {
            if (data.isok) {
              //登录成功，可以进行跳转操作了。
              window.open(that.build315DetailUrl(orderNum));
            } else {
              //登录失败，msg为传入参数有误、认证失败、您的请求不被允许、身份信息在金管系统不存在、用户关小黑屋等信息提示。可以不进行跳转，也可跳转至登录页。
              alert(data.msg);
            }
          },
          error: function (e1, e2, e3) {
            alert(e1 + e2 + e3);
          }
        });
      },
      // 315数据合同页
      to315Contract: function (orderNum) {
        var that = this;
        $.ajax({
          url: that.build315LoginUrl(),
          type: "GET",
          dataType: "JSONP",
          jsonp: "callback",
          success: function (data) {
            if (data.isok) {
              //登录成功，可以进行跳转操作了。
              window.open(that.build315ContractUrl(orderNum));
            } else {
              //登录失败，msg为传入参数有误、认证失败、您的请求不被允许、身份信息在金管系统不存在、用户关小黑屋等信息提示。可以不进行跳转，也可跳转至登录页。
              alert(data.msg);
            }
          },
          error: function (e1, e2, e3) {
            alert(e1 + e2 + e3);
          }
        });
      },
      toMoney: function (value) {
        return toMoney(value)
      },
      formatMoney: function (value) {
        if ( !! !value) {
          return "0.00"
        }
        var f = parseFloat(value);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(value * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      formatRate: function (value) {
        if ( !! !value) {
          return "0.00%"
        }
        var f = parseFloat(value);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(value * 100);
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        s += '%';
        return s;
      },
      formatRate2: function (value) {
        if ( !! !value) {
          return "0.00%"
        }
        return value + "%";
      },
      formatRate3: function (value) {
        if ( !! !value) {
          return "0.00%"
        }
        var f = parseFloat(value);
        if (isNaN(f)) {
          return "0.00%";
        }
        var valInt = parseInt(value * 10000);
        var valFloat = valInt / 100;
        return valFloat + "%";
      },
      btnClick: function (items) { //页码点击事件
        if (items != this.cur) {
          this.cur = items
        }
        this.searchParams.start = (items - 1) * parseInt(this.searchParams.length)+1;
        this.initTable()
      },
      initTable: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'order/business', this.searchParams, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data.data;
            that.recordsTotal = response.body.data.recordsTotal;
            var a = parseInt(that.recordsTotal / that.searchParams.length)
            var b = a + 1
            that.all = that.recordsTotal % that.searchParams.length == 0 ? a : b
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
        this.searchParams.start = 0;
        this.searchParams.length = 10;
        this.searchParams.customerName = "";
        this.searchParams.orderNum = "";
        this.searchParams.approvalStatus = "";
        this.searchParams.drawStatus = "";
        this.searchParams.status = "";
        this.searchParams.accountModifyStatus = "";
        this.searchParams.changeRepaymentStatus = "";
        this.searchParams.reliefStatus = "";
        this.searchParams.advanceRepaymentStatus = "";
        this.searchParams.overdueStatus = "";
        this.searchParams.dataFlag = "";
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.customerName', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.orderNum', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.approvalStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.drawStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.status', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.accountModifyStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.changeRepaymentStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.reliefStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.advanceRepaymentStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.overdueStatus', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.dataFlag', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },
    mounted: function () {
      this.initTable();
      this.getInterviewConfig();
      this.watchSearchParams();
      //给table外面的div滚动事件绑定一个函数
      $("#tableDiv").scroll(function () {
        var left = $("#tableDiv").scrollLeft(); //获取滚动的距离
        var trs = $("#tableDiv table tr"); //获取表格的所有tr
        var ths = $('#tableDiv table tr:first th');

        //$(trs).children('#firstTr').css({"background-color":"red"});
        trs.each(function (i) {
          //对每一个tr（每一行）进行处理
          // 获得每一行下面的所有的td，然后选中下标为0的，即第一列，设置position为相对定位
          //相对于父div左边的距离为滑动的距离，然后设置个背景颜色，覆盖住后面几列数据滑动到第一列下面的情况
          //如果有必要也可以设置一个z-index属性
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
      this.initHost315();
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
  /*table.table input {*/
  /*border: none;*/
  /*text-align: center;*/
  /*}*/
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
  .tabSty {
    text-align: right;
  }
  /*.zh{*/
  /*display: inline-block;*/
  /*width: 26%;*/
  /*margin-left: 4%;*/
  /*}*/

</style>
