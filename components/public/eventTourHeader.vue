<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined tile>
        <!-- Header Picture -->
        <v-img :src="eventRef.headerURL" height="300px"> </v-img>

        <v-row class="px-10 d-sm-block d-md-flex">
          <v-col cols="12" class="d-sm-block d-md-flex">
            <!-- Profile Picture -->
            <div class="mr-5 mt-n7">
              <v-avatar class="mt-n15" size="150" rounded>
                <img :src="eventRef.photoURL" alt="..." />
              </v-avatar>
            </div>

            <v-row class="mx-1 mt-4 d-block">
              <v-row class="d-flex align-center mt-n6">
                <!-- Title -->
                <v-col cols="8" md="7" xl="9">
                  <h1 class="text-h4 font-weight-bold mb-md-n3">
                    {{ eventRef.title }} &mdash; {{ tournamentRef.sportType }}
                  </h1>
                </v-col>

                <!-- Register Button -->
                <v-col cols="4" md="5" xl="3" class="d-flex justify-end">
                  <v-card
                    color="white"
                    outlined
                    class="d-flex align-center py-2 px-4"
                  >
                    <h1
                      class="text-subtitle-2 font-weight-regular ml-3 text-grey"
                    >
                      {{ managerlength_active }} /
                      {{ tournamentRef.participants }} Teams
                    </h1>

                    <v-divider class="mx-4" vertical></v-divider>

                    <v-btn
                      class="font-weight-regular text-capitalize"
                      v-if="authStatus == true"
                      v-show="
                        eventRef.isOpen == true && requestStatus == 'request'
                      "
                      :disabled="
                        managerlength_active == tournamentRef.participants ||
                        tournamentRef.isGroupDraw == true
                      "
                      @click="requestManager = !requestManager"
                      color="primary"
                      depressed
                    >
                      <v-icon size="20" class="mr-1"
                        >mdi-account-arrow-right-outline</v-icon
                      >
                      Register
                    </v-btn>

                    <v-btn
                      class="font-weight-regular text-capitalize"
                      v-if="authStatus == true"
                      v-show="
                        eventRef.isOpen == true && requestStatus == 'pending'
                      "
                      color="yellow darken-2"
                      depressed
                      dark
                    >
                      <v-icon size="20" class="mr-1"
                        >mdi-account-arrow-right-outline</v-icon
                      >
                      Pending
                    </v-btn>

                    <v-btn
                      class="font-weight-regular text-capitalize"
                      v-if="authStatus == true"
                      v-show="
                        eventRef.isOpen == true && requestStatus == 'accepted'
                      "
                      disabled
                      color="yellow darken-2"
                      depressed
                    >
                      <v-icon size="20" class="mr-1"
                        >mdi-account-arrow-right-outline</v-icon
                      >
                      Joined
                    </v-btn>

                    <v-btn
                      class="font-weight-regular text-capitalize"
                      v-else
                      v-show="eventRef.isOpen == true"
                      :disabled="
                        managerlength_active == tournamentRef.participants ||
                        tournamentRef.isGroupDraw == true
                      "
                      :to="`signin`"
                      color="green darken-1"
                      depressed
                    >
                      <span class="text-white">Login to Register</span>
                    </v-btn>

                    <v-btn
                      class="font-weight-regular text-capitalize"
                      v-show="eventRef.isOpen == false"
                      disabled
                      color="primary"
                      depressed
                    >
                      <v-icon size="20" class="mr-1">mdi-lock-outline</v-icon>
                      Private
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <!-- Description -->
                <v-col cols="7">
                  <h1
                    class="text-subtitle-2 text-justify font-weight-regular mt-n3 mt-md-0 mt-lg-n0 mt-xl-n3"
                  >
                    {{ eventRef.description }}
                  </h1>
                </v-col>
                <v-col></v-col>
              </v-row>

              <v-divider class="mt-3"></v-divider>

              <div class="d-inline-flex mb-3">
                <!-- Teams -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-account-group</v-icon>
                  {{ tournamentRef.participants }} Teams
                </h1>

                <!-- Gender -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-gender-male-female</v-icon>
                  {{ tournamentRef.gender }}
                </h1>

                <!-- Sports Type -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-stadium</v-icon>
                  {{ tournamentRef.sportType }}
                </h1>

                <!-- Format -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-trophy</v-icon>
                  {{ tournamentRef.gStage }} &rarr; {{ tournamentRef.fStage }}
                </h1>
              </div>
            </v-row>
          </v-col>
        </v-row>

        <!-- Tab Route -->
        <v-row class="mx-2">
          <v-tabs centered>
            <v-tab
              v-for="tab in tabs"
              :key="tab.name"
              class="text-caption font-weight-medium"
              :to="tab.route"
            >
              {{ tab.name }}
            </v-tab>
          </v-tabs>
        </v-row>

        <!-- Request To be Manager overlay-->
        <v-overlay :opacity="opacity" :value="requestManager">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn
              @click="requestManager = false"
              disabled
              class="mt-n3 ml-n8"
              dark
              icon
            >
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <!-- Title -->
            <div class="text-center">
              <v-icon class="mb-3" color="primary" size="60"
                >mdi-account-arrow-right-outline</v-icon
              >
              <h1 class="text-center text-h5 font-weight-medium">
                Are you sure want to become team manager and participate in this
                tournament?
              </h1>
            </div>

            <div class="d-flex justify-center mt-8 mb-n8">
              <v-btn
                @click="requestManager = false"
                class="px-10 mx-3 text-capitalize"
                color="grey darken-1"
                height="40"
                depressed
                dark
              >
                Cancel</v-btn
              >
              <v-btn
                class="px-10 mx-3 text-capitalize"
                color="green darken-1"
                @click="onRequest"
                height="40"
                depressed
                dark
              >
                Request</v-btn
              >
            </div>
          </v-card>
        </v-overlay>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      tabs: [
        {
          name: 'Participants',
          route: `participants`,
        },
        {
          name: 'Group Seedings',
          route: `groupseedings`,
        },
        {
          name: 'Standings',
          route: `standings`,
        },
        {
          name: 'Group Stage',
          route: `groupstage`,
        },
        {
          name: 'Final Stage',
          route: `finalstage`,
        },
      ],

      // User Input Data
      photoURL: '',
      headerURL: '',
      eventRef: '',
      tournamentRef: '',
      hostnameProf: '',
      startDate: '',
      endDate: '',

      // Request Button Data
      managerlength_active: null,
      authStatus: false,
      requestStatus: 'request',
      requestListMgr: '',

      // Manager Request requestManager
      opacity: 0.5,
      requestManager: false,
    }
  },

  mounted() {
    // Get Events Data
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.eventRef = doc.data()
        this.startDate = doc.data().startDate
        this.endDate = doc.data().endDate

        this.$fire.firestore
          .collection('users')
          .doc(doc.data().hostName)
          .onSnapshot((docRef) => {
            this.hostnameProf = docRef.data()
          })
      })

    // Get Tournaments Data
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()

        // Get Active Managers Number
        var manager_list = doc.data().managerRef
        var manager_active = manager_list.filter(
          (element) => element.status === 'active'
        )
        this.managerlength_active = manager_active.length
      })

    // Get User Authentication Status
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authStatus = true
      } else {
        this.authStatus = false
      }
    })

    // Get ManagerID
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        let managerID = ''
        managerID = user.uid

        // Get Request Status
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.requestListMgr = doc.data().requestListMgr
              const requestListMgr = this.requestListMgr.find(
                (element) => element.managerID === managerID
              )

              if (typeof requestListMgr != 'undefined') {
                if (requestListMgr.status == 'pending') {
                  this.requestStatus = 'pending'
                } else if (requestListMgr.status == 'accepted') {
                  this.requestStatus = 'accepted'
                }
              }
            }
          })
      }
    })
  },

  methods: {
    async onRequest() {
      try {
        // Initialize ManagerID & OrganizerID
        let managerID = ''
        let managerName = ''
        let organizerID = ''
        let collaboratorID = ''
        let eventID = this.$route.params.id
        let tournamentID = this.$route.params.tournamentID
        let eventName = ''
        let tournamentName = ''

        // Get ManagerID
        managerID = await this.$fire.auth.currentUser.uid

        // Get User Info
        await this.$fire.firestore
          .collection('users')
          .doc(managerID)
          .get()
          .then((doc) => {
            managerName = doc.data().name
          })

        // Get OrganizerID
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .get()
          .then((doc) => {
            organizerID = doc.data().hostName
            eventName = doc.data().title
          })

        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .get()
          .then((doc) => {
            collaboratorID = doc.data().collaborator
            tournamentName = doc.data().sportType
          })

        // Update List of Request
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .update({
            requestListMgr: firebase.firestore.FieldValue.arrayUnion({
              managerID: managerID,
              eventID: eventID,
              tournamentID: tournamentID,
              status: 'pending',
            }),
          })

        if (collaboratorID == null) {
          // Send Manager Request to Organizer
          await this.$fire.firestore
            .collection('users')
            .doc(organizerID)
            .update({
              managerReq: firebase.firestore.FieldValue.arrayUnion({
                managerID: managerID,
                managerName: managerName,
                eventID: eventID,
                eventName: eventName,
                tournamentID: tournamentID,
                tournamentName: tournamentName,
                type: 'eventRequest',
              }),
            })
            .then(() => {
              this.requestManager = false
              this.$store.commit('SET_NOTIFICATION', {
                alert: 'Request has been sent to the organizer',
                alertIcon: 'mdi-email-send',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'green darken-1',
                snackbar: true,
              })
            })
        } else {
          // Send Manager Request to Organizer
          await this.$fire.firestore
            .collection('users')
            .doc(collaboratorID)
            .update({
              managerReq: firebase.firestore.FieldValue.arrayUnion({
                managerID: managerID,
                managerName: managerName,
                eventID: eventID,
                eventName: eventName,
                tournamentID: tournamentID,
                tournamentName: tournamentName,
                type: 'eventRequest',
              }),
            })
            .then(() => {
              this.requestManager = false
              this.$store.commit('SET_NOTIFICATION', {
                alert: 'Request has been sent to the organizer',
                alertIcon: 'mdi-email-send',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'green darken-1',
                snackbar: true,
              })
            })
        }
      } catch (error) {
        console.log(error)
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
