<template>
  <div class="chat-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>

    <!-- 页面内容容器 -->
    <div class="page-container">
      <!-- 顶部导航栏 - 与Message页面保持完全一致 -->
      <div class="nav-header">
        <div class="header-row">
          <div class="nav-left" @click="goBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="nav-title">潘晓琪</div>
        </div>
        <div class="nav-actions">
          <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
        </div>
      </div>

      <!-- 中间内容区域 - 可滚动 -->
      <div class="content-scroll-area">
        <!-- 用户信息卡片 -->
        <div class="user-info-card">
          <div class="user-header">
            <img src="/images/avatar/designer1.jpg" alt="头像" class="user-avatar">
            <div class="user-details">
              <div class="user-name-row">
                <span class="user-name">潘晓琪</span>
                <span class="user-badge">个人设计师</span>
              </div>
              <div class="user-stats">
                <div class="rating">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#F55F4E">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  <span class="score">4.7分</span>
                </div>
                <span class="stat-divider">·</span>
                <span class="stat-text">已服务 <span class="stat-num">132</span></span>
                <span class="stat-divider">·</span>
                <span class="stat-text">累计获赞 <span class="stat-num">456</span></span>
              </div>
            </div>
            <button class="view-profile-btn">看ta主页</button>
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
        <div class="chat-content" ref="chatContent">
          <div class="chat-time">2024/03/12 10:52</div>
          
          <!-- 对方消息 -->
          <div class="message-item received">
            <img src="/images/avatar/designer1.jpg" alt="头像" class="message-avatar">
            <div class="message-content">
              <div class="message-bubble blue">
                <div class="message-text">你好，我近期准备装修，正在找设计师，看到你的履历非常优秀，可以聊聊吗？</div>
              </div>
              <div class="read-status">已读</div>
            </div>
          </div>

          <!-- 我的消息 -->
          <div class="message-item sent">
            <div class="message-content">
              <div class="message-bubble white">
                <div class="message-text">可以的，您把需求先发我看看，然后咱们再详细沟通~</div>
              </div>
            </div>
            <img src="/images/avatar/worker1.jpg" alt="头像" class="message-avatar">
          </div>

          <!-- 动态渲染的消息列表 -->
          <div 
            v-for="(msg, index) in messageList" 
            :key="index"
            :class="['message-item', msg.type]"
          >
            <!-- 对方消息 -->
            <template v-if="msg.type === 'received'">
              <img src="/images/avatar/designer1.jpg" alt="头像" class="message-avatar">
              <div class="message-content">
                <!-- 文本消息 -->
                <div v-if="msg.messageType === 'text'" class="message-bubble blue">
                  <div class="message-text">{{ msg.content }}</div>
                </div>
                <!-- 需求卡片消息 -->
                <div v-else-if="msg.messageType === 'demand'" class="demand-card">
                  <div class="demand-card-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>装修需求</span>
                  </div>
                  <div class="demand-card-body">
                    <div class="demand-row">
                      <span class="demand-label">类型：</span>
                      <span class="demand-value">{{ msg.demand.type }}</span>
                    </div>
                    <div class="demand-row">
                      <span class="demand-label">面积：</span>
                      <span class="demand-value">{{ msg.demand.area }}㎡</span>
                    </div>
                    <div class="demand-row">
                      <span class="demand-label">户型：</span>
                      <span class="demand-value">{{ msg.demand.houseType }}</span>
                    </div>
                    <div class="demand-row">
                      <span class="demand-label">预算：</span>
                      <span class="demand-value budget">{{ msg.demand.budget }}</span>
                    </div>
                  </div>
                  <div class="demand-card-footer">{{ msg.demand.community }}</div>
                </div>
                <div class="read-status" v-if="msg.messageType === 'text'">已读</div>
              </div>
            </template>

            <!-- 我的消息 -->
            <template v-if="msg.type === 'sent'">
              <div class="message-content">
                <!-- 文本消息 -->
                <div v-if="msg.messageType === 'text'" class="message-bubble white">
                  <div class="message-text">{{ msg.content }}</div>
                </div>
                <!-- 需求卡片消息 -->
                <div v-else-if="msg.messageType === 'demand'" class="demand-card">
                  <div class="demand-card-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>装修需求</span>
                  </div>
                  <div class="demand-card-body">
                    <div class="demand-row">
                      <span class="demand-label">类型：</span>
                      <span class="demand-value">{{ msg.demand.type }}</span>
                    </div>
                    <div class="demand-row">
                      <span class="demand-label">面积：</span>
                      <span class="demand-value">{{ msg.demand.area }}㎡</span>
                    </div>
                    <div class="demand-row">
                      <span class="demand-label">户型：</span>
                      <span class="demand-value">{{ msg.demand.houseType }}</span>
                    </div>
                    <div class="demand-row">
                      <span class="demand-label">预算：</span>
                      <span class="demand-value budget">{{ msg.demand.budget }}</span>
                    </div>
                  </div>
                  <div class="demand-card-footer">{{ msg.demand.community }}</div>
                </div>
              </div>
              <img src="/images/avatar/worker1.jpg" alt="头像" class="message-avatar">
            </template>
          </div>
        </div>
      </div>

      <!-- 底部输入区域 -->
      <div class="chat-input-area">
        <div class="input-wrapper">
          <button class="quick-action-btn" @click="showDemandSelector">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>发需求</span>
          </button>
          <input 
            type="text" 
            class="message-input" 
            placeholder="回复消息" 
            v-model="inputMessage" 
            @keyup.enter="sendMessage"
          >
          <div class="input-actions">
            <button class="action-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9H9.01" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 9H15.01" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="action-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5V19M5 12H19" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 需求选择弹窗 -->
    <div class="demand-selector-overlay" v-if="showDemandPanel" @click="closeDemandSelector">
      <div class="demand-selector-panel" @click.stop>
        <div class="selector-header">
          <h3 class="selector-title">选择需求</h3>
          <button class="close-btn" @click="closeDemandSelector">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="#8C8C8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- 需求列表 -->
        <div class="selector-list">
          <div 
            class="selector-item" 
            v-for="(item, index) in demandList" 
            :key="index"
            @click="selectDemand(item)"
            :class="{ selected: selectedDemand?.id === item.id }"
          >
            <div class="selector-info">
              <div class="selector-type">{{ item.type }} · {{ item.area }}㎡ · {{ item.houseType }}</div>
              <div class="selector-detail">{{ item.community }} · {{ item.budget }}</div>
            </div>
            <div class="selector-check" v-if="selectedDemand?.id === item.id">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="#198CFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div class="selector-empty" v-if="demandList.length === 0">
          <div class="empty-text">暂无询价中的需求</div>
        </div>

        <!-- 底部按钮 -->
        <div class="selector-actions">
          <button class="selector-btn create" @click="createNewDemand">创建新需求</button>
          <button class="selector-btn confirm" :class="{ disabled: !selectedDemand }" @click="confirmSendDemand">发送需求</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputMessage = ref('')
const showDemandPanel = ref(false)
const selectedDemand = ref(null)
const messageList = ref([])
const chatContent = ref(null)

// 模拟需求数据
const demandList = ref([
  {
    id: 1,
    type: '家装',
    area: 120,
    houseType: '3室2厅',
    community: '万科金域华府',
    budget: '15-20万'
  },
  {
    id: 2,
    type: '公装',
    area: 200,
    houseType: '商铺门店',
    community: '福田中心区',
    budget: '25-30万'
  },
  {
    id: 3,
    type: '家装',
    area: 89,
    houseType: '2室1厅',
    community: '龙华壹城中心',
    budget: '10-15万'
  }
])

const goBack = () => {
  router.back()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContent.value) {
      chatContent.value.scrollTop = chatContent.value.scrollHeight
    }
  })
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  messageList.value.push({
    type: 'sent',
    messageType: 'text',
    content: inputMessage.value
  })
  
  inputMessage.value = ''
  scrollToBottom()
}

const showDemandSelector = () => {
  showDemandPanel.value = true
  selectedDemand.value = null
}

const closeDemandSelector = () => {
  showDemandPanel.value = false
  selectedDemand.value = null
}

const selectDemand = (item) => {
  selectedDemand.value = item
}

const createNewDemand = () => {
  closeDemandSelector()
  router.push('/demand-config')
}

const confirmSendDemand = () => {
  if (!selectedDemand.value) return
  
  messageList.value.push({
    type: 'sent',
    messageType: 'demand',
    demand: selectedDemand.value
  })
  
  closeDemandSelector()
  scrollToBottom()
}
</script>

<style scoped>
.chat-page {
  height: 100%;
  background: #F3F7F8;
  position: relative;
  overflow: hidden;
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

/* 页面内容容器 - 使用flex布局 */
.page-container {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 - 与Message页面保持完全一致 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  /* iOS 导航栏规范：44px */
  height: 44px;
  flex-shrink: 0;
}

.header-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-left {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-title {
  font-size: 17px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 44px;
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

/* 中间内容区域 - 可滚动，与顶部导航栏保持16px间距 */
.content-scroll-area {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 16px 16px;
}

/* 用户信息卡片 - 与顶部导航栏保持16px间距 */
.user-info-card {
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background: white;
  border-radius: 12px;
}

.user-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.user-name {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
}

.user-badge {
  padding: 2px 8px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border-radius: 12px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: white;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.score {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #F55F4E;
}

.stat-divider {
  font-size: 14px;
  color: #BFBFBF;
  margin: 0 4px;
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

.view-profile-btn {
  padding: 4px 12px;
  background: transparent;
  border: 1px solid #198CFE;
  border-radius: 100px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #198CFE;
  cursor: pointer;
  white-space: nowrap;
}

.user-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background: linear-gradient(0deg, #E8F3FF 0%, #E8F3FF 100%), white;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #198CFE;
}

/* 聊天内容区域 - 与用户信息卡片保持16px间距 */
.chat-content {
  padding: 0;
  margin-top: 16px;
}

.chat-time {
  text-align: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  margin-bottom: 16px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 16px;
}

.message-item.received {
  justify-content: flex-start;
}

.message-item.sent {
  justify-content: flex-end;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 70%;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 16px;
  word-wrap: break-word;
}

.message-bubble.blue {
  background: #198CFE;
  border-bottom-left-radius: 4px;
}

.message-bubble.white {
  background: white;
  border-bottom-right-radius: 4px;
}

.message-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 20px;
}

.message-bubble.blue .message-text {
  color: white;
}

.message-bubble.white .message-text {
  color: #262626;
}

.read-status {
  font-size: 11px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  align-self: flex-start;
}

/* 需求卡片 */
.demand-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  width: 260px;
}

.demand-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: white;
}

.demand-card-body {
  padding: 12px 16px;
}

.demand-row {
  display: flex;
  margin-bottom: 8px;
}

.demand-row:last-child {
  margin-bottom: 0;
}

.demand-label {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  min-width: 45px;
}

.demand-value {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: #262626;
}

.demand-value.budget {
  color: #F55F4E;
  font-weight: 600;
}

.demand-card-footer {
  padding: 10px 16px;
  background: #F8F9FA;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  border-top: 1px solid #F0F0F0;
}

/* 底部输入区域 - 固定在底部 */
.chat-input-area {
  background: white;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  flex-shrink: 0;
  border-top: 1px solid #F0F0F0;
  margin-top: auto;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border: none;
  border-radius: 100px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
}

.message-input {
  flex: 1;
  height: 40px;
  padding: 0 16px;
  background: #F5F5F6;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #262626;
  outline: none;
}

.message-input::placeholder {
  color: #8C8C8C;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
}

/* 需求选择弹窗 */
.demand-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.demand-selector-panel {
  width: 100%;
  max-height: 70vh;
  background: white;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
}

.selector-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #F0F0F0;
}

.selector-title {
  font-size: 17px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
}

.close-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
}

.selector-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  max-height: 400px;
}

.selector-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #F8F9FA;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.selector-item:last-child {
  margin-bottom: 0;
}

.selector-item.selected {
  background: #E8F3FF;
}

.selector-type {
  font-size: 15px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: #262626;
  margin-bottom: 4px;
}

.selector-detail {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
}

.selector-check {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.selector-empty {
  padding: 40px;
  text-align: center;
}

.empty-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
}

.selector-actions {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #F0F0F0;
}

.selector-btn {
  flex: 1;
  height: 44px;
  border: none;
  border-radius: 100px;
  font-size: 15px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  cursor: pointer;
}

.selector-btn.create {
  background: #F5F5F6;
  color: #262626;
}

.selector-btn.confirm {
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  color: white;
}

.selector-btn.confirm.disabled {
  background: #D9D9D9;
  color: #8C8C8C;
  cursor: not-allowed;
}
</style>