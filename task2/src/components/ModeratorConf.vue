<template>

</template>

<script>
import axios from 'axios';

export default {
  name: "ModeratorConf",
  data() {
    return{
      user_id: null,
      url: null
    }
  },
  mounted() {
    const {moderator_query} = this.$route.query;
    this.url = moderator_query;
    this.user_id = localStorage.getItem('user-id');
    this.confirm_moderator()
  },
  methods: {
    confirm_moderator() {
      console.log(this.url)
      console.log(this.user_id)

      axios.post(`http://127.0.0.1:8000/rest-auth/api/user/moderator/`, {
        user: this.url,
        current_user: this.user_id
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>