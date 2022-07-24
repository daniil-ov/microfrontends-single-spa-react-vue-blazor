<template>
  <div>
    <button @click="isNewPost=!isNewPost"><span v-if="!isNewPost">Написать комментарий</span><span v-else>Скрыть</span></button>
    <textarea class="textarea" v-model="message" v-if="isNewPost"></textarea>
    <button @click="addComment" v-if="isNewPost">Сохранить комментарий</button>
    <div v-for="comment in comments" class="comment">{{comment}}</div>
  </div>
</template>

<script>
import axios from "axios";

export default  {
  data() {
    return {
      isNewPost: false,
      comments: [],
      message: ''
    }
  },
  created() {
    // загружаем данные, когда представление создано
    // и данные реактивно отслеживаются
    this.fetchAllComment()
  },
  methods: {
    addComment() {
      // this.comments.push(this.message)
      axios
          .post('http://localhost/api/comment?id=new', {
            text: this.message
          })
          .then(response => {
            console.log(response);
            this.fetchAllComment()
          });
      this.message = ''

    },
    fetchAllComment() {
      axios
          .get('http://localhost/api/comment')
          .then(response => (this.comments = response.data));
    }
  }
}
</script>

<style scoped>
.textarea {
  display: block;
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
  padding: 1rem 0.75rem;
  line-height: 1.25;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  resize: vertical;
  margin-top: 10px;
  margin-bottom: 10px;
}
button {
  background: #41b883;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  color: #fff;
}
.comment {
  position: relative;
  margin-right: 6px;
  border-radius: 8px;
  box-shadow: 0 0 32px rgb(0 0 0 / 8%);
  box-sizing: border-box;
  width: 180px;
  padding: 12px 14px;
  transition: transform .15s ease-out 50ms,margin .1s .4s,visibility .1s .4s;
  background: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
}
</style>
