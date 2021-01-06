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
              <h1 class=""><b>Recover</b> your account</h1>
            </v-col>
          </v-row>

          <v-card-text>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="passwordReset">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="email|required"
                  mode="lazy"
                >
                  <!-- Email Input -->
                  <v-text-field
                    v-model="email"
                    type="email"
                    label="Email"
                    prepend-icon="mdi-email"
                    :error-messages="errors"
                    required
                    dense
                    outlined
                  >
                  </v-text-field>
                </ValidationProvider>

                <!-- Submit Button -->
                <v-card-actions>
                  <v-row>
                    <v-btn
                      type="submit"
                      class="h6 font-weight-bold"
                      :disabled="invalid"
                      color="primary"
                      depressed
                      large
                      block
                    >
                      <span v-if="isLoading == false">Recover</span>

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
            </ValidationObserver>

            <!-- Login Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                <NuxtLink to="/" class="text-decoration-none">
                  Return Home
                </NuxtLink>
              </h1>
            </div>

            <!-- Signup Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                Don't have an account?
                <NuxtLink to="/organizer/signup">Sign up.</NuxtLink>
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
import notifications from '~/components/notifications'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'auth',

  components: {
    notifications,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data() {
    return {
      // User Input Data
      email: '',

      // Refresh Page
      isLoading: false,
    }
  },

  methods: {
    // Reset User's Password
    async passwordReset() {
      this.isLoading = true
      try {
        await this.$fire.auth.sendPasswordResetEmail(this.email).then(() => {
          this.isLoading = false
          console.log('Success.Recovery email has been sent to the user.')
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Please check email to reset your password.',
            alertIcon: 'mdi-email',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'green darken-1',
            snackbar: true,
          })
        })
      } catch (error) {
        this.isLoading = false
        if (error.code == 'auth/user-not-found') {
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'The email address is not register in the system.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else if (error.code == 'auth/wrong-password') {
          this.$store.commit('SET_NOTIFICATION', {
            alert:
              'The password is invalid. Please enter the correct password.',
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
