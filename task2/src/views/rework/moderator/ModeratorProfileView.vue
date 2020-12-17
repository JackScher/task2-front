<template>
    <div>
        <header class="header">
            <router-link class="router" to="/profile">profile</router-link>
            <router-link class="router" to="/skills/list">skills</router-link>
            <router-link class="router" to="/moderator">moderator</router-link>
            <router-link class="router" to="/chat/list">chat</router-link>
        </header>

        <div>
            <hr>
            Questions: 
            <div v-for="question in question_list" v-bind:key="'A'+question.id">
                Title: {{question.title}}
                Body: {{question.body}}
                <button @click="current_question_edit(question)">Edit</button>
            </div>

            <hr>
            Answers:
            <div v-for="answer in answer_list" v-bind:key="'B'+answer.id">
                Title: {{answer.title}}
                Body: {{answer.body}}
                <button @click="current_answer_edit(answer)">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ModeratorProfileView",
    data() {
        return{
            question_list: null,
            answer_list: null
        }
    },
    mounted() {
        this.get_question_list();
        this.get_answer_list();
    },
    methods: {
        get_question_list() {
            axios.get('http://127.0.0.1:8000/questions/api/questions/')
            .then(res => {
                console.log(res)
                this.question_list = res.data
            })
            .catch(err => console.log(err))
        },
        get_answer_list() {
            axios.get('http://127.0.0.1:8000/questions/api/answers/')
            .then(res => {
                console.log(res)
                this.answer_list = res.data
            })
            .catch(err => console.log(err))
        },
        current_question_edit(question) {
            this.$router.push({name: 'moderator-edit-view', query: {item: question, mode: "question"}})
        },
        current_answer_edit(answer) {
            this.$router.push({name: 'moderator-edit-view', query: {item: answer, mode: "answer"}})
        }
    }
}
</script>

<style scoped>
    .header {
        margin: 0 0 40px 0;
    }
    .router {
        margin: 15px;
    }
</style>