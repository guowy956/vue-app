<template>
  <!--<h1>变更组织</h1>-->
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>修改密码</h5>
            </div>
            <div class="ibox-content col-md-12">
              <div class="middle-box text-center animated fadeInRightBig">
                <div class="error-desc">
                  <form class="form-horizontal" action="#" id="passwordform" novalidate="novalidate">
                    <div class="form-group">
                      <label class="col-sm-3 control-label">当前密码：</label>
                      <div class="col-sm-8">
                        <input type="password" placeholder="当前密码" class="form-control" v-model="params.oldpassword">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">新密码：</label>
                      <div class="col-sm-8">
                        <input type="password" placeholder="密码" class="form-control" v-model="params.newpassword">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-3 control-label">确认密码：</label>
                      <div class="col-sm-8">
                        <input type="password" placeholder="密码" class="form-control" v-model="params.repassword">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-sm-offset-3 col-sm-8">
                        <button class="btn btn-primary" type="BUTTON" id="AddPostBtn" @click="updatePassword()">确 认</button>
                      </div>
                    </div>
                  </form>
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
  export default {
    name: 'updatePassword',
    data: function () {
      return {
        params: {
          oldpassword: "",
          newpassword: "",
          repassword: ""
        }
      }
    },
    methods: {
      updatePassword: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'updatePassword',that.params, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            alert("修改成功");
            that.logout();
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$emit('changeLogin', 'N');
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"post");
      },
      logout : function () {
        var that = this;
        that.$utils.clearLocalData("accessToken");
        that.$utils.clearLocalData("orgData");
        that.$utils.clearLocalData("hrData");
        that.$utils.clearLocalData("menus");
        that.$utils.clearLocalData("user");
        that.$emit('changeLogin', 'N');
        window.location.href = "/";
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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
