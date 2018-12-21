<template>
    <div>
        <h1>회원가입</h1>
        <router-link :to="{ name: 'login' }">로그인</router-link>
        <div class="join">
            <div class="join-form">
                <input v-model.trim="name" @keyup="running=true" placeholder="사용자 이름"><br>
                <input v-model.trim="password" type="password" placeholder="비밀번호"><br>
                <input v-model.trim="intro" placeholder="한 줄 소개"><br>
            </div>
            <div class="profile-preview" v-if="this.running">
                <p class="new-help"><strong>프로필</strong>은 아래처럼 보여요</p>
                <div class="user-info">
                    <img class="profile" alt="프로필 사진 기능은 준비중이예요"><br>
                    <span class="name">{{ name }}</span><br>
                    <span class="intro">{{ intro }}</span><br>
                </div>
            </div>
            <div v-if="(!name || !intro || !password)">
                <p class="new-help">모든 필드에 값을 <strong>입력</strong>해 주세요</p>
            </div>
            <div v-else>
                <button class="new-user" @click="addUser">가입하기</button>             
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created () {},
    data () {
        return {
            name: '',
            password: '',
            intro: '',
            running: false
        }
    },
    methods: {
        addUser: function () {
            if (!this.name || !this.intro || !this.password)
                alert('모든 필드에 값을 입력해 주세요');
            else {
                
            }
        }
    }
}
</script>
