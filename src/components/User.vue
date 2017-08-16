<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>用户管理</h5>
              <div class="ibox-tools">
                <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
                </a>
                <a class="close-link">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div class="ibox-content" style="padding: 0">
              <form id="searchForm" href="#">
                <table class="table tableUser">
                  <tr>
                    <td class="col-sm-4">
                      <label class="col-sm-4 margin">员工工号：</label>
                      <div class="col-sm-8">
                        <input type="text" v-model="searchParams.empNo" class="form-control border" maxlength="11">
                      </div>
                    </td>
                    <td class="col-sm-4">
                      <label class="col-sm-4 margin">员工姓名：</label>
                      <div class="col-sm-8">
                        <input type="text" v-model="searchParams.realName" class="form-control border" maxlength="11">
                      </div>
                    </td>
                    <td class="col-sm-4">
                      <div class="col-sm-12">
                        <p type="button" class="btn btn-info" @click="search()">查询</p>
                        <p type="button" class="btn btn-info" @click="resetSearch()">重置</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <div class="ibox-content">
              <p class='btn btn-info' @click='openWinSave()'><i class='fa fa-paste'></i>新增</p>
              <table id="user_table" class="table table-bordered">
                <thead>
                <tr>
                  <th>序号</th>
                  <th>ID</th>
                  <th>员工号</th>
                  <th>姓名</th>
                  <th>组织名称</th>
                  <th class="zindex">职位</th>
                  <th class="zindex">营业部</th>
                  <th class="zindex">手机号</th>
                  <th class="zindex">邮箱</th>
                  <!--<th class="zindex">查看图片</th>-->
                  <th class="zindex">角色</th>
                  <th class="zindex">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in items">
                  <td>{{ index + startNum }}</td>
                  <td>{{item.id}}</td>
                  <td>{{item.empNo}}</td>
                  <td>{{item.realName}}</td>
                  <td>{{item.orgName}}</td>
                  <td>{{item.postName}}</td>
                  <td>{{item.salesDeptName}}</td>
                  <td>{{item.phone}}</td>
                  <td>{{item.email}}</td>
                  <!--<td>
                    <img :src="titleImgUrl(item.picture)" width="64" height="64">
                  </td>-->
                  <td>{{item.roleName}}</td>
                  <td>
                    <p class="btn btn-primary" @click="remove(item.id)"><i class="fa fa-paste"></i>删除</p>
                    <p class='btn btn-info' @click='openWinEdit(item)'><i class='fa fa-paste'></i>修改</p>
                    <p class='btn btn-info' @click='openWinPermission(item)'><i class='fa fa-paste'></i>授权</p>
                  </td>
                </tr>
                </tbody>
              </table>

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


    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1" id="win">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">{{ winTitle }}</h4>
          </div>

          <form class="form-horizontal m-t">
            <div class="modal-body">
                <div class="form-group">
                  <label class="col-sm-3 control-label">用户编号：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.id" disabled="">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label"><span class="important">*</span>员工工号：</label>
                  <div class="col-sm-8">
                    <p>
                      <input type="text" class="form-control" v-model="params1.empNo" maxlength="20">
                    </p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">员工姓名：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.realName" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">组织编码：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.orgId" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">组织名称：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.orgName" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">组织全名称：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.fullname" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">组织全路径：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.fullpath" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">手机号：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.phone" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">邮箱：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.email" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">身份证号：</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="params1.idNumber" readonly>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">上传头像：</label>
                  <div class="col-sm-8">
                    <table class="table table-striped table-hover ">
                      <tr>
                        <td>
                          <img v-if="md5 || params1.picture" :src="titleImgUrl(imgUrlComputed)" width="64" height="64" >
                          <span v-if="!md5 && !params1.picture">图片预览</span>
                        </td>
                        <td>
                          <fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload"></fileuploadSingle>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

            <div class="modal-footer">
              <button v-if="winTitle=='新增'" type="button" class="btn btn-primary" @click="save()">保存</button>
              <button v-if="winTitle=='修改'" type="button" class="btn btn-primary" @click="update()">修改</button>
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
            </div>
          </form>

        </div>
      </div>
    </div>

    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1" id="winPermission">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWinPermission()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">{{ winTitle }}</h4>
          </div>
          <form class="form-horizontal m-t">
            <div class="modal-body">
              <div class="form-group">
                <label class="col-sm-3 control-label">用户编号：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params2.id" readonly>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">员工工号：</label>
                <div class="col-sm-8">
                  <p>
                    <input type="text" class="form-control" v-model="params2.empNo" readonly>
                  </p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">员工姓名：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params2.realName" readonly>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">配置角色：</label>
                <div class="col-sm-8">
                  <select2 :options="options.roles" v-model="params2.roleId" :select2Style="select2Style"></select2>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">数据权限：</label>
                <div class="col-sm-8" id="orgDiv">
                  <select2 :options="options.orgs" v-model="params2.salesDeptId" :select2Style="select2Style" @myMethod="callback_1"></select2>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="permission()">授权</button>
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWinPermission()">关闭</button>
            </div>
          </form>

        </div>
      </div>
    </div>
    <div v-show="isWinShow" class="modal-backdrop fade in" id="pop"></div>
    <div v-show="isPermissionWinShow" class="modal-backdrop fade in" id="pop2"></div>
  </div>
</template>

<script>

  //select2-引入select2组件
  import Select2 from './common/select2/select2.vue';
  import fileuploadSingle from './common/fileuploadSingle.vue';
  var vm;

  export default {
    name: 'user',
    components: {//select2-定义select2在当前组件中的名称
      'select2': Select2,
      fileuploadSingle
    },
    data : function () {
      return {
        select2Style: {//select2-style样式
          width: '100%'
        },
        winTitle: "",
        isWinShow: false,
        isPermissionWinShow: false,
        jumpNum : 1,
        recordsTotal: 0,
        searchParams: {
          start: 0,
          length: 10,
          realName: "",
          empNo: ""
        },
        failedMsg: '服务器异常，请联系管理员',
        options: {
          roles: [],
          orgs: []
        },
        params1: {
          id: "",
          name: "",
          realName: "",
          orgId: "",
          orgName: "",
          fullname: "",
          fullpath: "",
          phone: "",
          email: "",
          idNumber: "",
          empNo: "",
          picture: "",
          json: ""
        },
        params2: {
          id: "",
          empNo: "",
          realName: "",
          roleId: "",
          salesDeptId: "",
          salesDeptName: "",
        },
        items: [],
        md5: ""
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
        return this.recordsTotal % this.searchParams.length == 0 ? a : b
      },
      startNum: function () {
        return parseInt(this.searchParams.start) + 1;
      },
      imgUrlComputed: function () {
        if(this.md5){
          return this.md5;
        }
        if(this.params1.picture){
          return this.params1.picture;
        }
        return "";
      }
    },
    methods : {
      openWin: function () {
        this.isWinShow = true;
        $("#win").addClass("winShow");
      },
      closeWin : function () {
        this.params1.id = "";
        this.params1.empNo = "";
        this.params1.name = "";
        this.params1.realName = "";
        this.params1.orgId = "";
        this.params1.orgName = "";
        this.params1.fullname = "";
        this.params1.fullpath = "";
        this.params1.phone = "";
        this.params1.email = "";
        this.params1.idNumber = "";
        this.params1.picture = "";
        this.params1.json = "";
        this.isWinShow = false;
        $("#win").removeClass("winShow");
      },
      openWinPermission: function (item) {
        this.winTitle = '授权';
        this.params2.id = item.id
        this.params2.empNo = item.empNo;
        this.params2.realName = item.realName;
        this.params2.roleId = item.roleId;
        this.params2.salesDeptId = item.salesDeptId;
        this.params2.salesDeptName = item.salesDeptName;
        this.isPermissionWinShow = true;
        $("#winPermission").addClass("winShow");
      },
      closeWinPermission: function () {
        this.params2.id = "";
        this.params2.empNo = "";
        this.params2.realName = "";
        this.params2.roleId = "";
        this.params2.salesDeptId = "";
        this.params2.salesDeptName = "";
        this.isPermissionWinShow = false;
        $("#winPermission").removeClass("winShow");
      },
      openWinSave : function () {
        this.winTitle = '新增';
        this.openWin()
      },
      openWinEdit : function (item) {
        this.winTitle = '修改';
        this.params1.id = item.id;
        this.params1.empNo = item.empNo;
        this.params1.name = item.name;
        this.params1.realName = item.realName;
        this.params1.orgId = item.orgId;
        this.params1.orgName = item.orgName;
        this.params1.fullname = item.fullname;
        this.params1.fullpath = item.fullpath;
        this.params1.phone = item.phone;
        this.params1.email = item.email;
        this.params1.idNumber = item.idNumber;
        this.params1.picture = item.picture;
        this.params1.json = item.json;
        this.openWin();
      },
      callback_1: function(value, text){
        this.params2.salesDeptName = text;
      },
      initRoles : function () {//select2-初始化option
        var that = this;
        that.$utils.ajax(that)(basePath2+'role/options',{}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.roles = response.body.data;
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
      initOrgs : function () {//select2-初始化option
        var that = this;
        that.$utils.ajax(that)(basePath2+'org/options',{}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.options.orgs = response.body.data;
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
        that.$utils.ajax(that)(basePath2+'user/list',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data;
            that.recordsTotal = response.body.recordsTotal;
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
          console.log(response);
        },"get");
      },
      getEmp : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'org/findEmp2?empNo=' + that.params1.empNo,{}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.params1.realName = response.body.data.realName;
            that.params1.orgId = response.body.data.orgId;
            that.params1.orgName = response.body.data.orgName;
            that.params1.fullname = response.body.data.fullname;
            that.params1.fullpath = response.body.data.fullpath;
            that.params1.phone = response.body.data.phone;
            that.params1.email = response.body.data.email;
            that.params1.idNumber = response.body.data.idNumber;
            that.params1.picture = response.body.data.picture;

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
          console.log(response);
        },"get");

      },
      before: function () {
        if (parseInt(this.searchParams.start) > 1) {
          this.jumpNum = this.jumpNum - 1;
          this.searchParams.start = parseInt(this.searchParams.start) - parseInt(this.searchParams.length)
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }
        }
      },
      next: function () {
        if (parseInt(this.end) < parseInt(this.recordsTotal)) {
          this.jumpNum = this.jumpNum + 1;
          this.searchParams.start = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }
        }
      },
      jump: function (pageNo) {
        this.jumpNum = pageNo;
        this.searchParams.start = (pageNo - 1) * parseInt(this.searchParams.length);
        if(this.showBtn){
          this.searchTable();
        }else{
          this.initTable();
        }
      },
      first: function () {
        if (this.pageSize > 0) {
          this.searchParams.start = 0;
          this.jumpNum = 1;
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }
        }
      },
      final: function () {
        if (this.pageSize > 0) {
          this.searchParams.start = parseInt(this.pageSize-1) * parseInt(this.searchParams.length);
          this.jumpNum = this.pageSize;
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }

        }
      },
      search : function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      resetSearch : function () {
        this.searchParams.realName = "";
        this.searchParams.empNo = "";
        this.searchParams.start = 0;
        this.jumpNum = 1;
      },
      save : function () {
        var that = this;
        if(this.md5){
          that.params1.picture = this.md5;
        }
        this.$utils.ajax(that)(basePath2+'user', that.params1, function (response) {
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
          console.log(response);
        },"post");
      },
      update : function () {
        var that = this;
        if(this.md5){
          that.params1.picture = this.md5;
        }
        that.$utils.ajax(that)(basePath2+'user', that.params1, function (response) {
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
          console.log(response);
        },"put");
      },
      permission: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'user/permission?id='+that.params2.id+"&roleId="+that.params2.roleId+"&salesDeptId="+that.params2.salesDeptId+"&salesDeptName="+that.params2.salesDeptName,{}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.closeWinPermission();
            that.initTable();
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
        },"put");
      },
      remove : function (id) {
        if (confirm("确定要删除吗？")){
          var that = this;
          that.$utils.ajax(that)(basePath2+'user/'+id, {}, function (response) {
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
            console.log(response);
          },"delete");
        }
      },
      downloadFile : function (md5) {
        window.open(basePath4+"preview/"+md5);
      },
      titleImgUrl: function (md5) {
        return basePath4+"preview/"+md5;
      },
      watchSearchParams: function () {
        this.$watch('searchParams.empNo', function (newVal, oldVal) {
          this.search();
        });
        this.$watch('searchParams.realName', function (newVal, oldVal) {
          this.search();
        });
      },
    },
    mounted:function () {
      vm = this;
      this.initTable();
      this.initRoles();
      this.initOrgs();
      this.watchSearchParams();
      // 监听员工号,并延迟500毫秒执行查询操作
      vm.$watch('params1.empNo', function (newVal, oldVal) {
        var self = this;
        setTimeout(function () {
          self.getEmp();
        }, 500)
      })
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
  .winShow{
    display : block !important;
  }
  .wrapper{
    height: 100%;
  }
  .margin{
    margin-top: 7px;
  }
  .border{
    border-radius: 3px;
  }
  .tableUser{
    margin-top: 10px;
    margin-bottom: 0px;
  }
  .aa {
    padding:5px;
    text-align: center;
  }
  .zindex {
    z-index: -10;
  }
</style>
