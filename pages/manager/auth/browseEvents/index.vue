<template>
  <v-main
    style="min-height: 600px"
    class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0 mb-10"
  >
    <v-container class="p-0 my-0" fluid>
      <!-- Title -->
      <h1 class="text-h4 font-weight-black mb-4 mb-md-2 mt-6">Events</h1>

      <v-row class="d-flex mb-2">
        <v-col cols="12" lg="5">
          <v-autocomplete
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            append-icon="mdi-magnify"
            item-text="title"
            label="Search"
            clearable
            hide-details
            hide-selected
            dense
            outlined
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Search for your
                  <strong>Event</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item :to="`browseEvents/${item.eventID}/overview`">
                <!-- Photo Avatar -->
                <v-list-item-avatar>
                  <v-img :src="item.photoURL"></v-img>
                </v-list-item-avatar>

                <!-- Title & Email -->
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.email"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>

      <!-- Event Part -->
      <v-card class="mx-auto" color="white " tile outlined>
        <v-row>
          <v-col
            v-for="(event, index) in eventsRef"
            v-show="event.status == true"
            :key="index"
            cols="6"
            lg="4"
          >
            <v-card class="mx-auto" outlined>
              <!-- Header Picture -->
              <v-img :src="event.headerURL" height="150px"></v-img>

              <div class="pa-3">
                <!-- Profile Picture -->

                <div class="d-flex align-center">
                  <v-avatar class="mr-3" size="40">
                    <img :src="event.photoURL" alt="..." />
                  </v-avatar>

                  <h1 class="text-subtitle-2 font-weight-bold">
                    {{ event.title }}
                  </h1>
                </div>

                <h1 class="mt-5 text-body-2 text-grey d-flex align-center">
                  <v-icon class="mr-2" color="grey darken-1" size="20">
                    mdi-family-tree
                  </v-icon>
                  {{ event.tournamentRef.length }} Tournament(s)
                </h1>

                <h1 class="mt-3 text-body-2 text-grey d-flex align-center">
                  <v-icon class="mr-2" color="grey darken-1" size="20">
                    mdi-map-marker
                  </v-icon>
                  {{ event.location }}
                </h1>

                <h1 class="mt-3 text-body-2 text-grey d-flex align-center">
                  <v-icon class="mr-2" color="grey darken-1" size="20">
                    mdi-email
                  </v-icon>
                  {{ event.email }}
                </h1>

                <h1 class="mt-3 text-body-2 text-grey d-flex align-center">
                  <v-icon class="mr-2" color="grey darken-1" size="20">
                    mdi-calendar
                  </v-icon>
                  {{ event.startDate }} &mdash; {{ event.endDate }}
                </h1>

                <v-btn
                  :to="`browseEvents/${event.eventID}/overview`"
                  class="mt-5"
                  color="primary"
                  block
                  depressed
                  >View</v-btn
                >
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-card
        v-show="eventsRef == ''"
        class="mx-auto py-15"
        color="white "
        tile
        outlined
      >
        <div class="d-flex justify-center mb-3">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fbrowse-not-found.svg?alt=media&token=cd2b3754-f754-4a79-bbef-67468ae2884c"
            alt="..."
            width="300px"
          />
        </div>
        <h1 class="text-h6 text-center text-grey">
          There are no events found.
        </h1>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import firebase from 'firebase'

export default {
  layout: 'manager',

  data() {
    return {
      // Events Data
      eventsRef: [],

      // Search Data
      isLoading: false,
      items: [],
      search: null,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$fire.firestore
          .collection('events')
          .where('status', '==', true)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.eventsRef.push(doc.data())

              this.$fire.firestore
                .collection('users')
                .doc(doc.data().hostName)
                .onSnapshot((docRef) => {
                  this.hostnameRef = docRef.data()
                })
            })
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true

      this.$fire.firestore
        .collection('events')
        .where('status', '==', true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.items.push(doc.data())
          })
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
