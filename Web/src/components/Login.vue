<template>
    <div>
        <h1>로그인</h1>
        <router-link :to="{ name: 'join' }">가입하기</router-link>
        <div class="join">
            <div class="join-form">
                <input v-model.trim="name" @keyup="running=true" placeholder="사용자 이름"><br>
                <input v-model.trim="password" type="password" placeholder="비밀번호"><br>
            </div>
        </div>
        <button @click="login">로그인</button>
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
            name: '',
            password: ''
        }
    },
    methods: {
        login: function () {
            this.$http.post('/api/auth/login', {
                name: this.name,
                password: this.password
            }).then((response) => {
                console.log(response)
                if (response.status === 200 && response.data.success) {
                    this.$session.start()
                    this.$session.set('jwt', response.data.token)
                    this.$session.set('user', response.data.user)
                    this.$router.push('/')
                    this.$router.go();
                }
            }, function (err) {
                console.log('err', err)
                alert('nono')
            })
        }
    }
}
</script>
