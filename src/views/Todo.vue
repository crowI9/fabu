<template>
  <div class="todo-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>

    <!-- 顶部导航栏 -->
    <div class="nav-header">
      <h1 class="main-title">待办</h1>
      <div class="nav-actions">
        <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
      </div>
    </div>

    <!-- Tab 切换栏 -->
    <div class="tab-wrapper">
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'todo' }"
        @click="activeTab = 'todo'"
      >
        我的待办(4)
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'demand' }"
        @click="activeTab = 'demand'"
      >
        进行中的需求(1)
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'order' }"
        @click="activeTab = 'order'"
      >
        进行中的订单
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 我的待办 Tab -->
      <div v-if="activeTab === 'todo'" class="tab-content">
        <!-- 查看报名服务方卡片 -->
        <div class="todo-card">
          <div class="card-header">
            <div class="title-bar"></div>
            <h3 class="card-title">查看报名服务方</h3>
          </div>
          <div class="divider"></div>
          <div class="card-body">
            <div class="demand-tag">需求</div>
            <div class="demand-title">100m²平层住宅 | 毛坯装修 | 全屋设计</div>
          </div>
          <div class="divider"></div>
          <div class="card-footer">
            <div class="stats-text">
              已有<span class="highlight">10</span>位服务方报名，<span class="highlight">0</span>位服务方已报价
            </div>
            <button class="action-btn primary">查看服务方</button>
          </div>
        </div>

        <!-- 订单付款卡片 -->
        <div class="todo-card">
          <div class="card-header">
            <div class="title-bar"></div>
            <h3 class="card-title">订单付款</h3>
          </div>
          <div class="divider"></div>
          <div class="card-body">
            <div class="order-info">
              <span class="order-tag">订单</span>
              <span class="service-name">设计服务</span>
              <img src="https://placehold.co/20x20" alt="头像" class="avatar-small">
              <span class="user-name">潘晓琪</span>
            </div>
            <div class="order-desc">您有一笔订单待付款，请及时处理</div>
          </div>
          <div class="divider"></div>
          <div class="card-footer">
            <button class="action-btn primary">去付款</button>
          </div>
        </div>

        <!-- 成果验收卡片 -->
        <div class="todo-card">
          <div class="card-header">
            <div class="title-bar"></div>
            <h3 class="card-title">成果验收</h3>
          </div>
          <div class="divider"></div>
          <div class="card-body">
            <div class="order-info">
              <span class="order-tag">订单</span>
              <span class="service-name">设计服务</span>
              <img src="https://placehold.co/20x20" alt="头像" class="avatar-small">
              <span class="user-name">潘晓琪</span>
            </div>
            <div class="order-desc">您有一笔订单成果已提交，需要您验收确认</div>
          </div>
          <div class="divider"></div>
          <div class="card-footer">
            <button class="action-btn primary">去验收</button>
          </div>
        </div>
      </div>

      <!-- 进行中的需求 Tab -->
      <div v-if="activeTab === 'demand'" class="tab-content">
        <div class="demand-card" v-for="(item, index) in demandList" :key="index">
          <div class="demand-header">
            <span class="demand-type">找设计师</span>
            <span class="demand-title-small">100m²平层住宅 | 毛坯装修 | 全屋设计</span>
            <span class="demand-status" :class="item.status">{{ item.statusText }}</span>
          </div>
          <div class="demand-tags">
            <span class="tag">2室1厅1厨1卫</span>
            <span class="tag">5000元预算</span>
            <span class="tag">3个月内装修</span>
          </div>
          <div class="demand-desc">想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...</div>
          <div class="demand-stats">
            累计10位服务方报名，已有0位服务方提交报价方案
          </div>
          <div class="demand-actions">
            <button class="action-btn primary">查看服务方</button>
          </div>
        </div>
      </div>

      <!-- 进行中的订单 Tab -->
      <div v-if="activeTab === 'order'" class="tab-content">
        <div class="order-card" v-for="(item, index) in orderList" :key="index">
          <div class="order-card-header">
            <span class="order-card-title">设计服务</span>
            <span class="order-status-tag">待付款</span>
          </div>
          <div class="order-detail-row">
            <span class="label">服务方</span>
            <div class="value">
              <img src="https://placehold.co/20x20" alt="头像" class="avatar-small">
              <span>潘晓琪</span>
              <span class="phone">13088888888</span>
            </div>
          </div>
          <div class="order-detail-row">
            <span class="label">工程费用</span>
            <span class="value price">¥10000</span>
          </div>
          <div class="order-detail-row">
            <span class="label">当前阶段</span>
            <span class="value">设计服务阶段一</span>
          </div>
          <div class="order-detail-row">
            <span class="label">当前阶段费用</span>
            <span class="value price highlight">¥7000</span>
          </div>
          <div class="order-card-footer">
            <button class="action-btn outline">查看详情</button>
            <button class="action-btn primary">去付款</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <TabBar active-tab="todo" :message-count="3" :todo-count="4" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabBar from '../components/TabBar.vue'

const activeTab = ref('todo')

const demandList = ref([
  {
    status: 'public',
    statusText: '公开问价'
  },
  {
    status: 'invite',
    statusText: '邀请问价'
  }
])

const orderList = ref([
  {
    title: '设计服务',
    status: '待付款',
    provider: '潘晓琪',
    phone: '13088888888',
    totalPrice: 10000,
    stage: '设计服务阶段一',
    stagePrice: 7000
  }
])
</script>

<style scoped>
.todo-page {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  /* iOS 状态栏规范：44px 状态栏 */
  padding-top: 44px;
  padding-bottom: 100px;
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
}

.nav-header .main-title {
  margin: 0;
  font-size: 32px;
  font-family: 'DingTalk JinBuTi', 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #262626;
  line-height: 30px;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.capsule-btn {
  width: 87px;
  height: 32px;
  object-fit: contain;
  display: block;
}

/* Tab 切换栏 */
.tab-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 12px;
  gap: 20px;
}

.tab-item {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #979797;
  cursor: pointer;
  white-space: nowrap;
  line-height: 24px;
}

.tab-item.active {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}

/* 内容区域 */
.content-container {
  position: relative;
  z-index: 10;
  padding: 0 8px;
  /* 与页面高度保持一致 */
  min-height: calc(100vh - 44px - 44px - 36px - 100px);
  min-height: calc(-webkit-fill-available - 44px - 44px - 36px - 100px);
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 我的待办卡片 */
.todo-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0px 8px 14px rgba(224, 229, 238, 0.50);
  overflow: hidden;
}

.card-header {
  position: relative;
  padding: 12px 8px 8px;
}

.title-bar {
  position: absolute;
  left: 9px;
  top: 28px;
  width: 32px;
  height: 4px;
  background: linear-gradient(90deg, #4E94FC 0%, rgba(120, 201, 253, 0) 89%);
  border-top-left-radius: 8px;
}

.card-title {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 20px;
  margin: 0;
}

.divider {
  height: 1px;
  background: #F6F6F6;
  margin: 0 8px;
}

.card-body {
  padding: 12px 8px;
}

.demand-tag {
  display: inline-flex;
  padding: 4px 8px;
  background: linear-gradient(0deg, #E8F3FF 0%, #E8F3FF 100%), white;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #198CFE;
  line-height: 14px;
  margin-right: 8px;
}

.demand-title {
  display: inline;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 18px;
}

.order-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.order-tag {
  display: inline-flex;
  padding: 4px 8px;
  background: rgba(6, 200, 118, 0.10);
  border-radius: 4px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #06C876;
  line-height: 14px;
}

.service-name {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 18px;
}

.avatar-small {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #262626;
  line-height: 16px;
}

.order-desc {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 18px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
}

.stats-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 18px;
}

.stats-text .highlight {
  color: #198CFE;
  font-weight: 500;
}

/* 按钮样式 */
.action-btn {
  padding: 6px 16px;
  border-radius: 22px;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  line-height: 20px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.action-btn.primary {
  background: linear-gradient(121deg, #5BF7FE 0%, #165FE6 100%);
  color: white;
}

.action-btn.outline {
  background: transparent;
  color: #198CFE;
  border: 1px solid #198CFE;
}

/* 进行中的需求卡片 */
.demand-card {
  background: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.demand-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.demand-type {
  display: inline-flex;
  padding: 4px 8px;
  background: #E8F3FF;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #198CFE;
  line-height: 14px;
}

.demand-title-small {
  flex: 1;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demand-status {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 18px;
}

.demand-status.public {
  color: #198CFE;
}

.demand-status.invite {
  color: #FF6B6B;
}

.demand-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.demand-tags .tag {
  padding: 4px 8px;
  background: #F5F5F5;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 14px;
}

.demand-desc {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 20px;
  margin-bottom: 8px;
}

.demand-stats {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 18px;
  margin-bottom: 12px;
}

.demand-actions {
  display: flex;
  justify-content: flex-end;
}

/* 进行中的订单卡片 */
.order-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.order-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.order-card-title {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 20px;
}

.order-status-tag {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #FF6B6B;
  line-height: 18px;
}

.order-detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.order-detail-row .label {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 18px;
}

.order-detail-row .value {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #262626;
  line-height: 16px;
}

.order-detail-row .value.price {
  font-weight: 500;
}

.order-detail-row .value.price.highlight {
  color: #FF6B6B;
}

.order-detail-row .value .phone {
  color: #8C8C8C;
}

.order-card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}
</style>
