<template>
    <div>
        <div v-for="tag in tags" v-bind:key="tag.id">
            {{tag.name}}
            <button @click="add_tag_to_skill(tag.id)">add</button>
        </div>
        <br>
        <button @click="back">back</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SkillAddTagView",
    data() {
        return{
            tags: null,
            skill_id: null
        }
    },
    mounted() {
        this.get_tags_list();
        const {skill_id} = this.$route.query;
        this.skill_id = skill_id;
    },
    methods: {
        get_tags_list() {
            axios.get(`http://127.0.0.1:8000/questions/api/tags/`)
            .then(res => {
                    this.tags = res.data;
                    console.log(this.tags)
                })
            .catch(err => console.log(err))
        },

        add_tag_to_skill(tag_id) {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let token = 'Token ' + localStorage.getItem('user-token')
            headers['Authorization'] = token

            axios.put(`http://127.0.0.1:8000/questions/api/skills/update/${this.skill_id}/`, {
                id: this.skill_id,
                tag_id: tag_id
            }, {headers})
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
        },
        back() {
            this.$router.push({name: 'skill-item', query: {skill_id: this.skill_id}})
        },
    }
}

</script>

<style scoped>

</style>

            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'})
            let value = 'Token ' + localStorage.getItem('user-token')
            headers['Authorization'] = value


            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let token = 'Token: ' + localStorage.getItem('user-token')
            headers['Authorization'] = token