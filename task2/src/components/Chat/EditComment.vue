<template>
  <div>
    comment.template
    Body: <input type="text" name="text" v-model="text">
    <button @click="edit_answer">Edit</button>
    <button @click="back">back</button>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditComment",
  props: ['comment'],
  mounted() {
    console.log(this.comment)
  },
  data() {
    return{
      text: null
    }
  },
  methods: {
    back() {
      this.$emit('BackToQuestion', null)
    },
    edit_answer() {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+ localStorage.getItem('user-token')
      headers['Authorization'] = value

      axios.put(`http://127.0.0.1:8000/questions/api/comment/edit/?id=${this.comment.id}`, {
        id: this.comment.id,
        text: this.text,
        user_id: this.comment.user_id,
        current_user_id: localStorage.getItem('user-id')
      }, {headers})
          .then(res => {
            console.log(res)
            this.back()
          })
          .catch(err => console.log(err))

    }
  }
}
</script>

<style scoped>

</style>