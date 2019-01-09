<template>
  <div class="body">
    <h1>SCOREBOARD</h1>
    <p class="new-info">
      단어 하나를 맞출 때마다 <strong>1점</strong>, 새로운 단어를 등록하면 <strong>2점</strong>, 단어장을 등록하면 <strong>5점</strong>을 받아요
    </p>
    <div class="ranking">
      <table>
        <thead>
          <tr>
            <td>RANK</td>
            <td>NAME</td>
            <td>INTRO</td>
            <td>POINTS</td>
            <td>CORRECT(%)</td>
          </tr>
        </thead>
        <tbody>
          <tr class="user" v-bind:class="{ first: page == 1 }" v-for="(user, rank) in users">
            <td class="rank">{{ page_rank + rank+1 }}</td>
            <td class="name">
              <i class="fas fa-crown" v-if="(page_rank + rank) < 3"></i> {{ user.name }}
              <span class="department" v-bind:style="{ backgroundColor: colors[user.department] }">
                  {{ departments[user.department] }}
              </span>
            </td>
            <td>{{ user.intro }}</td>
            <td>{{ user.points }}</td>
            <td>{{ Math.round(percentage(user.accept, user.submit)*100)/100 + '%' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin: 30px;">
      <i class="fas fa-caret-left fa-3x" @click="pagePrev"
          v-bind:style="{ 'color': (page > 1) ? 'black' : 'lightgray' }"></i>
      <span class="page">{{ page }}</span>
      <i class="fas fa-caret-right fa-3x" @click="pageNext"
          v-bind:style="{ 'color': (page < this.page_max) ? 'black' : 'lightgray' }"></i>
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
  created () {
    this.updateUsers()
  },
  data () {
    return {
      users: [],
      page: 1,
      page_max: undefined,
      page_rank: 0,
      departments: ['EB', 'DC', 'WP', 'HD'],
      colors: ['#424242', '#FF0080', '#9A2EFE', '#3A01DF']
    }
  },
  methods: {
    updateUsers: function () {
      this.$http.get('/api/list/rank', {
        params: { page: this.page }
      })
        .then((response) => {
          this.users = response.data.result.docs
          if (this.page_max == null) this.page_max = response.data.result.pages
        })
    },
    pagePrev: function () { // previous page
      if (this.page > 1) { // only if prev page is available
        this.page--
        this.updateUsers()
        this.page_rank -= 20
      }
    },
    pageNext: function () { // next page
      if (this.page < this.page_max) { // only if next page is available
        this.page++
        this.updateUsers()
        this.page_rank += 20
      }
    },
    percentage: function (ac, sb) {
      var p = (ac / sb) * 100
      return (isNaN(p)) ? 100 : p
    }
  }
}
</script>
