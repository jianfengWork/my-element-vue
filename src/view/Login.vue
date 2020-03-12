<template>
  <div class="login">
    <vue-particles
      :color="loginColor"
      :linesColor="loginColor"
      :particleOpacity="0.7"
      :particlesNumber="50"
      shapeType="star"
      :particleSize="4"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="bubble"
      :clickEffect="true"
      clickMode="repulse"
    />
    <div class="login-content">
      <!-- <router-link to="/index"> -->
        <el-button type="primary" @click="loginSystem">{{ $t('message')['app.login.desc'] }}</el-button>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginColor: '',
    }
  },
  created() {
    this.loginColor = localStorage.getItem('navColor') || '#11A983'
  },
  methods: {
    loginSystem() {
      this.$router.push({
        path: '/dashboard/index',
        query: {locale: localStorage.getItem('systemLanguage') || 'zhCN'}
      })
      const params = {
        username: 'admin',
        password: 'sx-tech1@#&111'
      }
      // this.$post('/api/login', params).then(res => {
      //   this.$message.success('欢迎你 ' + res.data.username)
      // }).catch(err => {
      //   this.$message.error(err.data.error.message)
      // })
    }
  },
}
</script>

<style lang="scss" scoped>
#particles-js {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background: #ffd04b;
}
.login {
  .login-content {
    position: absolute;
    z-index: 10;
    transform: translate(-50%);
    left: 50%;
    top: 20%;
  }
}
</style>
