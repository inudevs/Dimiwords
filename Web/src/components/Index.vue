<template>
  <div class="wordbooks">
    <h1>단어장 목록</h1>
    <div v-for="wordbook in wordbooks" class="wordbook rounded-corners-gradient-borders">
      <router-link :to="{ name: 'show', params: { id: wordbook._id }}" class="link">
        <div class="header">
          <strong class="title">{{ wordbook.name }}</strong>
          <p class="intro">
            {{ wordbook.intro }}<br>
            <strong class="author">{{ '-' + wordbook.user + '-' }}</strong>
          </p>
        </div>
        <div class="words">
          <span v-for="word in wordbook.words">
            <a class="word" href="#">{{ word.en }}</a>&nbsp;
          </span>
          <router-link v-if="wordbook.len > 5" :to="{ name: 'show', params: { id: wordbook._id }}">
            <i class="fas fa-ellipsis-h"></i>
          </router-link>
        </div>
      </router-link>
    </div>
    <div v-if="!Object.keys(wordbooks).length">
      <span>단어장이 없어요!</span>
    </div>
    <div style="margin-bottom: 30px;">
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

<script>
export default {
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/user/login')
    }
  },
  created () {
    this.updateWordbooks();
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
        params: {page: this.page}
      })
      .then((response) => {
        this.wordbooks = response.data.result.docs
        if (this.page_max == null) this.page_max = response.data.result.pages
      })
    },
    pagePrev: function () { // previous page
        if (this.page > 1) { // only if prev page is available
          this.page--;
          this.updateWordbooks();
        }
      },
    pageNext: function () { // next page
      if (this.page < this.page_max) { // only if next page is available
        this.page++;
        this.updateWordbooks();
      }
    }
  }
}
</script>
