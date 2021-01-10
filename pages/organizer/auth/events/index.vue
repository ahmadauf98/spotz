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
              <h1 class="text-h4 font-weight-bold mt-6 mb-3">My Events</h1>
            </v-col>
            <v-col></v-col>
            <v-col cols="3" class="d-flex justify-end">
              <v-btn
                class="font-weight-medium text-capitalize mt-6 mr-1"
                text
                color="primary"
                to="/organizer/auth/events/collaborator"
              >
                Collaborators
              </v-btn>

              <v-btn
                v-show="eventsRef != ''"
                class="font-weight-regular text-capitalize mt-6 ml-1"
                dark
                depressed
                color="primary"
                to="/organizer/auth/events/create"
              >
                New Event
              </v-btn>
            </v-col>
          </v-row>

          <!-- Events Create -->
          <v-row v-if="eventsRef == null || eventsRef == ''">
            <v-col>
              <v-card class="pa-2" outlined>
                <v-row>
                  <v-col cols="12" md="7" lg="8">
                    <div class="px-5">
                      <h1 class="text-subtitle-1 font-weight-bold mb-6">
                        Create Event
                      </h1>
                      <h1 class="text-h4 font-weight-medium mb-2">
                        Multiple & Organized
                      </h1>
                      <h1 class="text-subtitle-1 font-weight-regular mb-5">
                        Create and manage your multiple tournaments in one
                        single event.
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
            v-for="(event, index) in eventsRef"
            :key="index"
            class="mb-n2"
          >
            <v-col>
              <nuxt-link
                :to="`/organizer/auth/events/${event.eventID}/overview`"
                class="text-decoration-none card"
              >
                <v-card class="py-5" outlined tile>
                  <v-row class="mx-5">
                    <v-col cols="8" class="d-flex align-center">
                      <!-- Picture -->
                      <v-avatar class="mr-8" size="50" rounded>
                        <img :src="event.photoURL" alt="..." />
                      </v-avatar>

                      <!-- Title -->
                      <h1 class="text-body-1 font-weight-bold">
                        {{ event.title }}
                        <br />
                        <span class="text-caption">{{ event.websiteURL }}</span>
                      </h1>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end align-center">
                      <v-chip class="ma-2" color="green" small label outlined>
                        {{ event.startDate }}
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
      eventsRef: [],

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
            this.eventsRefTemp = []
            if (doc.exists) {
              doc.data().eventsRef.forEach((docref) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(docref)
                  .onSnapshot((doc) => {
                    this.eventsRefTemp.push(doc.data())
                  })
              })
              this.eventsRef = this.eventsRefTemp
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
