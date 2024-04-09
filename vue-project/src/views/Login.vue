<template>
  <section class="py-3">
    <div class="container-sm col-4">
      <form>
        <p class="login-text text-center">АВТОРИЗАЦИЯ</p>

        <div class="mb-3">
          <input type="email" class="form-control" id="email" name="email" v-model="email" placeholder="Email">
        </div>

				<div class="mb-3">
          <input type="password" class="form-control" id="password" name="password" v-model="password" placeholder="Пароль">
        </div>

        <button type="submit" class="btn btn-login w-100 py-3 mt-3" @click.prevent="LogIn">Войти</button>

        <router-link :to="{name: 'register'}">
          <button type="button" class="btn btn-reg w-100 py-3 mt-3">Регистарция</button>
        </router-link>

        <p class="text-center mt-3 mx-5" style="opacity: 0.65; font-size: 80%; font-weight: 300; margin-bottom: 20%;">Нажимая на кнопку “Войти”, вы соглашаетесь с политикой конфиденциальности и обработки персональных данных</p>
      </form>
    </div>
  </section>
</template>

<script>
  import axios from "axios";
  import { useStateStore } from '../store/UserStatus.js'
  export default {
    name: "Login",
    data: function (){
      return{
        email: '',
        password: '',
      }
    },
    methods:{
      async LogIn(){
        if(this.email !== "" && this.password !== ""){
          const res = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
          if(res.status==200 && res.data.length>0){
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            await this.$router.push({name: "Main"})
            const { StateChecker } = useStateStore()
            StateChecker(true);
          }else{
            alert("Ошибка, попробуйте еще раз")
          }
        }else{
          alert("Пожалуйста заполните все строки")
        }
      }
    }
  }
</script>

<style scoped>
  .login-text {
    font-size: 320%;
    font-weight: 600;
    font-family: 'Oswald', sans-serif;
    color: #E55959;
    margin-top: 22%;
    margin-bottom: 8%;
  }
  .form-control {
    border: 2px solid #E55959; 
    height: 58px;
    border-radius: 9px;
  }
  .btn-login {
    background-color: #E55959; 
    color: white;
    border-radius: 9px;
  }
  .btn-reg {
    background-color: #b2b2b2; 
    color: white;
    border-radius: 9px;
  }
</style>