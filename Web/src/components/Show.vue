<template>
  <div class="body">
    <h1>TEST</h1>
    <h2 id="word-index">{{ `${progress.index} / ${progress.all}` }}</h2>
    <strong id="question">
      <span v-if="running">{{ current.ko }}</span>
      <span v-else>끝</span>
    </strong><br>
    <div id="progress">
      <div id="bar" v-bind:style="getBarStyle()">
        <span id="time">{{ Math.floor((progress.current/progress.all || 0)*100) + '%' }}</span>
      </div>
    </div>
    <input id="guess" v-if="running" v-on:keyup.enter="key" autocomplete="off">
    <div v-if="!running">
      <i class="fas fa-redo fa-3x" v-on:click="refresh"
        v-on:mouseover="infoRefresh" v-on:mouseleave="infoClear"></i>
      <router-link :to="{ name: 'index' }" class="link">
        <i class="fas fa-bars fa-3x" v-on:mouseover="infoMenu" v-on:mouseleave="infoClear"></i>
      </router-link>
    </div>
    <div v-else>
      <i class="fas fa-question-circle fa-3x" v-on:click="hint"
        v-on:mouseover="infoHint" v-on:mouseleave="infoClear"></i>
      <i class="fas fa-times fa-3x" v-on:click="pass"
        v-on:mouseover="infoPass" v-on:mouseleave="infoClear"></i>
    </div>
    <div>
      <p v-if="running" id="button-info" class="new-help running">주어진 뜻에 맞는 영단어를 입력하고 엔터를 눌러주세요</p>
      <p v-else id="button-info" class="new-help ending"></p>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/user/login')
    }
  },
  created: function () {
    var id = this.$route.params.id
    this.$http.get(`/api/get/wordbook/${id}`)
      .then((response) => {
        this.wordbook = response.data.wordbook
        this.words = this.wordbook.words
        this.progress.all = this.words.length
        this.progress.current = 0 // current num of correct
        this.progress.index = 0 // index of current word
        this.current = this.next()
        this.current.ko = this.current.ko.join(', ')
        this.running = true
        document.getElementById('guess').focus()
        this.move()
      })
  },
  data: function () {
    return {
      wordbook: {},
      words: {},
      current: {},
      progress: {},
      running: true
    }
  },
  methods: {
    key: function (event) {
      this.checkAnswer(this.current._id)
    },
    shuffle: function (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
    },
    next: function () {
      this.shuffle(this.words)
      this.progress.index++;
      return this.words.pop()
    },
    move: function (bar) {
      var bar = document.getElementById('bar')
      var width = 1
      var id = setInterval((src, item) => {
        if (width >= 100) {
          clearInterval(id)
        } else {
          bar.style.width = (this.progress.current / this.progress.all) * 100 + '%'
        }
      }, 100)
    },
    refresh: function () {
      this.$router.go()
    },
    infoHint: function () {
      var _info = document.getElementById('button-info')
      _info.innerHTML = '<strong>? 버튼</strong>을 누르면 힌트가 나와요'
    },
    infoPass: function () {
      var _info = document.getElementById('button-info')
      _info.innerHTML = '<strong>X 버튼</strong>을 누르면 모르는 단어를 패스할 수 있어요'
    },
    infoRefresh: function () {
      var _info = document.getElementById('button-info')
      _info.innerHTML = '<strong>다시하기 버튼</strong>을 누르면 단어장을 다시 풀 수 있어요'
    },
    infoMenu: function () {
      var _info = document.getElementById('button-info')
      _info.innerHTML = '<strong>메뉴 버튼</strong>을 누르면 단어장 목록으로 돌아갈 수 있어요'
    },
    infoClear: function () {
      var _info = document.getElementById('button-info')
      if (!this.running) {
        _info.innerHTML = `${this.progress.all}개 중 ${this.progress.current}개 단어를 맞췄어요`
      } else {
        _info.innerHTML = '주어진 뜻에 맞는 영단어를 입력해 주세요'
      }
    },
    hint: function () {
      alert(this.current.en[0] + '로 시작하는 단어랍니다!')
    },
    pass: function () {
      var _input = document.getElementById('guess')
      _input.value = this.current.en
      _input.disabled = true
      _input.style.borderStyle = 'solid'
      setTimeout((src, item) => {
        _input.value = ''
        _input.disabled = false
        _input.focus()
        _input.style.borderStyle = 'dotted'
        if (this.words.length === 0) {
          this.end()
        } else {
          this.current = this.next()
          this.current.ko = this.current.ko.join(', ')
        }
      }, 500)
    },
    checkAnswer: function (word) {
      var _input = document.getElementById('guess')
      var answer = _input.value
      var token = this.$session.get('jwt')
      this.$http.post(
        '/api/auth/check', {
          word: word,
          answer: answer,
          token: token
        }, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(response => {
          console.log(response)
          if (response.data.success) {
            _input.value = this.current.en
            _input.disabled = true
            _input.style.borderStyle = 'solid'
            _input.style.borderColor = this.color[0]
            setTimeout((src, item) => {
              _input.value = ''
              _input.disabled = false
              _input.focus()
              _input.style.borderStyle = 'dotted'
              _input.style.borderColor = 'rgb(37, 37, 37)'
              this.move()
              this.progress.current++
              if (this.words.length === 0) {
                this.end()
              } else {
                this.current = this.next()
                this.current.ko = this.current.ko.join(', ')
              }
            }, 500)
          } else { // wrong
            var _info = document.getElementById('button-info')
            _info.innerHTML = '<strong style="font-size:40px;">틀렸습니다</strong>'
            _input.style.color = this.color[1]
            _input.style.borderStyle = 'solid'
            _input.style.borderColor = this.color[1]
            setTimeout((src, item) => {
              _info.innerHTML = '주어진 뜻에 맞는 영단어를 입력해 주세요'
              _input.style.color = 'black'
              _input.style.borderStyle = 'dotted'
              _input.style.borderColor = 'rgb(37, 37, 37)'
            }, 800)
          }
        })
    },
    end: function () {
      var _input = document.getElementById('guess')
      _input.disabled = true
      this.running = false
      var _info = document.getElementById('button-info')
      _info.innerHTML = `${this.progress.all}개 중 <strong>${this.progress.current}개 단어</strong>를 맞췄어요`
      alert(`총 ${this.progress.current}점이 지급되었습니다.`)
    },
    getBarStyle: function () {
      return {
        'background-color': this.color[0],
        'background': `linear-gradient(to left, ${this.color[0]}, ${this.color[1]})`
      }
    }
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    color: {
      type: Array,
      required: true
    }
  }
}
</script>
