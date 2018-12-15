<template>
  <div class="wordbooks">
    <h1>단어장 목록</h1>
    <div v-for="wordbook in words" class="wordbook rounded-corners-gradient-borders">
      <router-link :to="{ name: 'show', params: { id: wordbook._id }}" class="link">
        <div class="header">
          <strong class="title">{{ wordbook.name }}</strong>
          <p>{{ wordbook.intro }}</p>
        </div>
        <div class="words">
          <span v-for="word in wordbook.words">
            <a class="word" href="#">{{ word.en }}</a>&nbsp;
          </span>
          <router-link :to="{ name: 'show', params: { id: wordbook._id }}">
            <i class="fas fa-ellipsis-h"></i>
          </router-link>
        </div>
      </router-link>
    </div>
    <div v-if="!Object.keys(words).length">
      <span>단어장이 없어요!</span>
    </div>
    <router-link :to="{ name: 'new_wordbook' }" class="link new-wordbook">
      단어장 추가하기
    </router-link>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api')
    .then((response) => {
      this.words = response.data.wordbooks
    })
  },
  data () {
    return {
      words: []
    }
  }
}
</script>
