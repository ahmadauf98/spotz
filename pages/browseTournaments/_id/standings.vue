<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <tournamentHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" xl="9" order="2" order-lg="1">
            <div style="position: sticky">
              <v-overlay
                :absolute="absolute"
                :value="overlay"
                :opacity="opacity"
                color="#583f97"
                class="text-center"
              >
                <v-icon size="50">mdi-lock</v-icon>
                <h1>Content Locked</h1>
                <h1 class="text-subtitle-1">Login to see more info</h1>
              </v-overlay>
              <standingscomp />
            </div>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import tournamentHeader from '~/components/tournamentHeader'
import tournamentInfo from '~/components/manager/tournamentInfo'
import standingscomp from '~/components/manager/standingscomp'
import notifications from '~/components/notifications'

export default {
  layout: 'homepage',

  components: {
    tournamentHeader,
    tournamentInfo,
    standingscomp,
    notifications,
  },

  data: () => ({
    overlay: true,
    opacity: 1,
    absolute: true,
  }),
}
</script>
