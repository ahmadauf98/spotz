<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined tile>
        <!-- Header Picture -->
        <v-img :src="tournamentRef.headerURL" height="300px"> </v-img>

        <v-row class="px-10 d-sm-block d-md-flex">
          <v-col cols="12" class="d-sm-block d-md-flex">
            <!-- Profile Picture -->
            <div class="mr-5 mt-n7">
              <v-avatar class="mt-n15" size="150" rounded>
                <img :src="tournamentRef.photoURL" alt="..." />
              </v-avatar>
            </div>

            <v-row class="mx-1 mt-4 d-block">
              <v-row class="d-flex align-center mt-n6">
                <!-- Title -->
                <v-col cols="8" md="7" xl="9">
                  <h1 class="text-h4 font-weight-bold mb-n3">
                    {{ tournamentRef.title }}
                  </h1>
                </v-col>

                <!-- Hostname -->
                <v-col cols="4" md="5" xl="3" class="d-flex justify-end">
                  <v-card outlined class="d-flex align-center py-2 px-4">
                    <v-avatar size="50">
                      <img :src="hostnameProf.photoURL" alt="..." />
                    </v-avatar>
                    <h1 class="text-subtitle-2 font-weight-medium ml-3">
                      Organized by <br />
                      {{ hostnameProf.name }}
                    </h1>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <!-- Description -->
                <v-col cols="7">
                  <h1
                    class="text-subtitle-2 text-justify font-weight-regular mt-n3 mt-md-0 mt-lg-n3"
                  >
                    {{ tournamentRef.description }}
                  </h1>
                </v-col>
                <v-col></v-col>
              </v-row>

              <v-divider class="mt-3"></v-divider>

              <div class="d-inline-flex mb-3">
                <!-- Teams -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-account-group</v-icon>
                  {{ tournamentRef.participants }} Teams
                </h1>

                <!-- Sports Type -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-stadium</v-icon>
                  {{ tournamentRef.sportType }}
                </h1>

                <!-- Format -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-trophy</v-icon>
                  {{ tournamentRef.gStage }} &rarr; {{ tournamentRef.fStage }}
                </h1>

                <!-- Date -->
                <h1 class="text-subtitle-2 font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1">mdi-calendar</v-icon>
                  {{ startDate }} &rharu; {{ endDate }}
                </h1>
              </div>
            </v-row>
          </v-col>
        </v-row>

        <!-- Tab Route -->
        <v-row class="mx-2">
          <v-tabs centered>
            <v-tab
              v-for="tab in tabs"
              :key="tab.name"
              class="text-caption font-weight-medium"
              :to="tab.route"
            >
              {{ tab.name }}
            </v-tab>
          </v-tabs>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      tabs: [
        {
          name: 'Overview',
          route: `/manager/auth/tournaments/${this.$route.params.id}/overview`,
        },
        {
          name: 'Participants',
          route: `/manager/auth/tournaments/${this.$route.params.id}/participants`,
        },
        {
          name: 'Group Seedings',
          route: `/manager/auth/tournaments/${this.$route.params.id}/groupseedings`,
        },
        {
          name: 'Standings',
          route: `/manager/auth/tournaments/${this.$route.params.id}/standings`,
        },
        {
          name: 'Group Stage',
          route: `/manager/auth/tournaments/${this.$route.params.id}/groupstage`,
        },
        {
          name: 'Final Stage',
          route: `/manager/auth/tournaments/${this.$route.params.id}/finalstage`,
        },
      ],

      // User Input Data
      photoURL: '',
      headerURL: '',
      tournamentRef: '',
      hostnameProf: '',
      startDate: '',
      endDate: '',
    }
  },

  // Fetch User's Data
  mounted() {
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()

        this.startDate = doc.data().startDate
        this.endDate = doc.data().endDate

        this.$fire.firestore
          .collection('users')
          .doc(doc.data().hostName)
          .onSnapshot((docRef) => {
            this.hostnameProf = docRef.data()
          })
      })
  },
}
</script>
