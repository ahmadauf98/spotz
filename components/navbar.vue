<template>
  <!-- Navigation Bar -->
  <v-app-bar
    class="d-none d-sm-inline px-2 px-md-15"
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
    <div class="d-none d-md-inline" v-for="nav in navigation" :key="nav.name">
      <v-btn
        class="mx-1 px-1 text-capitalize"
        color="#1A202C"
        :to="nav.route"
        text
      >
        {{ nav.name }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-btn to="/organizer/signin" class="mr-3 text-capitalize" text>
      Organize
    </v-btn>

    <v-btn
      to="/manager/signin"
      color="primary"
      class="text-capitalize"
      outlined
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
