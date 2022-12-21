<template>
  <div class="vue-print">
    <el-row>
      <el-col :span="18">
        <div id="print-dom">
          <table border="1" cellspacing="0" cellpadding="10" style="border-collapse: collapse;">
            <thead>
              <tr>
                <th colspan="4">疾病预防控制机构疫苗储运检查记录表</th>
              </tr>
              <tr>
                <td style="width: 10%">单位名称</td>
                <td style="width: 60%">测试疾病预防控制机构</td>
                <td style="width: 10%">负责人</td>
                <td style="width: 20%">jianfeng</td>
              </tr>
              <tr>
                <td>单位地址</td>
                <td>安徽省芜湖市</td>
                <td>联系电话</td>
                <td></td>
              </tr>
              <template v-for="(item, index) in varietyList">
                <tr :key="index">
                  <td v-if="index == 0" :rowspan="varietyList.length">检查品种</td>
                  <td colspan="3">
                    <div class="variety-cont">
                      <span>名称：</span>
                      <el-input v-model.trim="item.name" clearable></el-input>
                      <i class="el-icon-circle-plus-outline" @click="addVariety" />
                      <i class="el-icon-remove-outline" v-if="varietyList.length > 1" @click="delVariety(index)" />
                    </div>
                  </td>
                </tr>
              </template>
            </thead>
            <tbody>
              <tr>
                <th>检查项目</th>
                <th>检查内容</th>
                <th colspan="2">检查结果</th>
              </tr>
              <!-- 冷链设备 start -->
              <tr>
                <td rowspan="5">冷链设备</td>
                <td class="TL">1.是否具备经校准的温度监测器材或设备</td>
                <td colspan="2">
                  <el-checkbox-group v-model="equipList1">
                    <el-checkbox label="欠规范"></el-checkbox>
                    <el-checkbox label="是"></el-checkbox>
                    <el-checkbox label="否"></el-checkbox>
                    <el-checkbox label="不适用"></el-checkbox>
                  </el-checkbox-group>
                </td>
              </tr>
              <tr>
                <td class="TL">2.是否具备低温冰箱和普通冰箱；2018年以后补充、更新的冰箱是否选用医用冰箱</td>
                <td colspan="2">
                  <div class="custom-checkbox">
                    <label><input name="fruit" type="checkbox" value="" checked /><span>欠规范</span></label>
                    <label><input name="fruit" type="checkbox" value="" /><span>是</span></label>
                    <label><input name="fruit" type="checkbox" value="" /><span>否</span></label>
                    <label><input name="fruit" type="checkbox" value="" /><span>不适用</span></label>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="TL">3.冷链设备档案资料是否齐全，填写《冷链设备档案表》是否规范</td>
                <td colspan="2">
                  <el-checkbox-group v-model="equipList2">
                    <el-checkbox label="是"></el-checkbox>
                    <el-checkbox label="否"></el-checkbox>
                    <el-checkbox label="不适用"></el-checkbox>
                  </el-checkbox-group>
                </td>
              </tr>
              <tr>
                <td class="TL">4.是否对冷链设备运行状况进行记录</td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td class="TL">5.是否定期评估辖区内冷链设施设备的装备和运行状况，并制定补充、更新需求计划</td>
                <td colspan="2"></td>
              </tr>
              <!-- 冷链设备 end -->
              <!-- 运输储存 start -->
              <tr v-for="(item, index) in storeList" :key="index">
                <td v-if="item.row != 0" :rowspan="item.row">{{ item.title }}</td>
                <td class="TL">{{ item.desc }}</td>
                <td colspan="2">
                  <el-radio-group v-model="item.result">
                    <el-radio :label="radio" v-for="radio in item.resultOpt" :key="radio">{{ radio }}</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="TL">7.运输、储存过程中出现温度异常的疫苗是否填写《疫苗储存和运输温度异常情况记录表》</td>
                <td colspan="2">
                  <div class="custom-radio">
                    <label><input type="radio" name="gender" value="1" checked /><span>是</span></label>
                    <label><input type="radio" name="gender" value="2" /><span>否</span></label>
                    <label><input type="radio" name="gender" value="3" /><span>不适用</span></label>
                  </div>
                </td>
              </tr>
              <!-- 运输储存 end -->
              <tr>
                <td>检查意见</td>
                <td colspan="3">
                  <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea" />
                </td>
              </tr>
              <tr>
                <td class="TL" colspan="2">检查人员（签字）：</td>
                <td>时间</td>
                <td></td>
              </tr>
              <tr>
                <td class="TL" colspan="2" style="height: 100px;">被查单位（盖章）：</td>
                <td>时间</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-col>
    </el-row>
    <el-button type="primary" size="mini" v-print="printObj">预览打印</el-button>
    <!-- 四行五列 -->
    <table border="1" cellspacing="0" cellpadding="2" style="border-collapse: collapse; width: 500px;">
      <tr>
        <td colspan="2">单元格1单元格2</td>
        <!-- <td>单元格2</td> -->
        <td>单元格3</td>
        <td>单元格4</td>
        <td>单元格5</td>
      </tr>
      <tr>
        <td rowspan="2">单元格6单元格11</td>
        <td>单元格7</td>
        <td>单元格8</td>
        <td colspan="2" rowspan="2">单元格9单元格10单元格14单元格15</td>
        <!-- <td>单元格10</td> -->
      </tr>
      <tr>
        <!-- <td>单元格11</td> -->
        <td>单元格12</td>
        <td>单元格13</td>
        <!-- <td>单元格14</td> -->
        <!-- <td>单元格15</td> -->
      </tr>
      <tr>
        <td>单元格16</td>
        <td>单元格17</td>
        <td>单元格18</td>
        <td>单元格19</td>
        <td>单元格20</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      varietyList: [
        { name: '品种1' },
      ],
      textarea: '',
      equipList1: [],
      equipList2: [],
      storeList: [
        {
          row: 7,
          title: '运输储存',
          desc: '1.接收和配送的疫苗是否有《疫苗运输温度记录表》，记录表上的出入库单号和疫苗信息是否与出入库单相符',
          result: '',
          resultOpt: ['是', '否', '不适用']
        },
        {
          row: 0,
          title: '',
          desc: '2.接收和配送的疫苗运输记录是否记录启运和到达温度，并在2-8℃范围内',
          result: '',
          resultOpt: ['是', '否', '不适用']
        },
        {
          row: 0,
          title: '',
          desc: '3.疫苗运输记录表是否有送疫苗人和收疫苗人签名',
          result: '',
          resultOpt: []
        },
        {
          row: 0,
          title: '',
          desc: '4.冷藏条件是否满足2-8℃',
          result: '',
          resultOpt: ['记录现场温度', '不适用']
        },
        {
          row: 0,
          title: '',
          desc: '5.冷冻条件是否满足-20℃以下',
          result: '',
          resultOpt: []
        },
        {
          row: 0,
          title: '',
          desc: '6.是否每天两次记录温度情况（间隔不少于6小时）',
          result: '',
          resultOpt: ['是', '否', '不适用']
        },
      ],
      printObj: {
        id: 'print-dom', // 这里是要打印元素的 ID
        popTitle: '', // 打印的标题
        extraCss: '', // 打印可引入外部的一个 css 文件
        extraHead: '', // 打印头部文字
      }
    }
  },
  methods: {
    addVariety() {
      this.varietyList.push({
        name: ''
      })
    },
    delVariety(index) {
      this.varietyList.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-print {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-row {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .el-button {
    margin: 20px;
  }
}
#print-dom {
  table {
    width: 100%;
    color: #333;
    text-align: center;
    th {
      line-height: 20px;
      font-size: 14px;
    }
    td {
      line-height: 16px;
      font-size: 13px;
    }
    .variety-cont {
      display: flex;
      align-items: center;
      span {
        width: 10%;
      }
      .el-input {
        width: 50%;
      }
      i {
        font-size: 20px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .TL {
      text-align: left;
    }
    .el-checkbox-group {
      display: flex;
      justify-content: center;
      .el-checkbox {
        margin-right: 10px;
      }
    }
    ::v-deep(.el-checkbox__label) {
      padding-left: 5px;
      font-size: 13px;
      color: #333;
    }
    .el-radio {
      margin-right: 20px;
      ::v-deep(.el-radio__label) {
        font-size: 13px;
        color: #333;
      }
    }
    ::v-deep(.el-radio__inner) {
      border-color: #333;
    }
    .custom-checkbox, .custom-radio {
      display: flex;
      justify-content: center;
      font-weight: 500;
      label {
        display: flex;
        align-items: center;
        margin-right: 10px;
      }
      input {
        margin: 0;
      }
      span {
        padding-left: 5px;
      }
    }
    .custom-radio {
      label {
        margin-right: 20px;
      }
    }
  }
}
</style>
<style media="print">
@media print {
  /* 去掉页眉和页脚 */
  @page {
    size: auto; /* auto is the initial value */
    margin: 5mm; /* this affects the margin in the printer settings */
  }
  /* 自动分页 */
  html, body {
    height: auto;
  }
}
</style>
