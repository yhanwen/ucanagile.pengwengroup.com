const pkg = require('./package')

const isDev = process.env.NODE_ENV !== 'production';
const prodHost = process.env.APIBASE || '';
const cdnBase = process.env.CDNBASE || '/_nuxt/'
console.log('Building...', {
  isDev, prodHost, cdnBase
});
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'SODA',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ],
    script: [
      { src: "https://api.map.baidu.com/api?v=2.0&ak=m7Lfcq4GD9za2531Cw2GumDZFcbDoZ5H" },
      { src: "https://hm.baidu.com/hm.js?0755a0a68a327d29ecaf363900715523" },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/reset.css',
    '~assets/icons/style.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/route',
    '~/plugins/i18n',
    { src: '~plugins/animate', ssr: false },
    '@/plugins/element-ui'
  ],


  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: isDev ? '' : prodHost,
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    publicPath: isDev ? '/_nuxt/' : cdnBase,

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
