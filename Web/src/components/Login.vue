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
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: '',
            password: ''
        }
    }
}
</script>
