<template>
  <v-app>
    <v-main class="align-center">
      <v-container class="p-0" fluid>
        <!-- Notifications -->
        <v-snackbar
          v-show="notification.alert != '' || notification.alert != null"
          v-model="notification.snackbar"
          :timeout="notification.timeout"
          dark
          top
        >
          <div class="d-flex justify-center align-center">
            <v-icon :class="notification.alertIconStyle">{{
              notification.alertIcon
            }}</v-icon>
            {{ notification.alert }}
          </div>
        </v-snackbar>

        <v-card width="450px" class="py-4 px-8 mx-auto" outlined>
          <!-- Images Logo -->
          <v-row>
            <v-col class="text-center mb-n4">
              <img src="~/static/img/logo-full.svg" width="120px" />
            </v-col>
          </v-row>

          <!-- Title -->
          <v-row>
            <v-col class="pb-0 text-center">
              <h1 class=""><b>Recover</b> your account</h1>
            </v-col>
          </v-row>

          <v-card-text>
            <form @submit.prevent="passwordReset">
              <!-- Email Input -->
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                prepend-icon="mdi-email"
                value
                dense
                outlined
              ></v-text-field>

              <!-- Submit Button -->
              <v-card-actions>
                <v-row>
                  <v-btn
                    type="submit"
                    class="h6 font-weight-bold"
                    large
                    block
                    dark
                    color="#6B46C1"
                  >
                    reset
                  </v-btn>
                </v-row>
              </v-card-actions>
            </form>

            <!-- Login Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                <Nuxt-link to="/" class="text-decoration-none">
                  Return Home
                </Nuxt-link>
              </h1>
            </div>

            <!-- Signup Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                Don't have an account?
                <Nuxt-link to="/signup">Sign up. </Nuxt-link>
              </h1>
            </div>
          </v-card-text>
          <!-- Email Recovery Form -->
        </v-card>
        <!-- Email Recovery Input -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  layout: 'auth',
  data() {
    return {
      // User Input Data
      email: '',

      // Notification Data
      alert: null,
      alertIcon: '',
      alertIconStyle: '',
      snackbar: false,
      timeout: 5000,
    }
  },

  // Fetch Notification Data from Vuex
  computed: {
    ...mapState(['notification']),
  },

  methods: {
    // Reset User's Password
    async passwordReset() {
      try {
        await firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            console.log('Success.Recovery email has been sent to the user.')
            this.alert = 'Please check email to reset your password.'
            this.alertIcon = 'mdi-email'
            this.alertIconStyle = 'text-primary mx-1'
            this.snackbar = true
          })
      } catch (error) {
        console.log(error.code)
        this.alert = error.message
        this.alertIcon = 'mdi-alert-circle'
        this.alertIconStyle = 'text-red mx-1'
        this.snackbar = true
      }
    },
  },
}
</script>

<style>
.relative {
  position: relative;
}
</style>
