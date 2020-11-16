<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <Login @TokenWasSet="SetToken"/>
    <br>
    <Register/>
    <br>
    <Conf/>
    <br>
<!--    <Google/>-->
<!--    <br>-->
<!--    <Linkedin/>-->
    <hr>
    <br>
    <br>
    <br>
    <Chat :token="token"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Conf from '@/components/Conf.vue'
import Google from '@/components/Google.vue'
import Linkedin from '@/components/Linkedin.vue'
import Chat from '@/components/Chat.vue'

export default {
  name: 'Home',
  components: {
    Login,
    Register,
    Conf,
    Google,
    Linkedin,
    Chat
  },
  data() {
    return{
      token: null
    }
  },
  methods: {
    SetToken(token) {
      this.token = token;
      // console.log('it`s token: '+this.token);
    }
  }
}
</script>
