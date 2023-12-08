<script setup lang="ts">
import RegisterForm from "~@/components/components/RegisterForm.vue";
import LoginForm from "~@/components/components/LoginForm.vue";
import {onMounted} from "vue";
import router from "~@/router.ts";

const serverProtocol = import.meta.env.VITE_SERVER_PROTOCOL as string;
const serverHost = import.meta.env.VITE_SERVER_HOST as string;
const serverPort = import.meta.env.VITE_SERVER_PORT as string;
const serverBaseUrl = `${serverProtocol}://${serverHost}:${serverPort}`;
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
    const email: HTMLInputElement = document.getElementById("emailInput")! as HTMLInputElement;
    const password: HTMLInputElement = document.getElementById("passwordInput")! as HTMLInputElement;
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
      }
    });
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email: HTMLInputElement = document.getElementById("emailInput")! as HTMLInputElement;
    const password: HTMLInputElement = document.getElementById("passwordInput")! as HTMLInputElement;
    const name: HTMLInputElement = document.getElementById("nameInput")! as HTMLInputElement;
    const confirmPassword: HTMLInputElement = document.getElementById("passwordConfirmInput")! as HTMLInputElement;
    const registerError: HTMLElement = document.getElementById("registerError")!;

    const data = {
      email: email.value,
      name: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };

    fetch(registerApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = router.resolve({name: "messages"}).href;
      } else {
        registerError.classList.remove("d-none");
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