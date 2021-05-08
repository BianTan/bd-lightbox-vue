<template>
  <div class="lightbox-sidebar">
    <li
      v-for="(item, index) in list"
      :key="index"
      @click="handleItemClick(index)"
      class="sidebar-item"
    >
      <img
        class="item-img"
        :alt="typeof item === 'string' ? '' : item.alt"
        :src="typeof item === 'string' ? item : item.src"
        :style="{ borderColor: index === currentId ? 'rgba(248, 113, 113)' : 'transparent' }"
      />
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DataListProps } from '../types'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<DataListProps>,
      default: (): DataListProps => []
    },
    currentId: {
      type: Number,
      default: 0
    }
  },
  emits: ['handleItemClick'],
  setup(props, { emit }) {
    const handleItemClick = (id: number) => emit('handleItemClick', id)

    return {
      handleItemClick
    }
  }
})
</script>

<style scoped>
.lightbox-sidebar {
  width: 128px;
  height: 100%;
  background-color: #FFFFFF;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
}
.lightbox-sidebar .sidebar-item {
  width: 100%;
  height: 128px;
  cursor: pointer;
  overflow: hidden;
  display: inline-block;
}
.lightbox-sidebar .sidebar-item .item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
  border: 4px solid transparent;
  transition: border .3s ease-in-out;
}
@media (min-width: 768px) {
  .lightbox-sidebar {
    width: 256px;
  }
  .lightbox-sidebar .sidebar-item {
    width: 50%;
  }
}
</style>
