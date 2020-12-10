<template>

</template>

<script>
import axios from 'axios';

export default {
  name: "ModeratorConf",
  data() {
    return{
      url: null
    }
  },
  mounted() {
    const {moderator_query} = this.$route.query;
    this.url = moderator_query;
    this.confirm_moderator()
  },
  methods: {
    confirm_moderator() {
      console.log(this.url)
      console.log(this.user_id)

      // axios.post(`http://127.0.0.1:8000/rest-auth/api/user/moderator/`, {
      //   user: this.url,
      // })
      // .then(res => console.log(res))
      // .catch(err => console.log(err))
      axios.put(`http://127.0.0.1:8000/rest-auth/api/user/moderator/${this.url}/`, {
        // user: this.url,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>