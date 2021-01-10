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
              <h1 class="h6"><b>Sign up</b> your account</h1>
            </v-col>
          </v-row>

          <v-card-text>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="emailSignup">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                  mode="lazy"
                >
                  <!-- Name Input -->
                  <v-text-field
                    v-model="name"
                    type="text"
                    label="Name"
                    prepend-icon="mdi-account"
                    :error-messages="errors"
                    dense
                    outlined
                  ></v-text-field>
                </ValidationProvider>

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
                  mode="lazy"
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

                <ValidationProvider
                  v-slot="{ errors }"
                  name="Confirm Password"
                  rules="min:6|required"
                  mode="lazy"
                >
                  <!-- Confirm Password Input -->
                  <v-text-field
                    v-model="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    prepend-icon="mdi-lock"
                    :error-messages="errors"
                    dense
                    outlined
                  ></v-text-field>
                </ValidationProvider>

                <!-- Term of Use Checkbox-->
                <div class="mt-n3 mb-n4 pb-2">
                  <v-checkbox v-model="checkbox">
                    <template v-slot:label>
                      <div class="caption">
                        I agree to the
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <a href="#" @click.stop v-on="on">
                              Terms of Service
                            </a>
                          </template>
                          Open Terms of Service
                        </v-tooltip>
                        and
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <a href="#" @click.stop v-on="on">
                              Privacy Policy.
                            </a>
                          </template>
                          Open Privacy Policy
                        </v-tooltip>
                      </div>
                    </template>
                  </v-checkbox>
                </div>

                <!-- Signup Button -->
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
                      <span v-if="isLoading == false">Create an account</span>

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
                Already have an account?
                <NuxtLink :to="`signin`"> Log in. </NuxtLink>
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkbox: false,

      // Loading State
      isLoading: false,
    }
  },

  methods: {
    // Signup a user email
    async emailSignup() {
      // Loading State -> true
      this.isLoading = true
      try {
        if (this.password !== this.confirmPassword) {
          this.isLoading = false
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Password did not match, please confirm your password.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else if (this.checkbox != true) {
          this.isLoading = false
          this.$store.commit('SET_NOTIFICATION', {
            alert: 'Please agree to the Terms of Service and Privacy Policy.',
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        } else {
          await this.$fire.auth
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((data) => {
              this.$fire.firestore.collection('users').doc(data.user.uid).set({
                name: this.name,
                email: this.email,
                emailVerified: data.user.emailVerified,
                photoURL:
                  'https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FLogo.jpg?alt=media&token=921893c3-3134-494b-8f8c-332b10666623',
                gender: null,
                birthday: null,
                country: null,
                about: null,
                uid: data.user.uid,
                tournamentsRef: [],
                eventsRef: [],
                notificationsRef: [],
                tournamentsMgr: [],
                eventsMgr: [],
                notificationsMgr: [],
                managerReq: [],
                organizerInv: [],
                eventsCollab: [],
              })
              data.user.updateProfile({
                displayName: this.name,
              })
            })
            .then(() => {
              this.$router.replace(
                `/manager/auth/browseTournaments/${this.$route.params.id}/participants`
              )
              this.isLoading = false
            })
        }
      } catch (error) {
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
