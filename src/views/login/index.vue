<template>
  <div class="login-container">
    
    <div class="login-form-wrap">
      <h1>登录页面</h1>
      <el-form class="login-form" ref="form" :model="user">
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin" :loading='loginLoading'
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {login} from '@/api/user'
export default {
  data(){
    return {
      user: {
          mobile: '13911111111', // 手机号
          code: '246810' // 验证码
        },
      checked: false ,// 是否同意协议的选中状态,
      loginLoading:false
    }
  },
  methods:{ 
     onLogin(){
       console.log('登录')
       this.loginLoading = true
       login(this.user).then(res=>{
         this.$message({
           message:'登陆成功',
           type:'success'
         })
         
         window.localStorage.setItem('user',JSON.stringify(res.data.data))
         this.$router.push('/')
       }).catch(err=>{
         this.loginLoading = false
         this.$message({
           message:"验证码错误",
           type:'error'
         })
       })
     }   
  }
}
</script>
<style lang="less" scoped>
  .login-container{
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: gray;
    .login-form-wrap{
      background:rgba(0,0,0,.2);
      padding: 10px 50px;
      border-radius: 30px;
      .login-btn{
        width: 100%;
      }
    }
  }
</style>