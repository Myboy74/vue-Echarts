<template>
    <div>
        <div class="title">党员教育</div>
          <div class="main">
            <div class="mainFl">
                <div class="f_con">
                    <span>参加人次</span>
                    <div class="f_score">
                        <div style="color:#d35400">50</div>
                        <p>总人次数</p>
                    </div>
                </div>
                <div class="f_con f_score" style="border:none">  
                    <span>总学时</span>
                    <div class="f_score">
                         <div style="color:#037c5a">1010</div>
                        <p>总数量</p></div> 
                </div>
            </div>
            <div class="mainFl mainRl">
                <div class="f_con">
                    <div id="orgPieChart" style="width:100%;height:100%"></div>
                </div>
                <div class="f_con f_score" style="border:none">
                    <span>平均学时</span>
                  <div class="f_score">
                       <div style="color:#d35400">20</div>
                        <p>总数量</p>
                  </div>
                </div>
            </div>
            <div class="cle"></div>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import bus from './busEvent.js';
export default {
  mounted() {
    this.autoMove();
  },
  data() {
    return {};
  },
  methods: {
    autoMove() {
      var dateNum = [
        { value: 50, name: "参加人数"},
        { value: 100, name: "总人数"}
      ];
      var dateScore = [
        { value: 50, name: "" },
        { value: 100, name: "" }
      ];
      let pieChart = this.$echarts.init(document.getElementById("orgPieChart"));
      var option = {
        title: {
          text: "参加人数",
          textStyle: {
            color: "#353639",
            fontSize: "14",
            fontWeight: "bold"
          },
          subtextStyle: {
            color: "#90979c",
            fontSize: "14"
          },
          top:"20px"
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
          data: ["参加人数", "总人数"],
          textStyle: {
            color: "#000"
          }
        },
        series: [
          {
            name: "已开展活动数量",
            type: "pie",
            hoverAnimation: false,
            legendHoverLink: false,
            center:["50%","45%"],
            radius: ["58%", "45%"],
            color: ["#ececec", "#ececec"],
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
              center:["50%","45%"],
            radius: ["42%", "55%"],
            color: ["#d35400", "#037c5a"],
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
.mainFl > div.f_con{
  height: 220px;
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
.mainFl > div.f_con span {
  font-size: 14px;
  display: block;
  padding-top: 20px;
}
.mainFl > div.f_con div.f_score {
  width: 50%;
  height: 100px;
  background: #dfdfdf47;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.mainFl > div.f_con div.f_score div {
  font-size: 30px;
  margin-top: 20px;
}
.mainFl > div.f_con div.f_score p {
  font-size: 12px;
  margin-top: 10px;
}
.mainFl > div.f_con > p.Echartitles {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
