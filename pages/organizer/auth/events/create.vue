<template>
  <v-app>
    <v-main class="mx-md-10 mx-lg-15 px-lg-15 mx-xl-n5 px-xl-0 py-0">
      <v-container class="p-0" fluid>
        <div class="mx-xl-15 px-xl-15">
          <div class="mx-xl-15 px-xl-15">
            <div class="mx-xl-15 px-xl-15">
              <!-- Notifications -->
              <notifications />

              <!-- Event registration title -->
              <h1 class="text-h4 font-weight-black text-center mt-6 mb-3">
                Create an event
              </h1>
              <h1 class="text-subtitle-2 font-weight-regular text-center mb-10">
                Learn all about spotz events with this
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
                <!-- Event Details Part -->
                <v-row class="mb-5">
                  <v-col>
                    <v-card class="mx-auto py-5" outlined>
                      <v-row>
                        <v-col cols="12">
                          <div class="px-15">
                            <h1 class="text-subtitle-1 font-weight-bold mb-1">
                              Basic Details
                            </h1>

                            <h1 class="text-caption text-grey">
                              * Required field
                            </h1>

                            <v-row class="d-block">
                              <!-- PhotoURL Input -->
                              <v-col cols="12" class="mb-2 text-center">
                                <v-avatar class="mb-8" size="150" rounded>
                                  <img
                                    v-if="!isFileUploaded"
                                    :src="photoURL"
                                    alt="..."
                                  />

                                  <template v-else>
                                    <v-overlay
                                      absolute
                                      opacity="0"
                                      value="true"
                                    >
                                      <v-progress-circular
                                        indeterminate
                                        color="primary"
                                      ></v-progress-circular>
                                    </v-overlay>
                                  </template>
                                </v-avatar>

                                <div class="mt-n15 ml-15">
                                  <v-btn
                                    @click="choosePhoto"
                                    class="ml-15"
                                    color="#1a202c"
                                    :disabled="isFileUploaded"
                                    fab
                                    small
                                  >
                                    <v-icon color="white" size="20"
                                      >mdi-camera</v-icon
                                    >
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
                                <ValidationProvider
                                  v-slot="{ errors }"
                                  name="Title"
                                  rules="required"
                                >
                                  <v-text-field
                                    label="Title*"
                                    v-model="title"
                                    :error-messages="errors"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </ValidationProvider>
                              </v-col>

                              <!-- Open Event Switch -->
                              <v-col cols="12" class="mt-n10 mb-6 d-flex">
                                <v-switch
                                  v-model="isOpen"
                                  color="primary"
                                  label="Open Event"
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
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-text-field
                                          v-model="startDate_Format"
                                          label="Start Date*"
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
                                          @click="
                                            $refs.menuStart.save(startDate)
                                          "
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
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-text-field
                                          v-model="endDate_Format"
                                          label="End Date*"
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
                                      label="Organizer Website"
                                      placeholder="www.example.com"
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
                                      placeholder="012-3456789 or 01-23456789"
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
                                      placeholder="State, Country"
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
                                      label="Organizer Email"
                                      v-model="email"
                                      placeholder="username@email.com"
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
                                  label="Event Description"
                                  v-model="description"
                                ></v-textarea>
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
                      to="/organizer/auth/events"
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
                      @click="createEvent"
                      class="font-weight-regular text-capitalize"
                      :disabled="invalid"
                      color="primary"
                      depressed
                      block
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
import 'firebase/storage'
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
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623',
    hostName: '',
    websiteURL: '',
    phoneNumber: '',
    location: '',
    email: '',
    isOpen: false,

    // Event Info
    eventID: '',

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

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.hostName = user.uid
      } else {
        this.$router.push('/')
      }
    })
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
        .child('eventPhotos/' + this.selectedFile.name)
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
            .child('eventPhotos/' + this.selectedFile.name)
          const url = storageRef.getDownloadURL().then((url) => {
            this.photoURL = url
          })
          console.log('File successfully uploaded.')
          this.isFileUploaded = false
        }
      )
    },

    // Create Event
    async createEvent() {
      // Loading state -> true
      this.isLoading = true

      try {
        // Generate permalink for eventID
        function doDashes(str) {
          var re = /[^a-z0-9]+/gi
          var re2 = /^-*|-*$/g
          str = str.replace(re, '-')
          return str.replace(re2, '').toLowerCase()
        }

        // Generate unique eventID
        var uniqid = require('uniqid')
        this.eventID = uniqid(doDashes(this.title) + '-')

        if (this.startDate_Format == null) {
          // Loading State -> False
          this.isLoading = false
          // Notify User -> Form Validation Error
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Start Date cannot be empty.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else if (this.endDate_Format == null) {
          // Loading State -> False
          this.isLoading = false
          // Notify User -> Form Validation Error
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'End Date cannot be empty.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          // Create & Store Event to Firestore
          await this.$fire.firestore
            .collection('events')
            .doc(this.eventID)
            .set({
              // Basic Details
              eventID: this.eventID,
              title: this.title,
              description: this.description,
              startDate: this.startDate_Format,
              endDate: this.endDate_Format,
              photoURL: this.photoURL,
              headerURL:
                'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fdefault-cover.svg?alt=media&token=f88fa494-e5ae-49a1-bdf5-30ae75fad015',
              hostName: this.hostName,
              websiteURL: this.websiteURL,
              phoneNumber: this.phoneNumber,
              location: this.location,
              email: this.email,
              status: false,
              isOpen: this.isOpen,

              // Sponsorship Data
              sponsorship: [],

              // Organizer Collaborator
              collabRef: [],

              // Tournament ID Reference
              tournamentRef: [],
            })

          // Update EventID in Users Collection
          await this.$fire.firestore
            .collection('users')
            .doc(this.hostName)
            .update({
              eventsRef: firebase.firestore.FieldValue.arrayUnion(this.eventID),
            })
            .then(() => {
              // Loading State -> False
              this.isLoading = false
              // Push Current Page -> Event List
              this.$router.push('/organizer/auth/events')
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
