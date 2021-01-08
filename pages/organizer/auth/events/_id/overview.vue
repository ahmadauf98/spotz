<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" order="2" order-lg="1">
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
              <!-- Event Status -->
              <v-row>
                <v-col cols="12">
                  <v-card class="mx-auto mb-2 pt-4 pb-7 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1 class="text-subtitle-1 font-weight-bold">
                        <v-icon class="mr-1">mdi-information</v-icon>
                        Status
                      </h1>
                      <v-chip
                        v-if="eventRef.status == false"
                        class="ml-auto mr-2 font-weight-medium"
                        color="warning"
                        label
                        small
                      >
                        Draft</v-chip
                      >
                      <v-chip
                        v-else
                        class="ml-auto mr-2 font-weight-medium"
                        color="green darken-1"
                        label
                        small
                        dark
                      >
                        Public</v-chip
                      >
                      <v-btn
                        class="mt-n2"
                        color="primary"
                        :to="`/organizer/auth/events/${this.$route.params.id}/settings`"
                        icon
                      >
                        <v-icon>mdi-cogs</v-icon>
                      </v-btn>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        Whether your event is public (visible to everyone) or
                        draft (only accessible by host, collaborator & team
                        managers). Use the publish button to change the status.
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        v-if="eventRef.status == false"
                        @click="changeStatus"
                        color="green darken-1"
                        class="ml-auto px-5 font-weight-regular text-capitalize"
                        width="120"
                        depressed
                        dark
                      >
                        <span v-if="isLoading == false">
                          Publish
                          <v-icon size="20" class="ml-1">mdi-send</v-icon>
                        </span>

                        <v-progress-circular
                          v-else
                          :size="20"
                          indeterminate
                          color="white"
                        ></v-progress-circular>
                      </v-btn>

                      <v-btn
                        v-else
                        @click="changeStatus"
                        color="yellow darken-2"
                        class="ml-auto px-5 font-weight-regular text-capitalize"
                        width="120"
                        depressed
                        dark
                      >
                        <span v-if="isLoading == false">
                          Draft
                          <v-icon size="20" class="ml-1">mdi-archive</v-icon>
                        </span>

                        <v-progress-circular
                          v-else
                          :size="20"
                          indeterminate
                          color="white"
                        ></v-progress-circular>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Tournaments Listing -->
              <v-row>
                <!-- If -->
                <v-col v-if="eventRef.tournamentRef == ''" cols="12">
                  <v-card class="mx-auto pb-7 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-5 mx-1">
                      <h1 class="text-subtitle-1 font-weight-bold">
                        <v-icon class="mr-1">mdi-trophy</v-icon>
                        Tournaments
                      </h1>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        Currently you do not have any tournament in your event
                        yet. Hence, you can create multiple tournaments and
                        invite organizer collaborator to join manage your
                        respective tournament.
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        class="font-weight-regular text-capitalize"
                        dark
                        depressed
                        color="primary"
                        to="createtournament"
                      >
                        Create tournament
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <!-- Else -->
                <v-col v-else cols="12">
                  <v-card class="mx-auto pb-7 pb-md-4 px-5" outlined>
                    <v-row class="d-flex mt-5 mx-1">
                      <h1 class="text-subtitle-1 font-weight-bold">
                        <v-icon class="mr-1">mdi-trophy</v-icon>
                        Tournaments
                      </h1>

                      <v-btn
                        to="createtournament"
                        class="font-weight-regular text-capitalize ml-auto"
                        color="primary"
                        small
                        depressed
                      >
                        Add Tournament</v-btn
                      >
                    </v-row>

                    <v-row class="d-flex mt-3 mx-1">
                      <v-col
                        v-for="(tournament, index) in tournamentList"
                        :key="index"
                        cols="6"
                        class="mb-2"
                      >
                        <nuxt-link
                          :to="`${tournament.tournamentID}/overview`"
                          class="text-decoration-none card"
                        >
                          <v-card
                            class="pa-5 mt-2 d-flex align-center"
                            outlined
                          >
                            <v-row>
                              <v-col cols="6" class="d-flex align-center">
                                <h1 class="text-body-1 font-weight-bold">
                                  {{ tournament.sportType }}
                                  <br />
                                  <span class="text-caption text-grey">
                                    {{ tournament.tournamentID }}
                                  </span>
                                </h1>
                              </v-col>
                              <v-col
                                cols="6"
                                class="d-flex justify-end align-center"
                              >
                                <v-chip
                                  v-if="tournament.gender == 'Male'"
                                  class="ma-2"
                                  color="blue darken-2"
                                  small
                                  label
                                  outlined
                                >
                                  {{ tournament.gender }}
                                </v-chip>

                                <v-chip
                                  v-else
                                  class="ma-2"
                                  color="pink darken-1"
                                  small
                                  label
                                  outlined
                                >
                                  {{ tournament.gender }}
                                </v-chip>
                              </v-col>
                            </v-row>
                          </v-card>
                        </nuxt-link>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import eventHeader from '~/components/organizer/eventHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'

export default {
  layout: 'organizer',

  components: {
    eventHeader,
    eventSponsorship,
    notifications,
  },

  data() {
    return {
      // Event Data
      eventRef: '',
      eventStatus: false,
      tournamentList: '',

      // Loading State
      isLoading: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              var hostName = doc.data().hostName

              if (user.uid != hostName) {
                console.log('No Credential')
                this.$router.replace('/organizer/auth/dashboard')
              }
            }
          })

        // Get Event Data
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.eventRef = doc.data()
              var tournamentList = []
              this.eventRef.tournamentRef.forEach((element) => {
                var tournamentID = element
                // Get Tournament Data
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(tournamentID)
                  .onSnapshot((doc) => {
                    tournamentList.push(doc.data())
                  })
              })
              this.tournamentList = tournamentList
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Update Status in Database
    changeStatus() {
      // Loading State -> true
      this.isLoading = true
      this.eventStatus = !this.eventStatus
      this.onChangeStatus()
    },

    async onChangeStatus() {
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            status: this.eventStatus,
          })
          .then(() => {
            // Loading State -> false
            this.isLoading = false
          })
      } catch (error) {
        // Loading State -> false
        this.isLoading = false
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },
  },
}
</script>

<style scoped>
.card :hover {
  background-color: #eeeeee;
}
</style>
