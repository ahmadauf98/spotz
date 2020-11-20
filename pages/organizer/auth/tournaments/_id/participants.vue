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
                        <v-btn @click="updateTeam(list)" icon>
                          <v-icon>mdi-square-edit-outline</v-icon>
                        </v-btn>
                        <v-btn @click="deleteTeam(list)" icon>
                          <v-icon>mdi-delete</v-icon>
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

        <!-- Delete Team Overlay -->
        <v-overlay :opacity="opacity" :value="deleteTeamOverlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="deleteTeamOverlay = false" class="mt-n3 ml-n8" icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <!-- Title -->
            <div class="text-center">
              <v-icon class="mb-3" color="grey darken-1" size="60"
                >mdi-delete</v-icon
              >
              <h1 class="text-center text-h5 font-weight-medium">
                Are you absolutely sure? <br />
                <span class="text-h6 font-weight-regular text-grey"
                  >This action cannot be undone.</span
                >
              </h1>
            </div>

            <div class="d-flex justify-center mt-5 mb-n8">
              <v-btn
                @click="deleteTeamOverlay = false"
                class="px-10 mx-3 text-capitalize"
                color="green darken-1"
                height="40"
                depressed
                dark
              >
                Cancel</v-btn
              >
              <v-btn
                @click="onDeleteTeam(selectedTeam)"
                class="px-10 mx-3 text-capitalize"
                color="red darken-1"
                height="40"
                depressed
                dark
              >
                Delete</v-btn
              >
            </div>
          </v-card>
        </v-overlay>

        <!-- Update Team Name Overlay -->
        <v-overlay :opacity="opacity" :value="updateTeamOverlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="200"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="updateTeamOverlay = false" class="mt-n3 ml-n8" icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>

            <div class="d-flex align-center">
              <v-card-text>
                <v-text-field
                  class="mr-5 mt-6"
                  v-model="teamName"
                  color="primary"
                  placeholder="New Team Name"
                  prepend-icon="mdi-account-group"
                  outlined
                  dense
                ></v-text-field>
              </v-card-text>

              <v-btn
                @click="onUpdateTeam(selectedTeam, teamName)"
                class="px-10 text-capitalize"
                color="primary"
                height="40"
              >
                Update</v-btn
              >
            </div>
          </v-card>
        </v-overlay>

        <!-- Refresh Overlay -->
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import tournamentHeader from '~/components/organizer/tournamentHeader'
import tournamentBtn from '~/components/organizer/tournamentBtn'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

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
      teamName: '',

      // Overlay Data
      opacity: 0.5,
      deleteTeamOverlay: false,
      updateTeamOverlay: false,

      // Refresh Overlay
      opacityLoading: 1,
      overlayLoading: false,
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
    // Delete Team
    deleteTeam(data) {
      this.deleteTeamOverlay = true
      this.selectedTeam = data
    },

    async onDeleteTeam(data) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .collection('team-registration')
          .doc(data.uid)
          .delete()
          .then(() => {
            this.deleteTeamOverlay = false
            this.overlayLoading = false
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

    // Update Team Name
    updateTeam(data) {
      this.updateTeamOverlay = true
      this.selectedTeam = data
    },

    async onUpdateTeam(data, teamName) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .collection('team-registration')
          .doc(data.uid)
          .update({
            teamName: this.teamName,
          })
          .then(() => {
            this.updateTeamOverlay = false
            this.overlayLoading = false
          })
      } catch (error) {
        console.log(error.code)
      }
    },
  },
}
</script>
