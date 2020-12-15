<template>
    <div>
        <form @submit.prevent="login_method">
            Login: <input type="text" name="login" v-model="login"><br>
            Password: <input type="password" name="password" v-model="password"><br>
            <button type="submit">login</button>
            <router-link to="/register">register</router-link>
        </form>
        <button v-google-signin-button="clientId" @success="OnGoogleAuthSuccess" @error="OnGoogleAuthFail">
            Continue with Google
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "LoginView",
    data() {
        return{
            login: null,
            password: null,
            googleToken: null,
            clientId: '730249173496-cs79cmelhvjcgfqogrl7502au66finrs.apps.googleusercontent.com',
        }
    },
    methods: {
        login_method() {
            axios.post('http://127.0.0.1:8000/rest-auth/login/', {
                email: this.login,
                password: this.password,
            })
            .then(res => {
                localStorage.setItem('user-token', res.data.key)
                localStorage.setItem('user-id', res.data.user.id)
                this.$router.push({name: 'self-profile-view'})
            })
            .catch( err => {
                console.log(err);
                localStorage.removeItem('user-token')
                localStorage.removeItem('user-id')
            });
        },
        OnGoogleAuthSuccess (idToken) {
            console.log(idToken);
            this.googleToken = idToken
            axios.post(`http://127.0.0.1:8000/auth-services/google/`, {
                id_token: this.googleToken,
            })
            .then(res => {
                localStorage.setItem('user-token', res.data['detail'].key)
                localStorage.setItem('user-id', res.data['detail'].user.id)
                this.$router.push({name: 'self-profile-view'})
            })
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
