<template>
  <div class="login-form">
    <div class="d-flex">
      <div class="phone-presentation">
        <img src="../../assets/images/home-presentation.avif" alt="phone-presentation"/>
      </div>
      <div class="right-part">
        <div class="logo">
          <img src="../../assets/images/Logo-Large-White.avif" alt="logo"/>
        </div>
        <form class="form">
          <h4>Connexion</h4>

          <div class="my-3">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
              <label for="floatingPassword">Password</label>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Se connecter</button>
          <div class="mt-3 d-flex flex-column text-center">
            <a href="#" class="small text-muted">Mot de passe oublié ?</a>
          </div>
        </form>

        <div class="form">
          <span>Vous n'avez pas de compte ? <a href="#" class="fw-bold">Inscrivez-vous</a></span>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center gap-3 flex-wrap mt-3">
      <a href="#" class="small text-light">Mentions légales</a>
      <a href="#" class="small text-light">Politique de confidentialité</a>
      <a href="#" class="small text-light">Conditions générales d'utilisation</a>
      <a href="https://sofianelasri.fr/" target="_blank" class="small text-light">2023 - Sofiane Lasri</a>
    </div>
  </div>
</template>
<style>

</style>
<script setup lang="ts">
</script>