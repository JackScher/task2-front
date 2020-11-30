<template>
  <div>
    Title: <input type="text" name="title" v-model="title">
    Body: <input type="text" name="title" v-model="body">
    <button @click="edit_question">Edit</button>
    <button @click="back">back</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "EditQuestion",
  data() {
    return{
      title: null,
      body: null
    }
  },
  props: ['question'],
  mounted() {
    console.log(this.question)
  },
  methods: {
    back() {
      this.$emit('BackToQuestion', null)
    },
    edit_question() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+ localStorage.getItem('user-token')
      headers['Authorization'] = value

      axios.put(`http://127.0.0.1:8000/questions/api/questions/?id=${this.question.id}`, {
        id: this.question.id,
        title: this.title,
        body: this.body,
        user_id: this.question.user_id,
        current_user_id: localStorage.getItem('user-id')
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