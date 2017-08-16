<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>募集计划 </h5>
            </div>
            <div class="ibox-content">
              <!--<button class='btn btn-info' @click='intoInsert_open()'><i class='fa fa-paste'></i>新增</button>-->
              <div class="ibox-content">
                <table id="user_table" class="table table-striped table-bordered table-hover">
                  <thead>
                  <tr>
                    <th width="100px">序号</th>
                    <th width="100px">期数</th>
                    <th width="100px">计划金额</th>
                    <th width="100px">实际募集金额</th>
                    <th width="100px">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item , index) in items">
                    <td style="text-align: center;">{{ getNum(index) }}</td>
                    <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{item.productPeriod}}</div></td>
                    <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{item.applyMoney}}</div></td>
                    <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{item.raiseAmount}}</div></td>
                    <td style="text-align: center">
                      <button type="button" class="btn btn-info" @click="intoUpdate_open(item)">修改</button>
                      <!--<button type="button" class="btn btn-info" @click="remove(item.id)">删除</button>-->
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div class="row">
                  <div class="dataTables_info col-sm-8">
                    显示 {{ searchParams.start }} 到 {{ end }} 项，共 {{ recordsTotal }} 项
                  </div>

                  <div class="dataTables_paginate paging_simple_numbers col-sm-7" style="text-align:right;">
                    <ul class="pagination">
                      <li class="paginate_button previous"><a @click="first()">首页</a></li>
                      <li class="paginate_button previous"><a @click="before()">上一页</a></li>
                      <li class="paginate_button" v-for="(n,index) in pageSize" >
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
              <!--<button class='btn btn-info' @click='intoInsert_open()'><i class='fa fa-paste'></i>新增</button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" v-on:click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span>

            </button>
            <h4 class="modal-title" id="appModalTitleId">{{winTitle}}</h4>

          </div>
          <form class="form-horizontal m-t">
            <div class="modal-body">
              <div class="form-group">
                <label class="col-sm-3 control-label">ID：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params.id" disabled="">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label"><span class="important">*</span>计划编号：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params.applyBatch" disabled="">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label"><span class="important">*</span>计划金额：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params.applyMoney" data-vv-as="计划金额"
                         v-validate="'required|decimal:2|max:11|not_in:0'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-1.applyMoney') }"
                         name="applyMoney" />  <span v-show="errors.has('applyMoney')" class="help is-danger">{{ errors.first('applyMoney') }}</span>

                </div>
              </div>
              <!--<div class="form-group">
                <label class="col-sm-3 control-label"><span class="important">*</span>募集期限：</label>
                <div class="col-sm-8">
                  <select2 :options="options.loanTerms" v-model="params.productPeriod" :select2Style="select2Style"
                           placeholder="== 请选择 =="></select2>
                  <input type="hidden" class="form-control" v-model="params.productPeriod"
                         data-vv-as="募集期限" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.productPeriod') }"
                         name="productPeriod"> <span v-show="errors.has('productPeriod')" class="help is-danger">{{ errors.first('productPeriod') }}</span>

                </div>
              </div>-->
              <!--<div class="form-group">-->
                <!--<label class="col-sm-3 control-label"><span class="important">*</span>实际募集金额：</label>-->
                <!--<div class="col-sm-8">-->
                  <!--<input type="text" class="form-control" v-model="params.raiseAmount" data-vv-as="实际募集金额"-->
                         <!--v-validate="'required|alpha_num|max:32'" maxlength="32" :class="{'input': true, 'is-danger': errors.has('form-1.raiseAmount') }"-->
                         <!--name="raiseAmount" />  <span v-show="errors.has('raiseAmount')" class="help is-danger">{{ errors.first('raiseAmount') }}</span>-->

                <!--</div>-->
              <!--</div>-->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
              <button type="button" class="btn btn-primary" v-if="isHideSaveBtn"
                      @click="saveVeeValidate()" :disabled="buttonDisabled.popSave">保存</button>
              <button type="button" class="btn btn-primary" v-if="isHideUpdateBtn"
                      @click="updateVeeValidate()" :disabled="buttonDisabled.popUpdate">修改</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" id="pop" style="display: none"></div>
  </div>
</template>
<script>
//select2-引入select2组件
var vm;
import '../../static/js/monthpicker.min.js';
import select2 from './common/select2/select2.vue';
export
default {
    name: 'perpetualCalendar',
    components: { //select2-定义select2在当前组件中的名称
        select2
    },
    data: function () {
        return {
            jumpNum : 1,
            newPageSize:0,
            select2Style: { //select2-style样式
                width: '347px'
            },
            options: {
                loanTerms: [{
                    id: '1',
                    text: '1期'
                }, {
                    id: '3',
                    text: '3期'
                }, {
                    id: '6',
                    text: '6期'
                }, {
                    id: '12',
                    text: '12期'
                }, {
                    id: '18',
                    text: '18期'
                }, {
                    id: '24',
                    text: '24期'
                }, {
                    id: '36',
                    text: '36期'
                }],
            },
            debugShow: true,
            winTitle: '新增',
            failedMsg: '服务器异常，请联系管理员',
            showParams: {
                devStyle: 'devStyle',
                winShow: 'winShow'
            },
            buttonDisabled: {
                popSave: false,
                popUpdate: false,
                deleteLine: false
            },
            params: {
                id: "0",
                applyBatch:  this.$route.params.applyBatch,
                applyDate:  this.$route.params.times,
                applyDate: "",
                applyMoney: "",
                maxMoney: "",
                minMoney: "",
                productPeriod: "",
                raiseAmount: "",
            },
            emailReadonly: false, //true：email有值时；false：email无值
            isDevStyle: true, //是否为正式环境样式，true:正式环境样式，false：调试模式样式
            items: [],
            recordsTotal: 0,
            searchParams: {
                id:"",
                start: 0,
                length: 10,
                applyBatch: this.$route.params.applyBatch,
                applyDate:  this.$route.params.times,
            },
            isHideSaveBtn: true,
            isHideUpdateBtn: true,
        };
    },
     computed: {
      end : function () {
        var res = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
        if(res > this.recordsTotal){
          res = this.recordsTotal
        }
        return res
      },
      pageSize : function () {
        var a = parseInt(this.recordsTotal / this.searchParams.length)
        var b = a + 1
       this.newPageSize=this.recordsTotal % this.searchParams.length == 0 ? a : b
            return this.newPageSize;
      }
    },
    methods: {
      before  : function () {
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
        return parseInt(this.searchParams.start+1) + parseInt(index);
      },
     urlHandler: function (path) {
      return "#/"+path;
    },
        initTable: function () {
            var that = this;

            this.searchParams.applyDate = this.transfer(this.searchParams.applyDate);
            that.$utils.ajax(that)(basePath2 + 'modelPackage', this.searchParams, function (response) {
                if (typeof (response.body) === 'string') {
                    response.body = JSON.parse(response.body);
                }
                if (response.body.code == '200') {
                    that.items = response.body.data;
                    that.recordsTotal = response.body.data.length;
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
        intoInsert_open: function () {
            vm.winTitle = '新增';
            $('#win').attr("style", "display: block;");
            $('#pop').attr("style", "display: block;");
            vm.isHideSaveBtn = true;
            vm.isHideUpdateBtn = false;
        },
        intoUpdate_open: function (item) {
            vm.winTitle = '修改';
            vm.params.id = item.id
            vm.params.applyMoney = item.applyMoney
            vm.params.applyBatch = item.applyBatch
            vm.params.productPeriod = item.productPeriod
            vm.params.raiseAmount = item.raiseAmount
            vm.isHideSaveBtn = false;
            vm.isHideUpdateBtn = true;
            $('#win').attr("style", "display: block;");
            $('#pop').attr("style", "display: block;");
        },
     transfer: function (str) {
        var date = new Date(str);
        return date.getTime();
      },
        saveVeeValidate: function () {
            var that = this;

            that.$validator.validateAll().then(()=>{
                that.save();
            }).
            catch (()=>{
                alert("请正确填写必填项");
            });
        },
        save: function () {
            this.buttonDisabled.popSave = true; 
            var that = this;
            that.params.applyDate = this.transfer(this.$route.params.times);
            this.$utils.ajax(that)(basePath2 + 'modelPackage', that.params, function (response) {
                if (typeof (response.body) === 'string') {
                    response.body = JSON.parse(response.body);
                }
                if (response.body.code == '200') {
                    that.closeWin()
                    that.initTable()
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
            }, "post");
            this.buttonDisabled.popSave = false;
        },
        updateVeeValidate: function () {

            var that = this;
            this.$validator.validateAll().then(result => {
                that.update();
            }).
            catch (()=>{
              alert("请正确填写必填项");
            });
        },
        update: function () {
            this.buttonDisabled.popUpdate = true;
            var that = this;
            that.$utils.ajax(that)(basePath2 + 'modelPackage', this.params, function (response) {
                if (typeof (response.body) === 'string') {
                    response.body = JSON.parse(response.body);
                }
                if (response.body.code == '200') {
                    that.closeWin()
                    that.initTable()
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
            this.buttonDisabled.popUpdate = false;
        },
        closeWin: function () {
            vm.params.id = ""
            vm.params.applyMoney = ""
            vm.params.productPeriod = ""
            vm.params.raiseAmount = ""
            $('#win').attr("style", "display: none;");
            $('#pop').attr("style", "display: none;");
        },
        update_moneys: function (item) {
            vm.isHideSaveBtn = false
            vm.isHideUpdateBtn = true
            vm.params.id = item.id
            vm.params.moneys = item.moneys
            $('#win').attr("style", "display: block;");
            $('#pop').attr("style", "display: block;");
        },

       remove : function (id) {

        this.buttonDisabled.deleteLine = true;
        if (confirm("确定要删除吗？")){
          var that = this;
          that.searchParams.id = id;
          that.$utils.ajax(that)(basePath2+'/modelPackage', that.searchParams, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }

            if (response.status == '200') {
              //that.$utils.alert(response.body.message)
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
      }
    },
    mounted: function () {
        vm = this;
        this.initTable();
        $('#applyDates').datetimepicker({
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
            vm.params.applyDate = $("#applyDates").val();
        });
    },
    created: function () {
        /**
         * 渲染初始页面
         *      在创建App.vue时，首先调用“登录探针”接口，测试是否已登录。
         *      如果已登录则渲染首页，未登录则渲染登录页，其它情况提示“fail”
         * @type {created}
         */
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'loginTest', that.searchParams, function (response) {
            if (typeof (response.body) === 'string') {
                response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
                that.$parent.$emit('changeLogin', 'Y');
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
    }
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
</script>
