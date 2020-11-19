<template>
  <div>
    <form @submit.prevent="give_an_answer">
      Give an answer <br>
      title: <input type="text" name="title" v-model="title">
      title: <input type="text" name="body" v-model="body">
      <button type="submit">To answer</button>
      <button @click="back">back</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CreateAnswer",
  props: ['answer'],
  data() {
    return{
      title: null,
      body: null
    }
  },
  mounted() {
    console.log(this.answer)
  },
  methods: {
    give_an_answer() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.post('http://127.0.0.1:8000/questions/api/answer/create/', {
        title: this.title,
        body: this.body,
        question_id: this.answer.id,
        user_id: localStorage.getItem('user-id')
      }, {headers})
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    back() {
      this.$emit('ReturnToQuestion', null)
    }
  }
}
</script>

<style scoped>

</style>