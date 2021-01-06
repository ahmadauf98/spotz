<template>
  <!-- Navigation Bar -->
  <v-app-bar
    class="d-none d-sm-inline nav-padding"
    height="80"
    elevate-on-scroll
    color="white"
    app
  >
    <!-- Brand Logo -->
    <v-toolbar-title>
      <NuxtLink to="/">
        <img
          class="mt-2 mr-8"
          src="~/static/img/logo.svg"
          alt="..."
          height="30px"
        />
      </NuxtLink>
    </v-toolbar-title>

    <!-- Navigation Button -->
    <div class="d-none d-sm-inline" v-for="nav in navigation" :key="nav.name">
      <v-btn
        class="mx-1 text-body-1 text-capitalize font-weight-bold py-5"
        color="#1A202C"
        :to="nav.route"
        rounded
        text
      >
        {{ nav.name }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      to="/organizer/signin"
      class="text-body-1 text-capitalize font-weight-bold px-8 py-5 mr-1"
      color="#1A202C"
      rounded
      text
    >
      Organizer
    </v-btn>

    <v-btn
      to="/manager/signin"
      color="primary"
      class="text-body-1 text-capitalize font-weight-medium px-8 py-5 ml-1"
      rounded
      depressed
    >
      Login
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      navigation: [
        { name: 'Tournaments', route: '/browseTournaments' },
        { name: 'Events', route: '/browseEvents' },
      ],
    }
  },
}
</script>

<style scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .nav-padding {
    padding: 0px 20px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .nav-padding {
    padding: 0px 60px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .nav-padding {
    padding: 0px 180px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .nav-padding {
    padding: 0px 300px;
  }
}
</style>
