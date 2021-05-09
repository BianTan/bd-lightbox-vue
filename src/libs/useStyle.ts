import { computed, ComputedRef } from 'vue'
import { LightBoxOptions, UseStyleProps, ItemStyleProps, ListStyleProps, DataListProps } from '../types'

/**
 * @param {ComputedRef<LightBoxOptions>} options 配置信息
 * @param {ComputedRef<DataListProps>} data 展示的图片地址、信息的数组
 * @return {UseStyleProps} UseStyleProps
*/
export default function (options: ComputedRef<LightBoxOptions>, data: ComputedRef<DataListProps>): UseStyleProps {

  const {
    listHeight,
    spaceBetween = 24,
    isFull = false,
    itemPosition = 'center'
  } = options.value
  
  const itemStyle = computed<ItemStyleProps>(() => {
    const styleKey = isFull ? 'width' : 'maxWidth'
    const style = {
      marginRight: `${spaceBetween}px`,
      [styleKey]: `calc((100% - (${spaceBetween}px * ${data.value.length - 1})) / ${data.value.length})`
    }
    return style
  })
  const listStyle = computed<ListStyleProps>(() => {
    const style: ListStyleProps = {}
    let position
      
    switch (itemPosition) {
      case 'left':
        position = 'end'
        break;
      case 'right':
        position = 'flex-end'
        break;
      case 'center':
      default:
        position = 'center'
        break;
    }

    listHeight ? style['height'] = `${listHeight}px` : ''
    style['justifyContent'] = position

    return style
  })

  return {
    itemStyle,
    listStyle
  }
}