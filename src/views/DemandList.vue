<template>
  <div class="demand-list-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>
    <!-- 顶部导航 -->
    <div class="nav-header">
      <div class="nav-back" @click="goBack">
        <span class="back-arrow">‹</span>
      </div>
      <div class="nav-title">发送需求</div>
      <div class="nav-right"></div>
    </div>

    <!-- 标签切换 -->
    <div class="tab-bar">
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'inquiry' }"
        @click="activeTab = 'inquiry'"
      >
        询价中
        <span class="tab-badge" v-if="inquiryCount > 0">{{ inquiryCount }}</span>
      </div>
      <div 
        class="tab-item" 
        :class="{ active: activeTab === 'pending' }"
        @click="activeTab = 'pending'"
      >
        待确认
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
      <div 
        class="demand-card" 
        v-for="(item, index) in filteredDemands" 
        :key="index"
        @click="selectDemand(item)"
        :class="{ selected: selectedDemand === item.id }"
      >
        <div class="demand-header">
          <div class="demand-type">{{ item.type }}</div>
          <div class="demand-status" :class="item.status">{{ item.statusText }}</div>
        </div>
        <div class="demand-info">
          <div class="info-item">
            <span class="label">房屋面积</span>
            <span class="value">{{ item.area }}㎡</span>
          </div>
          <div class="info-item">
            <span class="label">户型</span>
            <span class="value">{{ item.houseType }}</span>
          </div>
          <div class="info-item">
            <span class="label">小区</span>
            <span class="value">{{ item.community }}</span>
          </div>
          <div class="info-item">
            <span class="label">预算</span>
            <span class="value budget">{{ item.budget }}</span>
          </div>
        </div>
        <div class="demand-footer">
          <div class="publish-time">发布时间：{{ item.publishTime }}</div>
          <div class="quote-count" v-if="item.quoteCount > 0">
            已有 {{ item.quoteCount }} 家报价
          </div>
        </div>
        <div class="selected-icon" v-if="selectedDemand === item.id">
          <span class="check-icon">✓</span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="empty-state" v-if="filteredDemands.length === 0">
      <div class="empty-icon"></div>
      <div class="empty-text">暂无{{ activeTab === 'inquiry' ? '询价中' : activeTab === 'pending' ? '待确认' : '已完成' }}的需求</div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-actions">
      <div class="action-btn create" @click="createNewDemand">
        <span class="btn-icon">+</span>
        <span class="btn-text">创建新需求</span>
      </div>
      <div class="action-btn send" :class="{ disabled: !selectedDemand }" @click="sendDemand">
        发送需求
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('inquiry')
const selectedDemand = ref(null)

// 模拟需求数据
const demandList = ref([
  {
    id: 1,
    type: '家装',
    status: 'inquiry',
    statusText: '询价中',
    area: 120,
    houseType: '3室2厅',
    community: '万科金域华府',
    budget: '15-20万',
    publishTime: '2024-03-15',
    quoteCount: 3
  },
  {
    id: 2,
    type: '公装',
    status: 'inquiry',
    statusText: '询价中',
    area: 200,
    houseType: '商铺门店',
    community: '福田中心区',
    budget: '25-30万',
    publishTime: '2024-03-14',
    quoteCount: 5
  },
  {
    id: 3,
    type: '家装',
    status: 'pending',
    statusText: '待确认',
    area: 89,
    houseType: '2室1厅',
    community: '龙华壹城中心',
    budget: '10-15万',
    publishTime: '2024-03-13',
    quoteCount: 2
  },
  {
    id: 4,
    type: '家装',
    status: 'completed',
    statusText: '已完成',
    area: 150,
    houseType: '4室2厅',
    community: '南山华润城',
    budget: '30-40万',
    publishTime: '2024-03-10',
    quoteCount: 0
  }
])

// 询价中数量
const inquiryCount = computed(() => {
  return demandList.value.filter(item => item.status === 'inquiry').length
})

// 过滤后的需求列表
const filteredDemands = computed(() => {
  return demandList.value.filter(item => item.status === activeTab.value)
})

const goBack = () => {
  router.back()
}

const selectDemand = (item) => {
  selectedDemand.value = item.id
}

const createNewDemand = () => {
  router.push('/demand-config')
}

const sendDemand = () => {
  if (!selectedDemand.value) return
  // 发送需求逻辑
  console.log('发送需求:', selectedDemand.value)
  // 可以显示成功提示，然后返回
  router.back()
}
</script>

<style scoped>
.demand-list-page {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  /* iOS 状态栏规范：44px + 8px 间距 */
  padding-top: 52px;
  padding-bottom: 80px;
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
  width: 160px;
  height: 160px;
  right: -40px;
  top: 160px;
  background: white;
  filter: blur(60px);
}

.circle-3 {
  width: 200px;
  height: 200px;
  right: -50px;
  top: 300px;
  background: #9AD0FF;
  filter: blur(80px);
}

.circle-4 {
  width: 180px;
  height: 180px;
  left: -30px;
  top: 400px;
  background: #EFFCF8;
  filter: blur(70px);
}

/* 顶部导航 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 44px 24px 12px;
  background: white;
  border-bottom: 1px solid #F6F6F6;
}

.nav-back {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-left: -8px;
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
}

.nav-right {
  width: 40px;
  display: flex;
  justify-content: flex-start;
}

/* 标签栏 */
.tab-bar {
  display: flex;
  background: white;
  padding: 0 16px;
  border-bottom: 1px solid #F6F6F6;
}

.tab-item {
  flex: 1;
  padding: 16px 0;
  text-align: center;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  color: #8C8C8C;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.tab-item.active {
  color: #198CFE;
  font-weight: 700;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: #198CFE;
  border-radius: 2px;
}

.tab-badge {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #F55F4E;
  border-radius: 8px;
  font-size: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 需求列表 */
.demand-list {
  padding: 12px 16px;
  /* 与页面高度保持一致 */
  min-height: calc(100vh - 52px - 44px - 48px - 80px);
  min-height: calc(-webkit-fill-available - 52px - 44px - 48px - 80px);
}

.demand-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.demand-card:active {
  transform: scale(0.98);
}

.demand-card.selected {
  border-color: #198CFE;
}

.demand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.demand-type {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 700;
  color: #262626;
}

.demand-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
}

.demand-status.inquiry {
  background: #E8F3FF;
  color: #198CFE;
}

.demand-status.pending {
  background: #FFF7E6;
  color: #FA8C16;
}

.demand-status.completed {
  background: #F6FFED;
  color: #52C41A;
}

.demand-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #8C8C8C;
}

.value {
  font-size: 13px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #262626;
  font-weight: 500;
}

.value.budget {
  color: #F55F4E;
  font-weight: 700;
}

.demand-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F6F6F6;
}

.publish-time {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #8C8C8C;
}

.quote-count {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #198CFE;
  font-weight: 500;
}

.selected-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 20px;
  height: 20px;
  background: #198CFE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  color: white;
  font-size: 12px;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 16px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: #E8E8E8;
  border-radius: 50%;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  color: #8C8C8C;
}

/* 底部操作栏 */
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  padding-bottom: 34px;
  background: white;
  border-top: 1px solid #F6F6F6;
}

.action-btn {
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

.action-btn.create {
  background: white;
  border: 1px solid #198CFE;
  color: #198CFE;
  gap: 4px;
}

.action-btn.create:active {
  background: #F0F7FF;
}

.btn-icon {
  font-size: 18px;
  font-weight: 400;
}

.action-btn.send {
  background: linear-gradient(121deg, #5BF7FE 0%, #165FE6 100%);
  color: white;
}

.action-btn.send:active {
  opacity: 0.9;
}

.action-btn.send.disabled {
  background: #D9D9D9;
  cursor: not-allowed;
}
</style>