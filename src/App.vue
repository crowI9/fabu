<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import './styles/mobile-adapter.css'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 状态栏背景 - 固定在顶部，iOS 规范 44px */
.status-bar-bg {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 44px;
  background: #E1EFFC;
  z-index: 9999;
  pointer-events: none;
}

html {
  /* 设置状态栏背景色 */
  background: #E1EFFC;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  background: #f5f5f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  /* 延伸到状态栏 */
  min-height: 100vh;
  min-height: -webkit-fill-available;
  /* 防止 iOS Safari 底部栏影响 */
  padding-bottom: env(safe-area-inset-bottom);
}

#app {
  max-width: 430px;
  margin: 0 auto;
  background: #f5f5f5;
  height: 100vh;
  /* iOS 安全区域适配 */
  height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  height: -webkit-fill-available;
  position: relative;
  overflow-x: hidden;
}

/* 禁止图片拖拽 */
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  pointer-events: none;
  max-width: 100%;
  height: auto;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 点击高亮去除 */
* {
  -webkit-tap-highlight-color: transparent;
}

/* 输入框字体大小固定，防止 iOS 缩放 */
input, textarea, select {
  font-size: 16px;
}
</style>
