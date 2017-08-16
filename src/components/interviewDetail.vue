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
              <a @click="goback()" class="btn btn-xs btn-warning" id="" style="color: #fff">返回</a>
            </div>
            <div class="" id="ibox-content">
              <div id="vertical-timeline" class="vertical-container light-timeline">
                <div class="vertical-timeline-block" v-for="item in items">
                  <div class="vertical-timeline-icon navy-bg">
                    <i class="fa fa-briefcase"></i>
                  </div>
                  <div class="vertical-timeline-content">
                    <h2>{{ item.type | convertType }}</h2>
                    <p>
                      <span>操作时间: {{ item.createTime}}</span>
                    </p>
                    <p>
                      <span>面签天数: {{ item.initDays<0?0:item.initDays }}</span>
                      <span style="margin-left: 10px">延长天数: {{ item.extendDays<0?0:item.extendDays }}</span>
                      <span style="margin-left: 10px">延长次数: {{ item.extendTime<0?0:item.extendTime }}</span>
                    </p>
                    <p>
                      <span>操作人: {{ item.operatorName==null ? '--' : item.operatorName}}</span>
                      <!--<span>营业部: {{ lv4==null ? '&#45;&#45;' : lv4}}</span>-->
                    </p>
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
    name: 'interviewDetail',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    data () {
      return {
        items: [],
        org_id: this.$route.params.orgId,
        lv4: this.$route.params.lv4,
      }
    },
    filters:{
      convertType : function(type){
        if(type=='0'){
          return "初始化";
        }else if(type=='1'){
          return "定时器按月初始化";
        }else if(type=='2'){
          return "营业部待面签延迟操作 （延长）";
        }else if(type=='3'){
          return "面签管理修改操作";
        }else if(type=='4'){
          return "全局修改面签天数";
        }else if(type=='5'){
          return "定时任务执行全局修改面签天数";
        }else{
          return "-";
        }
      }
    },
    methods: {
      goback:function(){
        history.back(-1);
      },
      timeline: function(){
//        debugger
        var that = this;
        var orgId = that.$route.params.orgId;
        that.$utils.ajax(that)(basePath2+'interview/timeline/?orgId='+orgId,{}, function (response) {
          if (response.body.code == '200') {
            that.product = response.body.data
            that.items = that.product;
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
      this.timeline();
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
