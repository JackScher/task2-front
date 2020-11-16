<template>
  <div>
    <form @submit.prevent="getCodeType">
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
      url: null,
      response_type: 'code',
      code: null,
      redirect_uri: 'http://127.0.0.1:8080/#/',
      client_id: '78i3gb9vd2tt5c',
      client_secret: '7BSQFKMxgQrvXUMx',
      scope: 'scope=r_liteprofile%20r_emailaddress%20w_member_social',
      headers: {
        'Authorization': `Bearer ${this.client_id}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
        'Access-Control-Allow-Origin': '*'
      }
    }
  },
  methods: {
    getLinkedinToken() {
      axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
        grant_type: 'authorization_code',
        code: this.code,
        redirect_uri: this.redirect_uri,
        client_id: this.client_id,
        client_secret: this.client_secret,
        scope: 'scope=r_liteprofile%20r_emailaddress%20w_member_social',
      })
       .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    signInSignUpByToken(token) {
      console.log('here will be backend logic...')
    },
    getCodeType() {
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios.get(`http://www.linkedin.com/oauth/v2/authorization?response_type=${this.response_type}&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=${this.scope}&Postman-Token=f9542a93-fc9d-4cc4-aa38-a10f6cf2eb6f&cache-control=no-cache`,{
        headers: this.headers,
        // response_type: this.response_type,
        // client_id: this.client_id,
        // redirect_uri: this.redirect_uri,
        // scope: this.scope
      })
      .then(res => {this.code = res.data['code'];
                    console.log(this.code)})//should return code type for access token, but i`m not sure
      .catch(err => console.log(err))
    },
  }
}

</script>

<style scoped>

</style>