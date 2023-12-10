<script setup lang="ts">
import {onMounted} from "vue";
import router from "~@/router.ts";

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const updateProfileApiUrl: string = `${serverBaseUrl}/api/user/me`;
const updateProfilePicApiUrl: string = `${updateProfileApiUrl}/updateProfilePic`;
const getAttachmentApiUrl = `${serverBaseUrl}/api/attachment/`;

let userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;

onMounted(() => {
  const setProfilePicturePopup: HTMLElement = document.getElementById("setProfilePicturePopup")!;
  const profilePicture: HTMLElement = document.getElementById("profilePicture")!;
  const denyBtn: HTMLButtonElement = document.getElementById("denyBtn")! as HTMLButtonElement;
  const laterBtn: HTMLButtonElement = document.getElementById("laterBtn")! as HTMLButtonElement;

  profilePicture.addEventListener("click", () => {
    // Ouvrir la boîte de dialogue pour sélectionner une image
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleImageUpload;
    input.click();
  });

  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Créer un objet FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append("profilePicture", file);

      // Envoyer la requête au serveur
      fetch(updateProfilePicApiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      }).then(async (response) => {
        if (response.ok) {
          const responseJson = await response.json();
          const newProfilePictureUrl = getAttachmentApiUrl + responseJson.profilePicture;
          localStorage.setItem("profilePictureUrl", newProfilePictureUrl);
          userProfilePictureUrl = newProfilePictureUrl;
          profilePicture.style.backgroundImage = `url(${userProfilePictureUrl})`;
          //window.location.href = router.resolve({ name: "messages" }).href;
        } else {
          // Gérer les erreurs
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
  };

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
  <div id="setProfilePicturePopup" class="popup-card">
    <div id="profilePicture" class="profile-picture"
         :style="{'background-image': `url(${userProfilePictureUrl})`}"></div>

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