import BdLightbox from './src/components/index.vue'
import lightbox from './src/directives'
import { App } from 'vue'

export default {
  install: (vue: App): void => {
    vue.component(BdLightbox.name, BdLightbox)
  }
}

export {
  lightbox,
  BdLightbox
}
