<template>
  <div class="hello-world">
    <div class="left-nav">
      <el-menu
        default-active="quickStart"
        background-color="#268591"
        text-color="#fff"
        active-text-color="#35bbcd"
        @select="handelSelect">
        <div class="logo">
          <a href="https://giser.xyz/2018/06/24/20180624-OpenLayersDemos/" target="_blank">
            <img src="../assets/logo.svg" alt="GISer空间 - 地理与计算机的爱情故事">
          </a>
        </div>
        <el-submenu v-for="item in navList" :index="item.category" :key="item.idx">
          <template slot="title">
            <i :class="item.className"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-for="subItem in item.subNavList" :index="subItem.fileName" :key="subItem.idx">{{subItem.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main-container">
      <div class="demo-body" :class="{ 'hideCode': codeSwitcher }">
        <iframe src="" id="demo-iframe" scrolling="no"></iframe>
      </div>
      <div class="demo-code" :class="{ 'hideCode': codeSwitcher }">
        <div class="code-switch" @click="codeSwitch">
          <i :class="{ 'el-icon-d-arrow-left': this.codeSwitcher, 'el-icon-d-arrow-right': !this.codeSwitcher }"></i>
        </div>
        <div class="code-content">
          <div class="code-head">
            <span><i class="el-icon-loading"></i> 源代码编辑器</span>
            <span class="ol-api">
              <el-tooltip content="OpenLayers API" placement="right" effect="light">
                <a href="http://openlayers.org/en/latest/apidoc/index.html" target="_blank">
                  <i class="el-icon-question"></i>
                </a>
              </el-tooltip>
            </span>
            <span class="button-group">
              <el-tooltip content="运行" placement="bottom" effect="light">
                <el-button circle icon="el-icon-setting" @click="runCode"></el-button>
              </el-tooltip>
              <el-tooltip content="还原" placement="bottom" effect="light">
                <el-button circle icon="el-icon-refresh" @click="loadCode"></el-button>
              </el-tooltip>
            </span>
          </div>
          <codemirror v-model="code" :options="cmOptions"></codemirror>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed.js' // html语法高亮
import 'codemirror/lib/codemirror.css'
export default {
  name: 'HelloWorld',
  components: {
    codemirror
  },
  data () {
    return {
      url: './static/demo/base/quickStart.html',
      codeSwitcher: false,
      demoIframe: null,
      navList: [
        {
          idx: '1',
          name: '基础功能',
          category: 'base',
          className: 'el-icon-location-outline',
          subNavList: [
            {
              idx: '1-1',
              name: '快速开始',
              fileName: 'quickStart'
            }, {
              idx: '1-2',
              name: '地图操作',
              fileName: 'mapOperation'
            }, {
              idx: '1-3',
              name: '视图动画',
              fileName: 'animation'
            }
          ]
        }, {
          idx: '2',
          name: '多源数据',
          category: 'source',
          className: 'el-icon-tickets',
          subNavList: [
            {
              idx: '2-1',
              name: '高德地图',
              fileName: 'AMap'
            }, {
              idx: '2-2',
              name: '必应地图',
              fileName: 'bingMap'
            }, {
              idx: '2-3',
              name: '智图地图',
              fileName: 'GeoQMap'
            }
          ]
        }, {
          idx: '3',
          name: '编辑',
          category: 'edit',
          className: 'el-icon-edit',
          subNavList: [
            {
              idx: '3-1',
              name: '测量',
              fileName: 'measure'
            }, {
              idx: '3-2',
              name: '测量',
              fileName: 'measure1'
            }
          ]
        }, {
          idx: '4',
          name: '交互',
          category: 'interaction',
          className: 'el-icon-news',
          subNavList: [
            {
              idx: '4-1',
              name: '框选',
              fileName: 'boxSelection'
            }
          ]
        }, {
          idx: '6',
          name: '分析',
          category: 'analyse',
          className: 'el-icon-view',
          subNavList: [
            {
              idx: '6-1',
              name: '聚合1',
              fileName: 'cluster1'
            }, {
              idx: '6-2',
              name: '聚合2',
              fileName: 'cluster2'
            }
          ]
        }, {
          idx: '5',
          name: '定制',
          category: 'custom',
          className: 'el-icon-menu',
          subNavList: [
            {
              idx: '5-1',
              name: '提示框',
              fileName: 'tooltips'
            }
          ]
        }
      ],
      code: '',
      cmOptions: {
        mode: 'htmlmixed',
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        scrollbarStyle: null
      }
    }
  },
  mounted () {
    this.demoIframe = document.getElementById('demo-iframe')
    this.loadCode()
  },
  methods: {
    codeSwitch () {
      this.codeSwitcher = !this.codeSwitcher
    },
    handelSelect (key, keyPath) {
      this.url = './static/demo/' + keyPath[0] + '/' + key + '.html'
      this.codeSwitcher = false
      this.loadCode()
    },
    loadCode () {
      let _this = this
      axios.get(_this.url).then((response) => {
        _this.code = response.data
        _this.runCode()
      }).catch((error) => {
        _this.code = '源代码加载失败...' + '\nurl:' + _this.url + '\nerror:' + error
        _this.url = ''
      })
    },
    runCode () {
      let doc = this.demoIframe.contentDocument
      if (!doc) {
        return
      }
      doc.open()
      doc.write(this.code)
      doc.close()
    }
  }
}
</script>

<style lang="less" scoped>
@leftNavWidth: 200px;
@demoCodeWidth: 460px;
.hello-world,
.left-nav,
.el-menu,
.demo-code,
.code-content {
  height: 100%;
}
.left-nav {
  position: fixed;
  width: @leftNavWidth;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
}
.main-container {
  height: 100%;
  margin-left: @leftNavWidth;
}
.demo-body {
  width: calc(100% - @demoCodeWidth);
  height: 100%;
  transition: width .5s;
  -moz-transition: width .5s;
  -webkit-transition: width .5s;
  -o-transition: width .5s;
  iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    width: calc(100% - (@leftNavWidth + @demoCodeWidth));
    height: 100%;
    border: none;
    transition: width .5s;
    -moz-transition: width .5s;
    -webkit-transition: width .5s;
    -o-transition: width .5s;
  }
}
.demo-body.hideCode {
  width: 100%;
  iframe {
    width: calc(100% - @leftNavWidth);
  }
}
.demo-code {
  position: fixed;
  top: 0;
  right: 0;
  width: @demoCodeWidth;
  transition: right .5s;
  -moz-transition: right .5s;
  -webkit-transition: right .5s;
  -o-transition: right .5s;
}
.demo-code.hideCode {
  right: -@demoCodeWidth;
}
.logo a {
  display: block;
  font-size: 0;
  border-bottom: 1px dashed #999;
  img {
    width: @leftNavWidth;
    height: 85px;
  }
}
.code-switch {
  position: absolute;
  width: 26px;
  height: 30px;
  top: 50px;
  left: -26px;
  border-radius: 5px 0 0 5px;
  text-align: center;
  cursor: pointer;
  background: #35bbcd;
}
.code-content {
  border-left: 1px solid #ddd;
}
.code-switch i {
  line-height: 30px;
  color: #fff;
}
.code-head {
  height: 50px;
  line-height: 50px;
  padding-left: 18px;
  color: #999;
  background-color: #f7f7f7;
  .ol-api a {
    color: #999;
    outline: none;
  }
  .button-group {
    margin-left: @demoCodeWidth - 260px;
  }
}
</style>
