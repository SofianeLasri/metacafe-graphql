<script setup lang="ts">
import {library} from '@fortawesome/fontawesome-svg-core';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {App, createApp, createVNode, getCurrentInstance, onMounted, VueElement} from "vue";
import SimpleResult from "~@/components/components/SearchZoneResults/SimpleResult.vue";

const props = defineProps<{
  id: string;
  placeholder: string;
  searchUrl: string;
}>();

const emit = defineEmits<{
  (e: 'resultClick', element: HTMLElement): void
}>()

library.add(faMagnifyingGlass);

const searchInputId: string = props.id + "SearchInput";
const searchResultsId: string = props.id + "SearchResults";

onMounted(() => {
  const searchZone: HTMLElement = document.getElementById(props.id)! as HTMLElement;
  const searchInput: HTMLInputElement = document.getElementById(searchInputId)! as HTMLInputElement;
  const searchResults: HTMLElement = document.getElementById(searchResultsId)! as HTMLElement;

  const handleClickOutside = (event: Event) => {
    if (!searchZone.contains(event.target as Node) || searchResults.contains(event.target as Node)) {
      searchResults.classList.add("d-none");
    }
  };

  document.addEventListener("click", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  searchInput.addEventListener("keyup", (event) => {
    fetch(props.searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        search: searchInput.value
      })
    }).then(async (response) => {
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
        showResults(responseJson);
      } else {
        const isResponseJson = response.headers.get("content-type")?.includes("application/json");
        if (isResponseJson) {
          const responseJson = await response.json();
          console.log(responseJson);
        } else {
          console.log("Une erreur est survenue");
        }
      }
    });
  });

  function showResults(results: Array<any>) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
      searchResults.classList.add("d-none");
      return;
    }
    searchResults.classList.remove("d-none");

    results.forEach((result) => {
      let resultVueComponent: App<Element>;
      let tempDiv = document.createElement("div");

      if (result.picture) {
        resultVueComponent = createApp({extends: SimpleResult}, {
          text: result.name,
          value: result.id
        });
      } else {
        resultVueComponent = createApp({extends: SimpleResult}, {
          text: result.name,
          value: result.id
        });
      }

      resultVueComponent.mount(tempDiv);
      tempDiv.firstElementChild!.addEventListener("click", (event) => {
        emit("resultClick", event.target as HTMLElement);
      });
      searchResults.appendChild(tempDiv.firstElementChild!);
    });
  }
});
</script>

<template>
  <div :id="id" class="search-zone">
    <div class="search-bar">
      <div class="icon-prepend">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
      </div>
      <input :id="searchInputId" type="text" :placeholder="placeholder">
    </div>
    <div :id="searchResultsId" class="results d-none">

    </div>
  </div>
</template>

<style scoped>

</style>