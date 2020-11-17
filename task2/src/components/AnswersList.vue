<template>
  <div class="body">
    <div>
      <h3>Answers: </h3>
      <hr>
      <div v-for="answer in answers_list" :key="answer.id" @click="get_current_answer(answer.id)">
        <p>Title: {{answer.title}}</p>
        <p>Content: {{answer.body}}</p>
        <p>Date: {{answer.date_create}}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AnswerDetails from "@/components/AnswerDetails";

export default {
  name: "AnswersList",
  props: ['question_id'],
  components: {
      AnswerDetails
  },
  data() {
    return{
      answers_list: null,
      answer_details: null
    }
  },
  methods: {
    get_all_answers() {
      console.log(this.question_id)
      axios.get(`http://127.0.0.1:8000/questions/api/answers/?question_id=${this.question_id}`, {})
      .then(res => this.answers_list = res.data)
      .catch(err => console.log(err))
    },
    get_current_answer(id) {
      axios.get(`http://127.0.0.1:8000/questions/api/answers/?id=${id}`, {})
      .then(res => {
        this.answer_details=res.data
        this.$emit('GetCurrentAnswer', this.answer_details)
      })
      .catch(err => console.log(err))
    },
  },
  mounted() {
    this.get_all_answers()
  }
}
</script>

<style scoped>

</style>