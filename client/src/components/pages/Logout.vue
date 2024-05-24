<script setup lang="ts">
import router from "~@/router.ts";
import {onBeforeMount} from "vue";

const serverBaseUrl: string = import.meta.env.VITE_BACKEND_URL as string;
const logoutApiUrl: string = `${serverBaseUrl}/api/auth/logout`;

function handleLogout() {
  window.localStorage.removeItem("token");
  window.location.href = router.resolve({name: "home"}).href;
}

onBeforeMount(() => {
  /*fetch(logoutApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(async (response) => {
    if (response.status === 200) {
      handleLogout()
    } else {
      const isResponseJson = response.headers.get("content-type")?.includes("application/json");
      if (isResponseJson) {
        const responseJson = await response.json();
        console.error(responseJson);
      } else {
        console.error("Une erreur est survenue");
      }
    }
  });*/
  handleLogout()
});
</script>

<template>

</template>

<style scoped>

</style>