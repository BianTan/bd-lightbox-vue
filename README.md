<p align="center">A lightweight lightbox inspired component for Vue.js</p>
<p align="center">
  <a href="https://www.npmjs.com/package/bd-lightbox-vue"><img src="https://img.shields.io/npm/v/bd-lightbox-vue"/></a>
  <a href="https://github.com/BianTan/bd-lightbox-vue/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/bd-lightbox-vue"/></a>
</p>
<a href="https://github.com/BianTan/bd-lightbox-vue/blob/master/README_zh.md" target="_blank">中文文档</a>

## Installation 
```
npm install --save bd-lightbox-vue
```
or
```
yarn add bd-lightbox-vue
```

### Import the plugin into Vue
#### Global Import  
```js
import { createApp } from 'vue'
import App from './App.vue'

import BdLightbox from 'bd-lightbox-vue'

createApp(App).use(BdLightbox)
```
#### Import on Demand 
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

## How to use 
### Mode 0 (default 0) 
```vue
<template>
  <div>
    <p>This is Title</p>
    <div
      v-html="content"
      v-lightbox="{
        getImgs: getImages,
        openLightbox
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
      lightbox  // getImgs、openLightbox
    },
    setup() {
      const content = `
        <div>
          this is demo
          <img src="images/1.png">
          <img src="images/2.png">
          <img src="images/3.png">
        </div>
      ` // Dynamic Acquisition
      const images = ref<string[] | null>(null)
      const instance = getCurrentInstance() // Get Instance

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

### Mode 1 
```vue
<template>
  <div>
    <p>This is Title</p>
    <BdLightbox :data="images" :options="options" mode="1" />
  </div>
</template>

<script lang="ts">
  import { defineComponent }  from 'vue'

  export default defineComponent({
    setup() {
      const options = {
        buttonShowTime: 5000, // ms default: 2300. optional
        spaceBetween: 32, // px default: 24. optional
        listHeight: 32, // px default: 100%. optional
        itemPosition: 'left', // left | center | right default: center. optional
        isFull: true // default: flase. optional
      }
      const images = [
        'images/1.png', // string
        {
          src: 'images/2.png', // required,
          desc: '这里是 description', // optional
          alt: '这里是 alt' // optional
        }  // or object
      ]

      return {
        options,
        images
      }
    }
  })
</script>

```

## Events

BdLightbox also fires several events that can be further used in your Vue.js application. 
Each event has a item id ⬇️  

| Event name | When is event fired |
|:------| :------ |
| `lightboxOpen` | when the overlay is opened |
| `lightboxClose` | when the overlay is closed (button or ESC key or Space key) |
| `lightboxSwitch` | 点击 lightbox 的侧边栏切换图片 |
| `lightboxNext` | when the user moves to the next picture (arrow or key →) |
| `lightboxPrev` | when the user moves to the previous picture (arrow or key ←) |

## Demo  
### PC 

![PC](https://github.com/BianTan/vok-vue3/raw/main/images/lightbox_pc.png)

### Phone 

![Phone](https://github.com/BianTan/vok-vue3/raw/main/images/lightbox_phone.png)
