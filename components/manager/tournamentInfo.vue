<template>
  <v-card class="mx-auto py-5 px-9 mb-4" outlined tile>
    <!-- First Row -->
    <v-row>
      <!-- Left Side -->
      <v-col>
        <v-card class="mx-auto py-3 px-5" outlined>
          <h1
            class="text-caption font-weight-bold d-flex justify-center align-center"
          >
            <v-icon class="mr-1">mdi-account-group</v-icon>
            {{ tournamentProf.participants }} Teams
          </h1>
        </v-card>
      </v-col>

      <!-- Right Side -->
      <v-col>
        <v-card class="mx-auto py-3 px-5" outlined>
          <h1
            class="text-caption font-weight-bold d-flex justify-center align-center"
          >
            <v-icon class="mr-1">mdi-family-tree</v-icon>
            {{ tournamentProf.sportType }}
          </h1>
        </v-card>
      </v-col>
    </v-row>

    <!-- Second Row -->
    <v-row>
      <v-col>
        <v-card class="mx-auto py-3 px-5" outlined>
          <h1
            class="text-caption font-weight-bold d-flex justify-center align-center"
          >
            <v-icon class="mr-1">mdi-calendar</v-icon>
            {{ tournamentProf.startDate }} &mdash;
            <v-icon class="mx-1">mdi-calendar-check</v-icon>
            {{ tournamentProf.endDate }}
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
      tournamentProf: '',
    }
  },

  // Fetch User's Data
  created() {
    return this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentProf = doc.data()
      })
  },
}
</script>
