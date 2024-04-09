<template>
  <section>
    <div v-for="item in reviewInfo" :key="item.id">
      <hr class="my-2">
      <router-link class="title" :to="`/User/${item.user_id}`">
          <div>{{item.username}}</div>
      </router-link>
      <div>{{item.review}}</div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Review",
    props:{
      reviewInfo:{
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  hr {
    opacity: 100%;
    width: 100%;
    border-top: 2px solid red; 
  }
  .title {
    color:black;
    text-decoration: none;
    margin-top: 5px;
    overflow: hidden;
    white-space: nowrap;
  }
  .title:hover {
    text-decoration: underline;
  }
</style>