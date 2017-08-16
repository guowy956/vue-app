<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title" >
              <h5>操作日志列表</h5>
            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3">
                  <span>日志类型:</span>
                  <select2 :options="options.logType" v-model="searchParams.logType" @myclick="callbackLType">
                  </select2>
                </div>
                <div class="col-sm-3">
                  <span>员工号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.empNo">
                </div>
                <div class="col-sm-3">
                  <span>姓名:</span>
                  <input type="text" class="selectInput" v-model="searchParams.empName">
                </div>
                <div class="col-sm-3">
                  <span>订单号:</span>
                  <input type="text" class="selectInput orderNo" v-model="searchParams.orderNum">
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-6" style="text-align: center;width: 100%">
                  <p class='btn btn-primary' @click='initTable'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                </div>
              </div>
            </div>
            <div class="ibox float-e-margins">
             <div class="ibox-content">
               <table id="aqTable" class="table table-bordered" style="text-align: center !important;">
                 <thead>
                 <tr>
                   <th>序号</th>
                   <th>操作员工</th>
                   <th style="width: 75px">类型</th>
                   <th>URL</th>
                   <th>状态响应码</th>
                   <!--<th>请求参数</th>-->
                   <!--<th>响应结果</th>-->
                   <th>请求时间</th>
                   <th>响应时间</th>
                   <th>操作</th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr v-for="(item,index) in items">
                   <td>{{ getNum(index) }}</td>
                     <td>
                         <a :href="urlHandler('oprLogDetail'+'/'+item.id)">{{ item.empName=='' ? item.empName:'--' }}</a>
                     </td>
                     <td>{{ item.type }}</td>
                     <td>{{ item.url }}</td>
                     <td>{{ item.status }}</td>
                     <!--<td>{{ item.request }}</td>-->
                     <!--<td>{{ item.response}}</td>-->
                     <td>{{ item.requestTime }}</td>
                     <td>{{ item.responseTime }}</td>
                     <td>
                       <button class="btn btn-primary" type="button" >
                           <a style="color: #FFFFFF" :href="urlHandler('oprLogDetail'+'/'+item.id)">查看日志</a>
                       </button>
                     </td>
                 </tr>
                 </tbody>
               </table>
               <div class="row">
                 <div class="dataTables_info col-sm-5">
                   显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项
                 </div>
                 <div class="dataTables_paginate paging_simple_numbers col-sm-7" style="text-align:right;">
                   <div>
                     <ul class="pagination">
                       <li class="paginate_button previous"><a @click="first()">首页</a></li>
                       <li style="width: 11%" v-if="showFirst">
                         <a v-on:click="before()">
                           上一页</a>
                       </li>
                       <li class="paginate_button" v-for="index in indexs" v-bind:class="{ 'active': cur == index}">
                         <a v-on:click="btnClick(index)">{{index}}</a>
                       </li>
                       <li style="width: 11%" v-if="showLast"><a v-on:click="next()">下一页</a></li>
                       <li class="paginate_button next"><a>共<i>{{all}}</i>页</a></li>
                       <li class="paginate_button next"><a @click="final()">尾页</a></li>
                     </ul>
                   </div>
                 </div>
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
  //select2-引入select2组件
  import select2 from './common/select2/select2_List.vue';
  var vm;
  export default {
    name: 'OprLogList',
    components: {//select2-定义select2在当前组件中的名称
      'select2': select2,
    },
    data:function () {
      return {
        all: 0, //总页数
        cur: 1, //当前页码
        newPageSize:0,
        startNum:1,
        jumpNum:1,
        items: [ ],
        recordsTotal: 0,
        searchParams: {
          logType:"",
          start: 0,
          length: 10,
          logType: "",
          empNo: "",
          empName: "",
          orderNum: ""
        },
        labels: {
          cancel: "取消",
          finish: "完成",
          next: "下一步",
          previous: "上一步"
        },
        options:{
          logType: [
            { id: '', text: '全部' },
            { id: 'api', text: '内部接口' },
            { id: 'foreign', text: '对外接口' },
            { id: 'remote', text: '外部接口' },
          ],
        },
        select2Style: {//select2-style样式
          width: '67%'
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          examine: false
        }
      }
    },
    computed: {
    indexs: function(index) {
        var left = 1;
        var right = this.all;
        var ar = [];
        if (this.all >= 11) {
          if (this.cur > 5 && this.cur < this.all - 4) {
            left = this.cur - 5;
            right = this.cur + 4;
          } else {
            if (this.cur <= 5) {
              left = 1;
              right = 10;
            } else {
              right = this.all;
              left = this.all - 9;
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      },
      showLast: function() {
        if (this.cur == this.all) {
          return false
        }
        return true
      },
      showFirst: function() {
        if (this.cur == 1) {
          return false
        }
        return true
      }  ,
      end: function () {
        var res = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
        if (res > this.recordsTotal) {
          res = this.recordsTotal
        }
        return res
      },
      pageSize: function () {
        var a = parseInt(this.recordsTotal / this.searchParams.length)
        var b = a + 1
        this.newPageSize=this.recordsTotal % this.searchParams.length == 0 ? a : b
        return this.newPageSize;
      },
      startNum: function () {
        if(this.recordsTotal==0){
          return 0;
        }else{
          return this.searchParams.start+1
        }
      }
    },
    methods: {
     btnClick: function(items) { //页码点击事件
        if (items != this.cur) {
            this.cur = items
        }
        //this.jumpNum=items;
        this.searchParams.start = (items-1) * parseInt(this.searchParams.length);
        this.initTable()
    }  ,
      urlHandler: function (path) {
        return "#/"+path;
      },
      initTable: function () {
        var that = this;
        if(this.searchParams.orderNum!=null && this.searchParams.orderNum!=""){
          that.$utils.ajax(that)(basePath2+'operlog', this.searchParams, function (response) {
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if(typeof (response.body) === 'string'){
              response.body = JSON.parse(response.body);
            }
            if (response.body.code == '200') {
              //debugger
              that.items = response.body.data.data;
              that.recordsTotal = response.body.data.total;
              that.all=parseInt(that.recordsTotal / that.searchParams.length)
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
        }else {
          that.$utils.alert("请填写订单号");
        }
      },
      before : function () {
       var that = this;
       that.cur--;
       that.btnClick(that.cur--);
      },
      next : function () {
          var that = this;
         that.cur++;
         that.btnClick(that.cur++);
      },
      first : function(){
        if(this.all>0){
          this.searchParams.start = 0;
          this.cur=1;
          this.initTable()
        }
      },
      final : function(){
        if(this.all>0){
          this.searchParams.start = this.searchParams.length*(this.all-1);
          this.cur=this.all;
          this.initTable()
        }
      },
      jump : function (pageNo) {
        this.jumpNum=pageNo;
        this.searchParams.start = (pageNo-1) * parseInt(this.searchParams.length);
        this.initTable()
      },
      getNum : function(index){
        //计算序号
        return parseInt(this.startNum) + parseInt(index);
      },
      callbackLType :function(){
        this.searchParams.logType = value;
      },
      //重置查询条件
      resetSearch : function(){
        $('.selectInput').val("");
        $('.select-container').find(".select2-chosen").text("");
        this.searchParams.logType = '';
        this.searchParams.empNo = '';
        this.searchParams.empName = '';
        this.searchParams.orderNum = '';
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.logType', function (newVal, oldVal) {
          if(newVal!=null && newVal!=""){
            this.setSearchParamsStart();
          }
        });
        this.$watch('searchParams.empNo', function (newVal, oldVal) {
          if(newVal!=null && newVal!=""){
            this.setSearchParamsStart();
          }
        });
        this.$watch('searchParams.empName', function (newVal, oldVal) {
          if(newVal!=null && newVal!=""){
            this.setSearchParamsStart();
          }
        });
        this.$watch('searchParams.orderNum', function (newVal, oldVal) {
          if(newVal!=null && newVal!=""){
            this.setSearchParamsStart();
          }
        });
      },
    },
    mounted: function () {
      //this.initTable();
      this.watchSearchParams();
    }

  }
</script>
<style>
  @import '/static/css/plugins/dataTables/dataTables.bootstrap.css';
  @import '/static/css/jquery-filer.css';
  @import '/static/css/jquery.filer.css';
  @import "/static/css/jquery.filer-dragdropbox-theme.css";

  .col-sm-3 table{
    text-align: center;
    margin-bottom: 0px
  }
  table td{
    padding: 5px;
  }
  label {
    color: #666666;
  }
  textarea {
    border-radius: 5px;
  }
  .wrapper {
    height: 100%;
  }
 .select, .selectInput{
    width: 65%;
    border: 1px solid rgb(229, 230, 231);
    height: 34px;
    padding: 5px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
  }
  .aa{
    padding:5px;
    text-align: center;
  }
  .num {
    font-weight:bold;
    color:#337ab7;
  }
  .orderNo {
    margin-left: 12px;
  }
  .page-bar {
        margin-top: 21px;
        margin-left: 11%;
    }

    .page-bar ul,
    .page-bar li {
        margin: 0px;
        padding: 0px;
    }

    .page-bar ul li {
        list-style: none;
        border: 1px solid #ddd;
        text-decoration: none;
        position: relative;
        float: left;
        text-align: center;
        padding: 1px 0;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        cursor: pointer;
        width: 8%;
    }

    .page-bar li:first-child>a {
        margin-left: 0px
    }

    .page-bar .active a {
        color: #fff;
        cursor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }

    .page-bar i {
        font-style: normal;
        color: #d44950;
        margin: 0px 4px;
        font-size: 12px;
    }
</style>
