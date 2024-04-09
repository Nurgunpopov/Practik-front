<template>
  <div class="container-xxl col-12" style="margin-top: 20px;">
    <div class="row justify-content-center">
      <div class="col-xl-2 col-md-3">
        <img src="../assets/person.png" class="w-100 mx-auto d-block" alt="Аватар пользователя">
        <p class="text-center mt-3">{{this.CurrentUser.email}}</p>
        <a class="btn rounded-3 change-avatar mt-3" @click.prevent="changeAvatar">Измениь аватар</a>
      </div>

      <div class="col-xl-10 col-md-9 mb-5" style="padding-left: 50px;">
        <p class="FIO-text">{{this.CurrentUser.username}}</p>
        <p>Описание:</p>

        <hr class="mt-3 mb-2">
        <p class="mb-2">Мои списки:</p>
        <div class="card-container">
          <div class="card-wrapper" v-for="item in userList" :key="item.id">
            <router-link class="card-title" :to="`/ListDescription/${item.id}`">
              <img :src="getLastAddedAnimePhoto(item.anime_id)" class="rounded-3 list-img" alt="Последнее добавленное аниме">
              <p>{{item.list_title}}</p>
            </router-link>
            <p class="list-title">{{item.anime_id.length}} аниме</p>
          </div>
        </div>

        <hr class="mt-3 mb-2">
        <p class="mb-2">Мои рецензии:</p>
        <div class="card-wrapper" v-for="itemx in animeReviewData" :key="itemx.id">
          <p>{{itemx.title}}</p>
        </div>
        <div class="card-wrapper" v-for="item in userReview" :key="item.id">
          <p>{{item.review}}</p>
        </div>
      </div>
    </div>
  </div>	
</template>

<script>
  import axios from "axios";
  import Card from '../components/Card'
  import { useStateStore } from '../store/UserStatus.js'
  export default {
    name: "Profile",
    data:function (){
      return{
        CurrentUser: '',
        userList: [],
        animeData: [],
        latestAnimePhoto: [],
        userReview: [],
        animeReviewData: [],
      }
    },
    components:{
      Card
    },
    methods:{
      async dataFromAPI(){
        try{
          const user = JSON.parse(localStorage.getItem('userInfo'));
          this.CurrentUser = user[0];
        }catch (error){
          console.log("error", error)
        }
      },
      async getList() {
        try {
          const user = JSON.parse(localStorage.getItem('userInfo'));
          const userId = user[0].id;
          const listsResponse = await axios.get(`http://localhost:3000/user_list?user_id=${userId}`);
          this.userList = listsResponse.data;
          const animeResponse = await axios.get(`http://localhost:3000/events`);
          this.animeData = animeResponse.data;
        } catch (error) {
          console.error('Ошибка при выводе списков пользователя:', error);
        }
      },
      getAnimeInfo(animeId) {
        const anime = this.animeData.filter(item => item.id === animeId);
        return anime
      },
      getLastAddedAnimePhoto(animeIds) {
        const lastAnimeId = animeIds[animeIds.length - 1];
        const lastAnime = this.getAnimeInfo(lastAnimeId)[0];
        return lastAnime ? lastAnime.img_src : '';
      },
      async getReview() {
        try {
          this.animeReviewData = [];
          const user = JSON.parse(localStorage.getItem('userInfo'));
          const userId = user[0].id;
          const reviewResponse = await axios.get(`http://localhost:3000/user_review?user_id=${userId}`);
          this.userReview = reviewResponse.data;
          for (let i = 0; i < this.userReview.length; i++) {
            let animeReview = (await axios.get(`http://localhost:3000/events/${this.userReview[i].anime_id}`)).data;
            this.animeReviewData.push(animeReview)
            console.log("Фы уквераоп", this.animeReviewData)
          }
        } catch (error) {
          console.error('Ошибка при выводе рецензий пользователя:', error);
        }
      },
      logout(){
        const { StateChecker } = useStateStore()
        localStorage.clear();
        StateChecker(false);
        window.location.reload();
        this.$router.push({name: "Main"})
      }
    },
    mounted() {
      this.dataFromAPI()
      this.getList()
      this.getReview()
    }
  }
</script>

<style scoped>
  .FIO-text {
    font-size: 30px;
    font-weight: 400;
  }
  .change-avatar {
    width: 100%;
    background-color: #E55959;
    color: white;
    border: none;
    height: 36px;
  }
  .card-container {
    display: flex;
    flex-wrap: nowrap;
  }
  .card-wrapper {
    margin-right: 20px;
  }
  .list-title {
    font-size: 13px;
    opacity: 72%;
  }
  .list-img {
    width: 160px;
    height: 230px;
  }
  hr {
    opacity: 100%;
    width: 100%;
    border-top: 2px solid #E55959; 
  }
  .card-title {
    color:black;
    text-decoration: none;
    overflow: hidden;
    white-space: nowrap;
  }
  .card-title:hover {
    text-decoration: underline;
  }
  
</style>