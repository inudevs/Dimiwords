<template>
  <div></div>
</template>

<script>
export default {
  created () {
    alert('준비중입니다.')
    this.$router.go(-1)
  }
}
</script>
