<script setup lang="ts">
import profilePic from "~@/assets/images/square-logo-with-background.avif?url";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import SearchZone from "~@/components/components/SearchZone.vue";
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import {onMounted, ref} from "vue";
import {Activity, UserPublicProfile} from "~@/types.ts";

const props = defineProps<{
  users: UserPublicProfile[];
  activities: Activity[];
}>();

console.log(props.activities);

const emit = defineEmits<{
  (e: 'profileClicked', user: UserPublicProfile): void
}>()

const sidebarRef = ref<HTMLElement | null>(null);

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const getAttachmentApiUrl = `${serverBaseUrl}/api/attachment/`;
const userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
const userName: string = localStorage.getItem("username")!;
const userId: number = parseInt(localStorage.getItem("userId")!);

const acitivitiesSortedUsersList: UserPublicProfile[] = [];

props.activities.forEach((activity: Activity) => {
  let user: UserPublicProfile = props.users.find((user: UserPublicProfile) => user.id === activity.targetUserId)!;
  acitivitiesSortedUsersList.push(user);
});

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

function profileClicked(user: UserPublicProfile) {
  emit("profileClicked", user);
}
</script>

<template>
  <div id="sidebar" class="sidebar">
    <div class="header">
      <div class="profile-card-header">
        <div class="background"></div>
        <ProfileCard
            :id="userId"
            :username="userName"
            :avatar="userProfilePictureUrl"
            :action-text="`Voir le profil`"
            :action-link="`#`"
            status="En ligne"/>
      </div>

      <SearchZone id="searchContact" class="p-2" placeholder="Rechercher un utilisateur" search-url="#"/>
    </div>

    <div class="user-list">
      <div class="list-item" v-for="user in acitivitiesSortedUsersList" :key="user.id">
        <ProfileCard
            v-if="user.profilePicture !== null"
            element-id="friendProfile"
            :id="user.id"
            :username="`${user.name}`"
            :avatar="`${getAttachmentApiUrl}${user.profilePicture}`"
            :status="`${user.status}`"
            @profileClicked="profileClicked"
        />
        <ProfileCard
            v-else
            element-id="friendProfile"
            :id="user.id"
            :username="`${user.name}`"
            :avatar="`${defaultProfilePic}`"
            :status="`${user.status}`"
            @profileClicked="profileClicked"
        />
      </div>
    </div>

    <button class="disconnect-btn" id="disconnectBtn" @click="$router.push('logout')">Déconnexion</button>
  </div>
</template>

<style scoped>

</style>