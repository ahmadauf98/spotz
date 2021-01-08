<template>
  <v-main
    style="min-height: 600px"
    class="py-0 mb-10"
  >
    <v-container class="p-0 my-0" fluid>
      <!-- Notifications -->
      <notifications />

      <!-- Organization Details Part -->
      <eventTourHeader />

      <v-row>
        <!-- Left Side -->
        <v-col cols="12" lg="8" order="2" order-lg="1">
          <standingscomp />
        </v-col>

        <!-- Right Side -->
        <v-col cols="12" lg="4" order="1" order-lg="2">
          <eventSponsorship />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import firebase from 'firebase'
import eventTourHeader from '~/components/public/eventTourHeader'
import eventSponsorship from '~/components/manager/eventSponsorship'
import standingscomp from '~/components/organizer/standingscomp'
import notifications from '~/components/notifications'

export default {
  layout: 'manager',

  components: {
    eventTourHeader,
    standingscomp,
    eventSponsorship,
    notifications,
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // For future use
      } else {
        this.$router.push('/')
      }
    })
  },
}
</script>
