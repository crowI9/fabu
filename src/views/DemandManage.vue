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
    <div class="header">
      <div class="header-left" @click="goBack">
        <img :src="getIconUrl('icon-back.png')" alt="返回" class="back-icon">
      </div>
      <div class="header-title">需求管理</div>
      <div class="header-right">
        <img :src="getIconUrl('capsule-btn.png')" alt="菜单" class="capsule-btn-img">
      </div>
    </div>

    <!-- 状态筛选标签 -->
    <div class="status-tabs">
      <div 
        v-for="tab in statusTabs" 
        :key="tab.id"
        class="status-tab"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <!-- 需求列表 -->
      <div class="demand-list">
        <div 
          v-for="item in filteredDemands" 
          :key="item.id"
          class="demand-card"
          @click="goToDetail(item)"
        >
          <!-- 状态标签 -->
          <div class="demand-status" :class="item.statusClass">{{ item.statusText }}</div>
          
          <!-- 需求标题 -->
          <div class="demand-title">{{ item.title }}</div>
          
          <!-- 需求类型标签 -->
          <div class="demand-tags">
            <span class="tag type-tag" :class="item.typeClass">{{ item.type }}</span>
            <span class="tag info-tag">{{ item.roomInfo }}</span>
            <span class="tag info-tag">{{ item.budget }}</span>
            <span class="tag info-tag">{{ item.time }}</span>
            <span class="tag info-tag" v-if="item.hasDrawings">有图纸</span>
          </div>
          
          <!-- 需求描述 -->
          <div class="demand-desc">{{ item.description }}</div>
          
          <!-- 分隔线 -->
          <div class="divider"></div>
          
          <!-- 用户信息 -->
          <div class="user-info">
            <img :src="item.avatar" alt="头像" class="user-avatar">
            <span class="user-name">{{ item.userName }}</span>
            <span class="publish-label">发布</span>
            <span class="publish-time">{{ item.publishTime }}</span>
          </div>
          
          <!-- 分隔线 -->
          <div class="divider"></div>
          
          <!-- 操作按钮区 -->
          <div class="action-buttons">
            <!-- 已报名状态 -->
            <template v-if="item.status === 'registered'">
              <div class="btn btn-primary" @click.stop="viewDetail(item)">查看详情</div>
            </template>
            
            <!-- 待确认状态 -->
            <template v-else-if="item.status === 'pending'">
              <div class="btn btn-outline" @click.stop="contactOwner(item)">联系业主</div>
              <div class="btn btn-primary" @click.stop="viewDetail(item)">查看详情</div>
              <div class="btn btn-primary" @click.stop="acceptDemand(item)">接受需求</div>
            </template>
            
            <!-- 沟通中状态 -->
            <template v-else-if="item.status === 'communicating'">
              <div class="btn btn-outline" @click.stop="contactOwner(item)">联系业主</div>
              <div class="btn btn-primary" @click.stop="viewDetail(item)">查看详情</div>
              <div class="btn btn-primary" @click.stop="submitQuote(item)">提交报价</div>
            </template>
            
            <!-- 已报价状态 -->
            <template v-else-if="item.status === 'quoted'">
              <div class="btn btn-outline" @click.stop="contactOwner(item)">联系业主</div>
              <div class="btn btn-primary" @click.stop="viewDetail(item)">查看详情</div>
              <div class="btn btn-primary" @click.stop="viewQuote(item)">查看报价</div>
            </template>
            
            <!-- 已下单状态 -->
            <template v-else-if="item.status === 'ordered'">
              <div class="btn btn-outline" @click.stop="contactOwner(item)">联系业主</div>
              <div class="btn btn-primary" @click.stop="viewDetail(item)">查看详情</div>
              <div class="btn btn-primary" @click.stop="viewOrder(item)">查看订单</div>
            </template>
            
            <!-- 已拒绝状态 -->
            <template v-else-if="item.status === 'rejected'">
              <div class="btn btn-primary" @click.stop="viewDetail(item)">查看详情</div>
            </template>
            
            <!-- 已关闭状态 -->
            <template v-else-if="item.status === 'closed'">
              <div class="btn btn-primary" @click.stop="viewDetail(item)">查看详情</div>
            </template>
          </div>
          
          <!-- 关闭原因 -->
          <div class="close-reason" v-if="item.closeReason">
            {{ item.closeReason }}
          </div>
        </div>
      </div>
    </div>

    <!-- 底部安全区域 -->
    <div class="safe-area-bottom"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取图标URL
const getIconUrl = (name) => {
  return new URL(`../assets/icon/${name}`, import.meta.url).href
}

// 状态标签
const statusTabs = [
  { id: 'all', name: '全部' },
  { id: 'pending', name: '待确认' },
  { id: 'registered', name: '已报名' },
  { id: 'communicating', name: '沟通中' },
  { id: 'quoted', name: '已报价' },
  { id: 'ordered', name: '已下单' },
  { id: 'closed', name: '已关闭' }
]

const currentTab = ref('all')

// 模拟需求数据
const demandList = ref([
  {
    id: 1,
    status: 'registered',
    statusText: '已报名',
    statusClass: 'status-registered',
    title: '100m²平层住宅 | 全屋设计',
    type: '找设计师',
    typeClass: 'type-designer',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元预算',
    time: '3个月内装修',
    hasDrawings: false,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22'
  },
  {
    id: 2,
    status: 'pending',
    statusText: '待确认',
    statusClass: 'status-pending',
    title: '100m²平层住宅 | 全屋设计',
    type: '找设计师',
    typeClass: 'type-designer',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元预算',
    time: '3个月内装修',
    hasDrawings: false,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22'
  },
  {
    id: 3,
    status: 'communicating',
    statusText: '沟通中',
    statusClass: 'status-communicating',
    title: '100m²平层住宅 | 仅包工',
    type: '找水电工',
    typeClass: 'type-worker',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元施工费',
    time: '3个月内装修',
    hasDrawings: true,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22'
  },
  {
    id: 4,
    status: 'quoted',
    statusText: '已报价',
    statusClass: 'status-quoted',
    title: '100m²平层住宅 | 全屋设计',
    type: '找设计师',
    typeClass: 'type-designer',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元预算',
    time: '3个月内装修',
    hasDrawings: false,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22'
  },
  {
    id: 5,
    status: 'ordered',
    statusText: '已下单',
    statusClass: 'status-ordered',
    title: '100m²平层住宅 | 全屋设计',
    type: '找设计师',
    typeClass: 'type-designer',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元预算',
    time: '3个月内装修',
    hasDrawings: false,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22'
  },
  {
    id: 6,
    status: 'rejected',
    statusText: '已拒绝',
    statusClass: 'status-rejected',
    title: '100m²平层住宅 | 全屋设计',
    type: '找设计师',
    typeClass: 'type-designer',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元预算',
    time: '3个月内装修',
    hasDrawings: false,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22'
  },
  {
    id: 7,
    status: 'closed',
    statusText: '已关闭',
    statusClass: 'status-closed',
    title: '100m²平层住宅 | 全屋设计',
    type: '找设计师',
    typeClass: 'type-designer',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元预算',
    time: '3个月内装修',
    hasDrawings: false,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22',
    closeReason: '关闭原因：业主关闭需求'
  },
  {
    id: 8,
    status: 'closed',
    statusText: '已关闭',
    statusClass: 'status-closed',
    title: '100m²平层住宅 | 全屋设计',
    type: '找设计师',
    typeClass: 'type-designer',
    roomInfo: '2室1厅1厨1卫',
    budget: '5000元预算',
    time: '3个月内装修',
    hasDrawings: false,
    description: '想找一位靠谱优秀的设计师帮忙，报价时请备注好优势...',
    avatar: 'https://placehold.co/40x40',
    userName: '小小要装修',
    publishTime: '2025年2月5日 16:22',
    closeReason: '关闭原因：已选择其他服务方'
  }
])

// 筛选后的需求列表
const filteredDemands = computed(() => {
  if (currentTab.value === 'all') {
    return demandList.value
  }
  return demandList.value.filter(item => item.status === currentTab.value)
})

// 返回上一页
const goBack = () => {
  router.back()
}

// 查看需求详情
const goToDetail = (item) => {
  console.log('查看需求详情:', item.id)
  // router.push(`/demand-detail/${item.id}`)
}

// 查看详情
const viewDetail = (item) => {
  console.log('查看详情:', item.id)
  // router.push(`/demand-detail/${item.id}`)
}

// 联系业主
const contactOwner = (item) => {
  console.log('联系业主:', item.id)
  router.push('/chat')
}

// 接受需求
const acceptDemand = (item) => {
  console.log('接受需求:', item.id)
}

// 提交报价
const submitQuote = (item) => {
  console.log('提交报价:', item.id)
}

// 查看报价
const viewQuote = (item) => {
  console.log('查看报价:', item.id)
}

// 查看订单
const viewOrder = (item) => {
  console.log('查看订单:', item.id)
}
</script>

<style scoped>
.demand-manage-page {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  /* iOS 状态栏规范：44px */
  padding-top: 44px;
  padding-bottom: 20px;
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

/* 顶部导航栏 */
.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 8px 24px;
  background: #FFFFFF;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.back-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-left: -8px;
}

.header-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #262626;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
}

.capsule-btn-img {
  width: 87px;
  height: 32px;
  object-fit: contain;
}

/* 状态筛选标签 */
.status-tabs {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 16px;
  background: #FFFFFF;
  border-bottom: 1px solid #F6F6F6;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.status-tabs::-webkit-scrollbar {
  display: none;
}

.status-tab {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #8C8C8C;
  cursor: pointer;
  position: relative;
  padding-bottom: 4px;
}

.status-tab.active {
  color: #262626;
  font-weight: 600;
}

.status-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 4px;
  background: linear-gradient(90deg, #4E94FC 0%, rgba(120, 201, 253, 0) 89%);
  border-top-left-radius: 8px;
}

/* 内容区域 */
.content-area {
  padding: 8px;
  /* 与页面高度保持一致 */
  min-height: calc(100vh - 44px - 44px - 44px - 20px);
  min-height: calc(-webkit-fill-available - 44px - 44px - 44px - 20px);
}

/* 需求列表 */
.demand-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 需求卡片 */
.demand-card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 状态标签 */
.demand-status {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: right;
}

.status-registered {
  color: #198CFE;
}

.status-pending {
  color: #198CFE;
}

.status-communicating {
  color: #198CFE;
}

.status-quoted {
  color: #198CFE;
}

.status-ordered {
  color: #198CFE;
}

.status-rejected {
  color: #FF4D4F;
}

.status-closed {
  color: #BFBFBF;
}

/* 需求标题 */
.demand-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #262626;
}

/* 需求标签 */
.demand-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 3px 8px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  border-radius: 4px;
}

.type-tag {
  color: #FFFFFF;
  font-weight: 500;
}

.type-designer {
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
}

.type-worker {
  background: linear-gradient(326deg, #0BCE80 0%, #71D85A 100%);
}

.type-company {
  background: linear-gradient(135deg, #FF9F7F 0%, #FF6B6B 100%);
}

.info-tag {
  color: #198CFE;
  background: #E8F3FF;
  font-weight: 400;
}

/* 需求描述 */
.demand-desc {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #595959;
}

/* 分隔线 */
.divider {
  width: 100%;
  height: 1px;
  background: #F6F6F6;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  flex: 1;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #8C8C8C;
}

.publish-label {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #8C8C8C;
}

.publish-time {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #8C8C8C;
  text-align: right;
}

/* 操作按钮区 */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  padding: 6px 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  border-radius: 100px;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  color: #FFFFFF;
  background: linear-gradient(121deg, #5BF7FE 0%, #165FE6 100%);
}

.btn-outline {
  color: #198CFE;
  background: #FFFFFF;
  border: 1px solid #198CFE;
}

/* 关闭原因 */
.close-reason {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #8C8C8C;
}

/* 安全区域 */
.safe-area-bottom {
  height: 20px;
}
</style>
