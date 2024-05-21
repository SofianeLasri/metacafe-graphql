<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSmile, faMicrophone, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faComment} from '@fortawesome/free-regular-svg-icons'

library.add(faSmile, faMicrophone,faHeart, faComment);

const userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
const userName: string = localStorage.getItem("username")!;
const userId: number = parseInt(localStorage.getItem("userId")!);

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
          <div class="feed-col" v-for="i in 2" :key="i">
            <div class="col-header">
              <div class="text-white">
                <h3>Le café du coin</h3>
                <p>C'est ici que se retrouvent les ragots entre amis</p>
              </div>
              <div class="card d-flex flex-column gap-2">
                <textarea class="form-control" name="post" id="post" rows="3"
                          placeholder="Exprimez-vous..."></textarea>
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-link text-muted" id="pickEmojiBtn">
                    <font-awesome-icon :icon="['fas', 'face-smile']"/>
                  </button>
                  <button type="button" class="btn btn-link text-muted" id="textToSpeechBtn">
                    <font-awesome-icon :icon="['fas', 'microphone']"/>
                  </button>
                  <button class="btn btn-primary">Poster</button>
                </div>
              </div>
            </div>

            <div class="feed-cards">

              <div class="post-card" v-for="i in 5" :key="i">
                <div class="upper-part">
                  <div class="author">
                    <div class="profile-picture"
                         style="background-image: url('/src/assets/images/square-logo-with-background.avif')"></div>
                    <div class="user-name">
                      Eric
                    </div>
                  </div>
                  <p class="mt-2">
                    Kebab ou burgi ? La raison me dit que je vais encore perdre des pv mais j’ai trop la dale.
                  </p>
                </div>
                <div class="lower-part">
                  <div class="small text-muted">
                    aujd à 11H31
                  </div>
                  <div class="d-flex">
                    <button type="button" class="btn btn-link text-muted" id="commentBtn">
                      <font-awesome-icon :icon="['far', 'comment']" class="action-icon"/> 6
                    </button>
                    <button type="button" class="btn btn-link text-primary" id="likeBtn">
                      <font-awesome-icon :icon="['fas', 'heart']" class="action-icon"/> 4
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>