<template>
    <div>
        <form @submit.prevent="login_method">
            Login: <input type="text" name="login" v-model="login"><br>
            Password: <input type="password" name="password" v-model="password"><br>
            <button type="submit">login</button>
            <router-link to="/register">register</router-link>
        </form>
        
    </div>
</template>

<script>
import axios from 'axios';
// import router from './router';

export default {
    name: "LoginView",
    data() {
        return{
            login: null,
            password: null
        }
    },
    methods: {
        login_method() {
            axios.post('http://127.0.0.1:8000/rest-auth/login/', {
                email: this.login,
                password: this.password,
            })
            .then(res => {
                console.log(res);
                localStorage.setItem('user-token', this.login)
                localStorage.setItem('user-id', this.password)
                this.$router.push({name: 'self-profile-view'})
            })
            .catch( err => {
                console.log(err);
                localStorage.removeItem('user-token')
                localStorage.removeItem('user-id')
            });
        }
    }
}
</script>

<style scoped>

</style>