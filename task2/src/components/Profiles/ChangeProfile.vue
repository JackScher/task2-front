<template>

  <div>
    <form @submit.prevent="change_user">
      Username: <input type="text" name="username" v-model="username"><br>
      Password: <input type="text" name="password" v-model="password"><br>
      Info: <input type="text" name="info" v-model="info"><br>
      Working/learning at: <input type="text" name="employment" v-model="employment"><br>
      Location: <input type="text" name="location" v-model="location"><br>
      Status:  <select name="status" v-model="status">
                  <option>none</option>
                  <option>educating</option>
                  <option>working</option>
                </select>
      <button type="submit">click</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ChangeProfile",
  props: ['user'],
  data() {
    return{
      username: null,
      password: null,
      info: null,
      employment: null,
      location: null,
      status: null
    }
  },
  mounted() {
    // console.log(this.user)
  },
  methods: {
    change_user() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.put(`http://127.0.0.1:8000/rest-auth/api/user/update/?id=${this.user.id}`, {
        id: this.user.id,
        username: this.username,
        password: this.password,
        about_yourself: this.info,
        place_of_employment: this.employment,
        location: this.location,
        status: this.status
      }, {headers})
      .then(res => this.$emit('Changed', null))
      .catch(err => console.log(err))
    },
  }
}
</script>

<style scoped>

</style>