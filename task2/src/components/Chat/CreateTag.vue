<template>
  <div>
    <form @submit.prevent="add_new_tag">
      <input type="text" name="tag" v-model="tag">
      <button type="submit">Add</button>
      <button @click="back">Back</button>
    </form>

  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "CreateTag",
  props: ['question'],
  data() {
    return{
      tag: null
    }
  },
  methods: {
    back() {
      this.$emit('BackToTagList', null)
    },
    add_new_tag() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)
      console.log(this.tag)
      console.log(this.question.id)


      axios.post('http://127.0.0.1:8000/questions/api/tags/', {
        name: this.tag,
      }, {headers})
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>