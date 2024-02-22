<template>
  <div class="bpmn-wrap">
    <div class="canvas" ref="canvas"></div>
    <ul class="buttons">
      <li>
        <el-button type="primary" @click="$refs.refFile.click()">加载本地BPMN文件</el-button>
        <input
          type="file"
          id="files"
          ref="refFile"
          style="display: none"
          @change="loadXML"
        />
      </li>
      <li>
        <el-button type="primary" @click="saveXML" title="保存为bpmn">保存为BPMN文件</el-button>
      </li>
      <li>
        <el-button type="primary"  @click="saveSVG" title="保存为svg">保存为SVG图片</el-button>
      </li>
      <li>
        <el-button type="primary"  @click="handlerUndo" title="撤销操作">撤销</el-button>
      </li>
      <li>
        <el-button type="primary"  @click="handlerRedo" title="恢复操作">恢复</el-button>
      </li>
      <li>
        <el-button type="primary"  @click="handlerZoom(0.1)" title="放大">放大</el-button>
      </li>
      <li>
        <el-button type="primary"  @click="handlerZoom(-0.1)" title="缩小">缩小</el-button>
      </li>
      <li>
        <el-button type="primary"  @click="handlerZoom(0)" title="还原">还原</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
// https://github.com/miyuesc/bpmn-process-designer

import BpmnModeler from "bpmn-js/lib/Modeler";

// 汉化
import customTranslate from "./customTranslate";

import { xmlStr } from "./mock/xmlStr";

export default {
  mounted() {
    this.init();
  },
  data() {
    return {
      bpmnModeler: null,
      scale: 1,
      xmlStr: xmlStr
    };
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas;

      // 将汉化包装成一个模块
      const customTranslateModule = {
        translate: ["value", customTranslate]
      };

      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [
          customTranslateModule
        ],
      });

      this.createNewDiagram();
    },
    async createNewDiagram() {
      try {
        const result = await this.bpmnModeler.importXML(this.xmlStr);
        const { warnings } = result;
        console.log('warnings:', warnings);

        this.success();
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },
    success() {
      this.addModelerListener();
      this.addEventBusListener();
    },
    async loadXML() {
      const that = this;
      const file = this.$refs.refFile.files[0];

      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        that.xmlStr = this.result;
        that.createNewDiagram();
      };
    },
    async saveXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;

        var xmlBlob = new Blob([xml], {
          type: "application/bpmn20-xml;charset=UTF-8,"
        });

        var downloadLink = document.createElement("a");
        downloadLink.download = "ops-coffee-bpmn.bpmn";
        downloadLink.innerHTML = "Get BPMN SVG";
        downloadLink.href = window.URL.createObjectURL(xmlBlob);
        downloadLink.onclick = function(event) {
          document.body.removeChild(event.target);
        };
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      } catch (err) {
        console.log(err);
      }
    },
    async saveSVG() {
      try {
        const result = await this.bpmnModeler.saveSVG();
        const { svg } = result;

        var svgBlob = new Blob([svg], {
          type: "image/svg+xml"
        });

        var downloadLink = document.createElement("a");
        downloadLink.download = "ops-coffee-bpmn.svg";
        downloadLink.innerHTML = "Get BPMN SVG";
        downloadLink.href = window.URL.createObjectURL(svgBlob);
        downloadLink.onclick = function(event) {
          document.body.removeChild(event.target);
        };
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      } catch (err) {
        console.log(err);
      }
    },
    // 恢复
    handlerRedo() {
      this.bpmnModeler.get("commandStack").redo();
    },
    // 撤销
    handlerUndo() {
      this.bpmnModeler.get("commandStack").undo();
    },
    // 缩放
    handlerZoom(radio) {
      const newScale = !radio ? 1.0 : this.scale + radio;
      this.bpmnModeler.get("canvas").zoom(newScale);

      this.scale = newScale;
    },
    // 监听modeler事件 如：shape:add shape:removed
    addModelerListener() {
      const that = this;

      that.bpmnModeler.on("element.click", e => {
        console.log("modelerListener", e);
      });
    },
    // 监听element事件 如： element:click element:changed
    addEventBusListener() {
      const that = this;
      const eventBus = this.bpmnModeler.get("eventBus");

      eventBus.on("element.click", function(e) {
        console.log(e)
        that.elementClick(e);
      });
    },
    elementClick(e) {
      const modeling = this.bpmnModeler.get("modeling");

      if (e.element.businessObject.$type === "bpmn:StartEvent") {
        console.log(
          "这是一个开始节点",
          e.element.businessObject.id,
          e.element.businessObject.$type,
          e.element.businessObject.name
        );

        // 修改节点ID
        modeling.updateProperties(e.element, {
          id: "StartEvent_ops_coffee",
          abc: 123
        });
      }

      if (e.element.businessObject.$type === "bpmn:UserTask") {
        console.log(
          "这是一个用户节点",
          e.element.businessObject.id,
          e.element.businessObject.$type,
          e.element.businessObject.name
        );

        // 修改节点名称
        modeling.updateProperties(e.element, {
          name: "ops-coffee.cn"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.bpmn-wrap {
  width: 100%;
  height: 100%;
  position: relative;

  
  .canvas {
    width: 100%;
    height: 100%;
    background: white;
  overflow: auto;
  background-image: linear-gradient(
    90deg,
    rgba(220, 220, 220, 0.5) 6%,
    transparent 0
  ),
  linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
  background-size: 24px 24px;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  .buttons {
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
  .buttons li {
    display: inline-block;
    margin: 5px;
  }
}
</style>
