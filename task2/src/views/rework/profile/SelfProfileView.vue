<template>
    <div>
        <header class="header">
            <router-link class="router" to="/profile">profile</router-link>
            <router-link class="router" to="/skills/list">skills</router-link>
            <router-link v-if="profile[0].user_group==='moderator'" class="router" to="/moderator">moderator</router-link>
            <router-link class="router" to="/chat/list">chat</router-link>
        </header>

        <div>
            Name: {{profile[0].username}}<br>
            Rank: {{profile[0].user_group}}<br>
            Info: {{profile[0].about_yourself}}<br>
            Status: {{profile[0].status}}<br>
            Working/learning at: {{profile[0].place_of_employment}}<br>
            Location: {{profile[0].location}}<br>
            Avatar: {{profile[0].avatar}}<br>
        </div>

        <button @click="logout_method">logout</button>
        <button @click="edit_profile_method">edit</button>

        <hr>
        <p>Questions: </p>
        <div v-for="question in profile[0].questions"  v-bind:key="question.id">
            title: {{question.title}}<br>
            body: {{question.body}}
            <button @click="edit_current_question(question)">edit</button>
        </div>

        <hr>
        <p>Answers: </p>
        <div v-for="answer in profile[0].answers" v-bind:key="answer.id">
            title: {{answer.title}}<br>
            body: {{answer.body}}
            <button @click="edit_current_answer(answer)">edit</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "SelfProfileView",
    data() {
        return{
            id: null,
            profile: null
        }
    },
    mounted() {
        this.get_self_profile();
    },
    methods: {
        get_self_profile() {
            this.id = localStorage.getItem('user-id');
            axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.id}`, {})
            .then(res => {
                this.profile = res.data
            })
            .catch(err => console.log(err))
        },
        logout_method() {
            localStorage.removeItem('user-id');
            localStorage.removeItem('user-token');
            this.$router.push({name: 'login-view'})
        },
        edit_profile_method() {
            this.$router.push({name: `edit-profile-view`,  query: { id: this.profile[0].id } })
        },
        edit_current_question(question) {
            this.$router.push({name: 'profile-edit-item-view', query: {item: question, mode: 'question'}});
        },
        edit_current_answer(answer) {
            this.$router.push({name: 'profile-edit-item-view', query: {item: answer, mode: 'answer'}});
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