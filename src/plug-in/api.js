exports.API = function () {
    var rootPath="";
    return {
        /**
         *封装js类ajax请求
         **/
        lodingup: function () {
            setTimeout(function () {
                var loadingObj = document.getElementById("loading");
                loading.style.display = "block";
            }, 0);

        },
        ajax: function (vueObj) {
            var that = this;
            var formatParam = function (realURL, params) {
                if (typeof(params) === 'string') {
                  params=JSON.parse(params);
                }
                if (typeof(params) == "object") {
                    var paramArray = [];
                    for (var key in params) {
                        paramArray.push(key + "=" + params[key])
                    }

                    if (realURL.indexOf("?") > -1) {
                        realURL += "&" + paramArray.join("&");
                    } else {
                        realURL += "?" + paramArray.join("&");
                    }
                }

                return realURL;
            }

            return function (url, params, successFun, errorFun, type,indes) {
              if(indes == "clock"){
                if ( !clockSubmit.init(10000000000) ) {
                  return false;
                }
              }
                if(typeof(params)==='string'){
                  params=JSON.parse(params);
                }
                /**
                 * 前置代码
                 */
                if(!params){
                  params = {};
                }
                if(type.toUpperCase()=="GET"){
                  params.accessToken = that.getLocalData("accessToken");
                }
                if(type.toUpperCase()=="POST"){
                  if(url.indexOf('?') == -1){
                    url+="?accessToken="+that.getLocalData("accessToken");
                  } else {
                    url+="&accessToken="+that.getLocalData("accessToken");
                  }
                }
                if(type.toUpperCase()=="PUT"){
                  if(url.indexOf('?') == -1){
                    url+="?accessToken="+that.getLocalData("accessToken");
                  } else {
                    url+="&accessToken="+that.getLocalData("accessToken");
                  }
                }
                if(type.toUpperCase()=="DELETE"){
                  params.accessToken = that.getLocalData("accessToken");
                }

                params=JSON.stringify(params);

                var realURL = rootPath + url;
                type=type||"POST";
                var vueResourceObj=(function(){
                  var req= {
                     "POST":function(){
                        return vueObj.$http.post(realURL, params, null);
                     },
                    "GET":function(){
                        realURL = formatParam(realURL, params);
                        return  vueObj.$http.get(realURL);
                    },
                    "PUT":function () {
                        return vueObj.$http.put(realURL, params);
                    },
                    "DELETE":function () {
                        realURL = formatParam(realURL, params);
                        return vueObj.$http.delete(realURL);
                    },
                    "JSONP":function(){
                        realURL = formatParam(realURL, params);
                        vueResourceObj = vueObj.$http.jsonp(realURL);
                    }
                  };
                  return req[type.toUpperCase()]();
                })();

/*                var sessionFilter = function (response) {
                    if (response.ok && response.data["code"] == "FAIL" && response.data["message"] == "超时，请重新登录") {
                        var currentFullPath = vueObj.$route.fullPath;
                        if (currentFullPath.indexOf("/center/") > -1) {
                            return {"timeout": true, "redirect": "/login"};
                        } else if (currentFullPath.indexOf("/managerLogin/") > -1) {
                            vueObj.$router.push("/managerLogin");
                            return {"timeout": true, "redirect": "/managerLogin"};
                        }
                    }

                    return {"timeout": false, "redirect": ""};
                }*/

                vueResourceObj.then(function (response) {
                        //loading消失
                       /* var checkSession = sessionFilter(response);
                        if (checkSession && checkSession.timeout) {
                            //session超时, 退出
                            vueObj.$router.push(checkSession.redirect);
                            return;
                        }*/

                        if (successFun) {
                          clockSubmit.open();
                            successFun(response);
                        }
                    }, function (response) {
                        if (errorFun) {
                          clockSubmit.open();
                            errorFun(response);
                        }
                    }
                ).catch(function (response) {
                    /*if (catchFun) {
                        catchFun(response);
                    }*/
                });

            }
        },

        saveLocalData: function (key, data) {
            var saveObj = {};
            if (typeof(data) === "object") {
                saveObj = {"type": "object", data: JSON.stringify(data)}
            } else {
                saveObj = {"type": "string", data: data}
            }
            localStorage.setItem(key, JSON.stringify(saveObj));
        },
        clearLocalData: function (key) {
            localStorage.removeItem(key);
        },
        clearAllLocalData: function (key) {
            localStorage.clear();
        },
        getLocalData: function (key) {
            var obj = localStorage.getItem(key);
            if (obj) {
                obj = JSON.parse(obj);
                var type = obj["type"];
                var data = obj["data"];
                if (type === "object") {
                    return JSON.parse(data);
                }
                return data;
            } else {
                return null;
            }
        },
        saveSessionData: function (key, data) {
            var saveObj = {};
            if (typeof(data) === "object") {
                saveObj = {"type": "object", data: JSON.stringify(data)}
            } else {
                saveObj = {"type": "string", data: data}
            }
            sessionStorage.setItem(key, JSON.stringify(saveObj));
        },
        clearSessionData: function (key) {
            sessionStorage.removeItem(key);
        },
        clearAllSessionData: function (key) {
            sessionStorage.clear();
        },
        getSessionData: function (key) {
            var obj = sessionStorage.getItem(key);
            if (obj) {
                obj = JSON.parse(obj);
                var type = obj["type"];
                var data = obj["data"];
                if (type === "object") {
                    return JSON.parse(data);
                }
                return data;
            } else {
                return null;
            }
        },
        alert: function (msg) {
          alert(msg);
        }
    };
}();
