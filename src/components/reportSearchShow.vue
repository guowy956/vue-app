<template>
  <!--<div class="row">-->
    <div class="gray-bg marginTop">
      <div class="wrapper wrapper-content">
        <div class="row animated fadeInRight">
          <div class="col-sm-12">
            <div class="ibox float-e-margins">
              <div class="text-center float-e-margins p-md">
                <span>预览：</span>
                <a href="#" class="btn btn-xs btn-primary" id="lightVersion" style="color: #fff">浅色</a>
                <a href="#" class="btn btn-xs btn-primary" id="darkVersion" style="color: #fff">深色</a>
                <a href="#" class="btn btn-xs btn-primary" id="leftVersion" style="color: #fff">布局切换</a>
              </div>
              <div class="" id="ibox-content">
                <div id="vertical-timeline" class="vertical-container light-timeline">
                  <div class="vertical-timeline-block" v-for="item in items">
                    <div class="vertical-timeline-icon navy-bg">
                      <i class="fa fa-briefcase"></i>
                    </div>

                    <div class="vertical-timeline-content">
                      <h2>{{ item.status | convertStatus }}</h2>
                      <p v-if="item.status == '350' || item.status == '410'"><span>信审反馈结果:{{ item.reason }}</span></p>
                      <p v-if="item.status == '760' || item.status == '770'"><span>审批结果:{{ item.reason }}</span></p>
                      <p v-if="item.status == '820'"><span>放款失败记录:{{ item.reason }}</span></p>
                      <!--<p><span>操作记录:{{ item.reason }}</span></p>-->
                      <p v-if="item.status != '100' && item.status != '350' && item.status != '410'&& item.status != '760'&& item.status != '770'&& item.status != '820'"><span>操作记录:{{ item.reason }}</span></p>
                      <p>
                        <span class="operation">操作人姓名: {{ item.empName==null ? '--' :item.empName }}</span>
                        <span class="operation">订单部门: {{ datas }}</span>
                      </p>
                      <span class="vertical-date" style="display: inline-block" v-if="item.status == '100'">
                                        进件时间 <br>
                                        <small>{{ item.operatingTime == "" ? item.createTime : item.operatingTime }}</small>
                                    </span>
                      <span class="vertical-date" style="display: inline-block" v-if="item.status != '100'">
                                        操作时间 <br>
                                        <small>{{ item.operatingTime == "" ? item.createTime : item.operatingTime }}</small>
                                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!--</div>-->

    </div>
  </div>
</template>
<script>
  import select2 from './common/select2/select2.vue';
  var vm;
  export default {
    name: 'reportSearchShow',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    data () {
      return {
        items: [],
        datas: "",
        product: {},
        orderNum: this.$route.params.orderNum,
        orderStatus: this.$route.params.orderStatus,
        createTime: "",
        reason: "",
        operatingTime: "",
        empName: "",
        empNo: "",
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
        }else if(value=='410'){
          return "欺诈";
        }else if(value=='350'){
          return "信审拒绝";
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
          return "初审待审核";
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
        }else if(value=='900'){
          return "结清";
        }else{
          return "-";
        }
      }
    },
    methods: {
      initReport: function(){
        var that = this;
        var orderNum = that.$route.params.orderNum;
        that.$utils.ajax(that)(basePath2+'team/order/audit/?orderNum='+orderNum,{}, function (response) {
          if (response.body.code == '200') {
            that.product = response.body.data.list
            that.datas = response.body.data.orgName;
//            that.initLoanTerms();
            that.items = that.product;
            if(items){
              that.formCount = items.split(",").length;
            }
          }else if(response.body.code == '401'){
          }else{
            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert("fail");
        },"get");
      },
    },
    mounted: function () {
      vm = this;
      this.initReport()
      $(document).ready(function(){$("#lightVersion").click(function(event){event.preventDefault();$("#ibox-content").removeClass("ibox-content");$("#vertical-timeline").removeClass("dark-timeline");$("#vertical-timeline").addClass("light-timeline")});$("#darkVersion").click(function(event){event.preventDefault();$("#ibox-content").addClass("ibox-content");$("#vertical-timeline").removeClass("light-timeline");$("#vertical-timeline").addClass("dark-timeline")});$("#leftVersion").click(function(event){event.preventDefault();$("#vertical-timeline").toggleClass("center-orientation")})});
    },
  }
</script>

<style>
  .ibox-content p.reportShow{
    color: #333;
    font-size: 14px;
    padding: 10px;
  }
  .ibox-content .reportShowspan{
    margin-bottom: 5px;
    display: inline-block;
  }
  .operation{
    margin-right: 20px;
    display: inline-block;
  }
  .reportShowh2{
  }
</style>
