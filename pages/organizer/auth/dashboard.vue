<template>
  <v-main class="mx-md-10 mx-lg-15 px-lg-15 py-0 mb-10">
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
                    class="font-weight-regular mb-4 text-capitalize"
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
          <v-card class="mx-auto" outlined>
            <v-row class="p-15">
              <v-col cols="12" md="7" lg="8">
                <div class="px-5">
                  <h1 class="text-subtitle-1 font-weight-bold mb-8">
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
import firebase from 'firebase'

export default {
  layout: 'organizer',

  data() {
    return {
      // User's Data
      name: '',

      // User Authentication
      user: '',
      userId: '',
      id: '',
    }
  },

  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Authenticated User', user)

        this.id = user.uid
      } else {
        console.log('Logged Out')
      }
    })
  },

  // GET - Fetch User's Data
  mounted() {
    this.userId = this.$fire.auth.currentUser.uid

    if (this.$fire.auth.currentUser.uid == null) {
      this.userId = this.id
    }

    console.log(this.userId)

    this.$fire.firestore
      .collection('users')
      .doc(this.userId)
      .onSnapshot((doc) => {
        this.name = doc.data().name
      })
  },
}
</script>
