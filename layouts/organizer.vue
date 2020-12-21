<template>
  <v-app>
    <v-main>
      <!-- Navigation Bar -->
      <authNavbar />
      <!-- Body Content -->
      <v-container>
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
