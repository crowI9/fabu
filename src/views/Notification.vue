<template>
  <div class="notification-page">
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
        <div class="title-with-badge" @click="goToMessage">
          <h1 class="main-title">消息</h1>
          <span class="tab-badge" v-if="messageUnreadCount > 0">{{ messageUnreadCount }}</span>
        </div>
        <div class="title-with-badge active">
          <span class="notification-title">通知</span>
          <span class="tab-badge" v-if="notificationUnreadCount > 0">{{ notificationUnreadCount }}</span>
        </div>
      </div>
      <div class="nav-actions">
        <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
      </div>
    </div>

    <!-- 通知列表 -->
    <div class="notification-list">
      <!-- 系统通知 -->
      <div class="notification-item" @click="goToDetail('system')">
        <div class="notification-icon system">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="white"/>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-header">
            <div class="notification-title">系统通知</div>
            <div class="notification-time">17:44</div>
          </div>
          <div class="notification-desc">恭喜注册成功</div>
        </div>
        <div class="unread-badge" v-if="systemUnread > 0">{{ systemUnread }}</div>
      </div>

      <!-- 分隔线 -->
      <div class="divider"></div>

      <!-- 交易通知 -->
      <div class="notification-item" @click="goToDetail('transaction')">
        <div class="notification-icon transaction">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="white"/>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-header">
            <div class="notification-title">交易通知</div>
            <div class="notification-time">17:44</div>
          </div>
          <div class="notification-desc">订单已支付成功</div>
        </div>
        <div class="unread-badge" v-if="transactionUnread > 0">{{ transactionUnread }}</div>
      </div>

      <!-- 分隔线 -->
      <div class="divider"></div>

      <!-- 活动通知 -->
      <div class="notification-item" @click="goToDetail('activity')">
        <div class="notification-icon activity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" fill="white"/>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-header">
            <div class="notification-title">活动通知</div>
            <div class="notification-time">17:44</div>
          </div>
          <div class="notification-desc">现充值会员享8折</div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="divider"></div>

      <!-- 待办提醒 -->
      <div class="notification-item" @click="goToDetail('todo')">
        <div class="notification-icon todo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" fill="white"/>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-header">
            <div class="notification-title">待办提醒</div>
            <div class="notification-time">17:44</div>
          </div>
          <div class="notification-desc">待发起交底</div>
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="divider"></div>

      <!-- 互动消息 -->
      <div class="notification-item" @click="goToDetail('interaction')">
        <div class="notification-icon interaction">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill="white"/>
          </svg>
        </div>
        <div class="notification-content">
          <div class="notification-header">
            <div class="notification-title">互动消息</div>
            <div class="notification-time">17:44</div>
          </div>
          <div class="notification-desc">潘晓琪 评论了你的评论</div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <TabBar active-tab="message" :message-count="3" :todo-count="1" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../components/TabBar.vue'

const router = useRouter()

const systemUnread = ref(1)
const transactionUnread = ref(1)
const messageUnreadCount = ref(3)
const notificationUnreadCount = ref(5)

const goToDetail = (type) => {
  console.log('查看通知详情:', type)
  // router.push(`/notification/${type}`)
}

const goToMessage = () => {
  router.push('/message')
}
</script>

<style scoped>
.notification-page {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  /* iOS 状态栏规范：44px */
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
  gap: 24px;
  height: 100%;
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.header-row .main-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #595959;
  line-height: 22px;
  margin: 0;
  cursor: pointer;
}

.header-row .notification-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  line-height: 30px;
}

.tab-badge {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #F55F4E;
  border-radius: 8px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: white;
  line-height: 16px;
  text-align: center;
}

.nav-actions {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.capsule-btn {
  width: 87px;
  height: 32px;
  object-fit: contain;
  display: block;
}

/* 通知列表 */
.notification-list {
  position: relative;
  z-index: 10;
  flex: 1;
  background: white;
  border-radius: 8px 8px 0 0;
  margin: 16px;
  margin-bottom: 0;
  padding: 16px 0;
  overflow-y: auto;
}

/* 通知项 */
.notification-item {
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  position: relative;
}

.notification-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 12px;
}

.notification-icon.system {
  background: linear-gradient(270deg, #ADB8CB 0%, #D5DBE4 100%);
}

.notification-icon.transaction {
  background: linear-gradient(270deg, #F5DAA3 0%, #FFEAD4 100%);
}

.notification-icon.activity {
  background: linear-gradient(270deg, #EDB56E 0%, #F9E4CA 100%);
}

.notification-icon.todo {
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
}

.notification-icon.interaction {
  background: linear-gradient(270deg, #EE9883 0%, #F3D3CC 100%);
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.notification-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  line-height: 18px;
}

.notification-time {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  color: #8C8C8C;
  line-height: 18px;
}

.notification-desc {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  color: #8C8C8C;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 未读角标 */
.unread-badge {
  position: absolute;
  left: 47px;
  top: 10px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #F55F4E;
  border-radius: 8px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: white;
  line-height: 16px;
  text-align: center;
}

/* 分隔线 */
.divider {
  height: 1px;
  background: #F6F6F6;
  margin: 16px 16px 16px 72px;
}
</style>
