<template>
  <v-main
    style="min-height: 600px"
    class="mx-md-10 mx-lg-15 px-lg-15 mx-xl-0 px-xl-0 py-0 mb-10"
  >
    <v-container class="p-0" fluid>
      <div class="mx-xl-15 px-xl-15">
        <div class="mx-xl-15 px-xl-15">
          <!-- Event Title -->
          <v-row>
            <v-col cols="5">
              <h1 class="text-h4 font-weight-bold mt-6 mb-3">
                My Collaborators
              </h1>
            </v-col>
          </v-row>

          <!-- Events Create -->
          <v-row v-if="collabRef == null || collabRef == ''">
            <v-col>
              <v-card class="mx-auto" outlined>
                <v-row class="p-15">
                  <v-col cols="12" md="7" lg="8">
                    <div class="px-5">
                      <h1 class="text-subtitle-1 font-weight-bold mb-8">
                        Event Collaborator
                      </h1>
                      <h1 class="text-h4 font-weight-medium mb-2">
                        Manage Tournament
                      </h1>
                      <h1 class="text-subtitle-1 font-weight-regular mb-5 mr-2">
                        To handle the tournaments in the event, you need to be
                        part of the organizer. Wait for your event host to
                        adding you in their event collaborator.
                      </h1>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="d-none d-md-flex align-center">
                    <div class="px-5 py-md-0 py-lg-0">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmy-organization.svg?alt=media&token=c060c284-a3e7-4cee-8961-69796868256c"
                        width="220px"
                        alt="..."
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- Events Listing -->
          <v-row
            v-else
            v-for="(collab, index) in collabRef"
            :key="index"
            class="mb-n2"
          >
            <v-col>
              <nuxt-link
                :to="`/organizer/auth/events/${collab.eventID}/${collab.tournamentID}/overview`"
                class="text-decoration-none card"
              >
                <v-card class="py-5" outlined tile>
                  <v-row class="mx-5">
                    <v-col cols="8" class="d-flex align-center">
                      <!-- Picture -->
                      <v-avatar class="mr-8" size="50" rounded>
                        <img :src="collab.photoURL" alt="..." />
                      </v-avatar>

                      <!-- Title -->
                      <h1 class="text-body-1 font-weight-bold">
                        {{ collab.eventTitle }}
                        <br />
                        <span class="text-caption"
                          >{{ collab.tournamentName }} &mdash;
                          {{ collab.tournamentGender }}</span
                        >
                      </h1>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end align-center">
                      <v-chip class="ma-2" color="green" small label outlined>
                        {{ collab.startDate }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card>
              </nuxt-link>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  layout: 'organizer',

  data() {
    return {
      // Input Data
      title: '',
      sportType: '',
      participants: '',
      collabRef: [],

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
            this.collabRefTemp = []
            if (doc.exists) {
              doc.data().eventsCollab.forEach((docref) => {
                // Get events data
                this.$fire.firestore
                  .collection('events')
                  .doc(docref.eventID)
                  .onSnapshot((docEvent) => {
                    // Get tournaments data
                    this.$fire.firestore
                      .collection('events')
                      .doc(docref.eventID)
                      .collection('tournaments')
                      .doc(docref.tournamentID)
                      .onSnapshot((docTour) => {
                        var list = {
                          eventID: docref.eventID,
                          tournamentID: docref.tournamentID,
                          photoURL: docEvent.data().photoURL,
                          tournamentName: docTour.data().sportType,
                          tournamentGender: docTour.data().gender,
                          eventTitle: docEvent.data().title,
                          startDate: docEvent.data().startDate,
                        }
                        this.collabRefTemp.push(list)
                      })
                  })
              })
              this.collabRef = this.collabRefTemp
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },
}
</script>

<style scoped>
.card :hover {
  background-color: #eeeeee;
}
</style>
