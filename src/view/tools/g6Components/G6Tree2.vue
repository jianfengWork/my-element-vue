<template>
  <div class="tree-wrap">
    <div id="container2"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import DataJson from './json/treeData2.json'

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
      let that = this
      // 切换时先销毁画布
      if(this.graph != null) {
        this.graph.destroy()
      }
      // 遍历树结构
      G6.Util.traverseTree(treeData, function (item) {
        if(!item.children || item.children.length == 0) that.nullNum++ // 统计叶子节点数量
      });
      // 自定义节点
      G6.registerNode(
        'tree-node2', // 节点名称
        {
          /**
           * 绘制节点，包含文本
           * @param  {Object} cfg 节点的配置项
           * @param  {G.Group} group 图形分组，节点中的图形对象的容器
           * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
           */
          draw: function drawShape(cfg, group) {
            const { labelCfg = {} } = cfg;
            const hasChildren = cfg.children && cfg.children.length > 1;
            const w = cfg.size[0];
            const h = cfg.size[1];
            const rect = group.addShape('rect', {
              attrs: {
                x: -w,
                y: -h,
                width: w,
                height: h
              },
              name: 'rect-shape',
            });
            group.addShape('image', {
              attrs: {
                x: -w,
                y: -h,
                width: w,
                height: h,
                img: require('@/assets/process-side.png'),
              },
              name: 'image-shape',
            });
            const content = cfg.name ? cfg.name.length > 10 ? cfg.name.replace(/(.{10})/g, '$1\n') : cfg.name : '';
            group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: content,
                x: -w / 2,
                y: -58,
                textAlign: 'center',
                textBaseline: 'middle',
              },
              name: 'title-shape',
            });
            let firstVal = Object.values(cfg.info)[0]
            const label =   Object.keys(cfg.info).join(firstVal.length > 10 ? '\n\n' : '\n')
            const value = Object.values(cfg.info).join('\n')
            
            group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: label,
                x: -88,
                y: -42,
                textAlign: 'left',
                textBaseline: 'top',
                fontSize: 7,
                lineHeight: 10
              },
              name: 'label-shape',
            });
            group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: value,
                x: -10,
                y: -42,
                textAlign: 'right',
                textBaseline: 'top',
                fontSize: 7,
                lineHeight: 10
              },
              name: 'value-shape',
            });
            if (hasChildren) {
              group.addShape('marker', {
                attrs: {
                  x: 1,
                  y: -48,
                  r: 6,
                  symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
                  stroke: '#6C8FDB',
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
            icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
          },
        },
        // 'rect',
      );
      //  自定义边
      G6.registerEdge('flow-line2', {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const { style } = cfg;
          // 边路径
          const shape = group.addShape('path', {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              lineDash: [2, 2],
              path: [
                ['M', startPoint.x , startPoint.y],
                ['L', startPoint.x,  endPoint.y],
                ['L', endPoint.x, endPoint.y],
              ],
            },
          });
          return shape;
        },
      });
      
      const container = document.getElementById('container2');
      const width = container.scrollWidth;
      const height = this.nullNum < 5 ? 500 : this.nullNum * 130;  // 根据叶子节点数量算总高
      // 初始化
      this.graph = new G6.TreeGraph({
        container: 'container2',
        width,
        height,
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
          ],
        },
        defaultNode: { // 节点配置
          type: 'tree-node2',
          size: [100, 77],
          anchorPoints: [ // 节点与边的连接 [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
            [0, 0.5],
            [1, 0.5],
          ],
          labelCfg: {
            style: {
              fill: '#fff',
              fontSize: 8,
            },
          },
        },
        defaultEdge: { // 边配置
          type: 'flow-line2',
          style: {
            stroke: '#1CFFFC',
            lineWidth: 2
          },
        },
        layout: { // 画布布局
          type: 'indented',
          direction: 'LR',
          dropCap: false,
          indent: 130,
        },
      });
      
      this.graph.data(treeData);
      this.graph.render();
      this.graph.fitView();
      this.graph.moveTo(10, 0);
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
  background: #0d1a54;
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
