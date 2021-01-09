<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <tournamentHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
              <!-- First Row -->
              <v-row>
                <!-- First Card -->
                <v-col>
                  <v-card class="mx-auto pt-4 pb-7 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1 class="text-subtitle-1 font-weight-bold">
                        <v-icon class="mr-1">mdi-information</v-icon>
                        Status
                      </h1>

                      <v-chip
                        v-if="tournamentRef.status == false"
                        class="ml-auto mr-2 font-weight-medium"
                        color="warning"
                        label
                        small
                      >
                        Draft</v-chip
                      >
                      <v-chip
                        v-else
                        class="ml-auto mr-2 font-weight-medium"
                        color="green darken-1"
                        label
                        small
                        dark
                      >
                        Public</v-chip
                      >

                      <v-btn
                        class="mt-n2"
                        color="primary"
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/settings`"
                        icon
                      >
                        <v-icon>mdi-cogs</v-icon>
                      </v-btn>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        Whether your tournament is public (visible to everyone)
                        or draft (only accessible by host & team managers). Use
                        the publish button to change the status.
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        v-if="tournamentRef.status == false"
                        @click="changeStatus"
                        color="green darken-1"
                        class="ml-auto px-5 font-weight-regular text-capitalize"
                        width="120"
                        depressed
                        dark
                      >
                        <span v-if="isLoading == false">
                          Publish
                          <v-icon size="20" class="ml-1">mdi-send</v-icon>
                        </span>

                        <v-progress-circular
                          v-else
                          :size="20"
                          indeterminate
                          color="white"
                        ></v-progress-circular>
                      </v-btn>

                      <v-btn
                        v-else
                        @click="changeStatus"
                        color="yellow darken-2"
                        class="ml-auto px-5 font-weight-regular text-capitalize"
                        width="120"
                        depressed
                        dark
                      >
                        <span v-if="isLoading == false">
                          Draft
                          <v-icon size="20" class="ml-1">mdi-archive</v-icon>
                        </span>

                        <v-progress-circular
                          v-else
                          :size="20"
                          indeterminate
                          color="white"
                        ></v-progress-circular>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <!-- Second Card -->
                <v-col>
                  <v-card class="mx-auto pt-4 pb-7 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1
                        class="text-subtitle-1 font-weight-bold d-flex align-center"
                      >
                        <v-icon class="mr-1">mdi-account-hard-hat</v-icon>
                        Team Managers
                      </h1>

                      <v-btn
                        v-show="
                          tournamentRef.isOpen == false &&
                          managerlength < tournamentRef.participants
                        "
                        @click="invite"
                        class="ml-auto mt-n2"
                        color="primary"
                        icon
                      >
                        <v-icon>mdi-account-multiple-plus</v-icon>
                      </v-btn>

                      <v-chip
                        v-show="managerlength == tournamentRef.participants"
                        class="ml-auto mr-2 font-weight-medium"
                        color="green darken-1"
                        label
                        small
                        dark
                      >
                        Full</v-chip
                      >
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        v-show="tournamentRef.isOpen == true"
                        class="text-subtitle-1 text-justify font-weight-regular mb-7 mb-md-0 mb-lg-7 mb-xl-0"
                      >
                        You can accept team manager request in the notifications
                        list, then their name will be in the list of managers
                        (one manager per team).
                      </h1>

                      <h1
                        v-show="tournamentRef.isOpen == false"
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        You can invite team manager by their email, once they
                        accept to participate in your tournament, their name
                        will be in the list of managers (one manager per team).
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/managers`"
                        color="primary"
                        class="ml-auto text-capitalize"
                        text
                      >
                        <v-icon size="20" class="mr-1">mdi-account-cog</v-icon>
                        Manage
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Second Row -->
              <v-row>
                <!-- First Card -->
                <v-col>
                  <v-card class="mx-auto py-4 px-5 pb-11 pb-md-4" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1
                        class="text-subtitle-1 font-weight-bold d-flex align-center"
                      >
                        <v-icon class="mr-1">mdi-tournament</v-icon>
                        Seedings Structure
                      </h1>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        v-show="tournamentRef.isGroupDraw == true"
                        class="text-subtitle-1 text-justify font-weight-regular mb-7 mb-md-7 mb-lg-0"
                      >
                        The tournament already have fixtures. You can view the
                        team draw here. To update any fixtures of tournament,
                        kindly go to the <strong>group stage</strong> and
                        <strong>final stage</strong> section.
                      </h1>

                      <h1
                        v-show="tournamentRef.isGroupDraw == false"
                        class="text-subtitle-1 text-justify font-weight-regular mb-7 mb-md-7 mb-lg-0"
                      >
                        The tournament does not have fixtures yet. You should
                        make a team draw after <strong>approve</strong> all
                        registration application from
                        <strong>all manager of the team.</strong>
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/seedings`"
                        color="primary"
                        :disabled="tournamentRef.participants != teamListNumber"
                        class="ml-auto text-capitalize mb-n7 mb-md-0"
                        text
                      >
                        <span v-show="tournamentRef.isGroupDraw == true">
                          <v-icon size="20" class="mr-1"
                            >mdi-clipboard-outline</v-icon
                          >
                          View Structure
                        </span>

                        <span v-show="tournamentRef.isGroupDraw == false">
                          <v-icon size="20" class="mr-1"
                            >mdi-clipboard-edit-outline</v-icon
                          >
                          Draw Tournament
                        </span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>

                <!-- Second Card -->
                <v-col>
                  <v-card class="mx-auto py-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1
                        class="text-subtitle-1 font-weight-bold d-flex align-center"
                      >
                        <v-icon class="mr-1">mdi-ticket</v-icon>
                        Registration
                      </h1>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        Approve or reject list of team registration from team
                        managers. You can set duration of registration too.
                        Within the time period, managers can resubmit list of
                        registration.
                      </h1>
                    </div>

                    <v-card-actions class="mt-2 d-flex">
                      <v-btn
                        v-if="tournamentRef.registrationStatus == false"
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/registration`"
                        :disabled="
                          managerlength_active != tournamentRef.participants
                        "
                        color="primary"
                        class="ml-auto text-capitalize"
                        text
                      >
                        <v-icon size="20" class="mr-2">mdi-equal-box </v-icon>
                        Setup Format
                      </v-btn>

                      <v-btn
                        v-else
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/teamapproval`"
                        color="primary"
                        class="ml-auto text-capitalize"
                        text
                      >
                        <v-icon size="20" class="mr-1"
                          >mdi-check-box-multiple-outline</v-icon
                        >
                        Registration Approval
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>

        <!-- Invite Manager -->
        <v-overlay :opacity="opacity" :value="invMgr">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="invMgr = false" class="mt-n3 ml-n8" icon>
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
              <v-row class="mt-6">
                <!-- Select Manager -->
                <v-col cols="9">
                  <v-autocomplete
                    v-model="userEmail"
                    :items="userList"
                    label="Select Manager"
                    item-text="name"
                    item-value="email"
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

                <!-- Invite Button -->
                <v-col cols="3">
                  <v-btn
                    @click="onInvite"
                    class="px-10 font-weight-regular text-capitalize"
                    color="primary"
                    height="40"
                    depressed
                  >
                    Invite</v-btn
                  >
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
import tournamentHeader from '~/components/organizer/tournamentHeader'
import tournamentInfo from '~/components/organizer/tournamentInfo'
import notifications from '~/components/notifications'

export default {
  layout: 'organizer',

  components: {
    tournamentHeader,
    tournamentInfo,
    notifications,
  },

  data() {
    return {
      // Tournament Data
      tournamentRef: '',
      tournamentStatus: false,
      managerlength: '',
      managerlength_active: null,
      teamListNumber: null,

      // Invite User Info
      userEmail: '',
      getUser: '',

      // Search Data
      userList: [],

      // Manager Invitation Overlay
      opacity: 0.5,
      invMgr: false,

      // Loading State
      isLoading: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('tournaments')
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

        this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.tournamentRef = doc.data()
              this.managerlength = doc.data().managerRef.length

              var manager_list = doc.data().managerRef
              var manager_active = manager_list.filter(
                (element) => element.status === 'active'
              )
              this.managerlength_active = manager_active.length
            }
          })

        this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .collection('team-registration')
          .where('status', '==', 'approved')
          .onSnapshot((querySnapshot) => {
            this.teamListNumber = querySnapshot.size
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Update Status in Database
    changeStatus() {
      // Loading State -> true
      this.isLoading = true
      this.tournamentStatus = !this.tournamentStatus
      this.onChangeStatus()
    },

    async onChangeStatus() {
      try {
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .update({
            status: this.tournamentStatus,
          })
          .then(() => {
            // Loading State -> false
            this.isLoading = false
          })
      } catch (error) {
        // Loading State -> false
        this.isLoading = false
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    // Invite Manager
    invite() {
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
            (element) => element.uid === this.tournamentRef.hostName
          )

          const filteredListTemp = userListTemp.filter(function (element) {
            return element != host
          })

          this.userList = filteredListTemp
        })

      // Set invite manager overlay to True
      this.invMgr = true
    },

    async onInvite() {
      try {
        if (this.userEmail == '') {
          // Notify User -> Form Validation Error
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Please select Manager.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          // Find userID by email
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
                category: 'tournamentsMgr',
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
              this.invMgr = false
              this.userEmail = ''
              this.$store.commit('SET_NOTIFICATION', {
                alert: 'Invitation has been sent',
                alertIcon: 'mdi-email-send',
                alertIconStyle: 'mr-2 align-self-top',
                colorIcon: 'green darken-1',
                snackbar: true,
              })
            })
        }
      } catch (error) {
        this.invMgr = false
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
  },
}
</script>
