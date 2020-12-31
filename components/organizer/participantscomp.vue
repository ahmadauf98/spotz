<template>
  <div>
    <!-- No Official List -->
    <v-card
      v-if="officialList == ''"
      class="mx-auto py-10 mt-n3 mt-lg-0 px-9"
      outlined
      tile
    >
      <v-row class="mt-n4 mb-n5 d-flex align-center">
        <v-col cols="12" md="8" order="2" order-md="1">
          <h1
            class="mb-2 text-center text-md-left text-subtitle-1 font-weight-bold"
          >
            List of Official Team
          </h1>
          <div>
            <h1
              class="text-subtitle-1 font-weight-regular text-center text-md-left mb-5"
            >
              Currently there is no official team yet. Kindly contact the
              organizer to manage registration of the teams. After organizer
              approve registration application from the managers, the team info
              will be displayed here.
            </h1>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-center align-top"
          order="1"
          order-md="2"
        >
          <div class="px-5">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmanagers-tournament.svg?alt=media&token=ec47c873-a84d-4353-b823-e0fe7bff619b"
              width="220px"
              alt="..."
            />
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Official List -->
    <v-card v-else class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
      <h1 class="text-subtitle-1 font-weight-bold mb-1">
        List of Official Team
      </h1>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">No</th>
              <th class="text-left">Team Name</th>
              <th class="text-center">Manager Name</th>
              <th class="text-center">Manager Email</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(list, index) in officialList"
              :key="list.uid"
              class="text-center"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-left">{{ list.teamName }}</td>
              <td v-if="list.managerName != ''" class="text-center">
                {{ list.managerName }}
              </td>
              <td class="text-center">{{ list.managerEmail }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // User Input Data
      tempList: [],
      officialList: '',
      selectedTeam: '',
    }
  },

  // Fetch Data from Firestore
  mounted() {
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .collection('team-registration')
      .where('status', '==', 'approved')
      .onSnapshot((querySnapshot) => {
        this.tempList = []
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            this.$fire.firestore
              .collection('users')
              .doc(doc.data().uid)
              .onSnapshot((udoc) => {
                this.tempList.push({
                  listplayers: doc.data().listPlayers,
                  teamName: doc.data().teamName,
                  uid: doc.data().uid,
                  managerName: udoc.data().name,
                  managerEmail: udoc.data().email,
                })
              })
          }
        })
        this.officialList = this.tempList
      })
  },
}
</script>
