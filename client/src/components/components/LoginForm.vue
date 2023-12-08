<script setup lang="ts">

</script>

<template>
  <div class="logo">
    <img src="../../assets/images/Logo-Large-White.avif" alt="logo"/>
  </div>
  <form class="form" data-form-type="login">
    <h4>Connexion</h4>

    <div class="my-3">
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="emailInput" data-form-type="email"
               placeholder="gordon.freeman@blackmesa.us" required>
        <label for="emailInput">Adresse e-mail</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="passwordInput" data-form-type="password"
               placeholder="Mot de passe required">
        <label for="passwordInput">Mot de passe</label>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Se connecter</button>
    <div class="mt-3 d-flex flex-column text-center">
      <a href="#" class="small text-muted">Mot de passe oublié ?</a>
    </div>
  </form>

  <div class="form align-items-center">
    <span>Vous n'avez pas de compte ? <a id="showRegisterFormLink" href="#" class="fw-bold">Inscrivez-vous</a></span>
  </div>
</template>

<style scoped>

</style>