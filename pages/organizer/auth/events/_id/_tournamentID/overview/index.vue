<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
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
                  <v-card class="mx-auto pt-4 pb-7 pb-md-4 px-5" outlined>
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
                        :to="`/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/settings`"
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
                        managers). Use the publish button to change the status
                        (host only).
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        v-show="userID == eventRef.hostName"
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
                        v-show="userID == eventRef.hostName"
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

                <!-- Second Card -->
                <v-col>
                  <v-card class="mx-auto pt-4 pb-7 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1
                        class="text-subtitle-1 font-weight-bold d-flex align-center"
                      >
                        <v-icon class="mr-1">mdi-account-hard-hat</v-icon>
                        Team Managers
                      </h1>

                      <v-btn
                        v-show="
                          eventRef.isOpen == false &&
                          managerlength < tournamentRef.participants
                        "
                        @click="invMgr = !invMgr"
                        class="ml-auto mt-n2"
                        color="primary"
                        icon
                      >
                        <v-icon>mdi-account-multiple-plus</v-icon>
                      </v-btn>

                      <v-chip
                        v-show="managerlength == tournamentRef.participants"
                        class="ml-auto mr-2 font-weight-medium"
                        color="green darken-1"
                        label
                        small
                        dark
                      >
                        Full</v-chip
                      >
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        v-show="eventRef.isOpen == true"
                        class="text-subtitle-1 text-justify font-weight-regular mb-7 mb-md-0 mb-lg-7 mb-xl-0"
                      >
                        You can accept team manager request in the notifications
                        list, then their name will be in the list of managers
                        (one manager per team).
                      </h1>

                      <h1
                        v-show="eventRef.isOpen == false"
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        You can invite team manager by their email, once they
                        accept to participate in your tournament, their name
                        will be in the list of managers (one manager per team).
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        :to="`/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/overview/managers`"
                        color="primary"
                        class="ml-auto text-capitalize"
                        text
                      >
                        <v-icon size="20" class="mr-1">mdi-account-cog</v-icon>
                        Manage
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Second Row -->
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>

        <!-- Invite Manager -->
        <v-overlay :opacity="opacity" :value="invMgr">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="invMgr = false" class="mt-n3 ml-n8" icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <!-- Title -->
            <div class="text-center">
              <v-icon class="mb-3" color="grey darken-1" size="60"
                >mdi-email</v-icon
              >
              <h1 class="text-center text-h5 font-weight-medium">
                Invite manager to the tournament
              </h1>
            </div>

            <div class="d-flex align-center">
              <v-card-text>
                <v-text-field
                  class="mr-5 mt-6"
                  v-model="userEmail"
                  color="primary"
                  placeholder="Email Address"
                  prepend-icon="mdi-account"
                  outlined
                  dense
                ></v-text-field>
              </v-card-text>

              <v-btn
                @click="onInvite"
                class="px-10 font-weight-regular text-capitalize"
                color="primary"
                height="40"
                depressed
              >
                Invite</v-btn
              >
            </div>
          </v-card>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import eventTourHeader from '~/components/organizer/eventTourHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

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
      managerlength: '',

      // Current User Info
      userID: null,

      // Invite User Info
      userEmail: '',
      getUser: '',

      // Manager Invitation Overlay
      opacity: 0.5,
      invMgr: false,

      // Loading State
      isLoading: false,
    }
  },

  mounted() {
    // Get current user
    this.userID = this.$fire.auth.currentUser.uid

    // Get data from events
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.eventRef = doc.data()
      })

    // Get data from tournaments
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
        this.managerlength = doc.data().managerRef.length
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

    // Invite Manager
    async onInvite() {
      try {
        // Find userID by email
        const snapshot = await this.$fire.firestore
          .collection('users')
          .where('email', '==', this.userEmail)
          .get()

        this.getUser = snapshot.docs.map((doc) => doc.data())

        // Initialize ManagerID & OrganizerID
        let managerID = this.getUser[0].uid
        let organizerID = this.eventRef.hostName
        let eventID = this.eventRef.eventID
        let eventName = this.eventRef.title
        let sportType = this.tournamentRef.sportType
        let gender = this.tournamentRef.gender
        let tournamentID = this.tournamentRef.tournamentID

        // Send Invitation to Manager
        await this.$fire.firestore
          .collection('users')
          .doc(managerID)
          .update({
            organizerInv: firebase.firestore.FieldValue.arrayUnion({
              organizerID: organizerID,
              eventID: eventID,
              tournamentID: tournamentID,
              eventName: eventName,
              gender: gender,
              sportType: sportType,
              type: 'managerInv',
              category: 'eventsMgr',
            }),
          })

        // Add Pending Status to Manager List
        await this.$fire.firestore
          .collection('events')
          .doc(this.eventRef.eventID)
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: firebase.firestore.FieldValue.arrayUnion({
              uid: managerID,
              status: 'pending',
            }),
          })
          .then(() => {
            this.invMgr = false
            this.userEmail = ''
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'Invitation has been sent',
              alertIcon: 'mdi-email-send',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
      } catch (error) {
        this.invMgr = false
        console.log(error)
        if (error.code == undefined) {
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'This email is not register yet in our application.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          this.$store.commit('SET_NOTIFICATION', {
            alert: error.message,
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        }
      }
    },
  },
}
</script>
