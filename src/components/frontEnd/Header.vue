<template>
  <div class="header">
    <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
    <mu-appbar title="考研网站" class="wrapper">
      <mu-flat-button label="首页" slot="right" @click="$router.push({ path: '/' })"/>
      <mu-flat-button label="考研信息" slot="right" @click="$router.push({ path: '/' })"/>
      <mu-flat-button label="网络课堂" slot="right" @click="$router.push({ path: '/OnlineClass' })"/>
      <mu-flat-button label="社区交流" slot="right"  @click="$router.push({ path: '/Community' })"/>
      <mu-icon-menu icon="expand_more" slot="right">
        <mu-menu-item title="注册" @click="registerDialog = true"/>
        <mu-menu-item title="登陆" @click="loginDialog = true"/>
      </mu-icon-menu>
    </mu-appbar>
    <div class="register">
      <mu-dialog :open="registerDialog" title="注册" @close="closeRegister">
        <mu-text-field label="用户名" v-model="register.username" :errorText="errorText.username" labelFloat fullWidth/><br/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="register.password" :errorText="errorText.password" labelFloat fullWidth/><br/>
        <mu-text-field label="确认密码" hintText="请重复输入密码" type="password" v-model="register.repassword" :errorText="errorText.repassword" labelFloat fullWidth/><br/>
        <mu-flat-button slot="actions" @click="closeRegister" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="handleRegister" label="注册"/>
      </mu-dialog>
    </div>
    <div class="login">
      <mu-dialog :open="loginDialog" title="登录" @close="closeLogin">
        <mu-text-field label="用户名" v-model="login.username" errorText="这是必填项" labelFloat fullWidth/><br/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="login.password" errorText="这是必填项" labelFloat fullWidth/><br/>
        <mu-flat-button slot="actions" @click="closeLogin" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="handleLogin" label="登录"/>
      </mu-dialog>
    </div>
  </div>
</template>


<script>
  import api from '../../config/api-config'

  export default {
    data () {
      return {
        register:{},
        registerDialog: false,
        login:{},
        loginDialog: false,
        errorText:{
          username: '',
          password: '',
          repassword: ''
        },
        toast: false,
        regMsg: ''
      }
    },
    methods: {
      handleRegister() {
        if(!this.register.username&&!this.register.password&&!this.register.repassword){
          if(!this.register.username){
            this.errorText.username = '用户名不能为空！';
          }
          if(!this.register.password){
            this.errorText.password = '密码不能为空！';
          }
          if(!this.register.repassword){
            this.errorText.repassword = '两次输入的密码不一致！';
          }
          return
        }
        api.reqRegister(this.register).then(res=>{
          this.registerDialog = false;
          if(res.code === 0){
            this.regMsg = '注册成功！';
          }else{
            this.regMsg = '该用户名已被注册！';
          }
          this.toast = true;
          if (this.toastTimer) clearTimeout(this.toastTimer);
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
          console.log(res.data)
        });
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      handleLogin() {

      },
      closeRegister(){
        this.registerDialog = false
      },
      closeLogin(){
        this.loginDialog = false
      },
    }
  }
</script>

<style scoped>
  .wrapper{
    padding: 0 17.5% ;
    position: fixed;
    top:0;
  }
</style>
