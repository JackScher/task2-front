<template>
  <div>
    moderator.answer.edit
    Title: <input type="text" name="title" v-model="title">
    Body: <input type="text" name="title" v-model="body">
    <button @click="edit_answer">Edit</button>
    <button @click="back">back</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModeratorAnswerEdit",
  props: ['answer', 'question'],
  data() {
    return{
      title: null,
      body: null,
      id: null
    }
  },
  mounted() {
    this.id = this.question.id
    console.log(this.id)
  },
  methods: {
    back() {
      this.$emit('BackToQuestion', this.id)
    },
    edit_answer() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+ localStorage.getItem('user-token')
      headers['Authorization'] = value

      axios.put(`http://127.0.0.1:8000/questions/api/moderator/answer/edit/?id=${this.answer.id}`, {
        id: this.answer.id,
        title: this.title,
        body: this.body,
        user_id: this.answer.user_id.id,
        current_user_id: localStorage.getItem('user-id'),
        group: localStorage.getItem('user-group')
      }, {headers})
        .then(res => {
          console.log(res)
          this.back()
        })
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>