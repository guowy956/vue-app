<template>
  <!--<h1>变更组织</h1>-->
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>字典</h5>
            </div>
            <div class="ibox-content col-md-12">
              <div class="col-md-3" style="margin-left: 8%">
                <ul id="nowDict" class="ztree"></ul>
              </div>
              <div class="col-md-7">
                <div class="form-horizontal m-t" id="postForm">
                  <input v-model="params.parentId" type="hidden" class="form-control">
                  <input v-model="params.id" type="hidden" class="form-control">
                  <span class="debuggerStyle"
                        v-bind:class="{devStyle:isDevStyle}">parentId:{{ params.parentId }}</span><br>
                  <span class="debuggerStyle" v-bind:class="{devStyle:isDevStyle}">id:{{ params.id }}</span>
                  <div class="form-group">
                    <label class="col-sm-3 control-label">父节点：</label>
                    <div class="col-sm-9">
                      <input type="text" v-model="parentName" class="form-control" disabled="">
                      <span class="debuggerStyle"
                            v-bind:class="{devStyle:isDevStyle}">parentName:{{ parentName }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"><span class="important">*</span>节点编码：</label>
                    <div class="col-sm-9">
                      <p>
                        <input type="text" v-model="params.dictCode" class="form-control" data-vv-as="节点编码"
v-validate="'required|min:2|max:64'" :class="{'input': true, 'is-danger': errors.has('paramsictCode') }" name="paramsDictCode" maxlength="65"/>
<span v-show="errors.has('paramsDictCode')" class="help is-danger">{{ errors.first('paramsDictCode') }}</span>
                        <span class="errors" v-show="!validation.dictCode && isVal">节点编码长度为1~18位</span>
                        <span class="debuggerStyle" v-bind:class="{devStyle:isDevStyle}">dictCode:{{ params.dictCode}}</span>
                      </p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-3 control-label"><span class="important">*</span>节点名称：</label>
                    <div class="col-sm-9">
                      <p>
                        <input type="text" v-model="params.dictName" class="form-control" data-vv-as="节点名称"
v-validate="'required|min:2|max:32'" :class="{'input': true, 'is-danger': errors.has('paramsDictName') }" name="paramsDictName" maxlength="33"/>
<span v-show="errors.has('paramsDictName')" class="help is-danger">{{ errors.first('paramsDictName') }}</span>
                        <span class="errors" v-show="!validation.dictName && isVal">节点名称长度为1~18位</span>
                        <span class="debuggerStyle" v-bind:class="{devStyle:isDevStyle}">dictName:{{ params.dictName }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-3">排序：</label>
                    <div class="col-sm-9">
                      <input type="text" v-model="params.dictLevel" class="form-control" maxlength="11">
                      <span class="errors" v-show="!validation.dictLevel && isVal">1~5位整数</span>
                      <span class="debuggerStyle" v-bind:class="{devStyle:isDevStyle}">dictLevel:{{ params.dictLevel }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-3">描述：</label>
                    <div class="col-sm-9">
                      <textarea v-model="params.discription" class="form-control"></textarea>
                      <span class="errors" v-show="!validation.discription && isVal">0~255个字符</span>
                      <span class="debuggerStyle" v-bind:class="{devStyle:isDevStyle}">discription:{{ params.discription }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-3"><span class="important">*</span>父/子节点:</label>
                    <div class="col-sm-9">
                      <select v-model="params.isParent" class="form-control" data-vv-as="请选择"
                              v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('paramsIsParent') }" name="paramsIsParent">
                        <option v-for="option in options" v-bind:value="option.value">
                          {{ option.text }}
                        </option>
                      </select>
                      <span v-show="errors.has('paramsI9sParent')" class="help is-danger">{{ errors.first('paramsIsParent') }}</span>
                      <span class="errors" v-show="!validation.isParent && isVal">父/子节点不能为空</span>
                      <span class="debuggerStyle" v-bind:class="{devStyle:isDevStyle}">isParent:{{ params.isParent }}</span>
                    </div>
                  </div>
                  <div class="form-group org_btn" style="text-align: center">
                    <button v-if="isShowLeafBtn" class="btn btn-primary" v-on:click="showLeaf()"
                            :disabled="buttonDisabled.addSave">新增</button>
                    <button v-if="isShowSaveBtn" class="btn btn-primary" v-on:click="saveVeeValidate()"
                            :disabled="buttonDisabled.popSave">保存</button>
                    <button v-if="isShowUpdateBtn" class="btn btn-primary" v-on:click="updateVeeValidate()"
                            :disabled="buttonDisabled.popSave">修改</button>
                    <button v-if="isShowDeleteBtn" class="btn btn-primary" v-on:click="remove()"
                            :disabled="buttonDisabled.deleteLine">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var dictLevelRE = /^[0-9]{1,5}$/
  var vm;
  export default {
    name: 'dictionary',
    data: function () {
      return {
        params: {
          parentId: "",
          id: "0",
          dictCode: "",
          dictName: "",
          dictLevel: "",
          discription: "",
          isParent: "NULL"
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          deleteLine: false,
          addSave: false
//              examine: false
        },
        parentName: "",
        options: [
          {text: '请选择', value: "NULL"},
          {text: '叶子', value: false},
          {text: '父节点', value: true}
        ],
        isDevStyle: true,			//是否为正式环境样式，true:正式环境样式，false：调试模式样式
        isShowLeafBtn: false,		//是否显示新增按钮
        isShowSaveBtn: false,		//是否显示保存按钮
        isShowUpdateBtn: false,	//是否显示修改按钮
        isShowDeleteBtn: false,		//是否显示删除按钮
        isParentNode: '',
        isVal: false               //是否验证
      }
    },
    computed: {
      validation: function () {
        return {
          dictCode: this.params.dictCode.length >= 1 && this.params.dictCode.length <= 18,
          dictName: this.params.dictName.length >= 1 && this.params.dictName.length <= 18,
          dictLevel: dictLevelRE.test(this.params.dictLevel),
          discription: !this.params.discription || this.params.discription.length <= 255,
          isParent: this.params.isParent == true || this.params.isParent == false
        }
      },
      isValid: function () {
        var validation = this.validation
        return Object.keys(validation).every(function (key) {
          return validation[key]
        })
      }
    },
    methods: {
      showLeaf: function () {
        console.log("1=" + this.buttonDisabled.addSave) ;
        this.buttonDisabled.addSave = true; 
        console.log("2=" + this.buttonDisabled.addSave);
        vm.params.parentId = vm.params.id;
        vm.parentName = vm.params.dictName;
        vm.params.id = "0";
        vm.params.dictCode = "";
        vm.params.dictName = "";
        vm.params.dictLevel = "";
        vm.params.discription = "";
        vm.params.isParent = "NULL";
        vm.isShowLeafBtn = false;
        vm.isShowSaveBtn = true;
        vm.isShowUpdateBtn = false;
        vm.isShowDeleteBtn = false;
        vm.isParentNode = false;	//点击的是子节点
        this.buttonDisabled.addSave = false;
      },
      saveVeeValidate: function () {
        var that = this;
        this.$validator.validateAll().then(() => {
          that.save();
        }).catch(() => {
//          alert("请正确填写必填项");
        });
      },
      save: function () {
        this.buttonDisabled.popSave = true; 
        if (!this.isValid) {
          return;
        }
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'dictionary', vm.params, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.refresh()
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
        }, "post");
        this.buttonDisabled.popSave = false;
        this.errors.clear();
      },
      updateVeeValidate: function () {
        var that = this;
        this.$validator.validateAll().then(() => {
          that.update();
        }).catch(() => {
//          alert("请正确填写必填项");
        });
      },
      update: function () {
        this.buttonDisabled.popUpdate = true;
        if (!this.isValid) {
          return;
        }
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'dictionary', vm.params, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.refresh()
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
        }, "put");
        this.buttonDisabled.popUpdate = false;
      },
      remove: function () {
        this.buttonDisabled.deleteLine = true;
        var that = this;
        if (vm.isParentNode) {
          if (confirm("如果删除父节点，该节点的所有子节点也将被删除，确定要删除吗？")) {
            that.$utils.ajax(that)(basePath2 + 'dictionary/' + vm.params.id, {}, function (response) {
              if (typeof (response.body) === 'string') {
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == 200) {
                that.refresh()
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
            }, "delete");
          }
        } else {
          if (confirm("确定要删除吗？")) {
            that.$utils.ajax(that)(basePath2 + 'dictionary/' + vm.params.id, {}, function (response) {
              if (typeof (response.body) === 'string') {
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                that.refresh();
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
            }, "delete");
            this.buttonDisabled.deleteLine = false;
          }
        }
      },
      initTree: function () {
        var accessToken = this.$utils.getLocalData("accessToken");
        var setting = {
          async: {
            enable: true,
            url: basePath2 + "dictionary/list?accessToken=" + accessToken,
            autoParam: ["id=parentId"],
            type: "get",
            dataType: 'json',
            dataFilter: this.filter
          },
          view: {
            fontCss: function (treeId, node) {
              if (isNull(node) || isNull(node.data)) {
                return {};
              }
              if (!isNull(node.data)) {
                return {color: grep};
              } else {
                return {};
              }
            }
          },
          data: {
            key: {
              name: "dictName"
            },
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: this.zTreeOnClick,
            onAsyncSuccess: this.zTreeOnAsyncSuccess
          }
        }
        $("#nowDict").html("");
        $.fn.zTree.init($("#nowDict"), setting);
      },
      filter: function (treeId, parentNode, childNodes) {
        if (!childNodes) return null;
        for (var i = 0, l = childNodes.length; i < l; i++) {
          childNodes[i].dictName = childNodes[i].dictName.replace(/\.n/g, '.');
        }
        return childNodes;
      },
      // 点击
      zTreeOnClick: function (event, treeId, treeNode) {
        this.clearForm();
        if (treeNode.isParent) {
          vm.isParentNode = true;	//点击的是父节点

          var parentNode = treeNode.getParentNode();
          if (parentNode) {
            vm.params.parentId = parentNode.id;
            vm.parentName = parentNode.dictName;
          } else {
            vm.params.parentId = -1;
          }
          vm.params.id = treeNode.id;
          vm.params.dictCode = treeNode.dictCode;
          vm.params.dictName = treeNode.dictName;
          vm.params.dictLevel = treeNode.dictLevel;
          vm.params.discription = treeNode.discription;
          vm.params.isParent = treeNode.isParent;

          //按钮
          vm.isShowLeafBtn = true;
          vm.isShowSaveBtn = false;
          if (vm.params.parentId == -1) {	//顶级菜单
            vm.isShowUpdateBtn = false;
            vm.isShowDeleteBtn = false;
          } else {
            vm.isShowUpdateBtn = true;
            vm.isShowDeleteBtn = true;
          }

        } else {
          vm.isParentNode = false;	//点击的是子节点

          var parentNode = treeNode.getParentNode();
          vm.params.parentId = parentNode.id;
          vm.parentName = parentNode.dictName;
          vm.params.id = treeNode.id;
          vm.params.dictCode = treeNode.dictCode;
          vm.params.dictName = treeNode.dictName;
          vm.params.dictLevel = treeNode.dictLevel;
          vm.params.discription = treeNode.discription;
          vm.params.isParent = treeNode.isParent;
          //按钮
          vm.isShowLeafBtn = false;
          vm.isShowSaveBtn = false;
          vm.isShowUpdateBtn = true;
          vm.isShowDeleteBtn = true;
        }
        vm.isVal = true;
      },
      //表单重置
      clearForm: function () {
        vm.params.parentId = "";
        vm.parentName = "";
        vm.params.id = "0";
        vm.params.dictCode = "";
        vm.params.dictName = "";
        vm.params.dictLevel = "";
        vm.params.discription = "";
        vm.params.isParent = "NULL";
      },
      //展开
      zTreeOnAsyncSuccess: function (event, treeId, treeNode, msg) {
        if (isNull(treeNode)) {
          var treeObj = $.fn.zTree.getZTreeObj("nowDict");
          var nodes = treeObj.getNodes();
          this.loadCheckNodes(nodes, false);
        } else {
          var b = (!isNull(treeNode) && treeNode.checked == true) ? true : false;
          var nodes = treeNode.children;
          this.loadCheckNodes(nodes, b);
        }
      },
      //选中节点
      loadCheckNodes: function (nodes, b) {
        var treeObj = $.fn.zTree.getZTreeObj("nowDict");
        for (var i = 0, l = nodes.length; i < l; i++) {
          //是否存在反选权限
          var status;//findPermissionByNode(nodes[i]);

          if (null != status) {
            treeObj.setChkDisabled(nodes[i], false, false, false);
            treeObj.checkNode(nodes[i], status, false, false);
          } else {
            //树得选中方法
            treeObj.checkNode(nodes[i], b, false, false);
            treeObj.setChkDisabled(nodes[i], b, false, false);
          }
          nodes[i].checkedOld = nodes[i].checked;
          if (!isNull(nodes[i].children)) {
            loadCheckNodes(nodes[i].children, b);
          }
        }
      },
      //刷新页面
      refresh: function () {
        this.initTree();
        this.clearForm();
        this.isVal = false;
        this.isShowLeafBtn = false;		//是否显示新增按钮
        this.isShowSaveBtn = false;		//是否显示保存按钮
        this.isShowUpdateBtn = false;	//是否显示修改按钮
        this.isShowDeleteBtn = false;		//是否显示删除按钮
      }
    },
    mounted: function () {
      vm = this;
      this.initTree();
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/static/plugins/zTree_v3/css/demo.css';
  @import '/static/plugins/zTree_v3/css/zTreeStyle/zTreeStyle.css';
  /*@import '/static/css/organigramme/org.css';*/
  @import '/static/css/bootstrap.min.css?v=3.3.6';
  @import '/static/css/style.min.css?v=4.1.0';
  @import '/static/plugins/select2/select2_metro.css';
  @import '/static/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css';
  @import '/static/css/plugins/jqueryFileUpload/jquery.fileupload.css';
  @import '/static/css/plugins/datapicker/datepicker3.css';

  .devStyle {
    display: none;
  }

  .debuggerStyle {
    color: red;
    font-weight: bolder;
  }

  .errors {
    color: #f00;
    display: block;
  }
  .fl{
  float: left;
  }
  .fr{
  float: right;
  }
  .cf{
  clear: both;
  zoom: 1;
  }
</style>
