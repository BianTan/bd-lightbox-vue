import { getExclude } from '../libs/utlis'
import { ObjectDirective, DirectiveBinding } from 'vue'
import { OptionProps } from '../types'

export default {
  mounted(el: HTMLElement, binding = { value: undefined } as DirectiveBinding) {
    const _ops: OptionProps | undefined = binding.value
    const imgAry: string[] = []
    const exclude = _ops.exclude
    const q = getExclude(exclude)
    const allImg: NodeList = el.querySelectorAll(`img${q}`)

    allImg.forEach((item: Node, index: number) => {
      const image = item as HTMLImageElement
      const href: string = (image.parentNode as HTMLLinkElement).href  // 获取父节点的href
      if (!href) {  // 不存在说明img没有a标签包裹
        const temp = image.outerHTML
        const template = `<a href="${image.src}" data-lightbox="${index}">${temp}</a>`
        image.outerHTML = template
      } else {
        (image.parentNode as HTMLLinkElement).setAttribute('data-lightbox', index.toString())
      }
      imgAry.push(image.src)  // 将图片url插入imgAry内
    })

    el.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement
      const id: string = (target.parentNode as HTMLElement).getAttribute('data-lightbox')  // 获取当前点击图片父元素a的data-lightbox属性
      if(id) {
        e.preventDefault()  // 阻止默认事件
        if(_ops && _ops.openLightbox) _ops.openLightbox(id) // 回调函数，使用图片暗箱展示当前点击的图片
      }
    })

    if(_ops && _ops.getImgs) _ops.getImgs(imgAry) // 回调函数，参数是获取到的图片路径数组
  }
} as ObjectDirective
