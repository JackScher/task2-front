<template>
  <div>
    <div v-for="question in questions" :key="question.id" @click="get_question_item(question.id)">
      <hr>
      <strong>Title:</strong> {{question.title}}<br>
      <strong>Body:</strong> {{question.body}}<br>
      <strong>Asked by:</strong> {{question.user_id.username}}<br>
      <strong>Tags:</strong>
        <div v-for="tag in question.tags">
          {{tag.name}}
        </div>
      <br>
      <strong>Comments:</strong>
        <div v-for="comment in question.comments">
          {{comment.text}}
        </div>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuestionList",
  props: [],
  data() {
    return{
      questions: null,
    }
  },
  mounted() {
    this.get_question_list()
  },
  methods: {
    get_question_list() {
      axios.get('http://127.0.0.1:8000/questions/api/questions/', {})
          .then(res => this.questions=res.data)
          .catch(err => console.log(err))
    },
    get_question_item(item) {
      this.$emit('CurrentQuestion', item)
    }
  }
}
</script>

<style scoped>

</style>