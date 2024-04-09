<template>
  <section>
    <div class="container justify-content mt-3 mx-auto mb-5">
      <div class="container-xxl pt-2">
        <div class="row">
          <div class="col-xl-10 col-md-9">
            <h2>Аниме</h2>
            <Card :cardInfo=searchResults></Card>
          </div>
        </div>
      </div>
    </div>

    <div class="container justify-content mt-3 mx-auto mb-5">
      <div class="container-xxl pt-2">
        <div class="row">
          <div class="col-xl-10 col-md-9">
            <h2>Аниме</h2>
            <div class="row">
              <div class="col-auto">
                <p class="mt-1">Сортировать по:</p>
              </div>
              <div class="col mb-2" @change="checkSort">
                <div class="dropdown">
                  <select class="form-select" aria-label=".form-select-lg example" id="sort">
                    <option value="id">Дате добавления</option>
                    <option value="release">Дате выхода</option>
                    <option value="title">Названию</option>
                    <option value="rating">Рейтингу</option>
                  </select>
                </div>
              </div>
            </div>
            <Card :cardInfo=filteredArray></Card>
          </div>
          <div class="col-xl-2 col-md-3" style="margin-bottom: 22%;">
            <div class="d-flex justify-content-between" @change="checkfilter">
              <div>
                <h5 class="mt-2 mb-2">Фильтрация по:</h5>
                <p class="mt-2 mt-4 mb-2">Жанру:</p>
                <div class="dropdown">
                  <select class="form-select" aria-label=".form-select-lg example" id="genre">
                    <option>Выберите жанр</option>
                    <option value="Вампиры">Вампиры</option>
                    <option value="Военное">Военное</option>
                    <option value="Гарем">Гарем</option>
                    <option value="Демоны">Демоны</option>
                    <option value="Детектив">Детектив</option>
                    <option value="Драма">Драма</option>
                    <option value="Игры">Игры</option>
                    <option value="Комедия">Комедия</option>
                    <option value="Магия">Магия</option>
                    <option value="Меха">Меха</option>
                    <option value="Музыка">Музыка</option>
                    <option value="Повседневность">Повседневность</option>
                    <option value="Приключения">Приключения</option>
                    <option value="Психологические">Психологические</option>
                    <option value="Романтика">Романтика</option>
                    <option value="Сверхъестественное">Сверхъестественное</option>
                    <option value="Сёдзё">Сёдзё</option>
                    <option value="Сёнэн">Сёнэн</option>
                    <option value="Спорт">Спорт</option>
                    <option value="Триллер">Триллер</option>
                    <option value="Ужасы">Ужасы</option>
                    <option value="Фантастика">Фантастика</option>
                    <option value="Фэнтези">Фэнтези</option>
                    <option value="Школа">Школа</option>
                  </select>
                </div>
                <p class="mt-2 mb-2">Типу:</p>
                <div class="dropdown">
                  <select class="form-select" aria-label=".form-select-lg example" id="type">
                    <option>Выберите тип</option>
                    <option value="ТВ Сериал">ТВ сериал</option>
                    <option value="Фильм">Фильм</option>
                    <option value="OVA">OVA</option>
                    <option value="Спешл">Спешл</option>
                  </select>
                </div>
              </div>
            </div>
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
    name: "Anime",
    data: function () {
      return{
        filteredArray: [],
        sortBy: '',
        searchResults: [],
      }
    },
    components:{
      Card
    },
    methods:{
      async APIData(){
        try{
          const res = await axios.get(`http://localhost:3000/events`);
          this.APIResponse = res.data;
          this.APIResponse.sort((a, b) => b.id - a.id);
          this.filteredArray = res.data;
          console.log("asd", this.filteredArray)
        }catch (error){
          console.log("error", error)
        }
      },
      checkfilter(){
        this.filteredArray = []
        while(this.filteredArray.length > 0) {
          this.filteredArray.pop();
        }
        const genreValue = document.getElementById("genre").value;
        const typeValue = document.getElementById("type").value;
        for (let i = 0; i < this.APIResponse.length; i++) {
          if ((this.APIResponse[i].genre.indexOf(genreValue)!==-1 || genreValue==="Выберите жанр") && 
              (typeValue===this.APIResponse[i].type || typeValue==="Выберите тип")) {
                this.filteredArray.push(this.APIResponse[i])
          } else {
            console.log("API data error")
          }
        }
      },
      async checkSort(event){
        this.sortBy = event.target.value;
        switch (this.sortBy) {
          case "id":
            this.filteredArray.sort((a, b) => b.id - a.id);
            break;
          case "release":
            this.filteredArray.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case "title":
            this.filteredArray.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "rating":
            this.filteredArray.sort((a, b) => b.rating - a.rating);
            break;
          default:
            break;
        }
      },
      async setRating(event, animeId) {
        try {
          const rating = parseInt(event.target.value);
          const response = await axios.put(
            `http://localhost:3000/events/${animeId}`,
            { rating: rating }
          );
          console.log("Рейтинг успешно установлен:", response);
        } catch (error) {
          console.error("Ошибка при установке рейтинга:", error);
        }
      },
      async searchResult() {
        try {
          this.searchQuery = this.$route.query.searchQuery
          this.searchResults = []
          const res = await axios.get('http://localhost:3000/events');
          const animeData = res.data;
          this.searchResults = animeData.filter(anime => anime.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        } catch (error) {
          console.error("error", error);
        }
      }
    },
    mounted() {
      this.APIData()
      this.checkSort()
      this.searchResult()
    }
  }
</script>

<style scoped>
  .left-align {
    text-align: left !important;
  }
  .form-select {
    border: 2px solid #E55959; 
    border-radius: 9px;
    width: 200px;
  }
</style>