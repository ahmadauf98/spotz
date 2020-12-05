<template>
  <div>
    <!-- Group Seedings -->
    <v-card class="mx-auto py-10 mt-n3 mt-lg-0 px-9" outlined tile>
      <h1 class="text-subtitle-1 font-weight-bold mb-1">Group Seedings</h1>

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
            tournamentRef.gGroupNumber == 4 || tournamentRef.gGroupNumber == 8
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
            tournamentRef.gGroupNumber == 4 || tournamentRef.gGroupNumber == 8
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
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // User Input Data
      tournamentRef: '',

      // Team Draw Data
      group_A: '',
      group_B: '',
      group_C: '',
      group_D: '',
      group_E: '',
      group_F: '',
      group_G: '',
      group_H: '',
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

    // Get Bracket Group
    this.$fire.firestore
      .collection('tournaments')
      .doc(this.$route.params.id)
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
  },
}
</script>
