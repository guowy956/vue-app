﻿function _oneClassData() {
  var options = [];
  $(oneClass).each(function (i, item) {
    var option = {};
    option.id = item.oneClassID;
    option.text = item.oneclassName;
    options.push(option);
  });
  return options;
}

function _twoClassData(oneClassID) {
  var options = [];
  $(twoClass).each(function (i, item) {
    if (item.twoClassID == twoClassID) {
      var option = {};
      option.id = item.twoClassID;
      option.text = item.twoclassName;
      options.push(option);
    }
  });
  return options;
}

// function _areaData(cityId){
// var options = [];
// $(areas).each(function(i, item){
// if(item.CityID == cityId){
// var option = {};
// option.id = item.Id;
// option.text = item.DisName;
// options.push(option);
// }
// });
// return options;
// }

function _oneClassData2() {
  var options = [];
  $(oneClass).each(function (i, item) {
    //debugger
    var option = {};
    option.id = item.oneClassID;
    option.text = item.oneclassName;
    options.push(option);
  });
  return options;
}


function _oneClassData_(ID) {
  var text;
  $(oneClass).each(function (i, item) {
    if(item.oneClassID = ID){
      text = item.oneclassName;
    }
  });
  return text;
}

function _twoClassData2_(ID) {
  var text ;
  $(twoClass).each(function (i, item) {
    if (item.twoClassID == ID) {
      text = item.twoClassName;
    }
  });
  return text;
}

function _twoClassData2(oneclassName) {
  var twoId = _getTwoIDByName(oneclassName);
  var options = [];
  $(twoClass).each(function (i, item) {
    if (item.oneClassID == twoId) {
      var option = {};
      option.id = item.twoClassID;
      option.text = item.twoClassName;
      options.push(option);
    }
  });
  return options;
}

// function _areaData2(name){
//   var cityId = _getCityIdByName(name);
//   var options = [];
//   $(areas).each(function(i, item){
//     if(item.CityID == cityId){
//       var option = {};
//       option.id = item.DisName;
//       option.text = item.DisName;
//       options.push(option);
//     }
//   });
//   return options;
// }

function _getTwoIDByName(oneclassName) {
  var ProID = 0;
  $(oneClass).each(function (i, item) {
    if (item.oneclassName == oneclassName) {
      ProID = item.oneClassID;
      return;
    }
  });
  return ProID;
}

// function _getCityIdByName(name){
//   var CityID = 0;
//   $(twoClass).each(function (i, item) {
//     if (item.name == name) {
//       CityID = item.CityID;
//       return ;
//     }
//   });
//   return CityID;
// }

var oneClass = [{
  "oneClassID": 1000000,
  "oneclassName": "党政机关、事业单位工作人员"
}, {
  "oneClassID": 2000000,
  "oneclassName": "科研、金融、卫生、法律、教育从业人员"
}, {
  "oneClassID": 3000000,
  "oneclassName": "警务消防、治安、邮电、广告人员"
}, {
  "oneClassID": 4000000,
  "oneclassName": "商业、服务业人员",
}, {
  "oneClassID": 5000000,
  "oneclassName": "农、林、牧、渔、水利业生产人员"
}, {
  "oneClassID": 6000000,
  "oneclassName": "冶炼、生产、运输、搬运人员"
}, {
  "oneClassID": 7000000,
  "oneclassName": " 特种兵、普通军人"
}, {
  "oneClassID": 8000000,
  "oneclassName": "无业人员、离退休、儿童"
}, {
  "oneClassID": 9000000,
  "oneclassName": "一般劳动人员"
}, ];

var twoClass = [{
  "twoClassID": 1010100,
  "twoClassName": "党政机关负责人",
  "oneClassID": 1000000,
}, {
  "twoClassID": 1020100,
  "twoClassName": "事业单位负责人",
  "oneClassID": 1000000,
}, {
  "twoClassID": 1020200,
  "twoClassName": "企业负责人",
  "oneClassID": 1000000,
}, {
  "twoClassID": 2010100,
  "twoClassName": "科学研究人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020100,
  "twoClassName": "地质勘、测工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020300,
  "twoClassName": "石油工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020400,
  "twoClassName": "冶金工程技术人员（开发新技术、新工艺和新材料及工业设计和生产组织、管理）",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020500,
  "twoClassName": "化工工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020600,
  "twoClassName": "机械工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020701,
  "twoClassName": "装甲车辆工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020702,
  "twoClassName": "火炮枪械工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020703,
  "twoClassName": "弹箭工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020705,
  "twoClassName": "光电火控工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020800,
  "twoClassName": "航空、航天工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2020900,
  "twoClassName": "电子、通信工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021000,
  "twoClassName": "计算机与应用工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021100,
  "twoClassName": "电气、电力工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021200,
  "twoClassName": "邮政、广播电影电视工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021301,
  "twoClassName": "汽车运用工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021302,
  "twoClassName": "船舶运用工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021305,
  "twoClassName": "海上救助打捞工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021307,
  "twoClassName": "船舶检验工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021402,
  "twoClassName": "航行航空管理及飞行程序设计工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021403,
  "twoClassName": "通用航空技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021404,
  "twoClassName": "航空运输研究人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021500,
  "twoClassName": "铁路技术工程人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021600,
  "twoClassName": "建工、建材工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021700,
  "twoClassName": "林业工程技术人员(林业工程规划、设计与施工，木材生产管理及产品开发与营销)",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021801,
  "twoClassName": "水资源勘测工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021802,
  "twoClassName": "治河及泥沙治理工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021803,
  "twoClassName": "水利工程师",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021804,
  "twoClassName": "海洋调查与监测工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021809,
  "twoClassName": "海洋工程勘察设计工程技术人员(工程设计规划人员)",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021810,
  "twoClassName": "水产养殖工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2021811,
  "twoClassName": "渔业资源开发利用工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2022000,
  "twoClassName": "纺织工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2022100,
  "twoClassName": "气象、地震、环境保护工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2022200,
  "twoClassName": "安全、计量、管理工程技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2030100,
  "twoClassName": "农业技术人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2040100,
  "twoClassName": "飞行人员和领航人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2040200,
  "twoClassName": "船舶指挥和引航人员",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2050100,
  "twoClassName": "西医医师",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2050200,
  "twoClassName": "中医医师",
  "oneClassID": 2000000,
}, {
  "twoClassID": 2050300,
  "twoClassName": "其他医师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2050400,
  "twoClassName": "医疗技术人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2050500,
  "twoClassName": "护理人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2050600,
  "twoClassName": "其他卫生专业技术人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2060100,
  "twoClassName": "经济业务人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2070100,
  "twoClassName": "银行业务人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2070200,
  "twoClassName": "保险业务人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2070300,
  "twoClassName": "证券业务人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2070400,
  "twoClassName": "其他金融业务人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2080100,
  "twoClassName": "法律专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090101,
  "twoClassName": "高等教育教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090102,
  "twoClassName": "中等职业教育理论教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090103,
  "twoClassName": "实习指导教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090104,
  "twoClassName": "中学教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090105,
  "twoClassName": "小学教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090106,
  "twoClassName": "幼儿教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090107,
  "twoClassName": "特殊教育教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090108,
  "twoClassName": "校工",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090109,
  "twoClassName": "军训教官、体育教师",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090110,
  "twoClassName": "汽车驾驶训练班教练",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090111,
  "twoClassName": "各项运动教练",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090112,
  "twoClassName": "飞行教官",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090113,
  "twoClassName": "飞行训练学员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2090114,
  "twoClassName": "一般学生",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100100,
  "twoClassName": "文艺创作和评论人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100200,
  "twoClassName": "编导和音乐指挥人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100301,
  "twoClassName": "电影电视演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100302,
  "twoClassName": "戏剧演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100303,
  "twoClassName": "舞蹈演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100304,
  "twoClassName": "曲艺演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100305,
  "twoClassName": "杂技魔术演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100306,
  "twoClassName": "歌唱演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100307,
  "twoClassName": "皮影戏演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100308,
  "twoClassName": "木偶戏演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100312,
  "twoClassName": "配音演员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100313,
  "twoClassName": "巡回演出戏剧团体人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100400,
  "twoClassName": "乐器演奏员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100500,
  "twoClassName": "电影电视制作及舞台专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2100600,
  "twoClassName": "美术、美工专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110100,
  "twoClassName": "高尔夫运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110200,
  "twoClassName": "保龄球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110300,
  "twoClassName": "桌球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110400,
  "twoClassName": "羽毛球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110500,
  "twoClassName": "游泳运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110600,
  "twoClassName": "射箭运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110700,
  "twoClassName": "网球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110800,
  "twoClassName": "垒球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2110900,
  "twoClassName": "滑冰运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111000,
  "twoClassName": "民族体育运动(非竞技性)专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111100,
  "twoClassName": "举重运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111200,
  "twoClassName": "篮球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111300,
  "twoClassName": "排球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111400,
  "twoClassName": "棒球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111500,
  "twoClassName": "田径运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111600,
  "twoClassName": "体操运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111800,
  "twoClassName": "帆船运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2111900,
  "twoClassName": "泛舟运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112000,
  "twoClassName": "巧固球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112100,
  "twoClassName": "手球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112200,
  "twoClassName": "风浪板运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112300,
  "twoClassName": "水上摩托车专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112400,
  "twoClassName": "足球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112500,
  "twoClassName": "曲棍球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112600,
  "twoClassName": "冰上曲棍球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112700,
  "twoClassName": "橄榄球专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112800,
  "twoClassName": "击剑运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2112900,
  "twoClassName": "水球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2113000,
  "twoClassName": "马术运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2113300,
  "twoClassName": "自行车运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2114100,
  "twoClassName": "射击运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2114200,
  "twoClassName": "划船运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2114300,
  "twoClassName": "乒乓球运动专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2114500,
  "twoClassName": "裁判人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120101,
  "twoClassName": "文字记者",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120102,
  "twoClassName": "摄影记者",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120103,
  "twoClassName": "外勤记者",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120105,
  "twoClassName": "电视记者",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120106,
  "twoClassName": "文字编辑",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120107,
  "twoClassName": "美术编辑",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120111,
  "twoClassName": "播音员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120112,
  "twoClassName": "节目主持人",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120200,
  "twoClassName": "图书资料与档案业务人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120300,
  "twoClassName": "考古及文物保护专业人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2120400,
  "twoClassName": "其他新闻出版、文化工作人员",
  "oneClassID": 2000000
}, {
  "twoClassID": 2130100,
  "twoClassName": "宗教职业者",
  "oneClassID": 2000000
}, {
  "twoClassID": 3010100,
  "twoClassName": "行政办公人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020101,
  "twoClassName": "警务行政及内勤人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020102,
  "twoClassName": "警察（负有巡逻任务）",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020103,
  "twoClassName": "监狱看守所管理人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020104,
  "twoClassName": "交通警察",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020106,
  "twoClassName": "警务特勤",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020108,
  "twoClassName": "港口机场警卫及安全人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020109,
  "twoClassName": "警校学生",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020200,
  "twoClassName": "治安保卫人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020301,
  "twoClassName": "灭火员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020303,
  "twoClassName": "一般事故抢险员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020304,
  "twoClassName": "抢险救援器材工具调配工",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020305,
  "twoClassName": "抢险救援器材维修工",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020306,
  "twoClassName": "火险监督员、防火审核员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020307,
  "twoClassName": "可燃气体（毒气）检测员、危险物品监督员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020308,
  "twoClassName": "建（构）筑物消防员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020309,
  "twoClassName": "火灾暸望观察员(暸望塔)",
  "oneClassID": 3000000
}, {
  "twoClassID": 3020310,
  "twoClassName": "火灾暸望观察员(直升机)",
  "oneClassID": 3000000
}, {
  "twoClassID": 3030100,
  "twoClassName": "邮政、电信业务人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3030201,
  "twoClassName": "通信设备维护人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3030202,
  "twoClassName": "电话、通信天、馈线架（敷）设、维修人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3030207,
  "twoClassName": "电信装置维护修理工",
  "oneClassID": 3000000
}, {
  "twoClassID": 3030208,
  "twoClassName": "电信工程设施架设人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3040100,
  "twoClassName": "广告内勤人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3040201,
  "twoClassName": "广告业务员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3040202,
  "twoClassName": "广告招牌绘制人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3040203,
  "twoClassName": "广告片拍摄录制人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 3040205,
  "twoClassName": "霓虹光管安装及维修人员",
  "oneClassID": 3000000
}, {
  "twoClassID": 4010100,
  "twoClassName": "营业、推销、采购人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4010200,
  "twoClassName": "拍卖、典当及租赁业务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4010300,
  "twoClassName": "废旧物资回收利用人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4010400,
  "twoClassName": "商品监督和市场管理人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4020100,
  "twoClassName": "仓储保管人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4020202,
  "twoClassName": "商品护运员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030100,
  "twoClassName": "餐厅服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030200,
  "twoClassName": "饭店服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030300,
  "twoClassName": "旅游及公共游览场所服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030400,
  "twoClassName": "健身和娱乐场所服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030600,
  "twoClassName": "保龄球馆工作人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030700,
  "twoClassName": "撞球馆工作人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030800,
  "twoClassName": "游泳馆工作人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030903,
  "twoClassName": "海水潜水教练",
  "oneClassID": 4000000
}, {
  "twoClassID": 4030905,
  "twoClassName": "海水浴场救生员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4031008,
  "twoClassName": "兽医（动物园）",
  "oneClassID": 4000000
}, {
  "twoClassID": 4031009,
  "twoClassName": "观赏动物饲养工",
  "oneClassID": 4000000
}, {
  "twoClassID": 4031100,
  "twoClassName": "娱乐场所工作人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040100,
  "twoClassName": "公路道路运输服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040200,
  "twoClassName": "铁路客货运输服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040301,
  "twoClassName": "航空运输飞行服务员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040302,
  "twoClassName": "航空运输地面服务员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040303,
  "twoClassName": "航空站站长",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040304,
  "twoClassName": "一般内勤人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040314,
  "twoClassName": "飞机外壳洗刷人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4040401,
  "twoClassName": "船舶业务员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4050100,
  "twoClassName": "医疗卫生辅助服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060100,
  "twoClassName": "社会中介服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060201,
  "twoClassName": "工业及饮用水净化处理人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060203,
  "twoClassName": "供水调度员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060206,
  "twoClassName": "送煤工",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060210,
  "twoClassName": "自来水管装修人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060212,
  "twoClassName": "煤气工程师",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060216,
  "twoClassName": "瓦斯分装工",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060217,
  "twoClassName": "液化气送货员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060300,
  "twoClassName": "美容美发人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060400,
  "twoClassName": "摄影服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060500,
  "twoClassName": "验光配镜人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060600,
  "twoClassName": "洗染织补人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060700,
  "twoClassName": "浴池服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060800,
  "twoClassName": "印章刻字人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4060900,
  "twoClassName": "日用产品维修人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061000,
  "twoClassName": "保育、家庭服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061101,
  "twoClassName": "垃圾清运工",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061102,
  "twoClassName": "保洁员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061103,
  "twoClassName": "下水道清洁工",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061105,
  "twoClassName": "高楼外部清洁工、烟囱清洁工",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061200,
  "twoClassName": "殡葬服务人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061301,
  "twoClassName": "橱具商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061302,
  "twoClassName": "陶瓷器商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061303,
  "twoClassName": "古董商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061304,
  "twoClassName": "花卉商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061305,
  "twoClassName": "米商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061306,
  "twoClassName": "杂货商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061307,
  "twoClassName": "玻璃商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061308,
  "twoClassName": "果菜商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061309,
  "twoClassName": "石材商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061310,
  "twoClassName": "建材商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061311,
  "twoClassName": "铁材商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061312,
  "twoClassName": "木材商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061313,
  "twoClassName": "五金商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061314,
  "twoClassName": "电器商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061315,
  "twoClassName": "水电卫生器材商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061316,
  "twoClassName": "机车买卖商(不含修理)",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061317,
  "twoClassName": "汽车买卖商(不含修理)",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061318,
  "twoClassName": "车辆器材商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061319,
  "twoClassName": "矿物油、香烛买卖商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061320,
  "twoClassName": "眼镜商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061321,
  "twoClassName": "食品商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061322,
  "twoClassName": "文具商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061323,
  "twoClassName": "布商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061324,
  "twoClassName": "服饰买卖商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061325,
  "twoClassName": "鱼贩",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061326,
  "twoClassName": "肉贩",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061327,
  "twoClassName": "屠宰",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061328,
  "twoClassName": "药品买卖商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061329,
  "twoClassName": "医疗器械仪器商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061330,
  "twoClassName": "化学原料商、农药买卖商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061331,
  "twoClassName": "手工艺品买卖商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061332,
  "twoClassName": "银楼珠宝、当铺负责人及工作人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061333,
  "twoClassName": "农具商",
  "oneClassID": 4000000
}, {
  "twoClassID": 4061400,
  "twoClassName": "液化瓦斯经销人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 4070100,
  "twoClassName": "其他商业、服务业人员",
  "oneClassID": 4000000
}, {
  "twoClassID": 5010100,
  "twoClassName": "农作物、园林生产人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5010200,
  "twoClassName": "中药材生产人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5010300,
  "twoClassName": "农副林特产品加工人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5010400,
  "twoClassName": "营造林人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5010501,
  "twoClassName": "护林员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5010504,
  "twoClassName": "野生动物保护员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5010506,
  "twoClassName": "自然保护区巡护监测员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5010600,
  "twoClassName": "木材采运人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5020100,
  "twoClassName": "家畜、家禽饲养人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5030100,
  "twoClassName": "水产养殖人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5030201,
  "twoClassName": "水产捕捞工",
  "oneClassID": 5000000
}, {
  "twoClassID": 5030206,
  "twoClassName": "捕鱼人（内陆）",
  "oneClassID": 5000000
}, {
  "twoClassID": 5030300,
  "twoClassName": "水产品加工人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5030400,
  "twoClassName": "其他渔业生产人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5040101,
  "twoClassName": "河道修防工",
  "oneClassID": 5000000
}, {
  "twoClassID": 5040108,
  "twoClassName": "水坝水库管理人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5040200,
  "twoClassName": "农田灌排工程建设管理维护人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5040400,
  "twoClassName": "水文勘测作业人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5040500,
  "twoClassName": "其他水利设施管理养护人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5050100,
  "twoClassName": "农林专用机械操作人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 5050200,
  "twoClassName": "农村能源开发利用人员",
  "oneClassID": 5000000
}, {
  "twoClassID": 6010113,
  "twoClassName": "地质探测员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6010400,
  "twoClassName": "钻井人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6010600,
  "twoClassName": "盐业生产人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6020200,
  "twoClassName": "炼钢人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6020300,
  "twoClassName": "铁合金冶炼人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6020600,
  "twoClassName": "金属轧制人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6030100,
  "twoClassName": "化工产品生产通用工艺人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6030200,
  "twoClassName": "石油炼制生产人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6030300,
  "twoClassName": "煤化工生产人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6030400,
  "twoClassName": "化学肥料生产人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6030600,
  "twoClassName": "基本有机化工产品生产人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6031600,
  "twoClassName": "日用化学品生产人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6040100,
  "twoClassName": "机械加工人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6050100,
  "twoClassName": "机械设备装配人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6050300,
  "twoClassName": "电气元件及设备装配人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6050600,
  "twoClassName": "运输车辆装配人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6051000,
  "twoClassName": "五金制品制作装配人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6051500,
  "twoClassName": "船舶制造人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6051700,
  "twoClassName": "导弹卫星装配测试人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6052000,
  "twoClassName": "靶场试验人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6070107,
  "twoClassName": "电力电缆安装工",
  "oneClassID": 6000000
}, {
  "twoClassID": 6070410,
  "twoClassName": "变压器检修工",
  "oneClassID": 6000000
}, {
  "twoClassID": 6070605,
  "twoClassName": "维修电工",
  "oneClassID": 6000000
}, {
  "twoClassID": 6150100,
  "twoClassName": "木材加工人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6170202,
  "twoClassName": "加气混凝土制品工",
  "oneClassID": 6000000
}, {
  "twoClassID": 6170500,
  "twoClassName": "装饰石材生产人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6170604,
  "twoClassName": "金刚石制品工",
  "oneClassID": 6000000
}, {
  "twoClassID": 6230200,
  "twoClassName": "砌筑人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6230304,
  "twoClassName": "建筑模板工",
  "oneClassID": 6000000
}, {
  "twoClassID": 6230400,
  "twoClassName": "施工架子搭设人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6230604,
  "twoClassName": "铝门窗安装工人",
  "oneClassID": 6000000
}, {
  "twoClassID": 6230609,
  "twoClassName": "室外装潢人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6230700,
  "twoClassName": "筑路、养护、维修人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6230900,
  "twoClassName": "其他工程施工人员",
  "oneClassID": 6000000
}, {
  "twoClassID": 6240109,
  "twoClassName": "机动三轮车夫",
  "oneClassID": 6000000
}, {
  "twoClassID": 6240110,
  "twoClassName": "营业用货车司机、随车工人",
  "oneClassID": 6000000
}, {
  "twoClassID": 6240111,
  "twoClassName": "砂石车司机、随车工人",
  "oneClassID": 6000000
}, {
  "twoClassID": 6240112,
  "twoClassName": "工程卡车司机、随车工人",
  "oneClassID": 6000000
}, {
  "twoClassID": 6240113,
  "twoClassName": "液化、氧化油罐车司机、随车工人",
  "oneClassID": 6000000
}, {
  "twoClassID": 6240502,
  "twoClassName": "起重工",
  "oneClassID": 6000000
}, {
  "twoClassID": 7010101,
  "twoClassName": "一般地面部队人员（含陆军野战、机械维护、土木工程、飞弹、战车及空军炮、飞机修护等）",
  "oneClassID": 7000000
}, {
  "twoClassID": 7010103,
  "twoClassName": "行政及内勤人员（国防部、三军总部、军校教官等）",
  "oneClassID": 7000000
}, {
  "twoClassID": 7010104,
  "twoClassName": "宪兵",
  "oneClassID": 7000000
}, {
  "twoClassID": 7010105,
  "twoClassName": "后勤补给及通讯地勤人员",
  "oneClassID": 7000000
}, {
  "twoClassID": 7010106,
  "twoClassName": "军事研究单位纸上设计人员",
  "oneClassID": 7000000
}, {
  "twoClassID": 7010107,
  "twoClassName": "军事单位武器、弹药研究及管理人员",
  "oneClassID": 7000000
}, {
  "twoClassID": 7010110,
  "twoClassName": "军校学生及入伍受训新兵",
  "oneClassID": 7000000
}, {
  "twoClassID": 7010111,
  "twoClassName": "军医院官兵",
  "oneClassID": 7000000
}, {
  "twoClassID": 8010101,
  "twoClassName": "无固定职业人员",
  "oneClassID": 8000000
}, {
  "twoClassID": 8010102,
  "twoClassName": "离退休人员（无兼职）",
  "oneClassID": 8000000
}, {
  "twoClassID": 8010103,
  "twoClassName": "学龄前儿童",
  "oneClassID": 8000000
}, {
  "twoClassID": 8010104,
  "twoClassName": "家庭主妇",
  "oneClassID": 8000000
},{
  "twoClassID": 9010000,
  "twoClassName": "其他",
  "oneClassID": 9000000,
}
];
