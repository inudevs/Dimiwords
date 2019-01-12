<template>
  <div class="body">
    <h1>TEST</h1>
    <div v-if="running">
      <div id="current" v-if="!correct">
        {{current.en}}
        <span class="badge" v-bind:style="{backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})`}">
          <span class="info">전체 정답률</span>
          {{ Math.round(percentage(current.accept, current.submit)*100)/100 + '%' }}
        </span>
      </div>
      <div id="current" v-else>
        <span class="en">
          {{current.en}}
          <span class="badge correct" v-bind:style="{backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})`}">
            정답이예요!
          </span>
        </span><br>
        <span class="ko">
          {{current.ko.join(', ')}}
        </span>
      </div>
      <div id="table">
        <div class="meanings">
          <div v-for="meaning in meanings" class="meaning" v-on:click="check">
            {{meaning}}
          </div>
        </div>
      </div>
      <p id="help" class="new-help">영단어의 뜻에 가장 가까운 카드를 눌러주세요</p>
    </div>
    <div v-else>
      end
    </div>
  </div>
</template>

<style>
#current {
  font-size: 30px;
}
#current .en {
  font-weight: bold;
}
#current .ko {
  font-weight: 300;
  font-family: 'Yeon Sung', cursive;
}
#current span.badge {
  border-radius: 10px;
  color: white;
}
#current span.badge.correct {
  font-size: 18px;
  padding: 7px;
}
#current span.badge span.info {
  font-size: 15px;
}
#table {
  display: table;
  width: 80%;
  margin: auto;
}
.meanings {
  display: table-row;
}
.meaning {
  display: table-cell;
  box-shadow: 0 0 4px 2px rgb(20, 20, 20, 0.1);
  border-radius: 5px;
  padding: 10px;
  font-size: 25px;
  font-family: 'Yeon Sung', cursive;
}
</style>

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
        this.progress.index = 0 // index of current word,
        this.current = this.next()
        console.log(this.current)
        alert('한글 뜻 테스트는 현재 베타 단계이므로 버그가 존재할 수 있으며, 포인트 및 단어별 정답률에 영향을 끼치지 않습니다.')
      })
  },
  data: function () {
    return {
      wordbook: {},
      words: {},
      current: {},
      progress: {},
      running: true,
      correct: false,
      meanings: []
    }
  },
  methods: {
    shuffle: function (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
    },
    updateCards: function () {
      this.$http.get(`/api/get/random/4`)
      .then((response) => {
        console.log(response)
        this.meanings = response.data.result
        this.meanings.push(
          this.current.ko[Math.floor(Math.random() * this.current.ko.length)]
        )
        this.shuffle(this.meanings)
      })
    },
    next: function () {
      if (this.words.length === 0) {
        this.running = false
        return
      }
      this.shuffle(this.words)
      this.progress.index++;
      this.updateCards()
      this.correct = false;
      return this.words.pop()
    },
    check: function (event) {
      var card = event.target
      var meaning = card.innerHTML.trim()
      var help = document.getElementById('help')
      if (this.current.ko.includes(meaning)) {
        card.style.boxShadow = '0 0 5px 4px #7ab38b'
        help.innerHTML = '정답입니다'
        this.correct = true
        setTimeout((src, item) => {
          card.style.boxShadow = '0 0 4px 2px rgb(20, 20, 20, 0.1)'
          help.innerHTML = '영단어의 뜻에 가장 가까운 카드를 눌러주세요'
          this.current = this.next()
          console.log(this.current)
        }, 1200)
      } else {
        card.style.boxShadow = '0 0 3px 2px #EC008C'
        help.innerHTML = '틀렸습니다'
        setTimeout((src, item) => {
          card.style.boxShadow = '0 0 4px 2px rgb(20, 20, 20, 0.1)'
          help.innerHTML = '영단어의 뜻에 가장 가까운 카드를 눌러주세요'
        }, 500)
      }
    },
    percentage: function (ac, sb) {
      var p = (ac / sb) * 100
      return (isNaN(p)) ? 100 : p
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
