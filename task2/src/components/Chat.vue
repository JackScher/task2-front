<template>

<div class="body">

  <QuestionDetails v-if="question" :question="question" @CloseDetails="close_question_details"/>

  <br>
  <br>
  <br>

    <div v-for="question_item in questions" :key="question_item.id" @click="question_detail(question_item.id)">
      <hr>
      title: {{question_item.title}}<br>
      content: {{question_item.body}}<br>
      date: {{question_item.date_create}}
      <hr>
    </div>

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

export default {
  name: "Chat",
  components: {
    QuestionDetails
  },
  data() {
    return{
      question: null,
      questions: null,
      user_id: null,

      title: null,
      body: null,

      question_id_check: null,
      question_details: null
    }
  },
  props: ['token'],
  mounted() {
    this.get_questions();
  },
  methods: {
    get_questions() {
        axios.get('http://127.0.0.1:8000/questions/api/questions/', {})
        .then(res => {
          const questions = res.data;
          this.questions = questions
        })
        .catch(err => console.log(err))
    },


    get_current_question(id) {
      axios.get(`http://127.0.0.1:8000/questions/api/questions/?id=${id}`)
      .then(res => {
        this.question = res.data
        console.log(this.question)
      })
      .catch(err => console.log(err))
    },

    create_new_question() {
      let id = 1                  // after confirmation fix will be completed
      axios.post('http://127.0.0.1:8000/questions/api/questions/', {
        token: this.token,
        title: this.title,
        body: this.body,
        user_id: id
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    question_detail(id) {
      this.get_current_question(id)
    },
    close_question_details(item) {
      this.question = item
    }
  }
}
</script>

<style scoped>

</style>