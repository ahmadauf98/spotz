<template>
  <v-app>
    <v-main class="mx-8 mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <div class="nav-mx mb-5">
        <!-- Title -->
        <h1 class="text-h4 font-weight-black mb-4 mb-md-2 mt-6">Tournaments</h1>

        <v-row class="d-flex mb-n4">
          <v-col cols="12" lg="5" class="mb-n1 mb-lg-0">
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
                    <strong>Tournament</strong>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item
                  :to="`browseTournaments/${item.tournamentID}/participants`"
                >
                  <!-- Photo Avatar -->
                  <v-list-item-avatar>
                    <v-img :src="item.photoURL"></v-img>
                  </v-list-item-avatar>

                  <!-- Title & SportType -->
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="item.sportType"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12" lg="2" class="ml-auto mb-n8 mb-lg-0">
            <v-select
              :items="sports"
              :value="sportType"
              v-model="sportType"
              @change="onGetFilter"
              label="Sports"
              dense
              outlined
            ></v-select>
          </v-col>

          <v-col cols="12" lg="2">
            <v-select
              :items="genderList"
              :value="genderType"
              v-model="genderType"
              @change="onGetFilter"
              label="Gender"
              dense
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <!-- Tournament Part -->
        <v-card class="mx-auto" color="white " tile outlined>
          <v-row>
            <v-col
              v-for="(tournament, index) in tournamentsRef"
              v-show="tournament.status == true"
              :key="index"
              cols="6"
              lg="4"
            >
              <v-card class="mx-auto" outlined>
                <!-- Header Picture -->
                <v-img :src="tournament.headerURL" height="150px"> </v-img>

                <div class="pa-3">
                  <!-- Profile Picture -->

                  <div class="d-flex align-center">
                    <v-avatar class="mr-3" size="40">
                      <img :src="tournament.photoURL" alt="..." />
                    </v-avatar>

                    <h1 class="text-subtitle-2 font-weight-bold">
                      {{ tournament.title }}
                    </h1>
                  </div>

                  <h1 class="mt-5 text-body-2 text-grey d-flex align-center">
                    <v-icon class="mr-2" color="grey darken-1" size="20">
                      mdi-family-tree
                    </v-icon>
                    {{ tournament.sportType }}
                  </h1>

                  <h1 class="mt-3 text-body-2 text-grey d-flex align-center">
                    <v-icon class="mr-2" color="grey darken-1" size="20">
                      mdi-account-group
                    </v-icon>
                    {{ tournament.participants }} Participants
                  </h1>

                  <h1
                    class="mt-3 text-body-2 text-capitalize text-grey d-flex align-center"
                  >
                    <v-icon class="mr-2" color="grey darken-1" size="20">
                      mdi-gender-male-female
                    </v-icon>
                    {{ tournament.gender }}
                  </h1>

                  <h1 class="mt-3 text-body-2 text-grey d-flex align-center">
                    <v-icon class="mr-2" color="grey darken-1" size="20">
                      mdi-calendar
                    </v-icon>
                    {{ tournament.startDate }} &mdash; {{ tournament.endDate }}
                  </h1>

                  <v-btn
                    :to="`browseTournaments/${tournament.tournamentID}/participants`"
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
          v-show="tournamentsRef == ''"
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
            There are no {{ sportType }} tournaments found.
          </h1>
        </v-card>

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
      </div>
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'homepage',

  middleware: 'autologout',

  data() {
    return {
      // Selection Data
      sports: [
        'All',
        'Football',
        'Netball',
        'Handball',
        'Futsal',
        'Basketball',
      ],
      genderList: ['All', 'Male', 'Female'],

      // Tournaments Data
      tournamentsRef: [],
      tournamentsTrans: [],
      sportType: 'All',
      genderType: 'All',
      startDate: '',
      endDate: '',

      // Search Data
      isLoading: false,
      items: [],
      search: null,

      // Refresh Overlay
      opacityLoading: 1,
      overlayLoading: false,
    }
  },

  mounted() {
    this.$fire.firestore
      .collection('tournaments')
      .where('status', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tournamentsRef.push(doc.data())

          this.$fire.firestore
            .collection('users')
            .doc(doc.data().hostName)
            .onSnapshot((docRef) => {
              this.hostnameProf = docRef.data()
            })
        })
      })
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      this.isLoading = true

      this.$fire.firestore
        .collection('tournaments')
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

  methods: {
    onGetFilter() {
      this.overlayLoading = true
      if (this.sportType === 'All' && this.genderType === 'All') {
        this.tournamentsTrans = []
        this.$fire.firestore
          .collection('tournaments')
          .where('status', '==', true)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.tournamentsTrans.push(doc.data())
            })
            this.tournamentsRef = this.tournamentsTrans
          })
          .then(() => {
            this.overlayLoading = false
          })
      } else if (this.sportType === 'All' && this.genderType !== 'All') {
        this.tournamentsTrans = []
        this.$fire.firestore
          .collection('tournaments')
          .where('status', '==', true)
          .where('gender', '==', this.genderType)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.tournamentsTrans.push(doc.data())
            })
            this.tournamentsRef = this.tournamentsTrans
          })
          .then(() => {
            this.overlayLoading = false
          })
      } else if (this.sportType !== 'All' && this.genderType === 'All') {
        this.tournamentsTrans = []
        this.$fire.firestore
          .collection('tournaments')
          .where('status', '==', true)
          .where('sportType', '==', this.sportType)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.tournamentsTrans.push(doc.data())
            })
            this.tournamentsRef = this.tournamentsTrans
          })
          .then(() => {
            this.overlayLoading = false
          })
      } else {
        this.tournamentsTrans = []
        this.$fire.firestore
          .collection('tournaments')
          .where('status', '==', true)
          .where('gender', '==', this.genderType)
          .where('sportType', '==', this.sportType)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.tournamentsTrans.push(doc.data())
            })
            this.tournamentsRef = this.tournamentsTrans
          })
          .then(() => {
            this.overlayLoading = false
          })
      }
    },
  },
}
</script>

<style scoped>
/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .nav-mx {
    margin: 0px 50px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .nav-mx {
    margin: 0px 190px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .nav-mx {
    margin: 0px 220px;
  }
}
</style>
