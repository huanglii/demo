<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="4"><a href="http://giser.xyz" target="_blank">GISer空间</a></el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'topNav',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
