<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <tournamentHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <standingscomp />
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import tournamentHeader from '~/components/public/tournamentHeader'
import tournamentInfo from '~/components/manager/tournamentInfo'
import standingscomp from '~/components/manager/standingscomp'
import notifications from '~/components/notifications'

export default {
  layout: 'manager',

  components: {
    tournamentHeader,
    tournamentInfo,
    standingscomp,
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
