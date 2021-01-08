<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventTourHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <participantscomp />
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import eventTourHeader from '~/components/manager/eventTourHeader'
import eventSponsorship from '~/components/manager/eventSponsorship'
import participantscomp from '~/components/organizer/participantscomp'
import notifications from '~/components/notifications'

export default {
  layout: 'manager',

  components: {
    eventTourHeader,
    eventSponsorship,
    participantscomp,
    notifications,
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const findManagerId = doc
                .data()
                .managerRef.find((element) => element.uid == user.uid)

              if (typeof findManagerId == 'undefined') {
                console.log('No Credential')
                this.$router.replace('/manager/auth/dashboard')
              }
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },
}
</script>
