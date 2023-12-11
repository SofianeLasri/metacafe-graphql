<script setup lang="ts">
import SideBar from "~@/components/components/SideBar.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import Conversation from "~@/components/components/Conversation.vue";

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const updateProfileApiUrl: string = `${serverBaseUrl}/api/user/me`;
const friendsApiUrl: string = `${updateProfileApiUrl}/friends`;

type user = {
  id: number;
  name: string;
  email: string;
  hasSeenIntro: boolean;
  profilePicture: number
};

const friends = ref<user[]>([]);
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

</script>

<template>
  <div class="messages-app">
    <SideBar v-if="!isLoading" :users="friends"/>
    <Conversation/>
  </div>
</template>

<style scoped>

</style>
