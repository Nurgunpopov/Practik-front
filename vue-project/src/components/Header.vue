<template>
  <section>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #E55959;">
        <div class="container-xxl">

          <div class="collapse navbar-collapse flex-grow-0">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="navbar-brand" :to="{name: 'Main'}">ANIME REVIEW</router-link>
              </li>
            </ul>
          </div>

          <form class="d-flex flex-grow-1" @submit.prevent="search" >
            <input class="form-control me-2" type="search" v-model="searchQuery" aria-label="Search" placeholder="Поиск..." >
            <button class="btn text-light" type="submit">Поиск</button>
          </form>
          
          <div class="collapse navbar-collapse flex-grow-0 justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-link active">
                <router-link :to="{name: 'anime'}"><button type="button" class="btn text-light" id="anime">Аниме</button></router-link>
              </li>
              <li class="nav-link active" v-show="UserStatusChecker">
                <router-link :to="{name: 'list'}"><button type="button" class="btn text-light" id="list">Мои списки</button></router-link>
              </li>
              <li class="nav-link active" v-show="UserStatusChecker==false">
                <router-link :to="{name: 'login'}"><button type="button" class="btn text-light" id="login">Войти</button></router-link>
              </li>
              <li class="nav-link active" v-show="UserStatusChecker">
                <router-link :to="{name: 'profile'}"><button type="button" class="btn text-light" id="profile">Профиль</button></router-link>
              </li>
              <li class="nav-link active" v-show="UserStatusChecker">
                <button type="button" class="btn" @click.prevent="logout" id="logout" style="color: aliceblue;">Выйти</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </section>
</template>

<script>
  import { storeToRefs } from 'pinia'
  import { useStateStore } from '../store/UserStatus.js'
  import axios from 'axios'
  export default {
    name: "Header",
    data: function(){
      return{
        UserStatusChecker: null,
      }
    },
    methods:{
      check(){
        const  { userState } = storeToRefs(useStateStore())
        this.UserStatusChecker= userState;
      },
      async logout(){
        const { StateChecker } = useStateStore()
        localStorage.clear();
        StateChecker(false);
        this.UserStatusChecker = false;
        await this.$router.push({name: 'Main'})
      },
      async search() {
        try {
          const res = await axios.get('http://localhost:3000/events');
          const animeData = res.data;
          const searchResults = animeData.filter(anime =>
            anime.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          console.log("Карточка аниме", this.searchQuery)
          this.$router.push({ name: 'anime', props: { searchQuery: [] } });
        } catch (error) {
          console.error('Ошибка при выполнении поиска:', error);
        }
      }
    },
    mounted(){
      this.check()
    }
  }
</script>

<style scoped>
header {
	position: sticky;
	z-index: 1000;
	top: 0;
}
.form-control {
  height: 30px;
  width: 100%;
  margin-top: 4px;
}
.navbar-brand {
  font-family: 'Oswald', sans-serif;
  font-size: 180%;
  font-weight: 600;
}
</style>