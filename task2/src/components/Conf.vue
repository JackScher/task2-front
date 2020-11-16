<template>

</template>

<script>
import axios from 'axios';

export default {
  name: "Conf",
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    const {URLquery} = this.$route.query;
    this.url = URLquery;
    this.email_confirm(this.url);
  },
  methods: {
    email_confirm(url) {
      console.log(url)
      axios.post(`http://127.0.0.1:8000/rest-auth/registration/account-confirm-email/${url}`, {}
          // {
          //   key: url,
          // }
          ).then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>