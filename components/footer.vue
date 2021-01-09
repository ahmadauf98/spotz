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
                  <NuxtLink to="#" class="text-decoration-none">
                    <h1
                      class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left text-black"
                    >
                      About
                    </h1>
                  </NuxtLink>

                  <NuxtLink to="#" class="text-decoration-none">
                    <h1
                      class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left text-black"
                    >
                      Contact
                    </h1>
                  </NuxtLink>

                  <NuxtLink to="#" class="text-decoration-none">
                    <h1
                      class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left text-black"
                    >
                      Our Team
                    </h1>
                  </NuxtLink>
                </v-col>
                <v-col cols="4" md="6">
                  <NuxtLink to="#" class="text-decoration-none">
                    <h1
                      class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left text-black"
                    >
                      FAQ
                    </h1>
                  </NuxtLink>

                  <NuxtLink to="#" class="text-decoration-none">
                    <h1
                      class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left text-black"
                    >
                      Terms & Condition
                    </h1>
                  </NuxtLink>

                  <NuxtLink to="#" class="text-decoration-none">
                    <h1
                      class="text-subtitle-1 font-weight-medium mb-1 text-center text-lg-left text-black"
                    >
                      Privacy Policy
                    </h1>
                  </NuxtLink>
                </v-col>
              </v-row>
            </v-col>

            <!-- Third Column -->
            <v-col cols="12" lg="4" xl="3" class="mt-n5">
              <h1 class="text-caption text-grey mb-2">Final Year Project in</h1>
              <img
                class="logo"
                src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FUniversiti%2BMalaya.png?alt=media&token=6fefee2f-6b43-4b96-bd13-8877842f7127"
                alt="..."
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

<style scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .logo {
    width: 150px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .logo {
    width: 200px;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
}
</style>
