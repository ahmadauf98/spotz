<template>
  <v-main class="mx-md-10 mx-lg-15 px-lg-15 px-xl-0 py-0 mb-10">
    <div class="mx-4 mx-md-0 mx-xl-15 px-xl-15">
      <!-- Notifications -->
      <notifications />

      <!-- Greeting User -->
      <h1 class="my-6">Welcome, {{ name }}.</h1>

      <v-row class="mb-5">
        <!-- Tournament Part -->
        <v-col>
          <v-card class="pa-5" outlined>
            <v-row>
              <!-- Illustration -->
              <v-col cols="12" class="d-none d-md-flex justify-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fbrowse-tournament.svg?alt=media&token=812c33ef-7d07-472c-8ea3-82938f9c0142"
                  width="250px"
                  alt="..."
                />
              </v-col>

              <v-col cols="12">
                <div class="px-3">
                  <h1 class="text-subtitle-1 font-weight-bold mb-4">
                    Tournaments
                  </h1>
                  <h1 class="text-h4 font-weight-medium mb-2">
                    A single competition
                  </h1>
                  <h1 class="text-subtitle-1 font-weight-regular mb-5">
                    Discover all the tournaments for your team to participate
                    in. For private tournament, kindly contact your organizer to
                    be invited.
                  </h1>
                  <v-btn
                    class="font-weight-regular text-capitalize"
                    depressed
                    dark
                    color="#6B46C1"
                    to="/manager/auth/browseTournaments"
                  >
                    Browse Tournaments
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Event Part -->
        <v-col>
          <v-card class="pa-5" outlined>
            <v-row>
              <!-- Illustration -->
              <v-col cols="12" class="d-none d-md-flex justify-center mb-2">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fbrowse-event.svg?alt=media&token=0eaa4eb7-104b-4b64-9307-08b172e36b7f"
                  width="250px"
                  alt="..."
                />
              </v-col>

              <v-col cols="12">
                <div class="px-3">
                  <h1 class="text-subtitle-1 font-weight-bold mb-4">Events</h1>
                  <h1 class="text-h4 font-weight-medium mb-2">
                    Multiple tournaments
                  </h1>
                  <h1 class="text-subtitle-1 font-weight-regular mb-5">
                    Discover all the events for your team to participate in. For
                    private tournament, kindly contact your organizer to be
                    invited.
                  </h1>
                  <v-btn
                    class="font-weight-regular text-capitalize"
                    dark
                    depressed
                    color="#6B46C1"
                    to="/manager/auth/browseEvents"
                  >
                    Browse events
                  </v-btn>
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
import firebase from 'firebase'
import notifications from '~/components/notifications'

export default {
  layout: 'manager',

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
