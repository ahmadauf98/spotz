<template>
  <v-app>
    <v-main class="d-none d-sm-block">
      <!-- Navigation Bar -->
      <authNavbar />
      <!-- Body Content -->
      <v-container class="container">
        <nuxt />
      </v-container>
      <!-- Footer -->
      <pubFooter />
    </v-main>
  </v-app>
</template>

<script>
import authNavbar from '~/components/organizer/authNavbar'
import pubFooter from '~/components/footer'

export default {
  components: {
    authNavbar,
    pubFooter,
  },
}
</script>

<style scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .container {
    padding: 0px 20px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .container {
    padding: 0px 0px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .container {
    padding: 0px 0px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .container {
    padding: 0px 170px;
  }
}
</style>
