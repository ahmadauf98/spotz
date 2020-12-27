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
            <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9 mb-5" outlined tile>
              <div class="d-flex">
                <h1 class="text-h6 font-weight-bold mb-1">
                  Tournament Seedings
                </h1>
              </div>

              <v-divider class="my-4"></v-divider>

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
                      :key="index"
                      class="text-center"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td class="text-left">{{ list.teamName }}</td>
                      <td class="text-center">{{ list.managerName }}</td>
                      <td class="text-center">{{ list.managerEmail }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <!-- If Grouping Not Draw -->
              <v-card
                v-if="tournamentRef.isGroupDraw == false"
                class="mx-auto py-10 mt-10 px-9"
                outlined
                tile
              >
                <div class="d-flex">
                  <h1 class="text-subtitle-1 font-weight-bold">
                    Group Seedings
                  </h1>
                </div>

                <v-row class="mb-n5 d-flex align-center">
                  <v-col cols="12" md="8" order="2" order-md="1">
                    <div>
                      <h1
                        class="text-subtitle-2 font-weight-regular text-center text-md-left mb-5"
                      >
                        Currently there is no group draw yet. Kindly click on
                        <strong>Draw Group</strong> button to draw team in a
                        group. This process is only can be done once. Please
                        ensure you pick the right team.
                      </h1>

                      <div class="d-flex justify-center justify-md-start">
                        <v-btn
                          class="font-weight-regular mb-4 text-capitalize"
                          @click="onView(groupStageData)"
                          dark
                          depressed
                          color="primary"
                        >
                          Draw Group
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    class="d-flex justify-center align-top"
                    order="1"
                    order-md="2"
                  >
                    <div class="px-5 mt-md-n8 mt-lg-n3 mt-xl-n6">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Fmanagers-tournament.svg?alt=media&token=ec47c873-a84d-4353-b823-e0fe7bff619b"
                        width="220px"
                        alt="..."
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-card>

              <!-- If Grouping is Drawed -->
              <div class="mt-8" v-else>
                <v-divider class="my-4"></v-divider>

                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-bold">
                    Group Seedings
                  </h1>
                </div>

                <v-row>
                  <!-- Group A -->
                  <v-col
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    cols="6"
                  >
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group A</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gA, index) in group_A"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">
                                {{ gA.teamName }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>

                  <!-- Group B -->
                  <v-col
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    cols="6"
                  >
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group B</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gB, index) in group_B"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">{{ gB.teamName }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>

                  <!-- Group C -->
                  <v-col
                    v-show="
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    cols="6"
                  >
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group C</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gC, index) in group_C"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">{{ gC.teamName }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>

                  <!-- Group D -->
                  <v-col
                    v-show="
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    cols="6"
                  >
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group D</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gD, index) in group_D"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">{{ gD.teamName }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>

                  <!-- Group E -->
                  <v-col v-show="tournamentRef.gGroupNumber == 8" cols="6">
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group E</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gE, index) in group_E"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">{{ gE.teamName }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>

                  <!-- Group F -->
                  <v-col v-show="tournamentRef.gGroupNumber == 8" cols="6">
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group F</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gF, index) in group_F"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">{{ gF.teamName }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>

                  <!-- Group G -->
                  <v-col v-show="tournamentRef.gGroupNumber == 8" cols="6">
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group G</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gG, index) in group_G"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">{{ gG.teamName }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>

                  <!-- Group H -->
                  <v-col v-show="tournamentRef.gGroupNumber == 8" cols="6">
                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center">Group H</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(gH, index) in group_H"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-center">{{ gH.teamName }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-col>
                </v-row>

                <div class="mt-3">
                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-1 font-weight-bold">
                      Tournament Fixtures
                    </h1>
                  </div>

                  <!-- Group A Fixture -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group A
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_A"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Group B Fixture -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group B
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_B"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Group C Fixture -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group C
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_C"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Group D Fixture -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group D
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_D"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Group E Fixture -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group E
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_E"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Group F Fixture -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group F
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_F"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Group G Fixture -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group G
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_G"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Group H Fixture -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-1 font-weight-bold text-center">
                      Group H
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_H"
                        :key="index"
                        cols="12"
                      >
                        <v-card
                          class="pa-2 d-flex justify-center align-center"
                          outlined
                        >
                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-right"
                            >
                              {{ fixture.homeTeam }}
                            </h1>
                          </v-col>

                          <v-col cols="2">
                            <v-chip
                              class="ma-2 mx-auto"
                              color="primary"
                              small
                              label
                            >
                              Versus
                            </v-chip>
                          </v-col>

                          <v-col cols="4">
                            <h1
                              class="text-subtitle-1 font-weight-medium text-left"
                            >
                              {{ fixture.awayTeam }}
                            </h1>
                          </v-col>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </v-card>
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
import firebase from 'firebase'
import eventTourHeader from '~/components/organizer/eventTourHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'
import generator from 'tournament-generator'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

  components: {
    eventTourHeader,
    eventSponsorship,
    notifications,
  },

  data() {
    return {
      // Tournament Data
      tournamentRef: '',

      // Official List Data
      officialList: '',
      teams: '',

      // Team Draw Data
      groupStageData: '',
      group_A: '',
      group_B: '',
      group_C: '',
      group_D: '',
      group_E: '',
      group_F: '',
      group_G: '',
      group_H: '',

      // Team Fixture Data
      fixture_data_A: [],
      fixture_data_B: [],
      fixture_data_C: [],
      fixture_data_D: [],
      fixture_data_E: [],
      fixture_data_F: [],
      fixture_data_G: [],
      fixture_data_H: [],

      // Fixture Data
      fixture_A: [],
      fixture_B: [],
      fixture_C: [],
      fixture_D: [],
      fixture_E: [],
      fixture_F: [],
      fixture_G: [],
      fixture_H: [],

      // Add Seedings Overlay
      opacity: 0.5,
      addSeedingsOverlay: false,
      selectedData: '',
      teamName: '',

      // Loading State
      isLoading: false,
    }
  },

  mounted() {
    // Tournament Data
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
      })

    // Official List Data
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .collection('team-registration')
      .where('status', '==', 'approved')
      .onSnapshot((querySnapshot) => {
        this.tempTeams = []
        this.tempList = []
        querySnapshot.forEach((doc) => {
          this.tempTeams.push(doc.data().teamName)
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
          this.teams = this.tempTeams
        })
        this.officialList = this.tempList
      })

    // Get Bracket Group
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .collection('group-stage')
      .doc('seedings')
      .onSnapshot((doc) => {
        if (doc.exists) {
          // Read Data
          this.group_A = doc.data().group_A
          this.group_B = doc.data().group_B
          this.group_C = doc.data().group_C
          this.group_D = doc.data().group_D
          this.group_E = doc.data().group_E
          this.group_F = doc.data().group_F
          this.group_G = doc.data().group_G
          this.group_H = doc.data().group_H

          // Overlay Data
          this.groupStageData = doc.data()
        }
      })

    // Filter Group for Tournament Generator
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .collection('group-stage')
      .doc('seedings')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.exists) {
          for (var i = 0; i < this.tournamentRef.gTeamNumbers; i++) {
            if (this.tournamentRef.gGroupNumber == 2) {
              this.fixture_data_A.push(querySnapshot.data().group_A[i].teamName)
              this.fixture_data_B.push(querySnapshot.data().group_B[i].teamName)
            } else if (this.tournamentRef.gGroupNumber == 4) {
              this.fixture_data_A.push(querySnapshot.data().group_A[i].teamName)
              this.fixture_data_B.push(querySnapshot.data().group_B[i].teamName)
              this.fixture_data_C.push(querySnapshot.data().group_C[i].teamName)
              this.fixture_data_D.push(querySnapshot.data().group_D[i].teamName)
            } else if (this.tournamentRef.gGroupNumber == 8) {
              this.fixture_data_A.push(querySnapshot.data().group_A[i].teamName)
              this.fixture_data_B.push(querySnapshot.data().group_B[i].teamName)
              this.fixture_data_C.push(querySnapshot.data().group_C[i].teamName)
              this.fixture_data_D.push(querySnapshot.data().group_D[i].teamName)
              this.fixture_data_E.push(querySnapshot.data().group_E[i].teamName)
              this.fixture_data_F.push(querySnapshot.data().group_F[i].teamName)
              this.fixture_data_G.push(querySnapshot.data().group_G[i].teamName)
              this.fixture_data_H.push(querySnapshot.data().group_H[i].teamName)
            }
          }
        }
      })

    // Get Fixture of Each Group
    this.$fire.firestore
      .collection('events')
      .doc(this.$route.params.id)
      .collection('tournaments')
      .doc(this.$route.params.tournamentID)
      .collection('group-stage')
      .doc('fixtures')
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.fixture_A = doc.data().fixture_A
          this.fixture_B = doc.data().fixture_B
        }
      })
  },
}
</script>
