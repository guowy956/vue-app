<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            <h5>报表管理</h5>
          </div>
          <div class="ibox-content">
            <button class='btn btn-info' @click='openWinSave()'><i class='fa fa-paste'></i>新增</button>
            <table id="user_table" class="table table-striped table-bordered table-hover">
              <thead>
              <tr>
                <th width="4%">ID</th>
                <th width="8%">报表名称</th>
                <th width="8%">角色名称</th>
                <th width="35%">返回结果字段</th>
                <th width="20%">检索字段</th>
                <th width="10%">按钮</th>
                <th width="15%">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in items">
                <td>{{item.id}}</td>
                <td>{{getTitleName(item.reportName)}}</td>
                <td>{{item.name}}</td>
                <td>{{item.resultColumnsNames}}</td>
                <td>{{item.queryColumnsNames}}</td>
                <td>{{getOperationName(item.operation)}}</td>
                <td>
                  <button class="btn btn-info" @click="openWinEdit(item)"><i class="fa fa-paste"></i>修改</button>
                  <button class="btn btn-info" @click="remove(item.id)"><i class="fa fa-paste"></i>删除</button>
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
    <div class="modal inmodal" id="myModal" tabindex="-1" role="dialog" aria-hidden="true" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header" style="padding: 10px">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()">
              <span aria-hidden="true">×</span><span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal m-t">
              <div class="form-group">
                <label class="col-sm-2 titleName">配置角色：</label>
                <div class="col-sm-6" id="roleDiv">
                  <select2 :options="options.roles" v-model="params.roleId" :select2Style="select2Style" placeholder="== 请选择 =="></select2>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 titleName">预设定类型：</label>
                <div class="col-sm-9" id="titleName">
                  <label class="titleDistance">
                    <input type="radio" name="info" value="1" id="repo_1" class="distance" @click="reportConfiguration(1)" checked/>月还报表
                  </label>
                  <label class="titleDistance">
                    <input type="radio" name="info" value="2" id="repo_2" class="distance" @click="reportConfiguration(2)" />逾期报表
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 titleName">字段类型：</label>
                <div class="col-sm-9" id="wrap">
                  <div id="tit">
                    <!--tab选项-->
                    <span class="tabShow" :class="index == 0 ? 'actives' : ''" v-for="(showItem, index) in showList" @click="tabChange()">
                      <a style="color: #666">
                        <input type="checkbox" @click="selectAll('locking')" :id="showItem.id" class="distance" />{{showItem.name}}
                      </a>
                    </span>
                  </div>
                  <ul id="con">
                    <!--tab选项所对应内容-->
                    <li :style="index == 0 ? 'display: block' : 'display: none'" v-for="(showItem, index) in showList">
                      <label class="titleDistance" v-for="showChild in showItem.child">
                        <input type="checkbox" :value="showChild.id" :id="showChild.id" class="distance" @change="selectShowChild()"/>{{showChild.name}}
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 titleName">检索字段：</label>
                <div class="col-sm-9" id="retrieval">
                  <span class="distance" v-for="(findItem, index) in findList">
                    <label class="titleDistance">
                      <input type="checkbox" name="find" :value="findItem.id" :id="findItem.id"  class="distance"/>{{findItem.name}}
                    </label>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 titleName"></label>
                <span style="color: #337ab7;margin-left:15px;">交易状态、交易结果、交易时间、订单完成时间，因贷后没有提供查询条件请不要配置</span>
              </div>
              <div class="form-group">
                <label class="col-sm-2 titleName">按钮：</label>
                <div class="col-sm-9" id="buttons">
                  <label><input type="checkbox" name="info" value="1" id="button_1" class="distance" />划扣</label>
                  <label><input type="checkbox" name="info" value="2" id="button_2" class="distance" />导出</label>
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
            <button type="button" class="btn btn-primary" :class="{hide_it:isHideUpdateBtn}" @click="update()" :disabled="buttonDisabled.popUpdate">修改</button>
            <button type="button" class="btn btn-primary" :class="{hide_it:isHideSaveBtn}" @click="save()" :disabled="buttonDisabled.popSave">提交</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" id="pop" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]"></div>
  </div>
</template>

<script>
  import fileuploadSingle from './common/fileuploadSingle.vue';
  import sysResource from './common/sysResource.vue';
  import select2 from './common/select2/select2.vue';

  export default {
    name: 'reportManager',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    data : function () {
      return {
        flag:0,
        checkedFileMd5 :[],
        select2Style: {//select2-style样式
          width: '100%'
        },
        winTitle: '新增',
        modalShow: true,
        failedMsg: '服务器异常，请联系管理员',
        options: {
          roles: []
        },
        showParams: {
          modalShow: true,
          devStyle: 'devStyle',
          winShow: 'winShow',
          repaymentStatus: "",
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          deleteLine: false
        },
        params: {
          id: "",
          operation: "string",
          queryColumns: "string",
          reportName: "string",
          resultColumns: "string",
          roleId: 0
        },
        items: [],
        jumpNum: 1,
        recordsTotal: 0,
        searchParams: {
          start: 0,
          length: 10
        },
        isHideSaveBtn: true,
        isHideUpdateBtn: true,
        showList: [],
        findList: [],
        operationUtil: {
          "1": "划扣",
          "2": "导出"
        },
        titleUtil: {
          "1": "月还报表",
          "2": "逾期报表"
        }

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
      }
    },
    methods : {
      test: function () {
//        字段类型
        //this.getResultColumn();
//        检索字段
        //this.getRetrievalColumn();
//        按钮
        this.getButtonColumn();
        this.getTitleNameColumn();
      },
      getTitleNameColumn: function () {
        var res = "";
        var arr = $("#titleName").find("input:checked");
        if(arr){
          $(arr).each(function (i, item) {
            res += item.value;
            if(i<arr.length-1){
              res += ",";
            }
          });
        }
        return res;
      },
      getResultColumn: function () {
        var res = "";
        var arr = $("#wrap").find("input:checked");
        if(arr){
          $(arr).each(function (i, item) {
            res += item.value;
            if(i<arr.length-1){
              res += ",";
            }
          });
        }
        return res;
      },
      getRetrievalColumn: function () {
        var res = "";
        var arr = $("#retrieval").find("input:checked");
        if(arr){
          $(arr).each(function (i, item) {
            res += item.value;
            if(i<arr.length-1){
              res += ",";
            }
          });
        }
        return res;
      },
      getButtonColumn: function () {
        var res = "";
        var arr = $("#buttons").find("input:checked");
        if(arr){
          $(arr).each(function (i, item) {
            res += item.value;
            if(i<arr.length-1){
              res += ",";
            }
          });
        }
        return res;
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
      getOperationName: function (str) {
        var that = this;
        var operationNames = "";
        if(str){
          var arr = str.split(",");
          $(arr).each(function (i, item) {
            var name = that.operationUtil[item];
            if(!name){
              name = "-"
            }
            operationNames += name;
            if(i<arr.length-1){
              operationNames += ",";
            }
          });
        }
        return operationNames;
      },
      getTitleName: function (str) {
        var that = this;
        var titleNames = "";
        if(str){
          var arr = str.split(",");
          $(arr).each(function (i, item) {
            var name = that.titleUtil[item];
            if(!name){
              name = "-"
            }
            titleNames += name;
            if(i<arr.length-1){
              titleNames += ",";
            }
          });
        }
        return titleNames;
      },
      initTable : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'reportInfo/list',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data.data;
            that.recordsTotal = response.body.data.recordsTotal;
            that.getAll();
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
      search : function () {
        this.searchParams.start = 0
        this.initTable()
      },
      resetSearch : function () {
        this.searchParams.realName = ""
        this.searchParams.empNo = ""
      },
      openWin : function () {
        this.getAll();
        this.showParams.modalShow = false;
      },
      openWinSave : function () {
        this.winTitle = '新增';
        this.isHideSaveBtn = false
        this.isHideUpdateBtn = true
        this.openWin()
        this.reportConfiguration(1);
      },
      openWinEdit : function (item) {
        var that = this;
        that.winTitle = '修改';
        that.params.queryColumns = item.queryColumns;
        that.params.resultColumns = item.resultColumns;
        that.params.operation = item.operation;
        that.params.reportName = item.reportName;
        that.params.roleId = item.roleId;
        that.showOperationScanning("1");
        that.showResultColumnsScanning("1");
        that.showQueryColumnsScanning("1");
        that.showReportNameScanning("1");
        that.params.id = item.id;
        that.params.name = item.name;
        that.isHideSaveBtn = true
        that.isHideUpdateBtn = false

        that.openWin(item)
      },
      selectShowChild:function(){
        var that =  this;
        var flags =  that.flag+1
        $("#"+flags).prop("checked",true);
      },
      showOperationScanning: function (index) {
          var requiredScanning = [];
        requiredScanning = this.params.operation;
        if(requiredScanning){
          var arr = requiredScanning.split(",");
          $(arr).each(function(i,item){
            if(index == 1){
              $("#button_"+item).prop("checked",true);
            }else{
              $("#button_"+item).prop("checked",false);
            }
          });
        }
      },
      showResultColumnsScanning: function (index) {
          var that = this;
        var requiredScanning = [];
        requiredScanning= this.params.resultColumns;
        if(requiredScanning){
          var arr = requiredScanning.split(",");
          $(arr).each(function(i,item){
              console.log(item);
            if(index ==1){
              $("#"+item).prop("checked",true);
            }else{
              $("#"+item).prop("checked",false);
            }
          });
        }
      },
      showQueryColumnsScanning: function (index) {
        var requiredScanning = [];
        requiredScanning = this.params.queryColumns;
        if(requiredScanning){
          var arr = requiredScanning.split(",");
          $(arr).each(function(i,item){
              console.log(item);
            if(index == 1){
              $("#"+item).prop("checked",true);
            }else{
              $("#"+item).prop("checked",false);
            }
          });
        }
      },
      showReportNameScanning: function (index) {
        var requiredScanning = [];
        requiredScanning = this.params.reportName;
        if(requiredScanning){
          var arr = requiredScanning.split(",");
          $(arr).each(function(i,item){
            if(index == 1){
              $("#repo_"+item).prop("checked",true);
            }else{
              $("#repo_"+item).prop("checked",false);
            }
          });
        }
      },
      clearResult:function(){
        var that = this;
        that.params.queryColumns = "";
        that.params.resultColumns = "";
        that.params.operation = "";
        that.params.reportName = "";
        that.params.roleId = "";
        that.params.id = "";
        that.params.name = "";
      },
      clearWin : function (flag) {
        var that = this;
        var numbersTag = 0;
        for(var i = 0;i < this.showList.length;i++){
          numbersTag = numbersTag + this.showList[i].child.length;
          $("#"+(i+1)).prop("checked",false);
        }
        for(var i = 0;i < that.findList.length;i++){
          $("#"+(that.findList[i].id)).prop("checked",false);
        }
        for(var j = 0;j < numbersTag;j++){
          $('#con li input:checkbox').eq(j)[0].checked = false;
        }
        that.showOperationScanning("2");
//        that.showResultColumnsScanning("2");
        that.showQueryColumnsScanning("2");
        if(flag != null){
          if(flag == 1){
            $("#repo_"+flag).prop("checked",true);
          }else{
            $("#repo_"+flag).prop("checked",true);
          }
        }else{
          that.showReportNameScanning("2");
        }
        this.errors.clear();
      },
      closeWin : function () {
        this.clearWin()
        this.clearResult()
        this.showParams.modalShow = true;
      },
      getAll : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'reportColumnInfo', {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.showList = response.body.data.showList;
            that.findList = response.body.data.findList;
            console.log(that.findList);
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
        that.params.queryColumns = that.getRetrievalColumn();
        that.params.resultColumns = that.getResultColumn();
        that.params.operation = that.getButtonColumn();
        that.params.reportName = that.getTitleNameColumn();
        this.$utils.ajax(that)(basePath2+'reportInfo', that.params, function (response) {
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
        that.params.queryColumns = that.getRetrievalColumn();
        that.params.resultColumns = that.getResultColumn();
        that.params.operation = that.getButtonColumn();
        that.params.reportName = that.getTitleNameColumn();
        that.$utils.ajax(that)(basePath2+'reportInfo', that.params, function (response) {
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
          that.$utils.ajax(that)(basePath2+'reportInfo?id='+id, {}, function (response) {
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
      },
      selectAll:function(flag){
          if(flag == "locking"){
          var that = this;
          var i = $(this).index();
          switch (that.flag){
            case 0:
              var j=8;
              for(var k = 0;k < j;k++){
                if($('#tit span input:checkbox').eq(that.flag)[0].checked == false){
                  $('#con li input:checkbox').eq(k)[0].checked = false;
                }else{
                  $('#con li input:checkbox').eq(k)[0].checked = true;
                }
              }
              break;
            case 1:
              var j=32;
              for(var t = 8;t < j;t++){
                if($('#tit span input:checkbox').eq(that.flag)[0].checked == false){
                  $('#con li input:checkbox').eq(t)[0].checked = false;
                }else{
                  $('#con li input:checkbox').eq(t)[0].checked = true;
                }
              }
              break;
            case 2:
              var j=39
              for(var y = 32;y < j;y++){
                if($('#tit span input:checkbox').eq(that.flag)[0].checked == false){
                  $('#con li input:checkbox').eq(y)[0].checked = false;
                }else{
                  $('#con li input:checkbox').eq(y)[0].checked = true;
                }
              }
              break;
            case 3:
              var j=54
              for(var d = 39;d < j;d++){
                if($('#tit span input:checkbox').eq(that.flag)[0].checked == false){
                  $('#con li input:checkbox').eq(d)[0].checked = false;
                }else{
                  $('#con li input:checkbox').eq(d)[0].checked = true;
                }
              }
              break;
            case 4:
              var j=70
              for(var g = 54;g < j;g++){
                if($('#tit span input:checkbox').eq(that.flag)[0].checked == false){
                  $('#con li input:checkbox').eq(g)[0].checked = false;
                }else{
                  $('#con li input:checkbox').eq(g)[0].checked = true;
                }
              }
              break;
          }
          }
      },
      tabChange: function () {
        var that  = this;
        $('#tit span').click(function() {
          var i = $(this).index();
          that.flag = i;
          $(this).addClass('actives').siblings().removeClass('actives');
          $('#con li').eq(i).show().siblings().hide();
        });
      },
      reportConfiguration:function(flag){

        var that = this;
        that.clearWin(flag);
        $('#con li input:checkbox').eq(0)[0].checked = true;
        $('#con li input:checkbox').eq(5)[0].checked = true;
        $('#con li input:checkbox').eq(6)[0].checked = true;
        $('#con li input:checkbox').eq(7)[0].checked = true;
        $('#con li input:checkbox').eq(15)[0].checked = true;
        $('#con li input:checkbox').eq(17)[0].checked = true;
        $('#con li input:checkbox').eq(21)[0].checked = true;
        $('#con li input:checkbox').eq(23)[0].checked = true;
        $('#con li input:checkbox').eq(26)[0].checked = true;
        $('#con li input:checkbox').eq(27)[0].checked = true;
        $('#con li input:checkbox').eq(34)[0].checked = true;
        $('#con li input:checkbox').eq(35)[0].checked = true;
        $('#con li input:checkbox').eq(36)[0].checked = true;
//        $('#con li input:checkbox').eq(38)[0].checked = true;
        $('#con li input:checkbox').eq(39)[0].checked = true;
        $('#con li input:checkbox').eq(40)[0].checked = true;
        $('#con li input:checkbox').eq(42)[0].checked = true;
        $('#con li input:checkbox').eq(46)[0].checked = true;
        $('#con li input:checkbox').eq(48)[0].checked = true;
        $('#con li input:checkbox').eq(8)[0].checked = true;
        $("#1").prop("checked",true);
        $("#2").prop("checked",true);
        $("#3").prop("checked",true);
        $("#4").prop("checked",true);
        $("#75").prop("checked",true);
        $("#76").prop("checked",true);
        $("#77").prop("checked",true);
        $("#78").prop("checked",true);
        $("#79").prop("checked",true);
        $("#80").prop("checked",true);
        $("#83").prop("checked",true);
        $("#84").prop("checked",true);
        $("#85").prop("checked",true);






        if(flag ==1){
          $("#86").prop("checked",true);
          $("#87").prop("checked",true);
          $("#88").prop("checked",true);
          $("#89").prop("checked",true);
            $('#con li input:checkbox').eq(31)[0].checked = true;
            $('#con li input:checkbox').eq(32)[0].checked = true;
            $('#con li input:checkbox').eq(33)[0].checked = true;
            $('#con li input:checkbox').eq(56)[0].checked = true;
            $('#con li input:checkbox').eq(61)[0].checked = true;
            $('#con li input:checkbox').eq(62)[0].checked = true;
            $('#con li input:checkbox').eq(63)[0].checked = true;
            $('#con li input:checkbox').eq(64)[0].checked = true;
            $('#con li input:checkbox').eq(65)[0].checked = true;
            $('#con li input:checkbox').eq(66)[0].checked = true;
            $('#con li input:checkbox').eq(67)[0].checked = true;
            $('#con li input:checkbox').eq(68)[0].checked = true;
          $("#5").prop("checked",true);
          }else{
          $("#90").prop("checked",true);
          $("#91").prop("checked",true);
          $("#92").prop("checked",true);
          $("#93").prop("checked",true);
            $('#con li input:checkbox').eq(11)[0].checked = true;
            $('#con li input:checkbox').eq(12)[0].checked = true;
            $('#con li input:checkbox').eq(22)[0].checked = true;
            $('#con li input:checkbox').eq(24)[0].checked = true;
            $('#con li input:checkbox').eq(25)[0].checked = true;
            $('#con li input:checkbox').eq(41)[0].checked = true;
            $('#con li input:checkbox').eq(43)[0].checked = true;
            $('#con li input:checkbox').eq(44)[0].checked = true;
            $('#con li input:checkbox').eq(45)[0].checked = true;
            $('#con li input:checkbox').eq(47)[0].checked = true;
            $('#con li input:checkbox').eq(49)[0].checked = true;
            $('#con li input:checkbox').eq(50)[0].checked = true;
            $('#con li input:checkbox').eq(51)[0].checked = true;
            $('#con li input:checkbox').eq(52)[0].checked = true;
          }
      },
    },
    mounted:function () {
      this.getAll();
      this.initTable();
      this.initRoles();
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
  .wrapper{
    height: 100%;
  }
  .titleName{
    text-align: right;
  }
  .titleDistance{
    margin-right: 10px;
  }
  .distance{
    margin-right: 5px;
  }
  #tit{
    height: 35px;
    border-bottom: 1px solid #ddd;
  }
  #con{
    margin-top: 10px;
  }
  .actives{
    color: #999;
    border-bottom: none;
    background-color: #fff;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  .tabShow{
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }
  .hide_it{
    display : none;
  }
</style>

