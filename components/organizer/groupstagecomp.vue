<template>
  <div>
    <!-- If Grouping Not Draw -->
    <v-card
      v-if="tournamentRef.isGroupDraw == false"
      class="mx-auto py-10 px-9"
      outlined
      tile
    >
      <v-row class="mt-n4 mb-n5 d-flex align-center">
        <v-col cols="12" md="8" order="2" order-md="1">
         
          <h1
            class="mb-2 text-center text-md-left text-subtitle-1 font-weight-bold"
          >
            Group Stage
          </h1>
          <div>
            <h1
              class="text-subtitle-1 font-weight-regular text-center text-md-left mb-5"
            >
              Currently there is no group draw yet. Please wait the organizer
              draw the tournament after team registration completed. Then all
              the fixtures of the group stage will be displayed here.
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

    <!-- Tournament Fixtures -->
    <v-card v-else class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
      <h1 class="text-subtitle-1 font-weight-bold mb-1">Tournament Fixtures</h1>

      <div class="mt-5">
        <!-- Group A Fixture -->
        <div
          v-show="
            tournamentRef.gGroupNumber == 2 ||
            tournamentRef.gGroupNumber == 4 ||
            tournamentRef.gGroupNumber == 8
          "
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group A</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_A" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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

        <!-- Group B Fixture -->
        <div
          v-show="
            tournamentRef.gGroupNumber == 2 ||
            tournamentRef.gGroupNumber == 4 ||
            tournamentRef.gGroupNumber == 8
          "
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group B</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_B" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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

        <!-- Group C Fixture -->
        <div
          v-show="
            tournamentRef.gGroupNumber == 4 || tournamentRef.gGroupNumber == 8
          "
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group C</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_C" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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

        <!-- Group D Fixture -->
        <div
          v-show="
            tournamentRef.gGroupNumber == 4 || tournamentRef.gGroupNumber == 8
          "
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group D</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_D" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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

        <!-- Group E Fixture -->
        <div
          v-show="tournamentRef.gGroupNumber == 8"
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group E</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_E" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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

        <!-- Group F Fixture -->
        <div
          v-show="tournamentRef.gGroupNumber == 8"
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group F</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_F" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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

        <!-- Group G Fixture -->
        <div
          v-show="tournamentRef.gGroupNumber == 8"
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group G</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_G" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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

        <!-- Group H Fixture -->
        <div
          v-show="tournamentRef.gGroupNumber == 8"
          class="text-center justify-center mt-3"
        >
          <h1 class="text-subtitle-2 font-weight-bold text-left">Group H</h1>

          <v-row>
            <v-col v-for="(fixture, index) in fixture_H" :key="index" cols="12">
              <v-card class="pa-2" outlined>
                <v-row class="d-flex justify-center align-center">
                  <v-col cols="4">
                    <h1 class="text-subtitle-1 font-weight-medium text-center">
                      {{ fixture.homeTeam }}
                    </h1>

                    <h1
                      v-show="tournamentRef.isGroupStage == true"
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
                        tournamentRef.isGroupStage == true &&
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
                      v-show="tournamentRef.isGroupStage == true"
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
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // User Input Data
      tournamentRef: '',

      // Fixture Data
      fixture_A: [],
      fixture_B: [],
      fixture_C: [],
      fixture_D: [],
      fixture_E: [],
      fixture_F: [],
      fixture_G: [],
      fixture_H: [],
    }
  },

  // Fetch Data from Firestore
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
          this.fixture_C = doc.data().fixture_C
          this.fixture_D = doc.data().fixture_D
          this.fixture_E = doc.data().fixture_E
          this.fixture_F = doc.data().fixture_F
          this.fixture_G = doc.data().fixture_G
          this.fixture_H = doc.data().fixture_H
        }
      })
  },
}
</script>
