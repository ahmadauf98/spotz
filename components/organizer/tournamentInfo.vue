<template>
  <v-card class="mx-auto py-5 px-9 mb-4" outlined tile>
    <!-- First Row -->
    <v-row>
      <v-col>
        <v-card class="mx-auto py-3 px-5" outlined>
          <h1
            class="text-subtitle-2 font-weight-medium d-flex justify-center align-center"
          >
            <v-icon class="mr-1" size="18">mdi-phone</v-icon>
            {{ tournamentRef.phoneNumber }}
          </h1>
        </v-card>
      </v-col>
    </v-row>

    <!-- Second Row -->
    <v-row>
      <v-col>
        <v-card class="mx-auto py-3 px-5" outlined>
          <h1
            class="text-subtitle-2 font-weight-medium d-flex justify-center align-center"
          >
            <v-icon class="mr-1" size="18">mdi-map-marker</v-icon>
            {{ tournamentRef.location }}
          </h1>
        </v-card>
      </v-col>
    </v-row>

    <!-- Third Row -->
    <v-row>
      <v-col>
        <v-card class="mx-auto py-3 px-5" outlined>
          <h1
            class="text-subtitle-2 font-weight-medium d-flex justify-center align-center"
          >
            <v-icon class="mr-1" size="18">mdi-email</v-icon>
            {{ tournamentRef.email }}
          </h1>
        </v-card>
      </v-col>
    </v-row>

    <!-- Fourth Row -->
    <v-row>
      <v-col>
        <v-card class="mx-auto py-3 px-5" outlined>
          <h1
            class="text-subtitle-2 font-weight-medium d-flex justify-center align-center"
          >
            <v-icon class="mr-1" size="18">mdi-link-variant</v-icon>
            <a :href="tournamentRef.websiteURL" target="_blank"
              >{{ tournamentRef.websiteURL }}
            </a>
          </h1>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      // User Input Data
      tournamentRef: '',
    }
  },

  // Fetch User's Data
  created() {
    return this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
      })
  },
}
</script>
