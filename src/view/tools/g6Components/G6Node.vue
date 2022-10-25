<template>
  <div class="node-wrap">
    <div id="g6-node"></div>
  </div>
</template>

<script>
// https://antv-g6.gitee.io/zh/docs/manual/introduction
import G6 from '@antv/g6'

export default {
  data() {
    return {
      nodeData: { // 数据集
        nodes: [
          {
            id: '1',
            leftChildId: null,
            rightChildId: null,
            label: 'root',
            x: 300, 
            y: 50,
          }
        ],
      }
    }
  },
  mounted() {
    this.renderData()
  },
  methods: {
    renderData() {
      // 自定义节点
      G6.registerNode(
        'custom-node',
        {
          draw(cfg, group) {
            // console.log(cfg)
            const { labelCfg } = cfg
            const { rectFill } = labelCfg.style
            const rect = group.addShape('rect', {
              attrs: {
                fill: rectFill,
                stroke: '#5B8FF9',
                x: 0,
                y: 0,
                width: 100,
                height: 50,
                cursor: 'pointer'
              },
              name: 'rect-shape',
            });
            const text = group.addShape('text', {
              attrs: {
                ...labelCfg.style,
                text: cfg.label || '',
                x: 30,
                y: 25,
                textAlign: 'left',
                textBaseline: 'middle',
                cursor: 'pointer'
              },
              name: 'text-shape',
              draggable: true,
            });
            group.addShape('marker', {
              attrs: {
                x: -8,
                y: 25,
                r: 8,
                stroke: '#67C23A',
                cursor: 'pointer',
                symbol: cfg.leftChildId ? G6.Marker.collapse : G6.Marker.expand,
              },
              name: 'left-marker',
            });
            group.addShape('marker', {
              attrs: {
                x: 108,
                y: 25,
                r: 8,
                stroke: '#67C23A',
                cursor: 'pointer',
                symbol: cfg.rightChildId ? G6.Marker.collapse : G6.Marker.expand,
              },
              name: 'right-marker',
            });
            group.addShape('marker', {
              attrs: {
                x: 54,
                y: 58,
                r: 8,
                stroke: '#F56C6C',
                cursor: 'pointer',
                symbol: G6.Marker.collapse,
              },
              name: 'bottom-marker',
            });
            return rect
          },
        }
      )
      //  自定义边
      G6.registerEdge('custom-line', {
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
                ['L', endPoint.x, startPoint.y],
                ['L', endPoint.x, endPoint.y],
              ],
            },
          });
          return shape;
        },
      });
      // 创建 G6 图实例
      const g6Node = document.getElementById('container');
      const width = g6Node.scrollWidth;
      const graph = new G6.Graph({
        container: 'g6-node', // 指定图画布的容器 id
        // 画布宽高
        width,
        height: 500,
        defaultNode: { // 节点配置
          type: 'custom-node',
          labelCfg: {
            style: {
              fill: '#606266',
              fontSize: 20,
              rectFill: '#DEE9FF'
            },
          },
          anchorPoints: [ // 四个边中点，按照最近的吸附
            [0.5, 0], // 上边中点
            [0, 0.5], // 左边中点
            [1, 0.5], // 右边中点
            // [0.5, 1],
          ],
        },
        defaultEdge: { // 边配置
          type: 'custom-line',
          style: {
            endArrow: {
              path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
              fill: '#ddd',
            },
            stroke: '#ddd',
            lineWidth: 2
          },
        },
        modes: {
          default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
        },
        minZoom: 0.5,
        maxZoom: 1.5,
      });
      // 读取数据
      graph.data(this.nodeData);
      // 渲染图
      graph.render();
      // 节点点击事件
      graph.on('node:click',(evt) => {
        const { target } = evt;
        const targetType = target.get('type');
        // console.log(evt)

        if (targetType == 'rect') {
          const node = evt.item;
          const model = node.getModel();
          graph.updateItem(node, { // 更新节点样式
            label: `${model.label}`,
            labelCfg: {
              style: {
                fill: '#333',
                fontSize: 20,
                rectFill: 'rgb(17, 169, 131, 0.2)'
              },
            },
          });
        }

        if (targetType == 'marker') {
          const name = target.get('name')
          if (name == 'left-marker') {

            const node = evt.item;
            const model = node.getModel();
            if (model.leftChildId == null) { // 添加子节点
              const childId = String(Date.now())
              graph.updateItem(node, {
                leftChildId: childId
              });
              // 子节点初始数据
              const child = {
                id: childId,
                leftChildId: null,
                rightChildId: null,
                label: 'node',
                x: model.x - 120, 
                y: model.y + 80,
              };
              graph.addItem('node', child);
              // 添加边
              const edge = {
                source: model.id,
                target: childId,
                sourceAnchor: 1, // 使用 anchorPoints 第一个
                targetAnchor: 0,
              }
              graph.addItem('edge', edge);

            } else { // 删除子节点
              // 通过 ID 查询节点实例
              const item = graph.findById(model.leftChildId);
              graph.removeItem(item);
              graph.updateItem(node, {
                leftChildId: null
              });

            }
            
          } else if (name == 'right-marker') {
            
            const node = evt.item;
            const model = node.getModel();
            if (model.rightChildId == null) {
              const childId = String(Date.now())
              graph.updateItem(node, {
                rightChildId: childId
              });
              // 节点初始数据
              const child = {
                id: childId,
                leftChildId: null,
                rightChildId: null,
                label: 'node',
                x: model.x + 120, 
                y: model.y + 80,
              };
              graph.addItem('node', child);
              // 添加边
              const edge = {
                source: model.id,
                target: childId,
                sourceAnchor: 2,
                targetAnchor: 0,
              }
              graph.addItem('edge', edge);

            } else { // 删除子节点
              // 通过 ID 查询节点实例
              const item = graph.findById(model.rightChildId);
              graph.removeItem(item);
              graph.updateItem(node, {
                rightChildId: null
              });
            }

          } else if (name == 'bottom-marker') { // 删除本身节点
            const node = evt.item;
            const model = node.getModel();
            // 通过 ID 查询节点实例
            const item = graph.findById(model.id);
            graph.removeItem(item);
          }
        }
        console.log(graph.save())
        
      });
      // console.log(this.nodeData)
    },
  }
}
</script>

<style lang="scss" scoped>
.node-wrap {
  width: 100%;
  height: 500px;
}
</style>
