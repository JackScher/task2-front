<template>
    <div>
        Username: {{user_profile[0].username}}<br>
        Email: {{user_profile[0].email}}<br>
        Info: {{user_profile[0].about_yourself}}<br>
        Status: {{user_profile[0].status}}<br>
        Rank: {{user_profile[0].user_group}}<br>
        Working/learning at: {{user_profile[0].place_of_employment}}<br>
        Location: {{user_profile[0].location}}<br>
        Avatar: {{user_profile[0].avatar}}<br>
        <button @click="back">back</button>
        <p>Questions: </p>
        <div v-for="question in user_profile[0].questions" v-bind:key="question.id">
            title: {{question.title}}<br>
            body: {{question.body}}
        </div>
        <p>Answers: </p>
        <div v-for="answer in user_profile[0].answers" v-bind:key="answer.id">
            title: {{answer.title}}<br>
            body: {{answer.body}}
        </div>
        <hr>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ForeignProfileView",
    data() {
        return{
            user_id: null,
            question_id: null,
            user_profile: null
        }
    },
    mounted() {
        const {user_id} = this.$route.query;
        this.user_id = user_id;
        const {question_id} = this.$route.query;
        this.question_id = question_id;
        this.get_foreign_profile();
    },
    methods: {
        get_foreign_profile() {
            axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.user_id}`, {})
            .then(res => { 
                this.user_profile = res.data;
            })
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