<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" order="2" order-lg="1">
            <!-- Card displayed if collaborator list is empty -->
            <v-card
              v-if="collaboratorlength == 0"
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
                      List of Collaborator
                    </h1>

                    <h1 class="text-subtitle-1 font-weight-regular mb-5">
                      Currently there is no collaborator yet in your event.
                      Please invite collaborator by email and the list of
                      collaborator will be displayed here.
                    </h1>

                    <v-btn
                      @click="addCollaboration"
                      class="font-weight-regular text-capitalize"
                      color="primary"
                      depressed
                    >
                      Add Collaborator
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

            <!-- Card displayed if collaborator list is not empty -->
            <v-card
              v-else
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9"
              outlined
              tile
            >
              <div class="d-flex">
                <h1 class="text-subtitle-1 font-weight-bold mb-1">
                  List of Collaborators
                </h1>

                <v-btn
                  @click="addCollaboration"
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
                      <th class="text-left">ID</th>
                      <th class="text-center">Tournament</th>
                      <th class="text-center">Collaborator</th>
                      <th class="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(collaborator, index) in collaboratorList"
                      :key="index"
                      class="text-center"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-left">{{ collaborator.tournamentID }}</td>
                      <td class="text-center">
                        {{ collaborator.tournamentName }}
                      </td>
                      <td class="text-center">
                        {{ collaborator.collaboratorName }}
                      </td>

                      <td>
                        <!-- Delete Account -->
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" icon>
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item @click="onDeleteCollab(collaborator)">
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
          <v-col cols="12" lg="4" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>

        <!-- Add Collaborator -->
        <v-overlay :opacity="opacity" :value="addCollab">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="addCollab = false" class="mt-n3 ml-n8" icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <!-- Title -->
            <div class="text-center">
              <v-icon class="mb-3" color="grey darken-1" size="60"
                >mdi-account-tie</v-icon
              >
              <h1 class="text-center text-h5 font-weight-medium">
                Add collaborator to manage the tournament
              </h1>
            </div>

            <div class="d-flex align-center">
              <v-row class="mt-6">
                <!-- Select Collaborator -->
                <v-col cols="6">
                  <v-autocomplete
                    v-model="userID"
                    :items="userList"
                    label="Select Collaborator"
                    item-text="name"
                    item-value="uid"
                    outlined
                    dense
                  >
                    <template v-slot:item="data">
                      <template>
                        <v-list-item-avatar>
                          <img :src="data.item.avatar" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="data.item.name"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-html="data.item.email"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>

                <!-- Select Tournament -->
                <v-col cols="4">
                  <v-autocomplete
                    v-model="tournamentID"
                    :items="tournamentList"
                    label="Select Tournament"
                    item-text="sportType"
                    item-value="tournamentID"
                    outlined
                    dense
                  >
                    <template v-slot:item="data">
                      <template class="d-flex">
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="data.item.sportType"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-html="data.item.tournamentID"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-icon
                          class="d-flex align-self-center pa-0 ma-0"
                        >
                          <v-chip
                            v-if="data.item.gender == 'Male'"
                            color="blue darken-2"
                            x-small
                            label
                            outlined
                          >
                            {{ data.item.gender }}
                          </v-chip>

                          <v-chip
                            v-else
                            color="pink darken-1"
                            x-small
                            label
                            outlined
                          >
                            {{ data.item.gender }}
                          </v-chip>
                        </v-list-item-icon>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>

                <!-- Adding Button -->
                <v-col cols="2">
                  <v-btn
                    @click="onAddCollab(userID, tournamentID)"
                    class="font-weight-regular text-capitalize"
                    :disabled="
                      tournamentList == '' || tournamentID == '' || userID == ''
                    "
                    color="primary"
                    height="40"
                    depressed
                    block
                  >
                    Add
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import eventHeader from '~/components/organizer/eventHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'organizer',

  components: {
    eventHeader,
    eventSponsorship,
    notifications,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data() {
    return {
      // Event Data
      eventRef: '',
      collaboratorlength: '',

      // Adding Collaboration Overlay
      opacity: 0.5,
      addCollab: false,

      // Search Data
      userList: [],
      tournamentList: [],

      // Adding Collaborator Data
      userID: '',
      tournamentID: '',
      eventHost: '',
      tournamentName: '',
      tournamentGender: '',
      collaboratorList: '',
      collaboratorListTemp: [],
      tournName: '',

      // Loading State
      isLoading: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              var hostName = doc.data().hostName

              if (user.uid != hostName) {
                console.log('No Credential')
                this.$router.replace('/organizer/auth/dashboard')
              }
            }
          })

        // Get Event Data
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.eventRef = doc.data()
              this.collaboratorlength = doc.data().collabRef.length
              this.collaboratorListTemp = []

              // Get Tournament and User Data
              doc.data().collabRef.forEach((element) => {
                var tournamentID = element.tournamentID
                var tournamentName
                var collaboratorID = element.userID
                var collaboratorName

                // Initialize List
                var list = {
                  tournamentID,
                  tournamentName,
                  collaboratorID,
                  collaboratorName,
                }

                // Get Tournament Name
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(element.tournamentID)
                  .onSnapshot((docTour) => {
                    if (docTour.exists) {
                      list.tournamentName = docTour.data().sportType
                    }
                  })

                // Get User Name
                this.$fire.firestore
                  .collection('users')
                  .doc(element.userID)
                  .onSnapshot((docUser) => {
                    if (docUser.exists) {
                      list.collaboratorName = docUser.data().name
                    }
                  })

                // Push element
                this.collaboratorListTemp.push(list)
              })
            }
            this.collaboratorList = this.collaboratorListTemp
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Get and find user and filter tournament list
    addCollaboration() {
      // Get list of tournament
      this.$fire.firestore
        .collection('events')
        .doc(this.$route.params.id)
        .onSnapshot((doc) => {
          var tournamentListTemp = []

          doc.data().tournamentRef.forEach((tournamentID) => {
            // Get Tournament Data
            this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(tournamentID)
              .onSnapshot((doc) => {
                // Filtered tournament that don't have collaborator
                if (doc.data().collaborator == null) {
                  var list = {
                    sportType: doc.data().sportType,
                    tournamentID: doc.data().tournamentID,
                    gender: doc.data().gender,
                  }
                  tournamentListTemp.push(list)
                }
              })
          })
          this.tournamentList = tournamentListTemp
        })

      // Get list of user
      this.$fire.firestore
        .collection('users')
        .get()
        .then((querySnapshot) => {
          var userListTemp = []
          querySnapshot.forEach((doc) => {
            var list = {
              name: doc.data().name,
              email: doc.data().email,
              avatar: doc.data().photoURL,
              uid: doc.data().uid,
            }
            userListTemp.push(list)
          })

          // Remove host from the list
          const host = userListTemp.find(
            (element) => element.uid === this.eventRef.hostName
          )

          const filteredListTemp = userListTemp.filter(function (element) {
            return element != host
          })

          this.userList = filteredListTemp
        })

      // Set adding collaboration overlay to True
      this.addCollab = true
    },

    // Adding Collaborator to the events
    async onAddCollab(userID, tournamentID) {
      // Get hostName
      this.$fire.firestore
        .collection('users')
        .doc(this.eventRef.hostName)
        .get()
        .then((doc) => {
          this.eventHost = doc.data().name
        })

      // Get tournament name & gender
      this.$fire.firestore
        .collection('events')
        .doc(this.$route.params.id)
        .collection('tournaments')
        .doc(tournamentID)
        .get()
        .then((doc) => {
          this.tournamentName = doc.data().sportType
          this.tournamentGender = doc.data().gender
        })

      try {
        // Add userID & TournamentID to collabRef (Event)
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            collabRef: firebase.firestore.FieldValue.arrayUnion({
              userID: userID,
              tournamentID: tournamentID,
            }),
          })

        // Add userID to collaborator (Tournament)
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(tournamentID)
          .update({
            collaborator: userID,
          })

        // Add TournamentID to eventsCollab (User)
        await this.$fire.firestore
          .collection('users')
          .doc(userID)
          .update({
            eventsCollab: firebase.firestore.FieldValue.arrayUnion({
              eventID: this.$route.params.id,
              tournamentID: tournamentID,
            }),
          })

        // Send Notifications to the users (User)
        await this.$fire.firestore
          .collection('users')
          .doc(userID)
          .update({
            notificationsRef: firebase.firestore.FieldValue.arrayUnion({
              message:
                this.eventHost +
                ' has assigned you a role in ' +
                this.eventRef.title +
                ' event to manage ' +
                this.tournamentName +
                ' tournament (' +
                this.tournamentGender +
                ').',
              status: 'unread',
            }),
          })
          .then(() => {
            // Set loadingState to false
            this.addCollab = false
          })
      } catch (error) {
        // Set loadingState to false
        this.addCollab = false
        console.log(error.message)
        this.$forceUpdate()
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    // Delete Collaborator From Tournament
    async onDeleteCollab(collaborator) {
      // Get tournament name & gender
      this.$fire.firestore
        .collection('events')
        .doc(this.$route.params.id)
        .collection('tournaments')
        .doc(collaborator.tournamentID)
        .get()
        .then((doc) => {
          this.tournamentGender = doc.data().gender
        })
      try {
        // Remove userID & TournamentID from collabRef (Event)
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            collabRef: firebase.firestore.FieldValue.arrayRemove({
              userID: collaborator.collaboratorID,
              tournamentID: collaborator.tournamentID,
            }),
          })
        // Remove userID from collaborator (Tournament)
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(collaborator.tournamentID)
          .update({
            collaborator: null,
          })
        // Remove TournamentID from eventsCollab (User)
        await this.$fire.firestore
          .collection('users')
          .doc(collaborator.collaboratorID)
          .update({
            eventsCollab: firebase.firestore.FieldValue.arrayRemove({
              eventID: this.$route.params.id,
              tournamentID: collaborator.tournamentID,
            }),
          })
        // Send Notifications to the users (User)
        await this.$fire.firestore
          .collection('users')
          .doc(collaborator.collaboratorID)
          .update({
            notificationsRef: firebase.firestore.FieldValue.arrayUnion({
              message:
                'You have been removed as a collaborator of ' +
                this.eventRef.title +
                ' event to manage ' +
                collaborator.tournamentName +
                ' tournament (' +
                this.tournamentGender +
                ').',
              status: 'unread',
            }),
          })
      } catch (error) {
        console.log(error.message)
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
