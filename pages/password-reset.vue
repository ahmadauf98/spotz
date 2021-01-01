<template>
  <v-app>
    <v-main class="align-center">
      <v-container class="p-0" fluid>
        <!-- Notifications -->
        <notifications />

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
              <h1 class=""><b>Reset</b> your password</h1>
            </v-col>
          </v-row>

          <v-card-text>
            <form @submit.prevent="passwordReset">
              <!-- Password Input -->
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                label="New Password"
                prepend-icon="mdi-lock"
                dense
                outlined
              ></v-text-field>

              <!-- Submit Button -->
              <v-card-actions>
                <v-row>
                  <v-btn
                    type="submit"
                    class="h6 font-weight-bold"
                    color="primary"
                    depressed
                    large
                    block
                    dark
                  >
                    <span v-if="isLoading == false">Reset</span>

                    <v-progress-circular
                      v-else
                      :size="20"
                      indeterminate
                      color="white"
                    ></v-progress-circular>
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
          </v-card-text>
          <!-- Password Reset Form -->
        </v-card>
        <!-- Password Reset Input -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import notifications from '~/components/notifications'

export default {
  layout: 'auth',

  components: {
    notifications,
  },

  data() {
    return {
      // Password Toggle Button
      showPassword: false,

      // User Input Data
      password: '',

      // Refresh Page
      isLoading: false,
    }
  },

  // beforeCreate() {
  //   var code = ''

  //   firebase
  //     .auth()
  //     .verifyPasswordResetCode(code)
  //     .then((email) => {
  //       // Display a "new password" form with the user's email address
  //     })
  //     .catch(() => {
  //       alert('Invalid Password Reset Link')
  //     })
  //     .then(() => {
  //       this.$router.replace({ path: '/' })
  //     })
  // },

  methods: {
    // Reset User's Password
    async passwordReset() {
      this.isLoading = true
      try {
        await firebase
          .auth()
          .confirmPasswordReset(code, password)
          .then(function () {
            alert('Successful! You can login to your account now.')
          })
          .then(() => {
            this.$router.replace({ path: '/' })
          })

        // await this.$fire.auth.sendPasswordResetEmail(this.email).then(() => {
        //   this.isLoading = false
        //   console.log('Success.Recovery email has been sent to the user.')
        //   this.$store.commit('SET_NOTIFICATION', {
        //     alert: 'Please check email to reset your password.',
        //     alertIcon: 'mdi-email',
        //     alertIconStyle: 'mr-2 align-self-top',
        //     colorIcon: 'green darken-1',
        //     snackbar: true,
        //   })
        // })
      } catch (error) {
        console.log(error.code)
        alert('Unsuccessful, please try again later.')
        // this.isLoading = false
        // this.$store.commit('SET_NOTIFICATION', {
        //   alert: error.message,
        //   alertIcon: 'mdi-alert-circle',
        //   alertIconStyle: 'mr-2 align-self-top',
        //   colorIcon: 'red darken-1',
        //   snackbar: true,
        // })
      }
    },
  },
}
</script>
