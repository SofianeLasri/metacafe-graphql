<script setup lang="ts">
import RegisterForm from "~@/components/components/RegisterForm.vue";
import LoginForm from "~@/components/components/LoginForm.vue";
import {onMounted} from "vue";

onMounted(() => {
  const loginForm: HTMLElement = document.getElementById("loginForm")!;
  const registerForm: HTMLElement = document.getElementById("registerForm")!;
  const showLoginFormLink: HTMLLinkElement = document.getElementById("showLoginFormLink")! as HTMLLinkElement;
  const showRegisterFormLink: HTMLLinkElement = document.getElementById("showRegisterFormLink")! as HTMLLinkElement;

  showLoginFormLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
  });

  showRegisterFormLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
  });
});
</script>

<template>
  <div class="login-form">
    <div class="d-flex">
      <div class="phone-presentation">
        <img src="../../assets/images/home-presentation.avif" alt="phone-presentation"/>
      </div>
      <div class="right-part">
        <div id="loginForm">
          <LoginForm/>
        </div>
        <div id="registerForm" class="d-none">
          <RegisterForm/>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <a href="#" class="small text-light">Mentions légales</a>
      <a href="#" class="small text-light">Politique de confidentialité</a>
      <a href="#" class="small text-light">Conditions générales d'utilisation</a>
      <a href="https://sofianelasri.fr/" target="_blank" class="small text-light">2023 - Sofiane Lasri</a>
    </div>
  </div>
</template>
<style>

</style>