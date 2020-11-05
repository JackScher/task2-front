<template>

  <div>
    <!--    <h1>{{ msg }}</h1>-->

    <form @submit.prevent="register_method">
      Username: <input type="text" id="username" v-model="username" name="username">
      Password: <input type="text" id="password" v-model="password" name="password">
      Return password: <input type="text" id="password_r" v-model="password_r" name="password_r">
      Email: <input type="text" id="mail" v-model="mail" name="mail">
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
      mail: ''
    }
  },
  methods: {
    register_method() {
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
          username: this.username,
          email: this.mail,
          password1: this.password,
          password2: this.password_r
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }
  },
}
</script>

<style scoped>

</style>