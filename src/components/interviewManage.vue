<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox">
            <div class="ibox-title">
              <h5>面签管理</h5>
            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3" style="margin-left: -2%">
                  <span>全局面签天数设置:</span>
                  <select2 :options="options.day" v-model="searchParams.sign" :select2Style="select2Style_2"></select2>
                </div>
                <div class="col-sm-1" style="margin-left: -6%;">
                  <input type="text" class="selectInput" v-model="searchParams.days">
                  <span>天</span>
                </div>
                <div class="col-sm-3">
                  <span>开始日期:</span>
                  <input type="text" class="selectInput" v-model="searchParams.startDate" id="startDates">
                </div>
                <div class="col-sm-1">
                  <p class='btn btn-primary' @click='openWin1()'>设置</p>
                </div>
              </div>
            </div>
            <div class="ibox-content">
              <div class="row aa">
                <div class="col-sm-3 ">
                  <span>营业部:</span>
                  <select2 :options="options.orgs" v-model="searchParams.orgId" disabled="disabled"></select2>
                </div>
                <div class="col-sm-3">
                  <span>面签天数:</span>
                  <input type="text" class="selectInput" v-model="searchParams.initDays">
                </div>
                <div class="col-sm-3">
                  <span>延长天数:</span>
                  <input type="text" class="selectInput" v-model="searchParams.extendDays">
                </div>
                <div class="col-sm-3">
                  <p class='btn btn-primary' @click='search()'><i class='fa fa-paste'></i>查询</p>
                  <p class='btn btn-primary' @click='resetSearch()'><i class='fa fa-paste'></i>重置</p>
                </div>
              </div>
              <div class="row aa">

              </div>
            </div>
            <div class="ibox float-e-margins">
              <div class="ibox-content">
                <!--如果冻结列不好使，给tableDiv也设置一个position:relative;-->
                <div id="tableDiv" style="overflow-x:auto;">
                  <table class="table table-bordered">
                    <thead>
                      <tr class="firstTr">
                        <th style="width: 3%">序号</th>
                        <th>中心</th>
                        <th>分中心</th>
                        <th>区域</th>
                        <th>营业部</th>
                        <th>面签天数</th>
                        <th>延长天数</th>
                        <th>延迟次数</th>
                        <th>开始日期</th>
                        <th>修改日期</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in items">
                        <td>{{ index + startNum }}</td>
                        <td>{{ item.lv1}}</td>
                        <td>{{ item.lv2}}</td>
                        <td>{{ item.lv3 }}</td>
                        <td>{{ item.lv4}}</td>
                        <td>{{ item.init_days<0?0:item.init_days }}</td>
                        <td>{{ item.extend_days<0?0:item.extend_days }}</td>
                        <td>{{ item.extend_time<0?0:item.extend_time }}</td>
                        <td>{{ transfers(item.create_time)}}</td>
                        <td>{{ transfers(item.update_time)}}</td>
                        <td style="width: 15%">
                          <button class="btn btn-primary" @click="openWin(item)" style="margin-bottom: 0px">修改</button>
                          <button class="btn btn-primary" @click="" style="margin-bottom: 0px">
                            <!--<router-link :to="'/interviewDetail/'+item.org_id"><a style="color: #ffffff">详情</a></router-link>-->
                            <router-link :to="'/interviewDetail/'+item.org_id + '/' +item.lv4"><a style="color: #ffffff">详情</a></router-link>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="dataTables_info col-sm-4">显示 {{ startNum }} 到 {{ end }} 项，共 {{ recordsTotal }} 项</div>
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
    <div class="modal inmodal in" tabindex="-1" id="win">
      <div class="modal-dialog pop">
        <div class="modal-content">
          <div class="modal-header" style="padding: 10px;">
            <button type="button" class="close" data-dismiss="modal" @click="closeWin()">
              <span aria-hidden="true">×</span></button>
            <h3 class="modal-title">修改</h3>
          </div>
          <form class="form-horizontal m-t">
            <div class="modal-body">
              <div class="form-group">
                <label class="col-sm-3 control-label">营业部：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="searchParams.lv4" disabled="disabled">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">面签天数：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="searchParams.init_days" data-vv-as="面签天数" v-validate="'required|numeric|max:32'" :class="{'input': true, 'is-danger': errors.has('dayss') }" name="dayss">
                  <span v-show="errors.has('dayss')" class="help is-danger">{{ errors.first('dayss') }}</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">延长天数：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="searchParams.extend_days" data-vv-as="延长天数" v-validate="'required|numeric|max:32'" :class="{'input': true, 'is-danger': errors.has('day') }" name="day">
                  <span v-show="errors.has('day')" class="help is-danger">{{ errors.first('day') }}</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">延长次数：</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" v-model="searchParams.extend_time" data-vv-as="延长次数" v-validate="'required|numeric|max:32'" :class="{'input': true, 'is-danger': errors.has('time') }" name="time">
                  <span v-show="errors.has('time')" class="help is-danger">{{ errors.first('time') }}</span>
                </div>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="updateVeeValidate()">修改</button>
            <button class="btn btn-warning" type="button" @click="closeWin()">关闭</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal inmodal in" tabindex="-1" id="win1">
      <div class="modal-dialog modal-sm pop">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" style="font-size: 22px">确定对全局面签天数设置？</h3>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" type="button" @click="allDay()">确定</button>
            <button class="btn btn-warning" type="button" @click="closeWin1()">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade in" style="display: none" id="pop"></div>
  </div>
</template>
<script>
    //select2-引入select2组件
    import Select2 from './common/select2/select2.vue';
    var vm
    export
    default {
        name: 'interviewManage',
        components: { //select2-定义select2在当前组件中的名称
            'select2': Select2,
        },
        data: function () {
          return {
            select2Style_2: {//select2-style样式
              "width": "24%",
              "font-size":"18px",
            },
            all: 0, //总页数
            cur: 1, //当前页码
            newPageSize: 0,
            jumpNum: 1,
            isBackWinShow: false,
            items: [],
//            productNameList:[],
            recordsTotal: 0,
            options: {
              orgs: [],
              day: [
                {
                  id: 'true',
                  text: '+'
                },
                {
                  id: 'false',
                  text: '-'
                },
              ],
            },
            searchParams: {
              id: "",
              start: 0,
              length: 10,
              extend_days: "",
              extendDays: "",
              initDays: "",
              init_days: "",
              extend_time: "",
              org_id: "",
              orgId: "",
              days: "",
              lv4: "",
              sign: "",
              startDate: "",
            },
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
          transfers: function (longDate) {
            if(longDate == null){return ""; }
            var date2 = new Date(longDate);
            var str2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
            return str2
          },
          initOrgs: function () {//select2-初始化option
            var that = this;
            that.$utils.ajax(that)(basePath2 + 'org/options', {}, function (response) {
              if (typeof (response.body) === 'string') {
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                that.options.orgs = response.body.data;
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
            that.$utils.ajax(that)(basePath2 + 'interview/page', this.searchParams, function (response) {
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
          updateVeeValidate: function () {
            var that = this;
            this.$validator.validateAll().then(() => {
              that.update();
            }).catch(() => {
            });
          },
          update: function () {
            var that = this;
            var url = basePath2 + 'interview/updateConfig?id='+that.searchParams.id+'&initDays='+that.searchParams.init_days+'&extendDays='+that.searchParams.extend_days+'&extendTime='+that.searchParams.extend_time;
            that.$utils.ajax(that)(url, {}, function (response) {
              if(typeof (response.body) === 'string'){
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                that.$utils.alert("修改成功")
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
              that.$utils.alert("fail");
            }, "get");
          },
          allDay: function () {
            var that = this;
            var url = basePath2 + 'interview/updateAllInitDays?sign='+that.searchParams.sign+'&days='+that.searchParams.days+'&startDate='+that.searchParams.startDate;
            that.$utils.ajax(that)(url, {}, function (response) {
              if(typeof (response.body) === 'string'){
                response.body = JSON.parse(response.body);
              }
              if (response.body.code == '200') {
                that.$utils.alert("设置成功");
                that.closeWin1()
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
              that.$utils.alert("fail");
            }, "get");
          },
          callback_1: function(value, text){
            this.searchParams.lv4 = text;
          },
          openWin: function (item) {
            this.searchParams.lv4 = item.lv4;
            this.searchParams.init_days = item.init_days;
            this.searchParams.extend_days = item.extend_days;
            this.searchParams.extend_time = item.extend_time;
            this.searchParams.id = item.id;
            this.isBackWinShow = true;
            $("#win").addClass("winShow");
            $("#pop").addClass("winShow");
          },
          closeWin: function () {
            this.searchParams.org_id = "";
            this.searchParams.init_days = "";
            this.searchParams.extend_days = "";
            this.searchParams.extend_time = "";
            this.searchParams.id = "";
            this.isBackWinShow = false;
            $("#win").removeClass("winShow");
            $("#pop").removeClass("winShow");
          },
          openWin1: function (item) {
            this.isBackWinShow = true;
            $("#win1").addClass("winShow");
            $("#pop").addClass("winShow");
          },
          closeWin1: function () {
            this.isBackWinShow = false;
            $("#win1").removeClass("winShow");
            $("#pop").removeClass("winShow");
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
          //重置查询条件
          resetSearch: function () {
            this.searchParams.extendDays = "";
            this.searchParams.initDays = "";
            this.searchParams.orgId = "";
          },
          setSearchParamsStart: function () {
              this.searchParams.start = 0;
              this.jumpNum = 1;
              this.initTable();
          },
          watchSearchParams: function () {
            this.$watch('searchParams.extendDays', function (newVal, oldVal) {
                this.setSearchParamsStart();
            });
            this.$watch('searchParams.initDays', function (newVal, oldVal) {
              this.setSearchParamsStart();
            });
            this.$watch('searchParams.orgId', function (newVal, oldVal) {
              this.setSearchParamsStart();
            });
          },
        },
        mounted: function () {
          var that = this;
          that.initTable();
          that.initOrgs();
          that.watchSearchParams();
          $('#startDates').datetimepicker({
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
            that.searchParams.startDate = $("#startDates").val();
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
    @import'/static/css/jquery-filer.css';
    @import'/static/css/jquery.filer.css';
    @import"/static/css/jquery.filer-dragdropbox-theme.css";
</style>
