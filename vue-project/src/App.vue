<template>
  <section id="app">
    <Header></Header>
    <router-view></router-view>
    <Foot></Foot>
  </section>
</template>

<script>
import Header from './components/Header.vue'
import Foot from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Foot
  }
}
</script>

<style>
</style>