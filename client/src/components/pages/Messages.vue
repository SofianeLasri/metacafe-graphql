<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons'
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";
import profilePic from "~@/assets/images/square-logo-with-background.png?url";
import SideBar from "~@/components/components/SideBar.vue";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import {onMounted} from "vue";

library.add(faSmile, faImage, faMicrophone);

const fakeUsers: any[] = [
  {
    id: 1,
    username: "SofianeLasri",
    avatar: profilePic,
    status: "En ligne",
  },
  {
    id: 2,
    username: "Jaqueline",
    avatar: profilePic,
    status: "En ligne",
  },
  {
    id: 3,
    username: "Jean",
    avatar: profilePic,
    status: "Absent",
  },
  {
    id: 4,
    username: "Pierre",
    avatar: profilePic,
    status: "En ligne",
  },
  {
    id: 5,
    username: "Paul",
    avatar: profilePic,
    status: "Asbent",
  },
  {
    id: 6,
    username: "Jacques",
    avatar: profilePic,
    status: "Asbent",
  },
  {
    id: 7,
    username: "Jeanne",
    avatar: profilePic,
    status: "En ligne",
  },
  {
    id: 8,
    username: "Marie",
    avatar: profilePic,
    status: "Asbent",
  },
];

onMounted (() => {

});
</script>

<template>
  <div class="messages-app">
    <SideBar :users="fakeUsers"/>
    <div id="conversation">
      <div class="conversation-header">
        <ProfileCard
            :id="1"
            :username="`Jaquelines`"
            :avatar="profilePic"
            :status="`En ligne`"
        />
      </div>
      <div class="conversation-body">
      </div>
      <div class="conversation-footer">
        <button type="button" id="openSmileysBtn"><font-awesome-icon :icon="['far', 'face-smile']" /></button>
        <button type="button" id="sendPictureBtn"><font-awesome-icon :icon="['far', 'image']" /></button>
        <input type="text" placeholder="Tapez votre message ici">
        <button type="button" id="sendVoiceMessage"><font-awesome-icon :icon="['fas', 'microphone']" /></button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
