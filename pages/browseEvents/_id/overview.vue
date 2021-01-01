<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0 mt-n5 mb-5">
      <div class="nav-mx">
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" order="2" order-lg="1">
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
              <v-row>
                <!-- If -->
                <v-col v-if="eventRef.tournamentRef == ''" cols="12">
                  <v-card class="mx-auto pb-7 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-5 mx-1">
                      <h1 class="text-subtitle-1 font-weight-bold">
                        <v-icon class="mr-1">mdi-trophy</v-icon>
                        Tournaments
                      </h1>
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        This event still doesn't have a tournament. For more
                        details, please contact the event organizer. Thank you.
                      </h1>
                    </div>
                  </v-card>
                </v-col>

                <!-- Else -->
                <v-col v-else cols="12">
                  <v-card class="mx-auto pb-7 pb-md-4 px-5" outlined>
                    <v-row class="d-flex mt-5 mx-1">
                      <h1 class="text-subtitle-1 font-weight-bold">
                        <v-icon class="mr-1">mdi-trophy</v-icon>
                        Tournaments
                      </h1>
                    </v-row>

                    <v-row class="d-flex mt-3 mx-1">
                      <v-col
                        v-for="(tournament, index) in tournamentList"
                        :key="index"
                        cols="6"
                        class="mb-2"
                      >
                        <nuxt-link
                          :to="`${tournament.tournamentID}/participants`"
                          class="text-decoration-none card"
                        >
                          <v-card
                            class="pa-5 mt-2 d-flex align-center"
                            outlined
                          >
                            <v-row>
                              <v-col cols="6" class="d-flex align-center">
                                <h1 class="text-body-1 font-weight-bold">
                                  {{ tournament.sportType }}
                                  <br />
                                  <span class="text-caption text-grey">
                                    {{ tournament.tournamentID }}
                                  </span>
                                </h1>
                              </v-col>
                              <v-col
                                cols="6"
                                class="d-flex justify-end align-center"
                              >
                                <v-chip
                                  v-if="tournament.gender == 'Male'"
                                  class="ma-2"
                                  color="blue darken-2"
                                  small
                                  label
                                  outlined
                                >
                                  {{ tournament.gender }}
                                </v-chip>

                                <v-chip
                                  v-else
                                  class="ma-2"
                                  color="pink darken-1"
                                  small
                                  label
                                  outlined
                                >
                                  {{ tournament.gender }}
                                </v-chip>
                              </v-col>
                            </v-row>
                          </v-card>
                        </nuxt-link>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import eventHeader from '~/components/public/eventHeader'
import eventSponsorship from '~/components/manager/eventSponsorship'
import notifications from '~/components/notifications'

export default {
  layout: 'homepage',

  middleware: 'autologout',

  components: {
    eventHeader,
    eventSponsorship,
    notifications,
  },

  data() {
    return {
      // Event Data
      eventRef: '',
      eventStatus: false,
      tournamentList: '',
    }
  },

  mounted() {
    // Get Event Data
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.eventRef = doc.data()
          var tournamentList = []
          this.eventRef.tournamentRef.forEach((element) => {
            var tournamentID = element
            // Get Tournament Data
            this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(tournamentID)
              .onSnapshot((doc) => {
                tournamentList.push(doc.data())
              })
          })
          this.tournamentList = tournamentList
        }
      })
  },
}
</script>

<style scoped>
.card :hover {
  background-color: #eeeeee;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .nav-mx {
    margin: 0px 40px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .nav-mx {
    margin: 0px 50px;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .nav-mx {
    margin: 0px 180px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .nav-mx {
    margin: 0px 200px;
  }
}
</style>
