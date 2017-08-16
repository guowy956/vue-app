<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>募集计划包</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content">
              <button class='btn btn-info' @click='openWin()'><i class='fa fa-paste'></i>新增</button>
              <table id="user_table" class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                  <th width="100px">序号</th>
                  <th width="100px">计划编号</th>
                  <th width="100px">来源</th>
                  <th width="100px">募集总金额</th>
                  <th width="100px">实际募集金额</th>
                  <th width="100px">实际推送金额</th>
                  <th width="100px">状态</th>
                  <th width="110px">申请日期</th>
                  <th width="90px">募集日期</th>
                  <th width="100px">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item , index) in items">
                  <td style="text-align: center;">{{ getNum(index) }}</td>
                  <td style="text-align: center;">
                    <router-link :to="'perpetualCalendar'+'/'+item.applyBatch+'/'+item.applyDate">
                    <a>{{item.applyBatch}}</a>
                  </router-link>
                  </td>
                  <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{item.source | convertSource}}</div></td>
                  <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{item.applyAmount}}</div></td>
                  <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{item.raiseAmount}}</div></td>
                  <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{item.applyAmount}}</div></td>
                  <td style="text-align: center;"><div style="width: 100px; overflow: auto;">{{statusObj[item.status]}}</div></td>
                  <td style="text-align: center;"><div style="width: 110px; overflow: auto;">{{item.createTime}}</div></td>
                  <td style="text-align: center;"><div style="width: 90px; overflow: auto;">{{item.applyDate | dateFormat}}</div></td>
                  <td style="text-align: center">
                    <button class="btn btn-primary" type="button" >
                      <a style="color: #FFFFFF" :href="urlHandler('perpetualCalendar'+'/'+item.applyBatch+'/'+item.applyDate)">查看详情</a>
                    </button>
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
          </div>
        </div>
      </div>
    </div>

    <div class="modal inmodal in" tabindex="-1" id="win">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span>

            </button>
            <h4 class="modal-title" id="appModalTitleId">{{winTitle}}</h4>

          </div>
          <form class="form-horizontal m-t">
            <div class="modal-body">
              <div class="form-group">
                <label class="col-sm-3 control-label"><span class="important">*</span>计划金额：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params.applyMoney" data-vv-as="计划金额"
                         v-validate="'required|decimal:2|max:11|not_in:0'" maxlength="11" :class="{'input': true, 'is-danger': errors.has('form-1.applyMoney') }"
                         name="applyMoney" />  <span v-show="errors.has('applyMoney')" class="help is-danger">{{ errors.first('applyMoney') }}</span>

                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label"><span class="important">*</span>募集期限：</label>
                <div class="col-sm-8">
                  <select2 :options="options.loanTerms" v-model="params.productPeriod" :select2Style="select2Style"
                           placeholder="== 请选择 =="></select2>
                  <input type="hidden" class="form-control" v-model="params.productPeriod"
                         data-vv-as="募集期限" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-1.productPeriod') }"
                         name="productPeriod"> <span v-show="errors.has('productPeriod')" class="help is-danger">{{ errors.first('productPeriod') }}</span>

                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
              <button type="button" class="btn btn-primary" v-if="isHideSaveBtn"
                      @click="saveVeeValidate()" :disabled="buttonDisabled.popSave">保存</button>
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

   import '../../static/js/monthpicker.min.js';
  import select2 from './common/select2/select2.vue';
  var vm;

  export default {
    name: 'raise',
    components: {//select2-定义select2在当前组件中的名称
      'select2': select2,
    },
    data : function () {
      return {
        jumpNum : 1,
        newPageSize:0,
        winTitle: '新增',
        modalShow: true,
        failedMsg: '服务器异常，请联系管理员',
        select2Style: {//select2-style样式
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
          id: "",
          applyBatch: "",
          source: "",
          applyMoney: "",
          raiseAmount: "",
          status: "",
          createTime: "",
          applyDate: "",
          productPeriod: "",
        },
        emailReadonly: false,          //true：email有值时；false：email无值
        isDevStyle: true,          //是否为正式环境样式，true:正式环境样式，false：调试模式样式
        items: [
        ],
        recordsTotal: 0,
        searchParams: {
          start: 0,
          length: 10,
          applyBatch: "",
          source:"",
          status:""
        },
        isHideSaveBtn: true,
        isHideUpdateBtn: true,
        resourceIds: "",
        statusObj: {
					"1": "未提交",
						"2": "未推送",
						"3": "已推送",
						"4": "募集中",
						"5": "已完成",
						"6": "超时未满",
				},
      };
    },
    filters:{
      convertSource : function(value){
       if(value=='1'){
         return "云钱袋";

       }else if(value=='2'){
         return "银谷普惠";
       }else if(value=='3'){
         return "东方银谷";
       }else{
         return "--";
       }
      },
      dateFormat : function(value){
        if(isNull(value)){
          return "-";
        }
        return new Date(value).format('yyyy-MM-dd');
      },
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
    methods : {
    urlHandler: function (path) {
        return "#/"+path;
      },
    getNum : function(index){
        //计算序号
        return parseInt(this.searchParams.start+1) + parseInt(index);
      },
      initTable : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'recruitment/package/list',this.searchParams, function (response) {
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
      search : function () {
        this.searchParams.start = 0
        this.initTable()
      },
      resetSearch : function () {
        this.searchParams.applyBatch = ""
      },
      openWin : function () {
        $('#win').attr("style","display: block;");
        $('#pop').attr("style","display: block;");
      },
      clearWin : function () {
        vm.params.applyMoney = ""
        vm.params.productPeriod = ""
        this.errors.clear();
      },
      closeWin : function () {
        this.clearWin()
        $('#win').attr("style","display: none;");
        $('#pop').attr("style","display: none;");
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
        this.buttonDisabled.popSave = true; 
        var that = this;
        this.$utils.ajax(that)(basePath2+'recruitment', that.params, function (response) {
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
          alert("请正确填写必填项");
        });
      },
      update : function () {
        this.buttonDisabled.popUpdate = true;
        var that = this;
        if(that.id){
          that.params.id = that.id;
        }
        that.$utils.ajax(that)(basePath2+'recruitment', that.params, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }

          if (response.status == '200') {
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
      remove : function (id,applyBatch) {
        this.buttonDisabled.deleteLine = true;
        if (confirm("确定要删除吗？")){
          var that = this;
          that.$utils.ajax(that)(basePath2+'recruitment?applyBatch='+applyBatch+'&id='+id, {}, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
              that.$utils.alert(response.body.message)
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
    mounted:function () {
      vm = this;
      this.initTable();
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

  .tableRole{
    margin-bottom: 0px;
  }
  /*html, body {
    font: 13px/18px sans-serif;
  }
  select2 {
    min-width: 300px;
  }*/
</style>
