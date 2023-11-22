<script setup lang="ts">

</script>

<template>
  <div class="messages-app">
    <div class="sidebar">
      <!-- Composant profile-card -->
      <div class="profile-card">
        <div class="profile-pic"></div>
        <div class="d-flex flex-column">
          <div class="profile-name">SofianeLasri</div>
          <div class="profile-action">
            <a href="#">Voir le profil</a>
          </div>
        </div>
      </div>
      <!-- Fin composant profile-card -->

      <!-- Composant search-bar -->
      <div class="search-bar">
        <input type="text" class="form-control" placeholder="Rechercher un utilisateur">
      </div>
      <!-- Fin composant search-bar -->

      <!-- Composant user-list -->
      <div class="user-list">

      </div>
      <!-- Fin composant user-list -->

      <div class="disconnect-btn">
        <button id="disconnectBtn">Déconnexion</button>
      </div>
    </div>
    <div id="conversation">
      <div class="conversation-header">
        <div class="profile-card">
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