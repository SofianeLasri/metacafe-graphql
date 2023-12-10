<script setup lang="ts">
import {onMounted} from "vue";
import router from "~@/router.ts";
import SearchZone from "~@/components/components/SearchZone.vue";
import InteractiveBadge from "~@/components/components/InteractiveBadge.vue";

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const updateProfileApiUrl: string = `${serverBaseUrl}/api/user/me`;
const updateProfilePicApiUrl: string = `${updateProfileApiUrl}/updateProfilePic`;
const getAttachmentApiUrl = `${serverBaseUrl}/api/attachment/`;

let userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;

onMounted(() => {
  const setProfilePicturePopup: HTMLElement = document.getElementById("setProfilePicturePopup")!;
  const profilePicture: HTMLElement = document.getElementById("profilePicture")!;
  const denyPpBtn: HTMLButtonElement = document.getElementById("denyPpBtn")! as HTMLButtonElement;
  const laterPpBtn: HTMLButtonElement = document.getElementById("laterPpBtn")! as HTMLButtonElement;

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

  denyPpBtn.addEventListener("click", () => {
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

  laterPpBtn.addEventListener("click", () => {
    window.location.href = router.resolve({name: "messages"}).href;
  });
});
</script>

<template>
  <div id="setProfilePicturePopup" class="popup-card d-none">
    <div id="profilePicture" class="profile-picture"
         :style="{'background-image': `url(${userProfilePictureUrl})`}"></div>

    <div class="content mt-5">
      <h4>Personnalisons votre profil</h4>
      <p>Envoyez une image pour aider les autres à mieux vous reconnaitre.</p>
    </div>

    <div class="actions">
      <button id="denyPpBtn" type="button" class="negative">Non</button>
      <button id="laterPpBtn" type="button" class="neutral">Plus-tard</button>
    </div>
  </div>
  <div id="setCenterOfInterestsPopup" class="popup-card align-items-start">
    <div class="content">
      <h4>Qu'est-ce qui vous passionne ?</h4>
      <div class="mt-3">
        <SearchZone placeholder="Rechercher un centre d'intérêt"/>
        <p class="text-muted small mt-1">Choisissez au moins 3 centres d'intérêt.</p>
      </div>

      <div id="centersList d-flex flex-wrap">
        <InteractiveBadge text="Jeux Vidéos"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>