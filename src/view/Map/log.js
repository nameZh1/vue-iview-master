
/**
 * 智瞰学习日志
 * wzh
 */


/**
 * 地图初始化
 */
export function init() {
    let mapZoom // 地图显示级别
    let style // 地图样式
    let map = new WebGIS.Map({
        container: 'map', // 新建容器
        center: [108.3,22.8], // 南宁
        zoom: mapZoom, // 地图显示级别
        style: style  // 地图样式
    })
}
