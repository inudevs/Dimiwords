<template>
    <div class="body">
        <h1>LOGIN</h1>
        <p>
            <router-link class="button" :to="{ name: 'join' }">가입하기</router-link>
        </p>
        <div class="join">
            <div class="join-form">
                <input v-model.trim="email" @keyup="running=true" placeholder="이메일"><br>
                <input v-model.trim="password" type="password" placeholder="비밀번호"><br>
            </div>
        </div>
        <p :style="{margin: 0}">
          <router-link :to="{ name: 'recover' }">저런! 패스워드를 잊어버리셨나요?</router-link>
        </p>
        <button class="login-user" @click="login">로그인</button>
        <br>
        <iframe width="728" height="90" allowtransparency="true" src="https://tab2.clickmon.co.kr/pop/wp_ad_728.php?PopAd=CM_M_1003067%7C%5E%7CCM_A_1042596%7C%5E%7CAdver_M_1046207&rt_ad_id_code=RTA_105965&mon_rf=https%3A%2F%2Fdimiwords.tk" frameborder="0" scrolling="no"></iframe>
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
        // eslint-disable-next-line
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
        // eslint-disable-next-line
        console.log('err', err)
        alert('로그인 도중 에러가 발생했습니다.')
      })
    }
  }
}
</script>
