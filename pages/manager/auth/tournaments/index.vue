<template>
  <v-main
    style="min-height: 600px"
    class="mx-md-10 mx-lg-15 px-lg-15 mx-xl-0 px-xl-0 py-0 mb-10"
  >
    <v-container class="p-0" fluid>
      <div class="mx-xl-15 px-xl-15">
        <div class="mx-xl-15 px-xl-15">
          <!-- Tournament Title -->
          <v-row>
            <v-col cols="5">
              <h1 class="text-h4 font-weight-bold mt-6 mb-3">My Tournaments</h1>
            </v-col>
            <v-col></v-col>
            <v-col cols="3" class="d-flex flex-row-reverse">
              <v-btn
                v-show="tournamentsMgr != ''"
                class="font-weight-regular mt-6 text-capitalize"
                dark
                depressed
                color="#6b46c1"
                to="/manager/auth/browseTournaments"
              >
                Join Tournament
              </v-btn>
            </v-col>
          </v-row>

          <!-- Tournaments Create -->
          <v-row v-if="tournamentsMgr == null || tournamentsMgr == ''">
            <v-col>
              <v-card class="mx-auto" outlined>
                <v-row class="p-15">
                  <v-col cols="12" md="7" lg="8">
                    <div class="px-5">
                      <h1 class="text-subtitle-1 font-weight-bold mb-8">
                        Tournaments
                      </h1>
                      <h1 class="text-h4 font-weight-medium mb-2">
                        A single competition
                      </h1>
                      <h1 class="text-subtitle-1 font-weight-regular mb-5">
                        Discover all the events for your team to participate
                        in. For private tournament, kindly contact your
                        organizer to be invited.
                      </h1>
                      <v-btn
                        class="font-weight-regular mb-4 text-capitalize"
                        dark
                        depressed
                        color="#6b46c1"
                        to="/manager/auth/browseTournaments"
                      >
                        Browse Tournaments
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="d-none d-md-flex align-center">
                    <div class="px-5 py-md-0 py-lg-0">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fbrowse-tournament.svg?alt=media&token=812c33ef-7d07-472c-8ea3-82938f9c0142"
                        width="220px"
                        alt="..."
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- Tournaments Listing -->
          <v-row
            v-else
            v-for="(tournament, index) in tournamentsMgr"
            :key="index"
            class="mb-n2"
          >
            <v-col>
              <nuxt-link
                :to="`/manager/auth/tournaments/${tournament.tournamentID}/overview`"
                class="text-decoration-none card"
              >
                <v-card class="py-5" outlined tile>
                  <v-row class="mx-5">
                    <v-col cols="8" class="d-flex align-center">
                      <!-- Picture -->
                      <v-avatar class="mr-8" size="50" rounded>
                        <img :src="tournament.photoURL" alt="..." />
                      </v-avatar>

                      <!-- Title -->
                      <h1 class="text-body-1 font-weight-bold">
                        {{ tournament.title }}
                        <br />
                        <span class="text-caption">{{
                          tournament.sportType
                        }}</span>
                      </h1>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end align-center">
                      <v-chip class="ma-2" color="green" small label outlined>
                        {{ tournament.participants }} Teams
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card>
              </nuxt-link>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import firebase from 'firebase'

export default {
  layout: 'manager',

  data() {
    return {
      // Input Data
      title: '',
      sportType: '',
      participants: '',
      tournamentsMgr: [],

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
            if (doc.exists) {
              this.tournamentsMgrTemp = []
              doc.data().tournamentsMgr.forEach((docref) => {
                this.$fire.firestore
                  .collection('tournaments')
                  .doc(docref)
                  .onSnapshot((doc) => {
                    this.tournamentsMgrTemp.push(doc.data())
                  })
              })
              this.tournamentsMgr = this.tournamentsMgrTemp
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },
}
</script>

<style scoped>
.card :hover {
  background-color: #eeeeee;
}
</style>
