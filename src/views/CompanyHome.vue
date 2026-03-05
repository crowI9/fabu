<template>
  <div class="company-home-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>
    <!-- 顶部轮播图 -->
    <div class="carousel-section">
      <img src="https://placehold.co/670x375" alt="门店图" class="carousel-img">
      <div class="carousel-gradient"></div>
      <div class="carousel-labels">
        <div class="label-item video">视频</div>
        <div class="label-item">门店图</div>
        <div class="label-item">宣传图</div>
        <div class="label-item">相册</div>
      </div>
    </div>

    <!-- 顶部导航 -->
    <div class="nav-header">
      <div class="nav-back" @click="goBack">
        <span class="back-arrow">‹</span>
      </div>
      <div class="nav-right">
        <div class="nav-menu"></div>
      </div>
    </div>

    <!-- 平台保障横幅 -->
    <div class="guarantee-banner">
      <div class="guarantee-icon"></div>
      <div class="guarantee-text">0预付 · 先装修后付款 · 服务至满意为止</div>
      <div class="guarantee-arrow">›</div>
    </div>

    <!-- 企业信息卡片 -->
    <div class="company-info-card">
      <div class="company-header">
        <img src="https://placehold.co/56x53" alt="公司logo" class="company-logo">
        <div class="company-details">
          <div class="company-name-row">
            <div class="company-name">中迈装饰</div>
            <div class="company-badge">平台自营</div>
          </div>
          <div class="company-qualification">公司资质</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="company-address">
        <div class="address-text">深圳市福田区深南大道6033号</div>
        <div class="address-info">
          <span class="location">深圳 龙岗区</span>
          <span class="distance">距您15.5km</span>
        </div>
        <div class="map-link">查看地图</div>
      </div>
      <div class="divider"></div>
      <div class="service-tags">
        <div class="service-tag">设计服务</div>
        <div class="service-tag">施工服务</div>
        <div class="service-tag">整装服务</div>
        <div class="service-tag">造价服务</div>
        <div class="service-tag">监理服务</div>
      </div>
    </div>

    <!-- Tab导航 -->
    <div class="tab-navigation">
      <div class="tab-item active">
        <div class="tab-indicator"></div>
        <div class="tab-text">介绍</div>
      </div>
      <div class="tab-item">
        <div class="tab-text">案例</div>
      </div>
      <div class="tab-item">
        <div class="tab-text">服务保障</div>
      </div>
      <div class="tab-item">
        <div class="tab-text">动态</div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-section">
      <div class="content-card">
        <div class="content-body">
          <div class="content-text">
            这里是企业介绍内容...
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-actions">
      <div class="action-item follow">
        <div class="action-icon"></div>
        <div class="action-text">关注</div>
      </div>
      <div class="action-item share">
        <div class="action-icon"></div>
        <div class="action-text">分享</div>
      </div>
      <div class="action-item send-demand" @click="goToPublish">发送需求</div>
      <div class="action-item chat" @click="goToChat">在线沟通</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goToChat = () => {
  router.push('/chat')
}

const goToPublish = () => {
  router.push('/demand-list')
}
</script>

<style scoped>
.company-home-page {
  height: 100vh;
  height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  /* iOS 状态栏规范：44px + 8px 间距 */
  padding-top: 52px;
  padding-bottom: 88px;
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

/* 顶部轮播图 */
.carousel-section {
  position: relative;
  width: 100%;
  height: 375px;
  background: #D9D9D9;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 375px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 80%, #F6F8F6 96%);
  pointer-events: none;
}

.carousel-labels {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
}

.label-item {
  padding: 4px 8px;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 18px;
  color: white;
  background: rgba(0, 0, 0, 0.50);
  border-radius: 100px;
}

.label-item.video {
  background: white;
  color: #262626;
}

/* 顶部导航 */
.nav-header {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 100;
}

.nav-back {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.60);
  border-radius: 25px;
  border: 0.5px rgba(150.96, 150.96, 150.96, 0.20) solid;
  cursor: pointer;
}

.back-arrow {
  font-size: 24px;
  color: #262626;
  font-weight: 300;
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

/* 平台保障横幅 */
.guarantee-banner {
  position: absolute;
  top: 291px;
  left: 10px;
  right: 10px;
  height: 50px;
  background: linear-gradient(270deg, #FFEFD7 0%, #FFE1B4 100%);
  border-radius: 8px;
  outline: 0.5px #FFF6E7 solid;
  outline-offset: -0.25px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 10;
}

.guarantee-icon {
  width: 14.4px;
  height: 16px;
  background: linear-gradient(155deg, #FFE0A5 0%, #FFCF74 50%, #FFECC7 100%);
  box-shadow: 0px 2px 4px rgba(221.83, 129.50, 43.75, 0.13);
  margin-right: 8px;
}

.guarantee-text {
  flex: 1;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  line-height: 18px;
  color: #7E4612;
}

.guarantee-arrow {
  font-size: 16px;
  color: #7E4612;
}

/* 企业信息卡片 */
.company-info-card {
  position: absolute;
  top: 358px;
  left: 8px;
  right: 8px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  z-index: 10;
}

.company-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.company-logo {
  width: 56px;
  height: 53px;
  border-radius: 30px;
}

.company-details {
  flex: 1;
}

.company-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.company-name {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  line-height: 18px;
  color: #262626;
}

.company-badge {
  height: 20px;
  padding: 0 8px;
  background: linear-gradient(270deg, #FFEFD7 0%, #FFE1B4 100%);
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  line-height: 14px;
  color: #7E4612;
}

.company-qualification {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 18px;
  color: #9A9A9A;
}

.divider {
  width: 343px;
  height: 1px;
  background: #F6F6F6;
  margin: 12px 0;
}

.company-address {
  position: relative;
}

.address-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  line-height: 18px;
  color: #262626;
  margin-bottom: 4px;
}

.address-info {
  display: flex;
  gap: 12px;
}

.location, .distance {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 18px;
  color: #8C8C8C;
}

.map-link {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 18px;
  color: #8C8C8C;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-tag {
  height: 24px;
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

/* Tab导航 */
.tab-navigation {
  position: absolute;
  top: 531px;
  left: 8px;
  right: 8px;
  height: 44px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  z-index: 10;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0;
  cursor: pointer;
  position: relative;
}

.tab-indicator {
  width: 32px;
  height: 4px;
  background: linear-gradient(90deg, #4E94FC 0%, rgba(120, 201, 253, 0) 89%);
  border-top-left-radius: 8px;
  margin-bottom: 4px;
}

.tab-text {
  font-size: 16px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 600;
  line-height: 18px;
  color: #262626;
}

.tab-item:not(.active) .tab-indicator {
  opacity: 0;
}

.tab-item:not(.active) .tab-text {
  font-size: 14px;
  color: #8C8C8C;
  font-weight: 400;
}

/* 内容区域 */
.content-section {
  position: absolute;
  top: 573px;
  left: 8px;
  right: 8px;
  z-index: 10;
}

.content-card {
  background: #F4F7FB;
  border-radius: 8px;
  padding: 16px;
  min-height: 193px;
}

.content-text {
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  line-height: 20px;
  color: #262626;
}

/* 底部操作栏 */
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  background: white;
  border-top: 1px solid #F6F6F6;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  z-index: 100;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-item.follow, .action-item.share {
  width: 40px;
  height: 56px;
}

.action-icon {
  width: 24px;
  height: 24px;
  background: #262626;
  border-radius: 50%;
  margin-bottom: 4px;
}

.action-text {
  font-size: 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 400;
  text-align: center;
  color: #262626;
}

.action-item.send-demand {
  width: 108px;
  height: 40px;
  background: white;
  border-radius: 8px;
  border: 1px #198CFE solid;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  line-height: 20px;
  color: #198CFE;
  margin: 0 8px;
}

.action-item.chat {
  width: 108px;
  height: 40px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-weight: 500;
  line-height: 20px;
  color: white;
}
</style>