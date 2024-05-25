<script setup lang="ts">
import SideBar from "~@/components/components/SideBar.vue";
import {onMounted, ref} from "vue";
import {userPublicProfile, EmojiDataByGroup, Activity} from "~@/types.ts";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSmile, faImage} from '@fortawesome/free-regular-svg-icons'
import {faMicrophone, faBars} from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import Message from "~@/components/components/Message.vue";
import profilePic from "~@/assets/images/square-logo-with-background.avif?url";
import emojiByGroup from "unicode-emoji-json/data-by-group.json";

library.add(faSmile, faImage, faMicrophone, faBars);

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const userApiUrl: string = `${serverBaseUrl}/api/user`;
const updateProfileApiUrl: string = `${userApiUrl}/me`;
const friendsApiUrl: string = `${updateProfileApiUrl}/friends`;
const activitiesApiUrl: string = `${updateProfileApiUrl}/activity`;

const allCachedUsers = ref<userPublicProfile[]>([]);
const friends = ref<userPublicProfile[]>([]);
const activities = ref<Activity[]>([]);
const isLoading = ref(0);

const emojiDataByGroup: EmojiDataByGroup = JSON.parse(JSON.stringify(emojiByGroup));

let conversation: HTMLElement | null = null;
let noConversation: HTMLElement | null = null;
let currentConversation: userPublicProfile | null = null;

function getFriends() {
  fetch(friendsApiUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  }).then(async (response) => {
    if (response.status === 200) {
      friends.value = await response.json();
      isLoading.value++;

      for (const friend of friends.value) {
        if (!allCachedUsers.value.some((otherUser) => otherUser.id === friend.id)) {
          allCachedUsers.value.push(friend);
        }
      }
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

function getActivities() {
  fetch(activitiesApiUrl, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  }).then(async (response) => {
    if (response.status === 200) {
      activities.value = await response.json();
      isLoading.value++;

      for (const activity of activities.value) {
        if (!allCachedUsers.value.some((user) => user.id === activity.targetUserId)) {
          let targetUser: userPublicProfile | null = await getUserPublicProfile(activity.targetUserId);
          if (targetUser) {
            allCachedUsers.value.push(targetUser);
          }
        }
      }
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

async function getUserPublicProfile(userId: number): Promise<userPublicProfile | null> {
  let user: userPublicProfile | null = null;

  let promise = fetch(userApiUrl + "/" + userId, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  }).then(async (response) => {
    if (response.status === 200) {
      user = await response.json();
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

  await promise;
  return user;
}

function getCachedUserPublicProfile(userId: number): userPublicProfile | null {
  let user: userPublicProfile | null = null;

  if (allCachedUsers.value.length > 0) {
    user = allCachedUsers.value.find((otherUser) => otherUser.id === userId)!;
  }

  return user;
}

onMounted(() => {
  getFriends();
  getActivities();

  conversation = document.getElementById("conversation")!;
  noConversation = document.getElementById("noConversation")!;
  const openSidebarBtn: HTMLElement = document.getElementById("openSidebarBtn")!;
  const sidebar: HTMLElement = document.getElementById("sidebar")!;
  const emojiListContainer: HTMLElement = document.getElementById("emojiListContainer")!;
  const messageInput: HTMLInputElement = document.getElementById("messageInput")! as HTMLInputElement;
  createEmojiGroupsDomElements(emojiDataByGroup, emojiListContainer, messageInput);
  const emojiPicker: HTMLElement = document.getElementById("emojiPicker")!;
  const pickEmojiBtn: HTMLElement = document.getElementById("pickEmojiBtn")!;

  pickEmojiBtn.addEventListener("click", () => {
    emojiPicker.classList.toggle("active");
  });

  openSidebarBtn.addEventListener("click", () => {
    sidebar.style.left = "0";
  });

  initConversation();

  function initConversation() {
    // On regarde si on a un paramètre userId dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");

    if (userId) {
      if (friends.value.length > 0) {
        // On cherche l'utilisateur dans la liste des amis
        const friend = friends.value.find((friend) => friend.id === parseInt(userId!));

        if (friend) {
          // Si on a trouvé l'utilisateur, on affiche la conversation
          loadConversation(friend);
        } else {
          fetch(userApiUrl + "/" + userId, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          }).then(async (response) => {
            if (response.status === 200) {
              const user: userPublicProfile = await response.json();
              loadConversation(user);
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
      }
    }
  }
});

function createEmojiGroupsDomElements(emojiData: EmojiDataByGroup, emojiListContainer: HTMLElement, messageInput: HTMLInputElement) {
  for (const group in emojiData) {
    const groupDomElement = document.createElement("div");
    groupDomElement.classList.add("group");

    const groupTitleDomElement = document.createElement("div");
    groupTitleDomElement.classList.add("subtitle");
    groupTitleDomElement.innerText = group;

    const groupEmojisDomElement = document.createElement("div");
    groupEmojisDomElement.classList.add("emojis");

    for (const emoji in emojiData[group]) {
      const emojiDomElement = document.createElement("div");
      let emojiString: string = emojiData[group][emoji].emoji;
      emojiDomElement.classList.add("emoji");
      emojiDomElement.dataset.type = "emoji";
      emojiDomElement.innerText = emojiString;

      groupEmojisDomElement.appendChild(emojiDomElement);

      emojiDomElement.addEventListener("click", () => {
        messageInput.value += emojiString;
      });
    }

    groupDomElement.appendChild(groupTitleDomElement);
    groupDomElement.appendChild(groupEmojisDomElement);
    emojiListContainer.appendChild(groupDomElement);
  }
}

function loadConversation(user: userPublicProfile) {
  currentConversation = user;
  if (conversation && noConversation) {
    conversation.classList.remove("d-none");
    noConversation.classList.add("d-none");
  }
}

</script>

<template>
  <div class="messages-app">
    <SideBar v-if="isLoading == 2" :users="allCachedUsers" :activities="activities" @profileClicked="loadConversation"/>
    <div id="conversation" class="d-none">
      <div class="conversation-header">
        <button type="button" id="openSidebarBtn">
          <font-awesome-icon :icon="['fas', 'bars']"/>
        </button>
        <ProfileCard
            :id="1"
            :username="`Métacafé`"
            :avatar="profilePic"
            :status="`En ligne`"
        />
      </div>
      <div class="conversation-body">
        <!--        <Message :attachments="null" sender="me" text="Lorem ipsum dolor sit amet" :timestamp="1701510226"/>-->
        <Message :attachments="null" sender="friend" text="Bienvenue sur Métacafé !" :timestamp="1702416035"/>
      </div>
      <div class="conversation-footer">
        <div class="upper-popups">
          <div class="popup" id="emojiPicker">
            <div class="fw-bold">
              Choisir un emoji
            </div>
            <div id="emojiListContainer"></div>
          </div>
          <div class="popup" id="choosePicture">

          </div>
          <div class="popup" id="createVoiceMessage">

          </div>
        </div>
        <button type="button" id="pickEmojiBtn">
          <font-awesome-icon :icon="['far', 'face-smile']"/>
        </button>
        <button type="button" id="sendPictureBtn">
          <font-awesome-icon :icon="['far', 'image']"/>
        </button>
        <input id="messageInput" type="text" placeholder="Tapez votre message ici">
        <button type="button" id="sendVoiceMessage">
          <font-awesome-icon :icon="['fas', 'microphone']"/>
        </button>
      </div>
    </div>

    <div id="noConversation"
         class="no-conversation flex-grow-1 d-flex flex-column align-items-center justify-content-center text-white">
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
