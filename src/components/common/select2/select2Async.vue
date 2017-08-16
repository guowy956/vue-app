<template>

  <div :style="select2Style">
    <select>
      <slot></slot>
    </select>
  </div>

</template>

<script>

  export default {
    name: 'select2Async',
    props: ['value', 'select2Style', 'uri'],
    data : function () {
      var that = this;
      return {
        select2Obj: {
          ajax:{
            url: basePath2 + that.uri,
            dataType:"json",
            delay:250,
            data:function(params){
                console.log(params)
              return {
                accessToken: that.$utils.getLocalData("accessToken"),
                selectName: params
              };
            },
//            cache:true,
            results: function (res, params) {
              var arr = res.data;
              var options = [];
              if (arr) {
                for(var i= 0; i<arr.length; i++){
                  options.push({"id": arr[i].name, "text": arr[i].fullname});
                }
              } else {
                options.push({});
              }
              return {
                results: options
              };
            },
          },
          escapeMarkup: function (markup) { return markup; },
          minimumInputLength: 1,
//          formatResult: that.formatRepo,
//          formatSelection: that.formatRepoSelection
        }
      }
    },
    /*methods: {
      formatRepo: function (itme) {
        console.log(itme);
        console.log("formatRepo.item.id=" + itme.text);
        return itme.text;
      },
      formatRepoSelection: function (itme) {
        console.log("formatRepoSelection.item.text=" + itme.text);
        return itme.text;
      },
    },*/
    mounted: function () {
      var vm = this
      $(this.$el)
        .val(this.value)
        // init select2
        .select2(this.select2Obj)
        // emit event on change.
        .on('change', function () {
          vm.$emit('input', this.value)
        })
    },
    destroyed: function () {
      $(this.$el).off().select2('destroy')
    }
  }

</script>

<style>

</style>
