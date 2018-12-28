<template>
  <div>
    <b-navbar type="dark" variant="primary" toggleable>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-navbar-brand>
        <img src="../assets/logo.png" id="dimigo-logo">
        <span class="dimiwords">DIMIWORDS</span>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/">Words</b-nav-item>
          <b-nav-item to="/">Wordbooks</b-nav-item>
          <b-nav-item to="/user/rank">Scoreboard</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-text v-if="logged_in" class="profile" right>
              <span class="name">{{ user.name }}</span>
              <span id="department" v-text="['EB', 'DC', 'WP', 'HD'][user.department]"
                v-bind:style="{ color: ['#424242', '#FF0080', '#9A2EFE', '#3A01DF'][user.department] }"></span>
              <button @click="logout">로그아웃</button>
          </b-nav-item-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$nextTick(function () {
        this.user = this.$session.get('user')
        this.logged_in = true
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
      this.$router.go()
    }
  }
}
</script>
