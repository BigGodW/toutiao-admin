<template>
  <el-container id="layout">
    <el-header>
      <Header :user="user" @collapse='changeColl'></Header>
    </el-header>
  <el-container>
    <el-aside width="">
      <Aside :isCollapse='collapse'></Aside>
    </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
  <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
import {getUserProfile} from '@/api/user'
import Aside from './components/aside.vue'
import Header from './components/header.vue'
export default {
  data(){
    return{
      user:{
      },
      collapse:false
    }
  },
  components:{
    Aside,
    Header
  },
  created(){
    this.getUser()
  },
  methods:{
    getUser(){
      getUserProfile().then(res=>{
        this.user = res.data.data
      })
    },
    changeColl(val){
      this.collapse = val
    }
  }
  
}
</script>
<style lang="less" scoped>
#layout{
  height: 100Vh;
}
.el-header{
  background: royalblue;
}
.el-aside{
  background-color:"#002033"
}
.el-footer{
  background: gray;
}
</style>