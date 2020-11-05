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
      <NuxtLink to="/manager/dashboard">
        <img
          class="mt-2 mr-8"
          src="~/static/img/logo.svg"
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

    <!-- Temporary Search Bar -->
    <div
      class="v-responsive mr-auto mr-md-4 d-none d-md-inline"
      style="max-width: 450px"
    >
      <div class="v-responsive__content">
        <div
          class="v-input v-input--hide-details v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--solo-flat v-text-field--is-booted v-text-field--enclosed v-text-field--rounded"
        >
          <div class="v-input__control">
            <div class="v-input__slot grey lighten-3">
              <div class="v-input__prepend-inner">
                <div class="v-input__icon v-input__icon--prepend-inner">
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate mdi mdi-magnify theme--light"
                  ></i>
                </div>
              </div>
              <div class="v-text-field__slot">
                <label
                  class="v-label theme--light"
                  style="left: 0px; right: auto; position: absolute"
                  >Search</label
                ><input
                  id="doc-search"
                  type="text"
                  class="ds-input"
                  autocomplete="off"
                  spellcheck="false"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  aria-label="search input"
                  aria-owns="algolia-autocomplete-listbox-0"
                  dir="auto"
                  style=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Temporary Search Bar -->

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

            <v-col cols="3">
              <v-btn color="green darken-1" width="60" x-small dark
                >Accept</v-btn
              >
              <v-btn color="red darken-1" width="60" x-small dark>Reject</v-btn>
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
        <v-list-item to="/settings">
          <v-list-item-title>Settings</v-list-item-title>
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
  data() {
    return {
      navigation: [
        { name: 'Tournaments', route: '/browseTournaments' },
        { name: 'Events', route: '/browseEvents' },
      ],
      lists: [
        { title: 'My Tournaments', route: '/tournaments' },
        { title: 'My Events', route: '/events' },
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
    this.userId = firebase.auth().currentUser.uid

    return firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .onSnapshot((doc) => {
        this.name = doc.data().name
        this.email = doc.data().email
        this.photoURL = doc.data().photoURL
        this.notificationsMgr = doc.data().notificationsMgr

        console.log(this.notificationsMgr)
      })
  },

  methods: {
    async logout() {
      try {
        await firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push('/')
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
