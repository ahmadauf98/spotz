<template>
  <v-app>
    <v-main class="d-none d-sm-flex align-center">
      <v-container class="p-0" fluid>
        <!-- Notifications -->
        <notifications />

        <v-card width="450px" class="py-4 px-8 mx-auto" outlined>
          <!-- Image Logo -->
          <v-row>
            <v-col class="text-center mb-n4">
              <img src="~/static/img/logo-full.svg" width="120px" />
            </v-col>
          </v-row>

          <!-- Title -->
          <v-row>
            <v-col class="pb-0 text-center">
              <h1><b>Log in</b> to Spotz</h1>
            </v-col>
          </v-row>

          <!-- Sign In -->
          <v-card-text>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="emailLogin">
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

                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  rules="min:6|required"
                >
                  <!-- Password Input -->
                  <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    label="Password"
                    prepend-icon="mdi-lock"
                    :error-messages="errors"
                    dense
                    outlined
                  ></v-text-field>
                </ValidationProvider>

                <!-- Forgot Password -->
                <div class="text-right mt-n3 mb-3">
                  <NuxtLink
                    to="/manager/emailRecovery"
                    class="relative hyperlink caption"
                  >
                    Forgot Password?
                  </NuxtLink>
                </div>

                <!-- Signin Button -->
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
                      <span v-if="isLoading == false">Login</span>

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

            <!-- Signup Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                Don't have an account?
                <NuxtLink :to="`signup`"> Sign up. </NuxtLink>
              </h1>
            </div>
          </v-card-text>
        </v-card>
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
      // Password Toggle Button
      showPassword: false,

      // User Input Data
      email: '',
      password: '',

      // Refresh Page
      isLoading: false,
    }
  },

  methods: {
    // Signin with Email Provider
    async emailLogin() {
      this.isLoading = true
      try {
        await this.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            this.$fire.firestore.collection('users').doc(data.user.uid).update({
              emailVerified: data.user.emailVerified,
            })
          })
          .then(() => {
            this.$router.replace(
              `/manager/auth/browseTournaments/${this.$route.params.id}/participants`
            )
            this.isLoading = false
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
