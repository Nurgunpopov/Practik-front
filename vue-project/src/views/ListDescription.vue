<template>
  <div class="mt-4 mb-5" style="margin-left: 80px; margin-right: 80px;">
    <h3>{{this.userList.list_title}}</h3>
    <p v-if="this.userList.anime_id !== undefined">Количество аниме: {{this.userList.anime_id.length}}</p>
    <div class="card-container"  v-if="this.userList.anime_id !== undefined">
      <div v-for="animeId in userList.anime_id" :key="animeId" class="card-wrapper container">
        <Card :cardInfo="getAnimeInfo(animeId)"></Card>
      </div>
    </div>
  </div>
</template>
  
<script>
  import axios from "axios";
  import Card from '../components/Card'
  export default {
    name: "ListDescription",
    data: function (){
      return{
        URLParam: this.$route.params.id,
        userList: [],
        animeData: [],
      }
    },
    components:{
      Card
    },
    methods:{
      async getList() {
        try {
          const res = await axios.get(`http://localhost:3000/user_list/${this.URLParam}`);
          this.userList = res.data;
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
</style>
