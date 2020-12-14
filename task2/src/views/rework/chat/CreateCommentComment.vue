<template>
    <div>
        <div>
            <form @submit.prevent="create_comment">
                <input type="text" name="text" v-model="text">
                <button @click="back">back</button>
                <button type="submit">comment</button>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CreateCommentComment",
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
        console.log(this.comment, this.question_id)
    },
    methods: {
        create_comment() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            console.log(headers)
            console.log(localStorage.getItem('user-id'))
            console.log(this.comment.id)
            console.log(this.text)

            axios.post('http://127.0.0.1:8000/questions/api/comment/create/', {
                text: this.text,
                user_id: localStorage.getItem('user-id'),
                content_type: 20,
                object_id: this.comment.id,
                parent: this.comment.id
            }, {headers})
            .then(res => { 
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