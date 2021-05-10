<template>
  <img :data-src="src" v-show="isLoaded" v-bind="$attrs" @load="loaded" ref="lazyloadRef">
  <div v-if="!isLoaded" class="lightbox-lazy" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

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
    const lazyloadRef = ref<HTMLImageElement | null>(null)

    const loaded = (e): void => {
      console.log(e)
      isLoaded.value = true
    }

    watch(() => props.start, (newValue: boolean) => {
      const target = lazyloadRef.value
      if(newValue && !isLoaded.value && target) target.src = target.getAttribute('data-src')
    })

    return {
      loaded,
      isLoaded,
      lazyloadRef
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
