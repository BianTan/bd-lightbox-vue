### 安装 
## 如何使用 
导入插件，并使用
```js
import { createApp } from 'vue'
import App from './App.vue'

import VueLightbox from 'bd-lightbox-vue'

createApp(App).use(VueLightbox)
```
<br>

### 模式0（默认） 
```vue
<template>
  <div>
    <p>这是文章标题</p>
    <div
      v-html="content"
      v-lightbox="{
        getImgs: getImages,
        openLightbox
      }"
    >
    </div>
    <vue-lightbox ref="lightboxRef" :data="imgArry" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, ref }  from 'vue'
  import lightbox from 'bd-lightbox-vue/directives'

  export default defineComponent({
    directives: {
      lightbox  // 自定义指令，传入对象，有两个回调函数，getImgs：获取文章的图片src数组；openLightbox：点击图片时会调用。
    },
    setup() {
      const content = 'xxxx' // 这里是文章的html内容，包含图片
      const imgArry = ref(null)
      const instance = getCurrentInstance() // 获取内部组件的实例

      const getImgs = (imgs): void => { // 回调函数，imgs是
        imgArry.value = imgs
      }
      const openLightbox = (id?: string) => {
        (instance.refs.lightboxRef as any).openLightbox(id)
      }

      return {
        content,
        getImgs,
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
    <vue-lightbox :data="imgArry" :options="options" mode="1" />
  </div>
</template>

<script lang="ts">
  import { defineComponent }  from 'vue'

  export default defineComponent({
    setup() {
      const options = {
        spaceBetween: 32 // 可不传，默认为24
      }
      const imgArry = [
        'images/1.png', // 字符串
        {
          src: 'images/2.png', // 必传,
          desc: '这里是 description', // 可不传
          alt: '这里是 alt' // 可不传
        }  // 或者对象
      ]

      return {
        options,
        imgArry
      }
    }
  })
</script>

```

## 事件

LightBox 还会触发几个事件 ⬇️  

| 事件名称 | 描述 |
|:------| :------ |
| `lightboxOpen` | 遮罩打开 |
| `lightboxClose` | 遮罩关闭 (按钮被点击 或者 点击键盘 Esc or Space) |
| `lightboxSwitch` | 点击 lightbox 的侧边栏切换图片 |
| `lightboxNext` | 下一张图片 (按钮被点击 或者 点击键盘 方向键 →) |
| `lightboxPrev` | 上一张图片 (按钮被点击 或者 点击键盘 方向键 ←) |
  
以上均有一个参数 currnetId 为当前的图片 id（从0开始）  