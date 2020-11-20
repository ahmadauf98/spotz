<template>
  <v-app>
    <v-main>
      <!-- Navigation Bar -->
      <authNavbar />
      <!-- Body Content -->
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import authNavbar from '~/components/organizer/authNavbar'
export default {
  components: {
    authNavbar,
  },
}
</script>
