<template>
  <section id="about_event">
    <div class="container-xxl col-12 mt-4 mb-4">
      <div class="row mb-3">
        <div class="col-3">
          <img class="anime-img rounded-3 mb-3" :aria-labelledby="dataToUsed.id" :src="dataToUsed.img_src"> 

          <div class="dropdown">
            <select class="form-select dropdown-style" v-model="selectedList" @change="addToList">
              <option :value="null" disabled>Добавить в список</option>
              <option value="Понравившиеся">Понравившиеся</option>
              <option value="Просмотренные">Просмотренные</option>
            </select>
          </div>

          <div class="dropdown mt-2">
            <select class="form-select dropdown-style" v-model="selectedRating" @change="setUserRating">
              <option :value="null" disabled>Поставить оценку</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        <div class="col-9">
          <h2>{{this.dataToUsed.title}}</h2>
          <p>Средняя оценка: {{ this.averageRating.toFixed(1) }}</p>
          <p>Количество оценок: {{ this.ratingsAmount }}</p>

          <div class="row mt-3">
            <div class="col-4">
              <p>Жанр:</p>
              <p>Тип:</p>
              <p>Дата выхода:</p>
              <p>Всего серий:</p>
              <p>Студия:</p>
              <p>Автор:</p>
            </div>
            <div class="col">
              <p>{{this.dataToUsed.genre}}</p>
              <p>{{this.dataToUsed.type}}</p>
              <p>{{this.dataToUsed.date}}</p>
              <p>{{this.dataToUsed.episodes}}</p>
              <p>{{this.dataToUsed.studio}}</p>
              <p>{{this.dataToUsed.author}}</p>
            </div>
          </div>
          <p class="lower-text-size mt-3">Описание: {{this.dataToUsed.description}}</p>
        </div>
      </div>
      <h5>Рецензии:</h5>
      <div>
        <textarea class="p-2 review-card mb-2" v-model="review" placeholder="Написать рецензию..."></textarea>
        <div style="text-align: right">
          <a href="#"  @click.prevent="addReview(this.dataToUsed.id)" class="btn review-button">Отправить</a>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>Популярные:</p>
        </div>
        <div class="col" style="text-align: right">
          <p>Больше (кнопка должна быть)</p>
        </div>
      </div>


      <Review :reviewInfo=reviewData></Review>
    </div>
  </section>
</template>

<script>
  import axios from "axios";
  import Review from "../components/Review.vue"
  import { storeToRefs } from 'pinia'
  import { useStateStore } from '../store/UserStatus.js'
  export default {
    name: "AnimeDescription",
    components:{
        Review
    },
    data: function (){
      return{
          dataToUsed: [],
          URLParam: this.$route.params.id,
          CheckUserState: null,
          reviewData: [],
          selectedList: null,
          selectedRating: null,
          averageRating: 0,
          animeRatings: [],
          ratingsAmount: 0,
      }
    },
    methods:{
      async getMethod(){
        const res = await axios.get(`http://localhost:3000/events/${this.URLParam}`);
        this.dataToUsed = res.data;
      },
      async addToList() {
        if (this.CheckUserState === false){
          alert ("Для начала зарегистрируйтесь или войдите в систему")
        } else {
          let uidFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
          const listTitle = this.selectedList;
          const resa = await axios.get(`http://localhost:3000/user_list`);
          this.APIResponse = resa.data;
          const existingUserList = this.APIResponse.find(item => item.user_id === uidFromLocalStorage[0].id && item.list_title === listTitle);
          if (existingUserList) {
              if (!existingUserList.anime_id.includes(this.dataToUsed.id)) {
                  existingUserList.anime_id.push(this.dataToUsed.id);
                  await axios.put(`http://localhost:3000/user_list/${existingUserList.id}`, {
                    user_id: uidFromLocalStorage[0].id,
                    list_title: listTitle,
                    anime_id: existingUserList.anime_id
                  });
                  alert('Аниме добавлено в список');
              } else {
                  alert('Это аниме уже есть в списке');
              }
          } else {
              await axios.post(`http://localhost:3000/user_list`, {
                  user_id: uidFromLocalStorage[0].id,
                  list_title: listTitle,
                  anime_id: [this.dataToUsed.id],
              });
              alert('Список создан, аниме добавлено в список');
          }
        }
      },
      async setUserRating() {
        if (this.CheckUserState === false){
          alert ("Для начала зарегистрируйтесь или войдите в систему")
        } else {
          let uidFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
          const rating = this.selectedRating;
          const resb = await axios.get(`http://localhost:3000/user_rating_anime`);
          this.APIResponse = resb.data;
          const existingUserRating = this.APIResponse.find(item => item.user_id === uidFromLocalStorage[0].id && item.anime_id === this.dataToUsed.id);
          if (existingUserRating) {
            await axios.put(`http://localhost:3000/user_rating_anime/${existingUserRating.id}`, {
              user_id: uidFromLocalStorage[0].id,
              anime_id: this.dataToUsed.id,
              rating: rating,
            });
            alert('Оценка успешно изменена');
          } else {
            await axios.post(`http://localhost:3000/user_rating_anime`, {
              user_id: uidFromLocalStorage[0].id,
              anime_id: this.dataToUsed.id,
              rating: rating,
            });
            alert('Оценка успешно выставлена');
          }
        }
      },
      async getAnimeRating() {
        try {
          const res = await axios.get(`http://localhost:3000/user_rating_anime?anime_id=${this.URLParam}`);
          this.animeRatings = res.data;
          this.ratingsAmount = this.animeRatings.length
          this.sumRating = 0;
          for (let i = 0; i < this.ratingsAmount; i++) {
            const rating = parseInt(this.animeRatings[i].rating);
            this.sumRating += rating;
          }
          if (this.ratingsAmount > 0) {
            this.averageRating = this.sumRating / this.ratingsAmount;
          } else {
            this.averageRating = 0;
          }
        } catch (error) {
          console.error('Ошибка при получении рейтингов', error);
        }
      },
      async addReview(sth) {
        if (!this.CheckUserState){
          alert ("Для начала зарегистрируйтесь или войдите в систему пожалуйста");
        } 
        if (this.review === ''){
          alert('Пожалуйста заполните поле ввода рецензии');
        } else {
          let uidFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
          try {
            const result = await axios.post(`http://localhost:3000/user_review`, {
              review: this.review,
              anime_id: sth,
              username: uidFromLocalStorage[0].username,
              user_id: uidFromLocalStorage[0].id,
            });
            console.log('Результат запроса на добавление рецензии:', result);
            this.getReview()
          }catch (error) {
            console.error('Ошибка при отправке рецензии:', error);
            alert('Произошла ошибка при отправке рецензии. Пожалуйста, попробуйте еще раз.');
          }
        }
      },
      async getReview(){
        this.reviewData = []
        const res = await axios.get(`http://localhost:3000/user_review?anime_id=${this.URLParam}`);
        for (let i = res.data.length - 1; i >= 0 ; i--) {
          let selectedReview = (await axios.get(`http://localhost:3000/user_review/${res.data[i].id}`)).data;
          this.reviewData.push(selectedReview);
        }
      },
      checkState(){
        const  { userState } = storeToRefs(useStateStore())
        this.CheckUserState= userState;
      }
    },
    mounted() {
      this.getMethod()
      this.getReview()
      this.checkState()
      this.getAnimeRating()
    }
  }
</script>

<style scoped>
  .anime-img {
    width: 100%;
  }
  .review-card {
    border-radius: 9px;
    background-color: #f1f1f1;
    border: 2px solid #E55959; 
    width: 100%;
    height: 140px;
  }
  .review-button {
    border-radius: 9px;
    width: 140px;
    background-color: #E55959;
    color: white;
    border: none;
    height: 36px;
  }
  .dropdown-style {
    border-radius: 9px;
    width: 100%;
    background-color: #E55959;
    color: white;
    border: none;
    text-align: center;
  }
</style>
