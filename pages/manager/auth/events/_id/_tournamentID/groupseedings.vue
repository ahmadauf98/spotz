<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventTourHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <groupseedingscomp />
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import eventTourHeader from '~/components/manager/eventTourHeader'
import eventSponsorship from '~/components/manager/eventSponsorship'
import groupseedingscomp from '~/components/organizer/groupseedingscomp'
import notifications from '~/components/notifications'

export default {
  layout: 'manager',

  components: {
    eventTourHeader,
    eventSponsorship,
    groupseedingscomp,
    notifications,
  },
}
</script>
