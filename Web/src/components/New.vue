<template>
  <div class="new">
    <h1>단어장 만들기</h1>
    <p class="new-help">단어장에 추가할 단어를 <b>선택</b>하세요</p>
    <table class="word-table">
      <tr v-for="word in all_words">
        <td>
          <input type="checkbox" v-model="words" :value="word">
        </td>
        <td>
          <strong>{{ word.en }}</strong>
        </td>
        <td>
          <strong>뜻: </strong>{{ word.ko.join(', ') }}
        </td>
      </tr>
    </table><br>
    <div style="margin-bottom: 10px;">
        <i class="fas fa-caret-left fa-3x" @click="pagePrev"
            v-bind:style="{ 'color': (page > 1) ? 'black' : 'lightgray' }"></i>
        <span class="page">{{ page }}</span>
        <i class="fas fa-caret-right fa-3x" @click="pageNext"
            v-bind:style="{ 'color': (page < this.page_max) ? 'black' : 'lightgray' }"></i>
    </div>
    <button class="no-words" @click="show">찾는 단어가 없나요?</button>
    <modal name="add-words" height="auto" :scrollable="true">
      <div class="add-words-box">
        <p class="new-help">이미 등록된 단어가 없나요? 새로운 단어를 <strong>추가</strong>하세요</p>
        <input type="text" id="english-input" class="word-input english-input" placeholder="추가할 영단어"
          v-model.trim="en" @keyup="keyCheckEn"><br>
          <div v-for="(korean, index) in ko" class="word-input">
            <span>{{ index+1 }}번째 뜻: </span>
            <input class="korean-input" v-model.trim="ko[index]" :placeholder="index+1+'번째 뜻'" @keyup="keyCheckKo">
            <div v-if="index+1 == ko.length">
              <button class="add-korean" @click="addKo">한국어 뜻 추가하기</button><br>
            </div>
          </div>
        <button class="new-word" @click="addWord">단어 추가하기</button>
      </div>
    </modal>
    <div v-if="words.length > 0" class="new-wordbook-box">
      <p class="new-help">이 단어들로 새로운 <strong>단어장</strong>을 만들 거예요</p>
      <span class="word gradient" v-for="word in words">{{ word.en }}</span><br>
      <div class="wordbook-info">
        <p class="new-help">단어장 <strong>이름</strong>과 <strong>한 줄 소개</strong>를 입력해주세요</p>
        <input v-model.trim="name" placeholder="단어장 이름"><br>
        <input v-model.trim="intro" placeholder="단어장 한 줄 소개">
      </div>
      <button class="new-wordbook" @click="addWordbook">단어장 추가하기</button>
    </div>
    <p v-else class="new-help">단어를 <strong>선택</strong>해 주세요</p>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/user/login')
    }
  },
  created () {
    this.updateWords()
  },
  data () {
    return {
      page: 1,
      page_max: undefined,
      all_words: [],
      words: [],
      en: '',
      ko: [''],
      name: '',
      intro: '',
      token: this.$session.get('jwt')
    }
  },
  methods: {
    updateWords: function () {
      this.$http.get('/api/list/words', {
        params: { page: this.page }
      })
        .then((response) => {
          this.all_words = response.data.result.docs
          if (this.page_max == null) this.page_max = response.data.result.pages
        })
    },
    addKo: function () {
      this.ko = this.ko.filter(Boolean) // delete empty korean meanings
      this.ko.push('')
    },
    checkWord: function () {
      var checkKo = false
      for (let i = 0; i < this.ko.length; i++) {
        if (this.ko[i].length > 0) {
          checkKo = true // pass if more then one korean meanings is not empty
          break
        }
      }
      if (checkKo && this.en.length > 0) return true // english meaning must be valid
      return false
    },
    addWord: function () {
      if (!this.checkWord()) { // check if input is valid
        alert('단어를 입력해 주세요!')
        return false
      };
      if (this.en.match(/[^a-zA-Z]/) != null) { // check if english input is only english chars
        alert('영단어 란에는 영문자만 입력해 주세요!')
        return false
      }
      this.ko = this.ko.filter(Boolean) // delete empty korean meanings
      var word = { 'en': this.en, 'ko': this.ko, 'token': this.token }

      // add to DB
      this.$http.post(
        '/api/create/word', word, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(response => {
          console.log(response)
          if (response.data.success) { alert('단어를 추가했습니다.') } else if (response.data.message.includes('exist')) { alert('정확히 같은 뜻의 단어가 이미 존재합니다.') } else if (response.data.message.includes('failed to verify')) { alert('유효하지 않은 토큰입니다. 로그아웃 후 다시 로그인해서 시도해 보세요.') } else alert('단어를 추가하는 도중 에러가 발생했습니다.')

          // update all_words
          this.updateWords()

          // init en, ko
          this.en = ''
          this.ko = ['']
        // this.hide();
        })
    },
    show () {
      this.$modal.show('add-words')
    },
    hide () {
      this.$modal.hide('add-words')
    },
    keyCheckEn () {
      var _input = document.getElementById('english-input')
      if (this.en.length > 0 && this.en.match(/[^a-z]/) == null) {
        _input.style.borderColor = '#EC008C'
        _input.style.borderStyle = 'solid'
      } else {
        _input.style.borderColor = 'rgb(37, 37, 37)'
        _input.style.borderStyle = 'dotted'
      }
      if (_input.value.match(/(?=[A-Z]|[^A-Z])/)) {
        _input.value = this.en.toLowerCase()
      }
    },
    keyCheckKo: function (event) {
      var _input = event.target
      if (_input.value.length > 0) _input.style.borderColor = '#FC6767'
      else _input.style.borderColor = 'rgb(165, 165, 165)'
    },
    addWordbook: function () {
      var wordbook = {
        'name': this.name,
        'intro': this.intro,
        'words': this.words,
        'token': this.token
      }

      // add to DB
      this.$http.post(
        '/api/create/wordbook', wordbook, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(response => {
          console.log(response)
          if (response.data.success) { alert('단어장을 추가했습니다.') } else if (response.data.message.includes('failed to verify')) { alert('유효하지 않은 토큰입니다. 로그아웃 후 다시 로그인해서 시도해 보세요.') } else alert('단어장을 추가하는 도중 에러가 발생했습니다.')
          this.$router.push('/')
        })
    },
    pagePrev: function () { // previous page
      if (this.page > 1) { // only if prev page is available
        this.page--
        this.updateWords()
      }
    },
    pageNext: function () { // next page
      if (this.page < this.page_max) { // only if next page is available
        this.page++
        this.updateWords()
      }
    }
  }
}
</script>
