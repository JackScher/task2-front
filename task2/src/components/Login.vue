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
      password: '',
      token: null,
      user_id: null,
      user_group: null
    }
  },
  methods: {
    login_method() {
      axios.post('http://127.0.0.1:8000/rest-auth/login/', {
        email: this.email,
        password: this.password,
      }).then(res => {
            this.token = res.data.key
            this.user_id = res.data.user.id
            this.user_group = res.data.user.user_group
            localStorage.setItem('user-token', this.token)
            localStorage.setItem('user-id', this.user_id)
            localStorage.setItem('user-group', this.user_group)
          this.$emit('TokenWasSet', this.token, this.user_id)
          }
      ).catch( err => {
            localStorage.removeItem('user-token')
            localStorage.removeItem('user-id')
            localStorage.removeItem('user-group')
            this.token = null
            this.id = null
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
