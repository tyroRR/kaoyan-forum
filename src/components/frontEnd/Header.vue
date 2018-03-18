<template>
  <div class="header">
    <mu-appbar title="考研网站" class="wrapper">
      <mu-icon-button icon="menu" slot="left" class="mobile-menu"/>
      <mu-flat-button label="考研信息" slot="right" @click="$router.push({ path: '/' })"/>
      <mu-flat-button label="网络课堂" slot="right" @click="$router.push({ path: '/OnlineClass' })"/>
      <mu-flat-button label="社区交流" slot="right"  @click="$router.push({ path: '/Community' })"/>
      <mu-icon-menu icon="expand_more" slot="right">
        <mu-menu-item title="注册"/>
        <mu-menu-item title="登陆"/>
      </mu-icon-menu>
    </mu-appbar>
  </div>
</template>


<script>
  export default {
    data () {
      return {

      }
    },
    methods: {

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
