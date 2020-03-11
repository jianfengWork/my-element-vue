<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
#nprogress {
  .bar {
    background: #1DA57A!important;
  }
  .spinner {
    display: none!important;
  }
}
</style>
