<template>

  <form @submit.prevent="close_answer_details">
    <h3>Answer details: </h3>

    <p>Title: {{current_answer[0].title}}</p>
    <p>Content: {{current_answer[0].body}}</p>
    <p v-if="current_answer[0].date_update===current_answer[0].date_create">Date: {{current_answer[0].date_create}}</p>
    <p v-if="current_answer[0].date_update!==current_answer[0].date_create">Updated: {{current_answer[0].date_update}}</p>
    <p>Answered by: {{this.username}}</p>
    <button type="submit">Close</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "AnswerDetails",
  data() {
    return{
      answer_item: null,
      username: null
    }
  },
  props: ['current_answer'],
  methods: {
    close_answer_details() {
      this.$emit('CloseAnswer', this.answer_item)
    },
    get_username() {
      axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.current_answer[0].user_id}`, {})
      .then(res => {
        this.username = res.data[0].username
      })
      .catch(err => console.log(err))
    },
  },
  mounted() {
    this.get_username()
  }
}
</script>

<style scoped>

</style>