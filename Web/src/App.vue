<template>
  <div id="app">
    <img src="./assets/logo.png" id="dimigo-logo"><br>
    <div v-if="logged_in">
      <strong>{{ this.user.name }}</strong>
      <span>{{ '(' + this.user.points + ' points)' }}</span>
      <button @click="logout">로그아웃</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$nextTick(function() {
        this.user = this.$session.get('user');
        this.logged_in = true;
        console.log(true)
      })
    }
  },
  data () {
    return {
      user: undefined,
      logged_in: false
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/user/login')
      this.$router.go();
    }
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* body {
  background: url('./assets/background.jpg') no-repeat center center fixed;
} */
</style>
