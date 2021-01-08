<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined tile>
        <!-- Header Picture -->
        <v-img :src="eventRef.headerURL" height="300px">
          <v-btn
            color="#1a202c"
            class="mb-10"
            @click="chooseHeader"
            :disabled="isHeaderUploaded"
            fab
            small
            absolute
            bottom
            right
          >
            <v-icon size="20" color="white" v-if="!isHeaderUploaded"
              >mdi-camera</v-icon
            >
            <template v-else>
              <v-progress-circular
                indeterminate
                color="white"
              ></v-progress-circular>
            </template>
          </v-btn>
          <input
            type="file"
            ref="headerChoosen"
            style="display: none"
            @change="onHeaderSelected"
            accept="image/*"
          />
        </v-img>

        <v-row class="px-10 d-sm-block d-md-flex">
          <v-col cols="12" class="d-sm-block d-md-flex">
            <!-- Profile Picture -->
            <div class="mr-5 mt-n7">
              <v-avatar class="mt-n15" size="150" rounded>
                <img
                  v-if="!isImageUploaded"
                  :src="eventRef.photoURL"
                  alt="..."
                />

                <template v-else>
                  <v-overlay absolute color="white" opacity="0.5" value="true">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-overlay>
                </template>
              </v-avatar>

              <div class="mt-n8 ml-15">
                <v-btn
                  @click="choosePhoto"
                  class="ml-15"
                  color="#1a202c"
                  :disabled="isImageUploaded"
                  fab
                  small
                >
                  <v-icon color="white" size="20">mdi-camera</v-icon>
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

            <v-row class="mx-1 mt-4 d-block">
              <v-row class="d-flex align-center mt-n6">
                <!-- Title -->
                <v-col cols="8" md="7" xl="9">
                  <h1 class="text-h4 font-weight-bold mb-md-n3">
                    {{ eventRef.title }} &mdash; {{ tournamentRef.sportType }}
                  </h1>
                </v-col>

                <!-- Hostname -->
                <v-col cols="4" md="5" xl="3" class="d-flex justify-end">
                  <v-card outlined class="d-flex align-center py-2 px-4">
                    <v-avatar size="50">
                      <img :src="hostnameProf.photoURL" alt="..." />
                    </v-avatar>
                    <h1 class="text-subtitle-2 font-weight-medium ml-3">
                      Organized by <br />{{ hostnameProf.name }}
                    </h1>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <!-- Description -->
                <v-col cols="7">
                  <h1
                    class="text-subtitle-2 text-justify font-weight-regular mt-n3 mt-md-0 mt-lg-n0 mt-xl-n3"
                  >
                    {{ eventRef.description }}
                  </h1>
                </v-col>
                <v-col></v-col>
              </v-row>

              <v-divider class="mt-3"></v-divider>

              <div class="d-inline-flex mb-3">
                <!-- Teams -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-account-group</v-icon>
                  {{ tournamentRef.participants }} Teams
                </h1>

                <!-- Gender -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-gender-male-female</v-icon>
                  {{ tournamentRef.gender }}
                </h1>

                <!-- Sports Type -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-stadium</v-icon>
                  {{ tournamentRef.sportType }}
                </h1>

                <!-- Format -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-trophy</v-icon>
                  {{ tournamentRef.gStage }} &rarr; {{ tournamentRef.fStage }}
                </h1>
              </div>
            </v-row>
          </v-col>
        </v-row>

        <!-- Tab Route -->
        <v-row class="mx-2">
          <v-tabs centered>
            <v-tab
              v-for="tab in tabs"
              :key="tab.name"
              class="text-caption font-weight-medium"
              :to="tab.route"
            >
              {{ tab.name }}
            </v-tab>
          </v-tabs>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      tabs: [
        {
          name: 'Overview',
          route: `/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/overview`,
        },
        {
          name: 'Group Stage',
          route: `/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/groupstage`,
        },
        {
          name: 'Final Stage',
          route: `/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/finalstage`,
        },
        {
          name: 'Participants',
          route: `/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/participants`,
        },
        {
          name: 'Settings',
          route: `/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/settings`,
        },
      ],

      // User Input Data
      photoURL: '',
      headerURL: '',
      eventRef: '',
      tournamentRef: '',
      hostnameProf: '',
      startDate: '',
      endDate: '',

      // Profile Picture
      selectedFile: null,
      selectedHeader: null,
      uploadPercentage: null,
      isImageUploaded: false,
      isHeaderUploaded: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            this.eventRef = doc.data()
            this.startDate = doc.data().startDate
            this.endDate = doc.data().endDate

            this.$fire.firestore
              .collection('users')
              .doc(doc.data().hostName)
              .onSnapshot((docRef) => {
                this.hostnameProf = docRef.data()
              })
          })

        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            this.tournamentRef = doc.data()
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Upload Organization Photo
    choosePhoto() {
      this.$refs.photoChoosen.click()
    },

    onFileSelected(Organization) {
      this.selectedFile = Organization.target.files[0]

      // Check Format of Picture
      if (
        this.selectedFile.type === 'image/png' ||
        this.selectedFile.type === 'image/jpg' ||
        this.selectedFile.type === 'image/jpeg' ||
        this.selectedFile.type === 'image/svg+xml' ||
        this.selectedFile.tupe === 'image/svg'
      ) {
        this.onUploadPhoto()
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

    onUploadPhoto() {
      var metadata = {
        contentType: this.selectedFile.type,
      }

      var storageRef = this.$fire.storage
        .ref()
        .child('organizationPhotos/' + this.selectedFile.name)

      var uploadTask = storageRef.put(this.selectedFile, metadata)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log('Upload is ' + Math.round(progress) + '% done')
          this.uploadPercentage = Math.round(progress)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // console.log('Upload is running')
              break
          }
          this.isImageUploaded = true
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
          this.isImageUploaded = false
        },

        (complete) => {
          const storageRef = this.$fire.storage
            .ref()
            .child('organizationPhotos/' + this.selectedFile.name)

          const url = storageRef.getDownloadURL().then((url) => {
            this.photoURL = url
            // console.log(this.photoURL)
            this.updatePhoto()
          })

          // console.log('File successfully uploaded.')
          this.isImageUploaded = false
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Your profile picture is successfully uploaded',
            alertIcon: 'mdi-cloud-check',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'green darken-1',
            snackbar: true,
          })
        }
      )
    },

    // Upload Header Photo
    chooseHeader() {
      this.$refs.headerChoosen.click()
    },

    onHeaderSelected(Organization) {
      this.selectedHeader = Organization.target.files[0]

      // Check Format of Picture
      if (
        this.selectedHeader.type === 'image/png' ||
        this.selectedHeader.type === 'image/jpg' ||
        this.selectedHeader.type === 'image/jpeg' ||
        this.selectedHeader.type === 'image/svg+xml' ||
        this.selectedHeader.tupe === 'image/svg'
      ) {
        this.onUploadHeader()
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

    onUploadHeader() {
      var metadata = {
        contentType: this.selectedHeader.type,
      }

      var storageRef = this.$fire.storage
        .ref()
        .child('organizerImages/' + this.selectedHeader.name)

      var uploadTask = storageRef.put(this.selectedHeader, metadata)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // console.log('Upload is ' + Math.round(progress) + '% done')
          this.uploadPercentage = Math.round(progress)
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // console.log('Upload is paused')
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // console.log('Upload is running')
              break
          }
          this.isHeaderUploaded = true
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
          this.isHeaderUploaded = false
        },

        (complete) => {
          const storageRef = this.$fire.storage
            .ref()
            .child('organizerImages/' + this.selectedHeader.name)

          const url = storageRef.getDownloadURL().then((url) => {
            this.headerURL = url
            // console.log(this.headerURL)
            this.updateHeader()
          })

          // console.log('File successfully uploaded.')
          this.isHeaderUploaded = false
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Your header picture is successfully uploaded',
            alertIcon: 'mdi-cloud-check',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'green darken-1',
            snackbar: true,
          })
        }
      )
    },

    // Update Photo & Header Database
    async updatePhoto() {
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            photoURL: this.photoURL,
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

    async updateHeader() {
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            headerURL: this.headerURL,
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
