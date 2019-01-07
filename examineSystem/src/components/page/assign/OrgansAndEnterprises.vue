<template>
  <div>
    <div class="title" style="background:#ececec;height:46px;">机关企事业单位党组织联系社区党组织</div>
    <div class="main">
      <div class="mainFl">
        <div class="title-content">
          <p>关联企业</p>
        </div>
        <div class="f_con" style="border:none">
          <span>关联企业数量</span>
          <div class="f_score">
            <div style="color:#be3f6b">{{enterpriseObj.dwNum}}</div>
            <p>总数量</p>
          </div>
        </div>
        <div class="title-content">
          <p>已开展活动</p>
        </div>
        <div class="f_con f_score">
          <span>已开展活动数量</span>
          <div class="f_score">
            <div style="color:rgb(250, 209, 53);">{{enterpriseObj.actTotalNum}}</div>
            <p>总数量</p>
          </div>
        </div>
        <div style="border:none;height:270px;">
          <div id="orgPieChart" style="width:100%;height:100%"></div>
        </div>
      </div>
      <div class="mainFl mainRl">
        <div class="title-content">
          <p>关联社区</p>
        </div>
        <div class="f_con" style="border:none;">
          <span>关联社区数量</span>
          <div class="f_score">
            <div style="color:#2574A9">{{enterpriseObj.sqNum}}</div>
            <p>总数量</p>
          </div>
        </div>
        <div class="title-content">
          <p>已开展项目</p>
        </div>
        <div class="f_con f_score">
          <span>已开展项目数量</span>
          <div class="f_score">
            <div style="color:#037c5a">{{enterpriseObj.kzxmTotalNum}}</div>
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
  import bus from './busEvent.js';
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
        getAjax('centerStatistic/getOrgNum?gzwid=' + this.gzwId).then(res => {
          this.enterpriseObj = res.data.data;
          console.log(this.enterpriseObj);
          this.autoMove(this.enterpriseObj);
          this.autoMove1(this.enterpriseObj);
        });
      },
      autoMove(enterpriseObj) {
        var dateNum = [{
            value: enterpriseObj.shfwNum,
            name: "生活服务"
          },
          {
            value: enterpriseObj.whjyNum,
            name: "文化教育"
          },
          {
            value: enterpriseObj.wsghNum,
            name: "卫生管护"
          },
          {
            value: enterpriseObj.zamdNum,
            name: "治安民调"
          }
        ];
        var dateScore = [{
            value: enterpriseObj.shfwPct,
            name: ""
          },
          {
            value: enterpriseObj.whjyPct,
            name: ""
          },
          {
            value: enterpriseObj.wsghPct,
            name: ""
          },
          {
            value: enterpriseObj.zamdPct,
            name: ""
          }
        ];
        let pieChart = this.$echarts.init(document.getElementById("orgPieChart"));
        var option = {
          title: {
            text: "已开展活动数量",
            textStyle: {
              color: "#353639",
              fontSize: "14",
              fontWeight: "bold"
            },
            subtextStyle: {
              color: "#90979c",
              fontSize: "14"
            },
            top: "20px",
            left: "5%"

          },
          backgroundColor: "#fff",
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            //   orient: "vertical",
            bottom: "10px",
            itemWidth: 14,
            itemHeight: 14,
            align: "left",
            data: ["生活服务", "文化教育", "卫生管护", "治安民调"],
            textStyle: {
              color: "#000"
            }
          },
          series: [{
              name: "已开展活动数量",
              type: "pie",
              hoverAnimation: false,
              legendHoverLink: false,
              center: ["50%", "45%"],
              radius: ["58%", "45%"],
              color: ["#ececec", "#ececec", "#ececec", "#ececec"],
              label: {
                normal: {
                  position: "inner"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              tooltip: {
                show: false
              },
              data: dateScore
            },
            {
              name: "接收任务状态统计",
              type: "pie",
              center: ["50%", "45%"],
              radius: ["42%", "55%"],
              color: ["#F9BF2C", "#4A90e2", "#3CC56D", "#d2527f"],
              label: {
                normal: {
                  formatter: "{b}\n{d}%"
                }
              },
              data: dateNum
            }
          ]
        };
        pieChart.setOption(option);
      },
      autoMove1(enterpriseObj) {
        var dateNum = [{
            value: enterpriseObj.zcxcNum,
            name: "政策宣传"
          },
          {
            value: enterpriseObj.shbzNum,
            name: "社会保障"
          },
          {
            value: enterpriseObj.wmcjNum,
            name: "文明创建"
          },
          {
            value: enterpriseObj.jjfzNum,
            name: "经济发展"
          },
          {
            value: enterpriseObj.qtNum,
            name: "其他"
          }
        ];
        var dateScore = [{
            value: enterpriseObj.zcxcPct,
            name: ""
          },
          {
            value: enterpriseObj.shbzPct,
            name: ""
          },
          {
            value: enterpriseObj.wmcjPct,
            name: ""
          },
          {
            value: enterpriseObj.jjfzPct,
            name: ""
          },
          {
            value: enterpriseObj.qtPct,
            name: ""
          }
        ];
        let pieChart = this.$echarts.init(document.getElementById("orgPieChartR"));
        var option = {
          title: {
            text: "已开展活动数量",
            textStyle: {
              color: "#353639",
              fontSize: "14",
              fontWeight: "bold"
            },
            subtextStyle: {
              color: "#90979c",
              fontSize: "14"
            },
            top: "20px",
            left: "5%"
          },
          backgroundColor: "#fff",
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            //   orient: "vertical",
            bottom: "10px",
            itemWidth: 14,
            itemHeight: 14,
            align: "left",
            data: ["政策宣传", "社会保障", "文明创建", "经济发展", "其他"],
            textStyle: {
              color: "#000"
            }
          },
          series: [{
              name: "已开展活动数量",
              type: "pie",
              hoverAnimation: false,
              legendHoverLink: false,
              center: ["50%", "45%"],
              radius: ["58%", "45%"],
              color: ["#ececec", "#ececec", "#ececec", "#ececec", "#ececec"],
              label: {
                normal: {
                  position: "inner"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              tooltip: {
                show: false
              },
              data: dateScore
            },
            {
              name: "接收任务状态统计",
              type: "pie",
              center: ["50%", "45%"],
              radius: ["42%", "55%"],
              color: ["#F9BF2C", "#4A90e2", "#3CC56D", "#797CE6", "#d2527f"],
              label: {
                normal: {
                  formatter: "{b}\n{d}%"
                }
              },
              data: dateNum
            }
          ]
        };
        pieChart.setOption(option);
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