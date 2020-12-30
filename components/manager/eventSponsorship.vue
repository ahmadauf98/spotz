<template>
  <v-card class="mx-auto py-7 px-9 mb-4" outlined tile>
    <!-- No sponsorship -->
    <v-row>
      <h1 class="text-subtitle-1 font-weight-bold text-center">
        <v-icon class="mr-1">mdi-sponsor</v-icon>
        Brand Sponsorship
      </h1>

      <v-col
        v-show="sponsorshipList != ''"
        v-for="(sponsorship, index) in sponsorshipList"
        :key="index"
        cols="12"
      >
        <a
          :href="'https://' + sponsorship.websiteURL"
          target="_blank"
          class="card text-decoration-none"
        >
          <v-card class="mx-auto py-4 px-5 text-center" outlined>
            <img :src="sponsorship.photoURL" alt="..." width="100" />
            <h1 class="text-subtitle-1 font-weight-medium text-grey">
              {{ sponsorship.brandName }}
            </h1>

            <h1 class="text-subtitle-2 font-weight-regular text-grey">
              {{ sponsorship.description }}
            </h1>
          </v-card>
        </a>
      </v-col>

      <v-col v-show="sponsorshipList == ''" cols="12">
        <v-card class="mx-auto py-4 px-5 text-center" outlined>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fno-sponsorship.svg?alt=media&token=791149c4-8bbf-4ef7-944e-fb51d5946950"
            alt="..."
            width="100"
          />
          <h1 class="text-subtitle-1 font-weight-medium text-grey">
            No Sponsorship
          </h1>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
    // Data Fetched
    sponsorshipList: '',
  }),

  mounted() {
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.sponsorshipList = doc.data().sponsorship
        }
      })
  },
}
</script>

<style scoped>
.card :hover {
  background-color: #eeeeee;
}
</style>
