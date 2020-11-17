<template>
  <div>
    <h1>Question list: </h1>
    <div v-for="question_item in questions" :key="question_item.id" @click="get_current_question(question_item.id)">
      <hr>
      title: {{question_item.title}}<br>
      content: {{question_item.body}}<br>
      date: {{question_item.date_create}}
      <hr>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuestionList",
  data() {
    return {
      questions: null,
    }
  },
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
            this.$emit('GetCurrentQuestion', this.question)
          })
          .catch(err => console.log(err))
    },
  }
}
</script>

<style scoped>

</style>