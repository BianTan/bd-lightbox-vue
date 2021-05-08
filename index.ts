import VueLightbox from './components/index.vue'

export default {
  install: (vue: any) => {
    vue.component(VueLightbox.name, VueLightbox)
  }
}
