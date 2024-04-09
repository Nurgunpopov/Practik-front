<template>
  <section>
    <div class="container justify-content-between mt-4 row mx-auto">
      <div class="container-xxl">
        <h2>Новое</h2>
        <Card :cardInfo=newAnime></Card>
      </div>
    </div>
  </section>

  <section>
    <div class="container mt-4 row mx-auto">
        <h2>Аниме дня</h2>
    </div>
  </section>
  
  <section>
    <div class="container justify-content-between mt-5 row mx-auto">
      <div class="container-xxl pt-5">
        <div class="row">
          <div class="col-12 col-xl-6 col-md-12">
            <h1>Сделай свой день интереснее с нами</h1>
            <p class="w-70 pt-3">Чем бы вы ни планировали заняться в этом году, вы всегда можете рассчитывать на помощь Meetings. С помощью Meetings люди приобретают друзей, обращаются за поддержкой, развивают свой бизнес и находят людей с общими интересами. Каждый день проводятся тысячи мероприятий — присоединяйтесь!</p>
          </div>
          <div class="col-12 col-xl-6 col-md-12">
            <img class="rounded w-100" src="../assets/Meeting.webp" alt="Meeting">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
  import axios from "axios";
  import Card from "../components/Card.vue"
  export default {
    name: "Main",
    data: function (){
      return{
        newAnime: [],
      }
    },
    components:{
      Card
    },
    methods:{
      async getNewAnime(){
        this.newAnime = []
        const res = await axios.get(`http://localhost:3000/events`);
        for (let i = res.data.length - 1; i >= res.data.length - 5 ; i--) {
          let selectedNewAnime = (await axios.get(`http://localhost:3000/events/${res.data[i].id}`)).data
          this.newAnime.push(selectedNewAnime)
        }
        console.log(this.newAnime)
      }
    },
    mounted() {
      this.getNewAnime()
    }
  }
</script>

<style scoped>
</style>