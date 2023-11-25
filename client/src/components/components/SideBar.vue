<script setup lang="ts">
import profilePic from "~@/assets/images/square-logo-with-background.png?url";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import SearchZone from "~@/components/components/SearchZone.vue";

const props = defineProps<{
  users: any[];
}>();
</script>

<template>
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
      <div class="list-item" v-for="user in users" :key="user.id">
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
</template>

<style scoped>

</style>