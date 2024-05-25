<script setup lang="ts">
import {App, createApp, onMounted} from "vue";
import router from "~@/router.ts";
import SearchZone from "~@/components/components/SearchZone.vue";
import InteractiveBadge from "~@/components/components/InteractiveBadge.vue";
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import {gql} from "@apollo/client/core";
import client from './../../apolloClient';

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const updateProfileApiUrl: string = `${serverBaseUrl}/api/user/me`;
const getAttachmentApiUrl = `${serverBaseUrl}/api/attachment/`;

const GET_CENTER_OF_INTEREST_QUERY: string = `
  query CentersOfInterest($search: String!) {
    centersOfInterest(name: $search) {
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
  mutation SetCentersOfInterest($userId: Int!, $centerOfInterestIds: [Int!]!) {
    setCentersOfInterest(userId: $userId, centerOfInterestIds: $centerOfInterestIds) {
      id
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

type CenterOfInterest = {
  id: number;
  name: string;
};

let userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
let centersList: HTMLElement | null = null;
let centersOfInterest: CenterOfInterest[] = [];
let userCentersOfInterest: CenterOfInterest[] = [];

onMounted(() => {
  const setProfilePicturePopup: HTMLElement = document.getElementById("setProfilePicturePopup")!;
  const profilePicture: HTMLElement = document.getElementById("profilePicture")!;
  const denyPpBtn: HTMLButtonElement = document.getElementById("denyPpBtn")! as HTMLButtonElement;
  const laterPpBtn: HTMLButtonElement = document.getElementById("laterPpBtn")! as HTMLButtonElement;
  const finishPpBtn: HTMLButtonElement = document.getElementById("finishPpBtn")! as HTMLButtonElement;
  const setCenterOfInterestsPopup: HTMLElement = document.getElementById("setCenterOfInterestsPopup")!;
  const nextBtn: HTMLButtonElement = document.getElementById("nextBtn")! as HTMLButtonElement;
  centersList = document.getElementById("centersList")!;

  getAllDatabaseCentersOfInterest();

  profilePicture.addEventListener("click", () => {
    // Ouvrir la boîte de dialogue pour sélectionner une image
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleImageUpload;
    input.click();
  });

  const handleImageUpload = (event: Event) => {
    // TODO: Implémenter l'envoie de photos de profil
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      client.mutate({
        mutation: UPDATE_PROFILE_PIC_MUTATION,
        variables: {
          file
        }
      }).then(response => {
        const {data} = response;
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
    if (userProfilePictureUrl === defaultProfilePic && !confirm) {
      return;
    }
    denyPpBtn.classList.add("d-none");
    laterPpBtn.classList.add("d-none");
    finishPpBtn.classList.remove("d-none");
  }

  function finishSetup() {
    // TODO: Implémenter l'envoie de photos de profil
    /*client.mutate({
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
      const {data} = response;
      if (data && data.updateProfile && data.updateProfile.success) {
        window.location.href = router.resolve({name: "dashboard"}).href;
      } else {
        console.log(data.updateProfile.message || "Une erreur est survenue");
      }
    }).catch(error => {
      console.log(error.message);
    });*/
    window.location.href = router.resolve({name: "dashboard"}).href;
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
        userId: parseInt(localStorage.getItem("userId")!),
        centerOfInterestIds: userCentersOfInterest.map(centerOfInterest => centerOfInterest.id),
      },
      context: {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    }).then(response => {
      const {data} = response;
      if (data && data.setCentersOfInterest) {
        showProfilePicturePopup();
      } else {
        console.log("Une erreur est survenue");
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

function getAllDatabaseCentersOfInterest() {
  client.query({
    query: GET_CENTERS_OF_INTEREST_QUERY,
    context: {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }
  }).then(response => {
    const {data} = response;
    if (data && data.centersOfInterest) {
      console.log("On défini centersOfInterest: " + data.centersOfInterest.length);
      centersOfInterest = data.centersOfInterest;
      // Pourquoi je faisais ça ???
      /*centersOfInterest.forEach((centerOfInterest) => {
        addCenterOfInterest(centerOfInterest);
      });*/
    } else {
      console.log("Une erreur est survenue");
    }
  }).catch(error => {
    console.log(error.message);
  });
}

/**
 * Cette fonction permet d'ajouter un centre d'intérêt à la liste des centres d'intérêt sélectionnés.
 * @param centerOfInterest
 */
function addCenterOfInterest(centerOfInterest: HTMLElement | CenterOfInterest) {
  let centerOfInterestId: number;
  let centerOfInterestName: string;

  if (centerOfInterest instanceof HTMLElement) {
    centerOfInterestId = parseInt(centerOfInterest.dataset.value!);
    centerOfInterestName = centerOfInterest.dataset.text!;
  } else {
    centerOfInterestId = centerOfInterest.id;
    centerOfInterestName = centerOfInterest.name;
  }

  userCentersOfInterest.push({id: centerOfInterestId, name: centerOfInterestName});

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

  if (userCentersOfInterest.length >= 3) {
    document.getElementById("nextBtn")!.classList.remove("d-none");
  }

}

/**
 * Cette fonction permet de retirer un centre d'intérêt de la liste des centres d'intérêt sélectionnés.
 * @param centerOfInterestId
 */
function removeCenterOfInterest(centerOfInterestId: number) {
  const centerOfInterestElement = document.getElementById("centerOfInterest-" + centerOfInterestId)!;
  centerOfInterestElement.remove();

  userCentersOfInterest = userCentersOfInterest.filter((centerOfInterest) => {
    return centerOfInterest.id !== centerOfInterestId;
  });

  if (userCentersOfInterest.length < 3) {
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
        <SearchZone id="searchBar" :search-query="GET_CENTER_OF_INTEREST_QUERY" response-field="centersOfInterest"
                    :clearInputOnResultClick="true" placeholder="Rechercher un centre d'intérêt"
                    @resultClick="addCenterOfInterest"/>
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