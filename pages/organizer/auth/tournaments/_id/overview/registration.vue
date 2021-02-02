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
            <!-- Team Registration -->
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9 mb-5" outlined tile>
              <div class="d-flex">
                <h1 class="text-h6 font-weight-bold mb-1">
                  Team Registration Format Setup
                </h1>
              </div>

              <div>
                <h1 class="text-caption text-grey">
                  You can only setup team registration at once. Please be
                  careful for the data to be included in your registration
                  format. For more information, you can read
                  <a href="#">here</a> .
                </h1>
              </div>

              <v-divider class="mt-5"></v-divider>

              <div class="d-flex align-center mt-n5">
                <v-icon class="mr-3" size="50">mdi-account-multiple</v-icon>
                <div class="d-block">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    Number of players per team
                  </h1>
                  <h1 class="text-caption text-grey">
                    Including reserves players
                  </h1>
                </div>

                <v-col cols="2" xl="1" class="mt-8 ml-auto">
                  <v-text-field
                    type="number"
                    v-model="numPlayers"
                    placeholder="0"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </div>

              <v-divider class="mt-n4 mb-4 ml-15"></v-divider>

              <div class="d-flex align-center">
                <v-icon class="mr-3 self-align-top" size="50"
                  >mdi-file-document-edit</v-icon
                >
                <div class="d-block">
                  <h1 class="text-subtitle-2 font-weight-medium">
                    Registration format
                  </h1>
                  <h1 class="text-caption text-grey">
                    Toggle on when you wanna include the data in your
                    registration format.
                  </h1>
                </div>
              </div>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">Name</h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isName"
                    disabled
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    Identification Card Number
                  </h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isIcn"
                    disabled
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">Address</h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isAddress"
                    disabled
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">Gender</h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isGender"
                    disabled
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    Passport Photo
                  </h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isPhoto"
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    Matric Number
                  </h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isMatric"
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    Athelete ID Number
                  </h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isAthelete"
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-card class="pa-4 ml-15 my-3" outlined>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    Phone Number
                  </h1>
                  <v-switch
                    class="ml-auto mt-n1"
                    color="primary"
                    v-model="isPhoneNumber"
                    hide-details
                    inset
                  ></v-switch>
                </div>
              </v-card>

              <v-divider class="my-7 ml-15"></v-divider>

              <div class="d-flex align-center mt-n12">
                <v-icon class="mr-3" size="50">mdi-calendar-alert</v-icon>
                <div class="d-block">
                  <h1 class="text-subtitle-1 font-weight-medium">
                    Due date of registration
                  </h1>
                  <h1 class="text-caption text-grey">
                    This is not automated. Only to inform manager.
                  </h1>
                </div>

                <v-col cols="4" class="mt-8 ml-auto">
                  <v-menu
                    ref="menuStart"
                    v-model="menuStart"
                    :close-on-content-click="false"
                    :return-value.sync="dueDate"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dueDate_Format"
                        label="Choose Date"
                        readonly
                        dense
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dueDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="#6b46c1" @click="menuStart = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="#6b46c1"
                        @click="$refs.menuStart.save(dueDate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </div>

              <v-divider class="mt-n4 mb-5"></v-divider>

              <div class="d-flex">
                <v-btn
                  @click="onSubmit"
                  class="ml-auto font-weight-regular text-capitalize"
                  color="primary"
                  depressed
                  >Setup Registration</v-btn
                >
              </div>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>

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
import firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
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
      // User Input Data
      tournamentRef: '',

      // Registration Format
      isName: true,
      isIcn: true,
      isGender: true,
      isAddress: true,
      isPhoto: false,
      isMatric: false,
      isAthelete: false,
      isPhoneNumber: false,
      numPlayers: 0,
      dueDate: '',

      // Calendar
      menuStart: false,

      // Refresh Overlay
      opacityLoading: 1,
      overlayLoading: false,
    }
  },

  computed: {
    // Formating Date (YYYY-MM-DD) to (DD MMMM YYYY)
    dueDate_Format: function () {
      if (this.dueDate == '') {
        return null
      } else {
        return moment(this.dueDate, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            var hostName = doc.data().hostName

            if (user.uid != hostName) {
              console.log('No Credential')
              this.$router.replace('/organizer/auth/dashboard')
            }
          })

        this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            this.tournamentRef = doc.data()
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    async onSubmit() {
      this.overlayLoading = true
      try {
        if (this.numPlayers <= 0) {
          this.overlayLoading = false
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Number of Players should be more than 0',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          await this.$fire.firestore
            .collection('tournaments')
            .doc(this.tournamentRef.tournamentID)
            .collection('team-registration')
            .doc('format')
            .set({
              address: this.isAddress,
              gender: this.isGender,
              identificationID: this.isIcn,
              name: this.isName,
              numAthelete: this.isAthelete,
              numMatric: this.isMatric,
              numPlayers: this.numPlayers,
              passportPhoto: this.isPhoto,
              phoneNumber: this.isPhoneNumber,
              dueDate: this.dueDate_Format,
            })
            .then(
              await this.$fire.firestore
                .collection('tournaments')
                .doc(this.tournamentRef.tournamentID)
                .update({
                  registrationStatus: true,
                })
            )
            .then(() => {
              this.$router.go(-1)
              this.overlayLoading = false
            })
        }
      } catch (error) {
        this.overlayLoading = false
        console.log(error)
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
