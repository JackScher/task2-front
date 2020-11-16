<template>

  <form @submit.prevent="close_details">
    <h2>It`s question details</h2>
    <p>Title: {{question[0].title}}</p>
    <p>Content: {{question[0].body}}</p>
    <p>Created: {{question[0].date_create}}</p>
    <p>Updated: {{question[0].date_update}}</p>
    <p>Username: {{this.username}}</p>
    <button type="submit">Close</button>
  </form>

</template>

<script>
import axios from 'axios';

export default {
  name: "QuestionDetails",
  props: ['question'],
  data() {
    return{
      item: null,
      username: null
    }
  },
  methods: {
    close_details() {
      this.$emit('CloseDetails', this.item)
    },
    get_username() {
      console.log(this.question[0].user_id)
      axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.question[0].user_id}`, {
        token: 
      })
      .then(res => res.data)
      .catch(err => console.log(err))
    }
  },
  mounted() {
    this.get_username();
  }
}
</script>

<style scoped>

</style>