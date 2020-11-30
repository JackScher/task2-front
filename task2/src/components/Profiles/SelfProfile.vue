<template>
  <div>
    <div>
      <router-link to="/">Back</router-link>
      <div v-if="!user&&!question&&!answer">
        <br>
        Name: {{profile[0].username}}<br>
        Email: {{profile[0].email}}<br>
        Info: {{profile[0].about_yourself}}<br>
        Status: {{profile[0].status}}<br>
        Rank: {{profile[0].rank}}<br>
        Working/learning at: {{profile[0].place_of_employment}}<br>
        Location: {{profile[0].location}}<br>
        Avatar: {{profile[0].avatar}}<br>
        <button @click="set_user(profile[0])">Change</button>
        <hr>
        <p>Answers: </p>
        <div v-for="answer in profile[0].answers">
          title: {{answer.title}}<br>
          body: {{answer.body}}
          <button @click="edit_current_answer(answer)">edit</button>
        </div>
        <hr>
        <p>Questions: </p>
        <div v-for="question in profile[0].questions">
          title: {{question.title}}<br>
          body: {{question.body}}
          <button @click="edit_current_question(question)">edit</button>
        </div>
      </div>
    </div>
    <ChangeProfile v-if="user" :user="user" @Changed="changed"/>
    <EditQuestion v-if="question" :question="question" @BackToQuestion="from_question_to_profile"/>
    <EditAnswer v-if="answer" :answer="answer" @BackToQuestion="from_answer_to_profile"/>

  </div>
</template>

<script>
import axios from 'axios';
import ChangeProfile from "@/components/Profiles/ChangeProfile";
import EditQuestion from "@/components/Chat/EditQuestion";
import EditAnswer from "@/components/Chat/EditAnswer";


export default {
  name: "SelfProfile",
  components: {
    ChangeProfile, EditQuestion, EditAnswer
  },
  data() {
    return{
      profile: null,
      id: null,
      token: null,
      user: null,
      question: null,
      answer: null
    }
  },
  mounted() {
    this.set_data();
    this.get_self_profile();
  },
  methods: {
    get_self_profile() {
      axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.id}`, {})
      .then(res => {
        this.profile = res.data
      })
      .catch(err => console.log(err))
    },
    set_data() {
      this.id = localStorage.getItem('user-id')
      this.token = localStorage.getItem('user-token')
    },
    set_user(item) {
      this.user = item
    },
    changed(item) {
      this.get_self_profile()
      this.user = item
    },
    edit_current_question(item) {
      this.question = item
    },
    from_question_to_profile(item) {
      this.question = item
      this.get_self_profile()
    },
    edit_current_answer(item) {
      this.answer = item
    },
    from_answer_to_profile(item) {
      this.answer = item
      this.get_self_profile()
    }
  }
}
</script>

<style scoped>

</style>