<template>
    <div>
        {{comment.text}}
        <button @click="edit_current_comment(comment)">edit</button>
        <button @click="estimate_current_comment(comment, 'up')">LikeComment</button>
        <button @click="estimate_current_comment(comment, 'down')">DislikeLikeComment</button>
        <button @click="create_comment_comment(comment)">Comment</button>

        <div class="tree" v-for="comment_item in comment.children" :key="comment_item.id">    
            <CommentsComponent :comment="comment_item" :question_id="question_id" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CommentsComponent",
    data() {
        return{

        }
    },
    props: ['comment', 'question_id'],
    mounted() {},
    methods: {
        edit_current_comment(comment) {
            this.$router.push({name: 'edit-comment-view', query: {comment: comment, question_id: this.question_id}})
        },
        estimate_current_comment(comment, mode) {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            axios.post(`http://127.0.0.1:8000/questions/api/vote/`, {
                voter: localStorage.getItem('user-id'),
                action: mode,
                content_type: 20,
                object_id: comment.id,
                detail: 'comment'
            }, {headers})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        },
        create_comment_comment(comment) {
            this.$router.push({name: 'create-comment-comment-view', query: {comment: comment, question_id: this.question_id}})
        },
    },

}
</script>

<style scoped>
.tree {
    padding-left: 30px;
    padding-top: 10px;
}
</style>
