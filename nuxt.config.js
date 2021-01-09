import colors from 'vuetify/es5/util/colors'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,

  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'Spotz - Sports Management System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Join the others who trust Spotz to handle their sports events and tournaments. Customized for "Sukan Mahasiswa Universiti Malaya (SUKMUM)" but can be adapted to the others as well.',
      },
      { property: 'og:site_name', content: 'Spotz AA' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://spotz-v1.vercel.app',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Spotz - Sports Management System',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Join the others who trust Spotz to handle their sports events and tournaments. Customized for "Sukan Mahasiswa Universiti Malaya (SUKMUM)" but can be adapted to the others as well.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/meta-logo.png',
      },
      { property: 'og:image:width', content: '740' },
      { property: 'og:image:height', content: '300' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://spotz-v1.vercel.app',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Spotz - Sports Management System',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Join the others who trust Spotz to handle their sports events and tournaments. Customized for "Sukan Mahasiswa Universiti Malaya (SUKMUM)" but can be adapted to the others as well.',
      },
      {
        hid: 'twitter:image0',
        name: 'twitter:image0',
        content: '/meta-logo.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/vee-validate.js'],

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

  // Firebase module configuration (https://firebase.nuxtjs.org)
  firebase: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
    services: {
      auth: true,
      storage: true,
      firestore: true,
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  server: {
    port: 8000, // default: 3000
  },

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
  build: { transpile: ['vee-validate/dist/rules'] },
}
