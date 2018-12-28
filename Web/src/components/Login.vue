<template>
    <div class="body">
        <h1>로그인</h1>
        <p>
            <router-link class="button" :to="{ name: 'join' }">가입하기</router-link>
        </p>
        <div class="join">
            <div class="join-form">
                <input v-model.trim="email" @keyup="running=true" placeholder="이메일"><br>
                <input v-model.trim="password" type="password" placeholder="비밀번호"><br>
            </div>
        </div>
        <button class="login-user" @click="login">로그인</button>
    </div>
</template>

<script>
export default {
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      this.$http.post('/api/auth/login', {
        email: this.email,
        password: this.password
      }).then((response) => {
        console.log(response)
        if (response.status === 200 && response.data.success) {
          this.$session.start()
          this.$session.set('jwt', response.data.token)
          const user = response.data.user
          this.$session.set('user', user)
          this.$router.push('/')
          this.$router.go()
        } else {
          alert('로그인에 실패했습니다.')
        }
      }, function (err) {
        console.log('err', err)
        alert('로그인 도중 에러가 발생했습니다.')
      })
    }
  }
}
</script>
