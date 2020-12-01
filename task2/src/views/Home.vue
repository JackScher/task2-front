<template>
  <div class="home">
    <h3>Authentication: </h3>
    <Login @TokenWasSet="SetToken"/>
    <br>
    <hr>
    <h3>Registration: </h3>
    <Register/>
    <br>
<!--    <Conf/>-->
<!--    <ModeratorConf/>-->
    <br>
<!--    <Google/>-->
<!--    <br>-->
<!--    <Linkedin/>-->
    <hr>
    <br>
    <router-link to="/profile">Profile</router-link>
    <br>
    <br>
    <Chat :token="token" :u_id="user_id"/>

  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Conf from '@/components/Conf.vue'
import Google from '@/components/Google.vue'
import Linkedin from '@/components/Linkedin.vue'
import Chat from '@/components/Chat/Chat-v-2.vue'
import ModeratorConf from "@/components/ModeratorConf";


export default {
  name: 'Home',
  components: {
    Login,
    Register,
    Conf,
    Google,
    Linkedin,
    Chat,
    ModeratorConf
  },
  data() {
    return{
      token: null,
      user_id: null
    }
  },
  methods: {
    SetToken(token, user_id) {
      this.token = token;
      this.user_id = user_id;
    }
  }
}
</script>
