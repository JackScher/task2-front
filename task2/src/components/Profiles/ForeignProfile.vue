<template>
  <div>
    <h3>Foreign profile:</h3>
    Username: {{user_profile[0].username}}
    Email: {{user_profile[0].email}}<br>
    Info: {{user_profile[0].about_yourself}}<br>
    Status: {{user_profile[0].STATUS_CHOICES}}<br>
    Rank: {{user_profile[0].RANK_CHOICES}}<br>
    Working/learning at: {{user_profile[0].place_of_employment}}<br>
    Location: {{user_profile[0].location}}<br>
    Avatar: {{user_profile[0].avatar}}<br>
    <button @click="back">back</button>
    <p>Answers: </p>
    <div v-for="answer in user_profile[0].answers">
      title: {{answer.title}}<br>
      body: {{answer.body}}
    </div>
    <hr>
    <p>Questions: </p>
    <div v-for="question in user_profile[0].questions">
      title: {{question.title}}<br>
      body: {{question.body}}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ForeignProfile",
  props: ['user'],
  data() {
    return{
      user_profile: null
    }
  },
  mounted() {
    console.log(this.user);
    this.get_foreign_profile();
  },
  methods: {
    get_foreign_profile() {
      axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.user.id}`, {})
      .then(res => this.user_profile = res.data)
      .catch(err => console.log(err))
    },
    back() {
      this.$emit('BackToQuestion', null)
    }
  }
}
</script>

<style scoped>

</style>