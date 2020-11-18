<template>
  <div>
    <CreateQuestion :token="token" :u_id="u_id" />
    <QuestionList @CurrentQuestion="get_current_question_data" v-if="!question_id"/>
    <QuestionItem v-if="question_id" :question_id="question_id" @BackToQuestionList="back_to_question_list" @CurrentAnswer="get_current_answer_data" />
  </div>
</template>

<!--&&-->

<script>
import axios from 'axios';
import QuestionList from '@/components/Chat/QuestionList.vue';
import QuestionItem from '@/components/Chat/QuestionItem.vue';
import CreateQuestion from "@/components/Chat/CreateQuestion";

export default {
  name: "Chat-v-2",
  components: {
    QuestionList,
    QuestionItem,
    CreateQuestion
  },
  props: ['token', 'u_id'],
  data() {
    return{
      question_id: null,
      answer_id: null
    }
  },
  mounted() {},
  methods: {
    get_current_question_data(id) {
      this.question_id = id
    },
    back_to_question_list(item) {
      this.question_id = item
    }
  }
}
</script>

<style scoped>

</style>