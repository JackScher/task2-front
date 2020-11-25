<template>
  <div>
    answer.comment
    <form @submit.prevent="create_answer_comment">
      text: <input type="text" name="text" v-model="text">
      <button type="submit">comment</button>
      <button @click="back">back</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AnswerComment",
  props: ['answer', 'question'],
  mounted() {
    this.id = this.question.id
  },
  data() {
    return{
      text: null,
      id: null
    }
  },
  methods: {
    create_answer_comment() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value

      axios.post('http://127.0.0.1:8000/questions/api/comment/create/', {
        text: this.text,
        user_id: localStorage.getItem('user-id'),
        content_type: 20,
        object_id: this.answer.id
      }, {headers})
      .then(res => this.$emit('BackToQuestion', this.id))
      .catch(err => console.log(err))
    },
    back() {
      this.$emit('BackToQuestion', this.id)
    }
  }
}
</script>

<style scoped>

</style>