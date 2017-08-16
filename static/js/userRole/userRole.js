

function addOpen(employeeNo,fullName,email,mobile,role_name,user_id,role_id){
    $("#userIdHidden").val(user_id);
    $("#appModal").modal("show");
    $("#appModalTitleId").text("用户授权");
    if(isNull(role_name)){
        $("#add_user_role_btn").show();
        $("#update_user_role_btn").hide();
    }else{
        $("#add_user_role_btn").hide();
        $("#update_user_role_btn").show();
        $("#s2id_role_id").find(".select2-chosen").text(role_name);
        $("#role_id_hidden").val(role_id);
    }
    //清空
    $("#employeeNo").val(isNull(employeeNo)?"":employeeNo);
    $("#fullName").val(isNull(fullName)?"":fullName);
    $("#email").val(isNull(email)?"":email);
    $("#mobile").val(isNull(mobile)?"":mobile);
}

function addClose(){
    $("#userIdHidden").val("");
    $("#appModal").modal("hide");
    $("#role").html("").val("");
    refreshPage();
}

function refreshPage(){
    var start = $('#user_role_table_id').dataTable().fnSettings()._iDisplayStart;
    var length = $('#user_role_table_id').dataTable().fnSettings()._iDisplayLength;
    var pageNo = 0;
    if(start%length==0){
        pageNo = start/length;
    }else{
        pageNo = start/length+1;
    }
    //$('#user_role_table_id').dataTable().fnPageChange( 'previous', true );
    //$('#user_role_table_id').dataTable().fnPageChange( 'next', true );
    $('#user_role_table_id').dataTable().fnPageChange(pageNo);
    initSelect();
    initSelectRole();
}

function resetSearch() {
    $("#searchForm")[0].reset();
    initSelect();
}
function add_user_role(){
    var user_id = $("#userIdHidden").val();
    var role_id = $("#role_id_hidden").val();
    if(isNull(user_id)){
        alert("用户编号不能为空！");
        return ;
    }
    if(isNull(role_id)){
        alert("角色编号不能为空！");
        return ;
    }
    var params = {};
    params.userId = user_id;
    params.roleId = role_id;
    $.ajax({
        type:"GET",
        url:basePath+"userRole/add",
        dataType:"jsonp",
        data:params,
        success:function(data){
            response_status_handler(data.status);
            if(data.status==200){
                addClose();
            }else{
                alert(data.msg);
            }
        },
        error : function(data){
            alert(data.msg);
        }
    });
}

function update_user_role(){
    if(confirm("确认修改用户角色吗？")){
        var user_id = $("#userIdHidden").val();
        var role_id = $("#role_id_hidden").val();
        if(isNull(user_id)){
            alert("用户编号不能为空！");
            return ;
        }
        if(isNull(role_id)){
            alert("角色编号不能为空！");
            return ;
        }
        var params = {};
        params.userId = user_id;
        params.roleId = role_id;
        $.ajax({
            type:"GET",
            url:basePath+"userRole/update",
            dataType:"jsonp",
            data:params,
            success:function(data){
                response_status_handler(data.status);
                if(data.status==200){
                    addClose();
                }else{
                    alert(data.msg);
                }
            },
            error : function(data){
                alert(data.msg);
            }
        });
    }
}

$(document).ready(function(){
    initTable();
    initSelect();
    initSelectRole();
});