<template>
  <div class="demand-manage-page">
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
        <h1 class="page-title">待办</h1>
      </div>
      <div class="nav-actions">
        <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
      </div>
    </div>

    <!-- Tab 切换栏 -->
    <div class="tab-wrapper">
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'all' }"
        @click="activeTab = 'all'"
      >
        全部
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'publish' }"
        @click="activeTab = 'publish'"
      >
        已发布
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'selecting' }"
        @click="activeTab = 'selecting'"
      >
        筛选中
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'working' }"
        @click="activeTab = 'working'"
      >
        进行中
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'completed' }"
        @click="activeTab = 'completed'"
      >
        已完成
      </div>
    </div>

    <!-- 需求列表 -->
    <div class="demand-list">
      <div class="demand-card">
        <div class="card-header">
          <span class="demand-tag">需求</span>
          <span class="demand-status">筛选中</span>
        </div>
        <div class="card-body">
          <div class="demand-title">100m²平层住宅 | 毛坯装修 | 全屋设计</div>
          <div class="demand-info">
            <span class="info-item">毛坯房</span>
            <span class="info-item">全屋设计</span>
            <span class="info-item">预算：5-10万</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="stats-text">已有 <span class="highlight-num">10</span> 位服务方报名</div>
        </div>
      </div>

      <div class="demand-card">
        <div class="card-header">
          <span class="demand-tag">需求</span>
          <span class="demand-status working">进行中</span>
        </div>
        <div class="card-body">
          <div class="demand-title">80m²平层住宅 | 旧房翻新 | 局部改造</div>
          <div class="demand-info">
            <span class="info-item">旧房翻新</span>
            <span class="info-item">局部改造</span>
            <span class="info-item">预算：3-5万</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="stats-text">服务方：<span class="highlight-num">潘晓琪</span></div>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <TabBar active-tab="demand" :message-count="3" :todo-count="4" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabBar from '../components/TabBar.vue'

const activeTab = ref('all')
</script>

<style scoped>
.demand-manage-page {
  height: 100vh;
  height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  padding-top: 44px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 渐变背景 */
.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: -webkit-fill-available;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  background: linear-gradient(180deg, #E1EFFC 0%, rgba(225, 239, 252, 0) 30%, #F3F7F8 100%);
}

.gradient-circle {
  position: fixed;
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
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-row {
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
  gap: 16px;
  overflow-x: auto;
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

/* 需求列表 */
.demand-list {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 8px 16px;
  overflow-y: auto;
}

/* 需求卡片 */
.demand-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0px 8px 14px rgba(224, 229, 238, 0.50);
  padding: 16px;
  flex-shrink: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
}

.demand-status {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  color: #FAAD14;
  line-height: 14px;
}

.demand-status.working {
  color: #198CFE;
}

.demand-title {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  color: #262626;
  line-height: 22px;
  margin-bottom: 8px;
}

.demand-info {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.info-item {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  line-height: 16px;
}

.card-footer {
  display: flex;
  align-items: center;
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
</style>
