<script setup lang="ts">
import profilePic from "~@/assets/images/square-logo-with-background.avif?url";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import SearchZone from "~@/components/components/SearchZone.vue";
import {onMounted, ref} from "vue";

const props = defineProps<{
  users: any[];
}>();

const sidebarRef = ref<HTMLElement | null>(null);

const userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
const userName: string = localStorage.getItem("username")!;

onMounted(() => {
  const sidebar: HTMLElement | null = document.getElementById("sidebar");
  sidebarRef.value = sidebar;

  if (sidebar) {
    let touchStartX: number;
    let sidebarLeft: number;

    sidebar.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      sidebarLeft = sidebar.getBoundingClientRect().left;
    });

    sidebar.addEventListener("touchmove", (e) => {
      const touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartX;
      const newLeft = sidebarLeft + deltaX;

      if (newLeft <= 0) {  // You can adjust this threshold as needed
        sidebar.style.left = `${newLeft}px`;
      } else {
        sidebar.style.left = "0";
      }
    });

    sidebar.addEventListener("touchend", () => {
      const currentLeft = parseInt(sidebar.style.left || "0", 10);

      if (currentLeft <= -60) {
        sidebar.style.left = "-100%";

      } else {
        sidebar.style.left = "0";
      }
    });
  }
});
</script>

<template>
  <div id="sidebar" class="sidebar">
    <div class="header">
      <div class="profile-card-header">
        <div class="background"></div>
        <ProfileCard
            :id="1"
            :username="userName"
            :avatar="userProfilePictureUrl"
            :action-text="`Voir le profil`"
            :action-link="`#`"
        />
      </div>

      <SearchZone class="p-2" placeholder="Rechercher un utilisateur" />
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

    <button class="disconnect-btn" id="disconnectBtn" @click="$router.push('logout')">Déconnexion</button>
  </div>
</template>

<style scoped>

</style>