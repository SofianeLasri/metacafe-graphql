<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProfileCard from "../components/ProfileCard.vue";
import SearchZone from "~@/components/components/SearchZone.vue";
import profilePic from "~@/assets/images/square-logo-with-background.png?url";

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

</script>

<template>
  <div class="messages-app">
    <div class="sidebar">
      <div class="header">
        <div class="profile-card-header">
          <div class="background"></div>
          <ProfileCard
              :id="1"
              :username="`SofianeLasri`"
              :avatar="profilePic"
              :action-text="`Voir le profil`"
              :action-link="`#`"
          />
        </div>

        <SearchZone />
      </div>

      <div class="user-list">
        <div class="list-item" v-for="user in fakeUsers" :key="user.id">
          <ProfileCard
              :id="`${user.id}`"
              :username="`${user.username}`"
              :avatar="`${user.avatar}`"
              :status="`${user.status}`"
          />
        </div>
      </div>

      <button class="disconnect-btn" id="disconnectBtn">Déconnexion</button>
    </div>
    <div id="conversation">
      <div class="conversation-header">
        <div class="profile-card-header">
          <div class="profile-pic"></div>
          <div class="d-flex flex-column">
            <div class="profile-name">Jaqueline</div>
            <div class="profile-meta">En ligne</div>
          </div>
        </div>
      </div>
      <div class="conversation-body">

      </div>
      <div class="conversation-footer">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Tapez votre message">
          <div class="input-group-append">
            <button class="btn btn-primary">Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>