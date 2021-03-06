function getURL(){
    return encodeURIComponent(window.location.href);
}

function getFont(treeId, node) {
    if (isNull(node) || isNull(node.org)){
        return {};
    }
    if(node.isParent) {
        if (isNull(node.org)){
            return {};
        }
        if (node.org.is_delete == 2) {
            return {color: grep};
        } else {
            return {};
        }
    }else{
        if (isNull(node.employee)){
            return {};
        }
        if (node.employee.is_delete == 2) {
            return {color: grep};
        } else {
            return {};
        }
    }
}

var setting = {
    async: {
        enable: true,
        url: basePath + "org/orgTree?isSealed=2&display=employee&appKey="+appKey+"&appSecret="+appSecret,
        autoParam:["id=pid", "name=n", "level=lv", "appKey="+appKey, "appSecret="+appSecret, "display=employee"],
        type:"get",
        dataType:'jsonp',
        dataFilter: filter
    },
    view:{
        fontCss: getFont //获取当前节点字体
    },
    edit:{
        enable:true,
            showRemoveBtn:false,
            showRenameBtn:false,
            drag:{
            prev:true,
                inner:false,
                next:true
        }
    },
    //check: {
    //    enable: true,
    //    chkboxType: { "Y": "s", "N": "s" }
    //},
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        onCheck: onCheck,
        onClick: zTreeOnClick,
        onAsyncSuccess: zTreeOnAsyncSuccess,
        onExpand:zTreeOnExpand,
        beforeDrag:beforeDrag,
        beforeDrop:beforeDrop
    }
};

function beforeDrag(treeId, treeNodes) {
    for (var i=0,l=treeNodes.length; i<l; i++) {
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    if(isNull(targetNode)){
        return false;
    }else if(treeNodes[0].pid!=targetNode.pid){
        return false;
    }else if(treeNodes[0].isParent || targetNode.isParent){
        return false;
    }else if(treeNodes.length>1){
        return false;
    }else{
        var params = {};
        params.id = treeNodes[0].id;
        params.targetId = targetNode.id;
        params.moveType=moveType;

        if(confirm("确认移动 节点 到-- " + targetNode.name + " 吗？")){
            //ajax修改数据
            $.ajax({
                type:"GET",
                url:basePath+"drag/hr",
                dataType:"jsonp",
                data:params,
                success:function(data){
                    response_status_handler(data.status);
                    alert("修改成功！");
                    return true;
                },
                error : function(data){
                    alert(data.msg);
                    return false;
                }
            });
        }else{
            return false;
        }
    }
}


function zTreeOnClick(event, treeId, treeNode) {
    settingPostForm(treeNode);
}

function settingPostForm(node){
    empFormValidate.resetForm();
    hiddenOption(node);
    if(node.isParent){
        var treeObj = $.fn.zTree.getZTreeObj("nowOrg");
        var parentNode = treeObj.getNodeByParam("id", node.pid, null);

        if(!isNull(parentNode)){
            $('#parentOrgId').val(  parentNode.id);
            $('#parentOrgName').val(parentNode.name);
        }
        $('#currentOrgId').val( node.id);
        $('#currentOrgName').val(node.name);
        $('#createOrgDate').val(isNull(node.org.sDate) ? "" : new Date(node.org.sDate).format('yyyy-MM-dd'));
        $('#ChgEmpBtn').hide();
        $('#AddEmpBtn').show();
    }else{
        var treeObj = $.fn.zTree.getZTreeObj("nowOrg");
        var parentNode = treeObj.getNodeByParam("id", node.pid, null);
        //$('#empId').val(        "修改");
        $('#realname').val(     node.name);
        $('#employeeno').val(   node.employee.e0127);
        $('#mobile').val(       node.employee.c0104);
        $('#officeemail').val(  node.employee.h01um);
        $('#cardno').val(       "");
        $('#level').val(        node.employee.e01a1);
        $('#postId').val(       node.employee.E01A1_0);
        $('#entrytime').val(    isNull(node.employee.c0183) ? "" : new Date(node.employee.c0183).format('yyyy-MM-dd') );
        $('#emporgid').val(     node.pid);
        // $('#emporgname').val(   node.employee.e01a1);
        $('#emporgname').val(   parentNode.name);

        $('#idCardNumber').val(node.employee.id_card_number);
        $('#maritalStatus').val(node.employee.marital_status);
        $('#national').val(node.employee.national);
        $('#political').val(node.employee.political);
        $('#degree').val(node.employee.degree);
        $('#nativePlace').val(node.employee.native_place);
        $('#domicilePlace').val(node.employee.domicile_place);
        $('#workDate').val(isNull(node.employee.work_date) ? "" : new Date(node.employee.work_date).format('yyyy-MM-dd'));
        $('#emergencyContact').val(node.employee.emergency_contact);
        $('#emergencyContactPhone').val(node.employee.emergency_contact_phone);
        $('#birthday').val(isNull(node.employee.a0111) ? "" : new Date(node.employee.a0111).format('yyyy-MM-dd'));
        $('#gender').val(node.employee.a0107);
        $('#leader').val(node.employee.leader);
        $('#regular').val(node.employee.regular);
        $('#regularDate').val(isNull(node.employee.regular_date) ? "" : new Date(node.employee.regular_date).format('yyyy-MM-dd'));
        $('#workAge').val(node.employee.work_age);
        $('#workStatus').val(node.employee.work_status);
        $('#uniqueId').val(node.employee.unique_id);
        $('#postLevel').val(node.employee.level);
        $('#postName').val(node.employee.codeitemdesc);
        $('#postLevel').val(node.employee.postLevel);
        $('#age').val(node.employee.age);
        $('#ChgEmpBtn').show();
        $('#AddEmpBtn').hide();
        initGenerateItme();
    }
}


function hiddenOption(node){
    var isParent = node.isParent;
    var isDelete = node.isDelete;
    if(isParent){
        //form
        $('#employeeform').hide();
        $('#orgform').show();
        //判断显示封存和解封
        //showSeal(isDelete);
        //暂时隐藏删除按钮
        //$("#DelPostBtn").hide();
        //$("#fullpathdiv").css("visibility","hidden");
        //东方银谷 银谷普诚 来自EHR 不允许修改
        if(!isNull(node.org.fullpath) && (node.org.fullpath.indexOf("/01/0101") >= 0 || node.org.fullpath.indexOf("/01/0103") >= 0 ) ){
            $("#ChgEmpBtn").css("visibility","hidden");
            $("#openEmpForm").css("visibility","hidden");
        }else{
            $("#ChgEmpBtn").css("visibility","visible");
            $("#openEmpForm").css("visibility","visible");
        }
    }else{
        //form
        $('#employeeform').show();
        $('#orgform').hide();
        //button
        $("#AddPostBtn").css("visibility","hidden");
        $("#ChgPostBtn").css("visibility","visible");
        //暂时隐藏删除按钮
        $("#DelPostBtn").hide();
        $("#fullpathdiv").css("visibility","visible");
        if(!isNull(node.employee.fullpath) && (node.employee.fullpath.indexOf("/01/0101") >= 0 || node.employee.fullpath.indexOf("/01/0103") >= 0 ) ){
            $("#ChgEmpBtn").css("visibility","hidden");
            $("#openEmpForm").css("visibility","hidden");
        }else{
            $("#ChgEmpBtn").css("visibility","visible");
            $("#openEmpForm").css("visibility","visible");
            $("#employeeno").attr("readonly","readonly");
        }
    }

}

function showSeal(isDelete) {
    if (!isNull(isDelete)){
        if (isDelete == "1"){
            //显示封存
            $("#isDeleteOrg2PostBtn").show();
            $("#isDeleteOrg1PostBtn").hide();
            $("#AddPostBtn").css("visibility","visible");
            $("#ChgPostBtn").css("visibility","visible");
        }
        if (isDelete == "2"){
            //显示解封
            $("#isDeleteOrg2PostBtn").hide();
            $("#isDeleteOrg1PostBtn").show();
            $("#AddPostBtn").css("visibility","hidden");
            $("#ChgPostBtn").css("visibility","hidden");
        } else {
            $("#AddPostBtn").css("visibility","visible");
            $("#ChgPostBtn").css("visibility","visible");
        }
    } else {
        //显示封存
        $("#isDeleteOrg2PostBtn").show();
        $("#isDeleteOrg1PostBtn").hide();
        $("#AddPostBtn").css("visibility","visible");
        $("#ChgPostBtn").css("visibility","visible");
    }
}


function zTreeOnExpand(event, treeId, treeNode) {
    //取消展开后自动选中功能
    // var nowOrg = $.fn.zTree.getZTreeObj("nowOrg");
    // nowOrg.selectNode(treeNode);
    // expandNowPath("nowOrg");
}

var changedNodes = new Map();
function onCheck(event, treeId, treeNode, clickFlag) {
    var treeObj = $.fn.zTree.getZTreeObj("nowOrg");
    if(treeNode.checked){
        changedNodes.put(treeNode.id, treeNode);
    }else{
        changedNodes.remove(treeNode.id);
    }


    if(!isNull(treeNode.children)){
        onCheckNodes(treeNode.children ,treeNode.checked );
    }
}

function onCheckNodes(nodes,b) {
    var treeObj = $.fn.zTree.getZTreeObj("nowOrg");
    for (var i=0, l=nodes.length; i < l; i++) {
        //树得选中方法
        treeObj.setChkDisabled(nodes[i], b, false, false);
        treeObj.checkNode(nodes[i], b, false , false);
        nodes[i].checkedOld = nodes[i].checked;
        if(!isNull(nodes[i].children)){
            onCheckNodes(nodes[i].children,b);
        }
    }
}

var treeNodes = new Map();
function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
    response_status_handler(msg.status);
    if(isNull(treeNode)) {
        var treeObj = $.fn.zTree.getZTreeObj("nowOrg");
        var nodes = treeObj.getNodes();
        loadCheckNodes(nodes,false);
    }else{
        var b = (!isNull(treeNode) && treeNode.checked == true) ? true : false;
        var nodes = treeNode.children;
        loadCheckNodes(nodes,b);
    }
    if(!isNull(NowExpand)){
        expandNowPath("nowOrg", NowExpand);
    }
};

//选中节点
function loadCheckNodes(nodes,b) {
    var treeObj = $.fn.zTree.getZTreeObj("nowOrg");
    for (var i=0, l=nodes.length; i < l; i++) {
        //是否存在反选权限
        var status;//findPermissionByNode(nodes[i]);

        if(null != status){
            treeObj.setChkDisabled(nodes[i], false, false, false);
            treeObj.checkNode(nodes[i], status, false , false);
        }else{
            //树得选中方法
            treeObj.checkNode(nodes[i], b, false , false);
            treeObj.setChkDisabled(nodes[i], b, false, false);
        }
        nodes[i].checkedOld = nodes[i].checked;
        if(!isNull(nodes[i].children)){
            loadCheckNodes(nodes[i].children,b);
        }
    }
}



var log, className = "dark";
function beforeClick(treeId, treeNode, clickFlag) {
    className = (className === "dark" ? "":"dark");
    return (treeNode.click != false);
}

function filter(treeId, parentNode, childNodes) {
    if (!childNodes) return null;
    for (var i=0, l=childNodes.length; i<l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
}

var log, className = "dark";
function beforeClick(treeId, treeNode, clickFlag) {
    className = (className === "dark" ? "":"dark");
    return (treeNode.click != false);
}


function refreshTree(){
    initTree();
}


function refreshNowTree(){
    $("#nowOrg").html("");
    $.fn.zTree.init($("#nowOrg"), setting);
}

function fetchOrgIds(temp, type){
    var result = "";
    for(var i=0;i<temp.length;i++){
        var node = temp[i];
        if(type == "org" && node.isParent){
            result += node.id;
            if(i != temp.length-1){
                result += ","
            }
        }else if (type == "employee" && !node.isParent){
            result += node.id;
            if(i != temp.length-1){
                result += ","
            }
        }else{
        }
    }
    return result;
}

function initTree(){
    $("#nowOrg").html("");
    changedNodes = new Map();
    $.fn.zTree.init($("#nowOrg"), setting);
}

/*var zNodes =[
    {id:1, pId:0, name:"北京"},
    {id:2, pId:0, name:"天津"},
    {id:3, pId:0, name:"上海"},
    {id:6, pId:0, name:"重庆"},
    {id:4, pId:0, name:"河北省", open:true},
    {id:41, pId:4, name:"石家庄"},
    {id:42, pId:4, name:"保定"},
    {id:43, pId:4, name:"邯郸"},
    {id:44, pId:4, name:"承德"},
    {id:5, pId:0, name:"广东省", open:true},
    {id:51, pId:5, name:"广州"},
    {id:52, pId:5, name:"深圳"},
    {id:53, pId:5, name:"东莞"},
    {id:54, pId:5, name:"佛山"},
    {id:6, pId:0, name:"福建省", open:true},
    {id:61, pId:6, name:"福州"},
    {id:62, pId:6, name:"厦门"},
    {id:63, pId:6, name:"泉州"},
    {id:64, pId:6, name:"三明"}
];*/

function beforeClickPost(treeId, treeNode) {
    var check = (treeNode && !treeNode.isParent);
    if (!check) alert("只能选择职位");
    return check;
}

function onClickPost(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("orgSelectPostTreeId"),
        nodes = zTree.getSelectedNodes(),
        v = "",
        postId = "",
        postLevel = "";
    nodes.sort(function compare(a,b){return a.id-b.id;});
    for (var i=0, l=nodes.length; i<l; i++) {
        v += nodes[i].name + ",";
        postId += nodes[i].id + ",";
        if(nodes[i].post.level!=undefined){
            postLevel += nodes[i].post.level + ",";
        }
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);
    if (postId.length > 0 ) postId = postId.substring(0, postId.length-1);
    if (postLevel.length > 0 ) postLevel = postLevel.substring(0, postLevel.length-1);
    $("#postName").val(v);
    $("#postId").val(postId);
    $("#orgSelectPostTreeContent").hide();
    $("#postLevel").val(postLevel);
}

function hideMenu() {
    $("#orgSelectPostTreeContent").hide();
    $("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
    if (!(event.target.id == "postName" || event.target.id == "orgSelectPostTreeContent" || $(event.target).parents("#orgSelectPostTreeContent").length>0)) {
        hideMenu();
    }
}

function showPost() {
    var postObj = $("#postName");
    var postOffset = $("#postName").offset();
    $("#orgSelectPostTreeContent").css({left:postOffset.left + "px", top:postOffset.top + postObj.outerHeight() + "px"});
    $("#orgSelectPostTreeId").css({width:postObj.outerWidth() + "px"});
    $("#orgSelectPostTreeContent").show();
    $("body").bind("mousedown", onBodyDown);
}


var postTreePID = "1";
function initPostTree() {
    var settingPost = {
        async: {
            enable: true,
            url: getAsyncUrlForPost,
            // url: basePath + "v1/postTree?pid=" + getNowOrgParentNode().id + "&appKey="+appKey+"&appSecret="+appSecret,
            // url: basePath + "v1/postTree?pid=" + id + "&appKey="+appKey+"&appSecret="+appSecret,
            autoParam:["id=pid", "name=n", "level=lv", "appKey="+appKey, "appSecret="+appSecret],
            type:"get",
            dataType:'jsonp',
            dataFilter: filter
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
            beforeClick: beforeClickPost,
            onClick: onClickPost
        }
    };
    $.fn.zTree.init($("#orgSelectPostTreeId"), settingPost);
    showPost();
}

function getNowOrgParentNode() {
    var nowOrg = $.fn.zTree.getZTreeObj("nowOrg");
    var node   = nowOrg.getSelectedNodes();
    return node[0].getParentNode();
}

//动态获取url，主要解决，第一次加载取当前人员父组织ID拼接在url中，展开职位树后，删除url中的pid的参数，使用默认pid参数
function getAsyncUrlForPost(treeId, treeNode) {
    if (postTreePID != "1"){
        return basePath + "v1/postTree?appKey="+appKey+"&appSecret="+appSecret;
    }
    postTreePID = "2";
    var id = "";
    var nowOrg = $.fn.zTree.getZTreeObj("nowOrg");
    var node   = nowOrg.getSelectedNodes();
    var node_0 = node[0];
    if(node_0.isParent){
        id = node_0.id;
    }else{
        id = getNowOrgParentNode().id;
    }
    return basePath + "v1/postTree?pid=" + id + "&appKey="+appKey+"&appSecret="+appSecret;
}

function getAge(id, decimal) {
    var entry = new Date($("#" + id).val());
    var entryTime = entry.getTime();
    if(isNaN(entryTime)){
        return "";
    }
    var curr = new Date();
    var milli = curr.getTime() - entry.getTime();
    if(!isNull($("#workAge-error"))){
        $("#workAge-error").hide();
    }
    if (milli < 0) {
        return 0;
    }
    var age = milli/1000/60/60/24/365;
    return age.toFixed(decimal);
}

function idCardNumberOnchange(){
    var idc = $("#idCardNumber").val();
    if (!isNull(idc) && idc.length == 18){
        var birthday = "";
        birthday += idc.substring(6, 10) + "-";
        birthday += idc.substring(10, 12) + "-";
        birthday += idc.substring(12, 14);
        $("#birthday").val(birthday);
        //初始化年龄
        birthdayOnchange()
        //初始化性别
        initGender()

        if(!isNull($("#birthday-error"))){
            $("#birthday-error").hide();
        }

        if(!isNull($("#age-error"))) {
            $("#age-error").hide();
        }
    }
}

//初始化性别
function initGender(){
    var idc = $("#idCardNumber").val();
    if (!isNull(idc) && idc.length == 18){

        if (idc.substring(16, 17) % 2){
            //男
            $("#gender").val("男");
        } else {
            //女
            $("#gender").val("女");
        }
    }
}

function birthdayOnchange(){
    $("#age").val(getAge("birthday", 0));
}

function entrytimeOnchange(){
    $("#workAge").val(getAge("entrytime", 1));
}

function initEmpDatetimepicker() {
    // $.fn.datetimepicker.dates['zh-CN'];
    /*$('#birthday').datepicker({
        todayBtn:"linked",
        keyboardNavigation:!1,
        forceParse:!1,
        calendarWeeks:!0,
        autoclose:!0
    }).on('changeDate', function(ev){
        // if (ev.date.valueOf()){
        //计算年龄
        birthdayOnchange();
    });*/





/*    $('#birthday').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        language: 'zh-CN',
        todayBtn: 'linked',
        minView: 2,//最小天
        maxView: 4//最大年
    }).on('changeDate', function(ev){
        // if (ev.date.valueOf()){
        //计算年龄
        // birthdayOnchange();
    });*/
    //
    $('#regularDate').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        language: 'zh-CN',
        todayBtn: 'linked',
        minView: 2,//最小天
        maxView: 4//最大年
    });

    $('#entrytime').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        language: 'zh-CN',
        todayBtn: 'linked',
        minView: 2,//最小天
        maxView: 4//最大年
    }).on('changeDate', function(ev){
        // console.log(ev.date.valueOf());
        //计算司龄
        entrytimeOnchange();
    });
    //
    // $('#createOrgDate').datetimepicker({
    //     format: 'yyyy-mm-dd',
    //     autoclose: true,
    //     todayHighlight: true,
    //     language: 'zh-CN',
    //     todayBtn: 'linked',
    //     minView: 2,//最小天
    //     maxView: 4//最大年
    // });
    $('#workDate').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        language: 'zh-CN',
        todayBtn: 'linked',
        minView: 2,//最小天
        maxView: 4//最大年
    });

}

//页面初始化完后，初始化自动生成项
function initGenerateItme() {
    idCardNumberOnchange();
    //初始化性别
    initGender()
    var birthday = $("#birthday").val();
    if(!isNull(birthday)){
        birthdayOnchange();
    }
    var entrytime = $("#entrytime").val();
    if(!isNull(entrytime)){
        entrytimeOnchange();
    }
}

$(document).ready(function(){
    initTree();
    initSelect();
    // initPostTree();
    //初始化验证框架
    $.validator.setDefaults({
        highlight: function (e) {
            $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
        }, success: function (e) {
            e.closest(".form-group").removeClass("has-error").addClass("has-success")
        }, errorElement: "span", errorPlacement: function (e, r) {
            e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent())
        }, errorClass: "help-block m-b-none", validClass: "help-block m-b-none"
    })
    //格式化时间，在时间input class添加dateValidtor
    $.validator.addMethod("dateValidtor",function(value,element){
        var reg = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
        return (reg.test(value));
    },"请输入有效的日期 (YYYY-MM-DD)");
    //身份证号码验证，18位，最后一位可以输入X或者x
    $.validator.addMethod("idCardValidtor",function(value,element){
        var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
        return (reg.test(value));
    },"请输入有效的身份证号码");
    $("#empFormId").validate();
    $("#orgFormId").validate();
    initEmpDatetimepicker();
});
