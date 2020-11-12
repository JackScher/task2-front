<template>
  <div>
    <button v-google-signin-button="clientId" @success="OnGoogleAuthSuccess" @error="OnGoogleAuthFail">
      Continue with Google
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Google",
  data: () => ({
    clientId: '730249173496-cs79cmelhvjcgfqogrl7502au66finrs.apps.googleusercontent.com',
    googleToken: null
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      console.log('UserGoogleId: '+ idToken);
      this.googleToken = idToken
      axios.post(`http://127.0.0.1:8000/auth-services/google/${this.googleToken}`, {
        access_token: this.googleToken,
      }).then(res => console.log(res))
      .catch(err => console.log(err))
      // axios.post(`http://127.0.0.1:8000/auth-services/accounts/google/login`, {
      //   access_token: this.googleToken,
      // }).then(res => console.log(res))
      //     .catch(err => console.log(err))
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>

</style>