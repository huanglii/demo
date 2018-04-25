var map;
var baseTypeName = "vec"; //底图
var baseAnnoName = "cva"; //注记
var typeMatrixSet = "c";  //"c"-地理坐标系，"w"-投影坐标系为
require([
    "TDT/TianDiTuLayer",
    "esri/map",
    "esri/geometry/Extent",
    "dojo/domReady!"
], function (TianDiTuLayer, Map, Extent) {

    map = new Map("map", {
        extent: new Extent({
            "xmin": 72,
            "ymin": 20,
            "xmax": 138,
            "ymax": 50,
            "spatialReference": {"wkid": 4326}
        }),
		slider: false
    });

    // 初始化底图和注记图层
    var baseLayer = new TianDiTuLayer();
    baseLayer.id = "BASE_LYR";
    var annolayer = new TianDiTuLayer("ano");
    annolayer.id = "ANNO_LYR";
    map.addLayer(baseLayer);
    map.addLayer(annolayer);

    // 底图和注记图层切换
    $("#selectBasemap").on("change", function (e) {
        var type = e.target.options[e.target.selectedIndex].value;
        baseTypeName = type;
        switch (type) {
            case "vec":
                baseAnnoName = "cva";
                break;
            case "img":
                baseAnnoName = "cia";
                break;
            case "ter":
                baseAnnoName = "cta";
                break;
        }
        // 刷新图层
        baseLayer.refresh();
        annolayer.refresh();
    });

    // 坐标系切换
    $("#selectCood").on("change", function (e) {
        var type = e.target.options[e.target.selectedIndex].value;
        typeMatrixSet = type;
        // 刷新图层
        baseLayer.refresh();
        annolayer.refresh();
    });

    /**
     * 天地图类型
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
     *
     **/
});