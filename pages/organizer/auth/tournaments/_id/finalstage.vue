<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

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
                      Currently there is no group draw yet. Kindly click on
                      <strong>Draw Group</strong> button to draw team in a
                      group. This process is only can be done once. Please
                      ensure you pick the right team.
                    </h1>

                    <div class="d-flex justify-center justify-md-start">
                      <v-btn
                        class="font-weight-regular mb-4 text-capitalize"
                        :to="`/organizer/auth/tournaments/${this.$route.params.id}/overview/seedings`"
                        :disabled="tournamentRef.participants != teamListNumber"
                        color="primary"
                        depressed
                      >
                        Manage Seedings
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

                  <!-- Round 16 Fixture -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-3"
                  >
                    <div class="d-flex">
                      <h1 class="text-subtitle-2 font-weight-bold text-left">
                        Round 16
                      </h1>

                      <v-btn
                        v-show="
                          tournamentRef.isRound16 == false &&
                          finalStageList_round16 != ''
                        "
                        class="ml-auto"
                        color="primary"
                        outlined
                        small
                        @click="onLive('round16')"
                      >
                        <v-icon small>mdi-record</v-icon>Start Match</v-btn
                      >
                    </div>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in round16"
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
                                tournamentRef.isRound16 == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, round16)"
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
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <div class="d-flex">
                      <h1 class="text-subtitle-2 font-weight-bold text-left">
                        Quarter Final
                      </h1>

                      <v-btn
                        v-show="
                          (tournamentRef.isQuarterFinal == false &&
                            finalStageList_quarter != '') ||
                          (tournamentRef.isQuarterFinal == false &&
                            round16Check == true)
                        "
                        class="ml-auto"
                        color="primary"
                        outlined
                        small
                        @click="onLive('quarterfinal')"
                      >
                        <v-icon small>mdi-record</v-icon>Start Match</v-btn
                      >
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
                            <v-btn
                              v-show="
                                tournamentRef.isQuarterFinal == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, quarterFinal)"
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

                      <v-btn
                        v-show="
                          (tournamentRef.isSemiFinal == false &&
                            finalStageList_semi != '') ||
                          (tournamentRef.isSemiFinal == false &&
                            quarterCheck == true)
                        "
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
                                fixture.isFulltime == false
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

                      <v-btn
                        v-show="
                          tournamentRef.isThirdPlace == false &&
                          semiCheck == true
                        "
                        class="ml-auto"
                        color="primary"
                        outlined
                        small
                        @click="onLive('thirdPlace')"
                      >
                        <v-icon small>mdi-record</v-icon>Start Match</v-btn
                      >
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
                            <v-btn
                              v-show="
                                tournamentRef.isThirdPlace == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, thirdPlace)"
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
                      <h1 class="text-subtitle-2 font-weight-bold text-left">
                        Final
                      </h1>

                      <v-btn
                        v-show="
                          tournamentRef.isFinal == false && semiCheck == true
                        "
                        class="ml-auto"
                        color="primary"
                        outlined
                        small
                        @click="onLive('final')"
                      >
                        <v-icon small>mdi-record</v-icon>Start Match</v-btn
                      >
                    </div>

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
                                tournamentRef.isFinal == true &&
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
          <ValidationObserver ref="observer" v-slot="{ invalid }">
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
                      <h1
                        class="text-subtitle-1 font-weight-medium text-center"
                      >
                        {{ resultData.homeTeam }}
                      </h1>

                      <v-col cols="8" class="mx-auto">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Home Score"
                          rules="min_value:0|required"
                        >
                          <v-text-field
                            v-show="resultData.isMatchStart == true"
                            class="text-h4 mb-n10 font-weight-bold"
                            v-model="resultData.homeScore"
                            :error-messages="errors"
                            type="number"
                            min="0"
                            max="100"
                            outlined
                          ></v-text-field>
                        </ValidationProvider>

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
                      <h1
                        class="text-subtitle-1 font-weight-medium text-center"
                      >
                        {{ resultData.awayTeam }}
                      </h1>

                      <v-col cols="8" class="mx-auto">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Away Score"
                          rules="min_value:0|required"
                        >
                          <v-text-field
                            v-show="resultData.isMatchStart == true"
                            class="text-h4 mb-n10 font-weight-bold"
                            v-model="resultData.awayScore"
                            :error-messages="errors"
                            type="number"
                            min="0"
                            max="100"
                            outlined
                          ></v-text-field>
                        </ValidationProvider>

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
                    <v-col cols="5" class="d-block">
                      <v-col cols="5" class="mx-auto">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Home Set"
                          rules="min_value:0|required"
                        >
                          <v-text-field
                            v-show="resultData.isTie == true"
                            class="text-subtitle-1 text-grey mt-3 mb-n3"
                            v-model="resultData.homeSet"
                            :error-messages="errors"
                            type="number"
                            min="0"
                            max="100"
                            dense
                            outlined
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-col>

                    <v-col cols="2" class="text-center">
                      <h1 class="text-caption">Set Point</h1>
                    </v-col>

                    <v-col cols="5" class="d-block">
                      <v-col cols="5" class="mx-auto">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Away Set"
                          rules="min_value:0|required "
                        >
                          <v-text-field
                            v-show="resultData.isTie == true"
                            class="text-subtitle-1 text-grey mt-3 mb-n3"
                            v-model="resultData.awaySet"
                            :error-messages="errors"
                            type="number"
                            min="0"
                            max="100"
                            dense
                            outlined
                          ></v-text-field>
                        </ValidationProvider>
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
                  :disabled="invalid"
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
                  :disabled="invalid"
                  depressed
                >
                  Fulltime</v-btn
                >
              </div>
            </v-card>
          </ValidationObserver>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import tournamentHeader from '~/components/organizer/tournamentHeader'
import tournamentInfo from '~/components/organizer/tournamentInfo'
import notifications from '~/components/notifications'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'organizer',

  components: {
    tournamentHeader,
    tournamentInfo,
    notifications,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data() {
    return {
      // User Input Data
      tournamentRef: '',
      teamListNumber: null,

      // List of Qualified Team
      finalStageList: '',
      finalStageList_round16: '',
      finalStageList_quarter: '',
      finalStageList_semi: '',

      // Final Stage Fixture
      round16: '',
      quarterFinal: '',
      semiFinal: '',
      thirdPlace: '',
      final: '',

      // UpdateResult Overlay
      updateResultOpacity: 0.5,
      updateResultOverlay: false,
      resultData: '',
      currentBracketData: '',
      isTie: false,

      // Fulltime State
      round16Check: false,
      quarterCheck: false,
      semiCheck: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('tournaments')
          .doc(this.$route.params.id)
          .onSnapshot((doc) => {
            var hostName = doc.data().hostName

            if (user.uid != hostName) {
              console.log('No Credential')
              this.$router.replace('/organizer/auth/dashboard')
            }
          })

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

              if (this.tournamentRef.gGroupNumber == 2) {
                this.finalStageList_semi = this.finalStageList
              } else if (this.tournamentRef.gGroupNumber == 4) {
                this.finalStageList_quarter = this.finalStageList
              } else if (this.tournamentRef.gGroupNumber == 8) {
                this.finalStageList_round16 = this.finalStageList
              }
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

              // Check SemiFinal Fixtures Fulltime State
              if (typeof this.semiFinal != 'undefined') {
                if (
                  this.semiFinal[0].isFulltime == true &&
                  this.semiFinal[1].isFulltime == true
                ) {
                  this.semiCheck = true
                } else {
                  this.semiCheck = false
                }
              }

              // Check QuaterFinal Fixtures Fulltime State
              if (typeof this.quarterFinal != 'undefined') {
                if (
                  this.quarterFinal[0].isFulltime == true &&
                  this.quarterFinal[1].isFulltime == true &&
                  this.quarterFinal[2].isFulltime == true &&
                  this.quarterFinal[3].isFulltime == true
                ) {
                  this.quarterCheck = true
                } else {
                  this.quarterCheck = false
                }
              }

              // Check Round16 Fixtures Fulltime State
              if (typeof this.round16 != 'undefined') {
                if (
                  this.round16[0].isFulltime == true &&
                  this.round16[1].isFulltime == true &&
                  this.round16[2].isFulltime == true &&
                  this.round16[3].isFulltime == true &&
                  this.round16[4].isFulltime == true &&
                  this.round16[5].isFulltime == true &&
                  this.round16[5].isFulltime == true &&
                  this.round16[7].isFulltime == true
                ) {
                  this.round16Check = true
                } else {
                  this.round16Check = false
                }
              }

              // Testing Unit if else
              if (this.tournamentRef.gGroupNumber == 2) {
                this.assign(this.semiFinal, this.finalStageList)
                this.assign(this.thirdPlace, this.semiFinal)
                this.assign(this.final, this.semiFinal)
              } else if (this.tournamentRef.gGroupNumber == 4) {
                this.assign(this.quarterFinal, this.finalStageList)
                this.assign(this.semiFinal, this.quarterFinal)
                this.assign(this.thirdPlace, this.semiFinal)
                this.assign(this.final, this.semiFinal)
              } else if (this.tournamentRef.gGroupNumber == 8) {
                this.assign(this.round16, this.finalStageList)
                this.assign(this.quarterFinal, this.round16)
                this.assign(this.semiFinal, this.quarterFinal)
                this.assign(this.thirdPlace, this.semiFinal)
                this.assign(this.final, this.semiFinal)
              }
            }
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // Assign Team
    async assign(fixture, participants) {
      if (participants != '' && fixture != '') {
        try {
          if (this.tournamentRef.gGroupNumber == 2) {
            switch (fixture[0].bracketID) {
              case 'semiFinal':
                const semiFinal1 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const semiFinal2 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                // Assign Team A to Semi Final Fixture
                if (
                  typeof participants.group_A1 != 'undefined' &&
                  typeof participants.group_A2 != 'undefined'
                ) {
                  semiFinal1.homeTeam = participants.group_A1.teamName
                  semiFinal2.awayTeam = participants.group_A2.teamName
                }

                // Assign Team B to Semi Final Fixture
                if (
                  typeof participants.group_B1 != 'undefined' &&
                  typeof participants.group_B2 != 'undefined'
                ) {
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
              case 'thirdPlace':
                const thirdPlace_semiFinal1 = participants.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const thirdPlace_semiFinal2 = participants.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                const thirdPlace = fixture.find(
                  (element) => element.fixtureID === '3rdPlace'
                )

                // Assign Semi Final 1 Loser Team to Final Bracket
                if (
                  thirdPlace_semiFinal1.winner != null &&
                  thirdPlace_semiFinal1.loser != null
                ) {
                  thirdPlace.homeTeam = thirdPlace_semiFinal1.loser
                }

                // Assign Semi Final 2 Loser Team to Final Bracket
                if (
                  thirdPlace_semiFinal2.winner != null &&
                  thirdPlace_semiFinal2.loser != null
                ) {
                  thirdPlace.awayTeam = thirdPlace_semiFinal2.loser
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    thirdPlace: fixture,
                  })

                break
              case 'final':
                const final_semiFinal1 = participants.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const final_semiFinal2 = participants.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                const final = fixture.find(
                  (element) => element.fixtureID === 'final'
                )

                // Assign Semi Final 1 Winner Team to Final Bracket
                if (
                  final_semiFinal1.winner != null &&
                  final_semiFinal1.loser != null
                ) {
                  final.homeTeam = final_semiFinal1.winner
                }

                // Assign Semi Final 2 Winner Team to Final Bracket
                if (
                  final_semiFinal2.winner != null &&
                  final_semiFinal2.loser != null
                ) {
                  final.awayTeam = final_semiFinal2.winner
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
          } else if (this.tournamentRef.gGroupNumber == 4) {
            switch (fixture[0].bracketID) {
              case 'quarterFinal':
                const quarterFinal1 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal1'
                )

                const quarterFinal2 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal2'
                )

                const quarterFinal3 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal3'
                )

                const quarterFinal4 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal4'
                )

                // Assign Team A to Quarter Final Fixture
                if (
                  typeof participants.group_A1 != 'undefined' &&
                  typeof participants.group_A2 != 'undefined'
                ) {
                  quarterFinal1.homeTeam = participants.group_A1.teamName
                  quarterFinal2.awayTeam = participants.group_A2.teamName
                }

                // Assign Team B to Quarter Final Fixture
                if (
                  typeof participants.group_B1 != 'undefined' &&
                  typeof participants.group_B2 != 'undefined'
                ) {
                  quarterFinal2.homeTeam = participants.group_B1.teamName
                  quarterFinal1.awayTeam = participants.group_B2.teamName
                }

                // Assign Team C to Quarter Final Fixture
                if (
                  typeof participants.group_C1 != 'undefined' &&
                  typeof participants.group_C2 != 'undefined'
                ) {
                  quarterFinal3.homeTeam = participants.group_C1.teamName
                  quarterFinal4.awayTeam = participants.group_C2.teamName
                }

                // Assign Team D to Quarter Final Fixture
                if (
                  typeof participants.group_D1 != 'undefined' &&
                  typeof participants.group_D2 != 'undefined'
                ) {
                  quarterFinal4.homeTeam = participants.group_D1.teamName
                  quarterFinal3.awayTeam = participants.group_D2.teamName
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    quarterFinal: fixture,
                  })
                break
              case 'semiFinal':
                const semiFinal_quarterFinal1 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal1'
                )

                const semiFinal_quarterFinal2 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal2'
                )

                const semiFinal_quarterFinal3 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal3'
                )

                const semiFinal_quarterFinal4 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal4'
                )

                const semiFinal1 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const semiFinal2 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                // Assign Quarter Final 1 Team to Home Semi Final 1 Bracket
                if (semiFinal_quarterFinal1.winner != null) {
                  semiFinal1.homeTeam = semiFinal_quarterFinal1.winner
                }

                // Assign Quarter Final 2 Team to Away Semi Final 1 Bracket
                if (semiFinal_quarterFinal2.winner != null) {
                  semiFinal1.awayTeam = semiFinal_quarterFinal2.winner
                }

                // Assign Quarter Final 3 Team to Home Semi Final 2 Bracket
                if (semiFinal_quarterFinal3.winner != null) {
                  semiFinal2.homeTeam = semiFinal_quarterFinal3.winner
                }

                // Assign Quarter Final 4 Team to Away Semi Final 2 Bracket
                if (semiFinal_quarterFinal4.winner != null) {
                  semiFinal2.awayTeam = semiFinal_quarterFinal4.winner
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
              case 'thirdPlace':
                const thirdPlace_semiFinal1 = participants.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const thirdPlace_semiFinal2 = participants.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                const thirdPlace = fixture.find(
                  (element) => element.fixtureID === '3rdPlace'
                )

                // Assign Semi Final 1 Loser Team to Final Bracket
                if (
                  thirdPlace_semiFinal1.winner != null &&
                  thirdPlace_semiFinal1.loser != null
                ) {
                  thirdPlace.homeTeam = thirdPlace_semiFinal1.loser
                }

                // Assign Semi Final 2 Loser Team to Final Bracket
                if (
                  thirdPlace_semiFinal2.winner != null &&
                  thirdPlace_semiFinal2.loser != null
                ) {
                  thirdPlace.awayTeam = thirdPlace_semiFinal2.loser
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    thirdPlace: fixture,
                  })

                break
              case 'final':
                const final_semiFinal1 = participants.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const final_semiFinal2 = participants.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                const final = fixture.find(
                  (element) => element.fixtureID === 'final'
                )

                // Assign Semi Final 1 Winner Team to Final Bracket
                if (
                  final_semiFinal1.winner != null &&
                  final_semiFinal1.loser != null
                ) {
                  final.homeTeam = final_semiFinal1.winner
                }

                // Assign Semi Final 2 Winner Team to Final Bracket
                if (
                  final_semiFinal2.winner != null &&
                  final_semiFinal2.loser != null
                ) {
                  final.awayTeam = final_semiFinal2.winner
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
          } else if (this.tournamentRef.gGroupNumber == 8) {
            switch (fixture[0].bracketID) {
              case 'round16':
                const round161 = fixture.find(
                  (element) => element.fixtureID === 'round161'
                )

                const round162 = fixture.find(
                  (element) => element.fixtureID === 'round162'
                )

                const round163 = fixture.find(
                  (element) => element.fixtureID === 'round163'
                )

                const round164 = fixture.find(
                  (element) => element.fixtureID === 'round164'
                )

                const round165 = fixture.find(
                  (element) => element.fixtureID === 'round165'
                )

                const round166 = fixture.find(
                  (element) => element.fixtureID === 'round166'
                )

                const round167 = fixture.find(
                  (element) => element.fixtureID === 'round167'
                )

                const round168 = fixture.find(
                  (element) => element.fixtureID === 'round168'
                )

                // Assign Team A to Round16 Fixture
                if (
                  typeof participants.group_A1 != 'undefined' &&
                  typeof participants.group_A2 != 'undefined'
                ) {
                  round161.homeTeam = participants.group_A1.teamName
                  round162.awayTeam = participants.group_A2.teamName
                }

                // Assign Team B to Round16 Fixture
                if (
                  typeof participants.group_B1 != 'undefined' &&
                  typeof participants.group_B2 != 'undefined'
                ) {
                  round162.homeTeam = participants.group_B1.teamName
                  round161.awayTeam = participants.group_B2.teamName
                }

                // Assign Team C to Round16 Fixture
                if (
                  typeof participants.group_C1 != 'undefined' &&
                  typeof participants.group_C2 != 'undefined'
                ) {
                  round163.homeTeam = participants.group_C1.teamName
                  round164.awayTeam = participants.group_C2.teamName
                }

                // Assign Team D to Round16 Fixture
                if (
                  typeof participants.group_D1 != 'undefined' &&
                  typeof participants.group_D2 != 'undefined'
                ) {
                  round164.homeTeam = participants.group_D1.teamName
                  round163.awayTeam = participants.group_D2.teamName
                }

                // Assign Team E to Round16 Fixture
                if (
                  typeof participants.group_E1 != 'undefined' &&
                  typeof participants.group_E2 != 'undefined'
                ) {
                  round165.homeTeam = participants.group_E1.teamName
                  round166.awayTeam = participants.group_E2.teamName
                }

                // Assign Team F to Round16 Fixture
                if (
                  typeof participants.group_F1 != 'undefined' &&
                  typeof participants.group_F2 != 'undefined'
                ) {
                  round166.homeTeam = participants.group_F1.teamName
                  round165.awayTeam = participants.group_F2.teamName
                }

                // Assign Team G to Round16 Fixture
                if (
                  typeof participants.group_G1 != 'undefined' &&
                  typeof participants.group_G2 != 'undefined'
                ) {
                  round167.homeTeam = participants.group_G1.teamName
                  round168.awayTeam = participants.group_G2.teamName
                }

                // Assign Team H to Round16 Fixture
                if (
                  typeof participants.group_H1 != 'undefined' &&
                  typeof participants.group_H2 != 'undefined'
                ) {
                  round168.homeTeam = participants.group_H1.teamName
                  round167.awayTeam = participants.group_H2.teamName
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    round16: fixture,
                  })
                break
              case 'quarterFinal':
                const quarterFinal_round161 = participants.find(
                  (element) => element.fixtureID === 'round161'
                )

                const quarterFinal_round162 = participants.find(
                  (element) => element.fixtureID === 'round162'
                )

                const quarterFinal_round163 = participants.find(
                  (element) => element.fixtureID === 'round163'
                )

                const quarterFinal_round164 = participants.find(
                  (element) => element.fixtureID === 'round164'
                )

                const quarterFinal_round165 = participants.find(
                  (element) => element.fixtureID === 'round165'
                )

                const quarterFinal_round166 = participants.find(
                  (element) => element.fixtureID === 'round166'
                )

                const quarterFinal_round167 = participants.find(
                  (element) => element.fixtureID === 'round167'
                )

                const quarterFinal_round168 = participants.find(
                  (element) => element.fixtureID === 'round168'
                )

                const quarterFinal1 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal1'
                )

                const quarterFinal2 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal2'
                )

                const quarterFinal3 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal3'
                )

                const quarterFinal4 = fixture.find(
                  (element) => element.fixtureID === 'quarterFinal4'
                )

                // Assign Round 16 1 Team to Home Quarter Final 1 Bracket
                if (quarterFinal_round161.winner != null) {
                  quarterFinal1.homeTeam = quarterFinal_round161.winner
                }

                // Assign Round 16 2 Team to Away Quarter Final 1 Bracket
                if (quarterFinal_round162.winner != null) {
                  quarterFinal1.awayTeam = quarterFinal_round162.winner
                }

                // Assign Round 16 3 Team to Home Quarter Final 2 Bracket
                if (quarterFinal_round163.winner != null) {
                  quarterFinal2.homeTeam = quarterFinal_round163.winner
                }

                // Assign Round 16 4 Team to Away Quarter Final 2 Bracket
                if (quarterFinal_round164.winner != null) {
                  quarterFinal2.awayTeam = quarterFinal_round164.winner
                }

                // Assign Round 16 5 Team to Home Quarter Final 3 Bracket
                if (quarterFinal_round165.winner != null) {
                  quarterFinal3.homeTeam = quarterFinal_round165.winner
                }

                // Assign Round 16 6 Team to Away Quarter Final 3 Bracket
                if (quarterFinal_round166.winner != null) {
                  quarterFinal3.awayTeam = quarterFinal_round166.winner
                }

                // Assign Round 16 7 Team to Home Quarter Final 4 Bracket
                if (quarterFinal_round167.winner != null) {
                  quarterFinal4.homeTeam = quarterFinal_round167.winner
                }

                // Assign Round 16 8 Team to Away Quarter Final 4 Bracket
                if (quarterFinal_round168.winner != null) {
                  quarterFinal4.awayTeam = quarterFinal_round168.winner
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    quarterFinal: fixture,
                  })
                break
              case 'semiFinal':
                const semiFinal_quarterFinal1 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal1'
                )

                const semiFinal_quarterFinal2 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal2'
                )

                const semiFinal_quarterFinal3 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal3'
                )

                const semiFinal_quarterFinal4 = participants.find(
                  (element) => element.fixtureID === 'quarterFinal4'
                )

                const semiFinal1 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const semiFinal2 = fixture.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                // Assign Quarter Final 1 Team to Home Semi Final 1 Bracket
                if (semiFinal_quarterFinal1.winner != null) {
                  semiFinal1.homeTeam = semiFinal_quarterFinal1.winner
                }

                // Assign Quarter Final 2 Team to Away Semi Final 1 Bracket
                if (semiFinal_quarterFinal2.winner != null) {
                  semiFinal1.awayTeam = semiFinal_quarterFinal2.winner
                }

                // Assign Quarter Final 3 Team to Home Semi Final 2 Bracket
                if (semiFinal_quarterFinal3.winner != null) {
                  semiFinal2.homeTeam = semiFinal_quarterFinal3.winner
                }

                // Assign Quarter Final 4 Team to Away Semi Final 2 Bracket
                if (semiFinal_quarterFinal4.winner != null) {
                  semiFinal2.awayTeam = semiFinal_quarterFinal4.winner
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
              case 'thirdPlace':
                const thirdPlace_semiFinal1 = participants.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const thirdPlace_semiFinal2 = participants.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                const thirdPlace = fixture.find(
                  (element) => element.fixtureID === '3rdPlace'
                )

                // Assign Semi Final 1 Loser Team to Final Bracket
                if (
                  thirdPlace_semiFinal1.winner != null &&
                  thirdPlace_semiFinal1.loser != null
                ) {
                  thirdPlace.homeTeam = thirdPlace_semiFinal1.loser
                }

                // Assign Semi Final 2 Loser Team to Final Bracket
                if (
                  thirdPlace_semiFinal2.winner != null &&
                  thirdPlace_semiFinal2.loser != null
                ) {
                  thirdPlace.awayTeam = thirdPlace_semiFinal2.loser
                }

                await this.$fire.firestore
                  .collection('tournaments')
                  .doc(this.$route.params.id)
                  .collection('final-stage')
                  .doc('fixtures')
                  .update({
                    thirdPlace: fixture,
                  })

                break
              case 'final':
                const final_semiFinal1 = participants.find(
                  (element) => element.fixtureID === 'semiFinal1'
                )

                const final_semiFinal2 = participants.find(
                  (element) => element.fixtureID === 'semiFinal2'
                )

                const final = fixture.find(
                  (element) => element.fixtureID === 'final'
                )

                // Assign Semi Final 1 Winner Team to Final Bracket
                if (
                  final_semiFinal1.winner != null &&
                  final_semiFinal1.loser != null
                ) {
                  final.homeTeam = final_semiFinal1.winner
                }

                // Assign Semi Final 2 Winner Team to Final Bracket
                if (
                  final_semiFinal2.winner != null &&
                  final_semiFinal2.loser != null
                ) {
                  final.awayTeam = final_semiFinal2.winner
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
          }
        } catch (error) {
          console.log(error.code)
          this.$store.commit('SET_NOTIFICATION', {
            alert: error.message,
            alertIcon: 'mdi-alert-circle',
            alertIconStyle: 'mr-2 align-self-top',
            colorIcon: 'red darken-1',
            snackbar: true,
          })
        }
      }
    },

    // To Start Semi Final Tournament
    async onLive(type) {
      try {
        switch (type) {
          case 'round16':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .update({
                isRound16: true,
              })
            break
          case 'quarterfinal':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .update({
                isQuarterFinal: true,
              })
            break
          case 'semifinal':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .update({
                isSemiFinal: true,
              })
            break
          case 'thirdPlace':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .update({
                isThirdPlace: true,
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
        console.log(error.code)
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    // To Update Result Overlay
    updateResult(data, fixture) {
      this.updateResultOverlay = true
      this.resultData = data
      this.currentBracketData = fixture
    },

    // To Update Fulltime Result
    async onUpdateResult(data, fixture) {
      let bracketID = data.bracketID
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
          // If Result Draw - Compare with set points
          data.isTie = true
          if (data.homeSet > data.awaySet) {
            // If Home Team Winning
            data.winner = data.homeTeam
            data.loser = data.awayTeam
            data.isFulltime = true
          } else if (data.homeSet < data.awaySet) {
            // If Away Team Winning
            data.winner = data.awayTeam
            data.loser = data.homeTeam
            data.isFulltime = true
          }
        }

        switch (bracketID) {
          case 'round16':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                round16: fixture,
              })
            break
          case 'quarterFinal':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                quarterFinal: fixture,
              })
            break
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
          case 'thirdPlace':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                thirdPlace: fixture,
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
        console.log(error.code)
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    // To Live Update Result
    async onLiveUpdate(data, fixture) {
      let bracketID = data.bracketID
      try {
        switch (bracketID) {
          case 'round16':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                round16: fixture,
              })
            break
          case 'quarterFinal':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                quarterFinal: fixture,
              })
            break
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
          case 'thirdPlace':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                thirdPlace: fixture,
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
        console.log(error.code)
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },

    // To Start Match
    async onStartMatch(data, fixture) {
      let bracketID = data.bracketID

      try {
        data.isMatchStart = true

        switch (bracketID) {
          case 'round16':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                round16: fixture,
              })
            break
          case 'quarterFinal':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                quarterFinal: fixture,
              })
            break
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
          case 'thirdPlace':
            await this.$fire.firestore
              .collection('tournaments')
              .doc(this.$route.params.id)
              .collection('final-stage')
              .doc('fixtures')
              .update({
                thirdPlace: fixture,
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
        console.log(error.code)
        this.$store.commit('SET_NOTIFICATION', {
          alert: error.message,
          alertIcon: 'mdi-alert-circle',
          alertIconStyle: 'mr-2 align-self-top',
          colorIcon: 'red darken-1',
          snackbar: true,
        })
      }
    },
  },
}
</script>
