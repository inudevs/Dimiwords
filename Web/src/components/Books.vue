<template>
  <div class="body">
    <h1>WORDBOOKS</h1>
    <div id="table">
      <div class="row" v-for="i in Math.ceil(wordbooks.length / 3)">
        <div v-for="wordbook in wordbooks.slice((i - 1) * 3, i * 3)" class="cell">
          <span class="length" 
            :style="{backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})`}">
              {{wordbook.len}}
          </span>
          <h4>{{ (!wordbook.name) ? '제목 없음' : wordbook.name }}</h4>
          <p>{{ (!wordbook.intro) ? '설명 없음' : wordbook.intro }}</p>
          <div class="words">
            <span v-for="word in wordbook.words">
              <a class="word" href="#" v-bind:class="{ 'blue': (theme === 'skyblue') }">
                {{ word.en }}
              </a>&nbsp;
            </span>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <span><i class="fas fa-user"></i> {{wordbook.user}}</span><br>
          <div class="study">
            <router-link :to="{ name: 'test_en', params: { id: wordbook._id }}" tag="button">
              <i class="fas fa-play"></i> 영단어 맞추기
            </router-link>
            <router-link :to="{ name: 'test_ko', params: { id: wordbook._id }}" tag="button">          
              <i class="fas fa-check-square"></i> 한글 뜻 맞추기
            </router-link>
            <router-link :to="{ name: 'learn', params: { id: wordbook._id }}" tag="button">   
              <i class="fas fa-book"></i> 플래시 카드
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!Object.keys(wordbooks).length">
      <span>단어장이 없어요!</span>
    </div>
    <div>
      <i class="fas fa-caret-left fa-3x" @click="pagePrev"
          v-bind:style="{ 'color': (page > 1) ? 'black' : 'lightgray' }"></i>
      <span class="page">{{ page }}</span>
      <i class="fas fa-caret-right fa-3x" @click="pageNext"
          v-bind:style="{ 'color': (page < this.page_max) ? 'black' : 'lightgray' }"></i>
    </div>
    <router-link :to="{ name: 'new_wordbook' }" class="link new-wordbook">
      단어장 추가하기
    </router-link>
  </div>
</template>

<style>
p {
  margin-bottom: 0.5rem;
}
h4 {
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
}
.words {
  font-size: 13px;
}
.word {
  padding: 3px;
}
#table {
  display: table;
  width: 100%;
  border-spacing: 12px 20px;
}
.row {
  display: table-row;
  width: 100%;
}
.cell {
  position: relative;
  display: table-cell;
  box-shadow: 0 0 4px 2px rgb(20, 20, 20, 0.1);
  color: black;
  border-radius: 5px;
  max-width: 20px;
  height: 100px;
  padding: 5px;
  margin: auto;
}
@media (max-width: 600px) {
  #table {
    display: inline;
  }
  .row {
    display: flex;
  }
  .cell {
    display: block;
    min-width: 100%;
    height: auto;
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
.cell .length {
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
.study button {
  color: white;
  border-radius: 8px;
  padding: 3px;
  background-color: rgb(66, 66, 66);
  margin: 2px;
}
.study button:hover {
  background-color: black;
}
</style>

<script>
export default {
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/user/login')
    }
  },
  created () {
    this.updateWordbooks()
    // this.color = this.$session.get('color')
    // this.subject = ['eb', 'dc', 'wp', 'hd'][this.$session.get('user').department]
  },
  data () {
    return {
      wordbooks: [],
      page: 1,
      page_max: undefined
    }
  },
  methods: {
    updateWordbooks: function () {
      this.$http.get('/api/list/wordbooks', {
        params: { page: this.page }
      })
        .then((response) => {
          this.wordbooks = response.data.result.docs
          if (this.page_max == null) this.page_max = response.data.result.pages
        })
    },
    pagePrev: function () { // previous page
      if (this.page > 1) { // only if prev page is available
        this.page--
        this.updateWordbooks()
      }
    },
    pageNext: function () { // next page
      if (this.page < this.page_max) { // only if next page is available
        this.page++
        this.updateWordbooks()
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
