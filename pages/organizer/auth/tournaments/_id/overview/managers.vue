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
                      :key="manager.uid"
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
                            <v-list-item @click="onDisabled(manager.uid)">
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
                            <v-list-item @click="onEnable(manager.uid)">
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
                                onDeleteActive(manager.uid, manager.status)
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
                            <v-list-item
                              @click="
                                onDeletePending(
                                  manager.uid,
                                  manager.isAction,
                                  manager.messages,
                                  manager.tournamentID,
                                  manager.status
                                )
                              "
                            >
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

      // Refresh Overlay
      opacityLoading: 1,
      overlayLoading: false,
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

              doc.data().notificationsMgr.forEach((docmgr) => {
                this.isAction = docmgr.isAction
                this.messages = docmgr.messages
                this.tournamentID = docmgr.tournamentID
              })
              this.tournamentTempRef.push({
                status: docref.status,
                uid: docref.uid,
                name: doc.data().name,
                email: doc.data().email,
                isAction: this.isAction,
                messages: this.messages,
                tournamentID: this.tournamentID,
              })
            })
        })
        this.managerList = this.tournamentTempRef
      })
  },

  methods: {
    // Invite Manager
    async onInvite() {
      this.overlayLoading = true
      try {
        const snapshot = await this.$fire.firestore
          .collection('users')
          .where('email', '==', this.userEmail)
          .get()

        this.getUser = snapshot.docs.map((doc) => doc.data())
        // console.log(this.getUser[0].uid)

        await this.$fire.firestore
          .collection('users')
          .doc(this.getUser[0].uid)
          .update({
            notificationsMgr: firebase.firestore.FieldValue.arrayUnion({
              messages:
                'You are invited to participate in ' + this.tournamentRef.title,
              tournamentID: this.tournamentRef.tournamentID,
              isAction: true,
            }),
          })
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.tournamentRef.tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayUnion({
                  uid: this.getUser[0].uid,
                  status: 'pending',
                }),
              })
          )
          .then(() => {
            this.overlay = false
            this.userEmail = ''
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'Invitation has been sent.',
              alertIcon: 'mdi-email-send',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
          .then(() => {
            this.overlayLoading = false
            this.$router.go(-1)
          })
      } catch (error) {
        this.overlayLoading = false
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
    async onDeleteActive(uid, status) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(uid)
          .update({
            tournamentsMgr: firebase.firestore.FieldValue.arrayRemove(
              this.tournamentRef.tournamentID
            ),
          })
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.tournamentRef.tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayRemove({
                  status: status,
                  uid: uid,
                }),
              })
          )
          .then(() => {
            this.overlayLoading = false
            this.$router.go(-1)
          })
      } catch (error) {
        this.overlayLoading = false
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
    async onDeletePending(uid, isAction, messages, tournamentID, status) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('users')
          .doc(uid)
          .update({
            notificationsMgr: firebase.firestore.FieldValue.arrayRemove({
              messages: messages,
              tournamentID: tournamentID,
              isAction: isAction,
            }),
          })
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.tournamentRef.tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayRemove({
                  status: status,
                  uid: uid,
                }),
              })
          )
          .then(() => {
            this.overlayLoading = false
            this.$router.go(-1)
          })
      } catch (error) {
        this.overlayLoading = false
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
    async onDisabled(uid) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: firebase.firestore.FieldValue.arrayUnion({
              status: 'disabled',
              uid: uid,
            }),
          })
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.tournamentRef.tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayRemove({
                  status: 'active',
                  uid: uid,
                }),
              })
          )
          .then(() => {
            this.$router.go(-1)
            this.overlayLoading = false
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

    // Enabled Account
    async onEnable(uid) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.tournamentRef.tournamentID)
          .update({
            managerRef: firebase.firestore.FieldValue.arrayUnion({
              status: 'active',
              uid: uid,
            }),
          })
          .then(
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.tournamentRef.tournamentID)
              .update({
                managerRef: firebase.firestore.FieldValue.arrayRemove({
                  status: 'disabled',
                  uid: uid,
                }),
              })
          )
          .then(() => {
            this.$router.go(-1)
            this.overlayLoading = false
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
