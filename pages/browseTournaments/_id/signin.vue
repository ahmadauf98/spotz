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
              <h1><b>Log in</b> as manager</h1>
            </v-col>
          </v-row>

          <!-- Sign In -->
          <v-card-text>
            <form @submit.prevent="emailLogin">
              <!-- Email Input -->
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                prepend-icon="mdi-email"
                dense
                outlined
              ></v-text-field>

              <!-- Password Input -->
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                label="Password"
                prepend-icon="mdi-lock"
                dense
                outlined
              ></v-text-field>

              <!-- Forgot Password -->
              <div class="text-right mt-n5 mb-3">
                <Nuxt-link
                  to="/manager/emailRecovery"
                  class="relative hyperlink caption"
                >
                  Forgot Password?
                </Nuxt-link>
              </div>

              <!-- Signin Button -->
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
                    <span v-if="isLoading == false">Log in</span>

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

            <!-- Signup Button -->
            <div class="text-center mt-2">
              <h1 class="hyperlink caption">
                Don't have an account?
                <Nuxt-link to="/manager/signup"> Sign up. </Nuxt-link>
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
        if (this.email === null || this.email === '') {
          this.isLoading = false
          console.log('Error. Undefined email.')
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Email is required, please enter valid email.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else if (this.password === null || this.password === '') {
          this.isLoading = false
          console.log('Error. Undefined password.')
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Password is required, please enter strong password.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          await this.$fire.auth
            .signInWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              this.$fire.firestore
                .collection('users')
                .doc(data.user.uid)
                .update({
                  emailVerified: data.user.emailVerified,
                })
            })
            .then(() => {
              this.$router.push(
                `/manager/auth/browseTournaments/${this.$route.params.id}/participants`
              )
              this.isLoading = false
            })
        }
      } catch (error) {
        console.log(error.code)
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
