<template>
  <v-app>
    <v-main class="mx-md-10 mx-lg-15 px-lg-15 py-0">
      <v-container class="p-0" fluid>
        <div class="mx-xl-15 px-xl-15">
          <div class="mx-xl-15 px-xl-15">
            <div class="mx-xl-15 px-xl-15">
              <!-- Notifications -->
              <notifications />

              <!-- Tournament registration title -->
              <h1 class="text-h4 font-weight-black text-center mt-6 mb-3">
                Create a tournament
              </h1>
              <h1 class="text-subtitle-2 font-weight-regular text-center mb-10">
                Learn all about spotz tournament with this
                <a href="#" class="text-decoration-none">
                  short documentation.</a
                >
                <br />
                If you decide to have multiple tournaments, you can start using
                event
                <a href="#" class="text-decoration-none"> here.</a>
              </h1>

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
                            <!-- PhotoURL Input -->
                            <v-col cols="12" class="mb-2 text-center">
                              <!-- If Profile Photo is Null -->
                              <v-avatar
                                v-if="photoURL == null || photoURL == ''"
                                color="#6b46c1"
                                class="mb-8"
                                size="150"
                                rounded
                              >
                                <img
                                  src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623"
                                  alt="..."
                                />
                              </v-avatar>

                              <!-- If Profile Photo Not Null -->
                              <v-avatar v-else class="mb-8" size="150" rounded>
                                <img :src="photoURL" alt="..." />
                              </v-avatar>

                              <div class="mt-n15 ml-15">
                                <v-btn
                                  @click="choosePhoto"
                                  class="ml-15"
                                  color="#1a202c"
                                  fab
                                  small
                                  dark
                                >
                                  <v-icon v-if="!isFileUploaded" size="20"
                                    >mdi-camera</v-icon
                                  >
                                  <template v-else>
                                    <span>{{ uploadPercentage }}%</span>
                                  </template>
                                </v-btn>
                                <input
                                  type="file"
                                  ref="photoChoosen"
                                  style="display: none"
                                  @change="onFileSelected"
                                  accept="image/*"
                                />
                              </div>
                            </v-col>

                            <!-- Title Input -->
                            <v-col cols="12" class="mb-n6">
                              <v-text-field
                                label="Title"
                                v-model="title"
                                outlined
                                dense
                              ></v-text-field>
                            </v-col>

                            <!-- Type of Sports Input -->
                            <v-col cols="12" class="mb-n6">
                              <v-select
                                :items="sports"
                                label="Type of Sports"
                                v-model="sportType"
                                outlined
                                dense
                              ></v-select>
                              <h1
                                v-show="sportType == null || sportType != ''"
                                class="text-caption text-red mb-5 mt-n6"
                              >
                                <v-icon color="red" size="20"
                                  >mdi-alert-circle</v-icon
                                >
                                You cannot change this later!
                              </h1>
                            </v-col>

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

                            <!-- Open Tournament Switch -->
                            <v-col cols="12" class="mt-n10 mb-6 d-flex">
                              <v-switch
                                v-model="isOpen"
                                color="primary"
                                label="Open Tournament"
                                hide-details
                              ></v-switch>
                            </v-col>

                            <!-- Calendar Selection -->
                            <v-row class="mt-n9 mb-n12">
                              <!-- Left Block -->
                              <v-col cols="6">
                                <!-- Start Date Input -->
                                <v-col cols="12">
                                  <v-menu
                                    ref="menuStart"
                                    v-model="menuStart"
                                    :close-on-content-click="false"
                                    :return-value.sync="startDate"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="startDate_Format"
                                        label="Start Date"
                                        readonly
                                        dense
                                        outlined
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="startDate"
                                      :allowed-dates="allowedDates_Start"
                                      no-title
                                      scrollable
                                    >
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        text
                                        color="#6b46c1"
                                        @click="menuStart = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        text
                                        color="#6b46c1"
                                        @click="$refs.menuStart.save(startDate)"
                                      >
                                        OK
                                      </v-btn>
                                    </v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-col>

                              <!-- Right Block -->
                              <v-col cols="6">
                                <!-- End Date Input-->
                                <v-col cols="12">
                                  <v-menu
                                    ref="menuEnd"
                                    v-model="menuEnd"
                                    :close-on-content-click="false"
                                    :return-value.sync="endDate"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="endDate_Format"
                                        label="End Date"
                                        readonly
                                        dense
                                        outlined
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="endDate"
                                      :allowed-dates="allowedDates_End"
                                      no-title
                                      scrollable
                                    >
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        text
                                        color="#6b46c1"
                                        @click="menuEnd = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        text
                                        color="#6b46c1"
                                        @click="$refs.menuEnd.save(endDate)"
                                      >
                                        OK
                                      </v-btn>
                                    </v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-col>
                            </v-row>

                            <v-row class="mt-n9 mb-n12">
                              <!-- Left Block -->
                              <v-col cols="6">
                                <!-- Website URL Input -->
                                <v-col cols="12">
                                  <v-text-field
                                    label="Official Website URL"
                                    v-model="websiteURL"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                              </v-col>

                              <!-- Right Block -->
                              <v-col cols="6">
                                <!-- Phone Number Input-->
                                <v-col cols="12">
                                  <v-text-field
                                    label="Phone Number"
                                    v-model="phoneNumber"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                              </v-col>
                            </v-row>

                            <v-row class="mt-n9 mb-n9">
                              <!-- Left Block -->
                              <v-col cols="6">
                                <!-- Location Input -->
                                <v-col cols="12">
                                  <v-text-field
                                    label="Location"
                                    v-model="location"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                              </v-col>

                              <!-- Right Block -->
                              <v-col cols="6">
                                <!-- Email Input-->
                                <v-col cols="12">
                                  <v-text-field
                                    label="Email"
                                    v-model="email"
                                    type="email"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                              </v-col>
                            </v-row>

                            <!-- Description Input -->
                            <v-col cols="12" class="mb-n6">
                              <v-textarea
                                outlined
                                label="Description"
                                v-model="description"
                              ></v-textarea>
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
                                  <label class="text-grey"> Group Stage </label>
                                </v-col>
                                <v-col cols="9">
                                  <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
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
                                    <template v-slot:activator="{ on, attrs }">
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
                                      <v-text-field
                                        type="number"
                                        placeholder="3"
                                        v-model="gTeamNumbers"
                                        min="3"
                                        max="6"
                                        outlined
                                        dense
                                      ></v-text-field>
                                    </v-col>

                                    <v-col cols="9" class="mt-n1">
                                      <label class="text-grey"
                                        >teams compete in each group — <br />
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
                                      <v-select
                                        :items="teams"
                                        placeholder="2"
                                        type="number"
                                        v-model="gGroupNumber"
                                        outlined
                                        dense
                                      ></v-select>
                                    </v-col>

                                    <v-col cols="9" class="mt-2">
                                      <label class="text-grey"
                                        >number of groups in the first
                                        stage</label
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
                                    <template v-slot:activator="{ on, attrs }">
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
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>

              <v-row class="mt-n2">
                <v-col cols="6">
                  <v-btn
                    to="/organizer/auth/tournaments"
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
                    depressed
                    block
                    dark
                  >
                    <span v-if="isLoading == false"> Create </span>
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
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import notifications from '~/components/notifications'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

  components: {
    notifications,
  },

  data: () => ({
    // Basic Details Info
    sports: ['Football', 'Netball', 'Handball', 'Futsal', 'Basketball'],
    genderList: ['Male', 'Female'],
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623',
    sportType: '',
    hostName: '',
    websiteURL: '',
    phoneNumber: '',
    location: '',
    email: '',
    gender: null,
    isOpen: false,

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

    // Photo Selection
    selectedFile: null,
    isFileUploaded: false,
    uploadPercentage: null,

    // Calendar Selection
    menuStart: false,
    menuEnd: false,

    // Loading State
    isLoading: false,
  }),

  computed: {
    // Get Number of Participants
    result: function () {
      return (this.participants = this.gTeamNumbers * this.gGroupNumber)
    },

    // Formating Date (YYYY-MM-DD) to (DD MMMM YYYY)
    startDate_Format: function () {
      if (this.startDate == '') {
        return null
      } else {
        return moment(this.startDate, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    },

    // Formating Date (YYYY-MM-DD) to (DD MMMM YYYY)
    endDate_Format: function () {
      if (this.endDate == '') {
        return null
      } else {
        return moment(this.endDate, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    },
  },

  // Fetch & Refresh User's Data
  mounted() {
    var userId = this.$fire.auth.currentUser.uid
    this.hostName = userId
  },

  methods: {
    allowedDates_Start(val) {
      return val >= moment().format('YYYY-MM-DD')
    },

    allowedDates_End(val) {
      if (this.startDate == '') {
        return val >= moment().format('YYYY-MM-DD')
      } else {
        return val >= this.startDate
      }
    },

    // Upload Profile Photo
    choosePhoto() {
      this.$refs.photoChoosen.click()
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      this.onUploadProfilePhoto()
    },

    onUploadProfilePhoto() {
      var metadata = {
        contentType: 'image/jpeg',
      }
      var storageRef = this.$fire.storage
        .ref()
        .child('tournamentPhotos/' + this.selectedFile.name)
      var uploadTask = storageRef.put(this.selectedFile, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + Math.round(progress) + '% done')
          this.uploadPercentage = Math.round(progress)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
          this.isFileUploaded = true
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('storage/unauthorized')
              break
            case 'storage/canceled':
              console.log('storage/canceled')
              break
            case 'storage/unknown':
              console.log('storage/unknown')
              break
          }
          this.isFileUploaded = false
        },
        (complete) => {
          const storageRef = this.$fire.storage
            .ref()
            .child('tournamentPhotos/' + this.selectedFile.name)
          const url = storageRef.getDownloadURL().then((url) => {
            this.photoURL = url
          })
          console.log('File successfully uploaded.')
          this.isFileUploaded = false
        }
      )
    },

    // Create Tournament
    async createTournament() {
      // Loading state -> true
      this.isLoading = true

      try {
        // Generate permalink for tournamentID
        function doDashes(str) {
          var re = /[^a-z0-9]+/gi
          var re2 = /^-*|-*$/g
          str = str.replace(re, '-')
          return str.replace(re2, '').toLowerCase()
        }

        if (this.gTeamNumbers < 3 || this.gTeamNumbers > 6) {
          // Loading State -> False
          this.isLoading = false
          // Notify User -> Form Validation Error
          this.$store.commit('SET_NOTIFICATION', {
            alert:
              'Please pick number of teams compete in each group between 3 to 6 only.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          // Create & Store Tournament to Firestore
          await this.$fire.firestore
            .collection('tournaments')
            .doc(doDashes(this.title))
            .set({
              // Basic Details
              tournamentID: doDashes(this.title),
              title: this.title,
              description: this.description,
              startDate: this.startDate,
              endDate: this.endDate,
              photoURL: this.photoURL,
              headerURL:
                'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fdefault-cover.svg?alt=media&token=f88fa494-e5ae-49a1-bdf5-30ae75fad015',
              sportType: this.sportType,
              hostName: this.hostName,
              websiteURL: this.websiteURL,
              phoneNumber: this.phoneNumber,
              location: this.location,
              email: this.email,
              status: false,
              isOpen: this.isOpen,
              gender: this.gender,

              // Registration Data
              managerRef: [],
              registrationStatus: false,

              // List Requested Manager
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
              .collection('tournaments')
              .doc(doDashes(this.title))
              .collection('group-stage')
              .doc('seedings')
              .set({ group_A: [], group_B: [] })
          } else if (this.gGroupNumber == 4) {
            await this.$fire.firestore
              .collection('tournaments')
              .doc(doDashes(this.title))
              .collection('group-stage')
              .doc('seedings')
              .set({ group_A: [], group_B: [], group_C: [], group_D: [] })
          } else if (this.gGroupNumber == 8) {
            await this.$fire.firestore
              .collection('tournaments')
              .doc(doDashes(this.title))
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
                .collection('tournaments')
                .doc(doDashes(this.title))
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
                .collection('tournaments')
                .doc(doDashes(this.title))
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
                .collection('tournaments')
                .doc(doDashes(this.title))
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

          // Update tournamentID in Users Collection
          await this.$fire.firestore
            .collection('users')
            .doc(this.hostName)
            .update({
              tournamentsRef: firebase.firestore.FieldValue.arrayUnion(
                doDashes(this.title)
              ),
            })
            .then(() => {
              // Loading State -> False
              this.isLoading = false
              // Push Current Page -> Tournament List
              this.$router.push('/organizer/auth/tournaments')
            })
        }
      } catch (error) {
        // Loading State -> False
        this.isLoading = false
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
