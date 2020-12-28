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
          <v-row cols="12" lg="8" xl="9" order="2" order-lg="1">
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
              <!-- First Row -->
              <v-row>
                <!-- First Card -->
                <v-col>
                  <v-card class="mx-auto pt-4 pb-15 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1 class="text-subtitle-1 font-weight-bold">Status</h1>
                      <v-chip
                        v-if="tournamentProf.status == false"
                        class="ml-auto mr-2 font-weight-medium"
                        color="warning"
                        label
                        small
                      >
                        Draft</v-chip
                      >
                      <v-chip
                        v-else
                        class="ml-auto mr-2 font-weight-medium"
                        color="green darken-1"
                        label
                        small
                        dark
                      >
                        Public</v-chip
                      >
                    </div>

                    <div class="d-flex mt-5 mx-1">
                      <v-icon class="mr-1 align-self-start"
                        >mdi-information</v-icon
                      >
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular mb-6 mb-md-7 mb-xl-10"
                      >
                        When the status is public, it is visible to everyone.
                        When status is draft, it is only accessible by host and
                        managers. Only host can change the status.
                      </h1>
                    </div>
                  </v-card>
                </v-col>

                <!-- Second Card -->
                <v-col>
                  <v-card class="mx-auto pt-4 pb-7 pb-md-4 px-5" outlined>
                    <div class="d-flex mt-1 mx-1">
                      <h1
                        class="text-subtitle-1 font-weight-bold d-flex align-center"
                      >
                        <v-icon class="mr-1">mdi-ticket</v-icon>
                        Team Registration
                      </h1>

                      <v-chip
                        v-show="registrationStatus == 'pending'"
                        class="ml-auto mr-2 font-weight-medium"
                        color="yellow darken-2"
                        label
                        small
                        dark
                      >
                        Pending</v-chip
                      >

                      <v-chip
                        v-show="registrationStatus == 'rejected'"
                        class="ml-auto mr-2 font-weight-medium"
                        color="red darken-1"
                        label
                        small
                        dark
                      >
                        Rejected</v-chip
                      >

                      <v-chip
                        v-show="registrationStatus == 'approved'"
                        class="ml-auto mr-2 font-weight-medium"
                        color="green darken-1"
                        label
                        small
                        dark
                      >
                        Approved</v-chip
                      >
                    </div>

                    <div class="d-flex mt-3 mx-1">
                      <h1
                        class="text-subtitle-1 text-justify font-weight-regular"
                      >
                        Team registration is
                        <span
                          v-if="tournamentProf.registrationStatus == true"
                          class="font-weight-medium text-green"
                          >open</span
                        >
                        <span v-else class="font-weight-medium text-red"
                          >closed</span
                        >. Hence, you are required to complete the players
                        registration before the due date. Organizer will approve
                        or reject your application.
                      </h1>
                    </div>

                    <div class="mt-3 mb-n3 mb-xl-0 d-flex">
                      <v-btn
                        :to="`/manager/auth/tournaments/${this.$route.params.id}/overview/teamregistration`"
                        :disabled="
                          tournamentProf.registrationStatus == false ||
                          registrationStatus == 'pending' ||
                          registrationStatus == 'approved'
                        "
                        color="primary"
                        class="ml-auto text-capitalize"
                        text
                      >
                        <v-icon size="20" class="mr-1"
                          >mdi-ticket-account</v-icon
                        >
                        Register
                      </v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-row>

          <!-- Right Side -->
          <v-row cols="12" lg="4" xl="3" order="1" order-lg="2">
            <eventSponsorship />
          </v-row>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import eventTourHeader from '~/components/manager/eventTourHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'

export default {
  middleware: 'authenticated',

  layout: 'manager',

  components: {
    eventTourHeader,
    eventSponsorship,
    notifications,
  },

  data() {
    return {
      // User Input Data
      tournamentProf: '',
      registrationStatus: '',
    }
  },
}
</script>
