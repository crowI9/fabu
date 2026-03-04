<template>
  <div class="tab-bar">
    <div
      class="tab-item"
      :class="{ active: activeTab === 'home' }"
      @click="handleTabClick('home')"
    >
      <div class="tab-icon" :class="{ 'home-active-icon': activeTab === 'home' }">
        <img
          :src="getIconUrl(activeTab === 'home' ? 'nav-home-active.png' : 'nav-home.png')"
          alt="首页"
          class="nav-icon"
        >
      </div>
      <div class="tab-text" v-if="activeTab !== 'home'">首页</div>
    </div>
    <div
      class="tab-item"
      :class="{ active: activeTab === 'message' }"
      @click="handleTabClick('message')"
    >
      <div class="tab-icon">
        <img
          :src="getIconUrl(activeTab === 'message' ? 'nav-message-active.png' : 'nav-message.png')"
          alt="消息"
          class="nav-icon"
        >
      </div>
      <div class="tab-text">消息</div>
      <div class="tab-badge" v-if="messageCount > 0">{{ messageCount }}</div>
    </div>
    <div class="tab-item center" @click="handlePublish">
      <div class="publish-btn-wrapper">
        <img :src="getIconUrl('btn-publish.png')" alt="发需求" class="publish-img">
      </div>
    </div>
    <div
      class="tab-item"
      :class="{ active: activeTab === 'todo' }"
      @click="handleTabClick('todo')"
    >
      <div class="tab-icon">
        <img
          :src="getIconUrl(activeTab === 'todo' ? 'nav-todo-active.png' : 'nav-todo.png')"
          alt="待办"
          class="nav-icon"
        >
      </div>
      <div class="tab-text">待办</div>
      <div class="tab-badge" v-if="todoCount > 0">{{ todoCount }}</div>
    </div>
    <div
      class="tab-item"
      :class="{ active: activeTab === 'profile' }"
      @click="handleTabClick('profile')"
    >
      <div class="tab-icon">
        <img
          :src="getIconUrl(activeTab === 'profile' ? 'nav-profile-active.png' : 'nav-profile.png')"
          alt="我的"
          class="nav-icon"
        >
      </div>
      <div class="tab-text">我的</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  activeTab: {
    type: String,
    default: 'home'
  },
  messageCount: {
    type: Number,
    default: 0
  },
  todoCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['tabChange', 'publish'])

// 获取图标URL
const getIconUrl = (filename) => {
  return `/images/icon/${filename}`
}

// 处理Tab点击
const handleTabClick = (tab) => {
  emit('tabChange', tab)
  
  // 根据tab跳转对应页面
  switch (tab) {
    case 'home':
      router.push('/')
      break
    case 'message':
      router.push('/message')
      break
    case 'todo':
      router.push('/demand-manage')
      break
    case 'profile':
      router.push('/profile')
      break
  }
}

// 处理发布按钮点击
const handlePublish = () => {
  emit('publish')
  router.push('/demand-config')
}
</script>

<style scoped>
/* 底部导航栏 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: var(--space-2, 8px) 0 calc(var(--space-2, 8px) + var(--safe-area-bottom, 0px));
  background: #FFFFFF;
  border-top: 1px solid #F0F0F0;
  z-index: 100;
  height: var(--bottom-nav-height, 64px);
  box-sizing: border-box;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  gap: var(--space-1, 4px);
  cursor: pointer;
  position: relative;
  flex: 1;
}

.tab-item.center {
  position: relative;
  top: -16px;
  height: auto;
}

.publish-btn-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.tab-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.home-active-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-active-icon .nav-icon {
  width: 40px;
  height: 40px;
}

.tab-text {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 10px;
  line-height: 14px;
  color: #8C8C8C;
}

.tab-item.active .tab-text {
  color: #1677FF;
}

.tab-badge {
  position: absolute;
  top: -2px;
  right: 15%;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  color: #FFFFFF;
  background: #FF4D4F;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(255, 77, 79, 0.3);
}

.publish-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}
</style>
