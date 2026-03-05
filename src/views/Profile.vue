<template>
  <div class="profile-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>
    <!-- 顶部背景 -->
    <div class="profile-header-bg"></div>

    <!-- 用户信息区域 -->
    <div class="user-section">
      <!-- 切换身份 -->
      <div class="switch-role" @click="switchRole">
        <span class="role-text">切换身份</span>
        <img :src="getIconUrl('Group 184573.png')" class="role-icon-img" alt="切换身份">
      </div>

      <!-- 设置按钮 -->
      <div class="header-actions">
        <img :src="getIconUrl('Group 184364.png')" class="action-icon-img" @click="goToSettings" alt="设置">
        <img :src="getIconUrl('Group 184365.png')" class="action-icon-img" @click="showMore" alt="更多">
        <img :src="getIconUrl('Group 184348.png')" class="action-icon-img" @click="scanCode" alt="扫码">
      </div>

      <!-- 用户信息 -->
      <div class="user-info">
        <div class="avatar-wrap">
          <img v-if="isLogin" :src="userInfo.avatar" class="avatar" alt="头像">
          <img v-else :src="getIconUrl('头像.png')" class="avatar avatar-default" alt="默认头像">
        </div>
        <div class="user-detail">
          <div class="user-name-wrap" @click="!isLogin && goToLogin">
            <span class="user-name">{{ isLogin ? userInfo.nickname : '点击登录' }}</span>
            <img v-if="isLogin" :src="getIconUrl('编组 21.png')" class="edit-icon-img" alt="编辑">
          </div>
          <p v-if="isLogin" class="user-phone">{{ maskPhone(userInfo.phone) }}</p>
          <p v-else class="login-tip">登录查看更多信息</p>
        </div>
      </div>

      <!-- 统计数据（登录后显示） -->
      <div v-if="isLogin" class="user-stats">
        <div class="stat-item" @click="goToFollows">
          <span class="stat-num">{{ userInfo.follows }}</span>
          <span class="stat-label">我的关注</span>
        </div>
        <div class="stat-item" @click="goToFavorites">
          <span class="stat-num">{{ userInfo.favorites }}</span>
          <span class="stat-label">我的收藏</span>
        </div>
      </div>
    </div>

    <!-- 我的需求 -->
    <div class="section-card">
      <div class="section-header" @click="goToMyDemands">
        <span class="section-title">我的需求</span>
        <span class="section-arrow">›</span>
      </div>
      <div class="demand-grid">
        <div class="demand-item" @click="goToDemandStatus('pending')">
          <img :src="getIconUrl('Group 182594.png')" class="demand-icon-img" alt="待发布">
          <span class="demand-label">待发布</span>
        </div>
        <div class="demand-item" @click="goToDemandStatus('quoting')">
          <img :src="getIconUrl('Group 182595.png')" class="demand-icon-img" alt="问价中">
          <span class="demand-label">问价中</span>
        </div>
        <div class="demand-item" @click="goToDemandStatus('ordered')">
          <img :src="getIconUrl('Group 182596.png')" class="demand-icon-img" alt="已下单">
          <span class="demand-label">已下单</span>
        </div>
        <div class="demand-item" @click="goToDemandStatus('rejected')">
          <img :src="getIconUrl('Group 184344.png')" class="demand-icon-img" alt="未通过">
          <span class="demand-label">未通过</span>
        </div>
        <div class="demand-item" @click="goToDemandStatus('closed')">
          <img :src="getIconUrl('Group 184345.png')" class="demand-icon-img" alt="已关闭">
          <span class="demand-label">已关闭</span>
        </div>
      </div>
    </div>

    <!-- 我的订单 -->
    <div class="section-card">
      <div class="section-header" @click="goToMyOrders">
        <span class="section-title">我的订单</span>
        <span class="section-arrow">›</span>
      </div>
      <div class="order-grid">
        <div class="order-item" @click="goToOrderStatus('pending')">
          <img :src="getIconUrl('Group 182703.png')" class="order-icon-img" alt="待签约">
          <span class="order-label">待签约</span>
        </div>
        <div class="order-item" @click="goToOrderStatus('unpaid')">
          <img :src="getIconUrl('Group 182704.png')" class="order-icon-img" alt="待付款">
          <span class="order-label">待付款</span>
        </div>
        <div class="order-item" @click="goToOrderStatus('service')">
          <img :src="getIconUrl('Group 183438.png')" class="order-icon-img" alt="服务中">
          <span class="order-label">服务中</span>
        </div>
        <div class="order-item" @click="goToOrderStatus('review')">
          <img :src="getIconUrl('Group 184346.png')" class="order-icon-img" alt="待评价">
          <span class="order-label">待评价</span>
        </div>
        <div class="order-item" @click="goToOrderStatus('refund')">
          <img :src="getIconUrl('Group 184347.png')" class="order-icon-img" alt="退款售后">
          <span class="order-label">退款/售后</span>
        </div>
      </div>
    </div>

    <!-- 更多服务 -->
    <div class="section-card">
      <div class="section-header">
        <span class="section-title">更多服务</span>
      </div>
      <div class="service-grid">
        <div class="service-item" @click="goToCustomerService">
          <img :src="getIconUrl('Group 184357.png')" class="service-icon-img" alt="平台客服">
          <span class="service-label">平台客服</span>
        </div>
        <div class="service-item" @click="goToJoinPlatform">
          <img :src="getIconUrl('Group 184358.png')" class="service-icon-img" alt="入驻接单">
          <span class="service-label">入驻接单</span>
        </div>
      </div>
    </div>

    <!-- 底部安全区域 -->
    <div class="safe-area"></div>

    <!-- 底部导航栏 -->
    <TabBar active-tab="profile" :todo-count="todoCount" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TabBar from '../components/TabBar.vue';

const router = useRouter();

// 获取图标URL
const getIconUrl = (filename) => {
  return `/images/icon/${filename}`;
};

// 待办数量
const todoCount = ref(0);

// 登录状态
const isLogin = ref(false);

// 用户信息
const userInfo = ref({
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  nickname: '一只小蘑菇',
  phone: '15212342312',
  follows: 215,
  favorites: 12
});

// 手机号脱敏
const maskPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

// 切换身份
const switchRole = () => {
  console.log('切换身份');
};

// 设置
const goToSettings = () => {
  console.log('进入设置');
};

// 更多
const showMore = () => {
  console.log('显示更多');
};

// 扫码
const scanCode = () => {
  console.log('扫码');
};

// 登录
const goToLogin = () => {
  console.log('去登录');
};

// 我的关注
const goToFollows = () => {
  console.log('我的关注');
};

// 我的收藏
const goToFavorites = () => {
  console.log('我的收藏');
};

// 我的需求列表
const goToMyDemands = () => {
  router.push('/demand-manage');
};

// 需求状态
const goToDemandStatus = (status) => {
  router.push({
    path: '/demand-manage',
    query: { status: status }
  });
};

// 我的订单列表
const goToMyOrders = () => {
  console.log('我的订单列表');
};

// 订单状态
const goToOrderStatus = (status) => {
  console.log('订单状态:', status);
};

// 平台客服
const goToCustomerService = () => {
  console.log('平台客服');
};

// 入驻接单
const goToJoinPlatform = () => {
  console.log('入驻接单');
};

// 底部导航方法已移至TabBar组件
</script>

<style scoped>
.profile-page {
  height: 100vh;
  height: -webkit-fill-available;
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

/* 顶部背景 */
.profile-header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, #e8f4ff 0%, #c9e6ff 50%, #a8d4ff 100%);
  border-radius: 0 0 30px 30px;
}

/* 用户信息区域 */
.user-section {
  position: relative;
  padding: 20px;
  padding-top: 50px;
  z-index: 1;
}

/* 切换身份 */
.switch-role {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
.role-text {
  font-size: 14px;
  color: #333;
}
.role-icon-img {
  width: 20px;
  height: 20px;
}

/* 头部操作按钮 */
.header-actions {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 15px;
}
.action-icon-img {
  width: 22px;
  height: 22px;
  cursor: pointer;
}

/* 用户信息 */
.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}
.avatar-wrap {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-default {
  background: #e0e0e0;
}
.user-detail {
  flex: 1;
}
.user-name-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.user-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}
.edit-icon-img {
  width: 16px;
  height: 16px;
}
.user-phone {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}
.login-tip {
  font-size: 13px;
  color: #999;
  margin-top: 5px;
}

/* 用户统计 */
.user-stats {
  display: flex;
  gap: 40px;
  margin-top: 25px;
  padding-left: 5px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.stat-num {
  font-size: 22px;
  font-weight: 600;
  color: #333;
}
.stat-label {
  font-size: 13px;
  color: #666;
  margin-top: 3px;
}

/* 卡片区域 */
.section-card {
  background: #fff;
  margin: 12px 15px;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  position: relative;
  z-index: 1;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.section-arrow {
  font-size: 20px;
  color: #999;
}

/* 需求网格 */
.demand-grid {
  display: flex;
  justify-content: space-between;
}
.demand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.demand-icon-img {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
}
.demand-label {
  font-size: 12px;
  color: #666;
}

/* 订单网格 */
.order-grid {
  display: flex;
  justify-content: space-between;
}
.order-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.order-icon-img {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
}
.order-label {
  font-size: 12px;
  color: #666;
}

/* 服务网格 */
.service-grid {
  display: flex;
  gap: 30px;
}
.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.service-icon-img {
  width: 36px;
  height: 36px;
  margin-bottom: 8px;
}
.service-label {
  font-size: 13px;
  color: #666;
}

/* 底部安全区域 */
.safe-area {
  height: 80px;
}
</style>
