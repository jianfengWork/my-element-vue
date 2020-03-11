<template>
  <div id="drawer">
    <transition name="drawer-transform">
      <div v-if="visible" :style="drawerStyle" class="drawer">
        <slot name="content" />
      </div>
    </transition>
    <transition name="mask-transform">
      <div v-if="visible" class="mask" @click="closeDrawer" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: { // 支持String固定宽度和Number百分比
      type: [String, Number],
      default: 80
    }
  },
  data() {
    return {}
  },
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer')
    }
  },
  computed: {
    drawerStyle() {
      if (isNaN(this.width)) {
        return {
          width: `${this.width}`
        }
      } else {
        return {
          width: `${this.width}%`,
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer {
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 20px;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
}
// drawer-transform
.drawer-transform-enter-active, .drawer-transform-leave-active {
  transition: all .5s;
}
.drawer-transform-enter, .drawer-transform-leave-to {
  transform: translate3d(100%, 0, 0);
}
// mask-transform
.mask-transform-enter-active, .mask-transform-leave-active {
  transition: all .5s;
}
.mask-transform-enter, .mask-transform-leave-to {
  opacity: 0;
}
</style>
