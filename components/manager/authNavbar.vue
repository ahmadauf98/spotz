<template>
  <!-- Navigation Bar -->
  <v-app-bar
    class="d-none d-sm-inline px-2 px-md-15"
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
    <div class="d-none d-md-inline" v-for="nav in navigation" :key="nav.name">
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

    <!-- Notification Dropdown -->
    <v-menu offset-y left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="text-capitalize"
          icon
          color="#1A202C"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon v-if="notificationsMgr == null || notificationsMgr == ''"
            >mdi-bell</v-icon
          >

          <v-badge
            v-else
            color="primary"
            :content="notificationsMgr.length"
            overlap
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list dense width="400px" max-height="500px">
        <!-- Notifications Header-->
        <v-list-item>
          <v-list-item-title class="text-body-2 text-center"
            >Notifications</v-list-item-title
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
          v-for="notification in notificationsMgr"
          :key="notification.tournamentID"
          class="mx-3 px-5 my-4"
          outlined
        >
          <v-row>
            <v-col cols="9" class="d-flex align-center">
              <h1 class="text-caption font-weight-medium">
                {{ notification.messages }}
              </h1>
            </v-col>

            <v-col cols="3" v-if="notification.isAction == false">
              <v-btn
                @click="
                  onRemove(
                    notification.tournamentID,
                    notification.messages,
                    notification.isAction
                  )
                "
                color="yellow darken-2"
                width="60"
                class="text-capitalize"
                x-small
                dark
                >Close</v-btn
              >
            </v-col>

            <v-col v-else cols="3">
              <v-btn
                @click="
                  onAccept(
                    notification.tournamentID,
                    notification.messages,
                    notification.isAction
                  )
                "
                color="green darken-1"
                width="60"
                class="text-capitalize"
                x-small
                dark
                >Accept</v-btn
              >
              <v-btn
                @click="
                  onReject(
                    notification.tournamentID,
                    notification.messages,
                    notification.isAction
                  )
                "
                color="red darken-1"
                class="text-capitalize"
                width="60"
                x-small
                dark
                >Reject</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-list>
    </v-menu>

    <!-- Username Dropdown -->
    <v-menu offset-y left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="py-6 mx-1" text color="#1A202C" v-bind="attrs" v-on="on">
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

        <!-- Tournament & Event Button -->
        <v-list-item v-for="list in lists" :key="list.name" :to="list.route">
          <v-list-item-title> {{ list.title }}</v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Settings Button -->
        <v-list-item to="/manager/auth/settings">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>

        <!-- Organizer Button -->
        <v-list-item to="/organizer/auth/dashboard">
          <v-list-item-title>Spotz Organizer</v-list-item-title>
        </v-list-item>

        <v-divider class="mx-3"></v-divider>

        <!-- Logout Button -->
        <v-list-item @click.prevent="logout">
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  middleware: 'authenticated',

  data() {
    return {
      navigation: [
        { name: 'Tournaments', route: '/manager/auth/browseTournaments' },
        { name: 'Events', route: '/manager/auth/browseEvents' },
      ],
      lists: [
        { title: 'My Tournaments', route: '/manager/auth/tournaments' },
        { title: 'My Events', route: '/manager/auth/events' },
      ],
      // Input Data
      name: '',
      email: '',
      photoURL: '',
      notificationsMgr: '',

      // User Authentication
      userId: '',
    }
  },

  created() {
    this.userId = this.$fire.auth.currentUser.uid
    return this.$fire.firestore
      .collection('users')
      .doc(this.userId)
      .onSnapshot((doc) => {
        this.name = doc.data().name
        this.email = doc.data().email
        this.photoURL = doc.data().photoURL
        this.notificationsMgr = doc.data().notificationsMgr
      })
  },

  methods: {
    async onAccept(tournamentID, message, isAction) {
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(this.userId)
          .update({
            tournamentsMgr: firebase.firestore.FieldValue.arrayUnion(
              tournamentID
            ),
            notificationsMgr: firebase.firestore.FieldValue.arrayRemove({
              messages: message,
              tournamentID: tournamentID,
              isAction: isAction,
            }),
          })
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayRemove({
                  uid: this.userId,
                  status: 'pending',
                }),
              })
          )
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayUnion({
                  uid: this.userId,
                  status: 'active',
                }),
              })
          )
          .then(
            await this.$fire.firestore
              .collection('users')
              .doc(this.hostName)
              .update({
                notificationsRef: firebase.firestore.FieldValue.arrayUnion({
                  messages: this.name + ' has accepted your invitation.',
                  isAction: false,
                }),
              })
          )
          .then(() => {
            this.$router.push('/tournaments')
          })
        // Route to my tournament
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

    async onReject(tournamentID, message, isAction) {
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(this.userId)
          .update({
            notificationsMgr: firebase.firestore.FieldValue.arrayRemove({
              messages: message,
              tournamentID: tournamentID,
              isAction: isAction,
            }),
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

    async onRemove(tournamentID, message, isAction) {
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(this.userId)
          .update({
            notificationsMgr: firebase.firestore.FieldValue.arrayRemove({
              messages: message,
              tournamentID: tournamentID,
              isAction: isAction,
            }),
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
