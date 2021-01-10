<template>
  <v-main class="mx-md-10 mx-lg-15 px-lg-15 px-xl-0 py-0 mb-10">
    <div class="mx-xl-15 px-xl-15">
      <!-- Notifications -->
      <notifications />

      <!-- Greeting User -->
      <h1 class="my-6">Welcome, {{ name }}.</h1>

      <!-- Tournament Part -->
      <v-row class="mb-4">
        <v-col>
          <v-card class="pa-2" outlined>
            <v-row>
              <v-col cols="12" md="7" lg="8">
                <div class="px-5">
                  <h1 class="text-subtitle-1 font-weight-bold mb-6">
                    My Tournaments
                  </h1>
                  <h1 class="text-h4 font-weight-medium mb-2">
                    Simple & Quick
                  </h1>
                  <h1 class="text-subtitle-1 font-weight-regular mb-5">
                    Create and manage your tournament, grouping, brackets,
                    participants, and more.
                  </h1>
                  <v-btn
                    class="font-weight-regular mb-6 text-capitalize"
                    dark
                    depressed
                    color="primary"
                    to="/organizer/auth/tournaments/create"
                  >
                    Create a tournament
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="d-none d-md-flex align-center">
                <div class="px-5 py-md-0 py-lg-0">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmy-tournament.svg?alt=media&token=5848447b-213a-4af4-b306-211b79769890"
                    width="250px"
                    alt="..."
                  />
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Event Part -->
      <v-row>
        <v-col>
          <v-card class="pa-2" outlined>
            <v-row>
              <v-col cols="12" md="7" lg="8">
                <div class="px-5">
                  <h1 class="text-subtitle-1 font-weight-bold mb-6">
                    My Events
                  </h1>
                  <h1 class="text-h4 font-weight-medium mb-2">
                    Multiple & Organized
                  </h1>
                  <h1 class="text-subtitle-1 font-weight-regular mb-5">
                    Create and manage your multiple tournament in one single
                    event.
                  </h1>
                  <v-btn
                    class="font-weight-regular text-capitalize"
                    dark
                    depressed
                    color="primary"
                    to="/organizer/auth/events/create"
                  >
                    Create an event
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="d-none d-md-flex align-center">
                <div class="px-5 py-md-0 py-lg-0">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmy-event.svg?alt=media&token=a2380370-4e88-4043-b1ca-e72e70ddced9"
                    width="250px"
                    alt="..."
                  />
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import notifications from '~/components/notifications'

export default {
  layout: 'organizer',

  components: {
    notifications,
  },

  data() {
    return {
      // User's Data
      name: '',

      // User Authentication
      userId: '',
    }
  },

  mounted() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.userId = user.uid

            this.$fire.firestore
              .collection('users')
              .doc(this.userId)
              .onSnapshot((doc) => {
                if (doc.exists) {
                  this.name = doc.data().name
                }
              })
          } else {
            this.$router.push('/')
          }
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  },
}
</script>
