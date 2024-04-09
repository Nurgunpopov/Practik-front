<template>
  <section>
    <div v-for="item in userList" :key="item.id" class="mx-5 my-3">
      <h3>{{item.list_title}}</h3>
      <p>Количество аниме: {{item.anime_id.length}}</p>

      <div class="card-container">
        <div v-for="animeId in item.anime_id" :key="animeId" class="card-wrapper container">
          <Card :cardInfo="getAnimeInfo(animeId)"></Card>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import Card from '../components/Card'
  export default {
    name: "List",
    props:{
      listInfo:{
        type: Object,
        required: true
      }
    },
    components:{
      Card
    },
  }
</script>

<style scoped>
  hr {
    opacity: 100%;
    width: 100%;
    border-top: 2px solid #E55959; 
  }
</style>