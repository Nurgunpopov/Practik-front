<template>
  <div class="my-4" style="margin-left: 80px; margin-right: 80px;">
    <div v-for="item in userList" :key="item.id">
      <router-link class="card-title" :to="`/ListDescription/${item.id}`">
        <h3>{{item.list_title}}</h3>
      </router-link>
      <p>Количество аниме: {{item.anime_id.length}}</p>

      <div class="card-container">
        <div v-for="animeId in item.anime_id" :key="animeId" class="card-wrapper container">
          <Card :cardInfo="getAnimeInfo(animeId)"></Card>
        </div>
      </div>
      <hr class="mt-3 mb-2">
    </div>
  </div>
</template>
  
<script>
  import axios from "axios";
  import Card from '../components/Card'
  export default {
    name: "List",
    data: function (){
      return{
        userList: [],
        animeData: []
      }
    },
    components:{
      Card
    },
    methods:{
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
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>
  .card-container {
    display: flex;
    flex-wrap: nowrap;
  }
  .card-wrapper {
    margin-right: 10px;
  }
  hr {
    opacity: 100%;
    width: 100%;
    border-top: 2px solid #E55959; 
  }
  .card-title {
    font-size: 18px;
    font-weight: 500;
    color:black;
    text-decoration: none;
    margin-top: 5px;
    overflow: hidden;
    white-space: nowrap;
  }
  .card-title:hover {
    text-decoration: underline;
  }
</style>
