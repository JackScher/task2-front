<template>
    <div>
        <div>
            Name: {{skill.name}}<br>
            Tags: 
            <div v-for="tag in skill.tag_id" v-bind:key="tag.id+tag.name">
                {{tag.name}}
                <button @click="delete_tag_method(skill.id, tag.id)">delete</button>
            </div>
            <br>
            <button @click="add_tag_method()">add tag</button>
            <button @click="back">back</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SkillItemView",
    data() {
        return{
            skill_id: null,
            skill: null
        }
    },
    mounted() {
        const {skill_id} = this.$route.query;
        this.skill_id = skill_id;
        this.get_skill_item_method()
    },
    methods: {
        get_skill_item_method() {
            axios.get(`http://127.0.0.1:8000/questions/api/skills/${this.skill_id}`)
            .then(res => {
                this.skill = res.data;
            })
            .catch(err => console.log(err))
        },
        back() {
            this.$router.push({name: 'skills-list'})
        },
        delete_tag_method(skill_id, tag_id) {

            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'})
            let value = 'Token ' + localStorage.getItem('user-token')
            headers['Authorization'] = value
            
            axios.put(`http://127.0.0.1:8000/questions/api/skills/delete_tag/${skill_id}/`, 
            {
                id: skill_id,
                tag_id: tag_id
            }, {headers})
            .then(res => {
                this.get_skill_item_method()
            })
            .catch(err => console.log(err))
        },
        add_tag_method() {
            this.$router.push({name: 'skill-add-tag', query: {skill_id: this.skill_id}})
        }
    }
}
</script>

<style scoped>

</style>
