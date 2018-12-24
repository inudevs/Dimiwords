<template>
  <div id="app">
    <img src="./assets/logo.png" id="dimigo-logo"><br>
    <div v-if="logged_in" class="profile">
      <span class="name">{{ this.user.name }}</span>
      <span id="department" v-text="['EB', 'DC', 'WP', 'HD'][this.user.department]"
        v-bind:style="{ color: ['#424242', '#FF0080', '#9A2EFE', '#3A01DF'][this.user.department] }"></span><br>
      <button @click="home">홈</button>
      <button @click="logout">로그아웃</button>
      <button @click="ranking">랭킹</button><br>
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
    home: function () {
      this.$router.push('/')      
    },
    logout: function () {
      this.$session.destroy()
      this.$router.push('/user/login')
      this.$router.go();
    },
    ranking: function () {
      this.$router.push('/user/rank')
    }
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
