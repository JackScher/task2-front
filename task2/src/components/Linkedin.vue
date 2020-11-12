<template>
  <div>
    <form @submit.prevent="getLinkedinToken">
      <button type="submit">Linkedin</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Linkedin",
  data(){
    return{
      response_type: 'code',
      code: null,
      redirect_uri: 'http://127.0.0.1:8080/#/',
      client_id: null,
      client_secret: null
    }
  },
  methods: {
    getLinkedinToken() {
      // console.log('linkedin token: ')
      axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
        grant_type: 'authorization_code',
        code: this.code,
        redirect_uri: this.redirect_uri,
        client_id: this.client_id,
        client_secret: this.client_secret
      })
       .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    signInSignUpByToken(token) {
      console.log('here will be backend logic...')
    },
    getCodeType() {
      axios.get(`https://www.linkedin.com/oauth/v2/authorization?response_type=${this.response_type}&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`)
      .then(res => console.log(res))//should return code type for access token, but i`m not sure
      .catch(err => console.log(err))
    }
  }
}

</script>

<style scoped>

</style>