<template>
    <div>
        Skills.component
        {{skills}}
        <button @click="back">back</button>
    </div> 
</template>

<script>
import axios from 'axios';

export default {
    name: "Skills",
    data() {
        return{
            skills: null,
            id: null
        }
    },
    mounted() {
        this.id = localStorage.getItem('user-id');
        this.get_skill_list();
    },
    methods: {
        back() {
            this.$emit('BackToProfile', null)
        },
        get_skill_list() {
            console.log(this.id)
            let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
            let value = 'Token '+ localStorage.getItem('user-token')
            headers['Authorization'] = value

            axios.get(`http://localhost:8000/questions/api/skills/?user_id=${this.id}`, {headers})
            .then(res => {
                console.log(res)
                this.skills=res.data
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>

</style>