<template>
  <v-main class="mx-md-10 mx-lg-15 px-lg-15 py-0 mb-10">
    <v-container class="p-0" fluid>
      <div class="mx-xl-15 px-xl-15">
        <!-- Greeting User -->
        <h1 class="my-6">Welcome back, {{ name }}.</h1>

        <!-- Tournament Part -->
        <v-row class="mb-5">
          <v-col>
            <v-card class="mx-auto" outlined>
              <v-row class="p-15">
                <v-col cols="12" md="7" lg="8">
                  <div class="px-5">
                    <h1 class="text-subtitle-1 font-weight-bold mb-8">
                      Tournaments
                    </h1>
                    <h1 class="text-h4 font-weight-medium mb-2">
                      A single competition
                    </h1>
                    <h1 class="text-subtitle-1 font-weight-regular mb-5">
                      Discover all the tournaments for your team to participate
                      in. For private tournament, kindly contact your organizer
                      to be invited.
                    </h1>
                    <v-btn
                      class="font-weight-regular mb-4 text-capitalize"
                      depressed
                      dark
                      color="#6B46C1"
                      to="/manager/auth/browseTournaments"
                    >
                      Browse Tournaments
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="d-none d-md-flex align-center">
                  <div class="px-5 py-md-0 py-lg-0">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fbrowse-tournament.svg?alt=media&token=812c33ef-7d07-472c-8ea3-82938f9c0142"
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
            <v-card class="mx-auto" outlined>
              <v-row class="p-15">
                <v-col cols="12" md="7" lg="8">
                  <div class="px-5">
                    <h1 class="text-subtitle-1 font-weight-bold mb-8">
                      Events
                    </h1>
                    <h1 class="text-h4 font-weight-medium mb-2">
                      Multiple tournaments in a single event
                    </h1>
                    <h1 class="text-subtitle-1 font-weight-regular mb-5">
                      Discover all the events for your team to participate in.
                      For private tournament, kindly contact your organizer to
                      be invited.
                    </h1>
                    <v-btn
                      class="font-weight-regular mb-4 text-capitalize"
                      dark
                      depressed
                      color="#6B46C1"
                      to="/manager/auth/browseEvents"
                    >
                      Browse events
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="d-none d-md-flex align-center">
                  <div class="px-5 py-md-0 py-lg-0">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fbrowse-event.svg?alt=media&token=0eaa4eb7-104b-4b64-9307-08b172e36b7f"
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
    </v-container>
  </v-main>
</template>

<script>
import firebase from 'firebase'

export default {
  layout: 'manager',

  data() {
    return {
      // User's Data
      name: '',

      // User Authentication
      userId: '',
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid

        this.$fire.firestore
          .collection('users')
          .doc(this.userId)
          .onSnapshot((doc) => {
            this.name = doc.data().name
          })
      } else {
        this.$router.push('/')
      }
    })
  },
}
</script>
