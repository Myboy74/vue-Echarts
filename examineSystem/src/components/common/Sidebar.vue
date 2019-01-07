<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
// import qs from "qs";
import { postAjax, getAjax } from "../../api/api.js";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-edit-outline",
          index: "2",
          title: "图形统计",
          subs: [
            {
              index: "partyCompany",
              title: "党组织和单位信息"
            },
            {
              index: "partyInformation",
              title: "党员信息统计"
            },
            {
              index: "OrgansAndEnterprises",
              title: "机关企事业单位"
              // title: "机关企事业单位党组织联系社区党组织"
            },
            {
              index: "contentPublishing",
              title: "内容发布"
            },
            {
              index: "partyEducation",
              title: "党员教育"
            },
            {
              index: "Ebranch",
              title: "山东e支部"
            },
              {
              index: "partyTransfer",
              title: "党员关系转接"
            },
            ]
        },
        // {
        //   icon: "el-icon-tickets",
        //   index: "3",
        //   title: "任务承办",
        //   subs: [
        //     {
        //       index: "taskManager",
        //       title: "任务管理"
        //     },
        //     {
        //       index: "mettingManager",
        //       title: "会议管理"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-view",
        //   index: "4",
        //   title: "统计分析",
        //   subs: [
        //     {
        //       index:"orgStatistical",
        //       title:"党组织信息统计"
        //     },
        //     {
        //       index: "scoreList",
        //       title: "得分列表"
        //     },
        //     {
        //       index: "taskStatistics",
        //       title: "任务信息统计"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-setting",
        //   index: "5",
        //   title: "系统设置",
        //   subs: [
        //     {
        //       index: "desksetting",
        //       title: "科室管理"
        //     },
        //     {
        //       index: "typeList",
        //       title: "任务类型管理"
        //     }
        //   ]
        // }
      ]
    };
  },
  created() {
    // this.getallRoot()
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  methods: {
    // getallRoot() {
    // getAjax("user/queryUserMenus",{menuId:'0'}).then(res => {
    //     if (res.data.code == 200) {
    //         this.items=res.data.data;
    //     }
    // });
    // },
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 88px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
