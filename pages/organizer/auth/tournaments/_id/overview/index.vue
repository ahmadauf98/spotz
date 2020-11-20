<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <v-snackbar
          v-show="notification.alert != '' || notification.alert != null"
          v-model="notification.snackbar"
          :timeout="notification.timeout"
          dark
          top
        >
          <div class="d-flex justify-center align-center">
            <v-icon
              :class="notification.alertIconStyle"
              :color="notification.colorIcon"
              >{{ notification.alertIcon }}</v-icon
            >
            {{ notification.alert }}
          </div>
        </v-snackbar>

        <!-- Organization Details Part -->
        <tournamentHeader />

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
                        v-if="tournamentProf.status == false"
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
                        :to="`/tournaments/${this.$route.params.id}/settings`"
                        icon
                      >
                        <v-icon>mdi-cogs</v-icon>
                      </v-btn>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        Whether your tournament is public (visible to everyone)
                        or draft (only accessible by host). Use the publish
                        button to change the status.
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        v-if="tournamentProf.status == false"
                        @click="changeStatus"
                        color="green darken-1"
                        class="ml-auto px-5 font-weight-regular text-capitalize"
                        depressed
                        dark
                      >
                        Publish
                        <v-icon size="20" class="ml-1">mdi-send</v-icon>
                      </v-btn>

                      <v-btn
                        v-else
                        @click="changeStatus"
                        color="yellow darken-2"
                        class="ml-auto px-5 font-weight-regular text-capitalize"
                        depressed
                        dark
                      >
                        Draft
                        <v-icon size="20" class="ml-1">mdi-archive</v-icon>
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
                          tournamentProf.isOpen == false &&
                          this.managerlength < tournamentProf.participants
                        "
                        @click="overlay = !overlay"
                        class="ml-auto mt-n2"
                        color="primary"
                        icon
                      >
                        <v-icon>mdi-account-multiple-plus</v-icon>
                      </v-btn>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        You can invite team managers by email, once they approve
                        to participate in your tournament, their name will be in
                        the list of managers (one manager per team).
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/managers`"
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
              <v-row>
                <!-- First Card -->
                <v-col>
                  <v-card class="mx-auto py-4 px-5 pb-11 pb-md-4" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1
                        class="text-subtitle-1 font-weight-bold d-flex align-center"
                      >
                        <v-icon class="mr-1">mdi-tournament</v-icon>
                        Seedings Structure
                      </h1>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        The tournament does not have fixtures yet. You should
                        make a draw of teams after <strong>approve</strong> all
                        registration application by
                        <strong>all managers of the teams.</strong>
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/seedings`"
                        color="primary"
                        :disabled="
                          tournamentProf.participants != teamListNumber
                        "
                        class="ml-auto text-capitalize"
                        text
                      >
                        <v-icon size="20" class="mr-1">mdi-pencil</v-icon>
                        Tournament Draw
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <!-- Second Card -->
                <v-col>
                  <v-card class="mx-auto py-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1
                        class="text-subtitle-1 font-weight-bold d-flex align-center"
                      >
                        <v-icon class="mr-1">mdi-ticket</v-icon>
                        Registration
                      </h1>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        Approve or reject list of team registration from team
                        managers. You can set duration of registration too.
                        Within the time period, managers can resubmit list of
                        registration.
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        v-if="tournamentProf.registrationStatus == false"
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/registration`"
                        color="primary"
                        class="ml-auto"
                        text
                      >
                        <v-icon size="20" class="mr-2"
                          >mdi-ticket-account</v-icon
                        >
                        Setup
                      </v-btn>

                      <v-btn
                        v-else
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/teamapproval`"
                        color="primary"
                        class="ml-auto text-capitalize"
                        text
                      >
                        <v-icon size="20" class="mr-1"
                          >mdi-ticket-account</v-icon
                        >
                        Approval
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>

        <!-- Invite Manager -->
        <v-overlay :opacity="opacity" :value="overlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="overlay = false" class="mt-n3 ml-n8" icon>
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
import tournamentHeader from '~/components/organizer/tournamentHeader'
import tournamentInfo from '~/components/organizer/tournamentInfo'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

  components: {
    tournamentHeader,
    tournamentInfo,
  },

  data() {
    return {
      // User Input Data
      tournamentProf: '',
      tournamentStatus: false,
      userEmail: '',
      getUser: '',
      managerlength: '',
      teamListNumber: null,

      // Manager Invitation Overlay
      opacity: 0.5,
      overlay: false,
    }
  },

  // Fetch Notification Data from Vuex
  computed: {
    ...mapState(['notification']),
  },

  // Fetch User's Data
  created() {
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentProf = doc.data()
        this.managerlength = doc.data().managerRef.length
        // console.log(this.tournamentProf)
      })

    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .collection('team-registration')
      .where('status', '==', 'approved')
      .onSnapshot((querySnapshot) => {
        this.teamListNumber = querySnapshot.size
      })
  },

  methods: {
    // Update Status in Database
    changeStatus() {
      this.tournamentStatus = !this.tournamentStatus
      this.onChangeStatus()
    },

    async onChangeStatus() {
      try {
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .update({
            status: this.tournamentStatus,
          })
      } catch (error) {
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    //Invite Manager
    async onInvite() {
      try {
        const snapshot = await this.$fire.firestore
          .collection('users')
          .where('email', '==', this.userEmail)
          .get()

        this.getUser = snapshot.docs.map((doc) => doc.data())
        // console.log(this.getUser[0].uid)

        await this.$fire.firestore
          .collection('users')
          .doc(this.getUser[0].uid)
          .update({
            notificationsMgr: firebase.firestore.FieldValue.arrayUnion({
              messages:
                'You are invited to participate in ' +
                this.tournamentProf.title,
              tournamentID: this.tournamentProf.tournamentID,
              isAction: true,
            }),
          })
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.tournamentProf.tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayUnion({
                  uid: this.getUser[0].uid,
                  status: 'pending',
                }),
              })
          )
          .then(() => {
            this.overlay = false
            this.userEmail = ''
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'Invitation has been sent.',
              alertIcon: 'mdi-email-send',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
      } catch (error) {
        console.log(error.code)
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
