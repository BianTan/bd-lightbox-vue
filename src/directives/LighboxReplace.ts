import { OptionProps } from '../types'
import { getExclude } from '../libs/utlis'

export default class LightboxReplace {

  el: HTMLElement
  options: OptionProps | undefined
  imgAry: string[] = []

  constructor(el: HTMLElement, options: OptionProps | undefined) {
    this.el = el
    this.options = options

    this.init()
  }

  init() {
    const exclude = this.options && this.options.exclude,
      q = getExclude(exclude),
      allImg: NodeListOf<HTMLImageElement> = this.el.querySelectorAll(`img${q}`)

    allImg.forEach((image: HTMLImageElement, index: number) => {
      const link: HTMLLinkElement = image.parentNode as HTMLLinkElement,
        href: string = link.href  // 获取父节点的href

      if (!href) {  // 不存在说明img没有a标签包裹
        const temp = image.outerHTML
        const template = `<a href="${image.src}" data-lightbox="${index}">${temp}</a>`
        image.outerHTML = template
      } else {
        link.setAttribute('data-lightbox', index.toString())
      }
      
      this.imgAry.push(image.src)  // 将图片的链接添加进 imgAry 数组内
    })

    this.bindEvent()  // 绑定事件
  }

  bindEvent() {
    const { openLightbox, getImgs } = this.options

    this.el.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement,
        id: string = (target.parentNode as HTMLElement).getAttribute('data-lightbox')  // 获取当前点击图片父元素a的data-lightbox属性

      if(id && typeof id === 'string') {
        e.preventDefault()  // 阻止默认事件
        if(this.options && openLightbox) openLightbox(id) // 回调函数，使用图片暗箱展示当前点击的图片
      }

    })

    if(this.options && getImgs) getImgs(this.imgAry) // 回调函数，参数是获取到的图片路径数组
  }
}
