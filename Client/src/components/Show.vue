<template>
  <div>
    <h1>단어 외우기</h1>
    <strong id="question">
      <span v-if="running">{{ current.ko }}</span>
      <span v-else>끝</span>
    </strong><br>
    <div id="progress">
      <div id="bar"><span id="time">{{ (progress.current/progress.all || 0)*100 + '%' }}</span></div>
    </div>
    <input id="guess" v-if="running" v-on:keyup="key">
    <div v-if="!running">
      <i class="fas fa-redo fa-3x" v-on:click="refresh"></i>
      <router-link :to="{ name: 'index' }" class="link">
        <i class="fas fa-bars fa-3x"></i>
      </router-link>
    </div>
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
      this.progress.all = this.words.length;
      this.progress.current = 0;
      this.current = this.next();
      this.current.ko = this.current.ko.join(', ');
      this.running = true;
      document.getElementById('guess').focus();
      this.move();
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
      key: function(event) {
        var _input = document.getElementById('guess');
        if (_input.value.toLowerCase() == this.current.en){
          _input.value = this.current.en;
          _input.disabled = true;
          _input.style.borderStyle = 'solid';
          _input.style.borderColor = '#EC008C';
          setTimeout((src, item) => {
            _input.value = '';
            _input.disabled = false;
            _input.focus();
            _input.style.borderStyle = 'dotted';
            _input.style.borderColor = 'rgb(37, 37, 37)';
            this.move();
            this.progress.current++;
            if (this.words.length == 0){
              _input.disabled = true;
              this.running = false;
            }
            else {
              this.current = this.next();
              this.current.ko = this.current.ko.join(', ');
            }
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
      },
      move: function (bar) {
        var bar = document.getElementById('bar');
        var width = 1;
        var id = setInterval((src, item) => {
          if (width >= 100) {
            clearInterval(id);
          } else {
            bar.style.width = (this.progress.current/this.progress.all)*100 + '%';
            // console.log(this.progress)
          }
        }, 100);
      },
      refresh: function () {
        this.$router.go();
      }
  }
}
</script>
