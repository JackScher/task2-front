<template>
    <div>
        <div>
            <form @submit.prevent="give_an_answer">
                Give an answer <br>
                title: <input type="text" name="title" v-model="title">
                title: <input type="text" name="body" v-model="body">
                <button type="submit">answer</button>
                <button @click="back">back</button>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddAnswerView",
    data() {
        return{
            question_id: null,
            title: null,
            body: null
        }
    },
    mounted() {
        const {question_id} = this.$route.query;
        this.question_id = question_id;
    }, 
    methods: {
        give_an_answer() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            console.log(headers)

            axios.post('http://127.0.0.1:8000/questions/api/answer/create/', {
                title: this.title,
                body: this.body,
                question_id: this.question_id,
                user_id: localStorage.getItem('user-id')
            }, {headers})
            .then(res => this.back())
            .catch(err => console.log(err))
        },
        back() {
            this.$router.push({name: "question-item-view", query: {id: this.question_id}});
        }
    }
}
</script>

<style scoped>

</style>