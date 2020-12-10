<template>
    <div>
        <div v-if="confirmed">
            <h2>Your account  was confirmed. You have an access to login ;)</h2>
        </div>
        <router-link to="/">login</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ConfirmEmailView",
    data() {
        return{
            confirmed: null,
            url: null
        }
    },
    mounted() {
        const {URLquery} = this.$route.query;
        this.url = URLquery;
        this.email_confirm(this.url);
    },
    methods: {
        email_confirm(url) {
            axios.post(`http://127.0.0.1:8000/rest-auth/registration/account-confirm-email/${url}`, {})
            .then(res => {
                console.log(res.data);
                this.confirmed = true;
            })
            .catch(err => console.log(err))
    }
    }
}
</script>

<style scoped>

</style>