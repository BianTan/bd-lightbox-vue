<template>
  <div
    class="lightbox"
    v-if="data.length > 0"
  >
    <div
      class="lightbox-list"
      v-if="mode === '1'"
      :style="listStyle"
    >
      <div
        class="lightbox-item"
        v-for="(item, index) of data"
        :key="index"
        :style="itemStyle"
        @click="openLightbox(index)"
      >
        <img
          :src="typeof item === 'string' ? item : item.src"
          :alt="typeof item === 'string' ? '' : item.alt"
        />
      </div>
    </div>
    <transition name="lightbox">
      <div class="lightbox-overlay" v-show="isShow && data.length > 0">
        <div class="lightbox-wrapper">
          <transition-group name="lightbox-row" tag="ul">
            <div
              class="lightbox-row"
              v-for="(item, index) in data"
              :key="index"
              v-show="index === currentId"
              @click="handleClick"
            >
              <img
                :src="typeof item === 'string' ? item : item.src"
                :alt="typeof item === 'string' ? '' : item.alt"
                @click="isButtonShow = !isButtonShow"
                class="lightbox-img"
              />
              <p v-if="typeof item === 'object' && item.desc">{{item.desc}}</p>
            </div>
          </transition-group>
          <transition name="lightbox-row">
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
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { LightBoxOptions, DataListProps } from '../types'
import { useLightBox, useStyle } from '../libs'
import iconfont from './iconfont.vue'
import Sidebar from './sidebar.vue'

export default defineComponent({
  name: 'BdLightbox',
  components: {
    iconfont,
    Sidebar
  },
  props: {
    data: {
      type: Array as PropType<DataListProps>,
      default: (): DataListProps => []
    },
    mode: {
      type: String,
      default: '0'
    },
    options: {
      type: Object as PropType<LightBoxOptions>,
      default: (): LightBoxOptions => ({})
    }
  },
  emits: [
    'lightboxOpen',
    'lightboxClose',
    'lightboxNext',
    'lightboxPrev',
    'lightboxSwitch'
  ],
  setup(props, { emit }) {

    const options = computed(() => props.options as LightBoxOptions)
    const dataInit = computed<DataListProps>(() => props.data as DataListProps)

    const {
      itemStyle,
      listStyle,
    } = useStyle(options, dataInit)

    const {
      state,
      openLightbox,
      handleClick,
      onSidebarItemClick,
      goPrev,
      goNext,
      switchSidebarState
    } = useLightBox(options.value.buttonShowTime || 2300, dataInit, emit)

    return {
      ...toRefs(state),
      itemStyle,
      listStyle,
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
.lightbox-list {
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
}
.lightbox-item {
  flex-shrink: 0;
  height: inherit;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lightbox-item img {
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.lightbox-overlay {
  display: flex;
  width: 100%;
  height: 100%;
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
.lightbox-wrapper {
  flex: 1;
  position: relative;
}
.lightbox-wrapper ul,
.lightbox-row {
  width: 100%;
  height: 100%;
}
.lightbox-row {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.lightbox-row p {
  color: #FFF;
  margin-top: 24px;
  text-align: center;
}
.lightbox-img {
  max-width: 80%;
  max-height: 80%;
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
.lightbox-row-enter-active,
.lightbox-row-leave-active {
  transition: all .2s ease-in-out;
  opacity: 0;
}
.lightbox-row-enter-to,
.lightbox-row-leave-from {
  opacity: 1;
}
.lightbox-row-enter-from,
.lightbox-row-leave-to {
  opacity: 0;
}
</style>
