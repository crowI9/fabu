<template>
  <div class="chat-page">
    <!-- 顶部导航 -->
    <div class="nav-header">
      <div class="nav-back" @click="goBack">
        <span class="back-arrow">‹</span>
      </div>
      <div class="nav-title">潘晓婷</div>
      <div class="nav-right">
        <div class="nav-menu"></div>
      </div>
    </div>

    <!-- 用户信息卡片 -->
    <div class="user-info-card">
      <div class="user-header">
        <img src="https://placehold.co/56x85" alt="头像" class="user-avatar">
        <div class="user-details">
          <div class="user-name-row">
            <div class="user-name">潘晓婷</div>
            <div class="user-badge">个人设计师</div>
          </div>
          <div class="user-stats">
            <div class="rating">
              <span class="star">★</span>
              <span class="score">4.7分</span>
            </div>
            <span class="stat-text">已服务 <span class="stat-num">132</span> · 累计获赞 <span class="stat-num">456</span></span>
          </div>
        </div>
        <div class="view-profile">看ta主页</div>
      </div>
      <div class="user-tags">
        <div class="tag">从业十年</div>
        <div class="tag">普通平层设计</div>
        <div class="tag">现代简约</div>
        <div class="tag">法式复古</div>
        <div class="tag">沟通耐心</div>
        <div class="tag">设计创新</div>
        <div class="tag">全套图纸</div>
      </div>
    </div>

    <!-- 聊天内容区域 -->
    <div class="chat-content">
      <div class="chat-time">2024/03/12 10:52</div>
      
      <!-- 对方消息 -->
      <div class="message-item received">
        <img src="https://placehold.co/34x51" alt="头像" class="message-avatar">
        <div class="message-bubble blue">
          <div class="message-text">你好，我近期准备装修，正在找设计师，看到你的履历非常优秀，可以聊聊吗？</div>
        </div>
        <div class="read-status">已读</div>
      </div>

      <!-- 我的消息 -->
      <div class="message-item sent">
        <div class="message-bubble white">
          <div class="message-text">可以的，您把需求先发我看看，然后咱们再详细沟通~</div>
        </div>
        <img src="https://placehold.co/32x48" alt="头像" class="message-avatar">
      </div>

      <!-- 动态渲染的消息列表 -->
      <div 
        v-for="(msg, index) in messageList" 
        :key="index"
        :class="['message-item', msg.type]"
      >
        <!-- 对方消息 -->
        <template v-if="msg.type === 'received'">
          <img src="https://placehold.co/34x51" alt="头像" class="message-avatar">
          <!-- 文本消息 -->
          <div v-if="msg.messageType === 'text'" class="message-bubble blue">
            <div class="message-text">{{ msg.content }}</div>
          </div>
          <!-- 需求卡片消息 -->
          <div v-else-if="msg.messageType === 'demand'" class="demand-card-message">
            <div class="demand-card">
              <div class="demand-title">装修需求</div>
              <div class="demand-info">
                <div class="info-row">
                  <span class="label">类型：</span>
                  <span class="value">{{ msg.demand.type }}</span>
                </div>
                <div class="info-row">
                  <span class="label">面积：</span>
                  <span class="value">{{ msg.demand.area }}㎡</span>
                </div>
                <div class="info-row">
                  <span class="label">户型：</span>
                  <span class="value">{{ msg.demand.houseType }}</span>
                </div>
                <div class="info-row">
                  <span class="label">预算：</span>
                  <span class="value budget">{{ msg.demand.budget }}</span>
                </div>
              </div>
              <div class="demand-footer">{{ msg.demand.community }}</div>
            </div>
          </div>
          <div class="read-status" v-if="msg.messageType === 'text'">已读</div>
        </template>

        <!-- 我的消息 -->
        <template v-if="msg.type === 'sent'">
          <!-- 文本消息 -->
          <div v-if="msg.messageType === 'text'" class="message-bubble white">
            <div class="message-text">{{ msg.content }}</div>
          </div>
          <!-- 需求卡片消息 -->
          <div v-else-if="msg.messageType === 'demand'" class="demand-card-message">
            <div class="demand-card">
              <div class="demand-title">装修需求</div>
              <div class="demand-info">
                <div class="info-row">
                  <span class="label">类型：</span>
                  <span class="value">{{ msg.demand.type }}</span>
                </div>
                <div class="info-row">
                  <span class="label">面积：</span>
                  <span class="value">{{ msg.demand.area }}㎡</span>
                </div>
                <div class="info-row">
                  <span class="label">户型：</span>
                  <span class="value">{{ msg.demand.houseType }}</span>
                </div>
                <div class="info-row">
                  <span class="label">预算：</span>
                  <span class="value budget">{{ msg.demand.budget }}</span>
                </div>
              </div>
              <div class="demand-footer">{{ msg.demand.community }}</div>
            </div>
          </div>
          <img src="https://placehold.co/32x48" alt="头像" class="message-avatar">
        </template>
      </div>
    </div>

    <!-- 底部输入区域 -->
    <div class="chat-input-area">
      <div class="input-wrapper">
        <div class="quick-action" @click="showDemandSelector">发需求</div>
        <input type="text" placeholder="回复消息" class="message-input" v-model="inputMessage" @keyup.enter="sendMessage">
        <div class="input-actions">
          <div class="action-btn emoji"></div>
          <div class="action-btn plus"></div>
        </div>
      </div>
      
      <!-- 快捷功能面板 -->
      <div class="quick-panel">
        <div class="quick-item">
          <div class="quick-icon image"></div>
          <div class="quick-text">发送图片</div>
        </div>
        <div class="quick-item">
          <div class="quick-icon location"></div>
          <div class="quick-text">发送地址</div>
        </div>
      </div>
    </div>

    <!-- 需求选择弹窗 -->
    <div class="demand-selector-overlay" v-if="showDemandPanel" @click="closeDemandSelector">
      <div class="demand-selector-panel" @click.stop>
        <div class="selector-header">
          <div class="selector-title">选择需求</div>
          <div class="close-btn" @click="closeDemandSelector">×</div>
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
              <span class="check-icon">✓</span>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div class="selector-empty" v-if="demandList.length === 0">
          <div class="empty-text">暂无询价中的需求</div>
        </div>

        <!-- 底部按钮 -->
        <div class="selector-actions">
          <div class="selector-btn create" @click="createNewDemand">创建新需求</div>
          <div class="selector-btn confirm" :class="{ disabled: !selectedDemand }" @click="confirmSendDemand">发送需求</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputMessage = ref('')
const showDemandPanel = ref(false)
const selectedDemand = ref(null)
const messageList = ref([])

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

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  messageList.value.push({
    type: 'sent',
    messageType: 'text',
    content: inputMessage.value
  })
  
  inputMessage.value = ''
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
  
  // 添加需求卡片消息到聊天列表
  messageList.value.push({
    type: 'sent',
    messageType: 'demand',
    demand: selectedDemand.value
  })
  
  closeDemandSelector()
}
</script>

<style scoped>
.chat-page {
  min-height: 100vh;
  background: #F2F3F5;
  display: flex;
  flex-direction: column;
}

/* 顶部导航 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #F6F6F6;
  padding-top: 44px;
}

.nav-back {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-arrow {
  font-size: 24px;
  color: #262626;
  font-weight: 300;
}

.nav-title {
  font-size: 17px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 700;
  color: #262626;
  opacity: 0.9;
}

.nav-right {
  width: 87px;
  height: 32px;
  background: rgba(255, 255, 255, 0.60);
  border-radius: 25px;
  border: 0.5px rgba(150.96, 150.96, 150.96, 0.20) solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-menu {
  width: 0.5px;
  height: 18.5px;
  background: rgba(0, 0, 0, 0.20);
}

/* 用户信息卡片 */
.user-info-card {
  margin: 8px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  backdrop-filter: blur(2px);
}

.user-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.user-avatar {
  width: 56px;
  height: 85px;
  border-radius: 4px;
}

.user-details {
  flex: 1;
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
  font-weight: 700;
  line-height: 18px;
  color: #262626;
}

.user-badge {
  height: 20px;
  padding: 0 8px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 700;
  line-height: 14px;
  color: white;
}

.view-profile {
  width: 58px;
  height: 24px;
  border-radius: 100px;
  outline: 0.5px #198CFE solid;
  outline-offset: -0.25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 16px;
  color: #198CFE;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  width: 18px;
  height: 16px;
  background: #F55F4E;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
}

.score {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 700;
  line-height: 18px;
  color: #F55F4E;
}

.stat-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 18px;
  color: #8C8C8C;
}

.stat-num {
  color: #262626;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

.user-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  height: 20px;
  padding: 0 8px;
  background: linear-gradient(0deg, #E8F3FF 0%, #E8F3FF 100%), white;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 14px;
  color: #198CFE;
}

/* 聊天内容区域 */
.chat-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.chat-time {
  text-align: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 20px;
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
  width: 32px;
  height: 48px;
  border-radius: 4px;
}

.message-bubble {
  max-width: 248px;
  padding: 12px;
  border-radius: 8px;
}

.message-bubble.blue {
  background: #198CFE;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
}

.message-bubble.white {
  background: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.message-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.message-bubble.blue .message-text {
  color: white;
}

.message-bubble.white .message-text {
  color: #262626;
}

.read-status {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 10px;
  color: #8C8C8C;
  align-self: flex-end;
  margin-bottom: 8px;
}

/* 需求卡片消息 */
.demand-card-message {
  max-width: 300px;
  width: 280px;
}

.demand-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demand-title {
  padding: 12px 16px;
  background: linear-gradient(121deg, #5BF7FE 0%, #165FE6 100%);
  color: white;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 700;
}

.demand-info {
  padding: 12px 16px;
}

.info-row {
  display: flex;
  margin-bottom: 8px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-row .label {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #8C8C8C;
  min-width: 45px;
}

.info-row .value {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #262626;
  font-weight: 500;
}

.info-row .value.budget {
  color: #F55F4E;
  font-weight: 700;
}

.demand-footer {
  padding: 10px 16px;
  background: #F8F9FA;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #8C8C8C;
  border-top: 1px solid #F0F0F0;
}

/* 底部输入区域 */
.chat-input-area {
  background: white;
  padding: 8px;
  padding-bottom: 34px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #F5F5F6;
  border-radius: 100px;
  margin-bottom: 8px;
}

.quick-action {
  height: 28px;
  padding: 0 12px;
  background: linear-gradient(121deg, #5BF7FE 0%, #165FE6 100%);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 700;
  line-height: 18px;
  color: white;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.quick-action:active {
  opacity: 0.8;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 18px;
  color: #262626;
  outline: none;
}

.message-input::placeholder {
  color: #8C8C8C;
}

.input-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 24px;
  height: 24px;
  background: #262626;
  border-radius: 50%;
}

/* 快捷功能面板 */
.quick-panel {
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  background: #F5F5F6;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.quick-icon {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-icon.image {
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z'/%3E%3C/svg%3E") no-repeat center;
  background-size: 24px;
}

.quick-icon.location {
  background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E") no-repeat center;
  background-size: 24px;
}

.quick-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  text-align: center;
  color: #8C8C8C;
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
  font-weight: 700;
  color: #262626;
}

.close-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #8C8C8C;
  cursor: pointer;
}

.selector-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
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
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.selector-item:active {
  transform: scale(0.98);
}

.selector-item.selected {
  border-color: #198CFE;
  background: #F0F7FF;
}

.selector-info {
  flex: 1;
}

.selector-type {
  font-size: 15px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.selector-detail {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #8C8C8C;
}

.selector-check {
  width: 24px;
  height: 24px;
  background: #198CFE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  color: white;
  font-size: 14px;
}

.selector-empty {
  padding: 40px 16px;
  text-align: center;
}

.empty-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #8C8C8C;
}

.selector-actions {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  padding-bottom: 34px;
  border-top: 1px solid #F0F0F0;
}

.selector-btn {
  flex: 1;
  height: 44px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.selector-btn.create {
  background: white;
  border: 1px solid #198CFE;
  color: #198CFE;
}

.selector-btn.create:active {
  background: #F0F7FF;
}

.selector-btn.confirm {
  background: linear-gradient(121deg, #5BF7FE 0%, #165FE6 100%);
  color: white;
}

.selector-btn.confirm:active {
  opacity: 0.9;
}

.selector-btn.confirm.disabled {
  background: #D9D9D9;
  cursor: not-allowed;
}
</style>