<template>
  <div>
    <div v-if="!new_tag">
      <div v-for="tag in tags">
        <p>{{tag.name}} <button @click="add_tag_to_question(tag)">add to question</button></p>
<!--        <p>{{tag.name}}</p>-->
      </div>
      <button v-if="!new_tag" @click="back">Back</button>
      <button v-if="!new_tag" @click="add_new_tag">Add new one</button>
    </div>
    <CreateTag v-if="new_tag" :question="question" @BackToTagList="from_tag_to_taglist"/>
  </div>
</template>

<script>
import axios from 'axios';
import CreateTag from "@/components/Chat/CreateTag";

export default {
  name: "TagList",
  components: {CreateTag},
  data() {
    return{
      tags: null,
      new_tag: null
    }
  },
  props: ['question'],
  mounted() {
    this.tag_list()
  },
  methods: {
    tag_list() {
      axios.get(`http://127.0.0.1:8000/questions/api/tags/`)
          .then(res => this.tags = res.data)
          .catch(err => console.log(err))

    },
    back() {
      this.$emit('BackToQuestion', null);
    },
    add_tag_to_question(tag) {
      console.log(tag)

      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)
      console.log(tag.id)

      axios.put(`http://127.0.0.1:8000/questions/api/tag/update/?id=${tag.id}`, {
        id: tag.id,
        name: tag.name,
        question_id: this.question.id
      }, {headers})
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    add_new_tag() {
      this.new_tag = true
    },
    from_tag_to_taglist(item) {
      this.tag_list()
      this.new_tag = item
    }
  }
}
</script>

<style scoped>

</style>