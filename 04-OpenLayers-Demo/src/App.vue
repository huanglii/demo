<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0
}
html, body, #app, .CodeMirror {
  height: 100% !important;
}
.vue-codemirror {
  height: calc(100% - 50px);
}
.CodeMirror-wrap pre,
.CodeMirror-linenumber {
  font-size: 14px !important;
  font-family: consolas, Menlo, "PingFang SC", "Microsoft YaHei", monospace !important;
}
.CodeMirror-gutters {
  border: none;
}
.el-menu {
  border: none;
  i {
    color: #fff;
  }
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.el-menu-item.is-active {
  background-color: rgb(30,106,116)!important;
}
.el-menu-item, .el-submenu__title {
  height: 46px;
  line-height: 46px;
}
.el-button.is-circle {
  padding: 10px;
}
.el-tooltip__popper {
  padding: 5px 8px;
}
</style>
