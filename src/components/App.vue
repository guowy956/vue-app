<template>
  <div class="gray-bg marginTop">
    <div v-if="isBlock" class="wrapper wrapper-content animated fadeInRight">
      <div class="app_btn">
        <button class="btn btn-primary btn-circle btn-lg app_button" type="button" @click="showBlock()"><i class="fa fa-list"></i></button>
      </div>
      <div class="row">
        <div v-for="item in items" class="col-sm-4 animated pulseHover" data-animation="pulse">
          <div class="contact-box">
            <a @click="openUrl(item)">
              <div class="col-sm-4">
                <div class="text-center">
                  <img alt="image" class="img-circle" :src="imgUrl(item)" width="105" height="105">
                  <div class="m-t-xs font-bold">项目经理</div>
                </div>
              </div>
            </a>
            <div class="col-sm-8">
              <a @click="openUrl(item)">
                <h3><strong class="font">{{ item.name }}</strong></h3>
                <p>{{item.manager}}</p>
                <p>Tel:{{item.contact}}</p>
              </a>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div>
        <input type="hidden" id="start"/>
        <input type="button" value="下一页" class="btn btn-primary" @click="next()"/>
        <!--加载全部样式-->
        <input type="button" value="已经加载全部" class="btn btn-w-m btn-default" onclick="next()"/>
      </div>
    </div>

    <div v-show="!isBlock" class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>应用管理</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="padding: 5px">
              <table class="table tableApp">
                <tr>
                  <td class="col-sm-4">
                    <label class="col-sm-4 margin">应用名称</label>
                    <div class="col-sm-8">
                      <input type="text" v-model="searchParams.name" placeholder="请输入应用名称" class="form-control border">
                    </div>
                  </td>
                  <td class="col-sm-4">
                    <div class="col-sm-12">
                      <button type="button" class="btn btn-info" @click="search()">查询</button>
                      <button type="button" class="btn btn-info" @click="resetSearch()">重置</button>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div class="ibox-content">
              <button class='btn btn-info' @click='openWinSave()'><i class='fa fa-paste'></i>新增</button>
              <table id="user_table" class="table table-striped table-bordered table-hover ">
                <thead>
                <tr>
                  <th width="5%">ID</th>
                  <th width="20%">应用名称</th>
                  <th width="20%">应用KEY</th>
                  <th width="20%">应用安全码</th>
                  <th width="35%">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items">
                  <td style="text-align: center">{{item.id}}</td>
                  <td style="text-align: center">{{item.name}}</td>
                  <td style="text-align: center">{{item.appKey}}</td>
                  <td style="text-align: center">{{item.appSecret}}</td>
                  <td style="text-align: center">
                    <button class="btn btn-info" @click="openWinEdit(item)"><i class="fa fa-paste"></i>编辑</button>
                    <button class="btn btn-info" @click="remove(item.id)"><i class="fa fa-paste"></i>删除</button>
                    <button class="btn btn-info" @click="updateAppSecret(item)"><i class="fa fa-paste"></i>变更秘钥</button>
                    <button v-show="!item.available" class="btn btn-info" @click="updateAvailable(item)"><i class="fa fa-paste"></i>锁定</button>
                    <button v-show="item.available" class="btn btn-info" @click="updateAvailable(item)"><i class="fa fa-paste"></i>解锁</button>
                  </td>
                </tr>
                </tbody>
              </table>

              <div class="row">
                <div class="dataTables_info col-sm-8">
                  显示 {{ searchParams.start }} 到 {{ end }} 项，共 {{ recordsTotal }} 项
                </div>

                <div class="dataTables_paginate paging_simple_numbers col-sm-4" style="text-align:right;">
                  <ul class="pagination">
                    <li class="paginate_button previous"><a @click="before()">上一页</a></li>
                    <li class="paginate_button" v-for="n in pageSize"><a @click="jump(n)">{{ n }}</a></li>
                    <li class="paginate_button next"><a @click="next()">下一页</a></li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1" id="win" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
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
                <label class="col-sm-3 control-label">应用名称：</label>
                <div class="col-sm-8">
                  <p>
                    <input type="text" class="form-control yye" data-vv-as="应用名称" v-model="params.name" v-validate="'required|min:2|max:128'" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" maxlength="129">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                  </p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">URL：</label>
                <div class="col-sm-8">
                  <p>
                    <input type="text" class="form-control yye" data-vv-as="URL" v-model="params.appUrl" v-validate="'required|min:2|max:128'" :class="{'input': true, 'is-danger': errors.has('url') }" name="url" maxlength="129">
                    <span v-show="errors.has('url')" class="help is-danger">{{ errors.first('url') }}</span>
                  </p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">ICON：</label>
                <div class="col-sm-8">
                  <fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload"></fileuploadSingle>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">负责人：</label>
                <div class="col-sm-8">
                  <p>
                    <input type="text" class="form-control yye" data-vv-as="负责人" v-model="params.manager" v-validate="'required|min:2|max:128'" :class="{'input': true, 'is-danger': errors.has('manager') }" name="manager" maxlength="129">
                    <span v-show="errors.has('manager')" class="help is-danger">{{ errors.first('manager') }}</span>
                  </p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">联系方式：</label>
                <div class="col-sm-8">
                  <p>
                    <input type="text" class="form-control yye" data-vv-as="联系方式" v-model="params.contact" v-validate="'required|min:2|max:128'" :class="{'input': true, 'is-danger': errors.has('contact') }" name="contact" maxlength="129">
                    <span v-show="errors.has('contact')" class="help is-danger">{{ errors.first('contact') }}</span>
                  </p>
                </div>
              </div>

              <div class="form-group" style="text-align: right;padding-right: 60px;">
                <a v-show="isShowHigh" @click="showHigh()">高级 ↑</a>
                <a v-show="!isShowHigh" @click="showHigh()">高级 ↓</a>
              </div>
              <div class="form-group" v-show="isShowHigh">
                <label class="col-sm-3 control-label">应用KEY：</label>
                <div class="col-sm-8">
                  <p>
                    <input type="text" class="form-control yye" data-vv-as="应用KEY" v-model="params.appKey" v-validate="'min:2|max:128'" :class="{'input': true, 'is-danger': errors.has('appKey') }" name="appKey" maxlength="129">
                    <span v-show="errors.has('appKey')" class="help is-danger">{{ errors.first('appKey') }}</span>
                  </p>
                </div>
              </div>
              <div class="form-group" v-show="isShowHigh">
                <label class="col-sm-3 control-label">应用安全码：</label>
                <div class="col-sm-8">
                  <p>
                    <input type="text" class="form-control yye" data-vv-as="应用安全码" v-model="params.appSecret" v-validate="'min:2|max:128'" :class="{'input': true, 'is-danger': errors.has('appSecret') }" name="appSecret" maxlength="129">
                    <span v-show="errors.has('appSecret')" class="help is-danger">{{ errors.first('appSecret') }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
              <button type="button" class="btn btn-primary" :class="{hide_it:isHideSaveBtn}" @click="saveVeeValidate()"
                      :disabled="buttonDisabled.popSave">保存</button>
              <button type="button" class="btn btn-primary" :class="{hide_it:isHideUpdateBtn}" @click="updateVeeValidate()"
                      :disabled="buttonDisabled.popUpdate">修改</button>
            </div>
          </form>

        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" id="pop" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]"></div>
  </div>
</template>

<script>

  //select2-引入select2组件
  import Select2 from './common/select2/select2Multiple.vue';
  import fileuploadSingle from './common/fileuploadSingle.vue';
  import sysResource from './common/sysResource.vue';
  var vm;

  export default {
    name: 'user',
    components: {//select2-定义select2在当前组件中的名称
      'select2': Select2,
      fileuploadSingle,
      sysResource
    },
    data : function () {
      return {
        winTitle: '新增',
        modalShow: true,
        failedMsg: '服务器异常，请联系管理员',
        options: [//select2-初始化option，可以使用静态值，也可以使用http接口返回值
//          { id: 1, text: 'Hello111' },
//          { id: 2, text: 'World222' },
//          { id: 3, text: 'dddd222' }
        ],
        select2Style: {//select2-style样式
          width: '347px'
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
          name: "",
          appKey: "",
          appSecret: "",
          available: "",
          appIcon: "",
          appUrl: "",
          manager: "",
          contact: "",
          employeeNoOpt: "",
          insertTime: "",
          updateTime: ""
        },
        emailReadonly: false,          //true：email有值时；false：email无值
        isDevStyle: true,          //是否为正式环境样式，true:正式环境样式，false：调试模式样式
        items: [],
        recordsTotal: 0,
        searchParams: {
          start: 0,
          length: 10,
          name: ""
        },
        isHideSaveBtn: true,
        isHideUpdateBtn: true,
        md5: "",
        resourceIds: "",
        isShowHigh: false,
        isBlock: false,
        isPulse: false
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
        return this.recordsTotal%this.searchParams.length==0?a:b
      }
    },
    methods : {
      initTable : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'sysApp/list',this.searchParams, function (response) {
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
        if(parseInt(this.searchParams.start)>0){
          this.searchParams.start = parseInt(this.searchParams.start)-parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      next : function () {
        if(parseInt(this.end) < parseInt(this.recordsTotal)) {
          this.searchParams.start = parseInt(this.searchParams.start)+parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      jump : function (pageNo) {
        this.searchParams.start = (pageNo-1) * parseInt(this.searchParams.length);
        this.initTable()
      },
      search : function () {
        this.searchParams.start = 0
        this.initTable()
      },
      resetSearch : function () {
        this.searchParams.realName = ""
        this.searchParams.empNo = ""
      },
      openWin : function () {
        this.showParams.modalShow = false;
      },
      openWinSave : function () {
        this.errors.clear();
        vm.winTitle = '新增';
        vm.isHideSaveBtn = false
        vm.isHideUpdateBtn = true
        this.openWin()
      },
      openWinEdit : function (item) {
        this.errors.clear();
        var that = this;
        that.winTitle = '修改';
        that.isHideSaveBtn = true
        that.isHideUpdateBtn = false

        that.params.id = item.id
        that.params.name = item.name
        that.params.appKey = item.appKey
        that.params.appSecret = item.appSecret
        that.params.available = item.available
        that.params.appIcon = item.appIcon
        that.params.appUrl = item.appUrl
        that.params.manager = item.manager
        that.params.contact = item.contact
        that.params.employeeNoOpt = item.employeeNoOpt
        that.insertTime = item.insertTime
        that.updateTime = item.updateTime
        this.openWin()
      },
      clearWin : function () {
        var that = this;
        that.params.id = 0
        that.params.name = ""
        that.params.appKey = ""
        that.params.appSecret = ""
        that.params.available = false
        that.params.appIcon = ""
        that.params.appUrl = ""
        that.params.manager = ""
        that.params.contact = ""
        that.params.employeeNoOpt = ""
        that.insertTime = ""
        that.updateTime = ""
        that.isShowHigh = false
        that.md5 = ""
        that.errors.clear();
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
        this.buttonDisabled.popSave = true; 
        var that = this;
        if(that.resourceIds){
          that.params.resourceIds = that.resourceIds;
        }
        if(that.md5){
          that.params.appIcon = that.md5
        }
        this.$utils.ajax(that)(basePath2+'sysApp', that.params, function (response) {
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
        this.buttonDisabled.popUpdate = true;
        var that = this;
        if(that.resourceIds){
          that.params.resourceIds = that.resourceIds;
        }
        if(that.md5){
          that.params.appIcon = that.md5
        }
        that.$utils.ajax(that)(basePath2+'sysApp', that.params, function (response) {
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
          that.$utils.ajax(that)(basePath2+'sysApp?id='+id, {}, function (response) {
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
      updateAppSecret: function (item) {
        var that = this;
        that.$utils.ajax(that)(basePath2+'sysApp/appSecret?id='+item.id, {}, function (response) {
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
      },
      updateAvailable: function (item) {
        var that = this;
        that.$utils.ajax(that)(basePath2+'sysApp/available?id='+item.id+"&available="+!item.available, {}, function (response) {
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
      },
      showHigh: function () {
        this.isShowHigh = !this.isShowHigh;
      },
      resetSearch : function () {
        this.searchParams.name = ""
      },
      showBlock: function () {
        this.isBlock = !this.isBlock;
      },
      imgUrl: function (item) {
        var pic = "";
        if(item && item.appIcon){
          pic = item.appIcon;
        }
        if(pic != ""){
          return basePath4+"preview/"+pic;
        }else{
          return "static\\img\\profile_small.jpg";
        }
      },
      openUrl: function (item) {
        window.open(item.appUrl)
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.name', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },
    mounted:function () {
      vm = this;
      this.initTable();
      this.watchSearchParams();
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
  .margin{
    margin-top: 7px;
  }
  .tableApp{
    margin-bottom: 0px;
  }
  /*html, body {
    font: 13px/18px sans-serif;
  }
  select2 {
    min-width: 300px;
  }*/
  .pulseHover:hover {
    -webkit-animation-name: pulse;
  }
</style>
