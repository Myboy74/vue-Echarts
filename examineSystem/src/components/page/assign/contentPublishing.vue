<template>
    <div class="publishContent">
        <div class="title" style="background:#e4e3e3;">内容发布</div>
         <div class="f_content">
            <ul>
                <li>
                    <div class="f_div">
                        <p>上传数量</p>
                        <div class="f_text">
                            <p style="color:#2574A9">{{contentObj.commitNum}}</p>
                            <span>总数量</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="f_div f_border">
                        <p>通过数量</p>
                        <div class="f_text">
                            <p style="color:#037c5a">{{contentObj.passNum}}</p>
                            <span>总数量</span>
                        </div>
                    </div>
                </li>
            </ul>
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
    this.initData();  //初始化数据
  },
  data() {
    return {
        gzwId:sessionStorage.getItem("userWorkId"),
        // gzwId:'14192eae-57dd-11e7-9694-0050569a68e4',
        contentObj:{},//内容发布对象
    };
  },
  methods: {
   initData(){  //初始化数据
    getAjax('centerStatistic/cmsCommit?gzwid='+this.gzwId).then(res=>{
        this.contentObj = res.data.data;
        console.log(this.contentObj);
      });
   }
  }
};
</script>

<style scoped>
.f_content{
  width: 100%;
  height: 100%;
  padding-top: 20px;
  -webkit-box-shadow: #ccc 0px 3px 5px;
  -moz-box-shadow: #ccc 0px 3px 5px;
  box-shadow: #ccc 0px 3px 5px;
}
.f_content ul li {
    width: 50%;
    height: 220px;
    float: left;
}

.f_div{
    width: 90%;
    height: 180px;
    margin-top: 25px;
    position: relative;
}
.f_border{
    border-left: 1px dashed #cccccc;
}
.f_div>p{
    padding-left: 40px;
    font-size: 14px;
}
.f_div .f_text{
    width: 50%;
    height: 100px;
    background: #f1f1f1;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
}
.f_text p{
    font-size: 30px;
    text-align: center;
    margin-top: 20px;
}
.f_text span{
    font-size: 12px;
    display: block;
    margin-top: 10px;
}
</style>
