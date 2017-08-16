(function(){
    function install(Vue,VueResource){
        var API = require('./api').API;
        Object.defineProperty(Vue.prototype, '$utils',{
            get:function(){
                return API;
            }
        });
    }
    if (typeof exports == "object") {
        module.exports = install
    } else if (typeof define == "function" && define.amd) {
        define([], function(){ return install })
    } else if (window.Vue) {
        Vue.use(install)
    }
})();
