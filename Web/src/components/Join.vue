<template>
    <div class="body">
        <h1>회원가입</h1>
        <p>
            <router-link class="button" :to="{ name: 'login' }">로그인</router-link>
        </p>
        <p>
            <strong>한국디지털미디어고등학교</strong> 학생(신입생)만 가입할 수 있어요!<br>
            가입 정보가 올바르지 않은 경우 계정이 삭제될 수 있답니다 :(<br>
            <router-link :to="{}">개인정보처리방침</router-link>
        </p>
        <div class="join">
            <p class="new-help"><strong>학과</strong>를 선택해 주세요</p>
            <div class="department">
                <div class="first">
                    <button id="eb-button" @click="selectDepartment('eb')">
                        <i class="fas fa-briefcase"></i> 이비
                    </button>
                    <button id="dc-button" @click="selectDepartment('dc')">
                        <i class="fas fa-video"></i> 디컨
                    </button>
                </div>
                <div class="second">
                    <button id="wp-button" @click="selectDepartment('wp')">
                        <i class="fas fa-code"></i> 웹플
                    </button>
                    <button id="hd-button" @click="selectDepartment('hd')">
                        <i class="fas fa-shield-alt"></i> 해방
                    </button>
                </div>
            </div>
            <div class="join-form">
                <p class="new-help"><strong>정보</strong>를 입력해 주세요</p>
                <input v-model.trim="email" type="email" placeholder="이메일"><br>
                <input v-model.trim="password" type="password" placeholder="비밀번호"><br>
                <input v-model.trim="name" @keyup="running=true" placeholder="이름(실명)"><br>
                <input v-model.trim="intro" placeholder="한 줄 소개"><br>
            </div>
            <div class="profile-preview" v-if="this.running">
                <p class="new-help"><strong>프로필</strong>은 아래처럼 보여요</p>
                <div class="user-info">
                    <!-- <img class="profile" alt="프로필 사진 기능은 준비중이예요"><br> -->
                    <span class="name">{{ name }}</span>
                    <span id="department" v-bind:style="{ color: colors[department] }"
                        v-text="department.toUpperCase()"></span><br>
                    <span class="intro">{{ intro }}</span><br>
                </div>
            </div>
            <div v-if="(!name || !intro || !password || !email || !department)">
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
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$router.push('/')
    }
  },
  data () {
    return {
      name: '',
      password: '',
      intro: '',
      email: '',
      department: undefined,
      running: false,
      colors: {
        'eb': '#424242',
        'dc': '#FF0080',
        'wp': '#9A2EFE',
        'hd': '#3A01DF'
      }
    }
  },
  methods: {
    addUser: function () {
      if (!this.name || !this.intro || !this.password || !this.email || !this.department) { alert('모든 필드에 값을 입력해 주세요') } else {
        var user = {
          'name': this.name,
          'password': this.password,
          'email': this.email,
          'intro': this.intro,
          'department': this.department
        }
        // console.log(user);

        // add to DB
        this.$http.post(
          '/api/create/user', user, {
            headers: { 'Content-type': 'application/json' }
          })
          .then(response => {
            console.log(response)
            if (!response.data.success) {
              if (response.data.message.includes('exist')) { alert('같은 이메일의 사용자가 이미 존재합니다.') } else alert('회원가입 도중 에러가 발생했습니다.')
              return
            }

            alert('회원가입에 성공했습니다! 로그인해 주세요.')
            this.$router.push('/user/login')
          })
      }
    },
    changeColor: function (element) {
      element.style.color = element.style.borderColor = '#C8C8C8'
      element.style.backgroundColor = 'white'
      element.style.borderColor = '#C8C8C8'
    },
    selectDepartment: function (department) {
      this.department = department
      const departments = ['eb', 'dc', 'wp', 'hd']
      for (var i = 0; i < departments.length; i++) {
        var item = departments[i]
        if (item !== department) { this.changeColor(document.getElementById(item + '-button')) }
      }
      var button = document.getElementById(department + '-button')
      button.style.color = 'white'
      button.style.backgroundColor = button.style.borderColor = this.colors[department]
      var elements = document.getElementsByTagName('input')
      for (var i = 0; i < elements.length; i++) {
        elements[i].className = department
      }
    }
  }
}
</script>
