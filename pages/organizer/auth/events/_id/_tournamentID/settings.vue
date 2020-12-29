<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventTourHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
              <!-- Basic Details -->
              <div class="px-15">
                <h1 class="text-subtitle-1 font-weight-bold mb-1">
                  Basic Details
                </h1>

                <v-row class="d-block">
                  <!-- Gender Selection -->
                  <v-col cols="12" class="mb-n6">
                    <v-select
                      :items="genderList"
                      :value="genderList"
                      v-model="gender"
                      label="Gender"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                </v-row>
              </div>

              <!--  -->
              <v-card-actions class="mx-13 d-flex">
                <v-btn
                  @click="onUpdate"
                  color="primary"
                  class="ml-auto px-10 font-weight-regular text-capitalize"
                  depressed
                  dark
                >
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
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
      //Selection Data
      genderList: ['Male', 'Female'],

      // User Input Data
      gender: null,

      // Calendar
      menuStart: false,
      menuEnd: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Get data from tournaments
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            this.gender = doc.data().gender
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    async onUpdate() {
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .update({
            gender: this.gender,
          })
          .then(() => {
            console.log('Database successfully updated.')
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'All your information has been updated.',
              alertIcon: 'mdi-cloud-check',
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
