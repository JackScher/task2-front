<template>
    <div>
        <div v-if="confirmed">
            <h2>Congratulations! Your are a moderator ;)</h2>
        </div>
        <router-link to="/">login</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ConfirmModeratorView",
    data() {
        return{
            id: null,
            confirmed: null
        }
    },
    mounted() {
        const {moderator_query} = this.$route.query;
        this.id = moderator_query;
        this.confirm_moderator()
    },
    methods: {
        confirm_moderator() {
            
            axios.put(`http://127.0.0.1:8000/rest-auth/api/user/moderator/${this.id}/`, {})
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