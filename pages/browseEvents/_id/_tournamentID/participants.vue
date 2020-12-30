<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0 mt-n5 mb-5">
      <div class="nav-mx">
        
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
