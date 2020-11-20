<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <v-snackbar
          v-show="notification.alert != '' || notification.alert != null"
          v-model="notification.snackbar"
          :timeout="notification.timeout"
          dark
          top
        >
          <div class="d-flex justify-center align-center">
            <v-icon
              :class="notification.alertIconStyle"
              :color="notification.colorIcon"
              >{{ notification.alertIcon }}</v-icon
            >
            {{ notification.alert }}
          </div>
        </v-snackbar>

        <!-- Organization Details Part -->
        <tournamentHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <!-- No Official List -->
            <v-card
              v-if="officialList == ''"
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9"
              outlined
              tile
            >
              <div class="d-flex">
                <h1 class="text-h6 font-weight-bold mb-1">
                  List of Official Team
                </h1>
              </div>

              <v-row class="mb-n5 d-flex align-center">
                <v-col cols="12" md="8" order="2" order-md="1">
                  <div>
                    <h1
                      class="text-subtitle-1 font-weight-regular text-center text-md-left mb-5"
                    >
                      Currently there is no official team yet. Kindly go to the
                      approval team registration page to approve or reject team.
                      Once team being approved, that particular team will be
                      displayed here.
                    </h1>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="d-flex justify-center align-top"
                  order="1"
                  order-md="2"
                >
                  <div class="px-5 mt-md-n8 mt-lg-n3 mt-xl-n6">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmanagers-tournament.svg?alt=media&token=ec47c873-a84d-4353-b823-e0fe7bff619b"
                      width="220px"
                      alt="..."
                    />
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <!-- Official List -->
            <v-card
              v-else
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9"
              outlined
              tile
            >
              <h1 class="text-subtitle-1 font-weight-bold mb-1">
                List of Official Team
              </h1>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Team Name</th>
                      <th class="text-center">Manager Name</th>
                      <th class="text-center">Manager Email</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="list in officialList"
                      :key="list.uid"
                      class="text-center"
                    >
                      <td class="text-left">{{ list.teamName }}</td>
                      <td>{{ list.managerName }}</td>
                      <td>{{ list.managerEmail }}</td>
                      <td>
                        <v-btn
                          @click="onView(list)"
                          class="text-capitalize"
                          color="primary"
                          small
                          depressed
                        >
                          View
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentBtn />
          </v-col>
        </v-row>

        <!-- View Player Overlay -->
        <v-overlay :opacity="opacity" :value="viewPlayerOverlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center overflow"
            max-height="470"
            width="700"
            color="white"
            light
            outlined
          >
            <div>
              <v-btn
                @click="viewPlayerOverlay = false"
                class="mt-n3 ml-n8"
                icon
              >
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </div>

            <div v-for="list in selectedTeam" :key="list.identificationID">
              <div class="d-flex justify-center">
                <v-avatar
                  v-show="list.passportPhoto != ''"
                  class="profile"
                  color="grey"
                  size="114"
                >
                  <v-img :src="list.passportPhoto"></v-img>
                </v-avatar>
              </div>

              <div v-show="list.name != ''" class="d-flex justify-center mt-4">
                <h1 class="text-h4 font-weight-light">{{ list.name }}</h1>
              </div>

              <div
                v-show="list.identificationID != ''"
                class="d-flex justify-center"
              >
                <h1 class="text-h6 font-weight-light text-grey">
                  {{ list.identificationID }}
                </h1>
              </div>

              <div class="d-flex justify-center mt-4">
                <div v-show="list.gender != ''" class="text-center mx-5">
                  <h1 class="text-h6 font-weight-light text-grey">Gender</h1>
                  <h1 class="text-body-1 mt-n1">{{ list.gender }}</h1>
                </div>

                <div v-show="list.numAthelete != ''" class="text-center mx-5">
                  <h1 class="text-h6 font-weight-light text-grey">
                    Athelete ID
                  </h1>
                  <h1 class="text-body-1 mt-n1">{{ list.numAthelete }}</h1>
                </div>

                <div v-show="list.numMatric != ''" class="text-center mx-5">
                  <h1 class="text-h6 font-weight-light text-grey">Matric ID</h1>
                  <h1 class="text-body-1 mt-n1">{{ list.numMatric }}</h1>
                </div>
              </div>

              <div
                v-show="list.address != ''"
                class="d-flex justify-center mt-4"
              >
                <h1 class="text-h6 font-weight-light text-grey text-center">
                  {{ list.address }}
                </h1>
              </div>

              <div class="d-flex justify-center mt-3">
                <v-chip
                  v-show="list.phoneNumber != ''"
                  class="ma-2"
                  color="primary"
                >
                  {{ list.phoneNumber }}
                </v-chip>
              </div>

              <v-divider class="mt-5 mb-7"></v-divider>
            </div>
          </v-card>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import tournamentHeader from '~/components/manager/tournamentHeader'
import tournamentBtn from '~/components/manager/tournamentBtn'

export default {
  middleware: 'authenticated',

  layout: 'manager',

  components: {
    tournamentHeader,
    tournamentBtn,
  },

  data() {
    return {
      // User Input Data
      tempList: [],
      officialList: '',
      selectedTeam: '',

      // Overlay Data
      opacity: 0.5,
      viewPlayerOverlay: false,
    }
  },

  // Fetch Notification Data from Vuex
  computed: { ...mapState(['notification']) },

  // Fetch Data from Firestore
  mounted() {
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .collection('team-registration')
      .where('status', '==', 'approved')
      .onSnapshot((querySnapshot) => {
        this.tempList = []
        querySnapshot.forEach((doc) => {
          this.$fire.firestore
            .collection('users')
            .doc(doc.data().uid)
            .onSnapshot((udoc) => {
              this.tempList.push({
                listplayers: doc.data().listPlayers,
                teamName: doc.data().teamName,
                uid: doc.data().uid,
                managerName: udoc.data().name,
                managerEmail: udoc.data().email,
              })
            })
        })
        this.officialList = this.tempList
      })
  },

  methods: {
    // View Application
    onView(data) {
      this.viewPlayerOverlay = true
      this.selectedTeam = data.listplayers
    },
  },
}
</script>
