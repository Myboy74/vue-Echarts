<template>
    <div class="shadowLy">
        <div class="branch">
            <div class="title" style="background:#e4e3e3;height:46px;">山东E支部</div>
            <div class="f_content">
                <ul>
                    <li>
                    <p>开通数量</p>
                        <div class="f_div">
                           <div id="scoringSta" style="width:100%;height:100%"></div>
                        </div>
                    </li>
                    <li>
                        <p>公告数量</p>
                        <div class="f_div">
                            <p>发布数量</p>
                            <div class="f_text">
                                <p style="color:#037c5a">{{ebranchObj.messagenum}}</p>
                                <span>总数量</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="cle"></div>
            </div>
        </div>
        <div class="branch cle">
            <div class="title" style="background:#e4e3e3;height:46px;">组织生活数量</div>
            <div class="f_content" style="margin-bottom:50px">
                <ul>
                    <li>
                        <div class="f_div">
                            <p>组织生活总数</p>
                            <div class="f_text">
                                <p style="color:#2574A9">{{ebranchObj.orgLifeNum}}</p>
                                <span>总数量</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="f_div">
                           <div id="f_education" style="width:100%;height:100%"></div>
                        </div>
                    </li>
                </ul>
                <div class="cle"></div>
            </div>
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
    this.initData();
  },
  data() {
    return {
      gzwId: sessionStorage.getItem("userWorkId"),
      // gzwId:'14192eae-57dd-11e7-9694-0050569a68e4',
      ebranchObj: {}, //机关企事业对象
    };
  },
  methods: {
    initData() { //初始化数据
      getAjax('centerStatistic/ezbStatistic?gzwid=' + this.gzwId).then(res => {
        this.ebranchObj = res.data.data;
        console.log(this.ebranchObj);
        this.autoMove(this.ebranchObj);
        this.autoEducation(this.ebranchObj);
      });
    },
    autoMove(ebranchObj) {
      let myChart = this.$echarts.init(document.getElementById("scoringSta"));
      var option = {
        title: {
          text: "开通E支部信息",
          textStyle: {
            color: "#353639",
            fontSize: "14",
            fontWeight: "lighter",
            fontFamily: "Helvetica Neue",
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "14"
          },
          left: "20px"
        },
        legend: {
          orient: "horizontal",
          right: "0%",
          bottom: "10%",
          data: [
            { name: "已开通", textStyle: { color: "red" } },
            { name: "未开通", textStyle: { color: "red" } }
          ]
        },
        color: ["#2574A9", "#03A678"],
        series: [
          {
            name: " 党组织\n  总数",
            type: "pie",
            radius: ["40%", "55%"],
            center: ["50%", "41%"],
            hoverAnimation: false,
            data: [
              {
                value: ebranchObj.uktnum,
                name: "未开通数量\n" + ebranchObj.uktnum + "\n" + ebranchObj.uktRate + "%"
              },
              {
                value: ebranchObj.ktnum,
                name: "已开通数量\n" + ebranchObj.ktnum + "\n" + ebranchObj.ktRate + "%"
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    autoEducation(ebranchObj) {
      var obj = echarts.init(document.getElementById("f_education"));
      var data = [ebranchObj.shyk, ebranchObj.mzshh, ebranchObj.zzshh, ebranchObj.txth, ebranchObj.mzpydy, ebranchObj.ztdr];
      var dateNum = [ebranchObj.shykRate, ebranchObj.mzshhRate, ebranchObj.zzshhRate, ebranchObj.txthRate, ebranchObj.mzpydyRate, ebranchObj.ztdrRate];
      var dateStr = [
        "三会\n一课",
        "民主\n生活会",
        "组织\n生活会",
        "谈心\n谈话",
        "民主\n评议\n党员",
        "主题\n党日"
      ]; //具体名称

      var option = {
        title: {
          text: "组织生活数量统计",
          textStyle: {
            color: "#353639",
            fontSize: "14",
            fontWeight: "lighter",
            fontFamily: "Helvetica Neue",
          },
          top: "-2%",
          left: "5%"
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            //指示器类型,可选'line','shadow','cross'
            type: "shadow"
          },
          formatter: function (params) {
            console.log(params);
            return (
              "数量：" +
              data[params[0].dataIndex] +
              "<br/>百分率：" +
              params[0].value +
              "%"
            );
          },
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          top: "20%",
          //   bottom: "20%",
          left: "20%"
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
            // rotate: 25,
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
                  ["#2574a9", "#2a7cb3"]
                  //   ["#d2527f", "#dc5d89"]
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
            data: [100, 100, 100, 100, 100, 100],
            z: 5
          }
        ]
      };
      obj.setOption(option);
    }
  }
};
</script>

<style scoped>
.f_content {
  width: 100%;
  height: 100%;
  padding: 20px 0;
}

.f_content ul li {
  width: 49%;
  height: 250px;
  float: left;
}
.f_content ul li + li {
  border-left: 1px dashed #cccccc;
}
.f_content ul li > p {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
  background: #dfdfdf47;
  border-radius: 5px;
}
.f_div {
  /* width: 90%; */
  /* height: 200px; */
  height: 90%;
  margin-top: 25px;
  position: relative;
}
.f_div > p {
  padding-left: 40px;
  font-size: 14px;
}
.f_div .f_text {
  width: 50%;
  height: 120px;
  background: #f1f1f1;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.f_text p {
  font-size: 30px;
  text-align: center;
  margin-top: 40px;
}
.f_text span {
  font-size: 12px;
  display: block;
  margin-top: 10px;
}
</style>
