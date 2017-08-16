<template>

  <div>
    <!--<p>Selected: {{ selected }}</p>-->
    <select2Child :options="options" v-model="selected" :value="initSelect">
      <option disabled value="0">Select one</option>
    </select2Child>
  </div>

</template>

<script>
  import select2Child from './select2.vue'

  export default {
    name: 'select2',
    props: ['options', 'currentValue'],
    components: {
      'select2Child': select2Child
    },
    data: function () {
      return{
        selected: '',
        initSelect: ''
      }
    },
    watch: {
      selected(val){
        this.$emit("click",val);//组件内对selected变更后向外部发送事件通知
      },
      currentValue(val){
        this.selected = val;
        this.initSelect = val;
      }
    }
  }

</script>

<style>

</style>
