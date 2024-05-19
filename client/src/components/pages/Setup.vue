<script setup lang="ts">
import {App, createApp, onMounted} from "vue";
import router from "~@/router.ts";
import SearchZone from "~@/components/components/SearchZone.vue";
import InteractiveBadge from "~@/components/components/InteractiveBadge.vue";
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import { gql } from "@apollo/client/core";
import client from './../../apolloClient';

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const updateProfileApiUrl: string = `${serverBaseUrl}/api/user/me`;
const getAttachmentApiUrl = `${serverBaseUrl}/api/attachment/`;

const GET_CENTER_OF_INTEREST_QUERY: string = `
  query GetCenterOfInterest($search: String!) {
    centerOfInterest(search: $search) {
      id
      name
    }
  }
`;

const GET_CENTERS_OF_INTEREST_QUERY = gql`
  query GetCentersOfInterest {
    centersOfInterest {
      id
      name
    }
  }
`;

const UPDATE_CENTERS_OF_INTEREST_MUTATION = gql`
  mutation UpdateCentersOfInterest($centersOfInterest: [ID!]!) {
    updateCentersOfInterest(centersOfInterest: $centersOfInterest) {
      success
      message
    }
  }
`;

const UPDATE_PROFILE_PIC_MUTATION = gql`
  mutation UpdateProfilePic($file: Upload!) {
    updateProfilePic(file: $file) {
      profilePicture
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($hasSeenIntro: Boolean!) {
    updateProfile(hasSeenIntro: $hasSeenIntro) {
      success
      message
    }
  }
`;

type centerOfInterest = {
  id: number;
  name: string;
};

let userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
let centersList: HTMLElement | null = null;
let centersOfInterest: centerOfInterest[] = [];

onMounted(() => {
  const setProfilePicturePopup: HTMLElement = document.getElementById("setProfilePicturePopup")!;
  const profilePicture: HTMLElement = document.getElementById("profilePicture")!;
  const denyPpBtn: HTMLButtonElement = document.getElementById("denyPpBtn")! as HTMLButtonElement;
  const laterPpBtn: HTMLButtonElement = document.getElementById("laterPpBtn")! as HTMLButtonElement;
  const finishPpBtn: HTMLButtonElement = document.getElementById("finishPpBtn")! as HTMLButtonElement;
  const setCenterOfInterestsPopup: HTMLElement = document.getElementById("setCenterOfInterestsPopup")!;
  const nextBtn: HTMLButtonElement = document.getElementById("nextBtn")! as HTMLButtonElement;
  centersList = document.getElementById("centersList")!;

  getCentersOfInterest();

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
      client.mutate({
        mutation: UPDATE_PROFILE_PIC_MUTATION,
        variables: {
          file
        }
      }).then(response => {
        const { data } = response;
        if (data && data.updateProfilePic) {
          const newProfilePictureUrl = getAttachmentApiUrl + data.updateProfilePic.profilePicture;
          localStorage.setItem("profilePictureUrl", newProfilePictureUrl);
          userProfilePictureUrl = newProfilePictureUrl;
          profilePicture.style.backgroundImage = `url(${userProfilePictureUrl})`;

          showFinishButton(true);
        } else {
          console.log("Une erreur est survenue");
        }
      }).catch(error => {
        console.log(error.message);
      });
    }
  };

  function showFinishButton(confirm: boolean = false) {
    if(userProfilePictureUrl === defaultProfilePic && !confirm) {
      return;
    }
    denyPpBtn.classList.add("d-none");
    laterPpBtn.classList.add("d-none");
    finishPpBtn.classList.remove("d-none");
  }

  function finishSetup() {
    client.mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: {
        hasSeenIntro: true
      },
      context: {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    }).then(response => {
      const { data } = response;
      if (data && data.updateProfile && data.updateProfile.success) {
        window.location.href = router.resolve({ name: "messages" }).href;
      } else {
        console.log(data.updateProfile.message || "Une erreur est survenue");
      }
    }).catch(error => {
      console.log(error.message);
    });
  }

  denyPpBtn.addEventListener("click", () => {
    finishSetup();
  });

  laterPpBtn.addEventListener("click", () => {
    window.location.href = router.resolve({name: "messages"}).href;
  });

  finishPpBtn.addEventListener("click", () => {
    finishSetup();
  });

  nextBtn.addEventListener("click", () => {
    client.mutate({
      mutation: UPDATE_CENTERS_OF_INTEREST_MUTATION,
      variables: {
        centersOfInterest: centersOfInterest.map((centerOfInterest) => centerOfInterest.id)
      },
      context: {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    }).then(response => {
      const { data } = response;
      if (data && data.updateCentersOfInterest && data.updateCentersOfInterest.success) {
        showProfilePicturePopup();
      } else {
        console.log(data.updateCentersOfInterest.message || "Une erreur est survenue");
      }
    }).catch(error => {
      console.log(error.message);
    });
  });

  function showProfilePicturePopup() {
    setCenterOfInterestsPopup.classList.add("d-none");
    showFinishButton();
    setProfilePicturePopup.classList.remove("d-none");
  }
});

function getCentersOfInterest() {
  client.query({
    query: GET_CENTERS_OF_INTEREST_QUERY,
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
  }).then(response => {
    const { data } = response;
    if (data && data.centersOfInterest) {
      centersOfInterest = data.centersOfInterest;
      centersOfInterest.forEach((centerOfInterest) => {
        addCenterOfInterest(centerOfInterest);
      });
    } else {
      console.log("Une erreur est survenue");
    }
  }).catch(error => {
    console.log(error.message);
  });
}

function addCenterOfInterest(centerOfInterest: HTMLElement|centerOfInterest) {
  let centerOfInterestId: number;
  let centerOfInterestName: string;

  if (centerOfInterest instanceof HTMLElement) {
    centerOfInterestId = parseInt(centerOfInterest.dataset.value!);
    centerOfInterestName = centerOfInterest.dataset.text!;
  } else {
    centerOfInterestId = centerOfInterest.id;
    centerOfInterestName = centerOfInterest.name;
  }

  centersOfInterest.push({id: centerOfInterestId, name: centerOfInterestName});

  let tempDiv = document.createElement("div");
  let badgeVueComponent: App<Element> = createApp({extends: InteractiveBadge}, {
    text: centerOfInterestName,
    id: "centerOfInterest-" + centerOfInterestId
  });

  badgeVueComponent.mount(tempDiv);

  let closeBtn = tempDiv.firstElementChild!.querySelector(".btn-close")!;
  closeBtn.addEventListener("click", (event) => {
    removeCenterOfInterest(centerOfInterestId);
  });

  centersList!.appendChild(tempDiv.firstElementChild!);

  if (centersOfInterest.length >= 3) {
    document.getElementById("nextBtn")!.classList.remove("d-none");
  }
}

function removeCenterOfInterest(centerOfInterestId: number) {
  const centerOfInterestElement = document.getElementById("centerOfInterest-" + centerOfInterestId)!;
  centerOfInterestElement.remove();

  centersOfInterest = centersOfInterest.filter((centerOfInterest) => {
    return centerOfInterest.id !== centerOfInterestId;
  });

  if (centersOfInterest.length < 3) {
    document.getElementById("nextBtn")!.classList.add("d-none");
  }
}
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
      <button id="finishPpBtn" type="button" class="positive d-none">Terminé !</button>
    </div>
  </div>
  <div id="setCenterOfInterestsPopup" class="popup-card align-items-start">
    <div class="content">
      <h4>Qu'est-ce qui vous passionne ?</h4>
      <div class="mt-3">
        <SearchZone id="searchBar" :search-query="GET_CENTER_OF_INTEREST_QUERY" response-field="centerOfInterest"
                    placeholder="Rechercher un centre d'intérêt" @resultClick="addCenterOfInterest" />
        <p class="text-muted small mt-1">Choisissez au moins 3 centres d'intérêt.</p>
      </div>

      <div id="centersList" class="d-flex flex-wrap gap-2"></div>
    </div>

    <div class="actions">
      <button id="nextBtn" type="button" class="neutral d-none">Suivant</button>
    </div>
  </div>
</template>

<style scoped>

</style>