<template>
    <div>
        <header class="header">
            <router-link class="router" to="/profile">profile</router-link>
            <router-link class="router" to="/skills/list">skills</router-link>
            <router-link v-if="profile[0].user_group==='moderator'" class="router" to="/moderator">moderator</router-link>
            <router-link class="router" to="/chat/list">chat</router-link>
        </header>
        <div class="block">
            <router-link class="router" to="/chat/list">list</router-link>
            <router-link class="router" to="/chat/add">add question</router-link>
        </div>

        <div v-for="question in questions" :key="question.id" >
            <hr>
            <strong>Title:</strong> {{question.title}}<br>
            <strong>Body:</strong> {{question.body}}<br>
            <strong>Asked by:</strong> {{question.user_id.username}}<br>
            <button @click="get_current_question(question)">info</button><br>
            <strong>Tags:</strong>
            <div v-for="tag in question.tags" :key="tag.id">
                {{tag.name}}
            </div>
            <br>
            <strong>Comments:</strong>
            <div v-for="comment in question.comments" :key="comment.id">
                {{comment.text}}
            </div>
        <hr>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "QuestionsListView",
    data() {
        return{
            questions: null,
            id: null,
            profile: null
        }
    },
    mounted() {
        this.get_self_profile();
        this.get_questions_list();
    },
    methods: {
        get_questions_list() {
            axios.get('http://127.0.0.1:8000/questions/api/questions/', {})
            .then(res => { 
                this.questions=res.data
            })
            .catch(err => console.log(err))
        },
        get_current_question(question) {
            this.$router.push({name: "question-item-view", query: {id: question.id}});
        },
        get_self_profile() {
            this.id = localStorage.getItem('user-id');
            axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.id}`, {})
            .then(res => {
                this.profile = res.data
            })
            .catch(err => console.log(err))
        },
    }
}
</script>

<style scoped>

</style>

<style scoped>
    .header {
        margin: 0 0 40px 0;
    }
    .router {
        margin: 15px;
    }
</style>