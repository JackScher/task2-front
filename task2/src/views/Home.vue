<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <Login/>
    <br>
    <Register/>
    <br>
    <Conf/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Conf from '@/components/Conf.vue'

export default {
  name: 'Home',
  components: {
    Login,
    Register,
    Conf
  }
}
</script>
