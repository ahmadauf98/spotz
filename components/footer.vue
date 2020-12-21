<template>
  <v-footer padless relative color="white" class="d-block">
    <v-divider></v-divider>

    <v-card flat tile class="text-center pa-5 pt-15">
      <div class="mx-md-10 mx-lg-15 px-lg-15">
        <div class="mx-xl-15 px-xl-15">
          <v-row class="d-flex align-center justify-center">
            <!-- First Column -->
            <v-col cols="12" lg="4" xl="3" class="d-lg-flex">
              <div class="mr-auto">
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2Ffooter_logo_black.svg?alt=media&token=ec5671c1-670e-49a2-bb84-fe40e01db34b"
                    alt="..."
                    width="120"
                  />
                </div>
                <div>
                  <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-1" icon>
                      <v-icon color="#232127" size="24px">
                        {{ icon }}
                      </v-icon>
                    </v-btn>
                  </v-card-text>
                </div>
              </div>
            </v-col>

            <!-- Second Column -->
            <v-col cols="12" lg="4">
              <v-row class="mt-n6 d-flex justify-center">
                <v-col cols="4" md="6">
                  <h1
                    class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left"
                  >
                    About
                  </h1>
                  <h1
                    class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left"
                  >
                    Contact
                  </h1>
                  <h1
                    class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left"
                  >
                    Our Team
                  </h1>
                </v-col>
                <v-col cols="4" md="6">
                  <h1
                    class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left"
                  >
                    FAQ
                  </h1>
                  <h1
                    class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left"
                  >
                    Terms & Condition
                  </h1>
                  <h1
                    class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left"
                  >
                    Privacy Policy
                  </h1>
                </v-col>
              </v-row>
            </v-col>

            <!-- Third Column -->
            <v-col cols="12" lg="4" xl="3" class="mt-n5">
              <h1 class="text-caption text-grey mb-2">Final Year Project in</h1>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FUniversiti%2BMalaya.png?alt=media&token=6fefee2f-6b43-4b96-bd13-8877842f7127"
                alt="..."
                width="200"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-card-text>
              &#169;
              <span class="text-caption">{{ new Date().getFullYear() }}</span>
              <strong>SPOTZ AA</strong>. All Rights Reserved.
            </v-card-text>
          </v-row>
        </div>
      </div>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-instagram', 'mdi-github'],
  }),
}
</script>
