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
        <button @click="LinkedinGetMethod">
            Continue with Linkedin
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

            url: null,
            linkedinClientId: '78z5p6percm8do',
            linkedinClientSecret: '0iRzy06o3PN0fG0P',
            redirectURI: 'http://localhost:8080',
            urlEncode: 'http%3A%2F%2Flocalhost%3A8080',
            code: null,
            clientId: '730249173496-cs79cmelhvjcgfqogrl7502au66finrs.apps.googleusercontent.com',
            linkedin_url: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78z5p6percm8do&scope=r_liteprofile%20r_emailaddress&redirect_uri=http%3A%2F%2Flocalhost%3A8080'
        }
    },
    mounted() {
        const {code} = this.$route.query;
        this.code = code;
        this.url = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code='+ this.code + '&redirect_uri=' + this.urlEncode + '&client_id=' + this.linkedinClientId + '&client_secret='+ this.linkedinClientSecret
        this.linkedin_check();
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
        },
        OnGoogleAuthFail (error) {
            console.log(error)
        },
        LinkedinGetMethod() {
            window.open(this.linkedin_url);
        },
        linkedin_check() {
            if (this.code) {
                axios.post('http://127.0.0.1:8000/auth-services/linkedin/', {
                    code: this.code,
                })
                .then(res => {
                    localStorage.setItem('user-token', res.data['detail'].key)
                    localStorage.setItem('user-id', res.data['detail'].user.id)
                    this.$router.push({name: 'self-profile-view'})
                })
                .catch(err => console.log(err))
            }
        }
    }
}
</script>

<style scoped>

</style>
