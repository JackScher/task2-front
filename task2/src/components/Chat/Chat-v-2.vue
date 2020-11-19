<template>
  <div>
    <button @click="create_a_question">new question</button>
    <hr>
    <CreateQuestion :token="token" :u_id="u_id" v-if="new_question" @ListOfQuestions="back_to_question_list_from_new_q"/>
    <QuestionList @CurrentQuestion="get_current_question_data" v-if="!question_id&&!new_question"/>
    <QuestionItem v-if="question_id" :question_id="question_id" @BackToQuestionList="back_to_question_list" @CurrentAnswer="get_current_question_data" />
  </div>
</template>



<script>
import QuestionList from '@/components/Chat/QuestionList.vue';
import QuestionItem from '@/components/Chat/QuestionItem.vue';
import CreateQuestion from "@/components/Chat/CreateQuestion";


export default {
  name: "Chat-v-2",
  components: {
    QuestionList,
    QuestionItem,
    CreateQuestion,
  },
  props: ['token', 'u_id'],
  data() {
    return{
      question_id: null,
      answer_id: null,
      new_question: null
    }
  },
  mounted() {},
  methods: {
    get_current_question_data(id) {
      this.question_id = id
    },
    back_to_question_list(item) {
      this.question_id = item
    },
    create_a_question() {
      this.new_question = true
    },
    back_to_question_list_from_new_q(item) {
      this.new_question = item
    }
  }
}
</script>

<style scoped>

</style>