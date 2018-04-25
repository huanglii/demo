# ArcGIS API for JavaScript 加载天地图WMTS图层

## 变量
```javascript
var map; //地图
var baseTypeName = "vec"; //底图
var baseAnnoName = "cva"; //注记
var typeMatrixSet = "c";  //"c"-地理坐标系，"w"-投影坐标系
```

## 添加图层
添加底图不需要参数，注记图层只需传入"ano"参数即可：
```javascript
var baseLayer = new TianDiTuLayer();
var annolayer = new TianDiTuLayer("ano");
map.addLayer(baseLayer);
map.addLayer(annolayer);
```

## 天地图类型
* vec: 矢量底图
* cva: 矢量注记图层
* eva: 矢量注记图层-英文注记
*
* img: 影像底图
* cia: 影像注记图层
* eia: 影像注记图层 -英文注记
*
* ter: 地形底图
* cta: 地形注记图层

## 预览
![](https://github.com/huangli005/TianDiTu/raw/master/images/1.png) 
![](https://github.com/huangli005/TianDiTu/raw/master/images/2.png) 
