<template>
  <div>
    question.comment
    <form @submit.prevent="create_question_comment">
      text: <input type="text" name="text" v-model="text">
      <button type="submit">comment</button>
      <button @click="back">back</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "QuestionComment",
  props: ['question'],
  data() {
    return{
      text: null,
      question_item: null
    }
  },
  methods: {
    create_question_comment() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value


      axios.post('http://127.0.0.1:8000/questions/api/comment/create/', {
        text: this.text,
        user_id: localStorage.getItem('user-id'),
        content_type: 19,
        object_id: this.question.id
      }, {headers})
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    back() {
      this.$emit('BackToQuestion', null)
    }
  }
}
</script>

<style scoped>

</style>