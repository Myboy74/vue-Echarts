<template>
    <div>
        <!--右边-->
        <!-- <div class="top" style="position: relative;">
             <p style="position: absolute;top:30px;left:450px;">
                总计：<span style="font-size:24px">{{topTotal}}</span>人
            </p>
            <div id="top" style="width:50%;height:150px;margin:0 auto;"></div>
        </div> -->
        <div class="main">
            <div class="mainFl">
                <p>属地管理数量</p>
                <div class="f_con">
                  <p class="Echartitles">党员性别</p>
                  <div id="f_leftSex"></div>
                </div>
                <div class="f_con">  
                  <!--属地管理数量++  党员年龄段-->
                    <div id="terrAge"></div>
                </div>
                <div class="f_con">
                  <span></span>
                   <!--属地管理数量++  预备党员 和 党员民族-->
                    <div id="terr_left" class="two" style="border-right: 1px dashed #cccccc;border-left:none"></div>
                    <div id="terr_right" class="two"></div>
                </div>
                <div class="f_con">
                   <!--属地管理数量++  党员年龄-->
                  <div id="terr_partyAge"></div>
                </div>
                <div class="f_con">
                   <!--属地管理数量++  工作岗位-->
                  <div id="terr_word"></div>  
                </div> 
                <div class="f_con"  style="border-bottom:none">
                   <!-- 属地管理数量++  学历 -->
                <div id="terr_education"></div>
                </div>
            </div>
            <div class="mainFl mainRl">
                <p>直接管理数量</p>
                <div class="f_con">
                 <p class="Echartitles">党员性别</p>
                  <div id="f_rightSex"></div>
                </div>
                <div class="f_con">
                    <!--直接管理数量++  党员年龄段-->
                  <div id="directAge"></div>
                </div>
                <div class="f_con">
                      <!--直接管理数量++  预备党员 和 党员民族-->
                    <div id="directLeft" class="two"></div>
                    <div id="directRight" class="two"></div>
                </div>
                <div class="f_con">
                    <!--直接管理数量++  党员年龄-->
                  <div id="directPartyAge"></div>
                </div>
                <div class="f_con">
                    <!--直接管理数量++  工作岗位-->
                  <div id="directWord"></div>
                </div>
                <div class="f_con" style="border-bottom:none">
                  <!--直接管理数量++  学历-->
                <div  id="directEducation"></div>
                </div>
            </div>
            <div class="cle"></div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import bus from './busEvent.js';
import {
  postAjax,
  getAjax
} from "../../../api/api.js";
export default {
  mounted() {
    this.initLoadFn();//初次加载数据
  },
  data(){
      return{
        id:sessionStorage.getItem("userWorkId"),
        topTotal:0  //顶部总计
      }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.initLoadFn(val.query.id)
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    initLoadFn(val) {  //初次加载数据
      // let id = this.$route.query.gzwOrgId;
      // let id = '14192eae-57dd-11e7-9694-0050569a68e4';
      let selNum = val == undefined ? 0 : val;
      postAjax("statistic/statisticIsdirect/" + this.id + '?isCenterCom=' + selNum).then(res => {
        let formData = res.data.data.tableData[0]; //获取过来的数据
        let formData1 = res.data.data.tableData[1]; //获取过来的数据
        // this.autoMove(formData, formData1); //最上面得统计
        //属地管理数量
        this.autoLeft(formData1); //性别
        this.autoTerr(formData1); //年龄段
        this.autoterrLeft(formData1); //预备党员
        this.autoterrRight(formData1); //党员民族
        this.autoPartyAge(formData1);  //党员党龄
        this.autoWord(formData1);   //工作岗位
        this.autoEducation(formData1);  //学历
        //直接管理数量
        this.DdirecSex(formData); //性别
        this.DdirectAge(formData); //年龄段
        this.DdirecLeft(formData); //预备党员
        this.DdirecRight(formData); //党员民族
        this.DdirecPartyAge(formData);  //党员党龄
        this.DdirecWord(formData);  //工作岗位
        this.DdirecEducation(formData);  //学历
      });
    },
    autoMove(formData, formData1) {
      let myChart = this.$echarts.init(document.getElementById("top"));
      let Territoriality = formData.totalNum; //直属管理总数
      let shudiMagager = formData1 == undefined ? 0 : formData1.totalNum; //属地管理总数
      this.topTotal = Number(Territoriality) + Number(shudiMagager);  //计算总计并赋值
      // console.log("total:" + Territoriality);
      // console.log("total2:" + shudiMagager);
      
      var options = {
        legend: {
          bottom: 10,
          textStyle: {
            color: "#000"
          },
          data: ["属地管理数量", "直接管理数量"]
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "40%",
          containLabel: true
        },

        tooltip: {
          show: "false",
           textStyle:{
            fontSize:12
          }
          // trigger: 'axis',
          // axisPointer: { // 坐标轴指示器，坐标轴触发有效
          //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          // }
        },
        xAxis: {
          type: "value",
          axisTick: { show: false },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#000"
            }
          },
          axisLabel: { show: false },
          splitLine: {
            show: false
          }
        },
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#000"
              }
            }
            // data: ['广州']
          },
          {
            type: "category",
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitArea: { show: false },
            splitLine: { show: false }
            // data: ['广州']
          }
        ],
        series: [
          {
            name: "直接管理数量",
            type: "bar",
            yAxisIndex: 1,
            // legendHoverLink:false,
            // silent:false,
            // animation:false,
            itemStyle: {
              normal: {
                show: true,
                color: "#277ace",
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: "#333"
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: [Territoriality]
          },
          {
            name: "属地管理数量",
            type: "bar",
            //    legendHoverLink:false,
            //     silent:false,
            //     animation:false,
            itemStyle: {
              normal: {
                show: true,
                color: "#5de3e1",
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: "#333"
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: [shudiMagager]
          }
        ]
      };

      myChart.setOption(options);
    },
    autoLeft(formData) {  //属地管理性别
      let myChart = this.$echarts.init(document.getElementById("f_leftSex"));
      var sexIcon = {
        male: "../../../../static/img/female.png",
        female: "../../../../static/img/male.png"
      };
      let maleNum = formData.partynmmNum; //男性党员数量
      let femaleNum = formData.partynmfNum; //女性党员数量
      var malePCT = formData.partynmm;  //男性百分比
      malePCT = malePCT.substring(malePCT.length - 1, 0);
      var femalePCT = formData.partynmf;  //女性百分比
      femalePCT = femalePCT.substring(femalePCT.length - 1, 0);
      var option = {
        color: ["#2574A9", "#D2527F"],

        title: [
          {
            text: malePCT + "%",
            subtext: femalePCT + "%",
            left: "50%",
            top: "40%",
            textAlign: "center",
            textStyle: {
              fontSize: 16,
              color: "#2574A9"
            },
            subtextStyle: {
              fontSize: 16,
              color: "#D2527F"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
           textStyle:{
            fontSize:12
          }
        },
        grid: {
          left: "25%",
          containLabel: true
        },
        series: [
          {
            type: "pie",
            name: "党员性别",
            center: ["50%", "52%"],
            radius: ["45%", "60%"],
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },

            data: [
              {
                name: "男性",
                value: maleNum,
                label: {
                  position: ["10%", "20%"],
                  normal: {
                    formatter: ["{Female|}" + "\n\n" + "男"].join("\n"),
                    rich: {
                      Female: {
                        height: 40,
                        align: "center",
                        backgroundColor: {
                          image: sexIcon.male
                        }
                      }
                    }
                  }
                }
              },
              {
                name: "女性",
                value: femaleNum,
                label: {
                  // position: 'left',
                  normal: {
                    formatter: ["{Female|}" + "\n\n" + "女"].join("\n"),
                    rich: {
                      Female: {
                        height: 40,
                        align: "center",
                        backgroundColor: {
                          image: sexIcon.female
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    autoTerr(formData) {   //属地党员年龄段
      var obj = echarts.init(document.getElementById("terrAge"));
      let less30age = Number(formData.aget2Num) + Number(formData.aget3Num); //30岁以下年龄段
      // console.log('30岁以下：'+less30age);
      let age31to40 = formData.aget4Num;  //31岁至40岁年龄段；
      let age41to50 = formData.aget5Num;  //41-50
      let age51to60 = formData.aget6Num;  //51-60
      let than60age = formData.age12Num; //60岁以上

      let less30agePCT = formData.aget1; //30岁以下党员数量百分比
      less30agePCT = less30agePCT.substring(less30agePCT.length - 1, 0);
      let age31to40PCT = formData.aget4; //31-40党员数量百分比
      age31to40PCT = age31to40PCT.substring(age31to40PCT.length - 1, 0);
      let age41to50PCT = formData.aget5; //41-50党员数量百分比
      age41to50PCT = age41to50PCT.substring(age41to50PCT.length - 1, 0);
      let age51to60PCT = formData.aget6; //51-60党员数量百分比
      age51to60PCT = age51to60PCT.substring(age51to60PCT.length - 1, 0);
      let than60agePCT = formData.aget7; //60以上党员数量百分比
      than60agePCT = than60agePCT.substring(than60agePCT.length - 1, 0);
      var data = [less30age, age31to40, age41to50, age51to60, than60age]; //具体数值
      var dateNum = [less30agePCT, age31to40PCT, age41to50PCT, age51to60PCT, than60agePCT]; //具体百分比
      var dateStr = ["30岁以下", "31-40", "41-50", "51-60", "60岁以上"]; //具体名称

      var option = {
        title: {
          text: "党员年龄段",
          top: "3%"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function (params) {
            // console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            );
          },
           textStyle:{
            fontSize:12
          }
        },
        grid: {
          top: "20%",
          bottom: "15%"
        },
        xAxis: {
          data: dateStr,
          offset: 5,
          // axisLine: {
          //   //刻度“30以下”位子刻度得颜色
          //   lineStyle: {
          //     //   color: "#cccccc"
          //   }
          // },
          axisLabel: {
            color: "#000000",
            fontSize: 12
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#000000",
              fontSize: 12,
              formatter: "{c}%"
            },
            itemStyle: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //设置渐变色
              color: function (params) {
                var colorList = [
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"]
                ];
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorList[params.dataIndex][0]
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex][1]
                  }
                ]);
              },
              barBorderRadius: [10, 10, 0, 0] //柱状角圆角半径
            },
            barWidth: "40%",
            data: dateNum,
            z: 10
          },
          {
            type: "bar",
            barGap: "-100%",
            silent: true,
            itemStyle: {
              color: "#e5e9f0",
              opacity: 0.2,
              normal: {
                color: "#e5e9f0",
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            barWidth: "40%",
            data: [100, 100, 100, 100, 100],
            z: 5
          }
        ]
      };
      obj.setOption(option);
    },
    autoterrLeft(formData) {  //预备党员
      let myChart = this.$echarts.init(document.getElementById("terr_left"));
      let readyParty = formData.prepartynmNum; //预备党员数量
      let formalParty = formData.partytnmNum; //正式党员数量
      var zhengshi = formData.partytnm; //正式党员百分比
      var yb = formData.prepartynm; //预备党员百分比
       var option = {
       color: ["#1f3a93", "#D2527F"],
        title: [ {} ],

        tooltip: {
          trigger: "item",
           textStyle:{
            fontSize:12
          }
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          left: "25%",
          containLabel: true
        },
        legend: {
          //   orient: "vertical",
          // x: 'left',
          left: "15%",
          bottom: "0.1%",
          data: ["预备党员", "正式党员"]
        },
        series: [
          {
            type: "pie",
            name: "党员",
            center: ["45%", "48%"],
            radius: ["40%", "60%"],
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },

            data: [
              {
                name: "正式党员",
                value:formalParty,
                label: {
                  position: ["10%", "20%"],
                  normal: {
                    formatter: "{d}%",
                    // formatter: '{b}\n{d}%',  //名字 数值
                    rich: {
                      Female: {
                        align: "center"
                      }
                    }
                  }
                }
              },
              {
                name: "预备党员",
                value:readyParty,
                label: {
                  normal: {
                    formatter: "{d}%",
                    rich: {
                      Female: {
                        height: 40,
                        align: "center"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    autoterrRight(formData) {  //属地民族统计
      let myChart = this.$echarts.init(document.getElementById("terr_right"));
      let hanzuNum = formData.nationnmhNum; //汉族党员数量
      let minorityNum = formData.nationnmoNum; //少数民族数量
      var male = formData.nationnmh; //汉族百分比
      var female = formData.nationnmo; //少数民族百分比
      
var option = {
       color: ["#336e78", "#D35400"],

        title: [ {}],

        tooltip: {
          trigger: "item",
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          left: "25%",
          containLabel: true
        },
        legend: {
          left: "20%",
          bottom: "0.1%",
          data: ["汉族", "少数民族"]
        },
        series: [
          {
            type: "pie",
            name: "党员民族",
            center: ["50%", "48%"],
            radius: ["40%", "60%"],
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },
            data: [
              {
                name: "汉族",
                value: hanzuNum,
                label: {
                  position: ["10%", "20%"],
                  normal: {
                    formatter: "{d}%",
                    // formatter: '{b}\n{d}%'  //名字 数值
                    rich: {
                      Female: {
                        align: "center"
                      }
                    }
                  }
                }
              },
              {
                name: "少数民族",
                value: minorityNum,
                label: {
                  normal: {
                    formatter: "{d}%",
                    rich: {
                      Female: {
                        height: 40,
                        align: "center"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    autoPartyAge(formData) {   //属地党龄数量
      var zhu = echarts.init(document.getElementById("terr_partyAge"));
      let less5age = formData.partyaget1Num; //小于5
      let age6to10 = formData.partyaget2Num; //6-10
      let age11to15 = formData.partyaget3Num; //11-15
      let age16to20 = formData.partyaget4Num; //16-20
      let age21to25 = formData.partyaget5Num; //21-25
      let age26to30 = formData.partyaget6Num; //26-30
      let age31to35 = formData.partyaget7Num; //31-35
      let age36to40 = formData.partyaget8Num; //36-40
      let age41to45 = formData.partyaget9Num; //41-45
      let age46to50 = formData.partyaget10Num; //41-45
      let than50age = formData.partyage15Num; //大于50
      //  var app.title = '坐标轴刻度与标签对齐';
      var date = [
        "小于5",
        "6-10",
        "11-15",
        "16-20",
        "21-25",
        "26-30",
        "31-35",
        "36-40",
        "41-45",
        "46-50",
        "大于50"
      ];
      var options = {
        title: {
          text: "党员党龄",
          // textStyle:{
          top: "2%"
          // }
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
           textStyle:{
            fontSize:12
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: date,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: "#000000",
              rotate: 50,
              fontSize: 10
            }
          }
        ],
        yAxis: [
          {
            // type : 'category',
            // data : ['10','20','30','40'],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "40%",
            data: [less5age, age6to10, age11to15, age16to20, age21to25, age26to30, age31to35, age36to40, age41to45, age46to50, than50age],
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          }
        ],
        label: {
          normal: {
            show: true,
            position: "top",
            formatter: "{c}"
          }
        },
        itemStyle: {
          normal: {
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: "rgba(17, 168,171, 1)"
            //   },
            //   {
            //     offset: 1,
            //     color: "rgba(17, 168,171, 0.1)"
            //   }
            // ]),

            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          },
          color: function (params) {
            var colorList = [
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"]
              //  ["#d2527f", "#dc5d89"],
            ];
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorList[params.dataIndex][0]
              },
              {
                offset: 1,
                color: colorList[params.dataIndex][1]
              }
            ]);
          }
        }
      };
      zhu.setOption(options);
    },
    autoWord(formData) {   //属地职务数量
      var obj = echarts.init(document.getElementById("terr_word"));
      let alreadJob = formData.workt1Num; //在岗党员数量
      let fisherMan = formData.workt3Num; //农牧渔民数量
      let soldier = formData.workt5Num; //解放军/武警数量
      let student = formData.workt7Num;  //学生党员数量
      let retire = formData.workt9Num;   //离退休人员数量
      let otherJob = formData.workt11Num; //其他工作党员数量

      let alreadJobPCT = formData.workt1; //在岗党员数量百分比
      alreadJobPCT = alreadJobPCT.substring(alreadJobPCT.length - 1, 0);
      let fisherManPCT = formData.workt3; //农牧渔民数量百分比
      fisherManPCT = fisherManPCT.substring(fisherManPCT.length - 1, 0);
      let soldierPCT = formData.workt5; //解放军武警数量百分比
      soldierPCT = soldierPCT.substring(soldierPCT.length - 1, 0);
      let studentPCT = formData.workt7; //学生党员数量百分比
      studentPCT = studentPCT.substring(studentPCT.length - 1, 0);
      let retirePCT = formData.workt9; //离退休人员数量百分比
      retirePCT = retirePCT.substring(retirePCT.length - 1, 0);
      let otherJobPCT = formData.workt11; //其他工作党员数量百分比
      otherJobPCT = otherJobPCT.substring(otherJobPCT.length - 1, 0);
      var data = [alreadJob, fisherMan, soldier, student, retire, otherJob]; //具体数值
      var dateNum = [alreadJobPCT, fisherManPCT, soldierPCT, studentPCT, retirePCT, otherJobPCT]; //具体百分比
      var dateStr = [
        "在岗职工",
        "农牧渔民",
        "解放军/武警",
        "学生",
        "离退休人员",
        "其他"
      ]; //具体名称

      var option = {
        title: {
          text: "工作岗位",
          top: "2%"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function (params) {
            // console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            );
          },
          textStyle:{
            fontSize:12
          }
        },
        grid: {
          top: "20%",
          bottom: "20%"
          //   right:"10%"
        },
        xAxis: {
          data: dateStr,
          // offset: 10,
          // axisTick: {
          //     show: false
          // },
          axisLine: {
            //刻度“30以下”位子刻度得颜色
            lineStyle: {
              //   color: "#cccccc"
            }
          },
          axisLabel: {
            color: "#000000",
            rotate: 25,
            fontSize: 10
          }
        },
        yAxis: {
          //   min: 0,
          //   max: 100,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
              // padding: 10,
              color: "#000000",
              fontSize: 12,
              formatter: "{c}%"
            },
            itemStyle: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //设置渐变色
              color: function (params) {
                var colorList = [
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"],
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"]
                ];
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorList[params.dataIndex][0]
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex][1]
                  }
                ]);
              },
              barBorderRadius: [8, 8, 0, 0] //柱状角圆角半径
            },
            barWidth: "40%",
            data: dateNum,
            z: 10
          },
          {
            type: "bar",
            barGap: "-100%",
            silent: true,
            itemStyle: {
              color: "#e5e9f0",
              opacity: 0.2,
              normal: {
                color: "#e5e9f0",
                barBorderRadius: [8, 8, 0, 0]
              }
            },
            barWidth: "40%",
            data: [100, 100, 100, 100, 100, 100],
            z: 5
          }
        ]
      };
      obj.setOption(option);
    },
    DdirecSex(formData1) {
      let myChart = this.$echarts.init(document.getElementById("f_rightSex"));
      let maleNum = formData1 == undefined ? 0 : formData1.partynmmNum; //男性党员数量
      let femaleNum = formData1 == undefined ? 0 : formData1.partynmfNum; //女性党员数量
      var malePCT = formData1 == undefined ? 0 : formData1.partynmm;  //男性百分比
      if (formData1) {
        malePCT = malePCT.substring(malePCT.length - 1, 0);
      }
      var femalePCT = formData1 == undefined ? 0 : formData1.partynmf;  //女性百分比
      if (formData1) {
        femalePCT = femalePCT.substring(femalePCT.length - 1, 0);
      }
      var sexIcon = {
        male: "../../../../static/img/female.png",
        female: "../../../../static/img/male.png"
      };
      var option = {
        color: ["#2574A9", "#D2527F"],

        title: [
          {
            text: malePCT + "%",
            subtext: femalePCT + "%",
            left: "50%",
            top: "40%",
            textAlign: "center",
            textStyle: {
              fontSize: 16,
              color: "#2574A9"
            },
            subtextStyle: {
              fontSize: 16,
              color: "#D2527F"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          textStyle:{
            fontSize:12
          }
        },
        grid: {
          left: "25%",
          containLabel: true
        },
        // legend: {
        // //   orient: "vertical",
        //   // x: 'left',
        //   left: "20%",
        //   bottom: "4%",
        //   data: ["男性", "女性"]
        // },
        series: [
          {
            type: "pie",
            name: "党员性别",
            center: ["50%", "52%"],
            radius: ["45%", "60%"],
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },

            data: [
              {
                name: "男性",
                value: maleNum,
                label: {
                  position: ["10%", "20%"],
                  normal: {
                    formatter: ["{Female|}" + "\n\n" + "男"].join("\n"),
                    rich: {
                      Female: {
                        height: 40,
                        align: "center",
                        backgroundColor: {
                          image: sexIcon.male
                        }
                      }
                    }
                  }
                }
              },
              {
                name: "女性",
                value: femaleNum,
                label: {
                  // position: 'left',
                  normal: {
                    formatter: ["{Female|}" + "\n\n" + "女"].join("\n"),
                    rich: {
                      Female: {
                        height: 40,
                        align: "center",
                        backgroundColor: {
                          image: sexIcon.female
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    DdirectAge(formData1) {
      var obj = echarts.init(document.getElementById("directAge"));
      let less30age = formData1==undefined ? 0 : formData1.age1Num; //30岁以下年龄段
      let age31to40 = formData1==undefined ? 0 : formData1.aget4Num;  //31岁至40岁年龄段；
      let age41to50 = formData1==undefined ? 0 : formData1.aget5Num;  //41-50
      let age51to60 = formData1==undefined ? 0 : formData1.aget6Num;  //51-60
      let than60age = formData1==undefined ? 0 : formData1.age12Num; //60岁以上

      let less30agePCT = formData1 ==undefined ? 0 : formData1.aget1; //30岁以下党员数量百分比
      if(formData1){
        less30agePCT = less30agePCT.substring(less30agePCT.length - 1, 0);
      }
      let age31to40PCT = formData1 ==undefined ? 0 : formData1.aget4; //31-40党员数量百分比
      if(formData1){
        age31to40PCT = age31to40PCT.substring(age31to40PCT.length - 1, 0);
      }
      let age41to50PCT = formData1 ==undefined ? 0 : formData1.aget5; //41-50党员数量百分比
      if(formData1){
        age41to50PCT = age41to50PCT.substring(age41to50PCT.length - 1, 0);
      }
      let age51to60PCT = formData1 ==undefined ? 0 : formData1.aget6; //51-60党员数量百分比
      if(formData1){
        age51to60PCT = age51to60PCT.substring(age51to60PCT.length - 1, 0);
      }
      let than60agePCT = formData1 ==undefined ? 0 : formData1.aget7; //60以上党员数量百分比
      if(formData1){
        than60agePCT = than60agePCT.substring(than60agePCT.length - 1, 0);
      }
      var data = [less30age, age31to40, age41to50, age51to60, than60age]; //具体数值
      var dateNum = [less30agePCT, age31to40PCT, age41to50PCT, age51to60PCT, than60agePCT]; //具体百分比
      var dateStr = ["30岁以下", "31-40", "41-50", "51-60", "60岁以上"]; //具体名称

      var option = {
        title: {
          text: "党员年龄段",
          top: "3%"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function (params) {
            // console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            );
          },
          textStyle:{
            fontSize:12
          }
        },
        grid: {
          top: "20%",
          bottom: "15%"
        },
        xAxis: {
          data: dateStr,
          offset: 5,
          // axisLine: {
          //   //刻度“30以下”位子刻度得颜色
          //   lineStyle: {
          //     //   color: "#cccccc"
          //   }
          // },
          axisLabel: {
            color: "#000000",
            fontSize: 12
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
              color: "#000000",
              fontSize: 12,
              formatter: "{c}%"
            },
            itemStyle: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //设置渐变色
              color: function (params) {
                var colorList = [
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"]
                ];
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorList[params.dataIndex][0]
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex][1]
                  }
                ]);
              },
              barBorderRadius: [10, 10, 0, 0] //柱状角圆角半径
            },
            barWidth: "40%",
            data: dateNum,
            z: 10
          },
          {
            type: "bar",
            barGap: "-100%",
            silent: true,
            itemStyle: {
              color: "#e5e9f0",
              opacity: 0.2,
              normal: {
                color: "#e5e9f0",
                barBorderRadius: [10, 10, 0, 0]
              }
            },
            barWidth: "40%",
            data: [100, 100, 100, 100, 100],
            z: 5
          }
        ]
      };
      obj.setOption(option);
    },
    DdirecLeft(formData1) {
      let myChart = this.$echarts.init(document.getElementById("directLeft"));
      let readyParty = formData1==undefined ? 0 : formData1.prepartynmNum; //预备党员数量
      let formalParty = formData1==undefined ? 0 : formData1.partytnmNum; //正式党员数量
      var male = formData1==undefined ? 0 : formData1.partytnm; //正式党员百分比
      var female = formData1==undefined ? 0 : formData1.prepartynm; //预备党员百分比
        var option = {
       color: ["#1f3a93", "#D2527F"],
        title: [ {} ],

        tooltip: {
          trigger: "item",
          textStyle:{
            fontSize:12
          }
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          left: "25%",
          containLabel: true
        },
        legend: {
          //   orient: "vertical",
          // x: 'left',
          left: "15%",
          bottom: "0.1%",
          data: ["预备党员", "正式党员"]
        },
        series: [
          {
            type: "pie",
            name: "党员",
            center: ["45%", "48%"],
            radius: ["40%", "60%"],
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },

            data: [
              {
                name: "正式党员",
                value:formalParty,
                label: {
                  position: ["10%", "20%"],
                  normal: {
                    formatter: "{d}%",
                    // formatter: '{b}\n{d}%',  //名字 数值
                    rich: {
                      Female: {
                        align: "center"
                      }
                    }
                  }
                }
              },
              {
                name: "预备党员",
                value:readyParty,
                label: {
                  normal: {
                    formatter: "{d}%",
                    rich: {
                      Female: {
                        height: 40,
                        align: "center"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    DdirecRight(formData1) {
      let myChart = this.$echarts.init(document.getElementById("directRight"));
      let hanzuNum = formData1 == undefined ? 0 : formData1.nationnmhNum; //汉族党员数量
      let minorityNum = formData1 == undefined ? 0 : formData1.nationnmoNum; //少数民族数量
      var male = formData1 == undefined ? 0 : formData1.nationnmh; //汉族百分比
      var female = formData1 == undefined ? 0 : formData1.nationnmo; //少数民族百分比

var option = {
       color: ["#336e78", "#D35400"],

        title: [ {}],

        tooltip: {
          trigger: "item",
          textStyle:{
            fontSize:12
          }
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          left: "25%",
          containLabel: true
        },
        legend: {
          left: "20%",
          bottom: "0.1%",
          data: ["汉族", "少数民族"]
        },
        series: [
          {
            type: "pie",
            name: "党员民族",
            center: ["50%", "48%"],
            radius: ["40%", "60%"],
            label: {
              normal: {
                textStyle: {
                  fontSize: 14
                }
              }
            },
            data: [
              {
                name: "汉族",
                value: hanzuNum,
                label: {
                  position: ["10%", "20%"],
                  normal: {
                    formatter: "{d}%",
                    // formatter: '{b}\n{d}%'  //名字 数值
                    rich: {
                      Female: {
                        align: "center"
                      }
                    }
                  }
                }
              },
              {
                name: "少数民族",
                value: minorityNum,
                label: {
                  normal: {
                    formatter: "{d}%",
                    rich: {
                      Female: {
                        height: 40,
                        align: "center"
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    DdirecPartyAge(formData1) {
      var zhu = echarts.init(document.getElementById("directPartyAge"));
      let less5age = formData1 == undefined ? 0 : formData1.partyaget1Num; //小于5
      let age6to10 = formData1 == undefined ? 0 : formData1.partyaget2Num; //6-10
      let age11to15 = formData1 == undefined ? 0 : formData1.partyaget3Num; //11-15
      let age16to20 = formData1 == undefined ? 0 : formData1.partyaget4Num; //16-20
      let age21to25 = formData1 == undefined ? 0 : formData1.partyaget5Num; //21-25
      let age26to30 = formData1 == undefined ? 0 : formData1.partyaget6Num; //26-30
      let age31to35 = formData1 == undefined ? 0 : formData1.partyaget7Num; //31-35
      let age36to40 = formData1 == undefined ? 0 : formData1.partyaget8Num; //36-40
      let age41to45 = formData1 == undefined ? 0 : formData1.partyaget9Num; //41-45
      let age46to50 = formData1 == undefined ? 0 : formData1.partyaget10Num; //41-45
      let than50age = formData1 == undefined ? 0 : formData1.partyage15Num; //大于50
      //  var app.title = '坐标轴刻度与标签对齐';
      var date = [
        "小于5",
        "6-10",
        "11-15",
        "16-20",
        "21-25",
        "26-30",
        "31-35",
        "36-40",
        "41-45",
        "46-50",
        "大于50"
      ];
      var options = {
        title: {
          text: "党员党龄",
          // textStyle:{
          top: "2%"
          // }
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle:{
            fontSize:12
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: date,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: "#000000",
              rotate: 50,
              fontSize: 10
            }
          }
        ],
        yAxis: [
          {
            // type : 'category',
            // data : ['10','20','30','40'],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "40%",
            data: [less5age, age6to10, age11to15, age16to20, age21to25, age26to30, age31to35, age36to40, age41to45, age46to50, than50age],
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          }
        ],
        label: {
          normal: {
            show: true,
            position: "top",
            formatter: "{c}"
          }
        },
        itemStyle: {
          normal: {
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: "rgba(17, 168,171, 1)"
            //   },
            //   {
            //     offset: 1,
            //     color: "rgba(17, 168,171, 0.1)"
            //   }
            // ]),

            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          },
          color: function (params) {
            var colorList = [
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"],
              ["#d2527f", "#dc5d89"],
              ["#2574a9", "#2a7cb3"]
              //  ["#d2527f", "#dc5d89"],
            ];
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorList[params.dataIndex][0]
              },
              {
                offset: 1,
                color: colorList[params.dataIndex][1]
              }
            ]);
          }
        }
      };
      zhu.setOption(options);
    },
    DdirecWord(formData1) {
      var obj = echarts.init(document.getElementById("directWord"));

      let alreadJob = formData1 == undefined ? 0 : formData1.workt1Num; //在岗党员数量
      let fisherMan = formData1 == undefined ? 0 : formData1.workt3Num; //农牧渔民数量
      let soldier = formData1 == undefined ? 0 : formData1.workt5Num; //解放军/武警数量
      let student = formData1 == undefined ? 0 : formData1.workt7Num;  //学生党员数量
      let retire = formData1 == undefined ? 0 : formData1.workt9Num;   //离退休人员数量
      let otherJob = formData1 == undefined ? 0 : formData1.workt11Num; //其他工作党员数量

      let alreadJobPCT = formData1 == undefined ? 0 : formData1.workt1; //在岗党员数量百分比
      if(formData1){
        alreadJobPCT = alreadJobPCT.substring(alreadJobPCT.length - 1, 0);
      }
      let fisherManPCT = formData1 == undefined ? 0 : formData1.workt3; //农牧渔民数量百分比
      if(formData1){
        fisherManPCT = fisherManPCT.substring(fisherManPCT.length - 1, 0);
      }
      let soldierPCT = formData1 == undefined ? 0 : formData1.workt5; //解放军武警数量百分比
      if(formData1){
        soldierPCT = soldierPCT.substring(soldierPCT.length - 1, 0);
      }
      let studentPCT = formData1 == undefined ? 0 : formData1.workt7; //学生党员数量百分比
      if(formData1){
        studentPCT = studentPCT.substring(studentPCT.length - 1, 0);
      }
      let retirePCT = formData1 == undefined ? 0 : formData1.workt9; //离退休人员数量百分比
      if(formData1){
        retirePCT = retirePCT.substring(retirePCT.length - 1, 0);
      }
      let otherJobPCT = formData1 == undefined ? 0 : formData1.workt11; //其他工作党员数量百分比
      if(formData1){
        otherJobPCT = otherJobPCT.substring(otherJobPCT.length - 1, 0);
      }
      var data = [alreadJob, fisherMan, soldier, student, retire, otherJob]; //具体数值
      var dateNum = [alreadJobPCT, fisherManPCT, soldierPCT, studentPCT, retirePCT, otherJobPCT]; //具体百分比
      var dateStr = [
        "在岗职工",
        "农牧渔民",
        "解放军/武警",
        "学生",
        "离退休人员",
        "其他"
      ]; //具体名称

      var option = {
        title: {
          text: "工作岗位",
          top: "2%"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function (params) {
            // console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            );
          },
          textStyle:{
            fontSize:12
          }
        },
        grid: {
          top: "20%",
          bottom: "20%"
          //   right:"10%"
        },
        xAxis: {
          data: dateStr,
          // offset: 10,
          // axisTick: {
          //     show: false
          // },
          axisLine: {
            //刻度“30以下”位子刻度得颜色
            lineStyle: {
              //   color: "#cccccc"
            }
          },
          axisLabel: {
            color: "#000000",
            rotate: 25,
            fontSize: 10
          }
        },
        yAxis: {
          //   min: 0,
          //   max: 100,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
              // padding: 10,
              color: "#000000",
              fontSize: 12,
              formatter: "{c}%"
            },
            itemStyle: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //设置渐变色
              color: function (params) {
                var colorList = [
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"],
                  ["#2574a9", "#2a7cb3"],
                  ["#037c5a", "#03a678"],
                  ["#2574a9", "#2a7cb3"]
                ];
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorList[params.dataIndex][0]
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex][1]
                  }
                ]);
              },
              barBorderRadius: [8, 8, 0, 0] //柱状角圆角半径
            },
            barWidth: "40%",
            data: dateNum,
            z: 10
          },
          {
            type: "bar",
            barGap: "-100%",
            silent: true,
            itemStyle: {
              color: "#e5e9f0",
              opacity: 0.2,
              normal: {
                color: "#e5e9f0",
                barBorderRadius: [8, 8, 0, 0]
              }
            },
            barWidth: "40%",
            data: [100, 100, 100, 100, 100, 100],
            z: 5
          }
        ]
      };
      obj.setOption(option);
    },
    autoEducation(formData) {   //属地学历统计
      var obj = echarts.init(document.getElementById("terr_education"));
      let xiaoxue = formData.edt1Num; //小学党员数量
      let chuzhong = formData.edt2Num; //初中党员数量
      let pugao = formData.edt3Num; //普通高中党员数量
      let zhongzhi = formData.edt4Num; //中等职业学校
      let benke = formData.edt5Num; //本专科教育
      let yanjiu = formData.edt7Num; //研究生党员数量
      let otherxue = formData.edt9Num; //其他学历党员数量

      let xiaoxuePCT = formData.edt1; //小学百分比
      xiaoxuePCT = xiaoxuePCT.substring(xiaoxuePCT.length - 1, 0);
      let chuzhongPCT = formData.edt2; //初中百分比
      chuzhongPCT = chuzhongPCT.substring(chuzhongPCT.length - 1,0);
      let pugaoPCT = formData.edt3;  //普通高中党员数量百分比
      pugaoPCT = pugaoPCT.substring(pugaoPCT.length - 1,0);
      let zhongzhiPCT = formData.edt4; //中等职业党员数量百分比
      zhongzhiPCT = zhongzhiPCT.substring(zhongzhiPCT.length - 1, 0);
      let benkePCT = formData.edt5; //本，专党员数量百分比
      benkePCT = benkePCT.substring(benkePCT.length - 1, 0);
      let yanjiuPCT = formData.edt7; //研究生党员数量百分比
      yanjiuPCT = yanjiuPCT.substring(yanjiuPCT.length - 1, 0);
      let otherxuePCT = formData.edt9; //其他学历党员数量百分比
      otherxuePCT = otherxuePCT.substring(otherxuePCT.length - 1, 0);
      var data = [xiaoxue, chuzhong, pugao, zhongzhi, benke, yanjiu, otherxue]; //具体数值
      var dateNum = [xiaoxuePCT, chuzhongPCT, pugaoPCT, zhongzhiPCT, benkePCT, yanjiuPCT, otherxuePCT]; //具体百分比
      var dateStr = [
        "小学",
        "初中",
        "普通高中",
        "中等职业学校",
        "本专科教育",
        "研究生教育",
        "其他"
      ]; //具体名称

      var option = {
        title: {
          text: "学历",
          top: "2%"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function (params) {
            // console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            );
          },
          textStyle:{
            fontSize:12
          }
        },
        grid: {
          top: "20%",
          bottom: "20%"
          //   right:"10%"
        },
        xAxis: {
          data: dateStr,
          // offset: 10,
          // axisTick: {
          //     show: false
          // },
          axisLine: {
            //刻度“30以下”位子刻度得颜色
            lineStyle: {
              //   color: "#cccccc"
            }
          },
          axisLabel: {
            color: "#000000",
            rotate: 25,
            fontSize: 10
          }
        },
        yAxis: {
          //   min: 0,
          //   max: 100,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
              // padding: 10,
              color: "#000000",
              fontSize: 12,
              formatter: "{c}%"
            },
            itemStyle: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //设置渐变色
              // color:"#5ECBB0",
              color: function (params) {
                var colorList = [
                  ["#d2527f", "#dc5d89"],
                  ["#2574a9", "#2a7cb3"],
                  ["#d2527f", "#dc5d89"],
                  ["#2574a9", "#2a7cb3"],
                  ["#d2527f", "#dc5d89"],
                  ["#2574a9", "#2a7cb3"],
                  ["#d2527f", "#dc5d89"]
                  // ["#2574a9", "#2a7cb3"],
                ];
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorList[params.dataIndex][0]
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex][1]
                  }
                ]);
              },
              barBorderRadius: [8, 8, 0, 0] //柱状角圆角半径
            },
            barWidth: "40%",
            data: dateNum,
            z: 10
          },
          {
            type: "bar",
            barGap: "-100%",
            silent: true,
            itemStyle: {
              color: "#e5e9f0",
              opacity: 0.2,
              normal: {
                color: "#e5e9f0",
                barBorderRadius: [8, 8, 0, 0]
              }
            },
            barWidth: "40%",
            data: [100, 100, 100, 100, 100, 100, 100],
            z: 5
          }
        ]
      };
      obj.setOption(option);
    },
    DdirecEducation(formData1) {
      var obj = echarts.init(document.getElementById("directEducation"));
      let xiaoxue = formData1 == undefined ? 0 : formData1.edt1Num; //小学党员数量
      let chuzhong = formData1 == undefined ? 0 : formData1.edt2Num; //初中党员数量
      let pugao = formData1 == undefined ? 0 : formData1.edt3Num; //普通高中党员数量
      let zhongzhi = formData1 == undefined ? 0 : formData1.edt4Num; //中等职业学校
      let benke = formData1 == undefined ? 0 : formData1.edt5Num; //本专科教育
      let yanjiu = formData1 == undefined ? 0 : formData1.edt7Num; //研究生党员数量
      let otherxue = formData1 == undefined ? 0 : formData1.edt9Num; //其他学历党员数量

      let xiaoxuePCT = formData1 == undefined ? 0 : formData1.edt1; //小学百分比
      if(formData1){
        xiaoxuePCT = xiaoxuePCT.substring(xiaoxuePCT.length - 1, 0);
      }
      let chuzhongPCT = formData1 == undefined ? 0 : formData1.edt2; //初中百分比
      if(formData1){
        chuzhongPCT = chuzhongPCT.substring(chuzhongPCT.length - 1,0);
      }
      let pugaoPCT = formData1 == undefined ? 0 : formData1.edt3;  //普通高中党员数量百分比
      if(formData1){
        pugaoPCT = pugaoPCT.substring(pugaoPCT.length - 1,0);
      }
      let zhongzhiPCT = formData1 == undefined ? 0 : formData1.edt4; //中等职业党员数量百分比
      if(formData1){
        zhongzhiPCT = zhongzhiPCT.substring(zhongzhiPCT.length - 1, 0);
      }
      let benkePCT = formData1 == undefined ? 0 : formData1.edt5; //本，专党员数量百分比
      if(formData1){
        benkePCT = benkePCT.substring(benkePCT.length - 1, 0);
      }
      let yanjiuPCT = formData1 == undefined ? 0 : formData1.edt7; //研究生党员数量百分比
      if(formData1){
        yanjiuPCT = yanjiuPCT.substring(yanjiuPCT.length - 1, 0);
      }
      let otherxuePCT = formData1 == undefined ? 0 : formData1.edt9; //其他学历党员数量百分比
      if(formData1){
        otherxuePCT = otherxuePCT.substring(otherxuePCT.length - 1, 0);
      }
      var data = [xiaoxue, chuzhong, pugao, zhongzhi, benke, yanjiu, otherxue]; //具体数值
      var dateNum = [xiaoxuePCT, chuzhongPCT, pugaoPCT, zhongzhiPCT, benkePCT, yanjiuPCT, otherxuePCT]; //具体百分比
      var dateStr = [
        "小学",
        "初中",
        "普通高中",
        "中等职业学校",
        "本专科教育",
        "研究生教育",
        "其他"
      ]; //具体名称

      var option = {
        title: {
          text: "学历",
          top: "2%"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function (params) {
            // console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            );
          },
          textStyle:{
            fontSize:12
          }
        },
        grid: {
          top: "20%",
          bottom: "20%"
          //   right:"10%"
        },
        xAxis: {
          data: dateStr,
          // offset: 10,
          // axisTick: {
          //     show: false
          // },
          axisLine: {
            //刻度“30以下”位子刻度得颜色
            lineStyle: {
              //   color: "#cccccc"
            }
          },
          axisLabel: {
            color: "#000000",
            rotate: 25,
            fontSize: 10
          }
        },
        yAxis: {
          //   min: 0,
          //   max: 100,
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top",
              // padding: 10,
              color: "#000000",
              fontSize: 12,
              formatter: "{c}%"
            },
            itemStyle: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //设置渐变色
              // color:"#5ECBB0",
              color: function (params) {
                var colorList = [
                  ["#d2527f", "#dc5d89"],
                  ["#2574a9", "#2a7cb3"],
                  ["#d2527f", "#dc5d89"],
                  ["#2574a9", "#2a7cb3"],
                  ["#d2527f", "#dc5d89"],
                  ["#2574a9", "#2a7cb3"],
                  ["#d2527f", "#dc5d89"]
                  // ["#2574a9", "#2a7cb3"],
                ];
                return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: colorList[params.dataIndex][0]
                  },
                  {
                    offset: 1,
                    color: colorList[params.dataIndex][1]
                  }
                ]);
              },
              barBorderRadius: [8, 8, 0, 0] //柱状角圆角半径
            },
            barWidth: "40%",
            data: dateNum,
            z: 10
          },
          {
            type: "bar",
            barGap: "-100%",
            silent: true,
            itemStyle: {
              color: "#e5e9f0",
              opacity: 0.2,
              normal: {
                color: "#e5e9f0",
                barBorderRadius: [8, 8, 0, 0]
              }
            },
            barWidth: "40%",
            data: [100, 100, 100, 100, 100, 100, 100],
            z: 5
          }
        ]
      };
      obj.setOption(option);
    }
  }
};
</script>

<style scope>
.top {
  width: 100%;
  height: 150px;
  border-bottom: 1px dashed #cccccc;
}
.main {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
.mainFl {
  width: 50%;
  /* height: 200px; */
  height: 100%;
  float: left;
  box-sizing: border-box;
}
.mainRl {
  border-left: 1px dashed #cccccc;
}
.mainFl > p {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
    background: #dfdfdf47;
  border-radius: 5px;
}
.mainFl > div.f_con,
.botom > div > div {
  width: 90%;
  margin: 0 auto;
  height: 250px;
  border-bottom: 1px dashed #cccccc;
  position: relative;
}
.mainFl > div.f_con .two {
  width: 50%;
  height: 90%;
  margin-top: 2%;
  float: left;
  box-sizing: border-box;
  background: none;
}
.mainFl > div.f_con .two:nth-child(2n) {
  border-left: 1px dashed #cccccc;
}
.mainFl > div.f_con > p.Echartitles {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 5px;
  left: 5px;
}

</style>
