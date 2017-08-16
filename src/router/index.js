

// 这里面负责写路由映射，便于管理


// 引入路由模块并使用它
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



// 创建路由实例并配置路由映射
// path:'*',redirect:'/home'  重定向到path是/home的映射
const router = new VueRouter({
  routes:[{
    path: '/areaDemo', component: require('../components/common/AreaDemo.vue')
  },{
    path: '/hello', component: require('../components/Hello.vue')
  },{
    path:'/pictureList',component: require('../components/PictureList.vue')
  },{
    path:'/applyList',component: require('../components/ApplyList.vue')
  },{
    path:'/waitQualityList',component: require('../components/WaitQualityList.vue')
  },{
    path:'/waitSignList',component: require('../components/WaitSignList.vue')
  },{
    path:'/alreadyQualityList',component: require('../components/AlreadyQualityList.vue')
  },{
    path:'/operateAuditList',component: require('../components/OperateAuditList.vue')
  },{
    path:'/financialForm/:flag/:orderNum/:orderName/:status',component: require('../components/financialForm.vue')
    // path:'/financialForm/:flag/:orderNum/:status',component: require('../components/financialForm.vue')
  },{
    path:'/financialformShow/:flagList/:orderNum/:status',component: require('../components/financialformShow.vue')
  },{
    path:'/contractDetail/:orderNum/:flags',component: require('../components/ContractDetail.vue')
  },{
    path:'/dictionary',component: require('../components/Dictionary.vue')
  },{
    path:'/user',component: require('../components/User.vue')
  },{
    path:'/role',component: require('../components/Role.vue')
  },{
    path:'/PicList/:orderNum',component: require('../components/picList.vue')
  },{
    path:'/org',component: require('../components/Org.vue')
  },{
    path:'/PicList/:orderNum/:orderName/:status/:flag',component: require('../components/picList.vue')
  },{
    path:'/oprLogList',component: require('../components/OprLogList.vue')
  },{
    path:'/oprLogDetail/:logId',component: require('../components/OprLogDetail.vue')
  },{
    path:'/app',component: require('../components/App.vue')
  },{
    path:'/product',component: require('../components/Product.vue')
  },{
    path:'/product2',component: require('../components/Product2.vue')
  },{
    path:'/alreadQualityList',component: require('../components/AlreadyQualityList.vue')
  },{
    path:'/raise',component: require('../components/RecruitmentPlan.vue')
  },{
    path:'/perpetualCalendar/:applyBatch/:times',component: require('../components/PerpetualCalendar.vue')
  },{
    path:'/auditList',component: require('../components/AuditList.vue')
  },{
    path:'/auditMenu',component: require('../components/AuditMenu.vue')
  },{
    path:'/auditRecord',component: require('../components/AuditRecord.vue')
  },{
    path:'/searchInfo',component: require('../components/SearchInfo.vue')
  },{
    path:'/modifyService',component: require('../components/ModifyService.vue')
  },{
    path:'/quillDemo',component: require('../components/common/quillDemo.vue')
  },{
    path:'/examine',component: require('../components/examine.vue')
  },{
    path:'/changeAccount',component: require('../components/changeAccount.vue')
  },{
    path:'/changeRecord',component: require('../components/changeRecord.vue')
  },{
    path:'/examineDetail/:orderNum/:ID',component: require('../components/examineDetail.vue')
  },{
    path:'/changeForm/:orderNum',component: require('../components/changeForm.vue')
  },{
    path:'/examineChange',component: require('../components/examineChange.vue')
  },{
    path:'/examineChangeDetail/:orderNum',component: require('../components/examineChangeDetail.vue')
  },{
    path:'/bandChange',component: require('../components/bandChange.vue')
  },{
    path:'/updatePassword',component: require('../components/UpdatePassword.vue')
  },{
    path:'/performance',component: require('../components/Performance.vue')
  },{
    path:'/reportSearch',component: require('../components/reportSearch.vue')
  },{
    path:'/reportSales',component: require('../components/reportSales.vue')
  },{
    path:'/reportSearchShow/:orderNum/:orderStatus',component: require('../components/reportSearchShow.vue')
  },{
    path:'/orderBack',component: require('../components/orderBack.vue')
  },{
    path:'/customerSearch',component: require('../components/customerSearch.vue')
  },{
    path:'/reportManager',component: require('../components/reportManager.vue')
  },{
    path:'/bdList',component: require('../components/bdList.vue')
  },{
    path:'/customerDetail/:orderNum/:customerName/:idNum/:actualRepaymentDate',component: require('../components/customerDetail.vue')
  },{
    path:'/customerDetail/:orderNum/:customerName/:idNum',component: require('../components/customerDetail.vue')
  },{
    path:'/interviewManage',component: require('../components/interviewManage.vue')
  },{
    path:'/interviewDetail/:orgId/:lv4',component: require('../components/interviewDetail.vue')
  }
  ]
})


// 输出router
export default router;

