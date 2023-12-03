<script setup lang="ts">
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSmile, faImage} from '@fortawesome/free-regular-svg-icons'
import {faMicrophone, faBars} from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import profilePic from "~@/assets/images/square-logo-with-background.avif?url";
import Message from "~@/components/components/Message.vue";
import {onMounted} from "vue";
import emojiByGroup from "unicode-emoji-json/data-by-group.json";

library.add(faSmile, faImage, faMicrophone, faBars);

type emojiDataByGroup = {
  [key: string]: {
    "emoji": string;
    "skin_tone_support": boolean;
    "name": string;
    "slug": string;
    "unicode_version": number;
    "emoji_version": number;
  }
}

const emojiDataByGroup: emojiDataByGroup = JSON.parse(JSON.stringify(emojiByGroup));

onMounted(() => {
  const openSidebarBtn: HTMLElement = document.getElementById("openSidebarBtn")!;
  const sidebar: HTMLElement = document.getElementById("sidebar")!;
  const emojiListContainer: HTMLElement = document.getElementById("emojiListContainer")!;
  const messageInput: HTMLInputElement = document.getElementById("messageInput")!;
  createEmojiGroupsDomElements(emojiDataByGroup, emojiListContainer, messageInput);
  const emojiPicker: HTMLElement = document.getElementById("emojiPicker")!;
  const pickEmojiBtn: HTMLElement = document.getElementById("pickEmojiBtn")!;

  pickEmojiBtn.addEventListener("click", () => {
    emojiPicker.classList.toggle("active");
  });

  openSidebarBtn.addEventListener("click", () => {
    sidebar.style.left = "0";
  });
});

function createEmojiGroupsDomElements(emojiData: emojiDataByGroup, emojiListContainer: HTMLElement, messageInput: HTMLInputElement) {
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
      emojiDomElement.classList.add("emoji");
      emojiDomElement.dataset.type = "emoji";
      emojiDomElement.innerText = emojiData[group][emoji].emoji;

      groupEmojisDomElement.appendChild(emojiDomElement);

      emojiDomElement.addEventListener("click", () => {
        messageInput.value += emojiData[group][emoji].emoji;
      });
    }

    groupDomElement.appendChild(groupTitleDomElement);
    groupDomElement.appendChild(groupEmojisDomElement);
    emojiListContainer.appendChild(groupDomElement);
  }
}
</script>

<template>
  <div id="conversation">
    <div class="conversation-header">
      <button type="button" id="openSidebarBtn">
        <font-awesome-icon :icon="['fas', 'bars']"/>
      </button>
      <ProfileCard
          :id="1"
          :username="`Jaquelines`"
          :avatar="profilePic"
          :status="`En ligne`"
      />
    </div>
    <div class="conversation-body">
      <Message attachments="" sender="me" text="Lorem ipsum dolor sit amet" timestamp="1701510226"/>
      <Message attachments="" sender="friend" text="Lorem ipsum dolor sit amet" timestamp="1701510247"/>
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
</template>

<style scoped>

</style>