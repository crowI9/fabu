<template>
  <div class="message-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>

    <!-- 顶部导航栏 -->
    <div class="nav-header">
      <div class="header-row">
        <div class="title-with-badge">
          <h1 class="main-title">消息</h1>
          <span class="tab-badge" v-if="messageUnreadCount > 0">{{ messageUnreadCount }}</span>
        </div>
        <div class="title-with-badge">
          <span class="notification-title">通知</span>
          <span class="tab-badge" v-if="notificationUnreadCount > 0">{{ notificationUnreadCount }}</span>
        </div>
      </div>
      <div class="nav-actions">
        <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
      </div>
    </div>

    <!-- 页面标题 -->
    <div class="page-header" :class="{ 'banner-closed': !showNotificationBanner }">
      <!-- 开通消息通知模块 -->
      <div class="notification-banner" v-if="showNotificationBanner">
        <div class="banner-header">
          <div class="banner-title-wrapper">
            <svg class="bell-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#198CFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#198CFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="banner-title">收到以下消息时通知我</span>
          </div>
          <svg class="close-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" @click="showNotificationBanner = false">
            <path d="M18 6L6 18M6 6L18 18" stroke="#BFBFBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="banner-content">
          <span class="banner-desc">消息回复 ｜ 系统通知 ｜ 交易通知</span>
          <button class="banner-btn" @click="enableNotification">开启消息通知</button>
        </div>
      </div>
      
      <!-- 搜索框 -->
      <div class="search-box">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <input type="text" class="search-input" placeholder="搜索联系人、聊天记录">
      </div>
      
      <div class="tab-wrapper">
        <div class="tab-left">
          <span class="tab-item active">全部</span>
          <span class="tab-item">未读</span>
        </div>
        <button class="clear-btn" @click="clearAllUnread">清除未读</button>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="message-list-container">
      <div class="message-item" v-for="(item, index) in messageList" :key="index" @click="goToChat(item)">
        <div class="avatar-wrapper">
          <img :src="item.avatar" alt="头像" class="avatar">
          <div class="unread-badge" v-if="item.unread">{{ item.unread }}</div>
        </div>
        <div class="message-content">
          <div class="message-header">
            <div class="sender-name">{{ item.name }}</div>
            <div class="sender-tag">{{ item.tag }}</div>
            <div class="message-time">{{ item.time }}</div>
          </div>
          <div class="message-text">{{ item.content }}</div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <TabBar active-tab="message" :message-count="3" :todo-count="todoCount" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../components/TabBar.vue'

const router = useRouter()

const todoCount = ref(1)
const showNotificationBanner = ref(true)
const messageUnreadCount = ref(3)
const notificationUnreadCount = ref(5)

const enableNotification = () => {
  showNotificationBanner.value = false
  alert('已开启微信消息通知')
}

const clearAllUnread = () => {
  messageList.value.forEach(item => {
    item.unread = 0
  })
  messageUnreadCount.value = 0
}

const messageList = ref([
  {
    avatar: '/images/avatar/worker1.jpg',
    name: '王师傅',
    tag: '水电工/泥瓦工/木工',
    time: '17:44',
    content: '您好，我近期准备装修，正在找木工。我这边有一套100平米的房子需要装修，主要是客厅和卧室需要做一些定制家具，另外厨房和卫生间也需要重新改造一下。希望能找一位经验丰富、手艺好的木工师傅来帮忙。如果您有时间的话，我们可以约个时间上门量房，详细沟通一下具体的需求和预算。期待您的回复，谢谢！',
    unread: 1
  },
  {
    avatar: '/images/avatar/worker2.jpg',
    name: '李师傅',
    tag: '水电工/泥瓦工/木工',
    time: '17:44',
    content: '您好，我近期准备装修，正在找木工。',
    unread: 0
  },
  {
    avatar: '/images/avatar/designer1.jpg',
    name: '潘晓琪',
    tag: '个人设计师',
    time: '17:44',
    content: '您好，我近期准备装修，正在设计师。',
    unread: 0
  },
  {
    avatar: '/images/avatar/designer2.jpg',
    name: '张设计师',
    tag: '个人设计师',
    time: '17:44',
    content: '您好，我近期准备装修，正在设计师。',
    unread: 0
  },
  {
    avatar: '/images/avatar/company1.jpg',
    name: '装修公司',
    tag: '装修公司',
    time: '17:44',
    content: '您好，我近期准备装修，正在找装修公司。',
    unread: 0
  }
])

const goToChat = (item) => {
  router.push('/chat')
}
</script>

<style scoped>
.message-page {
  height: 100vh;
  height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  /* iOS 状态栏规范：44px 状态栏 */
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 渐变背景装饰 - 覆盖整个页面 */
.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  background: linear-gradient(180deg, #E1EFFC 0%, rgba(225, 239, 252, 0) 30%, #F3F7F8 100%);
}

.gradient-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
}

.circle-1 {
  width: 236px;
  height: 236px;
  left: -60px;
  top: 100px;
  background: #F9EFD7;
  filter: blur(46px);
}

.circle-2 {
  width: 166px;
  height: 166px;
  right: -40px;
  top: 60px;
  background: white;
  filter: blur(50px);
}

.circle-3 {
  width: 302px;
  height: 302px;
  right: -100px;
  top: 120px;
  background: #9AD0FF;
  filter: blur(68px);
}

.circle-4 {
  width: 510px;
  height: 510px;
  right: -200px;
  top: 400px;
  background: #EFFCF8;
  filter: blur(68px);
}

/* 顶部导航栏 */
.nav-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  /* iOS 导航栏规范 */
  height: 44px;
  flex-shrink: 0;
}

.nav-header .main-title {
  margin: 0;
  line-height: 32px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.capsule-btn {
  width: 87px;
  height: 32px;
  object-fit: contain;
  display: block;
}

/* 页面标题 */
.page-header {
  position: relative;
  z-index: 10;
  padding: 16px 16px 0;
  margin-bottom: 16px;
  flex-shrink: 0;
}

.page-header.banner-closed {
  padding-top: 16px;
}

/* 搜索框 */
.search-box {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  padding: 8px 12px;
  margin-bottom: 12px;
  gap: 8px;
}

.search-icon {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #262626;
  background: transparent;
}

.search-input::placeholder {
  color: #8C8C8C;
}

/* 开通消息通知模块 */
.notification-banner {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(243.44, 248.83, 255, 0.7) 100%);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  backdrop-filter: blur(3px);
}

.banner-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.banner-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bell-icon {
  flex-shrink: 0;
}

.banner-title {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: #262626;
}

.close-icon {
  cursor: pointer;
  flex-shrink: 0;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.banner-desc {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
}

.banner-btn {
  padding: 4px 12px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border-radius: 32px;
  border: none;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: white;
  cursor: pointer;
  white-space: nowrap;
}

.nav-header .header-row {
  display: flex;
  align-items: center;
  gap: 24px;
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-header .main-title {
  font-size: 24px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.nav-header .notification-title {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: #595959;
  cursor: pointer;
}

.tab-badge {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #FF4D4F;
  border-radius: 8px;
  font-size: 10px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tab-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.tab-item {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  cursor: pointer;
  position: relative;
}

.tab-item.active {
  font-weight: 600;
  color: #262626;
}

.clear-btn {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #198CFE;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
}

/* 消息列表容器 */
.message-list-container {
  position: relative;
  z-index: 10;
  background: white;
  border-radius: 8px;
  margin: 0 16px 16px;
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
}

/* 消息列表 */
.message-item {
  display: flex;
  align-items: flex-start;
  padding: 20px 16px;
  border-bottom: 1px solid #F6F6F6;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.message-item:last-child {
  border-bottom: none;
}

.message-item:active {
  background-color: #F5F5F5;
}

.avatar-wrapper {
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.unread-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  background: #F55F4E;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #FFFFFF;
  padding: 0 4px;
  border: 1px solid white;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.sender-name {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  margin-right: 8px;
}

.sender-tag {
  flex: 1;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
}

.message-time {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  flex-shrink: 0;
}

.message-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
