<template>
  <v-app>
    <v-main class="mx-md-5 mx-lg-0 mx-xl-15 px-xl-10 my-0 py-0">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
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

        <!-- Organization Details Part -->
        <tournamentHeader />

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
                      <th class="text-left">Team Name</th>
                      <th class="text-center">Manager Name</th>
                      <th class="text-center">Manager Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="list in officialList"
                      :key="list.uid"
                      class="text-center"
                    >
                      <td class="text-left">{{ list.teamName }}</td>
                      <td>{{ list.managerName }}</td>
                      <td>{{ list.managerEmail }}</td>
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

                <!-- If No Tournament Fixture -->
                <v-card
                  v-if="tournamentRef.isFixtureCreated == false"
                  class="mx-auto py-5 mt-8 px-9"
                  outlined
                  tile
                >
                  <div class="d-flex">
                    <h1 class="text-subtitle-1 font-weight-bold">
                      Tournament Fixtures
                    </h1>
                    <v-btn
                      class="font-weight-regular text-capitalize ml-auto"
                      dark
                      depressed
                      small
                      color="primary"
                    >
                      Get Fixture
                    </v-btn>
                  </div>
                </v-card>

                <div v-else class="mt-3">
                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-1 font-weight-bold">
                      Tournament Fixtures
                    </h1>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>

          <!-- Right Side -->
          <v-col cols="12" lg="4" xl="3" order="1" order-lg="2">
            <tournamentInfo />
          </v-col>
        </v-row>

        <!-- Add Seedings Overlay-->
        <v-overlay :opacity="opacity" :value="addSeedingsOverlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center overflow"
            max-height="470"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn @click="addSeedingsOverlay = false" class="mt-n3 ml-n8" icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>

            <div class="text-center">
              <h1 class="text-h6 font-weight-bold mb-3">Group Seedings</h1>
            </div>

            <div class="d-flex align-center mb-4">
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
                          v-for="(gA, index) in selectedData.group_A"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gA.teamName"
                              :items="teams"
                              v-model="gA.teamName"
                              outlined
                              dense
                            ></v-select>
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
                          v-for="(gB, index) in selectedData.group_B"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gB.teamName"
                              :items="teams"
                              v-model="gB.teamName"
                              outlined
                              dense
                            ></v-select>
                          </td>
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
                          v-for="(gC, index) in selectedData.group_C"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gC.teamName"
                              :items="teams"
                              v-model="gC.teamName"
                              outlined
                              dense
                            ></v-select>
                          </td>
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
                          v-for="(gD, index) in selectedData.group_D"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gD.teamName"
                              :items="teams"
                              v-model="gD.teamName"
                              outlined
                              dense
                            ></v-select>
                          </td>
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
                          v-for="(gE, index) in selectedData.group_E"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gE.teamName"
                              :items="teams"
                              v-model="gE.teamName"
                              outlined
                              dense
                            ></v-select>
                          </td>
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
                          v-for="(gF, index) in selectedData.group_F"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gF.teamName"
                              :items="teams"
                              v-model="gF.teamName"
                              outlined
                              dense
                            ></v-select>
                          </td>
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
                          v-for="(gG, index) in selectedData.group_G"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gG.teamName"
                              :items="teams"
                              v-model="gG.teamName"
                              outlined
                              dense
                            ></v-select>
                          </td>
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
                          v-for="(gH, index) in selectedData.group_H"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            <v-select
                              class="mt-5"
                              color="primary"
                              :placeholder="gH.teamName"
                              :items="teams"
                              v-model="gH.teamName"
                              outlined
                              dense
                            ></v-select>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-col>
            </div>

            <div class="d-flex">
              <v-btn
                class="font-weight-regular mb-4 text-capitalize ml-auto mx-3"
                @click="onUpdate(selectedData)"
                dark
                depressed
                color="primary"
              >
                Submit
              </v-btn>
            </div>
          </v-card>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import tournamentHeader from '~/components/organizer/tournamentHeader'
import tournamentInfo from '~/components/organizer/tournamentInfo'
import { mapState } from 'vuex'
import generator from 'tournament-generator'

export default {
  middleware: 'authenticated',

  layout: 'organizer',

  components: {
    tournamentHeader,
    tournamentInfo,
  },

  data() {
    return {
      // Tournament Data
      tournamentRef: '',

      // Official Team List Data
      tempList: [],
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
      fixture_A: '',
      fixture_B: '',
      fixture_C: '',
      fixture_D: '',
      fixture_E: '',
      fixture_F: '',
      fixture_G: '',
      fixture_H: '',

      // Add Seedings Overlay
      opacity: 0.5,
      addSeedingsOverlay: false,
      selectedData: '',
      teamName: '',
    }
  },

  // Fetch Notification Data from Vuex
  computed: { ...mapState(['notification']) },

  // Fetch Data from Firestore
  created() {
    // Tournament Data
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
      })

    // Official Team Data
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
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
      .collection('tournaments')
      .doc(this.$route.params.id)
      .collection('group-stage')
      .doc('seedings')
      .onSnapshot((doc) => {
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
      })

    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .collection('group-stage')
      .doc('seedings')
      .onSnapshot((querySnapshot) => {
        // var temp_A = querySnapshot.data().group_A

        // temp_A.forEach((doc) => {
        //   console.log(doc.data())
        // })

        querySnapshot.forEach(function (doc) {
          console.log(doc.data())
        })
      })
  },

  methods: {
    onView(data) {
      this.addSeedingsOverlay = true
      this.selectedData = data
    },

    async onUpdate(selectedData) {
      try {
        if (this.gGroupNumber == 2) {
          await this.$fire.firestore
            .collection('tournaments')
            .doc(this.$route.params.id)
            .collection('group-stage')
            .doc('seedings')
            .update({
              group_A: selectedData.group_A,
              group_B: selectedData.group_B,
            })
        } else if (this.gGroupNumber == 4) {
          await this.$fire.firestore
            .collection('tournaments')
            .doc(this.$route.params.id)
            .collection('group-stage')
            .doc('seedings')
            .update({
              group_A: selectedData.group_A,
              group_B: selectedData.group_B,
              group_C: selectedData.group_C,
              group_D: selectedData.group_D,
            })
        } else if (this.gGroupNumber == 8) {
          await this.$fire.firestore
            .collection('tournaments')
            .doc(this.$route.params.id)
            .collection('group-stage')
            .doc('seedings')
            .update({
              group_A: selectedData.group_A,
              group_B: selectedData.group_B,
              group_C: selectedData.group_C,
              group_D: selectedData.group_D,
              group_E: selectedData.group_E,
              group_F: selectedData.group_F,
              group_G: selectedData.group_G,
              group_H: selectedData.group_H,
            })
        }

        await this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .update({
            isGroupDraw: true,
            isFixtureCreated: false,
          })
          .then(() => {
            this.addSeedingsOverlay = false
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
