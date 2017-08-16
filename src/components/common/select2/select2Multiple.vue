<template>

  <div :style="select2Style">
    <select>
      <slot></slot>
    </select>
  </div>

</template>

<script>

  export default {
    name: 'select2Multiple',
    props: ['options', 'value', 'select2Style'],
    mounted: function () {
      var vm = this
      var select2 = $(this.$el)
        .val(this.value)
      // init select2
        .select2({data: this.options, multiple: true})
        // emit event on change.
        .on('change', function () {
          vm.$emit('input', select2.val());//赋值
        });
    },
    watch: {
      value: function (value) {
        // update value
        $(this.$el).val(value).select2({ data: this.options, multiple: true })
      },
      options: function (options) {
        // update options
        $(this.$el).select2({ data: options, multiple: true })
      }
    },
    destroyed: function () {
      $(this.$el).off().select2('destroy')
    }
  }

</script>

<style>

</style>
