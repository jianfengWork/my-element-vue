<template>
  <div class="tree-wrap">
    <div id="container"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import DataJson from './json/treeData.json'

export default {
  data() {
    return {
      graph: null,
      nullNum: 0
    }
  },
  mounted() {
    const treeData = JSON.parse(JSON.stringify(DataJson))
    this.renderData(treeData)
  },
  methods: {
    renderData(treeData) {
      this.nullNum = 0
      const that = this
      // 存在时先销毁画布
      if (this.graph != null) {
        this.graph.destroy()
      }
      // 遍历树结构
      G6.Util.traverseTree(treeData, function(item) {
        if(!item.children || item.children.length == 0) that.nullNum++ // 统计最后一组节点数量
        item.id = item.id + item.unitNumber; // 唯一id
      });
      // 自定义节点
      G6.registerNode(
        'tree-node', // 节点名称
        {
          /**
           * 绘制节点，包含文本
           * @param  {Object} cfg 节点的配置项
           * @param  {G.Group} group 图形分组，节点中的图形对象的容器
           * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
           */
          draw: function drawShape(cfg, group) {
            const { labelCfg = {} } = cfg;
            const hasChildren = cfg.children && cfg.children.length > 0;
            const rect = group.addShape('rect', {
              attrs: {
                fill: 'transparent',
                stroke: 'transparent',
                x: 0,
                y: 0,
                width: 42,
                height: 35
              },
              name: 'rect-shape',
            });
            group.addShape('image', {
              attrs: {
                x: 0,
                y: 0,
                width: 30,
                height: 30,
                img: cfg.depth == 0 ? require('@/assets/icon1.png') :
                  hasChildren ? require('@/assets/icon2.png') : require('@/assets/icon3.png'),
              },
              name: 'image-shape',
            });
            const content = cfg.unitName ? cfg.unitName.replace(/(.{13})/g, '$1\n') : '';
            const text = group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: cfg.unitName || '',
                x: 30,
                y: 18,
                textAlign: 'left',
                textBaseline: 'middle',
                fill: '#fff',
              },
              name: 'text-shape',
            });
            if (hasChildren) {
              text.attr({
                text: content,
                x: 20,
                y: 38,
                textAlign: 'center',
                textBaseline: 'middle',
              })
              // 添加折叠标记图形
              group.addShape('marker', {
                attrs: {
                  x: 34,
                  y: 17.5,
                  r: 6,
                  symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
                  stroke: '#1CFFFC',
                  lineWidth: 1,
                },
                name: 'collapse-icon',
              });
            }
            return rect;
          },
          /**
           * 更新节点，包含文本
           * @override
           * @param  {Object} cfg 节点的配置项
           * @param  {Node} item 节点
           */
          update: (cfg, item) => {
            const group = item.getContainer();
            const icon = group.find((e) => e.get('name') === 'collapse-icon');
            // 折叠时图标更换
            icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
          },
        },
        'rect',
      );
      //  自定义边
      G6.registerEdge('flow-line', {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const { style } = cfg;
          // 边路径
          const shape = group.addShape('path', {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              path: [
                ['M', startPoint.x , startPoint.y],
                ['L', (startPoint.x + endPoint.x)/2, startPoint.y],
                ['L', (startPoint.x + endPoint.x)/2,  endPoint.y],
                ['L', endPoint.x, endPoint.y],
              ],
            },
          });
          return shape;
        },
      });
      // 自定义tooltip
      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        trigger: 'click',
        // the types of items that allow the tooltip show up
        // 允许出现 tooltip 的 item 类型 node节点  edge边
        itemTypes: ['node'],
        // 自定义 tooltip 内容
        getContent: (e) => {
          // e.item.getModel()节点配置项
          const info = e.item.getModel().info
          const outDiv = document.createElement('div');
          outDiv.setAttribute('class', 'tooltip-wrap')
          let li = ''
          info.map(item => {
            if(item.inTime != null) {
              li += `
              <li>
                <div class="flex"><span>入库时间</span><span>${item.inTime}</span></div>
                <div class="flex"><span>数量</span><span>${item.number}</span></div>
              </li>`
            }
            if(item.outTime != null) {
              li += `
              <li>
                <div class="flex"><span>出库时间</span><span>${item.outTime}</span></div>
                <div class="flex"><span>数量</span><span>${item.number}</span></div>
              </li>`
            }
          })
          outDiv.innerHTML = `
            <h4>${e.item.getModel().unitName}</h4>
            <ul>
              ${li}
            </ul>`;
          return outDiv;
        },
        // 元素是否允许触发
        shouldBegin: (e) => {
          let res = true;
          if(e.target.cfg.name == 'collapse-icon') res = false
          return res;
        },
      });
      const defaultLabelCfg = {
        style: {
          fill: '#fff',
          fontSize: 8,
        },
      };
      const container = document.getElementById('container');
      const width = container.scrollWidth;
      const height = this.nullNum < 8 ? 600 : this.nullNum * 80;  // 根据叶子节点算总高
      // 初始化
      this.graph = new G6.TreeGraph({
        container: 'container',
        width,
        height,
        plugins: [tooltip], // 可配插件 如Tooltip
        modes: { // 交互模式 如：折叠、缩放、平移
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange(item, collapsed) {
                const data = item.get('model');
                this.graph.updateItem(item, {
                  collapsed,
                });
                data.collapsed = collapsed;
                return true;
              },
              shouldBegin: (e) => {
                let res = false;
                if(e.target.cfg.name == 'collapse-icon') res = true
                return res;
              },
            },
            'drag-canvas',
            'zoom-canvas',
          ],
        },
        defaultNode: { // 节点配置
          type: 'tree-node',
          size: [120, 40],
          anchorPoints: [ // 节点与边的连接 [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
            [0, 0.5],
            [1, 0.5],
          ],
          labelCfg: defaultLabelCfg,
        },
        defaultEdge: { // 边配置
          type: 'flow-line',
          style: {
            stroke: '#1CFFFC',
            lineWidth: 2
          },
        },
        layout: { // 画布布局
          type: 'compactBox',
          direction: 'LR', // 方向
          getId: function getId(d) {
            return d.id;
          },
          getHeight: function getHeight() { // 节点的高度
            return 16;
          },
          getWidth: function getWidth() { // 节点的宽度
            return 16;
          },
          getVGap: function getVGap() { // 节点的垂直间隙
            return 18;
          },
          getHGap: function getHGap() { // 节点的水平间隙
            return 100;
          },
        },
      });
      
      this.graph.data(treeData);
      this.graph.render();
      this.graph.fitView();
      // 以 x, y 位置为中心，缩小到 0.8
      this.graph.zoom(0.8, {x: width / 2, y: height / 2});
      // if (typeof window !== 'undefined')
      //   window.onresize = () => {
      //     if (!this.graph || this.graph.get('destroyed')) return;
      //     if (!container || !container.scrollWidth || !container.scrollHeight) return;
      //     this.graph.changeSize(container.scrollWidth, container.scrollHeight);
      //   };
    },
  }
}
</script>

<style lang="scss">
.tree-wrap {
  width: 100%;
  min-height: 600px;
  background: url('/images/batch-bg.png');
  background-size: 100% auto;
  position: relative;
}
.g6-component-tooltip {
  width: 240px;
  color: #fff;
  border: 0;
  padding: 0;
  background-color: rgba(10,36,63,0.9);
  box-shadow: 0px 1px 0px 0px rgba(142,57,248,0.40) inset, 0px -1px 0px 0px rgba(98,176,255,0.40) inset;
  .tooltip-wrap {
    padding: 10px 8px;
    background: linear-gradient(0deg,hsla(209, 89%, 55%, 0.29) 0%, rgba(41,61,137,0.47) 53%, #51185d 100%);
    h4 {
      margin-bottom: 13px;
      font-size: 16px;
    }
    ul {
      max-height: 200px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .flex {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
  }
}
</style>
