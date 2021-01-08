<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventTourHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <!-- No Application -->
            <v-card
              v-if="approvalList == ''"
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9"
              outlined
              tile
            >
              <v-row class="mt-n4 mb-n5 d-flex align-center">
                <v-col cols="12" md="8" order="2" order-md="1">
                  <h1
                    class="mb-2 text-center text-md-left text-subtitle-1 font-weight-bold"
                  >
                    Registration Approval
                  </h1>
                  <div>
                    <h1
                      class="text-subtitle-1 font-weight-regular text-center text-md-left mb-5"
                    >
                      Currently there is no application. Once manager submit
                      registration form, the application will appear here for
                      your approval.
                    </h1>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="d-flex justify-center align-top"
                  order="1"
                  order-md="2"
                >
                  <div class="px-5">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmanagers-tournament.svg?alt=media&token=ec47c873-a84d-4353-b823-e0fe7bff619b"
                      width="220px"
                      alt="..."
                    />
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <!-- Application Approval-->
            <v-card
              v-else
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9 mb-5"
              outlined
              tile
            >
              <div class="d-flex">
                <h1 class="text-h6 font-weight-bold mb-1">
                  Registration Approval
                </h1>
              </div>

              <div>
                <h1 class="text-caption text-grey">
                  You can approve or reject team registration application.
                  Before doing that, please check every details of the players.
                </h1>
              </div>

              <v-divider class="mt-5"></v-divider>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Team Name</th>
                      <th class="text-center">Manager Name</th>
                      <th class="text-center">Manager Email</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(list, index) in approvalList"
                      :key="index"
                      class="text-center"
                    >
                      <td class="text-left">{{ list.teamName }}</td>
                      <td>{{ list.managerName }}</td>
                      <td>{{ list.managerEmail }}</td>
                      <td>
                        <v-btn
                          @click="onView(list)"
                          class="text-capitalize"
                          color="primary"
                          depressed
                          small
                          dark
                          >View</v-btn
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>

        <!-- View Player Overlay -->
        <v-overlay :opacity="opacity" :value="viewPlayerOverlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center overflow"
            max-height="470"
            width="700"
            color="white"
            light
            outlined
          >
            <div>
              <v-btn
                @click="viewPlayerOverlay = false"
                class="mt-n3 ml-n8"
                icon
              >
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </div>

            <div v-for="(list, index) in selectedTeam" :key="index">
              <div class="d-flex justify-center">
                <v-avatar
                  v-show="list.passportPhoto != ''"
                  class="profile"
                  color="grey"
                  size="114"
                >
                  <v-img :src="list.passportPhoto"></v-img>
                </v-avatar>
              </div>

              <div v-show="list.name != ''" class="d-flex justify-center mt-4">
                <h1 class="text-h4 font-weight-light">{{ list.name }}</h1>
              </div>

              <div
                v-show="list.identificationID != ''"
                class="d-flex justify-center"
              >
                <h1 class="text-h6 font-weight-light text-grey">
                  {{ list.identificationID }}
                </h1>
              </div>

              <div class="d-flex justify-center mt-4">
                <div v-show="list.gender != ''" class="text-center mx-5">
                  <h1 class="text-h6 font-weight-light text-grey">Gender</h1>
                  <h1 class="text-body-1 mt-n1">{{ list.gender }}</h1>
                </div>

                <div v-show="list.numAthelete != ''" class="text-center mx-5">
                  <h1 class="text-h6 font-weight-light text-grey">
                    Athelete ID
                  </h1>
                  <h1 class="text-body-1 mt-n1">{{ list.numAthelete }}</h1>
                </div>

                <div v-show="list.numMatric != ''" class="text-center mx-5">
                  <h1 class="text-h6 font-weight-light text-grey">Matric ID</h1>
                  <h1 class="text-body-1 mt-n1">{{ list.numMatric }}</h1>
                </div>
              </div>

              <div
                v-show="list.address != ''"
                class="d-flex justify-center mt-4"
              >
                <h1 class="text-h6 font-weight-light text-grey text-center">
                  {{ list.address }}
                </h1>
              </div>

              <div class="d-flex justify-center mt-3">
                <v-chip
                  v-show="list.phoneNumber != ''"
                  class="ma-2"
                  color="primary"
                >
                  {{ list.phoneNumber }}
                </v-chip>
              </div>

              <v-divider class="mt-5 mb-7"></v-divider>
            </div>

            <div class="d-flex justify-center mb-3">
              <v-btn
                @click="onApprove(teamData)"
                class="mx-3 text-capitalize"
                color="green darken-1"
                dark
                depressed
                >Approve</v-btn
              >

              <v-btn
                @click="onReject(teamData)"
                class="mx-3 text-capitalize"
                color="red darken-1"
                dark
                depressed
                >Reject</v-btn
              >
            </div>
          </v-card>
        </v-overlay>

        <!-- Refresh Overlay -->
        <v-overlay
          :opacity="opacityLoading"
          :value="overlayLoading"
          color="white"
        >
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import eventTourHeader from '~/components/organizer/eventTourHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'

export default {
  layout: 'organizer',

  components: {
    eventTourHeader,
    eventSponsorship,
    notifications,
  },

  data() {
    return {
      // User Input Data
      tournamentProf: '',
      tempList: [],
      approvalList: '',
      selectedTeam: '',
      teamData: '',

      // Overlay Data
      opacity: 0.5,
      viewPlayerOverlay: false,

      // Refresh Overlay
      opacityLoading: 1,
      overlayLoading: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            var collaborator = doc.data().collaborator

            this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .onSnapshot((doc) => {
                if (doc.exists) {
                  var hostName = doc.data().hostName

                  if (collaborator != null || hostName) {
                    if (user.uid != collaborator && user.uid != hostName) {
                      console.log('No Credential')
                      this.$router.replace('/organizer/auth/dashboard')
                    }
                  }
                }
              })
          })

        // Get Event Data
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            this.eventRef = doc.data()
          })

        // Get Tournament Data
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            this.tournamentRef = doc.data()
          })

        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .where('status', '==', 'pending')
          .onSnapshot((querySnapshot) => {
            this.tempList = []
            querySnapshot.forEach((doc) => {
              this.$fire.firestore
                .collection('users')
                .doc(doc.data().uid)
                .onSnapshot((udoc) => {
                  this.tempList.push({
                    listplayers: doc.data().listPlayers,
                    teamName: doc.data().teamName,
                    uid: doc.data().uid,
                    managerName: udoc.data().name,
                    managerEmail: udoc.data().email,
                  })
                })
            })
            this.approvalList = this.tempList
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // View Application
    onView(data) {
      this.viewPlayerOverlay = true
      this.selectedTeam = data.listplayers
      this.teamData = data
    },

    // Approve Registration
    async onApprove(data) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(data.uid)
          .update({
            status: 'approved',
          })
          .then(
            await this.$fire.firestore
              .collection('users')
              .doc(data.uid)
              .update({
                notificationsMgr: firebase.firestore.FieldValue.arrayUnion({
                  message:
                    'Congratulations! Your team registration of ' +
                    this.eventRef.title +
                    '(' +
                    this.tournamentRef.sportType +
                    ') has been approved.',
                  status: 'unread',
                }),
              })
          )
          .then(() => {
            this.$router.push(
              `/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/participants`
            )
            this.viewPlayerOverlay = false
            this.overlayLoading = false
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

    // Reject Application
    async onReject(data) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(data.uid)
          .update({
            status: 'rejected',
          })
          .then(
            await this.$fire.firestore
              .collection('users')
              .doc(data.uid)
              .update({
                notificationsMgr: firebase.firestore.FieldValue.arrayUnion({
                  message:
                    'Sorry! Your team registration of ' +
                    this.eventRef.title +
                    '(' +
                    this.tournamentRef.sportType +
                    ') has been rejected. Kindly resubmit back your application in order to get approved by the organizer.',
                  status: 'unread',
                }),
              })
          )
          .then(() => {
            this.$router.go(-1)
            this.viewPlayerOverlay = false
            this.overlayLoading = false
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
