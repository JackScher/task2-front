<template>
    <div>
        <div v-for="tag in tags" v-bind:key="tag.id">
            <p>{{tag.name}} <button @click="add_tag_to_question(tag)">add to question</button> <button @click="delete_tag(tag)">delete</button></p>
        </div>
        <button @click="back">back</button>
        <button @click="create_new_tag">create</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "TagsListView",
    data() {
        return{
            question_id: null,
            tags: null
        }
    },
    mounted() {
        this.tag_list();
        const {question_id} = this.$route.query;
        this.question_id = question_id;
    },
    methods: {
        tag_list() {
        axios.get(`http://127.0.0.1:8000/questions/api/tags/`)
            .then(res => this.tags = res.data)
            .catch(err => console.log(err))
        },
        add_tag_to_question(tag) {   
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            axios.put(`http://127.0.0.1:8000/questions/api/tag/update/?id=${tag.id}`, {
                id: tag.id,
                name: tag.name,
                question_id: this.question_id
            }, {headers})
            .then(res => console.log(res))
            .catch(err => console.log(err))
        },
        delete_tag(tag) {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+localStorage.getItem('user-token')
            headers['Authorization'] = value
            axios.put(`http://127.0.0.1:8000/questions/api/tag/delete/?id=${tag.id}`, {
                id: tag.id
            }, {headers})
            .then(res => this.tag_list())
            .catch(err => console.log(err))
        },
        back() {
            this.$router.push({name: "question-item-view", query: {id: this.question_id}});
        },
        create_new_tag() {
            this.$router.push({name: "tags-create-view", query: {question_id: this.question_id}});
        }
    }

}
</script>

<style scoped>

</style>