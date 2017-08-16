<!--suppress ALL -->
<template>
  <div class="gray-bg marginTop">
    <div class="setTimeout" v-if="$route.params.flag == 'list1' && ($route.params.status == '100' || $route.params.status == '110')"> 
      <input type="text" readonly v-model="params.order.recordOrderConsumeTime" >
    </div>
    <div class="setBtnout" v-if="$route.params.flag == 'list1' && ($route.params.status == '100' || $route.params.status == '110')">
      <button class="btn btn-primary" type="button" @click="openWin()">保存申请单</button>
    </div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins" v-if="$route.params.flag == 'list2' || $route.params.flag == 'list1'">
            <div v-if="params.order.hasCreditReport == false || params.order.hasCreditReport == 'false'">
              <!--<v-if="params.customerWorkerWrite.hasCreditReport== false || params.customerWorkerWrite.hasCreditReport== 'false'">-->
              <!--<div class="ibox-title" ><h5>征信报告自动抓取<span class="important"></span></h5></div>-->
              <!--<div class="ibox-content">-->
                <!--<form class="form-horizontal" method="get">-->
                  <!--<div class="form-group">-->
                    <!--<div class="col-sm-6">-->
                      <!--<label class="col-sm-5 control-label">用户名:</label>-->
                      <!--<div class="col-sm-6">-->
                        <!--<input type="text" class="form-control" v-model="loginName" maxlength="32">-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="col-sm-6">-->
                      <!--<label class="col-sm-5 control-label">密码:</label>-->
                      <!--<div class="col-sm-6">-->
                        <!--<input type="text" class="form-control" v-model="passWord" maxlength="32">-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="form-group">-->
                    <!--<div class="col-sm-6">-->
                      <!--<label class="col-sm-5 control-label">身份验证码:</label>-->
                      <!--<div class="col-sm-6">-->
                        <!--<input type="text" class="form-control" v-model="loginIdCode" maxlength="32">-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="col-sm-6">-->
                      <!--<label class="col-sm-5 control-label">图片验证码:</label>-->
                      <!--<div class="col-sm-3" style="padding-right: 0px">-->
                        <!--<input type="text" class="form-control" v-model="creditReportVerifyCodeValue" maxlength="6">-->
                      <!--</div>-->
                      <!--<div class="col-sm-3" style="padding-left: 2px">-->
                        <!--<img :src="creditReportVerifyCodeUrl" class="yzmImg" @click="loginNum()" maxlength="6">-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="form-group" style="text-align: right; margin-right: 4%;">-->
                    <!--<div class="col-sm-12">-->
                      <!--<button class="btn btn-primary" @click="loginReport()">登录</button>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="form-group" id="downAuthCode" style="display: none;">-->
                    <!--<div class="col-sm-6">-->
                      <!--<label class="col-sm-5 control-label">图片验证码:</label>-->
                      <!--<div class="col-sm-3" style="padding-right: 0px">-->
                        <!--<input type="text" class="form-control" v-model="creditReportLoginValue" maxlength="6">-->
                      <!--</div>-->
                      <!--<div class="col-sm-3" style="padding-left: 2px">-->
                        <!--<img :src="creditReportLoginUrl" style="height:32px; width: 100px">-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="col-sm-6">-->
                      <!--<button class="btn btn-primary" @click="downReport()" style="float: right;-->
      <!--margin-right: 11%;">下载</button>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</form>-->
              <!--</div>-->
            <!--</div>-->

            <div class="ibox-title" v-show="isShowModule(1)"><h5>您的贷款用途<span class="important">*</span></h5></div>
            <div class="ibox-content" v-show="isShowModule(1)">
              <!--data-vv-scope="form-1"-->
              <form class="form-horizontal" method="get" data-vv-scope="form-1">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>客户申请何种产品:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerLoanPurpose.productName" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.productId: {{ params.customerLoanPurpose.productId }}--params.customerLoanPurpose.productName: {{ params.customerLoanPurpose.productName }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>您的申请期限:</label>
                    <div class="col-sm-6">
                      <p>
                        <select2 :options="options.loanTerms" v-model="params.customerLoanPurpose.term" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.term: {{ params.customerLoanPurpose.term }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerLoanPurpose.term" data-vv-as="您的申请期限" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.term') }" name="term">
                      <span v-show="errors.has('form-1.term')" class="help is-danger">{{ errors.first('form-1.term') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>还款方式:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.repayTypes" v-model="params.customerLoanPurpose.repayType" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.repayType: {{ params.customerLoanPurpose.repayType }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerLoanPurpose.repayType" data-vv-as="还款方式" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.repayType') }" name="repayType">
                      <span v-show="errors.has('form-1.repayType')" class="help is-danger">{{ errors.first('form-1.repayType') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>是否可变更还款日:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.canRepayAdvances" v-model="params.order.canRepayAdvance" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.order.canRepayAdvance: {{ params.order.canRepayAdvance }}</p>
                      <!--<input type="hidden" class="form-control" v-model="params.order.canRepayAdvance" data-vv-as="是否可变更还款日" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.canRepayAdvance') }" name="canRepayAdvance">-->
                      <!--<span v-show="isNull(params.order.canRepayAdvance)" class="help is-danger">是否可变更还款日 是必须的.</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>您申请贷款的用途:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.purposes" v-model="params.customerLoanPurpose.purpose" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.purpose: {{ params.customerLoanPurpose.purpose }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerLoanPurpose.purpose" data-vv-as="您申请贷款的用途" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.purpose') }" name="purpose">
                      <span v-show="errors.has('form-1.purpose')" class="help is-danger">{{ errors.first('form-1.purpose') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>您申请的贷款额度:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerLoanPurpose.loanQuota" data-vv-as="贷款额度" v-validate="'required|money'" maxlength="13":class="{'input': true, 'is-danger': errors.has('form-1.loanQuota') }" name="loanQuota">
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.loanQuota: {{ params.customerLoanPurpose.loanQuota }}</p>
                      <span v-show="errors.has('form-1.loanQuota')" class="help is-danger">{{ errors.first('form-1.loanQuota') }}</span>
                      <span v-show="!validateLoanQuota(params.customerLoanPurpose.loanQuota) && product.minAmount && product.maxAmount" class="help is-danger">贷款额度 在{{toMoney(product.minAmount)}}元~{{toMoney(product.maxAmount)}}元之间</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款种类:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.loanSpeciess" v-model="params.customerLoanPurpose.loanSpecies" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.loanSpecies: {{ params.customerLoanPurpose.loanSpecies }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerLoanPurpose.loanSpecies" data-vv-as="贷款种类" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.loanSpecies') }" name="loanSpecies">
                      <span v-show="errors.has('form-1.loanSpecies')" class="help is-danger">{{ errors.first('form-1.loanSpecies') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.loanTypes" v-model="params.customerLoanPurpose.loanType" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.loanType: {{ params.customerLoanPurpose.loanType }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerLoanPurpose.loanType" data-vv-as="贷款类型" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.loanType') }" name="loanType">
                      <span v-show="errors.has('form-1.loanType')" class="help is-danger">{{ errors.first('form-1.loanType') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">担保方式:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.assureTypes" v-model="params.customerLoanPurpose.assureType" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.assureType: {{ params.customerLoanPurpose.assureType }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">还款来源:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.repaySources" v-model="params.customerLoanPurpose.repaySource" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.repaySource: {{ params.customerLoanPurpose.repaySource }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>您可接受的月最高还款额:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerLoanPurpose.monthHighestRepayAmount" data-vv-as="可接受的月最高还款额" maxlength="13" v-validate="'required|decimal|max:13'" :class="{'input': true, 'is-danger': errors.has('form-1.monthHighestRepayAmount') }" name="monthHighestRepayAmount">
                      <p v-if="debugShow" class="debugCss">params.customerLoanPurpose.monthHighestRepayAmount: {{ params.customerLoanPurpose.monthHighestRepayAmount }}</p>
                      <span v-show="errors.has('form-1.monthHighestRepayAmount')" class="help is-danger">{{ errors.first('form-1.monthHighestRepayAmount') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title" v-show="isShowModule(2)"><h5>您的个人信息<span class="important">*</span></h5></div>
            <div class="ibox-content" v-show="isShowModule(2)">
              <form class="form-horizontal" method="get" data-vv-scope="form-2" >
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>姓名:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.customName" disabled="disabled" data-vv-as="姓名" v-validate="'required|max:32'" :class="{'input': true, 'is-danger': errors.has('form-2.customName') }" name="customName" maxlength="32">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.customName: {{ params.customerBaseInfo.customName }}</p>
                      <span v-show="errors.has('form-2.customName')" class="help is-danger">{{ errors.first('form-2.customName') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>性别:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.sexs" v-model="params.customerBaseInfo.sex" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.sex: {{ params.customerBaseInfo.sex }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.sex" data-vv-as="性别" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.sex') }" name="sex">
                      <span v-show="errors.has('form-2.sex')" class="help is-danger">{{ errors.first('form-2.sex') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>婚姻状况:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.maritalStatuss" v-model="params.customerBaseInfo.maritalStatus" :select2Style="select2Style" @myMethod="callback_maritalStatus" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.maritalStatus: {{ params.customerBaseInfo.maritalStatus }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.maritalStatus" data-vv-as="婚姻状况" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.maritalStatus') }" name="maritalStatus">
                      <span v-show="errors.has('form-2.maritalStatus')" class="help is-danger">{{ errors.first('form-2.maritalStatus') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>有无子女:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.hasChilds" v-model="params.customerBaseInfo.hasChild" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.hasChild: {{ params.customerBaseInfo.hasChild }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.hasChild" data-vv-as="有无子女" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.hasChild2') }" name="hasChild">
                      <span v-show="isNullChild( params.customerBaseInfo.hasChild )" class="help is-danger">有无子女 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>移动电话:</label>
                    <div class="col-sm-6">
                      <input type="number" class="form-control" v-model="params.customerBaseInfo.phone" disabled="disabled" data-vv-as="移动电话" v-validate="'required|max:16'" maxlength="16" :class="{'input': true, 'is-danger': errors.has('form-2.phone') }" name="phone">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.phone: {{ params.customerBaseInfo.phone }}</p>
                      <span v-show="errors.has('form-2.phone')" class="help is-danger">{{ errors.first('form-2.phone') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">电子邮箱:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.email" data-vv-as="电子邮箱" v-validate="'email|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-2.email') }" name="email">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.email: {{ params.customerBaseInfo.email }}</p>
                      <span v-show="errors.has('form-2.email')" class="help is-danger">{{ errors.first('form-2.email') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">QQ:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.qq" data-vv-as="QQ" v-validate="'max:16'" maxlength="16" :class="{'input': true, 'is-danger': errors.has('form-2.qq') }" name="qq">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.qq: {{ params.customerBaseInfo.qq }}</p>
                      <span v-show="errors.has('form-2.qq')" class="help is-danger">{{ errors.first('form-2.qq') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.weixin" data-vv-as="weixin" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-2.weixin') }" name="weixin">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.weixin: {{ params.customerBaseInfo.weixin }}</p>
                      <span v-show="errors.has('form-2.weixin')" class="help is-danger">{{ errors.first('form-2.weixin') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">健康状况:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.healths" v-model="params.customerBaseInfo.health" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.health: {{ params.customerBaseInfo.health }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">户口性质:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.accountNatures" v-model="params.customerBaseInfo.accountNature" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.accountNature: {{ params.customerBaseInfo.accountNature }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">商业保险:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.syInsurances" v-model="params.customerBaseInfo.syInsurance" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.syInsurance: {{ params.customerBaseInfo.syInsurance }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">社会保险:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.shInsurances" v-model="params.customerBaseInfo.shInsurance" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.shInsurance: {{ params.customerBaseInfo.shInsurance }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && params.customerLoanPurpose.productName == '薪金贷'" class="important">*</span>最后一次缴费金额（公积金）:</label>
                    <div class="col-sm-6">
                      <input v-if="params.customerLoanPurpose.productName == '薪金贷'" type="text" class="form-control" v-model="params.customerBaseInfo.fundAmount" data-vv-as="最后一次缴费金额（公积金）" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-2.fundAmount') }" name="fundAmount">
                      <input v-if="params.customerLoanPurpose.productName != '薪金贷'" type="text" class="form-control" v-model="params.customerBaseInfo.fundAmount" data-vv-as="最后一次缴费金额（公积金）" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-2.fundAmount') }" name="fundAmount">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.fundAmount: {{ params.customerBaseInfo.fundAmount }}</p>
                      <span v-show="errors.has('form-2.fundAmount')" class="help is-danger">{{ errors.first('form-2.fundAmount') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && params.customerLoanPurpose.productName == '薪金贷'" class="important">*</span>最后一次缴费基数（公积金）:</label>
                    <div class="col-sm-6">
                      <input v-if="params.customerLoanPurpose.productName == '薪金贷'" type="text" class="form-control" v-model="params.customerBaseInfo.fundBase" data-vv-as="最后一次缴费基数（公积金）" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-2.fundBase') }" name="fundBase">
                      <input v-if="params.customerLoanPurpose.productName != '薪金贷'" type="text" class="form-control" v-model="params.customerBaseInfo.fundBase" data-vv-as="最后一次缴费基数（公积金）" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-2.fundBase') }" name="fundBase">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.fundBase: {{ params.customerBaseInfo.fundBase }}</p>
                      <span v-show="errors.has('form-2.fundBase')" class="help is-danger">{{ errors.first('form-2.fundBase') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>证件类型:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.idType" disabled="disabled" v-validate="'required|max:3'" :class="{'input': true, 'is-danger': errors.has('form-2.idType') }" name="idType">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.idType: {{ params.customerBaseInfo.idType }}</p>
                      <span v-show="errors.has('form-2.idType')" class="help is-danger">{{ errors.first('form-2.idType') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>证件号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.idNum" disabled="disabled" data-vv-as="证件号" maxlength="32" v-validate="'required|idNumber|max:32'" :class="{'input': true, 'is-danger': errors.has('form-2.idNum') }" name="idNum">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.idNum: {{ params.customerBaseInfo.idNum }}</p>
                      <span v-show="errors.has('form-2.idNum')" class="help is-danger">{{ errors.first('form-2.idNum') }}</span>
                      <span v-show="!validateAge()" class="help is-danger">年龄{{ getAge() }} 不在产品年龄区间{{ product.minAge }}~{{ product.maxAge }}范围内.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group" >
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span class="important">*</span>证件有效时间:</label>
                    <div class="col-sm-6 input-daterange">
                      <input type="text" class="form-control" id="validityTerm_base" data-vv-as="证件有效时间" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.validityTerm') }" name="validityTerm">
                      <span v-show=" !params.customerCicInfo.validityTerm && !params.customerBaseInfo.validityTerm" class="help is-danger">证件有效时间 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">永久期限:</label>
                    <div class="col-sm-6">
                        <button class="btn btn-primary" type="button" @click="permanentTerm()">永久期限</button>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>民族:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.nation" data-vv-as="民族" v-validate="'required|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-2.nation') }" name="nation">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.nation: {{ params.customerBaseInfo.nation }}</p>
                      <span v-show="errors.has('form-2.nation')" class="help is-danger">{{ errors.first('form-2.nation') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>最高学历:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.educations" v-model="params.customerBaseInfo.education" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.education: {{ params.customerBaseInfo.education }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.education" data-vv-as="最高学历" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.education') }" name="education">
                      <span v-show="errors.has('form-2.education')" class="help is-danger">{{ errors.first('form-2.education') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>车产状况:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.hasCars" v-model="params.customerBaseInfo.hasCar" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.hasCar: {{ params.customerBaseInfo.hasCar }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.hasCar" data-vv-as="车产状况" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.hasCar') }" name="hasCar">
                      <span v-show="errors.has('form-2.hasCar')" class="help is-danger">{{ errors.first('form-2.hasCar') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">按揭类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.anjieTypes" v-model="params.customerBaseInfo.anjieType" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.anjieType: {{ params.customerBaseInfo.anjieType }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>住宅类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.housingTypes" v-model="params.customerBaseInfo.housingType" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.housingType: {{ params.customerBaseInfo.housingType }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.housingType" data-vv-as="住宅类型" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.housingType') }" name="housingType">
                      <span v-show="errors.has('form-2.housingType')" class="help is-danger">{{ errors.first('form-2.housingType') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>住房状况:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.housingSituations" v-model="params.customerBaseInfo.housingSituation" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.housingSituation: {{ params.customerBaseInfo.housingSituation }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.housingSituation" data-vv-as="住房状况" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.housingSituation') }" name="housingSituation">
                      <span v-show="errors.has('form-2.housingSituation')" class="help is-danger">{{ errors.first('form-2.housingSituation') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住宅电话:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control telInput" v-model="params.customerBaseInfo.zzPhone" maxlength="4">--
                      <input type="text" class="form-control telInputs" v-model="params.customerBaseInfo.zzPhones" maxlength="8">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.zzPhone: {{ params.customerBaseInfo.zzPhone }} -- params.customerBaseInfo.zzPhones: {{ params.customerBaseInfo.zzPhones }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">起始居住时间:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.startResidenceTime" id="monthPicker2" placeholder="格式如：2017-05" maxlength="7">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.startResidenceTime: {{ params.customerBaseInfo.startResidenceTime }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.startResidenceTime" data-vv-as="起始居住时间" v-validate="'month|monthLessNow|max:7'" :class="{'input': true, 'is-danger': errors.has('form-2.startResidenceTime') }" name="startResidenceTime">
                      <span v-show="errors.has('form-2.startResidenceTime')" class="help is-danger">{{ errors.first('form-2.startResidenceTime') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>供养人数:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.peopleNum" data-vv-as="供养人数" v-validate="'required|numeric|max:10'" maxlength="10" :class="{'input': true, 'is-danger': errors.has('form-2.peopleNum') }" name="peopleNum">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.peopleNum: {{ params.customerBaseInfo.peopleNum }}</p>
                      <span v-show="errors.has('form-2.peopleNum')" class="help is-danger">{{ errors.first('form-2.peopleNum') }}</span>
                    </div>
                    <span class="unit">人</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>每月家庭支出:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.expend" data-vv-as="每月家庭支出" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-2.expend') }" name="expend">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.expend: {{ params.customerBaseInfo.expend }}</p>
                      <span v-show="errors.has('form-2.expend')" class="help is-danger">{{ errors.first('form-2.expend') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>您来本市的年份:</label>
                    <div class="col-sm-6 input-daterange">
                      <select2 :options="options.years" v-model="params.customerBaseInfo.comeTime" :select2Style="select2Style"></select2>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.comeTime" data-vv-as="您来本市的年份" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.comeTime') }" name="comeTime">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.comeTime: {{ params.customerBaseInfo.comeTime }}</p>
                      <span v-show="errors.has('form-2.comeTime')" class="help is-danger">{{ errors.first('form-2.comeTime') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>单张信用卡最高额度:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.creditLimit" data-vv-as="单张信用卡最高额度" v-validate="'required|money|max:7'" :class="{'input': true, 'is-danger': errors.has('form-2.creditLimit') }" name="creditLimit" maxlength="7">
                      <span v-show="errors.has('form-2.creditLimit')" class="help is-danger">{{ errors.first('form-2.creditLimit') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.creditLimit: {{ params.customerBaseInfo.creditLimit }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>参加工作时间:</label>
                    <div class="col-sm-6 input-daterange">
                      <input type="text" class="form-control" id="startWorkTime" data-vv-as="参加工作时间" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.startWorkTime') }" name="startWorkTime">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.startWorkTime: {{ params.customerBaseInfo.startWorkTime }}</p>
                      <span v-show="!params.customerBaseInfo.startWorkTime" class="help is-danger">参加工作时间 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">表彰证书:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.commends" v-model="params.customerBaseInfo.commend" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.commend: {{ params.customerBaseInfo.commend }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <label class="col-sm-2 control-label"><span v-if="starShow" class="important">*</span>户口所在地:</label>
                    <div class="col-sm-9">
                      <select2 :options="area.provinceOptions" v-model="params.customerBaseInfo.hkPro" :select2Style="select2Style_2" @myMethod="callback_1" placeholder="省份"></select2>
                      <select2 :options="area.cityOptions_1" v-model="params.customerBaseInfo.hkCity" :select2Style="select2Style_3" @myMethod="callback_area_1" placeholder="城市"></select2>
                      <select2 :options="area.areaOptions_1" v-model="params.customerBaseInfo.hkArea" :select2Style="select2Style_3" placeholder="区县"></select2>
                      <span>详细地址</span>
                      <input type="text" class="form-control addressWidth" v-model="params.customerBaseInfo.hkAdd" data-vv-as="地址" v-validate="'required'":class="{'input': true, 'is-danger': errors.has('form-2.hkAdd') }" name="hkAdd">
                      <span>邮政编码</span>
                      <input type="text" class="form-control numberWidth" v-model="params.customerBaseInfo.hkZipcode" maxlength="6">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.hkPro: {{ params.customerBaseInfo.hkPro }} -- params.customerBaseInfo.hkCity: {{ params.customerBaseInfo.hkCity }}-- params.customerBaseInfo.hkArea: {{ params.customerBaseInfo.hkArea }} -- params.customerBaseInfo.hkAdd: {{ params.customerBaseInfo.hkAdd }} -- params.customerBaseInfo.hkZipcode: {{ params.customerBaseInfo.hkZipcode }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.hkPro" data-vv-as="省份" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.hkPro') }" name="hkPro">
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.hkCity" data-vv-as="城市" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.hkCity') }" name="hkCity">
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.hkArea" data-vv-as="区县" v-validate="" :class="{'input': true, 'is-danger': errors.has('form-2.hkArea') }" name="hkArea">
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.hkAdd" data-vv-as="地址" v-validate="'required|max:1024'" maxlength="1024" :class="{'input': true, 'is-danger': errors.has('form-2.hkAdd') }" name="hkAdd">
                      <!--<input type="hidden" class="form-control" v-model="params.customerBaseInfo.hkZipcode" data-vv-as="邮编" v-validate="'required|max:6'" maxlength="6" :class="{'input': true, 'is-danger': errors.has('form-2.hkZipcode') }" name="hkZipcode">-->
                      <span v-show="!params.customerBaseInfo.hkPro" class="help is-danger myspan">省份 是必须的.</span>
                      <span v-show="!params.customerBaseInfo.hkCity" class="help is-danger myspan">城市 是必须的.</span>
                      <!--<span v-show="!params.customerBaseInfo.hkArea" class="help is-danger myspan">区县 是必须的.</span>-->
                      <span v-show="!params.customerBaseInfo.hkAdd" class="help is-danger myspan">地址 是必须的.</span>
                      <!--<span v-show="!params.customerBaseInfo.hkZipcode" class="help is-danger myspan">邮编 是必须的.</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <label class="col-sm-2 control-label"><span v-if="starShow" class="important">*</span>住宅地址:</label>
                    <div class="col-sm-9">
                      <select2 :options="area.provinceOptions" v-model="params.customerBaseInfo.zzPro" :select2Style="select2Style_2" @myMethod="callback_2" placeholder="省份"></select2>
                      <select2 :options="area.cityOptions_2" v-model="params.customerBaseInfo.zzCity" :select2Style="select2Style_3" @myMethod="callback_area_2" placeholder="城市"></select2>
                      <select2 :options="area.areaOptions_2" v-model="params.customerBaseInfo.zzArea" :select2Style="select2Style_3" placeholder="区县"></select2>
                      <span>详细地址</span>
                      <input type="text" class="form-control addressWidth" v-model="params.customerBaseInfo.zzAdd" data-vv-as="城市" v-validate="'required'":class="{'input': true, 'is-danger': errors.has('form-2.zzAdd') }" name="zzAdd" />
                      <span>邮政编码</span>
                      <input type="text" class="form-control numberWidth" v-model="params.customerBaseInfo.zzZipcode" maxlength="6">
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.hkPro: {{ params.customerBaseInfo.zzPro }} -- params.customerBaseInfo.zzCity: {{ params.customerBaseInfo.zzCity }} -- params.customerBaseInfo.zzArea: {{ params.customerBaseInfo.zzArea }} -- params.customerBaseInfo.zzAdd: {{ params.customerBaseInfo.zzAdd }} -- params.customerBaseInfo.zzZipcode: {{ params.customerBaseInfo.zzZipcode }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.zzPro" data-vv-as="省份" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.zzPro') }" name="zzPro">
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.zzCity" data-vv-as="城市" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.zzCity') }" name="zzCity">
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.zzArea" data-vv-as="区县" v-validate="" :class="{'input': true, 'is-danger': errors.has('form-2.zzArea') }" name="zzArea">
                      <input type="hidden" class="form-control" v-model="params.customerBaseInfo.zzAdd" data-vv-as="地址" v-validate="'required|max:1024'" maxlength="1024" :class="{'input': true, 'is-danger': errors.has('form-2.zzAdd') }" name="zzAdd">
                      <!--<input type="hidden" class="form-control" v-model="params.customerBaseInfo.zzZipcode" data-vv-as="邮编" v-validate="'required|max:6'" maxlength="6" :class="{'input': true, 'is-danger': errors.has('form-2.zzZipcode') }" name="zzZipcode">-->
                      <span v-show="!params.customerBaseInfo.zzPro" class="help is-danger myspan">省份 是必须的.</span>
                      <span v-show="!params.customerBaseInfo.zzCity" class="help is-danger myspan">城市 是必须的.</span>
                      <!--<span v-show="!params.customerBaseInfo.zzArea" class="help is-danger myspan">区县 是必须的.</span>-->
                      <!--<span v-show="params.customerBaseInfo.zzArea && !options.isStoreRegions" class="help is-danger myspan">-->
                          <!--此城市不在您业务部的管辖范围内，请确认客户工作地址是否符合要求-->
                      <!--</span>-->
                      <span v-show="!params.customerBaseInfo.zzAdd" class="help is-danger myspan">地址 是必须的.</span>
                      <!--<span v-show="!params.customerBaseInfo.zzZipcode" class="help is-danger myspan">邮编 是必须的.</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>家人是否知道这笔贷款信息:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.isKnows" v-model="params.order.isKnow" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.order.isKnow: {{ params.order.isKnow }}</p>
                      <input type="hidden" class="form-control" v-model="params.order.isKnow" data-vv-as="家人是否知道这笔贷款信息" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-2.isKnow') }" name="isKnow">
                      <span v-show="isNull(params.order.isKnow)" class="help is-danger myspan">家人是否知道这笔贷款信息 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客户形象:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.customXingxiangs" v-model="params.customerBaseInfo.customXingxiang" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBaseInfo.customXingxiang: {{ params.customerBaseInfo.customXingxiang }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>客服:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.order.customService"  maxlength="10" disabled= true >
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title"  v-show="isShowModule(3)"><h5>您的社保信息</h5></div>
            <div class="ibox-content"  v-show="isShowModule(3)">
              <form class="form-horizontal" method="get" data-vv-scope="form-3">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isInsurance" class="important">*</span>连续缴纳社会保险:</label>
                    <div class="col-sm-6">
                      <input v-if="!isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.continePayInsuranceTime" data-vv-as="连续缴纳社会保险" v-validate="'numeric|max:4'" maxlength="4" :class="{'input': true, 'is-danger': errors.has('form-3.continePayInsuranceTime') }" name="continePayInsuranceTime">
                      <input v-if="isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.continePayInsuranceTime" data-vv-as="连续缴纳社会保险" v-validate="'required|numeric|max:4'" maxlength="4" :class="{'input': true, 'is-danger': errors.has('form-3.continePayInsuranceTime') }" name="continePayInsuranceTime">
                      <p v-if="debugShow" class="debugCss">params.customerInsuranceInfo.continePayInsuranceTime: {{ params.customerInsuranceInfo.continePayInsuranceTime }}</p>
                      <span v-show="errors.has('form-3.continePayInsuranceTime')" class="help is-danger">{{ errors.first('form-3.continePayInsuranceTime') }}</span>
                    </div>
                    <span class="unit">次</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isInsurance" class="important">*</span>最近一次缴纳月份:</label>
                    <div class="col-sm-6">
                      <input type="text" v-model="params.customerInsuranceInfo.lastPayMonth" id="monthPicker1" placeholder="格式如：2017-05" class="form-control" maxlength="7">
                      <p v-show="debugShow" class="debugCss">params.customerInsuranceInfo.lastPayMonth: {{ params.customerInsuranceInfo.lastPayMonth }}</p>
                      <input v-if="!isInsurance" type="hidden" class="form-control" v-model="params.customerInsuranceInfo.lastPayMonth" data-vv-as="最近一次缴纳月份" v-validate="'month|monthLessNow|max:7'" :class="{'input': true, 'is-danger': errors.has('form-3.lastPayMonth') }" name="lastPayMonth">
                      <input v-if="isInsurance" type="hidden" class="form-control" v-model="params.customerInsuranceInfo.lastPayMonth" data-vv-as="最近一次缴纳月份" v-validate="'required|month|monthLessNow|max:7'" :class="{'input': true, 'is-danger': errors.has('form-3.lastPayMonth') }" name="lastPayMonth">
                      <span v-show="errors.has('form-3.lastPayMonth')" class="help is-danger">{{ errors.first('form-3.lastPayMonth') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isInsurance" class="important">*</span>最近一次缴纳基数（养老）:</label>
                    <div class="col-sm-6">
                      <input v-if="!isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.lastPayBase" data-vv-as="最近一次缴纳基数（养老）" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.lastPayBase') }" name="lastPayBase">
                      <input v-if="isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.lastPayBase" data-vv-as="最近一次缴纳基数（养老）" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.lastPayBase') }" name="lastPayBase">
                      <p v-if="debugShow" class="debugCss">params.customerInsuranceInfo.lastPayBase: {{ params.customerInsuranceInfo.lastPayBase }}</p>
                      <span v-show="errors.has('form-3.lastPayBase')" class="help is-danger">{{ errors.first('form-3.lastPayBase') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isInsurance" class="important">*</span>最后一次缴费金额（养老）:</label>
                    <div class="col-sm-6">
                      <input v-if="!isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.lastPayAmount" data-vv-as="最后一次缴费金额（养老）" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.lastPayAmount') }" name="lastPayAmount">
                      <input v-if="isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.lastPayAmount" data-vv-as="最后一次缴费金额（养老）" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.lastPayAmount') }" name="lastPayAmount">
                      <p v-if="debugShow" class="debugCss">params.customerInsuranceInfo.lastPayAmount: {{ params.customerInsuranceInfo.lastPayAmount }}</p>
                      <span v-show="errors.has('form-3.lastPayAmount')" class="help is-danger">{{ errors.first('form-3.lastPayAmount') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isInsurance" class="important">*</span>账户余额:</label>
                    <div class="col-sm-6">
                      <input v-if="!isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.accountBalance" data-vv-as="账户余额" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.accountBalance') }" name="accountBalance">
                      <input v-if="isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.accountBalance" data-vv-as="账户余额" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.accountBalance') }" name="accountBalance">
                      <p v-if="debugShow" class="debugCss">params.customerInsuranceInfo.accountBalance: {{ params.customerInsuranceInfo.accountBalance }}</p>
                      <span v-show="errors.has('form-3.accountBalance')" class="help is-danger">{{ errors.first('form-3.accountBalance') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isInsurance" class="important">*</span>商业保险月平均缴存:</label>
                    <div class="col-sm-6">
                      <input v-if="!isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.monthPayCommercialInsurance" data-vv-as="商业保险月平均缴存" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.monthPayCommercialInsurance') }" name="monthPayCommercialInsurance">
                      <input v-if="isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.monthPayCommercialInsurance" data-vv-as="商业保险月平均缴存" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.monthPayCommercialInsurance') }" name="monthPayCommercialInsurance">
                      <p v-if="debugShow" class="debugCss">params.customerInsuranceInfo.monthPayCommercialInsurance: {{ params.customerInsuranceInfo.monthPayCommercialInsurance }}</p>
                      <span v-show="errors.has('form-3.monthPayCommercialInsurance')" class="help is-danger">{{ errors.first('form-3.monthPayCommercialInsurance') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isInsurance" class="important">*</span>商业保险保额:</label>
                    <div class="col-sm-6">
                      <input v-if="!isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.commercialInsuranceAmount" data-vv-as="商业保险保额" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.commercialInsuranceAmount') }" name="commercialInsuranceAmount">
                      <input v-if="isInsurance" type="text" class="form-control" v-model="params.customerInsuranceInfo.commercialInsuranceAmount" data-vv-as="商业保险保额" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-3.commercialInsuranceAmount') }" name="commercialInsuranceAmount">
                      <p v-if="debugShow" class="debugCss">params.customerInsuranceInfo.commercialInsuranceAmount: {{ params.customerInsuranceInfo.commercialInsuranceAmount }}</p>
                      <span v-show="errors.has('form-3.commercialInsuranceAmount')" class="help is-danger">{{ errors.first('form-3.commercialInsuranceAmount') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title" v-show="isShowModule(4)"><h5>您的房产信息（如果您有房产请填写下列信息）<span class="important">*</span></h5></div>
            <div class="ibox-content" v-show="isShowModule(4)">
              <form class="form-horizontal" method="get" data-vv-scope="form-4">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>房产类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.houseTypes" v-model="params.customerHouseInfo.type" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.type: {{ params.customerHouseInfo.type }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerHouseInfo.type" data-vv-as="房产类型" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-4.type') }" name="type">
                      <span v-show="errors.has('form-4.type')" class="help is-danger">{{ errors.first('form-4.type') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>房产总价:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.totalPrice" data-vv-as="房产总价" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-4.totalPrice') }" name="totalPrice">
                      <span v-show="errors.has('form-4.totalPrice')" class="help is-danger">{{ errors.first('form-4.totalPrice') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.totalPrice: {{ params.customerHouseInfo.totalPrice }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>房产所有人:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.owner" data-vv-as="房产所有人" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-4.owner') }" name="owner">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.owner: {{ params.customerHouseInfo.owner }}</p>
                      <span v-show="errors.has('form-4.owner')" class="help housingSituation">{{ errors.first('form-4.owner') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>房产（或合同）编号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.number" data-vv-as="房产（或合同）编号" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-4.houseNumber') }" name="houseNumber">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.number: {{ params.customerHouseInfo.number }}</p>
                      <span v-show="errors.has('form-4.houseNumber')" class="help housingSituation">{{ errors.first('form-4.houseNumber') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">房产套数:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.count" maxlength="32" >
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.count: {{ params.customerHouseInfo.count }}</p>
                      <!--<span v-show="errors.has('form-4.customerHouseInfoCount')" class="help housingSituation">{{ errors.first('form-4.customerHouseInfoCount') }}</span>-->
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款利率:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.interestRate" maxlength="5" >
                      <!--<span v-show="errors.has('form-4.interestRate')" class="help is-danger">{{ errors.first('form-4.interestRate') }}</span>-->
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.interestRate: {{ params.customerHouseInfo.interestRate }}</p>
                    </div>
                    <span class="unit">%</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>建筑面积:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.area" data-vv-as="建筑面积" v-validate="'double'" maxlength="16" :class="{'input': true, 'is-danger': errors.has('form-4.customerHouseInfoArea') }" name="customerHouseInfoArea">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.area: {{ params.customerHouseInfo.area }}</p>
                      <span v-show="errors.has('form-4.customerHouseInfoArea')" class="help is-danger">{{ errors.first('form-4.customerHouseInfoArea') }}</span>
                    </div>
                    <span class="unit">m2</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>购买单价:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.unitPrice" data-vv-as="购买单价" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-4.unitPrice') }" name="unitPrice">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.unitPrice: {{ params.customerHouseInfo.unitPrice }}</p>
                      <span v-show="errors.has('form-4.unitPrice')" class="help is-danger">{{ errors.first('form-4.unitPrice') }}</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">产权比例:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.propertyRight" data-vv-as="产权比例" v-validate="'rate|between:0,100'" maxlength="5" :class="{'input': true, 'is-danger': errors.has('form-4.propertyRight') }" name="propertyRight">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.propertyRight: {{ params.customerHouseInfo.propertyRight }}</p>
                      <span v-show="errors.has('form-4.propertyRight')" class="help is-danger">{{ errors.first('form-4.propertyRight') }}</span>
                    </div>
                    <span class="unit">%</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>贷款年限:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.loanTerm" data-vv-as="贷款年限" v-validate="'numeric|between:0,100'" maxlength="3" :class="{'input': true, 'is-danger': errors.has('form-4.loanTerm') }" name="loanTerm">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.loanTerm: {{ params.customerHouseInfo.loanTerm }}</p>
                      <span v-show="errors.has('form-4.loanTerm')" class="help is-danger">{{ errors.first('form-4.loanTerm') }}</span>
                    </div>
                    <span class="unit">年</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">月供:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.monthly" data-vv-as="月供" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-4.monthly') }" name="monthly">
                      <span v-show="errors.has('form-4.monthly')" class="help is-danger">{{ errors.first('form-4.monthly') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.monthly: {{ params.customerHouseInfo.monthly }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>贷款余额:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.loanBalance" data-vv-as="贷款余额" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-4.loanBalance') }" name="loanBalance">
                      <span v-show="errors.has('form-4.loanBalance')" class="help is-danger">{{ errors.first('form-4.loanBalance') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.loanBalance: {{ params.customerHouseInfo.loanBalance }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">贷款银行:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.loanBank" data-vv-as="贷款银行" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-4.loanBank') }" name="loanBank">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.loanBank: {{ params.customerHouseInfo.loanBank }}</p>
                      <span v-show="errors.has('form-4.loanBank')" class="help is-danger">{{ errors.first('form-4.loanBank') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>第一次购房还款日:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.repaymentDate" id="repaymentDate" readonly>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.repaymentDate: {{ params.customerHouseInfo.repaymentDate }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>按揭总额:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.mortgageTotal" data-vv-as="按揭总额" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-4.mortgageTotal') }" name="mortgageTotal">
                      <span v-show="errors.has('form-4.mortgageTotal')" class="help is-danger">{{ errors.first('form-4.mortgageTotal') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.mortgageTotal: {{ params.customerHouseInfo.mortgageTotal }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>按揭还款方式:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.mortgageRepaymentWays" v-model="params.customerHouseInfo.mortgageRepaymentWay" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.mortgageRepaymentWay: {{ params.customerHouseInfo.mortgageRepaymentWay }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">邮政编码:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.zipcode" data-vv-as="邮政编码" v-validate="'max:10'" maxlength="10" :class="{'input': true, 'is-danger': errors.has('form-4.customerHouseInfoZipcode') }" name="customerHouseInfoZipcode">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.zipcode: {{ params.customerHouseInfo.zipcode }}</p>
                      <span v-show="errors.has('form-4.customerHouseInfoZipcode')" class="help is-danger">{{ errors.first('form-4.customerHouseInfoZipcode') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>房产地址:</label>
                    <div class="col-sm-7">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.address" data-vv-as="房产地址" v-validate="'max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-4.customerHouseInfoAddress') }" name="customerHouseInfoAddress">
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.address: {{ params.customerHouseInfo.address }}</p>
                      <span v-show="errors.has('form-4.customerHouseInfoAddress')" class="help is-danger">{{ errors.first('form-4.customerHouseInfoAddress') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">直租月平均房租:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.directRent" data-vv-as="直租月平均房租" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-4.directRent') }" name="directRent">
                      <span v-show="errors.has('form-4.directRent')" class="help is-danger">{{ errors.first('form-4.directRent') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.directRent: {{ params.customerHouseInfo.directRent }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">中介月平均房租:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerHouseInfo.indirectRent" data-vv-as="中介月平均房租" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-4.indirectRent') }" name="indirectRent">
                      <span v-show="errors.has('form-4.indirectRent')" class="help is-danger">{{ errors.first('form-4.indirectRent') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerHouseInfo.indirectRent: {{ params.customerHouseInfo.indirectRent }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title"  v-show="isShowModule(5)"><h5>您的工作信息<span class="important">*</span></h5></div>
            <div class="ibox-content" v-show="isShowModule(5)">
              <form class="form-horizontal" method="get" data-vv-scope="form-5">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>单位性质:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.companyNatures" v-model="params.customerWorkInfo.companyNature" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.companyNature: {{ params.customerWorkInfo.companyNature }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.companyNature" data-vv-as="单位性质" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-5.companyNature') }" name="companyNature">
                      <span v-show="!params.customerWorkInfo.companyNature" class="help is-danger">单位性质 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>行业类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.industryNatures" v-model="params.customerWorkInfo.industryNature" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.industryNature: {{ params.customerWorkInfo.industryNature }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.industryNature" data-vv-as="行业类型" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-5.industryNature') }" name="industryNature">
                      <span v-show="!params.customerWorkInfo.industryNature" class="help is-danger">行业类型 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>单位注册号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerWorkInfo.registerNo" data-vv-as="单位注册号" v-validate="'required|alpha_num|max:18'" maxlength="18" :class="{'input': true, 'is-danger': errors.has('form-5.registerNo') }" name="registerNo">
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.registerNo: {{ params.customerWorkInfo.registerNo }}</p>
                      <span v-show="!params.customerWorkInfo.registerNo" class="help is-danger">单位注册号 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>职业类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.professionType_first" v-model="params.customerWorkInfo.industryNatureCode" :select2Style="select2Style_first" @myMethod="professionTypesBack_1" placeholder="== 请选择 =="></select2>
                      <select2 :options="options.professionType_second" v-model="params.customerWorkInfo.professionTypeCode" :select2Style="select2Style_second" @myMethod="professionTypesBack_2" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.professionTypeCode: {{ params.customerWorkInfo.professionTypeCode }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.professionTypeCode" data-vv-as="职业类型" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-5.professionTypeCode') }" name="professionTypeCode">
                      <span v-show="!params.customerWorkInfo.professionTypeCode" class="help is-danger">职业类型 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>每月发薪日:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerWorkInfo.payTime" data-vv-as="每月发薪日" maxlength="2" v-validate="'required|numeric|between:1,31'" :class="{'input': true, 'is-danger': errors.has('form-5.payTime') }" name="payTime">
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.payTime: {{ params.customerWorkInfo.payTime }}</p>
                      <span v-show="!params.customerWorkInfo.payTime" class="help is-danger">每月发薪日 是必须的.</span>
                    </div>
                    <span class="unit">日</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>工资发放形式:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.paymentWays" v-model="params.customerWorkInfo.paymentWay" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.paymentWay: {{ params.customerWorkInfo.paymentWay }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.paymentWay" data-vv-as="工资发放形式" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-5.paymentWay') }" name="paymentWay">
                      <span v-show="!params.customerWorkInfo.paymentWay" class="help is-danger">工资发放形式 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>所在部门:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerWorkInfo.deptName" data-vv-as="所在部门" v-validate="'required|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-5.deptName') }" name="deptName">
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.deptName: {{ params.customerWorkInfo.deptName }}</p>
                      <span v-show="!params.customerWorkInfo.deptName" class="help is-danger">所在部门 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>职位级别:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.jobLevels" v-model="params.customerWorkInfo.jobLevel" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.jobLevel: {{ params.customerWorkInfo.jobLevel }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.jobLevel" data-vv-as="职位级别" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-5.jobLevel') }" name="jobLevel">
                      <span v-show="!params.customerWorkInfo.jobLevel" class="help is-danger">职位级别 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>单位电话:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control telInput" v-model="params.customerWorkInfo.officeNum" data-vv-as="单位电话" v-validate="'required|max:4'" maxlength="4" :class="{'input': true, 'is-danger': errors.has('form-5.officeNum') }" name="officeNum">--
                      <input type="text" class="form-control telInputs" v-model="params.customerWorkInfo.officeNums" data-vv-as="单位电话" v-validate="'required|max:8'" maxlength="8" :class="{'input': true, 'is-danger': errors.has('form-5.officeNum') }" name="officeNum">
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.officeNum: {{ params.customerWorkInfo.officeNum }} -- params.customerWorkInfo.officeNums: {{ params.customerWorkInfo.officeNums }}</p>
                      <span v-show="!params.customerWorkInfo.officeNum" class="help is-danger">单位电话 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>入职时间:</label>
                    <div class="col-sm-6">
                      <div class="input-daterange">
                        <input type="text" class="form-control" id="hiredate" readonly data-vv-as="入职时间" v-validate="'required'":class="{'input': true, 'is-danger': errors.has('form-5.hiredateV') }" name="hiredateV" style="background-color: #ffffff;">
                        <p v-if="debugShow" class="debugCss">params.customerWorkInfo.hiredate: {{ params.customerWorkInfo.hiredate }}</p>
                        <span v-show="!params.customerWorkInfo.hiredate" class="help is-danger">入职时间 是必须的.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>每月收入:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerWorkInfo.salary" data-vv-as="每月收入" v-validate="'required|money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-5.salary') }" name="salary">
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.salary: {{ params.customerWorkInfo.salary }}</p>
                      <span v-show="!params.customerWorkInfo.salary" class="help is-danger">每月收入 是必须的.</span>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>单位全称:</label>
                    <div class="col-sm-7">
                      <input type="text" class="form-control" v-model="params.customerWorkInfo.orgName" data-vv-as="单位全称" v-validate="'required|max:64'" maxlength="64" :class="{'input': true, 'is-danger': errors.has('form-5.orgNames') }" name="orgNames">
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.orgName: {{ params.customerWorkInfo.orgName }}</p>
                      <span v-show="!params.customerWorkInfo.orgName" class="help is-danger">单位全程 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-12">
                    <label class="col-sm-2 control-label"><span v-if="starShow" class="important">*</span>单位所在地:</label>
                    <div class="col-sm-9">
                      <select2 :options="area.provinceOptions" v-model="params.customerWorkInfo.orgPro" :select2Style="select2Style_2" @myMethod="callback_3" placeholder="省份"></select2>
                      <select2 :options="area.cityOptions_3" v-model="params.customerWorkInfo.orgCity" :select2Style="select2Style_3" @myMethod="callback_area_3" placeholder="城市"></select2>
                      <select2 :options="area.areaOptions_3" v-model="params.customerWorkInfo.orgArea" :select2Style="select2Style_3" placeholder="区县" @myMethod="callback_area_city_2"></select2>
                      <span>详细地址</span>
                      <input type="text" class="form-control addressWidth" v-model="params.customerWorkInfo.orgAdd" data-vv-as="详细地址" v-validate="'required'":class="{'input': true, 'is-danger': errors.has('form-5.orgAdd') }" name="orgAdd">
                      <span>邮政编码</span>
                      <input type="text" class="form-control numberWidth" v-model="params.customerWorkInfo.orgZipcode" maxlength="6">
                      <p v-if="debugShow" class="debugCss">params.customerWorkInfo.orgPro: {{ params.customerWorkInfo.orgPro }} -- params.customerWorkInfo.orgCity: {{ params.customerWorkInfo.orgCity }} -- params.customerWorkInfo.orgArea: {{ params.customerWorkInfo.orgArea }} -- params.customerWorkInfo.orgAdd: {{ params.customerWorkInfo.orgAdd }} -- params.customerWorkInfo.orgZipcode: {{ params.customerWorkInfo.orgZipcode }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.orgPro" data-vv-as="省份" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-5.orgPro') }" name="orgPro">
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.orgCity" data-vv-as="城市" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-5.orgCity') }" name="orgCity">
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.orgArea" data-vv-as="区县" v-validate="" :class="{'input': true, 'is-danger': errors.has('form-5.orgArea') }" name="orgArea">
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.orgAdd" data-vv-as="地址" v-validate="'required|max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-5.orgAdd') }" name="orgAdd">
                      <input type="hidden" class="form-control" v-model="params.customerWorkInfo.orgZipcode" data-vv-as="邮编" v-validate="'required|max:6'" maxlength="6" :class="{'input': true, 'is-danger': errors.has('form-5.orgZipcode') }" name="orgZipcode">
                      <span v-show="!params.customerWorkInfo.orgPro" class="help is-danger myspan">省份 是必须的.</span>
                      <span v-show="!params.customerWorkInfo.orgCity" class="help is-danger myspan">城市 是必须的.</span>
                      <!--<span v-show="!params.customerWorkInfo.orgArea" class="help is-danger myspan">区县 是必须的.</span>-->
                      <span v-show="!params.customerWorkInfo.orgAdd" class="help is-danger myspan">地址 是必须的.</span>
                      <!--<span v-show="params.customerWorkInfo.orgCity && !options.isStoreRegionsCity" class="help is-danger myspan">-->
                          <!--此城市不在您业务部的管辖范围内，请确认客户工作地址是否符合要求-->
                      <!--</span>-->
                      <span v-show="params.customerWorkInfo.orgCity && options.isStoreRegionsCity" class="help is-danger myspan">
                          此城市不在您业务部的管辖范围内，请确认客户工作地址是否符合要求
                      </span>

                      <span v-show="!params.customerWorkInfo.orgZipcode" class="help is-danger myspan">邮编 是必须的.</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title" v-show="isShowModule(6)"><h5>私营业主信息（如果您是私营业主，请补充填写一下内容）<span class="important">*</span></h5></div>
            <div class="ibox-content" v-show="isShowModule(6)">
              <form class="form-horizontal" method="get" data-vv-scope="form-6">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">企业类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.customerBusinessmanTypes" v-model="params.customerBusinessman.type" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.type: {{ params.customerBusinessman.type }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">经营场所:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.businessPlaces" v-model="params.customerBusinessman.businessPlace" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.businessPlace: {{ params.customerBusinessman.businessPlace }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">员工人数:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBusinessman.employees" data-vv-as="员工人数" v-validate="'numeric|max:6'" maxlength="6" :class="{'input': true, 'is-danger': errors.has('form-6.customerBusinessmanEmployees') }" name="customerBusinessmanEmployees">
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.employees: {{ params.customerBusinessman.employees }}</p>
                      <span v-show="errors.has('form-6.customerBusinessmanEmployees')" class="help is-danger">{{ errors.first('form-6.customerBusinessmanEmployees') }}</span>
                    </div>
                    <span class="unit">人</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">公司注册时间:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBusinessman.registerTime" id="registerTime" readonly>
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.registerTime: {{ params.customerBusinessman.registerTime }}</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">公司注册号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBusinessman.registerNo" data-vv-as="公司注册号" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-6.registerNo') }" name="registerNo">
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.registerNo: {{ params.customerBusinessman.registerNo }}</p>
                      <span v-show="errors.has('form-6.registerNo')" class="help is-danger">{{ errors.first('form-6.registerNo') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">月均流水:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBusinessman.capitalMonth" data-vv-as="月均流水" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-6.capitalMonth') }" name="capitalMonth">
                      <span v-show="errors.has('form-6.capitalMonth')" class="help is-danger">{{ errors.first('form-6.capitalMonth') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.capitalMonth: {{ params.customerBusinessman.capitalMonth }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">对公年收入流水:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBusinessman.capitalYear" data-vv-as="对公年收入流水" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-6.capitalYear') }" name="capitalYear">
                      <span v-show="errors.has('form-6.capitalYear')" class="help is-danger">{{ errors.first('form-6.capitalYear') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.capitalYear: {{ params.customerBusinessman.capitalYear }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">企业第一大股东年收入流水:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBusinessman.majorShareholder" data-vv-as="企业第一大股东年收入流水" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-6.majorShareholder') }" name="majorShareholder">
                      <span v-show="errors.has('form-6.majorShareholder')" class="help is-danger">{{ errors.first('form-6.majorShareholder') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.majorShareholder: {{ params.customerBusinessman.majorShareholder }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">注册资本:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBusinessman.registeredCapital" data-vv-as="注册资本" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-6.registeredCapital') }" name="registeredCapital">
                      <span v-show="errors.has('form-6.registeredCapital')" class="help is-danger">{{ errors.first('form-6.registeredCapital') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerBusinessman.registeredCapital: {{ params.customerBusinessman.registeredCapital }}</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title" v-show="isShowModule(7)"><h5>婚庆贷填写</h5></div>
            <div class="ibox-content" v-show="isShowModule(7)">
              <form class="form-horizontal" method="get" data-vv-scope="form-7">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">夫妻双方月平均收入总和:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerWeddingInfo.coupleAverage_income" data-vv-as="夫妻双方月平均收入总和" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-7.coupleAverage_income') }" name="coupleAverage_income">
                      <span v-show="errors.has('form-7.coupleAverage_income')" class="help is-danger">{{ errors.first('form-7.coupleAverage_income') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerWeddingInfo.coupleAverage_income: {{ params.customerWeddingInfo.coupleAverage_income }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">婚庆合同消费总额:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerWeddingInfo.weddingContract_spend" data-vv-as="婚庆合同消费总额" v-validate="'money|max:13'" maxlength="13" :class="{'input': true, 'is-danger': errors.has('form-7.weddingContract_spend') }" name="weddingContract_spend">
                      <span v-show="errors.has('form-7.weddingContract_spend')" class="help is-danger">{{ errors.first('form-7.weddingContract_spend') }}</span>
                      <p v-if="debugShow" class="debugCss">params.customerWeddingInfo.weddingContract_spend: {{ params.customerWeddingInfo.weddingContract_spend }}</p>
                    </div>
                    <span class="unit">元</span>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title" v-show="isShowModule(8)">
              <h5>联系人信息（注：如有配偶，直系亲属2信息可不用填写）<span class="important">*</span></h5>
            </div>
            <div class="ibox-content" id="contactInfoDiv" v-show="isShowModule(8)">
              <form v-if="isMarried" class="form-horizontal" method="get" data-vv-scope="form-8">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isMarried" class="important">*</span>（配偶）姓名:</label>
                    <div class="col-sm-6">
                      <input v-if="isMarried" type="text" class="form-control" v-model="contact_0.contactName" data-vv-as="（配偶）姓名" v-validate="'required|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_contactName') }" name="contact_0_contactName">
                      <input v-if="!isMarried" type="text" class="form-control" v-model="contact_0.contactName" data-vv-as="（配偶）姓名" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_contactName') }" name="contact_0_contactName">
                      <p v-show="debugShow" class="debugCss">contact_0.contactName: {{ contact_0.contactName }}</p>
                      <span v-show="isMarried && !contact_0.contactName" class="help is-danger">姓名 是必须的</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isMarried" class="important">*</span>关系:</label>
                    <div class="col-sm-6" name="relationDiv">

                      <select2 :options="options.relation" v-if="isMarried" v-model="contact_0.relation" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <select2 :options="options.relation" v-if="!isMarried" v-model="contact_0.relation" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-show="debugShow" class="debugCss">contact_0.relation: {{ contact_0.relation }}</p>
                      <input type="hidden" class="form-control" v-model="contact_0.relation" data-vv-as="关系" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-8.relation') }" name="relation">
                      <span v-show="isMarried && !contact_0.relation" class="help is-danger">关系 是必须的.</span>
                      <!--<input v-if="isMarried" type="text" class="form-control" v-model="contact_0.relation" data-vv-as="关系" v-validate="'required|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_relation') }" name="contact_0_relation">-->
                      <!--<input v-if="!isMarried" type="text" class="form-control" v-model="contact_0.relation" data-vv-as="关系" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_relation') }" name="contact_0_relation">-->
                      <span v-show="isMarried && !contact_0.relation" class="help is-danger">关系 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_0.companyName" data-vv-as="单位名称" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_companyName') }" name="contact_0_companyName">
                      <p v-show="debugShow" class="debugCss">contact_0.companyName: {{ contact_0.companyName }}</p>
                      <span v-show="errors.has('form-8.contact_0_companyName')" class="help is-danger">{{ errors.first('form-8.contact_0_companyName') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isMarried" class="important">*</span>移动电话:</label>
                    <div class="col-sm-6">
                      <input v-if="isMarried" type="text" class="form-control" v-model="contact_0.phone" @blur="createShortKey2(0)" data-vv-as="移动电话" v-validate="'required|mobile'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_phone') }" name="contact_0_phone">
                      <input v-if="!isMarried" type="text" class="form-control" v-model="contact_0.phone" @blur="createShortKey2(0)" data-vv-as="移动电话" v-validate="'mobile'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_phone') }" name="contact_0_phone">
                      <p v-show="debugShow" class="debugCss">contact_0.phone: {{ contact_0.phone }}--contact_0.shortKey: {{ contact_0.shortKey }}</p>
                      <span v-show="errors.has('form-8.contact_0_phone')" class="help is-danger">{{ errors.first('form-8.contact_0_phone') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_0.weixin" data-vv-as="微信" v-validate="'max:64'" maxlength="64" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_weixin') }" name="contact_0_weixin">
                      <p v-show="debugShow" class="debugCss">contact_0.weixin: {{ contact_0.weixin }}</p>
                      <span v-show="errors.has('form-8.contact_0_weixin')" class="help is-danger">{{ errors.first('form-8.contact_0_weixin') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && isMarried" class=""></span>住宅地址:</label>
                    <div class="col-sm-6">
                      <input v-if="isMarried" type="text" class="form-control" v-model="contact_0.address" maxlength="256">
                      <input v-if="!isMarried" type="text" class="form-control" v-model="contact_0.address" maxlength="256">
                      <!--<input v-if="isMarried" type="text" class="form-control" v-model="contact_0.address" data-vv-as="住宅地址" v-validate="'required|max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_address') }" name="contact_0_address">-->
                      <!--<input v-if="!isMarried" type="text" class="form-control" v-model="contact_0.address" data-vv-as="住宅地址" v-validate="'max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-8.contact_0_address') }" name="contact_0_address">-->
                      <p v-show="debugShow" class="debugCss">contact_0.address: {{ contact_0.address }}</p>
                      <!--<span v-show="isMarried && !contact_0.address" class="help is-danger">住宅地址 是必须的.</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">电话类型:</label>
                    <div class="col-sm-6 a_delete">配偶</div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">操作：</label>
                    <div class="col-sm-6 a_delete">
                      <!--<button class="btn btn-primary btn-sm myBtn" type="button" @click="deleteFixedContact(0)">-</button>-->
                      <!--<button class="btn btn-primary btn-sm" type="button" @click="deleteFixedContact(0)">删除</button>-->
                      <a @click="deleteFixedContact(0)">删除</a>
                    </div>
                  </div>
                </div>
              </form>
              <hr style="color: #e7eaec;">
              <form class="form-horizontal" method="get" data-vv-scope="form-8">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>（直系亲属1）姓名:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_1.contactName" data-vv-as="（直系亲属1）姓名" v-validate="'required|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_1_contactName') }" name="contact_1_contactName">
                      <p v-show="debugShow" class="debugCss">contact_1.contactName: {{ contact_1.contactName }}</p>
                      <span v-show="!contact_1.contactName" class="help is-danger">姓名 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>关系:</label>

                    <!--<div class="col-sm-6" name="relationDiv">-->
                    <!--<input type="text" class="form-control" v-model="contact_1.relation" data-vv-as="关系" v-validate="'required|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_1_relation') }" name="contact_1_relation">-->
                    <!--<p v-show="debugShow" class="debugCss">contact_1.relation: {{ contact_1.relation }}</p>-->
                    <!--<span v-show="!contact_1.relation" class="help is-danger">关系 是必须的.</span>-->
                    <!--</div>-->

                    <div class="col-sm-6" name="relationDiv">
                      <select2 :options="options.relation"  v-model="contact_1.relation" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">contact_1.relation: {{ contact_1.relation }}</p>
                      <input type="hidden" class="form-control" v-model="contact_1.relation" data-vv-as="关系" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.term') }" name="term">
                      <!--<span v-show="errors.has('form-1.term')" class="help is-danger">{{ errors.first('form-1.term') }}</span>-->
                      <span v-show="!contact_1.relation" class="help is-danger">关系 是必须的.</span>
                    </div>

                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_1.companyName" data-vv-as="单位名称" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_1_companyName') }" name="contact_1_companyName">
                      <p v-show="debugShow" class="debugCss">contact_1.companyName: {{ contact_1.companyName }}</p>
                      <span v-show="errors.has('form-8.contact_1_companyName')" class="help is-danger">{{ errors.first('form-8.contact_1_companyName') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>移动电话:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_1.phone" @blur="createShortKey2(1)" data-vv-as="移动电话" v-validate="'required|mobile'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-8.contact_1_phone') }" name="contact_1_phone">
                      <p v-show="debugShow" class="debugCss">contact_1.phone: {{ contact_1.phone }}--contact_1.shortKey: {{ contact_1.shortKey }}</p>
                      <span v-show="errors.has('form-8.contact_1_phone')" class="help is-danger">{{ errors.first('form-8.contact_1_phone') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_1.weixin" data-vv-as="微信" v-validate="'max:64'" maxlength="64" :class="{'input': true, 'is-danger': errors.has('form-8.contact_1_weixin') }" name="contact_1_weixin">
                      <p v-show="debugShow" class="debugCss">contact_1.weixin: {{ contact_1.weixin }}</p>
                      <span v-show="errors.has('form-8.contact_1_weixin')" class="help is-danger">{{ errors.first('form-8.contact_1_weixin') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class=""></span>住宅地址:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_1.address" maxlength="256">
                      <!--<input type="text" class="form-control" v-model="contact_1.address" data-vv-as="住宅地址" v-validate="'required|max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-8.contact_1_address') }" name="contact_1_address">-->
                      <p v-show="debugShow" class="debugCss">contact_1.address: {{ contact_1.address }}</p>
                      <!--<span v-show="!contact_1.address" class="help is-danger">住宅地址 是必须的.</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">电话类型:</label>
                    <div class="col-sm-6 a_delete">直系亲属1</div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">操作:</label>
                    <div class="col-sm-6 a_delete">
                      <!--<button class="btn btn-primary btn-sm myBtn" type="button" @click="deleteFixedContact(1)">-</button>-->
                      <!--<button class="btn btn-primary btn-sm" type="button" @click="deleteFixedContact(1)">删除</button>-->
                      <a @click="deleteFixedContact(1)">删除</a>
                    </div>
                  </div>
                </div>
              </form>
              <hr style="color: #e7eaec;">
              <form class="form-horizontal" method="get" data-vv-scope="form-8">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && !isMarried" class="important">*</span>（直系亲属2）姓名:</label>
                    <div class="col-sm-6">
                      <input v-if="!isMarried" type="text" class="form-control" v-model="contact_2.contactName" data-vv-as="（直系亲属2）姓名" v-validate="'required|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_contactName') }" name="contact_2_contactName">
                      <input v-if="isMarried" type="text" class="form-control" v-model="contact_2.contactName" data-vv-as="（直系亲属2）姓名" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_contactName') }" name="contact_2_contactName">
                      <p v-show="debugShow" class="debugCss">contact_2.contactName: {{ contact_2.contactName }}</p>
                      <span v-show="!contact_2.contactName" class="help is-danger">姓名 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && !isMarried" class="important">*</span>关系:</label>
                    <div class="col-sm-6" name="relationDiv">
                      <p>
                        <select2 :options="options.relation"  v-model="contact_2.relation" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">contact_2.relation: {{ contact_2.relation }}</p>
                      <input type="hidden" class="form-control" v-model="contact_2.relation" data-vv-as="关系" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.term') }" name="term">
                      <!--<span v-show="errors.has('form-1.term')" class="help is-danger">{{ errors.first('form-1.term') }}</span>-->
                      <span v-show="!contact_2.relation" class="help is-danger">关系 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_2.companyName" data-vv-as="单位名称" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_companyName') }" name="contact_2_companyName">
                      <p v-show="debugShow" class="debugCss">contact_2.companyName: {{ contact_2.companyName }}</p>
                      <span v-show="errors.has('form-8.contact_2_companyName')" class="help is-danger">{{ errors.first('form-8.contact_2_companyName') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && !isMarried" class="important">*</span>移动电话:</label>
                    <div class="col-sm-6">
                      <input v-if="!isMarried" type="text" class="form-control" v-model="contact_2.phone" @blur="createShortKey2(2)" data-vv-as="移动电话" v-validate="'required|mobile'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_phone') }" name="contact_2_phone">
                      <input v-if="isMarried" type="text" class="form-control" v-model="contact_2.phone" @blur="createShortKey2(2)" data-vv-as="移动电话" v-validate="'mobile'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_phone') }" name="contact_2_phone">
                      <p v-show="debugShow" class="debugCss">contact_2.phone: {{ contact_2.phone }}--contact_2.shortKey: {{ contact_2.shortKey }}</p>
                      <span v-show="errors.has('form-8.contact_2_phone')" class="help is-danger">{{ errors.first('form-8.contact_2_phone') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_2.weixin" data-vv-as="微信" v-validate="'max:64'" maxlength="64" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_weixin') }" name="contact_2_weixin">
                      <p v-show="debugShow" class="debugCss">contact_2.weixin: {{ contact_2.weixin }}</p>
                      <span v-show="errors.has('form-8.contact_2_weixin')" class="help is-danger">{{ errors.first('form-8.contact_2_weixin') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow && !isMarried" class=""></span>住宅地址:</label>
                    <div class="col-sm-6">
                      <input v-if="!isMarried" type="text" class="form-control" v-model="contact_2.address" maxlength="256">
                      <input v-if="isMarried" type="text" class="form-control" v-model="contact_2.address" maxlength="256">
                      <!--<input v-if="!isMarried" type="text" class="form-control" v-model="contact_2.address" data-vv-as="住宅地址" v-validate="'required|max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_address') }" name="contact_2_address">-->
                      <!--<input v-if="isMarried" type="text" class="form-control" v-model="contact_2.address" data-vv-as="住宅地址" v-validate="'max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-8.contact_2_address') }" name="contact_2_address">-->
                      <p v-show="debugShow" class="debugCss">contact_2.address: {{ contact_2.address }}</p>
                      <!--<span v-show="!isMarried && !contact_2.address" class="help is-danger">住宅地址 是必须的.</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">电话类型:</label>
                    <div class="col-sm-6 a_delete">直系亲属2</div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">操作:</label>
                    <div class="col-sm-6 a_delete">
                      <!--<button class="btn btn-primary btn-sm myBtn" type="button" @click="deleteFixedContact(2)">-</button>-->
                      <!--<button class="btn btn-primary btn-sm" type="button" @click="deleteFixedContact(2)">删除</button>-->
                      <a @click="deleteFixedContact(2)">删除</a>
                    </div>
                  </div>
                </div>
              </form>
              <hr style="color: #e7eaec;">
              <form class="form-horizontal" method="get" data-vv-scope="form-8">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">（其他联系人1）姓名:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_3.contactName" data-vv-as="（其他联系人1）姓名" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_3_contactName') }" name="contact_3_contactName">
                      <p v-show="debugShow" class="debugCss">contact_3.contactName: {{ contact_1.contactName }}</p>
                      <span v-show="errors.has('form-8.contact_3_contactName')" class="help is-danger">{{ errors.first('form-8.contact_3_contactName') }}</span>
                      <span v-show="!contact_3.contactName" class="help is-danger">姓名 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">关系:</label>
                    <div class="col-sm-6" name="relationDiv">
                      <select2 :options="options.relation"  v-model="contact_3.relation" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">contact_1.relation: {{ contact_1.relation }}</p>
                      <input type="hidden" class="form-control" v-model="contact_3.relation" data-vv-as="关系" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.term') }" name="term">
                      <span v-show="!contact_3.relation" class="help is-danger">关系 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_3.companyName" data-vv-as="单位名称" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_3_companyName') }" name="contact_3_companyName">
                      <p v-show="debugShow" class="debugCss">contact_3.companyName: {{ contact_3.companyName }}</p>
                      <span v-show="errors.has('form-8.contact_3_companyName')" class="help is-danger">{{ errors.first('form-8.contact_3_companyName') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>移动电话:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_3.phone" @blur="createShortKey2(3)" data-vv-as="移动电话"  v-validate="'required|mobile'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-8.contact_3_phone') }" name="contact_3_phone">
                      <p v-show="debugShow" class="debugCss">contact_3.phone: {{ contact_3.phone }}--contact_3.shortKey: {{ contact_3.shortKey }}</p>
                      <span v-show="errors.has('form-8.contact_3_phone')" class="help is-danger">{{ errors.first('form-8.contact_3_phone') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_3.weixin" data-vv-as="微信" v-validate="'max:64'" maxlength="64" :class="{'input': true, 'is-danger': errors.has('form-8.contact_3_weixin') }" name="contact_3_weixin">
                      <p v-show="debugShow" class="debugCss">contact_3.weixin: {{ contact_3.weixin }}</p>
                      <span v-show="errors.has('form-8.contact_3_weixin')" class="help is-danger">{{ errors.first('form-8.contact_3_weixin') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住宅地址:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_3.address" maxlength="256" >
                      <!--<input type="text" class="form-control" v-model="contact_3.address" data-vv-as="住宅地址" v-validate="'max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-8.contact_3_address') }" name="contact_3_address">-->
                      <p v-show="debugShow" class="debugCss">contact_3.address: {{ contact_3.address }}</p>
                      <!--<span v-show="errors.has('form-8.contact_3_address')" class="help is-danger">{{ errors.first('form-8.contact_3_address') }}</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">电话类型:</label>
                    <div class="col-sm-6 a_delete">其他联系人1</div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">操作:</label>
                    <div class="col-sm-6 a_delete">
                      <!--<button class="btn btn-primary btn-sm myBtn" type="button" @click="deleteFixedContact(3)">-</button>-->
                      <!--<button class="btn btn-primary btn-sm" type="button" @click="deleteFixedContact(3)">删除</button>-->
                      <a @click="deleteFixedContact(3)">删除</a>
                    </div>
                  </div>
                </div>
              </form>
              <hr style="color: #e7eaec;">
              <form class="form-horizontal" method="get" data-vv-scope="form-8">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">（其他联系人2）姓名:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_4.contactName" data-vv-as="（其他联系人2）姓名" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_4_contactName') }" name="contact_4_contactName">
                      <p v-show="debugShow" class="debugCss">contact_4.contactName: {{ contact_4.contactName }}</p>
                      <span v-show="errors.has('form-8.contact_4_contactName')" class="help is-danger">{{ errors.first('form-8.contact_4_contactName') }}</span>
                      <span v-show="!contact_4.contactName" class="help is-danger">姓名 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">关系:</label>
                    <!--<div class="col-sm-6" name="relationDiv">-->
                    <!--<input type="text" class="form-control" v-model="contact_4.relation" data-vv-as="关系" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_4_relation') }" name="contact_4_relation">-->
                    <!--<p v-show="debugShow" class="debugCss">contact_4.relation: {{ contact_4.relation }}</p>-->
                    <!--<span v-show="errors.has('form-8.contact_4_relation')" class="help is-danger">{{ errors.first('form-8.contact_4_relation') }}</span>-->
                    <!--</div>-->
                    <div class="col-sm-6" name="relationDiv">
                      <p>
                        <select2 :options="options.relation"  v-model="contact_4.relation" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">contact_1.relation: {{ contact_1.relation }}</p>
                      <input type="hidden" class="form-control" v-model="contact_4.relation" data-vv-as="关系" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.term') }" name="term">
                      <!--<span v-show="errors.has('form-1.term')" class="help is-danger">{{ errors.first('form-1.term') }}</span>-->
                      <span v-show="!contact_4.relation" class="help is-danger">关系 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_4.companyName" data-vv-as="单位名称" v-validate="'max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_4_companyName') }" name="contact_4_companyName">
                      <p v-show="debugShow" class="debugCss">contact_4.companyName: {{ contact_4.companyName }}</p>
                      <span v-show="errors.has('form-8.contact_4_companyName')" class="help is-danger">{{ errors.first('form-8.contact_4_companyName') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>移动电话:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_4.phone" @blur="createShortKey2(4)" data-vv-as="移动电话"  v-validate="'required|mobile'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-8.contact_4_phone') }" name="contact_4_phone">
                      <p v-show="debugShow" class="debugCss">contact_4.phone: {{ contact_4.phone }}--contact_4.shortKey: {{ contact_4.shortKey }}</p>
                      <span v-show="errors.has('form-8.contact_4_phone')" class="help is-danger">{{ errors.first('form-8.contact_4_phone') }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_4.weixin" data-vv-as="微信" v-validate="'max:64'" maxlength="64" :class="{'input': true, 'is-danger': errors.has('form-8.contact_4_weixin') }" name="contact_4_weixin">
                      <p v-show="debugShow" class="debugCss">contact_4.weixin: {{ contact_4.weixin }}</p>
                      <span v-show="errors.has('form-8.contact_4_weixin')" class="help is-danger">{{ errors.first('form-8.contact_4_weixin') }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住宅地址:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="contact_4.address" maxlength="256" >
                      <!--<input type="text" class="form-control" v-model="contact_4.address" data-vv-as="住宅地址" v-validate="'max:256'" maxlength="256" :class="{'input': true, 'is-danger': errors.has('form-8.contact_4_address') }" name="contact_4_address">-->
                      <p v-show="debugShow" class="debugCss">contact_4.address: {{ contact_4.address }}</p>
                      <!--<span v-show="errors.has('form-8.contact_4_address')" class="help is-danger">{{ errors.first('form-8.contact_4_address') }}</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">电话类型:</label>
                    <div class="col-sm-6 a_delete">其他联系人2</div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">操作:</label>
                    <div class="col-sm-6 a_delete">
                      <!--<button class="btn btn-primary btn-sm myBtn" type="button" @click="deleteFixedContact(4)">-</button>-->
                      <!--<button class="btn btn-primary btn-sm" type="button" @click="deleteFixedContact(4)">删除</button>-->
                      <a @click="deleteFixedContact(4)">删除</a>
                    </div>
                  </div>
                </div>
              </form>
              <hr style="color: #e7eaec;">
              <div class="ibox-title" style="border: none;">
                <h5>补充联系人（注：如果需要补充联系人信息，请点击"+"按钮，增加一个联系人列表来填写联系人信息，如需保存请点击最下方的"保存"或"提交"按钮；如需删除"补充联系人"，请点击"-"按钮删除。）</h5>
                <div class="creat_butten" style="text-align: right">
                  <button class="btn btn-primary btn-sm myBtn" type="button" @click="addContact()">+</button>
                  <button class="btn btn-primary btn-sm myBtn" type="button" @click="reduceContact()">-</button>
                </div>
              </div>
              <form class="form-horizontal" method="get" v-for="(extraContact, index) in extraContacts" data-vv-scope="form-8">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>（补充联系人_{{ index + 1 }}）姓名:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="extraContact.contactName" maxlength="32">
                      <p v-show="debugShow" class="debugCss">extraContact.contactName: {{ extraContact.contactName }}</p>
                      <span v-show="!extraContact.contactName" class="help is-danger">姓名 不能为空.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>关系:</label>
                    <!--<div class="col-sm-6" name="relationDiv">-->
                    <!--<input type="text" class="form-control" v-model="extraContact.relation" maxlength="32">-->
                    <!--<p v-if="debugShow" class="debugCss">extraContact.relation: {{ extraContact.relation }}</p>-->
                    <!--<span v-show="!extraContact.relation" class="help is-danger">关系 不能为空.</span>-->
                    <!--</div>-->
                    <div class="col-sm-6" name="relationDiv">
                      <p>
                        <select2 :options="options.relation"  v-model="extraContact.relation" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">contact_1.relation: {{ extraContact.relation }}</p>
                      <input type="hidden" class="form-control" v-model="extraContact.relation" data-vv-as="关系" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.term') }" name="term">
                      <!--<span v-show="errors.has('form-1.term')" class="help is-danger">{{ errors.first('form-1.term') }}</span>-->
                      <span v-show="!extraContact.relation" class="help is-danger">关系 不能为空.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">单位名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="extraContact.companyName" maxlength="32">
                      <p v-if="debugShow" class="debugCss">extraContact.companyName: {{ extraContact.companyName }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>移动电话:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="extraContact.phone" @keyup="createShortKey(index)" maxlength="16">
                      <p v-show="debugShow" class="debugCss">extraContact.phone: {{ extraContact.phone }}--extraContact.shortKey: {{ extraContact.shortKey }}--extraContact.isPhone: {{ extraContact.isPhone }}</p>
                      <span v-show="!extraContact.isPhone" class="help is-danger">移动电话 必须是11位手机号码.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">微信:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="extraContact.weixin" maxlength="64">
                      <p v-if="debugShow" class="debugCss">extraContact.weixin: {{ extraContact.weixin }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">住宅地址:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="extraContact.address" maxlength="256">
                      <p v-if="debugShow" class="debugCss">extraContact.address: {{ extraContact.address }}</p>
                      <!--<span v-show="!extraContact.address" class="help is-danger">住宅地址 不能为空.</span>-->
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>电话类型:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.phoneTypes" v-model="extraContact.phoneType" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">extraContact.phoneType: {{ extraContact.phoneType }}</p>
                      <span v-show="!extraContact.phoneType" class="help is-danger">电话类型 不能为空.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">操作</label>
                    <div class="col-sm-6 a_delete">
                      <!--<button class="btn btn-primary btn-sm myBtn" type="button" @click="deleteContact(index)">-</button>-->
                      <a @click="deleteContact(index)">删除</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
      </div>
			<div class="ibox-title" v-show="customerCicInfoFun()"><h5>保险信息填写<span class="important">*</span></h5></div>
            <div class="ibox-content" v-show="customerCicInfoFun()">
              <form class="form-horizontal" method="get" data-vv-scope="form-11">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人姓名:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.customName" disabled="disabled" >
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被投保人身份证号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.idNum" disabled="disabled" >
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>投/被保人国籍:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="中国" disabled="disabled">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>投/被保保人证件有效期:</label>
                    <div class="col-sm-6 input-daterange">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.validityTerm" disabled="disabled">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人手机号:</label>
                    <div class="col-sm-6">
                      <input type="number" class="form-control" v-model="params.customerCicInfo.mobile" disabled="disabled" />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人电子邮箱:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.email"   disabled="disabled">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">第一受益人:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="债权人" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">第二受益人:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="法定继承人" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人出生日期:</label>
                    <div class="col-sm-6 input-daterange">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.dateOfBirth"  disabled="disabled">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">被保人年龄:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.age" disabled="disabled">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保险人行业性质:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.industryNature"  disabled="disabled">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保险人行业类别:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.industryCategory"  disabled="disabled">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保险名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="中华借款人意外伤害保险" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投/被保人联系地址:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.address"  disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保险期限:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.term" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保单号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.insuranceNo" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保费金额:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.insuredFee" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">投保金额:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.insuredAmount" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">保险状态:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerCicInfo.status" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title" v-show="isShowModule(9)"><h5>工作人员填写<span class="important">*</span></h5></div>
            <div class="ibox-content" v-show="isShowModule(9)">
              <form class="form-horizontal" method="get" data-vv-scope="form-9">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">推荐人:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.recommenders" v-model="params.customerWorkerWrite.recommender" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkerWrite.recommender: {{ params.customerWorkerWrite.recommender }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>客户来源渠道:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.saleChannels" v-model="params.customerWorkerWrite.saleChannel" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkerWrite.saleChannel: {{ params.customerWorkerWrite.saleChannel }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkerWrite.saleChannel" data-vv-as="客户来源渠道" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-9.saleChannel') }" name="saleChannel">
                      <span v-show="!params.customerWorkerWrite.saleChannel" class="help is-danger">客户来源渠道 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">是否加急:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.isUrgents" v-model="params.customerWorkerWrite.isUrgent" :select2Style="select2Style"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkerWrite.isUrgent: {{ params.customerWorkerWrite.isUrgent }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>征信报告:</label>
                    <div class="col-sm-6">
                      <select2 :options="options.hasCreditReports" v-model="params.customerWorkerWrite.hasCreditReport" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkerWrite.hasCreditReport: {{ params.customerWorkerWrite.hasCreditReport }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkerWrite.hasCreditReport" data-vv-as="征信报告" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-9.hasCreditReport') }" name="hasCreditReport">
                      <span v-show="isNull(params.customerWorkerWrite.hasCreditReport)" class="help is-danger">征信报告 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">诉讼管辖法院:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="北京市朝阳区" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">咨询费:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="东方银谷" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">审核费:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="银谷普诚" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">服务费:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" value="东方普惠" disabled="disabled">
                      <p v-if="debugShow" class="debugCss">未绑定</p>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>团队经理:</label>
                    <div class="col-sm-6">
                      <select2 :options="teamManagers" v-model="params.customerWorkerWrite.teamManagerEmpno" :select2Style="select2Style" placeholder="== 请选择 ==" @myMethod="callback_teamManager"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkerWrite.teamManagerEmpno: {{ params.customerWorkerWrite.teamManagerEmpno }} -- params.customerWorkerWrite.teamManager: {{ params.customerWorkerWrite.teamManager }} -- params.order.teamManagerEmpno: {{ params.order.teamManagerEmpno }} -- params.order.teamManager: {{ params.order.teamManager }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkerWrite.teamManagerEmpno" data-vv-as="团队经理" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.teamManagerEmpno') }" name="teamManagerEmpno">
                      <span v-show="!params.customerWorkerWrite.teamManagerEmpno" class="help is-danger">团队经理 是必须的.</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>销售人员:</label>
                    <div class="col-sm-6">
                      <select2 :options="teamManagerEmpnos" v-model="params.customerWorkerWrite.salesmanEmpno" :select2Style="select2Style" placeholder="== 请选择 ==" @myMethod="callback_salesman"></select2>
                      <p v-if="debugShow" class="debugCss">params.customerWorkerWrite.salesmanEmpno: {{ params.customerWorkerWrite.salesmanEmpno }} -- params.customerWorkerWrite.salesman: {{ params.customerWorkerWrite.salesman }}</p>
                      <input type="hidden" class="form-control" v-model="params.customerWorkerWrite.salesmanEmpno" data-vv-as="销售人员" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.salesmanEmpno') }" name="salesmanEmpno">
                      <span v-show="!params.customerWorkerWrite.salesmanEmpno" class="help is-danger">销售人员 是必须的.</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">信审补件类型:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.order.remarkType }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label">信审补件原因:</label>
                    <div class="col-sm-8">
                      <span class="help-block m-b-none">{{ params.order.remarkContent }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-10">
                    <label class="col-sm-3 control-label"><span v-if="starShow && params.customerWorkerWrite.isUrgent=='true'" class="important">*</span>备注信息:</label>
                    <div class="col-sm-8">
                      <textarea v-if="params.customerWorkerWrite.isUrgent=='true'" class="form-control" v-model="params.customerWorkerWrite.remark" data-vv-as="备注信息" v-validate="'required|max:1024'" maxlength="1024" :class="{'input': true, 'is-danger': errors.has('form-9.customerWorkerWriteRemark') }" name="customerWorkerWriteRemark"></textarea>
                      <textarea v-if="params.customerWorkerWrite.isUrgent!='true'" class="form-control" v-model="params.customerWorkerWrite.remark" data-vv-as="备注信息" v-validate="'max:1024'" maxlength="1024" :class="{'input': true, 'is-danger': errors.has('form-9.customerWorkerWriteRemark') }" name="customerWorkerWriteRemark"></textarea>
                      <p v-if="debugShow" class="debugCss">params.customerWorkerWrite.remark: {{ params.customerWorkerWrite.remark }}</p>
                      <span v-show="params.customerWorkerWrite.isUrgent=='true' && !params.customerWorkerWrite.remark" class="help is-danger">备注信息 是必须的.</span>
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
                        <li class="swiper-li"><a data-toggle="tab" @click="tabShow('D001')" aria-expanded="false">申请表</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D002">
                        <li class="swiper-li"><a data-toggle="tab" @click="tabShow('D002')" aria-expanded="false">身份证明</a></li>
                      </div>
                      <div class="swiper-slide ssl" id="div_D003">
                        <li class="swiper-li"><a data-toggle="tab" @click="tabShow('D003')" aria-expanded="false">征信报告签字版（图片）</a></li>
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
                    <div class="swiper-scrollbar"></div>
                  </div>

                </ul>
                <div v-if="customerScanningCopys" class="tab-content" id="tabShowDiv"></div>
              </div>
            </div>
            <!--按钮开始-->
            <div class="ibox-content">
              <!--申请单列表详情button-->
              <div class="form-group" style="text-align: center" v-if="$route.params.flag == 'list1' && ($route.params.status == '100' || $route.params.status == '110')">
                <button class="btn btn-primary" type="button" @click="openWin()">保存</button>
                <button class="btn btn-primary" type="button" @click="applylistsaveVeeValidate()">提交</button>
                <button class="btn btn-danger" type="button" @click="openWin1()">删除</button>
                <button class="btn btn-primary" type="button" @click="openWin11()">
                    <a style="color: #FFFFFF">上传扫描件</a>
                </button>
              </div>
              <!--待质检列表待质检状态详情button-->
              <div class="form-group" style="text-align: center;" v-if="$route.params.flag == 'list2' && $route.params.status == '120' ">
                <button class="btn btn-primary" type="button" @click="waitQualitylistSaveVeeValidate()">提交</button>
                <button class="btn btn-primary" type="button" @click="waitUpdate()">质检保存</button>
                <button class="btn btn-warning" type="button" @click="openWin2()">取消</button>
                <button class="btn btn-primary" type="button">
                  <router-link :to="'/picList/'+$route.params.orderNum+'/'+$route.params.orderName+'/'+$route.params.status+'/2'">
                    <a style="color: #FFFFFF">补件</a>
                  </router-link>
                </button>
              </div>
              <!--待质检列表补件状态-->
              <div class="form-group" style="text-align: center" v-if="$route.params.flag == 'list2' && $route.params.status == '310' ">
                <button class="btn btn-primary" type="button" @click="waitQualitylistSaveVeeValidate()">提交</button>
                <button class="btn btn-primary" type="button">
                  <router-link :to="'/picList/'+$route.params.orderNum+'/'+$route.params.orderName+'/'+$route.params.status+'/2'">
                    <a style="color: #FFFFFF">补件</a>
                  </router-link>
                </button>
              </div>
              <!--补件申请单详情-->
              <!--<div class="form-group" style="text-align: center;" v-if="$route.params.flag == 'list4' ">-->
              <!--<button class="btn btn-primary" type="button" @click="save()">提交</button>-->
              <!--<button class="btn btn-primary" type="button">-->
              <!--<router-link :to="'/picList/'+$route.params.orderNum+'/'+$route.params.orderName">-->
              <!--<a style="color: #FFFFFF">补件</a>-->
              <!--</router-link>-->
              <!--</button>-->
              <!--</div>-->
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">确定保存?</h3>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="applyUpdate()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win11">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">是否保存?</h3>
          </div>
          <div class="modal-footer">
            <button class="btn btn-warning" type="button" @click="closeWin11()">取消</button>
            <button class="btn btn-primary" type="button">
              <router-link :to="'/picList/'+$route.params.orderNum+'/'+$route.params.orderName+'/'+$route.params.status+'/1'"><a style="color: #FFFFFF">去上传扫描件</a></router-link>
            </button>
            <button class="btn btn-primary" type="button" @click="applyUpdate()">保存</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win1">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">确定删除申请单信息?</h4>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="delectList()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin1()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win2">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">确定要取消该申请单?</h3>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="waitCheckOrderCancel">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin2()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" style="display: none"></div>
  </div>

</template>

<script>
  import '../../static/js/monthpicker.min.js';
  import select2 from './common/select2/select2.vue';

  var vm;
  export default {
    name: 'financial',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    computed: {
      isInsurance: function () {
        return (this.params.customerLoanPurpose.purpose=='社保贷' || this.params.customerLoanPurpose.productName=='金领贷');
      },
      isMarried: function () {
        return this.params.customerBaseInfo.maritalStatus=='已婚';
      }
    },
    data () {
      return {
        debugShow: false, // 是否为测试模式，测试模式会显示参数值
        starShow: true,
		    select2Style_first: {//select2-style样式
          "width": "46%",
          "margin-top": "0px"
        },
        select2Style_second: {//select2-style样式
          "width": "47%",
          "margin-top": "0px",
          "margin-left": "5px",
        },
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
        statusObj: {
          "-2": "投保失败",
          "-1": "试算失败",
          "1": "投保中",
          "2": "承保中",
          "3": "保险失效",
          "4": "已退保，保险失效",
          "5": "已赔付，保险失效",
        },
        options: {
          years: _years,
          products: [],
          isStoreRegions:true,
          isStoreRegionsCity:true,

          loanTerms: [
            { id: '1', text: '1期' },
            { id: '3', text: '3期' },
            { id: '6', text: '6期' },
            { id: '12', text: '12期' },
            { id: '18', text: '18期' },
            { id: '24', text: '24期' },
            { id: '36', text: '36期' }
          ],
          repayTypes: [
            { id: '等额本息', text: '等额本息' }
          ],
          relation:[
            { id: '父母', text: '父母' },
            { id: '配偶', text: '配偶' },
            { id: '亲友', text: '亲友' },
            { id: '同事', text: '同事' },
            { id: '朋友', text: '朋友' },
            { id: '其他', text: '其他' },
          ],
          purposes: [
            { id: '资金周转', text: '资金周转' },
            { id: '扩大经营', text: '扩大经营' },
            { id: '日常消费', text: '日常消费' },
            { id: '教育资金', text: '教育资金' },
            { id: '副业经营', text: '副业经营' },
            { id: '工程项目', text: '工程项目' },
            { id: '购置货物', text: '购置货物' },
            { id: '科研项目', text: '科研项目' },
            { id: '创业', text: '创业' },
            { id: '装修', text: '装修' },
            { id: '投资', text: '投资' },
            { id: '购车', text: '购车' },
            { id: '购房', text: '购房' },
            { id: '其他', text: '其他' }
          ],
          loanSpeciess: [
            { id: '', text: '== 请选择 ==' },
            { id: '个人住房抵押贷款', text: '个人住房抵押贷款' },
            { id: '合格循环贷款', text: '合格循环贷款' },
            { id: '其他', text: '其他' }
          ],
          loanTypes: [
            { id: '', text: '== 请选择 ==' },
            { id: '个人住房贷款', text: '个人住房贷款' },
            { id: '个人商用房（包括商住两用）贷款', text: '个人商用房（包括商住两用）贷款' },
            { id: '个人住房公积金贷款', text: '个人住房公积金贷款' },
            { id: '个人汽车贷款', text: '个人汽车贷款' },
            { id: '个人助学贷款', text: '个人助学贷款' },
            { id: '个人经营性贷款', text: '个人经营性贷款' },
            { id: '农户贷款', text: '农户贷款' },
            { id: '个人消费款', text: '个人消费款' },
            { id: '其他', text: '其他' }
          ],
          assureTypes: [
            { id: '', text: '== 请选择 ==' },
            { id: '信用担保', text: '信用担保' },
            { id: '抵押担保', text: '抵押担保' },
            { id: '质押担保', text: '质押担保' },
            { id: '第三方信用担保', text: '第三方信用担保' },
            { id: '第三方抵押担保', text: '第三方抵押担保' },
            { id: '第三方质押担保', text: '第三方质押担保' }
          ],
          repaySources: [
            { id: '', text: '== 请选择 ==' },
            { id: '薪金收入所得', text: '薪金收入所得' },
            { id: '经营收入所得', text: '经营收入所得' },
            { id: '投资收入所得', text: '投资收入所得' },
            { id: '租金收入所得', text: '租金收入所得' },
            { id: '分红收入所得', text: '分红收入所得' },
            { id: '抵质押物处置所得', text: '抵质押物处置所得' },
            { id: '其他', text: '其他' }
          ],
          sexs: [
            { id: '男', text: '男' },
            { id: '女', text: '女' },
          ],
          maritalStatuss: [
            { id: '未婚', text: '未婚' },
            { id: '已婚', text: '已婚' },
            { id: '离异', text: '离异' },
            { id: '丧偶', text: '丧偶' }
          ],
          hasChilds: [
            { id: 'true', text: '有' },
            { id: 'false', text: '无' }
          ],
          canRepayAdvances: [
            { id: 'true', text: '是' },
            { id: 'false', text: '否' }
          ],
          healths: [
            { id: '', text: '== 请选择 ==' },
            { id: '无过往病史', text: '无过往病史' },
            { id: '有过往病史', text: '有过往病史' }
          ],
          accountNatures: [
            { id: '', text: '== 请选择 ==' },
            { id: '本地城镇户口', text: '本地城镇户口' },
            { id: '本地农村户口', text: '本地农村户口' },
            { id: '集体户口', text: '集体户口' },
            { id: '外地户口', text: '外地户口' }
          ],
          syInsurances: [
            { id: '', text: '== 请选择 ==' },
            { id: '有', text: '有' },
            { id: '无', text: '无' }
          ],
          shInsurances: [
            { id: '', text: '== 请选择 ==' },
            { id: '有', text: '有' },
            { id: '无', text: '无' }
          ],
          educations: [
            { id: '研究生或以上', text: '研究生或以上' },
            { id: '本科', text: '本科' },
            { id: '大专', text: '大专' },
            { id: '高中', text: '高中' },
            { id: '中专', text: '中专' },
            { id: '初中及以下', text: '初中及以下' }
          ],
          hasCars: [
            { id: '有车无贷款', text: '有车无贷款' },
            { id: '有车有贷款', text: '有车有贷款' },
            { id: '无车', text: '无车' }
          ],
          anjieTypes: [
            { id: '', text: '== 请选择 ==' },
            { id: '无', text: '无' },
            { id: '纯公积金', text: '纯公积金' },
            { id: '纯商业', text: '纯商业' },
            { id: '混合', text: '混合' }
          ],
          housingTypes: [
            { id: '租住公房', text: '租住公房' },
            { id: '租住私房', text: '租住私房' },
            { id: '借助父母处', text: '借助父母处' },
            { id: '改房成本价房', text: '改房成本价房' },
            { id: '改房标准价房', text: '改房标准价房' },
            { id: '安居工程住房', text: '安居工程住房' },
            { id: '集资建房', text: '集资建房' },
            { id: '经济适用房', text: '经济适用房' },
            { id: '自购商品房', text: '自购商品房' },
            { id: '自建', text: '自建' }
          ],
          housingSituations: [
            { id: '', text: '== 请选择 ==' },
            { id: '自置无按揭', text: '自置无按揭' },
            { id: '自置有按揭', text: '自置有按揭' },
            { id: '共有住宅', text: '共有住宅' },
            { id: '租用', text: '租用' },
            { id: '亲属楼宇', text: '亲属楼宇' },
            { id: '集体宿舍', text: '集体宿舍' },
            { id: '其他', text: '其他' },
            { id: '没有提供资料', text: '没有提供资料' }
          ],
          commends: [
            { id: '', text: '== 请选择 ==' },
            { id: '有', text: '有' },
            { id: '无', text: '无' }
          ],
          houseTypes: [
            { id: '', text: '== 请选择 ==' },
            { id: '自置无按揭', text: '自置无按揭' },
            { id: '自置有按揭', text: '自置有按揭' },
            { id: '无房', text: '无房' }
          ],
          mortgageRepaymentWays: [
            { id: '', text: '== 请选择 ==' },
            { id: '等额本息', text: '等额本息' },
            { id: '等额本金', text: '等额本金' }
          ],
          companyNatures: [
            { id: '机关事业单位', text: '机关事业单位' },
            { id: '社会团体', text: '社会团体' },
            { id: '国有企业', text: '国有企业' },
            { id: '三资企业', text: '三资企业' },
            { id: '上市公司', text: '上市公司' },
            { id: '民营', text: '民营' },
            { id: '私营', text: '私营' },
            { id: '个体', text: '个体' },
            { id: '其他', text: '其他' },
            { id: '没有提供资料', text: '没有提供资料' }
          ],
          industryNatures: [
            { id: '农、林、牧、渔业', text: '农、林、牧、渔业' },
            { id: '采掘业', text: '采掘业' },
            { id: '制造业', text: '制造业' },
            { id: '电力、燃气及水的生产和供应业', text: '电力、燃气及水的生产和供应业' },
            { id: '建筑业', text: '建筑业' },
            { id: '交通运输、仓储和邮政业', text: '交通运输、仓储和邮政业' },
            { id: '信息传输、计算机服务和软件业', text: '信息传输、计算机服务和软件业' },
            { id: '批发和零售业', text: '批发和零售业' },
            { id: '住宿和餐饮业', text: '住宿和餐饮业' },
            { id: '金融业', text: '金融业' },
            { id: '房地产业', text: '房地产业' },
            { id: '租赁和商务服务业', text: '租赁和商务服务业' },
            { id: '科学研究、技术服务业和地质勘察业', text: '科学研究、技术服务业和地质勘察业' },
            { id: '水利、环境和公共设施管理业', text: '水利、环境和公共设施管理业' },
            { id: '居民服务和其它服务业', text: '居民服务和其它服务业' },
            { id: '教育', text: '教育' },
            { id: '卫生、社会保障和社会福利业', text: '卫生、社会保障和社会福利业' },
            { id: '文化、体育和娱乐业', text: '文化、体育和娱乐业' },
            { id: '公共管理和社会组织', text: '公共管理和社会组织' },
            { id: '国际组织', text: '国际组织' },
            { id: '其他', text: '其他' },
            { id: '广告业', text: '广告业' },
            { id: '电讯业', text: '电讯业' },
            { id: '银行业', text: '银行业' },
            { id: '保险业', text: '保险业' },
            { id: '法律业', text: '法律业' },
            { id: '军事业', text: '军事业' },
            { id: '出版业', text: '出版业' },
            { id: '旅行观光业', text: '旅行观光业' },
            { id: '酒店业', text: '酒店业' },
            { id: '政府', text: '政府' },
            { id: '没有提供资料', text: '没有提供资料' }
          ],
          professionType_first:[],
          professionType_second:[],
          professionTypes: [
            { id: '国家机关、党群组织、企业、事业单位负责人', text: '国家机关、党群组织、企业、事业单位负责人' },
            { id: '专业技术人员', text: '专业技术人员' },
            { id: '办事人员和有关人员', text: '办事人员和有关人员' },
            { id: '商业、服务业人员', text: '商业、服务业人员' },
            { id: '农、林、牧、渔、水利业生产人员', text: '农、林、牧、渔、水利业生产人员' },
            { id: '生产、运输设备操作人员及有关人员', text: '生产、运输设备操作人员及有关人员' },
            { id: '军人', text: '军人' },
            { id: '其他', text: '其他' },
            { id: '家庭主妇、退休人士、学生、失业人士', text: '家庭主妇、退休人士、学生、失业人士' },
            { id: '没有提供资料', text: '没有提供资料' }
          ],
		  professionType_second:[],
          paymentWays: [
            { id: '网银', text: '网银' },
            { id: '现金', text: '现金' },
            { id: '网银+现金', text: '网银+现金' }
          ],
          jobLevels: [
            { id: '高级领导', text: '高级领导（行政级别局级及局级以上领导或大公司高级管理人员）' },
            { id: '中级领导', text: '中级领导（行政级别局级以下领导或大公司中级管理人员）' },
            { id: '一般员工', text: '一般员工' },
            { id: '其他', text: '其他' }
          ],
          customerBusinessmanTypes: [
            { id: '', text: '== 请选择 ==' },
            { id: '独资', text: '独资' },
            { id: '合伙', text: '合伙' },
            { id: '个体工商户', text: '个体工商户' },
            { id: '有限责任公司', text: '有限责任公司' },
            { id: '股份有限公司', text: '股份有限公司' }
          ],
          businessPlaces: [
            { id: '', text: '== 请选择 ==' },
            { id: '租用', text: '租用' },
            { id: '自有房产', text: '自有房产' }
          ],
          recommenders: [
            { id: '', text: '== 请选择 ==' },
            { id: '营业部推荐', text: '营业部推荐' },
            { id: '内部推荐', text: '内部推荐' },
            { id: '同业推荐', text: '同业推荐' }
          ],
          saleChannels: [
            { id: '报纸', text: '报纸' },
            { id: '网络', text: '网络' },
            { id: '促销活动', text: '促销活动' },
            { id: '朋友介绍', text: '朋友介绍' },
            { id: '其他', text: '其他' }
          ],
          isUrgents: [
            { id: '', text: '== 请选择 ==' },
            { id: 'true', text: '是' },
            { id: 'false', text: '否' }
          ],
		  nationality: [
		  { id: '', text: '== 请选择 ==' },
		  { id: 'China', text: '中国' },
		  { id: 'Other', text: '其他' }
		  ],
          hasCreditReports: [
            { id: 'true', text: '是' },
            { id: 'false', text: '否' }
          ],
          isKnows: [
            { id: 'true', text: '知道' },
            { id: 'false', text: '不知道' }
          ],
          customXingxiangs: [
            { id: '', text: '== 请选择 ==' },
            { id: '优秀', text: '优秀' },
            { id: '良好', text: '良好' },
            { id: '一般', text: '一般' }
          ],
          litigations: [
            { id: '北京市朝阳区', text: '北京市朝阳区' }
          ],
          relations: [
            {id: '本人', text: '本人'},
            {id: '配偶', text: '配偶'},
            {id: '直系亲属', text: '直系亲属'},
            {id: '其他联系人', text: '其他联系人'}
          ],
          phoneTypes: [
            {id: '1', text: '单位电话'},
            {id: '2', text: '本人电话'},
            {id: '3', text: '住宅电话'},
            {id: '4', text: '配偶'},
            {id: '5', text: '直系亲属1'},
            {id: '6', text: '直系亲属2'},
            {id: '7', text: '其他联系人1'},
            {id: '8', text: '其他联系人2'}
          ]
        },
        teamManagers: [],
        teamManagerEmpnos: [ ],
        contactCount: 2,
        customerScanningCopys: [],
        extraContacts: [],
        contact_0: {
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
          phoneType: 4,
          relation: "",
          shortKey: "",
          weixin: ""
        },
        contact_1: {
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
          phoneType: 5,
          relation: "",
          shortKey: "",
          weixin: ""
        },
        contact_2: {
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
          phoneType: 6,
          relation: "",
          shortKey: "",
          weixin: ""
        },
        contact_3: {
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
          phoneType: 7,
          relation: "",
          shortKey: "",
          weixin: ""
        },
        contact_4: {
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
          phoneType: 8,
          relation: "",
          shortKey: "",
          weixin: ""
        },
        searchParams_isStoreRegion: {
          gardencity: "",
          gardencityCode: ""
        },

        params: {
//          个人信息
          customerBaseInfo: {
            validityTerm:"",
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            anjieType: "",
            comeTime: "",
            commend: "",
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
            hkArea: "",
            hkAdd: "",
            hkZipcode: "",
            homePhone: "",
            zzPhone: "",
            zzPhones: "",
            housingSituation: "",
            housingType: "",
            id: "",
            idNum: "",
            idType: "身份证",
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
            zzArea: "",
            zzAdd: "",
            zzZipcode: "",
            accountNature: "",
            customXingxiang: ""
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
            repayType: "等额本息",
            term: "",
          },
//          工作信息
          customerWorkInfo: {
            industryNatureCode:"",
            professionTypeCode:"",
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
            orgArea: "",
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
//            auditFee: "银谷普诚",
//            consultingFee: "东方银谷",
            hasCreditReport: "",
            isUrgent: "",
            recommender: "",
            litigation: "",
            remark: "",
            saleChannel: "",
            salesman: "",
            salesmanEmpno: "",
//            serviceFee: "银谷普惠",
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
            orderNum: this.$route.params.orderNum,
            orderName: this.$route.params.orderName,
            expectAmount: "",
            isKnow: "",
            hasCreditReport: "",
            recordOrderConsumeTime: "",
            teamManagerEmpno: "",
            teamManager: "",
            salesmanEmpno: "",
            salesman: "",
            canRepayAdvance: ""
          },
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
          }
        },
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        int: "",
        timer: "",
        order_recordOrderConsumeTime_orderNum_hour: "order_recordOrderConsumeTime_orderNum_hour_" + this.$route.params.orderNum,
        order_recordOrderConsumeTime_orderNum_minute: "order_recordOrderConsumeTime_orderNum_minute_" + this.$route.params.orderNum,
        order_recordOrderConsumeTime_orderNum_second: "order_recordOrderConsumeTime_orderNum_second_" + this.$route.params.orderNum,
        area: {
          provinceOptions: [],
          cityOptions_1: [],
          cityOptions_2: [],
          cityOptions_3: [],
          areaOptions_1: [],
          areaOptions_2: [],
          areaOptions_3: []
        },
        product: {},
        formCount: 9,
        submitWatcher_1: 0,
        submitWatcher_2: 0,
        creditReportVerifyCodeUrl: "",
        creditReportVerifyCodeValue: "",
        creditReportVerifyCodeTaskId: "",
        creditReportLoginUrl: "",
        creditReportLoginValue: "",
        loginName: "",
        passWord: "",
        loginIdCode: ""
      }
    },
    watch: {
      // 通过验证的表单数量==表单数量时，申请单列表提交
      submitWatcher_1: function (newValue) {
//      alert(newValue);
        var that = this;
        if(newValue == that.formCount){
          var requiredScanning = that.product.requiredScanning;
          if(!requiredScanning){
            alert("请在产品管理中配置必须上传项");
            return false;
          }
          // 是否所有的必传附件都已上传
          var url = basePath4 + 'api/order/' + that.$route.params.orderNum + '/scanningcopy'+"?accessToken="+that.$utils.getLocalData("accessToken");
          that.$http.get(url, {}).then(function (res) {
            var uploadedFiles = res.body.data;
            if(!uploadedFiles){
              alert(requiredScanning+"未上传");
            }else{
              var uploadedFileTypes = "";
              $(uploadedFiles).each(function (i, item) {
                uploadedFileTypes+=item.fileType;
                if(i<uploadedFiles.length-1){
                  uploadedFileTypes+=",";
                }
              });
              var arr = requiredScanning.split(",");
              var isUploadAll = true;
              var missFiles = "";
              $(arr).each(function(i,item){
                if(uploadedFileTypes.indexOf(item)<0){  // 不包含必传项
                  isUploadAll = false;
                  // 缺少的文件
                  missFiles+=item;
                  missFiles+=" ";
                }
              });
              if(isUploadAll){
                that.applylistSave('clock');
              }else{
                alert(missFiles+"未上传");
              }
            }
          }, function (res) {
            console.warn(res);
          });
        }
      },
      // 通过验证的表单数量==表单数量时，待质检列表提交
      submitWatcher_2: function (newValue) {
        var that = this;
        if(newValue == that.formCount){
          var requiredScanning = that.product.requiredScanning;
          if(!requiredScanning){
            alert("请在产品管理中配置必须上传项");
            return false;
          }
          // 是否所有的必传附件都已上传
          var url = basePath4 + 'api/order/' + that.$route.params.orderNum + '/scanningcopy'+"?accessToken="+that.$utils.getLocalData("accessToken");
          that.$http.get(url, {}).then(function (res) {
            var uploadedFiles = res.body.data;
            if(!uploadedFiles){
              alert(requiredScanning+"未上传");
            }else{
              var uploadedFileTypes = "";
              $(uploadedFiles).each(function (i, item) {
                uploadedFileTypes+=item.fileType;
                if(i<uploadedFiles.length-1){
                  uploadedFileTypes+=",";
                }
              });
              var arr = requiredScanning.split(",");
              var isUploadAll = true;
              var missFiles = "";
              $(arr).each(function(i,item){
                if(uploadedFileTypes.indexOf(item)<0){  // 不包含必传项
                  isUploadAll = false;
                  // 缺少的文件
                  missFiles+=item;
                  missFiles+=" ";
                }
              });
              if(isUploadAll){
                that.waitQualitylistSave("clock");
              }else{
                alert(missFiles+"未上传");
              }
            }
          }, function (res) {
            console.warn(res);
          });
        }
      }
    },
    methods: {
      permanentTerm:function(){
//          debugger
          var that = this;
        $("#validityTerm_base").val("永久");
          that.params.customerBaseInfo.validityTerm = "永久";
      },
      isStoreRegionCity :function (ws){
        var that = this;
        that.searchParams_isStoreRegion.gardencity = ws;
        that.$utils.ajax(that)(basePath2+'store/isStoreRegion',that.searchParams_isStoreRegion, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.isStoreRegionsCity = response.body.data;
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
      isStoreRegion :function (ws){
        var that = this;
        if(that.options.isStoreRegionsCity == false){
            that.searchParams_isStoreRegion.gardencity = ws;
            that.$utils.ajax(that)(basePath2+'store/isStoreRegion',that.searchParams_isStoreRegion, function (response) {
              if(typeof (response.body) === 'string'){
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                that.options.isStoreRegions = response.body.data;
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
      getUserInfo : function () {
        var hrData = this.$utils.getLocalData("hrData");
        return hrData.a0101;
      },
      toMoney: function (value) {
        return toMoney(value)
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
      isShowModule: function(item){
        if(this.product){
          var requiredItem = this.product.requiredItem;
          if(requiredItem && requiredItem.indexOf(item)>-1){
            return true;
          }
        }
        return false;
      },
	  customerCicInfoFun: function(){
        if(this.params.order.isBuyInsurance==true){
            return true;
        }
        return false;
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
      isNull: function (value) {
        if(value !== null || value !== undefined || value !== ''){
          return false;
        }
      },
      isNullChild: function (value) {
        if(value !== null || value !== undefined || value !== ''){
          return false;
        }
      },
      //预览
      previewFile: function (md5, type) {
        var _this = this;
        _this.filePath = basePath4 + "preview/" + md5 + "/" + type;
        window.open("../../static/img/upload/uploadPreview.html?filePath="+basePath4 + "preview/" + md5 + "/" + type,'_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
      },
      previewPdf: function (md5, type) {
        var _this = this;
        _this.filePath =  basePath4 + "preview/" + md5 + "/" + type;
        // window.open("../../static/img/upload/uploadPreview.html?filePath="+basePath4 + "preview/" + md5 + "/" + type,'_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
      },
      // 构建联系人列表
      buildContacts: function () {
        var that = this;
        // step 1: 初始化数组
        that.params.customerContactsInfos = [];
        // step 2: "固定5项"加入联系人列表
        if(that.contact_0.phone && that.params.customerBaseInfo.maritalStatus == '已婚'){ // 配偶
          that.contact_0.id = 0;
          that.params.customerContactsInfos.push(that.contact_0);
        }
        if(that.contact_1.phone){ // 直系亲属1
          that.contact_1.id = 0;
          that.params.customerContactsInfos.push(that.contact_1);
        }
        if(that.contact_2.phone){ // 直系亲属2
          that.contact_2.id = 0;
          that.params.customerContactsInfos.push(that.contact_2);
        }
        if(that.contact_3.phone){ // 其他联系人1
          that.contact_3.id = 0;
          that.params.customerContactsInfos.push(that.contact_3);
        }
        if(that.contact_4.phone){ // 其他联系人2
          that.contact_4.id = 0;
          that.params.customerContactsInfos.push(that.contact_4);
        }
        // step 3: "补充联系人"加入联系人列表
        $(that.extraContacts).each(function (i, item) {
          var extraContact = that.extraContacts[i];
          extraContact.id = 0;
          extraContact.isPhone = that.validatePhone(extraContact.phone);
          that.params.customerContactsInfos.push(extraContact);
        });
      },
      // 补充验证
      extraValidate: function () {
        var isValidate = true;
        $(this.extraContacts).each(function (i, item) {
          if(!item.isPhone){
            isValidate = false;
            return false;
          }
          if(!item.relation){
            isValidate = false;
            return false;
          }
//          if(!item.address){
//            isValidate = false;
//            return false;
//          }
          if(!item.contactName){
            isValidate = false;
            return false;
          }
          if(!item.phoneType){
            isValidate = false;
            return false;
          }
        });
        return isValidate;
      },
      validateLoanQuota: function (value) {
        if(value && this.product && this.product.minAmount && this.product.maxAmount){
          if(!isNaN(value) && !isNaN(this.product.minAmount) && !isNaN(this.product.maxAmount)){
            var v = parseFloat(value);
            var mi = parseFloat(this.product.minAmount);
            var ma = parseFloat(this.product.maxAmount);
            if(v>=mi && v<=ma){
              return true;
            }
          }
        }
        return false;
      },
      getAge: function () {
        var idNumber = this.params.customerBaseInfo.idNum;
        var isID = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idNumber);
        if(!isID){
          return 0;
        }
        var year = idNumber.substr(6,4);
        var month = idNumber.substr(10,2);
        var date = idNumber.substr(12,2);
        var ymd = year+"-"+month+"-"+date;
        var birthday = new Date(ymd);
        var now = new Date();
        var birthTime = birthday.getTime();
        var nowTime = new Date().getTime();
        var plusTime = nowTime - birthTime;
        var y = 365 * 24 * 60 * 60 * 1000;
        var age = parseInt(plusTime / y);
        return age;
      },
      validateAge: function () {
        var idNumber = this.params.customerBaseInfo.idNum;
        var age = new Number(this.getAge());
        var minAge = new Number(this.product.minAge);
        var maxAge = new Number(this.product.maxAge);
        if(minAge && maxAge && age!=0){
          if(age>=minAge && age<=maxAge){
            return true;
          }
        }
        return false;
      },
      initProvinceOptions: function () {
        this.area.provinceOptions = _provinceData2();
      },
	  initProfessionTypes: function () {
        this.options.professionType_first = _oneClassData2();
      },
      callback_1: function(value, text){
        this.area.cityOptions_1 = _cityData2(value);
      },
      professionTypesBack_1: function(value, text){
        this.options.professionType_second = _twoClassData2(text);
        this.params.customerWorkInfo.professionType_firsts = text;
        this.params.customerCicInfo.industryNature = this.params.customerWorkInfo.professionType_firsts;
      },
      professionTypesBack_2:function(value,text){
        this.params.customerWorkInfo.professionType_seconds = text;
        this.params.customerCicInfo.industryCategory = this.params.customerWorkInfo.professionType_seconds;
      },
      callback_2: function(value, text){
        this.area.cityOptions_2 = _cityData2(value);
      },
      callback_3: function(value, text){
        this.area.cityOptions_3 = _cityData2(value);
      },
      callback_area_1: function (value, text) {
        this.area.areaOptions_1 = _areaData2(value);
      },
      callback_area_2: function (value, text) {
        this.area.areaOptions_2 = _areaData2(value);
      },
      callback_area_city_2: function (value, text) {
        this.isStoreRegion(text);
      },
      callback_area_3: function (value, text) {
        this.area.areaOptions_3 = _areaData2(value);
        this.isStoreRegionCity(text);
      },
      callbackA: function(value,text){
        this.params.customerLoanPurpose.productName = text;
      },
      // 婚姻状况
      callback_maritalStatus: function(value, text){
        var that = this;
        if(value == "已婚"){
          that.options.phoneTypes = [
            {id: '1', text: '单位电话'},
            {id: '2', text: '本人电话'},
            {id: '3', text: '住宅电话'},
            {id: '4', text: '配偶'},
            {id: '5', text: '直系亲属1'},
            {id: '6', text: '直系亲属2'},
            {id: '7', text: '其他联系人1'},
            {id: '8', text: '其他联系人2'}
          ];
        }else{
          that.options.phoneTypes = [
            {id: '1', text: '单位电话'},
            {id: '2', text: '本人电话'},
            {id: '3', text: '住宅电话'},
            {id: '5', text: '直系亲属1'},
            {id: '6', text: '直系亲属2'},
            {id: '7', text: '其他联系人1'},
            {id: '8', text: '其他联系人2'}
          ];
        }
      },
      callback_teamManager: function (value, text) {
        this.params.customerWorkerWrite.teamManagerEmpno = value;
        this.params.customerWorkerWrite.teamManager = text.split("(")[0];
        this.params.order.teamManagerEmpno = value;
        this.params.order.teamManager = text.split("(")[0];
      },
      callback_salesman: function (value, text) {
        this.params.customerWorkerWrite.salesmanEmpno = value;
        this.params.customerWorkerWrite.salesman = text.split("(")[0];
        this.params.order.salesmanEmpno = value;
        this.params.order.salesman = text.split("(")[0];
      },
      addContact: function () {
        var extraContact = {
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
          phoneType: "",
          relation: "",
          shortKey: "",
          weixin: ""
        };
        this.extraContacts.push(extraContact);
      },
      createShortKey2: function(index){
        var that = this;
        if(index == 0){
          that.contact_0.shortKey = that.contact_0.phone.slice(4);
        }
        if(index == 1){
          that.contact_1.shortKey = that.contact_1.phone.slice(4);
        }
        if(index == 2){
          that.contact_2.shortKey = that.contact_2.phone.slice(4);
        }
        if(index == 3){
          that.contact_3.shortKey = that.contact_3.phone.slice(4);
        }
        if(index == 4){
          that.contact_4.shortKey = that.contact_4.phone.slice(4);
        }
      },
      createShortKey: function(index){
        var phone = this.extraContacts[index].phone;
        this.extraContacts[index].isPhone = this.validatePhone(phone);
        this.extraContacts[index].shortKey = this.extraContacts[index].phone.slice(4);
      },
      validatePhone: function(value) {
        return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value);
      },
      validateNotNull: function(value) {
        if(value){
          return true;
        }
        return false;
      },
      // 删除固定联系人
      deleteFixedContact: function (index) {
        if(index == 0){
          this.contact_0.contactName = "";
          this.contact_0.relation = "";
          this.contact_0.companyName = "";
          this.contact_0.phone = "";
          this.contact_0.weixin = "";
          this.contact_0.address = "";
        }
        if(index == 1){
          this.contact_1.contactName = "";
          this.contact_1.relation = "";
          this.contact_1.companyName = "";
          this.contact_1.phone = "";
          this.contact_1.weixin = "";
          this.contact_1.address = "";
        }
        if(index == 2){
          this.contact_2.contactName = "";
          this.contact_2.relation = "";
          this.contact_2.companyName = "";
          this.contact_2.phone = "";
          this.contact_2.weixin = "";
          this.contact_2.address = "";
        }
        if(index == 3){
          this.contact_3.contactName = "";
          this.contact_3.relation = "";
          this.contact_3.companyName = "";
          this.contact_3.phone = "";
          this.contact_3.weixin = "";
          this.contact_3.address = "";
        }
        if(index == 4){
          this.contact_4.contactName = "";
          this.contact_4.relation = "";
          this.contact_4.companyName = "";
          this.contact_4.phone = "";
          this.contact_4.weixin = "";
          this.contact_4.address = "";
        }
      },
      // 删除补充联系人
      reduceContact: function () {
        if(this.extraContacts.length>0){
          var index = this.extraContacts.length-1;
          this.deleteContact(index);
        }
      },
      // 删除补充联系人
      deleteContact(index){
        var customerContactsInfo = this.extraContacts[index];
        if(customerContactsInfo && customerContactsInfo.phone){ // 如果填了手机号了，删的时候提示一下
          if(confirm("确定删除该联系人？")) {
            this.extraContacts.splice(index, 1);
          }
        }else{  //没填手机号，直接删除
          this.extraContacts.splice(index, 1);
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
            that.options.products = items;
          }else if(response.body.code == '401'){
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
      splitAddress: function (value) {
        if(!value){
          return "";
        }
        var arr = value.split("-");
        var arrLen = arr.length;
        var address = "";
        $(arr).each(function(i,item){
          if(i>2){
            address += item;
            if(i<arrLen-1){
              address += "-";
            }
          }
        });
        return address;
      },
      setParams: function (data) {
        if(data){
          if(!isNull(data.customerBaseInfo)){
            this.params.customerBaseInfo.validityTerm =data.customerBaseInfo.validityTerm;
            if( this.params.customerBaseInfo.validityTerm){
              $("#validityTerm_base").val(this.params.customerBaseInfo.validityTerm);
            }
            this.params.customerBaseInfo.id = data.customerBaseInfo.id;
            this.params.customerBaseInfo.anjieType = data.customerBaseInfo.anjieType;
            this.params.customerBaseInfo.health = data.customerBaseInfo.health;
            this.params.customerBaseInfo.accountNature = data.customerBaseInfo.accountNature;
            this.params.customerBaseInfo.comeTime = data.customerBaseInfo.comeTime;
            this.params.customerBaseInfo.commend = data.customerBaseInfo.commend;
            this.params.customerBaseInfo.creditLimit = data.customerBaseInfo.creditLimit;
            this.params.customerBaseInfo.customName = data.customerBaseInfo.customName;
            this.params.customerBaseInfo.education = data.customerBaseInfo.education;
            this.params.customerBaseInfo.email = data.customerBaseInfo.email;
            this.params.customerCicInfo.email = this.params.customerBaseInfo.email;
            this.params.customerBaseInfo.expend = data.customerBaseInfo.expend;
            this.params.customerBaseInfo.fundAmount = data.customerBaseInfo.fundAmount;
            this.params.customerBaseInfo.fundBase = data.customerBaseInfo.fundBase;
            this.params.customerBaseInfo.hasCar = data.customerBaseInfo.hasCar;
            this.params.customerBaseInfo.hasChild = data.customerBaseInfo.hasChild ? data.customerBaseInfo.hasChild.toString() : false;
            this.params.customerBaseInfo.housingSituation = data.customerBaseInfo.housingSituation;
            this.params.customerBaseInfo.housingType = data.customerBaseInfo.housingType;
            this.params.customerBaseInfo.idNum = data.customerBaseInfo.idNum;
//            this.params.customerBaseInfo.idType = data.customerBaseInfo.idType;
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
            if(this.params.customerBaseInfo.startWorkTime){
              $("#startWorkTime").val(this.transfers(this.params.customerBaseInfo.startWorkTime));
            }
            this.params.customerBaseInfo.syInsurance = data.customerBaseInfo.syInsurance;
            this.params.customerBaseInfo.weixin = data.customerBaseInfo.weixin;
            this.params.customerBaseInfo.startResidenceTime = data.customerBaseInfo.startResidenceTime;
            if(!isNull(data.customerBaseInfo.hkAddress)) {
              var arr = data.customerBaseInfo.hkAddress.split("-");
              this.params.customerBaseInfo.hkPro = isNull(arr[0]) ? "" : arr[0];
              if(this.params.customerBaseInfo.hkPro){
                this.area.cityOptions_1 = _cityData2(this.params.customerBaseInfo.hkPro);
              }
              this.params.customerBaseInfo.hkAddress = data.customerBaseInfo.hkAddress;
              this.params.customerBaseInfo.hkCity = isNull(arr[1]) ? "" : arr[1];
              if(this.params.customerBaseInfo.hkCity){
                this.area.areaOptions_1 = _areaData2(this.params.customerBaseInfo.hkCity)
              }
              this.params.customerBaseInfo.hkArea = isNull(arr[2]) ? "" : arr[2];
//              this.params.customerBaseInfo.hkAdd = isNull(arr[3]) ? "" : arr[3];
              this.params.customerBaseInfo.hkAdd = this.splitAddress(data.customerBaseInfo.hkAddress);

              this.params.customerCicInfo.address = this.params.customerBaseInfo.hkPro+"-"+this.params.customerBaseInfo.hkCity+"-"+this.params.customerBaseInfo.hkArea+"-"+this.params.customerBaseInfo.hkAdd
            }
            this.params.customerBaseInfo.hkZipcode = data.customerBaseInfo.hkZipcode;
            if(!isNull(data.customerBaseInfo.zzAddress)) {
              var arr = data.customerBaseInfo.zzAddress.split("-");
              this.params.customerBaseInfo.zzPro = isNull(arr[0]) ? "" : arr[0];
              if(this.params.customerBaseInfo.zzPro){
                this.area.cityOptions_2 = _cityData2(this.params.customerBaseInfo.zzPro);
                console.log(this.area.cityOptions_2);
              }
              this.params.customerBaseInfo.zzAddress = data.customerBaseInfo.zzAddress;
              this.params.customerBaseInfo.zzCity = isNull(arr[1]) ? "" : arr[1];
              if(this.params.customerBaseInfo.zzCity){
                this.area.areaOptions_2 = _areaData2(this.params.customerBaseInfo.zzCity)
              }
              this.params.customerBaseInfo.zzArea = isNull(arr[2]) ? "" : arr[2];
//              this.params.customerBaseInfo.zzAdd = isNull(arr[3]) ? "" : arr[3];
              this.params.customerBaseInfo.zzAdd = this.splitAddress(data.customerBaseInfo.zzAddress);
            }
            this.params.customerBaseInfo.zzZipcode = data.customerBaseInfo.zzZipcode;
            this.params.customerBaseInfo.age = this.getAge();
			if(!isNull(data.customerBaseInfo.homePhone)) {
              var arr = data.customerBaseInfo.homePhone.split("-");
              this.params.customerBaseInfo.zzPhone = isNull(arr[0]) ? "" : arr[0];
              this.params.customerBaseInfo.zzPhones = isNull(arr[1]) ? "" : arr[1];
            }
            this.params.customerBaseInfo.customXingxiang = data.customerBaseInfo.customXingxiang;
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
//          /*if(!isNull(data.customerContactsInfos)){
//            this.params.customerContactsInfos.address = data.customerContactsInfos.address;
//            this.params.customerContactsInfos.companyName = data.customerContactsInfos.companyName;
//            this.params.customerContactsInfos.contactName = data.customerContactsInfos.contactName;
//            this.params.customerContactsInfos.id = data.customerContactsInfos.id;
//            this.params.customerContactsInfos.orderNum = data.customerContactsInfos.orderNum;
//            this.params.customerContactsInfos.phone = data.customerContactsInfos.phone;
//            this.params.customerContactsInfos.relation = data.customerContactsInfos.relation;
//            this.params.customerContactsInfos.weixin = data.customerContactsInfos.weixin;
//          }*/
          if(!isNull(data.customerContactsInfos)){
            this.params.customerContactsInfos = data.customerContactsInfos;
            this.setContacts();
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
            if(data.customerLoanPurpose.repayType){
              this.params.customerLoanPurpose.repayType = data.customerLoanPurpose.repayType;
            }

            this.params.customerLoanPurpose.term = data.customerLoanPurpose.term;
          }
          if(!isNull(data.customerWeddingInfo)){
            this.params.customerWeddingInfo.coupleAverage_income = data.customerWeddingInfo.coupleAverage_income;
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
//              console.log(arr)
//              console.log(arr.length)
              this.params.customerWorkInfo.orgPro = isNull(arr[0]) ? "" : arr[0];
              if(this.params.customerWorkInfo.orgPro){
                this.area.cityOptions_3 = _cityData2(this.params.customerWorkInfo.orgPro);
              }
              this.params.customerWorkInfo.orgAddress = data.customerWorkInfo.orgAddress;
              this.params.customerWorkInfo.orgCity = isNull(arr[1]) ? "" : arr[1];
              if(this.params.customerWorkInfo.orgCity){
                this.area.areaOptions_3 = _areaData2(this.params.customerWorkInfo.orgCity);
              }
              this.params.customerWorkInfo.orgArea = isNull(arr[2]) ? "" : arr[2];
//              this.params.customerWorkInfo.orgAdd = isNull(arr[3]) ? "" : arr[3];
              this.isStoreRegionCity(isNull(arr[1]) ? "" : arr[1]);
              if(this.options.isStoreRegionsCity == false){
                this.isStoreRegion(isNull(arr[2]) ? "" : arr[2]);
              }
              this.params.customerWorkInfo.orgAdd = this.splitAddress(data.customerWorkInfo.orgAddress);
            }
            this.params.customerWorkInfo.companyNature = data.customerWorkInfo.companyNature;
            this.params.customerWorkInfo.deptName = data.customerWorkInfo.deptName;
            this.params.customerWorkInfo.hiredate = data.customerWorkInfo.hiredate;
            if(this.params.customerWorkInfo.hiredate){
              $("#hiredate").val(this.transfers(this.params.customerWorkInfo.hiredate));
            }
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
			      var split = data.customerWorkInfo.professionType.split("-");

            if(split[0]){
              this.options.professionType_second = _twoClassData2(split[0]);
            }
            console.log(data.customerWorkInfo.industryNatureCode);
            console.log(data.customerWorkInfo.professionTypeCode);
            this.params.customerWorkInfo.industryNatureCode = data.customerWorkInfo.industryNatureCode;
            this.params.customerWorkInfo.professionTypeCode = data.customerWorkInfo.professionTypeCode;

            this.params.customerCicInfo.industryNature = split[0];
            this.params.customerCicInfo.industryCategory =  split[1];


            this.params.customerWorkInfo.professionType = data.customerWorkInfo.professionType;
            this.params.customerWorkInfo.registerNo = data.customerWorkInfo.registerNo;
            this.params.customerWorkInfo.salary = data.customerWorkInfo.salary;
            this.params.customerWorkInfo.orgZipcode = data.customerWorkInfo.orgZipcode;
          }
          if(!isNull(data.customerWorkerWrite)){
            this.params.customerWorkerWrite.applicationTime = data.customerWorkerWrite.applicationTime;
//            this.params.customerWorkerWrite.auditFee = isNull(data.customerWorkerWrite.auditFee) ? '0' : data.customerWorkerWrite.auditFee;
            this.params.customerWorkerWrite.auditFee = data.customerWorkerWrite.auditFee;
            this.params.customerWorkerWrite.consultingFee = data.customerWorkerWrite.consultingFee;
            this.params.customerWorkerWrite.isUrgent = data.customerWorkerWrite.isUrgent ? data.customerWorkerWrite.isUrgent.toString() : 'false';
            this.params.customerWorkerWrite.hasCreditReport = data.customerWorkerWrite.hasCreditReport ? data.customerWorkerWrite.hasCreditReport.toString() : 'false';
            this.params.customerWorkerWrite.id = data.customerWorkerWrite.id;
            this.params.customerWorkerWrite.litigation = data.customerWorkerWrite.litigation;
            this.params.customerWorkerWrite.orderNum = data.customerWorkerWrite.orderNum;
            this.params.customerWorkerWrite.remark = data.customerWorkerWrite.remark;
            this.params.customerWorkerWrite.saleChannel = data.customerWorkerWrite.saleChannel;
            this.params.customerWorkerWrite.salesman = data.customerWorkerWrite.salesman;
            this.params.customerWorkerWrite.salesmanEmpno = data.customerWorkerWrite.salesmanEmpno;
            this.params.customerWorkerWrite.serviceFee = data.customerWorkerWrite.serviceFee;
//            this.params.customerWorkerWrite.serviceFee = data.customerWorkerWrite.serviceFee;
            this.params.customerWorkerWrite.teamManagerEmpno = data.customerWorkerWrite.teamManagerEmpno;
            this.params.customerWorkerWrite.teamManager = data.customerWorkerWrite.teamManager;
            this.params.customerWorkerWrite.recommender = data.customerWorkerWrite.recommender;
          }
          if(!isNull(data.order)){
            this.params.order.approvalAmount = data.order.approvalAmount;
            if(data.order.status==100){
              this.params.order.customService = this.getUserInfo();
            }else{
              this.params.order.customService = data.order.customService;
            }
            this.params.order.expectAmount = data.order.expectAmount;
            this.params.order.id = data.order.id;
            this.params.order.orderNum = data.order.orderNum;
            this.params.order.productId = data.order.productId;
            this.params.order.productName = data.order.productName;
            this.params.order.proposer = data.order.proposer;
            this.params.order.purpose = data.order.purpose;
            this.params.order.rate = data.order.rate;
            this.params.order.teamManagerEmpno = data.order.teamManagerEmpno;
            this.params.order.teamManager = data.order.teamManager;
            this.params.order.salesman = data.order.salesman;
            this.params.order.salesmanEmpno = data.order.salesmanEmpno;
            this.params.order.status = data.order.status;
            this.params.order.hasCreditReport = data.order.hasCreditReport;
//            if(this.params.order.hasCreditReport == false || this.params.order.hasCreditReport == 'false'){
//              this.loginNum();
//            }
            this.params.order.term = data.order.term;
            this.params.order.isBuyInsurance = data.order.isBuyInsurance;
            this.params.order.canRepayAdvance = data.order.canRepayAdvance;
            this.params.order.isKnow = data.order.isKnow ? data.order.isKnow.toString() : 'false';
            this.params.order.remarkContent = data.order.remarkContent;
            this.params.order.remarkType = data.order.remarkType;
          }
          if(data.customerCicInfo!=null){
            //投/被保人姓名
            this.params.customerCicInfo.customName =data.customerCicInfo.customName;
            //投/被投保人身份证号
            var idNums = data.customerCicInfo.idNum;
            this.params.customerCicInfo.idNum =idNums;
            this.params.customerCicInfo.dateOfBirth = idNums.substring(6, 10) + "-" + idNums.substring(10, 12) + "-" + idNums.substring(12, 14);
            //投/被保保人证件有效期
//            debugger
            this.params.customerCicInfo.validityTerm =data.customerCicInfo.validityTerm;
            if( this.params.customerCicInfo.validityTerm){
              $("#validityTerm").val(this.params.customerCicInfo.validityTerm);
            }



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
            this.params.customerCicInfo.industryNature =data.customerCicInfo.industryNature;
            //投/被保险人行业类别
            this.params.customerCicInfo.industryCategory =data.customerCicInfo.industryCategory;
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
            // -2 投保失败 -1 核保失败   1 投保中  2 承保中 3 保险失效 4 已退保，保险失效 5 已赔付，保险失效 10 核保成功 20 拒保
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
//      获取订单详情
      initOrdernum: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'order/' + that.$route.params.orderNum, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
//            that.params = response.body.data;
            that.setParams(response.body.data);
            console.log(response.body.data);
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
//      征信报告获取登录验证码
//      loginNum: function () {
//        var that = this;
//        that.$utils.ajax(that)(basePath2 + 'creditReport/verifyCode/' + that.$route.params.orderNum, {}, function (response) {
//          if(typeof (response.body) === 'string'){
//            response.body = JSON.parse(response.body);
//          }
//          if (response.body.code == '200') {
//            if (response.body.data.status == '1' && !isNull(response.body.data.taskId)){
//              that.creditReportVerifyCodeUrl = response.body.data.url;
//              that.creditReportVerifyCodeTaskId = response.body.data.taskId;
//            } else {
//              that.$utils.alert("征信报告"+response.body.data.errorMsg + "，请10秒后重试")
//            }
//          }else if(response.body.code == '401'){
//
//          }else if(response.body.code == '500' || response.body.code == 500){
//            that.$utils.alert(response.body.message)
//          }else{
//            if(!isNull(response.body.data)){
//              that.$utils.alert("征信报告"+response.body.data.errorMsg + "，请10秒后重试")
//            } else {
//              that.$utils.alert(response.body.message)
//            }
//          }
//        }, function (response) {
//          that.$utils.alert("fail");
//        },"get");
//      },
//登录征信报告
//      loginReport: function () {
//        var that = this;
//        that.$utils.ajax(that)(basePath2 + 'creditReport/login/' + that.creditReportVerifyCodeTaskId + '?loginName=' + that.loginName +'&passWord=' + that.passWord +'&loginAuthCode=' + that.creditReportVerifyCodeValue + '&loginIdCode=' + that.loginIdCode, {}, function (response) {
//          if(typeof (response.body) === 'string'){
//            response.body = JSON.parse(response.body);
//          }
//          if (response.body.code == '200') {
//            if (isNull(response.body.data)){
//              that.$utils.alert('大数据服务暂时不可用')
//            } else {
//              if (response.body.data.status == '1'){
//                that.creditReportLoginUrl = response.body.data.url;
//                that.$utils.alert('征信报告登录成功')
//                $('#downAuthCode').attr("style", "display: block;");
//
//              } else {
//                that.$utils.alert("征信报告"+response.body.data.errorMsg)
//              }
//            }
//          }else if(response.body.code == '401'){
//            that.$utils.alert("征信报告"+response.body.message)
//          }else if(response.body.code == '500'){
//            that.$utils.alert(response.body.message)
//          }
//          else{
//            that.$utils.alert(response.body.data.errorMsg)
//          }
//        }, function (response) {
//          that.$utils.alert("fail");
//        },"get");
//      },
//下载征信报告
//      downReport: function () {
//        var that = this;
//        that.$utils.ajax(that)(basePath2 + 'creditReport/download/' + that.creditReportVerifyCodeTaskId + '?downloadAuthCode=' + that.creditReportLoginValue, {}, function (response) {
//          if(typeof (response.body) === 'string'){
//            response.body = JSON.parse(response.body);
//          }
//          if (response.body.code == '200') {
//            if (response.body.data.status == '1'){
//              that.$utils.alert("征信报告下载成功")
//            } else {
//              that.$utils.alert(response.body.data.errorMsg)
//            }
//          }else if(response.body.code == '401'){
//
//          }else if(response.body.code == '500'){
//            that.$utils.alert(response.body.data.message)
//          }else{
//            that.$utils.alert(response.body.data.errorMsg)
//          }
//        }, function (response) {
//          that.$utils.alert("fail");
//        },"get");
//      },

      setContacts: function () {
        var that = this;
        that.extraContacts = []; //清空补充联系人
        $(that.params.customerContactsInfos).each(function (i, item) {
          if(!that.contact_0.phone && item.phoneType == 4){  // 配偶
            that.contact_0 = that.params.customerContactsInfos[i];
            return true;
          }
          if(!that.contact_1.phone && item.phoneType == 5){  // 直系亲属1
            that.contact_1 = that.params.customerContactsInfos[i];
            return true;
          }
          if(!that.contact_2.phone && item.phoneType == 6){  // 直系亲属2
            that.contact_2 = that.params.customerContactsInfos[i];
            return true;
          }
          if(!that.contact_3.phone && item.phoneType == 7){  // 其他联系人1
            that.contact_3 = that.params.customerContactsInfos[i];
            return true;
          }
          if(!that.contact_4.phone && item.phoneType == 8){  // 其他联系人2
            that.contact_4 = that.params.customerContactsInfos[i];
            return true;
          }
          var extraContact = that.params.customerContactsInfos[i];
          extraContact.isPhone = that.validatePhone(extraContact.phone);
          that.extraContacts.push(extraContact);  // 补充联系人
        });
      },
      initContacts: function () {
        var that = this;
        var orderNum = that.$route.params.orderNum;
        var url = basePath2+"order/"+orderNum+"/contacts";
        that.$utils.ajax(that)(url, {}, function (response) {
          if (response.body.code == '200') {
            if(response.body.data && response.body.data.length>0){
              that.params.customerContactsInfos = response.body.data;
              that.setContacts();
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
      initTeamManagers: function () {
        var that = this;
        var myParams = {};
        myParams.orderNum = that.$route.params.orderNum;
        that.$utils.ajax(that)(basePath2+'team/manager/options',myParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            for (var i = 0 ;i<response.body.data.length;i++){
              response.body.data[i].text = response.body.data[i].text+"("+response.body.data[i].id+")"
            }
            that.teamManagers = response.body.data;
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
      initTeamManagerEmpnos: function () {
        var that = this;
        var myParams = {};
        myParams.orderNum = that.$route.params.orderNum;
        that.$utils.ajax(that)(basePath2+'team/sale/options',myParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            for (var i = 0 ;i<response.body.data.length;i++){
              response.body.data[i].text = response.body.data[i].text+"("+response.body.data[i].id+")"
            }
            that.teamManagerEmpnos = response.body.data;
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
              var imgSrc = basePath4+"preview/"+item.fileMd5+"/";

              if("pdf" == item.fileSuffix){
                imgSrc = imgSrc + "jpg";
              }else{
                imgSrc = imgSrc + item.fileSuffix;
              }
              imgSrc += "?thumbnails=true"
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
//        $(".swiper-slide a").removeClass().addClass("color");
        $("#div_"+fileType).addClass("clickSSL");
//        $(".swiper-slide a").addClass("color");

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
//      申请单列表提交
      applylistSave: function (clock) {
        if(!this.isProductOpen()){
          alert("产品已下架");
          return false;
        }
        this.buildContacts();
        this.params.customerBaseInfo.hkAddress = this.params.customerBaseInfo.hkPro + '-'+ this.params.customerBaseInfo.hkCity + '-'+ this.params.customerBaseInfo.hkArea + '-' + this.params.customerBaseInfo.hkAdd;
        this.params.customerBaseInfo.zzAddress = this.params.customerBaseInfo.zzPro + '-' + this.params.customerBaseInfo.zzCity + '-' + this.params.customerBaseInfo.zzArea + '-' + this.params.customerBaseInfo.zzAdd;
        this.params.customerWorkInfo.orgAddress = this.params.customerWorkInfo.orgPro + '-' + this.params.customerWorkInfo.orgCity + '-' + this.params.customerWorkInfo.orgArea + '-' + this.params.customerWorkInfo.orgAdd;
        if(this.params.customerBaseInfo.zzPhone && this.params.customerBaseInfo.zzPhones){
          this.params.customerBaseInfo.homePhone = this.params.customerBaseInfo.zzPhone + '-' + this.params.customerBaseInfo.zzPhones;
        }
        if(this.params.customerWorkInfo.officeNum && this.params.customerWorkInfo.officeNums){
          this.params.customerWorkInfo.officeTel = this.params.customerWorkInfo.officeNum + '-' + this.params.customerWorkInfo.officeNums;
        }
		if(this.params.customerWorkInfo.professionType_firsts && this.params.customerWorkInfo.professionType_seconds){
          this.params.customerWorkInfo.professionType = this.params.customerWorkInfo.professionType_firsts + '-' + this.params.customerWorkInfo.professionType_seconds;
          this.params.customerCicInfo.industryNature = this.params.customerWorkInfo.professionType_firsts;
          this.params.customerCicInfo.industryCategory =  this.params.customerWorkInfo.professionType_seconds;
        }
        this.params.order.expectAmount = this.params.customerLoanPurpose.loanQuota;
        //this.params.customerContactsInfos = [];
//        this.params.order.id = this.params.customerLoanPurpose.id;
        var jsonParams = JSON.stringify(this.params);
//        console.log(jsonParams)
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/applyOrderSubmit', jsonParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.$utils.alert('提交成功')
            //清空计时数据
            that.$utils.clearLocalData(that.order_recordOrderConsumeTime_orderNum_hour);
            that.$utils.clearLocalData(that.order_recordOrderConsumeTime_orderNum_minute);
            that.$utils.clearLocalData(that.order_recordOrderConsumeTime_orderNum_second);
            that.$router.push('/applyList/');
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin();
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"put",clock);
      },
      applylistsaveVeeValidate: function(){
        if(!this.isProductOpen()){
          alert("产品已下架");
          return false;
        }
        var that = this;
        that.submitWatcher_1 = 0;
        var items = that.product.requiredItem;
        if(items){
          var arr = items.split(",");
          $(arr).each(function(i,item){
            var formScope = "form-"+item;
            that.$validator.validateAll(formScope).then(result => {
              if(item == 2){
              if(that.validateAge()){
                that.submitWatcher_1 ++;
              }
            }else if(item == 8){
              if(that.extraValidate()){
                that.submitWatcher_1 ++;
              }
            }else{
              that.submitWatcher_1 ++;
            }
          }).catch(() => {
              that.submitWatcher_1 --;
          });
          });
        }
      },
      isProductOpen: function () {
        var status = this.product.status;
        if(status == "open"){
          return true;
        }else{
          return false;
        }
      },
//      保存申请单列表

      applyUpdate: function () {
          debugger
        this.params.order.term = this.params.customerLoanPurpose.term;
        if(!this.isProductOpen()){
          alert("产品已下架");
          return false;
        }
        this.buildContacts(); // 构建联系人
        this.params.customerBaseInfo.hkAddress = this.params.customerBaseInfo.hkPro + '-'+ this.params.customerBaseInfo.hkCity + '-'+ this.params.customerBaseInfo.hkArea + '-' + this.params.customerBaseInfo.hkAdd;
        this.params.customerBaseInfo.zzAddress = this.params.customerBaseInfo.zzPro + '-' + this.params.customerBaseInfo.zzCity + '-' + this.params.customerBaseInfo.zzArea + '-' + this.params.customerBaseInfo.zzAdd;
        this.params.customerWorkInfo.orgAddress = this.params.customerWorkInfo.orgPro + '-' + this.params.customerWorkInfo.orgCity + '-' + this.params.customerWorkInfo.orgArea + '-' + this.params.customerWorkInfo.orgAdd;
        if(this.params.customerLoanPurpose.loanQuota){
          this.params.order.expectAmount = this.params.customerLoanPurpose.loanQuota;
        }
        if(this.params.customerBaseInfo.zzPhone && this.params.customerBaseInfo.zzPhones){
          this.params.customerBaseInfo.homePhone = this.params.customerBaseInfo.zzPhone + '-' + this.params.customerBaseInfo.zzPhones;
        }
        if(this.params.customerWorkInfo.officeNum && this.params.customerWorkInfo.officeNums){
          this.params.customerWorkInfo.officeTel = this.params.customerWorkInfo.officeNum + '-' + this.params.customerWorkInfo.officeNums;
        }
        if(this.params.customerWorkInfo.professionType_firsts && this.params.customerWorkInfo.professionType_seconds){
          this.params.customerWorkInfo.professionType = this.params.customerWorkInfo.professionType_firsts + '-' + this.params.customerWorkInfo.professionType_seconds;
        }
        //this.params.customerContactsInfos = [];
        var jsonParams = JSON.stringify(this.params);
        var that = this;
        that.params.customerWorkInfo.hiredate = that.transfer($("#hiredate").val());
        that.$utils.ajax(that)(basePath2 + 'order?requestSource=0', jsonParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.closeWin();
            location.reload();
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin();
          }
        }, function (response) {
          that.$utils.alert("fail");
          that.closeWin();
        },"put");
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
            that.closeWin1();
            that.$router.push('/applyList/')
//            if(this.$route.params.flag == 'list1'){
//              that.$router.push('/applyList/')
//            }else if(this.$route.params.flag == 'list2'){
//              that.$router.push('/waitQualityList/')
//            }
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin1();
          }
        }, function (response) {
          that.$utils.alert(that.failedMsg);
        },"delete");
      },
//      待质检修改
      waitUpdate: function () {
        if(!this.isProductOpen()){
          alert("产品已下架");
          return false;
        }
        this.buildContacts(); // 构建联系人
        this.params.customerBaseInfo.hkAddress = this.params.customerBaseInfo.hkPro + '-'+ this.params.customerBaseInfo.hkCity + '-'+ this.params.customerBaseInfo.hkArea + '-' + this.params.customerBaseInfo.hkAdd;
        this.params.customerBaseInfo.zzAddress = this.params.customerBaseInfo.zzPro + '-' + this.params.customerBaseInfo.zzCity + '-' + this.params.customerBaseInfo.zzArea + '-' + this.params.customerBaseInfo.zzAdd;
        this.params.customerWorkInfo.orgAddress = this.params.customerWorkInfo.orgPro + '-' + this.params.customerWorkInfo.orgCity + '-' + this.params.customerWorkInfo.orgArea + '-' + this.params.customerWorkInfo.orgAdd;
        if(this.params.customerBaseInfo.zzPhone && this.params.customerBaseInfo.zzPhones){
          this.params.customerBaseInfo.homePhone = this.params.customerBaseInfo.zzPhone + '-' + this.params.customerBaseInfo.zzPhones;
        }
        if(this.params.customerWorkInfo.officeNum && this.params.customerWorkInfo.officeNums){
          this.params.customerWorkInfo.officeTel = this.params.customerWorkInfo.officeNum + '-' + this.params.customerWorkInfo.officeNums;
        }
        if(this.params.customerLoanPurpose.loanQuota){
          this.params.order.expectAmount = this.params.customerLoanPurpose.loanQuota;
        }
		if(this.params.customerWorkInfo.professionType_firsts && this.params.customerWorkInfo.professionType_seconds){
          this.params.customerWorkInfo.professionType = this.params.customerWorkInfo.professionType_firsts + '-' + this.params.customerWorkInfo.professionType_seconds;
          this.params.customerCicInfo.industryNature = this.params.customerWorkInfo.professionType_firsts;
          this.params.customerCicInfo.industryCategory =  this.params.customerWorkInfo.professionType_seconds;
        }
        this.params.order.term = this.params.customerLoanPurpose.term
        var jsonParams = JSON.stringify(this.params);
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'order?requestSource=1', jsonParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.closeWin();
            location.reload();
            if(this.$route.params.flag == 'list1'){
              that.$router.push('/applyList/')
            }else if(this.$route.params.flag == 'list2'){
              that.$router.push('/waitQualityList/')
            }

          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin();
            that.closeWin1();
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"put");
      },
      waitQualitylistSaveVeeValidate: function (formScope) {
        if(!this.isProductOpen()){
          alert("产品已下架");
          return false;
        }
        var that = this;
        that.submitWatcher_2 = 0;
        var items = that.product.requiredItem;
        if(items){
          var arr = items.split(",");
          $(arr).each(function(i,item){
            var formScope = "form-"+item;
            that.$validator.validateAll(formScope).then(result => {
              if(item == 2){
              if(that.validateAge()){
                that.submitWatcher_2 ++;
              }
            }else if(item == 8){
              if(that.extraValidate()){
                that.submitWatcher_2 ++;
              }
            }else{
              that.submitWatcher_2 ++;
            }
          }).catch(() => {
              that.submitWatcher_2 --;
          });
          });
        }
      },
//      待质检详情提交操作
      waitQualitylistSave: function (clock) {
        if(!this.isProductOpen()){
          alert("产品已下架");
          return false;
        }
        this.buildContacts(); // 构建联系人
        this.params.customerBaseInfo.hkAddress = this.params.customerBaseInfo.hkPro + '-'+ this.params.customerBaseInfo.hkCity + '-'+ this.params.customerBaseInfo.hkArea + '-' + this.params.customerBaseInfo.hkAdd;
        this.params.customerBaseInfo.zzAddress = this.params.customerBaseInfo.zzPro + '-' + this.params.customerBaseInfo.zzCity + '-' + this.params.customerBaseInfo.zzArea + '-' + this.params.customerBaseInfo.zzAdd;
        this.params.customerWorkInfo.orgAddress = this.params.customerWorkInfo.orgPro + '-' + this.params.customerWorkInfo.orgCity + '-' + this.params.customerWorkInfo.orgArea + '-' + this.params.customerWorkInfo.orgAdd;
        if(this.params.customerBaseInfo.zzPhone && this.params.customerBaseInfo.zzPhones){
          this.params.customerBaseInfo.homePhone = this.params.customerBaseInfo.zzPhone + '-' + this.params.customerBaseInfo.zzPhones;
        }
        if(this.params.customerWorkInfo.officeNum && this.params.customerWorkInfo.officeNums){
          this.params.customerWorkInfo.officeTel = this.params.customerWorkInfo.officeNum + '-' + this.params.customerWorkInfo.officeNums;
        }
		if(this.params.customerWorkInfo.professionType_firsts && this.params.customerWorkInfo.professionType_seconds){
          this.params.customerWorkInfo.professionType = this.params.customerWorkInfo.professionType_firsts + '-' + this.params.customerWorkInfo.professionType_seconds;
          this.params.customerCicInfo.industryNature = this.params.customerWorkInfo.professionType_firsts;
          this.params.customerCicInfo.industryCategory =  this.params.customerWorkInfo.professionType_seconds;
        }
        this.params.customerContactsInfos = [];
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
        },"put",clock);
      },
//      待质检详情取消操作
      waitCheckOrderCancel: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/waitCheckOrderCancel?id='+vm.params.order.id, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          console.log(response.body)
          if (response.body.code == '200') {
            that.$utils.alert('取消成功')
            that.closeWin2();
            that.$router.push('/waitQualityList/')
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message)
            that.closeWin2();
          }
        }, function (response) {
          that.$utils.alert("fail");
          that.closeWin2();
        },"put");
      },
//      待签约详情复议操作
      waitSignedOrderReconsider: function () {z``
        this.params.customerBaseInfo.hkAddress = this.params.customerBaseInfo.hkPro + '-'+ this.params.customerBaseInfo.hkCity + '-'+ this.params.customerBaseInfo.hkArea + '-' + this.params.customerBaseInfo.hkAdd;
        this.params.customerBaseInfo.zzAddress = this.params.customerBaseInfo.zzPro + '-' + this.params.customerBaseInfo.zzCity + '-' + this.params.customerBaseInfo.zzArea + '-' + this.params.customerBaseInfo.zzAdd;
        this.params.customerWorkInfo.orgAddress = this.params.customerWorkInfo.orgPro + '-' + this.params.customerWorkInfo.orgCity + '-' + this.params.customerWorkInfo.orgArea + '-' + this.params.customerWorkInfo.orgAdd;
        if(this.params.customerBaseInfo.zzPhone && this.params.customerBaseInfo.zzPhones){
          this.params.customerBaseInfo.homePhone = this.params.customerBaseInfo.zzPhone + '-' + this.params.customerBaseInfo.zzPhones;
        }
        if(this.params.customerWorkInfo.officeNum && this.params.customerWorkInfo.officeNums){
          this.params.customerWorkInfo.officeTel = this.params.customerWorkInfo.officeNum + '-' + this.params.customerWorkInfo.officeNums;
        }
		if(this.params.customerWorkInfo.professionType_firsts && this.params.customerWorkInfo.professionType_seconds){
          this.params.customerWorkInfo.professionType = this.params.customerWorkInfo.professionType_firsts + '-' + this.params.customerWorkInfo.professionType_seconds;
          this.params.customerCicInfo.industryNature = this.params.customerWorkInfo.professionType_firsts;
          this.params.customerCicInfo.industryCategory =  this.params.customerWorkInfo.professionType_seconds;
        }
        this.params.customerContactsInfos = [];
        var jsonParams = JSON.stringify(this.params);
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/waitSignedOrderReconsider', jsonParams, function (response) {
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
        },"put");
      },
//      重置
      reset: function () {
        $('input').val("");
        $('select').val("");
      },
      //检验金额
      valIdAmount : function(value){
        if(value != null && value != ""){
          var idNum1 = value ;
          var reg = new RegExp("^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$");
          if(!idNum1.match(reg)){
            this.$utils.alert("金额aaa输入错误");
            return false;
          }
        }
        return true;
      },
      timeReset: function () {

      },
      timeStart: function () {
        this.hour = isNull(this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_hour)) ? 0 : this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_hour);
        this.minute = isNull(this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_minute)) ? 0 : this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_minute);
        this.second = isNull(this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_second)) ? 0 : this.$utils.getLocalData(this.order_recordOrderConsumeTime_orderNum_second);
        this.int = setInterval(this.timeTimer,50);
      },
      timeTimer: function () {
        this.millisecond = this.millisecond+50;
        if(this.millisecond>=1000)
        {
          this.millisecond = 0;
          this.second = this.second+1;
        }
        if(this.second>=60)
        {
          this.second = 0;
          this.minute = this.minute+1;
        }
        if(this.minute>=60)
        {
          this.minute = 0;
          this.hour = this.hour + 1;
        }
        this.params.order.recordOrderConsumeTime = this.hour+'时'+this.minute+'分'+this.second+'秒';
        this.$utils.saveLocalData(this.order_recordOrderConsumeTime_orderNum_hour, this.hour);
        this.$utils.saveLocalData(this.order_recordOrderConsumeTime_orderNum_minute, this.minute);
        this.$utils.saveLocalData(this.order_recordOrderConsumeTime_orderNum_second, this.second);
      },
      timeStop: function () {
        window.clearInterval(this.int);
      },
//      确定保存pop
      openWin: function () {
        $('#win').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      openWin11: function () {
        $('#win11').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
//      确定删除申请单信息pop
      openWin1: function () {
        $('#win1').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
//      确定要取消该申请单pop
      openWin2: function () {
        $('#win2').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
//      确定要取消签约
      openWin3: function () {
        $('#win2').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin: function () {
        $('#win').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      closeWin11: function () {
        $('#win11').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      closeWin1: function () {
        $('#win1').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      closeWin2: function () {
        $('#win2').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      closeWin3: function () {
        $('#win3').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
//        图片列表swiper
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
          slidesOffsetBefore: 50,
          slidesOffsetAfter: 10,
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
      },
      initDate : function (dname) {
        var that = this;
        $('#'+dname).Monthpicker({
          monthLabels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          onSelect: function () {
            if(dname == 'monthPicker1'){
              that.params.customerInsuranceInfo.lastPayMonth = $("#monthPicker1").val();
            }
          }
        });
      },
      initDates : function (dname) {
        var that = this;
        $('#'+dname).Monthpicker({
          monthLabels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          onSelect: function () {
            if(dname == 'monthPicker2'){
              that.params.customerBaseInfo.startResidenceTime = $("#monthPicker2").val();
            }
          }
        });
      }
    },
    beforeDestory: function () {
      console.log("logout!!!")
    },
    mounted: function () {
      vm = this;
      this.timeStart();
      this.initOrdernum();
      this.swiper();
      this.initProducts();
      this.initTeamManagers();
      this.initTeamManagerEmpnos();
      var that = this;
//      第一次购房还款日
      $('#repaymentDate').datetimepicker({
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
        that.params.customerHouseInfo.repaymentDate = $("#repaymentDate").val();
      });
//      公司注册时间
      $('#registerTime').datetimepicker({
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
        that.params.customerBusinessman.registerTime = $("#registerTime").val();
      });
//      入职时间
      $('#hiredate').datetimepicker({
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
        that.params.customerWorkInfo.hiredate = that.transfer($("#hiredate").val());
      });
//      参加工作时间
      $('#startWorkTime').datetimepicker({
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
        that.params.customerBaseInfo.startWorkTime = that.transfer($("#startWorkTime").val());
      });
//      证件号有效日期
      $('#validityTerm_base').datetimepicker({
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
          //没有购买保险
          that.params.customerBaseInfo.validityTerm = $("#validityTerm_base").val();
      });
      this.initDate('monthPicker1');
      this.initDates('monthPicker2');
//      this.initContacts();
      this.initCustomerScanningCopys();
      this.initProvinceOptions();
	  this.initProfessionTypes();
	  this.customerCicInfoFun();
    },
    created : function () {
      this.initProduct();
    }
  }
</script>
<style scoped>
  @import '/static/css/monthpicker.css';

  input, textarea{
    border-radius: 5px !important;
    text-align: left !important;
  }
  .styleA{
    width: 100% !important;
  }
  .marginTop{
    margin-top: 100px;
  }
  span.important {
    color: red;
    padding-right: 3px;
  }
  span.unit{
    margin-top: 7px;
    display: inline-block;
    margin-left: -10px;
  }
  .telInput{
    width: 30%;
    display: inline-block;
  }
  .telInputs{
    width: 61%;
    display:inline-block;
  }
  .selectWidth{
    width: 15%;
    display: inline-block;
  }
  .addressWidth{
    width: 24%;
    display: inline-block;
  }
  .numberWidth{
    width: 10%;
    display: inline-block;
  }
  .col-sm-5{
    padding-right: 10px !important;
    padding-left: 10px !important;
  }
  .col-sm-2{
    margin-left: 3%;
  }
  .pop{
    background: #0f0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -80px;
  }
  .debugCss{
    color: blue;
  }
  .star{
    color: blue;
    padding: 5px;
    font-size:20px;
  }
  .myBtn{
    width: 30px;
    height:30px;
    font-size:16px;
  }
  .a_delete{
    padding-top: 7px;
    font-size:14px;
  }
  .myspan{
    margin-right:15px;
  }
  .ssl{
    /*margin:5px;*/
    background-color: #F5F5F6;
  }
  /*.ssl:visited {*/
  /*background-color: #18a689;*/
  /*color:#fff;*/
  /*}*/
  .ssl:hover{
    background-color: #eee;
    color: #FFFFFF;
  }
  .ssl:active{
    background-color: #18a689;
    color:#FFFFFF;
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
  .setBtnout{
    text-align: center;
    position: fixed;
    z-index: 9999;
    top: 20px;
    left: 82%;
  }
  .setTimeout button{
    border: none;
    color: red;
    font-size: 18px;
    background: transparent;
  }
  .setTimeout{
    text-align: center;
    position: fixed;
    z-index: 9999;
    top: 20px;
    left: 89%;
  }
  .setTimeout input{
    border: none;
    color: red;
    font-size: 18px;
    background: transparent;
  }
  .yzmImg{
    height:32px; width: 100px; cursor:pointer;
  }
  /*.swiper-li{*/
  /*display: inline-block;*/
  /*text-decoration: none;*/
  /*margin: 0;*/
  /*padding: 0 10px;*/
  /*height: 30px;*/
  /*line-height: 30px;*/
  /*text-align: center;*/
  /*white-space: nowrap;*/
  /*border-width: 1px;*/
  /*border-style: solid;*/
  /*-moz-border-radius: 5px 5px 0 0;*/
  /*-webkit-border-radius: 5px 5px 0 0;*/
  /*border-radius: 5px 5px 0 0;*/
  /*}*/
</style>

