<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined tile>
        <!-- Header Picture -->
        <v-img :src="tournamentProf.headerURL" height="300px"> </v-img>

        <v-row class="px-10 d-sm-block d-md-flex">
          <v-col cols="12" class="d-sm-block d-md-flex">
            <!-- Profile Picture -->
            <div class="mr-5 mt-n7">
              <v-avatar class="mt-n15" size="150" rounded>
                <img :src="tournamentProf.photoURL" alt="..." />
              </v-avatar>
            </div>

            <v-row class="mx-1 mt-4 d-block">
              <v-row class="d-flex align-center mt-n6">
                <!-- Title -->
                <v-col cols="8" md="7" xl="10">
                  <h1 class="text-h4 font-weight-bold mb-n3">
                    {{ tournamentProf.title }}
                  </h1>
                </v-col>

                <!-- Hostname -->
                <v-col cols="4" md="5" xl="2" class="d-flex justify-end">
                  <v-card outlined class="d-flex align-center py-2 px-4">
                    <v-avatar size="50">
                      <img :src="hostnameProf.photoURL" alt="..." />
                    </v-avatar>
                    <h1 class="text-subtitle-2 font-weight-medium ml-3">
                      Organized by <br />
                      <a href="#" class="text-decoration-none">{{
                        hostnameProf.name
                      }}</a>
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
                    {{ tournamentProf.description }}
                  </h1>
                </v-col>
                <v-col></v-col>
              </v-row>

              <v-divider class="mt-3"></v-divider>

              <div class="d-inline-flex mb-3">
                <!--  -->
                <h1 class="text-caption font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1" size="18">mdi-link-variant</v-icon>
                  <a :href="tournamentProf.websiteURL" target="_blank"
                    >{{ tournamentProf.websiteURL }}
                  </a>
                </h1>

                <!--  -->
                <h1 class="text-caption font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1" size="18">mdi-phone</v-icon>
                  {{ tournamentProf.phoneNumber }}
                </h1>

                <!--  -->
                <h1 class="text-caption font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1" size="18">mdi-map-marker</v-icon>
                  {{ tournamentProf.location }}
                </h1>

                <!--  -->
                <h1 class="text-caption font-weight-regular mt-2 mr-5">
                  <v-icon class="mr-1" size="18">mdi-email</v-icon>
                  {{ tournamentProf.email }}
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
          name: 'Group Stage',
          route: `/manager/auth/tournaments/${this.$route.params.id}/groupstage`,
        },
        {
          name: 'Final Stage',
          route: `/manager/auth/tournaments/${this.$route.params.id}/finalstage`,
        },
        {
          name: 'Participants',
          route: `/manager/auth/tournaments/${this.$route.params.id}/participants`,
        },
      ],

      // User Input Data
      photoURL: '',
      headerURL: '',
      tournamentProf: '',
      hostnameProf: '',
    }
  },

  // Fetch User's Data
  created() {
    return this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentProf = doc.data()
        // console.log(doc.data())

        this.$fire.firestore
          .collection('users')
          .doc(doc.data().hostName)
          .onSnapshot((docRef) => {
            this.hostnameProf = docRef.data()
            // console.log(docRef.data())
          })
      })
  },
}
</script>
