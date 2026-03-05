<template>
  <div class="chat-page">
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
        <div class="nav-left" @click="goBack">
          <svg class="back-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="chat-title">王师傅</h1>
        <div class="nav-right">
          <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 用户信息卡片 -->
      <div class="user-card">
        <div class="user-card-main">
          <img src="/images/avatar/designer1.jpg" alt="头像" class="user-avatar">
          <div class="user-info">
            <div class="user-header">
              <span class="user-name">潘晓婷</span>
              <span class="user-role">个人设计师</span>
              <span class="view-profile">看ta主页</span>
            </div>
            <div class="user-stats">
              <span class="rating">
                <svg class="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="#F55F4E">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                <span class="rating-score">4.7分</span>
              </span>
              <span class="stat-text">已服务 <span class="stat-num">132</span> · 累计获赞 <span class="stat-num">456</span></span>
            </div>
          </div>
        </div>
        <div class="user-tags">
          <span class="tag">从业十年</span>
          <span class="tag">普通平层设计</span>
          <span class="tag">现代简约</span>
          <span class="tag">法式复古</span>
          <span class="tag">沟通耐心</span>
          <span class="tag">设计创新</span>
          <span class="tag">全套图纸</span>
        </div>
      </div>

      <!-- 聊天内容区域 -->
      <div class="chat-content">
        <div class="chat-time">今天 14:30</div>
        
        <!-- 对方消息 -->
        <div class="message-row received">
          <img src="/images/avatar/worker1.jpg" alt="头像" class="message-avatar">
          <div class="message-bubble">
            <div class="message-text">您好，我近期准备装修，正在找木工。我这边有一套100平米的房子需要装修，主要是客厅和卧室需要做一些定制家具。</div>
          </div>
        </div>

        <!-- 自己消息 -->
        <div class="message-row sent">
          <div class="message-bubble">
            <div class="message-text">您好，感谢您的咨询！请问您大概什么时候需要开始装修呢？</div>
          </div>
          <img src="/images/avatar/designer1.jpg" alt="头像" class="message-avatar">
        </div>

        <!-- 对方消息 -->
        <div class="message-row received">
          <img src="/images/avatar/worker1.jpg" alt="头像" class="message-avatar">
          <div class="message-bubble">
            <div class="message-text">预计下个月初开始，想先找师傅上门量房看看。</div>
          </div>
        </div>

        <!-- 自己消息 -->
        <div class="message-row sent">
          <div class="message-bubble">
            <div class="message-text">没问题，我们可以约个时间。您这周方便吗？</div>
          </div>
          <img src="/images/avatar/designer1.jpg" alt="头像" class="message-avatar">
        </div>
      </div>
    </div>

    <!-- 底部输入栏 -->
    <div class="chat-input-area">
      <div class="input-wrapper">
        <button class="demand-btn" @click="goToDemandList">发需求</button>
        <div class="input-box">
          <input type="text" class="message-input" placeholder="请输入消息...">
        </div>
        <svg class="emoji-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 9H9.01" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 9H15.01" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="add-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" @click="toggleMenu">
          <circle cx="12" cy="12" r="10" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 8V16" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 12H16" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <!-- 功能菜单 -->
      <div class="function-menu" v-if="showMenu">
        <div class="menu-item" @click="sendImage">
          <div class="menu-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#262626" stroke-width="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="#262626"/>
              <path d="M21 15L16 10L9 17H3" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="menu-text">发送图片</span>
        </div>
        <div class="menu-item" @click="sendAddress">
          <div class="menu-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="#262626" stroke-width="2"/>
              <circle cx="12" cy="10" r="3" stroke="#262626" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">发送地址</span>
        </div>
        <div class="menu-item" @click="sendCase">
          <div class="menu-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#262626" stroke-width="2"/>
              <path d="M3 9H21" stroke="#262626" stroke-width="2"/>
              <path d="M9 21V9" stroke="#262626" stroke-width="2"/>
            </svg>
          </div>
          <span class="menu-text">发送案例</span>
        </div>
        <div class="menu-item" @click="sendMoment">
          <div class="menu-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#262626" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" stroke="#262626" stroke-width="2"/>
              <circle cx="18" cy="6" r="2" fill="#262626"/>
            </svg>
          </div>
          <span class="menu-text">发送动态</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMenu = ref(false)

const goBack = () => {
  router.back()
}

const goToDemandList = () => {
  router.push('/demand-list')
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const sendImage = () => {
  console.log('发送图片')
  showMenu.value = false
}

const sendAddress = () => {
  console.log('发送地址')
  showMenu.value = false
}

const sendCase = () => {
  console.log('发送案例')
  showMenu.value = false
}

const sendMoment = () => {
  console.log('发送动态')
  showMenu.value = false
}
</script>

<style scoped>
.chat-page {
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
  padding: 12px 16px;
  /* iOS 导航栏规范 */
  height: 44px;
  flex-shrink: 0;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.nav-left {
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.back-icon {
  flex-shrink: 0;
  cursor: pointer;
}

.chat-title {
  font-size: 17px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  margin: 0;
  text-align: center;
  flex: 1;
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.capsule-btn {
  width: 87px;
  height: 32px;
  object-fit: contain;
  cursor: pointer;
}

/* 页面内容 */
.page-content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 16px;
  gap: 16px;
}

/* 用户信息卡片 */
.user-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-card-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.user-name {
  font-size: 18px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
}

.user-role {
  padding: 2px 10px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border-radius: 12px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: white;
}

.view-profile {
  margin-left: auto;
  padding: 4px 12px;
  background: white;
  border-radius: 100px;
  border: 0.5px solid #198CFE;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #198CFE;
  cursor: pointer;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star-icon {
  flex-shrink: 0;
}

.rating-score {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #F55F4E;
}

.stat-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
}

.stat-num {
  color: #262626;
  font-weight: 500;
}

.user-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  background: #E8F3FF;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #198CFE;
}

/* 聊天内容区域 */
.chat-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 0 80px;
}

.chat-time {
  text-align: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  margin-bottom: 16px;
}

.message-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.message-row.received {
  justify-content: flex-start;
}

.message-row.sent {
  justify-content: flex-end;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.message-row.received .message-avatar {
  margin-right: 12px;
}

.message-row.sent .message-avatar {
  margin-left: 12px;
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  word-wrap: break-word;
}

.message-row.received .message-bubble {
  background: white;
  border-bottom-left-radius: 4px;
}

.message-row.sent .message-bubble {
  background: #198CFE;
  border-bottom-right-radius: 4px;
}

.message-text {
  font-size: 15px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 1.5;
}

.message-row.received .message-text {
  color: #262626;
}

.message-row.sent .message-text {
  color: white;
}

/* 底部输入栏 - 固定在底部 */
.chat-input-area {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  z-index: 100;
  background: white;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  flex-shrink: 0;
  border-top: 1px solid #F0F0F0;
  box-sizing: border-box;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demand-btn {
  flex-shrink: 0;
  padding: 6px 12px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border-radius: 16px;
  border: none;
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: white;
  cursor: pointer;
  white-space: nowrap;
}

.emoji-icon,
.add-icon {
  flex-shrink: 0;
  cursor: pointer;
}

.input-box {
  flex: 1;
  background: #F5F5F5;
  border-radius: 20px;
  padding: 8px 16px;
}

.message-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #262626;
  background: transparent;
}

.message-input::placeholder {
  color: #8C8C8C;
}

/* 功能菜单 */
.function-menu {
  display: flex;
  gap: 32px;
  padding: 16px 24px;
  background: #F5F5F6;
  margin: 0 -16px;
  margin-top: 12px;
  margin-bottom: calc(-12px - env(safe-area-inset-bottom));
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.menu-icon {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
}
</style>
