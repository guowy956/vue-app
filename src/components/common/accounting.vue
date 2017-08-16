<style>
  .button-div{
    width: 75px;
    float: left;
  }

</style>
<template>

  <div class="form-group">
    <form data-vv-scope="form-accounting">
      <label class="col-sm-2 control-label"><span class="important">*</span>费用:</label>
      <div class="col-sm-10">
        <table class="table table-bordered" id="test_table">
          <thead>
          <tr>
            <th><input type="checkbox" name="test" v-model="checkAll" @click="clickAll()"/></th>
            <th>费用科目</th>
            <th>费用说明</th>
            <th>预计单价</th>
            <th>预计数量</th>
            <th>预计金额</th>
            <th style="width: 170px;">三方比价</th>
            <!--<th>操作</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in lines">
            <td>
              <input type="checkbox" name="test" @change="chkChange($event, item)"
                     :value="item.id" v-model="item.checked"/>
            </td>
            <td v-if="accountOptShow">
              <input class="form-control" data-vv-as="费用科目" v-model="item.subject"
                     v-validate="'required'"
                     :style="errors.has('form-accounting.itemSubject' + index) ? lineInputStyle.red : lineInputStyle.green"
                     :name="'itemSubject' + index" type="text" placeholder="必填">
            </td>
            <td v-else><span>{{item.subject}}</span></td>
            <td v-if="accountOptShow"><input type="text" class="form-control" v-model="item.statement" style="border:none; border-bottom:1px solid green !important;"></td>
            <td v-else><span>{{item.statement}}</span></td>
            <td v-if="accountOptShow">
              <input class="form-control" data-vv-as="预计单价" v-model="item.price"
                     v-validate="'required'"
                     :style="errors.has('form-accounting.itemPrice' + index) ? lineInputStyle.red : lineInputStyle.green"
                     :name="'itemPrice' + index" type="text" placeholder="必填">
            </td>
            <td v-else><span>{{item.price}}</span></td>
            <td v-if="accountOptShow">
              <input class="form-control" data-vv-as="预计数量" v-model="item.number"
                     v-validate="'required'"
                     :style="errors.has('form-accounting.itemNumber' + index) ? lineInputStyle.red : lineInputStyle.green"
                     :name="'itemNumber' + index" type="text" placeholder="必填">
            </td>
            <td v-else><span>{{item.number}}</span></td>
            <td v-if="accountOptShow">
              <input class="form-control" data-vv-as="预计金额" v-model="item.expectCost"
                     v-validate="'required'"
                     :name="'itemExpectCost' + index" type="text" placeholder="必填" readonly>
            </td>
            <td v-else><span>{{item.expectCost}}</span></td>
            <td>
              <button type="button" @click="downloadFile(item.attachment)" class="btn btn-primary start"
                      v-if="!accountOptShow && item.attachment">
                <i class="glyphicon glyphicon-upload"></i>
                <span>下载</span>
              </button>
              <div class="button-div"  v-if="accountOptShow && !item.attachment">
                <fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload"></fileuploadSingle>
              </div>
              <div class="button-div"  v-if="accountOptShow && item.attachment">
                <fileuploadSingle showLabel="上传" myIcon="glyphicon glyphicon-upload"></fileuploadSingle>
              </div>
              <div class="button-div"  v-if="accountOptShow && item.attachment">
                <button type="button" @click="downloadFile(item.attachment)" class="btn btn-primary start">
                  <i class="glyphicon glyphicon-download"></i>
                  <span>下载</span>
                </button>
              </div>
            </td>
            <!--<td>-->
              <!--<button class="btn btn-primary btn-sm" type="button" @click="addCurrentLine(item, index)"  v-if="accountOptShow">保存</button>-->
            <!--</td>-->
          </tr>
          </tbody>
        </table>
        <p class="active_p">
          <!--是否预借:<input type="checkbox" name="" value=""/>-->
          整体预算:<span>{{total}}</span>&nbsp;&nbsp;
          <span class="help is-danger" v-if="accountOptShow">注：费用科目、预计单价、预计数量必填</span>
        </p>
        <button class="btn btn-primary btn-sm" type="button" @click="addRow()" v-if="accountOptShow">添加
        </button>
        <button class="btn btn-primary btn-sm btn-danger" type="button"
                @click="remove()"  v-if="accountOptShow">
          删除已勾选
        </button>
      </div>
    </form>
  </div>

</template>

<script>
  import fileuploadSingle from './fileuploadSingle.vue';

  var vm;

  export default {
    name: 'accounting',
    props: ['activityId', 'accountOptShow', 'lines', 'accountType'],
    components: {
      fileuploadSingle
    },
    data() {
      return {
//        lines: this.lines,//费用,列表
        total: 0,//费用,预计金额总和
        checkAll: false,//费用,全选框值
        checkedIds: [],//费用,选中的id数组
        accountParams: {//费用对象
          id: '',
          activityId: this.activityId,
          subject: '',
          statement: '',
          price: '',
          number: '',
          expectCost: '',
          type: this.accountType ? this.accountType : '1',
          attachment: ''
        },
        md5: '',
        lineInputStyle: {
            green: 'border:none; border-bottom:1px solid green !important;',
            red: 'border:none; border-bottom:1px solid red !important;'
        }
      }
    },
    methods: {
      remove: function () {//费用，删除已勾选
        var linesTemp = [];
        var idsTemp = '';
        this.lines.forEach((line) => {
          if (!line.checked) {
            //复制未勾选的到临时数组
            linesTemp.push(line);
          } else {
            if(!isNull(line.id)){
              idsTemp += line.id + ',';
            }
          }
        });
        if(isNull(idsTemp)){
          //没有id时，表示还没有保存后台，直接页面删除，不请求后台
          //复制临时数组到页面lines,不能直接把临时数组赋值给lines，vue禁止给父组件参数赋值
          this.lines.splice(0, this.lines.length);//清空数组
          for (var nn=0;nn<linesTemp.length;nn++) {
            this.lines.push(linesTemp[nn]);
          }
          return;
        }
        var that = this;
        that.$utils.ajax(that)(basePath2 + 'accounting?ids=' + idsTemp, {}, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
//            that.$utils.alert(response.body.message);
            //复制临时数组到页面lines,不能直接把临时数组赋值给lines，vue禁止给父组件参数赋值
            that.lines.splice(0, that.lines.length);//清空数组
            for (var nn=0;nn<linesTemp.length;nn++) {
              that.lines.push(linesTemp[nn]);
            }
            if(that.checkAll) {
              that.checkAll = false;
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
          that.$utils.alert(that.failedMsg);
        },"delete");
      },
      addRow: function() {
        this.lines.push({
          subject: "",
          statement: "",
          price: "",
          number: "",
          expectCost: "",
          id: "",
          checked: false
        })
      },
      totalSum: function() {
        this.total = 0;
        this.lines.forEach((line) => {
          let priceValue = +line.price;
          let numberValue = +line.number;
          let value = priceValue * numberValue;
          line.expectCost = value;
//          if (line.checked) {
            //计算总预计金额
            this.total += value;
//          }
        });
      },
      clickAll: function () {//费用全选
        this.checkAll = !this.checkAll;
        //如果选中，则添加id到数组
        this.checkedIds = [];
//        this.total = 0;
        this.lines.forEach((line) => {
          line.checked = this.checkAll;
          if (line.checked) {
            this.checkedIds.push(line.id);
            //计算总预计金额
//            let priceValue = +line.price;
//            let numberValue = +line.number;
//            this.total += (priceValue * numberValue);
          }
        });
      },
      chkChange: function(e, item) {//费用，勾选单个
//        let value = +item.expectCost;
//        this.total = e.target.checked ? this.total += value : this.total -= value;
        //如果选中，则添加id到数组
        this.checkedIds = [];
//        this.total = 0;
        this.lines.forEach((line) => {
          if (line.checked) {
            this.checkedIds.push(line.id);
            //计算总预计金额
//            let priceValue = +line.price;
//            let numberValue = +line.number;
//            this.total += (priceValue * numberValue);
          }
        });
        //如果子项全选，则勾选全选按钮
        if (this.lines.length === this.checkedIds.length) {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }
      },
      addCurrentLine : function (item, index, formScope) {//费用，增加当前行
        if (!isNull(item.subject) && !isNull(item.price) && !isNull(item.number) && !isNull(item.expectCost)){
          this.accountParams.subject = item.subject;
          this.accountParams.statement = item.statement;
          this.accountParams.price = item.price;
          this.accountParams.number = item.number;
          this.accountParams.expectCost = item.expectCost;
          if (isNull(item.id)){
            this.saveCurrentLine(item, index);
          } else {
            this.updateCurrentLine(item, index);
          }
        }
        //这里什么都不做，只用来检查并出发页面的验证
        var that = this;
        this.$validator.validateAll(formScope).then(result => {
        }).catch(() => {
        });
      },
      saveCurrentLine : function (item, index) {//费用，增加当前行
        var that = this;
        that.accountParams.attachment = that.md5;
        that.$utils.ajax(that)(basePath2 + 'accounting', that.accountParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
//              that.$utils.alert(response.body.message);
              item.id = response.body.data.id;
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
//            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(that.failedMsg);
        },"post");
      },
      updateCurrentLine : function (item, index) {//费用，增加当前行
        this.accountParams.id = item.id;
        var that = this;
        that.accountParams.attachment = that.md5;
        that.$utils.ajax(that)(basePath2 + 'accounting', that.accountParams, function (response) {
          if(typeof (response.body) === 'string'){
            response.body = JSON.parse(response.body);
          }
          if (response.body.code == '200') {
//            that.$utils.alert(response.body.message);
          }else if(response.body.code == '401'){
            that.$utils.clearLocalData("accessToken");
            that.$utils.clearLocalData("orgData");
            that.$utils.clearLocalData("hrData");
            that.$parent.$emit('changeLogin','N');
          }else{
//            that.$utils.alert(response.body.message)
          }
        }, function (response) {
          that.$utils.alert(that.failedMsg);
        },"put");
      },
      downloadFile : function (md5) {
        window.open(basePath4+"preview/"+md5);
      },
      autoAccountingLine : function () {
        if (this.lines && this.lines.length > 0){
          var that = this;
            for(var i=0; i<this.lines.length; i++) {
              that.addCurrentLine(this.lines[i], i, 'form-accounting');
            }
        }
      }
    },
    watch: {
      lines: {//费用，监听数组值变化
        handler: function (val, oldVal) {
          this.totalSum();
          //自动保存费用条目
          this.autoAccountingLine();
        },
        deep: true
      }
    },
    mounted:function () {
      vm = this;
      if(this.accountType && this.accountType == '2'){
        // 监听整体预算,只有在填写实际费用的时候才使用
        this.$watch('total', function (newVal, oldVal) {
          this.$emit('totalCallback', this.total)
        })
      }
    }
  }

</script>
