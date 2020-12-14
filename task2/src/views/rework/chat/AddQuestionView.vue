<template>
    <div>
        <form @submit.prevent="create_question_method">
            title: <input type="text" name="title" v-model="title"><br>
            question: <input type="text" name="body" v-model="body"><br>
            <button type="submit">ask</button>
            <button @click="back">back</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddQuestionView",
    data() {
        return{
            title: null,
            body: null
        }
    },
    methods: {
        create_question_method() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+ localStorage.getItem('user-token')
            headers['Authorization'] = value

            axios.post('http://127.0.0.1:8000/questions/api/question/create/', {
                title: this.title,
                body: this.body,
                user_id: localStorage.getItem('user-id')
            }, {headers})
            .then(res => {
                console.log(res);
                this.back();
            })
            .catch(err => console.log(err))
        },
        back() {
            this.$router.push({name: 'questions-list'})
        }
    }

}
</script>

<style scoped>
    /* .header {
        margin: 0 0 40px 0;
    }
    .router {
        margin: 15px;
    } */
</style>