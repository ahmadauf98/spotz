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
            <!-- If Grouping Not Draw -->
            <v-card
              v-if="tournamentRef.isGroupDraw == false"
              class="mx-auto py-10 px-9"
              outlined
              tile
            >
              <div class="d-flex">
                <h1 class="text-subtitle-1 font-weight-bold">Final Stage</h1>
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
                      :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/seedings`"
                      :disabled="tournamentRef.participants != teamListNumber"
                      dark
                      depressed
                      color="primary"
                    >
                      Manage Seedings
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
            <v-card
              v-else
              class="mx-auto py-10 mt-n3 mt-lg-0 px-9 mb-5"
              outlined
              tile
            >
              <div>
                <div class="d-flex align-center">
                  <h1 class="text-subtitle-1 font-weight-bold">Final Stage</h1>
                </div>

                <!-- Final Stage Participants is Empty -->
                <v-card
                  v-if="finalStageList == ''"
                  class="mx-auto mt-2 py-10 px-9"
                  outlined
                  tile
                >
                  <div class="d-flex">
                    <h1 class="text-subtitle-1 font-weight-bold">
                      Participants
                    </h1>
                  </div>

                  <v-row class="mb-n5 d-flex align-center">
                    <v-col cols="12" md="8" order="2" order-md="1">
                      <div>
                        <h1
                          class="text-subtitle-2 font-weight-regular text-center text-md-left mb-5"
                        >
                          Currently final-stage participants list is empty.
                          Kindly go to the
                          <strong>Group Stage</strong> to finalize qualified
                          team in standings. Make sure all the results in the
                          group-stage is updated.
                        </h1>

                        <v-btn
                          class="font-weight-regular mb-4 text-capitalize"
                          :to="`/organizer/auth/tournaments/${this.$route.params.id}/groupstage`"
                          :disabled="
                            tournamentRef.participants != teamListNumber
                          "
                          dark
                          depressed
                          color="primary"
                        >
                          Group Stage
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      class="d-flex justify-center align-center"
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

                <!-- Final Stage Participants-->
                <v-card v-else outlined class="mt-2">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-center">Group</th>
                          <th class="text-center">Qualified Team</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(list, index) in finalStageList"
                          :key="index"
                          class="text-center"
                        >
                          <td class="text-center">
                            {{ list.groupName }}
                          </td>
                          <td class="text-center">
                            {{ list.teamName }}
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>

                <div class="mt-5">
                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-1 font-weight-bold">
                      Tournament Fixtures
                    </h1>
                  </div>

                  <!-- Semi Final Fixture -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <div class="d-flex">
                      <h1 class="text-subtitle-2 font-weight-bold text-left">
                        Semi Final
                      </h1>

                      <v-btn
                        v-show="tournamentRef.isSemiFinal == false"
                        class="ml-auto"
                        color="primary"
                        outlined
                        small
                        @click="onLive('semifinal')"
                      >
                        <v-icon small>mdi-record</v-icon>Start Match</v-btn
                      >
                    </div>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in semiFinal"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <h1 class="text-caption ml-4 mb-n4 mt-1">
                              {{ fixture.title }}
                            </h1>
                            <v-btn
                              v-show="
                                tournamentRef.isSemiFinal == true &&
                                fixture.isFullTime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, semiFinal)"
                              color="grey darken-1"
                              icon
                            >
                              <v-icon>mdi-square-edit-outline</v-icon>
                            </v-btn>
                          </v-row>

                          <v-row class="d-flex justify-center align-center">
                            <v-col cols="4">
                              <h1
                                class="text-subtitle-1 font-weight-medium text-center"
                              >
                                {{ fixture.homeTeam }}
                              </h1>

                              <h1
                                v-show="tournamentRef.isSemiFinal == true"
                                class="text-center"
                              >
                                {{ fixture.homeScore }}
                                <span
                                  v-show="fixture.isTie == true"
                                  class="text-subtitle-1"
                                >
                                  {{ fixture.homeSet }}
                                </span>
                              </h1>
                            </v-col>

                            <v-col cols="2">
                              <h1
                                v-show="
                                  fixture.isMatchStart == true &&
                                  fixture.isFullTime == false
                                "
                                class="text-caption text-active"
                              >
                                Live
                              </h1>

                              <h1
                                v-show="
                                  tournamentRef.isSemiFinal == true &&
                                  fixture.isFullTime == true
                                "
                                class="text-caption text-grey"
                              >
                                Full-Time
                              </h1>

                              <v-chip
                                class="ma-1 mx-auto"
                                color="primary"
                                small
                                label
                              >
                                Versus
                              </v-chip>
                            </v-col>

                            <v-col cols="4">
                              <h1
                                class="text-subtitle-1 font-weight-medium text-center"
                              >
                                {{ fixture.awayTeam }}
                              </h1>

                              <h1
                                v-show="tournamentRef.isSemiFinal == true"
                                class="text-center"
                              >
                                <span
                                  v-show="fixture.isTie == true"
                                  class="text-subtitle-1"
                                >
                                  {{ fixture.awaySet }}
                                </span>
                                {{ fixture.awayScore }}
                              </h1>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Final Fixture -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Final <span>& 3rd Place</span>
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in final"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <h1 class="text-caption ml-4 mb-n4 mt-1">
                              {{ fixture.title }}
                            </h1>
                            <v-btn
                              v-show="
                                tournamentRef.isTournamentLive == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, final)"
                              color="grey darken-1"
                              icon
                            >
                              <v-icon>mdi-square-edit-outline</v-icon>
                            </v-btn>
                          </v-row>

                          <v-row class="d-flex justify-center align-center">
                            <v-col cols="4">
                              <h1
                                class="text-subtitle-1 font-weight-medium text-center"
                              >
                                {{ fixture.homeTeam }}
                              </h1>

                              <h1
                                v-show="tournamentRef.isTournamentLive == true"
                                class="text-center"
                              >
                                {{ fixture.homeScore }}
                              </h1>
                            </v-col>

                            <v-col cols="2">
                              <h1
                                v-show="
                                  fixture.isMatchStart == true &&
                                  fixture.isFulltime == false
                                "
                                class="text-caption text-active"
                              >
                                Live
                              </h1>

                              <h1
                                v-show="
                                  tournamentRef.isTournamentLive == true &&
                                  fixture.isFulltime == true
                                "
                                class="text-caption text-grey"
                              >
                                Full-Time
                              </h1>

                              <v-chip
                                class="ma-1 mx-auto"
                                color="primary"
                                small
                                label
                              >
                                Versus
                              </v-chip>
                            </v-col>

                            <v-col cols="4">
                              <h1
                                class="text-subtitle-1 font-weight-medium text-center"
                              >
                                {{ fixture.awayTeam }}
                              </h1>

                              <h1
                                v-show="tournamentRef.isTournamentLive == true"
                                class="text-center"
                              >
                                {{ fixture.awayScore }}
                              </h1>
                            </v-col>
                          </v-row>
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
            <tournamentInfo />
          </v-col>
        </v-row>

        <!-- Update Result Overlay -->
        <v-overlay :opacity="updateResultOpacity" :value="updateResultOverlay">
          <v-card
            class="mx-auto py-5 px-10 black--text d-block align-center"
            min-height="300"
            width="700"
            color="white"
            light
            outlined
          >
            <v-btn
              @click="updateResultOverlay = false"
              class="mt-n3 ml-n8"
              icon
            >
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
            <!-- Title -->
            <div class="d-flex justify-center mb-4 mt-n4">
              <h1 class="text-h6 font-weight-bold">Report Score</h1>
            </div>

            <div class="mb-6">
              <v-card class="pa-4" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4" class="d-block">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ resultData.homeTeam }}
                    </h1>

                    <v-col cols="8" class="mx-auto">
                      <v-text-field
                        v-show="resultData.isMatchStart == true"
                        class="text-h4 mb-n10 font-weight-bold"
                        v-model="resultData.homeScore"
                        type="number"
                        min="0"
                        max="100"
                        outlined
                      ></v-text-field>

                      <h1
                        v-show="resultData.isMatchStart == false"
                        class="text-center mt-n2"
                      >
                        {{ resultData.homeScore }}
                      </h1>
                    </v-col>
                  </v-col>

                  <v-col cols="2" class="text-center">
                    <h1 class="text-caption text-grey">
                      {{ resultData.title }}
                    </h1>
                    <v-chip
                      class="ma-2"
                      color="green darken-1"
                      dark
                      small
                      label
                    >
                      Versus
                    </v-chip>
                  </v-col>

                  <v-col cols="4" class="d-block">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ resultData.awayTeam }}
                    </h1>

                    <v-col cols="8" class="mx-auto">
                      <v-text-field
                        v-show="resultData.isMatchStart == true"
                        class="text-h4 mb-n10 font-weight-bold"
                        v-model="resultData.awayScore"
                        type="number"
                        min="0"
                        max="100"
                        outlined
                      ></v-text-field>

                      <h1
                        v-show="resultData.isMatchStart == false"
                        class="text-center mt-n2"
                      >
                        {{ resultData.awayScore }}
                      </h1>
                    </v-col>
                  </v-col>
                </v-row>

                <v-row
                  v-if="resultData.isTie == true"
                  class="d-flex justify-center align-center mt-n5 mb-n5"
                >
                  <v-col cols="4" class="d-block">
                    <v-col cols="5" class="mx-auto">
                      <v-text-field
                        v-show="resultData.isTie == true"
                        class="text-subtitle-1 text-grey mt-3 mb-n3"
                        v-model="resultData.homeSet"
                        type="number"
                        min="0"
                        max="100"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-col>

                  <v-col cols="2" class="text-center">
                    <h1 class="text-caption">Set Point</h1>
                  </v-col>

                  <v-col cols="4" class="d-block">
                    <v-col cols="5" class="mx-auto">
                      <v-text-field
                        v-show="resultData.isTie == true"
                        class="text-subtitle-1 text-grey mt-3 mb-n3"
                        v-model="resultData.awaySet"
                        type="number"
                        min="0"
                        max="100"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card>
            </div>

            <div class="d-flex align-center justify-end mb-2">
              <v-switch
                v-show="resultData.isMatchStart == true"
                class="mt-n3 mb-n7 mr-auto"
                v-model="resultData.isTie"
                small
                inset
                label="Tie"
              ></v-switch>

              <v-btn
                v-show="resultData.isMatchStart == false"
                class="ml-auto font-weight-regular text-capitalize"
                @click="onStartMatch(resultData, currentBracketData)"
                width="150"
                dark
                depressed
                color="orange darken-1"
              >
                Start Match
              </v-btn>

              <v-btn
                v-show="resultData.isMatchStart == true"
                class="px-10 ml-2 font-weight-regular text-capitalize"
                color="primary"
                width="150"
                @click="onLiveUpdate(resultData, currentBracketData)"
                outlined
              >
                Live Update</v-btn
              >

              <v-btn
                v-show="resultData.isMatchStart == true"
                class="px-10 ml-2 font-weight-regular text-capitalize"
                color="primary"
                width="150"
                @click="onUpdateResult(resultData, currentBracketData)"
                depressed
              >
                Fulltime</v-btn
              >
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

export default {
  middleware: 'authenticated',

  layout: 'organizer',

  components: {
    tournamentHeader,
    tournamentInfo,
  },

  data() {
    return {
      // User Input Data
      tournamentRef: '',
      teamListNumber: null,

      // List of Qualified Team
      finalStageList: '',

      // Final Stage Fixture
      round16: '',
      quarterFinal: '',
      semiFinal: '',
      final: '',

      // UpdateResult Overlay
      updateResultOpacity: 0.5,
      updateResultOverlay: false,
      resultData: '',
      currentBracketData: '',
      isTie: false,
    }
  },

  // Fetch Notification Data from Vuex
  computed: { ...mapState(['notification']) },

  // Fetch User's Data
  mounted() {
    // Tournament Data
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
      })

    // Get list of Official Team
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .collection('team-registration')
      .where('status', '==', 'approved')
      .onSnapshot((querySnapshot) => {
        this.teamListNumber = querySnapshot.size
      })

    // Get list of Qualified Team
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .collection('final-stage')
      .doc('participants')
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.exists) {
          this.finalStageList = querySnapshot.data()
        }
      })

    // Get Fixture of Each Bracket
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .collection('final-stage')
      .doc('fixtures')
      .onSnapshot((doc) => {
        if (doc.exists) {
          this.final = doc.data().final
          this.semiFinal = doc.data().semiFinal
          this.quarterFinal = doc.data().quarterFinal
          this.round16 = doc.data().round16

          this.assign(this.semiFinal, this.finalStageList)
          this.assign(this.final, this.semiFinal)
        }
      })
  },

  methods: {
    // Assign Team
    async assign(fixture, participants) {
      if (participants != '' && fixture != '') {
        try {
          if (this.tournamentRef.gGroupNumber == 2) {
            switch (fixture) {
              case this.semiFinal:
                const semiFinal1 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const semiFinal2 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                // Assign Team A to Semi Final Fixture
                if (typeof participants.group_A1 != 'undefined') {
                  semiFinal1.homeTeam = participants.group_A1.teamName
                  semiFinal2.awayTeam = participants.group_A2.teamName
                }

                // Assign Team B to Semi Final Fixture
                if (typeof participants.group_B1 != 'undefined') {
                  semiFinal2.homeTeam = participants.group_B1.teamName
                  semiFinal1.awayTeam = participants.group_B2.teamName
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    semiFinal: fixture,
                  })
                break
              case this.final:
                const final_semiFinal1 = participants.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const final_semiFinal2 = participants.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                const final = fixture.find(
                  (element) => element.fixtureID === 'final'
                )

                const thirdPlace = fixture.find(
                  (element) => element.fixtureID === 'final'
                )

                // Assign Team to Final Fixture
                if (final_semiFinal1.winner != null) {
                  console.log(final_semiFinal1.winner)
                  final.homeTeam = final_semiFinal1.winner
                }

                if (final_semiFinal2.winner != null) {
                  final.awayTeam = final_semiFinal2.winner
                }

                // Asign Team to 3rd Place Fixture
                if (final_semiFinal1.loser != null) {
                  thirdPlace.homeTeam = final_semiFinal1.loser
                }

                if (final_semiFinal2.loser != null) {
                  thirdPlace.awayTeam = final_semiFinal2.loser
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    final: fixture,
                  })

                break
            }
          } else {
            console.log('Not Semi Final')
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    // To Start Semi Final Tournament
    async onLive(type) {
      try {
        switch (type) {
          case 'semifinal':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .update({
                isSemiFinal: true,
              })
            break
          case 'final':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .update({
                isFinal: true,
              })
            break
        }
      } catch (error) {
        console.log(error)
      }
    },

    // To Update Result Overlay
    updateResult(data, fixture) {
      this.updateResultOverlay = true
      this.resultData = data
      this.currentBracketData = fixture

      console.log(this.currentBracketData)
    },

    // To Update Fulltime Result
    async onUpdateResult(data, fixture) {
      let fixtureID = data.fixtureID

      console.log(fixtureID)

      try {
        // State Winner, Loser of the Fixture
        if (data.homeScore > data.awayScore) {
          // If Home Team Winning
          data.winner = data.homeTeam
          data.loser = data.awayTeam
          data.isTie = false
          data.isFulltime = true
        } else if (data.homeScore < data.awayScore) {
          // If Away Team Winning
          data.winner = data.awayTeam
          data.loser = data.homeTeam
          data.isTie = false
          data.isFulltime = true
        } else {
          // If Result Draw
          data.isTie = true
          data.isFulltime = true
        }

        this.updateResultOverlay = false
      } catch (error) {
        console.log(error)
      }
    },

    // To Start Match
    async onStartMatch(data, fixture) {
      let bracketID = data.bracketID

      console.log(bracketID)
      try {
        data.isMatchStart = true

        switch (bracketID) {
          case 'semiFinal':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                semiFinal: fixture,
              })
            break
          case 'final':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                final: fixture,
              })
            break
        }

        this.updateResultOverlay = false
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
