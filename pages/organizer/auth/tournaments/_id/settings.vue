<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <tournamentHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
              <!--  -->
              <div class="px-15">
                <h1 class="text-subtitle-1 font-weight-bold mb-1">
                  Basic Details
                </h1>

                <v-row class="d-block">
                  <!-- Title Input -->
                  <v-col cols="12" class="mb-n6">
                    <v-text-field
                      label="Title"
                      v-model="title"
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

                  <!-- Tournament Switch -->
                  <v-col cols="12" class="mt-n10 mb-6 d-flex">
                    <v-switch
                      v-model="isOpen"
                      color="primary"
                      label="Open Tournament"
                      :disabled="tournamentRef.isGroupDraw == true"
                      inset
                      hide-details
                    ></v-switch>
                  </v-col>

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
                              v-model="startDate"
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
                              v-model="endDate"
                              label="End Date"
                              readonly
                              dense
                              outlined
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="endDate" no-title scrollable>
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
              </div>

              <!--  -->
              <v-card-actions class="mx-13 d-flex">
                <v-btn
                  @click="onUpdate"
                  color="primary"
                  class="ml-auto px-10 font-weight-regular text-capitalize"
                  depressed
                  dark
                >
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
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

      //Selection Data
      genderList: ['Male', 'Female'],

      // User Input Data
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      websiteURL: '',
      phoneNumber: '',
      location: '',
      email: '',
      isOpen: false,
      gender: null,

      // Calendar
      menuStart: false,
      menuEnd: false,
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
            var hostName = doc.data().hostName

            if (user.uid != hostName) {
              console.log('No Credential')
              this.$router.replace('/organizer/auth/dashboard')
            }
          })

        // Tournament Data
        this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            this.tournamentRef = doc.data()
          })

        // Fetch Tournament Data from Database
        this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            this.title = doc.data().title
            this.description = doc.data().description
            this.startDate = doc.data().startDate
            this.endDate = doc.data().endDate
            this.websiteURL = doc.data().websiteURL
            this.phoneNumber = doc.data().phoneNumber
            this.location = doc.data().location
            this.email = doc.data().email
            this.isOpen = doc.data().isOpen
            this.gender = doc.data().gender
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    async onUpdate() {
      try {
        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .update({
            title: this.title,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            websiteURL: this.websiteURL,
            phoneNumber: this.phoneNumber,
            location: this.location,
            email: this.email,
            isOpen: this.isOpen,
            gender: this.gender,
          })
          .then(() => {
            console.log('Database successfully updated.')
            this.$store.commit('SET_NOTIFICATION', {
              alert: 'All your information has been updated.',
              alertIcon: 'mdi-cloud-check',
              alertIconStyle: 'mr-2 align-self-top',
              colorIcon: 'green darken-1',
              snackbar: true,
            })
          })
      } catch (error) {
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
