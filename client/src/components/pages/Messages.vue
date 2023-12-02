<script setup lang="ts">
import profilePic from "~@/assets/images/square-logo-with-background.png?url";
import SideBar from "~@/components/components/SideBar.vue";
import {onMounted} from "vue";
import Conversation from "~@/components/components/Conversation.vue";

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
    <Conversation/>
  </div>
</template>

<style scoped>

</style>
