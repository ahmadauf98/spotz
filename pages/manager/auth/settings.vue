<template>
  <v-app>
    <v-main class="mx-md-10 mx-lg-15 px-lg-15 py-0 mb-10">
      <v-container class="p-0" fluid>
        <div class="mx-xl-15 px-xl-15">
          <!-- Notifications -->
          <notifications />

          <!-- Title -->
          <h1 class="my-5">Settings</h1>

          <v-row>
            <v-col>
              <v-card class="mx-auto" outlined>
                <v-row>
                  <!-- Left Part -->
                  <v-col cols="12" md="7" lg="8">
                    <div class="px-5">
                      <!-- Subtitle -->
                      <h1 class="text-subtitle-1 font-weight-bold mb-8">
                        Account
                      </h1>

                      <!-- Title -->
                      <h1 class="text-h5 font-weight-medium mb-2">
                        Choose how you appear and what you see on Spotz
                      </h1>

                      <!-- Email Information -->
                      <h1 class="text-subtitle-2 font-weight-regular mb-5">
                        Signed in as {{ email }}
                      </h1>

                      <!-- Verification Account Infomation -->
                      <h1
                        v-if="emailVerified === true"
                        class="text-subtitle-2 font-weight-regular mb-5 text-green"
                      >
                        Your account has been verified.
                      </h1>
                      <h1
                        v-if="emailVerified === false"
                        class="text-subtitle-2 font-weight-regular mb-5 text-red"
                      >
                        Your account is not verified yet.
                        <a
                          class="text-red text-hover"
                          type="submit"
                          @click="emailVerification"
                          >Click here to verify.</a
                        >
                      </h1>
                    </div>
                  </v-col>

                  <!-- Right Part -->
                  <v-col cols="12" md="4" class="d-none d-md-flex">
                    <!-- Local Images -->
                    <div class="px-5 py-md-0 py-lg-0">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Faccount-settings.svg?alt=media&token=d0203ee9-b898-464a-9ead-4720713d9d81"
                        width="250px"
                        alt="..."
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card class="mx-auto" outlined>
                <v-row>
                  <v-col cols="12">
                    <div class="px-5">
                      <!-- Subtitle -->
                      <h1 class="text-subtitle-1 font-weight-bold mb-1">
                        Profile
                      </h1>

                      <!-- Title -->
                      <h1 class="text-subtitle-2 font-weight-regular mb-2">
                        This is your public presence on Spotz. All information
                        will be display in your profile.
                      </h1>

                      <!-- Information Details -->
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-row class="d-block">
                            <!-- Name Input -->
                            <v-col cols="12" class="mb-n6">
                              <v-text-field
                                :value="name"
                                v-model="name"
                                label="Name"
                                outlined
                                dense
                              ></v-text-field>
                            </v-col>

                            <!-- Email Input -->
                            <v-col cols="12" class="mb-n6">
                              <v-text-field
                                :value="email"
                                v-model="email"
                                label="Email"
                                readonly
                                outlined
                                dense
                              ></v-text-field>
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

                            <!-- Birthday Selection -->
                            <v-col cols="12" class="mb-n6">
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="birthday_Format"
                                    label="Birthday Date"
                                    v-bind="attrs"
                                    v-on="on"
                                    dense
                                    outlined
                                    readonly
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="birthday"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  no-title
                                  min="1950-01-01"
                                  @change="save"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>

                            <!-- Country Input -->
                            <v-col cols="12" class="mb-n6">
                              <v-autocomplete
                                v-model="countryName"
                                label="Country"
                                :value="countryName"
                                :items="country"
                                outlined
                                dense
                              ></v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-row class="d-block">
                            <!-- Profile Photo Input -->
                            <v-col cols="12" class="mb-2 text-center">
                              <v-avatar class="mb-8" size="150">
                                <img
                                  v-if="!isFileUploaded"
                                  :src="photoURL"
                                  alt="..."
                                />

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
                              <div class="mt-n12 ml-15">
                                <v-btn
                                  @click="choosePhoto"
                                  class="ml-15"
                                  color="#1a202c"
                                  :disabled="isFileUploaded"
                                  fab
                                  x-small
                                >
                                  <v-icon color="white" size="18"
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

                            <!-- About Input -->
                            <v-col cols="12" class="mb-n6">
                              <v-textarea
                                outlined
                                name="input-7-4"
                                label="About me"
                                height="107px"
                                v-model="about"
                                value="about"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-col>

                        <!--Update Button -->
                        <v-col cols="12" md="3">
                          <v-btn
                            @click="update"
                            class="font-weight-regular text-capitalize"
                            color="#6b46c1"
                            depressed
                            block
                            dark
                          >
                            Update Profile
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import countryList from '~/countries.json'
import notifications from '~/components/notifications'

export default {
  layout: 'manager',

  components: {
    notifications,
  },

  data() {
    return {
      // Selection Data
      genderList: ['Male', 'Female'],
      country: countryList.codes,

      // User Input Data
      name: '',
      email: '',
      emailVerified: '',
      photoURL: '',
      gender: null,
      countryName: null,
      birthday: null,
      birthday_d: null,
      about: '',

      // Profile Picture
      selectedFile: '',
      isFileUploaded: false,
      uploadPercentage: null,

      // Calendar
      menu: false,

      // Authentication Data
      userId: '',
    }
  },

  computed: {
    // Formating Date (YYYY-MM-DD) to (DD MMMM YYYY)
    birthday_Format: function () {
      if (this.birthday == null) {
        return null
      } else {
        return moment(this.birthday, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    },

    // Formating Date (DD MMMM YYYY) to (YYYY-MM-DD)
    birthday_Format_D: function () {
      if (this.birthday_d == null) {
        return null
      } else {
        return moment(this.birthday_d, 'DD MMMM YYYY').format('YYYY-MM-DD')
      }
    },
  },

  // Calendar Data
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid

        this.$fire.firestore
          .collection('users')
          .doc(this.userId)
          .get()
          .then((doc) => {
            this.name = doc.data().name
            this.email = doc.data().email
            this.photoURL = doc.data().photoURL
            this.emailVerified = doc.data().emailVerified
            this.countryName = doc.data().country
            this.gender = doc.data().gender
            this.birthday_d = doc.data().birthday
            this.about = doc.data().about
            this.birthday = this.birthday_Format_D
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Birthday Selection
    save(date) {
      this.$refs.menu.save(date)
    },

    // Send Email Verification to User's Email
    async emailVerification() {
      try {
        await this.$fire.auth.currentUser.sendEmailVerification().then(() => {
          this.$store.commit('SET_NOTIFICATION', {
            alert:
              'Email verification sent! Please verify your email and login again.',
            alertIcon: 'mdi-email',
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
        .child('profilePhotos/' + this.selectedFile.name)

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
            .child('profilePhotos/' + this.selectedFile.name)

          const url = storageRef.getDownloadURL().then((url) => {
            this.photoURL = url
            // console.log(this.photoURL)
          })

          console.log('File successfully uploaded.')
          this.isFileUploaded = false
        }
      )
    },

    // Update User's Profile Information
    async update() {
      try {
        // Update User Token
        await this.$fire.auth.currentUser.updateProfile({
          displayName: this.name,
          email: this.email,
          photoURL: this.photoURL,
          emailVerified: this.emailVerified,
        })

        // Update User Realtime Database
        await this.$fire.firestore
          .collection('users')
          .doc(this.userId)
          .update({
            name: this.name,
            photoURL: this.photoURL,
            emailVerified: this.emailVerified,
            country: this.countryName,
            gender: this.gender,
            birthday: this.birthday_Format,
            about: this.about,
          })
          .then(() => {
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'All your information has been updated.',
              alertIcon: 'mdi-cloud-check',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
      } catch (error) {
        if (error.code == 'invalid-argument') {
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Please complete all form.',
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
