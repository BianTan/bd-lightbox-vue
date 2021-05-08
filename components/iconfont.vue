<template>
  <i class="lightbox-icon" />
</template>

<style scoped>
@import '../common/css/iconfont.css';

.lightbox-icon {
  opacity: .8;
  display: flex;
  width: 40px;
  height: 40px;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  position: absolute;
  align-items: center;
  justify-content: center;
  transition: all .3s ease-in-out;
  background-color: rgba(31, 41, 55);
}
.lightbox-icon:hover {
  opacity: 1;
  background-color: rgba(17, 24, 39);
}
</style>
