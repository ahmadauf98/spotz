<template>
  <!-- Navigation Bar -->
  <v-app-bar
    class="d-flex d-sm-none nav-padding"
    height="80"
    elevate-on-scroll
    color="white"
    app
  >
    <!-- Brand Logo -->
    <NuxtLink to="/">
      <img
        class="mt-2 ml-2"
        src="~/static/img/logo.svg"
        alt="..."
        height="30px"
      />
    </NuxtLink>
  </v-app-bar>
</template>

<script>
export default {}
</script>
