<template>
  <!--<h1>变更组织</h1>-->
  <div class="gray-bg marginTop">
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title" style="border-bottom: 1px solid #e7eaec;">
              <h5>省市区下拉框例子</h5>
            </div>
            <div class="ibox-content col-md-12">
              <div class="col-sm-3">
                <select2 :options="provinceOptions" v-model="province" :select2Style="select2Style" @myMethod="callbackA"></select2>
                <p v-if="debugShow" class="debugCss">province: {{ province }}</p>
              </div>
              <div class="col-sm-3">
                <select2 :options="cityOptions" v-model="city" :select2Style="select2Style" @myMethod="callbackB"></select2>
                <p v-if="debugShow" class="debugCss">city: {{ city }}</p>
              </div>
              <div class="col-sm-3">
                <select2 :options="areaOptions" v-model="area" :select2Style="select2Style"></select2>
                <p v-if="debugShow" class="debugCss">area: {{ area }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import select2 from './select2/select2.vue';

  export default {
    name: 'areaDemo',
    components: {//select2-定义select2在当前组件中的名称
      select2
    },
    data: function () {
      return {
        debugShow: true, // 是否为测试模式，测试模式会显示参数值
        select2Style: {//select2-style样式
          "width": "100%",
          "font-family": "华文行楷",    // 这句只为了演示怎么加样式，实际使用中不要加
          "font-weight": "bolder",   // 同上
        },
        provinceOptions: [],
        cityOptions: [],
        areaOptions: [],
        province: "",
        city: "",
        area: ""
      }
    },
    methods: {
      initProvinceOptions: function () {
        this.provinceOptions = _provinceData2();
      },
      callbackA: function(value, text){
        this.cityOptions = _cityData2(value);
      },
      callbackB: function (value, text) {
        this.areaOptions = _areaData2(value);
      }
    },
    mounted: function () {
      this.initProvinceOptions();
    }
  }
</script>
