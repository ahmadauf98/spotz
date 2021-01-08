<template>
  <div>
    <!-- Mobile Resolution -->
    <div class="d-sm-none">
      <!-- First Section -->
      <div class="px-2 nav-mx mt-5 mb-15">
        <v-row class="d-flex align-center">
          <!-- Title -->
          <v-col cols="12" order="2">
            <h1 class="text-h3 font-weight-black mb-8 text-center">
              A new way of organize sports
            </h1>

            <h1
              class="text-subtitle-2 font-weight-medium text-grey mx-5 mb-6 text-center"
            >
              Join the others who trust Spotz to handle their sports events and
              tournaments. Customized for "Sukan Mahasiswa Universiti Malaya
              (SUKMUM)" but can be adapted to the others as well.
            </h1>
            <div class="d-flex justify-center">
              <v-btn
                href="https://play.google.com/store"
                color="green lighten-1"
                class="text-body-1 text-capitalize font-weight-medium px-8 py-5"
                outlined
              >
                <v-icon class="mr-1">mdi-google-play</v-icon>
                Play Store
              </v-btn>
            </div>
          </v-col>

          <!-- Illustration -->
          <v-col cols="12" order="1" class="d-flex justify-center">
            <img
              class="illustration"
              src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FIllustration.svg?alt=media&token=687c01d1-6770-45cc-ae21-2c0d02ee5982"
              alt="..."
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Desktop and Tablet Resolution -->
    <div class="d-none d-sm-block">
      <!-- First Section -->
      <div class="px-2 nav-mx mt-5 mt-md-15">
        <v-row class="d-flex align-center">
          <!-- Title -->
          <v-col cols="12" md="6" order="2" order-md="1">
            <h1
              class="text-h2 font-weight-black mb-8 mb-md-6 text-center text-md-left"
            >
              A new way of organize sports
            </h1>

            <h1
              class="text-subtitle-1 font-weight-medium text-grey mx-15 mx-md-0 mb-6 mb-md-5 text-center text-md-left"
            >
              Join the others who trust Spotz to handle their sports events and
              tournaments. Customized for "Sukan Mahasiswa Universiti Malaya
              (SUKMUM)" but can be adapted to the others as well.
            </h1>
            <div class="d-flex justify-center justify-md-start">
              <v-btn
                to="/organizer/signin"
                color="primary"
                class="text-body-1 text-capitalize font-weight-medium px-8 py-5"
                rounded
                depressed
              >
                Get Started
              </v-btn>
            </div>
          </v-col>

          <!-- Illustration -->
          <v-col
            cols="12"
            md="6"
            order="1"
            order-md="2"
            class="d-flex justify-center justify-md-end"
          >
            <img
              class="illustration"
              src="https://firebasestorage.googleapis.com/v0/b/sports-management-system-v2.appspot.com/o/website%2FIllustration.svg?alt=media&token=687c01d1-6770-45cc-ae21-2c0d02ee5982"
              alt="..."
            />
          </v-col>
        </v-row>
      </div>

      <!-- Second Section -->
      <div class="background-color mt-15 py-15">
        <div class="px-2 nav-mx">
          <h1 class="text-h4 font-weight-black mb-4 mb-md-2 text-center mt-10">
            Create an Event
          </h1>

          <v-row class="d-flex justify-center">
            <v-col cols="10" md="8" xl="6">
              <h1
                class="text-subtitle-1 font-weight-medium text-grey mx-15 mb-6 mb-md-5 text-center"
              >
                Got a multi-tournament event? We've got you. We have a number of
                preferences that can suit your situation.
              </h1>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center mt-n2 mt-md-8">
            <v-col
              v-for="(event, index) in events"
              :key="index"
              cols="12"
              md="4"
              xl="3"
            >
              <v-card
                class="pt-15 pb-10 px-5 mx-3 mt-8 mt-md-0 card"
                flat
                shaped
              >
                <div class="mt-n10">
                  <v-avatar size="60" color="primary" class="mt-n15">
                    <v-icon size="30" dark> {{ event.icon }} </v-icon>
                  </v-avatar>
                </div>

                <h1 class="text-h5 font-weight-bold mb-4">{{ event.title }}</h1>
                <h1 class="text-subtitle-1 font-weight-regular text-grey">
                  {{ event.subtitle }}
                </h1>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- Third Section -->
      <div class="mt-5 py-15">
        <div class="px-2 nav-mx">
          <h1 class="text-h4 font-weight-black mb-4 mb-md-2 text-center mt-10">
            Create a Tournament
          </h1>

          <v-row class="d-flex justify-center">
            <v-col cols="10" md="8" xl="6">
              <h1
                class="text-subtitle-1 font-weight-medium text-grey mx-15 mb-6 mb-md-5 text-center"
              >
                Is it just possible to run a single tournament? Don't worry, you
                can manage a single tournament with us as well.
              </h1>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center mt-n2 mt-md-8">
            <v-col
              v-for="(tournament, index) in tournaments"
              :key="index"
              cols="12"
              md="4"
              xl="3"
            >
              <v-card
                class="pt-15 pb-10 px-5 mx-3 mt-8 mt-md-0 card"
                color="#eff1f7"
                flat
                shaped
              >
                <div class="mt-n10">
                  <v-avatar size="60" color="primary" class="mt-n15">
                    <v-icon size="30" dark> {{ tournament.icon }} </v-icon>
                  </v-avatar>
                </div>

                <h1 class="text-h5 font-weight-bold mb-4">
                  {{ tournament.title }}
                </h1>
                <h1 class="text-subtitle-1 font-weight-regular text-grey">
                  {{ tournament.subtitle }}
                </h1>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>

      <!-- Fourth Section -->
      <div id="section4" class="py-15">
        <div class="px-2 nav-mx">
          <h1
            class="text-h4 font-weight-black mb-5 text-center mt-10 text-white"
          >
            Become a manager to participate in tournaments
          </h1>

          <div class="d-flex justify-center">
            <v-btn
              to="/manager/signin"
              color="white"
              class="text-body-1 text-capitalize font-weight-bold px-8 py-5 mb-4"
              rounded
              depressed
            >
              Login
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'homepage',

  middleware: 'autologout',

  data() {
    return {
      events: [
        {
          title: 'Multiple Tournaments',
          subtitle:
            'Our web application allows you to create multiple tournaments for a single event. Manage all of them in just one list of events.',
          icon: 'mdi-tournament',
        },
        {
          title: 'Automation Standings',
          subtitle:
            'All you need to do is alter the result, then we automate the standing in one for all tournaments.',
          icon: 'mdi-format-list-numbered',
        },
        {
          title: 'Organizer Collaboration',
          subtitle:
            'Managing an event alone is difficult. So to manage together you can add your colleagues, family or committee members.',
          icon: 'mdi-account-group',
        },
      ],

      tournaments: [
        {
          title: 'Minimalist UI',
          subtitle:
            'The user interface (UI) of our web application & mobile application is minimal. Therefore, navigating and handling the tournaments is simple for new users.',
          icon: 'mdi-manjaro',
        },
        {
          title: 'Registration Setup',
          subtitle:
            'You can customize the player registration details in your registration form using our player registration setup.',
          icon: 'mdi-file-document',
        },
        {
          title: 'Live Scoreboard',
          subtitle:
            'You can update the scoreboard while the match game is running. In real-time, this scoreboard will be seen in public.',
          icon: 'mdi-update',
        },
      ],
    }
  },
}
</script>

<style scoped>
.illustration {
  pointer-events: none;
}

.background-color {
  background-color: #eff1f7;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .illustration {
    width: 250px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .nav-mx {
    margin: 0px 30px;
  }

  .illustration {
    width: 350px;
  }

  #section4 {
    background-image: url(~static/img/background-join-mobile.svg);
    background-color: #6243ad;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}

/* Medium devices (landscape tablets, 960px and up) */
@media only screen and (min-width: 960px) {
  .nav-mx {
    margin: 0px 80px;
  }

  .illustration {
    width: 400px;
  }

  .card {
    height: 310px;
  }

  #section4 {
    background-image: url(~static/img/background-join-desktop.svg);
    background-color: #6243ad;
    background-repeat: no-repeat;
    background-size: 170%;
  }
}

/* Large devices (laptops/desktops, 1264px and up) */
@media only screen and (min-width: 1264px) {
  .nav-mx {
    margin: 0px 200px;
  }

  .illustration {
    width: 450px;
  }

  .card {
    height: 250px;
  }
}

/* Extra large devices (large laptops and desktops, 1904px and up) */
@media only screen and (min-width: 1904px) {
  .nav-mx {
    margin: 0px 370px;
  }

  .illustration {
    width: 600px;
  }

  .card {
    height: 310px;
  }
}
</style>
