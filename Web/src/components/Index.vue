<template>
  <div class="body">
    <h1>HOME</h1>
    <div>
    </div>
    <div id="table">
      <div class="row">
        <div class="cell">
          <h3>내가 최근 추가한 단어</h3>
          <table class="recents">
            <tr class="recent" v-for="word in recents">
              <td class="en" :style="{color: color[0]}">
                {{word.en}}
              </td>
              <td class="ko">
                {{word.ko.join(', ')}}
              </td>
              <td><button v-on:click="speak(word.en)">발음</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>  
</template>

<style>
  div#table {
    width: 95%;
  }
  div.cell {
    padding-top: 10px;
  }
  div.cell h3 {
    font-weight: bold;
  }
  div.cell table {
    margin: auto;
  }
  tr.recent td.en {
    font-weight: bold;
    border-radius: 10px;
    padding: 2px;
  }
</style>

<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/user/login')
    }
  },
  data () {
    return {
      token: this.$session.get('jwt'),
      recents: []
    }
  },
  created: function () {
    this.updateRecent()
  },
  methods: {
    updateRecent: function () {
      this.$http.post('/api/get/recent', {
        'token': this.token
      }, {
        headers: { 'Content-type': 'application/json' }
      })
        .then((response) => {
          window.console.log(response)
          this.recents = response.data.recents
        })
    },
    speak: function (en) {
      responsiveVoice.speak(en)
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
