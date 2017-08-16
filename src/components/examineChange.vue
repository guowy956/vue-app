<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title" >
              <h5>审核列表</h5>
            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3">
                  <span>订单编号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.orderNum">
                </div>
                <div class="col-sm-3">
                  <span>状态:</span>
                  <select2 :options="options.orderStatus" v-model="searchParams.status" @myclick="callbackRepStatus">
                  </select2>
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-3" style="width: 100%;text-align: center">
                  <p class='btn btn-primary' @click='initTable'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                  <a :href="exportXLS" target="_blank">
                    <button type="button" class="btn btn-info">导出</button>
                  </a>
                </div>
              </div>
            </div>
            <div class="ibox float-e-margins">
              <div class="ibox-content">
                <!--如果冻结列不好使，给tableDiv也设置一个position:relative;-->
                <div id="tableDiv" style="overflow-x:auto;">
                  <table class="table table-bordered">
                    <thead>
                    <tr class="firstTr">
                      <th>序号</th>
                      <th>操作</th>
                      <th>进件编号</th>
                      <th>申请时间</th>
                      <th>客户姓名</th>
                      <th>审核状态</th>
                      <th class="zindex">签约日期</th>
                      <th class="zindex">放款状态</th>
                      <th class="zindex">变更前首个还款日</th>
                      <th class="zindex">变更后首个还款日</th>
                      <th class="zindex">放款时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in items">
                      <td>{{ index + startNum }}</td>
                      <td v-if="item.status==1"><a @click="updateExamine(2,item.id)">审核通过</a>&nbsp;/&nbsp;<a @click="openWinEdit(item)">驳回</a></td>
                      <td v-if="item.status!=1">--</td>
                      <td>{{item.orderNum}}</td>
                      <td>{{item.applyTime}}</td>
                      <td>{{item.proposer}}</td>
                      <td>{{statusUtil[item.status]==null ? "--":statusUtil[item.status]}}</td>
                      <td>{{item.signingDay==null ? "--":item.signingDay}}</td>
                      <td v-if="item.lendStatus">{{lendStatusUtil[item.lendStatus]}}</td>
                      <td v-if="!item.lendStatus">未放款</td>
                      <td>{{item.repaymentStartDate}}</td>
                      <td>{{item.repaymentDay}}</td>
                      <td>{{item.lendDay==null ? "--":item.lendDay}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <div class="row">
                  <div class="dataTables_info col-sm-5">
                    显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项
                  </div>
                  <div class="dataTables_paginate paging_simple_numbers col-sm-7" style="text-align:right;">
                    <ul class="pagination">
                      <li class="paginate_button previous"><a @click="first()">首页</a></li>
                      <li class="paginate_button previous"><a @click="before()">上一页</a></li>
                      <li class="paginate_button" v-for="n in pageSize">
                        <a @click="jump(n)" v-if="(jumpNum<5 && n<10) || (n >=jumpNum-4 && n <=jumpNum+4) ||
                                                 (jumpNum > pageSize-5 && n>pageSize-9)">
                        <span :class="{num : jumpNum == n}" >
                          {{n}}
                        </span>
                        </a>
                      </li>
                      <li class="paginate_button next"><a @click="next()">下一页</a></li>
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
    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1" id="win" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]">
      <div class="modal-dialog modal-lg">
        <div class="modal-content animated flipInY">
          <div class="modal-header" style=" padding: 10px 30px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="appModalTitleId">{{ winTitle }}</h4>
          </div>
          <div class="modal-body form-horizontal m-t" style="margin-top:0;margin-bottom:0;padding-left: 0px;padding-right: 0px;padding-bottom: 5px;padding-top: 15px;">
            <div class="form-group formGroup">
              <div class="col-sm-12">
                <label class="col-sm-2 control-label">ID：</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" v-model="params.id" disabled="">
                </div>
              </div>
            </div>
            <div class="form-group formGroup">
              <div class="col-sm-12">
                <label class="col-sm-2 control-label">驳回原因:</label>
                <div class="col-sm-9">
                  <textarea v-model="params.reason" class="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" style="padding: 3px 15px;">
            <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWin()">关闭</button>
            <!--<button  type="button" class="btn btn-primary" :class="{hide_it:isHideSaveBtn}" @click="update(1)" :disabled="buttonDisabled.popSave">审核通过</button>-->
            <button   type="button" class="btn btn-primary" :class="{hide_it:isHideUpdateBtn}" @click="updateExamine(3,params.id)" :disabled="buttonDisabled.popUpdate">驳回</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" id="pop" :class="[showParams.modalShow ? showParams.devStyle : showParams.winShow]"></div>
  </div>
</template>

<script>
  //select2-引入select2组件
  import Select2 from './common/select2/select2_userRelation.vue';
  var vm
  export default {
    name: 'examineChange',
    components: {//select2-定义select2在当前组件中的名称
      'select2': Select2,
    },
    data:function () {
      return {
        winTitle: '新增',
        modalShow: true,
        isHideSaveBtn: true,
        isHideUpdateBtn: true,
        jumpNum : 1,
        items: [ ],
        params:{
          reason:"",
          id:""
        },
        recordsTotal: 0,
         showParams: {
          modalShow: true,
          devStyle: 'devStyle',
          winShow: 'winShow'
        },
       searchParams: {
          start: 0,
          length: 10,
          orderNum: "",
          status: "",
        },
        labels: {
          cancel: "取消",
          finish: "完成",
          next: "下一步",
          previous: "上一步"
        },
        buttonDisabled: {
          popSave: false,
          popUpdate: false,
          examine: false
        },
        statusUtil:{"2":"审核通过","1":"未审核","3":"驳回"},
        //lendStatusUtil:{"0":"未放款","1":"已放款"},
        lendStatusUtil:{"780":"放款中","800":"已放款","820":"放款失败"},
        options: {
          orderStatus: [
            {id: '', text: '请选择'},
            {id: '1', text: '未审核'},
            {id: '2', text: '审核通过'},
            {id: '3', text: '驳回'},
          ],
        },
      }
    },
    computed: {
      end: function () {
        var res = parseInt(this.searchParams.start) + parseInt(this.searchParams.length);
        if (res > this.recordsTotal) {
          res = this.recordsTotal
        }
        return res
      },
      pageSize: function () {
        var a = parseInt(this.recordsTotal / this.searchParams.length)
        var b = a + 1
        return this.recordsTotal % this.searchParams.length == 0 ? a : b
      },
      startNum: function () {
        return parseInt(this.searchParams.start) + 1;
      },

      exportXLS: function () {
        var accessToken = this.$utils.getLocalData("accessToken");
        if(!accessToken){
          this.$utils.clearLocalData("accessToken");
          this.$utils.clearLocalData("orgData");
          this.$utils.clearLocalData("hrData");
          this.$parent.$emit('changeLogin', 'N');
          return false;
        }
        var url =  basePath2 + 'changeRepayment/export?accessToken='+accessToken;
        if(this.searchParams.orderNum){
          url += "&orderNum="+this.searchParams.orderNum;
        }
        if(this.searchParams.status){
          url += "&status="+this.searchParams.status;
        }
        return url;
      }
    },
    methods: {
       updateExamine : function (indexs,id){
         if (indexs==2){
            if (confirm("确定要变更还款日吗？")){
            this.update(indexs,id);
            }
         }else{
            this.update(indexs,id);
         }
       },
     update : function (indexs,id) {
        this.buttonDisabled.popUpdate = true;
        var that = this;
        var  url =  "changeRepayment/approval?id="+id+"&status="+indexs+"&reason="+that.params.reason;
        that.$utils.ajax(that)(basePath2+url, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.$utils.alert('审核通过')
            that.closeWin()
            that.initTable()
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(this.failedMsg);
        },"put");
        this.buttonDisabled.popUpdate = false;
      },
    openWin : function () {
        this.errors.clear();
        this.showParams.modalShow = false;
      },
      openWinEdit : function (item) {
        this.winTitle = '审核';
        this.isHideSaveBtn = true
        this.isHideUpdateBtn = false
        this.params.id = item.id
        this.openWin()
      },
      clearWin : function () {
        this.params.reason = "";
      },
      closeWin : function () {
        this.clearWin()
        this.showParams.modalShow = true;
      },

      initTable : function () {
        var that = this;
        that.$utils.ajax(that)(basePath2+'changeRepayment/page',this.searchParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data.data;
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
          that.$utils.alert(this.failedMsg);
        },"get");
      },
      before : function () {
        if(parseInt(this.searchParams.start)>1){
          this.jumpNum=this.jumpNum-1;
          this.searchParams.start = parseInt(this.searchParams.start)-parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      next : function () {
        if(parseInt(this.end) < parseInt(this.recordsTotal)) {
          this.jumpNum=this.jumpNum+1;
          this.searchParams.start = parseInt(this.searchParams.start)+parseInt(this.searchParams.length)
          this.initTable()
        }
      },
      jump : function (pageNo) {
        this.jumpNum=pageNo;
        this.searchParams.start = (pageNo - 1) * parseInt(this.searchParams.length);
        this.initTable()
      },
      first : function(){
        if (this.pageSize > 0) {
          this.searchParams.start = 0;
          this.jumpNum=1;
          this.initTable()
        }
      },
      final : function(){
        if (this.pageSize > 0) {
          this.searchParams.start = parseInt(this.pageSize-1) * parseInt(this.searchParams.length);
          this.jumpNum = this.pageSize;
          this.initTable()
        }

      },
      //重置查询条件
      resetSearch : function(){
        $('.selectInput').val("");
        $('.col-sm-3').find(".select2-chosen").text("请选择");
        $('#account1').find(".select2-chosen").text("请选择");
        $('#account2').find(".select2-chosen").text("请选择");
        $('.orderS').find(".select2-chosen").text("全部");
        this.searchParams.loanName="";
        this.searchParams.orderNum="";
        this.searchParams.idNumber="";
        this.searchParams.status="";
      },
      transfers: function (longDate) {
        var date2 = new Date(longDate);
        var str2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
        return str2
      },
      callbackStatus: function(value){
        this.searchParams.accountType = value;
      },
      callbackRepStatus: function(value){
        this.searchParams.status = value;
      },
      setSearchParamsStart: function () {
        this.searchParams.start = 0;
        this.jumpNum = 1;
        this.initTable();
      },
      watchSearchParams: function () {
        this.$watch('searchParams.orderNum', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
        this.$watch('searchParams.status', function (newVal, oldVal) {
          this.setSearchParamsStart();
        });
      },
    },
    mounted: function () {
      this.initTable();
      this.watchSearchParams();
      //给table外面的div滚动事件绑定一个函数
      $("#tableDiv").scroll(function(){
        var left=$("#tableDiv").scrollLeft();//获取滚动的距离
        var trs=$("#tableDiv table tr");//获取表格的所有tr
        var ths=$('#tableDiv table tr:first th');
        trs.each(function(i){
          $(this).children().eq(0).css({"position":"relative","top":"0px","left":left,"z-index":"0","background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(1).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(2).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(3).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(4).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
          $(this).children().eq(5).css({"position":"relative","top":"0px","left":left,"background-color":"#FFFFFF","cellspacing":"0","border":"1"});
        });
        ths.eq(0).css({"background-color":"#F0F0F0"});
        ths.eq(1).css({"background-color":"#F0F0F0"});
        ths.eq(2).css({"background-color":"#F0F0F0"});
        ths.eq(3).css({"background-color":"#F0F0F0"});
        ths.eq(4).css({"background-color":"#F0F0F0"});
        ths.eq(5).css({"background-color":"#F0F0F0"});
      });
    }

  }
</script>
<style>
  @import '/static/css/plugins/dataTables/dataTables.bootstrap.css';
  @import '/static/css/jquery-filer.css';
  @import '/static/css/jquery.filer.css';
  @import "/static/css/jquery.filer-dragdropbox-theme.css";
  .devStyle{
    display : none;
  }
    .hide_it{
    display : none;
  }
  .col-sm-3 table{
    text-align: center;
    margin-bottom: 0px
  }
    .winShow{
    display : block !important;
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
  .zindex{
    z-index: -10;
  }
  .select2-container{
    width:65%;
  }
  #account1 .select2-container{
    width:40%;
  }
  #account2 .select2-container{
    width:40%;
  }
</style>
