<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSmile, faMicrophone, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faComment} from '@fortawesome/free-regular-svg-icons'
import PostCard from "~@/components/components/PostCard.vue";
import PostWriter from "~@/components/components/PostWriter.vue";
import {h, onMounted, render} from "vue";
import {Post} from "~@/types.ts";

library.add(faSmile, faMicrophone,faHeart, faComment);

const userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
const userName: string = localStorage.getItem("username")!;
const userId: number = parseInt(localStorage.getItem("userId")!);

function addPostToFriendFeed(post: Post) {
  addPostToFeed(post, "friend");
}

function addPostToPublicFeed(post: Post) {
  addPostToFeed(post, "public");
}

function addPostToFeed(post: Post, feed: string) {
  const feedElement = document.getElementById(feed + "Feed");

  if (feedElement) {
    const container = document.createElement('div');

    const vnode = h(PostCard, {
      id: post.id,
      avatar: userProfilePictureUrl,
      username: userName,
      title: post.title,
      text: post.content,
    });

    render(vnode, container);

    feedElement.insertBefore(container, feedElement.firstChild);
  }
}

onMounted(() => {


});

</script>

<template>
  <div class="dashboard-app">
    <div class="header">
      <div class="container h-100 d-flex justify-content-between align-items-center">
        <div class="logo">
          <img src="../../assets/images/Logo-Large-White.avif" alt="logo"/>
        </div>
        <div class="actions">
          <router-link to="logout" class="text-white">Déconnexion</router-link>
        </div>
      </div>
    </div>

    <div class="page-content">
      <div class="cards-wrapper">
        <!-- Sidebar -->
        <div class="sidebar">
          <div class="card user-profile">
            <ProfileCard :id="1" :avatar="userProfilePictureUrl" :username="userName"
                         status="En ligne"/>
          </div>

          <div class="friend-list card">
            <h4>Amis (6)</h4>

            <div class="d-flex flex-column mt-2">
              <ProfileCard :id="1" :avatar="defaultProfilePic" username="Jacqueline"
                           status="En ligne" v-for="i in 6" :key="i"/>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <div class="feed-wrapper">
          <!-- Friends feed -->
          <div class="feed-col">
            <div class="col-header">
              <div class="text-white">
                <h3>Le café du coin</h3>
                <p>C'est ici que se retrouvent les ragots entre amis</p>
              </div>

              <PostWriter col="friends"  @hasSubmittedPost="addPostToFriendFeed"/>
            </div>

            <div class="feed-cards" id="friendFeed">
              <PostCard v-for="i in 5" :key="i"
                        :id="1"
                        avatar="/src/assets/images/square-logo-with-background.avif"
                        username="Eric" title="Test" text="Kebab ou burgi ?"/>
            </div>
          </div>

          <!-- Public feed -->
          <div class="feed-col">
            <div class="col-header">
              <div class="text-white">
                <h3>Le grand salon</h3>
                <p>Tous les intellectuels de métacafé se retrouvent ici</p>
              </div>

              <PostWriter col="public" @hasSubmittedPost="addPostToPublicFeed"/>
            </div>

            <div class="feed-cards" id="publicFeed">
              <PostCard v-for="i in 5" :key="i"
                        :id="2"
                        avatar="/src/assets/images/square-logo-with-background.avif"
                        username="Eric" title="Test" text="Kebab ou burgi ?"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>