import Vue from 'vue'
import I18n from 'vue-i18n'
const messages = require('../i18n');
const LOCALE = process.env.LOCALE || 'zh-CN';
Vue.use(I18n);
export default ({app, store}) => {
  let locale = LOCALE;
  app.i18n = new I18n({
    locale: locale.match(/^(en|en-US|zh-CN)$/) ? locale : 'en',
    fallbackLocale: 'zh-CN',
    messages,
  });
}

