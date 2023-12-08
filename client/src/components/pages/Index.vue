<script setup lang="ts">
import RegisterForm from "~@/components/components/RegisterForm.vue";
import LoginForm from "~@/components/components/LoginForm.vue";
import {onMounted} from "vue";
import router from "~@/router.ts";

const serverBaseUrl = import.meta.env.VITE_BACKEND_URL as string;
const loginApiUrl = `${serverBaseUrl}/api/auth/login`;
const registerApiUrl = `${serverBaseUrl}/api/auth/register`;

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

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email: HTMLInputElement = document.getElementById("loginEmailInput")! as HTMLInputElement;
    const password: HTMLInputElement = document.getElementById("loginPasswordInput")! as HTMLInputElement;
    const loginError: HTMLElement = document.getElementById("loginError")!;

    const data = {
      email: email.value,
      password: password.value
    };

    fetch(loginApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = router.resolve({name: "messages"}).href;
      } else {
        loginError.classList.remove("d-none");
        console.log(response.text());
      }
    });
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email: HTMLInputElement = document.getElementById("registerEmailInput")! as HTMLInputElement;
    const password: HTMLInputElement = document.getElementById("registerPasswordInput")! as HTMLInputElement;
    const name: HTMLInputElement = document.getElementById("registerNameInput")! as HTMLInputElement;
    const confirmPassword: HTMLInputElement = document.getElementById("registerPasswordConfirmInput")! as HTMLInputElement;
    const registerError: HTMLElement = document.getElementById("registerError")!;
    const registerSuccess: HTMLElement = document.getElementById("registerSuccess")!;

    const data = {
      email: email.value,
      name: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };

    if(password.value !== confirmPassword.value) {
      registerError.classList.remove("d-none");
      return;
    }

    fetch(registerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        registerSuccess.classList.remove("d-none");
        registerError.classList.add("d-none");
        registerForm.classList.add("d-none");
        loginForm.classList.remove("d-none");
      } else {
        registerError.classList.remove("d-none");
        console.log(response.body);
      }
    });
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