<template>
  <div id="app">
    <Sequencer></Sequencer>
  </div>
</template>

<script>
import Sequencer from './components/Sequencer.vue'


export default {
  name: 'App',
  components: {
    Sequencer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
