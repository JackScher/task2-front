<template>
    <div>
        <div>
            <form @submit.prevent="edit_comment">
                Body: <input type="text" name="text" v-model="text">
                <button type="submit">edit</button>
                <button @click="back">back</button>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "EditCommentView",
    data() {
        return{
            comment: null,
            question_id: null,
            text: null
        }
    },
    mounted() {
        const {comment} = this.$route.query;
        this.comment = comment;
        const {question_id} = this.$route.query;
        this.question_id = question_id;
    },
    methods: {
        edit_comment() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+ localStorage.getItem('user-token')
            headers['Authorization'] = value
            console.log(headers)

            axios.put(`http://127.0.0.1:8000/questions/api/comment/edit/?id=${this.comment.id}`, {
                id: this.comment.id,
                text: this.text,
                user_id: this.comment.user_id,
                current_user_id: localStorage.getItem('user-id')
            }, {headers})
            .then(res => {
                console.log(res);
                this.back()
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

