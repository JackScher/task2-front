<template>
    <div>
        Title: <input type="text" name="title" v-model="title">
        Body: <input type="text" name="title" v-model="body">
        <button @click="edit_item">Edit</button>
        <router-link to="/profile">back</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ProfileEditItem",
    data() {
        return{
            item: null,
            mode: null,
            title: null,
            body: null,
            url: null
        }
    },
    mounted() {
        const {item} = this.$route.query;
        this.item = item;
        const {mode} = this.$route.query;
        this.mode = mode;
        this.url = 'http://127.0.0.1:8000/questions/api/' + this.mode + `/edit/?id=${this.item.id}`
        console.log(this.url)
    },
    methods: {
        edit_item() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+ localStorage.getItem('user-token')
            headers['Authorization'] = value

            axios.put(this.url, {
                id: this.item.id,
                title: this.title,
                body: this.body,
                user_id: this.item.user_id,
                current_user_id: localStorage.getItem('user-id')
            }, {headers})
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

</style>