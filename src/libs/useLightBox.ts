import { reactive, ComputedRef, watch, onUnmounted } from 'vue'
import { DataListProps, EventEmit, LightBoxState, UseLightBoxProps } from '../types'
import { throttle } from "./utlis"

/**
 * @param {number} buttonShowTime 按钮展示时间
 * @param {ComputedRef<DataListProps>} data 展示的图片地址、信息的数组
 * @param {EventEmit} emit
 * @return {UseLightBoxProps} UseLightBoxProps
*/
export default function (buttonShowTime: number, data: ComputedRef<DataListProps>, emit: EventEmit): UseLightBoxProps {

  /**
   * 状态管理
  */
  const state = reactive<LightBoxState>({
    isShow: false,
    sidebarIsShow: false,
    isLoaded: false,
    isButtonShow: false,
    currentId: 0,
    timer: undefined
  })

  /**
   * 重置 setTimeout
  */
  const resetTimer = () => {
    if(state.timer) clearTimeout(state.timer)
    if (state.isButtonShow) {
      state.timer = window.setTimeout(
        () => state.isButtonShow = false,
        buttonShowTime
      )
    }
  }
  /**
   * @param {string | number} id
   * 外部可以从 instance 中调用该方法，使用图片暗箱来展示指定图片
  */
  const openLightbox = (id: string | number = 0): void => {
    state.currentId = typeof id === 'number' ? id >>> 0 : parseInt(id as string)
    state.currentId = state.currentId < data.value.length ? state.currentId : 0
    state.isShow = state.isButtonShow = true
    emit('lightboxOpen', state.currentId)
  }
  /**
   * 图片暗箱 wrapper 点击
  */
  const handleClick = (e: Event): void => {
    if (e.target === e.currentTarget)
      state.sidebarIsShow
        ? (state.sidebarIsShow = false)
        : (state.isShow = false)
  }
  /**
   * @param {number} id
   * 侧边栏里面的项目点击时，展示指定 id 图片
  */
  const onSidebarItemClick = (id: number): void => {
    state.currentId = id
    emit('lightboxSwitch', state.currentId)
    resetTimer()
  }
  /**
   * 上一张图片
  */
  const goPrev = (): void => {
    state.currentId > 0
      ? state.currentId--
      : (state.currentId = data.value.length - 1)
    emit('lightboxPrev', state.currentId)
    resetTimer()
  }
  /**
   * 下一张图片
  */
  const goNext = (): void => {
    state.currentId < data.value.length - 1
      ? state.currentId++
      : (state.currentId = 0)
      emit('lightboxNext', state.currentId)
    resetTimer()
  }
  /**
   * 切换侧边栏状态
  */
  const switchSidebarState = (): void => {
    state.sidebarIsShow = !state.sidebarIsShow
    resetTimer()
  }

  /**
   * keydown 事件
  */
  const keydown = (value: Event | [KeyboardEvent]): void => {
    const type = (value as [KeyboardEvent])[0].code
    switch (type) {
      case 'ArrowLeft':
        goPrev()
        break
      case 'ArrowRight':
        goNext()
        break
      case 'Escape':
      case 'Space':
        (value as [KeyboardEvent])[0].preventDefault()
        state.isShow = false
        break
    }
  }
  const buttonShow = () => {
    resetTimer()
    state.isButtonShow = true
  }
  const throttleKeydoen = throttle(keydown)
  const throttleShow = throttle(buttonShow, 50)

  const setEvent = (isAdd = true) => {
    if(isAdd) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', throttleKeydoen)
      window.addEventListener('mousemove', throttleShow)
    } else {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', throttleKeydoen)
      window.removeEventListener('mousemove', throttleShow)
    }
  }

  /**
   * 监听状态变化
  */
  watch([() => state.isButtonShow, () => state.isShow], (newValue, oldValue) => {
    if(newValue[0] !== oldValue[0]) {
      clearTimeout(state.timer)
      if (newValue[0]) {
        // 这个是 isButtonShow
        state.timer = window.setTimeout(
          () => (state.isButtonShow = false),
          buttonShowTime
        )
      }
    }
    // 这个是 isShow
    if (newValue[1] !== oldValue[1] && !newValue[1]) emit('lightboxClose', state.currentId)
    setEvent(newValue[1])
  })

  onUnmounted(() => {
    setEvent(false)
  })

  return {
    state,
    openLightbox,
    handleClick,
    onSidebarItemClick,
    goPrev,
    goNext,
    switchSidebarState
  }
}