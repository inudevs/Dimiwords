<template>
  <div id="app">
    <Navigation :color="color"></Navigation>
    <router-view :color="color" :theme="theme"/>
    <toggle-button class="theme-switch" v-if="this.$session.exists()"
      :value="(theme === 'magenta')" @change="changeTheme()"
      :color="{checked: '#EC008C', unchecked: '#552FC9'}" :sync="true"
      :width="100" :height="40" />
  </div>
</template>

<script>
import Navigation from './components/Nav'
export default {
  name: 'App',
  components: {
    'Navigation': Navigation
  },
  created: function () {
    if (this.$session.has('theme')){
      this.theme = 'skyblue'
      this.color = ['#552FC9', '#4296DB']
    }
  },
  data () {
    return {
      theme: 'magenta',
      color: ['#EC008C', '#FC6767']
    }
  },
  methods: {
    changeTheme: function () {
      if (this.theme === 'magenta') {
        this.theme = 'skyblue'
        this.$session.set('theme', 'skyblue')
        this.color = ['#552FC9', '#4296DB']
      } else {
        this.theme = 'magenta'
        this.$session.remove('theme')
        this.color = ['#EC008C', '#FC6767']
      }
    },
    getThemeStyle: function (theme) {
      return {
        'background-image': `linear-gradient(to right, ${theme[0]}, ${theme[1]})`,
        'border-color': theme[0]
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');
#app {
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; */
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
