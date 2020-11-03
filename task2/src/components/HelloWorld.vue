<template>
  <div class="hello">
<!--    <h1>{{ msg }}</h1>-->

    <form @submit.prevent="login_method">
      <input type="text" id="username" v-model="username" name="username">
      <input type="text" id="password" v-model="password" name="password">
      <button>Auth</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return{
      username: '',
      password: ''
    }
  },
  // props: {
  //   msg: String
  // },
  methods: {
    login_method() {
      axios.post('http://127.0.0.1:8000/auth/', {
        username: this.username,
        password: this.password,
      }).then(res => {
                this.token=res.data.token;
                localStorage.setItem('user-token', res.data.token)
                console.log('user')
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
