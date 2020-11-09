<template>
  <div class="hello">


    <form @submit.prevent="login_method">
      <input type="text" id="email" v-model="email" name="email">
      <input type="text" id="password" v-model="password" name="password">
      <button>Auth</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return{
      email: '',
      password: ''
    }
  },
  // props: {
  //   msg: String
  // },
  methods: {
    login_method() {
      axios.post('http://127.0.0.1:8000/rest-auth/login/', {
        email: this.email,
        password: this.password,
      }).then(res => {
            this.token=res.data.token;
            localStorage.setItem('user-token', res.data.token)
            console.log('user')
            console.log(res.data)
          }
      ).catch( err => {
            localStorage.removeItem('user-token')
            this.token = null
            console.log('Error: ', err);
            console.log('not registered user');
          }
      );
    }
  },
}
</script>


<style scoped>

</style>
