<template>
  <div>
    nested.comment.list
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentList",
  props: ['item', 'list'],
  data() {
    return{
      all_comments: null,
    }
  },
  mounted() {
    console.log(this.item)
    console.log(this.list)
  },
  methods: {


    check_comment_list(obj, arr) {
      console.log('in list check ')
      let result = [];
      for (let step = 0; step < arr.length; step++) {
        for (let step_inside = 0; step_inside < arr.length; step_inside++) {
          if (obj.id === arr[step_inside].object_id) {
            result = step_inside;
          }
        }
      }
      console.log('res: ', result)
    }
  }
}
</script>

<style scoped>

</style>