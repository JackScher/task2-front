<template>
  <div>
    <div class="body">
      <h3><strong>Question:</strong> </h3>
      <strong>Asked by:</strong> {{question_item.username}}<br>
      <strong>Title:</strong> {{question_item.title}}<br>
      <strong>Body:</strong> {{question_item.body}}<br>
      <strong>Tags:</strong>
        <div v-for="tag in question_item.tags">
          {{tag.name}}
        </div>
      <p><strong>Comments:</strong></p>
        <div v-for="comment in question_item.comments">
          {{comment.text}}
        </div>
      <button @click="back">back</button>
      <hr>
      <h3>Answers: </h3>
      <div v-for="answer in question_item.answers" @click="get_current_answer(answer.id)">
        <strong>Answered by:</strong> {{answer.user_id.username}}<br>
        <strong>Title:</strong> {{answer.title}}<br>
        <strong>Body:</strong> {{answer.body}}<br>
        <strong>Comments:</strong>
        <div v-for="comment in answer.comments">
          {{comment.text}}
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "QuestionItem",
  props: ['question_id'],
  data() {
    return{
      question_item: null,
    }
  },
  mounted() {
    this.get_current_question()
  },
  methods: {
    get_current_question() {
      axios.get(`http://127.0.0.1:8000/questions/api/question/item/?id=${this.question_id}`, {})
      .then(res => {
        this.question_item = res.data[0]
      })
      .catch(err => console.log(err))
    },
    get_current_answer(answer) {
      // console.log(answer)
      this.$emit('CurrentAnswer', answer)
    },
    back() {
      this.$emit('BackToQuestionList', null)
    }
  }

}
</script>

<style scoped>

</style>