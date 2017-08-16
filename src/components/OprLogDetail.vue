<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5 style="margin-top: 5px;">操作日志详情</h5>
              <div class="creat_butten" style="text-align: right">
                <button class="btn btn-primary" type="button">
                    <a style="color: #FFFFFF" :href="urlHandler('oprLogList')">返回</a>
                </button>
              </div>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">员工号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.empNo==null ? "--":data.empNo }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">操作员工:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.empName==null ? "--":data.empName }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">订单编号:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.orderNum==null ? "--":data.orderNum }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">日志类型:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.type }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">URL:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none" style="width: 260%">{{ data.url }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">状态码:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.status }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">请求参数:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none"  style="width: 260%">{{ data.request }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">响应参数:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none" style="width: 260%">{{ data.response }}</span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">请求时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.requestTime }}</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">响应时间:</label>
                    <div class="col-sm-6">
                      <span class="help-block m-b-none">{{ data.responseTime }}</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OprLogDetail',
    data: function() {
      return {
        data:"",
        searchParams: {
          logId: this.$route.params.logId,
        }
      }
    },
    methods: {
    urlHandler: function (path) {
        return "#/"+path;
      },
      initTable: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+ '/operlog/'+this.$route.params.logId, that.searchParams, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          var code = response.body.code;
          if (code == '200') {
            that.data = response.body.data;
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
      }
    },
    mounted: function () {
      this.initTable();
    }
  }
</script>
<style>
  .help-block {
    margin-top: 8px !important;
  }
</style>
