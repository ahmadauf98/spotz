<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined tile>
        <!-- Header Picture -->
        <v-img :src="tournamentRef.headerURL" height="300px"> </v-img>

        <v-row class="px-10 d-sm-block d-md-flex">
          <v-col cols="12" class="d-sm-block d-md-flex">
            <!-- Profile Picture -->
            <div class="mr-5 mt-n7">
              <v-avatar class="mt-n15" size="150" rounded>
                <img :src="tournamentRef.photoURL" alt="..." />
              </v-avatar>
            </div>

            <v-row class="mx-1 mt-4 d-block">
              <v-row class="d-flex align-center mt-n6">
                <!-- Title -->
                <v-col cols="8" md="7" xl="9">
                  <h1 class="text-h4 font-weight-bold mb-n3">
                    {{ tournamentRef.title }}
                  </h1>
                </v-col>

                <!-- Hostname -->
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
                      v-show="tournamentRef.isOpen == true"
                      :disabled="
                        managerlength_active == tournamentRef.participants ||
                        tournamentRef.isGroupDraw == true
                      "
                      color="primary"
                      depressed
                    >
                      <v-icon size="20" class="mr-1"
                        >mdi-account-plus-outline</v-icon
                      >
                      Register
                    </v-btn>

                    <v-btn
                      class="font-weight-regular text-capitalize"
                      v-else
                      v-show="tournamentRef.isOpen == true"
                      :disabled="
                        managerlength_active == tournamentRef.participants ||
                        tournamentRef.isGroupDraw == true
                      "
                      :to="`signin`"
                      color="green darken-1"
                      dark
                      depressed
                    >
                      Login to Register
                    </v-btn>

                    <v-btn
                      class="font-weight-regular text-capitalize"
                      v-show="tournamentRef.isOpen == false"
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
                    class="text-subtitle-2 text-justify font-weight-regular mt-n3 mt-md-0 mt-lg-n3"
                  >
                    {{ tournamentRef.description }}
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

                <!-- Date -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-calendar</v-icon>
                  {{ startDate }} &rharu; {{ endDate }}
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'

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
      tournamentRef: '',
      hostnameProf: '',
      startDate: '',
      endDate: '',
      managerlength_active: null,
      authStatus: false,
    }
  },

  mounted() {
    // Fetch User's Data
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()

        // Initialize Date Data into Moment
        var startDateFormat = moment(doc.data().startDate, 'YYYY-MM-DD')
        var endDateFormat = moment(doc.data().endDate, 'YYYY-MM-DD')

        // Formating Date (YYYY-MM-DD) to (DD MMMM YYYY)
        this.startDate = startDateFormat.format('DD MMMM YYYY')
        this.endDate = endDateFormat.format('DD MMMM YYYY')

        this.$fire.firestore
          .collection('users')
          .doc(doc.data().hostName)
          .onSnapshot((docRef) => {
            this.hostnameProf = docRef.data()
          })

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
  },
}
</script>
