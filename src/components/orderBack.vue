<template>
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5>订单回退</h5>

            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3"> <span>进件编号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.orderNum">
                  <p v-if="isDebugShow">{{searchParams.orderNum}}</p>
                </div>
                <div class="col-sm-3"> <span>回退状态:</span>
                  <select2 :options="options.backStatus" v-model="searchParams.backStatus"></select2>
                  <p v-if="isDebugShow">{{searchParams.backStatus}}</p>
                </div>
                <div class="col-sm-3"> <span>退票开始时间:</span>
                  <input type="text" class="selectInput" id="backStartTime" readonly>
                  <p v-if="isDebugShow">{{searchParams.backStartTime}}</p>
                </div>
                <div class="col-sm-3"> <span>退票结束时间:</span>
                  <input type="text" class="selectInput" id="backEndTime" readonly>
                  <p v-if="isDebugShow">{{searchParams.backEndTime}}</p>
                </div>
                <div class="col-sm-3" style="text-align: center">
                  <p class='btn btn-primary' @click='searchTable'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                </div>
              </div>
            </div>
            <div class="ibox float-e-margins">
              <div class="ibox-content">
                <div id="tableDiv" style="overflow-x:auto;">
                  <table class="table table-bordered">
                    <thead>
                    <tr class="firstTr">
                      <th>序号</th>
                      <th>进件编号</th>
                      <th>客户姓名</th>
                      <th>身份证号</th>
                      <th class="zindex">银行卡号</th>
                      <th class="zindex">开户行支行</th>
                      <th class="zindex">放款状态</th>
                      <th class="zindex">放款时间</th>
                      <th class="zindex">放款金额</th>
                      <th class="zindex">营业部</th>
                      <th class="zindex">区域</th>
                      <th class="zindex" v-if="!showBtn">审核状态</th>
                      <th class="zindex">业务类型</th>
                      <th class="zindex" v-if="!showBtn">回退状态</th>
                      <th class="zindex" v-if="!showBtn">回退原因</th>
                      <th class="zindex" v-if="!showBtn">失败原因</th>
                      <th class="zindex" v-show="showBtn">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in items">
                      <td>{{ index + startNum }}</td>
                      <td>
                        {{item.loanCode}}
                      </td>
                      <td>{{item.customerName}}</td>
                      <td>{{item.customerIdCard}}</td>
                      <td>{{item.cardNo}}</td>
                      <td>{{item.branchName}}</td>
                      <td>{{item.drawStatusDesc}}</td>
                      <td>{{item.realLendDate}}</td>
                      <td>{{toMoney(item.realLendMoney)}}</td>
                      <td>{{item.loanStoreName}}</td>
                      <td></td>
                      <td v-if="!showBtn">{{item.approvalStatusDesc}}</td>
                      <td>{{item.businessTypeDesc}}</td>
                      <td v-if="!showBtn">{{item.backStatusDesc}}</td>
                      <td v-if="!showBtn && item.backReason"><a @click="openWin(item,1)">查看详情</a></td>
                      <td v-if="!showBtn && !item.backReason"></td>
                      <td v-if="!showBtn && item.failReason"><a @click="openWin(item,2)">查看详情</a></td>
                      <td v-if="!showBtn && !item.failReason"></td>
                      <td v-show="showBtn">
                        <p v-if="item.backStatus != 3" class='btn btn-primary' @click='openWinBack(item)'><i class='fa fa-paste'></i>回退</p>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="dataTables_info col-sm-5">显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项</div>
                  <div class="dataTables_paginate paging_simple_numbers col-sm-7"
                       style="text-align:right;">
                    <ul class="pagination">
                      <li class="paginate_button previous"><a @click="first()">首页</a>

                      </li>
                      <li class="paginate_button previous"><a @click="before()">上一页</a>

                      </li>
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

    <div v-show="isWinShow" class="win" id="win">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">{{ winTitle }}</h4>
          </div>
          <form class="form-horizontal m-t">
            <div class="modal-body">
              {{ reasonShow }}
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal inmodal in" style="overflow: auto;" tabindex="-1" id="winBack">
      <div class="modal-dialog">
        <div class="modal-content animated flipInY">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" @click="closeWinBack()"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">订单回退</h4>
          </div>

          <form class="form-horizontal m-t">
            <div class="modal-body">
              <div class="form-group">
                <label class="col-sm-3 control-label">进件编号：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params.orderNum" disabled>
                  <p v-if="isDebugShow">{{params.orderNum}}</p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">放款时间：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="params.realLendDate" disabled>
                  <p v-if="isDebugShow">{{params.realLendDate}}</p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">回退原因：</label>
                <div class="col-sm-8">
                  <textarea class="form-control" v-model="params.reason"></textarea>
                  <p v-if="isDebugShow">{{params.reason}}</p>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="margin-top: 10px;">
              <button type="button" class="btn btn-white" data-dismiss="modal" @click="closeWinBack()">关闭</button>
              <button type="button" class="btn btn-primary" @click="applyBack()">回退</button>
            </div>
          </form>

        </div>
      </div>
    </div>

    <div v-show="isWinShow" class="modal-backdrop fade in" id="pop"></div>
    <div v-show="isBackWinShow" class="modal-backdrop fade in" id="pop2"></div>

  </div>
</template>
<script>
  import Select2 from './common/select2/select2.vue';
  var vm
  export
  default {
    name: 'orderBack',
    components: { //select2-定义select2在当前组件中的名称
      'select2': Select2,
    },
    data: function () {
      return {
        options: {
          backStatus:[
            {"id":"0","text":"已回退"},
            {"id":"1","text":"成功"},
            {"id":"2","text":"失败"},
            {"id":"3","text":"申请"},
            {"id":"4","text":"驳回"}
          ]
        },
        showBtn: false,
        winTitle: "",
        reasonShow: "",
        isDebugShow: false,
        isWinShow: false,
        isBackWinShow: false,
        jumpNum: 1,
        items: [],
        recordsTotal: 0,
        searchParams: {
          start: 0,
          length: 10,
          orderNum: "",
          backStartTime: "",
          backEndTime: "",
          backStatus: ""
        },
        params: {
          orderNum: "",
          realLendDate: "",
          reason: ""
        }
      }
    },
    computed: {
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
        return this.recordsTotal % this.searchParams.length == 0 ? a : b
      },
      startNum: function () {
        return parseInt(this.searchParams.start) + 1;
      }
    },
    methods: {
      toMoney: function (value) {
        return toMoney(value)
      },
      // 后加的
      closeWin: function () {
        this.isWinShow = false;
        this.winTitle = "";
        this.reasonShow = "";
      },
      openWin: function (item, index) {
        if(index == 1){
          this.winTitle = "回退原因";
          this.reasonShow = item.backReason;
        }
        if(index == 2){
          this.winTitle = "失败原因";
          this.reasonShow = item.failReason;
        }
        this.isWinShow = true;
      },
      openWinBack: function (item) {
        this.params.orderNum = item.loanCode;
        this.params.realLendDate = item.realLendDate;
        this.isBackWinShow = true;
        $("#winBack").addClass("winShow");
      },
      closeWinBack: function () {
        this.params.orderNum = "";
        this.params.realLendDate = "";
        this.params.reason = "";
        this.isBackWinShow = false;
        $("#winBack").removeClass("winShow");
      },
      applyBack: function () {
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'orderBack/apply', this.params, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.closeWinBack();
            that.initTable();
          } else if (response.body.code == '401') {
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin', 'N');
          } else {
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(this.failedMsg);
        }, "put");
      },
      searchTable: function () {
        this.showBtn = true;
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'orderBack/paramSearch', this.searchParams, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data.data;
            that.recordsTotal = response.body.data.recordsTotal;
          } else if (response.body.code == '401') {
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin', 'N');
          } else {
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(this.failedMsg);
        }, "get");
      },
      initTable: function () {
        this.showBtn = false;
        var that = this;
        var sparam = {};
        sparam.start = that.searchParams.start;
        sparam.length = that.searchParams.length;
        that.$utils.ajax(that)(basePath2 + 'orderBack/initSearch', sparam, function (response) {
          if (typeof (response.body) === 'string') {
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
            that.items = response.body.data.data;
            that.recordsTotal = response.body.data.recordsTotal;
          } else if (response.body.code == '401') {
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin', 'N');
          } else {
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(this.failedMsg);
        }, "get");
      },
      before: function () {
        if (parseInt(this.searchParams.start) > 1) {
          this.jumpNum = this.jumpNum - 1;
          this.searchParams.start = parseInt(this.searchParams.start) - parseInt(this.searchParams.length)
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }
        }
      },
      next: function () {
        if (parseInt(this.end) < parseInt(this.recordsTotal)) {
          this.jumpNum = this.jumpNum + 1;
          this.searchParams.start = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }
        }
      },
      jump: function (pageNo) {
        this.jumpNum = pageNo;
        this.searchParams.start = (pageNo - 1) * parseInt(this.searchParams.length);
        if(this.showBtn){
          this.searchTable();
        }else{
          this.initTable();
        }
      },
      first: function () {
        if (this.pageSize > 0) {
          this.searchParams.start = 0;
          this.jumpNum = 1;
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }
        }
      },
      final: function () {
        if (this.pageSize > 0) {
          this.searchParams.start = parseInt(this.pageSize-1) * parseInt(this.searchParams.length);
          this.jumpNum = this.pageSize;
          if(this.showBtn){
            this.searchTable();
          }else{
            this.initTable();
          }

        }

      },
      //重置查询条件
      resetSearch: function () {
        this.searchParams.start = 0;
        this.searchParams.orderNum = "";
        this.searchParams.backStartTime = "";
        this.searchParams.backEndTime = "";
        this.searchParams.backStatus = "";
        $("#backStartTime").val("");
        $("#backEndTime").val("");
        this.initTable();
      },
      initDateTimePicker_1: function () {
        var that = this;
        $('#backStartTime').datetimepicker({
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
          that.searchParams.backStartTime = $("#backStartTime").val();
        });
      },
      initDateTimePicker_2: function () {
        var that = this;
        $('#backEndTime').datetimepicker({
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
          that.searchParams.backEndTime = $("#backEndTime").val();
        });
      }
    },
    mounted: function () {
      this.initTable();
      this.initDateTimePicker_1();
      this.initDateTimePicker_2();
      //给table外面的div滚动事件绑定一个函数
      $("#tableDiv").scroll(function () {
        var left = $("#tableDiv").scrollLeft(); //获取滚动的距离
        var trs = $("#tableDiv table tr"); //获取表格的所有tr
        var ths = $('#tableDiv table tr:first th');
        trs.each(function (i) {
          $(this).children().eq(0).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "z-index": "0",
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(1).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(2).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(3).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(4).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
          $(this).children().eq(5).css({
            "position": "relative",
            "top": "0px",
            "left": left,
            "background-color": "#FFFFFF",
            "cellspacing": "0",
            "border": "1"
          });
        });
        ths.eq(0).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(1).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(2).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(3).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(4).css({
          "background-color": "#F0F0F0"
        });
        ths.eq(5).css({
          "background-color": "#F0F0F0"
        });
      });
    }

  }
</script>
<style>
  @import'/static/css/plugins/dataTables/dataTables.bootstrap.css';
  @import'/static/css/jquery-filer.css';
  @import'/static/css/jquery.filer.css';
  @import"/static/css/jquery.filer-dragdropbox-theme.css";
  .col-sm-3 table {
    text-align: center;
    margin-bottom: 0px
  }
  table td {
    padding: 5px;
  }
  label {
    color: #666666;
  }
  .wrapper {
    height: 100%;
  }
  .select, .selectInput {
    width: 65%;
    border: 1px solid rgb(229, 230, 231);
    height: 34px;
    padding: 5px;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
  }
  .aa {
    padding:5px;
    text-align: center;
  }
  .zindex {
    z-index: -10;
  }
</style>
