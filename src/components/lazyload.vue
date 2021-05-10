<template>
  <img :data-src="imgSrc" v-show="isLoaded" v-bind="$attrs" @load="loaded" ref="lazyImageRef">
  <div v-if="!isLoaded" class="lightbox-lazy" />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    start: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isLoaded = ref(false)
    const lazyImageRef = ref<HTMLImageElement | null>(null)

    const loaded = (): void => {
      isLoaded.value = true
    }

    const setImage = (): void => {
      lazyImageRef.value.src = lazyImageRef.value.getAttribute('data-src')
    }

    watchEffect(() => {
      if(props.start && !isLoaded.value && lazyImageRef.value) setImage()
    })

    return {
      loaded,
      isLoaded,
      lazyImageRef
    }
  }
})
</script>

<style scoped>
.lightbox-lazy {
  width: 60px;
  height: 60px;
 
  position: relative;
  margin: 100px auto;
}
 
.lightbox-lazy::before, .lightbox-lazy::after {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #67CF22;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
   
  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}
 
.lightbox-lazy::after {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
 
@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
