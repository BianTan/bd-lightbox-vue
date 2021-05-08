import { ObjectDirective, DirectiveBinding } from 'vue'

interface OptionProps {
  getImgs?: (imgAry: string[]) => void;
  openLightbox?: (id: string) => void;
}

export default {
  mounted(el: HTMLElement, binding = { value: undefined } as DirectiveBinding) {
    const _ops: OptionProps | null = binding.value
    const imgAry: string[] = []
    const allImg: NodeList = el.querySelectorAll('img')

    allImg.forEach((img: any, index: number) => {
      const href: string = img.parentNode.href  // 获取父节点的href
      if (!href) {  // 不存在说明img没有a标签包裹
        const temp = img.outerHTML
        const template = `<a href="${img.src}" data-lightbox="${index}">${temp}</a>`
        img.outerHTML = template
      } else {
        img.parentNode.setAttribute('data-lightbox', index.toString())
      }
      imgAry.push(img.src)  // 将图片url插入imgAry内
    })

    el.addEventListener('click', (e: any) => {
      const target: any = e.target
      const id: string = target.parentNode.getAttribute('data-lightbox')  // 获取当前点击图片父元素a的data-lightbox属性
      if(id) {
        e.preventDefault()  // 阻止默认事件
        if(_ops && _ops.openLightbox) _ops.openLightbox(id) // 回调函数，使用图片暗箱展示当前点击的图片
      }
    })

    if(_ops && _ops.getImgs) _ops.getImgs(imgAry) // 回调函数，参数是获取到的图片路径数组
  }
} as ObjectDirective
