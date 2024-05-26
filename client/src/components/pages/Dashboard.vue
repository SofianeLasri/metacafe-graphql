<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHeart, faMicrophone, faSmile} from "@fortawesome/free-solid-svg-icons";
import {faComment} from '@fortawesome/free-regular-svg-icons'
import PostCard from "~@/components/components/PostCard.vue";
import PostWriter from "~@/components/components/PostWriter.vue";
import {onMounted, ref} from "vue";
import {Post} from "~@/types.ts";
import Feed from "~@/components/components/Feed.vue";
import eventBus from "~@/eventBus.ts";
import PostCommentsSection from "~@/components/components/PostCommentsSection.vue";

library.add(faSmile, faMicrophone, faHeart, faComment);

const userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
const userName: string = localStorage.getItem("username")!;
const userId: number = parseInt(localStorage.getItem("userId")!);

const selectedPublicPostForComments = ref<Post | null>(null);

function refreshPrivateFeed() {
  eventBus.emit('hasSubmittedPost', 'friends');
}

function refreshPublicFeed() {
  eventBus.emit('hasSubmittedPost', 'global');
}

function togglePublicCommentSection(post: Post | null = null): void {
  const globalFeedCol = document.getElementById('globalFeedCol')!;
  const globalCommentCol = document.getElementById('globalCommentCol')!;

  selectedPublicPostForComments.value = post;

  toggleFeedComments(globalFeedCol, globalCommentCol);
}

function togglePrivateCommentSection(post: Post | null = null): void {
  const friendsFeedCol = document.getElementById('friendsFeedCol')!;
  const friendsCommentCol = document.getElementById('friendsCommentCol')!;

  toggleFeedComments(friendsFeedCol, friendsCommentCol);
}

function toggleFeedComments(feedCol: HTMLElement, commentCol: HTMLElement): void {
  feedCol.classList.toggle('d-none');
  commentCol.classList.toggle('d-none');
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
            <h4>Amis (1)</h4>

            <div class="d-flex flex-column mt-2">
              <ProfileCard :id="1" :avatar="defaultProfilePic" username="Métacafé"
                           status="En ligne"/>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <div class="feed-wrapper">
          <!-- Friends feed -->
          <div class="feed-col" id="friendsFeedCol">
            <div class="col-header">
              <div class="text-white">
                <h3>Le café du coin</h3>
                <p>C'est ici que se retrouvent les ragots entre amis</p>
              </div>

              <PostWriter col="friends" @hasSubmittedPost="refreshPrivateFeed"/>
            </div>

            <div class="feed-cards" id="friendsFeed">
              <PostCard :id="0" footer-type="like"
                        avatar="/src/assets/images/square-logo-with-background.avif"
                        username="Métacafé" title="Placeholder" :timestamp="1716670526"
                        text="Le fil d'actualité privé n'est pas encore terminé. Reviens dans quelques jours ! 😉"/>
            </div>
          </div>

          <!-- TODO: Faire la colonne des commentaires pour le feed privé une fois qu'il est implémenté -->

          <!-- Public feed -->
          <div class="feed-col" id="globalFeedCol">
            <div class="col-header">
              <div class="text-white">
                <h3>Le grand salon</h3>
                <p>Tous les intellectuels de métacafé se retrouvent ici</p>
              </div>

              <PostWriter col="public" @hasSubmittedPost="refreshPublicFeed"/>
            </div>

            <Feed type="global" @showComments="togglePublicCommentSection"/>
          </div>

          <div class="feed-col d-none" id="globalCommentCol">
            <PostCommentsSection type="global" :post="selectedPublicPostForComments"
                                 @backButtonClicked="togglePublicCommentSection"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>