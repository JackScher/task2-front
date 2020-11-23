<template>

  <div>
    <!--    <h1>{{ msg }}</h1>-->

    <form @submit.prevent="register_method">
      Username: <input type="text" id="username" v-model="username" name="username">
      Password: <input type="text" id="password" v-model="password" name="password">
      Return password: <input type="text" id="password_r" v-model="password_r" name="password_r">
      Email: <input type="text" id="mail" v-model="mail" name="mail">
      Info: <input type="text" id="info" v-model="info" name="info">
      Location: <input type="text" id="location" v-model="location" name="location">
      Status: <select name="status" v-model="status">
                <option>none</option>
                <option>educating</option>
                <option>working</option>
              </select>
      Place of employment: <input type="text" id="place_of_employment" v-model="place_of_employment" name="place_of_employment">
      <button>Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return{
      username: '',
      password: '',
      password_r: '',
      mail: '',
      info: '',
      place_of_employment: '',
      location: '',
      status: ''
    }
  },
  methods: {
    register_method() {
      console.log(this.place_of_employment)
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
          username: this.username,
          email: this.mail,
          password1: this.password,
          password2: this.password_r,
          about_yourself: this.info,
          place_of_employment: this.place_of_employment,
          location: this.location,
          STATUS_CHOICES: this.status
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }
  },
}
</script>

<style scoped>

</style>