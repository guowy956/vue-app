<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5>销售统计报表</h5>
            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3" v-if="!isHideRoleLv.roleLv1">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大区:</span>
                  <select2 :options="options.roleLv1" v-model="searchParams.roleLv1" @myMethod="callbackLv1"></select2>
                </div>
                <div class="col-sm-3" v-if="!isHideRoleLv.roleLv2">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;分中心:</span>
                  <select2 :options="options.roleLv2" v-model="searchParams.roleLv2" @myMethod="callbackLv2"></select2>
                </div>
                <div class="col-sm-3" v-if="!isHideRoleLv.roleLv3">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心:</span>
                  <select2 :options="options.roleLv3" v-model="searchParams.roleLv3" @myMethod="callbackLv3"></select2>
                </div>
                <div class="col-sm-3" v-if="!isHideRoleLv.roleLv4">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门店:</span>
                  <select2 :options="options.roleLv4" v-model="searchParams.roleLv4"></select2>
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-3">
                  <span>客户经理:</span>
                  <input type="text" class="selectInput" v-model="searchParams.salesman">
                </div>
                <div class="col-sm-3">
                  <span>进件时间:</span>
                  <input type="text" class="selectInput" id="sDate" placeholder="">
                </div>
                <div class="col-sm-3">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至:</span>
                  <input type="text" class="selectInput" id="eDate" placeholder="">
                </div>
                <div class="col-sm-3">
                  <p class='btn btn-primary' @click='search()'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                </div>
              </div>
            </div>
              <div class="ibox-content">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>客户经理</th>
                      <th>进件数量</th>
                      <th>放款统计</th>
                      <th>信审补件</th>
                      <th>运营驳回</th>
                      <th>签约取消</th>
                      <th class="zindex">大区</th>
                      <th class="zindex">分中心</th>
                      <th class="zindex">中心</th>
                      <th class="zindex">门店</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in items">
                      <td>{{ getNum(index) }}</td>
                      <!--客户经理-->
                      <td>{{ item.salesman }}</td>
                      <!--进件数量-->
                      <td>{{ item.apply }}</td>
                      <!--放款统计-->
                      <td>{{ item.loan }}</td>
                      <!--信审补件-->
                      <td>{{ item.bujian }}</td>
                      <!--运营驳回-->
                      <td>{{ item.reject }}</td>
                      <!--签约取消-->
                      <td>{{ item.cancel }}</td>

                      <td>{{ item.bigRegion }}</td>
                      <td>{{ item.partRegion }}</td>
                      <td>{{ item.region }}</td>
                      <td>{{ item.orgName }}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //select2-引入select2组件
  import Select2 from './common/select2/select2.vue';
  var vm
  export
  default {
    name: 'reportSearch',
    components: { //select2-定义select2在当前组件中的名称
      'select2': Select2,
    },
    data: function () {
      return {
        all: 0, //总页数
        cur: 1, //当前页码
        items: [],
        recordsTotal: 0,
        searchParams: {
          salesman: "",
          endTime: "",
          startTime: "",
          orderNum: "",
          start: 1,
          roleLv1: "",
          roleLv2: "",
          roleLv3: "",
          roleLv4: ""
        },
        isHideRoleLv: {
          roleLv1: true,
          roleLv2: true,
          roleLv3: true,
          roleLv4: true,
        },
        options: {
          roleLv1: [],
          roleLv2: [],
          roleLv3: [],
          roleLv4: []
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          examine: false
        },
      }
    },
    methods: {
      hideRoleLv: function () {
        var that = this;
        var role = this.$utils.getLocalData("role");
        if(role){
          var roleName = role.name;
          if(roleName == "超级管理员" || roleName == "普惠管理部总监"){
            that.isHideRoleLv.roleLv1 = false;
            that.isHideRoleLv.roleLv2 = false;
            that.isHideRoleLv.roleLv3 = false;
            that.isHideRoleLv.roleLv4 = false;
          }
          if(roleName == "大区总监"){
            that.isHideRoleLv.roleLv1 = true;
            that.isHideRoleLv.roleLv2 = false;
            that.isHideRoleLv.roleLv3 = false;
            that.isHideRoleLv.roleLv4 = false;
          }
          if(roleName == "分中心总监"){
            that.isHideRoleLv.roleLv1 = true;
            that.isHideRoleLv.roleLv2 = true;
            that.isHideRoleLv.roleLv3 = false;
            that.isHideRoleLv.roleLv4 = false;
          }
          if(roleName == "区域经理"){
            that.isHideRoleLv.roleLv1 = true;
            that.isHideRoleLv.roleLv2 = true;
            that.isHideRoleLv.roleLv3 = true;
            that.isHideRoleLv.roleLv4 = false;
          }
        }
      },
      initRoleLv: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'team/role/options', {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var lvMap = response.body.data;
            if(lvMap){
              if(lvMap.lv1){
                that.options.roleLv1 = lvMap.lv1;
              }
              if(lvMap.lv2){
                that.options.roleLv2 = lvMap.lv2;
              }
              if(lvMap.lv3){
                that.options.roleLv3 = lvMap.lv3;
              }
              if(lvMap.lv4){
                that.options.roleLv4 = lvMap.lv4;
              }
            }
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
      },
      callbackLv1: function () {
        var that = this;
        var pid = that.searchParams.roleLv1;
        that.$utils.ajax(that)(basePath2 + 'team/role/optionsByPid?pid='+pid, {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var roleLv = response.body.data;
            if(roleLv){
              that.options.roleLv2 = roleLv;
              that.options.roleLv3 = [];
              that.options.roleLv4 = [];
              that.searchParams.roleLv2 = "";
              that.searchParams.roleLv3 = "";
              that.searchParams.roleLv4 = "";
            }
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
      },
      callbackLv2: function () {
        var that = this;
        var pid = that.searchParams.roleLv2;
        that.$utils.ajax(that)(basePath2 + 'team/role/optionsByPid?pid='+pid, {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var roleLv = response.body.data;
            if(roleLv){
              that.options.roleLv3 = roleLv;
              that.options.roleLv4 = [];
              that.searchParams.roleLv3 = "";
              that.searchParams.roleLv4 = "";
            }
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
      },
      callbackLv3: function () {
        var that = this;
        var pid = that.searchParams.roleLv3;
        that.$utils.ajax(that)(basePath2 + 'team/role/optionsByPid?pid='+pid, {}, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            var roleLv = response.body.data;
            if(roleLv){
              that.options.roleLv4 = roleLv;
              that.searchParams.roleLv4 = "";
            }
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
      },
      initTable: function () {
        var that = this;
//        debugger
        that.$utils.ajax(that)(basePath2 + 'team/order/report', this.searchParams, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data;
            that.all = response.body.data.recordsTotal;
            var a = parseInt(that.recordsTotal / that.searchParams.length)
            var b = a + 1
            that.all = that.recordsTotal % that.searchParams.length == 0 ? a : b
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

      },
      getNum: function (index) {
        //计算序号
        return parseInt(this.searchParams.start) + parseInt(index);
      },
      search: function () {
        this.searchParams.start = 1;
        this.initTable();
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 1;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.salesman', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.startTime', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.endTime', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
      //重置查询条件
      resetSearch: function () {
          var that = this;
        that.searchParams.salesman = "";
        that.searchParams.endTime = "";
        $("#eDate").val("");
        that.searchParams.startTime = "";
        $("#sDate").val("");
        this.searchParams.roleLv1 = "";
        this.searchParams.roleLv2 = "";
        this.searchParams.roleLv3 = "";
        this.searchParams.roleLv4 = "";
      },
    },
    mounted: function () {
      var that = this;
      this.initTable();
      that.initRoleLv();
      that.hideRoleLv();
      this.watchSearchParams();
      $('#sDate').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.searchParams.startTime=$("#sDate").val();
      });
      $('#eDate').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      }).on('changeDate', function(ev) {
        that.searchParams.endTime=$("#eDate").val();
      });
    }
  }
</script>
