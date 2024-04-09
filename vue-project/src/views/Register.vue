<template>
  <section class="mb-5 py-3">
		<div class="container-xxl col-4">
			<form>
        <p class="register-text text-center">РЕГИСТРАЦИЯ</p>

        <div class="mb-3">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
        </div>

        <div class="mb-3">
          <input type="text" class="form-control" id="username" v-model="username" placeholder="Имя пользователя">
        </div>

        <div class="mb-3">
          <input type="password" class="form-control" id="password" v-model="password" placeholder="Пароль">
        </div>

        <button type="submit" class="btn btn-reg w-100 py-3 mt-4" @click.prevent="Reg">Создать акккаунт</button>
        
        <router-link :to="{name: 'login'}">
          <button type="button" class="btn btn-login w-100 py-3 mt-3">У меня есть аккаунт</button>
        </router-link>

        <p class="text-center mt-3 mx-5" style="opacity: 0.65; font-size: 80%; font-weight: 300; margin-bottom: 2%;">Нажимая на кнопку “Создать аккаунт”, вы соглашаетесь с политикой конфиденциальности и обработки персональных данных</p>
	    </form>
		</div>
	</section>
</template>

<script>
  import axios from "axios";
  import { useStateStore } from '../store/UserStatus.js'
  export default {
    name: "Register",
    data: function (){
      return{
        email: '',
        password: '',
        username: '',
      }
    },
    methods:{
      async Reg(){
        try {
          if(this.email === "" && this.username === "" && this.password === ""){
            alert('Пожалуйста заполните все строки')
          }else{
            const result = await axios.post(`http://localhost:3000/users`, {
              email: this.email,
              password: this.password,
              username: this.username
            });
            if(result.status == 201){
              const { StateChecker } = useStateStore()
              let userData = JSON.parse(localStorage.getItem('userInfo')) || [];
              userData.push(result.data);
              localStorage.setItem('userInfo', JSON.stringify(userData));
              StateChecker(true);
              await this.$router.push({name: "Main"})
            } 
          }
        } catch (error) {
          console.error('Ошибка при регистрации:', error);
          alert('Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
        }
      }
    }
  }
</script>

<style scoped>
  .register-text {
    font-size: 340%;
    font-weight: 600;
    font-family: 'Oswald', sans-serif;
    color: #E55959;
    margin-top: 14%;
    margin-bottom: 8%;
  }
  .form-control {
    border: 2px solid #E55959; 
    height: 58px;
    border-radius: 9px;
  }
  .btn-reg {
    background-color: #E55959; 
    color: white;
    border-radius: 9px;
  }
  .btn-login {
    background-color: #b2b2b2; 
    color: white;
    border-radius: 9px;
  }
</style>