<template>
    <div>
        <!--左边-->
        <div class="top" style="position: relative;">
             <p style="position: absolute;top:30px;left:450px;">
                总计：<span style="font-size:24px">{{topTotal}}</span>人
            </p>
            <div id="top" style="width:50%;height:150px;margin:0 auto;"></div>
        </div>
        <div class="allParty" style="border-right: 1px dashed #cccccc;">
            <div class="allContent">
              <div class="f_con">
                <p class="Echartitle">党员性别</p>
                <div id="partySex"></div>
              </div>
                <div class="f_con">
                    <p class="Echartitle">预备党员</p>
                     <p class="Echartitle" style="left:52%">党员民族</p>
                    <div class="members" style="width:49%"  id="f_left"></div>
                    <div class="members" id="f_right"></div>
                </div>
                <div class="f_con" style="border:none">
                  <!-- 学历 -->
                  <div id="f_education"></div>
                </div>
            </div>
        </div>
        <div class="allParty">
            <div class="allContent">
              <div class="f_con">
                <!-- 党员年龄段 -->
                  <div id="f_age"></div>
              </div>
                <div class="f_con">
                  <!-- 党员年龄 -->
                  <div id="f_ageGroup"></div>
              </div>
              <div class="f_con" style="border:none">
                <!-- 工作岗位 -->
                <div id="f_post"></div>
              </div>
            </div>
        </div>
        <div class="cle"></div>
    </div>
</template>

<script>
import echarts from "echarts";
import bus from "./busEvent.js";
import { postAjax, getAjax, oUrl } from "../../../api/api.js";
export default {
  create() {
    bus.$on("clickEvent", function(id) {
      debugger;
      this.selNum = id;
    });
  },
  mounted() {
    this.initLoadFn(); //初次加载数据
  },
  data() {
    return {
      id:sessionStorage.getItem("userWorkId"),
      topTotal: 0 //顶部总计
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.initLoadFn(val.query.id);
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    initLoadFn(val) {
      let selNum = val == undefined ? 0 : val;
      postAjax("statistic/statisticAll/" + this.id + "?isCenterCom=" + selNum).then(
        res => {
          let formData = res.data.data; //获取过来的数据
          // console.log(formData);

          this.autoSum(formData); //最上面得统计

          this.autoMove(formData); //性别
          this.autoMove1(formData); //党员年龄段
          this.autoMove2(formData); //党员年龄
          this.autoLeft(formData); //预备党员
          this.autoRight(formData); //党员民族
          this.autoEducation(formData); //学历
          this.autoPost(formData); //工作岗位
        }
      );
    },
    autoSum(formData) {
      let myChart = this.$echarts.init(document.getElementById("top"));
      let Territoriality = formData.zhijeTotalNum; //直属管理总数
      let shudiMagager =
        formData.shudiTotalNum == undefined ? 0 : formData.shudiTotalNum; //属地管理总数
      this.topTotal = Number(Territoriality) + Number(shudiMagager); //计算总计并赋值
      this.topTotal = this.fmoney(this.topTotal, 3);
      // console.log("total:" + Territoriality);
      // console.log("total2:" + shudiMagager);

      var options = {
        legend: {
          bottom: 10,
          textStyle: {
            color: "#000"
          },
          data: ["直接管理数量", "属地管理数量"]
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
            name: "属地管理数量",
            type: "bar",
            //    legendHoverLink:false,
            //     silent:false,
            //     animation:false,
            itemStyle: {
              normal: {
                show: true,
                color: "#03a678",
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: "#333"
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: [shudiMagager]
          },
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
                color: "#2574a9",
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: "#333"
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: [Territoriality]
          }
        ]
      };

      myChart.setOption(options);
    },
    //性别
    autoMove(formData) {
      let myChart = this.$echarts.init(document.getElementById("partySex"));
      var sexIcon = {
        male: "../../../../static/img/female.png",
        female: "../../../../static/img/male.png"
      };
      var male = formData.partynmm; //男性
      var female = formData.partynmf; //女性
      var option = {
        color: ["#2574A9", "#D2527F"],

        title: [
          {
            text: male,
            subtext: female,
            left: "45%",
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
            center: ["45%", "50%"],
            radius: ["50%", "65%"],
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
                value: formData.partynmmNum,
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
                value: formData.partynmfNum,
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
    //党员年龄段
    autoMove1(formData) {
      var obj = echarts.init(document.getElementById("f_age"));
      let age30Down = formData.age1Num; //30岁以下数量
      let age31to40 = formData.aget4Num; //31-40岁之间数量
      let age41to50 = formData.aget5Num; //41-50岁之间数量
      let age51to60 = formData.aget6Num; //51-60岁之间数量
      let age60Up =
        Number(formData.aget7Num) +
        Number(formData.aget8Num) +
        Number(formData.aget9Num) +
        Number(formData.aget10Num) +
        Number(formData.aget11Num); //60岁以上
      var data = [age30Down, age31to40, age41to50, age51to60, age60Up]; //具体数值
      let age30DownPCT = formData.aget1; //党龄30岁以下百分比
      age30DownPCT = age30DownPCT.substring(age30DownPCT.length - 1, 0);
      let age31to40PCT = formData.aget4; //党龄31-40岁百分比
      age31to40PCT = age31to40PCT.substring(age31to40PCT.length - 1, 0);
      let age41to50PCT = formData.aget5; //党龄41-50岁百分比
      age41to50PCT = age41to50PCT.substring(age41to50PCT.length - 1, 0);
      let age51to60PCT = formData.aget6; //党龄51-60岁百分比
      age51to60PCT = age51to60PCT.substring(age51to60PCT.length - 1, 0);
      let age60UpPCT = formData.aget7; //党龄60岁以上百分比
      age60UpPCT = age60UpPCT.substring(age60UpPCT.length - 1, 0);
      var dateNum = [
        age30DownPCT,
        age31to40PCT,
        age41to50PCT,
        age51to60PCT,
        age60UpPCT
      ]; //具体百分比
      var dateStr = ["30岁以下", "31-40", "41-50", "51-60", "60岁以上"]; //具体名称

      var option = {
        title: {
          text: "党员年龄段"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function(params) {
            // console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            )
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
          offset: 5,
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
            fontSize: 12
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
              color: function(params) {
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
    //党员年龄
    autoMove2(formData) {
      var zhu = echarts.init(document.getElementById("f_ageGroup"));
      //  var app.title = '坐标轴刻度与标签对齐';
      let ageLess5 = formData.partyaget1Num; //党龄5年以下党员数量
      let age6to10 = formData.partyaget2Num; //党龄6-10党员年数量
      let age11to15 = formData.partyaget3Num; //党龄11-15年党员数量
      let age16to20 = formData.partyaget4Num; //党龄16-20年党员数量
      let age21to25 = formData.partyaget5Num; //党龄21-25党员数量
      let age26to30 = formData.partyaget6Num; //党龄26-30党员数量
      let age31to35 = formData.partyaget7Num; //党龄31-35党员数量
      let age35to40 = formData.partyaget8Num; //党龄35-40党员数量
      let age41to45 = formData.partyaget9Num; //党龄41-45党员数量
      let age46to50 = formData.partyaget10Num; //党龄46-50党员数量
      let agethan50 = formData.partyaget11Num; //党龄大于50岁以上党员数量
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
      var val = [
        ageLess5,
        age6to10,
        age11to15,
        age16to20,
        age21to25,
        age26to30,
        age31to35,
        age35to40,
        age41to45,
        age46to50,
        agethan50
      ]; //党员年龄具体数量
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
            data: val,
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
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          },
          color: function(params) {
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
    //预备党员
    autoLeft(formData) {
      // console.log(formData)
      let myChart = this.$echarts.init(document.getElementById("f_left"));
      // var male = formData.partytnm; //正式党员数量百分比
      // male = male.substring(male.length - 1, 0);
      // var female = formData.prepartynm; //预备党员数量百分比
      // female = female.substring(female.length - 1, 0);

      //放成数量不放百分比
      var male = formData.partytnmNum; //正式党员数量
      var female = formData.prepartynmNum; //预备党员数量
      // console.log(male,female)

      var option = {
        color: ["#1f3a93", "#D2527F"],
        title: [{}],

        tooltip: {
          trigger: "item",
          textStyle:{
            fontSize:12
          }
          // formatter: "{b} <br/> {c}"
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
                value: male,
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
                value: female,
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
    //党员民族
    autoRight(formData) {
      let myChart = this.$echarts.init(document.getElementById("f_right"));
      // var hanzu = formData.nationnmh; //汉族百分比
      // hanzu = hanzu.substring(hanzu.length - 1, 0);
      // var minority = formData.nationnmo; //少数民族百分比
      // minority = minority.substring(minority.length - 1, 0);

      var hanzu = formData.nationnmhNum; //汉族
      var minority = formData.nationnmoNum; //少数民族

      var option = {
        color: ["#336e78", "#D35400"],

        title: [{}],

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
                value: hanzu,
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
                value: minority,
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
    //学历
    autoEducation(formData) {
      var obj = echarts.init(document.getElementById("f_education"));
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
      chuzhongPCT = chuzhongPCT.substring(chuzhongPCT.length - 1, 0);
      let pugaoPCT = formData.edt3; //普通高中党员数量百分比
      pugaoPCT = pugaoPCT.substring(pugaoPCT.length - 1, 0);
      let zhongzhiPCT = formData.edt4; //中等职业党员数量百分比
      zhongzhiPCT = zhongzhiPCT.substring(zhongzhiPCT.length - 1, 0);
      let benkePCT = formData.edt5; //本，专党员数量百分比
      benkePCT = benkePCT.substring(benkePCT.length - 1, 0);
      let yanjiuPCT = formData.edt7; //研究生党员数量百分比
      yanjiuPCT = yanjiuPCT.substring(yanjiuPCT.length - 1, 0);
      let otherxuePCT = formData.edt9; //其他学历党员数量百分比
      otherxuePCT = otherxuePCT.substring(otherxuePCT.length - 1, 0);
      var data = [xiaoxue, chuzhong, pugao, zhongzhi, benke, yanjiu, otherxue]; //具体数值
      var dateNum = [
        xiaoxuePCT,
        chuzhongPCT,
        pugaoPCT,
        zhongzhiPCT,
        benkePCT,
        yanjiuPCT,
        otherxuePCT
      ]; //具体百分比
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
          formatter: function(params) {
            console.log(params);
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
              color: function(params) {
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
    //工作岗位
    autoPost(formData) {
      var obj = echarts.init(document.getElementById("f_post"));
      let alreadJob = formData.workt1Num; //在岗党员数量
      let fisherMan = formData.workt3Num; //农牧渔民数量
      let soldier = formData.workt5Num; //解放军/武警数量
      let student = formData.workt7Num; //学生党员数量
      let retire = formData.workt9Num; //离退休人员数量
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
      var dateNum = [
        alreadJobPCT,
        fisherManPCT,
        soldierPCT,
        studentPCT,
        retirePCT,
        otherJobPCT
      ]; //具体百分比
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
          formatter: function(params) {
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
              color: function(params) {
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
    fmoney(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      let l = s
        .split(".")[0]
        .split("")
        .reverse();
      let t = "";
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
      }
      return t
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>

<style scope>
.allParty {
  width: 50%;
  float: left;
  margin-top: 20px;
  box-sizing: border-box;
}
.allContent {
  width: 95%;
  margin: 0 auto;
}
.allContent > div.f_con {
  width: 100%;
  height: 250px;
  border-bottom: 1px dashed #cccccc;
  position: relative;
}
.f_con > div {
  width: 100%;
  height: 100%;
}
.f_con > div.members {
  width: 50%;
  height: 90%;
  margin-top: 4%;
  float: left;
  box-sizing: border-box;
}
.f_con > div.members:last-child {
  border-left: 1px dashed #cccccc;
}
.Echartitle {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
