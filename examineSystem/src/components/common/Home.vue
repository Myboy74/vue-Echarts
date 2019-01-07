<template>
    <div class="wrapper">
        <link rel='icon' href="../../../static/img/bitbug_favicon.ico" type='image/x-ico' />
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content ">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
   mounted() {
   window.addEventListener('unload',function(){
       localStorage.clear(); //清除缓存数据
        sessionStorage.clear(); //清除sessionStorage数据;
   })
  },
  created() {
    if (this.$route.query.user) {
      let user = this.decodeUnicode(this.$route.query.user);
      let time = this.decodeUnicode(this.$route.query.time);
      let word = this.decodeUnicode(this.$route.query.word);
      let wordId = this.decodeUnicode(this.$route.query.wordId);
      sessionStorage.setItem("userName", user); //用户名称
      sessionStorage.setItem("userLoginTime", time); //用户登录时间
      sessionStorage.setItem("userWork", word); //用户所属单位
      sessionStorage.setItem("userWorkId", wordId); //用户所属单位
    }
  },
  data() {
    return {};
  },
  methods: {
    decodeUnicode(str) {
      if (str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
      } else {
        return "暂无信息";
      }
    }
  },
  components: {
    vHead,
    vSidebar
  }
};
</script>
<style scope>
</style>
