<template>
  <div>
    <div>
      <router-link to="/">Back</router-link>
      <div>
        <br>
        Name: {{profile[0].username}}<br>
        Email: {{profile[0].email}}<br>
        Info: {{profile[0].about_yourself}}<br>
        Status: {{profile[0].STATUS_CHOICES}}<br>
        Rank: {{profile[0].RANK_CHOICES}}<br>
        Working/learning at: {{profile[0].place_of_employment}}<br>
        Location: {{profile[0].location}}<br>
        Avatar: {{profile[0].avatar}}<br>
        <button @click="set_user(profile[0])">Change</button>
        <hr>
        <p>Answers: </p>
        <div v-for="answer in profile[0].answers">
          title: {{answer.title}}<br>
          body: {{answer.body}}
        </div>
        <hr>
        <p>Questions: </p>
        <div v-for="question in profile[0].questions">
          title: {{question.title}}<br>
          body: {{question.body}}
        </div>
      </div>
    </div>
    <ChangeProfile v-if="user" :user="user"/>

  </div>
</template>

<script>
import axios from 'axios';
import ChangeProfile from "@/components/Profiles/ChangeProfile";

export default {
  name: "SelfProfile",
  // props: ['token', 'u_id'],
  components: {
    ChangeProfile
  },
  data() {
    return{
      profile: null,
      id: null,
      token: null,
      user: null
    }
  },
  mounted() {
    this.set_data();
    this.get_self_profile();
  },
  methods: {
    get_self_profile() {
      axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.id}`, {})
      .then(res => this.profile = res.data)
      .catch(err => console.log(err))
    },
    set_data() {
      this.id = localStorage.getItem('user-id')
      this.token = localStorage.getItem('user-token')
      console.log(this.id)
      console.log(this.token)
    },
    set_user(item) {
      this.user = item
    }
  }
}
</script>

<style scoped>

</style>