<template>
  <div>
    <div v-if="!answer&&!question_comment&&!answer_comment&&!foreign_user_profile" class="body">
      <h3><strong>Question:</strong> </h3>
      <a @click="get_user_profile_id(question_item.user_id)"><strong>Asked by:</strong> {{question_item.user_id.username}}</a><br>
      <strong>Title:</strong> {{question_item.title}}<br>
      <strong>Body:</strong> {{question_item.body}}<br>
      <strong>Tags:</strong>
        <div v-for="tag in question_item.tags">
          {{tag.name}}
        </div>

<!--      <button @click="estimate_current_question(question_item, 'plus')">Like</button>-->
<!--      <button @click="estimate_current_question(question_item, 'minus')">DislikeLike</button>-->

      <button @click="estimate_current_question(question_item, 'plus')">Like</button>
      <button @click="estimate_current_question(question_item, 'minus')">DislikeLike</button>



      <p><strong>Comments:</strong></p>
        <div v-for="comment in question_item.comments">
          {{comment.text}}
        </div>
      <button @click="back">back</button>
      <button @click="create_answer(question_item)">Answer</button>
      <button @click="create_question_comment(question_item)">Comment</button>
      <hr>
      <h3>Answers: </h3>
      <div v-for="answer in question_item.answers" @click="get_current_answer(answer.id)">
        <a @click="get_user_profile_id(question_item.user_id)"><strong>Answered by:</strong> {{answer.user_id.username}}</a><br>
        <strong>Title:</strong> {{answer.title}}<br>
        <strong>Body:</strong> {{answer.body}}<br>
        <strong>Comments:</strong>
        <div v-for="comment in answer.comments">
          {{comment.text}}
        </div>
        <button @click="create_answer_comment(answer, question_item)">comment</button>
        <hr>
      </div>
    </div>

    <CreateAnswer v-if="answer" :answer="answer" @ReturnToQuestion="return_to_question"/>
    <QuestionComment v-if="question_comment" :question="question_comment" @BackToQuestion="from_qcomment_to_question"/>
    <AnswerComment v-if="answer_comment" :answer="answer_comment" :question="question_item" @BackToQuestion="from_acomment_to_question"/>
    <ForeignProfile v-if="foreign_user_profile" :user="foreign_user_profile" @BackToQuestion="from_foreign_profile_to_question"/>
  </div>
</template>

<script>
import axios from 'axios';
import CreateAnswer from "@/components/Chat/CreateAnswer";
import QuestionComment from "@/components/Chat/QuestionComment";
import AnswerComment from "@/components/Chat/AnswerComment";
import ForeignProfile from "@/components/Profiles/ForeignProfile";

export default {
  name: "QuestionItem",
  components: {
    CreateAnswer, QuestionComment, AnswerComment, ForeignProfile
  },
  props: ['question_id'],
  data() {
    return{
      question_item: null,
      answer: null,
      question_comment: null,
      answer_comment: null,
      foreign_user_profile: null
    }
  },
  mounted() {
    this.get_current_question();
    // console.log('ID:'+this.question_id)
  },
  methods: {
    get_current_question() {
      // console.log(this.question_id)
      axios.get(`http://127.0.0.1:8000/questions/api/question/item/?id=${this.question_id}`, {})
      .then(res => {
        this.question_item = res.data[0]
      })
      .catch(err => console.log(err))
    },
    get_current_answer(answer) {
      this.$emit('CurrentAnswer', answer)
    },
    back() {
      this.$emit('BackToQuestionList', null)
    },
    create_answer(item) {
      this.answer = item
    },
    return_to_question(item) {
      this.get_current_question()
      this.answer = item
    },
    create_question_comment(item) {
      this.question_comment = item
    },
    from_qcomment_to_question(item) {
      this.get_current_question()
      this.question_comment = item
    },
    from_acomment_to_question(item) {
      axios.get(`http://127.0.0.1:8000/questions/api/question/item/?id=${item}`, {})
      .then(res => {
        this.question_item = res.data[0]
      })
      .catch(err => console.log(err))

      this.answer_comment = null
    },
    create_answer_comment(item, question) {
     this.answer_comment = item
     this.question_item = question
    },
    get_user_profile_id(item) {
      this.foreign_user_profile = item
    },
    from_foreign_profile_to_question(item) {
      this.foreign_user_profile = item
    },


    // estimate_current_question(question, mode) {
    //   let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    //   let value = 'Token '+localStorage.getItem('user-token')
    //   headers['Authorization'] = value
    //   console.log(headers)
    //
    //   axios.put(`http://127.0.0.1:8000/rest-auth/api/user/update/?id=${question.user_id.id}`, {
    //     id: question.user_id.id,
    //     event: mode
    //   }, {headers})
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // },

    estimate_current_question(question, mode) {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.post(`http://127.0.0.1:8000/questions/api/vote/`, {
        user_id: question.user_id.id,
        voter: localStorage.getItem('user-id'),
        mode: mode,
        content_type: 15,
        object_id: question.id
      }, {headers})
          .then(res => console.log(res))
          .catch(err => console.log(err))
    },
  }
}
</script>

<style scoped>

</style>