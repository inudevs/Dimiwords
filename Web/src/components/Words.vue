<template>
  <div class="body">
    <h1>WORDS</h1>
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
