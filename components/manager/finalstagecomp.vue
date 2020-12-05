<template>
  <div>
    <!-- If Final Stage is Null -->
    <v-card
      v-if="
        tournamentRef.isGroupDraw == false ||
        tournamentRef.isGroupStage == false
      "
      class="mx-auto py-10 px-9"
      outlined
      tile
    >
      <v-row class="mt-n4 mb-n5 d-flex align-center">
        <v-col cols="12" md="8" order="2" order-md="1">
          <h1
            class="mb-2 text-center text-md-left text-subtitle-1 font-weight-bold"
          >
            Final Stage
          </h1>
          <div>
            <h1
              class="text-subtitle-1 font-weight-regular text-center text-md-left mb-5"
            >
              Currently final-stage participants list is empty. Kindly wait the
              organizer to finalize qualified team in
              <strong> Group Stage</strong>. Then, Final Stage fixtures will be
              displayed here.
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

    <!-- Else If Final Stage is Available -->
    <v-card v-else class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
      <h1 class="text-subtitle-1 font-weight-bold mb-1">Final Stage</h1>

      <!-- Final Stage Participants-->
      <v-card outlined class="mt-2">
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
        <!-- Round 16 Fixture -->
        <div
          v-show="tournamentRef.gGroupNumber == 8"
          class="text-center justify-center mt-3"
        >
          <div class="d-flex">
            <h1 class="text-subtitle-2 font-weight-bold text-left">Round 16</h1>
          </div>

          <v-row>
            <v-col v-for="(fixture, index) in round16" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex align-center">
                  <h1 class="text-caption ml-4 mb-n4 mt-1">
                    {{ fixture.title }}
                  </h1>
                </v-row>

                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isRound16 == true"
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
                        fixture.isFulltime == false
                      "
                      class="text-caption text-active"
                    >
                      Live
                    </h1>

                    <h1
                      v-show="
                        tournamentRef.isRound16 == true &&
                        fixture.isFulltime == true
                      "
                      class="text-caption text-grey"
                    >
                      Full-Time
                    </h1>

                    <v-chip class="ma-1 mx-auto" color="primary" small label>
                      Versus
                    </v-chip>
                  </v-col>

                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.awayTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isRound16 == true"
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

        <!-- Quarter Final Fixture -->
        <div
          v-show="
            tournamentRef.gGroupNumber == 4 || tournamentRef.gGroupNumber == 8
          "
          class="text-center justify-center mt-3"
        >
          <div class="d-flex">
            <h1 class="text-subtitle-2 font-weight-bold text-left">
              Quarter Final
            </h1>
          </div>

          <v-row>
            <v-col
              v-for="(fixture, index) in quarterFinal"
              :key="index"
              cols="12"
            >
              <v-card class="pa-2" outlined>
                <v-row class="d-flex align-center">
                  <h1 class="text-caption ml-4 mb-n4 mt-1">
                    {{ fixture.title }}
                  </h1>
                </v-row>

                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isQuarterFinal == true"
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
                        fixture.isFulltime == false
                      "
                      class="text-caption text-active"
                    >
                      Live
                    </h1>

                    <h1
                      v-show="
                        tournamentRef.isQuarterFinal == true &&
                        fixture.isFulltime == true
                      "
                      class="text-caption text-grey"
                    >
                      Full-Time
                    </h1>

                    <v-chip class="ma-1 mx-auto" color="primary" small label>
                      Versus
                    </v-chip>
                  </v-col>

                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.awayTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isQuarterFinal == true"
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
          </div>

          <v-row>
            <v-col v-for="(fixture, index) in semiFinal" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex align-center">
                  <h1 class="text-caption ml-4 mb-n4 mt-1">
                    {{ fixture.title }}
                  </h1>
                </v-row>

                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
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
                        fixture.isFulltime == false
                      "
                      class="text-caption text-active"
                    >
                      Live
                    </h1>

                    <h1
                      v-show="
                        tournamentRef.isSemiFinal == true &&
                        fixture.isFulltime == true
                      "
                      class="text-caption text-grey"
                    >
                      Full-Time
                    </h1>

                    <v-chip class="ma-1 mx-auto" color="primary" small label>
                      Versus
                    </v-chip>
                  </v-col>

                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
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

        <!-- 3rd Place Fixture -->
        <div
          v-show="
            tournamentRef.gGroupNumber == 2 ||
            tournamentRef.gGroupNumber == 4 ||
            tournamentRef.gGroupNumber == 8
          "
          v-if="tournamentRef.fIs3rdPlace == true"
          class="text-center justify-center mt-3"
        >
          <div class="d-flex">
            <h1 class="text-subtitle-2 font-weight-bold text-left">
              3rd Place
            </h1>
          </div>

          <v-row>
            <v-col
              v-for="(fixture, index) in thirdPlace"
              :key="index"
              cols="12"
            >
              <v-card class="pa-2" outlined>
                <v-row class="d-flex align-center">
                  <h1 class="text-caption ml-4 mb-n4 mt-1">
                    {{ fixture.title }}
                  </h1>
                </v-row>

                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isThirdPlace == true"
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
                        fixture.isFulltime == false
                      "
                      class="text-caption text-active"
                    >
                      Live
                    </h1>

                    <h1
                      v-show="
                        tournamentRef.isThirdPlace == true &&
                        fixture.isFulltime == true
                      "
                      class="text-caption text-grey"
                    >
                      Full-Time
                    </h1>

                    <v-chip class="ma-1 mx-auto" color="primary" small label>
                      Versus
                    </v-chip>
                  </v-col>

                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.awayTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isThirdPlace == true"
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
          <div class="d-flex">
            <h1 class="text-subtitle-2 font-weight-bold text-left">Final</h1>
          </div>

          <v-row>
            <v-col v-for="(fixture, index) in final" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex align-center">
                  <h1 class="text-caption ml-4 mb-n4 mt-1">
                    {{ fixture.title }}
                  </h1>
                </v-row>

                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isFinal == true"
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
                        fixture.isFulltime == false
                      "
                      class="text-caption text-active"
                    >
                      Live
                    </h1>

                    <h1
                      v-show="
                        tournamentRef.isFinal == true &&
                        fixture.isFulltime == true
                      "
                      class="text-caption text-grey"
                    >
                      Full-Time
                    </h1>

                    <v-chip class="ma-1 mx-auto" color="primary" small label>
                      Versus
                    </v-chip>
                  </v-col>

                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.awayTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isFinal == true"
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
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // User Input Data
      tournamentRef: '',

      // List of Qualified Team
      finalStageList: '',

      // Final Stage Fixture
      round16: '',
      quarterFinal: '',
      semiFinal: '',
      thirdPlace: '',
      final: '',
    }
  },

  // Fetch Data from Firestore
  mounted() {
    // Get Tournament Data
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
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
          this.thirdPlace = doc.data().thirdPlace
          this.semiFinal = doc.data().semiFinal
          this.quarterFinal = doc.data().quarterFinal
          this.round16 = doc.data().round16
        }
      })
  },
}
</script>
