<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5>报表查询</h5>
            </div>
            <div class="ibox-content" style="padding-bottom:5px">
              <div class="row aa">
                <div class="col-sm-3 orderS">
                  <span>产品名称:</span>
                  <select2 :options="options.productNameList" v-model="searchParams.productName"></select2>
                </div>
                <div class="col-sm-3">
                  <span>客户姓名:</span>
                  <input type="text" class="selectInput" v-model="searchParams.customerName">
                </div>
                <div class="col-sm-3">
                  <span>进件编号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.orderNum">
                </div>
                <div class="col-sm-3 orderS">
                  <span>订单状态:</span>
                  <select2 :options="options.orderStatus" v-model="searchParams.status"></select2>
                </div>
              </div>
              <div class="row aa">
                <div class="col-sm-3">
                  <span>客户经理:</span>
                  <input type="text" class="selectInput" v-model="searchParams.salesman">
                </div>
                <div class="col-sm-3">
                  <span>身份证号:</span>
                  <input type="text" class="selectInput" v-model="searchParams.idNum">
                </div>
                <div class="col-sm-3">
                  <span>进件时间:</span>
                  <input type="text" class="selectInput" id="sDate" placeholder="">
                </div>
                <div class="col-sm-3">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  至:</span>
                  <input type="text" class="selectInput" id="eDate" placeholder="">
                </div>
              </div>
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
                <div class="col-sm-3 orderS">
                  <span>订单类型:</span>
                  <select2 :options="options.orderTypes" v-model="searchParams.orderType"></select2>
                </div>
                <div class="col-sm-3">
                  <p class='btn btn-primary' @click='search()'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
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
                        <th>
                          <div style="width: 200px;">订单编号</div>
                        </th>
                        <th>
                          <div style="width: 100px;">订单状态</div></th>
                        <th><div style="width: 100px;">放款状态</div></th>
                        <th>团队经理</th>
                        <th>客户经理</th>
                        <th class="zindex"><div style="width: 60px;">客服</div></th>
                        <th class="zindex">借款人姓名</th>
                        <th class="zindex"><div style="width: 130px;">申请产品名称</div></th>
                        <th class="zindex">申请期限</th>
                        <th class="zindex">申请金额</th>
                        <th class="zindex"><div style="width: 130px;">批复产品</div></th>
                        <th class="zindex">批复期限</th>
                        <th class="zindex">批复金额</th>
                        <th class="zindex">费率</th>
                        <th class="zindex"><div style="width: 120px;">信审补件时间</div></th>
                        <th class="zindex"><div style="width: 120px;">剩余签约时间</div></th>
                        <th class="zindex"><div style="width: 120px;">驳回倒计时</div></th>
                        <th class="zindex"><div style="width: 120px;">信审批复时间</div></th>
                        <th class="zindex"><div style="width: 120px;">确认金额时间</div></th>
                        <th class="zindex"><div style="width: 130px;">运营审核时间</div></th>
                        <th class="zindex"><div style="width: 130px;">放款时间</div></th>
                        <th class="zindex">订单类型</th>
                        <th class="zindex"><div style="width: 120px;">大区</div></th>
                        <th class="zindex"><div style="width: 120px;">分中心</div></th>
                        <th class="zindex"><div style="width: 120px;">中心</div></th>
                        <th class="zindex"><div style="width: 120px;">门店</div></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in items">
                        <td>{{ index + startNum }}</td>
                        <!-- 订单编号 -->
                        <td>
                          <div width="150px;">
                          <router-link :to="'/reportSearchShow/'+item.orderNum + '/' +item.orderStatus">
                            <a>{{ item.orderNum }}</a>
                          </router-link>
                          </div>
                        </td>
                        <!--订单状态-->
                        <td>{{ item.orderStatus | convertStatus }}</td>
                        <!--放款状态-->
                        <td>{{ item.drawStatus }}</td>
                        <!--团队经理-->
                        <td>{{ item.teamManager }}</td>
                        <!--客户经理-->
                        <td>{{ item.salesman }}</td>
                        <!--客服-->
                        <td>{{ item.customService }}</td>
                        <!--借款人姓名-->
                        <td>{{ item.proposer }}</td>
                        <!--申请产品名称-->
                        <td>{{ item.productName }}</td>
                        <!--申请期限-->
                        <td>{{ item.term }}</td>
                        <!--申请金额-->
                        <td>{{ item.expectAmount }}</td>
                        <!--批复产品-->
                        <td>{{ item.actualProductName }}</td>
                        <!--批复期限-->
                        <td>{{ item.approvalTerm }}</td>
                        <!--批复金额-->
                        <td>{{ item.approvalAmount }}</td>
                        <!--费率-->
                        <td>{{ item.expenseRate }}</td>
                        <!--信审补件时间-->
                        <td>{{ countTime_1(item.creditauditbjTime) }}</td>
                        <!--剩余签约时间-->
                        <!--<td>{{ countTime_3(item.confirmAmountTime) }}</td>-->
                        <td>{{ item.dayRemaining }}</td>
                        <!--驳回倒计时-->
                        <td>{{ countTime_2(item.finalauditrejectTime) }}</td>
                        <!--信审批复时间-->
                        <td>{{ item.approvalTime }}</td>
                        <!--确认金额时间-->
                        <td>{{ item.confirmAmountTime }}</td>
                        <!--运营审核时间-->
                        <td>{{ item.approvalTimeEnd }}</td>
                        <!--放款时间-->
                        <td>{{ item.realLendDate }}</td>
                        <!--订单类型-->
                        <td>{{ orderTypeUtil[item.orderType] }}</td>
                        <td>{{ item.bigRegion }}</td>
                        <td>{{ item.partRegion }}</td>
                        <td>{{ item.region }}</td>
                        <td>{{ item.orgName }}</td>
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
            newPageSize: 0,
            jumpNum: 1,
            items: [],
            productNameList:[],
            recordsTotal: 0,
            searchParams: {
              productName: "",
              endApplicationTime: "",
              startApplicationTime: "",
              status: "",
              idNum: "",
              loansStatus: "",
              reliefStatus: "",
              accountModifyStatus: "",
              orderType: "",
              overDueStatus: "",
              salesman: "",
              length: 10,
              start: 0,
              pageSize: 10,
              orderNum: "",
              proposer: "",
              customerName: "",
              roleLv1: "",
              roleLv2: "",
              roleLv3: "",
              roleLv4: "",
            },
            isHideRoleLv: {
              roleLv1: true,
              roleLv2: true,
              roleLv3: true,
              roleLv4: true,
            },
            orderTypeUtil: {
              "":"全部",
              "1":"银谷普惠",
              "2":"云钱袋"
            },
            options: {
              roleLv1: [],
              roleLv2: [],
              roleLv3: [],
              roleLv4: [],
              orderTypes: [
                {id: '', text: '全部'},
                {id: '2', text: '云钱袋'},
                {id: '1', text: '银谷普惠'}

              ],
              productNameList:[],
              orderStatus: [
                {
                  id: '',
                  text: '全部'
                }, {
                  id: '100',
                  text: '待保存'
                }, {
                  id: '110',
                  text: '已保存'
                },{
                  id: '112',
                  text: '已删除'
                },{
                  id: '120',
                  text: '待质检'
                },{
                  id: '200',
                  text: '预约取消'
                },{
                  id: '300',
                  text: '信审中'
                },{
                  id: '310',
                  text: '信审补件'
                },{
                  id: '350',
                  text: '信审拒绝'
                },{
                  id: '400',
                  text: '信审通过'
                },{
                  id: '500',
                  text: '订单超时'
                },{
                  id: '510',
                  text: '放弃签约'
                },{
                  id: '600',
                  text: '确认金额'
                },{
                  id: '610',
                  text: '待签约'
                },{
                    id: '700',
                    text: '募集中'
                }, {
                    id: '730',
                    text: '待面签'
                }, {
                    id: '750',
                    text: '待审核'
                }, {
                    id: '770',
                    text: '审核通过'
                }, {
                    id: '740',
                    text: '门店拒绝'
                }, {
                    id: '760',
                    text: '审核驳回'
                }],
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
        filters:{
          //转换订单状态
          convertStatus : function(value){
            if(value=='100'){
              return "待保存";
            }else if(value=='110'){
              return "已保存";
            }else if(value=='112'){
              return "已删除";
            }else if(value=='120'){
              return "待质检";
            }else if(value=='200'){
              return "预约取消";
            }else if(value=='300'){
              return "信审中";
            }else if(value=='310'){
              return "信审补件";
            }else if(value=='311'){
              return "信审已补件";
            }else if(value=='350'){
              return "信审拒绝";
            }else if(value=='360'){
              return "同意信审拒绝";
            }else if(value=='410'){
              return "欺诈";
            }else if(value=='400'){
              return "信审通过";
            }else if(value=='500'){
              return "订单超时";
            }else if(value=='510'){
              return "放弃签约";
            }else if(value=='600'){
              return "确认金额";
            }else if(value=='610'){
              return "待签约";
            }else if(value=='620'){
              return "已签约";
            }else if(value=='625'){
              return "变更银行卡";
            }else if(value=='650'){
              return "募集中";
            }else if(value=='700'){
              return "募集中";
            }else if(value=='710'){
              return "初审审核驳回";
            }else if(value=='715'){
              return "门店取消";
            }else if(value=='720'){
              return "初审审核通过";
            }else if(value=='730'){
              return "待面签";
            }else if(value=='735'){
              return "变更还款日";
            }else if(value=='740'){
              return "门店拒绝";
            }else if(value=='750'){
              return "终审待审核";
            }else if(value=='760'){
              return "终审审核驳回";
            }else if(value=='770'){
              return "终审审核通过";
            }else if(value=='780'){
              return "放款中";
            }else if(value=='800'){
              return "已放款";
            }else if(value=='820'){
              return "放款失败";
            }else if(value=='850'){
              return "提前结清";
            }else if(value=='900'){
              return "结清";
            }else{
              return "-";
            }
          }
        },
        methods: {
          /**
           * creditauditbjTime 补件时间  信审驳回倒计时 10
           * creditauditbjTime+10-now=信审补件时间
           * @param value
           * @returns {*}
           */
            countTime_1: function (value) {
              if(!value){
                return "-";
              }
              var n = new Date(value).getTime();
              var d = 24 * 60 * 60 * 1000;
              var d10 = 10 * d;
              var now = new Date().getTime();
              var m = n+d10-now;
              var res = parseInt(m/d);
              return res;
            },
          /**
           * finalauditrejectTime 驳回时间 运营驳回后倒计时10
           * finalauditrejectTime+10-now=驳回倒计时
           * @param value
           * @returns {*}
           */
            countTime_2: function (value) {
              if(!value){
                return "-";
              }
              var n = new Date(value).getTime();
              var d = 24 * 60 * 60 * 1000;
              var d10 = 10 * d;
              var now = new Date().getTime();
              var m = n+d10-now;
              var res = parseInt(m/d);
              return res;
            },
          /**
           * confirmAmountTime 确认金额时间 签约倒计时  15
           * confirmAmountTime+15-now = 剩余签约时间
           * @param value
           * @returns {*}
           */
            countTime_3: function (value) {
              if(!value){
                return "-";
              }
              var n = new Date(value).getTime();
              var d = 24 * 60 * 60 * 1000;
              var d15 = 15 * d;
              var now = new Date().getTime();
              var m = n+d15-now;
              var res = parseInt(m/d);
              if(res<=0){
                return "-";
              }
              return res;
            },
            btnClick: function (items) { //页码点击事件
                if (items != this.cur) {
                    this.cur = items
                }
                this.searchParams.start = (items - 1) * parseInt(this.searchParams.length)+1;
                this.initTable()
            },
            initTable: function () {
                var that = this;
                that.$utils.ajax(that)(basePath2 + 'team/order/list', this.searchParams, function (response) {
                    if (typeof (response.body) === 'string') {
                        response.body = JSON.parse(response.body);
                    }
                    if (typeof (response.body) === 'string') {
                        response.body = JSON.parse(response.body);
                    }
                    if (response.body.code == '200') {
                        that.items = response.body.data.data;
                        that.recordsTotal = response.body.data.recordsTotal;
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
          before: function () {
            if (parseInt(this.searchParams.start) > 1) {
              this.jumpNum = this.jumpNum - 1;
              this.searchParams.start = parseInt(this.searchParams.start) - parseInt(this.searchParams.length)
              this.initTable()
            }
          },
          next: function () {
            if (parseInt(this.end) < parseInt(this.recordsTotal)) {
              this.jumpNum = this.jumpNum + 1;
              this.searchParams.start = parseInt(this.searchParams.start) + parseInt(this.searchParams.length)
              this.initTable()
            }
          },
          jump: function (pageNo) {
            this.jumpNum = pageNo;
            this.searchParams.start = (pageNo - 1) * parseInt(this.searchParams.length);
            this.initTable()
          },
          first: function () {
            if (this.pageSize > 0) {
              this.searchParams.start = 0;
              this.jumpNum = 1;
              this.initTable()
            }
          },
          final: function () {
            if (this.pageSize > 0) {
              this.searchParams.start = parseInt(this.pageSize-1) * parseInt(this.searchParams.length);
              this.jumpNum = this.pageSize;
              this.initTable()
            }

          },
            search: function () {
                this.searchParams.start = 0;
                this.initTable();
            },
          //查询产品种类
          queryProduct : function () {
            var that = this;
            that.$utils.ajax(that)(basePath2+'product/all',this.searchParams, function (response) {
              if(typeof (response.body) === 'string'){
                response.body = JSON.parse(response.body);
              }
              if(typeof (response.body) === 'string'){
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                var values = response.body.data;
                if(values){
                  $(values).each(function (i, item) {
                    var value = {};
                    value.id = item.productName;
                    value.text = item.productName;
                    that.options.productNameList.push(value);
                  });
                }
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
          //重置查询条件
          resetSearch: function () {
//            $('.selectInput').val("");
//            $('.col-sm-3').find(".select2-chosen").text("请选择");
//            $('.orderS').find(".select2-chosen").text("全部");
            this.searchParams.proposer = "";
            this.searchParams.orderNum = "";
            this.searchParams.salesman = "";
            this.searchParams.status = "";
            this.searchParams.endApplicationTime = "";
            this.searchParams.startApplicationTime = "";
            this.searchParams.productName = "";
            this.searchParams.proposer = "";
            this.searchParams.idNum = "";
            this.searchParams.customerName = "";
            this.searchParams.orderType = "";
            this.searchParams.roleLv1 = "";
            this.searchParams.roleLv2 = "";
            this.searchParams.roleLv3 = "";
            this.searchParams.roleLv4 = "";

          },
          setSearchParamsStart: function () {
              this.searchParams.start = 0;
              this.jumpNum = 1;
              this.initTable();
          },
          watchSearchParams: function () {
            this.$watch('searchParams.productName', function (newVal, oldVal) {
                this.setSearchParamsStart();
            });
            this.$watch('searchParams.customerName', function (newVal, oldVal) {
                this.setSearchParamsStart();
            });
            this.$watch('searchParams.proposer', function (newVal, oldVal) {
              this.setSearchParamsStart();
            });
            this.$watch('searchParams.orderNum', function (newVal, oldVal) {
                this.setSearchParamsStart();
            });
            this.$watch('searchParams.status', function (newVal, oldVal) {
                this.setSearchParamsStart();
            });
            this.$watch('searchParams.salesman', function (newVal, oldVal) {
                this.setSearchParamsStart();
            });
            this.$watch('searchParams.idNum', function (newVal, oldVal) {
                this.setSearchParamsStart();
            });
            this.$watch('searchParams.startApplicationTime', function (newVal, oldVal) {
              this.setSearchParamsStart();
            });
            this.$watch('searchParams.endApplicationTime', function (newVal, oldVal) {
              this.setSearchParamsStart();
            });
          },
        },
        mounted: function () {
          var that = this;
          this.initTable();
          that.initRoleLv();
          that.hideRoleLv();
          this.watchSearchParams();
          this.queryProduct();
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
            that.searchParams.startApplicationTime=$("#sDate").val();
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
            that.searchParams.endApplicationTime=$("#eDate").val();
          });
            //给table外面的div滚动事件绑定一个函数
          $("#tableDiv").scroll(function () {
            var left = $("#tableDiv").scrollLeft(); //获取滚动的距离
            var trs = $("#tableDiv table tr"); //获取表格的所有tr
            var ths = $('#tableDiv table tr:first th');

            //$(trs).children('#firstTr').css({"background-color":"red"});
            trs.each(function (i) {
                //对每一个tr（每一行）进行处理
                // 获得每一行下面的所有的td，然后选中下标为0的，即第一列，设置position为相对定位
                //相对于父div左边的距离为滑动的距离，然后设置个背景颜色，覆盖住后面几列数据滑动到第一列下面的情况
                //如果有必要也可以设置一个z-index属性
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
</style>
