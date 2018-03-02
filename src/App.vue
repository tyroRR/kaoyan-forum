<template>
  <div class="layout">
    <div id="app">
      <v-header></v-header>
      <router-view/>
      <v-footer></v-footer>
    </div>
  </div>

</template>

<script>
  import vHeader from './components/frontEnd/Header'
  import vFooter from './components/frontEnd/Footer'

  export default {
    components: {
      vHeader,
      vFooter
    },
    name: 'App'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.layout{
  background-color: rgb(236, 236, 236);
}

</style>
