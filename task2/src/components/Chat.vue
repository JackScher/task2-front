<template>

<div class="body">

  <QuestionDetails v-if="question" :question="question" @CloseDetails="close_question_details"/>

  <br>
  <br>
  <br>


  <QuestionList @GetCurrentQuestion="SetQuestion" v-if="!question"/>

  <br>
  <br>
  <br>

  <form @submit.prevent="create_new_question">
    Create new question <br>
    title: <input type="text" name="title" v-model="title"><br>
    question: <input type="text" name="body" v-model="body"><br>
    <button type="submit">ask</button>
  </form>


</div>
</template>

<script>
import axios  from 'axios';
import QuestionDetails from "@/components/QuestionDetails";
import QuestionList from "@/components/QuestionList";


export default {
  name: "Chat",
  components: {
    QuestionDetails,
    QuestionList
  },
  data() {
    return{
      question: null,

      user_id: null,
      title: null,
      body: null,

    }
  },
  props: ['token', 'u_id'],
  methods: {
    create_new_question() {
      let id = 1                  // after confirmation fix will be completed
      axios.post('http://127.0.0.1:8000/questions/api/questions/', {
        // 'Auth-Token': this.token,
        Token: this.token,
        title: this.title,
        body: this.body,
        user_id: this.user_id
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    SetQuestion(question) {
      this.question = question
    },
    close_question_details(item) {
      this.question = item
    }
  }
}
</script>

<style scoped>

</style>