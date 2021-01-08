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

            <div class="mb-4">
              <!-- First Row -->
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
              </v-row>

              <!-- Second Row -->
              <v-row>
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
              </v-row>

              <!-- Third Row -->
              <v-row>
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
              </v-row>

              <!-- Fourth Row -->
              <v-row>
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
              </v-row>
            </div>

            <div class="d-flex">
              <v-btn
                class="font-weight-regular mb-4 text-capitalize ml-auto mx-3"
                @click="onUpdate(selectedData)"
                width="120"
                dark
                depressed
                color="primary"
              >
                <span v-if="isLoading == false">Submit</span>

                <v-progress-circular
                  v-else
                  :size="20"
                  indeterminate
                  color="white"
                ></v-progress-circular>
              </v-btn>
            </div>
          </v-card>
        </v-overlay>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import eventTourHeader from '~/components/organizer/eventTourHeader'
import eventSponsorship from '~/components/organizer/eventSponsorship'
import notifications from '~/components/notifications'
import generator from 'tournament-generator'

export default {
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
                var hostName = doc.data().hostName

                if (collaborator != null || hostName) {
                  if (user.uid != collaborator && user.uid != hostName) {
                    console.log('No Credential')
                    this.$router.replace('/organizer/auth/dashboard')
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
                  this.fixture_data_A.push(
                    querySnapshot.data().group_A[i].teamName
                  )
                  this.fixture_data_B.push(
                    querySnapshot.data().group_B[i].teamName
                  )
                } else if (this.tournamentRef.gGroupNumber == 4) {
                  this.fixture_data_A.push(
                    querySnapshot.data().group_A[i].teamName
                  )
                  this.fixture_data_B.push(
                    querySnapshot.data().group_B[i].teamName
                  )
                  this.fixture_data_C.push(
                    querySnapshot.data().group_C[i].teamName
                  )
                  this.fixture_data_D.push(
                    querySnapshot.data().group_D[i].teamName
                  )
                } else if (this.tournamentRef.gGroupNumber == 8) {
                  this.fixture_data_A.push(
                    querySnapshot.data().group_A[i].teamName
                  )
                  this.fixture_data_B.push(
                    querySnapshot.data().group_B[i].teamName
                  )
                  this.fixture_data_C.push(
                    querySnapshot.data().group_C[i].teamName
                  )
                  this.fixture_data_D.push(
                    querySnapshot.data().group_D[i].teamName
                  )
                  this.fixture_data_E.push(
                    querySnapshot.data().group_E[i].teamName
                  )
                  this.fixture_data_F.push(
                    querySnapshot.data().group_F[i].teamName
                  )
                  this.fixture_data_G.push(
                    querySnapshot.data().group_G[i].teamName
                  )
                  this.fixture_data_H.push(
                    querySnapshot.data().group_H[i].teamName
                  )
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
      } else {
        this.$router.push('/')
      }
    })
  },

  methods: {
    onView(data) {
      this.addSeedingsOverlay = true
      this.selectedData = data
    },

    async onUpdate(selectedData) {
      // Loading state -> true
      this.isLoading = true

      try {
        if (this.tournamentRef.gGroupNumber == 2) {
          await this.$fire.firestore
            .collection('events')
            .doc(this.$route.params.id)
            .collection('tournaments')
            .doc(this.$route.params.tournamentID)
            .collection('group-stage')
            .doc('seedings')
            .update({
              group_A: selectedData.group_A,
              group_B: selectedData.group_B,
            })
            .then(() => {
              this.fixture_data_A = []
              this.fixture_data_B = []

              for (var i = 0; i < this.tournamentRef.gTeamNumbers; i++) {
                this.fixture_data_A.push(selectedData.group_A[i].teamName)
                this.fixture_data_B.push(selectedData.group_B[i].teamName)
              }
            })
            .then(async () => {
              // Initialize Fixture
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('group-stage')
                .doc('fixtures')
                .set({
                  fixture_A: [],
                  fixture_B: [],
                })

              // Initialize Table
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('group-stage')
                .doc('tables')
                .set({
                  table_A: [],
                  table_B: [],
                })

              // Initialize Final Stage
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('final-stage')
                .doc('fixtures')
                .set({
                  semiFinal: [
                    // Semi Final 1
                    {
                      fixtureID: 'semiFinal1',
                      bracketID: 'semiFinal',
                      title: 'Semi Final 1',
                      homeTeam: 'Group A1',
                      awayTeam: 'Group B2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Semi Final 2
                    {
                      fixtureID: 'semiFinal2',
                      bracketID: 'semiFinal',
                      title: 'Semi Final 2',
                      homeTeam: 'Group B1',
                      awayTeam: 'Group A2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  thirdPlace: [
                    // 3rd Place
                    {
                      fixtureID: '3rdPlace',
                      bracketID: 'thirdPlace',
                      title: '3rd Place',
                      homeTeam: 'Semi Final 1 Loser',
                      awayTeam: 'Semi Final 2 Loser',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  final: [
                    // Final Place
                    {
                      fixtureID: 'final',
                      bracketID: 'final',
                      title: 'Final',
                      homeTeam: 'Semi Final 1 Winner',
                      awayTeam: 'Semi Final 2 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],
                })
            })
            .then(async () => {
              // If fixture played once, else fixture played home away method
              if (this.tournamentRef.gRound == 'once') {
                // Generate Fixture A
                const games_A = generator(this.fixture_data_A, {
                  type: 'single-round',
                })
                this.fixture_A = games_A.data

                // Generate Fixture B
                const games_B = generator(this.fixture_data_B, {
                  type: 'single-round',
                })
                this.fixture_B = games_B.data
              } else {
                // Generate Fixture A
                const games_A = generator(this.fixture_data_A, {
                  type: 'double-round',
                })
                this.fixture_A = games_A.data

                // Generate Fixture B
                const games_B = generator(this.fixture_data_B, {
                  type: 'double-round',
                })
                this.fixture_B = games_B.data
              }

              // Store Fixture A
              await this.fixture_A.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_A: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_A',
                      tableID: 'table_A',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture B
              await this.fixture_B.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_B: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_B',
                      tableID: 'table_B',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })
            })
            .then(async () => {
              // Initialize Table A
              await this.group_A.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_A: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table B
              await this.group_B.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_B: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })
            })
        } else if (this.tournamentRef.gGroupNumber == 4) {
          await this.$fire.firestore
            .collection('events')
            .doc(this.$route.params.id)
            .collection('tournaments')
            .doc(this.$route.params.tournamentID)
            .collection('group-stage')
            .doc('seedings')
            .update({
              group_A: selectedData.group_A,
              group_B: selectedData.group_B,
              group_C: selectedData.group_C,
              group_D: selectedData.group_D,
            })
            .then(() => {
              this.fixture_data_A = []
              this.fixture_data_B = []
              this.fixture_data_C = []
              this.fixture_data_D = []

              for (var i = 0; i < this.tournamentRef.gTeamNumbers; i++) {
                this.fixture_data_A.push(selectedData.group_A[i].teamName)
                this.fixture_data_B.push(selectedData.group_B[i].teamName)
                this.fixture_data_C.push(selectedData.group_C[i].teamName)
                this.fixture_data_D.push(selectedData.group_D[i].teamName)
              }
            })
            .then(async () => {
              // Initialize Fixture
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('group-stage')
                .doc('fixtures')
                .set({
                  fixture_A: [],
                  fixture_B: [],
                  fixture_C: [],
                  fixture_D: [],
                })

              // Initialize Table
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('group-stage')
                .doc('tables')
                .set({
                  table_A: [],
                  table_B: [],
                  table_C: [],
                  table_D: [],
                })

              // Initialize Final Stage
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('final-stage')
                .doc('fixtures')
                .set({
                  quarterFinal: [
                    // Quarter Final 1
                    {
                      fixtureID: 'quarterFinal1',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 1',
                      homeTeam: 'Group A1',
                      awayTeam: 'Group B2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Quarter Final 2
                    {
                      fixtureID: 'quarterFinal2',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 2',
                      homeTeam: 'Group B1',
                      awayTeam: 'Group A2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Quarter Final 3
                    {
                      fixtureID: 'quarterFinal3',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 3',
                      homeTeam: 'Group C1',
                      awayTeam: 'Group D2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Quarter Final 4
                    {
                      fixtureID: 'quarterFinal4',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 4',
                      homeTeam: 'Group D1',
                      awayTeam: 'Group C2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  semiFinal: [
                    // Semi Final 1
                    {
                      fixtureID: 'semiFinal1',
                      bracketID: 'semiFinal',
                      title: 'Semi Final 1',
                      homeTeam: 'Quarter Final 1 Winner',
                      awayTeam: 'Quarter Final 2 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Semi Final 2
                    {
                      fixtureID: 'semiFinal2',
                      bracketID: 'semiFinal',
                      title: 'Semi Final 2',
                      homeTeam: 'Quarter Final 3 Winner',
                      awayTeam: 'Quarter Final 4 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  thirdPlace: [
                    // 3rd Place
                    {
                      fixtureID: '3rdPlace',
                      bracketID: 'thirdPlace',
                      title: '3rd Place',
                      homeTeam: 'Semi Final 1 Loser',
                      awayTeam: 'Semi Final 2 Loser',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  final: [
                    // Final Place
                    {
                      fixtureID: 'final',
                      bracketID: 'final',
                      title: 'Final',
                      homeTeam: 'Semi Final 1 Winner',
                      awayTeam: 'Semi Final 2 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],
                })
            })
            .then(async () => {
              // If fixture played once, else fixture played home away method
              if (this.tournamentRef.gRound == 'once') {
                // Generate Fixture A
                const games_A = generator(this.fixture_data_A, {
                  type: 'single-round',
                })
                this.fixture_A = games_A.data

                // Generate Fixture B
                const games_B = generator(this.fixture_data_B, {
                  type: 'single-round',
                })
                this.fixture_B = games_B.data

                // Generate Fixture C
                const games_C = generator(this.fixture_data_C, {
                  type: 'single-round',
                })
                this.fixture_C = games_C.data

                // Generate Fixture D
                const games_D = generator(this.fixture_data_D, {
                  type: 'single-round',
                })
                this.fixture_D = games_D.data
              } else {
                // Generate Fixture A
                const games_A = generator(this.fixture_data_A, {
                  type: 'double-round',
                })
                this.fixture_A = games_A.data

                // Generate Fixture B
                const games_B = generator(this.fixture_data_B, {
                  type: 'double-round',
                })
                this.fixture_B = games_B.data

                // Generate Fixture C
                const games_C = generator(this.fixture_data_C, {
                  type: 'double-round',
                })
                this.fixture_C = games_C.data

                // Generate Fixture D
                const games_D = generator(this.fixture_data_D, {
                  type: 'double-round',
                })
                this.fixture_D = games_D.data
              }

              // Store Fixture A
              await this.fixture_A.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_A: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_A',
                      tableID: 'table_A',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture B
              await this.fixture_B.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_B: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_B',
                      tableID: 'table_B',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture C
              await this.fixture_C.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_C: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_C',
                      tableID: 'table_C',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture D
              await this.fixture_D.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_D: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_D',
                      tableID: 'table_D',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })
            })
            .then(async () => {
              // Initialize Table A
              await this.group_A.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_A: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table B
              await this.group_B.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_B: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table C
              await this.group_C.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_C: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table D
              await this.group_D.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_D: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })
            })
        } else if (this.tournamentRef.gGroupNumber == 8) {
          await this.$fire.firestore
            .collection('events')
            .doc(this.$route.params.id)
            .collection('tournaments')
            .doc(this.$route.params.tournamentID)
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
            .then(() => {
              this.fixture_data_A = []
              this.fixture_data_B = []
              this.fixture_data_C = []
              this.fixture_data_D = []
              this.fixture_data_E = []
              this.fixture_data_F = []
              this.fixture_data_G = []
              this.fixture_data_H = []

              for (var i = 0; i < this.tournamentRef.gTeamNumbers; i++) {
                this.fixture_data_A.push(selectedData.group_A[i].teamName)
                this.fixture_data_B.push(selectedData.group_B[i].teamName)
                this.fixture_data_C.push(selectedData.group_C[i].teamName)
                this.fixture_data_D.push(selectedData.group_D[i].teamName)
                this.fixture_data_E.push(selectedData.group_E[i].teamName)
                this.fixture_data_F.push(selectedData.group_F[i].teamName)
                this.fixture_data_G.push(selectedData.group_G[i].teamName)
                this.fixture_data_H.push(selectedData.group_H[i].teamName)
              }
            })
            .then(async () => {
              // Initialize Fixture
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('group-stage')
                .doc('fixtures')
                .set({
                  fixture_A: [],
                  fixture_B: [],
                  fixture_C: [],
                  fixture_D: [],
                  fixture_E: [],
                  fixture_F: [],
                  fixture_G: [],
                  fixture_H: [],
                })

              // Initialize Table
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('group-stage')
                .doc('tables')
                .set({
                  table_A: [],
                  table_B: [],
                  table_C: [],
                  table_D: [],
                  table_E: [],
                  table_F: [],
                  table_G: [],
                  table_H: [],
                })

              // Initialize Final Stage
              await this.$fire.firestore
                .collection('events')
                .doc(this.$route.params.id)
                .collection('tournaments')
                .doc(this.$route.params.tournamentID)
                .collection('final-stage')
                .doc('fixtures')
                .set({
                  round16: [
                    // Round16 1
                    {
                      fixtureID: 'round161',
                      bracketID: 'round16',
                      title: 'Round 16 1',
                      homeTeam: 'Group A1',
                      awayTeam: 'Group B2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Round16 2
                    {
                      fixtureID: 'round162',
                      bracketID: 'round16',
                      title: 'Round 16 2',
                      homeTeam: 'Group B1',
                      awayTeam: 'Group A2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Round16 3
                    {
                      fixtureID: 'round163',
                      bracketID: 'round16',
                      title: 'Round 16 3',
                      homeTeam: 'Group C1',
                      awayTeam: 'Group D2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Round16 4
                    {
                      fixtureID: 'round164',
                      bracketID: 'round16',
                      title: 'Round 16 4',
                      homeTeam: 'Group D1',
                      awayTeam: 'Group C2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Round16 5
                    {
                      fixtureID: 'round165',
                      bracketID: 'round16',
                      title: 'Round 16 5',
                      homeTeam: 'Group E1',
                      awayTeam: 'Group F2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Round16 6
                    {
                      fixtureID: 'round166',
                      bracketID: 'round16',
                      title: 'Round 16 6',
                      homeTeam: 'Group F1',
                      awayTeam: 'Group E2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Round16 7
                    {
                      fixtureID: 'round167',
                      bracketID: 'round16',
                      title: 'Round 16 7',
                      homeTeam: 'Group G1',
                      awayTeam: 'Group H2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Round16 7
                    {
                      fixtureID: 'round168',
                      bracketID: 'round16',
                      title: 'Round 16 8',
                      homeTeam: 'Group H1',
                      awayTeam: 'Group G2',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  quarterFinal: [
                    // Quarter Final 1
                    {
                      fixtureID: 'quarterFinal1',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 1',
                      homeTeam: 'Round 16 1 Winner',
                      awayTeam: 'Round 16 2 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Quarter Final 2
                    {
                      fixtureID: 'quarterFinal2',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 2',
                      homeTeam: 'Round 16 3 Winner',
                      awayTeam: 'Group 16 4 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Quarter Final 3
                    {
                      fixtureID: 'quarterFinal3',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 3',
                      homeTeam: 'Round 16 5 Winner',
                      awayTeam: 'Round 16 6 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Quarter Final 4
                    {
                      fixtureID: 'quarterFinal4',
                      bracketID: 'quarterFinal',
                      title: 'Quarter Final 4',
                      homeTeam: 'Round 16 7 Winner',
                      awayTeam: 'Round 16 8 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  semiFinal: [
                    // Semi Final 1
                    {
                      fixtureID: 'semiFinal1',
                      bracketID: 'semiFinal',
                      title: 'Semi Final 1',
                      homeTeam: 'Quarter Final 1 Winner',
                      awayTeam: 'Quarter Final 2 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },

                    // Semi Final 2
                    {
                      fixtureID: 'semiFinal2',
                      bracketID: 'semiFinal',
                      title: 'Semi Final 2',
                      homeTeam: 'Quarter Final 3 Winner',
                      awayTeam: 'Quarter Final 4 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  thirdPlace: [
                    // 3rd Place
                    {
                      fixtureID: '3rdPlace',
                      bracketID: 'thirdPlace',
                      title: '3rd Place',
                      homeTeam: 'Semi Final 1 Loser',
                      awayTeam: 'Semi Final 2 Loser',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],

                  final: [
                    // Final Place
                    {
                      fixtureID: 'final',
                      bracketID: 'final',
                      title: 'Final',
                      homeTeam: 'Semi Final 1 Winner',
                      awayTeam: 'Semi Final 2 Winner',
                      homeScore: 0,
                      awayScore: 0,
                      homeSet: 0,
                      awaySet: 0,
                      winner: null,
                      loser: null,
                      isFulltime: false,
                      isMatchStart: false,
                      isTie: false,
                    },
                  ],
                })
            })
            .then(async () => {
              // If fixture played once, else fixture played home away method
              if (this.tournamentRef.gRound == 'once') {
                // Generate Fixture A
                const games_A = generator(this.fixture_data_A, {
                  type: 'single-round',
                })
                this.fixture_A = games_A.data

                // Generate Fixture B
                const games_B = generator(this.fixture_data_B, {
                  type: 'single-round',
                })
                this.fixture_B = games_B.data

                // Generate Fixture C
                const games_C = generator(this.fixture_data_C, {
                  type: 'single-round',
                })
                this.fixture_C = games_C.data

                // Generate Fixture D
                const games_D = generator(this.fixture_data_D, {
                  type: 'single-round',
                })
                this.fixture_D = games_D.data

                // Generate Fixture E
                const games_E = generator(this.fixture_data_E, {
                  type: 'single-round',
                })
                this.fixture_E = games_E.data

                // Generate Fixture F
                const games_F = generator(this.fixture_data_F, {
                  type: 'single-round',
                })
                this.fixture_F = games_F.data

                // Generate Fixture G
                const games_G = generator(this.fixture_data_G, {
                  type: 'single-round',
                })
                this.fixture_G = games_G.data

                // Generate Fixture H
                const games_H = generator(this.fixture_data_H, {
                  type: 'single-round',
                })
                this.fixture_H = games_H.data
              } else {
                // Generate Fixture A
                const games_A = generator(this.fixture_data_A, {
                  type: 'double-round',
                })
                this.fixture_A = games_A.data

                // Generate Fixture B
                const games_B = generator(this.fixture_data_B, {
                  type: 'double-round',
                })
                this.fixture_B = games_B.data

                // Generate Fixture C
                const games_C = generator(this.fixture_data_C, {
                  type: 'double-round',
                })
                this.fixture_C = games_C.data

                // Generate Fixture D
                const games_D = generator(this.fixture_data_D, {
                  type: 'double-round',
                })
                this.fixture_D = games_D.data

                // Generate Fixture E
                const games_E = generator(this.fixture_data_E, {
                  type: 'double-round',
                })
                this.fixture_E = games_E.data

                // Generate Fixture F
                const games_F = generator(this.fixture_data_F, {
                  type: 'double-round',
                })
                this.fixture_F = games_F.data

                // Generate Fixture G
                const games_G = generator(this.fixture_data_G, {
                  type: 'double-round',
                })
                this.fixture_G = games_G.data

                // Generate Fixture H
                const games_H = generator(this.fixture_data_H, {
                  type: 'double-round',
                })
                this.fixture_H = games_H.data
              }

              // Store Fixture A
              await this.fixture_A.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_A: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_A',
                      tableID: 'table_A',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture B
              await this.fixture_B.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_B: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_B',
                      tableID: 'table_B',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture C
              await this.fixture_C.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_C: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_C',
                      tableID: 'table_C',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture D
              await this.fixture_D.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_D: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_D',
                      tableID: 'table_D',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture E
              await this.fixture_E.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_E: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_E',
                      tableID: 'table_E',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture F
              await this.fixture_F.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_F: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_F',
                      tableID: 'table_F',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture G
              await this.fixture_G.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_G: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_G',
                      tableID: 'table_G',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })

              // Store Fixture H
              await this.fixture_H.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('fixtures')
                  .update({
                    fixture_H: firebase.firestore.FieldValue.arrayUnion({
                      fixtureID: 'fixture_H',
                      tableID: 'table_H',
                      homeTeam: doc.homeTeam,
                      awayTeam: doc.awayTeam,
                      round: doc.round,
                      homeScore: 0,
                      awayScore: 0,
                      winner: null,
                      loser: null,
                      isTie: false,
                      isFulltime: false,
                      isMatchStart: false,
                    }),
                  })
              })
            })
            .then(async () => {
              // Initialize Table A
              await this.group_A.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_A: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table B
              await this.group_B.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_B: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table C
              await this.group_C.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_C: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table D
              await this.group_D.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_D: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table E
              await this.group_E.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_E: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table F
              await this.group_F.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_F: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table G
              await this.group_G.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_G: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })

              // Initialize Table H
              await this.group_H.forEach((doc) => {
                this.$fire.firestore
                  .collection('events')
                  .doc(this.$route.params.id)
                  .collection('tournaments')
                  .doc(this.$route.params.tournamentID)
                  .collection('group-stage')
                  .doc('tables')
                  .update({
                    table_H: firebase.firestore.FieldValue.arrayUnion({
                      teamName: doc.teamName,
                      matches: 0,
                      win: 0,
                      lost: 0,
                      draw: 0,
                      goals_for: 0,
                      goals_against: 0,
                      goals_difference: 0,
                      points: 0,
                    }),
                  })
              })
            })
        }

        await this.$fire.firestore
          .collection('events')
          .doc(this.$route.params.id)
          .collection('tournaments')
          .doc(this.$route.params.tournamentID)
          .update({
            isGroupDraw: true,
            isGroupStage: false,
            isRound16: false,
            isQuarterFinal: false,
            isSemiFinal: false,
            isThirdPlace: false,
            isFinal: false,
          })
          .then(() => {
            // Loading state -> false
            this.isLoading = false
            this.addSeedingsOverlay = false
          })
      } catch (error) {
        // Loading state -> true
        this.isLoading = false
        console.log(error)
      }
    },
  },
}
</script>
