<template>
  <v-app>
    <v-main class="py-0 mb-10">
      <v-container class="p-0 my-0" fluid>
        <!-- Notifications -->
        <notifications />

        <!-- Organization Details Part -->
        <eventTourHeader />

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
                    Group Stage
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
                        :to="`/organizer/auth/events/${this.$route.params.id}/${this.$route.params.tournamentID}/overview/seedings`"
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
                  <h1 class="text-subtitle-1 font-weight-bold">Group Stage</h1>
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

                <div class="mt-5">
                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-1 font-weight-bold">
                      Tournament Fixtures
                    </h1>

                    <v-btn
                      v-show="tournamentRef.isGroupStage == false"
                      class="ml-auto"
                      color="primary"
                      outlined
                      small
                      @click="onLive"
                    >
                      <v-icon small>mdi-record</v-icon>Start Tournament</v-btn
                    >
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
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group A
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_A"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_A, table_A)"
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
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group B
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_B"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_B, table_B)"
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
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group C
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_C"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_C, table_C)"
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
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group D
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_D"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_D, table_D)"
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
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group E
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_E"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_E, table_E)"
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
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group F
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_F"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_F, table_F)"
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
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group G
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_G"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_G, table_G)"
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
                    <h1 class="text-subtitle-2 font-weight-bold text-left">
                      Group H
                    </h1>

                    <v-row>
                      <v-col
                        v-for="(fixture, index) in fixture_H"
                        :key="index"
                        cols="12"
                      >
                        <v-card class="pa-2" outlined>
                          <v-row class="d-flex align-center">
                            <v-btn
                              v-show="
                                tournamentRef.isGroupStage == true &&
                                fixture.isFulltime == false
                              "
                              class="ml-auto mx-3 mb-n8"
                              @click="updateResult(fixture, fixture_H, table_H)"
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

                <div class="mt-5">
                  <div class="d-flex align-center">
                    <h1 class="text-subtitle-1 font-weight-bold">Standings</h1>
                  </div>

                  <!-- Group A Table -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-3"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group A
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_A)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_A"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">
                                {{ table.teamName }}
                              </td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </div>

                  <!-- Group B Table -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 2 ||
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-5"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group B
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_B)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_B"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">{{ table.teamName }}</td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </div>

                  <!-- Group C Table -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-5"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group C
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_C)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_C"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">{{ table.teamName }}</td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </div>

                  <!-- Group D Table -->
                  <div
                    v-show="
                      tournamentRef.gGroupNumber == 4 ||
                      tournamentRef.gGroupNumber == 8
                    "
                    class="text-center justify-center mt-5"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group D
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_D)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_D"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">{{ table.teamName }}</td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </div>

                  <!-- Group E Table -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-5"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group E
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_E)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_E"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">{{ table.teamName }}</td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </div>

                  <!-- Group F Table -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-5"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group F
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_F)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_F"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">{{ table.teamName }}</td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </div>

                  <!-- Group G Table -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-5"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group G
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_G)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_G"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">{{ table.teamName }}</td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </div>

                  <!-- Group H Table -->
                  <div
                    v-show="tournamentRef.gGroupNumber == 8"
                    class="text-center justify-center mt-5"
                  >
                    <div class="d-flex align-center">
                      <h1
                        class="text-subtitle-2 font-weight-bold text-left mb-2"
                      >
                        Group H
                      </h1>
                      <v-btn
                        v-show="tournamentRef.isGroupStage == true"
                        class="ml-auto text-capitalize"
                        @click="getQualifiedTeam(table_H)"
                        dark
                        text
                        color="primary"
                        small
                      >
                        Finalize Result
                      </v-btn>
                    </div>

                    <v-card outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-right text-grey"></th>
                              <th class="text-left text-grey">Team</th>
                              <th class="text-center text-grey">MP</th>
                              <th class="text-center text-grey">W</th>
                              <th class="text-center text-grey">D</th>
                              <th class="text-center text-grey">L</th>
                              <th class="text-center text-grey">GF</th>
                              <th class="text-center text-grey">GA</th>
                              <th class="text-center text-grey">GD</th>
                              <th class="text-center text-grey">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(table, index) in table_H"
                              :key="index"
                              class="text-center"
                            >
                              <td class="text-right">{{ index + 1 }}</td>
                              <td class="text-left">{{ table.teamName }}</td>
                              <td class="text-center">{{ table.matches }}</td>
                              <td class="text-center">{{ table.win }}</td>
                              <td class="text-center">{{ table.draw }}</td>
                              <td class="text-center">{{ table.lost }}</td>
                              <td class="text-center">{{ table.goals_for }}</td>
                              <td class="text-center">
                                {{ table.goals_against }}
                              </td>
                              <td class="text-center">
                                {{ table.goals_difference }}
                              </td>
                              <td class="text-center">{{ table.points }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
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
                        Match {{ resultData.round }}
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
                </v-card>
              </div>

              <div class="d-flex justify-end mb-2">
                <v-btn
                  v-show="resultData.isMatchStart == false"
                  class="ml-auto font-weight-regular text-capitalize"
                  @click="onStartMatch(resultData, currentGroupData)"
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
                  @click="onLiveUpdate(resultData, currentGroupData)"
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
                  @click="
                    onUpdateResult(
                      resultData,
                      currentGroupData,
                      currentTableData
                    )
                  "
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
import eventTourHeader from '~/components/organizer/eventTourHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  layout: 'organizer',

  components: {
    eventTourHeader,
    eventSponsorship,
    notifications,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider,
  },

  data() {
    return {
      // User Input Data
      tournamentRef: '',
      teamListNumber: null,

      // Team Draw Data
      group_A: '',
      group_B: '',
      group_C: '',
      group_D: '',
      group_E: '',
      group_F: '',
      group_G: '',
      group_H: '',

      // Fixture Data
      fixture_A: [],
      fixture_B: [],
      fixture_C: [],
      fixture_D: [],
      fixture_E: [],
      fixture_F: [],
      fixture_G: [],
      fixture_H: [],

      // Table Data
      table_A: [],
      table_B: [],
      table_C: [],
      table_D: [],
      table_E: [],
      table_F: [],
      table_G: [],
      table_H: [],

      // UpdateResult Overlay
      updateResultOpacity: 0.5,
      updateResultOverlay: false,
      resultData: '',
      currentGroupData: '',
      isTie: false,
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Validate Account Credential
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            var collaborator = doc.data().collaborator

            this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .onSnapshot((doc) => {
                if (doc.exists) {
                  var hostName = doc.data().hostName

                  if (collaborator != null || hostName) {
                    if (user.uid != collaborator && user.uid != hostName) {
                      console.log('No Credential')
                      this.$router.replace('/organizer/auth/dashboard')
                    }
                  }
                }
              })
          })

        // Tournament Data
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .onSnapshot((doc) => {
            this.tournamentRef = doc.data()
          })

        // Get list of Official Team
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('team-registration')
          .where('status', '==', 'approved')
          .onSnapshot((querySnapshot) => {
            this.teamListNumber = querySnapshot.size
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

        // Get Standings Table of Each Group
        this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .collection('group-stage')
          .doc('tables')
          .onSnapshot((doc) => {
            this.sort_table_A = ''
            this.sort_table_B = ''
            this.sort_table_C = ''
            this.sort_table_D = ''
            this.sort_table_E = ''
            this.sort_table_F = ''
            this.sort_table_G = ''
            this.sort_table_H = ''

            if (doc.exists) {
              this.sort_table_A = doc.data().table_A
              this.sort_table_B = doc.data().table_B
              this.sort_table_C = doc.data().table_C
              this.sort_table_D = doc.data().table_D
              this.sort_table_E = doc.data().table_E
              this.sort_table_F = doc.data().table_F
              this.sort_table_G = doc.data().table_G
              this.sort_table_H = doc.data().table_H

              if (this.sort_table_A != null) {
                this.sort_table_A.sort(this.compare)
              }

              if (this.sort_table_B != null) {
                this.sort_table_B.sort(this.compare)
              }

              if (this.sort_table_C != null) {
                this.sort_table_C.sort(this.compare)
              }

              if (this.sort_table_D != null) {
                this.sort_table_D.sort(this.compare)
              }

              if (this.sort_table_E != null) {
                this.sort_table_E.sort(this.compare)
              }

              if (this.sort_table_F != null) {
                this.sort_table_F.sort(this.compare)
              }

              if (this.sort_table_G != null) {
                this.sort_table_G.sort(this.compare)
              }

              if (this.sort_table_H != null) {
                this.sort_table_H.sort(this.compare)
              }
            }

            this.table_A = this.sort_table_A
            this.table_B = this.sort_table_B
            this.table_C = this.sort_table_C
            this.table_D = this.sort_table_D
            this.table_E = this.sort_table_E
            this.table_F = this.sort_table_F
            this.table_G = this.sort_table_G
            this.table_H = this.sort_table_H
          })
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    // To Sort Standings Table
    compare(a, b) {
      // Compare by TeamName
      const teamNameA = a.teamName.toUpperCase()
      const teamNameB = b.teamName.toUpperCase()

      // Compare by Points
      const pointsA = Number(a.points)
      const pointsB = Number(b.points)

      // Compare by Goal_Difference
      const gdA = Number(a.goals_difference)
      const gdB = Number(b.goals_difference)

      // Compare by Goal_For
      const gfA = Number(a.goals_for)
      const gfB = Number(b.goals_for)

      let comparison = 0

      // Compare by Points
      if (pointsA > pointsB) {
        comparison = -1
      } else if (pointsA < pointsB) {
        comparison = 1
      } else {
        // Compare by Goal_Difference
        if (gdA > gdB) {
          comparison = -1
        } else if (gdA < gdB) {
          comparison = 1
        } else {
          // Compare by Goal_For
          if (gfA > gfB) {
            comparison = -1
          } else if (gfA < gfB) {
            comparison = 1
          } else {
            // Compare by TeamName
            if (teamNameA > teamNameB) {
              comparison = 1
            } else if (teamNameA < teamNameB) {
              comparison = -1
            }
          }
        }
      }

      return comparison
    },

    // To Start Tournament
    async onLive() {
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .update({
            isGroupStage: true,
          })
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

    // To End Tournament
    async onFulltime() {
      try {
        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .update({
            isTournamentFulltime: true,
          })
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
    updateResult(data, fixture, table) {
      this.updateResultOverlay = true
      this.resultData = data
      this.currentGroupData = fixture
      this.currentTableData = table
    },

    // To Start Match
    async onStartMatch(data, fixture) {
      let fixtureID = data.fixtureID
      try {
        data.isMatchStart = true

        switch (fixtureID) {
          case 'fixture_A':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_A: fixture,
              })
            break
          case 'fixture_B':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_B: fixture,
              })
            break
          case 'fixture_C':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_C: fixture,
              })
            break
          case 'fixture_D':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_D: fixture,
              })
            break
          case 'fixture_E':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_E: fixture,
              })
            break
          case 'fixture_F':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_F: fixture,
              })
            break
          case 'fixture_G':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_G: fixture,
              })
            break
          case 'fixture_H':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_H: fixture,
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

    // To Update Fulltime Result
    async onUpdateResult(data, fixture, table) {
      let fixtureID = data.fixtureID

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

        // Update Group Table Data
        if (data.isTie == false) {
          // If HomeTeam Win
          if (data.winner == data.homeTeam) {
            let table_winner = table.find(
              (element) => element.teamName === data.winner
            )
            let table_loser = table.find(
              (element) => element.teamName === data.loser
            )

            // Update Winner Data
            table_winner.tableID = data.tableID
            table_winner.matches += 1
            table_winner.win += 1
            table_winner.points += 3
            table_winner.goals_for += Number(data.homeScore)
            table_winner.goals_against += Number(data.awayScore)
            const goals_diff1 = Number(data.homeScore) - Number(data.awayScore)
            table_winner.goals_difference += goals_diff1

            // Update Loser Data
            table_loser.tableID = data.tableID
            table_loser.matches += 1
            table_loser.lost += 1
            table_loser.goals_for += Number(data.awayScore)
            table_loser.goals_against += Number(data.homeScore)
            const goals_diff2 = Number(data.awayScore) - Number(data.homeScore)
            table_loser.goals_difference += goals_diff2
          } // If AwayTeam Win
          else if (data.winner == data.awayTeam) {
            let table_winner = table.find(
              (element) => element.teamName === data.winner
            )
            let table_loser = table.find(
              (element) => element.teamName === data.loser
            )

            // Update Winner Data
            table_winner.tableID = data.tableID
            table_winner.matches += 1
            table_winner.win += 1
            table_winner.points += 3
            table_winner.goals_for += Number(data.awayScore)
            table_winner.goals_against += Number(data.homeScore)
            const goals_diff1 = Number(data.awayScore) - Number(data.homeScore)
            table_winner.goals_difference += goals_diff1

            // Update Loser Data
            table_loser.tableID = data.tableID
            table_loser.matches += 1
            table_loser.lost += 1
            table_loser.goals_for += Number(data.homeScore)
            table_loser.goals_against += Number(data.awayScore)
            const goals_diff2 = Number(data.homeScore) - Number(data.awayScore)
            table_loser.goals_difference += goals_diff2
          }
        } // If Draw
        else {
          let table_homeTeam = table.find(
            (element) => element.teamName === data.homeTeam
          )
          let table_awayTeam = table.find(
            (element) => element.teamName === data.awayTeam
          )
          // Update HomeTeam Data
          table_homeTeam.tableID = data.tableID
          table_homeTeam.matches += 1
          table_homeTeam.draw += 1
          table_homeTeam.points += 1
          table_homeTeam.goals_for += Number(data.homeScore)
          table_homeTeam.goals_against += Number(data.awayScore)

          // Update AwayTeam Data
          table_awayTeam.tableID = data.tableID
          table_awayTeam.matches += 1
          table_awayTeam.draw += 1
          table_awayTeam.points += 1
          table_awayTeam.goals_for += Number(data.awayScore)
          table_awayTeam.goals_against += Number(data.homeScore)
        }

        switch (fixtureID) {
          case 'fixture_A':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_A: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_A: table,
                  })
              )
            break
          case 'fixture_B':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_B: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_B: table,
                  })
              )
            break
          case 'fixture_C':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_C: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_C: table,
                  })
              )
            break
          case 'fixture_D':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_D: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_D: table,
                  })
              )
            break
          case 'fixture_E':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_E: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_E: table,
                  })
              )
            break
          case 'fixture_F':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_F: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_F: table,
                  })
              )
            break
          case 'fixture_G':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_G: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_G: table,
                  })
              )
            break
          case 'fixture_H':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_H: fixture,
              })
              .then(
                await this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_H: table,
                  })
              )
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
      let fixtureID = data.fixtureID
      try {
        switch (fixtureID) {
          case 'fixture_A':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_A: fixture,
              })
            break
          case 'fixture_B':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_B: fixture,
              })
            break
          case 'fixture_C':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_C: fixture,
              })
            break
          case 'fixture_D':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_D: fixture,
              })
            break
          case 'fixture_E':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_E: fixture,
              })
            break
          case 'fixture_F':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_F: fixture,
              })
            break
          case 'fixture_G':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_G: fixture,
              })
            break
          case 'fixture_H':
            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('group-stage')
              .doc('fixtures')
              .update({
                fixture_H: fixture,
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

    // Update Qualified Team
    async getQualifiedTeam(table) {
      try {
        switch (table[0].tableID) {
          case 'table_A':
            this.group_1 = {
              id: 'group_A1',
              groupName: 'Group A',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_A2',
              groupName: 'Group A',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_A1: this.group_1,
                  group_A2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table A has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
              })
            break
          case 'table_B':
            this.group_1 = {
              id: 'group_B1',
              groupName: 'Group B',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_B2',
              groupName: 'Group B',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_B1: this.group_1,
                  group_B2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table B has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
              })
            break
          case 'table_C':
            this.group_1 = {
              id: 'group_C1',
              groupName: 'Group C',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_C2',
              groupName: 'Group C',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_C1: this.group_1,
                  group_C2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table C  has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
              })
            break
          case 'table_D':
            this.group_1 = {
              id: 'group_D1',
              groupName: 'Group D',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_D2',
              groupName: 'Group D',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_D1: this.group_1,
                  group_D2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table D has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
              })
            break
          case 'table_E':
            this.group_1 = {
              id: 'group_E1',
              groupName: 'Group E',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_E2',
              groupName: 'Group E',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_E1: this.group_1,
                  group_E2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table E has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
              })
            break
          case 'table_F':
            this.group_1 = {
              id: 'group_F1',
              groupName: 'Group F',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_F2',
              groupName: 'Group F',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_F1: this.group_1,
                  group_F2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table F has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
              })
            break
          case 'table_G':
            this.group_1 = {
              id: 'group_G1',
              groupName: 'Group G',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_G2',
              groupName: 'Group G',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_G1: this.group_1,
                  group_G2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table G has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
              })
            break
          case 'table_H':
            this.group_1 = {
              id: 'group_H1',
              groupName: 'Group H',
              teamName: table[0].teamName,
            }

            this.group_2 = {
              id: 'group_H2',
              groupName: 'Group H',
              teamName: table[1].teamName,
            }

            await this.$fire.firestore
              .collection('events')
              .doc(this.$route.params.id)
              .collection('tournaments')
              .doc(this.$route.params.tournamentID)
              .collection('final-stage')
              .doc('participants')
              .set(
                {
                  group_H1: this.group_1,
                  group_H2: this.group_2,
                },
                { merge: true }
              )
              .then(() => {
                this.$store.commit('SET_NOTIFICATION', {
                  alert: 'Table H has been finalized.',
                  alertIcon: 'mdi-cloud-check',
                  alertIconStyle: 'mr-2 align-self-top',
                  colorIcon: 'green darken-1',
                  snackbar: true,
                })
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
  },
}
</script>
