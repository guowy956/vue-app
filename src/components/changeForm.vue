<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>附件上传</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <table class="table table-bordered" style="table-layout:fixed;">
                <thead>
                <tr>
                  <th style="width: 4%">序号</th>
                  <th>协议名称</th>
                  <th>文件上传状态</th>
                  <th>处理结果</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>变更证明</td>
                  <td></td>
                  <td></td>
                  <td><button class="btn btn-info"><i class="fa fa-paste"></i>修改</button></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>变更银行卡协议</td>
                  <td></td>
                  <td></td>
                  <td><button class="btn btn-info"><i class="fa fa-paste"></i>修改</button></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>银行卡复印件</td>
                  <td></td>
                  <td></td>
                  <td><button class="btn btn-info"><i class="fa fa-paste"></i>修改</button></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>身份证件</td>
                  <td></td>
                  <td></td>
                  <td><button class="btn btn-info"><i class="fa fa-paste"></i>修改</button></td>
                </tr>
                </tbody>
              </table>
              </form>
            </div>
            <div class="ibox-title">
              <h5>授权人资料</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">银行卡户名（与XX一致）:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">身份证号码:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.idNum">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">银行卡开户名称:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">开户行（精确到分行）:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">银行卡账号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <label class="col-sm-5 control-label">手机号:</label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control" v-model="params.customerBaseInfo.phone">
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="ibox-title">
              <h5>账号变更记录</h5>
            </div>
            <div class="ibox-content">
              <form class="form-horizontal" method="get">
                <table class="table table-bordered" style="table-layout:fixed;">
                  <thead>
                  <tr>
                    <th style="width: 4%">序号</th>
                    <th>处理结果</th>
                    <th>批复时间</th>
                    <th>批复内容</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item,index) in items">
                    <td>{{ getNum(index) }}</td>
                    <!--<td>{{ item.status }}</td>-->
                    <td>{{statusUtil[item.status]}}</td>
                    <td>{{ item.auditTime}}</td>
                    <td>{{ item.remark }}</td>
                  </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div class="ibox-content">
              <div class="form-group" style="text-align: center;">
                <button class="btn btn-primary" type="button" @click="">提交</button>
                <!--<button class="btn btn-primary" type="button" @click="">上传附件</button>-->
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
    name: 'changeForm',
    data: function () {
      return {
        startNum : 1,
        statusUtil:{"1":"已审核","0":"未审核"},
        items : [],
        params: {
          customerBaseInfo: {
            idNum: "",
            phone: ""
          },
          order: {
            orderNum: ""
          }
        }
      }
    },
    methods: {
//      toMoney: function (value) {
//        return toMoney(value)
//      },
      initTable : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'modBankcardRecord/list?orderNum=' +that.params.order.orderNum, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            debugger
            that.items = response.body.data;
            //console.log(that.items);
            that.recordsTotal = response.body.data.recordsTotal;
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
      startNum: function () {
        if(this.recordsTotal==0){
          return 0;
        }else{
          return this.searchParams.start+1
        }
      },
      getNum : function(index){
        //计算序号
        return parseInt(this.startNum) + parseInt(index);
      }
    },
    mounted: function () {
      //初始加载查询方法
      this.initTable();
    }
  }
</script>
<style>
  input{
    border-radius: 5px !important;
  }
</style>
