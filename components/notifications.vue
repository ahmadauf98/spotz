<template>
  <div>
    <v-snackbar
      v-show="notification.alert != '' || notification.alert != null"
      v-model="notification.snackbar"
      :timeout="notification.timeout"
      dark
      top
    >
      <div class="d-flex justify-center align-center">
        <v-icon
          :class="notification.alertIconStyle"
          :color="notification.colorIcon"
          >{{ notification.alertIcon }}</v-icon
        >
        {{ notification.alert }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // Fetch Notification Data from Vuex
  computed: { ...mapState(['notification']) },
}
</script>
