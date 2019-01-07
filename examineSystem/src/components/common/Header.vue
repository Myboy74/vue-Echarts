<template>
    <div class="header-content">
    <div class="header">
        <div class="user-info">
            <div class="lef ws">
                <img class="user-logo" src="../../../static/img/toux.png">
            </div>
            <div class="lef prg">
                 <p>
                   <span>{{username}}</span>
                    <span style="padding-left:5px;font-size:14px"> <i class="el-icon-date"></i> 登录时间:</span>  
	                  <span>{{useRLoginTime}}</span>
                 </p>
                  <div><i class=""></i> {{optionChange}}</div>

            </div>
              <div class="lef">
                <i v-show="false" class="iconfont default-icon icon-jiugongge"></i>   <!--九宫格被隐藏了-->
                </div>
                <div class="lef">
                  <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        <img src="../../../static/img/header_set.png" style="width:24px; height:24px; margin-top:5px;" class="default-icon">
                      </span> 
                      <el-dropdown-menu slot="dropdown"  class="j_pop">
                        <el-dropdown-item command="c">退出登录 </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>                        
                </div>       
        </div>
    </div>
    </div>
</template>
<script>
import { postAjax, getAjax } from "../../api/api.js";
import { setTimeout } from 'timers';
export default {
  created() {
      this.username = sessionStorage.getItem("userName");
      this.useRLoginTime = sessionStorage.getItem("userLoginTime");
      this.optionChange = sessionStorage.getItem("userWork");
  },
  data() {
    return {
      username: "",
      useRLoginTime: "",
      optionChange: "",
      shezhi: [
        {
          key: "退出"
        }
      ]
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "c") {
        let url = localStorage.getItem("url");
        localStorage.clear(); //清除缓存数据
        sessionStorage.clear(); //清除sessionStorage数据;
        window.close();
        // window.location.href="http://192.168.103.190/#/tagglePage";
        // window.location.href = "http://10.1.2.120/gzwkh/#/tagglePage";
      }
    },
    loginout: function(item, index) {},
  }
};
</script>
<style scoped>
.default-icon {
  margin-right: 10px;
  font-size: 24px;
  display: inline-block;
}
.header-content {
  background-image: linear-gradient(0deg, #a9222e 3%, #ff0000 100%);
}
.laout {
  cursor: pointer;
}
.prg {
  padding-right: 20px;
}

.red {
  color: #e60000 !important;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 88px;
  font-size: 22px;
  color: #fff;
  background: url("../../../static/img/head.png") no-repeat;
}
.header .logo {
  float: left;
  width: 350px;
  text-align: center;
  margin-right: 30px;
}
.ws {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
.header .logo img {
  display: inline-block;
}
.lef {
  float: left;
}
.el-dropdown-menu__item {
  font-size: 12px;
}
.w_more img {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  top: 10px;
}
.username {
  position: absolute;
  top: -20px;
  width: 100px;
  font-size: 14px !important;
  display: inline-block;
}
.user-info {
  float: right;
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  margin-top: 22px;
}
.user-info .el-dropdown-link {
  display: inline-block;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  vertical-align: middle;
}
.user-info .user-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
