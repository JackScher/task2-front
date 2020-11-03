<template>

  <div>
    <!--    <h1>{{ msg }}</h1>-->

    <form @submit.prevent="register_method">
      <input type="text" id="username" v-model="username" name="username">
      <input type="text" id="password" v-model="password" name="password">
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
      password: ''
    }
  },
  methods: {
    register_method() {
        axios.post('http://127.0.0.1:8000/api/users/', {
          username: this.username,
          password: this.password,
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
  },
}
</script>

<style scoped>

</style>