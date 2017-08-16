<template>
   <div id="activityApp">
     <!--isLogin：<input type="text" v-model="isLogin">-->
        <home v-bind:isLogin="isLogin" @changeLogin="changeLogin"></home>
        <login v-bind:isLogin="isLogin" @changeLogin="changeLogin"></login>
    </div>
</template>

<script>
import Home from 'components/Home.vue';
import Login from 'components/Login.vue'

export default {
  name: 'app',
  components: {
    Home,
    Login
  },
  data: function () {
    return {
      isLogin : ""    //这里控制登录，true：已登录 false:未登录 还没有动态实现 wait~~
    }
  },
  methods: {
    changeLogin: function (value) {
      this.isLogin = value;
    }
  },
  created: function () {
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
        that.isLogin = "Y";
      }else if(response.body.code == '401'){
        that.isLogin = "N";
      }else{
        that.$utils.alert(response.body.message)
      }
    }, function (response) {
      that.$utils.alert("fail");
    },"get");

  }

}
</script>
