<template>
  <div class="my-cart">
    <el-row class="goods-cont">
      <el-col :span="4" v-for="item in goodsList" :key="item.id">
        <el-image :src="item.img" fit="contain" />
        <div class="goods-name TC">{{item.name}} ¥{{item.price}}</div>
        <div class="goods-button TC"><el-button type="primary" size="mini" @click="addCart(item)">加入购物车</el-button></div>
      </el-col>
    </el-row>
    <div class="cart-wrap">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="changeCheckAll">全选</el-checkbox>
      <template v-if="cartList.length">
        <div class="cart-cont" v-for="(item, index) in cartList" :key="item.id">
          <el-checkbox v-model="item.select" @change="changeSelect" />
          <el-image :src="item.img" fit="contain" />
          <div class="cart-extra">
            <div>{{item.name}}</div>
            <div>¥{{item.price}}<span class="cart-num">x{{item.num}}</span></div>
            <div>价格：{{parseInt((item.price * 100 * item.num)) / 100}}</div>
            <el-input-number v-model="item.num" :min="1" :max="10" @blur="($event) => blurNum(item, $event)" size="mini" />
          </div>
          <el-tooltip class="item" effect="dark" :content="`删除 ${item.name}`" placement="top">
            <i class="el-icon-delete" @click="delGoods(item, index)" />
          </el-tooltip>
        </div>
      </template>
      <div class="cart-cont" v-else>暂无商品</div>
      <div class="total-price">总价：¥{{totalPrice}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIndeterminate: false, // 只负责样式控制
      checkAll: false, // 选中所有
      goodsList: [
        {
          id: 1,
          num: 1,
          price: 20.99,
          select: false,
          img: 'https://img.alicdn.com/imgextra/i3/1055530397/TB1kNMegyCYBuNkHFCcXXcHtVXa_!!0-item_pic.jpg',
          name: '洗面奶',
        },
        {
          id: 2,
          num: 1,
          price: 99,
          img: 'http://img.alicdn.com/imgextra/i2/1666952063/O1CN01arfGwX1R6tec9bqqc_!!1666952063.jpg',
          name: '电动牙刷',
        },
        {
          id: 3,
          num: 1,
          price: 58.88,
          select: false,
          img: 'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/o2o/goods/20200409/33b510be8c71cb86540d17e33e01af54.jpeg',
          name: '卫衣',
        },
        {
          id: 4,
          num: 1,
          price: 280,
          select: false,
          img: 'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/o2o/goods/20200409/dc0eb9c3f9f2b6ce0c38afd644211529.jpeg',
          name: '运动鞋',
        },
        {
          id: 5,
          num: 1,
          price: 8,
          select: false,
          img: 'https://img.alicdn.com/bao/uploaded/i1/2187138540/O1CN01orJyhF2CxMuLgsRd0_!!0-item_pic.jpg',
          name: '大补丸',
        },
        {
          id: 6,
          num: 1,
          price: 5,
          select: false,
          img: 'https://img.alicdn.com/bao/uploaded/i3/2793799007/O1CN010c9I532GPFw63cYpW_!!0-item_pic.jpg',
          name: '纸巾',
        },
      ],
      cartList: [
        {
          id: 1,
          num: 1,
          price: 20.99,
          select: false,
          img: 'https://img.alicdn.com/imgextra/i3/1055530397/TB1kNMegyCYBuNkHFCcXXcHtVXa_!!0-item_pic.jpg',
          name: '洗面奶',
        },
      ],
    }
  },
  created() {
    console.log('第一次进入keep-alive触发')
  },
  activated() {
    console.log('我被keep-alive激活')
  },
  deactivated() {
    console.log('我被keep-alive关闭')
  },
  beforeRouteEnter(to, from, next) {
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('to:', to, 'from:', from)
    next()
  },
  computed: {
    totalPrice() { // 计算总价
      const temp = this.cartList.filter(item => item.select) // 过滤出选中商品，计算总价
      let totalPrice = temp.reduce((sum, item) => {
        return sum + parseInt((item.price * 100 * item.num))
      }, 0)
      return totalPrice / 100
    },
  },
  methods: {
    addCart(item) {
      let flag = false // 记录 存在
      for (let i in this.cartList) {
        if (this.cartList[i].id === item.id) { // 已存在，商品 +1
          this.cartList[i].num >= 10 ? this.$message.error('超过库存') : this.cartList[i].num++
          flag = !flag
          break
        }
      }
      if (!flag) this.cartList.push(item) // 不存在，加入商品
      this.changeSelect()
    },
    delGoods(item, index) {
      this.cartList.splice(index, 1)
      this.changeSelect()
      this.goodsList.forEach(v => { // 重置数据
        if (v.id === item.id) {
          v.num = 1
          v.select = false
        }
      })
    },
    blurNum(item, evt) {
      !evt.target.value ? item.num = 1 : item.num = parseInt(item.num) // 过滤 undefined 和 小数
    },
    changeSelect() {
      const temp = this.cartList.filter(item => item.select) // 选中的商品数组
      if (temp[0]) {
        if (temp.length === this.cartList.length) { // 长度相等是全选
          this.isIndeterminate = false
          this.checkAll = true
        } else {
          this.isIndeterminate = true
          this.checkAll = false
        }
      } else {
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    changeCheckAll(bol) { // 改变全选状态
      this.isIndeterminate = false
      this.cartList = this.cartList.map(item => {
        return {
          ...item,
          select: bol,
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.my-cart {
  color: #606266;
  .goods-cont {
    .el-image {
      width: 150px;
      height: 150px;
    }
    .goods-button {
      width: 150px;
    }
    .goods-name {
      width: 150px;
      line-height: 32px;
    }
  }
  .cart-wrap {
    margin-top: 20px;
    .cart-cont {
      display: flex;
      align-items: center;
      margin-top: 20px;
    }
    .el-image {
      width: 100px;
      height: 100px;
      margin: 0 10px;
    }
    .cart-num {
      padding-left: 20px;
    }
    .el-icon-delete {
      cursor: pointer;
      margin-left: 20px;
    }
    .total-price {
      margin-top: 20px;
    }
  }
}
</style>
