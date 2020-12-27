QuestionItemView 
<template>
    <div>        
        <h3>Question: </h3>
        <div v-if="final_question">
            <a @click="get_user_profile(question.user_id.id, question.id)"><strong>Asked by:</strong> {{question.user_id.username}}</a><br>
            <strong>Title:</strong> {{question.title}}<br>
            <strong>Body:</strong> {{question.body}}<br>
            <strong>Tags:</strong>
            <div v-for="tag in question.tags" v-bind:key="tag.id">
                {{tag.name}}
                <button @click="remove_tag(tag, question)">Remove</button>
            </div><br>

            <button @click="estimate_current_question(question, 'up')">Like</button>
            <button @click="estimate_current_question(question, 'down')">DislikeLike</button>
            <button @click="back">back</button>
            <button @click="create_answer(question.id)">Answer</button>
            <button @click="create_item_comment(question.id, 15)">Comment</button>
            <button @click="tag_list(question.id)">Add tag</button>
            
            <p><strong>Comments:</strong></p>
            <div v-for="question_comment in question.comments" v-bind:key="question_comment.id">
                <CommentsComponent :comment="question_comment" :question_id="question.id" />
            </div>
        </div>
        <hr>
        <h3>Answers: </h3>
        <template v-if="question" >
            <div v-for="answer in question.answers" v-bind:key="answer.id">
                <a @click="get_user_profile(answer.user_id.id, question.id)"><strong>Answered by:</strong> {{answer.user_id.username}}</a><br>
                <strong>Title:</strong> {{answer.title}}<br>
                <strong>Body:</strong> {{answer.body}}<br>
                <button @click="estimate_current_answer(answer, 'up')">Like</button>
                <button @click="estimate_current_answer(answer, 'down')">DislikeLike</button>
                <button @click="create_item_comment(answer.id, 21)">comment</button>
                <br>
                <br>
                <strong>Comments:</strong>
                <div v-for="answer_comment in answer.comments" v-bind:key="answer_comment.id">
                    <CommentsComponent :comment="answer_comment" :question_id="question.id" />
                </div><br>
            </div>
        </template>
    </div>
</template>

<script>
import axios from 'axios';
import CommentsComponent from "@/components/rework/CommentsComponent";

export default {
    name: "QuestionItemView",
    components: {
        CommentsComponent
    },
    data() {
        return{
            id: null,
            question: null,
            comments: null,
            final_question: null
        }
    },
    mounted() {
        const {id} = this.$route.query;
        this.id = id;
        this.get_current_question_by_id();
    },
    methods: {
        get_current_question_by_id() {
            axios.get(`http://127.0.0.1:8000/questions/api/question/item/?id=${this.id}`, {})
            .then(res => { 
                this.question = res.data[0];
                this.get_comments();
            })
            .catch(err => console.log(err))
        },
        get_user_profile(id, question_id) {
            this.$router.push({name: 'foreign-profile-view', query: {user_id: id, question_id: question_id}})
        },
        estimate_current_question(question, mode) {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            axios.post(`http://127.0.0.1:8000/questions/api/vote/`, {
                voter: localStorage.getItem('user-id'),
                action: mode,
                content_type: 15,
                object_id: question.id,
                detail: 'question'
            }, {headers})
            .then(res => console.log(res))
            .catch(err => console.log(err))
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
        remove_tag(tag, question) {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            axios.put(`http://127.0.0.1:8000/questions/api/tag/remove/?id=${tag.id}`, {
                id: tag.id,
                question_id: question.id
            }, {headers})
                .then(res => this.get_current_question_by_id())
                .catch(err => console.log(err))
        },
        create_answer(question_id) {
            this.$router.push({name: 'create-answer-view', query: {question_id: question_id}})
        },
        create_item_comment(item_id, content_type) {
            this.$router.push({name: 'create-comment-view', query: {item_id: item_id, content_type: content_type, question_id: this.question.id}})
        },
        tag_list(question_id) {
            this.$router.push({name: 'tags-list-view', query: {question_id: question_id}})
        },
        back() {
            this.$router.push({name: 'questions-list'})
        },
        make_tree(data) {
            for(let i=0; i<data.length; i++) {
                data[i]['children'] = [];
            }
            for(let i=0; i<data.length; i++) {
                for(let j=1; j<data.length; j++) {
                    if (data[i]['id'] == data[j]['parent']) {
                        data[i]['children'].push(data[j]);
                    }
                }
            }
            return data
        },
        change_comments(item, comments) {
            for(let i=0; i<item.comments.length; i++) {
                for(let j=0; j<comments.length; j++) {
                    if (item.comments[i]['id'] == comments[j]['id']) {
                        item.comments[i] = comments[j];
                    }
                }
            }
            for(let l=0; l<item.answers.length; l++) {
                for(let i=0; i<item.answers[l].comments.length; i++) {
                    for(let j=0; j<comments.length; j++) {
                        if (item.answers[l].comments[i]['id'] == comments[j]['id']) {
                            item.answers[l].comments[i] = comments[j];
                        }
                    }
                }
            }
            return item
        },
        get_comments() {
            axios.get(`http://127.0.0.1:8000/questions/api/comment/create/`, {})
            .then(res => {
                this.comments = res.data
                this.comments = this.make_tree(this.comments)
                this.final_question = this.change_comments(this.question, this.comments)
            })
            .catch(err => console.log(err))
    },
    }
}
</script>

<style scoped>

</style>
