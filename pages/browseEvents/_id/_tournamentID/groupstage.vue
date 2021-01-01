<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0 mt-n5 mb-5">
      <div class="nav-mx">
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventTourHeader />

        <v-row>
          <!-- Left Side -->
          <v-col cols="12" lg="8" order="2" order-lg="1">
            <div style="position: sticky; min-height: 280px">
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

                <v-btn
                  class="font-weight-regular text-capitalize my-2"
                  :to="`signin`"
                  outlined
                  dark
                  depressed
                >
                  Login
                </v-btn>
              </v-overlay>
              <contentLocked />
            </div>
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
import eventTourHeader from '~/components/public/eventTourHeader'
import eventSponsorship from '~/components/manager/eventSponsorship'
import contentLocked from '~/components/public/events/contentLocked'
import notifications from '~/components/notifications'

export default {
  layout: 'homepage',

  middleware: 'autologout',

  components: {
    eventTourHeader,
    contentLocked,
    eventSponsorship,
    notifications,
  },

  data: () => ({
    overlay: true,
    opacity: 1,
    absolute: true,
  }),
}
</script>

<style scoped>
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
