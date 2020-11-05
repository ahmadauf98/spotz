import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - manager',
    title: 'manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
    '@nuxtjs/firebase', //https://firebase.nuxtjs.org
  ],

  // Firebase module configureation (https://firebase.nuxtjs.org)
  firebase: {
    config: {
      apiKey: 'AIzaSyC7fccNMz52ebXVlUeJOGBnN1KrszrnC5E',
      authDomain: 'sports-management-system-v2.firebaseapp.com',
      databaseURL: 'https://sports-management-system-v2.firebaseio.com',
      projectId: 'sports-management-system-v2',
      storageBucket: 'sports-management-system-v2.appspot.com',
      messagingSenderId: '516883653948',
      appId: '1:516883653948:web:804497f4864ef2d07cea39',
      measurementId: 'G-CDL1Z4R6HF',
    },
    services: {
      auth: true,
      storage: true,
      firestore: true,
    },
  },

  server: {
    port: 8000, // default: 3000
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.deepPurple.darken1,
          accent: colors.grey,
          secondary: colors.amber,
          info: colors.teal,
          warning: colors.amber.base,
          error: colors.deepOrange,
          success: colors.green,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
