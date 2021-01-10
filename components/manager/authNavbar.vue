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
      <NuxtLink to="/manager/auth/dashboard">
        <img
          class="mt-2 mr-8"
          src="~/static/img/logo-manager.svg"
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
          <v-icon v-if="organizerInv == null || organizerInv == ''" size="32"
            >mdi-account-supervisor</v-icon
          >

          <v-badge
            v-else
            color="primary"
            :content="organizerInv.length"
            overlap
          >
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

        <!-- Card if organizerInv list is empty -->
        <v-card
          v-if="organizerInv == null || organizerInv == ''"
          class="mx-3 px-5 my-4"
          color="white"
          outlined
        >
          <h1 class="text-caption font-weight-medium text-center">
            <i>No Invitation or Request</i>
          </h1>
        </v-card>

        <!-- Card if organizerInv list is not empty -->
        <v-card
          v-else
          v-for="(request, index) in organizerInv"
          :key="index"
          class="mx-3 px-5 my-4"
          outlined
        >
          <v-row class="d-flex align-center">
            <!-- Invitation if category is tournamentsRef -->
            <v-col
              v-if="
                request.type == 'managerInv' &&
                request.category == 'tournamentsMgr'
              "
              cols="9"
              class="d-block align-center"
            >
              <h1
                class="text-caption font-weight-regular text-justify text-grey"
              >
                You are <span class="font-weight-bold">invited</span> to
                participate in
                <span class="font-weight-bold"
                  >{{ request.tournamentName }}
                </span>
              </h1>
            </v-col>

            <!-- Invitation if category is eventsRef -->
            <v-col
              v-if="
                request.type == 'managerInv' && request.category == 'eventsMgr'
              "
              cols="9"
              class="d-block align-center"
            >
              <h1
                class="text-caption font-weight-regular text-justify text-grey"
              >
                You are <span class="font-weight-bold">invited</span> to
                participate in
                <span class="font-weight-bold"
                  >{{ request.eventName }} Event &mdash; Category:
                  {{ request.sportType }} ({{ request.gender }})
                </span>
              </h1>
            </v-col>

            <v-col v-if="request.type == 'managerInv'" cols="3">
              <v-btn
                @click="onAcceptInv(request, organizerInv)"
                color="green darken-1"
                width="60"
                x-small
                dark
                depressed
                >Accept</v-btn
              >
              <v-btn
                @click="onRejectInv(request, organizerInv)"
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
          @click="onChangeStatus(unreadNotificationMgr, notificationsMgr)"
          icon
          color="#1A202C"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            v-if="unreadNotificationMgr == null || unreadNotificationMgr == ''"
            >mdi-bell</v-icon
          >

          <v-badge
            v-else
            color="primary"
            :content="unreadNotificationMgr.length"
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
          v-if="notificationsMgr == null || notificationsMgr == ''"
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
          v-for="(notification, index) in notificationsMgr.slice().reverse()"
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

        <!-- Organizer Button -->
        <v-list-item @click="onSwitch()">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c"
              >mdi-view-dashboard-outline</v-icon
            >
            Organizer Dashboard</v-list-item-title
          >
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Tournament & Event Button -->
        <v-list-item v-for="list in lists" :key="list.name" :to="list.route">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-1 ml-0" size="24" color="#3c3c3c">{{
              list.icon
            }}</v-icon
            >{{ list.title }}</v-list-item-title
          >
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Settings Button -->
        <v-list-item to="/manager/auth/settings">
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
        {
          name: 'Browse Tournaments',
          route: '/manager/auth/browseTournaments',
        },
        { name: 'Browse Events', route: '/manager/auth/browseEvents' },
      ],
      lists: [
        {
          title: 'My Tournaments',
          route: '/manager/auth/tournaments',
          icon: 'mdi-tournament',
        },
        {
          title: 'My Events',
          route: '/manager/auth/events',
          icon: 'mdi-floor-plan',
        },
      ],
      // Input Data
      name: '',
      email: '',
      photoURL: '',
      notificationsMgr: '',
      unreadNotificationMgr: '',
      organizerInv: '',

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
            this.notificationsMgr = doc.data().notificationsMgr
            let organizerInv_sort = doc.data().organizerInv

            // Sort organizer invitation
            if (typeof organizerInv_sort != 'undefined') {
              this.organizerInv = organizerInv_sort.reverse()
            }

            // Filter unread notification manager
            const manager_unread_list = this.notificationsMgr

            if (
              typeof manager_unread_list != 'undefined' ||
              manager_unread_list != ''
            ) {
              const manager_unread = manager_unread_list.filter(
                (element) => element.status === 'unread'
              )
              this.unreadNotificationMgr = manager_unread
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Switch to Organizer Dashboard
    onSwitch() {
      this.$router.push('/organizer/auth/dashboard')

      this.$store.commit('SET_NOTIFICATION', {
        alert: 'Switching to Organizer Dashboard',
        alertIcon: 'mdi-account-tie',
        alertIconStyle: 'mr-2 align-self-top',
        colorIcon: 'primary',
        snackbar: true,
      })
    },

    // To change status of manager notifications
    async onChangeStatus(list, notifications) {
      try {
        // Change status of every unread list
        for (var i = 0; i < list.length; i++) {
          list[i].status = 'read'
        }

        await this.$fire.firestore.collection('users').doc(this.userId).update({
          notificationsMgr: notifications,
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

    // To Accept Organizer Invitation
    async onAcceptInv(inv, list) {
      try {
        if (inv.category == 'tournamentsMgr') {
          // Initialize deletedOrganizerInv object
          const deletedOrganizerInv = {
            category: inv.category,
            organizerID: inv.organizerID,
            tournamentID: inv.tournamentID,
            tournamentName: inv.tournamentName,
            type: inv.type,
          }

          // Create acceptedMsg
          const acceptedMsg = {
            status: 'unread',
            message:
              this.name +
              ' has accepted your manager invitation in ' +
              inv.tournamentName +
              '.',
          }

          // Add tournamentID to tournamentsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              tournamentsMgr: firebase.firestore.FieldValue.arrayUnion(
                inv.tournamentID
              ),
            })

          // Delete inv from organizerInv (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              organizerInv: firebase.firestore.FieldValue.arrayRemove(
                deletedOrganizerInv
              ),
            })

          // Send notification to notificationsRef (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(inv.organizerID)
            .update({
              notificationsRef: firebase.firestore.FieldValue.arrayUnion(
                acceptedMsg
              ),
            })

          // Update manager to tournament manager list (TournamentID)
          await this.$fire.firestore
            .collection('tournaments')
            .doc(inv.tournamentID)
            .get()
            .then((doc) => {
              const currentManagerRefTemp = doc.data().managerRef

              // Get current managerRef
              const currentManagerRefFiltered = currentManagerRefTemp.find(
                (element) => element.uid === this.userId
              )

              // Create current managerRef
              const currentManagerRef = {
                uid: currentManagerRefFiltered.uid,
                status: currentManagerRefFiltered.status,
              }

              // Create updated managerRef
              const updatedManagerRef = {
                uid: this.userId,
                status: 'active',
              }

              // Delete current managerRef
              this.$fire.firestore
                .collection('tournaments')
                .doc(inv.tournamentID)
                .update({
                  managerRef: firebase.firestore.FieldValue.arrayRemove(
                    currentManagerRef
                  ),
                })

              // Add updated managerRef
              this.$fire.firestore
                .collection('tournaments')
                .doc(inv.tournamentID)
                .update({
                  managerRef: firebase.firestore.FieldValue.arrayUnion(
                    updatedManagerRef
                  ),
                })
            })
            .then(() => {
              this.$router.push('/manager/auth/tournaments')
            })
        } else if (inv.category == 'eventsMgr') {
          // Initialize deletedOrganizerInv object
          const deletedOrganizerInv = {
            category: inv.category,
            eventID: inv.eventID,
            eventName: inv.eventName,
            gender: inv.gender,
            sportType: inv.sportType,
            organizerID: inv.organizerID,
            tournamentID: inv.tournamentID,
            type: inv.type,
          }

          // Create acceptedMsg
          const acceptedMsg = {
            status: 'unread',
            message:
              this.name +
              ' has accepted your manager invitation in ' +
              inv.eventName +
              ' (' +
              inv.sportType +
              ') event' +
              '.',
          }

          // Add tournamentID to eventsMgr (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              eventsMgr: firebase.firestore.FieldValue.arrayUnion({
                eventID: inv.eventID,
                tournamentID: inv.tournamentID,
              }),
            })

          // Delete inv from organizerInv (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              organizerInv: firebase.firestore.FieldValue.arrayRemove(
                deletedOrganizerInv
              ),
            })

          // Send notification to notificationsRef (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(inv.organizerID)
            .update({
              notificationsRef: firebase.firestore.FieldValue.arrayUnion(
                acceptedMsg
              ),
            })

          // Update manager to tournament manager list (eventID - TournamentID)
          await this.$fire.firestore
            .collection('events')
            .doc(inv.eventID)
            .collection('tournaments')
            .doc(inv.tournamentID)
            .get()
            .then((doc) => {
              const currentManagerRefTemp = doc.data().managerRef

              // Get current managerRef
              const currentManagerRefFiltered = currentManagerRefTemp.find(
                (element) => element.uid === this.userId
              )

              // Create current managerRef
              const currentManagerRef = {
                uid: currentManagerRefFiltered.uid,
                status: currentManagerRefFiltered.status,
              }

              // Create updated managerRef
              const updatedManagerRef = {
                uid: this.userId,
                status: 'active',
              }

              // Delete current managerRef
              this.$fire.firestore
                .collection('events')
                .doc(inv.eventID)
                .collection('tournaments')
                .doc(inv.tournamentID)
                .update({
                  managerRef: firebase.firestore.FieldValue.arrayRemove(
                    currentManagerRef
                  ),
                })

              // Add updated managerRef
              this.$fire.firestore
                .collection('events')
                .doc(inv.eventID)
                .collection('tournaments')
                .doc(inv.tournamentID)
                .update({
                  managerRef: firebase.firestore.FieldValue.arrayUnion(
                    updatedManagerRef
                  ),
                })
            })
            .then(() => {
              this.$router.push('/manager/auth/events')
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

    // To Reject Organizer Invitation
    async onRejectInv(inv, list) {
      try {
        if (inv.category == 'tournamentsMgr') {
          // Initialize deletedOrganizerInv object
          const deletedOrganizerInv = {
            organizerID: inv.organizerID,
            tournamentID: inv.tournamentID,
            tournamentName: inv.tournamentName,
            type: inv.type,
          }

          // Create rejectedMsg
          const rejectedMsg = {
            status: 'unread',
            message:
              this.name +
              ' has rejected your manager invitation in ' +
              inv.tournamentName +
              '.',
          }

          // Delete inv from organizerInv (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              organizerInv: firebase.firestore.FieldValue.arrayRemove(
                deletedOrganizerInv
              ),
            })

          // Send notification to notificationsRef (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(inv.organizerID)
            .update({
              notificationsRef: firebase.firestore.FieldValue.arrayUnion(
                rejectedMsg
              ),
            })

          // Delete manager pending to tournament manager list (TournamentID)
          await this.$fire.firestore
            .collection('tournaments')
            .doc(inv.tournamentID)
            .get()
            .then((doc) => {
              const currentManagerRefTemp = doc.data().managerRef

              // Get current managerRef
              const currentManagerRefFiltered = currentManagerRefTemp.find(
                (element) => element.uid === this.userId
              )

              // Create current managerRef
              const currentManagerRef = {
                uid: currentManagerRefFiltered.uid,
                status: currentManagerRefFiltered.status,
              }

              // Delete current managerRef
              this.$fire.firestore
                .collection('tournaments')
                .doc(inv.tournamentID)
                .update({
                  managerRef: firebase.firestore.FieldValue.arrayRemove(
                    currentManagerRef
                  ),
                })
            })
            .then(() => {
              this.$store.commit('SET_NOTIFICATION', {
                alert:
                  'You have rejected manager invitation from ' +
                  inv.tournamentName,
                alertIcon: 'mdi-alert-circle',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'red darken-1',
                snackbar: true,
              })
            })
        } else if (inv.category == 'eventsMgr') {
          // Initialize deletedOrganizerInv object
          const deletedOrganizerInv = {
            category: inv.category,
            eventID: inv.eventID,
            eventName: inv.eventName,
            gender: inv.gender,
            sportType: inv.sportType,
            organizerID: inv.organizerID,
            tournamentID: inv.tournamentID,
            type: inv.type,
          }

          // Create rejectedMsg
          const rejectedMsg = {
            status: 'unread',
            message:
              this.name +
              ' has rejected your manager invitation in ' +
              inv.eventName +
              ' (' +
              inv.sportType +
              ') event' +
              '.',
          }

          // Delete inv from organizerInv (ManagerID)
          await this.$fire.firestore
            .collection('users')
            .doc(this.userId)
            .update({
              organizerInv: firebase.firestore.FieldValue.arrayRemove(
                deletedOrganizerInv
              ),
            })

          // Send notification to notificationsRef (OrganizerID)
          await this.$fire.firestore
            .collection('users')
            .doc(inv.organizerID)
            .update({
              notificationsRef: firebase.firestore.FieldValue.arrayUnion(
                rejectedMsg
              ),
            })

          // Delete manager pending to tournament manager list (TournamentID)
          await this.$fire.firestore
            .collection('events')
            .doc(inv.eventID)
            .collection('tournaments')
            .doc(inv.tournamentID)
            .get()
            .then((doc) => {
              const currentManagerRefTemp = doc.data().managerRef

              // Get current managerRef
              const currentManagerRefFiltered = currentManagerRefTemp.find(
                (element) => element.uid === this.userId
              )

              // Create current managerRef
              const currentManagerRef = {
                uid: currentManagerRefFiltered.uid,
                status: currentManagerRefFiltered.status,
              }

              // Delete current managerRef
              this.$fire.firestore
                .collection('events')
                .doc(inv.eventID)
                .collection('tournaments')
                .doc(inv.tournamentID)
                .update({
                  managerRef: firebase.firestore.FieldValue.arrayRemove(
                    currentManagerRef
                  ),
                })
            })
            .then(() => {
              this.$store.commit('SET_NOTIFICATION', {
                alert:
                  'You have rejected manager invitation from ' +
                  inv.tournamentName,
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
        await this.$fire.auth.signOut().then(() => {
          this.$router.push('/')
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
