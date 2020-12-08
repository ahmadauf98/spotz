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
            <!-- Managers List Null -> To add New Manager -->
            <v-card
              v-if="managerlength == 0"
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9"
              outlined
              tile
            >
              <v-row class="mt-n4 mb-n5 d-flex align-center">
                <v-col cols="12" md="8" order="2" order-md="1">
                  <div>
                    <h1
                      class="text-center text-md-left text-subtitle-1 font-weight-bold mb-4"
                    >
                      List of Managers
                    </h1>
                    <h1
                      v-show="tournamentRef.isOpen == true"
                      class="text-subtitle-1 font-weight-regular mb-5"
                    >
                      Currently there is no manager yet in your tournament.
                      Please accept manager request in notification and the list
                      of manager will be displayed here.
                    </h1>

                    <h1
                      v-show="tournamentRef.isOpen == false"
                      class="text-subtitle-1 font-weight-regular mb-5"
                    >
                      Currently there is no manager yet in your tournament.
                      Please invite manager by email and the list of manager
                      will be displayed here.
                    </h1>

                    <v-btn
                      v-show="tournamentRef.isOpen == false"
                      @click="overlay = !overlay"
                      class="font-weight-regular text-capitalize"
                      color="primary"
                      depressed
                    >
                      Add Manager
                    </v-btn>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="d-flex justify-center align-top"
                  order="1"
                  order-md="2"
                >
                  <div class="px-5 mt-md-n8 mt-lg-n3 mt-xl-1">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmanagers-tournament.svg?alt=media&token=ec47c873-a84d-4353-b823-e0fe7bff619b"
                      width="220px"
                      alt="..."
                    />
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <!-- Managers Listing -->
            <v-card
              v-else
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9"
              outlined
              tile
            >
              <div class="d-flex">
                <h1 class="text-subtitle-1 font-weight-bold mb-1">
                  List of Managers
                </h1>

                <v-btn
                  v-show="
                    tournamentRef.isOpen == false &&
                    this.managerlength < tournamentRef.participants
                  "
                  @click="overlay = !overlay"
                  class="ml-auto mt-n2"
                  color="primary"
                  icon
                >
                  <v-icon>mdi-account-multiple-plus</v-icon>
                </v-btn>
              </div>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-left">Account Name</th>
                      <th class="text-center">Email</th>
                      <th class="text-center">Status</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(manager, index) in managerList"
                      :key="index"
                      class="text-center"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-left">{{ manager.name }}</td>
                      <td>{{ manager.email }}</td>
                      <td
                        v-if="manager.status === 'pending'"
                        class="text-capitalize text-pending"
                      >
                        {{ manager.status }}
                      </td>
                      <td
                        v-else-if="manager.status === 'active'"
                        class="text-capitalize text-active"
                      >
                        {{ manager.status }}
                      </td>
                      <td
                        v-else-if="manager.status === 'disabled'"
                        class="text-capitalize text-disabled"
                      >
                        {{ manager.status }}
                      </td>
                      <td>
                        <!-- Disable/ Activate Account -->
                        <v-menu v-if="manager.status == 'active'">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              :disabled="tournamentRef.isGroupDraw == true"
                              icon
                            >
                              <v-icon>mdi-square-edit-outline</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                              @click="onDisabled(manager, managerList)"
                            >
                              <v-list-item-title>
                                Disabled Account
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <v-menu v-else>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              :disabled="manager.status == 'pending'"
                              v-bind="attrs"
                              v-on="on"
                              icon
                            >
                              <v-icon>mdi-square-edit-outline</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                              @click="onEnable(manager, managerList)"
                            >
                              <v-list-item-title>
                                Enable Account
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <!-- Delete Account -->
                        <v-menu
                          v-if="
                            manager.status == 'active' ||
                            manager.status == 'disabled'
                          "
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              :disabled="
                                tournamentRef.registrationStatus == true
                              "
                              icon
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                              @click="
                                onDeleteActive(
                                  manager,
                                  this.tournamentRef.tournamentID
                                )
                              "
                            >
                              <v-list-item-title>
                                Delete Account
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <v-menu v-else>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              :disabled="
                                tournamentRef.registrationStatus == true
                              "
                              icon
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item @click="onDeletePending(manager)">
                              <v-list-item-title>
                                Delete Account
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>

        <!-- Invite Manager -->
        <v-overlay :opacity="opacity" :value="overlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="overlay = false" class="mt-n3 ml-n8" icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <!-- Title -->
            <div class="text-center">
              <v-icon class="mb-3" color="grey darken-1" size="60"
                >mdi-email</v-icon
              >
              <h1 class="text-center text-h5 font-weight-medium">
                Invite manager to the tournament
              </h1>
            </div>

            <div class="d-flex align-center">
              <v-card-text>
                <v-text-field
                  class="mr-5 mt-6"
                  v-model="userEmail"
                  color="primary"
                  placeholder="Email Address"
                  prepend-icon="mdi-account"
                  outlined
                  dense
                ></v-text-field>
              </v-card-text>

              <v-btn
                @click="onInvite"
                class="px-10 font-weight-regular text-capitalize"
                color="primary"
                height="40"
                depressed
              >
                Invite</v-btn
              >
            </div>
          </v-card>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import tournamentHeader from '~/components/organizer/tournamentHeader'
import tournamentInfo from '~/components/organizer/tournamentInfo'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

  components: {
    tournamentHeader,
    tournamentInfo,
  },

  data() {
    return {
      // User Input Data
      tournamentRef: '',
      managerList: [],
      isAction: '',
      messages: '',
      tournamentID: '',
      managerlength: '',
      userEmail: '',
      getUser: '',

      // Manager Invitation Overlay
      opacity: 0.5,
      overlay: false,
    }
  },

  // Fetch Notification Data from Vuex
  computed: { ...mapState(['notification']) },

  mounted() {
    return this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
        this.managerlength = doc.data().managerRef.length
        this.tournamentTempRef = []

        doc.data().managerRef.forEach((docref) => {
          this.$fire.firestore
            .collection('users')
            .doc(docref.uid)
            .onSnapshot((doc) => {
              this.tournamentTempRef.push({
                status: docref.status,
                uid: docref.uid,
                name: doc.data().name,
                email: doc.data().email,
              })
            })
        })
        this.managerList = this.tournamentTempRef
      })
  },

  methods: {
    // Invite Manager
    async onInvite() {
      try {
        const snapshot = await this.$fire.firestore
          .collection('users')
          .where('email', '==', this.userEmail)
          .get()

        this.getUser = snapshot.docs.map((doc) => doc.data())

        // Initialize ManagerID & OrganizerID
        let managerID = this.getUser[0].uid
        let organizerID = this.tournamentRef.hostName
        let tournamentID = this.tournamentRef.tournamentID
        let tournamentName = this.tournamentRef.title

        // Send Invitation to Manager
        await this.$fire.firestore
          .collection('users')
          .doc(managerID)
          .update({
            organizerInv: firebase.firestore.FieldValue.arrayUnion({
              organizerID: organizerID,
              tournamentID: tournamentID,
              tournamentName: tournamentName,
              type: 'managerInv',
            }),
          })

        // Add Pending Status to Manager List
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: firebase.firestore.FieldValue.arrayUnion({
              uid: managerID,
              status: 'pending',
            }),
          })
          .then(() => {
            this.overlay = false
            this.userEmail = ''
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'Invitation has been sent',
              alertIcon: 'mdi-email-send',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
      } catch (error) {
        console.log(error.code)
        if (error.code == undefined) {
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'This email is not register yet in our application.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          this.$store.commit('SET_NOTIFICATION', {
            alert: error.message,
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        }
      }
    },

    // Delete Active or Disabled Account
    async onDeleteActive(mgr, tournamentID) {
      try {
        // Remove tournamentID from manager
        await this.$fire.firestore
          .collection('users')
          .doc(uid)
          .update({
            tournamentsMgr: firebase.firestore.FieldValue.arrayRemove(
              tournamentID
            ),
          })

        // Remove managerID from tournament
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: firebase.firestore.FieldValue.arrayRemove({
              status: mgr.status,
              uid: mgr.uid,
            }),
          })
      } catch (error) {
        console.log(error.code)
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'text-red mr-2 align-self-top',
          snackbar: true,
        })
      }
    },

    // Delete Pending Account
    async onDeletePending(mgr) {
      try {
        // Remove manager invitation from organizerInv
        await this.$fire.firestore
          .collection('users')
          .doc(mgr.uid)
          .get()
          .then((doc) => {
            const currentOrganizerInvListTemp = doc.data().organizerInv

            // Get current organizerInv (tournamentID)
            const currentOrganizerInvListFiltered = currentOrganizerInvListTemp.find(
              (element) =>
                element.tournamentID === this.tournamentRef.tournamentID
            )

            // Create current organizerInv
            const currentOrganizerInv = {
              organizerID: currentOrganizerInvListFiltered.organizerID,
              tournamentID: currentOrganizerInvListFiltered.tournamentID,
              tournamentName: currentOrganizerInvListFiltered.tournamentName,
              type: currentOrganizerInvListFiltered.type,
            }

            // Delete current organizerInv
            this.$fire.firestore
              .collection('users')
              .doc(mgr.uid)
              .update({
                organizerInv: firebase.firestore.FieldValue.arrayRemove(
                  currentOrganizerInv
                ),
              })
          })

        // Remove managerID from tournament
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: firebase.firestore.FieldValue.arrayRemove({
              status: mgr.status,
              uid: mgr.uid,
            }),
          })
      } catch (error) {
        console.log(error.message)
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'text-red mr-2 align-self-top',
          snackbar: true,
        })
      }
    },

    // Disabled Account
    async onDisabled(selectedData, list) {
      try {
        // Change status selected managerRef
        selectedData.status = 'disabled'

        // Update managerRef from tournament
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: list,
          })
      } catch (error) {
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    // Enabled Account
    async onEnable(selectedData, list) {
      try {
        // Change status selected managerRef
        selectedData.status = 'active'

        // Update managerRef from tournament
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: list,
          })
      } catch (error) {
        this.overlayLoading = false
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
