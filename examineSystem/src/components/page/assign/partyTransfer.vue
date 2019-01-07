<template>
  <div>
    <div class="title" style="background:#ececec;height:46px;">党员关系转接</div>
    <div class="main">
      <div class="mainFl">
        <div class="title-content">
          <p>接收党员</p>
        </div>
        <div class="f_con">
          <span>接收党员人次</span>
          <div class="f_score">
            <div style="color:#2574A9">{{enterpriseObj.inNum}}</div>
            <p>总数量</p>
          </div>
        </div>
        <div style="border:none;height:270px;">
          <div id="f_ageGroup" style="width:100%;height:100%"></div>
        </div>
      </div>
      <div class="mainFl mainRl">
        <div class="title-content">
          <p>转出党员</p>
        </div>
        <div class="f_con">
          <span>转出党员人次</span>
          <div class="f_score">
            <div style="color:#be3f6b">{{enterpriseObj.outNum}}</div>
            <p>总数量</p>
          </div>
        </div>
        <div style="border:none;height:270px">
          <div id="orgPieChartR" style="width:100%;height:100%"></div>
        </div>

      </div>
      <div class="cle"></div>
    </div>
  </div>
</template>

<script>
  import {
    postAjax,
    getAjax
  } from "../../../api/api.js";
  import echarts from "echarts";
  import bus from "./busEvent.js";
  export default {
    mounted() {
      this.initData(); //初始化数据
    },
    data() {
      return {
        gzwId: sessionStorage.getItem("userWorkId"),
        // gzwId:'14192eae-57dd-11e7-9694-0050569a68e4',
        enterpriseObj: {}, //机关企事业对象
      };
    },
    methods: {
      initData() { //初始化数据
        getAjax('centerStatistic/transferStatistic?gzwid=' + this.gzwId).then(res => {
          this.enterpriseObj = res.data.data;
          console.log(this.enterpriseObj);
          this.autoMove(this.enterpriseObj);
          this.autoMove1(this.enterpriseObj);
        });
      },
      autoMove(enterpriseObj) {
        var zhu = echarts.init(document.getElementById("f_ageGroup"));

        var date = [
          "接收\n省内\n其他\n市\n数量",
          "接收\n省委\n其他\n组织\n数量",
          "接收\n市内\n其他\n县\n(市、区)\n数量",
          "接收\n市委\n直属\n其他\n党\n组织\n数量",
          "接收\n县\n(市、区)\n内\n其他\n乡镇\n(街道)\n数量",
          "接收\n县\n(市、区)\n委\n其他\n党\n组织\n数量",
          "接收\n乡镇\n(街道)\n其他\n党\n组织\n数量",
          "接收\n外省\n(区、市)\n数量",
          "接收\n军队\n和武\n警部\n队\n数量",
          "接收\n国(境)\n外\n数量"
        ];
        var val = [enterpriseObj.rinsheng_shi, enterpriseObj.rinsheng_org, enterpriseObj.rinshi_xian, enterpriseObj.rinshi_org,
          enterpriseObj.rinxian_jiedao, enterpriseObj.rinxian_org, enterpriseObj.rinjiedao, enterpriseObj.routsheng,
          enterpriseObj.rfromwj, enterpriseObj.rforeign
        ];
        var options = {
          title: {
            text: "接收党员统计",
            textStyle: {
              fontSize: 14,
              fontWeight: "normal"
            },
            top: "2%",
            left: "5%"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              fontSize: 12
            }
          },
          grid: {
            left: "5%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [{
            type: "category",
            data: date,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: "#000000",
              //   rotate: 50,
              fontSize: 10
            }
          }],
          yAxis: [{
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
          }],
          series: [{
            name: "数量",
            type: "bar",
            barWidth: "40%",
            data: val,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          }],
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
                ["#d2527f", "#dc5d89"]
                //   ["#2574a9", "#2a7cb3"]
                //  ["#d2527f", "#dc5d89"],
              ];
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
      autoMove1(enterpriseObj) {
        let pieChart = this.$echarts.init(
          document.getElementById("orgPieChartR")
        );
        var date = [
          "转出\n省内\n其他\n市\n数量",
          "转出\n省委\n其他\n组织\n数量",
          "转出\n市内\n其他\n县\n(市、区)\n数量",
          "转出\n市委\n直属\n其他\n党\n组织\n数量",
          "转出\n县\n(市、区)\n内\n其他\n乡镇\n(街道)\n数量",
          "转出\n县\n(市、区)\n委\n其他\n党\n组织\n数量",
          "转出\n乡镇\n(街道)\n其他\n党\n组织\n数量",
          "转出\n外省\n(区、市)\n数量",
          "转出\n军队\n和武\n警部\n队\n数量",
          "转出\n国(境)\n外\n数量"
        ];
        var val = [enterpriseObj.oinsheng_shi, enterpriseObj.oinsheng_org, enterpriseObj.oinshi_xian, enterpriseObj.oinshi_org,
          enterpriseObj.oinxian_jiedao, enterpriseObj.oinxian_org, enterpriseObj.oinjiedao, enterpriseObj.ooutsheng,
          enterpriseObj.otwj, enterpriseObj.otforeign
        ];
        var options = {
          title: {
            text: "转出党员统计",
            textStyle: {
              fontSize: 14,
              fontWeight: "normal"
            },
            top: "2%",
            left: "5%"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              fontSize: 12
            }
          },
          grid: {
            left: "5%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [{
            type: "category",
            data: date,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: "#000000",
              //   rotate: 50,
              fontSize: 10
            }
          }],
          yAxis: [{
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
          }],
          series: [{
            name: "数量",
            type: "bar",
            barWidth: "40%",
            data: val,
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 10, 10]
              }
            }
          }],
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
                ["#d2527f", "#dc5d89"]
                //   ["#2574a9", "#2a7cb3"]
                //  ["#d2527f", "#dc5d89"],
              ];
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
        pieChart.setOption(options);
      }
    }
  };
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    -webkit-box-shadow: #ccc 0px 3px 5px;
    -moz-box-shadow: #ccc 0px 3px 5px;
    box-shadow: #ccc 0px 3px 5px;
    /* height: 200px; */
    /* background: green; */
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

  .title-content {
    margin: 0 auto;
    padding: 1px;
    width: 90%;
    height: 45px;
    background: #ececec;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .title-content>p {
    display: block;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    border-radius: 5px;
  }

  .mainFl>div.f_con,
  .botom>div>div {
    width: 90%;
    margin: 0 auto;
    height: 250px;
    border-bottom: 1px dashed #cccccc;
    position: relative;
  }

  .mainFl>div.f_con {
    height: 220px;
  }

  .mainFl>div.f_con .two {
    width: 50%;
    height: 90%;
    margin-top: 2%;
    float: left;
    box-sizing: border-box;
    background: none;
  }

  .mainFl>div.f_con .two:nth-child(2n) {
    border-left: 1px dashed #cccccc;
  }

  .mainFl>div.f_con span {
    font-size: 14px;
    display: block;
    padding-top: 20px;
  }

  .mainFl>div.f_con div.f_score {
    width: 50%;
    height: 100px;
    background: #f1f1f1;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .mainFl>div.f_con div.f_score div {
    font-size: 30px;
    margin-top: 20px;
  }

  .mainFl>div.f_con div.f_score p {
    font-size: 12px;
    margin-top: 10px;
  }

  .mainFl>div.f_con>p.Echartitles {
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 5px;
    left: 5px;
  }
</style>