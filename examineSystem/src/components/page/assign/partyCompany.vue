<template>
  <div class="box">

    <div class="title">
      党组织和单位信息
      <p>
        <label style="margin-right:15px;">是否统计央企信息</label>
        <el-radio-group v-model="resource">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </p>
    </div>
    <div style="width:99.8%; margin:20px auto 0px; text-align:center; padding-bottom:10px; border-radius:5px; position:relative;padding:1px; background: #dfdfdf47;" class="shadowLy">
      <div class="ecahrts-title" style="top:5px;left:3%">党组织总数</div>
      <div class="word-content">
        <ul class="word-content-ul">
          <li style="height:50px">
              <span class="wordScore">{{partyTotal}}</span>
          </li>
          <li>
            <span class="word-flag" style="background:#03A678;"></span>
            <span class="word-text">属地管理数量<br>个数：{{zhijieOrgCount}}<br>占比：{{zhijieOrgCountPCT}}</span>
            <div style="clear:both; height:0px; margin:0; padding:0;"></div>
          </li>
          <li style="border:none;">
            <span class="word-flag" style="background:#2574A9;"></span>
            <span class="word-text">直接管理数量<br>个数：{{shudiOrgCount}}<br>占比：{{shudiOrgCountPCT}}</span>
            <div style="clear:both; height:0px; margin:0; padding:0;"></div>
          </li>
        </ul>
      </div>
      <div id="scoringSta" style="width:50%;height:280px;margin-left:20%; text-align:center;"></div>
    </div>
    <ul class="sixEcharts shadowLy" style="position:relative;margin-top:20px">
      <li style="width:32%">
        <span>党委总数 ({{partyCommittee}})</span>
        <div class="topEchart" id="committeeTotal"></div>
      </li>
      <li class="threeCon" style="width:34%">
        <span>党总支总数 ({{partyGeneralBranch}})</span>
        <div class="topEchart" id="partyGeneral"></div>
      </li>
      <li>
        <span>党支部总数 ({{generalBranch}})</span>
        <div class="topEchart" id="party"></div>
      </li>
    </ul>
    <div class="bottom">
      <ul>
        <li class="shadowLy">
          <span>临时党支部总数 ({{temporary}})</span>
          <div id="temporary"></div>
        </li>
        <li class="shadowLy botomCon" style="width:31%;margin-left:1.5%">
           <span>联合党支部总数 ({{union}})</span>
          <div id="unionParty"></div>
        </li>
      <li class="shadowLy" style="float:right">
          <span>灯塔外党组织总数 ({{foreignParty}})</span>
            <div id="partyTotal"></div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { postAjax, getAjax } from "../../../api/api.js";
export default {
  mounted() {
    this.initLoadFn(); //页面加载自动获取数据
  },
  data() {
    return {
      id:sessionStorage.getItem("userWorkId"),//获取用户id
      resource: "是",
      selNum: 0,
      shudiOrgCount: 0, //直接管理数量
      shudiOrgCountPCT: 0, //直接管理数量百分比
      zhijieOrgCount: 0, //属地数量
      zhijieOrgCountPCT: 0, //属地百分比
      partyTotal: "", //党组织总数
      partyCommittee: "", //党委总数
      partyGeneralBranch: "", //党总支部总数
      generalBranch: "", //总支部总数
      temporary: "", //临时
      union: "", //联合
      foreignParty: "" //灯塔外党组织数量
    };
  },
  watch: {
    resource(e) {
      let num = 0;
      if (e != "是") {
        num = 1;
      }
      this.$router.push({
        query: {
          id: num
        }
      });
      this.initLoadFn(num); //重新请求接口
    }
  },
  methods: {
    initLoadFn(val) {
      this.selNum = val == undefined ? this.selNum : val;
      this.selNum =
        this.$route.query.id == undefined ? 0 : this.$route.query.id; //传入的isCenterCom值
      // let id = sessionStorage.getItem("gzwId");
      // let id = "14192eae-57dd-11e7-9694-0050569a68e4";
      postAjax(
        "statistic/orgStatisticGraph/" + this.id + "?isCenterCom=" + this.selNum
      ).then(res => {
        let formData = res.data.data.tableData; //获取过来的数据
        let singleData = res.data.data; //灯塔内灯塔外数量
        this.shudiOrgCount = formData[0].partyOrgSum; //属地直接数量
        this.shudiOrgCountPCT = formData[0].partyOrgSumStatistic; //属地直接百分比
        this.zhijieOrgCount = formData[1].partyOrgSum; //属地直接数量
        this.zhijieOrgCountPCT = formData[1].partyOrgSumStatistic; //属地直接百分比

        (this.partyTotal =
          Number(this.shudiOrgCount) + Number(this.zhijieOrgCount)), //党组织总数
          (this.partyTotal = this.fmoney(this.partyTotal, 3));


        this.autoMove(formData, singleData); //灯塔外党组织数量
        this.autoMove1(formData); //党委总数
        this.autoMove2(formData); //党总支部总数
        this.autoMove3(formData); // 联合党支部数量
        this.autoMove4(formData); // 临时党支部数量
        this.autoMove5(formData); //党支部
        this.auto(formData); // 党组织总数
      });
    },
    // 党组织总数
    autoMove(formData, single) {
      // console.log(single);
      console.log(formData);
      //  this.foreignParty =
      //   Number(formData[0].partyOrgSum) + Number(formData[1].partyOrgSum);
      this.foreignParty = this.fmoney(single.outOrgAll, 3);
      let myChart = this.$echarts.init(document.getElementById("partyTotal"));
      var option = {
        legend: {
          show: true,
          itemGap: 1,
          data: [
            // "灯塔内数量" + single.inOrgAll,
            "灯塔外数量" + single.outOrgAll
          ]
        },
        color: ["#2574A9"],
        series: [
          {
            name: "灯塔外党组织数量",
            type: "pie",
            radius: ["30%", "42%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            data: [
              // {
              //   value: single.inOrgAll,
              //   name:
              //     "灯塔内" +
              //     formData[0].inOrgStatistic +
              //     "\n" +
              //     "灯塔内数量" +
              //     single.inOrgAll
              // },
              {
                value: single.outOrgAll,
                name:
                  "灯塔外 100%\n" +
                  "灯塔外数量" +
                  single.outOrgAll
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
    //党委总数
    autoMove1(formData) {
      let myChart = this.$echarts.init(
        document.getElementById("committeeTotal")
      );
      this.partyCommittee =
        Number(formData[0].committeeNum) + Number(formData[1].committeeNum); //党委总数
      this.partyCommittee = this.fmoney(this.partyCommittee, 3);
      var option = {
        color: ["#2574A9", "#D2527F"],
        series: [
          {
            name: " 党委总数",
            type: "pie",
            radius: ["30%", "42%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            data: [
              {
                value: formData[0].committeeNum,
                name:
                  "直接管理数量\n" +
                  formData[0].committeeNum +
                  "\n" +
                  formData[0].committeeNumStatistic
              },
              {
                value: formData[1].committeeNum,
                name:
                  "属地管理数量\n" +
                  formData[1].committeeNum +
                  "\n" +
                  formData[1].committeeNumStatistic
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
    //党总支部总数
    autoMove2(formData) {
      let myChart = this.$echarts.init(document.getElementById("partyGeneral"));
      this.partyGeneralBranch =
        Number(formData[0].partyAllOrgNum) + Number(formData[1].partyAllOrgNum);
      this.partyGeneralBranch = this.fmoney(this.partyGeneralBranch, 3);
      var option = {
        color: ["#2574A9", "#03A678"],
        series: [
          {
            name: " 党总支部\n  总数",
            type: "pie",
            radius: ["30%", "42%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            data: [
              {
                value: formData[0].partyAllOrgNum,
                name:
                  "直接管理数量\n" +
                  formData[0].partyAllOrgNum +
                  "\n" +
                  formData[0].partyOrgNumStatistic
              },
              {
                value: formData[1].partyAllOrgNum,
                name:
                  "属地管理数量\n" +
                  formData[1].partyAllOrgNum +
                  "\n" +
                  formData[1].partyOrgNumStatistic
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
    // 联合党支部数量
    autoMove3(formData) {
      let myChart = this.$echarts.init(document.getElementById("unionParty"));
      this.union =
        Number(formData[0].unionPartyOrgNum) +
        Number(formData[1].unionPartyOrgNum);
      this.union = this.fmoney(this.union, 3);
      var option = {
        color: ["#2574A9", "#D2527F"],
        series: [
          {
            name: " 党委总数",
            type: "pie",
            radius: ["30%", "42%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            data: [
              {
                value: formData[0].unionPartyOrgNum,
                name:
                  "直接管理数量\n" +
                  formData[0].unionPartyOrgNum +
                  "\n" +
                  formData[0].unionPartyOrgStatistic
              },
              {
                value: formData[1].unionPartyOrgNum,
                name:
                  "属地管理数量\n" +
                  formData[1].unionPartyOrgNum +
                  "\n" +
                  formData[1].unionPartyOrgStatistic
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
    //临时党支部数量
    autoMove4(formData) {
      let myChart = this.$echarts.init(document.getElementById("temporary"));
      this.temporary =
        Number(formData[0].tempPartyOrgNum) +
        Number(formData[1].tempPartyOrgNum);
      this.temporary = this.fmoney(this.temporary, 3);
      var option = {
        color: ["#2574A9", "#03A678"],
        series: [
          {
            name: " 党组织\n 总数",
            type: "pie",
            radius: ["30%", "42%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            data: [
              {
                value: formData[0].tempPartyOrgNum,
                name:
                  "直接管理数量\n" +
                  formData[0].tempPartyOrgNum +
                  "\n" +
                  formData[0].tempPartyOrgStatistic
              },
              {
                value: formData[1].tempPartyOrgNum,
                name:
                  "属地管理数量\n" +
                  formData[1].tempPartyOrgNum +
                  "\n" +
                  formData[1].tempPartyOrgStatistic
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
    // 党支部
    autoMove5(formData) {
      let myChart = this.$echarts.init(document.getElementById("party"));
      this.generalBranch =
        Number(formData[0].partyOrgNum) + Number(formData[1].partyOrgNum);
      this.generalBranch = this.fmoney(this.generalBranch, 3);
      var option = {
        color: ["#2574A9", "#D2527F"],
        series: [
          {
            name: " 党委总数",
            type: "pie",
            radius: ["30%", "42%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            data: [
              {
                value: formData[0].partyOrgNum,
                name:
                  "直接管理数量\n" +
                  formData[0].partyOrgNum +
                  "\n" +
                  formData[0].partyOrgNumStatistic
              },
              {
                value: formData[1].partyOrgNum,
                name:
                  "属地管理数量\n" +
                  formData[1].partyOrgNum +
                  "\n" +
                  formData[1].partyOrgNumStatistic
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
    //党组织总数
    auto(formData) {
      let myChart = this.$echarts.init(document.getElementById("scoringSta"));
      var option = {
        legend: {
          orient: "horizontal",
          right: "0%",
          bottom: "15%",
          data: [
            { name: "属地管理", textStyle: { color: "red" } },
            { name: "直接管理", textStyle: { color: "red" } }
          ]
        },
        color: ["#2574A9", "#03A678"],
        series: [
          {
            name: " 党组织\n  总数",
            type: "pie",
            radius: ["35%", "48%"],
            center: ["50%", "55%"],
            hoverAnimation: false,
            data: [
              {
                value: formData[0].partyOrgSum,
                name:
                  "直接管理数量\n" +
                  formData[0].partyOrgSum +
                  "\n" +
                  formData[0].partyOrgSumStatistic
              },
              {
                value: formData[1].partyOrgSum,
                name:
                  "属地管理数量\n" +
                  formData[1].partyOrgSum +
                  "\n" +
                  formData[1].partyOrgSumStatistic
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
.sixEcharts {
  width: 99.8%;
  height: 280px;
  padding: 0 20px;
  margin: 10px auto 0px;
  box-sizing: border-box;
  background: #dfdfdf47;
}

.boder {
  border-left: 1px dashed #cccccc;
  border-right: 1px dashed #cccccc;
}
.sixEcharts > li {
  width: 32%;
  float: left;
  position: relative;
}
.sixEcharts > li span {
  position: absolute;
  top: 10px;
  left: 15px;
  z-index: 999;
}
.sixEcharts > li div {
  width: 98%;
  height: 250px;
  margin: 12px auto;
}
.sixEcharts > li.threeCon {
  margin: 0 1%;
}

.sixEcharts > li.threeCon div {
  border-right: 1px dashed #cccccc;
  border-left: 1px dashed #cccccc;
}
.sixEcharts > div {
  display: inline-block;
  width: 32%;
  height: 230px;
  margin-right: 1%;
}

.sixEcharts > div > div {
  border-right: 1px dashed #cccccc;
  width: 150px;
  right: 0 !important;
}
.bottom {
  margin-top: 20px;
}
.bottom ul li {
  width: 33%;
  height: 250px;
  float: left;
  position: relative;
  box-sizing: border-box;
  background: #dfdfdf47;
}
.bottom ul li span {
  position: absolute;
  top: 10px;
  left: 15px;
  z-index: 999;
}
.bottom ul li.botomCon {
  width: 29%;
  margin: 0 1%;
}
.bottom ul li > div {
  width: 100%;
  height: 250px;
}
.ecahrts-title {
  text-align: left;
  width: 100%;
  height: 48px;
  position: absolute;
}
.word-content {
  /* position:absolute;
  right: 2%;
  top:6%; */
  float: right;
  margin-top: 1%;
  margin-right: 0;
  width: 20%;
  height: 250px;
  padding: 1px;
  position: absolute;
  top: 0;
  right: 0;
}
.word-content-ul {
  /* display: block; */
  width: 84%;
  height: 90%;
  box-sizing: border-box;
  margin: 0px auto;
}
.word-content-ul > li {
  width: 100%;
  height: 110px;
  float: left;
  border-bottom: #ccc dashed 1px;
  margin: 0 auto;
}
.word-flag {
  display: block;
  width: 10px;
  height: 10px;
  float: left;
  margin-top: 20px;
}
.word-text {
  width: 137px;
  height: 20px;
  float: left;
  font: 12px/28px;
  font: 12px/28px microsoftYahei;
  color: #909090;
  text-align: left;
  margin: 12px 0px 0px 6px;
}
.wordScore {
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color:#000;

}
</style>