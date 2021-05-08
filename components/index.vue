<template>
  <transition name="lightbox">
    <div
      class="lightbox"
      v-show="isShow && data.length > 0"
    >
      <div class="lightbox-main">
        <div class="lightbox-wrapper" @click="handleClick">
          <transition-group name="lightbox-main" tag="ul">
            <img
              v-for="(img, index) in data"
              :key="index"
              :src="img"
              v-show="index === currentId"
              @click="isButtonShow = !isButtonShow"
              class="lightbox-img"
            />
          </transition-group>
          <transition name="lightbox-main">
            <div v-show="isButtonShow" class="lightbox-group">
              <span>{{ currentId + 1 }} / {{ data.length }}</span>
              <iconfont
                @click="goPrev"
                class="icon-down icon-prev"
              />
              <iconfont
                @click="goNext"
                class="icon-down icon-next"
              />
              <iconfont
                class="icon-close"
                @click="isShow = sidebarIsShow = false"
              />
              <iconfont
                class="icon-menu"
                @click="switchSidebarState"
              />
            </div>
          </transition>
        </div>
        <sidebar
          :list="data"
          v-if="sidebarIsShow"
          :currentId="currentId"
          @handleItemClick="onSidebarItemClick"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { useLightBox } from '../libs'
import iconfont from './iconfont.vue'
import Sidebar from './sidebar.vue'

export default defineComponent({
  name: 'VueLightbox',
  components: {
    iconfont,
    Sidebar
  },
  props: {
    data: {
      type: Array as PropType<string[]>,
      default: (): [] => []
    },
    buttonShowTime: {
      type: Number,
      default: 2300
    }
  },
  setup(props) {
    
    const dataInit = computed(() => props.data as string[])

    const {
      state,
      openLightbox,
      handleClick,
      onSidebarItemClick,
      goPrev,
      goNext,
      switchSidebarState
    } = useLightBox(props.buttonShowTime as number, dataInit)

    return {
      ...toRefs(state),
      openLightbox,
      handleClick,
      onSidebarItemClick,
      goPrev,
      goNext,
      switchSidebarState
    }
  }
})
</script>

<style scoped>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  overflow: hidden;
  user-select: none;
  background-color: rgba(31, 41, 55, .8);
}
.lightbox-main {
  display: flex;
  width: 100%;
  height: 100%;
}
.lightbox-wrapper {
  flex: 1;
  position: relative;
}
.lightbox-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
  cursor: pointer;
}
.lightbox-group span {
  position: absolute;
  top: 8px;
  left: 8px;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 16px;
}
.lightbox-group .icon-prev {
  left: 16px;
  top: 50%;
  transform: translate(0 , -50%) rotate(90deg);
}
.lightbox-group .icon-next {
  right: 16px;
  top: 50%;
  transform: translate(0 , -50%) rotate(-90deg);
}
.lightbox-group .icon-close {
  top: 0;
  right: 0;
}
.lightbox-group .icon-menu {
  top: 0;
  right: 44px;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: all .3s ease-in-out;
  opacity: 0;
}
.lightbox-enter-to,
.lightbox-leave-from {
  opacity: 1;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
.lightbox-main-enter-active,
.lightbox-main-leave-active {
  transition: all .2s ease-in-out;
  opacity: 0;
}
.lightbox-main-enter-to,
.lightbox-main-leave-from {
  opacity: 1;
}
.lightbox-main-enter-from,
.lightbox-main-leave-to {
  opacity: 0;
}
</style>
