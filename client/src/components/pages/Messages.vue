<script setup lang="ts">
import SideBar from "~@/components/components/SideBar.vue";
import {onMounted, ref} from "vue";
import Conversation from "~@/components/components/Conversation.vue";
import {userPublicProfile} from "~@/types.ts";

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const updateProfileApiUrl: string = `${serverBaseUrl}/api/user/me`;
const friendsApiUrl: string = `${updateProfileApiUrl}/friends`;

const friends = ref<userPublicProfile[]>([]);
const isLoading = ref(true);

function getFriends() {
  fetch(friendsApiUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  }).then(async (response) => {
    isLoading.value = false; // Mettez à jour l'état de chargement lorsque la requête est terminée
    if (response.status === 200) {
      friends.value = await response.json();
    } else {
      const isResponseJson = response.headers.get("content-type")?.includes("application/json");
      if (isResponseJson) {
        const responseJson = await response.json();
        console.error(responseJson.message);
      } else {
        console.error("Une erreur est survenue");
      }
    }
  });
}

onMounted(() => {
  getFriends();
});

function loadConversation(user: userPublicProfile) {
  const noConversation = document.getElementById("noConversation")!;
  noConversation.classList.add("d-none");

}

</script>

<template>
  <div class="messages-app">
    <SideBar v-if="!isLoading" :users="friends" @profileClicked="loadConversation"/>
    <Conversation ref="conversation" class="d-none"/>

    <div id="noConversation" class="no-conversation flex-grow-1 d-flex flex-column align-items-center justify-content-center text-white">
      <div class="content d-flex flex-column align-items-center justify-content-center text-center">
        <img src="../../assets/images/logo.svg" alt="Métacafé logo" class="mb-2" style="width: 5rem; height: 5rem;"/>
        <h4>Bienvenue sur Métacafé !</h4>
        <p>Ici vous pouvez discuter avec des personnes ayant les mêmes centres d'intérêts que vous !</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
