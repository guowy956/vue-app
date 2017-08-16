<template>
  <div>
    <div class="form-group">
      <label class="col-sm-3 control-label">功能权限：</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" name="selectNameMenu" id="selectNameMenu"
               readonly value="" @click="showSelectMenu()" placeholder="请点击选择功能权限"
               required="" aria-required="true" minlength="1" />
        <div id="selectTreeContentMenu" class="menuContent" style="display:none;margin-top: 10px;">
          <ul id="selectTreeIdMenu" class="ztree" style="margin-top:0; width:160px;"></ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['roleId'],
    data(){
      return{
        nodesMenu: [],
        selectNameMenu: "selectNameMenu",
        selectTreeIdMenu: "selectTreeIdMenu",
        selectTreeContentMenu: "selectTreeContentMenu"
      }
    },
    methods:{
      getResource: function () {
        var that = this;
        $.ajax({
          type : "GET",
          url         : basePath4 + "sysResource/menuTree",
          dataType : "json",
          success : function(data) {
            if(data.code == 200){
              that.nodesMenu = data.data;
            }
          },
          error : function(data){
            alert("error")
          }
        });
      },
      initMenuTree: function () {
        var that = this;
        var settingMenu = {
          view: {
            dblClickExpand: true
          },
          data: {
            simpleData: {
              enable: true,
              idKey: "id",
              pIdKey: "pid",
              rootPId: 0
            }
          },
          check: {
            enable: true
          },
          callback: {
            onCheck: that.onCheckMenu,
            onAsyncSuccess: that.zTreeOnAsyncSuccess
          }
        };
        $.ajax({
          type : "GET",
          url         : basePath4 + "sysResource/menuTree?roleId="+that.roleId,
          dataType : "json",
          success : function(data) {
            if(data.code == 200){
              that.nodesMenu = data.data;
              $.fn.zTree.init($("#" + that.selectTreeIdMenu), settingMenu, that.nodesMenu);
            }
          },
          error : function(data){
            alert("error")
          }
        });

      },
      onCheckMenu: function (event, treeId, treeNode) {
        var that = this;
        var treeObj = $.fn.zTree.getZTreeObj(that.selectTreeIdMenu);
        if (isNull(treeObj)){
          return;
        }
        var nodes = treeObj.getCheckedNodes(true);
        var resourceIds = "";
        var names = "";
        if (!isNull(nodes)){
          for (var i=0; i<nodes.length; i++) {
            if (nodes[i].id == 1) {
              //排除根节点
              continue;
            }
            resourceIds += nodes[i].id;
            names += nodes[i].name;
            if (i != (nodes.length - 1)){
              resourceIds += ",";
              names += ",";
            }
          }
        }
        $("#resourceIds").val(resourceIds);
        that.$parent.resourceIds = resourceIds;
        $("#" + that.selectNameMenu).val(names);
      },
      zTreeOnAsyncSuccess: function (event, treeId, treeNode, msg) {

      },
      showSelectMenu: function () {
        this.initMenuTree();
        var that = this;
        var orgObj = $("#" + that.selectNameMenu);
        var orgOffset = $("#" + that.selectNameMenu).offset();
        $("#" + that.selectTreeContentMenu).css({left:orgOffset.left + "px", top:orgOffset.top + orgObj.outerHeight() + "px"});
        $("#" + that.selectTreeIdMenu).css({width:orgObj.outerWidth() + "px"});
        $("#" + that.selectTreeContentMenu).show();
        $("body").bind("mousedown", that.onBodyDownMenu);
      },
      initCheckMenu: function () {
        var that = this;
        var resourceIds = $("#resourceIds").val();
        if (isNull(resourceIds)){
          return;
        }
        var treeObj = $.fn.zTree.getZTreeObj(that.selectTreeIdMenu);
        if (isNull(treeObj)){
          return;
        }
        //获取全部节点
        var allMenu = treeObj.transformToArray(treeObj.getNodes());
        var resourceIdArr;
        resourceIdArr = resourceIds.split(",");
        for (var i=0, l=allMenu.length; i<l; i++) {
          allMenu[i].name = allMenu[i].name.replace(/\.n/g, '.');
          //设置上次选中的节点
          if (!isNull(resourceIdArr)){
            for (var n=0, m=resourceIdArr.length; n<m; n++) {
              if (allMenu[i].id == resourceIdArr[n]){
                if (allMenu[i].isParent && !isNull(allMenu[i].children) && allMenu[i].children.length > 0) {
                  continue;
                }
                treeObj.checkNode(allMenu[i], true, true);
                break;
              }
            }
          }
        }
      },
      onBodyDownMenu: function (event) {
        var that = this;
        if (!(event.target.id == that.selectNameMenu || event.target.id == that.selectTreeContentMenu
          || $(event.target).parents("#" + that.selectTreeContentMenu).length>0 )) {
          that.hideMenuMenu();
        }
      },
      hideMenuMenu: function () {
        var that = this;
        $("#" + that.selectTreeContentMenu).hide();
        $("body").unbind("mousedown", that.onBodyDownMenu);
      }
    },
    mounted:function () {
      var that = this;
      $("#resourceIds").val("");
      that.initMenuTree();
    }
  }
</script>
