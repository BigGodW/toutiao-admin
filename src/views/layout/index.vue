<template>
  <el-container id="layout">
    <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
  <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
export default {
  
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
  background: salmon;
}
.el-footer{
  background: gray;
}
</style>