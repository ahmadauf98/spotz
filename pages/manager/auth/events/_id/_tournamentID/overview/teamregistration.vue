<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventTourHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <!-- Team Registration -->
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9 mb-5" outlined tile>
              <div class="d-flex align-center">
                <h1 class="text-h6 font-weight-bold mb-1">Team Registration</h1>
                <h1
                  class="text-caption font-weight-bold text-grey ml-auto text-red"
                >
                  <v-icon color="red darken-1" size="20"
                    >mdi-calendar-clock</v-icon
                  >
                  Due Date:
                  {{ tournamentFormat.dueDate }}
                </h1>
              </div>

              <div>
                <h1 class="text-caption text-grey">
                  Please register your players before the due date. Preferable
                  to do it early because you can resubmit your application if
                  your application is rejected by the organizer.
                </h1>
              </div>

              <v-divider class="mt-5"></v-divider>

              <ValidationObserver ref="observer" v-slot="{ invalid }">
                <div class="d-flex align-center mt-n4">
                  <v-icon class="mr-3" size="50">mdi-account-multiple</v-icon>
                  <div class="d-block">
                    <h1 class="text-subtitle-1 font-weight-medium">
                      Team Name
                    </h1>
                  </div>
                  <v-col cols="5" class="mt-6 d-flex">
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Team Name"
                      rules="required"
                    >
                      <v-text-field
                        v-model="tempTeamName"
                        :error-messages="errors"
                        outlined
                        dense
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-btn
                    v-if="teamName == ''"
                    @click="onSet"
                    :disabled="tempTeamName == ''"
                    class="ml-auto text-capitalize"
                    color="primary"
                    outlined
                    >Set</v-btn
                  >

                  <v-btn
                    v-else
                    @click="onUpdate"
                    class="ml-auto text-capitalize"
                    color="primary"
                    :disabled="invalid"
                    outlined
                    >Update</v-btn
                  >
                </div>
              </ValidationObserver>

              <v-divider v-if="teamName == ''" class="mt-n4"></v-divider>
              <v-divider v-else class="mt-n4 mb-4 ml-15"></v-divider>

              <div v-show="teamName != ''">
                <div class="d-flex align-center">
                  <v-icon class="mr-3 self-align-top" size="50"
                    >mdi-file-document-edit</v-icon
                  >
                  <div class="d-block">
                    <h1 class="text-subtitle-1 font-weight-medium">
                      Registration form
                    </h1>

                    <h1
                      v-if="availablePlayers == 0"
                      class="text-caption text-grey"
                    >
                      No Players Available
                    </h1>
                    <h1 v-else class="text-caption text-grey">
                      {{ availablePlayers }} Players Available
                    </h1>
                  </div>

                  <v-btn
                    v-show="availablePlayers != 0"
                    class="ml-auto text-capitalize"
                    color="green darken-1"
                    @click="addPlayerOverlay = !addPlayerOverlay"
                    small
                    dark
                    depressed
                  >
                    Add Player</v-btn
                  >
                </div>

                <v-card
                  v-show="lengthListPlayers != 0"
                  class="pa-4 ml-15"
                  color="white"
                  outlined
                >
                  <v-divider class="mb-5"></v-divider>

                  <v-simple-table class="mt-n5">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Player Name</th>
                          <th class="text-center">Identification ID</th>
                          <th class="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="list in listPlayers"
                          :key="list.identificationID"
                          class="text-center"
                        >
                          <td class="text-left">{{ list.name }}</td>
                          <td>{{ list.identificationID }}</td>
                          <td>
                            <v-btn
                              @click="onViewPlayer(list)"
                              class="mx-1 text-capitalize"
                              color="yellow darken-3"
                              depressed
                              small
                              dark
                              >View</v-btn
                            >

                            <!-- Delete Players -->
                            <v-menu>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-bind="attrs"
                                  v-on="on"
                                  class="mx-1 text-capitalize"
                                  color="red darken-1"
                                  depressed
                                  small
                                  dark
                                  >Delete</v-btn
                                >
                              </template>
                              <v-list>
                                <v-list-item @click="onDeletePlayer(list)">
                                  <v-list-item-title class="text-subtitle-2">
                                    Delete Player
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

                <v-divider class="mt-4 mb-5"></v-divider>

                <div class="d-flex">
                  <v-btn
                    :disabled="availablePlayers != 0"
                    @click="onSubmit"
                    class="ml-auto font-weight-regular text-capitalize"
                    color="primary"
                    depressed
                    >Submit</v-btn
                  >
                </div>
              </div>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>

          <!-- Add Player Overlay -->
          <v-overlay :opacity="opacity" :value="addPlayerOverlay">
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <v-card
                class="mx-auto py-5 px-10 black--text d-block align-center"
                min-height="300"
                width="700"
                color="white"
                light
                outlined
              >
                <div>
                  <v-btn
                    @click="addPlayerOverlay = false"
                    class="mt-n3 ml-n8"
                    icon
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </div>

                <div class="d-flex justify-center">
                  <v-avatar
                    v-show="tournamentFormat.passportPhoto == true"
                    class="profile"
                    color="grey"
                    size="114"
                  >
                    <v-img
                      v-if="!isFileUploaded"
                      :src="passportPhoto"
                      alt="..."
                    >
                    </v-img>

                    <template v-else>
                      <v-overlay absolute opacity="0" value="true">
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </v-overlay>
                    </template>
                  </v-avatar>

                  <!-- File Input Button -->
                  <div
                    v-show="tournamentFormat.passportPhoto == true"
                    class="mt-7 ml-n4"
                  >
                    <v-btn
                      @click="choosePhoto"
                      class="mt-15"
                      color="#1a202c"
                      :disabled="isFileUploaded"
                      fab
                      x-small
                    >
                      <v-icon color="white" size="18">mdi-camera</v-icon>
                    </v-btn>
                    <input
                      type="file"
                      ref="photoChoosen"
                      style="display: none"
                      @change="onFileSelected"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div class="d-block align-center mt-n2">
                  <v-card-text>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Player Name"
                      rules="required"
                    >
                      <v-text-field
                        v-show="tournamentFormat.name == true"
                        v-model="name"
                        class="mt-3"
                        color="primary"
                        label="Player Name"
                        :error-messages="errors"
                        outlined
                        dense
                      ></v-text-field>
                    </ValidationProvider>

                    <v-row class="d-flex mt-n4">
                      <v-col cols="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="ID Number"
                          rules="required"
                        >
                          <v-text-field
                            v-show="tournamentFormat.identificationID == true"
                            v-model="identificationID"
                            :error-messages="errors"
                            class="mr-2"
                            color="primary"
                            label="Identification Number"
                            outlined
                            dense
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="6">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Gender"
                          rules="required"
                        >
                          <v-select
                            v-show="tournamentFormat.gender == true"
                            v-model="gender"
                            class="ml-2"
                            color="primary"
                            label="Gender"
                            :error-messages="errors"
                            :items="genderList"
                            outlined
                            dense
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Address"
                      rules="required"
                    >
                      <v-textarea
                        v-show="tournamentFormat.address == true"
                        v-model="address"
                        :error-messages="errors"
                        class="mt-n4"
                        color="primary"
                        label="Address"
                        outlined
                        dense
                      ></v-textarea>
                    </ValidationProvider>

                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Phone Number"
                      :rules="{ regex: /^[0-9,+,-]+$/ }"
                    >
                      <v-text-field
                        v-show="tournamentFormat.phoneNumber == true"
                        v-model="phoneNumber"
                        :error-messages="errors"
                        class="mt-n1"
                        color="primary"
                        label="Phone Number"
                        outlined
                        dense
                      ></v-text-field>
                    </ValidationProvider>

                    <v-text-field
                      v-show="tournamentFormat.numMatric == true"
                      v-model="numMatric"
                      class="mt-n1"
                      color="primary"
                      label="Matric ID Number"
                      outlined
                      dense
                    ></v-text-field>

                    <v-text-field
                      v-show="tournamentFormat.numAthelete == true"
                      v-model="numAthelete"
                      class="mt-n1"
                      color="primary"
                      label="Athelete ID Number"
                      outlined
                      dense
                    ></v-text-field>
                  </v-card-text>
                </div>

                <div class="d-flex mt-n4 mb-1 px-4">
                  <v-btn
                    @click="onAddPlayer"
                    class="ml-auto font-weight-regular text-capitalize"
                    color="primary"
                    :disabled="invalid"
                    depressed
                    >Add Player</v-btn
                  >
                </div>
              </v-card>
            </ValidationObserver>
          </v-overlay>

          <!-- View Player Overlay -->
          <v-overlay :opacity="opacity" :value="viewPlayerOverlay">
            <v-card
              class="mx-auto py-5 px-10 black--text d-block align-center"
              min-height="300"
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

              <div class="d-flex justify-center">
                <v-avatar
                  v-show="tournamentFormat.passportPhoto != false"
                  class="profile"
                  color="grey"
                  size="114"
                >
                  <v-img :src="vpassportPhoto"></v-img>
                </v-avatar>
              </div>

              <div
                v-show="tournamentFormat.name != false"
                class="d-flex justify-center mt-4"
              >
                <h1 class="text-h4 font-weight-light">{{ vName }}</h1>
              </div>

              <div
                v-show="tournamentFormat.identificationID != false"
                class="d-flex justify-center"
              >
                <h1 class="text-h6 font-weight-light text-grey">
                  {{ vIdentificationID }}
                </h1>
              </div>

              <div
                v-show="tournamentFormat.gender != false"
                class="d-flex justify-center mt-4"
              >
                <div class="text-center mx-5">
                  <h1 class="text-h6 font-weight-light text-grey">Gender</h1>
                  <h1 class="text-body-1 mt-n1">{{ vGender }}</h1>
                </div>

                <div
                  v-show="tournamentFormat.numAthelete != false"
                  class="text-center mx-5"
                >
                  <h1 class="text-h6 font-weight-light text-grey">
                    Athelete ID
                  </h1>
                  <h1 class="text-body-1 mt-n1">{{ vNumAthelete }}</h1>
                </div>

                <div
                  v-show="tournamentFormat.numMatric != false"
                  class="text-center mx-5"
                >
                  <h1 class="text-h6 font-weight-light text-grey">Matric ID</h1>
                  <h1 class="text-body-1 mt-n1">{{ vNumMatric }}</h1>
                </div>
              </div>

              <div
                v-show="tournamentFormat.address != false"
                class="d-flex justify-center mt-4"
              >
                <h1 class="text-h6 font-weight-light text-grey text-center">
                  {{ vAddress }}
                </h1>
              </div>

              <div class="d-flex justify-center mt-3">
                <v-chip
                  v-show="tournamentFormat.phoneNumber != false"
                  class="ma-2"
                  color="primary"
                >
                  {{ vPhoneNumber }}
                </v-chip>
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
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import eventTourHeader from '~/components/manager/eventTourHeader'
import eventSponsorship from '~/components/manager/eventSponsorship'
import notifications from '~/components/notifications'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'manager',

  components: {
    eventTourHeader,
    eventSponsorship,
    notifications,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data() {
    return {
      // User Selection
      genderList: ['Male', 'Female'],

      // User Input Data
      tournamentFormat: '',
      numPlayers: null,
      tempTeamName: '',
      teamName: '',
      listPlayers: '',
      lengthListPlayers: null,
      availablePlayers: null,

      // Player Registration Input Data
      name: '',
      identificationID: '',
      gender: null,
      address: '',
      phoneNumber: '',
      numMatric: '',
      numAthelete: '',
      passportPhoto:
        'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623',

      // View Player Data
      vName: '',
      vIdentificationID: '',
      vGender: null,
      vAddress: '',
      vPhoneNumber: '',
      vNumMatric: '',
      vNumAthelete: '',
      vpassportPhoto: '',

      // Passport Picture
      selectedFile: '',
      isFileUploaded: false,
      uploadPercentage: null,

      // User Authentication
      userId: '',

      // Overlay Data
      opacity: 0.5,
      addPlayerOverlay: false,
      viewPlayerOverlay: false,

      // Refresh Overlay
      opacityLoading: 1,
      overlayLoading: false,
    }
  },

  // Fetch Data from firestore
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid

        // Validate Account Credential
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            if (doc.exists) {
              const findManagerId = doc
                .data()
                .managerRef.find((element) => element.uid == user.uid)

              this.managerStatus = findManagerId.status

              if (this.managerStatus == 'disabled') {
                console.log('Manager Status Disabled')
                this.$router.replace(
                  `/manager/auth/tournaments/${this.$route.params.id}/overview`
                )
              }

              if (typeof findManagerId == 'undefined') {
                console.log('No Credential')
                this.$router.replace('/manager/auth/dashboard')
              }
            }
          })

        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(this.userId)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.teamName = doc.data().teamName
              this.tempTeamName = this.teamName
              this.listPlayers = doc.data().listPlayers
              this.lengthListPlayers = this.listPlayers.length

              if (
                doc.data().status == 'pending' ||
                doc.data().status == 'approved'
              ) {
                console.log('Registration Status Void')
                this.$router.replace(
                  `/manager/auth/tournaments/${this.$route.params.id}/overview`
                )
              }
            }
          })

        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc('format')
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.tournamentFormat = doc.data()
              this.numPlayers = doc.data().numPlayers
              this.availablePlayers =
                Number(this.numPlayers) - this.lengthListPlayers
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Upload Profile Photo
    choosePhoto() {
      this.$refs.photoChoosen.click()
    },

    onFileSelected(event) {
      this.selectedFile = event.target.files[0]

      // Check Format of Picture
      if (
        this.selectedFile.type === 'image/png' ||
        this.selectedFile.type === 'image/jpg' ||
        this.selectedFile.type === 'image/jpeg' ||
        this.selectedFile.type === 'image/svg+xml' ||
        this.selectedFile.tupe === 'image/svg'
      ) {
        this.onUploadProfilePhoto()
      } else {
        this.$store.commit('SET_NOTIFICATION', {
          alert: 'Error format, please try again.',
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    onUploadProfilePhoto() {
      var metadata = {
        contentType: this.selectedFile.type,
      }

      var storageRef = this.$fire.storage
        .ref()
        .child('playersPhotos/' + this.selectedFile.name)

      var uploadTask = storageRef.put(this.selectedFile, metadata)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + Math.round(progress) + '% done')
          this.uploadPercentage = Math.round(progress)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // console.log('Upload is running')
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
            .child('playersPhotos/' + this.selectedFile.name)

          const url = storageRef.getDownloadURL().then((url) => {
            this.passportPhoto = url
          })

          console.log('File successfully uploaded.')
          this.isFileUploaded = false
        }
      )
    },

    // Set Team Name
    async onSet() {
      this.overlayLoading = true
      try {
        this.teamName = this.tempTeamName
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(this.userId)
          .set({
            teamName: this.teamName,
            listPlayers: [],
            status: '',
            uid: this.userId,
          })
          .then(() => {
            this.overlayLoading = false
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

    // Update Team Name
    async onUpdate() {
      this.overlayLoading = true
      try {
        this.teamName = this.tempTeamName
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(this.userId)
          .update({
            teamName: this.teamName,
          })
          .then(() => {
            this.overlayLoading = false
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

    // Update Players
    async onAddPlayer() {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(this.userId)
          .update({
            listPlayers: firebase.firestore.FieldValue.arrayUnion({
              name: this.name,
              identificationID: this.identificationID,
              gender: this.gender,
              address: this.address,
              phoneNumber: this.phoneNumber,
              numMatric: this.numMatric,
              numAthelete: this.numAthelete,
              passportPhoto: this.passportPhoto,
            }),
          })
          .then(() => {
            this.addPlayerOverlay = false
            this.availablePlayers =
              Number(this.numPlayers) - this.lengthListPlayers
            this.name = ''
            this.identificationID = ''
            this.gender = null
            this.address = ''
            this.phoneNumber = ''
            this.numMatric = ''
            this.numAthelete = ''
            this.passportPhoto =
              'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623'
            this.overlayLoading = false
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'Player has been added',
              alertIcon: 'mdi-check-circle',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
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

    // View Players
    onViewPlayer(data) {
      this.viewPlayerOverlay = true
      this.vName = data.name
      this.vIdentificationID = data.identificationID
      this.vGender = data.gender
      this.vAddress = data.address
      this.vPhoneNumber = data.phoneNumber
      this.vNumMatric = data.numMatric
      this.vNumAthelete = data.numAthelete
      this.vpassportPhoto = data.passportPhoto
    },

    // Delete Players
    async onDeletePlayer(data) {
      this.overlayLoading = true
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(this.userId)
          .update({
            listPlayers: firebase.firestore.FieldValue.arrayRemove({
              name: data.name,
              identificationID: data.identificationID,
              gender: data.gender,
              address: data.address,
              phoneNumber: data.phoneNumber,
              numMatric: data.numMatric,
              numAthelete: data.numAthelete,
              passportPhoto: data.passportPhoto,
            }),
          })
          .then(() => {
            this.overlayLoading = false
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'Player has been deleted',
              alertIcon: 'mdi-check-circle',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
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

    // Submit Application
    async onSubmit() {
      this.overlayLoading = true
      try {
        this.teamName = this.tempTeamName
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .doc(this.userId)
          .update({
            status: 'pending',
          })
          .then(() => {
            this.$router.go(-1)
            this.overlayLoading = false
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
  },
}
</script>
