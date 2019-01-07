<template>
    <div>
        <!--党员信息统计-->
         <div class="title">党员信息统计
            <p>
                <label style="margin-right:15px;">是否统计央企信息</label>
                <el-radio-group v-model="resource">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </p>
        </div> 
    <div class="f_content">
        <div class="nav">
            <span v-for="(item,index) in tabTitle" 
            :key="index"
            :id="item.id"
            @click="tabMove(item.id)"
            :class="{select:item.id==tabIndex}"
            class="tab"
            >{{item.value}}</span>
        </div>
       <informationLeft v-if="tabIndex==0"></informationLeft>
        <informationRight v-else></informationRight>
    </div>
      
    </div>
</template>

<script>
import informationLeft from './informationLeft.vue';
import informationRight from './informationRight.vue';
import bus from './busEvent.js';
export default {
    components: {
        informationLeft, informationRight,
    },
    data() {
        return {
            resource: '是',
            tabIndex: 0,
            tabTitle: [
                {
                    id: 0,
                    value: "全部"
                },
                {
                    id: 1,
                    value: "分项查看"
                },
            ],
            gzwOrgId:sessionStorage.getItem("userWorkId"),//国资委党组织ID
            // gzwOrgId: '14192eae-57dd-11e7-9694-0050569a68e4',//国资委党组织ID
            num: 0
        }
    },
    mounted() {
        this.num = this.num == undefined ? 0 : this.num
        this.$router.push({ query: { id: this.num, gzwOrgId: this.gzwOrgId } });
    },
    methods: {
        tabMove(index) {
            this.tabIndex = index;
            this.num = this.num == undefined ? 0 : this.num
            this.$router.push({ query: { id: this.num, gzwOrgId: this.gzwOrgId } });
        },
        // busClick(){
        //     debugger;
        //     console.log(this.num);
        //     bus.$emit("clickEvent",this.num);
        // }
    },
    watch: {
        resource(e) {
            let val = 0;
            this.num = val;
            if (e != "是") {
                this.num = 1;
            }
            this.$router.push({query: {
                    id: this.num
                }});
        }
    },
}
</script>

<style scope>
.f_content {
  width: 100%;
   -webkit-box-shadow: #ccc 0px 3px 5px;
  -moz-box-shadow: #ccc 0px 3px 5px;
  box-shadow: #ccc 0px 3px 5px;
  /* height: 200px; */
  /* background: green; */
}
.nav {
  width: 100%;
  text-align: center;
}
.nav span {
  width: 100px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  margin: 10px 15px;
  border-radius: 5px;
  border: 1px solid #336e7b;
  background: rgba(50, 110, 123, 0.2);
  color: #336e7b;
}
.nav span.select {
  background: rgb(50, 110, 123);
  color: #fff;
}
.tab {
  cursor: pointer;
}
</style>
