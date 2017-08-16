<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>产品管理</h5>
            </div>
            <div class="ibox-content">
              <form id="searchForm" href="#">
                <table style="width: 100%">
                  <tr>
                    <td style="width: 40%;">
                      <div class="form-group" style="padding-top:5px;">
                        <label class="col-sm-3 control-label" style="padding-top: 7px;text-align: right;">产品编码：</label>
                        <div class="col-sm-6">
                          <input type="text" v-model="searchParams.productCode" placeholder="" class="form-control" maxlength="32">
                        </div>
                      </div>
                    </td>
                    <td style="width: 40%;">
                      <div class="form-group" style="padding-top:5px;">
                        <label class="col-sm-3 control-label" style="padding-top: 7px;text-align: right;">产品名称：</label>
                        <div class="col-sm-6">
                          <input type="text" v-model="searchParams.productName" placeholder="" class="form-control" maxlength="32">
                        </div>
                      </div>
                    </td>
                    <td style="width: 20%;"></td>
                  </tr>
                  <tr>
                    <td>
                      <div class="form-group" style="padding-top:5px;" id="searchProductTypeDiv">
                        <label class="col-sm-3 control-label" style="padding-top: 7px;text-align: right;">产品类型：</label>
                        <div class="col-sm-6">
                          <select2 :options="productTypes" wid="styleC" @myMethod="callbackA"></select2>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="form-group" style="padding-top:5px;" id="searchProductStatusDiv">
                        <label class="col-sm-3 control-label" style="padding-top: 7px;text-align: right;">产品状态：</label>
                        <div class="col-sm-6">
                          <select2 :options="statuss" wid="styleC" @myMethod="callbackB"></select2>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button type="button" class="btn btn-info" @click="search()">查询</button>
                      <button type="button" class="btn btn-info" @click="resetSearch()">重置</button>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <div class="ibox-content">
              <button class='btn btn-info' @click='openWinSave()'><i class='fa fa-paste'></i>新增</button>
              <div id="tableDiv" style="overflow-x:auto;">
                <table id="user_table" class="table table-striped table-bordered table-hover ">
                <thead>
                <tr class="firstTr">
                  <th>产品ID</th>
                  <th style="width: 10%">产品编码</th>
                  <th>产品名称</th>
                  <th>产品类型</th>
                  <th>最小金额(元)</th>
                  <th>最大金额（元）</th>
                  <th>年龄范围（岁）</th>
                  <th>借款期限(期)</th>
                  <th>利率(%)</th>
                  <th>费率(%)</th>
                  <th>年管理费率(%)</th>
                  <th>提前还款<br>违约金费率(%)</th>
                  <th>还款方式</th>
                  <th>是否循<br>环借贷</th>
                  <th>重新进件<br>冻结期限</th>
                  <th>状态</th>
                  <th style="width: 15%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items">
                  <td>{{item.id}}</td>
                  <td>{{item.productCode}}</td>
                  <td>{{item.productName}}</td>
                  <td>{{item.productType}}</td>
                  <td v-if="item.minAmount">{{toMoney(item.minAmount)}}</td>
                  <td v-if="!item.minAmount"></td>
                  <td v-if="item.minAmount">{{toMoney(item.maxAmount)}}</td>
                  <td v-if="!item.minAmount"></td>
                  <td v-if="item.minAge && item.maxAge">{{item.minAge}} ~ {{item.maxAge}}</td>
                  <td v-if="!item.minAge || !item.maxAge"></td>
                  <td>{{item.loanTerm}}</td>
                  <td>{{item.rate}}</td>
                  <td>{{item.expenseRate}}</td>
                  <td>{{item.manageRate}}</td>
                  <td>{{item.prepaymentBreachRate}}</td>
                  <td>{{item.repayType}}</td>
                  <td>{{formatIsCycleLoan(item.isCycleLoan)}}</td>
                  <td>{{item.freezingPeriod}}</td>
                  <td>{{formatStatus(item.status)}}</td>
                  <td>
                    <button class="btn btn-info" @click="openWinEdit(item,0)"><i class="fa fa-paste"></i>修改</button>
                    <button class="btn btn-info" @click="remove(item.id)"><i class="fa fa-paste"></i>删除</button>
                  </td>
                </tr>
                </tbody>
              </table>
              </div>
              <div class="row">
                <div class="dataTables_info col-sm-8">
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

    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1" id="win" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
            <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 0px;padding-right: 0px;padding-bottom: 5px;padding-top: 15px;">
              <div class="form-group formGroup">
                <div class="col-sm-6">
                  <label class="col-sm-4 control-label">ID：</label>
                  <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="params.id" disabled="">
                  </div>
                </div>
                <div class="col-sm-6">
                  <label class="col-sm-4 control-label"><span class="important">*</span>产品编码：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="产品编码" style="font-size: 10px;" v-model="params.productCode" v-validate="'required|min:2|max:32'" :class="{'input': true, 'is-danger': errors.has('productCode') }" name="productCode" maxlength="33">
                      <span v-show="errors.has('productCode')" class="help is-danger">{{ errors.first('productCode') }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-md-6">
                  <label class="col-sm-4 control-label"><span class="important">*</span>产品名称：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="产品名称" v-model="params.productName" v-validate="'required|min:2|max:64'" :class="{'input': true, 'is-danger': errors.has('productName') }" name="productName" maxlength="65">
                      <span v-show="errors.has('productName')" class="help is-danger">{{ errors.first('productName') }}</span>
                    </p>
                  </div>
                </div>
                <div class="col-sm-6" v-if="status==0" id="productTypeDiv">
                  <label class="col-sm-4 control-label"><span class="important">*</span>产品类型：</label>
                  <div class="col-sm-7">
                    <select2 :options="productTypes" wid="styleC" @myMethod="callbackC"></select2>
                  </div>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 12px">
                <div class="col-sm-6" v-if="status==0" id="repayTypeDiv">
                  <label class="col-sm-4 control-label"><span class="important">*</span>还款方式：</label>
                  <div class="col-sm-7">
                    <select2 :options="repayTypes" wid="styleC" @myMethod="callbackE"></select2>
                  </div>
                </div>
                <div class="col-sm-6" v-if="status==0" id="loanTermDiv">
                  <label class="col-sm-4 control-label">借款期限：</label>
                  <div class="col-sm-7">
                    <select2Multiple :options="loanTerms" v-model="params.loanTerm" :select2Style="select2Style">
                      <option disabled value="0">请选择</option>
                    </select2Multiple>
                  </div>
                  <div class="col-sm-1 unit2">期</div>
                </div>
              </div>
              <div class="form-group" style="margin-bottom: 12px">
                <div class="col-sm-6" v-if="status==0" id="statusDiv">
                  <label class="col-sm-4 control-label">状态：</label>
                  <div class="col-sm-7">
                    <select2 :options="statuss" wid="styleC" @myMethod="callbackD"></select2>
                  </div>
                </div>
                <div class="col-sm-6" v-if="status==0" id="isCycleLoanDiv">
                  <label class="col-sm-4 control-label">是否循环借贷：</label>
                  <div class="col-sm-7">
                    <select2 :options="isCycleLoans" wid="styleC" @myMethod="callbackF"></select2>
                  </div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-6" v-if="status==0">
                  <label class="col-sm-4 control-label">最小金额：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="最小金额" v-model="params.minAmount" v-validate="''" :class="{'input': true, 'is-danger': errors.has('minAmount') }" name="minAmount" maxlength="11">
                      <span v-show="errors.has('minAmount')" class="help is-danger">{{ errors.first('minAmount') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit2">元</div>
                </div>
                <div class="col-sm-6" v-if="status==0">
                  <label class="col-sm-4 control-label">最大金额：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="最大金额" v-model="params.maxAmount" v-validate="''" :class="{'input': true, 'is-danger': errors.has('maxAmount') }" name="maxAmount" maxlength="11">
                      <span v-show="errors.has('maxAmount')" class="help is-danger">{{ errors.first('maxAmount') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit2">元</div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-6" v-if="status==0">
                  <label class="col-sm-4 control-label">利率：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="利率" v-model="params.rate" v-validate="''" :class="{'input': true, 'is-danger': errors.has('rate') }" name="rate" maxlength="11">
                      <span v-show="errors.has('rate')" class="help is-danger">{{ errors.first('rate') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit">%</div>
                </div>
                <div class="col-sm-6" v-if="status==0">
                  <label class="col-sm-4 control-label">费率：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="利率" v-model="params.expenseRate" v-validate="''" :class="{'input': true, 'is-danger': errors.has('expenseRate') }" name="expenseRate" maxlength="11">
                      <span v-show="errors.has('expenseRate')" class="help is-danger">{{ errors.first('expenseRate') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit">%</div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-6" v-if="status==0">
                  <label class="col-sm-4 control-label">年管理费率：</label>
                  <div class="col-sm-7">
                      <input type="text" class="form-control yye" data-vv-as="年管理费率" v-model="params.manageRate" v-validate="''" :class="{'input': true, 'is-danger': errors.has('manageRate') }" name="manageRate" maxlength="11">
                      <span v-show="errors.has('manageRate')" class="help is-danger">{{ errors.first('manageRate') }}</span>
                  </div>
                  <div class="col-sm-1 unit">%</div>
                </div>
                <div class="col-sm-6" v-if="status==0">
                  <label class="col-sm-4 control-label">提前还款违约金费率：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="提前还款违约金费率" v-model="params.prepaymentBreachRate" v-validate="''" :class="{'input': true, 'is-danger': errors.has('prepaymentBreachRate') }" name="prepaymentBreachRate" maxlength="11">
                      <span v-show="errors.has('prepaymentBreachRate')" class="help is-danger">{{ errors.first('prepaymentBreachRate') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit">%</div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-6">
                  <label class="col-sm-4 control-label">最小年龄：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="最小年龄" v-model="params.minAge" v-validate="'numeric'" :class="{'input': true, 'is-danger': errors.has('maxAge') }" name="maxAge" maxlength="2">
                      <span v-show="errors.has('minAge')" class="help is-danger">{{ errors.first('minAge') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit2">岁</div>
                </div>
                <div class="col-sm-6">
                  <label class="col-sm-4 control-label">最大年龄：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="最大年龄" v-model="params.maxAge" v-validate="'numeric'" :class="{'input': true, 'is-danger': errors.has('maxAge') }" name="maxAge" maxlength="2">
                      <span v-show="errors.has('maxAge')" class="help is-danger">{{ errors.first('maxAge') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit2">岁</div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-6">
                  <label class="col-sm-4 control-label">重新进件冻结期限：</label>
                  <div class="col-sm-7">
                    <p>
                      <input type="text" class="form-control yye" data-vv-as="重新进件冻结期限" v-model="params.freezingPeriod" v-validate="'numeric'" :class="{'input': true, 'is-danger': errors.has('freezingPeriod') }" name="freezingPeriod" maxlength="2">
                      <span v-show="errors.has('freezingPeriod')" class="help is-danger">{{ errors.first('freezingPeriod') }}</span>
                    </p>
                  </div>
                  <div class="col-sm-1 unit2">天</div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-12" style="margin-left: -4.5%;margin-bottom: 10px">
                  <label class="col-sm-2 control-label">所需要项：</label>
                  <div class="col-sm-8">
                    <label class="select_label2"><input type="checkbox" name="info" value="1" id="info_1" checked disabled/>贷款用途</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="2" id="info_2" checked disabled/>个人信息</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="3" id="info_3" />社保信息</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="4" id="info_4" />房产信息</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="5" id="info_5" />工作信息</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="6" id="info_6" />私营业主信息</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="7" id="info_7" />婚庆贷填写</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="8" id="info_8" checked disabled/>联系人信息</label>
                    <label class="select_label2"><input type="checkbox" name="info" value="9" id="info_9" checked disabled/>工作人员填写</label>
                  </div>
                  <div class="col-sm-1" style="width: 100px;">
                    <label><input type="checkbox" id="info_all" @click="selectAll_info()"/> 全选</label>
                  </div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-12" style="margin-left: -4.5%;margin-bottom: 10px">
                  <label class="col-sm-2 control-label">必须上传项：</label>
                  <div class="col-sm-8">
                    <label class="select_label"><input type="checkbox" id="D001" name="num" value="D001" />D001</label>
                    <label class="select_label"><input type="checkbox" id="D002" name="num" value="D002" />D002</label>
                    <label class="select_label"><input type="checkbox" id="D003" name="num" value="D003" />D003</label>
                    <label class="select_label"><input type="checkbox" id="D004" name="num" value="D004" />D004</label>
                    <label class="select_label"><input type="checkbox" id="D005" name="num" value="D005" />D005</label>
                    <label class="select_label"><input type="checkbox" id="D006" name="num" value="D006" />D006</label>
                    <label class="select_label"><input type="checkbox" id="D007" name="num" value="D007" />D007</label>
                    <label class="select_label"><input type="checkbox" id="D008" name="num" value="D008" />D008</label>
                    <label class="select_label"><input type="checkbox" id="D009" name="num" value="D009" />D009</label>
                    <label class="select_label"><input type="checkbox" id="D010" name="num" value="D010" />D010</label>
                    <label class="select_label"><input type="checkbox" id="D011" name="num" value="D011" />D011</label>
                    <label class="select_label"><input type="checkbox" id="D012" name="num" value="D012" />D012</label>
                    <label class="select_label"><input type="checkbox" id="D013" name="num" value="D013" />D013</label>
                    <label class="select_label"><input type="checkbox" id="D014" name="num" value="D014" />D014</label>
                    <label class="select_label"><input type="checkbox" id="D015" name="num" value="D015" />D015</label>
                    <label class="select_label"><input type="checkbox" id="D016" name="num" value="D016" />D016</label>
                    <label class="select_label"><input type="checkbox" id="D017" name="num" value="D017" />D017</label>
                    <label class="select_label"><input type="checkbox" id="D018" name="num" value="D018" />D018</label>
                    <label class="select_label"><input type="checkbox" id="D019" name="num" value="D019" />D019</label>
                    <label class="select_label"><input type="checkbox" id="D020" name="num" value="D020" />D020</label>
                    <label class="select_label"><input type="checkbox" id="D021" name="num" value="D021" />D021</label>
                    <label class="select_label"><input type="checkbox" id="D022" name="num" value="D022" />D022</label>
                    <label class="select_label"><input type="checkbox" id="D023" name="num" value="D023" />D023</label>
                    <label class="select_label"><input type="checkbox" id="D024" name="num" value="D024" />D024</label>
                    <label class="select_label"><input type="checkbox" id="D025" name="num" value="D025" />D025</label>
                    <label class="select_label"><input type="checkbox" id="D026" name="num" value="D026" />D026</label>
                    <label class="select_label"><input type="checkbox" id="D027" name="num" value="D027" />D027</label>
                    <label class="select_label"><input type="checkbox" id="D028" name="num" value="D028" />D028</label>
                    <label class="select_label"><input type="checkbox" id="D029" name="num" value="D029" />D029</label>
                    <label class="select_label"><input type="checkbox" id="D030" name="num" value="D030" />D030</label>
                  </div>
                  <div class="col-sm-1" style="width: 100px;">
                    <label><input type="checkbox" id="num_all" @click="selectAll_num()"/> 全选</label>
                  </div>
                </div>
              </div>
              <div class="form-group formGroup">
                <div class="col-sm-12" v-if="status==0" style="margin-left: -4.5%;">
                  <label class="col-sm-2 control-label">产品描述：</label>
                  <div class="col-sm-8">
                      <!--<textarea class="form-control yye" data-vv-as="备注" v-model="params.profiles" v-validate="''" :class="{'input': true, 'is-danger': errors.has('profiles') }" name="profiles"></textarea>
                      <span v-show="errors.has('profiles')" class="help is-danger">{{ errors.first('profiles') }}</span>-->
                      <quill-editor ref="myTextEditor"
                                    v-model="params.profiles"
                                    :config="editorOption">
                      </quill-editor>
                      <div style="border:1px solid #ccc; margin-top:5px; padding:10px;">{{ params.profiles }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="padding: 3px 15px;">
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
              <button  v-if="status==0" type="button" class="btn btn-primary" :class="{hide_it:isHideSaveBtn}" @click="saveVeeValidate()" :disabled="buttonDisabled.popSave">保存</button>
              <button  v-if="status==0" type="button" class="btn btn-primary" :class="{hide_it:isHideUpdateBtn}" @click="updateVeeValidate()" :disabled="buttonDisabled.popUpdate">修改</button>
            </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" id="pop" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]"></div>
  </div>

</template>

<script>

  //select2-引入select2组件
  import Select2 from './common/select2/select2_userRelation.vue';
  import fileuploadSingle from './common/fileuploadSingle.vue';
  import select2Multiple from './common/select2/select2Multiple.vue';
  import { quillEditor } from 'vue-quill-editor'
  var vm;

  export default {
    name: 'product',
    components: {//select2-定义select2在当前组件中的名称
      'select2': Select2,
      fileuploadSingle,
      select2Multiple,
      quillEditor
    },
    data : function () {
      return {
        newPageSize : 0,
        startNum :1,
        jumpNum : 1,
        editorOption: {},
        loanTerms: [
          { id: '1', text: '1' },
          { id: '3', text: '3' },
          { id: '6', text: '6' },
          { id: '12', text: '12' },
          { id: '18', text: '18' },
          { id: '24', text: '24' },
          { id: '36', text: '36' }
        ],
        winTitle: '新增',
        modalShow: true,
        failedMsg: '服务器异常，请联系管理员',
        options: [//select2-初始化option，可以使用静态值，也可以使用http接口返回值
//          { id: 1, text: 'Hello111' },
//          { id: 2, text: 'World222' },
//          { id: 3, text: 'dddd222' }
        ],
        select2Style: {//select2-style样式
          width: '100%'
        },
        showParams: {
          modalShow: true,
          devStyle: 'devStyle',
          winShow: 'winShow'
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          deleteLine: false
        },
        params: {
          id: 0,
          productCode: "",
          productName: "",
          productType: "",
          repayType: "",
          isCycleLoan: "",
          minAmount: 0,
          maxAmount: 0,
          minAge: 0,
          maxAge: 0,
          freezingPeriod: 0,
          requiredItem: "",
          requiredScanning: "",
          loanTerm: "",
          rate: 0,
          expenseRate: 0,
          status: "",
          manageRate: 0,
          prepaymentBreachRate: 0,
          profiles: ""
        },
        emailReadonly: false,          //true：email有值时；false：email无值
        isDevStyle: true,          //是否为正式环境样式，true:正式环境样式，false：调试模式样式
        items: [],
        recordsTotal: 0,
        searchParams: {
          start: 0,
          length: 10,
          productCode: "",
          productName: "",
          productType: "",
          repayType: "",
          status: ""
        },
        isHideSaveBtn: true,
        isHideUpdateBtn: true,
        md5: "",
        roles: [],
        status: 0,
        roleId: "",
        statuss: [
          { id: "open", text: '上架' },
          { id: "close", text: '下架' }
        ],
        productTypes: [],
        repayTypes:[],
        isCycleLoans:[
          { id: "true", text: '是'},
          { id: "false", text: '否'}
        ]
      };
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
          return 1;
        }else{
          return this.searchParams.start + 1;
        }
      }
    },
    methods : {
      // 所需要项 全选
      selectAll_info: function () {
        var isChecked = $("#info_all").is(':checked');
        var arr = ["3","4","5","6","7"];
        if(isChecked){
          $(arr).each(function (i, item) {
            $("#info_"+item).prop("checked", true);
          });
        }else{
          $(arr).each(function (i, item) {
            $("#info_"+item).prop("checked", false);
          });
        }
      },
      selectAll_num: function () {
        var isChecked = $("#num_all").is(':checked');
        if(isChecked){
          $("input[name='num']").each(function (i, item) {
            $(item).prop("checked", true);
          });
        }else{
          $("input[name='num']").each(function (i, item) {
            $(item).prop("checked", false);
          });
        }
      },
      toMoney: function (value) {
        return toMoney(value)
      },
      initProductType: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'dictionary/parentId/1',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var types = response.body.data;
            if(types){
              $(types).each(function (i, item) {
                var type = {};
                type.id = item.dictName;
                type.text = item.dictName;
                that.productTypes.push(type);
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
     initEqualType: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'dictionary/parentId/6',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var types = response.body.data;
            if(types){
              $(types).each(function (i, item) {
                var type = {};
                type.id = item.dictName;
                type.text = item.dictName;
                that.repayTypes.push(type);
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
      initTable : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'product/list',this.searchParams, function (response) {
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
          that.$utils.alert(this.failedMsg);
        },"get");
      },
    before : function () {
        if(parseInt(this.searchParams.start)>1){
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
      jump : function (pageNo) {
        this.jumpNum=pageNo;
        this.searchParams.start = (pageNo-1) * parseInt(this.searchParams.length);
        this.initTable()
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
          this.searchParams.start = (this.newPageSize-1)*this.searchParams.length;
          this.jumpNum=this.newPageSize;
          this.initTable()
        }
      },
      search : function () {
        this.searchParams.start = 0
        this.initTable()
      },
      resetSearch : function () {
        this.searchParams.productCode = ""
        this.searchParams.productName = ""
        this.searchParams.productType = ""
        $("#searchProductTypeDiv").find(".select2-chosen").text("")
        this.searchParams.status = ""
        $("#searchProductStatusDiv").find(".select2-chosen").text("")
      },
      openWin : function () {
        this.errors.clear();
        this.showParams.modalShow = false;
      },
      openWinSave : function () {
        this.status = 0;
        vm.winTitle = '新增';
        vm.isHideSaveBtn = false
        vm.isHideUpdateBtn = true

        this.openWin()
      },
      openWinEdit : function (item,status) {
        this.status = status;
        vm.winTitle = '修改';
        vm.isHideSaveBtn = true
        vm.isHideUpdateBtn = false

        vm.params.id = item.id
        vm.params.productCode = item.productCode;
        vm.params.productName = item.productName
        vm.params.productType = item.productType
        $("#productTypeDiv").find(".select2-chosen").text(item.productType);
        vm.params.repayType = item.repayType
        $("#repayTypeDiv").find(".select2-chosen").text(item.repayType);
        vm.params.isCycleLoan = item.isCycleLoan;
        $("#isCycleLoanDiv").find(".select2-chosen").text(vm.formatIsCycleLoan(item.isCycleLoan));
        vm.params.minAmount = item.minAmount
        vm.params.maxAmount = item.maxAmount
        vm.params.minAge = item.minAge
        vm.params.maxAge = item.maxAge
        vm.params.requiredItem = item.requiredItem
        vm.params.requiredScanning = item.requiredScanning
        vm.params.loanTerm = item.loanTerm
        vm.params.rate = item.rate
        vm.params.expenseRate = item.expenseRate
        vm.params.status = item.status
        vm.params.profiles = item.profiles
        vm.params.minAge = item.minAge
        vm.params.maxAge = item.maxAge
        vm.params.freezingPeriod = item.freezingPeriod
        $("#statusDiv").find(".select2-chosen").text(vm.formatStatus(item.status));
        vm.params.manageRate = item.manageRate
        vm.params.prepaymentBreachRate = item.prepaymentBreachRate
        vm.params.requiredItem = item.requiredItem
        vm.params.requiredScanning = item.requiredScanning
        vm.showRequiredItem();
        vm.showRequiredScanning();
        this.openWin()

      },
      clearWin : function () {
        vm.params.id = 0
        vm.params.productCode = ""
        vm.params.productName = ""
        vm.params.productType = ""
        $("#productTypeDiv").find(".select2-chosen").text("")
        vm.params.repayType = ""
        $("#repayTypeDiv").find(".select2-chosen").text("")
        vm.params.isCycleLoan = ""
        $("#isCycleLoanDiv").find(".select2-chosen").text("")
        vm.params.minAmount = 0
        vm.params.maxAmount = 0
        vm.params.minAge = 0
        vm.params.maxAge = 0
        vm.params.loanTerm = ""
        vm.params.expenseRate = ""
        $("#loanTermDiv").find(".select2-chosen").text("")
        vm.params.rate = 0
        vm.params.status = ""
        $("#statusDiv").find(".select2-chosen").text("")
        vm.params.manageRate = 0
        vm.params.prepaymentBreachRate = 0
        vm.params.profiles = ""
        vm.params.minAge = 0
        vm.params.maxAge = 0
        vm.params.requiredItem = ""
        vm.params.requiredScanning = ""
        vm.params.repayType = ""
        vm.params.isCycleLoan = ""
        vm.params.freezingPeriod = 0
        this.errors.clear();
        this.clearRequiredItem();
        this.clearRequiredScanning();
        vm.sources = [];
      },
      closeWin : function () {
        this.clearWin()
        this.showParams.modalShow = true;
      },
      saveVeeValidate: function () {
        var that = this;
        this.$validator.validateAll().then(() => {
          that.save();
        }).catch(() => {
//          alert("请正确填写必填项");
        });
      },
      save : function () {
        if(this.params.minAge && this.params.maxAge){
          if(parseInt(this.params.minAge) - parseInt(this.params.maxAge) > 0 ){
            alert("最小年龄不能大于最大年龄");
            return false;
          }
        }
        this.buttonDisabled.popSave = true; 
        this.params.requiredItem = this.requireditem();
        this.params.requiredScanning = this.scanning();
        var that = this;
        if(this.md5){
          that.params.picture = this.md5;
        }
        this.$utils.ajax(that)(basePath2+'product', that.params, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.closeWin()
            that.initTable()
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
        },"post");
        this.buttonDisabled.popSave = false;
      },
      updateVeeValidate: function () {
        var that = this;
        this.$validator.validateAll().then(() => {
          that.update();
        }).catch(() => {
//          alert("请正确填写必填项");
        });
      },
      update : function () {
        if(this.params.minAge && this.params.maxAge){
          if(parseInt(this.params.minAge) - parseInt(this.params.maxAge) > 0 ){
            alert("最小年龄不能大于最大年龄");
            return false;
          }
        }
        this.buttonDisabled.popUpdate = true;
        this.params.requiredItem = this.requireditem();
        this.params.requiredScanning = this.scanning();
        var that = this;
        if(this.md5){
          that.params.picture = this.md5;
        }
        that.$utils.ajax(that)(basePath2+'product', that.params, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.closeWin()
            that.initTable()
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
        },"put");
        this.buttonDisabled.popUpdate = false;
      },
      remove : function (id) {
        this.buttonDisabled.deleteLine = true;
        if (confirm("确定要删除吗？")){
          var that = this;
          that.$utils.ajax(that)(basePath2+'product?id='+id, {}, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
              that.initTable()
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
          },"delete");
          this.buttonDisabled.deleteLine = false;
        }
      },
      callbackA: function(value,text){
        this.searchParams.productType = value;
        $("#searchProductTypeDiv").find(".select2-chosen").text(text);
      },
      callbackB: function(value,text){
        this.searchParams.status = value;
        $("#searchProductStatusDiv").find(".select2-chosen").text(text);
      },
      callbackC: function(value,text){
        this.params.productType = value;
        $("#productTypeDiv").find(".select2-chosen").text(text);
      },
      callbackD: function(value,text){
        this.params.status = value;
        $("#StatusDiv")(".select2-chosen").text(text);
      },
      callbackE: function(value,text){
        this.params.repayType = value;
        $("#repayTypeDiv").find(".select2-chosen").text(text);
      },
      callbackF: function (value, text) {
        this.params.isCycleLoan = value;
        $("#isCycleLoanDiv").find(".select2-chosen").text(text);
      },
      formatStatus: function (status) {
        if(status == "open"){
          return "上架"
        }
        if(status == "close"){
          return "下架"
        }
      },
      formatIsCycleLoan: function (value) {
        if(value == true){
          return "是";
        }
        if(value == false){
          return "否";
        }
        return '';
      },
      formatMoney: function (value) {
        if(!!!value){
          return "0.00"
        }
        var f = parseFloat(value);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(value*100)/100;
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
      clearRequiredItem: function () {
          var str = "3,4,5,6,7";
          var arr = str.split(",");
          $(arr).each(function(i,item){
            $("#info_"+item).prop("checked",false);
          });
        $("#info_all").prop("checked",false);
      },
      clearRequiredScanning: function () {
        $("input[name='num']").each(function (i, item) {
          $(item).prop("checked",false);
        });
        $("#num_all").prop("checked",false);
      },
      showRequiredItem: function () {
        var requiredItem = this.params.requiredItem;
        if(requiredItem){
          var arr = requiredItem.split(",");
          $(arr).each(function(i,item){
            $("#info_"+item).prop("checked",true);
          });
        }
      },
      showRequiredScanning: function () {
        var requiredScanning = this.params.requiredScanning;
        if(requiredScanning){
          var arr = requiredScanning.split(",");
          $(arr).each(function(i,item){
            $("#"+item).prop("checked",true);
          });
        }
      },
      requireditem: function(){
        var items = $("input[name='info']:checked");
        //var obj=document.getElementsByName('info');
        var s='';
        for(var i=0; i<items.length; i++){
            s+=items[i].value; //如果选中，将value添加到变量s中
            if(i < items.length - 1){
              s+=','; //如果选中，将value添加到变量s中
            }
        }
        return s;
      },
      scanning: function(){
        var items = $("input[name='num']:checked");
        var s='';
        for(var i=0; i<items.length; i++){
          s+=items[i].value; //如果选中，将value添加到变量s中
          if(i < items.length - 1){
            s+=','; //如果选中，将value添加到变量s中
          }
        }
        return s;
      },
      formatRate: function (value) {
        if(!!!value){
          return "0.00%"
        }
        var f = parseFloat(value);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(value*100);
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
        if(!!!value){
          return "0.00%"
        }
        return value+"%";
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.productCode', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.productName', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.productType', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.status', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },
    mounted:function () {
      vm = this;
      this.initProductType();
      this.initEqualType();
      this.initTable();
      this.watchSearchParams();
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
    },
    created : function () {
      /**
       * 渲染初始页面
       *      在创建App.vue时，首先调用“登录探针”接口，测试是否已登录。
       *      如果已登录则渲染首页，未登录则渲染登录页，其它情况提示“fail”
       * @type {created}
       */
      var that = this;
      that.$utils.ajax(that)(basePath2+'loginTest',that.searchParams, function (response) {
        if(typeof (response.body) === 'string'){
          response.body = JSON.parse(response.body);
        }
        if (response.body.code == '200') {
          that.$parent.$emit('changeLogin','Y');
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
  }

</script>

<style scoped>
  @import '/static/plugins/zTree_v3/css/demo.css';
  @import '/static/plugins/zTree_v3/css/zTreeStyle/zTreeStyle.css';
  @import '/static/plugins/select2/select2_metro.css';
  @import '/static/css/bootstrap.min.css?v=3.3.6';
  @import '/static/css/font-awesome.min.css?v=4.4.0';
  @import '/static/css/plugins/dataTables/dataTables.bootstrap.css';
  @import '/static/css/animate.min.css';
  @import '/static/css/style.min.css?v=4.1.0';

  .devStyle{
    display : none;
  }
  .winShow{
    display : block !important;
  }
  .debuggerStyle{
    color : red;
    font-weight : bolder;
  }
  .hide_it{
    display : none;
  }
  .wrapper{
    height: 100%;
  }
  .class2 {
    border: 1px solid #1ab394;
    background: #f0f6e4;
    width: 100%;
    height: 110px;
    overflow-y: scroll;
    overflow-x: auto;
    overflow: auto;
    margin-top: 10px;
    padding: 10px
  }
  .formGroup{
    margin-bottom: 5px;
  }
  .unit{
    padding-top:7px;
    font-size:14px;
    padding-left:5px;
  }
  .unit2{
    padding-top:7px;
    padding-left:5px;
  }
  .select_label{
    width: 60px;
    text-align: left;
  }
  .select_label2{
    width: 125px;
    text-align: left;
  }
  input{
    border-radius: 5px;
  }
</style>
