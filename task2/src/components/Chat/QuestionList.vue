<template>
  <div>

      <div v-if="!question_edit" v-for="question in questions" :key="question.id" >
        <hr>
        <strong>Title:</strong> {{question.title}}<br>
        <strong>Body:</strong> {{question.body}}<br>
        <strong>Asked by:</strong> {{question.user_id.username}}<br>
        <button v-if="group" @click="current_question_edit(question)">edit question</button><br>
        <button @click="get_question_item(question.id)">info</button><br>
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

    <ModeratorQuestionEdit v-if="question_edit" :question="question_edit" @BackToList="from_question_edit_to_list"/>
  </div>
</template>

<script>
import axios from "axios";
import ModeratorQuestionEdit from "@/components/Chat/ModeratorQuestionEdit";

export default {
  components: {ModeratorQuestionEdit},
  name: "QuestionList",
  props: [],
  data() {
    return{
      questions: null,
      group: null,
      question_edit: null
    }
  },
  mounted() {
    this.group = localStorage.getItem('user-group');
    if (this.group !== 'moderator') {
      this.group = null;
    }
    this.get_question_list();

  },
  methods: {
    get_question_list() {
      axios.get('http://127.0.0.1:8000/questions/api/questions/', {})
          .then(res => this.questions=res.data)
          .catch(err => console.log(err))
    },
    get_question_item(item) {
      this.$emit('CurrentQuestion', item)
    },
    current_question_edit(item) {
      console.log('EDIT')
      this.question_edit = item
    },
    from_question_edit_to_list(item) {
      this.question_edit = item
      this.get_question_list()
    }
  }
}
</script>

<style scoped>

</style>