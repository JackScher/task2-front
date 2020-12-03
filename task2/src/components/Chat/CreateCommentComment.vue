<template>
  <div>
    comment.comment
    <input type="text" name="text" v-model="text">
    <button @click="back">back</button>
    <button @click="create_comment">comment</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CreateCommentComment",
  data() {
    return{
      text: null,
    }
  },
  props: ['comment'],
  mounted() {
    console.log(this.comment)
  },
  methods: {
    back() {
      this.$emit('BackToQuestion', null)
    },
    create_comment() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)
      console.log(localStorage.getItem('user-id'))
      console.log(this.comment.id)
      console.log(this.text)

      axios.post('http://127.0.0.1:8000/questions/api/comment/create/', {
        text: this.text,
        user_id: localStorage.getItem('user-id'),
        content_type: 19,
        object_id: this.comment.id,
        parent: this.comment.id
      }, {headers})
      .then(res => this.back())
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>