<template>
  <v-main class="py-0 mb-10">
    <v-container class="p-0 my-0" fluid>
      <!-- Notifications -->
      <notifications />

      <!-- Organization Details Part -->
      <eventTourHeader />

      <v-row>
        <!-- Left Side -->
        <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
          <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
            <!-- First Row -->
            <v-row>
              <!-- First Card -->
              <v-col>
                <v-card class="mx-auto pt-4 pb-15 pb-md-4 px-5" outlined>
                  <div class="d-flex mt-1 mx-1">
                    <h1 class="text-subtitle-1 font-weight-bold">Status</h1>
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
                  </div>

                  <div class="d-flex mt-5 mx-1">
                    <v-icon class="mr-1 align-self-start"
                      >mdi-information</v-icon
                    >
                    <h1
                      class="text-subtitle-1 text-justify font-weight-regular mb-6 mb-md-7 mb-xl-10"
                    >
                      When the status is public, it is visible to everyone. When
                      status is draft, it is only accessible by host and
                      managers. Only host can change the status.
                    </h1>
                  </div>
                </v-card>
              </v-col>

              <!-- Second Card -->
              <v-col>
                <v-card class="mx-auto pt-4 pb-7 pb-md-4 px-5" outlined>
                  <div class="d-flex mt-1 mx-1">
                    <h1
                      class="text-subtitle-1 font-weight-bold d-flex align-center"
                    >
                      <v-icon class="mr-1">mdi-ticket</v-icon>
                      Team Registration
                    </h1>

                    <v-chip
                      v-show="registrationStatus == 'pending'"
                      class="ml-auto mr-2 font-weight-medium"
                      color="yellow darken-2"
                      label
                      small
                      dark
                    >
                      Pending</v-chip
                    >

                    <v-chip
                      v-show="registrationStatus == 'rejected'"
                      class="ml-auto mr-2 font-weight-medium"
                      color="red darken-1"
                      label
                      small
                      dark
                    >
                      Rejected</v-chip
                    >

                    <v-chip
                      v-show="registrationStatus == 'approved'"
                      class="ml-auto mr-2 font-weight-medium"
                      color="green darken-1"
                      label
                      small
                      dark
                    >
                      Approved</v-chip
                    >
                  </div>

                  <div class="d-flex mt-3 mx-1">
                    <h1
                      v-if="managerStatus == 'active'"
                      class="text-subtitle-1 text-justify font-weight-regular"
                    >
                      Team registration is
                      <span
                        v-if="tournamentRef.registrationStatus == true"
                        class="font-weight-medium text-green"
                        >open</span
                      >
                      <span v-else class="font-weight-medium text-red"
                        >closed</span
                      >.

                      <span v-if="tournamentRef.registrationStatus == true">
                        Hence, you are required to complete the players
                        registration before the due date. Organizer will approve
                        or reject your application.
                      </span>

                      <span v-else
                        >Hence, you need to wait for the organizer to open the
                        registration. Kindly contact the organizer for more
                        information.</span
                      >
                    </h1>

                    <h1
                      v-else
                      class="text-subtitle-1 text-justify font-weight-regular"
                    >
                      Your manager account status has been
                      <span class="font-weight-medium text-grey">disabled</span>
                      by the organizer. Kindly contact the organizer for more
                      information regarding this issue.
                    </h1>
                  </div>

                  <div class="mt-1 mb-n1 mb-xl-0 d-flex">
                    <v-btn
                      :to="`/manager/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/overview/teamregistration`"
                      :disabled="
                        tournamentRef.registrationStatus == false ||
                        registrationStatus == 'pending' ||
                        registrationStatus == 'approved' ||
                        managerStatus == 'disabled'
                      "
                      color="primary"
                      class="ml-auto text-capitalize"
                      text
                    >
                      <v-icon size="20" class="mr-1">mdi-ticket-account</v-icon>
                      Register
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- Right Side -->
        <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
          <eventSponsorship />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import firebase from 'firebase'
import eventTourHeader from '~/components/manager/eventTourHeader'
import eventSponsorship from '~/components/manager/eventSponsorship'
import notifications from '~/components/notifications'

export default {
  layout: 'manager',

  components: {
    eventTourHeader,
    eventSponsorship,
    notifications,
  },

  data() {
    return {
      // Event Data
      eventRef: '',
      eventStatus: false,

      // Tournament Data
      tournamentRef: '',
      registrationStatus: '',
      managerStatus: '',

      // Current User Info
      userId: null,

      // Loading State
      isLoading: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid

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

              this.managerStatus = findManagerId.status

              if (typeof findManagerId == 'undefined') {
                console.log('No Credential')
                this.$router.replace('/manager/auth/dashboard')
              }
            }
          })

        // Get data from events
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.eventRef = doc.data()
            }
          })

        // Get data from tournaments
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.tournamentRef = doc.data()
            }
          })

        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(this.userId)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.registrationStatus = doc.data().status
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },
}
</script>
