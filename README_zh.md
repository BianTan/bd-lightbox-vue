<p align="center">这是基于 Vue3 制作的一个图片灯箱组件</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bd-lightbox-vue"><img src="https://img.shields.io/npm/v/bd-lightbox-vue"/></a>
  <a href="https://github.com/BianTan/bd-lightbox-vue/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/bd-lightbox-vue"/></a>
</p>

## 安装 
```
npm install --save bd-lightbox-vue
```
或者
```
yarn add bd-lightbox-vue
```

### 导入插件，并使用  
#### 全局导入  
```js
import { createApp } from 'vue'
import App from './App.vue'

import BdLightbox from 'bd-lightbox-vue'

createApp(App).use(BdLightbox)
```
#### 按需导入  
```vue
<script lang="ts">
import { defineComponent } from 'vue'
import { BdLightbox } from 'bd-lightbox-vue'

export default defineComponent({
  components: {
    BdLightbox
  }
})
</script>

```
<br>

## 如何使用 
### 模式0（默认） 
```vue
<template>
  <div>
    <p>这是文章标题</p>
    <div
      v-html="content"
      v-lightbox="{
        getImgs: getImages,
        openLightbox,
        exclude: [
          '.class-1',
          '#id-1',
          {
            width: '479',
            class: 'size-full'
          },
          {
            width: '1920'
          },
          [
            '.class-2',
            {
              class: 'class-3'
            }
          ]
        ]
      }"
    >
    </div>
    <BdLightbox ref="lightboxRef" :data="images" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, ref }  from 'vue'
  import { lightbox, UseLightBoxProps } from 'bd-lightbox-vue'

  export default defineComponent({
    directives: {
      lightbox  // 自定义指令，传入对象，有两个回调函数，getImgs：获取文章的图片src数组；openLightbox：点击图片时会调用。
    },
    setup() {
      const content = 'xxxx' // 这里是文章的html内容，包含图片
      const images = ref<string[] | null>(null)
      const instance = getCurrentInstance() // 获取组件实例

      const getImgs = (images: string[]): void => {
        images.value = images
      }
      const openLightbox = (id?: string) => {
        (instance.refs.lightboxRef as UseLightBoxProps).openLightbox(id)
      }

      return {
        content,
        getImgs,
        images,
        openLightbox
      }
    }
  })
</script>

```

### 模式1 
```vue
<template>
  <div>
    <p>这是文章标题</p>
    <BdLightbox :data="images" :options="options" mode="1" />
  </div>
</template>

<script lang="ts">
  import { defineComponent }  from 'vue'

  export default defineComponent({
    setup() {
      const options = {
        buttonShowTime: 5000, // 可不传，单位 ms 默认为 2300
        spaceBetween: 32, // 可不传，单位 px 默认为 24
        listHeight: 32, // 可不传，单位 px 默认为 100%
        itemPosition: 'left', // 可不传，值为 left | center | right 默认为 center 当 isFull 为 true 时无效果
        isFull: true // 可不传，默认为 flase
      }
      const images = [
        'images/1.png', // 字符串
        {
          src: 'images/2.png', // 必传,
          desc: '这里是 description', // 可不传
          alt: '这里是 alt' // 可不传
        }  // 或者对象
      ]

      return {
        options,
        images
      }
    }
  })
</script>

```

## 自定义指令的选项
| 属性 | 必传 | 类型 | 描述 |
|:------| :------ | :------ | :------ |
| `getImgs` | ✓ | function | 获取内容部分图片的url |
| `openLightbox` | ✓ | function  | 获取到的图片被点击的时候触发 |
| `exclude` | × | string 或者 Object 或者 Array | 需要被排除的图片具有的属性 |

## 组件的选项
| 属性 | 必传 | 类型 | 描述 |
|:------| :------ | :------ | :------ |
| `buttonShowTime` | × | number | 按钮显示的时长 |
| `spaceBetween` | × | number  | 图片之间的间隔距离 |
| `listHeight` | × | number | 高度 |
| `itemPosition` | × | string | 居左还是居中还是具有捏？ |
| `isFull` | × | boolean | isFull = true 图片会占用全部宽度 |

## 事件

BdLightbox 还会触发几个事件 ⬇️  

| 事件名称 | 描述 |
|:------| :------ |
| `lightboxOpen` | 遮罩打开 |
| `lightboxClose` | 遮罩关闭 (按钮被点击 或者 点击键盘 Esc or Space) |
| `lightboxSwitch` | 点击 lightbox 的侧边栏切换图片 |
| `lightboxNext` | 下一张图片 (按钮被点击 或者 点击键盘 方向键 →) |
| `lightboxPrev` | 上一张图片 (按钮被点击 或者 点击键盘 方向键 ←) |
  
以上均有一个参数 currnetId 为当前的图片 id（从0开始）  

## 展示  
### 电脑端 图片灯箱  

![电脑端](https://github.com/BianTan/vok-vue3/raw/main/images/lightbox_pc.png)

### 移动端 图片灯箱  

![移动端](https://github.com/BianTan/vok-vue3/raw/main/images/lightbox_phone.png)
