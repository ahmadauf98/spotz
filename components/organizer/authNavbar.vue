<template>
  <!-- Navigation Bar -->
  <v-app-bar
    class="d-none d-sm-inline nav-padding"
    elevate-on-scroll
    color="white"
    app
  >
    <!-- Brand Logo -->
    <v-toolbar-title>
      <NuxtLink to="/organizer/auth/dashboard">
        <img
          class="mt-2 mr-8"
          src="~/static/img/logo-organizer.svg"
          alt="..."
          height="30px"
        />
      </NuxtLink>
    </v-toolbar-title>

    <!-- Navigation Button -->
    <div class="d-none d-sm-inline" v-for="nav in navigation" :key="nav.name">
      <v-btn
        class="mx-1 px-1 text-capitalize"
        color="#1A202C"
        :to="nav.route"
        text
      >
        {{ nav.name }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <!-- Invitation & Request Dropdown -->
    <v-menu offset-y left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-capitalize"
          icon
          color="#1A202C"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon v-if="managerReq == null || managerReq == ''" size="32"
            >mdi-account-supervisor</v-icon
          >

          <v-badge v-else color="primary" :content="managerReq.length" overlap>
            <v-icon size="32">mdi-account-supervisor</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list dense width="400px" max-height="500px">
        <!-- Invitation & Request Header-->
        <v-list-item>
          <v-list-item-title class="text-body-2 text-center"
            >Invitation & Request</v-list-item-title
          >
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <v-card
          v-if="managerReq == null || managerReq == ''"
          class="mx-3 px-5 my-4"
          color="white"
          outlined
        >
          <h1 class="text-caption font-weight-medium text-center">
            <i>No Invitation or Request</i>
          </h1>
        </v-card>

        <v-card
          v-else
          v-for="(request, index) in managerReq"
          :key="index"
          class="mx-3 px-5 my-4"
          outlined
        >
          <v-row class="d-flex align-center">
            <v-col
              v-if="request.type == 'tournamentRequest'"
              cols="9"
              class="d-block align-center"
            >
              <h1
                class="text-caption font-weight-regular text-justify text-grey"
              >
                <span class="font-weight-bold">{{ request.managerName }}</span>
                is requesting to join
                <span class="font-weight-bold"
                  >{{ request.tournamentName }}
                </span>
              </h1>
            </v-col>

            <v-col
              v-if="request.type == 'eventRequest'"
              cols="9"
              class="d-block align-center"
            >
              <h1
                class="text-caption font-weight-regular text-justify text-grey"
              >
                <span class="font-weight-bold">{{ request.managerName }}</span>
                is requesting to join
                <span class="font-weight-bold"
                  >{{ request.eventName }}({{ request.tournamentName }})</span
                >
              </h1>
            </v-col>

            <v-col
              v-if="
                request.type == 'tournamentRequest' ||
                request.type == 'eventRequest'
              "
              cols="3"
            >
              <v-btn
                @click="onAcceptReq(request, managerReq)"
                color="green darken-1"
                width="60"
                x-small
                dark
                depressed
                >Accept</v-btn
              >
              <v-btn
                @click="onRejectReq(request, managerReq)"
                color="red darken-1"
                width="60"
                x-small
                dark
                depressed
                >Reject</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-list>
    </v-menu>

    <!-- General Notification Dropdown -->
    <v-menu offset-y left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-capitalize"
          @click="onChangeStatus(unreadNotificationRef, notificationsRef)"
          icon
          color="#1A202C"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            v-if="unreadNotificationRef == null || unreadNotificationRef == ''"
            >mdi-bell</v-icon
          >

          <v-badge
            v-else
            color="primary"
            :content="unreadNotificationRef.length"
            overlap
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list dense width="400px" max-height="500px">
        <!-- General Notification Header-->
        <v-list-item>
          <v-list-item-title class="text-body-2 text-center"
            >General Notifications</v-list-item-title
          >
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <v-card
          v-if="notificationsRef == null || notificationsRef == ''"
          class="mx-3 px-5 my-4"
          color="white"
          outlined
        >
          <h1 class="text-caption font-weight-medium text-center">
            <i>No Notifications</i>
          </h1>
        </v-card>

        <v-card
          v-else
          v-for="(notification, index) in notificationsRef.slice().reverse()"
          :key="index"
          class="mx-3 px-5 my-4"
          outlined
        >
          <v-row>
            <v-col class="d-flex align-center">
              <h1
                class="text-caption font-weight-medium text-justify text-grey"
              >
                {{ notification.message }}
              </h1>
            </v-col>
          </v-row>
        </v-card>
      </v-list>
    </v-menu>

    <!-- Username Dropdown -->
    <v-menu offset-y left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="py-6 ml-1 mr-n6"
          text
          color="#1A202C"
          v-bind="attrs"
          v-on="on"
        >
          <!-- Profile Photo -->
          <v-avatar class="mr-1" size="35">
            <img :src="photoURL" alt="..." />
          </v-avatar>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list dense width="300px">
        <!-- Account Header -->
        <v-list-item class="text-center">
          <v-list-item-title class="text-body-2">Account</v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Profile Overview -->
        <v-list-item>
          <v-row class="d-flex">
            <v-col cols="2">
              <!-- Profile Photo -->
              <v-avatar class="mr-1" size="40">
                <img :src="photoURL" alt="..." />
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <h1 class="text-body-2 font-weight-bold">{{ name }}</h1>
              <h1 class="caption font-weight-regular">{{ email }}</h1>
            </v-col>
          </v-row>
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Manager Button -->
        <v-list-item @click="onSwitch()">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
              >mdi-view-dashboard-outline</v-icon
            >
            Manager Dashboard</v-list-item-title
          >
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Tournament & Event Button -->
        <v-list-item v-for="list in lists" :key="list.name" :to="list.route">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c">{{
              list.icon
            }}</v-icon>
            {{ list.title }}</v-list-item-title
          >
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Settings Button -->
        <v-list-item to="/organizer/auth/settings">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
              >mdi-cog-outline</v-icon
            >
            Settings</v-list-item-title
          >
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Logout Button -->
        <v-list-item @click.prevent="logout">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
              >mdi-logout</v-icon
            >
            Log out</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      navigation: [
        { name: 'My Tournaments', route: '/organizer/auth/tournaments' },
        { name: 'My Events', route: '/organizer/auth/events' },
      ],
      lists: [
        {
          title: 'My Tournaments',
          route: '/organizer/auth/tournaments',
          icon: 'mdi-tournament',
        },
        {
          title: 'My Events',
          route: '/organizer/auth/events',
          icon: 'mdi-floor-plan',
        },
      ],
      // Input Data
      name: '',
      email: '',
      photoURL: '',
      notificationsRef: '',
      unreadNotificationRef: '',
      managerReq: '',

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
            this.name = doc.data().name
            this.email = doc.data().email
            this.photoURL = doc.data().photoURL
            this.notificationsRef = doc.data().notificationsRef
            const managerReq_sort = doc.data().managerReq

            // Sort manager request
            if (typeof managerReq_sort != 'undefined') {
              this.managerReq = managerReq_sort.reverse()
            }

            // Filter unread notification organizer
            const organizer_unread_list = this.notificationsRef

            if (
              typeof organizer_unread_list != 'undefined' ||
              organizer_unread_list != ''
            ) {
              const organizer_unread = organizer_unread_list.filter(
                (element) => element.status === 'unread'
              )
              this.unreadNotificationRef = organizer_unread
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Switch to Manager Dashboard
    onSwitch() {
      this.$router.push('/manager/auth/dashboard')

      this.$store.commit('SET_NOTIFICATION', {
        alert: 'Switching to Manager Dashboard',
        alertIcon: 'mdi-account',
        alertIconStyle: 'mr-2 align-self-top',
        colorIcon: 'primary',
        snackbar: true,
      })
    },

    // To change status of organization notifications
    async onChangeStatus(list, notifications) {
      try {
        // Change status of every unread list
        for (var i = 0; i < list.length; i++) {
          list[i].status = 'read'
        }

        await this.$fire.firestore.collection('users').doc(this.userId).update({
          notificationsRef: notifications,
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

    // To Accept Manager Request
    async onAcceptReq(req, list) {
      try {
        if (req.type == 'tournamentRequest') {
          // Initialize deletedManagerReq object
          const deletedManagerReq = {
            managerID: req.managerID,
            managerName: req.managerName,
            tournamentID: req.tournamentID,
            tournamentName: req.tournamentName,
            type: req.type,
          }

          // Create acceptedMsg
          const acceptedMsg = {
            status: 'unread',
            message:
              'Your manager request to join ' +
              req.tournamentName +
              ' has been approved. Kindly check the details of tournament to register your players.',
          }

          // Add tournamentID to tournamentsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(req.managerID)
            .update({
              tournamentsMgr: firebase.firestore.FieldValue.arrayUnion(
                req.tournamentID
              ),
            })

          // Delete req from managerReq (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              managerReq: firebase.firestore.FieldValue.arrayRemove(
                deletedManagerReq
              ),
            })

          // Send notification to notificationsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(req.managerID)
            .update({
              notificationsMgr: firebase.firestore.FieldValue.arrayUnion(
                acceptedMsg
              ),
            })

          // Add manager to tournament manager list
          await this.$fire.firestore
            .collection('tournaments')
            .doc(req.tournamentID)
            .update({
              managerRef: firebase.firestore.FieldValue.arrayUnion({
                uid: req.managerID,
                status: 'active',
              }),
            })

          // Update list of request (TournamentID)
          await this.$fire.firestore
            .collection('tournaments')
            .doc(req.tournamentID)
            .get()
            .then((doc) => {
              const currentRequestListMgrTemp = doc.data().requestListMgr

              // Get current list of request
              const currentRequestListMgrFiltered = currentRequestListMgrTemp.find(
                (element) =>
                  element.managerID === req.managerID &&
                  element.tournamentID === req.tournamentID
              )

              // Create current list of request
              const currentRequestListMgr = {
                managerID: currentRequestListMgrFiltered.managerID,
                tournamentID: currentRequestListMgrFiltered.tournamentID,
                status: currentRequestListMgrFiltered.status,
              }

              // Create updated list of request
              const updatedRequestListMgr = {
                managerID: req.managerID,
                tournamentID: req.tournamentID,
                status: 'accepted',
              }

              // Delete current list of request
              this.$fire.firestore
                .collection('tournaments')
                .doc(req.tournamentID)
                .update({
                  requestListMgr: firebase.firestore.FieldValue.arrayRemove(
                    currentRequestListMgr
                  ),
                })

              // Add updated list of request
              this.$fire.firestore
                .collection('tournaments')
                .doc(req.tournamentID)
                .update({
                  requestListMgr: firebase.firestore.FieldValue.arrayUnion(
                    updatedRequestListMgr
                  ),
                })
            })
        } else if (req.type == 'eventRequest') {
          // Initialize deletedManagerReq object
          const deletedManagerReq = {
            managerID: req.managerID,
            managerName: req.managerName,
            eventID: req.eventID,
            eventName: req.eventName,
            tournamentID: req.tournamentID,
            tournamentName: req.tournamentName,
            type: req.type,
          }

          // Create acceptedMsg
          const acceptedMsg = {
            status: 'unread',
            message:
              'Your manager request to join ' +
              req.eventName +
              '(' +
              req.tournamentName +
              ')' +
              ' has been approved. Kindly check the details of tournament to register your players.',
          }

          // Add tournamentID to eventsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(req.managerID)
            .update({
              eventsMgr: firebase.firestore.FieldValue.arrayUnion({
                eventID: req.eventID,
                tournamentID: req.tournamentID,
              }),
            })

          // Delete req from managerReq (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              managerReq: firebase.firestore.FieldValue.arrayRemove(
                deletedManagerReq
              ),
            })

          // Send notification to notificationsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(req.managerID)
            .update({
              notificationsMgr: firebase.firestore.FieldValue.arrayUnion(
                acceptedMsg
              ),
            })

          // Add manager to tournament manager list
          await this.$fire.firestore
            .collection('events')
            .doc(req.eventID)
            .collection('tournaments')
            .doc(req.tournamentID)
            .update({
              managerRef: firebase.firestore.FieldValue.arrayUnion({
                uid: req.managerID,
                status: 'active',
              }),
            })

          // Update list of request (TournamentID)
          await this.$fire.firestore
            .collection('events')
            .doc(req.eventID)
            .collection('tournaments')
            .doc(req.tournamentID)
            .get()
            .then((doc) => {
              const currentRequestListMgrTemp = doc.data().requestListMgr

              // Get current list of request
              const currentRequestListMgrFiltered = currentRequestListMgrTemp.find(
                (element) =>
                  element.managerID === req.managerID &&
                  element.tournamentID === req.tournamentID
              )

              // Create current list of request
              const currentRequestListMgr = {
                managerID: currentRequestListMgrFiltered.managerID,
                eventID: currentRequestListMgrFiltered.eventID,
                tournamentID: currentRequestListMgrFiltered.tournamentID,
                status: currentRequestListMgrFiltered.status,
              }

              // Create updated list of request
              const updatedRequestListMgr = {
                managerID: req.managerID,
                eventID: req.eventID,
                tournamentID: req.tournamentID,
                status: 'accepted',
              }

              // Delete current list of request
              this.$fire.firestore
                .collection('events')
                .doc(req.eventID)
                .collection('tournaments')
                .doc(req.tournamentID)
                .update({
                  requestListMgr: firebase.firestore.FieldValue.arrayRemove(
                    currentRequestListMgr
                  ),
                })

              // Add updated list of request
              this.$fire.firestore
                .collection('events')
                .doc(req.eventID)
                .collection('tournaments')
                .doc(req.tournamentID)
                .update({
                  requestListMgr: firebase.firestore.FieldValue.arrayUnion(
                    updatedRequestListMgr
                  ),
                })
            })
        }
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

    // To Reject Manager Request
    async onRejectReq(req, list) {
      try {
        if (req.type == 'tournamentRequest') {
          // Initialize deletedManagerReq Object
          const deletedManagerReq = {
            managerID: req.managerID,
            managerName: req.managerName,
            tournamentID: req.tournamentID,
            tournamentName: req.tournamentName,
            type: req.type,
          }

          // Create rejectedMsg
          const rejectedMsg = {
            status: 'unread',
            message:
              'Your manager request to join ' +
              req.tournamentName +
              ' has been rejected. Kindly contact the organizer for more information.',
          }

          // Delete req from managerReq (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              managerReq: firebase.firestore.FieldValue.arrayRemove(
                deletedManagerReq
              ),
            })

          // Send notification to notificationsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(req.managerID)
            .update({
              notificationsMgr: firebase.firestore.FieldValue.arrayUnion(
                rejectedMsg
              ),
            })

          // Delete list of request (TournamentID)
          await this.$fire.firestore
            .collection('tournaments')
            .doc(req.tournamentID)
            .get()
            .then((doc) => {
              const currentRequestListMgrTemp = doc.data().requestListMgr

              // Get current list of request
              const currentRequestListMgrFiltered = currentRequestListMgrTemp.find(
                (element) =>
                  element.managerID === req.managerID &&
                  element.tournamentID === req.tournamentID
              )

              // Create current list of request
              const currentRequestListMgr = {
                managerID: currentRequestListMgrFiltered.managerID,
                tournamentID: currentRequestListMgrFiltered.tournamentID,
                status: currentRequestListMgrFiltered.status,
              }

              // Delete current list of request
              this.$fire.firestore
                .collection('tournaments')
                .doc(req.tournamentID)
                .update({
                  requestListMgr: firebase.firestore.FieldValue.arrayRemove(
                    currentRequestListMgr
                  ),
                })
            })
            .then(() => {
              this.$store.commit('SET_NOTIFICATION', {
                alert:
                  'You have rejected manager invitation from ' +
                  req.tournamentName,
                alertIcon: 'mdi-alert-circle',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'red darken-1',
                snackbar: true,
              })
            })
        } else if (req.type == 'eventRequest') {
          // Initialize deletedManagerReq Object
          const deletedManagerReq = {
            managerID: req.managerID,
            managerName: req.managerName,
            eventID: req.eventID,
            eventName: req.eventName,
            tournamentID: req.tournamentID,
            tournamentName: req.tournamentName,
            type: req.type,
          }

          // Create rejectedMsg
          const rejectedMsg = {
            status: 'unread',
            message:
              'Your manager request to join ' +
              req.eventName +
              '(' +
              req.tournamentName +
              ')' +
              ' has been rejected. Kindly contact the organizer for more information.',
          }

          // Delete req from managerReq (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              managerReq: firebase.firestore.FieldValue.arrayRemove(
                deletedManagerReq
              ),
            })

          // Send notification to notificationsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(req.managerID)
            .update({
              notificationsMgr: firebase.firestore.FieldValue.arrayUnion(
                rejectedMsg
              ),
            })

          // Delete list of request (TournamentID)
          await this.$fire.firestore
            .collection('events')
            .doc(req.eventID)
            .collection('tournaments')
            .doc(req.tournamentID)
            .get()
            .then((doc) => {
              const currentRequestListMgrTemp = doc.data().requestListMgr

              // Get current list of request
              const currentRequestListMgrFiltered = currentRequestListMgrTemp.find(
                (element) =>
                  element.managerID === req.managerID &&
                  element.tournamentID === req.tournamentID
              )

              // Create current list of request
              const currentRequestListMgr = {
                managerID: currentRequestListMgrFiltered.managerID,
                eventID: currentRequestListMgrFiltered.eventID,
                tournamentID: currentRequestListMgrFiltered.tournamentID,
                status: currentRequestListMgrFiltered.status,
              }

              // Delete current list of request
              this.$fire.firestore
                .collection('events')
                .doc(req.eventID)
                .collection('tournaments')
                .doc(req.tournamentID)
                .update({
                  requestListMgr: firebase.firestore.FieldValue.arrayRemove(
                    currentRequestListMgr
                  ),
                })
            })
            .then(() => {
              this.$store.commit('SET_NOTIFICATION', {
                alert:
                  'You have rejected manager invitation from ' +
                  req.eventName +
                  '(' +
                  req.tournamentName +
                  ')',
                alertIcon: 'mdi-alert-circle',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'red darken-1',
                snackbar: true,
              })
            })
        }
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

    // To Sign Out Account
    async logout() {
      try {
        await this.$fire.auth.signOut()
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

<style scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .nav-padding {
    padding: 0px 15px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .nav-padding {
    padding: 0px 50px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .nav-padding {
    padding: 0px 100px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .nav-padding {
    padding: 0px 220px;
  }
}
</style>
