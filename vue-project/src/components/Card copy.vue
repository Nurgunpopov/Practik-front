<template>
  <section>
    <div class="row">
      <div class="card mx-auto col-auto mt-2 px-0" v-for="info in cardInfo" style="width: 230px;">
        <router-link class="card-title" :to="`/AnimeDescription/${info.id}`">
          <img class="card card-img-top" :key="info.id" :src="info.img_src">
          <a>{{info.title}}</a>
        </router-link>
        <div class="card-info">
          <div>Жанр: {{info.genre}}</div>
          <p>Тип: {{info.type}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Card",
    props:{
      cardInfo:{
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .card-img-top {
    height: 330px;
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
  .card-info {
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
  }
  .card {
    border: none;
  }
</style>