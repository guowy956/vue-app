import Vue from 'vue'
import App from './App'
import router from './router'    //这里引入的是router目录，会默认识别里面的index.js文件（不能是其他名字）
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from './plug-in/vee-validate/locale/zh_CN';

Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary: {
    zh_CN: {
      messages: zh_CN
    }
  }
});

Validator.extend('money', {
  messages: {
    en:field => field + '不是有效金额',
  },
  validate: value => {
    return /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)
  }
});

Validator.extend('rate', {
  messages: {
    en:field => field + '不是有效利率',
  },
  validate: value => {
    return /^([1-9]\d{0,3}|0)([.]?|(\.\d{1,2})?)$/.test(value)
  }
});

Validator.extend('double', {
  messages: {
    en:field => field + '不是有效小数',
  },
  validate: value => {
    return /^([1-9]\d{0,32}|0)([.]?|(\.\d{1,2})?)$/.test(value)
  }
});

Validator.extend('month', {
  messages: {
    en:field => field + '不是有效的格式',
  },
  validate: value => {
    var tmp = "2017-05";
    if (value) {
      tmp = value;
    }
    return /^(19[\d][\d]|20[\d][\d])-(0?[1-9]|1[0-2])$/.test(tmp);
  }
});

Validator.extend('monthLessNow', {
  messages: {
    en:field => field + '不是有效的格式',
  },
  validate: value => {
    var tmp = "2017-05";
    if(value){
      tmp = value;
    }
    var arr = tmp.split("-");
    var y = arr[0];
    var m = arr[1];
    if(y>new Date().getFullYear()){
      return false;
    }
    if(y==new Date().getFullYear() && m>(new Date().getMonth()+1)){
      return false;
    }
    return true;
  }
});

Validator.extend('mobile', {
  messages: {
    en:field => field + '必须是11位手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

// Validator.extend('companyRegister', {
//   messages: {
//     en:field => field + '单位注册号必须是13位',
//   },
//   validate: value => {
//     return /^[a-zA-Z0-9]{13}$|^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/.test(value)
//   }
// });

Validator.extend('idNumber', {
  messages: {
    en:field => field + '身份证格式不正确',
  },
  validate: value => {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(value)
  }
});

// 引入并使用vue-resource网络请求模块
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 引入并使用vue-resource网络请求模块
import Utils from './plug-in/common'
Vue.use(Utils)

// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#activityApp',    //这里绑定的是index.html中的id为app的div元素
  router,
  render: h => h(App)

  // 这里的render: h => h(App)是es6的写法
  // 转换过来就是：  暂且可理解为是渲染App组件
  // render:(function(h){
  // 	return h(App);
  // });

})

