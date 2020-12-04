<template>
  <div>
    <div v-if="question_item_check&&!answer&&!question_comment&&!answer_comment&&!foreign_user_profile&&!tag&&!comment_comment&&!edit_comment&&!edit_answer" class="body">
      <h3><strong>Question:</strong> </h3>
      <br>
      <a @click="get_user_profile_id(question_item.user_id)"><strong>Asked by:</strong> {{question_item.user_id.username}}</a><br>
      <strong>Title:</strong> {{question_item.title}}<br>
      <strong>Body:</strong> {{question_item.body}}<br>
      <strong>Tags:</strong>
        <div v-for="tag in question_item.tags">
          {{tag.name}}
          <button @click="remove_tag(tag, question_item)">Remove</button>
        </div>

      <button @click="estimate_current_question(question_item, 'up')">Like</button>
      <button @click="estimate_current_question(question_item, 'down')">DislikeLike</button>

      <p><strong>Comments:</strong></p>
        <div v-for="comment in question_item.comments">
          {{comment.text}}

          <!-- <div v-for="child in comment.children">
            {{child.text}} 
          </div> -->

          <button @click="edit_current_comment(comment)">edit</button>
          <button @click="estimate_current_comment(comment, 'up')">LikeComment</button>
          <button @click="estimate_current_comment(comment, 'down')">DislikeLikeComment</button>
          <button @click="create_comment_comment(comment)">Comment</button>
        <hr>
          <div v-for="child in comment.children">
            <!-- {{child.text}}  -->
            <CommentTree :child="child"/>
          </div>
        <hr>
        </div>
      <button @click="back">back</button>
      <button @click="create_answer(question_item)">Answer</button>
      <button @click="create_question_comment(question_item)">Comment</button>
      <button @click="tag_list(question_item)">Add tag</button>
      <hr>
      <h3>Answers: </h3>
      <div v-for="answer in question_item.answers" @click="get_current_answer(answer.id)">
        <a @click="get_user_profile_id(question_item.user_id)"><strong>Answered by:</strong> {{answer.user_id.username}}</a><br>
        <strong>Title:</strong> {{answer.title}}<br>
        <strong>Body:</strong> {{answer.body}}<br>

        <button @click="estimate_current_answer(answer, 'up')">Like</button>
        <button @click="estimate_current_answer(answer, 'down')">DislikeLike</button>
        <br>
        <strong>Comments:</strong>
        <div v-for="comment in answer.comments">
          {{comment.text}}

          <button @click="estimate_current_comment(comment, 'up')">LikeComment</button>
          <button @click="estimate_current_comment(comment, 'down')">DislikeLikeComment</button>
          <button @click="create_comment_comment(comment)">Comment</button>

          <hr>
          <div v-for="child in comment.children">
            {{child.text}} 
            <CommentTree :child="child"/>
          </div> 
          <hr>
        </div>
        <button @click="create_answer_comment(answer, question_item)">comment</button>
        <br>
        <button v-if="group" @click="edit_current_answer(answer, question_item)">edit answer</button>
        <hr>
      </div>
    </div>

    <CreateAnswer v-if="answer" :answer="answer" @ReturnToQuestion="return_to_question"/>
    <QuestionComment v-if="question_comment" :question="question_comment" @BackToQuestion="from_qcomment_to_question"/>
    <AnswerComment v-if="answer_comment" :answer="answer_comment" :question="question_item" @BackToQuestion="from_acomment_to_question"/>
    <ForeignProfile v-if="foreign_user_profile" :user="foreign_user_profile" @BackToQuestion="from_foreign_profile_to_question"/>
    <TagList v-if="tag" :question="question_item" @BackToQuestion="from_tag_to_question"/>
    <CreateCommentComment v-if="comment_comment" :comment="comment_comment" @BackToQuestion="from_comment_to_question"/>
    <EditComment v-if="edit_comment" :comment="edit_comment" @BackToQuestion="from_edit_to_question"/>
    <ModeratorAnswerEdit v-if="edit_answer" :answer="edit_answer" :question="question_item" @BackToQuestion="from_edit_answer_to_question"/>
  </div>
</template>

<script>
import axios from 'axios';
import CreateAnswer from "@/components/Chat/CreateAnswer";
import QuestionComment from "@/components/Chat/QuestionComment";
import AnswerComment from "@/components/Chat/AnswerComment";
import ForeignProfile from "@/components/Profiles/ForeignProfile";
import TagList from "@/components/Chat/TagList"
import CreateCommentComment from "@/components/Chat/CreateCommentComment";
import CommentList from "@/components/Chat/CommentList";
import EditComment from "@/components/Chat/EditComment";
import ModeratorAnswerEdit from "@/components/Chat/ModeratorAnswerEdit";
import CommentTree from "@/components/Chat/CommentTree";

export default {
  name: "QuestionItem",
  components: {
    CreateAnswer, QuestionComment, AnswerComment, ForeignProfile, TagList, CreateCommentComment, CommentList, EditComment, ModeratorAnswerEdit, CommentTree
  },
  props: ['question_id'],
  data() {
    return{
      question_item_check: null,
      question_item: null,
      answer: null,
      question_comment: null,
      answer_comment: null,
      comment_comment: null,
      foreign_user_profile: null,
      tag: null,
      edit_comment: null,
      edit_answer: null,
      group: null,
      comments: null
    }
  },
  mounted() {
    this.get_current_question();
    this.group = localStorage.getItem('user-group')
    if (this.group !== 'moderator') {
      this.group = null;
    }
    // this.get_current_question();
  },


  methods: {
    change_comments(question_item, comments) {

      for(let i=0; i<question_item.comments.length; i++) {
        for(let j=0; j<comments.length; j++) {
          if (question_item.comments[i]['id'] == comments[j]['id']) {
            question_item.comments[i] = comments[j];
          }
        }
      }

    // console.log(question_item.answers)
    // for(let i=0; i<question_item.answers.length; i++) {
    
        // for(let j=0; j<comments.length; j++) {
        //   if (question_item.answers[i].comments['id'] == comments[j]['id']) {
        //     question_item.answers[i].comments['id'] = comments[j];
          // }
        // }
      // }



      this.question_item_check = true
      console.log(question_item)
    },


    get_comments() {
        axios.get(`http://127.0.0.1:8000/questions/api/comment/create/`, {})
        .then(res => {
            this.comments = res.data
            this.comments = this.make_tree(this.comments)
            this.change_comments(this.question_item, this.comments)
          })
        .catch(err => console.log(err))
    },

    make_tree(data) {
      for(let i=0; i<data.length; i++) {
        data[i]['children'] = [];
        // data[i]['child'] = null;
      }

      for(let i=0; i<data.length; i++) {
        for(let j=1; j<data.length; j++) {
          if (data[i]['id'] == data[j]['parent']) {
            data[i]['children'].push(data[j]);
            // data[j]['child'] = true
          }
        }
      }
      return data
    },
    get_current_question() {
      axios.get(`http://127.0.0.1:8000/questions/api/question/item/?id=${this.question_id}`, {})
      .then(res => {
        this.question_item = res.data[0]
        this.get_comments()
      })
      .catch(err => console.log(err))
    },
    get_current_answer(answer) {
      this.$emit('CurrentAnswer', answer)
    },
    back() {
      this.$emit('BackToQuestionList', null)
    },
    create_answer(item) {
      this.answer = item
      this.question_item_check = null
    },
    return_to_question(item) {
      this.get_current_question()
      this.answer = item
    },
    create_question_comment(item) {
      this.question_comment = item
      this.question_item_check = null
    },
    from_qcomment_to_question(item) {
      this.get_current_question()
      this.question_comment = item
    },
    from_acomment_to_question(item) {
      this.question_item_check = null
      axios.get(`http://127.0.0.1:8000/questions/api/question/item/?id=${item}`, {})
      .then(res => {
        this.question_item = res.data[0]
        this.get_comments()
      })
      .catch(err => console.log(err))

      this.answer_comment = null
    },
    create_answer_comment(item, question) {
      this.answer_comment = item
      this.question_item = question
      
    },
    get_user_profile_id(item) {
      this.foreign_user_profile = item
    },
    from_foreign_profile_to_question(item) {
      this.foreign_user_profile = item
    },

    estimate_current_question(question, mode) {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.post(`http://127.0.0.1:8000/questions/api/vote/`, {
        // user_id: question.user_id.id,
        voter: localStorage.getItem('user-id'),
        action: mode,
        content_type: 15,
        object_id: question.id,
        detail: 'question'
      }, {headers})
          .then(res => console.log(res))
          .catch(err => console.log(err))
    },

    estimate_current_answer(answer, mode) {
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.post(`http://127.0.0.1:8000/questions/api/vote/`, {
        // user_id: answer.user_id.id,
        voter: localStorage.getItem('user-id'),
        action: mode,
        content_type: 20,
        object_id: answer.id,
        detail: 'answer'
      }, {headers})
          .then(res => console.log(res))
          .catch(err => console.log(err))
    },
    estimate_current_comment(comment, mode) {
      console.log(comment)
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.post(`http://127.0.0.1:8000/questions/api/vote/`, {
        // user_id: comment.user_id.id,
        voter: localStorage.getItem('user-id'),
        action: mode,
        content_type: 19,
        object_id: comment.id,
        detail: 'comment'
      }, {headers})
          .then(res => console.log(res))
          .catch(err => console.log(err))
    },
    tag_list(question_item) {
      this.tag = question_item
      this.question_item_check = null
    },

    from_tag_to_question(item) {
      this.get_current_question()
      this.tag = item
    },
    remove_tag(tag, question) {
      // console.log(tag.id)
      let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
      let value = 'Token '+localStorage.getItem('user-token')
      headers['Authorization'] = value
      console.log(headers)

      axios.put(`http://127.0.0.1:8000/questions/api/tag/remove/?id=${tag.id}`, {
        id: tag.id,
        question_id: question.id
      }, {headers})
          .then(res => this.get_current_question())
          .catch(err => console.log(err))
    },
    create_comment_comment(comment) {
      this.comment_comment = comment
      this.question_item_check = null
      // console.log(this.comment_comment)
    },
    from_comment_to_question(item) {
      this.comment_comment = item
      this.get_current_question()
      // this.get_comments()
    },
    edit_current_comment(item) {
      this.edit_comment = item
      this.question_item_check = null
    },
    from_edit_to_question(item) {
      this.edit_comment = item
      this.get_current_question()
    },
    edit_current_answer(item, question) {
      this.edit_answer = item
      this.question_item = question
    },
    from_edit_answer_to_question(item) {
      this.question_item_check = null
      axios.get(`http://127.0.0.1:8000/questions/api/question/item/?id=${item}`, {})
      .then(res => {
        this.question_item = res.data[0]
        this.get_comments()
      })
      .catch(err => console.log(err))
      this.edit_answer = null
    }
    // get_all_comments(item) {
    //   axios.get('http://127.0.0.1:8000/questions/api/comment/create/')
    //   .then(res => this.all_comments = res.data)
    //   .catch(err => console.log(err))
    //   // this.check_comment_list(item, all_comments)
    // },
    //
    // check_comment_list(obj, arr) {
    //   let result = [];
    //   for (let step = 0; step < arr.length; step++) {
    //     for (let step_inside = 0; step_inside < arr.length; step_inside++) {
    //       if (obj.id === arr[step_inside].object_id) {
    //         result = step_inside;
    //       }
    //     }
    //   }
    //   console.log(result)
    // }
  }
}
</script>

<style scoped>

</style>