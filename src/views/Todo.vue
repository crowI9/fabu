<template>
  <div class="todo-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>

    <!-- 顶部导航栏 - 与消息页面保持一致 -->
    <div class="nav-header">
      <div class="header-row">
        <div class="nav-left">
          <h1 class="page-title">待办</h1>
        </div>
        <div class="nav-actions">
          <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
        </div>
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
    <div class="page-content">
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
            <div class="demand-row">
              <span class="demand-tag">需求</span>
              <span class="demand-title">100m²平层住宅 | 毛坯装修 | 全屋设计</span>
            </div>
          </div>
          <div class="divider"></div>
          <div class="card-footer">
            <div class="stats-text">
              已有<span class="highlight-num">10</span>位服务方报名，<span class="highlight-num">0</span>位服务方已报价
            </div>
          </div>
          <div class="card-action">
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
            <div class="order-info-row">
              <span class="order-tag">订单</span>
              <span class="service-name">设计服务</span>
              <img src="/images/avatar/designer1.jpg" alt="头像" class="avatar-small">
              <span class="user-name">潘晓琪</span>
            </div>
            <div class="order-desc">您有一笔订单待付款，请及时处理</div>
          </div>
          <div class="divider"></div>
          <div class="card-action">
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
            <div class="order-info-row">
              <span class="order-tag">订单</span>
              <span class="service-name">设计服务</span>
              <img src="/images/avatar/designer1.jpg" alt="头像" class="avatar-small">
              <span class="user-name">潘晓琪</span>
            </div>
            <div class="order-desc">您有一笔订单成果已提交，需要您验收确认</div>
          </div>
          <div class="divider"></div>
          <div class="card-action">
            <button class="action-btn primary">去验收</button>
          </div>
        </div>
      </div>

      <!-- 进行中的需求 Tab -->
      <div v-if="activeTab === 'demand'" class="tab-content">
        <div class="todo-card">
          <div class="card-header">
            <div class="title-bar"></div>
            <h3 class="card-title">查看报名服务方</h3>
          </div>
          <div class="divider"></div>
          <div class="card-body">
            <div class="demand-row">
              <span class="demand-tag">需求</span>
              <span class="demand-title">100m²平层住宅 | 毛坯装修 | 全屋设计</span>
            </div>
          </div>
          <div class="divider"></div>
          <div class="card-footer">
            <div class="stats-text">
              已有<span class="highlight-num">10</span>位服务方报名，<span class="highlight-num">0</span>位服务方已报价
            </div>
          </div>
          <div class="card-action">
            <button class="action-btn primary">查看服务方</button>
          </div>
        </div>
      </div>

      <!-- 进行中的订单 Tab -->
      <div v-if="activeTab === 'order'" class="tab-content">
        <div class="todo-card">
          <div class="card-header">
            <div class="title-bar"></div>
            <h3 class="card-title">订单付款</h3>
          </div>
          <div class="divider"></div>
          <div class="card-body">
            <div class="order-info-row">
              <span class="order-tag">订单</span>
              <span class="service-name">设计服务</span>
              <img src="/images/avatar/designer1.jpg" alt="头像" class="avatar-small">
              <span class="user-name">潘晓琪</span>
            </div>
            <div class="order-desc">您有一笔订单待付款，请及时处理</div>
          </div>
          <div class="divider"></div>
          <div class="card-action">
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
</script>

<style scoped>
.todo-page {
  min-height: 100vh;
  min-height: -webkit-fill-available;
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

/* 顶部导航栏 - 与消息页面保持一致 */
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
  display: flex;
  align-items: center;
}

.page-title {
  font-size: 32px;
  font-family: 'DingTalk JinBuTi', 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #262626;
  line-height: 30px;
  margin: 0;
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
  flex-shrink: 0;
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

/* 页面内容区域 */
.page-content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 8px;
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
}

/* 我的待办卡片 */
.todo-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0px 8px 14px rgba(224, 229, 238, 0.50);
  overflow: hidden;
  flex-shrink: 0;
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

.demand-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.demand-tag {
  display: inline-flex;
  padding: 4px 8px;
  background: #E8F3FF;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #198CFE;
  line-height: 14px;
  flex-shrink: 0;
}

.demand-title {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 18px;
}

.order-info-row {
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
  flex-shrink: 0;
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
  flex-shrink: 0;
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
  padding: 12px 8px;
}

.stats-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 18px;
}

.stats-text .highlight-num {
  color: #198CFE;
  font-weight: 500;
}

.card-action {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px 12px;
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
</style>
