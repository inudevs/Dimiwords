<template>
  <div class="wordbooks">
    <h1>단어장 목록</h1>
    <div v-for="wordbook in words" class="wordbook">
      <div class="header">
        <strong class="title">{{ wordbook.name }}</strong>
        <router-link :to="{ name: 'wordbook', params: { id: wordbook.id }}">더보기</router-link>
      </div>
      <div>
        <span v-for="word in wordbook.words" class="words">
          <span class="word">{{ word.en }}</span>&nbsp;
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api')
    .then((response) => {
      this.words = response.data
    })
  },
  data () {
    return {
      words: []
    }
  }
}
</script>
