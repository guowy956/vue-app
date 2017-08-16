<template>
  <!--<div class="gray-bg" v-if="isLogin=='N'">-->
    <!--<div class="middle-box text-center loginscreen  animated fadeInDown">-->
      <!--<div>-->
        <!--<div style="margin-bottom: 5px;">-->
          <!--<h2 class="">登  录</h2>-->
        <!--</div>-->
        <!--&lt;!&ndash;<h3>欢迎使用 H+</h3>&ndash;&gt;-->
          <!--<div class="form-group">-->
            <!--<input type="email" class="form-control" placeholder="用户名" required=""-->
                   <!--v-model="loginParams.username" @keyup.enter="doLogin()">-->
          <!--</div>-->
          <!--<div class="form-group">-->
            <!--<input type="password" class="form-control" placeholder="密码" required=""-->
                   <!--v-model="loginParams.password" @keyup.enter="doLogin()">-->
          <!--</div>-->
          <!--<button type="button" v-on:click="doLogin()" class="btn btn-primary block full-width m-b">登 录</button>-->

          <!--<p class="text-muted text-center">-->
            <!--<a href="login.html#">-->
              <!--<small>忘记密码了？</small>-->
            <!--</a> | <a href="register.html">注册一个新账号</a>-->
          <!--</p>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
  <div class="gray-bg" v-if="isLogin=='N'">
    <div class="middle-box text-center loginscreen  animated fadeInDown">
      <div>
        <div>
          <p>
            <img src="../../static/img/logoYGPH.png" class="logoPh"/>
          </p >
          <h3 style="font-size: 18px;font-family: serif;">运营系统</h3>
        </div>
        <!--<div style="margin-bottom: 5px;">-->
        <!--<h2 class="">登  录</h2>-->
        <!--</div>-->
        <div class="form-group">
          <input type="email" class="form-control" placeholder="用户名" required=""
                 v-model="loginParams.username" @keyup.enter="doLogin()" v-focus>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="密码" required=""
                 v-model="loginParams.password" @keyup.enter="doLogin()">
        </div>
        <button type="button" @click="doLogin()" class="btn btn-primary block full-width m-b">登 录</button>
      </div>
    </div>
    <div class="signup-footer" style="position: fixed;width: 100%;bottom: 0px; color: #333;">
      <p style="text-align: center">  2016 东方银谷（北京）投资管理有限公司 京ICP备14022292号</p >
      <p style="text-align: center; color: #337ab7"> By BingTeam </p >
    </div>
  </div>
</template>


<script>
  var vm;

  export default {
    name: 'login',
    props: ['isLogin'],
    data: function () {
      return {
        loginParams : {
          username : "",
          password : ""
        }
      }
    },
    methods: {
      doLogin: function () {
        var that = this;
        that.$http.post(basePath4+'loginActivity', this.loginParams).then(function(response) {
          var code = response.body.code;
          var msg = response.body.message;
          //var accessToken = response.body.data;
          if(code==200){
            var successMap = response.body.data;
            var accessToken = successMap.token;
            var orgData = successMap.orgData;
            var hrData = successMap.hrData;
            var userInfoList = successMap.userInfoList;
            var menus = successMap.menus;
            var user = successMap.user;
            var role = successMap.role;
            that.$utils.saveLocalData("accessToken",accessToken);
            that.$utils.saveLocalData("orgData",orgData);
            that.$utils.saveLocalData("hrData",hrData);
            that.$utils.saveLocalData("userInfoList",userInfoList);
            that.$utils.saveLocalData("menus",menus);
            that.$utils.saveLocalData("user",user);
            that.$utils.saveLocalData("role",role);
            that.$emit('changeLogin','Y');
            var hrData = that.$utils.getLocalData("hrData");
            if(hrData){
              that.$parent.$children[0].userInfo.empNo = hrData.e0127;
              that.$parent.$children[0].userInfo.realName = hrData.a0101;
            }
            window.location.href = "/";
          }else if(code == 400){
            alert("登录失败");
          }else{
            alert(msg)
          }
        }, function(response) {
            alert("fail")
        });
      }
    },
    mounted: function () {
      vm = this
    }
  }
</script>

<style scoped>

  .middle-box{
  padding-top: 100px !important;
}
.logoPh{
  width: 236px;
  height: 50px;
  margin-left: -10%;
  margin-bottom: 10px;
}
</style>
