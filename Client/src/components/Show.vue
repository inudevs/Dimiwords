<template>
  <div>
    <h1>단어 외우기</h1>
    <input id="guess" v-on:keyup="key"><br>
    <strong>{{ current.ko }}</strong>
  </div>
</template>

<script>
export default {
  created: function () {
    var id = this.$route.params.id;
    this.$http.get(`/api/words/${id}`)
    .then((response) => {
      this.wordbook = response.data;
      this.words = this.wordbook[0].words;
      this.current = this.next();
    })
  },
  data: function () {
    return {
      wordbook: {},
      words: {},
      current: {}
    }
  },
  methods: {
      key: function(event) {
        var _input = document.getElementById('guess');
        if (_input.value == this.current.en){
          console.log(true);
          _input.style.backgroundColor = 'lightgreen';
          _input.style.color = 'white';
          setTimeout((src, item) => {
            _input.value = '';
            _input.style.backgroundColor = 'white';
            _input.style.color = 'black';
            if (this.words.length == 0){
              _input.disabled = true;
              this.current.ko='끝';
            }
            else this.current = this.next();
          }, 500);
        }
      },
      shuffle: function (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
      },
      next: function () {
        this.shuffle(this.words);
        return this.words.pop();
      }
  }
}
</script>
