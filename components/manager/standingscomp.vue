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
            Tournament Standings
          </h1>
          <div>
            <h1
              class="text-subtitle-1 font-weight-regular text-center text-md-left mb-5"
            >
              Currently there is no tournament standings yet. Please wait the
              organizer draw the tournament after team registration completed.
              Then tournament standings of each group will be displayed here.
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

    <!-- Tournament Standings -->
    <v-card v-else class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
      <h1 class="text-subtitle-1 font-weight-bold mb-1">
        Tournament Standings
      </h1>

      <div class="mt-5">
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
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group A
            </h1>
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
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group B
            </h1>
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
            tournamentRef.gGroupNumber == 4 || tournamentRef.gGroupNumber == 8
          "
          class="text-center justify-center mt-5"
        >
          <div class="d-flex align-center">
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group C
            </h1>
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
            tournamentRef.gGroupNumber == 4 || tournamentRef.gGroupNumber == 8
          "
          class="text-center justify-center mt-5"
        >
          <div class="d-flex align-center">
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group D
            </h1>
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
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group E
            </h1>
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
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group F
            </h1>
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
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group G
            </h1>
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
            <h1 class="text-subtitle-2 font-weight-bold text-left mb-2">
              Group H
            </h1>
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
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // User Input Data
      tournamentRef: '',

      // Table Data
      table_A: [],
      table_B: [],
      table_C: [],
      table_D: [],
      table_E: [],
      table_F: [],
      table_G: [],
      table_H: [],
    }
  },

  // Fetch Data from Firestore
  mounted() {
    // Tournament Data
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
      .onSnapshot((doc) => {
        this.tournamentRef = doc.data()
      })

    // Get Standings Table of Each Group
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
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
  },
}
</script>
