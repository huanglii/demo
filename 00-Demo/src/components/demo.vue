<template>
  <div class="demo">
    <el-container>
      <!-- <el-header>
        <el-row>
          <el-col :span="24" :style="{padding: '30px 10px 10px 10px'}">
            <h1><a href="https://giser.xyz">
                <el-button type="primary" icon="el-icon-search">GISer空间</el-button>
            </a></h1>
          </el-col>
        </el-row>
      </el-header> -->
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-carousel trigger="click" height="380px">
              <el-carousel-item v-for="item in bingImgList" :key="item.hsh" :style="{background: 'url(https://cn.bing.com' + item.url + ')'}">
                <h1>{{ item.copyright }}</h1>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="item in demoList" :key="item.id">
            <el-card shadow="hover" :body-style="{ padding: '0' }">
              <img :src="item.imageUrl" class="image">
              <div style="padding: 14px;">
                <span class="title" :title="item.title">{{ item.title }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.time }}</time>
                  <a :href="item.url" target="_blank"><el-button type="text" class="button">查看</el-button></a>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import topNav from './topNav.vue'
import axios from 'axios'
export default {
  name: 'demo',
  components: {
    topNav
  },
  data () {
    return {
      activeIndex: '1',
      demoList: [],
      bingImgList: []
    }
  },
  methods: {
  },
  mounted: function () {
    axios.get('https://raw.githubusercontent.com/huanglii/demo/master/config.json').then(response => {
      this.demoList = response.data.demoList
    }).catch(error => {
      this.$message({
        type: 'error',
        message: error
      })
    })

    axios.get('https://jsonp.afeld.me/?url=' + encodeURIComponent('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5')).then(response => {
      this.bingImgList = response.data.images
    }).catch(error => {
      this.$message({
        type: 'error',
        message: error
      })
    })
  }
}
</script>

<style scoped>
  .el-col {
    padding: 10px;
  }
  .time {
    font-size: 14px;
    color: #999;
  }
  .title {
    display: inline-block;
    height: 20px;
    overflow: hidden;
  }
  .bottom {
    margin-top: 14px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-carousel__item h1 {
    padding: 20px;
    color: #fff;
    opacity: .8;
    background-color: rgba(0, 0, 0, .5);
  }
</style>
