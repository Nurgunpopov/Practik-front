<template>
  <div class="container-xxl col-12" style="margin-top: 20px;">
    <div class="row justify-content-center">
      <div class="col-xl-2 col-md-3">
        <img src="../assets/person.png" class="w-100 mx-auto d-block" alt="Аватар пользователя">
        <p class="text-center mt-3">{{this.dataToUsed.email}}</p>
        <button class="btn rounded-3 mt-3" @click.prevent="followUser">Подписаться</button>
      </div>

      <div class="col-xl-10 col-md-9 mb-5" style="padding-left: 50px;">
        <p class="FIO-text">{{this.dataToUsed.username}}</p>
        <p>Описание:</p>

        <hr class="mt-3 mb-2">
        <p class="mb-2">Списки:</p>
      
        <div class="card-container">
          <div class="card-wrapper" v-for="item in userList" :key="item.id">
            <router-link class="card-title" :to="`/ListDescription/${item.id}`">
              <img :src="getLastAddedAnimePhoto(item.anime_id)" class="rounded-3 list-img" alt="Последнее добавленное аниме">
              <p>{{item.list_title}}</p>
            </router-link>
            <p class="list-title">{{item.anime_id.length}} аниме</p>
          </div>
        </div>
      </div>
    </div>
  </div>	
</template>

<script>
  import axios from "axios";
  import Card from '../components/Card'
  export default {
    name: "Profile",
    data:function (){
      return{
        dataToUsed: [],
        URLParam: this.$route.params.id,
        userList: [],
        animeData: [],
        latestAnimePhoto: [],
      }
    },
    components:{
      Card
    },
    methods:{
      async getList() {
        try {
          const res = await axios.get(`http://localhost:3000/users/${this.URLParam}`);
          this.dataToUsed = res.data;
          const listsResponse = await axios.get(`http://localhost:3000/user_list?user_id=${this.dataToUsed.id}`);
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
      // async followUser(sth) {
      //   if (this.CheckUserState === false) {
      //     alert("Пожалуйста, сначала зарегистрируйтесь или войдите в аккаунт");
      //   } else {

      //     let uidFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
      //     const response = await axios.get('http://localhost:3000/user_fav_garages?user_id=${uidFromLocalStorage[0].id}&garagesale_id=${sth}');

      //     if (response.data.length > 0) {
      //       // Если элемент уже в избранном, то удаляем его
      //       await axios.delete('http://localhost:3000/user_fav_garages/${response.data[0].id}');
      //       alert('Вы успешно отписались');
      //       this.follow = false;
      //     } else {
      //       // Иначе добавляем в избранное
      //       await axios.post('http://localhost:3000/user_fav_garages', {
      //         user_id: uidFromLocalStorage[0].id,
      //         garagesale_id: sth,
      //       });
      //       alert('Вы успешно подписались на пользователя');
      //       this.follow = true;
      //     }
      //   }
      // },
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>
.FIO-text {
    font-size: 30px;
    font-weight: 400;
  }
  .btn {
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