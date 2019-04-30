<script>
export default {
  name: 'Splash',
  created() {
    if (localStorage.getItem('authToken')==null)this.$router.push("/login")
    else this.$router.push("/main")
  }
}
</script>
