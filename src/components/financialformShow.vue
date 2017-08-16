<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox" v-if="$route.params.flagList == 'list2' || $route.params.flagList == 'list3' || $route.params.flagList == 'list4' || $route.params.flagList == 'list5'">
            <div class="ibox-title">
              <h5>您的贷款用途<span class="important">*</span></h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客户申请何种产品:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.productName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">您的申请期限:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.term }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">还款方式:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.repayType }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">是否可变更还款日:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none" v-if="params.order.canRepayAdvance==true">是</span>
                      <span class="help-block m-b-none" v-if="params.order.canRepayAdvance==false">否</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">您申请贷款的用途:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.purpose }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">您申请的贷款额度:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.loanQuota }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款种类:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.loanSpecies }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.loanType }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">担保方式:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.assureType }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">还款来源:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.repaySource }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">您可接受的月最高还款额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerLoanPurpose.monthHighestRepayAmount }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">账户类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none" v-if="params.order.accountType == 1">第三方</span>
                      <span class="help-block m-b-none" v-if="params.order.accountType == 2">银行</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>您的个人信息<span class="important">*</span></h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">姓名:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.customName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">性别:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.sex }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">婚姻状况:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.maritalStatus }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">有无子女:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.hasChild == 'true' ? '有' : '无'  }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">移动电话:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.phone }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">电子邮箱:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.email }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">QQ:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.qq }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.weixin }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">健康状况:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.health }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">户口性质:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.accountNature }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">商业保险:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.syInsurance }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">社会保险:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.shInsurance }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">最后一次缴费金额（公积金）:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.fundAmount }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">最后一次缴费基数（公积金）:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.fundBase }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">证件类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.idType }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">证件号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.idNum }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group" v-show="customerCicInfoFun()">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">证件有效时间:</label>
                    <div class="col-sm-6 ">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.validityTerm }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"></label>
                    <div class="col-sm-6">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">民族:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.nation }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">最高学历:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.education }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">车产状况:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.hasCar }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">按揭类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.anjieType }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住宅类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.housingType }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住房状况:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.housingSituation }}</span>
                    </div>
                  </div>
                </div>
                <!--applicationTime-->
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住宅电话:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.zzPhone}}-{{ params.customerBaseInfo.zzPhones}}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">起始居住时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.startResidenceTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">供养人数:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.peopleNum }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">每月家庭支出:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.expend }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">您来本市的年份:</label>
                    <div class="col-sm-6 input-daterange">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.comeTime }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单张信用卡最高额度:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.creditLimit }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">参加工作时间:</label>
                    <div class="col-sm-6 input-daterange">
                      <span class="help-block m-b-none">
                        {{ params.customerBaseInfo.startWorkTime?transfers(params.customerBaseInfo.startWorkTime):params.customerBaseInfo.startWorkTime }}
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">表彰证书:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.commend }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <label class="col-sm-2 control-label">户口所在地:</label>
                    <div class="col-sm-9">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.hkAddress }}</span>
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.hkZipcode }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <label class="col-sm-2 control-label">住宅地址:</label>
                    <div class="col-sm-9">
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.zzAddress }}</span>
                      <span class="help-block m-b-none">{{ params.customerBaseInfo.zzZipcode }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>您的社保信息</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">连续缴纳社会保险:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerInsuranceInfo.continePayInsuranceTime }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">最近一次缴纳月份:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerInsuranceInfo.lastPayMonth }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">最近一次缴纳基数（养老）:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerInsuranceInfo.lastPayBase }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">最后一次缴费金额（养老）:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerInsuranceInfo.lastPayAmount }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">账户余额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerInsuranceInfo.accountBalance }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">商业保险月平均缴存:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerInsuranceInfo.monthPayCommercialInsurance }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">商业保险保额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerInsuranceInfo.commercialInsuranceAmount }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>您的房产信息（如果您有房产请填写下列信息）</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">房产类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.type }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">房产总价:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.totalPrice }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">房产所有人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.owner }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">房产（或合同）编号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.number }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">房产套数:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.count }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款利率:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.interestRate }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">建筑面积:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.area }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">购买单价:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.unitPrice }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">产权比例:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.propertyRight }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款年限:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.loanTerm }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">月供:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.monthly }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款余额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.loanBalance }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款银行:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.loanBank }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">第一次购房还款日:</label>
                    <div class="col-sm-6 input-daterange">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.repaymentDate }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">按揭总额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.mortgageTotal }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">按揭还款方式:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.mortgageRepaymentWay }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">邮政编码:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.zipcode }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">房产地址:</label>
                    <div class="col-sm-7">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.address }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">直租月平均房租:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.directRent }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">中介月平均房租:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerHouseInfo.indirectRent }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>您的工作信息<span class="important">*</span></h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位性质:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.companyNature }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">行业类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.industryNature }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位注册号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.registerNo }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">职业类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.professionType }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">每月发薪日:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.payTime }}<span class="">日</span></span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">工资发放形式:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.paymentWay }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">所在部门:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.deptName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">职位级别:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.jobLevel }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位电话:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.officeTel }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">入职时间:</label>
                    <div class="col-sm-6">
                      <div class="input-daterange">
                        <span class="help-block m-b-none">{{ params.customerWorkInfo.hiredate?transfers(params.customerWorkInfo.hiredate):params.customerWorkInfo.hiredate }}</span>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">每月收入:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.salary }}<span>元</span></span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位全称:</label>
                    <div class="col-sm-7">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.orgName }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <label class="col-sm-2 control-label">单位所在地:</label>
                    <div class="col-sm-9">
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.orgAddress }}</span>
                      <span class="help-block m-b-none">{{ params.customerWorkInfo.orgZipcode }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>私营业主信息（如果您是私营业主，请补充填写一下内容）<span class="important">*</span></h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">企业类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.type }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">经营场所:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.businessPlace }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">员工人数:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.employees }}<span>人</span></span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">公司注册时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.registerTime }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">公司注册号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.registerNo }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">月均流水:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.capitalMonth }}<span>元</span></span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">对公年收入流水:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.capitalYear }}<span>元</span></span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">企业第一大股东年收入流水:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.majorShareholder }}<span>元</span></span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">注册资本:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerBusinessman.registeredCapital }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>婚庆贷填写</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">夫妻双方月平均收入总和:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWeddingInfo.coupleAverage_income }}<span>元</span></span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">婚庆合同消费总额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWeddingInfo.weddingContract_spend }}<span>元</span></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>联系人信息（注：如有配偶，直系亲属2信息可不用填写）<span class="important">*</span></h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get" v-for="(customerContactsInfo, index) in params.customerContactsInfos">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">联系人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ customerContactsInfo.contactName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">关系:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ customerContactsInfo.relation }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位名称:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ customerContactsInfo.companyName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">移动电话:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ customerContactsInfo.phone }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ customerContactsInfo.weixin }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住宅地址:</label>
                    <div class="col-sm-7">
                      <span class="help-block m-b-none">{{ customerContactsInfo.address }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title" v-show="customerCicInfoFun()">
              <h5>保险信息填写<span class="important">*</span></h5>
            </div>

            <div class="ibox-content" v-show="customerCicInfoFun()">
              <form class="form-horizontal" method="get" data-vv-scope="form-9">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人姓名:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.customName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被投保人身份证号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.idNum }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span  class="important">*</span>投/被保人国籍:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">中国</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span  class="important">*</span>投/被保保人证件有效期:</label>
                    <div class="col-sm-6 input-daterange">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.validityTerm }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人手机号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.mobile }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人电子邮箱:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.email }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">第一受益人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">债权人</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">第二受益人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">法定继承人</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人出生日期:</label>
                    <div class="col-sm-6 input-daterange">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.dateOfBirth }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">被保人年龄:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.age }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保险人行业性质:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.industryNature }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保险人行业类别:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.industryCategory }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保险名称:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">中华借款人意外伤害保险</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人联系地址:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.address }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保险期限:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.term }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保单号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.insuranceNo }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保费金额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.insuredFee }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投保金额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.insuredAmount }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保险状态:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerCicInfo.status }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="ibox-title">
              <h5>工作人员填写<span class="important">*</span></h5>
            </div>
            <div class="ibox-content" >
              <form class="form-horizontal" method="get" v-if="$route.params.flagList == 'list4' && ($route.params.status == '200' || $route.params.status == '300' || $route.params.status == '310'|| $route.params.status == '350')">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">推荐人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.recommender }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客户来源渠道:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.saleChannel }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">是否加急:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.isUrgent == 'true' ? '是' : '否' }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">征信报告:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.hasCreditReport == 'true' ? '是' : '否'  }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">诉讼管辖法院:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">北京市朝阳区</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">咨询费:</label>
                    <!--<div class="col-sm-6">-->
                      <!--<input type="text" class="form-control" value="东方银谷" disabled="disabled">-->
                    <!--</div>-->
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">东方银谷</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">审核费:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">银谷普诚</span>
                    </div>
                    <!--<div class="col-sm-6">-->
                      <!--<input type="text" class="form-control" value="银谷普诚" disabled="disabled">-->
                    <!--</div>-->
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">服务费:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">东方普惠</span>
                    </div>
                    <!--<div class="col-sm-6">-->
                      <!--<input type="text" class="form-control" value="东方普惠" disabled="disabled">-->
                    <!--</div>-->
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">团队经理:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.teamManager }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">销售人员:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.salesman }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">信审反馈结果:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客服:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.customService }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">备注信息:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.remark }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group" v-if="$route.params.flagList == 'list4' && $route.params.status == '350'">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">信审拒绝原因:</label>
                    <div class="col-sm-8">
                      <!--<span class="help-block m-b-none">{{ params.order.remarkType }}</span>-->
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                      <!--<textarea class="form-control" v-model="params.order.remarkContent "></textarea>-->
                    </div>
                  </div>
                </div>
                <div class="form-group" v-if="($route.params.flagList == 'list4' || $route.params.flagList == 'list2') && $route.params.status == '310'">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">信审补件原因:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                      <!--<textarea class="form-control" v-model="params.order.remarkContent "></textarea>-->
                    </div>
                  </div>
                </div>
              </form>
              <form class="form-horizontal" method="get" v-if="($route.params.flagList == 'list2' || $route.params.flagList == 'list4') && $route.params.status == '400'">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">推荐人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.recommender }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客户来源渠道:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.saleChannel }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">是否加急:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.isUrgent == 'true' ? '是' : '否'  }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">征信报告:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.hasCreditReport == 'true' ? '是' : '否'  }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">申请时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">
                      {{ params.customerWorkerWrite.applicationTime?transfers(params.customerWorkerWrite.applicationTime):params.customerWorkerWrite.applicationTime }}
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">销售人员:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.salesman }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款金额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.approvalAmount }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">请输入放款金额:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.order.confirmAmount" style="height: 30px;border-radius: 3px;">
                    </div>
                    <div class="col-sm-6" v-if="$route.params.flagList == 'list2' && $route.params.status == '600'">
                      <span class="help-block m-b-none">{{ params.order.confirmAmount }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款产品:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.actualProductName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款期限:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.approvalTerm }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">信审反馈结果:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客服:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.customService }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">备注信息:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.remark }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">信审回馈信息:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                      <!--<textarea class="form-control" v-model="params.order.remarkContent"></textarea>-->
                    </div>
                  </div>
                </div>
              </form>
              <form class="form-horizontal" method="get" v-if="($route.params.flagList == 'list2' || $route.params.flagList == 'list4') && $route.params.status == '500' || $route.params.status == '510' || $route.params.status == '600' || $route.params.status == '610' || $route.params.status == '620' || $route.params.status == '700'">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">推荐人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.recommender }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客户来源渠道:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.saleChannel }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">是否加急:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.isUrgent == 'true' ? '是' : '否'  }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">征信报告:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.hasCreditReport == 'true' ? '是' : '否'  }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">申请时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.applicationTime?transfers(params.customerWorkerWrite.applicationTime):params.customerWorkerWrite.applicationTime }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">销售人员:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.salesman }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款金额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.approvalAmount }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">放款金额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.actualAmount }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款产品:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.actualProductName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款期限:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.approvalTerm }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">信审反馈结果:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客服:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.customService }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">备注信息:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.remark }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">信审回馈信息:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                      <!--<textarea class="form-control" v-model="params.order.remarkContent "></textarea>-->
                    </div>
                  </div>
                </div>
              </form>
              <form class="form-horizontal" method="get" v-if="$route.params.flagList == 'list3' && ($route.params.status == '未完成还款' || $route.params.status == '已完成全部还款' || $route.params.status == '提前结清申请' || $route.params.status == '提前结清')">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">推荐人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.recommender }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客户来源渠道:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.saleChannel }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">是否加急:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.isUrgent == 'true' ? '是' : '否'  }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">征信报告:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.hasCreditReport == 'true' ? '是' : '否'  }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">申请时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.applicationTime?transfers(params.customerWorkerWrite.applicationTime):params.customerWorkerWrite.applicationTime }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">销售人员:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.salesman }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款金额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.approvalAmount }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">放款金额:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.actualAmount }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款产品:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.actualProductName }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">批复贷款期限:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.approvalTerm }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">信审反馈结果:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客服:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ params.order.customService }}</span>
                      <!--<textarea class="form-control" v-model="params.customerWorkerWrite.remark"></textarea>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">备注信息:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.customerWorkerWrite.remark }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">信审回馈信息:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div class="ibox-title">
              <h5>图片列表<span class="important">*</span></h5>
            </div>
            <div class="ibox-content">
              <div class="clients-list">
                <ul class="nav nav-tabs">
                  <div class="swiper-container">
                    <div class="swiper-wrapper" style="height: 30px; margin-left:5%;">
                      <div class="swiper-slide ssl" id="div_D001">
                        <li class=""><a data-toggle="tab" @click="tabShow('D001')" aria-expanded="false">申请表</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D002">
                        <li class=""><a data-toggle="tab" @click="tabShow('D002')" aria-expanded="false">身份证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D003">
                        <li class=""><a data-toggle="tab" @click="tabShow('D003')" aria-expanded="false">征信报告签字版（图片）</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D004">
                        <li class=""><a data-toggle="tab" @click="tabShow('D004')" aria-expanded="false">收入证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D005">
                        <li class=""><a data-toggle="tab" @click="tabShow('D005')" aria-expanded="false">住址证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D006">
                        <li class=""><a data-toggle="tab" @click="tabShow('D006')" aria-expanded="false">工作证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D007">
                        <li class=""><a data-toggle="tab" @click="tabShow('D007')" aria-expanded="false">私营业主类</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D008">
                        <li class=""><a data-toggle="tab" @click="tabShow('D008')" aria-expanded="false">物业资料</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D009">
                        <li class=""><a data-toggle="tab" @click="tabShow('D009')" aria-expanded="false">其它资料</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D010">
                        <li class=""><a data-toggle="tab" @click="tabShow('D010')" aria-expanded="false">社保证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D011">
                        <li class=""><a data-toggle="tab" @click="tabShow('D011')" aria-expanded="false">关系证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D012">
                        <li class=""><a data-toggle="tab" @click="tabShow('D012')" aria-expanded="false">迟缴证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D013">
                        <li class=""><a data-toggle="tab" @click="tabShow('D013')" aria-expanded="false">资产证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D014">
                        <li class=""><a data-toggle="tab" @click="tabShow('D014')" aria-expanded="false">担保证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D015">
                        <li class=""><a data-toggle="tab" @click="tabShow('D015')" aria-expanded="false">按揭或购房合同</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D016">
                        <li class=""><a data-toggle="tab" @click="tabShow('D016')" aria-expanded="false">银行卡</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D017">
                        <li class=""><a data-toggle="tab" @click="tabShow('D017')" aria-expanded="false">教育证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D018">
                        <li class=""><a data-toggle="tab" @click="tabShow('D018')" aria-expanded="false">还款流水</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D019">
                        <li class=""><a data-toggle="tab" @click="tabShow('D019')" aria-expanded="false">为征信报告原版（PDF）</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D020">
                        <li class=""><a data-toggle="tab" @click="tabShow('D020')" aria-expanded="false">结婚证</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D021">
                        <li class=""><a data-toggle="tab" @click="tabShow('D021')" aria-expanded="false">商业保险合同或保单</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D022">
                        <li class=""><a data-toggle="tab" @click="tabShow('D022')" aria-expanded="false">车辆登记证</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D023">
                        <li class=""><a data-toggle="tab" @click="tabShow('D023')" aria-expanded="false">公积金证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D024">
                        <li class=""><a data-toggle="tab" @click="tabShow('D024')" aria-expanded="false">表彰证书</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D025">
                        <li class=""><a data-toggle="tab" @click="tabShow('D025')" aria-expanded="false">负债证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D026">
                        <li class=""><a data-toggle="tab" @click="tabShow('D026')" aria-expanded="false">财力证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D027">
                        <li class=""><a data-toggle="tab" @click="tabShow('D027')" aria-expanded="false">婚庆证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D028">
                        <li class=""><a data-toggle="tab" @click="tabShow('D028')" aria-expanded="false">经营证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D029">
                        <li class=""><a data-toggle="tab" @click="tabShow('D029')" aria-expanded="false">授权证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D030">
                        <li class=""><a data-toggle="tab" @click="tabShow('D030')" aria-expanded="false">连带证明</a></li>
                      </div>
                    </div>
                    <div class="swiper-button-next sbn"></div>
                    <div class="swiper-button-prev sbn"></div>
                  </div>
                </ul>
                <div v-if="customerScanningCopys" class="tab-content" id="tabShowDiv"></div>
              </div>
            </div>
            <!--按钮-->
            <div class="ibox-content">
              <!--已质检信审拒绝-->
              <div class="form-group" style="text-align: center;"  v-if="$route.params.flagList == 'list4' && $route.params.status == '350'">
                <button class="btn btn-primary" type="button" @click="openWin6()">复议</button>
                <button class="btn btn-warning" type="button" @click="openWin5()">拒绝</button>
                <button class="btn btn-danger" type="button"  @click="openWin8()">删除</button>
                <div style="margin-top: 10px">
                  <p style="color: #23527c;margin: 5px">拒绝:同意信审拒绝意见，且30天内不可以进件</p>
                  <p style="color: #23527c;">复议:对信审拒绝存在异议，每月每门店有30次复议次数</p>
                </div>
              </div>
              <!--待签约申请单列表-->
              <div class="form-group" style="text-align: center;"  v-if="$route.params.flagList == 'list2'">
                <button v-if="$route.params.status == '400'" class="btn btn-primary" type="button" @click="openWin6()">复议</button>
                <button v-if="btnCtrl_1 && $route.params.status == '400'" class="btn btn-primary" type="button" @click="openWin4()">确认借款金额</button>
                <button v-if="$route.params.status == '400'" class="btn btn-primary" type="button" @click="openWin5()">取消</button>
              </div>
              <div class="form-group" style="text-align: center;"  v-if="$route.params.flagList == 'list4' && $route.params.status == '400'">
                <button class="btn btn-primary" type="button" @click="openWin6()">复议</button>
                <button v-if="btnCtrl_1" class="btn btn-primary" type="button" @click="openWin4()">确认借款金额</button>
                <button class="btn btn-warning" type="button" @click="openWin5()">取消</button>
              </div>
              <!--&lt;!&ndash;已质检列表补件状态&ndash;&gt;提交到的是信审中-->
              <div class="form-group" style="text-align: center;"  v-if="$route.params.flagList == 'list4' && $route.params.status == '310'">
                <button class="btn btn-primary" type="button" @click="waitQualitylistSave()">提交</button>
                <button class="btn btn-primary" type="button">
                  <router-link :to="'/picList/'+$route.params.orderNum+'/'+params.customerBaseInfo.customName+'/'+$route.params.status+'/4'">
                    <a style="color: #FFFFFF">补件</a>
                  </router-link>
                </button>
                <button class="btn btn-danger" type="button" @click="openWin9()">拒绝</button>
              </div>
              <!--运营审核列表-->
              <div class="form-group" style="text-align: center;"  v-if="$route.params.flagList == 'list3'">
                <button class="btn btn-warning" type="button" @click="openWin2()" v-if="$route.params.flagList == 'list3' && params.order.status == '710' || params.order.status == '730'">取消签约</button>
                <button class="btn btn-danger" type="button" @click="openWin3()" v-if="$route.params.flagList == 'list3' && params.order.status == '760'">拒绝</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win5">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" v-if="$route.params.status == '400'">确定要取消？</h3>
            <h3 class="modal-title" v-if="$route.params.status == '350'">确定要拒绝？</h3>
          </div>
          <div class="modal-footer">
            <button v-if="$route.params.flagList == 'list4' && $route.params.status == '350'" class="btn btn-primary" type="button" @click="waitSignedOrderReject()">确定</button>
            <button v-if="$route.params.flagList == 'list2' && $route.params.status == '400'" class="btn btn-primary" type="button" @click="signedOrderCancel()">确定</button>
            <button v-if="$route.params.flagList == 'list4' && $route.params.status == '400'" class="btn btn-primary" type="button" @click="signedOrderCancel()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin5()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win2">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">确定要取消签约？</h3>
            <label class="control-label" style="font-size: 16px">请输入取消原因:</label>
            <textarea rows="3" cols="20" v-model="params.order.reason"style="width: 100%"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="businessCancelSign()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin2()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win9">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">确定要拒绝？</h3>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="waitSignedOrderReject1()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin9()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win8">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">确定要删除？</h3>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="delectList()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin8()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win3">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">确定要拒绝签约？</h3>
            <label class="control-label" style="font-size: 16px">请输入拒绝原因:</label>
            <textarea rows="3" cols="20" v-model="params.order.reason"style="width: 100%"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="businessReject()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin3()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win4">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="font-size: 18px">请输入放款金额</h4>
            <input type="text" class="form-control" v-model="params.order.confirmAmount">
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="confirmAmounts()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin4()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!--已质检申请单复议-->
    <div class="modal inmodal in" tabindex="-1" id="win6">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header" style="padding: 25px 0px;">
            <form class="form-horizontal" method="get" data-vv-scope="form-10">
            <div class="col-sm-12" style="margin-bottom:5%">
              <label class="col-sm-3 top">期限</label>
              <div class="col-sm-9">
                <select2 :options="options.loanTerms" v-model="params.order.approvalTerm" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
              </div>
            </div>
            <div class="col-sm-12">
              <label class="col-sm-3 top">金额</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="params.order.approvalAmount"/>
              </div>
              <span v-show="!validateexpectAmount(params.order.approvalAmount) && product.minAmount && product.maxAmount" class="help is-danger">金额 在{{toMoney(product.minAmount)}}元~{{toMoney(product.maxAmount)}}元之间</span>
            </div>

            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="waitSignedOrderReconsider()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin6()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" style="display: none"></div>
  </div>
</template>

<script>
  import select2 from './common/select2/select2.vue';
  var vm;
  export default {
    name: 'about',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    data () {
      return {
        btnCtrl_1: true,
        customerScanningCopys: [],
        reconsiderations: [],
        select2Style: {//select2-style样式
          width: '100%'
        },
        select2Style_2: {//select2-style样式
          "width": "15%",
          "margin-top": "-5px"
        },
        select2Style_3: {//select2-style样式
          "width": "15%",
          "margin-top": "-5px",
          "margin-left": "5px",
          "margin-right": "5px"
        },
        options:{
          loanTerms: [
            { id: '1', text: '1期' },
            { id: '3', text: '3期' },
            { id: '6', text: '6期' },
            { id: '12', text: '12期' },
            { id: '18', text: '18期' },
            { id: '24', text: '24期' },
            { id: '36', text: '36期' }
          ],
        },
        params: {
          customerCicInfo:{
            orderNum:this.$route.params.orderNum,
            operatorEmpno:"",
            dateOfBirth:"",
            //投/被保人姓名
            customName:"",
            //投/被投保人身份证号
            idNum:"",
            //投/被保人国籍
            nationality:"",
            //投/被保保人证件有效期
            validityTerm:"",
            //投/被保人手机号
            mobile:"",
            //投/被保人电子邮箱
            email:"",
            //第一受益人
            firstBeneficiary:"",
            //第二受益人
            secondBeneficiary:"",
            //被保人年龄
            age:"",
            //行业性质
            industryNature:"",
            //投/被保险人行业类别
            industryCategory:"",
            //保险名称
            insuranceName:"",
            //投/被保人联系地址
            address:"",
            //保险期限
            term:"",
            //保单号
            insuranceNo:"",
            //保费金额
            insuredFee:"",
            //投保金额
            insuredAmount:"",
            //状态
            status:"",
          },
//          个人信息
          customerBaseInfo: {
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            anjieType: "",
            comeTime: "",
            validityTerm: "",
            commend: "",
            hkZipcode: "",
            zzZipcode: "",
            creditLimit: "",
            customName: "",
            education: "",
            email: "",
            expend: "",
            fundAmount: "",
            fundBase: "",
            hasCar: "",
            hasChild: "",
            health: "",
            hkAddress: "",
            hkPro: "",
            hkCity: "",
            hkAdd: "",
            hkNum: "",
            homePhone: "",
            zzPhone: "",
            zzPhones: "",
            housingSituation: "",
            housingType: "",
            id: "",
            idNum: "",
            idType: "",
            isPrivate: "",
            maritalStatus: "",
            nation: "",
            operatorEmpno: "",
            peopleNum: "",
            phone: "",
            qq: "",
            sex: "",
            shInsurance: "",
            startResidenceTime: "",
            startWorkTime: "",
            syInsurance: "",
            weixin: "",
            zzAddress: "",
            zzPro: "",
            zzCity: "",
            zzAdd: "",
            zzNum: "",
            accountNature: "",
          },
//          私营业主信息
          customerBusinessman: {
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            businessPlace: "",
            capitalMonth: "",
            capitalYear: "",
            employees: "",
            majorShareholder: "",
            registerNo: "",
            registerTime: "",
            registeredCapital: "",
            type: "",
          },
//          联系人
          customerContactsInfos: [
            {
              address: "",
              companyName: "",
              contactName: "",
              content: "",
              createTime: 0,
              id: 0,
              operatorEmpno: "",
              opinion: "",
              orderNum: this.$route.params.orderNum,
              phone: "",
              phoneType: 0,
              relation: "",
              shortKey: "",
              weixin: ""
            }
          ],
//          房产信息
          customerHouseInfo: {
            address: "",
            area: "",
            count: "",
            directRent: "",
            id: "",
            indirectRent: "",
            interestRate: "",
            loanBalance: "",
            loanBank: "",
            loanTerm: "",
            monthly: "",
            mortgageRepaymentWay: "",
            mortgageTotal: "",
            number: "",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            owner: "",
            propertyRight: "",
            repaymentDate: "",
            totalPrice: "",
            type: "",
            unitPrice: "",
            zipcode: "",
          },
//          您的社保信息
          customerInsuranceInfo: {
            accountBalance: "",
            commercialInsuranceAmount: "",
            continePayInsuranceTime: "",
            id: "",
            lastPayAmount: "",
            lastPayBase: "",
            lastPayMonth: "",
            monthPayCommercialInsurance: "",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
          },
//          婚庆贷填写
          customerWeddingInfo: {
            id: "",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            coupleAverage_income: "",
            weddingContract_spend: "",
          },
//          贷款用途
          customerLoanPurpose: {
            assureType: "",
            id: "",
            loanType: "",
            loanSpecies: "",
            loanQuota: "",
            monthHighestRepayAmount: "",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            productId: "",
            productName: "",
            purpose: "",
            repaySource: "",
            repayType: "",
            term: "",
          },
//          工作信息
          customerWorkInfo: {
            companyNature: "",
            deptName: "",
            hiredate: "",
            industryNature: "",
            jobLevel: "",
            officeTel: "",
            officeNum: "",
            officeNums: "",
            orgAddress: "",
            orgPro: "",
            orgCity: "",
            orgAdd: "",
            orgNum: "",
            orgZipcode: "",
            orgName: "",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            payTime: "",
            paymentWay: "",
            professionType: "",
            registerNo: "",
            salary: "",
          },
//          工作人员填写
          customerWorkerWrite: {
            id: "",
            auditFee: "",
            consultingFee: "",
            hasCreditReport: "",
            isUrgent: "",
            recommender: "",
            litigation: "",
            remark: "",
            saleChannel: "",
            salesman: "",
            serviceFee: "",
            teamManager: "",
            teamManagerEmpno: "",
            approvalAmount: "",
            expectAmount: "",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
          },
          order: {
            isBuyInsurance:false,
            id: "",
            reason: "",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            expectAmount: "",
            confirmAmount: "",
            actualAmount: "",
            actualProductId: "",
            actualProductName: "",
            approvalTerm: "",
            status: this.$route.params.status,
            remarkType: "",
            canRepayAdvance: "",
            accountType: "",
            term: "",
            approvalAmount: ""
          }
        },
        BigDecimal: "",
        product: {},
      }
    },
    filters:{
      convertFirst : function(value){
        if(value!=null){
        value.substring(0,value.lastIndexOf("-"))
        }
      },
      convertLast : function(value){
        if(value!=null){
         value.substring(value.indexOf("-") + 1)
        }
      },
    },
    methods: {
      customerCicInfoFun: function(){
          debugger
        if(this.params.order.isBuyInsurance==true){
          return true;
        }
        return false;
      },
      initLoanTerms2: function(){
        var that = this;
        var productCode = this.params.order.actualProductId;
        if(productCode){
          that.$utils.ajax(that)(basePath2+'product/code?code='+productCode,{}, function (response) {
            if (response.body.code == '200') {
              var actualProduct = response.body.data;
              that.options.loanTerms = [];
              if(actualProduct.loanTerm){
                var arr = actualProduct.loanTerm.split(",");
                $(arr).each(function(i,item){
                  var loanTerm = {};
                  loanTerm.id = item;
                  loanTerm.text = item+"期";
                  that.options.loanTerms.push(loanTerm);
                });
              }
            }else if(response.body.code == '401'){
            }else{
              that.$utils.alert(response.body.message)
            }
          }, function (response) {
            that.$utils.alert("fail");
          },"get");
        }
      },
      initLoanTerms: function(){
        var that = this;
        that.options.loanTerms = [];
        if(that.product.loanTerm){
          var arr = that.product.loanTerm.split(",");
          $(arr).each(function(i,item){
            var loanTerm = {};
            loanTerm.id = item;
            loanTerm.text = item+"期";
            that.options.loanTerms.push(loanTerm);
          });
        }
      },
      initProduct: function(){
        var that = this;
        var orderNum = that.$route.params.orderNum;
        that.$utils.ajax(that)(basePath2+'product/orderNum?orderNum='+orderNum,{}, function (response) {
          if (response.body.code == '200') {
            that.product = response.body.data;
            that.initLoanTerms();
            var items = that.product.requiredItem;
            if(items){
              that.formCount = items.split(",").length;
            }
          }else if(response.body.code == '401'){
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
      validateexpectAmount: function (value) {
        if(value){
          var minValue = this.product.minAmount;
          var maxvalue = this.product.maxAmount;
          if(minValue && maxvalue){
            if(value>=minValue && value<=maxvalue){
              return true;
            }
          }
        }
        return false;
      },
      tabShow: function(fileType){
        $("#tabShowDiv").html("");
        var that = this;
        var files = [];
        if(that.customerScanningCopys){
          $(that.customerScanningCopys).each(function(i, item){
            if(item.fileType.indexOf(fileType)>-1){
              files.push(item);
            }
          });
        }
        if(files && files.length>0){
          var div = $("<div/>").addClass("tab-pane active").attr("style","text-align:center;padding-top:20px;");
          $(files).each(function(i, item){
            if(!item || !item.fileMd5 || !item.fileSuffix){
              return false;
            }
            var imgSrc = "";
            if (item.fileSuffix.indexOf("pdf") != -1) {
              imgSrc = "http://" + host + "/static/img/PDF.png";
            } else {
              imgSrc = basePath4+"preview/"+item.fileMd5+"/"+item.fileSuffix + "?thumbnails=true";
            }
            $("<img/>").attr("src",imgSrc).attr("style","width:150px;height:160px;margin-left:10px;").click(function(){
              if(item.fileSuffix == "pdf"){
                window.open(basePath4 + "preview/" + item.fileMd5 + "/" + item.fileSuffix)   ;
              }else {
              that.previewFile(item.fileMd5,item.fileSuffix);
              }
            }).appendTo(div);
          });
          $("#tabShowDiv").append(div);
        }

        $(".ssl").removeClass().addClass("swiper-slide ssl");
        $("#div_"+fileType).addClass("clickSSL");
      },
      //预览
      previewFile: function (md5, type) {
        var _this = this;
        _this.filePath = basePath4 + "preview/" + md5 + "/" + type;
        window.open("../../static/img/upload/uploadPreview.html?filePath="+basePath4 + "preview/" + md5 + "/" + type,'_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
      },
      toMoney: function (value) {
        return toMoney(value)
      },
      callbackA: function(value,text){
        this.params.customerLoanPurpose.productId = value;
        this.params.customerLoanPurpose.productName = text;
      },
      setParams: function (data) {
        console.log(data);
        if(!isNull(data)){
          if(data.customerCicInfo!=null){
            //投/被保人姓名
            this.params.customerCicInfo.customName =data.customerCicInfo.customName;
            //投/被投保人身份证号
            var idNums = data.customerCicInfo.idNum;
            this.params.customerCicInfo.idNum =idNums;
            this.params.customerCicInfo.dateOfBirth = idNums.substring(6, 10) + "-" + idNums.substring(10, 12) + "-" + idNums.substring(12, 14);
            //投/被保保人证件有效期
            this.params.customerCicInfo.validityTerm =data.customerCicInfo.validityTerm;
            //投/被保人手机号
            this.params.customerCicInfo.mobile =data.customerCicInfo.mobile;
            //投/被保人电子邮箱
            this.params.customerCicInfo.email =data.customerCicInfo.email;
            //第一受益人
            this.params.customerCicInfo.firstBeneficiary =data.customerCicInfo.firstBeneficiary;
            //第二受益人
            this.params.customerCicInfo.secondBeneficiary =data.customerCicInfo.secondBeneficiary;
            //被保人年龄
            this.params.customerCicInfo.age =data.customerCicInfo.age;
            //行业性质;;
            this.params.customerCicInfo.industryNature =_oneClassData_(data.customerCicInfo.industryNature);
            //投/被保险人行业类别
            this.params.customerCicInfo.industryCategory =_twoClassData2_(data.customerCicInfo.industryCategory);
            //保险名称
            this.params.customerCicInfo.insuranceName =data.customerCicInfo.insuranceName;
            //投/被保人联系地址
            this.params.customerCicInfo.address =data.customerCicInfo.address;
            //保险期限
            this.params.customerCicInfo.term =data.customerCicInfo.term;
            //保单号
            this.params.customerCicInfo.insuranceNo =data.customerCicInfo.insuranceNo;
            //保费金额
            this.params.customerCicInfo.insuredFee =data.customerCicInfo.insuredFee;
            //投保金额
            this.params.customerCicInfo.insuredAmount =data.customerCicInfo.insuredAmount;
            //状态
//              this.params.customerCicInfo.status =data.customerCicInfo.status;
          }
          if(!isNull(data.customerBaseInfo)){
            this.params.customerBaseInfo.validityTerm =data.customerBaseInfo.validityTerm;
            this.params.customerBaseInfo.id = data.customerBaseInfo.id;
            this.params.customerBaseInfo.anjieType = data.customerBaseInfo.anjieType;
            this.params.customerBaseInfo.health = data.customerBaseInfo.health;
            this.params.customerBaseInfo.accountNature = data.customerBaseInfo.accountNature;
            this.params.customerBaseInfo.comeTime = data.customerBaseInfo.comeTime;
            this.params.customerBaseInfo.commend = data.customerBaseInfo.commend;
            this.params.customerBaseInfo.hkZipcode = data.customerBaseInfo.hkZipcode;
            this.params.customerBaseInfo.zzZipcode = data.customerBaseInfo.zzZipcode;
            this.params.customerBaseInfo.creditLimit = data.customerBaseInfo.creditLimit;
            this.params.customerBaseInfo.customName = data.customerBaseInfo.customName;
            this.params.customerBaseInfo.education = data.customerBaseInfo.education;
            this.params.customerBaseInfo.email = data.customerBaseInfo.email;
            this.params.customerBaseInfo.expend = data.customerBaseInfo.expend;
            this.params.customerBaseInfo.fundAmount = data.customerBaseInfo.fundAmount;
            this.params.customerBaseInfo.fundBase = data.customerBaseInfo.fundBase;
            this.params.customerBaseInfo.hasCar = data.customerBaseInfo.hasCar;
            this.params.customerBaseInfo.hasChild = data.customerBaseInfo.hasChild ? data.customerBaseInfo.hasChild.toString() : '';
            this.params.customerBaseInfo.housingSituation = data.customerBaseInfo.housingSituation;
            this.params.customerBaseInfo.housingType = data.customerBaseInfo.housingType;
            this.params.customerBaseInfo.idNum = data.customerBaseInfo.idNum;
            this.params.customerBaseInfo.idType = data.customerBaseInfo.idType;
            this.params.customerBaseInfo.isPrivate = data.customerBaseInfo.isPrivate;
            this.params.customerBaseInfo.maritalStatus = data.customerBaseInfo.maritalStatus;
            this.params.customerBaseInfo.nation = data.customerBaseInfo.nation;
            this.params.customerBaseInfo.orderNum = data.customerBaseInfo.orderNum;
            this.params.customerBaseInfo.peopleNum = data.customerBaseInfo.peopleNum;
            this.params.customerBaseInfo.phone = data.customerBaseInfo.phone;
            this.params.customerBaseInfo.qq = data.customerBaseInfo.qq;
            this.params.customerBaseInfo.sex = data.customerBaseInfo.sex;
            this.params.customerBaseInfo.shInsurance = data.customerBaseInfo.shInsurance;
            this.params.customerBaseInfo.startWorkTime = data.customerBaseInfo.startWorkTime;
            this.params.customerBaseInfo.syInsurance = data.customerBaseInfo.syInsurance;
            this.params.customerBaseInfo.weixin = data.customerBaseInfo.weixin;
            this.params.customerBaseInfo.startResidenceTime = data.customerBaseInfo.startResidenceTime;
            if(!isNull(data.customerBaseInfo.hkAddress)) {
              var arr = data.customerBaseInfo.hkAddress.split("-");
              this.params.customerBaseInfo.hkAddress = data.customerBaseInfo.hkAddress;
              this.params.customerBaseInfo.hkPro = isNull(arr[0]) ? "" : arr[0];
              this.params.customerBaseInfo.hkCity = isNull(arr[1]) ? "" : arr[1];
              this.params.customerBaseInfo.hkAdd = isNull(arr[2]) ? "" : arr[2];
            }
            if(!isNull(data.customerBaseInfo.zzAddress)) {
              var arr = data.customerBaseInfo.zzAddress.split("-");
              this.params.customerBaseInfo.zzAddress = data.customerBaseInfo.zzAddress;
              this.params.customerBaseInfo.zzPro = isNull(arr[0]) ? "" : arr[0];
              this.params.customerBaseInfo.zzCity = isNull(arr[1]) ? "" : arr[1];
              this.params.customerBaseInfo.zzAdd = isNull(arr[2]) ? "" : arr[2];
            }
            if(!isNull(data.customerBaseInfo.homePhone)) {
              var arr = data.customerBaseInfo.homePhone.split("-");
              this.params.customerBaseInfo.zzPhone = isNull(arr[0]) ? "" : arr[0];
              this.params.customerBaseInfo.zzPhones = isNull(arr[1]) ? "" : arr[1];
            }
          }
          if(!isNull(data.customerBusinessman)){
            this.params.customerBusinessman.businessPlace = data.customerBusinessman.businessPlace;
            this.params.customerBusinessman.capitalMonth = data.customerBusinessman.capitalMonth;
            this.params.customerBusinessman.capitalYear = data.customerBusinessman.capitalYear;
            this.params.customerBusinessman.employees = data.customerBusinessman.employees;
            this.params.customerBusinessman.majorShareholder = data.customerBusinessman.majorShareholder;
            this.params.customerBusinessman.id = data.customerBusinessman.id;
            this.params.customerBusinessman.operatorEmpno = data.customerBusinessman.operatorEmpno;
            this.params.customerBusinessman.orderNum = data.customerBusinessman.orderNum;
            this.params.customerBusinessman.registerNo = data.customerBusinessman.registerNo;
            this.params.customerBusinessman.registerTime = data.customerBusinessman.registerTime;
            this.params.customerBusinessman.registeredCapital = data.customerBusinessman.registeredCapital;
            this.params.customerBusinessman.type = data.customerBusinessman.type;
          }
          if(!isNull(data.customerHouseInfo)){
            this.params.customerHouseInfo.address = data.customerHouseInfo.address;
            this.params.customerHouseInfo.area = data.customerHouseInfo.area;
            this.params.customerHouseInfo.count = data.customerHouseInfo.count;
            this.params.customerHouseInfo.directRent = data.customerHouseInfo.directRent;
            this.params.customerHouseInfo.indirectRent = data.customerHouseInfo.indirectRent;
            this.params.customerHouseInfo.interestRate = data.customerHouseInfo.interestRate;
            this.params.customerHouseInfo.loanBalance = data.customerHouseInfo.loanBalance;
            this.params.customerHouseInfo.loanBank = data.customerHouseInfo.loanBank;
            this.params.customerHouseInfo.loanTerm = data.customerHouseInfo.loanTerm;
            this.params.customerHouseInfo.monthly = data.customerHouseInfo.monthly;
            this.params.customerHouseInfo.id = data.customerHouseInfo.id;
            this.params.customerHouseInfo.mortgageRepaymentWay = data.customerHouseInfo.mortgageRepaymentWay;
            this.params.customerHouseInfo.mortgageTotal = data.customerHouseInfo.mortgageTotal;
            this.params.customerHouseInfo.number = data.customerHouseInfo.number;
            this.params.customerHouseInfo.owner = data.customerHouseInfo.owner;
            this.params.customerHouseInfo.orderNum = data.customerHouseInfo.orderNum;
            this.params.customerHouseInfo.propertyRight = data.customerHouseInfo.propertyRight;
            this.params.customerHouseInfo.repaymentDate = data.customerHouseInfo.repaymentDate;
            this.params.customerHouseInfo.totalPrice = data.customerHouseInfo.totalPrice;
            this.params.customerHouseInfo.type = data.customerHouseInfo.type;
            this.params.customerHouseInfo.unitPrice = data.customerHouseInfo.unitPrice;
            this.params.customerHouseInfo.zipcode = data.customerHouseInfo.zipcode;
          }
          if(!isNull(data.customerInsuranceInfo)){
            this.params.customerInsuranceInfo.lastPayMonth = data.customerInsuranceInfo.lastPayMonth;
            this.params.customerInsuranceInfo.accountBalance = data.customerInsuranceInfo.accountBalance;
            this.params.customerInsuranceInfo.commercialInsuranceAmount = data.customerInsuranceInfo.commercialInsuranceAmount;
            this.params.customerInsuranceInfo.continePayInsuranceTime = data.customerInsuranceInfo.continePayInsuranceTime;
            this.params.customerInsuranceInfo.id = data.customerInsuranceInfo.id;
            this.params.customerInsuranceInfo.lastPayAmount = data.customerInsuranceInfo.lastPayAmount;
            this.params.customerInsuranceInfo.lastPayBase = data.customerInsuranceInfo.lastPayBase;
            this.params.customerInsuranceInfo.monthPayCommercialInsurance = data.customerInsuranceInfo.monthPayCommercialInsurance;
            this.params.customerInsuranceInfo.orderNum = data.customerInsuranceInfo.orderNum;
          }
          if(!isNull(data.customerLoanPurpose)){
            this.params.customerLoanPurpose.assureType = data.customerLoanPurpose.assureType;
            this.params.customerLoanPurpose.id = data.customerLoanPurpose.id;
            this.params.customerLoanPurpose.loanQuota = data.customerLoanPurpose.loanQuota;
            this.params.customerLoanPurpose.loanSpecies = data.customerLoanPurpose.loanSpecies;
            this.params.customerLoanPurpose.loanType = data.customerLoanPurpose.loanType;
            this.params.customerLoanPurpose.monthHighestRepayAmount = data.customerLoanPurpose.monthHighestRepayAmount;
            this.params.customerLoanPurpose.orderNum = data.customerLoanPurpose.orderNum;
            this.params.customerLoanPurpose.productId = data.customerLoanPurpose.productId;
            this.params.customerLoanPurpose.productName = data.customerLoanPurpose.productName;
            $(".select2-chosen").eq(0).text ="hffhvj"
            this.params.customerLoanPurpose.purpose = data.customerLoanPurpose.purpose;
            this.params.customerLoanPurpose.repaySource = data.customerLoanPurpose.repaySource;
            this.params.customerLoanPurpose.repayType = data.customerLoanPurpose.repayType;
            this.params.customerLoanPurpose.term = data.customerLoanPurpose.term;
          }
          console.log('data.customerWeddingInfo=' + data.customerWeddingInfo)
          if(!isNull(data.customerWeddingInfo)){
            this.params.customerWeddingInfo.coupleAverage_income = data.customerWeddingInfo.coupleAverage_income;
            console.log('this.params.customerWeddingInfo.coupleAverage_income'+this.params.customerWeddingInfo.coupleAverage_income)
            this.params.customerWeddingInfo.weddingContract_spend = data.customerWeddingInfo.weddingContract_spend;
            this.params.customerWeddingInfo.id = data.customerWeddingInfo.id;
            this.params.customerWeddingInfo.orderNum = data.customerWeddingInfo.orderNum;
          }
          if(!isNull(data.customerWorkInfo)){
            if(!isNull(data.customerWorkInfo.officeTel)) {
              var arr = data.customerWorkInfo.officeTel.split("-");
              this.params.customerWorkInfo.officeNum = isNull(arr[0]) ? "" : arr[0];
              this.params.customerWorkInfo.officeNums = isNull(arr[1]) ? "" : arr[1];
            }
            if(!isNull(data.customerWorkInfo.orgAddress)) {
              var arr = data.customerWorkInfo.orgAddress.split("-");
              this.params.customerWorkInfo.orgAddress = data.customerWorkInfo.orgAddress;
              this.params.customerWorkInfo.orgPro = isNull(arr[0]) ? "" : arr[0];
              this.params.customerWorkInfo.orgCity = isNull(arr[1]) ? "" : arr[1];
              this.params.customerWorkInfo.orgAdd = isNull(arr[2]) ? "" : arr[2];
            }
            this.params.customerWorkInfo.companyNature = data.customerWorkInfo.companyNature;
            this.params.customerWorkInfo.deptName = data.customerWorkInfo.deptName;
            this.params.customerWorkInfo.hiredate = data.customerWorkInfo.hiredate;
            this.params.customerWorkInfo.id = data.customerWorkInfo.id;
            this.params.customerWorkInfo.industryNature = data.customerWorkInfo.industryNature;
            this.params.customerWorkInfo.jobLevel = data.customerWorkInfo.jobLevel;
            this.params.customerWorkInfo.officeTel = data.customerWorkInfo.officeTel;
            this.params.customerWorkInfo.operatorEmpno = data.customerWorkInfo.operatorEmpno;
            this.params.customerWorkInfo.orderNum = data.customerWorkInfo.orderNum;
//            this.params.customerWorkInfo.orgAddress = data.customerWorkInfo.orgAddress;
            this.params.customerWorkInfo.orgName = data.customerWorkInfo.orgName;
            this.params.customerWorkInfo.payTime = data.customerWorkInfo.payTime;
            this.params.customerWorkInfo.paymentWay = data.customerWorkInfo.paymentWay;
            this.params.customerWorkInfo.professionType = data.customerWorkInfo.professionType;
            this.params.customerWorkInfo.registerNo = data.customerWorkInfo.registerNo;
            this.params.customerWorkInfo.salary = data.customerWorkInfo.salary;
            this.params.customerWorkInfo.orgZipcode = data.customerWorkInfo.orgZipcode;
          }
          if(!isNull(data.customerWorkerWrite)){
            this.params.customerWorkerWrite.applicationTime = data.customerWorkerWrite.applicationTime;
            this.params.customerWorkerWrite.auditFee = data.customerWorkerWrite.auditFee;
            this.params.customerWorkerWrite.consultingFee = data.customerWorkerWrite.consultingFee;
            this.params.customerWorkerWrite.isUrgent = data.customerWorkerWrite.isUrgent ? data.customerWorkerWrite.isUrgent.toString() : '';
            this.params.customerWorkerWrite.hasCreditReport = data.customerWorkerWrite.hasCreditReport ? data.customerWorkerWrite.hasCreditReport.toString() : '';
            this.params.customerWorkerWrite.id = data.customerWorkerWrite.id;
            this.params.customerWorkerWrite.litigation = data.customerWorkerWrite.litigation;
            this.params.customerWorkerWrite.orderNum = data.customerWorkerWrite.orderNum;
            this.params.customerWorkerWrite.remark = data.customerWorkerWrite.remark;
            this.params.customerWorkerWrite.saleChannel = data.customerWorkerWrite.saleChannel;
            this.params.customerWorkerWrite.salesman = data.customerWorkerWrite.salesman;
            this.params.customerWorkerWrite.salesmanEmpno = data.customerWorkerWrite.salesmanEmpno;
            this.params.customerWorkerWrite.serviceFee = data.customerWorkerWrite.serviceFee;
            this.params.customerWorkerWrite.serviceFee = data.customerWorkerWrite.serviceFee;
            this.params.customerWorkerWrite.teamManagerEmpno = data.customerWorkerWrite.teamManagerEmpno;
            this.params.customerWorkerWrite.teamManager = data.customerWorkerWrite.teamManager;
            this.params.customerWorkerWrite.recommender = data.customerWorkerWrite.recommender;
          }
          if(!isNull(data.order)){
            this.params.order.approvalAmount = data.order.approvalAmount;
            this.params.order.isBuyInsurance = data.order.isBuyInsurance;
            this.params.order.actualAmount = data.order.actualAmount;
            this.params.order.customService = data.order.customService;
            this.params.order.expectAmount = data.order.expectAmount;
            this.params.order.id = data.order.id;
            this.params.order.orderNum = data.order.orderNum;
            this.params.order.productId = data.order.productId;
            this.params.order.productName = data.order.productName;
            this.params.order.proposer = data.order.proposer;
            this.params.order.purpose = data.order.purpose;
            this.params.order.rate = data.order.rate;
            this.params.order.salesman = data.order.salesman;
            this.params.order.salesmanEmpno = data.order.salesmanEmpno;
            this.params.order.status = data.order.status;
            this.params.order.term = data.order.term;
            this.params.order.actualProductId = data.order.actualProductId;
            if(this.params.order.actualProductId){
              this.initLoanTerms2();
            }
            this.params.order.actualProductName = data.order.actualProductName;
            this.params.order.approvalTerm = data.order.approvalTerm;
            this.params.order.remarkType = data.order.remarkType;
            this.params.order.canRepayAdvance = data.order.canRepayAdvance;
            this.params.order.remarkContent = data.order.remarkContent;
            this.params.order.accountType = data.order.accountType;
          }
          if(data.customerCicInfo!=null){
            //投/被保人姓名
            this.params.customerCicInfo.customName =data.customerCicInfo.customName;
            //投/被投保人身份证号
            var idNums = data.customerCicInfo.idNum;
            this.params.customerCicInfo.idNum =idNums;
            this.params.customerCicInfo.dateOfBirth = idNums.substring(6, 10) + "-" + idNums.substring(10, 12) + "-" + idNums.substring(12, 14);
            //投/被保保人证件有效期
              this.params.customerCicInfo.validityTerm =data.customerCicInfo.validityTerm;
              this.params.customerBaseInfo.validityTerm =data.customerBaseInfo.validityTerm;
            //投/被保人手机号
            this.params.customerCicInfo.mobile =data.customerCicInfo.mobile;
            //投/被保人电子邮箱
            this.params.customerCicInfo.email =data.customerCicInfo.email;
            //第一受益人
            this.params.customerCicInfo.firstBeneficiary =data.customerCicInfo.firstBeneficiary;
            //第二受益人
            this.params.customerCicInfo.secondBeneficiary =data.customerCicInfo.secondBeneficiary;
            //被保人年龄
            this.params.customerCicInfo.age =data.customerCicInfo.age;
            //行业性质;;
            this.params.customerCicInfo.industryNature =_oneClassData_(data.customerCicInfo.industryNature);
            //投/被保险人行业类别
            this.params.customerCicInfo.industryCategory =_twoClassData2_(data.customerCicInfo.industryCategory);
            //保险名称
            this.params.customerCicInfo.insuranceName =data.customerCicInfo.insuranceName;
            //投/被保人联系地址
            this.params.customerCicInfo.address =data.customerCicInfo.address;
            //保险期限
            this.params.customerCicInfo.term =data.customerCicInfo.term;
            //保单号
            this.params.customerCicInfo.insuranceNo =data.customerCicInfo.insuranceNo;
            //保费金额
            this.params.customerCicInfo.insuredFee =data.customerCicInfo.insuredFee;
            //投保金额
            this.params.customerCicInfo.insuredAmount =data.customerCicInfo.insuredAmount;
            //状态
//              this.params.customerCicInfo.status =data.customerCicInfo.status;
//            switch(data.customerCicInfo.status){
//              case "1":
//                this.params.customerCicInfo.status = "投保中";
//                break;
//              case "2":
//                this.params.customerCicInfo.status = "承保中";
//                break;
//              case "3":
//                this.params.customerCicInfo.status = "保险失效";
//                break;
//              case "4":
//                this.params.customerCicInfo.status = "已退保，保险失效";
//                break;
//              case "5":
//                this.params.customerCicInfo.status = "已赔付，保险失效";
//                break;
//              case "10":
//                this.params.customerCicInfo.status = "核保成功";
//                break;
//              case "20":
//                this.params.customerCicInfo.status = "拒保";
//                break;
//              case "-1":
//                this.params.customerCicInfo.status = "核保失败";
//                break;
//              case "-2":
//                this.params.customerCicInfo.status = "投保失败";
//                break;
//            }
            switch(data.customerCicInfo.status){
              case "1":
                this.params.customerCicInfo.status = "投保中";
                break;
              case "2":
                this.params.customerCicInfo.status = "承保中";
                break;
              case "-2":
                this.params.customerCicInfo.status = "投保失败";
                break;
              case "20":
                this.params.customerCicInfo.status = "核保失败";
                break;
              case "10":
                this.params.customerCicInfo.status = "核保成功";
                break;
              default :
                this.params.customerCicInfo.status = "投保中";
                break;
            }
          }
        }
      },
      initProducts : function () {//select2-初始化option
        var that = this;
        that.$utils.ajax(that)(basePath2+'product/all',{}, function (response) {
          if (response.body.code == '200') {
            var products = response.body.data;
            var items = [];
            if(products){
              $(products).each(function(i, item){
                var pro = {};
                pro.id = item.productCode;
                pro.text = item.productName;
                items.push(pro);
              });
            }
            that.products = items;
          }else if(response.body.code == '401'){
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
      initCustomerScanningCopys: function () {
        var that = this;
        var orderNum = that.$route.params.orderNum;
        var url = basePath2+"order/"+orderNum+"/scanningcopy";
        that.$utils.ajax(that)(url, {}, function (response) {
          if (response.body.code == '200') {
            if(response.body.data && response.body.data.length>0){
              that.customerScanningCopys = response.body.data;
              /*$("#contactInfoDiv").find(".select2-chosen").each(function (i, item) {
               var relation = that.params.customerContactsInfos[i].relation;
               $(item).text(relation);
               });*/
              that.tabShow('D001');
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
          that.$utils.alert(this.failedMsg);
        },"get");
      },
      getTabId: function(index){
        return "tab-"+index;
      },
      initContacts: function () {
        var that = this;
        var orderNum = that.$route.params.orderNum;
        var url = basePath2+"order/"+orderNum+"/contacts";
        that.$utils.ajax(that)(url, {}, function (response) {
          if (response.body.code == '200') {
            if(response.body.data && response.body.data.length>0){
              that.params.customerContactsInfos = response.body.data;
              $("#contactInfoDiv").find(".select2-chosen").each(function (i, item) {
                var relation = that.params.customerContactsInfos[i].relation;
                $(item).text(relation);
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
          that.$utils.alert(this.failedMsg);
        },"get");
      },


        initReconsideration: function () {
          var that = this;
          var orderNum = that.$route.params.orderNum;
          var url = basePath2+"order/reconsider/"+orderNum;
          that.$utils.ajax(that)(url, {}, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
               that.reconsiderations = response.body.data;
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
       getNum : function(index){
        //计算序号
        return parseInt(0) + parseInt(index);
      },
      initOrdernum: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'order/' + that.$route.params.orderNum, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.setParams(response.body.data);
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
      //      删除申请单
      delectList: function () {
        var deleteParamsObj = {
          id: vm.params.order.id,
          orderNum: vm.params.order.orderNum,
        };
        var deleteParams = JSON.stringify(deleteParamsObj);
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'order', deleteParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.$utils.alert('删除成功')
            that.closeWin8();
            that.$router.push('/alreadQualityList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin1();
          }
        }, function (response) {
          that.$utils.alert(that.failedMsg);
        },"delete","clock");
      },
      //      待签约详情复议操作
      waitSignedOrderReconsider: function () {
        var val = this.validateexpectAmount(this.params.order.approvalAmount);
        if(!val){
          return false;
        }
        this.params.customerBaseInfo.hkAddress = this.params.customerBaseInfo.hkPro + '-'+ this.params.customerBaseInfo.hkCity + '-' + this.params.customerBaseInfo.hkAdd;
        this.params.customerBaseInfo.zzAddress = this.params.customerBaseInfo.zzPro + '-' + this.params.customerBaseInfo.zzCity + '-' + this.params.customerBaseInfo.zzAdd;
        this.params.customerWorkInfo.orgAddress = this.params.customerWorkInfo.orgPro + '-' + this.params.customerWorkInfo.orgCity + '-' + this.params.customerWorkInfo.orgAdd;
        this.params.customerBaseInfo.homePhone = this.params.customerBaseInfo.zzPhone + '-' + this.params.customerBaseInfo.zzPhones;
        this.params.customerWorkInfo.officeTel = this.params.customerWorkInfo.officeNum + '-' + this.params.customerWorkInfo.officeNums;
        this.params.order.term = this.params.customerLoanPurpose.term
        this.params.customerContactsInfos = [];
        var jsonParams = JSON.stringify(this.params);
        var that = this;
          that.$utils.ajax(that)(basePath2 + 'audit/order/waitSignedOrderReconsider?orderNum=' +vm.params.order.orderNum + "&amount=" + vm.params.order.approvalAmount + "&term=" + vm.params.order.approvalTerm, {},function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.$utils.alert('复议成功')
            that.$router.push('/AlreadyQualityList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"put","clock");
      },
//      确认金额
     confirmAmounts: function () {
        var that = this;
//       批复金额
       var approvalAmounts = new BigDecimal(that.params.order.approvalAmount.toString()).setScale(2, MathContext.ROUND_HALF_UP);
//       确认金额
       var confirmAmount = new BigDecimal(that.params.order.confirmAmount.toString()).setScale(2, MathContext.ROUND_HALF_UP);
       if(approvalAmounts.isGreaterThanOrEqualTo(confirmAmount)){
         that.$utils.ajax(that)(basePath2 + 'audit/order/waitSignedOrderConfirm?id=' +vm.params.order.id + "&confirmAmount=" + vm.params.order.confirmAmount, {}, function (response) {
           if(typeof (response.body) === 'string'){
             response.body = JSON.parse(response.body);
           }
           console.log(response.body)
           if (response.body.code == '200') {
             that.$utils.alert('确认成功')
             that.closeWin4();
             that.$router.push('/waitSignList/')
           }else if(response.body.code == '401'){

           }else{
             that.$utils.alert(response.body.message)
             that.closeWin4();
           }
         }, function (response) {
           that.$utils.alert("fail");
           that.closeWin4();
         },"put","clock");
       }else {
         that.$utils.alert("确认金额不能大于批复贷款金额")
       }

      },
//      待质检详情提交操作
      waitQualitylistSave: function () {
        this.params.customerBaseInfo.hkAddress = this.params.customerBaseInfo.hkPro + '-'+ this.params.customerBaseInfo.hkCity + '-' + this.params.customerBaseInfo.hkAdd;
        this.params.customerBaseInfo.zzAddress = this.params.customerBaseInfo.zzPro + '-' + this.params.customerBaseInfo.zzCity + '-' + this.params.customerBaseInfo.zzAdd;
        this.params.customerWorkInfo.orgAddress = this.params.customerWorkInfo.orgPro + '-' + this.params.customerWorkInfo.orgCity + '-' + this.params.customerWorkInfo.orgAdd;
        this.params.customerBaseInfo.homePhone = this.params.customerBaseInfo.zzPhone + '-' + this.params.customerBaseInfo.zzPhones;
        this.params.customerWorkInfo.officeTel = this.params.customerWorkInfo.officeNum + '-' + this.params.customerWorkInfo.officeNums;
        var jsonParams = JSON.stringify(this.params);
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/waitCheckOrderSubmit', jsonParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.$utils.alert('提交成功')
            that.$router.push('/waitQualityList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"put","clock");
      },
//      待质检详情取消操作(信审拒绝)
      waitSignedOrderReject: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/waitSignedOrderReject?id='+vm.params.order.id, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.$utils.alert('已同意信审拒绝,处理成功')
            that.closeWin5();
            that.$router.push('/waitSignList/')
            that.$router.push('/alreadQualityList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin5();
          }
        }, function (response) {
          that.$utils.alert("fail");
          that.closeWin5();
        },"put","clock");
      },
      waitSignedOrderReject1: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/waitSignedOrderReject?id='+vm.params.order.id, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.$utils.alert('拒绝成功')
            that.closeWin9();
            that.$router.push('/waitSignList/')
            that.$router.push('/alreadQualityList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin9();
          }
        }, function (response) {
          that.$utils.alert("fail");
          that.closeWin9();
        },"put","clock");
      },
      // 已质检列表和待签约列表：信审通过状态的订单取消按钮调用放弃签约接口
      signedOrderCancel: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/signedOrderCancel?id='+vm.params.order.id, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.$utils.alert('取消成功')
            that.closeWin5();
            that.$router.push('/waitSignList/')
            that.$router.push('/alreadQualityList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin5();
          }
        }, function (response) {
          that.$utils.alert("fail");
          that.closeWin5();
        },"put","clock");
      },
//      运营审核详情取消签约操作
      businessCancelSign: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/businessCancelSign?id='+vm.params.order.id + "&reason=" + vm.params.order.reason, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.$utils.alert('取消成功')
            that.closeWin2();
            that.$router.push('/operateAuditList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin2();
          }
        }, function (response) {
          that.$utils.alert("fail");
          that.closeWin2();
        },"put","clock");
      },
//      运营审核详情拒绝操作
      businessReject: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/businessReject?id='+vm.params.order.id + "&reason=" + vm.params.order.reason, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.$utils.alert('拒绝成功')
            that.closeWin3();
            that.$router.push('/operateAuditList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin3();
          }
        }, function (response) {
          that.$utils.alert("fail");
          that.closeWin3();
        },"put","clock");
      },
      openWin9: function () {
        $('#win9').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin9: function () {
        $('#win9').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      openWin8: function () {
        $('#win8').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin8: function () {
        $('#win8').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      openWin5: function () {
        $('#win5').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin5: function () {
        $('#win5').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      openWin6: function () {
        $('#win6').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin6: function () {
        $('#win6').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
//      确认借款金额
      openWin4: function () {
        $('#win4').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin4: function () {
        $('#win4').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
//      确定要取消签约
      openWin2: function () {
        $('#win2').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin2: function () {
        $('#win2').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
//      确定要拒绝签约
      openWin3: function () {
        $('#win3').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin3: function () {
        $('#win3').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      swiper: function () {
        var appendNumber = 4;
        var prependNumber = 1;
        var swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 6,
          centeredSlides: false,
          paginationClickable: true,
          spaceBetween: 0,
          slidesOffsetBefore: 50
//          slidesOffsetAfter: 100,
        });
      },
      transfer: function (str) {
        var date = new Date(str);
        return date.getTime();
      },
      transfers: function (longDate) {
        var date2 = new Date(longDate);
        var str2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        return str2
      }
    },
    mounted: function () {
      vm = this;
      this.swiper();
      this.initOrdernum();
      this.initProducts();
      this.initContacts();
      this.initCustomerScanningCopys();
      this.initReconsideration();
//      this.date();
      //      入职时间
//      $('#hiredate').datetimepicker({
//        language:  'zh-CN',
//        format: 'yyyy-mm-dd',
//        weekStart: 1,
//        todayBtn:  1,
//        autoclose: 1,
//        todayHighlight: 1,
//        startView: 2,
//        minView: 2,
//        forceParse: 0
//      }).on('changeDate', function(ev) {
//        that.params.customerWorkInfo.hiredate = that.transfer($("#hiredate").val());
//      });
      if(this.$route.params.status > 400 && this.$route.params.flagList == 'list4'){
        alert("这个单子不可以操作");
      }
      this.btnCtrl_1 = _btnCtrl_1;
    },
    created : function () {
      this.initProduct();
    }
  }
</script>
<style>
  @import '/static/css/swiper/swiper.css';
  .help-block {
    margin-top: 8px !important;
  }
  .col-sm-5{
    padding-right: 10px !important;
    padding-left: 10px !important;
  }
  .col-sm-2{
    margin-left: 4%;
  }
  .ssl{
    margin:5px;
    background-color: #F5F5F6;
  }
  .ssl:hover{
    background-color: #eee;
  }
  .ssl:active{
    background-color: #18a689;
    color:#FFFFFF;
  }
  .ssl:active{
    background-color: #2a62bc;
  }
  .sbn{
    background-color: transparent;
    padding: 10px;
    width: 50px;
  }
  .clickSSL{
    background: #18a689;
    color:#FFFFFF;
  }
  .color{
    color:#FFFFFF;
  }
  .top{
    margin-top: 7px;
    text-align: left;
  }
</style>
