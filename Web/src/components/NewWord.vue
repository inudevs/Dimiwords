<template>
  <div class="new">
    <h1>단어장 만들기</h1>
    <p>단어장에 추가할 단어를 선택하세요</p>
    <table class="word-table">
      <tr v-for="word in all_words.words">
        <td><strong>{{ word.en }}</strong></td>
        <td><strong>뜻: </strong>{{ word.ko.join(', ') }}</td>
      </tr>
    </table>
    <p>새로운 단어를 추가하세요</p>
    <div class="add-words">
      <input type="text" name="english" placeholder="영단어" v-model="en">
        <div v-for="(korean, index) in ko">
          <span>{{ index+1 }}번째 뜻: </span><input v-model="ko[index]">
        </div>
      <button @click="addKo">한국어 뜻 추가하기</button>
      <button @click="addWord">단어 추가하기</button>
    </div>
    <div class="words">{{ words }}</div>
  </div>
</template>

<script>
export default {
  created () {
    this.updateWords();
  },
  data () {
    return {
      all_words: [],
      words: [],
      en: '',
      ko: []
    }
  },
  methods: {
    updateWords: function () {
      this.$http.get('/api/words')
      .then((response) => {
        this.all_words = response.data
      })
    },
    addKo: function () {
      this.ko = this.ko.filter(Boolean); // delete empty korean meanings
      this.ko.push('');
    },
    checkWord: function () {
      var checkKo = false;
      for (let i = 0; i < this.ko.length; i++) {
        if (this.ko[i].length > 0){
            checkKo = true; // pass if more then one korean meanings is not empty
            break;
        }
      }
      if (checkKo && this.en.length > 0) return true; // english meaning must be valid
      return false;
    },
    addWord: function () {
      if (!this.checkWord()){ // check if input is valid
        alert('단어를 입력해 주세요!');
        return false;
      };
      this.ko = this.ko.filter(Boolean); // delete empty korean meanings
      var word = {'en': this.en, 'ko': this.ko};
      console.log(word);

      // add to DB
      this.$http.post(
        '/api/new/word', word, { 
          headers: { 'Content-type': 'application/json' }
        })
      .then(response => {
        console.log(response);
        
        // update all_words
        this.updateWords();
      });
    }
  }
}
</script>
