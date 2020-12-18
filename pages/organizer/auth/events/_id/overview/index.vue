<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
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
                <v-card class="mx-auto mb-6 pt-4 pb-7 pb-md-4 px-5" outlined>
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
              </v-row>

              <!-- Tournaments Listing -->
              <v-row>
                <v-card class="mx-auto pt-4 pb-7 pb-md-4 px-5" outlined>
                  <div class="d-flex mt-1 mx-1">
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
                      yet. Hence, you can create multiple tournaments and invite
                      organizer collaborator to join manage your respective
                      tournament.
                    </h1>
                  </div>

                  <v-card-actions class="mt-2 d-flex">
                    <v-btn
                      class="font-weight-regular text-capitalize"
                      dark
                      depressed
                      color="primary"
                      to="/organizer/auth/events/create"
                    >
                      Create tournament
                    </v-btn>
                  </v-card-actions>
                </v-card>
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
import firebase from 'firebase'
import eventHeader from '~/components/organizer/eventHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

  components: {
    eventHeader,
    eventSponsorship,
    notifications,
  },

  data() {
    return {
      // User Input Data
      eventRef: '',
      eventStatus: false,

      // Loading State
      isLoading: false,
    }
  },

  // Fetch User's Data
  mounted() {
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.eventRef = doc.data()
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
