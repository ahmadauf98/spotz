<template>
  <v-card class="mx-auto py-7 px-9 mb-4" outlined tile>
    <!-- No sponsorship -->
    <v-row>
      <h1 class="text-subtitle-1 font-weight-bold text-center mb-n6">
        <v-icon class="mr-1">mdi-sponsor</v-icon>
        Brand Sponsorship
      </h1>

      <v-col cols="12">
        <a
          v-show="userId == eventHostname"
          @click="addSponsorship = !addSponsorship"
          class="card text-decoration-none"
        >
          <v-card class="mx-auto py-4 px-5 mt-7 text-center" outlined>
            <v-icon class="mt-n1" color="primary">mdi-plus-box</v-icon>
            <h1 class="text-subtitle-2 font-weight-medium text-grey">
              Add Sponsorship
            </h1>
          </v-card>
        </a>
      </v-col>

      <!-- If Sponsorship is available -->
      <v-col
        v-show="sponsorshipList != ''"
        v-for="(sponsorship, index) in sponsorshipList"
        :key="index"
        cols="12"
      >
        <div class="d-flex button">
          <v-btn
            @click="onDeleteBrandSponsor(sponsorship)"
            :disabled="userId != eventHostname"
            class="ml-auto mr-2 mt-1"
            icon
          >
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </div>

        <a
          :href="'https://' + sponsorship.websiteURL"
          target="_blank"
          class="card text-decoration-none"
        >
          <v-card class="mx-auto py-4 px-5 mt-n11 text-center" outlined>
            <img :src="sponsorship.photoURL" alt="..." width="100" />
            <h1 class="text-subtitle-1 font-weight-medium text-grey">
              {{ sponsorship.brandName }}
            </h1>

            <h1 class="text-subtitle-2 font-weight-regular text-grey">
              {{ sponsorship.description }}
            </h1>
          </v-card>
        </a>
      </v-col>

      <!-- If Sponsorship is empty -->
      <v-col v-show="sponsorshipList == ''" cols="12">
        <v-card class="mx-auto py-4 px-5 text-center" outlined>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fno-sponsorship.svg?alt=media&token=791149c4-8bbf-4ef7-944e-fb51d5946950"
            alt="..."
            width="100"
          />
          <h1 class="text-subtitle-1 font-weight-medium text-grey">
            No Sponsorship
          </h1>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add Sponsorship Overlay -->
    <v-overlay :value="addSponsorship">
      <v-card
        class="mx-auto py-5 px-10 black--text d-block align-center"
        width="800"
        color="white"
        light
        outlined
      >
        <v-btn @click="addSponsorship = false" class="mt-n3 ml-n8" icon>
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>

        <!-- Title -->
        <div class="text-center">
          <h1 class="text-h4 font-weight-black text-center mb-6">
            Add sponsorship
          </h1>
        </div>

        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-card class="mx-auto pa-8" outlined>
            <v-row class="d-block">
              <!-- PhotoURL Input -->
              <v-col cols="12" class="mb-2 text-center">
                <!-- If Profile Photo is Null -->
                <v-avatar class="mb-8" size="150" rounded>
                  <img v-if="!isFileUploaded" :src="photoURL" alt="..." />

                  <template v-else>
                    <v-overlay absolute opacity="0" value="true">
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
              </v-col>

              <!-- Brand Name Input -->
              <v-col cols="12" class="mb-n6">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Brand Name"
                  rules="required"
                >
                  <v-text-field
                    label="Brand Name"
                    v-model="brandName"
                    :error-messages="errors"
                    outlined
                    dense
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <!-- Brand Website Input -->
              <v-col cols="12" class="mb-n6">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Brand Website"
                  rules="required|url"
                >
                  <v-text-field
                    label="Brand Website"
                    v-model="websiteURL"
                    placeholder="www.website.com.my"
                    :error-messages="errors"
                    outlined
                    dense
                  ></v-text-field>
                </ValidationProvider>
              </v-col>

              <!-- Description Input -->
              <v-col cols="12" class="mb-n6">
                <v-textarea
                  outlined
                  label="Description"
                  v-model="description"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row class="d-flex">
              <v-col cols="6" class="ml-auto">
                <v-btn
                  @click="addBrandSponsor"
                  class="font-weight-regular text-capitalize"
                  color="primary"
                  :disabled="invalid"
                  depressed
                  block
                >
                  <span v-if="isLoading == false"> Add Sponsorship </span>
                  <v-progress-circular
                    v-else
                    :size="20"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </ValidationObserver>
      </v-card>
    </v-overlay>

    <!-- Delete Sponsorship Overlay -->
    <v-overlay :value="deleteSponsorship">
      <v-card
        class="mx-auto py-5 px-10 black--text d-block align-center"
        height="300"
        width="700"
        color="white"
        light
        outlined
      >
        <v-btn @click="deleteSponsorship = false" class="mt-n3 ml-n8" icon>
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
        <!-- Title -->
        <div class="text-center">
          <v-icon class="mb-3" color="grey darken-1" size="60"
            >mdi-delete</v-icon
          >
          <h1 class="text-center text-h5 font-weight-medium">
            Are you absolutely sure? <br />
            <span class="text-h6 font-weight-regular text-grey"
              >This action cannot be undone.</span
            >
          </h1>
        </div>

        <div class="d-flex justify-center mt-5 mb-n8">
          <v-btn
            @click="deleteSponsorship = false"
            class="px-10 mx-3 text-capitalize"
            color="green darken-1"
            height="40"
            depressed
            dark
          >
            Cancel</v-btn
          >
          <v-btn
            @click="deleteBrandSponsor(deletedData)"
            class="px-10 mx-3 text-capitalize"
            color="red darken-1"
            height="40"
            depressed
            dark
          >
            Delete</v-btn
          >
        </div>
      </v-card>
    </v-overlay>
  </v-card>
</template>

<script>
import firebase from 'firebase'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data: () => ({
    // Add & Delete Sponsorship Overlay Data
    addSponsorship: false,
    deleteSponsorship: false,
    isLoading: false,
    deletedData: '',

    // Sponsorship Info Data
    brandName: '',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623',
    websiteURL: '',
    description: '',
    eventHostname: '',

    // Photo Selection
    selectedFile: null,
    isFileUploaded: false,
    uploadPercentage: null,

    // Current User Info
    userId: '',

    // Data Fetched
    sponsorshipList: '',
  }),

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid

        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.sponsorshipList = doc.data().sponsorship
              this.eventHostname = doc.data().hostName
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Upload Brand Sponsorship Photo to CloudStorage
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
        .child('sponsorshipPhotos/' + this.selectedFile.name)
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
            .child('sponsorshipPhotos/' + this.selectedFile.name)
          const url = storageRef.getDownloadURL().then((url) => {
            this.photoURL = url
          })
          console.log('File successfully uploaded.')
          this.isFileUploaded = false
        }
      )
    },

    // Save Brand Sponsorship Info to Firestore
    async addBrandSponsor() {
      // Set loading state to true
      this.isLoading = true

      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            sponsorship: firebase.firestore.FieldValue.arrayUnion({
              brandName: this.brandName,
              photoURL: this.photoURL,
              websiteURL: this.websiteURL,
              description: this.description,
            }),
          })
          .then(() => {
            // Set loading state to false
            this.isLoading = false

            // Clear brand input
            this.brandName = ''
            this.photoURL =
              'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623'
            this.websiteURL = ''
            this.description = ''

            // Set addSponsorship to false
            this.addSponsorship = false
          })
      } catch (error) {
        // Set loading state to false
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

    // Delete Brand Sponsorship Info from Firestore
    onDeleteBrandSponsor(data) {
      this.deleteSponsorship = true
      this.deletedData = data
    },

    async deleteBrandSponsor(data) {
      // Set loading state to true
      this.isLoading = true

      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            sponsorship: firebase.firestore.FieldValue.arrayRemove({
              brandName: data.brandName,
              photoURL: data.photoURL,
              websiteURL: data.websiteURL,
              description: data.description,
            }),
          })
          .then(() => {
            // Set loading state to false
            this.isLoading = false

            // Set deleteSponsorship to false
            this.deleteSponsorship = false
          })
      } catch (error) {
        // Set loading state to false
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

<style scoped>
.button {
  position: relative;
  z-index: 1;
}

.card :hover {
  background-color: #eeeeee;
}
</style>
