<template>
  <div id="app">
    <DistAmap/>
  </div>
</template>

<script>
import DistAmap from './components/distAmap'

export default {
  name: 'App',
  components: {
    DistAmap
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body, #app {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
