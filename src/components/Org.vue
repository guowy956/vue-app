<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
                <h5>组织管理</h5>
            </div>
            <div class="ibox-content" style="padding: 5px">
              <form id="searchForm" href="#">
              <table class="table tableOrg">
                <tr>
                  <td class="col-sm-4">
                    <label class="col-sm-4 margin">组织：</label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control border" id="roleSelectOrgName" readonly v-on:click="initOrgTree(1)" placeholder="请点击选择组织"/>
                      <div id="orgSelectOrgTreeContent" class="menuContent" style="display:none;">
                          <ul id="orgSelectOrgTreeId" class="ztree" style="margin-top:0; width:160px;z-index: 9999;position: absolute;"></ul>
                      </div>
                    </div>
                  </td>
                  <td class="col-sm-4">
                    <div class="col-sm-12">
                      <button type="button" class="btn btn-info" v-on:click="search()">查询</button>
                      <button type="button" class="btn btn-info" v-on:click="resetSearch()">重置</button>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
              </form>
            </div>
            <div class="ibox-content">
                <button class='btn btn-info' v-on:click='openWinSave()'><i class='fa fa-paste'></i>新增</button>
                <table id="org_table" class="table table-striped table-bordered table-hover ">
                    <thead>
                        <tr>
                            <th width="5%">编号</th>
                            <th width="15%">组织编号</th>
                            <th width="15%">组织名称</th>
                            <th width="20%">组织全名称</th>
                            <th width="20%">组织全路径</th>
                            <th width="7%">编码</th>
                            <th width="18%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items">
                            <td>{{item.id}}</td>
                            <td>{{item.orgId}}</td>
                            <td>{{item.orgName}}</td>
                            <td>{{item.orgFullname}}</td>
                            <td>{{item.orgFullpath}}</td>
                            <td>{{item.code}}</td>
                            <td>
                                <button class="btn btn-info" @click="openWinEdit(item)"><i class="fa fa-paste"></i>修改</button>
                                <button class="btn btn-info" @click="remove(item.id)"
                                        :disabled="buttonDisabled.deleteLine"><i class="fa fa-paste"></i>删除</button>
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
    <div class="modal inmodal in" tabindex="-1" id="win">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" v-on:click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">新增编码</h4>
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
                <label class="col-sm-3 control-label"><span class="important">*</span>组织机构：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="roleSelectOrgName2" readonly @click="initOrgTree(2)" placeholder="请点击选择组织"/>
                  <div id="orgSelectOrgTreeContent2" class="menuContent" style="display:none;">
                    <ul id="orgSelectOrgTreeId2" class="ztree" style="margin-top:0; width:160px;z-index: 9999;position: absolute;"></ul>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label"><span class="important">*</span>编码：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" data-vv-as="编码" v-model="params.code" placeholder="请输入编码" maxlength="11">
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
    <div class="modal-backdrop fade in" id="pop" style="display: none"></div>
  </div>
</template>

<script>

var vm;

export default {
    name: 'org',
    data : function () {
        return {
            newPageSize:0,
            jumpNum : 1,
            params : {
                id : 0,
                orgFullname : "",
                orgFullpath : "",
                orgId : "",
                orgName : "",
                code : ""
            },
            isDevStyle : true,          //是否为正式环境样式，true:正式环境样式，false：调试模式样式
            items : [],
            recordsTotal : 0,
            searchParams : {
                start : 0,
                length : 10,
                orgId : "",
                code: ""
            },
            buttonDisabled: {
              popSave: false,
              popUpdate: false,
              deleteLine: false
            },
            isHideSaveBtn : true,
            isHideUpdateBtn : true,
            isVal : true,               //是否验证
            org : {
              tag : "",
              input : "",
              div : "",
              ul : ""
            }
        }
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
        initTable : function () {
          var that = this;
          that.$utils.ajax(that)(basePath2+'org/list',this.searchParams, function (response) {
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
            that.$utils.alert("fail");
          },"get");
        },
      before : function () {
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
            this.searchParams.orgId = ""
            $("#roleSelectOrgName").val("");
            //$('.cov-datepicker').eq(0).val("");
        },
        openWin : function () {
            $('#win').attr("style","display: block;");
            $('#pop').attr("style","display: block;");
        },
        openWinSave : function () {
            vm.isHideSaveBtn = false
            vm.isHideUpdateBtn = true
            this.openWin()
        },
        openWinEdit : function (item) {
            vm.isHideSaveBtn = true
            vm.isHideUpdateBtn = false
            vm.params.id = item.id
            vm.params.orgFullname = item.orgFullname
            vm.params.orgFullpath = item.orgFullpath
            vm.params.orgId = item.orgId
            vm.params.orgName = item.orgName
            vm.params.code = item.code
            $("#roleSelectOrgName2").val(item.orgName)
            this.openWin()
        },
        clearWin : function () {
            vm.params.id = 0
            vm.params.orgFullname = ""
            vm.params.orgFullpath = ""
            vm.params.orgId = ""
            vm.params.orgName = ""
            vm.params.code = ""
            $("#roleSelectOrgName2").val("")
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
//            alert("请正确填写必填项");
          });
        },
        save : function () {
          this.buttonDisabled.popSave = true; 
            var that = this;
            that.$utils.ajax(that)(basePath2+'org',vm.params, function (response) {
              if(typeof (response.body) === 'string'){
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                that.closeWin();
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
            that.$utils.ajax(that)(basePath2+'org', that.params, function (response) {
              if(typeof (response.body) === 'string'){
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                that.closeWin();
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
          this.buttonDisabled.popUpdate = false;
        },
        remove : function (id) {
          this.buttonDisabled.deleteLine = true;
            if (confirm("确定要删除吗？")){
              var that = this;
              that.$utils.ajax(that)(basePath2+'org?id='+id, null,function(response) {
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
                }, function(response) {
                    that.$utils.alert("fail")
                },"delete");
            }
          this.buttonDisabled.deleteLine = false;
        },
        initOrgTree : function (tag) {
          var accessToken = this.$utils.getLocalData("accessToken");
          vm.org.tag = tag;
          if(vm.org.tag == 1){
            vm.org.input = "roleSelectOrgName";
            vm.org.div = "orgSelectOrgTreeContent";
            vm.org.ul = "orgSelectOrgTreeId";
          }
          if(vm.org.tag == 2){
            vm.org.input = "roleSelectOrgName2";
            vm.org.div = "orgSelectOrgTreeContent2";
            vm.org.ul = "orgSelectOrgTreeId2";
          }

          var settingPost = {
              async: {
                  enable: true,
                  url: basePath2 + "org/orgTree?appKey="+appKey+"&appSecret="+appSecret+"&accessToken="+accessToken,   //访问cas，测试环境
                  autoParam:["id=pid", "name=n", "level=lv", "appKey="+appKey, "appSecret="+appSecret], //访问cas，测试环境
                  type:"get",
                  dataType:'json',
                  dataFilter: this.filter
              },
              view: {
                  dblClickExpand: false
              },
              data: {
                  simpleData: {
                      enable: true
                  }
              },
              callback: {
                  onClick: this.onClickOrg,
                  onAsyncSuccess: this.zTreeOnAsyncSuccess
              }
          };
          $.fn.zTree.init($("#"+vm.org.ul), settingPost);
          this.showSelect();
        },
        zTreeOnAsyncSuccess : function (event, treeId, treeNode, msg) {
            response_status_handler(msg.status);
        },
        onClickOrg : function (e, treeId, treeNode) {
              $("#"+vm.org.input).val(treeNode.name);
              if(vm.org.tag == 1){
                vm.searchParams.orgId = treeNode.id;
              }
              if(vm.org.tag == 2){
                vm.params.orgFullname = treeNode.org.fullname
                vm.params.orgFullpath = treeNode.org.fullpath
                vm.params.orgId = treeNode.id
                vm.params.orgName = treeNode.name
              }
              $("#"+vm.org.div).hide();
        },
        showSelect : function () {
             var orgObj = $("#"+vm.org.input);
             var orgOffset = $("#"+vm.org.input).offset();
             $("#"+vm.org.div).css({left:orgOffset.left + "px", top:orgOffset.top + orgObj.outerHeight() + "px"});
             $("#"+vm.org.ul).css({width:orgObj.outerWidth() + "px"});
             $("#"+vm.org.div).show();
             $("body").bind("mousedown", this.onBodyDown);
         },
         onBodyDown : function (event) {
             if (!(event.target.id == vm.org.input || event.target.id == vm.org.div || $(event.target).parents("#"+vm.org.div).length>0)) {
                 this.hideMenu()
             }
         },
         hideMenu : function () {
             $("#"+vm.org.div).hide();
             $("body").unbind("mousedown", this.onBodyDown);
         },
         filter : function (treeId, parentNode, childNodes) {
             if (!childNodes) return null;
             for (var i=0, l=childNodes.length; i<l; i++) {
                 childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
             }
             return childNodes;
         },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.orgId', function (newVal, oldVal) {
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

  .devStyle{
    display : none;
  }

  .debuggerStyle{
    color : red;
    font-weight : bolder;
  }
  .tableOrg{
    margin-bottom: 0px;
  }
  .hide_it{
    display : none;
  }
  .wrapper{
    height: 100%;
  }
  .errors {
      color: #f00;
      display: block;
    }
</style>
