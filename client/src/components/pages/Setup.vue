<script setup lang="ts">
import {onMounted} from "vue";
import router from "~@/router.ts";

const serverBaseUrl = import.meta.env.VITE_BACKEND_URL as string;
const updateProfileApiUrl = `${serverBaseUrl}/api/user/me`;

onMounted(() => {
  const profilePicture = document.getElementById("profilePicture");
  const denyBtn = document.getElementById("denyBtn");
  const laterBtn = document.getElementById("laterBtn");

  denyBtn.addEventListener("click", () => {
    fetch(updateProfileApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        hasSeenIntro: true
      })
    }).then(async (response) => {
      if (response.status === 201) {
        window.location.href = router.resolve({name: "messages"}).href;
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
  });

  laterBtn.addEventListener("click", () => {
    window.location.href = router.resolve({name: "messages"}).href;
  });
});
</script>

<template>
  <div class="popup-card">
    <div id="profilePicture" class="profile-picture"></div>

    <div class="content mt-5">
      <h4>Personnalisons votre profil</h4>
      <p>Envoyez une image pour aider les autres à mieux vous reconnaitre.</p>
    </div>

    <div class="actions">
      <button id="denyBtn" type="button" class="negative">Non</button>
      <button id="laterBtn" type="button" class="neutral">Plus-tard</button>
    </div>
  </div>
</template>

<style scoped>

</style>