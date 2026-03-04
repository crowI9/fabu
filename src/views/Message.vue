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
      <h1 class="main-title">消息</h1>
      <div class="nav-actions">
        <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
      </div>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <div class="tab-wrapper">
        <span class="tab-item active">全部</span>
        <span class="tab-item">未读</span>
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

const messageList = ref([
  {
    avatar: 'https://placehold.co/48x48',
    name: '王师傅',
    tag: '水电工/泥瓦工/木工',
    time: '17:44',
    content: '您好，我近期准备装修，正在找木工。',
    unread: 1
  },
  {
    avatar: 'https://placehold.co/48x48',
    name: '王师傅',
    tag: '水电工/泥瓦工/木工',
    time: '17:44',
    content: '您好，我近期准备装修，正在找木工。',
    unread: 0
  },
  {
    avatar: 'https://placehold.co/48x48',
    name: '潘晓琪',
    tag: '个人设计师',
    time: '17:44',
    content: '您好，我近期准备装修，正在设计师。',
    unread: 0
  },
  {
    avatar: 'https://placehold.co/48x48',
    name: '潘晓琪',
    tag: '个人设计师',
    time: '17:44',
    content: '您好，我近期准备装修，正在设计师。',
    unread: 0
  },
  {
    avatar: 'https://placehold.co/48x48',
    name: '潘晓琪',
    tag: '个人设计师',
    time: '17:44',
    content: '您好，我近期准备装修，正在设计师。',
    unread: 0
  }
])

const goToChat = (item) => {
  router.push('/chat')
}
</script>

<style scoped>
.message-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #E1EFFC 0%, rgba(225, 239, 252, 0) 30%, #F3F7F8 100%);
  position: relative;
  padding-bottom: 100px;
}

/* 渐变背景装饰 */
.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
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
  padding-top: 50px;
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
  padding: 0 16px;
  margin-bottom: 16px;
}

.main-title {
  font-size: 24px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
}

.tab-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}

.tab-item {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  cursor: pointer;
  position: relative;
}

.tab-item.active {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

/* 消息列表容器 */
.message-list-container {
  position: relative;
  z-index: 10;
  background: white;
  border-radius: 8px;
  margin: 0 16px;
  overflow: hidden;
}

/* 消息列表 */
.message-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
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
