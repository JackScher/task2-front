<template>
    <div>
        <div v-if="!question_edit&&!edit_answer">
            Questions: 
            <div v-for="question in question_list" v-bind:key="question.id">
                Title: {{question.title}}
                Body: {{question.body}}
                <button @click="current_question_edit(question)">Edit</button>
            </div>
            Answers:
            <div v-for="answer in answer_list">
                Title: {{answer.title}}
                Body: {{answer.body}}
                <button @click="current_answer_edit(answer)">Edit</button>
            </div>
            <button @click="back">Back</button>
        </div>
        <ModeratorQuestionEdit v-if="question_edit" :question="question_edit" @BackToList="from_question_edit_to_list"/>
        <ModeratorAnswerEdit v-if="edit_answer" :answer="edit_answer" @BackToQuestion="from_edit_answer_to_question"/>
    </div>
</template>

<script>
import axios from 'axios';

import ModeratorQuestionEdit from "@/components/Chat/ModeratorQuestionEdit";
import ModeratorAnswerEdit from "@/components/Chat/ModeratorAnswerEdit";


export default {
    name: "ModeratorPage",
    components: {
        ModeratorQuestionEdit, ModeratorAnswerEdit
    },
    data() {
        return{
            question_list: null,
            answer_list: null, 
            question_edit: null,
            edit_answer: null,
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
        back() {
            this.$emit('BackToProfile', null)
        },
        current_question_edit(item) {
            console.log('EDIT')
            this.question_edit = item
        },
        from_question_edit_to_list(item) {
            this.question_edit = item
            this.get_question_list()
        },
        get_answer_list() {
            axios.get('http://127.0.0.1:8000/questions/api/answers/')
            .then(res => {
                console.log(res)
                this.answer_list = res.data
            })
            .catch(err => console.log(err))
        },
        from_edit_answer_to_question(item) {
            this.edit_answer = item
            this.get_answer_list()
        },
        current_answer_edit(item) {
            this.edit_answer = item
        },
    }
}
</script>

<style scoped>

</style>