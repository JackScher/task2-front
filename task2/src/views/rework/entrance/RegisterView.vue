<template>
    <div>
        <form @submit.prevent="register_method">
            Username: <input type="text" id="username" v-model="username" name="username"><br>
            Password: <input type="text" id="password" v-model="password" name="password"><br>
            Return password: <input type="text" id="password_r" v-model="password_r" name="password_r"><br>
            Email: <input type="text" id="mail" v-model="mail" name="mail"><br>
            Info: <input type="text" id="info" v-model="info" name="info"><br>
            Location: <input type="text" id="location" v-model="location" name="location"><br>
            Status: <select name="status" v-model="status">
                <option>none</option>
                <option>educating</option>
                <option>working</option>
            </select><br>
            Place of employment: <input type="text" id="place_of_employment" v-model="place_of_employment" name="place_of_employment"><br>
        <button type="submit">register</button>
        <router-link to="/">back</router-link>
    </form>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "RegisterView",
    data() {
        return{
            username: '',
            password: '',
            password_r: '',
            mail: '',
            info: '',
            place_of_employment: '',
            location: '',
            status: ''
        }
    },
    methods: {
        register_method() {
            axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
                username: this.username,
                email: this.mail,
                password1: this.password,
                password2: this.password_r,
                about_yourself: this.info,
                place_of_employment: this.place_of_employment,
                location: this.location,
                status: this.status
            })
            .then(res => {
                console.log(res.data);
                this.$router.push({name: 'login-view'})
            })
            .catch(err => console.log(err));
        }
    }
}

</script>

<style scoped>

</style>