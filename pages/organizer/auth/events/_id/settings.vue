<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
                <!-- Basic Details  -->
                <div class="px-15">
                  <h1 class="text-subtitle-1 font-weight-bold mb-1">
                    Basic Details
                  </h1>

                  <v-row class="d-block">
                    <!-- Title Input -->
                    <v-col cols="12" class="mb-n6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Title"
                        rules="required"
                      >
                        <v-text-field
                          label="Title"
                          v-model="title"
                          :error-messages="errors"
                          outlined
                          dense
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>

                    <!-- Event Switch -->
                    <v-col cols="12" class="mt-n10 mb-6 d-flex">
                      <v-switch
                        v-model="isOpen"
                        color="primary"
                        label="Open Event"
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

                <!--  -->
                <v-card-actions class="mx-13 d-flex">
                  <v-btn
                    @click="onUpdate"
                    color="primary"
                    class="ml-auto px-10 font-weight-regular text-capitalize"
                    :disabled="invalid"
                    depressed
                  >
                    Update
                  </v-btn>
                </v-card-actions>
              </v-card>
            </ValidationObserver>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import moment from 'moment'
import eventHeader from '~/components/organizer/eventHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'organizer',

  components: {
    eventHeader,
    eventSponsorship,
    notifications,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data() {
    return {
      // Event Data
      eventRef: '',

      //Selection Data
      genderList: ['Male', 'Female'],

      // User Input Data
      title: '',
      description: '',
      startDate: null,
      startDate_d: null,
      endDate: null,
      endDate_d: null,
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

  computed: {
    // Formating startDate (YYYY-MM-DD) to (DD MMMM YYYY)
    startDate_Format: function () {
      if (this.startDate == null) {
        return null
      } else {
        return moment(this.startDate, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    },

    // Formating startDate (DD MMMM YYYY) to (YYYY-MM-DD)
    startDate_Format_D: function () {
      if (this.startDate_d == null) {
        return null
      } else {
        return moment(this.startDate_d, 'DD MMMM YYYY').format('YYYY-MM-DD')
      }
    },

    // Formating endDate (YYYY-MM-DD) to (DD MMMM YYYY)
    endDate_Format: function () {
      if (this.endDate == null) {
        return null
      } else {
        return moment(this.endDate, 'YYYY-MM-DD').format('DD MMMM YYYY')
      }
    },

    // Formating endDate (DD MMMM YYYY) to (YYYY-MM-DD)
    endDate_Format_D: function () {
      if (this.endDate_d == null) {
        return null
      } else {
        return moment(this.endDate_d, 'DD MMMM YYYY').format('YYYY-MM-DD')
      }
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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

        // Fetch Events Data from Database
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.eventRef = doc.data()
              this.title = doc.data().title
              this.description = doc.data().description
              this.startDate_d = doc.data().startDate
              this.endDate_d = doc.data().endDate
              this.websiteURL = doc.data().websiteURL
              this.phoneNumber = doc.data().phoneNumber
              this.location = doc.data().location
              this.email = doc.data().email
              this.isOpen = doc.data().isOpen

              // Ovewrite startDate & endDate value
              this.startDate = this.startDate_Format_D
              this.endDate = this.endDate_Format_D
            }
          })
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
      if (this.startDate == null) {
        return val >= moment().format('YYYY-MM-DD')
      } else {
        return val >= this.startDate
      }
    },

    async onUpdate() {
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .update({
            title: this.title,
            description: this.description,
            startDate: this.startDate_Format,
            endDate: this.endDate_Format,
            websiteURL: this.websiteURL,
            phoneNumber: this.phoneNumber,
            location: this.location,
            email: this.email,
            isOpen: this.isOpen,
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
