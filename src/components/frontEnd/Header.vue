<template>
  <div class="header">
    <mu-toast v-if="toast" :message="regMsg" @close="hideToast"/>
    <mu-appbar title="考研网站" class="wrapper">
      <mu-flat-button label="首页" slot="right" @click="$router.push({ path: '/' })"/>
      <mu-flat-button label="考研信息" slot="right" @click="$router.push({ path: '/' })"/>
      <mu-flat-button label="网络课堂" slot="right" @click="$router.push({ path: '/OnlineClass' })"/>
      <mu-flat-button label="社区交流" slot="right"  @click="$router.push({ path: '/Community' })"/>
      <template v-if="noAccess">
        <mu-icon-menu icon="expand_more" slot="right">
          <mu-menu-item title="注册" @click="registerDialog = true"/>
          <mu-menu-item title="登陆" @click="loginDialog = true"/>
        </mu-icon-menu>
      </template>
      <template v-else>
        <mu-icon-menu icon="expand_more" slot="right">
          <mu-menu-item v-if="userInfo.role === 'admin'" title="后台管理" @click=""/>
          <mu-menu-item title="用户信息" @click="userInfoDialog = true"/>
          <mu-menu-item title="退出" @click=""/>
        </mu-icon-menu>
      </template>
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
        <mu-text-field label="用户名" v-model="login.username" :errorText="errorText.username" labelFloat fullWidth/><br/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="login.password" :errorText="errorText.password" labelFloat fullWidth/><br/>
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
        userInfo:{},
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
        regMsg: '',
        noAccess: true
      }
    },
    methods: {
      handleRegister() {
        if(!this.register.username||!this.register.password||!this.register.repassword){
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
          if(res.data.code === 0){
            this.regMsg = '注册成功！';
            api.reqLogin({username:this.register.useranme,password:this.register.password});
            this.noAccess = false;
          }
          else if(res.data.code === 4){
            this.regMsg = '该用户名已被注册！';
          }
          else{
            this.regMsg = '注册失败';
          }
          this.toast = true;
          this.register = {};
          if (this.toastTimer) clearTimeout(this.toastTimer);
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
        });
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer)
      },
      handleLogin() {
        if(!this.login.username||!this.login.password){
          if(!this.login.username){
            this.errorText.username = '用户名不能为空！';
          }
          if(!this.login.password){
            this.errorText.password = '密码不能为空！';
          }
          return
        }
        api.reqLogin(this.login).then(res=>{
          this.loginDialog = false;
          if(res.data.code === 0){
            this.regMsg = '登录成功！';
            this.noAccess = false;
          }
          else{
            this.regMsg = '登陆失败！';
          }
          this.toast = true;
          this.login = {};
          if (this.toastTimer) clearTimeout(this.toastTimer);
          this.toastTimer = setTimeout(() => { this.toast = false }, 2000);
        });
      },
      closeRegister(){
        this.register = {};
        this.errorText = {};
        this.registerDialog = false
      },
      closeLogin(){
        this.login = {};
        this.errorText = {};
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
