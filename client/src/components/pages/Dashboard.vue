<script setup lang="ts">
import defaultProfilePic from "~@/assets/images/square-logo-with-background.avif?url";
import ProfileCard from "~@/components/components/ProfileCard.vue";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSmile, faMicrophone, faHeart} from "@fortawesome/free-solid-svg-icons";
import {faComment} from '@fortawesome/free-regular-svg-icons'
import PostCard from "~@/components/components/PostCard.vue";
import PostWriter from "~@/components/components/PostWriter.vue";
import {h, onMounted, ref, render} from "vue";
import {Comment, Post, User} from "~@/types.ts";
import Feed from "~@/components/components/Feed.vue";
import eventBus from "~@/eventBus.ts";
import {gql} from "@apollo/client/core";
import client from "~@/apolloClient.ts";

library.add(faSmile, faMicrophone, faHeart, faComment);

const userProfilePictureUrl: string = localStorage.getItem("profilePictureUrl")!;
const userName: string = localStorage.getItem("username")!;
const userId: number = parseInt(localStorage.getItem("userId")!);

// On est d'accord que normalement le type de cette variable est Comment, mais pour des raisons de temps on va faire comme si c'était un Post
const selectedPublicFeedPostComments = ref<Post[]>([]);

const GET_POSTS_COMMENT_QUERY = gql`
query GetPostQuery($postId: Int!) {
  postComments(postId: $postId) {
    body
    id
    post {
      id
      content
      title
      author {
        email
        id
        username
      }
    }
    user {
      id
      username
      email
    }
  }
}
`;

function refreshPrivateFeed() {
  eventBus.emit('hasSubmittedPost', 'friends');
}

function refreshPublicFeed() {
  eventBus.emit('hasSubmittedPost', 'global');
}

function refreshPrivateComments() {
  const friendsCommentCol = document.getElementById('friendsCommentCol')!;
  const commentsContainer = friendsCommentCol.querySelector('.feed-cards')!;
  getCommentsForPostAndShow(selectedPublicFeedPostComments.value[0], commentsContainer);

  eventBus.emit('hasSubmittedComment', 'friends');
}

function refreshPublicComments() {
  const globalCommentCol = document.getElementById('globalCommentCol')!;
  const commentsContainer = globalCommentCol.querySelector('.feed-cards')!;
  getCommentsForPostAndShow(selectedPublicFeedPostComments.value[0], commentsContainer);

  eventBus.emit('hasSubmittedComment', 'global');
}

function showPublicCommentSectionForPost(post: Post): void {
  const globalFeedCol = document.getElementById('globalFeedCol')!;
  const globalCommentCol = document.getElementById('globalCommentCol')!;

  toggleFeedComments(post, globalFeedCol, globalCommentCol);
}

function showPrivateCommentSectionForPost(post: Post): void {
  const friendsFeedCol = document.getElementById('friendsFeedCol')!;
  const friendsCommentCol = document.getElementById('friendsCommentCol')!;

  toggleFeedComments(post, friendsFeedCol, friendsCommentCol);
}

function toggleFeedComments(post: Post, feedCol: HTMLElement, commentCol: HTMLElement): void {
  feedCol.classList.add('d-none');
  commentCol.classList.remove('d-none');
}

function getCommentsForPostAndShow(post: Post, commentsContainer: Element): void {
  client.query({
    query: GET_POSTS_COMMENT_QUERY,
    variables: {
      postId: post.id
    }
  }).then(result => {
    if (result.data.postComments) {
      let comments: Post[] = [];
      for (let comment of result.data.postComments) {
        let commentAuthor: User = {
          id: comment.user.id,
          username: comment.user.username,
          email: comment.user.email,
          profilePicture: defaultProfilePic,
        };

        let commentObject: Post = {
          id: comment.id,
          content: comment.body,
          author: commentAuthor,
          title: "Commentaire",
        }

        comments.push(commentObject);
      }

      selectedPublicFeedPostComments.value = comments;
    }
  });

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
              <PostCard :id="0"
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

            <Feed type="global" @showComments="showPublicCommentSectionForPost"/>
          </div>

          <div class="feed-col d-none" id="globalCommentCol">
            <div class="col-header">
              <div class="text-white">
                <h3>Commenter</h3>
                <p>Bien sûr, l'espace commentaire est un endroit calme et apaisé. 😉</p>
              </div>

              <PostCard :id="99" :with-comments="true" @hasSubmittedComment="refreshPublicComments"
                        avatar="/src/assets/images/square-logo-with-background.avif"
                        username="Métacafé" title="Placeholder" :timestamp="1716670526"
                        text="Le fil d'actualité privé n'est pas encore terminé. Reviens dans quelques jours ! 😉"/>
            </div>

            <div class="feed-cards">
              <PostCard v-for="post in selectedPublicFeedPostComments" :key="post.id"
                        :id="post.id" :avatar="post.author.profilePicture"
                        :username="post.author.username" :title="post.title" :text="post.content"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>