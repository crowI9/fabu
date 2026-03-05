<template>
  <div class="home-page">
    <TabBar active-tab="home" :message-count="messageCount" :todo-count="todoCount" />
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
      <div class="bg-circle bg-circle-3"></div>
      <div class="bg-circle bg-circle-4"></div>
    </div>

    <!-- 顶部导航 -->
    <div class="header">
      <div class="header-left">
        <img :src="getIconUrl('brand-logo.png')" alt="化化" class="brand-logo">
      </div>
      <div class="header-right">
        <img :src="getIconUrl('capsule-btn.png')" alt="菜单" class="capsule-btn-img">
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <div class="location">
        <span class="location-text">深圳</span>
        <span class="location-arrow"></span>
      </div>
      <div class="search-input" @click="goToSearch">
        <div class="search-icon">
          <img :src="getIconUrl('search-btn.png')" alt="搜索" class="search-btn-img">
        </div>
        <span class="search-placeholder">5万块钱能装修成什么样？</span>
      </div>
    </div>

    <!-- 平台保障和金刚区合并模块 -->
    <div class="guarantee-kingkong-wrapper">
      <!-- 平台保障横幅 -->
      <div class="guarantee-banner" @click="goToGuarantee">
        <img :src="getIconUrl('guarantee-banner.png')" alt="平台交易保障" class="guarantee-banner-img">
      </div>

      <!-- 金刚区 - 服务入口 -->
      <div class="kingkong-section">
        <div class="service-grid">
          <div class="service-item" @click="goToService('company')">
            <img :src="getIconUrl('service-company.png')" alt="找装企" class="service-img">
          </div>
          <div class="service-item" @click="goToService('designer')">
            <img :src="getIconUrl('service-designer.png')" alt="找设计" class="service-img">
          </div>
          <div class="service-item" @click="goToService('worker')">
            <img :src="getIconUrl('service-worker.png')" alt="找师傅" class="service-img">
          </div>
        </div>
      </div>
    </div>

      <!-- 热门攻略 -->
      <div class="strategy-section">
      <div class="section-header">
        <span class="section-title">热门攻略</span>
        <div class="section-tabs">
          <span 
            v-for="tab in strategyTabs" 
            :key="tab.id"
            class="tab-item"
            :class="{ active: currentStrategyTab === tab.id }"
            @click="currentStrategyTab = tab.id"
          >
            {{ tab.name }}
          </span>
        </div>
        <div class="section-more" @click="goToMoreStrategy">
          <span>更多</span>
          <span class="more-arrow">›</span>
        </div>
      </div>

      <div class="strategy-list">
        <div 
          v-for="(item, index) in strategyList" 
          :key="index"
          class="strategy-item"
          @click="goToArticle(item)"
        >
          <img v-if="index < 3" :src="getIconUrl(`rank-${index + 1}.png`)" alt="" class="strategy-rank-img">
          <div v-else class="strategy-rank">{{ index + 1 }}</div>
          <div class="strategy-title-wrapper">
            <div class="strategy-title">{{ item.title }}</div>
            <div class="strategy-tag" v-if="item.tag" :class="item.tagType">{{ item.tag }}</div>
          </div>
          <div class="strategy-views">{{ item.views }}</div>
        </div>
      </div>
    </div>

    <!-- 内容推荐 -->
    <div class="content-recommend section-card">
      <!-- 标签页 -->
      <div class="content-tabs">
        <div
          class="content-tab"
          :class="{ active: currentContentTab === 'follow' }"
          @click="currentContentTab = 'follow'"
        >
          关注
        </div>
        <div
          class="content-tab"
          :class="{ active: currentContentTab === 'recommend' }"
          @click="currentContentTab = 'recommend'"
        >
          推荐
        </div>
        <div class="tab-slider" :class="{ 'is-follow': currentContentTab === 'follow', 'is-recommend': currentContentTab === 'recommend' }">
          <img :src="getIconUrl(currentContentTab === 'follow' ? 'tab-follow-active.png' : 'tab-recommend-active.png')" alt="" class="tab-slider-icon">
        </div>
      </div>

      <!-- 关注列表 -->
      <div class="follow-content" v-if="currentContentTab === 'follow'">
        <div
          v-for="item in followList"
          :key="item.id"
          class="follow-card"
          @click="goToDetail(item)"
        >
          <!-- 用户信息头部 -->
          <div class="follow-header">
            <img :src="item.avatar" alt="" class="follow-user-avatar">
            <div class="follow-user-meta">
              <div class="follow-user-name">{{ item.username }}</div>
              <div class="follow-publish-time">{{ item.time }}</div>
            </div>
            <div class="follow-status-btn" :class="{ followed: item.isFollowed }" @click.stop="handleFollow(item)">
              {{ item.isFollowed ? '已关注' : '关注' }}
            </div>
          </div>
          <!-- 标签和标题 -->
          <div class="follow-title-row">
            <div class="follow-tag-badge" :style="{ background: item.tagColor + '1F' }">
              <span class="tag-badge-icon" :style="{ background: item.tagColor }">#</span>
              <span class="tag-badge-text" :style="{ color: item.tagColor }">{{ item.tag }}</span>
            </div>
            <div class="follow-card-title">{{ item.title }}</div>
          </div>
          <!-- 内容描述 -->
          <div class="follow-description">
            {{ item.desc }}
            <span class="follow-full-text" v-if="item.desc.length > 50">全文</span>
          </div>
          <!-- 图片 -->
          <div class="follow-image-container" v-if="item.images && item.images.length > 0">
            <div class="follow-image-wrap">
              <img :src="item.images[0]" alt="" class="follow-main-image">
              <div class="follow-image-indicators" v-if="item.images.length > 1">
                <span
                  v-for="(img, idx) in item.images"
                  :key="idx"
                  class="follow-indicator-dot"
                  :class="{ active: idx === 0 }"
                ></span>
              </div>
            </div>
          </div>
          <!-- 底部互动 -->
          <div class="follow-interaction">
            <div class="follow-likes-info">
              <div class="follow-like-avatars">
                <img v-for="(like, idx) in item.likeAvatars.slice(0, 3)" :key="idx" :src="like" class="follow-like-avatar-img" alt="">
              </div>
              <span class="follow-likes-count">{{ item.likeCount }}人点赞</span>
            </div>
            <div class="follow-action-btns">
              <span class="follow-action-item" @click.stop="handleComment(item)">
                <img :src="getIconUrl('icon-comment.png')" alt="评论" class="follow-action-icon">
                {{ item.comments }}
              </span>
              <span class="follow-action-item" @click.stop="handleLike(item)">
                <img :src="getIconUrl(item.isLiked ? 'icon-like-active.png' : 'icon-like.png')" alt="点赞" class="follow-action-icon">
                {{ item.likes }}
              </span>
              <span class="follow-action-item" @click.stop="handleShare(item)">
                <img :src="getIconUrl('icon-share.png')" alt="转发" class="follow-action-icon">
                {{ item.shares }}
              </span>
            </div>
          </div>
          <div class="follow-card-divider"></div>
        </div>
      </div>

      <!-- 推荐内容 -->
      <div class="recommend-content-area" v-if="currentContentTab === 'recommend'">
        <!-- 瀑布流 -->
        <div class="recommend-waterfall-layout">
          <div class="waterfall-col">
            <!-- 左侧第一个固定为广告位（可轮播） -->
            <div class="ad-carousel-card" v-if="adCarouselItems.length > 0">
              <div class="ad-image-wrapper">
                <img :src="adCarouselItems[currentAdIndex].image" alt="" class="ad-carousel-image">
                <div class="ad-carousel-dots">
                  <span
                    v-for="(item, idx) in adCarouselItems"
                    :key="idx"
                    class="ad-dot"
                    :class="{ active: currentAdIndex === idx }"
                  ></span>
                </div>
              </div>
            </div>
            <div
              v-for="item in leftColItems"
              :key="item.id"
              class="recommend-item-card"
              @click="goToDetail(item)"
            >
              <div class="recommend-img-wrapper">
                <img :src="item.image" alt="" class="recommend-card-img">
                <div class="recommend-type-label" v-if="item.type">{{ item.type }}</div>
              </div>
              <div class="recommend-card-info">
                <div class="recommend-room-info">{{ item.roomInfo }}</div>
                <div class="recommend-card-title-text">{{ item.title }}</div>
                <div class="recommend-author-row" v-if="item.author">
                  <img :src="item.avatar" class="recommend-author-avatar" alt="">
                  <span class="recommend-author-name">{{ item.author }}</span>
                  <span class="recommend-like-num" @click.stop="handleRecommendLike(item)">
                    <img :src="getIconUrl(item.isLiked ? 'icon-like-active.png' : 'icon-like.png')" alt="点赞" class="recommend-like-icon">
                    {{ item.likes }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="waterfall-col">
            <div
              v-for="item in rightColItems"
              :key="item.id"
              class="recommend-item-card"
              @click="goToDetail(item)"
            >
              <div class="recommend-img-wrapper">
                <img :src="item.image" alt="" class="recommend-card-img">
                <div class="recommend-type-label" v-if="item.type">{{ item.type }}</div>
              </div>
              <div class="recommend-card-info">
                <div class="recommend-room-info">{{ item.roomInfo }}</div>
                <div class="recommend-card-title-text">{{ item.title }}</div>
                <div class="recommend-author-row" v-if="item.author">
                  <img :src="item.avatar" class="recommend-author-avatar" alt="">
                  <span class="recommend-author-name">{{ item.author }}</span>
                  <span class="recommend-like-num" @click.stop="handleRecommendLike(item)">
                    <img :src="getIconUrl(item.isLiked ? 'icon-like-active.png' : 'icon-like.png')" alt="点赞" class="recommend-like-icon">
                    {{ item.likes }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部安全区域 -->
    <div class="safe-area-bottom"></div>

    <!-- 位置选择弹窗 -->
    <van-popup v-model:show="showLocationPicker" position="bottom" round>
      <div class="location-picker">
        <div class="picker-header">
          <span class="picker-title">选择城市</span>
          <span class="picker-close" @click="showLocationPicker = false">✕</span>
        </div>
        <div class="current-city">
          <div class="current-label">当前定位</div>
          <div class="current-value">
            <span class="location-dot">📍</span>
            <span>{{ currentLocation }}</span>
          </div>
        </div>
        <div class="hot-cities">
          <div class="hot-label">热门城市</div>
          <div class="city-grid">
            <div 
              v-for="city in hotCities" 
              :key="city"
              class="city-item"
              :class="{ active: currentLocation === city }"
              @click="selectCity(city)"
            >
              {{ city }}
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../components/TabBar.vue'

const router = useRouter()

// 获取图标URL
const getIconUrl = (filename) => {
  return `./images/icon/${filename}`
}

// 当前定位
const currentLocation = ref('深圳')
const showLocationPicker = ref(false)
const hotCities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安']

const selectCity = (city) => {
  currentLocation.value = city
  showLocationPicker.value = false
}

// 消息和待办数量
const messageCount = ref(17)
const todoCount = ref(1)

// 热门攻略标签
const strategyTabs = [
  { id: 'style', name: '主流风格' },
  { id: 'hard', name: '硬装施工' }
]
const currentStrategyTab = ref('style')

// 攻略列表
const strategyList = ref([
  {
    title: '老房拆改主意事项',
    tag: '图文',
    tagType: 'image-text',
    views: '32.12万'
  },
  {
    title: '瓷砖质量鉴别4大技巧',
    views: '22.12万'
  },
  {
    title: '室内装修选择配色6大原则',
    views: '19.73万'
  }
])

// 内容推荐标签
const currentContentTab = ref('recommend')

// 广告轮播图
const adCarouselItems = ref([
  {
    id: 'ad-1',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=500&fit=crop',
    title: '专业设计师 一对一服务',
    desc: '免费获取装修方案'
  },
  {
    id: 'ad-2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=500&fit=crop',
    title: '品质装修公司 严选推荐',
    desc: '省心省力更省钱'
  },
  {
    id: 'ad-3',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=500&fit=crop',
    title: '装修贷款 低息分期',
    desc: '轻松实现理想家'
  }
])
const currentAdIndex = ref(0)

// 广告轮播自动切换
setInterval(() => {
  if (adCarouselItems.value.length > 0) {
    currentAdIndex.value = (currentAdIndex.value + 1) % adCarouselItems.value.length
  }
}, 3000)

// 推荐标签（保留旧变量兼容）
const currentRecommendTab = ref('recommend')

// 轮播图推荐位
const carouselItems = ref([
  {
    id: 'carousel-1',
    image: 'https://picsum.photos/400/500?random=200',
    tag: '推荐',
    title: '专业设计师 一对一服务',
    desc: '免费获取装修方案'
  },
  {
    id: 'carousel-2',
    image: 'https://picsum.photos/400/500?random=201',
    tag: '热门',
    title: '品质装修公司 严选推荐',
    desc: '省心省力更省钱'
  },
  {
    id: 'carousel-3',
    image: 'https://picsum.photos/400/500?random=202',
    tag: '活动',
    title: '装修贷款 低息分期',
    desc: '轻松实现理想家'
  }
])

// 关注列表数据
const followList = ref([
  {
    id: 1,
    username: '潘晓婷',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    time: '6分钟前',
    isFollowed: true,
    isLiked: false,
    tag: '日常分享',
    tagColor: '#FFC800',
    title: '可爱风 暖色系精装',
    desc: '完成一个家的装修有多少成就感？这是我一直思考的问题，最近遇到梁姐一家，小夫妻俩带两个小孩...',
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop'],
    likeAvatars: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'],
    likeCount: '1.2k',
    comments: 46,
    likes: 32,
    shares: 6
  },
  {
    id: 2,
    username: '设计师小王',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    time: '6分钟前',
    isFollowed: true,
    isLiked: false,
    tag: '设计灵感',
    tagColor: '#06C876',
    title: '现代简约风客厅设计',
    desc: '今天分享一个刚完工的现代简约风格客厅，整体以白色和原木色为主调，营造出温馨舒适的居家氛围...',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop'],
    likeAvatars: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop'],
    likeCount: '1.2k',
    comments: 46,
    likes: 32,
    shares: 6
  },
  {
    id: 3,
    username: '装修达人',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    time: '6分钟前',
    isFollowed: true,
    isLiked: false,
    tag: '经验攻略',
    tagColor: '#F5894E',
    title: '北欧风卧室装修心得',
    desc: '分享我的北欧风卧室装修经验，从选材到配色，希望能给正在装修的朋友一些参考...',
    images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop'],
    likeAvatars: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop', 'https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?w=50&h=50&fit=crop'],
    likeCount: '1.2k',
    comments: 46,
    likes: 32,
    shares: 6
  }
])

// 推荐内容
const recommendItems = ref([
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=400&fit=crop',
    type: '案例',
    roomInfo: '2室1厅1厨1卫 87㎡',
    title: '现代简约客厅设计',
    author: '设计师小李',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    likes: '2231',
    isLiked: false
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=300&h=350&fit=crop',
    type: '案例',
    roomInfo: '2室1厅1厨1卫 87㎡',
    title: '北欧风卧室装修',
    author: '装修达人',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    likes: '2231',
    isLiked: false
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=380&fit=crop',
    type: '案例',
    roomInfo: '3室2厅2卫 120㎡',
    title: '日式原木风客厅',
    author: '设计师小王',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    likes: '1850',
    isLiked: false
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=360&fit=crop',
    roomInfo: '2室1厅1厨1卫 87㎡',
    title: '轻奢风餐厅设计',
    author: '陈设计师',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    likes: '850',
    isLiked: false
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=420&fit=crop',
    type: '案例',
    roomInfo: '3室2厅2卫 120㎡',
    title: '新中式风格书房',
    author: '刘设计师',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    likes: '1800',
    isLiked: false
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=300&h=340&fit=crop',
    roomInfo: '1室1厅1卫 50㎡',
    title: '工业风LOFT公寓',
    author: '赵设计师',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
    likes: '650',
    isLiked: false
  }
])

// 轮播图当前索引
const currentCarouselIndex = ref(0)

// 瀑布流布局（旧变量兼容）
const leftColumnItems = computed(() => {
  return recommendItems.value.filter((_, index) => index % 2 === 0)
})

const rightColumnItems = computed(() => {
  return recommendItems.value.filter((_, index) => index % 2 === 1)
})

// 新瀑布流布局（左侧第一个固定为广告位）
const leftColItems = computed(() => {
  // 左侧从第2个开始（索引1），因为第1个位置是广告位
  return recommendItems.value.filter((_, index) => index % 2 === 1)
})

const rightColItems = computed(() => {
  return recommendItems.value.filter((_, index) => index % 2 === 0)
})

// 页面跳转
const goToSearch = () => {
  console.log('跳转到搜索页')
}

const goToGuarantee = () => {
  console.log('跳转到平台保障')
}

const goToService = (type) => {
  // 跳转到装企主页对应tab
  if (type === 'company') {
    // 找装企 - 跳转到装企主页tab1
    router.push('/company-home')
  } else if (type === 'designer') {
    // 找设计 - 跳转到装企主页tab2
    console.log('跳转到装企主页 - 找设计')
  } else if (type === 'worker') {
    // 找师傅 - 跳转到装企主页tab3
    console.log('跳转到装企主页 - 找师傅')
  }
}

const goToMoreStrategy = () => {
  console.log('跳转到更多攻略')
}

const goToArticle = (item) => {
  console.log('查看文章:', item.title)
}

const goToDetail = (item) => {
  console.log('查看详情:', item.title)
}

// 处理关注按钮点击
const handleFollow = (item) => {
  item.isFollowed = !item.isFollowed
  console.log(item.isFollowed ? '已关注' : '取消关注', item.username)
}

// 处理点赞按钮点击
const handleLike = (item) => {
  item.isLiked = !item.isLiked
  item.likes = item.isLiked ? (parseInt(item.likes) + 1).toString() : (parseInt(item.likes) - 1).toString()
  console.log(item.isLiked ? '点赞' : '取消点赞', item.title)
}

// 处理评论按钮点击
const handleComment = (item) => {
  console.log('评论:', item.title)
}

// 处理转发按钮点击
const handleShare = (item) => {
  console.log('转发:', item.title)
}

// 处理推荐模块点赞
const handleRecommendLike = (item) => {
  item.isLiked = !item.isLiked
  item.likes = item.isLiked ? (parseInt(item.likes) + 1).toString() : (parseInt(item.likes) - 1).toString()
  console.log(item.isLiked ? '推荐点赞' : '取消推荐点赞', item.title)
}

const goToPublish = () => {
  router.push('/demand-config')
}

const goToProfile = () => {
  router.push('/profile')
}

const goToMessage = () => {
  router.push('/message')
}

const goToTodo = () => {
  router.push('/demand-manage')
}
</script>

<style scoped>
/* ============================================
   化化 APP UI 视觉规范
   ============================================ */

/* 颜色变量 */
:root {
  /* 主题色 */
  --color-primary: #1677FF;
  --color-primary-light: #E6F4FF;
  --color-primary-dark: #0958D9;
  
  /* 辅助色 */
  --color-success: #52C41A;
  --color-warning: #FAAD14;
  --color-error: #FF4D4F;
  --color-info: #1677FF;
  
  /* 中性色 - 文字 */
  --color-text-1: #262626;
  --color-text-2: #595959;
  --color-text-3: #8C8C8C;
  --color-text-4: #BFBFBF;
  
  /* 中性色 - 背景 */
  --color-fill-1: #F5F5F5;
  --color-fill-2: #F0F0F0;
  --color-fill-3: #D9D9D9;
  --color-white: #FFFFFF;
  
  /* 阴影 */
  --shadow-1: 0 1px 2px rgba(0,0,0,0.08);
  --shadow-2: 0 2px 4px rgba(0,0,0,0.08);
  --shadow-4: 0 4px 8px rgba(0,0,0,0.1);
  --shadow-6: 0 6px 12px rgba(0,0,0,0.12);
  --shadow-8: 0 8px 16px rgba(0,0,0,0.12);
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 20px;
}

/* 字体规范 */
.font-t1 { font-size: 26px; line-height: 34px; font-weight: 500; }
.font-t2 { font-size: 20px; line-height: 28px; font-weight: 500; }
.font-t3 { font-size: 18px; line-height: 24px; font-weight: 500; }
.font-t4 { font-size: 17px; line-height: 23px; font-weight: 400; }
.font-t5 { font-size: 16px; line-height: 22px; font-weight: 400; }
.font-t6 { font-size: 14px; line-height: 20px; font-weight: 400; }
.font-t7 { font-size: 12px; line-height: 18px; font-weight: 400; }
.font-t8 { font-size: 11px; line-height: 15px; font-weight: 400; }
.font-t9 { font-size: 10px; line-height: 14px; font-weight: 400; }

.home-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: #F3F7F8;
  padding-bottom: 80px;
  overflow-x: hidden;
  /* iOS 状态栏规范：44px + 8px 间距 */
  padding-top: 52px;
}

/* 背景装饰 - 覆盖整个页面 */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(180deg, #E1EFFC 0%, rgba(225, 239, 252, 0) 30%, #F3F7F8 100%);
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
}

.bg-circle-1 {
  width: 236px;
  height: 236px;
  left: -116px;
  top: -74px;
  background: #F9EFD7;
}

.bg-circle-2 {
  width: 166px;
  height: 166px;
  left: 97px;
  top: -47px;
  background: #FFFFFF;
}

.bg-circle-3 {
  width: 302px;
  height: 302px;
  left: 199px;
  top: -99px;
  background: #9AD0FF;
}

.bg-circle-4 {
  width: 510px;
  height: 510px;
  left: -67px;
  top: 42px;
  background: #EFFCF8;
}



.time {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 15px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.3px;
  color: #262626;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cellular {
  width: 17px;
  height: 10.67px;
  background: #262626;
  clip-path: polygon(0 100%, 25% 55%, 50% 45%, 75% 30%, 100% 15%, 100% 100%);
}

.wifi {
  width: 15.33px;
  height: 11px;
  background: #262626;
  clip-path: polygon(0 100%, 50% 0, 100% 100%, 85% 100%, 50% 25%, 15% 100%);
}

.battery {
  position: relative;
  width: 24.33px;
  height: 11.33px;
}

.battery-border {
  position: absolute;
  width: 22px;
  height: 11.33px;
  right: 2.33px;
  border: 1px solid #262626;
  border-radius: 2.67px;
}

.battery-cap {
  position: absolute;
  width: 1.33px;
  height: 4px;
  right: 0;
  top: 3.67px;
  background: #262626;
  border-radius: 0 1px 1px 0;
}

.battery-level {
  position: absolute;
  width: 18px;
  height: 7.33px;
  right: 4.33px;
  top: 2px;
  background: #262626;
  border-radius: 1.33px;
}

/* 顶部导航 - App 规范 */
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 8px;
  z-index: 10;
  /* 确保在状态栏下方 */
  margin-top: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.brand-logo {
  height: 28px;
  width: auto;
  object-fit: contain;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.logo-text {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #262626;
  letter-spacing: 2px;
}

.logo-slogan {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 13px;
  color: #8C8C8C;
}

.header-right {
  display: flex;
  align-items: center;
}

.capsule-btn-img {
  width: 87px;
  height: 32px;
  object-fit: contain;
}

.capsule-btn {
  display: flex;
  align-items: center;
  width: 87px;
  height: 32px;
  background: rgba(255, 255, 255, 0.6);
  border: 0.5px solid rgba(151, 151, 151, 0.2);
  border-radius: 25px;
  padding: 0 8px;
}

.capsule-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dots {
  display: flex;
  gap: 3px;
}

.dots span {
  width: 4px;
  height: 4px;
  background: #262626;
  border-radius: 50%;
}

.capsule-divider {
  width: 0.5px;
  height: 18.5px;
  background: rgba(0, 0, 0, 0.2);
  margin: 0 8px;
}

.capsule-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-icon {
  width: 17px;
  height: 17px;
  position: relative;
}

.close-icon::before,
.close-icon::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 1.5px;
  background: #262626;
  top: 50%;
  left: 50%;
}

.close-icon::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.close-icon::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* 搜索栏 */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  z-index: 10;
}

.location {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 12px;
  cursor: pointer;
}

.location-text {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: var(--color-text-1);
}

.location-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #262626;
}

.search-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  padding: 12px 16px;
  border-radius: 24px;
  cursor: pointer;
  position: relative;
}

.search-input::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  padding: 1px;
  background: linear-gradient(135deg, #5BF7FE 0%, #165FE6 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.search-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.search-btn-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.search-placeholder {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-3);
}

/* 平台保障和金刚区合并模块 */
.guarantee-kingkong-wrapper {
  position: relative;
  margin: 8px;
  z-index: 10;
  border-radius: 8px;
  overflow: hidden;
}

/* 平台保障横幅 */
.guarantee-banner {
  position: relative;
  cursor: pointer;
}

.guarantee-banner-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.guarantee-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shield-icon {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #FF9500 0%, #FFB800 100%);
  border-radius: 50%;
  position: relative;
}

.shield-icon::after {
  content: '⚡';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
}

.guarantee-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.guarantee-title {
  font-family: 'Douyin Sans', 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #7E4612;
}

.guarantee-subtitle {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #7E4612;
}

.guarantee-arrow {
  width: 12px;
  height: 12px;
  border-top: 2px solid #7E4612;
  border-right: 2px solid #7E4612;
  transform: rotate(45deg);
}

/* 金刚区 - 服务入口 */
.kingkong-section {
  position: relative;
  margin: -8px 0 0 0;
  padding: 12px;
  background: #FFFFFF;
  border-radius: 12px;
  z-index: 20;
}

.service-grid {
  display: flex;
  gap: 8px;
}

.service-item {
  flex: 1;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.service-item:active {
  transform: scale(0.95);
}

.service-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.service-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  min-height: 80px;
  margin-bottom: 12px;
}

.service-card:last-child {
  margin-bottom: 0;
}

.service-card.orange {
  background: linear-gradient(135deg, #FFF5E6 0%, #FFE4CC 100%);
}

.service-card.blue {
  background: linear-gradient(360deg, #C9F0FF -5.71%, #E6E9F6 100%);
}

.service-card.green {
  background: linear-gradient(135deg, #E6FFF5 0%, #CCFFE6 100%);
}

.card-content {
  flex: 1;
  z-index: 1;
}

.card-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.card-badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  color: #FFFFFF;
  background: #FF6B6B;
  border-radius: 4px;
  margin-left: 8px;
}

.card-desc {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 13px;
  color: #666666;
}

.card-arrow {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-arrow img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.card-illustration {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.card-illustration img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom right;
}

/* 热门攻略 */
.strategy-section {
  position: relative;
  margin: 8px;
  padding: 16px 12px;
  background: #FFFFFF;
  border-radius: 8px;
  z-index: 10;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 8px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.fire-icon {
  font-size: 18px;
}

.section-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: #262626;
  padding: 0;
  background: linear-gradient(270deg, #FFF0C7 0%, #FFD8D0 100%);
  border-radius: 11px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 70px;
  min-width: 70px;
  max-width: 70px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.section-tabs {
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: flex-start;
}

.section-tabs .tab-item {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: #8C8C8C;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  padding: 0;
  background: linear-gradient(180deg, #FCFCFC 0%, #F9F9F9 100%);
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 70px;
  min-width: 70px;
  max-width: 70px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.section-tabs .tab-item.active {
  color: #8C8C8C;
  background: linear-gradient(180deg, #FCFCFC 0%, #F9F9F9 100%);
  width: 70px;
  min-width: 70px;
  max-width: 70px;
}

.section-more {
  display: flex;
  align-items: center;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #8C8C8C;
  cursor: pointer;
}

.more-arrow {
  font-size: 14px;
  margin-left: 2px;
}

.strategy-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.strategy-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0;
}

.strategy-rank-img {
  width: 16px;
  height: 20px;
  object-fit: contain;
}

.strategy-rank {
  width: 24px;
  font-family: 'Source-KeynoteartHans', 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 900;
  line-height: 20px;
  color: #BFBFBF;
  text-align: left;
}

.strategy-title-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.strategy-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: #262626;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.strategy-tag {
  width: 24px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 9px;
  line-height: 12px;
  font-weight: 500;
  color: #262626;
  background: linear-gradient(315deg, #EDFE24 0%, #F6FFE9 52%, #DFFFB0 100%);
  border-radius: 7px 0 7px 0;
  white-space: nowrap;
}

.strategy-views {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #BFBFBF;
  white-space: nowrap;
}

/* 内容推荐 */
.recommend-section {
  position: relative;
  margin: 8px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  z-index: 10;
}

.recommend-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 8px;
}

.recommend-tab {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: var(--color-text-3);
  cursor: pointer;
  padding-bottom: 8px;
  position: relative;
}

.recommend-tab.active {
  color: var(--color-text-1);
  font-weight: 500;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 4px;
  background: var(--color-primary);
  border-radius: var(--radius-sm);
}

/* 轮播图推荐位 */
.carousel-section {
  margin-bottom: 8px;
}

.carousel-swipe {
  border-radius: 8px;
  overflow: hidden;
}

.carousel-card {
  position: relative;
  cursor: pointer;
}

.carousel-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-tag {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #FFFFFF;
  background: #1677FF;
  border-radius: 8px 0 8px 0;
}

.carousel-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.carousel-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 18px;
  line-height: 26px;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 4px;
}

.carousel-desc {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255,255,255,0.8);
}

.recommend-waterfall {
  display: flex;
  gap: 12px;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recommend-card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-2);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
}

.card-image {
  width: 100%;
  display: block;
  border-radius: 8px;
}

.card-type-tag {
  position: absolute;
  top: 0;
  left: 0;
  padding: 6px 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-white);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px 0 8px 0;
}

.card-content-box {
  padding: 10px;
}

.card-info {
  margin-bottom: 8px;
}

.card-room {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-3);
  margin-bottom: 4px;
}

.card-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-1);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-author {
  display: flex;
  align-items: center;
  gap: 6px;
}

.author-avatar {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  flex: 1;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-2);
}

.like-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 11px;
  line-height: 15px;
  color: var(--color-text-3);
}

.like-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

/* 关注列表样式 */
.follow-list {
  display: flex;
  flex-direction: column;
}

.follow-item {
  padding: 12px 0;
}

.follow-user-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.follow-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.follow-user-info {
  flex: 1;
}

.follow-username {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #262626;
  margin-bottom: 4px;
}

.follow-time {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #8C8C8C;
}

.follow-btn {
  padding: 4px 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #8C8C8C;
  background: #F5F5F5;
  border-radius: 100px;
  cursor: pointer;
}

.follow-btn.followed {
  color: #8C8C8C;
  background: #F5F5F5;
}

.follow-content-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.follow-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: rgba(255, 200, 0, 0.12);
  border-radius: 16px;
}

.follow-tag .tag-icon {
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFC800;
  border-radius: 50%;
  font-size: 10px;
  color: #FFFFFF;
  font-weight: 500;
}

.follow-tag .tag-text {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  color: #FFC800;
  font-weight: 500;
}

.follow-title {
  flex: 1;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: #262626;
}

.follow-desc {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #8C8C8C;
  margin-bottom: 12px;
  text-align: justify;
}

.follow-more {
  color: #198CFE;
  cursor: pointer;
}

.follow-images {
  width: 100%;
  height: 192px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F6F6;
}

.follow-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.follow-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.follow-image-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.image-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}

.image-dot.active {
  background: #FFFFFF;
}

.follow-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.follow-likes {
  display: flex;
  align-items: center;
  gap: 8px;
}

.like-avatars {
  display: flex;
  align-items: center;
}

.like-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #FFFFFF;
  margin-left: -6px;
}

.like-avatar:first-child {
  margin-left: 0;
}

.like-count-text {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #8C8C8C;
}

.follow-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #8C8C8C;
}

.action-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.follow-divider {
  width: 100%;
  height: 1px;
  background: #F6F6F6;
  margin-top: 12px;
}

/* ========== 内容推荐模块新样式 ========== */
.content-recommend {
  position: relative;
  margin: 8px;
  padding: 12px;
  background: #FFFFFF;
  border-radius: 8px;
  z-index: 10;
}

/* 标签页 */
.content-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  position: relative;
}

.content-tab {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  line-height: 22px;
  color: #8C8C8C;
  cursor: pointer;
  padding-bottom: 8px;
}

.content-tab.active {
  color: #262626;
  font-weight: 600;
}

/* 滑块容器 */
.tab-slider {
  position: absolute;
  bottom: 0;
  width: 32px;
  height: 4px;
  transition: left 0.3s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab-slider.is-follow {
  left: 0;
}

.tab-slider.is-recommend {
  left: 56px;
}

.tab-slider-icon {
  width: 32px;
  height: 4px;
  object-fit: contain;
}

/* 关注列表 */
.follow-content {
  display: flex;
  flex-direction: column;
}

.follow-card {
  padding: 12px 0;
}

.follow-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.follow-user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.follow-user-meta {
  flex: 1;
}

.follow-user-name {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #262626;
  margin-bottom: 4px;
}

.follow-publish-time {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #8C8C8C;
}

.follow-status-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 16px;
  color: #8C8C8C;
  background: #F5F5F5;
  border-radius: 100px;
  cursor: pointer;
}

.follow-btn-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.follow-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.follow-tag-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 16px;
}

.tag-badge-icon {
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 10px;
  color: #FFFFFF;
  font-weight: 500;
}

.tag-badge-text {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
}

.follow-card-title {
  flex: 1;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: #262626;
}

.follow-description {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  line-height: 18px;
  color: #8C8C8C;
  margin-bottom: 12px;
  text-align: justify;
}

.follow-full-text {
  color: #198CFE;
  cursor: pointer;
}

.follow-image-container {
  width: 100%;
  height: 192px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F6F6;
}

.follow-image-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.follow-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.follow-image-indicators {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.follow-indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}

.follow-indicator-dot.active {
  background: #FFFFFF;
}

.follow-interaction {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.follow-likes-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.follow-like-avatars {
  display: flex;
  align-items: center;
}

.follow-like-avatar-img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #FFFFFF;
  margin-left: -6px;
}

.follow-like-avatar-img:first-child {
  margin-left: 0;
}

.follow-likes-count {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #8C8C8C;
}

.follow-action-btns {
  display: flex;
  align-items: center;
  gap: 16px;
}

.follow-action-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 12px;
  line-height: 18px;
  color: #8C8C8C;
}

.follow-action-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.follow-card-divider {
  width: 100%;
  height: 1px;
  background: #F6F6F6;
  margin-top: 12px;
}

/* 推荐内容 */
.recommend-content-area {
  padding-bottom: 16px;
}

.recommend-waterfall-layout {
  display: flex;
  gap: 12px;
}

.waterfall-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 广告轮播卡片 */
.ad-carousel-card {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.ad-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
}

.ad-carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ad-carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.ad-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}

.ad-dot.active {
  background: #FFFFFF;
}

/* 推荐卡片 */
.recommend-item-card {
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.recommend-img-wrapper {
  position: relative;
  width: 100%;
}

.recommend-card-img {
  width: 100%;
  display: block;
  border-radius: 8px;
}

.recommend-type-label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 8px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 11px;
  line-height: 16px;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px 0 8px 0;
}

.recommend-card-info {
  padding: 8px;
}

.recommend-room-info {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 11px;
  line-height: 16px;
  color: #8C8C8C;
  margin-bottom: 4px;
}

.recommend-card-title-text {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 13px;
  line-height: 18px;
  color: #262626;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
}

.recommend-author-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.recommend-author-avatar {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
}

.recommend-author-name {
  flex: 1;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 11px;
  line-height: 16px;
  color: #8C8C8C;
}

.recommend-like-num {
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 11px;
  line-height: 16px;
  color: #8C8C8C;
}

.recommend-like-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* 安全区域 */
.safe-area-bottom {
  height: 20px;
}

/* 位置选择弹窗 */
.location-picker {
  padding: 16px;
  max-height: 70vh;
  overflow-y: auto;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
}

.picker-title {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

.picker-close {
  position: absolute;
  right: 0;
  font-size: 18px;
  color: #8C8C8C;
  cursor: pointer;
}

.current-city {
  margin-bottom: 20px;
}

.current-label {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 13px;
  color: #8C8C8C;
  margin-bottom: 12px;
}

.current-value {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #F5F5F5;
  border-radius: 8px;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 15px;
  color: #1677FF;
  font-weight: 500;
}

.location-dot {
  font-size: 16px;
}

.hot-cities {
  margin-bottom: 20px;
}

.hot-label {
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 13px;
  color: #8C8C8C;
  margin-bottom: 12px;
}

.city-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.city-item {
  padding: 10px;
  text-align: center;
  font-family: 'PingFang SC', -apple-system, sans-serif;
  font-size: 14px;
  color: #262626;
  background: #F5F5F5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.city-item.active {
  color: #1677FF;
  background: #E6F4FF;
}
</style>
