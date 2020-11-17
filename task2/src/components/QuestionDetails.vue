<template>
  <div class="body">
    <div v-if="!answer_details">
      <form @submit.prevent="close_details">
        <h2>It`s question details</h2>
        <p>Title: {{question[0].title}}</p>
        <p>Content: {{question[0].body}}</p>
        <p v-if="question[0].date_update===question[0].date_create">Date: {{question[0].date_create}}</p>
        <p v-if="question[0].date_update!==question[0].date_create">Updated: {{question[0].date_update}}</p>
        <p>Name: {{this.username}}</p>
        <button type="submit">Close</button>
        <hr>
      </form>
      <br>
      <br>
        <AnswersList :question_id="question[0].id" @GetCurrentAnswer="get_current_answer"/>
    </div>

    <AnswerDetails v-if="answer_details" @CloseAnswer="close_answer_detail" :current_answer="answer_details"/>
  </div>
</template>

<script>
import axios from 'axios';
import AnswersList from "@/components/AnswersList";
import AnswerDetails from "@/components/AnswerDetails";

export default {
  name: "QuestionDetails",
  components: {
    AnswersList,
    AnswerDetails
  },
  props: ['question'],
  data() {
    return{
      item: null,
      username: null,
      answer_details: null
    }
  },
  methods: {
    close_details() {
      this.$emit('CloseDetails', this.item)
    },
    get_username() {
      axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.question[0].user_id}`, {})
      .then(res => {
        this.username = res.data[0].username
      })
      .catch(err => console.log(err))
    },
    get_current_answer(answer_detail_list) {
      this.answer_details = answer_detail_list
      // console.log(answer_detail_list)
    },
    close_answer_detail(item) {
      this.answer_details = item
    }
  },
  mounted() {
    this.get_username();
  }
}
</script>

<style scoped>

</style>