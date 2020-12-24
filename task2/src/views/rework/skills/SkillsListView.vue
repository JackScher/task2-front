<template>
    <div>
        <div>
            <header class="header">
                <router-link class="router" to="/profile">profile</router-link>
                <router-link class="router" to="/skills/list">skills</router-link>
                <router-link v-if="profile[0].user_group==='moderator'" class="router" to="/moderator">moderator</router-link>
                <router-link class="router" to="/chat/list">chat</router-link>
            </header>
        </div>
        <div>
            <router-link class="router" to="/skills/list">skills</router-link>
            <router-link class="router" to="/skills/add">add skill</router-link>
        </div>
        <h3>Skills:</h3>
        <div v-for="skill in skills" v-bind:key="skill.id">
            Name:{{ skill.name }}
            <button @click="edit_skill_method(skill.id)">edit</button>
            <button @click="delete_skill_method(skill.id)">delete</button>
            <button @click="get_questions_method(skill.id)">find questions</button>
            <hr>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "SkillsListView",
    data() {
        return{
            profile: null,
            skills: null,
            tags: null
        }
    },
    mounted() {
        this.get_self_profile();
    },
    methods: {
        get_skills_list() {
            axios.get(`http://127.0.0.1:8000/questions/api/skills/?ordering=-id&user_id=${this.profile[0].id}`)
            .then(res => {
                this.skills = res.data
            })
            .catch(err => console.log(err))
        },
        get_self_profile() {
            this.id = localStorage.getItem('user-id');
            axios.get(`http://127.0.0.1:8000/rest-auth/api/users/?id=${this.id}`, {})
            .then(res => {
                this.profile = res.data;
                this.get_skills_list();
            })
            .catch(err => console.log(err))
        },
        edit_skill_method(skill_id) {
            this.$router.push({name: 'skill-item', query: {skill_id: skill_id}})
        },
        delete_skill_method(skill_id) {
            let value = 'Token '+ localStorage.getItem('user-token');
            axios.delete(`http://127.0.0.1:8000/questions/api/skills/delete/${skill_id}`,
            {
                headers: {
                    Authorization: value
                }
            })
            .then(res => this.get_skills_list())
            .catch(err => console.log(err))
        },
        get_questions_method(id) {
            axios.get(`http://127.0.0.1:8000/questions/api/skills/${id}`)
            .then(res => {
                    this.tags = res.data['tag_id'];
                    // console.log(this.tags)
                    let route_queries = '';
                    for(let i=0; i<this.tags.length; i++){
                        // console.log(this.tags[i]['id'])
                        route_queries += '&tags=' + this.tags[i]['id'];
                    }
                    // console.log(route_queries);
                    this.$router.push({name: 'questions-list', query: {queries: route_queries}})
                })
            .catch(err => console.log(err))
        
        }
    }
}
</script>

<style scoped>
    .header {
        margin: 0 0 40px 0;
    }
    .router {
        margin: 15px;
    }
</style>