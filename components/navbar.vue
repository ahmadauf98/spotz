<template>
  <!-- Navigation Bar -->
  <v-app-bar
    class="d-none d-sm-inline px-2 px-md-15"
    elevate-on-scroll
    color="white"
    app
  >
    <!-- Brand Logo -->
    <v-toolbar-title>
      <NuxtLink to="/">
        <img
          class="mt-2 mr-8"
          src="~/static/img/logo.svg"
          alt="..."
          height="30px"
        />
      </NuxtLink>
    </v-toolbar-title>

    <!-- Navigation Button -->
    <div class="d-none d-md-inline" v-for="nav in navigation" :key="nav.name">
      <v-btn
        class="mx-1 px-1 text-capitalize"
        color="#1A202C"
        :to="nav.route"
        text
      >
        {{ nav.name }}
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <!-- Temporary Search Bar -->
    <div
      class="v-responsive mr-auto mr-md-4 d-none d-md-inline"
      style="max-width: 450px"
    >
      <div class="v-responsive__content">
        <div
          class="v-input v-input--hide-details v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--solo-flat v-text-field--is-booted v-text-field--enclosed v-text-field--rounded"
        >
          <div class="v-input__control">
            <div class="v-input__slot grey lighten-3">
              <div class="v-input__prepend-inner">
                <div class="v-input__icon v-input__icon--prepend-inner">
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate mdi mdi-magnify theme--light"
                  ></i>
                </div>
              </div>
              <div class="v-text-field__slot">
                <label
                  class="v-label theme--light"
                  style="left: 0px; right: auto; position: absolute"
                  >Search</label
                ><input
                  id="doc-search"
                  type="text"
                  class="ds-input"
                  autocomplete="off"
                  spellcheck="false"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded="false"
                  aria-label="search input"
                  aria-owns="algolia-autocomplete-listbox-0"
                  dir="auto"
                  style=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Temporary Search Bar -->

    <v-spacer></v-spacer>

    <v-btn href="http://localhost:3000/" class="mr-5 text-capitalize" outlined>
      Organize
    </v-btn>

    <v-btn to="/signin" color="primary" class="text-capitalize">
      Login as Manager
    </v-btn>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      navigation: [
        { name: 'Tournaments', route: '/browseTournaments' },
        { name: 'Events', route: '/browseEvents' },
      ],
    }
  },
}
</script>
