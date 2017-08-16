<template>

  <div :style="select2Style">
    <select>
      <slot></slot>
    </select>
  </div>

</template>

<script>

  export default {
    name: 'select2',
    props: ['options', 'value', 'select2Style'],
    mounted: function () {
      var vm = this
      $(this.$el)
        .val(this.value)
        // init select2
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
        $(this.$el).val(value).select2({ data: this.options })
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

</style>
