<template>
    <div>
        <form @submit.prevent="add_new_tag">
            <input type="text" name="tag" v-model="tag">
            <button type="submit">add</button>
            <button @click="back">back</button>
        </form>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CreateTagView",
    data() {
        return{
            question_id: null,
            tag: null
        }
    },
    mounted() {
        const {question_id} = this.$route.query;
        this.question_id = question_id;
    },
    methods: {
        back() {
            this.$router.push({name: "tags-list-view", query: {question_id: this.question_id}});
        },
        add_new_tag() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            axios.post('http://127.0.0.1:8000/questions/api/tags/', {
                name: this.tag,
            }, {headers})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

</style>