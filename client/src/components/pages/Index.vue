<script setup lang="ts">
import RegisterForm from "~@/components/components/RegisterForm.vue";
import LoginForm from "~@/components/components/LoginForm.vue";
import {onMounted} from "vue";
import router from "~@/router.ts";
import profilePic from "~@/assets/images/square-logo-with-background.avif?url";

const serverBaseUrl = import.meta.env.VITE_BACKEND_URL as string;
const loginApiUrl = `${serverBaseUrl}/api/auth/login`;
const registerApiUrl = `${serverBaseUrl}/api/auth/register`;
const getUserInfosApiUrl = `${serverBaseUrl}/api/user/me`;
const getAttachmentApiUrl = `${serverBaseUrl}/api/attachment/`;

function handleLoginSubmit(e: SubmitEvent, loginEmailInput: HTMLInputElement, loginPasswordInput: HTMLInputElement, loginError: HTMLElement) {
  e.preventDefault();

  const data = {
    email: loginEmailInput.value,
    password: loginPasswordInput.value
  };

  fetch(loginApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.status === 200) {
      const responseJson = await response.json();
      localStorage.setItem("token", responseJson.token);
      handlePostLogin();
    } else {
      const isResponseJson = response.headers.get("content-type")?.includes("application/json");
      if (isResponseJson) {
        const responseJson = await response.json();
        loginError.textContent = responseJson.message;
      } else {
        loginError.textContent = "Une erreur est survenue";
      }
      loginError.classList.remove("d-none");
    }
  });
}

function handleRegistrationSubmit(e: SubmitEvent, registerEmailInput: HTMLInputElement, registerNameInput: HTMLInputElement, registerPasswordInput: HTMLInputElement, registerPasswordConfirmInput: HTMLInputElement, registerError: HTMLElement, registerSuccess: HTMLElement, registerForm: HTMLElement, loginForm: HTMLElement) {
  e.preventDefault();

  const data = {
    email: registerEmailInput.value,
    name: registerNameInput.value,
    password: registerPasswordInput.value,
    confirmPassword: registerPasswordConfirmInput.value
  };

  if (registerPasswordInput.value !== registerPasswordConfirmInput.value) {
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
}

function handlePostLogin() {
  fetch(getUserInfosApiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(async (response) => {
    if (response.status === 200) {
      const responseJson = await response.json();

      localStorage.setItem("userId", responseJson.id);
      localStorage.setItem("username", responseJson.username);
      localStorage.setItem("email", responseJson.email);
      localStorage.setItem("profilePictureUrl", profilePic);

      if(responseJson.profilePicture !== null) {
        localStorage.setItem("profilePictureUrl", getAttachmentApiUrl + responseJson.profilePicture);
      }

      if(responseJson.hasSeenIntro) {
        window.location.href = router.resolve({name: "messages"}).href;
      } else {
        window.location.href = router.resolve({name: "setup"}).href;
      }
    } else {
      const isResponseJson = response.headers.get("content-type")?.includes("application/json");
      if (isResponseJson) {
        const responseJson = await response.json();
        console.log(responseJson);
      } else {
        console.log("Une erreur est survenue");
      }
    }
  });
}

onMounted(() => {
  const loginForm: HTMLElement = document.getElementById("loginForm")!;
  const registerForm: HTMLElement = document.getElementById("registerForm")!;
  const showLoginFormLink: HTMLLinkElement = document.getElementById("showLoginFormLink")! as HTMLLinkElement;
  const showRegisterFormLink: HTMLLinkElement = document.getElementById("showRegisterFormLink")! as HTMLLinkElement;

  // Login form
  const loginEmailInput: HTMLInputElement = document.getElementById("loginEmailInput")! as HTMLInputElement;
  const loginPasswordInput: HTMLInputElement = document.getElementById("loginPasswordInput")! as HTMLInputElement;
  const loginError: HTMLElement = document.getElementById("loginError")!;

  // Register form
  const registerEmailInput: HTMLInputElement = document.getElementById("registerEmailInput")! as HTMLInputElement;
  const registerPasswordInput: HTMLInputElement = document.getElementById("registerPasswordInput")! as HTMLInputElement;
  const registerNameInput: HTMLInputElement = document.getElementById("registerNameInput")! as HTMLInputElement;
  const registerPasswordConfirmInput: HTMLInputElement = document.getElementById("registerPasswordConfirmInput")! as HTMLInputElement;
  const registerError: HTMLElement = document.getElementById("registerError")!;
  const registerSuccess: HTMLElement = document.getElementById("registerSuccess")!;

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

  loginForm.addEventListener("submit", (e: SubmitEvent) => {
    handleLoginSubmit(e, loginEmailInput, loginPasswordInput, loginError);
  });

  registerForm.addEventListener("submit", (e) => {
    handleRegistrationSubmit(e, registerEmailInput, registerNameInput, registerPasswordInput, registerPasswordConfirmInput, registerError, registerSuccess, registerForm, loginForm);
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