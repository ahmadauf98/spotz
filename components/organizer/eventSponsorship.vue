<template>
  <v-card class="mx-auto py-7 px-9 mb-4" outlined tile>
    <!-- No sponsorship -->
    <v-row>
      <v-col>
        <v-card class="mx-auto py-4 px-5 text-center" outlined>
          <v-btn
            class="mt-n1"
            color="primary"
            :to="`/organizer/auth/events/${this.$route.params.id}/settings`"
            icon
          >
            <v-icon>mdi-plus-box</v-icon>
          </v-btn>
          <h1 class="text-subtitle-2 font-weight-medium text-grey">
            No sponsorship
          </h1>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {}
</script>
