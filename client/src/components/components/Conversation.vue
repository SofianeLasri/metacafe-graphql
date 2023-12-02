<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons'
import {faMicrophone} from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import profilePic from "~@/assets/images/square-logo-with-background.png?url";
import Message from "~@/components/components/Message.vue";

library.add(faSmile, faImage, faMicrophone);
</script>

<template>
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
      <Message attachments="" sender="me" text="Lorem ipsum dolor sit amet" timestamp="1701510226" />
      <Message attachments="" sender="friend" text="Lorem ipsum dolor sit amet" timestamp="1701510247" />
    </div>
    <div class="conversation-footer">
      <button type="button" id="openSmileysBtn"><font-awesome-icon :icon="['far', 'face-smile']" /></button>
      <button type="button" id="sendPictureBtn"><font-awesome-icon :icon="['far', 'image']" /></button>
      <input type="text" placeholder="Tapez votre message ici">
      <button type="button" id="sendVoiceMessage"><font-awesome-icon :icon="['fas', 'microphone']" /></button>
    </div>
  </div>
</template>

<style scoped>

</style>