<template>
  <div class="body">
    <h1>WORDS</h1>
    <div>
      <a href="https://github.com/CIVAR-DIMIGO/Dimiwords" target="_blank">
        <img src="../assets/civar-logo.png" width="200px"/>
      </a>
      <h2>2019 CIVAR</h2>
      <p>서비스 준비중입니다.</p>
    </div>
  </div>  
</template>

<script>
export default {
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/user/login')
    }
  }
}
</script>
