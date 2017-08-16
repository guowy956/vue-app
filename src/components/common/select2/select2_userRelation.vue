<template>

  <div v-bind:class="{styleA:isStyleA,styleB:isStyleB,styleC:isStyleC}">
    <select>
      <slot></slot>
    </select>
  </div>

</template>

<script>
  export default {
    name: 'select2',
    props: ['options', 'wid', 'initValue'],
    computed: {
      isStyleA: function(){
        if(this.wid=="styleA"){
          return true
        }else{
          return false
        }
      },
      isStyleB: function(){
        if(this.wid=="styleB"){
          return true
        }else{
          return false
        }
      },
       isStyleC: function(){
         if(this.wid=="styleC"){
           return true
         }else{
           return false
         }
       }
    },
    mounted: function () {
      var vm = this
      $(this.$el)
        .val(this.value)
        //init select2
        .select2({ data: this.options })
        // emit event on change.
        .on('change', function () {
          var json = vm.options
          var text = ""
          var code = "";
          var val = this.value
          $(json).each(function(i,item){
            if(item.id==val){
              text = item.text
              code = item.code
            }
          })
          vm.$emit('input', this.value)
          // 触发父控件绑定的方法
          vm.$emit('myMethod', this.value, text, code)
        })
    },
    watch: {
      value: function (value) {
        // update value
        $(this.$el).val(value)
      },
      options: function (options) {
        // update options
        $(this.$el).select2({ data: options })
      }
    },
    destroyed: function () {
      $(this.$el).off().select2('destroy')
    }
  }

</script>

<style>
  .styleA{
    width: 100%;
  }
  .styleB{
    width: 150px;
  }
  .styleC{
    width: 100%;
  }

</style>
