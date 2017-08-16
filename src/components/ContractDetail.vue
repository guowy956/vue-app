<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5>订单基本信息</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">订单编号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{baseInfo.orderNum == null ? "--":baseInfo.orderNum}}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">订单状态:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{statusObj[baseInfo.status] == null ? "--":statusObj[baseInfo.status]}}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">申请人:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{baseInfo.proposer == null ? "--":baseInfo.proposer}}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">客户经理:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{baseInfo.salesman == null ? "--":baseInfo.salesman}}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">当前签约账号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{confirmSigningInfo.bankCardNumber == null ? "--":confirmSigningInfo.bankCardNumber}}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">当前开户银行:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{confirmSigningInfo.bankBranchName == null ? "--":confirmSigningInfo.bankBranchName}}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>签约信息合同反馈</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <table class="table table-bordered" style="text-align: center !important;">
                  <thead>
                  <tr>
                    <th rowspan="2">序号</th>
                    <th rowspan="2">反馈结果</th>
                    <th rowspan="2">反馈时间</th>
                    <th rowspan="2">反馈内容</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,index) in signInfo">
                    <td>{{ getNum(index) }}</td>
                    <!--<td>{{ item.status }}</td>-->
                    <td>{{statusObj[item.status] == null ? "--":statusObj[item.status]}}</td>
                    <td>{{ item.operatingTime }}</td>
                    <td>{{ item.reason }}</td>
                  </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div class="ibox-title">
              <h5>签约信息列表</h5>
            </div>
            <form class="form-horizontal" method="get">
              <div class="ibox-content" id="tableDiv">
                <table class="table table-bordered" style="text-align: center !important;" id="table_">
                  <thead>
                  <tr>
                    <th rowspan="2">序号</th>
                    <th rowspan="2">协议名称</th>
                    <th rowspan="2">查看文件</th>
                    <th rowspan="2">处理结果</th>
                    <th rowspan="2">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>信用咨询与管理服务协议</td>
                    <!--<td><span class="important"><a target="_blank" v-on:click="openIOUPdf(1)" rel="prettyPhoto[]"> 查看</a></span></td>-->
                    <td><span class="important" v-for="item in signAttachment.attach1"><a target="_blank" :href="item.href" > 查看</a></span></td>

                    <td>无需上传</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>委托划扣授权书</td>
                    <!--<td><span class="important"><a target="_blank" v-on:click="openIOUPdf(2)" rel="prettyPhoto[]"> 查看</a></span></td>-->
                    <td><span class="important" v-for="item in signAttachment.attach2"><a target="_blank" :href="item.href"> 查看</a></span></td>
                    <td>无需上传</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>网络借贷合同</td>
                    <!--<td><span class="important"><a target="_blank" v-on:click="openIOUPdf(3)" rel="prettyPhoto[]"> 查看</a></span></td>-->
                    <!--<td><span class="important" v-for="item in signAttachment.attach3"><a target="_blank" :href="item.href"> 查看</a></span></td>-->
                    <td><span class="important" v-if="signAttachment.attach3.length > 0"><a @click="openWinForNetwork()"> 查看</a></span></td>
                    <td>无需上传</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>借款借据</td>
                    <td>
                      <span class="important" v-if="baseInfo.status != 700" v-for="item in signAttachment.attach4">
                        <a :href="item.href" download="">下载</a>
                      </span>
                     <span class="important">
                       <a v-if="baseInfo.status != 700" target="_blank" v-on:click="openIOU(2)" rel="prettyPhoto[]">
                         查看
                       </a>
                       <a v-if="baseInfo.status == 700" target="_blank" rel="prettyPhoto[]" style="color: grey;">
                         查看
                       </a>
                       <span v-if="isShow_IOU && (baseInfo.status <= 730 || baseInfo.status == 760)">
                         <a><span class="important">/</span></a><a @click="delUp(9)"><span class="important">删除</span></a>
                       </span>
                     </span>
                    </td>
                    <td>
                      <div v-if="isYesIOU">已上传</div>
                      <div v-if="isNoIOU">未上传</div>
                    </td>
                    <td>
                      <div>
                        <fileuploadIOU @mymethod="initTable" v-if="baseInfo.status == 730 || baseInfo.status == 760"></fileuploadIOU>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>还款事项提醒函</td>
                    <td>
                      <span class="important">
                        <!--<a v-if="baseInfo.status != 700" target="_blank" v-on:click="openIOUPdf(4)" rel="prettyPhoto[]"> 查看</a>-->
                        <a v-if="baseInfo.status != 700" target="_blank" v-for="item in signAttachment.attach5" :href="item.href"> 查看</a>
                        <a v-if="baseInfo.status == 700" target="_blank" rel="prettyPhoto[]" style="color: grey;"> 查看</a>
                      </span>
                    </td>
                    <td>无需上传</td>
                    <td></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="ibox-title">
                <h5>补充文件材料</h5>
              </div>
              <div class="ibox-content">
                <table class="table table-bordered" style="text-align: center !important;">
                  <thead>
                  <tr>
                    <th rowspan="2">序号</th>
                    <th rowspan="2">协议名称</th>
                    <th rowspan="2">文件上传状态</th>
                    <th rowspan="2">处理结果</th>
                    <th rowspan="2">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr >
                    <td>1</td>
                    <td>签约信息核实表</td>
                    <td>
                     <span class="important" v-if="isYesCIV">
                       <a target="_blank" v-on:click="openCIV()" rel="prettyPhoto[]">
                         查看
                       </a>
                       <span v-if="(baseInfo.status == 730 || baseInfo.status == 760) && isShow_CIV">
                         <a><span class="important">/</span></a>
                         <a @click="delUp(0)"><span class="important">删除</span></a>
                       </span>
                       </span>
                      <span v-if="isNoCIV">未上传</span>
                    </td>
                    <td>
                      <div>无需签署</div>
                    </td>
                    <td><fileuploadCIV @mymethod="initTable" v-if="baseInfo.status == 730 || baseInfo.status == 760"></fileuploadCIV></td>
                  </tr>
                  <tr >
                    <td>2</td>
                    <td>其他合同信息</td>
                    <td>
                     <span class="important"　v-if="isYesOCI">
                       <a target="_blank" v-on:click="openOCI()" rel="prettyPhoto[]">
                         查看
                       </a>
                       <span v-if="(baseInfo.status == 730 || baseInfo.status == 760) && isShow_OCI">
                         <a><span class="important">/</span></a>
                         <a @click="delUp(1)"><span class="important">删除</span></a>
                       </span>
                       </span>
                      <span v-if="isNoOCI">未上传</span>
                    </td>
                    <td>
                      <div>无需签署</div>
                    </td>
                    <td><fileuploadOCI @mymethod="initTable" v-if="baseInfo.status == 730 || baseInfo.status == 760"></fileuploadOCI></td>
                  </tr>
                  <tr >
                    <td>3</td>
                    <td>签约面审照片（2-10张）</td>
                    <td>
                     <span class="important"　v-if="isYesSP">
                       <a target="_blank" v-on:click="openSP()" rel="prettyPhoto[]">
                         查看
                       </a>
                       <span v-if="(baseInfo.status == 730 || baseInfo.status == 760) && isShow_SP">
                         <a><span class="important">/</span></a>
                         <a @click="delUp(2)"><span class="important">删除</span></a>
                       </span>
                       </span>
                      <span v-if="isNoSP">未上传</span>
                    </td>
                    <td>
                      <div >无需签署</div>
                    </td>
                    <td><fileuploadSP @mymethod="initTable" v-if="baseInfo.status == 730 || baseInfo.status == 760"></fileuploadSP></td>
                  </tr>
                  </tbody>
                </table>
                <div class="ibox-content">
                  <div class="form-group" style="text-align: center" >
                    <button v-show="baseInfo.status == '730'|| baseInfo.status == '760' && isShow_CIV && isShow_OCI && isShow_SP" v-if="isNoBuyInsurance" class="btn btn-primary" type="button" @click="contractInfoSubmit()">提交</button>
					<button class="btn btn-warning" type="button" @click="openWin2()"v-show="baseInfo.status == '730'">取消签约</button>
                    <button class="btn btn-danger" type="button" @click="openWin4()"v-show="baseInfo.status == '730'">门店拒绝</button>
                    <button v-show="baseInfo.status == 760" class="btn btn-danger" type="button" @click="refuse()">拒绝</button>
                    <button type="button" @click="goback()" class="btn btn-primary">返回</button>
                    <button class="btn btn-primary" type="button" @click="Insurance()" v-show="baseInfo.status == '730'|| baseInfo.status == '760' && isShow_CIV && isShow_OCI && isShow_SP" v-if="isBuyInsurance">提交</button>
                  </div>
                  <div style="text-align: center" v-show="baseInfo.status == '730'">
                    <p style="color: #23527c">   取消签约:随时可以重新进件</p>
                    <p style="color: #23527c">门店拒绝:30内不可以重复进件</p>
                  </div>
                </div>
              </div>
            </form>
            <div v-if="repayDateType !=1 && (baseInfo.status >= 770 && $route.params.flags == 1)">
              <!--<div>-->
              <!--变更还款日审核反馈-->
              <div class="ibox-title">
                <h5>变更还款日</h5>
              </div>
              <div class="ibox-content">
                <!--<form class="form-horizontal" method="get">-->
                <table class="table table-bordered" style="table-layout:fixed;">
                    <thead>
                    <tr>
                      <th style="width: 5%">序号</th>
                      <th>还款日</th>
                      <th>首次还款日</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>1</td>
                      <td>{{ dataParams.repaymentDay }}</td>
                      <td>{{ confirmSigningInfo.repaymentStartDate }}</td>
                      <td><button class="btn btn-primary btn-sm" @click="openWin()"><i class="fa fa-paste"></i>修改</button></td>
                    </tr>
                    </tbody>
                  </table>
                <!--</form>-->
              </div>
              <!--变更还款日审核反馈-->
              <div class="ibox-title">
                <h5>变更还款日审核反馈</h5>
              </div>
              <div class="ibox-content">
                <form class="form-horizontal" method="get">
                  <table class="table table-bordered" style="table-layout:fixed;">
                    <thead>
                    <tr>
                      <th style="width: 4%">序号</th>
                      <th>反馈结果</th>
                      <th>反馈时间</th>
                      <th>反馈内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in repayment">
                      <td>{{ getNum(index) }}</td>
                      <td>{{statusUtils[item.status]}}</td>
                      <td v-if="item.status==1">--</td>
                      <td v-if="item.status!=1">{{transfers(item.auditTime)}}</td>
                      <td v-if="item.status==1">--</td>
                      <td v-if="item.status!=1">{{ item.reason }}</td>
                    </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
            <div v-if="(baseInfo.status == '730' || baseInfo.status == '760' || baseInfo.status == '800' ||baseInfo.status == '820') && $route.params.flags == 1" >
              <!--<div>-->
              <!--变更银行卡-->
              <div class="ibox-title">
                <h5>变更银行卡</h5>
              </div>
              <div class="ibox-content">
                <form class="form-horizontal" method="get">
                  <!--变更银行卡-->
                  <form class="form-horizontal" method="get">
                    <table class="table table-bordered" style="table-layout:fixed;">
                      <thead>
                      <tr>
                        <th style="width: 4%">序号</th>
                        <th>协议名称</th>
                        <th>文件上传状态</th>
                        <th>处理结果</th>
                        <th>操作</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-if="baseInfo.accountType == '2'">
                        <td>1</td>
                        <td>变更证明</td>
                        <td>
                          <div v-if="changesIsYes">
                            <a @click = "lookIt('变更证明')">查看</a>/
                            <a @click = "removeIt('变更证明')">删除</a>
                          </div>
                        </td>
                        <td>
                          <div v-if="changesIsNo">未上传</div>
                          <div v-if="changesIsYes">已上传</div>
                        </td>
                        <!--<td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload"@myMethod="callback_maritalStatus(1)" @myMethods="imgUrlComputed"></fileuploadSingle></td>-->
                        <td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload" @myMethod="callback_1(1)"></fileuploadSingle></td>
                      </tr>
                      <tr v-if="baseInfo.accountType == '1'">
                        <td>1</td>
                        <td>变更银行卡协议</td>
                        <td>
                          <div v-if="bandIsYes">
                            <a @click = "lookIt('变更银行卡协议')">查看</a>/
                            <a @click = "removeIt('变更银行卡协议')">删除</a>
                          </div>
                        </td>
                        <td>
                          <div v-if="bandIsNo">未上传</div>
                          <div v-if="bandIsYes">已上传</div>
                        </td>
                        <!--<td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload" @myMethod="callback_maritalStatus(2)"></fileuploadSingle></td>-->
                        <td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload" @myMethod="callback_1(2)"></fileuploadSingle></td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>银行卡复印件</td>
                        <td>
                          <div v-if="bandPaperIsYes">
                            <a @click = "lookIt('银行卡复印件')">查看</a>/
                            <a @click = "removeIt('银行卡复印件')">删除</a>
                          </div>
                        </td>
                        <td>
                          <div v-if="bandPaperIsNo">未上传</div>
                          <div v-if="bandPaperIsYes">已上传</div>
                        </td>
                        <!--<td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload" @myMethod="callback_maritalStatus(3)"></fileuploadSingle></td>-->
                        <td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload" @myMethod="callback_1(3)"></fileuploadSingle></td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>身份证件</td>
                        <td>
                          <div v-if="idCardIsYes">
                            <a @click = "lookIt('身份证件')">查看</a>/
                            <a @click = "removeIt('身份证件')">删除</a>
                          </div>
                        </td>
                        <td>
                          <div v-if="idCardIsNo">未上传</div>
                          <div v-if="idCardIsYes">已上传</div>
                        </td>
                        <!--<td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload" @myMethod="callback_maritalStatus()"></fileuploadSingle></td>-->
                        <td><fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload" @myMethod="callback_1(4)"></fileuploadSingle></td>
                      </tr>
                      </tbody>
                    </table>
                  </form>
                </form>
              </div>
              <!--账户资料-->
              <div class="ibox-title">
                <h5>账户资料</h5>
              </div>
              <div class="ibox-content">
                <form class="form-horizontal" method="get">
                  <div class="form-group">
                    <div class="col-sm-6">
                      <label class="col-sm-5 control-label">银行卡户名（与XX一致）:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="saveParams.loanName" disabled="disabled">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <label class="col-sm-5 control-label">身份证号码:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="baseInfo.idNum" disabled="disabled">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-6">
                      <label class="col-sm-5 control-label">银行卡账号:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="saveParams.bankCardNumberNew">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <label class="col-sm-5 control-label">开户行名称（精确到分行）:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="saveParams.bankBranchNameNew">
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-6">
                      <label class="col-sm-5 control-label">银行:</label>
                      <div class="col-sm-6">
                        <select2 :options="options.bankBameCodeNew" v-model="saveParams.bankBameCodeNew" :select2Style="select2Style"  @myMethod="bankName"></select2>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <label class="col-sm-5 control-label">手机号:</label>
                      <div class="col-sm-6">
                        <input type="text" class="form-control" v-model="saveParams.phoneNew">
                      </div>
                    </div>
                  </div>
                  <div class="form-group" style="text-align: center">
                    <button class="btn btn-primary" type="button" @click="bankChange()">提交</button>
                  </div>
                </form>
              </div>
              <!--变更账户审核反馈-->
              <div class="ibox-title">
                <h5>变更账户审核反馈</h5>
              </div>
              <div class="ibox-content">
                <form class="form-horizontal" method="get">
                  <table class="table table-bordered" style="table-layout:fixed;">
                    <thead>
                    <tr>
                      <th style="width: 4%">序号</th>
                      <th>反馈结果</th>
                      <th>反馈时间</th>
                      <th>反馈内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in items">
                      <td>{{ getNum(index) }}</td>
                      <!--<td>{{ item.status }}</td>-->
                      <td>{{statusUtil[item.status]}}</td>
                      <!--<td>{{ item.auditTime}}</td>-->
                      <td v-if="item.status!=0">{{transfers(item.auditTime)}}</td>
                      <td v-if="item.status==0">--</td>
                      <td v-if="item.status!=0">{{ item.remark }} {{item.failReason}}</td>
                      <td v-if="item.status==0">--</td>
                    </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" style="display: none"></div>
    <div class="modal inmodal in" tabindex="-1" id="win">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" style="font-size: 18px">还款日</h4>
            <input type="text" class="form-control" id="datetimepicker" v-model="dataParams.repaymentDay">
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="dataChange()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win2">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" style="margin-left: 18px">确定要取消签约？</h3>
            <h4 class="modal-title" style="font-size: 16px;">请输入取消原因</h4>
            <textarea class="form-control" rows="3" cols="20" v-model="params.order.reason"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="businessCancelSign()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin2()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win4">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" style="margin-left: 18px">确定要拒绝？</h3>
            <h4 class="modal-title" style="font-size: 16px;">请输入拒绝原因</h4>
            <textarea class="form-control" rows="3" cols="20" v-model="params.order.reason"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="refuse()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin4()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1" id="win1" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWinForNetwork()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">网络借贷合同</h4>
          </div>

          <form class="form-horizontal m-t">
            <div class="modal-body">
              <div class="form-group" v-for="items in signAttachment.attach3">
                <div class="col-sm-3" v-for="item in items">
                  <span class="important">
                    <a target="_blank" :href="item.href">{{item.name}}</a>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!--保险-->
    <!--公司简介-->
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1"  :class="[showParamInsurance.modalShow ? showParamInsurance.devStyle : showParamInsurance.winShow]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin_i(0)"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div><img src="../../static/img/baoxian.png" height="100%" width="100%"/></div>
          <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 50px;padding-right: 50px;padding-bottom: 5px;padding-top: 15px;">
            <div>
              <p>中华人寿，全称中华联合人寿保险股份有限公司，是经中国保监会批准（保监许可［2015］1128号），由中华联合保险控股股份有限公司和中华联合财产保险股份有限公司发起设立的人寿保公司，注册资本金为15亿人民币，注册地为北京市。公司业务范围包括: 普通型保险，包括人寿保险和年金保险；健康保险；意外伤害保险；分红保险；万能保险；上述业务的再保险业务；国家法律、法规允许的保险资金运用业务；经中国保监会批准的其他业务。</p>
              <p>公司以创新模式为主，竭力为有保险需求的个人和家庭提供简单、便捷、贴心的保险保障和财富管理服务，努力通过创新和差异化经营，积极探索一条特色的寿险公司发展之路。</p>
              <p><h4>三、产品信息介绍</h4></p>
              <p>中华借款人意外伤害保险                                                  销售区域:全国</p>
              <p>中华人寿[2015]意外伤害保险018号</p>
              <p>【险种名称】 《中华借款人意外伤害保险》</p>
              <p>【投保金额】  同合同金额，最低投保金额1万元，最高保额为20万元。</p>
              <p>【保险期间】  同贷款期间</p>
              <p>【交费方式】  一次交清</p>
              <p>【职业类别】  1-6类</p>
              <p>中华联合人寿保险股份有限公司（以下简称“中华联合人寿”）《中华借款人意外伤害保险》可承保的职业类别为1-6类，7类拒保职业不承保。当投保时借款人职业为5类或6类的，或投保时借款人职业属于1-4类但在承保期间职业变更为5类或6类的，中华联合人寿仅承担5类和6类职业在非工作作业期间发生的保险事故的保险责任，工作作业期间发生保险事故的，中华联合人寿不承担保险责任。职业类别参照《中华联合人寿职业类别分类表》。</p>
              <p>【投保年龄】  18-60周岁</p>
              <p>【保险责任】  意外伤残保险责任、意外身故保险责任</p>
              <p>【责任免除】  因下列情形之一导致被保险人身故或残疾的，我们不承担给付保险金的责任：</p>
              <p>1.被保险人故意自伤、故意犯罪、抗拒依法采取的刑事强制措施或自杀，但被保险人自杀时为无民事行为能力人的除外；</p>
              <p>2.被保险人酒后驾驶，无合法有效驾驶证驾驶，或驾驶无有效行驶证的机动车，主动吸食或注射毒品；</p>
              <p>3.被保险人猝死；</p>
              <p>4.被保险人从事潜水、跳伞、攀岩、蹦极、驾驶滑翔机或滑翔伞、探险、摔跤、武术比赛、特技表演、赛马、赛车等高风险运动；</p>
              <p>5.战争、军事冲突、暴乱、武装叛乱或恐怖袭击；</p>
              <p>6.核爆炸、核辐射或核污染；</p>
              <p>7.被保险人为以下职业类别并且在从事其职业工作的过程中身故或残疾，我们不承担给付保险金的责任：刑事或治安警察，武装警察；军事设施、装备、武器、弹药的研究、试验、管理、维护、操作人员；矿物勘探及开采人员，采石工人；火药或爆竹制造及处理人员（包括爆竹、烟火制造工及所有现场办公人员），硫酸、盐酸、硝酸制造工，有毒物品，液化气体制造工人，海港、桥梁、水利、挖井、隧道、地铁工程及水下、地下操作工作人员，脚手架工人，离地面两米或以上高空作业人员，森林砍伐作业人员，所有海上作业人员，武打、特技及杂技演员，职业运动员，赛场竞技人员，机械加工业搬运工人，建筑工人，拆迁房屋工人，驯兽人员，动物饲养人员；电讯及电力设施、工程（包括电缆、变压器、电台天线的建造、架设、安装、维修）施工人员。</p>
              <p>发生上述情形导致被保险人身故的，本合同终止，我们向您退还本合同的未到期净保费。</p>
              <p>除条款“2.4 责任免除”外，本合同中还有一些免除本公司责任的条款，详见3.2、6.1、7.1和7.2中灰色底纹背景字体的内容。其它未尽事宜详见《中华借款人意外伤害保险条款》</p>
              <p>【受益人】  被保险人有权指定本合同身故保险金或意外伤残保险金第一受益人为向被保险人发放贷款的金融机构或保险事故发生时对被保险人享有合法债权的债权人，其受益份额为保险金申请当时被保险人依贷款合同约定仍未偿还的贷款本金和利息（指贷款合同约定的贷款利息，不含滞纳金和服务费等其他费用）之和，但以本合同约定的应给付保险金为限。如本公司向第一受益人给付保险金后仍有余额，则该余额由第二受益人享有。</p>
              <p>投保人或者被保险人可以指定一人或多人为身故保险金第二受益人，身故保险金第二受益人为多人时，可以确定受益人受益份额，若没有确定份额，第二受益人按照相等份额享有受益权。</p>
              <p>除本合同另有约定外，意外伤残保险金第二受益人为被保险人本人。</p>

            </div>

          </div>
          <div class="modal-footer" style="padding: 3px 15px;">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin_i(0)">关闭</button>
            <button  type="button" class="btn btn-primary" @click="openDiv(1)">下一步</button>
          </div>
        </div>
      </div>
    </div>
    <!--中华借款人意外伤害保险介绍-->
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1"  :class="[showParamInsurance.modalShow1 ? showParamInsurance.devStyle1 : showParamInsurance.winShow1]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin_i(1)"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div><img src="../../static/img/baoxian.png" height="100%" width="100%"/></div>
          <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 50px;padding-right: 50px;padding-bottom: 5px;padding-top: 15px;">
            <div>
              <p><h4>意外身故保险金：</h4></p>
              <p>若被保险人遭受意外伤害，并自该意外伤害发生之日起180日内因该意外伤害身故的，我们按照本合同约定的意外伤害基本保险金额给付意外身故保险金。若被保险人身故前本合同已发生意外伤残保险金给付的，则给付意外身故保险金时应扣除已给付的意外伤残保险金，本合同终止。</p>
              <p><h4>意外伤残保险金：</h4></p>
              <p>若被保险人遭受意外伤害，并自该意外伤害发生之日起180日内因该意外伤害造成《人身保险伤残评定标准及代码》所列伤残类别，我们按照本合同约定的意外伤害基本保险金额乘以该处伤残的伤残等级所对应的保险金给付比例给付意外伤残保险金。</p>
              <p>意外身故保险金与意外伤残保险金累计给付以每一被保险人的保险金额为限。</p>
              <p><span>保险条款</span>  <span class="baoxians">保险条款:</span></p>
              <p><span><a href="static\\pdf\\中华借款人意外伤害保险条款.pdf" target="_blank">中华借款人意外伤害保险条款</a></span><span class="baoxians3"><a href="static\\pdf\\中华借款人意外伤害保险投保须知.pdf" target="_blank">中华借款人意外伤害保险投保须知</a></span></p>
            </div>

          </div>
          <div class="modal-footer" style="padding: 3px 15px;">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin_i(1)">关闭</button>
            <button  type="button" class="btn btn-primary"  @click="open_up(0)">上一步</button>
            <button  type="button" class="btn btn-primary"  @click="openDiv(2)">下一步</button>
          </div>
        </div>
      </div>
    </div>
    <!--投保人及被保险人声明与授权-->
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1"  :class="[showParamInsurance.modalShow2 ? showParamInsurance.devStyle2 : showParamInsurance.winShow2]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin_i(2)"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div><img src="../../static/img/baoxian.png" height="100%" width="100%"/></div>
          <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 50px;padding-right: 50px;padding-bottom: 5px;padding-top: 15px;">
            <div>
              <p><h4>投保人及被保险人声明与授权内容如下：</h4></p>
              <p>1.本人兹申明以上述各项内容均为本人填写，内容属实，并已就本次投保行为及保险金额征得被保险人同意。</p>
              <p>2.本人已阅读《中华借款人意外伤害保险条款》，并特别就条款中有关保险责任、责任免除、犹豫期、退保可能会产生的损失等关键信息和投保人、被保险人义务的内容进行仔细阅读。本人同意投保，接受条款全部内容。</p>
              <p>3.本人确认投保时被保险人无以下情况：</p>
              <p>（1）本人未曾患有下列疾病之一：癫痫、脑梗塞、脑出血、脑血管瘤、阿尔茨海默氏症、重度帕金森氏病、抑郁症、精神病、恶性肿瘤、心肌梗塞、心力衰竭、严重心律失常、先天性心脏病、室壁瘤、动脉瘤、心脏瓣膜病、呼吸衰竭、肝硬化、肝肾功能衰竭、视力低于0.1、艾滋病或艾滋病病毒携带、器官移植术后。</p>
              <p>（2）本人未曾有智力障碍、失明、聋哑及躯干四肢功能障碍，如存在头面部、五官、躯干、四肢、脏器、皮肤的结构性缺损、缺失及语言、咀嚼、嗅觉、吞咽等功能障碍，本人声明已知晓对于原有残疾在本合同的有效期内贵保险公司不予保险金的给付责任。</p>
              <p>（3）本人不使用成瘾性药物或吸食毒品。</p>
              <p>（4）本人目前不从事以下职业，如：高空作业、海上作业、水下作业、隧道坑道或井下作业、火药爆竹制造及加工工人、高压电工程作业人员、特技演员、驯兽师、爆破人员、战地记者、特种兵（伞兵、化学兵、负有布雷爆破任务工兵）。</p>
              <p>（5）本人不参与任何危险的运动或赛事（如赛车、登山、攀岩、滑雪、潜水、跳伞、蹦极、水上运动、驾驶航空机具以及其它危险运动或赛事）。</p>
              <p>（6）本人在贷款期间不计划前往下列国家或地区：非洲、阿富汗、伊拉克、以色列、巴勒斯坦、朝鲜、巴基斯坦、海地、也门、俄罗斯车臣地区、印度克什米尔地区、东帝汶、其他发生战争、军事冲突、暴乱或武装叛乱的地区。</p>
              <p> 4.本人授权中华联合人寿保险股份有限公司（以下简称“贵公司”）或贵公司委托合作的合作伙伴从任何医师、医疗机构、保险公司等组织机构和个人就有关保险事宜查询、索取与本人有关的资料和证明，贵公司及贵公司委托的合作伙伴对个人资料承担保密义务。保密条款具有独立法律效力，不受合同成立与否及效力状态变化的影响。</p>
              <p>5.本人同意贵公司将有关本人的资料用于保险、再保险、保险监管机构及行业协会的数据处理及统计事宜，以及按照贵公司应当遵守的法律法规向权力机关进行披露。
              <p> 6.本人同意贵公司向本人提供的手机号码或电子邮箱发送有关保险单的信息。</p>
              <p> 7.本人授权贵公司有权将本人提供给贵公司的信息、享受贵公司服务产生的信息（包括本单证签署之前提供和产生的信息）以及贵公司及因服务必要委托的合作伙伴根据本授权查询、收集到的本人信息，用于贵公司及因服务必要委托的合作伙伴为本人提供服务（包括但不限于核保、客户回访、续期提醒等）、推荐产品、开展市场调查与信息数据分析。为确保本人信息的安全，贵公司及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。本条款具有独立法律效力，不受合同成立与否及效力状态变化的影响。</p>
              <p> 8.本人已认真阅读并理解投保须知、保险条款的全部内容，已了解本产品的特点和保单利益的不确定性，且同意将贵公司发出电子保单之日视为保单签收日。同意如发生有关网上投保险种、保险金额等方面的分歧，以贵公司的电子记录凭证等数据电文作为判断本保险合同的唯一合法有效凭证，该凭证具有完全证据效力。</p>
              <p> 9.本人已知晓贵公司经营地为北京、新疆，投保人、被保险人和受益人在北京、新疆以外地区的可能会存在服务不到位、服务时效差等问题。</p>
              <p>
                <span class="baoxianYes"><input type="radio" name="info1" value="1" id="info_1" />我同意并确认</span>
                <span class="baoxianNo"><input type="radio" name="info1" value="2" id="info_2" />我不同意</span>
              </p>
            </div>

          </div>
          <div class="modal-footer" style="padding: 3px 15px;">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin_i(2)">关闭</button>
            <button  type="button" class="btn btn-primary"  @click="open_up(1)">上一步</button>
            <button  type="button" class="btn btn-primary"  @click="openDiv(3)">下一步</button>
          </div>
        </div>
      </div>
    </div>
    <!--保险订单详情-->
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1"  :class="[showParamInsurance.modalShow3 ? showParamInsurance.devStyle3 : showParamInsurance.winShow3]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin_i(3)"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div><img src="../../static/img/baoxian.png" height="100%" width="100%"/></div>
          <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 50px;padding-right: 50px;padding-bottom: 5px;padding-top: 15px;">
            <div>
              <p>保险名称：中华借款人意外伤害保险                 保险期限：{{params.customerCicInfo.term}}月                      投保金额：{{params.customerCicInfo.insuredAmount}}元</p>
              <p>缴费频率：一次性缴清</p>
              <hr/>
              <p><h4>投保人暨被保险人信息:</h4></p>
              <p>
                <span class="">姓名:{{params.customerCicInfo.customName == null ? "--":params.customerCicInfo.customName}} </span>
                <span class="baoxian">证件类型: 身份证</span>
                <span class="baoxian"> 证件号码: {{params.customerCicInfo.idNum}}</span>
              </p>
              <p>
                <span class="">证件有效期至: {{params.customerCicInfo.validityTerm == "9999-01-01" ? "永久":params.customerCicInfo.validityTerm}}</span>
                <span class="baoxian">性别: {{params.insurance.sex}}</span>
                <span class="baoxian">职业性质: {{params.customerCicInfo.industryNature}}</span>
              </p>
              <p>职业类别： {{params.customerCicInfo.industryCategory}}</p>
              <p>
                <label class="select_label2"><input type="checkbox" name="info" value="3" id="info_order1" />
                  我同意投保中华联合人寿保险股份有限公司《中华借款人意外伤害保险》时，如本人职业为5类或6类的，或投保期间职业属于1-4类但在承保期间职业变更为5类或6类的，中华人寿保险公司仅承担5类和6类职业在非工作作业期间发生的保险事故的保险责任，工作作业期间发生保险事故的，中华联合人寿保险公司不承担保险责任，本人不从事拒保职业，职业类别参照<a href="static\\pdf\\中华联合人寿职业类别分类表.pdf" target="_blank">《中华联合人寿保险职业类别分类表》</a></label>
              </p>
              <hr/>
              <div class="form-group">
                <div class="col-sm-6">
                  <label class="col-sm-5 control-label">国籍:</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control"value="中国" disabled="disabled">
                  </div>
                </div>
                <div class="col-sm-6">
                  <label class="col-sm-5 control-label"><span v-if="starShow" class="important">*</span>电子邮箱:</label>
                  <div class="col-sm-6 input-daterange">
                    <input type="text" class="form-control" v-model="params.customerCicInfo.email" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-6">
                  <label class="col-sm-5 control-label">出生日期:</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="params.insurance.dateOfBirth"  disabled="disabled">
                  </div>
                </div>
                <div class="col-sm-6">
                  <label class="col-sm-5 control-label">手机:</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control"v-model="params.customerCicInfo.mobile" disabled="disabled">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-19">
                  <label class="col-sm-2 control-label"><span v-if="starShow" class="important">*</span>住宅地址:</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control"v-model="params.customerCicInfo.address" disabled="disabled">
                  </div>
                </div>
              </div>

              <p><h4>保险金指定受益人:</h4></p>
              <p><span>伤残保险金: </span>                  <span class="baoxians">身故保险金:</span></p>
              <p><span>第一受益人:借款协议的债权人</span>                 <span class="baoxians1">第一受益人:借款协议的债权人</span></p>
              <p><span>第二受益人:被保险本人</span>                 <span class="baoxians2">第二受益人:法定债权人</span></p>
              <p><label class="select_label2"><input type="checkbox" name="info" value="3" id="info_order2" />本人自愿投保中华联合人寿保险股份有限公司（以下简称“保险公司”）《中华借款人意外伤害保险》产品，并委托东方银谷(北京)投资管理有限公司代本人向保险公司支付保险合同约定的各期应交保险费。如本人提前将贷款本息全部还清，并申请退保，本人同意并授权保险公司将退保保费退还至东方银谷(北京)投资管理有限公司代本人交费的银行账户。因东方银谷(北京)投资管理有限公司为交费人，本人同意将发票开给交费人，不再另行申请。</label></p>
            </div>

          </div>
          <div class="modal-footer" style="padding: 3px 15px;">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin_i(3)">关闭</button>
            <button  type="button" class="btn btn-primary"  @click="open_up(2)">上一步</button>
            <button  type="button" class="btn btn-primary"  @click="openDiv(4)">下一步</button>
          </div>
        </div>
      </div>
    </div>
    <!--投保、理赔流程、保单管理服务与咨询投诉方式-->
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1"  :class="[showParamInsurance.modalShow4 ? showParamInsurance.devStyle4 : showParamInsurance.winShow4]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin_i(4)"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div><img src="../../static/img/baoxian.png" height="100%" width="100%"/></div>
          <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 50px;padding-right: 50px;padding-bottom: 5px;padding-top: 15px;">
            <div>
              <p><img src="static\\img\\liucheng.png" WIDTH="95%" height="50%"></p>
              <p><h4>支付方式：</h4></p>

              <p>保险金、保险赔款的支付方式为转账至指定的银行账号。如无特殊情况，退保金的支付方式为转账至原投保账号。</p>

              <p><h4>保单管理服务：</h4></p>

              <p>保单管理与咨询投诉方式：保险合同存续期间，您可以登录中华联合人寿官网life.cic.cn、拨打中华人寿95585客服热线，或亲临中华人寿客服柜面办理或咨询保单相关服务或进行投诉。</p>

            </div>

          </div>
          <div class="modal-footer" style="padding: 3px 15px;">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin_i(4)">关闭</button>
            <button  type="button" class="btn btn-primary"  @click="open_up(3)">上一步</button>
            <button  type="button" class="btn btn-primary"  @click="openDiv(5)">下一步</button>
          </div>
        </div>
      </div>
    </div>
    <!--售后服务及电子保单-->
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1"  :class="[showParamInsurance.modalShow5 ? showParamInsurance.devStyle5 : showParamInsurance.winShow5]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin_i(5)"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div><img src="../../static/img/baoxian.png" height="100%" width="100%"/></div>
          <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 50px;padding-right: 50px;padding-bottom: 5px;padding-top: 15px;">
            <div>
              <p>投保成功后将在银谷平台更新保单状态，并可在银谷平台查询保单信息并查看保单状态（收费成功待承保、承保、退保等状态）；电子保单在保单生成后24小时内由中华联合人寿通过邮箱发送给客户。</p>
            </div>
          </div>
          <div class="modal-footer" style="padding: 3px 15px;">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin_i(5)">关闭</button>
            <button  type="button" class="btn btn-primary"  @click="open_up(4)">上一步</button>
            <button  type="button" class="btn btn-primary"  @click="submitPolicy()">提交保单</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import select2 from './common/select2/select2.vue';
  import '../../static/js/plugins/datapicker/bootstrap-datepicker.js';
  import fileuploadIOU from './common/uploadPic/contractTheBorrowerIOU.vue';  //借款借据
  import fileuploadCIV from './common/uploadPic/contractContractInformationVerification.vue'; //签约信息核实表
  import fileuploadOCI from './common/uploadPic/otherContractInformation.vue';  //其他合同信息
  import fileuploadSP from './common/uploadPic/signedPhoto.vue';  //签约面审照片（2-10张）
  import fileuploadSingle from './common/fileuploadSingle3.vue';
  var vm;

  export default {
    name: 'ContractDetail',
    components: {
      select2,
      fileuploadIOU,
      fileuploadCIV,
      fileuploadOCI,
      fileuploadSP,
      fileuploadSingle,
    },
    data:function () {
      return {
        repayDateType: "",
        debugShow: false, // 是否为测试模式，测试模式会显示参数值
        starShow: true,
        isBuyInsurance:false,
        isNoBuyInsurance:false,
        winTitle: '公司简介',
        modalShow: true,
        showParamInsurance: {
          modalShow: true,
          devStyle: 'devStyle',
          winShow: 'winShow',
          modalShow1: true,
          devStyle1: 'devStyle',
          winShow1: 'winShow',
          modalShow2: true,
          devStyle2: 'devStyle',
          winShow2: 'winShow',
          modalShow3: true,
          devStyle3: 'devStyle',
          winShow3: 'winShow',
          modalShow4: true,
          devStyle4: 'devStyle',
          winShow4: 'winShow',
          modalShow5: true,
          devStyle5: 'devStyle',
          winShow5: 'winShow',
        },
        is1530: true,
        tmp: [],
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
        showParams: {
          modalShow: true,
          devStyle: 'devStyle',
          winShow: 'winShow'
        },
        indexIdCard: 0,
        indexBandPaper: 0,
        indexBand: 0,
        indexChanges: 0,
        md5: "",
        md5s: [],
        path: "",
        suffix: "",
        suffixs: [],
        fileName: "",
        fileNames: [],
        fileSize: "",
        changesIsNo: true,
        bandIsNo: true,
        bandPaperIsNo: true,
        idCardIsNo: true,
        changesIsYes: false,
        bandIsYes: false,
        bandPaperIsYes: false,
        idCardIsYes: false,
        imgs: [],
        startNum : 1,
        statusUtil:{"1":"已审核","0":"未审核","2":"驳回","3":"结算确认","4":"开户成功","5":"开户失败","6":"已通知"},
        statusUtils:{"1":"待审核","2":"通过","3":"驳回"},
        Bstatus:{"1":"三方账户","0":"银行"},
        items : [],
        repayment: [],
        dataParams: {
          repaymentDay:"",
          orderNum: this.$route.params.orderNum,
          orderStatus: "0",
        },
        searchParams: {
          orderNum: this.$route.params.orderNum,
          start:"0"
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
        area: {
          provinceOptions: [],
          cityOptions_1: [],
          cityOptions_2: [],
          cityOptions_3: [],
          areaOptions_1: [],
          areaOptions_2: [],
          areaOptions_3: []
        },
        options:{
          nationality: [
            { id: '', text: '中国' },
          ],
           bankBameCodeNew: [
            { id: 'ABC', text: '农业银行' },
            { id: 'BEA', text: '东亚银行' },
            { id: 'BOB', text: '北京银行' },
            { id: 'BOC', text: '中国银行' },
            { id: 'BOS', text: '上海银行' },
            { id: 'CBHB', text: '渤海银行' },
            { id: 'CCB', text: '建设银行' },
            { id: 'CEB', text: '光大银行' },
            { id: 'CIB', text: '兴业银行' },
            { id: 'CITIBANK', text: '花旗银行' },
            { id: 'CITIC', text: '中信银行' },
            { id: 'CMB', text: '招商银行' },
            { id: 'CMBC', text: '民生银行' },
            { id: 'COMM', text: '交通银行' },
            { id: 'DAHSING', text: '大新银行' },
            { id: 'EGB', text: '恒丰银行' },
            { id: 'GDB', text: '广发银行' },
            { id: 'HANAB', text: '韩亚银行' },
            { id: 'HXB', text: '华夏银行' },
            { id: 'IBKCN', text: '企业银行' },
            { id: 'ICBC', text: '中国工商银行' },
            { id: 'NCB', text: '南洋商行' },
            { id: 'PAB', text: '平安银行' },
            { id: 'POSTGC', text: '邮政储蓄银行' },
            { id: 'SCBANK', text: '渣打银行' },
            { id: 'SCH', text: '新韩银行' },
            { id: 'SPDB', text: '浦发银行' },
            { id: 'UOB', text: '大华银行' },
            { id: 'WOORIB', text: '友利银行' },
            { id: 'ZSBANK', text: '浙商银行' }
          ],
        },
        params: {
          order: {
            id: "",
            reason: ""
          },
          //保险使用 - 具体操作需要改动
          customerCicInfo:{
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
          insurance:{sex:"",dateOfBirth:""}
        },
        saveParams: {
          orderNum: this.$route.params.orderNum,
          bankCardNumberNew:"",
          bankBranchNameNew:"",
          phoneNew:"",
          fileUploadRelations:"",
          orderStatus: "0",
          loanName:"",
          bankBameCodeNew:"",
          accountType:"",
          bankBameNameNew: "",
        },
        baseInfo:"",
        signInfo:[],
        strArray_:[],
        confirmSigningInfo:"",
        isShow_IOU:false,
        isShow_CIV:false,
        isShow_OCI:false,
        isShow_SP:false,
        isYesIOU:false,
        isNoIOU:true,
        isYesCIV:false,
        isNoCIV:true,
        isYesSP:false,
        isNoSP:true,
        isYesOCI:false,
        isNoOCI:true,
        statusObj: {
          "700": "募集中",
          "710": "初审审核驳回",
          "715": "门店取消",
          "720": "初审审核通过",
          "730": "待面签",
          "740": "门店拒绝",
          "750": "终审待审核",
          "760": "终审审核驳回",
          "770": "终审审核通过",
          "780": "放款中",
          "800": "已放款",
          "820": "放款失败",
          "850": "提前结清",
          "900": "结清",
        },
        signAttachment: {
          attach1: [],
          attach2: [],
          attach3: [],
          attach4: [],
          attach5: [],
        }
      }
    },
    methods: {
	getBankBameNameByCode: function (code) {
        var name = "";
        $(this.options.bankBameCodeNew).each(function (i, item) {
          if(item.id == code){
            name = item.text;
          }
        });
        return name;
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
      },
      Insurance: function(){
        this.errors.clear();
        this.winTitle = '公司简介';
        this.showParamInsurance.modalShow = false;
      },
      //保险--提交
      submitPolicy:function(){
        var that = this;
        that.$utils.ajax(that)(basePath2 + "audit/order/contractInfoSubmit?orderNum="+that.searchParams.orderNum, that.searchParams, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.$utils.alert('投保申请提交成功，待放款审核通过后保单生效')
            that.closeWin_i(5);
            that.$router.push('/operateAuditList/')
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
        }, "post","clock");

      },
      // 保险--关闭
      clearWin : function () {
        this.winTitle = '';
      },
      closeWin_i : function (index) {
        this.clearWin();
        switch (index) {
          case 0:
            this.showParamInsurance.modalShow = true;
            break;
          case 1:
            this.showParamInsurance.modalShow1 = true;
            break;
          case 2:
            this.showParamInsurance.modalShow2 = true;
            break;
          case 3:
            this.showParamInsurance.modalShow3 = true;
            break;
          case 4:
            this.showParamInsurance.modalShow4 = true;
            break;
          case 5:
            this.showParamInsurance.modalShow5 = true;
            break;
        }
      },
      // 保险--下一步
      openDiv:function(index){
        switch (index) {
          case 1:
            this.closeWin_i(0);
            this.winTitle = '中华借款人意外伤害保险介绍';
            this.showParamInsurance.modalShow1 = false;
            break;
          case 2:
            this.closeWin_i(1);
            this.winTitle = '投保人及被保险人声明与授权';
            this.showParamInsurance.modalShow2 = false;
            break;
          case 3:
            if($('#info_1').is(':checked')) {
              this.closeWin_i(2);
              this.winTitle = '订单详情';
              this.showParamInsurance.modalShow3 = false;
            }
            break;
          case 4:
            if($('#info_order1').is(':checked')) {
              if($('#info_order2').is(':checked')) {
                this.closeWin_i(3);
                this.winTitle = '投保、理赔流程、保单管理服务与咨询投诉方式';
                this.showParamInsurance.modalShow4 = false;
              }
            }
            break;
          case 5:
            this.closeWin_i(4);
            this.winTitle = '售后服务及电子保单';
            this.showParamInsurance.modalShow5 = false;
            break;
        }
      },
      // 保险--上一步
      open_up:function(index){
        switch (index) {
          case 0:
            this.closeWin_i(1);
            this.winTitle = '公司简介';
            this.showParamInsurance.modalShow = false;
            break;
          case 1:
            this.closeWin_i(2);
            this.winTitle = '中华借款人意外伤害保险介绍';
            this.showParamInsurance.modalShow1 = false;
            break;
          case 2:
            this.closeWin_i(3);
            this.winTitle = '投保人及被保险人声明与授权';
            this.showParamInsurance.modalShow2 = false;
            break;
          case 3:
            this.closeWin_i(4);
            this.winTitle = '订单详情';
            this.showParamInsurance.modalShow3 = false;
            break;
          case 4:
            this.closeWin_i(5);
            this.winTitle = '投保、理赔流程、保单管理服务与咨询投诉方式';
            this.showParamInsurance.modalShow4 = false;
            break;
        }
      },
      /**
       * 变更银行卡 代码重构
       * update by Garen Gosling 2017-06-13 00:45
       **/
      /* -- 代码重构 开始 -- */
      removeIt: function (text) {   // 文件上传状态 之 删除 （注：这个删除是前台删除，没有持久化操作）
        var that = this;
        that.tmp = []
        $(that.imgs).each(function (i, item) {
          if(item && item.purpose){
            if(item.purpose == text){
              that.uploadHide(item.purpose);
            }else{
              that.tmp.push(item);
            }
          }
        });
        that.imgs = that.tmp;
      },
      lookIt: function (text) {
        var that = this;// 文件上传状态 之 查看
        that.md5s = [];
        that.suffixs = [];
        var md5 = null;
        var suffix = null;
        $(that.imgs).each(function (i, item) {
          if(item && item.purpose){
            var obj = null;
            if(item.purpose == text){
              that.md5s.push(item.md5);
              that.suffixs.push(item.suffix);
              return true;
            }
          }
        });
        if(!that.md5s[0] || !that.suffixs[0]){
          alert("图片丢失了");
          return false;
        }

        window.open("../../static/img/upload/uploadPreviewChangeBand.html?" +
          "filePath="+basePath4 + "preview/" + that.md5s[0] + "/" + that.suffixs[0]+
          "&filePath1="+basePath4 + "preview/" + that.md5s[1] + "/" + that.suffixs[1]+
          "&filePath2="+basePath4 + "preview/" + that.md5s[2] + "/" + that.suffixs[2]+
          "&filePath3="+basePath4 + "preview/" + that.md5s[3] + "/" + that.suffixs[3]+
          "&filePath4="+basePath4 + "preview/" + that.md5s[4] + "/" + that.suffixs[4],
          '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
      },
      callback_1: function (value) {    // 变更银行卡 上传按钮的回调方法
        var that = this;
        switch (value){
          case 1:
            that.fileName = "变更证明";
            break
          case 2:
            that.fileName = "变更银行卡协议";
            break;
          case 3:
            that.fileName = "银行卡复印件";
            break;
          case 4:
            that.fileName = "身份证件";
            break;
          default:
            that.fileName = "文件名异常";
            break;
        }
        var info = {
          "md5": that.md5,
          "fileSize": that.fileSize,
          "suffix": that.suffix,
          "purpose": that.fileName,
          "name": that.fileName,
        };

        var uploadShow = that.uploadShow(that.fileName);
        if(uploadShow){
          that.tmp.push(info)
          that.imgs = that.tmp;
          console.log(that.imgs);
        }

//        if(that.imgs.length>0){
//          var tmp = [];
//          var hadIt = false;
//          $(that.imgs).each(function (i, item) {
//            if(item && item.purpose){
//              var obj = null;
//              if(item.purpose == that.fileName){
//                obj = info;
//                hadIt = true;
//              }else{
//                obj = item;
//              }
//              that.tmp.push(obj);
//              that.uploadShow(obj.purpose);
//            }
//          });
//          if(!hadIt){
//            that.tmp.push(info);
//            that.uploadShow(info.purpose);
//          }
//          that.imgs = that.tmp;
//        }else{
//          that.uploadShow(info.purpose);
//          that.imgs.push(info);
//        }
      },
      uploadShow: function (purpose) {    // 文件上传状态 显示
        var that = this;
        switch (purpose){
          case "变更证明":
            that.changesIsNo = false;
            that.changesIsYes = true;
            that.indexChanges++;
            if(that.indexChanges>5){
              that.$utils.alert(purpose+"最多可上传五张");
              return false;
            }
            return true;
          case "变更银行卡协议":
            that.bandIsNo = false;
            that.bandIsYes = true;
            that.indexBand++;
            if(that.indexBand>5){
              that.$utils.alert(purpose+"最多可上传五张");
              return false;
            }
            return true;
          case "银行卡复印件":
            that.bandPaperIsNo = false;
            that.bandPaperIsYes = true;
            that.indexBandPaper++;
            if(that.indexBandPaper>5){
              that.$utils.alert(purpose+"最多可上传五张");
              return false;
            }
            return true;
          case "身份证件":
            that.idCardIsNo = false;
            that.idCardIsYes = true;
            that.indexIdCard++;
            if(that.indexIdCard>5){
              that.$utils.alert(purpose+"最多可上传五张");
              return false;
            }
            return true;
        }
      },
      uploadHide: function (purpose) {    // 文件上传状态 隐藏
        var that = this;
        switch (purpose){
          case "变更证明":
            that.changesIsNo = true;
            that.changesIsYes = false;
            that.indexChanges = 0;
            break;
          case "变更银行卡协议":
            that.bandIsNo = true;
            that.bandIsYes = false;
            that.indexBand=0;
            break;
          case "银行卡复印件":
            that.bandPaperIsNo = true;
            that.bandPaperIsYes = false;
            that.indexBandPaper = 0;
            break;
          case "身份证件":
            that.idCardIsNo = true;
            that.idCardIsYes = false;
            that.indexIdCard = 0;
            break;
        }
      },
      /* -- 代码重构 结束 -- */

      /**
       * 这是原来“变更银行卡”上传文件的代码，暂时保留
       * TODO DELETE
       **/
//      imgUrlComputed: function () {
//        var that = this;
//        var info = {
//          "md5": this.md5,
//          "fileSize": this.fileSize,
//          "suffix": this.suffix,
//          "purpose": this.fileName,
//          "name": this.fileName,
//        };
//        that.imgs.push(info);
//        if(that.imgs[0].purpose == "" || that.imgs[0].purpose ==null){
//          that.imgs.splice(0, 1);
//        }
//        console.log(that.imgs);
//
//        for(var i = 0;i < that.imgs.length;i++){
//          if(that.imgs[i].purpose == "变更证明"){
//            that.changesIsNo = false
//            that.changesIsYes = true
//          }else if(that.imgs[i].purpose == "变更银行卡协议"){
//            that.bandIsNo = false
//            that.bandIsYes = true
//          }else if(that.imgs[i].purpose == "银行卡复印件"){
//            that.bandPaperIsNo = false
//            that.bandPaperIsYes = true
//          }else if(that.imgs[i].purpose == "身份证件"){
//            that.idCardIsNo = false
//            that.idCardIsYes = true
//          }
//        }
//
//        return that.imgs;
//      },
//      callback_maritalStatus: function(value, text){
//        var that = this;
//        if(value == 1 ){
//          that.fileName = "变更证明";
//        }else if(value == 2){
//          that.fileName = "变更银行卡协议"
//        }else if(value == 3){
//          that.fileName = "银行卡复印件"
//        }else if(value == 4){
//          that.fileName = "身份证件"
//        }
//      },
//     commitIt: function () {
//       alert("提交成功");
//     },
      refuse: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + "audit/order/businessReject?orderNum="+this.$route.params.orderNum + "&reason=" + vm.params.order.reason, {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.$utils.alert('拒绝成功')
            that.$router.push('/operateAuditList/')
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
        }, "put");
      },
      goback: function () {
        history.back(-1);
      },
      getNum : function(index){
        //计算序号
        return parseInt(this.startNum) + parseInt(index);
      },
      getNum : function(index){
        //计算序号
        return parseInt(this.searchParams.start) + parseInt(index)+1;
      },
      transfers: function (longDate) {
        var date2 = new Date(longDate);
        var str2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        return str2
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
      openWin4: function () {
        $('#win4').attr("style", "display: block;");
        $('.modal-backdrop').attr("style", "display: block;");
      },
      closeWin4: function () {
        $('#win4').attr("style", "display: none;");
        $('.modal-backdrop').attr("style", "display: none;");
      },
      //      运营审核详情取消签约操作
      businessCancelSign: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'audit/order/businessCancelSign?id='+this.params.order.id + "&reason=" + vm.params.order.reason, {}, function (response) {
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
        },"put");
      },
      //保险--
      initTableInsurance :function(){
        var that = this;
        that.$utils.ajax(that)(basePath2+'insurance/'+this.$route.params.orderNum,{}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
//            if(response.body.data!=null){
//              that.isBuyInsurance = true;
//              that.isNoBuyInsurance = false;
//            }else {that.isBuyInsurance = false;that.isNoBuyInsurance = true;}
            if(response.body.data!=null){
              //投/被保人姓名
              that.params.customerCicInfo.customName =response.body.data.customName;
              //投/被投保人身份证号
              var idNums = response.body.data.idNum;
              that.params.customerCicInfo.idNum =idNums;
              that.params.insurance.sex =parseInt(idNums.substr(16, 1)) % 2 == 1 ? "男" : "女";
              that.params.insurance.dateOfBirth =idNums.substring(6, 10) + "-" + idNums.substring(10, 12) + "-" + idNums.substring(12, 14);
              //投/被保保人证件有效期
              that.params.customerCicInfo.validityTerm =response.body.data.validityTerm;
              //投/被保人手机号
              that.params.customerCicInfo.mobile =response.body.data.mobile;
              //投/被保人电子邮箱
              that.params.customerCicInfo.email =response.body.data.email;
              //第一受益人
              that.params.customerCicInfo.firstBeneficiary =response.body.data.firstBeneficiary;
              //第二受益人
              that.params.customerCicInfo.secondBeneficiary =response.body.data.secondBeneficiary;
              //被保人年龄
              that.params.customerCicInfo.age =response.body.data.age;
              //行业性质;
              that.params.customerCicInfo.industryNature =_oneClassData_(response.body.data.industryNature);
              //投/被保险人行业类别
              that.params.customerCicInfo.industryCategory =_twoClassData2_(response.body.data.industryCategory);
              //保险名称
              that.params.customerCicInfo.insuranceName =response.body.data.insuranceName;
              //投/被保人联系地址
              that.params.customerCicInfo.address =response.body.data.address;
              //保险期限
              that.params.customerCicInfo.term =response.body.data.term;
              //保单号
              that.params.customerCicInfo.insuranceName =response.body.data.insuranceName;
              //保费金额
              that.params.customerCicInfo.insuredFee =response.body.data.insuredFee;
              //投保金额
              that.params.customerCicInfo.insuredAmount =response.body.data.insuredAmount;
              //状态
              that.params.customerCicInfo.status =response.body.data.status;
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
      initTable : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'contract/'+this.$route.params.orderNum,{}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.confirmSigningInfo = response.body.data.data.confirmSigningInfo;
            that.baseInfo = response.body.data.data.baseInfo;
            that.saveParams.accountType = that.baseInfo.accountType;
            that.saveParams.loanName = that.baseInfo.proposer;
            that.saveParams.bankCardNumberNew = that.confirmSigningInfo.bankCardNumber;
            that.saveParams.bankBranchNameNew = that.confirmSigningInfo.bankBranchName;
            that.saveParams.bankBameCodeNew = that.confirmSigningInfo.bankBameCode;
            that.saveParams.bankBameNameNew = that.getBankBameNameByCode(that.confirmSigningInfo.bankBameCode);
			that.saveParams.phoneNew = that.confirmSigningInfo.mobile;
            that.saveParams.idNumber = that.baseInfo.idNum;
            that.signInfo = response.body.data.data.signInfo;
            that.params.order.id =that.baseInfo.id;
            if(that.confirmSigningInfo!=null){
              if(response.body.data.data.confirmSigningInfo.uploadIouPath!=""
                && response.body.data.data.confirmSigningInfo.uploadIouPath!=null){
                that.isYesIOU = true;
                that.isShow_IOU = true;
                that.isNoIOU = false;
              }else {
                that.isShow_IOU = false;
                that.isYesIOU = false;
                that.isNoIOU = true;
              }if(response.body.data.data.confirmSigningInfo.uploadVerificationForm!=""
                && response.body.data.data.confirmSigningInfo.uploadVerificationForm!=null){
                that.isShow_CIV = true;
                that.isYesCIV = true;
                that.isNoCIV = false;
              }else {
                that.isShow_CIV = false;
                that.isYesCIV = false;
                that.isNoCIV = true;
              }if(response.body.data.data.confirmSigningInfo.uploadOtherContract!=""
                && response.body.data.data.confirmSigningInfo.uploadOtherContract!=null){
                that.isShow_OCI = true;
                that.isYesOCI = true;
                that.isNoOCI = false;
              }else {
                that.isShow_OCI = false;
                that.isYesOCI = false;
                that.isNoOCI = true;
              } if(response.body.data.data.confirmSigningInfo.uploadFaceAuditImg!=""
                && response.body.data.data.confirmSigningInfo.uploadFaceAuditImg!=null){
                that.isShow_SP = true;
                that.isYesSP = true;
                that.isNoSP = false;
              }else{
                that.isShow_SP = false;
                that.isYesSP = false;
                that.isNoSP = true;
              }
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
      openIOU:function(e) {
        var that = this;
        if(that.confirmSigningInfo!=null){
          window.open("../../static/html/uploadPreviewIOU.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken")+"&flag="+e,
            '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
        }
      },
      openIOUPdf:function(index) {
        var that = this;
        if(that.confirmSigningInfo!=null){
          if(index == 1 ){
            window.open("../../static/html/uploadPreviewIOUPdf.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken")+"&flag="+index,
              '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
          }else if (index == 2){
            window.open("../../static/html/withholdFile_Pdf.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken")+"&flag="+index,
              '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
          }else if (index == 3){
            window.open("../../static/html/networkLoanSample_Pdf.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken")+"&flag="+index,
              '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
          }else if (index == 4){
            window.open("../../static/html/repaymentReminder_Pdf.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken")+"&flag="+index,
              '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
          }
        }
      },
      openWinForNetwork : function () {
        this.showParams.modalShow = false;
      },
      closeWinForNetwork : function () {
        this.showParams.modalShow = true;
      },
      setAttachHref: function(orderNum, accessToken) {
        var that = this;
        var url = basePath2 + 'contract/' + orderNum +"?accessToken="+accessToken;
        that.$utils.ajax(that)(url, {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var downUrl = "http://hetong.yinguops.org/filesystemweb/";
            var data = response.body.data.data;
            //信用咨询与管理服务协议
            if(!isNull(data.confirmSigningInfo.quartetAgreementFilePath)){
              var arr = data.confirmSigningInfo.quartetAgreementFilePath.split(",");
              for(var i=0; i<arr.length; i++) {
                if (arr[i].indexOf("http") == -1){  //如果不包含http，添加默认url
                  that.signAttachment.attach1.push({href: downUrl + arr[i]});
                } else {
                  that.signAttachment.attach1.push({href: arr[i]});

                }
              }
            }
            //委托划扣授权书
            if(!isNull(data.confirmSigningInfo.withholdFilePath)){
              var arr = data.confirmSigningInfo.withholdFilePath.split(",");
              for(var i=0; i<arr.length; i++) {
                if (arr[i].indexOf("http") == -1){  //如果不包含http，添加默认url
                  that.signAttachment.attach2.push({href: downUrl + arr[i]});
                } else {
                  that.signAttachment.attach2.push({href: arr[i]});

                }
              }
            }
            //还款事项提醒函
            if(!isNull(data.confirmSigningInfo.repaymentReminder)){
              var arr = data.confirmSigningInfo.repaymentReminder.split(",");
              for(var i=0; i<arr.length; i++) {
                if (arr[i].indexOf("http") == -1){  //如果不包含http，添加默认url
                  that.signAttachment.attach5.push({href: downUrl + arr[i]});
                } else {
                  that.signAttachment.attach5.push({href: arr[i]});

                }
              }
            }
            //借款借据
            if(!isNull(data.confirmSigningInfo.iouPath)){
              var arr = data.confirmSigningInfo.iouPath.split(",");
              for(var i=0; i<arr.length; i++) {
                if (arr[i].indexOf("http") == -1){  //如果不包含http，添加默认url
                  that.signAttachment.attach4.push({href: downUrl + arr[i]});
                } else {
                  that.signAttachment.attach4.push({href: arr[i]});

                }
              }
            }
          } else if (response.body.code == '401') {
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin', 'N');
          } else {
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(response.body.message);
        }, "get");

        //网络借贷合同
        var urlLoan = basePath2 + 'contract/loan/' + orderNum +"?accessToken="+accessToken;
        that.$utils.ajax(that)(urlLoan, {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var downUrl = "http://hetong.yinguops.org/filesystemweb/";
            var data = response.body.data;
            //网络借贷合同
            if(!isNull(data)){
              var arr = data;
              var step = 4;   //4个一组，分多组
              var tempArr = new Array();
              for(var i=0; i<arr.length; i++) {
                if (arr[i].contractUrl.indexOf("http") == -1){  //如果不包含http，添加默认url
                  tempArr.push({href: downUrl + arr[i].contractUrl, name: "网络借贷合同" + (i + 1)});
                } else {
                  tempArr.push({href: arr[i].contractUrl, name: "网络借贷合同" + (i + 1)});
                }
                if ((i + 1)%step == 0 || i == (arr.length - 1)) {
                  that.signAttachment.attach3.push(tempArr);
                  tempArr = new Array();
                }
              }
            }
          } else if (response.body.code == '401') {
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin', 'N');
          } else {
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(response.body.message);
        }, "get");
      },
      openCIV:function(e) {
        var that = this;
        if(that.confirmSigningInfo!=null){
          window.open("../../static/html/uploadPreviewCIV.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken"),
            '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
        }
      },
      openOCI:function(e) {
        var that = this;
        if(that.confirmSigningInfo!=null){
          window.open("../../static/html/uploadPreviewOCI.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken"),
            '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
        }
      },
      openSP:function(e) {
        var that = this;
        if(that.confirmSigningInfo!=null){
          window.open("../../static/html/uploadPreviewSP.html?orderNum="+this.$route.params.orderNum+"&accessToken="+this.$utils.getLocalData("accessToken"),
            '_blank','height=1000, width=820, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
        }
      },
      delUp:function(index){
        var that = this;
        if(index == 9){
          //借款借据
          var url  = "/contract/"+this.$route.params.orderNum+"/deleteIou"
          that.del(url);
        }else if(index == 0){
          //签约信息核实表
          var url  = "/contract/"+this.$route.params.orderNum+"/deleteVerification"
          that.del(url);
        }else if(index == 1){
          //其他合同信息
          var url  = "contract/"+this.$route.params.orderNum+"/deleteContract"
          that.del(url);
        }else if(index == 2){
          //签约面审照片（2-10张）
          var url  = "/contract/"+this.$route.params.orderNum+"/deleteFace"
          that.del(url);
        }
      },
      del: function (url) {
      var that = this;
      that.$utils.ajax(that)(basePath2 + url, {}, function (response) {
        if (typeof (response.body) === 'string') {
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
        that.initTable();
        } else if (response.body.code == '401') {
          that.$utils.clearLocalData("accessToken");
          that.$utils.clearLocalData("orgData");
          that.$utils.clearLocalData("hrData");
          that.$parent.$emit('changeLogin', 'N');
        } else {
          that.initTable();
          that.$utils.alert(response.body.message)
        }
      }, function (response) {
        that.$utils.alert(this.failedMsg);
      }, "delete");
    },
    contractInfoSubmit:function (){
      var that = this;
      that.$utils.ajax(that)(basePath2 + "audit/order/contractInfoSubmit?orderNum="+that.searchParams.orderNum, that.searchParams, function (response) {
        if (typeof (response.body) === 'string') {
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
          that.$utils.alert('提交成功')
          that.$router.push('/operateAuditList/')
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
      }, "post","clock");
    },
    dataChange: function () {
      var that = this;
      that.dataParams.repaymentDay = $("#datetimepicker").val();
      if(!that.dataParams.repaymentDay){
        alert("请输入还款日");
        return false;
      }
      var timestamp = Date.parse(new Date(that.dataParams.repaymentDay));
      var timestamps = Date.parse(new Date(that.confirmSigningInfo.repaymentStartDate));
      if(timestamp > timestamps){
        if(that.is1530){
          var arr = that.dataParams.repaymentDay.split("-");
          if(arr.length != 3){
            alert("日期异常");
            return false;
          }
          var mm = parseInt(arr[1]);
          var dd = parseInt(arr[2]);
          if(mm != 2){
            if(dd != 15 && dd != 30){ // 不是15号或30号不能变更
              alert("日期必须是15号或30号");
              return false;
            }
          }else{
            if(dd != 15 && dd != 28){ // 不是15号或28号不能变更
              alert("日期必须是15号或28号");
              return false;
            }
          }
        }
        that.$utils.ajax(that)(basePath2 + 'changeRepayment', that.dataParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            window.location.reload();
          }else if(response.body.code == '401'){

          }else{
            that.$utils.alert(response.body.message);
            that.dataParams.repaymentDay = "";
            $("#datetimepicker").val("");
            that.closeWin();
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"post");
      }else {
        that.$utils.alert('还款日应该大于首次还款日')
      }
    },
    bankName: function (value,name) {
      this.saveParams.bankBameNameNew = name;
    },
    validateBankChange: function () {
      if(this.imgs.length == 0){
        alert("请上传附件");
        return false;
      }
      var purposes = "";
      $(this.imgs).each(function (i, item) {
        purposes += item.purpose;
        purposes += ",";
      });
      if(this.saveParams.accountType == "2"){ // 银行
       if(purposes.indexOf("变更证明")<0){
          alert("请上传变更证明");
          return false;
       }
      }
      if(this.saveParams.accountType == "1"){ // 三方
        if(purposes.indexOf("变更银行卡协议")<0){
          alert("变更银行卡协议");
          return false;
        }
      }
      if(purposes.indexOf("银行卡复印件")<0){
        alert("请上传银行卡复印件");
        return false;
      }
      if(purposes.indexOf("身份证件")<0){
        alert("请上传身份证件");
        return false;
      }
      return true;
    },
    bankChange: function () {
      var that = this;
      if(!that.validateBankChange()){
        return false;
      }
      that.saveParams.fileUploadRelations = that.imgs;
      that.$utils.ajax(that)(basePath2 + 'modBankcardRecord', that.saveParams, function (response) {
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
//          console.log(response.body)
        if (response.body.code == '200') {
          that.$utils.alert('提交成功');
          that.initTable();
        }else if(response.body.code == '401'){
          alert("登录失效，请重新登录");
        }else{
          that.$utils.alert(response.body.message)
        }
      }, function (response) {
        that.$utils.alert("fail");
      },"post","clock");
    },
    cardNumber : function () {
      var that = this;
      that.$utils.ajax(that)(basePath2+'modBankcardRecord/list?orderNum=' +this.$route.params.orderNum, {}, function (response) {
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
          that.items = response.body.data;
          //console.log(that.items);
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
    },
    openWin: function () {
      $('#win').attr("style", "display: block;");
      $('.modal-backdrop').attr("style", "display: block;");
    },
    closeWin: function () {
      this.dataParams.repaymentDay = "";
      $("#datetimepicker").val("");
      $('#win').attr("style", "display: none;");
      $('.modal-backdrop').attr("style", "display: none;");
    },
    searchAll : function () {
      var that = this;
      that.$utils.ajax(that)(basePath2+'changeRepayment/list?orderNum=' +this.$route.params.orderNum, {}, function (response) {
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
          that.repayment = response.body.data;
          if(that.repayment && that.repayment.length>0){
            var repayment0 = that.repayment[0];
            that.dataParams.repaymentDay = repayment0.repaymentDay;
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
    startNum: function () {
      if(this.recordsTotal==0){
        return 0;
      }else{
        return this.searchParams.start+1
      }
    },
    initRepayDateType: function () {
      var that = this;
      that.$utils.ajax(that)(basePath2+'order/' +this.$route.params.orderNum, {}, function (response) {
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
          var data = response.body.data;
          if(data){
            var order = data.order;
            var customerCicInfo = data.customerCicInfo;
            if(order){
              that.repayDateType = order.repayDateType;
              //debugger
              if(order.isBuyInsurance == true && customerCicInfo.status!=20){
                that.isBuyInsurance = true;
                that.isNoBuyInsurance = false;
              }else {that.isBuyInsurance = false;that.isNoBuyInsurance = true;}

            }
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
    }
},
    mounted: function () {
      vm = this;
      var that = this;
      that.initTable();
      that.initRepayDateType();
      that.initTableInsurance();
      that.cardNumber();
      that.searchAll();
      that.setAttachHref(that.$route.params.orderNum, that.$utils.getLocalData("accessToken"))
//      that.selectData();
      $('#datetimepicker').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      })/*.on('changeDate', function(ev) {
        that.dataParams.repaymentDay = $("#datetimepicker").val();
      })*/;

    }
  }
</script>
<style>
  .help-block {
    margin-top: 8px !important;
  }
  .devStyle{
    display : none;
  }
  .winShow{
    display : block !important;
  }
  .baoxian{
    padding-left: 30px;
  }
  .baoxians{
    padding-left: 50%;
  }
  .baoxians1{
    padding-left: 37%;
  }
  .baoxians2{
    padding-left: 42%;
  }
  .baoxians3{
    padding-left: 36%;
  }
  .baoxianYes{
    padding-left: 10%;
  }
  .baoxianNo{
    padding-left: 36%;
  }
</style>
