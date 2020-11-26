<template>
  <div>
    <h3>Ask question</h3>
    <form @submit.prevent="create_new_question">
      Create new question <br>
      title: <input type="text" name="title" v-model="title"><br>
      question: <input type="text" name="body" v-model="body"><br>
      <button type="submit">ask</button>
      <button @click="back">back</button>
    </form>
    <hr>
  </div>
</template>

<script>
import axios from "axios";
import CreateQuestion from "@/components/Chat/CreateQuestion";


export default {
  name: "CreateQuestion",
  components: {
    CreateQuestion
  },
  data() {
    return{
      user_id: null,
      title: null,
      body: null,
    }
  },
  props: ['token', 'u_id'],
  methods: {
    create_new_question() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      // let value = 'Token '+this.token
      let value = 'Token '+ localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.post('http://127.0.0.1:8000/questions/api/question/create/', {
        title: this.title,
        body: this.body,
        // user_id: this.u_id
        user_id: localStorage.getItem('user-id')
      }, {headers})
          .then(res => this.$emit('ListOfQuestions', null))
          .catch(err => console.log(err))
    },
    back() {
      this.$emit('ListOfQuestions', null)
    }
  }
}
</script>

<style scoped>

</style>