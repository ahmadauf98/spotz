<template>
  <v-app>
    <v-main class="mx-md-10 mx-lg-15 px-lg-15 mx-xl-n5 px-xl-0 py-0">
      <v-container class="p-0" fluid>
        <div class="mx-xl-15 px-xl-15">
          <div class="mx-xl-15 px-xl-15">
            <div class="mx-xl-15 px-xl-15">
              <!-- Notifications -->
              <notifications />

              <!-- Tournament registration title -->
              <h1 class="text-h4 font-weight-black text-center mt-6 mb-3">
                Create a tournament for an event
              </h1>
              <h1 class="text-subtitle-2 font-weight-regular text-center mb-10">
                Learn all about spotz tournament with this
                <a href="#" class="text-decoration-none">
                  short documentation.</a
                >
                <br />
                If you decide to have a single tournament, you can start create
                a tournament<NuxtLink
                  to="/organizer/auth/tournaments/create"
                  class="text-decoration-none"
                >
                  here.</NuxtLink
                >
              </h1>

              <ValidationObserver ref="observer" v-slot="{ invalid }">
                <!-- Input Data Part -->
                <v-row class="mb-5">
                  <v-col>
                    <v-card class="mx-auto py-5" outlined>
                      <v-row>
                        <v-col cols="12">
                          <div class="px-15">
                            <h1 class="text-subtitle-1 font-weight-bold mb-1">
                              Basic Details
                            </h1>

                            <v-row class="d-block">
                              <!-- Type of Sports Input -->
                              <v-col cols="12" class="mb-n6">
                                <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Type of Sports"
                                  rules="required"
                                >
                                  <v-select
                                    :items="sports"
                                    label="Type of Sports*"
                                    v-model="sportType"
                                    :error-messages="errors"
                                    outlined
                                    dense
                                  ></v-select>
                                  <h1
                                    v-show="
                                      sportType == null || sportType != ''
                                    "
                                    class="text-caption text-red mb-5 mt-n6"
                                  >
                                    <v-icon color="red" size="20"
                                      >mdi-alert-circle</v-icon
                                    >
                                    You cannot change this later!
                                  </h1>
                                </ValidationProvider>
                              </v-col>

                              <!-- Gender Selection -->
                              <v-col cols="12" class="mb-n6">
                                <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Gender Category"
                                  rules="required"
                                >
                                  <v-select
                                    :items="genderList"
                                    :value="genderList"
                                    v-model="gender"
                                    :error-messages="errors"
                                    label="Gender Category*"
                                    outlined
                                    dense
                                  ></v-select>
                                </ValidationProvider>
                              </v-col>
                            </v-row>

                            <v-divider class="mt-4 mb-6"></v-divider>

                            <h1 class="text-subtitle-1 font-weight-bold mb-n1">
                              Tournament Info
                            </h1>

                            <h1 class="text-caption text-grey">
                              Two Stage Tournament — groups compete separately,
                              first and second place teams from each groups will
                              proceed to a final stage.
                            </h1>

                            <v-row class="d-block">
                              <!-- Two Stage Tournament Format -->
                              <v-col cols="12" class="mb-n6">
                                <v-row>
                                  <v-col cols="3" class="mt-2">
                                    <label class="text-grey">
                                      Group Stage
                                    </label>
                                  </v-col>
                                  <v-col cols="9">
                                    <v-tooltip top>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-text-field
                                          v-model="gStage"
                                          v-bind="attrs"
                                          v-on="on"
                                          readonly
                                          outlined
                                          dense
                                        ></v-text-field>
                                      </template>
                                      <span>This cannot be changed.</span>
                                    </v-tooltip>
                                  </v-col>
                                </v-row>

                                <v-row class="mt-n6">
                                  <v-col cols="3" class="mt-2">
                                    <label></label>
                                  </v-col>
                                  <v-col cols="9">
                                    <v-tooltip top>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <!-- Number of Teams Input -->
                                        <v-text-field
                                          label="Number of Teams"
                                          type="number"
                                          v-model="result"
                                          v-bind="attrs"
                                          v-on="on"
                                          readonly
                                          outlined
                                          dense
                                        ></v-text-field>
                                      </template>
                                      <span
                                        >This value automatically assigned when
                                        you fill in the number of teams in each
                                        group.</span
                                      >
                                    </v-tooltip>
                                  </v-col>
                                </v-row>

                                <v-row class="mt-n6">
                                  <v-col cols="3" class="mt-2">
                                    <label></label>
                                  </v-col>
                                  <v-col cols="9">
                                    <div class="d-flex">
                                      <label class="mt-2 mr-3 text-grey"
                                        >Teams play each other</label
                                      >
                                      <v-select
                                        :items="round"
                                        v-model="gRound"
                                        outlined
                                        dense
                                      ></v-select>
                                    </div>
                                    <v-divider></v-divider>
                                  </v-col>
                                </v-row>

                                <v-row>
                                  <v-col cols="3" class="mt-2">
                                    <label></label>
                                  </v-col>

                                  <v-col cols="9">
                                    <div class="d-flex mt-n2">
                                      <v-col cols="3">
                                        <ValidationProvider
                                          v-slot="{ errors }"
                                          name="Teams Compete"
                                          rules="required"
                                        >
                                          <v-text-field
                                            type="number"
                                            placeholder="3"
                                            v-model="gTeamNumbers"
                                            :error-messages="errors"
                                            min="3"
                                            max="6"
                                            outlined
                                            dense
                                          ></v-text-field>
                                        </ValidationProvider>
                                      </v-col>

                                      <v-col cols="9" class="mt-n1">
                                        <label class="text-grey"
                                          >teams compete in each group* — <br />
                                          minimum teams: 3, maximum teams:
                                          6</label
                                        >
                                      </v-col>
                                    </div>
                                  </v-col>
                                </v-row>

                                <v-row class="mt-n10">
                                  <v-col cols="3" class="mt-2">
                                    <label></label>
                                  </v-col>

                                  <v-col cols="9">
                                    <div class="d-flex mt-n2">
                                      <v-col cols="3">
                                        <ValidationProvider
                                          v-slot="{ errors }"
                                          name="Number of Groups"
                                          rules="required"
                                        >
                                          <v-select
                                            :items="teams"
                                            placeholder="2"
                                            type="number"
                                            v-model="gGroupNumber"
                                            :error-messages="errors"
                                            outlined
                                            dense
                                          ></v-select>
                                        </ValidationProvider>
                                      </v-col>

                                      <v-col cols="9" class="mt-2">
                                        <label class="text-grey"
                                          >number of groups in the first
                                          stage*</label
                                        >
                                      </v-col>
                                    </div>
                                  </v-col>
                                </v-row>

                                <v-row class="mt-n10">
                                  <v-col cols="3" class="mt-2">
                                    <label></label>
                                  </v-col>

                                  <v-col cols="9">
                                    <div class="d-flex mt-n2">
                                      <v-col cols="3">
                                        <v-tooltip top>
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-text-field
                                              type="number"
                                              v-model="gQualifyTeam"
                                              v-bind="attrs"
                                              v-on="on"
                                              readonly
                                              outlined
                                              dense
                                            ></v-text-field>
                                          </template>
                                          <span>This cannot be changed.</span>
                                        </v-tooltip>
                                      </v-col>

                                      <v-col cols="9" class="mt-n1">
                                        <label class="text-grey"
                                          >teams qualify from each group to the
                                          next round</label
                                        >
                                      </v-col>
                                    </div>
                                  </v-col>
                                </v-row>

                                <v-row class="mt-n6 mb-n4">
                                  <v-col cols="3" class="mt-2">
                                    <label class="text-grey">Final Stage</label>
                                  </v-col>
                                  <v-col cols="9">
                                    <v-tooltip top>
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-text-field
                                          v-model="fStage"
                                          v-bind="attrs"
                                          v-on="on"
                                          readonly
                                          outlined
                                          dense
                                        ></v-text-field>
                                      </template>
                                      <span>This cannot be changed.</span>
                                    </v-tooltip>

                                    <v-checkbox
                                      v-model="fIs3rdPlace"
                                      class="mt-n5"
                                      label="Include a match for 3rd place."
                                    ></v-checkbox>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>

                            <v-row class="mt-n2">
                              <v-col cols="6">
                                <v-btn
                                  @click="goBack"
                                  class="font-weight-regular text-capitalize"
                                  color="grey darken-1"
                                  depressed
                                  block
                                  dark
                                >
                                  Cancel
                                </v-btn>
                              </v-col>
                              <v-col cols="6">
                                <v-btn
                                  @click="createTournament"
                                  class="font-weight-regular text-capitalize"
                                  color="primary"
                                  :disabled="invalid"
                                  depressed
                                  block
                                >
                                  <span v-if="isLoading == false">
                                    Create
                                  </span>
                                  <v-progress-circular
                                    v-else
                                    :size="20"
                                    indeterminate
                                    color="white"
                                  ></v-progress-circular>
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import moment from 'moment'
import notifications from '~/components/notifications'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'organizer',

  components: {
    notifications,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data: () => ({
    // Basic Details Info
    sports: ['Football', 'Netball', 'Handball', 'Futsal', 'Basketball'],
    genderList: ['Male', 'Female'],
    sportType: '',
    gender: null,
    tournamentID: '',

    // Tournament Info
    round: ['once', 'twice'],
    teams: [2, 4, 8],
    gStage: 'Round Robin',
    participants: null,
    gRound: 'once',
    gTeamNumbers: null,
    gGroupNumber: null,
    gQualifyTeam: 2,
    fStage: 'Single Elimination',
    fIs3rdPlace: false,

    // Loading State
    isLoading: false,
  }),

  computed: {
    // Get Number of Participants
    result: function () {
      return (this.participants = this.gTeamNumbers * this.gGroupNumber)
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var hostName = ''

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

        // Event Data
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              hostName = doc.data().hostName
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },

    async createTournament() {
      // Generate unique tournamentID
      var uniqid = require('uniqid')
      this.tournamentID = uniqid()

      try {
        if (this.gTeamNumbers < 3 || this.gTeamNumbers > 6) {
          // Loading State -> False
          this.isLoading = false
          // Notify User -> Form Validation Error
          this.$store.commit('SET_NOTIFICATION', {
            alert:
              'Please pick the number of teams competing in each group between 3 to 6 only.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else if (Number.isInteger(this.gTeamNumbers) == 'false') {
          // Loading State -> False
          this.isLoading = false
          // Notify User -> Form Validation Error
          this.$store.commit('SET_NOTIFICATION', {
            alert:
              'Please pick integer number only in the number of teams field.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          // Create & Store Tournament to Firestore
          await this.$fire.firestore
            .collection('events')
            .doc(this.$route.params.id)
            .collection('tournaments')
            .doc(this.tournamentID)
            .set({
              // Basic Details
              tournamentID: this.tournamentID,
              sportType: this.sportType,
              gender: this.gender,

              // Collaborator Data
              collaborator: null,

              // Registration & Manager Data
              registrationStatus: false,

              // Manager Data
              managerRef: [],
              requestListMgr: [],

              // Tournament Data
              gStage: this.gStage,
              participants: this.participants,
              gRound: this.gRound,
              gTeamNumbers: this.gTeamNumbers,
              gGroupNumber: this.gGroupNumber,
              gQualifyTeam: this.gQualifyTeam,
              fStage: this.fStage,
              fIs3rdPlace: this.fIs3rdPlace,
              isGroupDraw: false,
            })

          // Create New Seedings
          if (this.gGroupNumber == 2) {
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.tournamentID)
              .collection('group-stage')
              .doc('seedings')
              .set({ group_A: [], group_B: [] })
          } else if (this.gGroupNumber == 4) {
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.tournamentID)
              .collection('group-stage')
              .doc('seedings')
              .doc('seedings')
              .set({ group_A: [], group_B: [], group_C: [], group_D: [] })
          } else if (this.gGroupNumber == 8) {
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.tournamentID)
              .collection('group-stage')
              .doc('seedings')
              .set({
                group_A: [],
                group_B: [],
                group_C: [],
                group_D: [],
                group_E: [],
                group_F: [],
                group_G: [],
                group_H: [],
              })
          }

          // Initialize Default Team
          if (this.gGroupNumber == 2) {
            for (var index = 0; index < this.gTeamNumbers; index++) {
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.tournamentID)
                .collection('group-stage')
                .doc('seedings')
                .update({
                  group_A: firebase.firestore.FieldValue.arrayUnion({
                    id: 'A' + index,
                    teamName: 'Team A' + (index + 1),
                  }),
                  group_B: firebase.firestore.FieldValue.arrayUnion({
                    id: 'B' + index,
                    teamName: 'Team B' + (index + 1),
                  }),
                })
            }
          } else if (this.gGroupNumber == 4) {
            for (var index = 0; index < this.gTeamNumbers; index++) {
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.tournamentID)
                .collection('group-stage')
                .doc('seedings')
                .update({
                  group_A: firebase.firestore.FieldValue.arrayUnion({
                    id: 'A' + index,
                    teamName: 'Team A' + (index + 1),
                  }),
                  group_B: firebase.firestore.FieldValue.arrayUnion({
                    id: 'B' + index,
                    teamName: 'Team B' + (index + 1),
                  }),
                  group_C: firebase.firestore.FieldValue.arrayUnion({
                    id: 'C' + index,
                    teamName: 'Team C' + (index + 1),
                  }),
                  group_D: firebase.firestore.FieldValue.arrayUnion({
                    id: 'D' + index,
                    teamName: 'Team D' + (index + 1),
                  }),
                })
            }
          } else if (this.gGroupNumber == 8) {
            for (var index = 0; index < this.gTeamNumbers; index++) {
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.tournamentID)
                .collection('group-stage')
                .doc('seedings')
                .update({
                  group_A: firebase.firestore.FieldValue.arrayUnion({
                    id: 'A' + index,
                    teamName: 'Team A' + (index + 1),
                  }),
                  group_B: firebase.firestore.FieldValue.arrayUnion({
                    id: 'B' + index,
                    teamName: 'Team B' + (index + 1),
                  }),
                  group_C: firebase.firestore.FieldValue.arrayUnion({
                    id: 'C' + index,
                    teamName: 'Team C' + (index + 1),
                  }),
                  group_D: firebase.firestore.FieldValue.arrayUnion({
                    id: 'D' + index,
                    teamName: 'Team D' + (index + 1),
                  }),
                  group_E: firebase.firestore.FieldValue.arrayUnion({
                    id: 'E' + index,
                    teamName: 'Team E' + (index + 1),
                  }),
                  group_F: firebase.firestore.FieldValue.arrayUnion({
                    id: 'F' + index,
                    teamName: 'Team F' + (index + 1),
                  }),
                  group_G: firebase.firestore.FieldValue.arrayUnion({
                    id: 'G' + index,
                    teamName: 'Team G' + (index + 1),
                  }),
                  group_H: firebase.firestore.FieldValue.arrayUnion({
                    id: 'H' + index,
                    teamName: 'Team H' + (index + 1),
                  }),
                })
            }
          }

          // Add tournamentID to events doc
          await this.$fire.firestore
            .collection('events')
            .doc(this.$route.params.id)
            .update({
              tournamentRef: firebase.firestore.FieldValue.arrayUnion(
                this.tournamentID
              ),
            })
            .then(() => {
              // Loading State -> False
              this.isLoading = false
              // Push Current Page -> Tournament List
              this.$router.go(-1)
            })
        }
      } catch (error) {
        // Loading State -> False
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
  },
}
</script>
