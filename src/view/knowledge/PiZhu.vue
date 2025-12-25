<template>
  <div class="annotation-container" ref="annotationContainer">
    <!-- SVG画布，用于绘制连线 -->
    <svg id="annotation-lines" ref="annotationLines"></svg>

    <!-- 主内容区域 -->
    <main id="main-content" ref="mainContent">
      <!-- 这里替换为你实际的文本内容 -->
      <p>中华人民共和国（the People's Republic of China），简称“中国”，成立于1949年10月1日 [1]，位于亚洲东部，太平洋西岸 [2]，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]，以五星红旗为国旗 [4]、《义勇军进行曲》为国歌 [181]，国徽中间是五星照耀下的天安门，周围是谷穗和齿轮 [6] [164]，通用语言文字是普通话和规范汉字 [7]，首都北京 [8]，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。</p>
      <p>中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，海域总面积约473万平方千米 [2]。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35759平方千米 [2]。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。</p>
      <p>中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统 [3]，世界遗产数量全球领先 [9]。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 [10]。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设 [3]。经过长期努力，中国特色社会主义进入了新时代。</p>
      <p>截至2024年，中国是世界人口第二大国 [190]，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元 [12-13] [124]。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。</p>

      <!-- 动态显示的批注按钮 -->
      <el-button
        v-if="showAnnotationBtn"
        class="annotation-btn"
        @click="hideAnnotationBtn"
        :style="{ top: btnTop + 'px', left: btnLeft + 'px' }"
        type="primary"
        size="small"
      >
        添加批注
      </el-button>
    </main>

    <!-- 批注侧边栏 -->
    <div class="annotation-sidebar" v-if="annotations.length > 0">
      <div class="annotation-list" ref="annotationList">
        <div
          v-for="annotation in annotations"
          :key="annotation.id"
          class="annotation-box"
          :data-annotation-id="annotation.id"
          :style="{ top: annotation.position.top + 'px' }"
          @dblclick="editAnnotation(annotation)"
        >
          <div class="annotation-header">
            <img :src="annotation.avatar" alt="头像" class="annotation-avatar" />
            <span class="annotation-username">{{ annotation.username }}</span>
            <span class="annotation-time">{{ annotation.time }}</span>

            <!-- Element UI 下拉菜单 -->
            <el-dropdown trigger="click" class="annotation-actions" @command="handleCommand($event, annotation)">
              <span class="el-dropdown-link">
                <i class="el-icon-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="annotation-content">
            <!-- 编辑状态 -->
            <div v-if="annotation.editing" class="annotation-edit-container">
              <el-input
                v-model="annotation.text"
                class="annotation-input"
                type="textarea"
                @keyup.enter.native="confirmEdit(annotation)"
                @blur="confirmEdit(annotation)"
              />
            </div>
            <!-- 只读状态 -->
            <p v-else class="annotation-text">
              {{ annotation.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnotationComponent',
  data() {
    return {
      // 批注按钮状态
      showAnnotationBtn: false,
      btnTop: 0,
      btnLeft: 0,
      // 批注数据
      annotations: [
        // 在这里初始化示例批注
        {
          "id": 1766652973211,
          "text": "中华人民共和国",
          "editing": false,
          "position": {
            "top": 42
          },
          "time": "16:56:13",
          "username": "当前用户",
          "avatar": "https://cube.elemecdn.com/0/88/03b0dff35048270dfda05a3dff99fpng.png"
        },
      ]
    };
  },
  mounted() {
    // 添加事件监听
    document.addEventListener('selectionchange', this.handleSelectionChange);
    if (this.$refs.annotationContainer) {
      this.$refs.annotationContainer.addEventListener('scroll', this.drawAllAnnotationLines);
    }
    window.addEventListener('resize', this.drawAllAnnotationLines);

    // 初始化已有批注的高亮
    this.$nextTick(() => {
      this.highlightExistingAnnotations();
      this.drawAllAnnotationLines();
    });
  },
  beforeDestroy() {
    // 清理事件监听
    document.removeEventListener('selectionchange', this.handleSelectionChange);
    if (this.$refs.annotationContainer) {
      this.$refs.annotationContainer.removeEventListener('scroll', this.drawAllAnnotationLines);
    }
    window.removeEventListener('resize', this.drawAllAnnotationLines);
  },
  methods: {
    // 处理下拉菜单命令
    handleCommand(command, annotation) {
      if (command === 'delete') {
        this.deleteAnnotation(annotation);
      }
    },

    // 编辑批注
    editAnnotation(annotation) {
      annotation.editing = true;
      // 等待DOM更新完成后聚焦到输入框
      this.focusInput(annotation)
    },

    // 确认编辑
    confirmEdit(annotation) {
      annotation.editing = false;
      this.$nextTick(() => {
        this.drawAllAnnotationLines();
      });
    },

    // 删除批注
    deleteAnnotation(annotation) {
      this.$confirm('确定删除这条批注吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.annotations.findIndex(a => a.id === annotation.id);
        if (index !== -1) {
          // 移除高亮文本
          const highlightedSpan = this.$refs.mainContent.querySelector(`span.pizhu[data-annotation-id="${annotation.id}"]`);
          if (highlightedSpan && highlightedSpan.parentNode) {
            const textNode = document.createTextNode(highlightedSpan.textContent);
            highlightedSpan.parentNode.replaceChild(textNode, highlightedSpan);
          }

          this.annotations.splice(index, 1);
          this.$nextTick(() => {
            this.drawAllAnnotationLines();
          });
        }
      }).catch(() => {
        // 取消删除
      });
    },

    // 处理文本选择
    handleSelectionChange() {
      const selection = window.getSelection();
      if (selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const contentRect = this.$refs.mainContent.getBoundingClientRect();
        const isInContent = this.$refs.mainContent.contains(range.commonAncestorContainer);

        if (isInContent) {
          const rect = range.getBoundingClientRect();
          this.btnTop = rect.bottom - contentRect.top;
          this.btnLeft = rect.left - contentRect.left;
          this.showAnnotationBtn = true;
        } else {
          this.showAnnotationBtn = false;
        }
      } else {
        this.showAnnotationBtn = false;
      }
    },

    // 隐藏批注按钮（并添加批注）
    hideAnnotationBtn() {
      const selection = window.getSelection();
      
      // 检查是否有选中文本
      if (!selection.toString().trim()) {
        this.showAnnotationBtn = false;
        return;
      }
      
      const selectedText = selection.toString().trim();
      
      // 检查选中文本是否在main-content内
      const mainContent = this.$refs.mainContent;
      const range = selection.getRangeAt(0);
      
      if (!mainContent.contains(range.commonAncestorContainer)) {
        this.showAnnotationBtn = false;
        return;
      }
      
      // 保存选中区域的起点和终点
      const startContainer = range.startContainer;
      const startOffset = range.startOffset;
      const endContainer = range.endContainer;
      const endOffset = range.endOffset;
      
      // 创建新的range来重新选中文本（防止selection丢失）
      const newRange = document.createRange();
      newRange.setStart(startContainer, startOffset);
      newRange.setEnd(endContainer, endOffset);
      
      // 移除当前selection并应用新的range
      selection.removeAllRanges();
      selection.addRange(newRange);
      
      // 现在获取最新的range
      const currentRange = selection.getRangeAt(0);
      
      const id = Date.now();
      
      // 创建高亮span
      const span = document.createElement('span');
      span.textContent = selectedText;
      span.className = 'pizhu';
      span.setAttribute('data-annotation-id', id);
      
      try {
        // 方法1：直接替换选中内容
        currentRange.deleteContents();
        currentRange.insertNode(span);
      } catch (error) {
        console.warn('方法1失败，尝试方法2:', error);
        
        try {
          // 方法2：使用extractContents（更安全的方式）
          const fragment = currentRange.extractContents();
          span.appendChild(fragment);
          currentRange.insertNode(span);
        } catch (error2) {}
      }
      
      // 确保span被正确插入后，添加样式
      setTimeout(() => {
        const insertedSpan = mainContent.querySelector(`span.pizhu[data-annotation-id="${id}"]`);
        if (insertedSpan) {
          insertedSpan.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
          insertedSpan.style.borderBottom = '2px solid #ff9800';
          insertedSpan.style.borderRadius = '2px';
          insertedSpan.style.padding = '0 2px';
          insertedSpan.style.cursor = 'pointer';
        }
      }, 10);
      
      // 计算批注位置
      const rect = span.getBoundingClientRect();
      const container = this.$refs.annotationContainer;
      let annotationTop = 0;
      
      if (container) {
        const containerRect = container.getBoundingClientRect();
        annotationTop = (rect.top - containerRect.top + container.scrollTop);
      }
      
      // 添加新批注
      this.annotations.push({
        id: id,
        text: selectedText,
        editing: true,
        position: { top: annotationTop },
        time: new Date().toLocaleTimeString(),
        username: '当前用户',
        avatar: 'https://cube.elemecdn.com/0/88/03b0dff35048270dfda05a3dff99fpng.png'
      });
      
      // 隐藏按钮并清除selection
      this.showAnnotationBtn = false;
      selection.removeAllRanges();
      
      // 更新连线
      this.$nextTick(() => {
        this.focusInput(this.annotations[this.annotations.length - 1])
        this.$nextTick(() => {
          this.drawAllAnnotationLines();
        });
      });
    },

    // 绘制所有连线
    drawAllAnnotationLines() {
      const svg = this.$refs.annotationLines;
      if (!svg || !this.$refs.annotationContainer) return;

      // 设置SVG尺寸
      const container = this.$refs.annotationContainer;
      svg.style.height = `${container.scrollHeight}px`;
      svg.style.width = `${container.scrollWidth}px`;

      // 清空旧连线
      svg.innerHTML = '';

      const containerRect = container.getBoundingClientRect();
      const scrollTop = container.scrollTop;

      this.annotations.forEach(annotation => {
        const span = this.$refs.mainContent.querySelector(`span.pizhu[data-annotation-id='${annotation.id}']`);
        const box = this.$refs.annotationList.querySelector(`[data-annotation-id='${annotation.id}']`);

        if (span && box) {
          const spanRect = span.getBoundingClientRect();
          const boxRect = box.getBoundingClientRect();

          // 计算坐标（简化为两个折点的L型线）
          const startX = spanRect.left + spanRect.width / 2;
          const startY = spanRect.bottom;
          const endX = boxRect.left;
          const endY = boxRect.top + boxRect.height / 2;
          const bendX = this.$refs.mainContent.getBoundingClientRect().right - 15; // 主内容区右侧

          // 转换为容器相对坐标
          const startXRel = startX - containerRect.left;
          const startYRel = startY - containerRect.top + scrollTop;
          const bendXRel = bendX - containerRect.left;
          const bendYRel = startYRel; // 水平部分与起点同高
          const endXRel = endX - containerRect.left;
          const endYRel = endY - containerRect.top + scrollTop;

          // 创建SVG路径
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', `M${startXRel},${startYRel} L${bendXRel},${bendYRel} L${endXRel},${endYRel}`);
          path.setAttribute('stroke', '#e15b56');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('stroke-dasharray', '5,5');
          path.setAttribute('fill', 'none');
          svg.appendChild(path);
        }
      });
    },

    // 高亮已有批注的文本
    highlightExistingAnnotations() {
      const mainContent = this.$refs.mainContent;
      if (!mainContent) return;

      this.annotations.forEach(annotation => {
        // 如果已经高亮，跳过
        if (mainContent.querySelector(`span.pizhu[data-annotation-id="${annotation.id}"]`)) return;

        const textToFind = annotation.text.trim();
        if (!textToFind) return;

        // 方法1：使用textContent进行模糊匹配
        const fullText = mainContent.textContent;
        const searchText = fullText.replace(/\s+/g, ' ');
        const searchPattern = textToFind.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(searchPattern, 'g');
        
        let match;
        while ((match = regex.exec(searchText)) !== null) {
          // 创建一个文本节点遍历器
          const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
          
          let charCount = 0;
          let node;
          let foundNode = null;
          let foundOffset = -1;
          
          // 找到匹配的文本节点和偏移量
          while ((node = walker.nextNode())) {
            const nodeText = node.textContent;
            const nodeLength = nodeText.length;
            
            // 检查匹配是否在这个节点中
            if (charCount <= match.index && charCount + nodeLength > match.index) {
              foundNode = node;
              foundOffset = match.index - charCount;
              break;
            }
            charCount += nodeLength;
          }
          
          if (foundNode) {
            try {
              const range = document.createRange();
              range.setStart(foundNode, foundOffset);
              range.setEnd(foundNode, foundOffset + textToFind.length);
              
              // 检查是否已经有高亮
              if (range.startContainer.parentNode.className !== 'pizhu') {
                const span = document.createElement('span');
                span.textContent = textToFind;
                span.className = 'pizhu';
                span.setAttribute('data-annotation-id', annotation.id);
                span.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
                span.style.borderBottom = '2px solid #ff9800';
                span.style.borderRadius = '2px';
                span.style.padding = '0 2px';
                span.style.cursor = 'pointer';
                
                range.surroundContents(span);
                console.log(`已高亮批注 ${annotation.id}: ${textToFind}`);
                break; // 找到并高亮后跳出
              }
            } catch (e) {
              console.warn(`无法高亮批注 ${annotation.id} 的文本:`, e);
            }
          }
        }
      });
    },
    // 聚焦input
    focusInput(annotation) {
      this.$nextTick(() => {
        // 查找当前批注的输入框
        const input = this.$refs.annotationList.querySelector(
          `[data-annotation-id="${annotation.id}"] textarea`
        );
        
        if (input) {
          input.focus();
          // 可选：将光标定位到文本末尾
          input.setSelectionRange(input.value.length, input.value.length);
        } else {
          console.warn('无法找到编辑批注的输入框');
        }
      });
    },
  }
};
</script>

<style scoped>
.annotation-container {
  position: relative;
  display: flex;
  min-height: 500px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}

#annotation-lines {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}

#main-content {
  flex: 1;
  padding: 20px;
  position: relative;
  line-height: 1.6;
  overflow-y: auto;
  background: #fff;
}

.annotation-btn {
  position: absolute;
  z-index: 10;
}

.pizhu {
  background-color: rgba(255, 235, 59, 0.3);
  border-bottom: 2px solid #ff9800;
  cursor: pointer;
}

.annotation-sidebar {
  width: 300px;
  border-left: 1px solid #e4e7ed;
  background: #fafafa;
  overflow-y: auto;
}

.annotation-list {
  position: relative;
  min-height: 100%;
}

.annotation-box {
  position: absolute;
  width: calc(100% - 20px);
  margin: 10px;
  padding: 12px;
  background: white;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

.annotation-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.annotation-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.annotation-username {
  font-weight: 500;
  color: #303133;
  margin-right: 8px;
}

.annotation-time {
  font-size: 12px;
  color: #909399;
  margin-right: auto;
}

.annotation-actions {
  cursor: pointer;
  color: #c0c4cc;
}

.annotation-actions:hover {
  color: #909399;
}

.annotation-content {
  font-size: 14px;
}

.annotation-text {
  margin: 0;
  color: #606266;
  word-break: break-word;
}

.annotation-edit-container {
  margin-top: 4px;
}
</style>
