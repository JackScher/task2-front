<template>
    <div>
        <div>
            <form @submit.prevent="create_question_comment">
                text: <input type="text" name="text" v-model="text">
                <button type="submit">comment</button>
                <button @click="back">back</button>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddCommentView",
    data() {
        return{
            item_id: null,
            text: null,
            question_id: null,
            content_type: null
        }
    },
    mounted() {
        const {item_id} = this.$route.query;
        this.item_id = item_id;
        const {content_type} = this.$route.query;
        this.content_type = content_type;
        const {question_id} = this.$route.query;
        this.question_id = question_id;
    },
    methods: {
        create_question_comment() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            axios.post('http://127.0.0.1:8000/questions/api/comment/create/', {
                text: this.text,
                user_id: localStorage.getItem('user-id'),
                content_type: this.content_type,
                object_id: this.item_id
            }, {headers})
            .then(res => {
                this.back();
            })
            .catch(err => console.log(err))
        },
        back() {
            this.$router.push({name: "question-item-view", query: {id: this.item_id}});
        }
    }

}
</script>

<style scoped>

</style>