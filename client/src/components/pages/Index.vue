<script setup lang="ts">
import RegisterForm from "~@/components/components/RegisterForm.vue";
import LoginForm from "~@/components/components/LoginForm.vue";
import {onMounted} from "vue";
import router from "~@/router.ts";
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import {gql} from "@apollo/client/core";
import client from './../../apolloClient';

const serverBaseUrl = import.meta.env.VITE_BACKEND_URL as string;
const loginApiUrl = `${serverBaseUrl}/api/auth/login`;
const registerApiUrl = `${serverBaseUrl}/api/auth/register`;
const getUserInfosApiUrl = `${serverBaseUrl}/api/user/me`;
const getAttachmentApiUrl = `${serverBaseUrl}/api/attachment/`;

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      username
    }
  }
`;

const GET_USER_INFOS_QUERY = gql`
  query GetUserInfos {
    me {
      id
      name
      email
      profilePicture
      hasSeenIntro
    }
  }
`;

function handleLoginSubmit(e: SubmitEvent, loginEmailInput: HTMLInputElement, loginPasswordInput: HTMLInputElement, loginError: HTMLElement) {
  e.preventDefault();

  const data = {
    email: loginEmailInput.value,
    password: loginPasswordInput.value
  };

  client.mutate({
    mutation: LOGIN_MUTATION,
    variables: data
  }).then(response => {
    const {data} = response;
    if (data && data.login) {
      localStorage.setItem("token", data.login.token);
      handlePostLogin();
    } else {
      loginError.textContent = "Une erreur est survenue";
      loginError.classList.remove("d-none");
    }
  }).catch(error => {
    loginError.textContent = error.message;
    loginError.classList.remove("d-none");
  });
}

function handleRegistrationSubmit(e: SubmitEvent, registerEmailInput: HTMLInputElement, registerNameInput: HTMLInputElement, registerPasswordInput: HTMLInputElement, registerPasswordConfirmInput: HTMLInputElement, registerError: HTMLElement, registerSuccess: HTMLElement, registerForm: HTMLElement, loginForm: HTMLElement) {
  e.preventDefault();

  const data = {
    email: registerEmailInput.value,
    username: registerNameInput.value,
    password: registerPasswordInput.value
  };

  if (registerPasswordInput.value !== registerPasswordConfirmInput.value) {
    registerError.textContent = "Les mots de passe ne correspondent pas";
    registerError.classList.remove("d-none");
    return;
  }

  client.mutate({
    mutation: REGISTER_MUTATION,
    variables: data
  }).then(response => {
    const { data } = response;

    if (data && data.createUser.id && data.createUser.username) {
      registerSuccess.classList.remove("d-none");
      registerError.classList.add("d-none");
      registerForm.classList.add("d-none");
      loginForm.classList.remove("d-none");
    } else {
      registerError.textContent = "Une erreur est survenue";
      registerError.classList.remove("d-none");
    }
  }).catch(error => {
    registerError.textContent = "Une erreur est survenue";
    registerError.classList.remove("d-none");
    console.error(error.message);
  });
}

function handlePostLogin() {
  client.query({
    query: GET_USER_INFOS_QUERY,
    fetchPolicy: 'network-only', // Pour s'assurer d'obtenir les données les plus récentes
  }).then(response => {
    const { data } = response;
    if (data && data.me) {
      const user = data.me;
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("profilePictureUrl", defaultProfilePic);

      if (user.profilePicture !== null) {
        localStorage.setItem("profilePictureUrl", getAttachmentApiUrl + user.profilePicture);
      }

      if (user.hasSeenIntro) {
        window.location.href = router.resolve({ name: "messages" }).href;
      } else {
        window.location.href = router.resolve({ name: "setup" }).href;
      }
    } else {
      console.log("Une erreur est survenue");
    }
  }).catch(error => {
    console.log(error.message);
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
      <span class="small text-light">
        2024 -
        <a href="https://github.com/FlorianB30" target="_blank" class="text-light">Floriant Biendiné</a>,
        <a href="https://sofianelasri.fr/" target="_blank" class="text-light">Sofiane Lasri</a>,
        <a href="https://github.com/Dorianmav" target="_blank" class="text-light">Dorian Mavoungoud</a> &
        <a href="https://github.com/Paul-HenryN" target="_blank" class="text-light">Paul-Henry Ngounou</a>
      </span>
    </div>
  </div>
</template>
<style>

</style>