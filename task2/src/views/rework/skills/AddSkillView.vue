
<template>
    <div>
        <div>
            Name: <input type="text" name="skill_name" v-model="skill_name">
            Tags: 
            <div v-for="tag in tags" v-bind:key="tag.id">
                {{tag.name}}
                <button @click="add_tag_to_new_skill(tag)">add</button>
            </div>
            <button @click="create_new_skill">create</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddSkillView",
    data() {
        return{
            skill_name: null,
            tags: null,
            chosen_tags: []
        }
    },
    mounted() {
        this.get_tags_list();
    },
    methods: {
        get_tags_list() {
            axios.get(`http://127.0.0.1:8000/questions/api/tags/`)
            .then(res => {
                    this.tags = res.data;
                })
            .catch(err => console.log(err))
        },
        add_tag_to_new_skill(tag) {
            let in_array = false
            if (this.chosen_tags.length) {
                for(let i=0; i<this.chosen_tags.length; i++) {
                    if (this.chosen_tags[i].id === tag.id) {
                        in_array = true
                    }
                }
            }
            if (!in_array) {
                this.chosen_tags.push(tag);
            }
            console.log(this.chosen_tags);
        },
        create_new_skill() {
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let token = 'Token ' + localStorage.getItem('user-token')
            headers['Authorization'] = token

            axios.post('http://127.0.0.1:8000/questions/api/skills/create/', {
                name: this.skill_name,
                user_id: localStorage.getItem('user-id'),
                tag_id: this.chosen_tags
            }, {headers})
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

</style>