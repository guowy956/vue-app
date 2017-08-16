<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title" >
              <h5>详情</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-3">
                    <label class="col-sm-5 control-label">订单编号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{this.$route.params.orderNum}}</span>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <label class="col-sm-5 control-label">持卡客户:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ customerName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <label class="col-sm-5 control-label">身份证号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ idNum }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-content">
              <div class="clients-list">
                <ul class="nav nav-tabs">
                  <li class="active">
                    <a data-toggle="tab" href="#tab-1" aria-expanded="true">还款明细</a>
                  </li>
                  <li class="">
                    <a data-toggle="tab" href="#tab-2" aria-expanded="false">还款流水</a>
                  </li>
                  <li class="">
                    <a data-toggle="tab" href="#tab-3" aria-expanded="false">合同跟踪</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div id="tab-1" class="tab-pane active">
                    <div class="slimScrollDiv" style="position: relative; width: auto; height: 100%;">
                      <div class="table-responsive">
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
                            <td>{{ index + 1 }}</td>
                             
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
                    </div>
                  </div>
                  <div id="tab-2" class="tab-pane">
                    <div class="slimScrollDiv" style="position: relative; width: auto; height: 100%;">
                      <div class="table-responsive">

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
                          <td>{{ index + 1 }}</td>
                           
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
                         
                      </table>
                      </div>
                    </div>
                  </div>
                  <div id="tab-3" class="tab-pane">
                    <div class="slimScrollDiv" style="position: relative; width: auto; height: 100%;">
                      <div class="table-responsive">
                        <table class="table table-bordered" style="text-align: center !important;"> 
                          <tr>
                            <td>节点</td>
                            <td>时间</td>
                          </tr>
                          <tr v-for="(item,index) in timelines"> 
                            <td>{{ statusUtil[item.status] }}</td>
                            <td>{{ item.operatingTime}}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
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
  export default {
    name: 'customerDetail',
    data:function () {
      return {
        itemsDetail: [],  //还款明细
        itemsJournal: [], //还款流水
        timelines: [],     // 时间轴
        //100,700,750,760,770,800
        statusUtil: {
          "100": "预约进件",
          "700": "募集中",
          "750": "面签",
          "760": "审核驳回",
          "770": "审核通过",
          "800": "放款"
        },
        customerName: "",
        idNum: "",
        actualRepaymentDate: ""
      }
    },
    methods: {
      //      还款明细
      repaymentDetail: function (orderNum) {
        var that = this;
          that.$utils.ajax(that)(basePath2 + 'afterLoanCustomerSearch/customerRepanymentDetail?loanCode='+orderNum, {}, function (response) {
            if (typeof (response.body) === 'string') {
              response.body = JSON.parse(response.body);
            }
            console.log(response.body)
            if (response.body.code == '200') {
              that.itemsDetail = response.body.data.responseBody.infoList;
            } else if (response.body.code == '401') {
              that.$utils.clearLocalData("accessToken");
              that.$utils.clearLocalData("orgData");
              that.$utils.clearLocalData("hrData");
              that.$parent.$emit('changeLogin','N');
            } else {
              that.$utils.alert(response.body.message)
            }
          }, function (response) {
            that.$utils.alert("fail");
          }, "get");
      },
      //      还款流水
      repaymentStream: function (orderNum) {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'afterLoanCustomerSearch/customerRepaymentJournal?loanCode='+orderNum+'&dealDate='+this.actualRepaymentDate, {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
              debugger
            that.itemsJournal = response.body.data.responseBody.infoList;
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
      getTimeline: function(orderNum){
        var that = this;
        that.$utils.ajax(that)(basePath2+'team/order/audit/?orderNum='+orderNum,{}, function (response) {
          if (response.body.code == '200') {
            var timelineList = response.body.data.list;
            var statuss = "100,700,750,760,770,800";
            var arr = [];
            if(timelineList){
              $(timelineList).each(function (i, item) {
                if(statuss.indexOf(item.status)>-1){
                  arr.push(item);
                }
              });
            }
            that.timelines = arr;
          }else if(response.body.code == '401'){
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
    },
    mounted: function () {
      var orderNum = this.$route.params.orderNum;
      this.actualRepaymentDate = this.$route.params.actualRepaymentDate;
      this.repaymentDetail(orderNum);
      this.repaymentStream(orderNum);
      this.getTimeline(orderNum);
      this.customerName = this.$route.params.customerName;
      this.idNum = this.$route.params.idNum;
    }
  }

</script>
<style>

</style>





