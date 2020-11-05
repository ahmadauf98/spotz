<template>
  <v-app>
    <v-main>
      <!-- Navigation Bar -->
      <navbar />
      <!-- Body Content -->
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navbar from '~/components/navbar'

export default {
  components: {
    navbar,
  },
}
</script>

<style>
.text-green {
  color: #00c58e;
}

.text-primary {
  color: #6b46c1;
}

.text-red {
  color: #f11e41;
}

.text-black {
  color: black;
}

.text-white {
  color: white;
}

.hyperlink :hover {
  color: #9f7aea;
}

.text-hover:hover {
  text-decoration: underline;
}
</style>
