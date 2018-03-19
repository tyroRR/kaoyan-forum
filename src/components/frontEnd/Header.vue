<template>
  <div class="header">
    <mu-appbar title="考研网站" class="wrapper">
      <mu-flat-button label="首页" slot="right" @click="$router.push({ path: '/' })"/>
      <mu-flat-button label="考研信息" slot="right" @click="$router.push({ path: '/' })"/>
      <mu-flat-button label="网络课堂" slot="right" @click="$router.push({ path: '/OnlineClass' })"/>
      <mu-flat-button label="社区交流" slot="right"  @click="$router.push({ path: '/Community' })"/>
      <mu-icon-menu icon="expand_more" slot="right">
        <mu-menu-item title="注册" @click="register.dialog = true"/>
        <mu-menu-item title="登陆" @click="login.dialog = true"/>
      </mu-icon-menu>
    </mu-appbar>
    <div class="register">
      <mu-dialog :open="register.dialog" title="注册" @close="closeRegister">
        <mu-text-field label="用户名" v-model="register.username" errorText="这是必填项" labelFloat/><br/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="register.password" errorText="这是必填项" labelFloat/><br/>
        <mu-text-field label="确认密码" hintText="请重复输入密码" type="password" v-model="register.rePassword" errorText="这是必填项" labelFloat/><br/>
        <mu-flat-button slot="actions" @click="closeRegister" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="closeRegister" label="确定"/>
      </mu-dialog>
    </div>
    <div class="login">
      <mu-dialog :open="login.dialog" title="登录" @close="closeLogin">
        <mu-text-field label="用户名" v-model="login.username" errorText="这是必填项" labelFloat/><br/>
        <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="login.password" errorText="这是必填项" labelFloat/><br/>
        <mu-flat-button slot="actions" @click="closeLogin" primary label="取消"/>
        <mu-flat-button slot="actions" primary @click="closeLogin" label="确定"/>
      </mu-dialog>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        register:{
          username: '',
          password: '',
          rePassword: '',
          dialog: false,
        },
        login:{
          username: '',
          password: '',
          dialog: false,
        },
      }
    },
    methods: {
      closeLogin(){
        this.login.dialog = false
      },
      closeRegister(){
        this.register.dialog = false
      }
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
