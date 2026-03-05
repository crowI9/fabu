<template>
  <div class="publish-demand-page">
    <!-- 渐变背景 -->
    <div class="gradient-bg">
      <div class="gradient-circle circle-1"></div>
      <div class="gradient-circle circle-2"></div>
      <div class="gradient-circle circle-3"></div>
      <div class="gradient-circle circle-4"></div>
    </div>

    <!-- 顶部导航栏 -->
    <div class="nav-header">
      <div class="nav-back" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 19L8 12L15 5" stroke="#262626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="nav-actions">
        <img src="/images/icon/capsule-btn.png" alt="更多" class="capsule-btn">
      </div>
    </div>

    <!-- 页面标题 -->
    <div class="page-header" v-if="!publishSuccess">
      <h1 class="main-title">发布需求</h1>
      <p class="sub-title">{{ currentStepTitle }}</p>
      <!-- 历史房屋信息提示 -->
      <div class="history-notice" v-if="currentStep === 3 && hasHistoryHouseInfo">
        <span class="notice-text">检测到存在历史房屋信息</span>
        <button class="btn-auto-fill" @click="autoFillHistoryInfo">一键填入</button>
      </div>
    </div>

    <!-- 步骤1：家装/公装选择 -->
    <div class="step-content" v-show="currentStep === 1">
      <!-- 一级分类选择 -->
      <div class="type-cards-row">
        <div 
          class="type-card-large" 
          :class="{ active: projectType === 'home' }"
          @click="handleProjectTypeChange('home')"
        >
          <div class="card-glow"></div>
          <div class="card-image-wrap">
            <img src="/images/icon/home-decoration.png" alt="家装" class="card-image">
          </div>
          <div class="card-text-wrap">
            <div class="card-title">家装</div>
            <div class="card-desc">住宅类装修</div>
          </div>
        </div>
        <div 
          class="type-card-large" 
          :class="{ active: projectType === 'commercial' }"
          @click="handleProjectTypeChange('commercial')"
        >
          <div class="card-glow"></div>
          <div class="card-image-wrap">
            <img src="/images/icon/commercial-decoration.png" alt="公装" class="card-image">
          </div>
          <div class="card-text-wrap">
            <div class="card-title">公装</div>
            <div class="card-desc">商业空间装修</div>
          </div>
        </div>
      </div>

      <!-- 细分类型选择 -->
      <transition name="slide-up">
        <div class="sub-type-section" v-if="projectType">
          <label class="section-label">请选择具体类型</label>
          <div class="tag-group">
            <div 
              class="type-tag" 
              :class="{ active: projectSubType === item.value }"
              @click="projectSubType = item.value"
              v-for="item in currentSubTypeList" 
              :key="item.value"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </transition>

      <!-- 底部按钮 -->
      <div class="bottom-actions">
        <button class="btn-primary" @click="toNextStep" :disabled="!projectType || !projectSubType">
          下一步
        </button>
      </div>
    </div>

    <!-- 步骤2：服务类型选择 -->
    <div class="step-content" v-show="currentStep === 2">
      <div class="service-list">
        <!-- 找设计 -->
        <div 
          class="service-card" 
          :class="{ active: serviceParty === 'designer' }"
          @click="serviceParty = 'designer'"
        >
          <div class="service-icon">
            <img src="/images/icon/service-design.png" alt="找设计" class="service-icon-img">
          </div>
          <div class="service-info">
            <div class="service-title">找设计</div>
            <div class="service-desc">设计是装修的灵魂</div>
          </div>
        </div>

        <!-- 找师傅 -->
        <div 
          class="service-card" 
          :class="{ active: serviceParty === 'worker' }"
          @click="serviceParty = 'worker'"
        >
          <div class="service-icon">
            <img src="/images/icon/service-worker.png" alt="找师傅" class="service-icon-img">
          </div>
          <div class="service-info">
            <div class="service-title">找师傅</div>
            <div class="service-desc">靠谱工匠，施工无忧</div>
          </div>
        </div>

        <!-- 找装企 -->
        <div 
          class="service-card" 
          :class="{ active: serviceParty === 'company' }"
          @click="serviceParty = 'company'"
        >
          <div class="service-icon">
            <img src="/images/icon/service-company.png" alt="找装企" class="service-icon-img">
          </div>
          <div class="service-info">
            <div class="service-title-wrap">
              <span class="service-title">找装企</span>
              <span class="service-badge">平台自营</span>
            </div>
            <div class="service-desc">平台自营，全程安心</div>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-actions dual">
        <button class="btn-secondary" @click="toPrevStep">上一步</button>
        <button class="btn-primary" @click="toNextStep" :disabled="!serviceParty">下一步</button>
      </div>
    </div>

    <!-- 步骤3：基本信息 -->
    <div class="step-content" v-show="currentStep === 3">
      <div class="form-section">
        <!-- 房屋面积 -->
        <div class="form-group">
          <label class="form-label">房屋面积 <span class="required">*</span></label>
          <div class="input-with-unit">
            <input 
              type="number" 
              class="form-input" 
              v-model="basicInfo.area"
              placeholder="请输入面积"
            >
            <span class="unit">㎡</span>
          </div>
        </div>

        <!-- 户型/空间类型 -->
        <div class="form-group">
          <label class="form-label">{{ projectType === 'home' ? '户型' : '空间类型' }} <span class="required">*</span></label>
          <div class="tag-group">
            <div 
              class="type-tag" 
              :class="{ active: basicInfo.houseType === item.value }"
              @click="basicInfo.houseType = item.value"
              v-for="item in currentHouseTypeList" 
              :key="item.value"
            >
              {{ item.label }}
            </div>
          </div>
        </div>

        <!-- 房屋地址 -->
        <div class="form-group">
          <label class="form-label">房屋地址 <span class="required">*</span></label>
          <div class="address-section">
            <div class="address-row address-search-row">
              <input 
                type="text" 
                class="form-input" 
                v-model="basicInfo.community"
                placeholder="请输入小区/楼盘名称"
                @input="onAddressInput"
                @focus="showAddressSuggestions = true"
              >
              <button class="location-btn" @click="openMapPicker">
                <span>地图定位</span>
              </button>
            </div>
            <!-- 地址搜索建议列表 -->
            <div class="address-suggestions" v-if="showAddressSuggestions && addressSuggestions.length > 0">
              <div 
                class="address-suggestion-item" 
                v-for="(item, index) in addressSuggestions" 
                :key="index"
                @click="selectAddress(item)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#999"/>
                </svg>
                <div class="suggestion-info">
                  <div class="suggestion-title">{{ item.title }}</div>
                  <div class="suggestion-address">{{ item.address }}</div>
                </div>
              </div>
            </div>
            <div class="address-row">
              <input 
                type="text" 
                class="form-input" 
                v-model="basicInfo.detailAddress"
                placeholder="详细地址，如：1栋2单元301室（选填）"
              >
            </div>
          </div>
        </div>

        <!-- 房屋照片 -->
        <div class="form-group">
          <label class="form-label">
            房屋照片 <span class="optional">选填</span>
            <span class="label-hint">上传房屋现状照片，帮助服务方更好了解现场情况</span>
          </label>
          <div class="photo-upload-section">
            <div class="photo-grid">
              <div class="photo-item" v-for="(img, index) in housePhotos" :key="index">
                <img :src="img" alt="房屋照片">
                <div class="remove-btn" @click="removeHousePhoto(index)">×</div>
              </div>
              <div class="photo-add" @click="triggerHousePhotoUpload" v-if="housePhotos.length < 9">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 8V24M8 16H24" stroke="#4E94FC" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="add-text">添加照片</span>
                <span class="add-hint">{{ housePhotos.length }}/9</span>
                <input 
                  type="file" 
                  ref="housePhotoInput" 
                  accept="image/*" 
                  style="display: none;"
                  @change="handleHousePhotoChange"
                >
              </div>
            </div>
            <p class="upload-limit">最多9张，单个图片不超过20M</p>
          </div>
        </div>

        <!-- 户型图 -->
        <div class="form-group">
          <label class="form-label">
            户型图 <span class="optional">选填</span>
            <span class="label-hint">上传户型图，帮助服务方可更精准报价</span>
          </label>
          <div class="floor-plan-section">
            <div class="photo-grid">
              <div class="photo-item" v-for="(img, index) in floorPlanImages" :key="index">
                <img :src="img" alt="户型图">
                <div class="remove-btn" @click="removeFloorPlanImage(index)">×</div>
              </div>
              <div class="photo-add" @click="triggerFloorPlanUpload" v-if="floorPlanImages.length < 9">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 8V24M8 16H24" stroke="#4E94FC" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="add-text">添加户型图</span>
                <span class="add-hint">{{ floorPlanImages.length }}/9</span>
                <input 
                  type="file" 
                  ref="floorPlanInput" 
                  accept="image/*" 
                  style="display: none;"
                  @change="handleFloorPlanChange"
                >
              </div>
            </div>
            <p class="upload-limit">最多9张，单个图片不超过20M</p>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-actions dual">
        <button class="btn-secondary" @click="toPrevStep">上一步</button>
        <button class="btn-primary" @click="toNextStep" :disabled="!isStep3Valid">下一步</button>
      </div>
    </div>

    <!-- 地图选择弹窗 -->
    <div class="map-picker-modal" v-if="showMapPicker" @click="closeMapPicker">
      <div class="map-picker-content" @click.stop>
        <div class="map-picker-header">
          <h3>选择位置</h3>
          <button class="close-btn" @click="closeMapPicker">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="#999" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="map-picker-body">
          <div class="map-search-box">
            <input 
              type="text" 
              class="map-search-input" 
              v-model="mapSearchKeyword"
              placeholder="搜索地点"
              @keyup.enter="searchMapLocation"
            >
            <button class="map-search-btn" @click="searchMapLocation">搜索</button>
          </div>
          <div class="map-container" ref="mapContainer"></div>
          <div class="map-selected-info" v-if="selectedMapLocation">
            <div class="selected-title">{{ selectedMapLocation.title }}</div>
            <div class="selected-address">{{ selectedMapLocation.address }}</div>
          </div>
        </div>
        <div class="map-picker-footer">
          <button class="btn-secondary" @click="closeMapPicker">取消</button>
          <button class="btn-primary" @click="confirmMapLocation" :disabled="!selectedMapLocation">确定</button>
        </div>
      </div>
    </div>

    <!-- 步骤4：装修偏好 -->
    <div class="step-content" v-show="currentStep === 4">
      <div class="preference-section">
        <!-- 装修风格 -->
        <div class="form-group">
          <label class="form-label">选择装修风格 <span class="optional">选填</span></label>
          <div class="style-tags-wrap">
            <div
              class="style-tag"
              :class="{ active: advancedInfo.style === item.value }"
              @click="selectStyle(item)"
              v-for="item in styleList"
              :key="item.value"
            >
              {{ item.label }}
              <span class="tag-check" v-if="advancedInfo.style === item.value">✓</span>
            </div>
          </div>
          
          <transition name="fade-slide">
            <div class="style-preview-wrap" v-if="selectedStyleItem">
              <div class="preview-image-wrap">
                <img :src="selectedStyleItem.image" :alt="selectedStyleItem.label" class="preview-image">
                <div class="preview-overlay">
                  <span class="preview-label">{{ selectedStyleItem.label }}</span>
                  <span class="preview-desc">{{ selectedStyleItem.desc }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 装修预算 -->
        <div class="form-group">
          <label class="form-label">装修预算 <span class="optional">选填</span></label>
          <div class="tag-group">
            <div 
              class="type-tag" 
              :class="{ active: advancedInfo.budget === item.value }"
              @click="advancedInfo.budget = item.value"
              v-for="item in budgetList" 
              :key="item.value"
            >
              {{ item.label }}
            </div>
          </div>
        </div>

        <!-- 备注 -->
        <div class="form-group">
          <label class="form-label">补充备注 <span class="optional">选填</span></label>
          <textarea 
            class="form-textarea" 
            v-model="advancedInfo.desc"
            placeholder="如：儿童房环保优先/需要智能家居/收纳需求高等"
          ></textarea>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-actions dual">
        <button class="btn-secondary" @click="toPrevStep">上一步</button>
        <button class="btn-primary" @click="toNextStep">下一步</button>
      </div>
    </div>

    <!-- 步骤5：需求确认 -->
    <div class="step-content" v-show="currentStep === 5 && !publishSuccess">
      <div class="preview-section">
        <h3 class="preview-title">需求预览</h3>
        <div class="preview-card">
          <div class="preview-item">
            <span class="item-label">项目类型</span>
            <span class="item-value">{{ projectType === 'home' ? '家装' : '公装' }}</span>
          </div>
          <div class="preview-item">
            <span class="item-label">具体类型</span>
            <span class="item-value">{{ getProjectSubTypeText() }}</span>
          </div>
          <div class="preview-item">
            <span class="item-label">服务类型</span>
            <span class="item-value">{{ getServicePartyText() }}</span>
          </div>
          <div class="preview-item">
            <span class="item-label">房屋面积</span>
            <span class="item-value">{{ basicInfo.area }} ㎡</span>
          </div>
          <div class="preview-item">
            <span class="item-label">{{ projectType === 'home' ? '户型' : '空间类型' }}</span>
            <span class="item-value">{{ basicInfo.houseType }}</span>
          </div>
          <div class="preview-item">
            <span class="item-label">房屋地址</span>
            <span class="item-value">{{ basicInfo.community }} {{ basicInfo.detailAddress }}</span>
          </div>
          <div class="preview-item" v-if="housePhotos.length > 0">
            <span class="item-label">房屋照片</span>
            <span class="item-value">已上传 {{ housePhotos.length }} 张</span>
          </div>
          <div class="preview-item" v-if="floorPlanImages.length > 0">
            <span class="item-label">户型图</span>
            <span class="item-value">已上传 {{ floorPlanImages.length }} 张</span>
          </div>
          <div class="preview-item" v-if="advancedInfo.style">
            <span class="item-label">装修风格</span>
            <span class="item-value">{{ advancedInfo.style }}</span>
          </div>
          <div class="preview-item" v-if="advancedInfo.budget">
            <span class="item-label">装修预算</span>
            <span class="item-value">{{ advancedInfo.budget }}</span>
          </div>
          <div class="preview-item" v-if="advancedInfo.desc">
            <span class="item-label">备注</span>
            <span class="item-value">{{ advancedInfo.desc }}</span>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-actions dual">
        <button class="btn-secondary" @click="toPrevStep">上一步</button>
        <button class="btn-primary" @click="publishDemand">确认发布</button>
      </div>
    </div>

    <!-- 发布成功页面 -->
    <div class="step-content success-page" v-show="publishSuccess">
      <div class="success-card">
        <div class="success-content">
          <div class="success-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="url(#successGradient)"/>
              <path d="M25 42L35 52L55 32" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="successGradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#78C9FD"/>
                  <stop offset="1" stop-color="#4E94FC"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 class="success-title">发布成功</h2>
          <p class="success-desc">您的装修需求已发布成功，我们将尽快为您匹配合适的服务方</p>
        </div>
        <div class="success-actions">
          <button class="btn-secondary" @click="viewDemand">查看需求</button>
          <button class="btn-primary" @click="goHome">返回首页</button>
        </div>
      </div>
    </div>

    <!-- 底部安全区域 -->
    <div class="safe-area"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 当前步骤
const currentStep = ref(1);
const totalSteps = 5;

// 发布成功状态
const publishSuccess = ref(false);

// 当前步骤标题
const currentStepTitle = computed(() => {
  const titles = {
    1: '你要装修的是？',
    2: '你想找什么服务？',
    3: '填写房屋基本信息',
    4: '选择装修偏好',
    5: '确认需求，完成发布'
  };
  return titles[currentStep.value];
});

// 步骤1：项目类型
const projectType = ref('');
const projectSubType = ref('');

const homeSubTypeList = [
  { label: '新房毛坯', value: 'new_house' },
  { label: '老房改造', value: 'old_renovation' },
  { label: '公寓装修', value: 'apartment' },
  { label: '二手房翻新', value: 'second_hand' },
  { label: '别墅装修', value: 'villa' }
];

const commercialSubTypeList = [
  { label: '商铺/门店', value: 'shop' },
  { label: '办公室', value: 'office' },
  { label: '餐饮门店', value: 'restaurant' },
  { label: '酒店/民宿', value: 'hotel' },
  { label: '厂房/仓库', value: 'factory' },
  { label: '其他公装', value: 'other_commercial' }
];

const currentSubTypeList = computed(() => {
  return projectType.value === 'home' ? homeSubTypeList : commercialSubTypeList;
});

// 步骤2：服务类型
const serviceParty = ref('');

// 步骤3：基本信息
const basicInfo = ref({
  area: '',
  houseType: '',
  community: '',
  detailAddress: ''
});

// 腾讯地图API Key（需要替换为实际的Key）
const TENCENT_MAP_KEY = 'YOUR_TENCENT_MAP_KEY';

// 地址搜索相关
const showAddressSuggestions = ref(false);
const addressSuggestions = ref([]);
let addressSearchTimer = null;

// 地址输入防抖搜索
const onAddressInput = () => {
  clearTimeout(addressSearchTimer);
  addressSearchTimer = setTimeout(() => {
    searchAddress(basicInfo.value.community);
  }, 300);
};

// 使用腾讯地图搜索地址
const searchAddress = (keyword) => {
  if (!keyword || keyword.trim().length < 2) {
    addressSuggestions.value = [];
    return;
  }
  
  // 检查是否已加载腾讯地图API
  if (typeof TMap === 'undefined') {
    loadTencentMapAPI().then(() => {
      doAddressSearch(keyword);
    });
  } else {
    doAddressSearch(keyword);
  }
};

// 加载腾讯地图API
const loadTencentMapAPI = () => {
  return new Promise((resolve) => {
    if (document.getElementById('tencent-map-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'tencent-map-script';
    script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${TENCENT_MAP_KEY}&libraries=service`;
    script.onload = () => {
      resolve();
    };
    document.head.appendChild(script);
  });
};

// 执行地址搜索
const doAddressSearch = (keyword) => {
  if (typeof TMap === 'undefined' || !TMap.service) {
    // 如果没有腾讯地图API，使用模拟数据
    mockAddressSearch(keyword);
    return;
  }
  
  const search = new TMap.service.Search({
    pageSize: 10
  });
  
  search.search({
    keyword: keyword,
    region: '', // 可以设置默认城市
    pageIndex: 1
  }).then((res) => {
    if (res.data && res.data.length > 0) {
      addressSuggestions.value = res.data.map(item => ({
        title: item.title,
        address: item.address,
        location: item.location,
        adcode: item.adcode
      }));
    } else {
      addressSuggestions.value = [];
    }
  }).catch(() => {
    mockAddressSearch(keyword);
  });
};

// 模拟地址搜索（当没有API Key时使用）
const mockAddressSearch = (keyword) => {
  // 模拟一些常见的地址数据
  const mockData = [
    { title: `${keyword}小区`, address: `广东省深圳市南山区${keyword}路1号` },
    { title: `${keyword}花园`, address: `广东省深圳市福田区${keyword}街道2号` },
    { title: `${keyword}大厦`, address: `广东省深圳市罗湖区${keyword}大道3号` },
    { title: `${keyword}公寓`, address: `广东省深圳市宝安区${keyword}路4号` },
    { title: `${keyword}广场`, address: `广东省深圳市龙岗区${keyword}街5号` }
  ];
  addressSuggestions.value = mockData;
};

// 选择地址
const selectAddress = (item) => {
  basicInfo.value.community = item.title;
  showAddressSuggestions.value = false;
  addressSuggestions.value = [];
};

// 获取当前定位
const getCurrentLocation = () => {
  // 检查是否已加载腾讯地图API
  if (typeof TMap === 'undefined') {
    loadTencentMapAPI().then(() => {
      doGetCurrentLocation();
    });
  } else {
    doGetCurrentLocation();
  }
};

// 执行获取当前定位
const doGetCurrentLocation = () => {
  // 首先尝试使用浏览器Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        reverseGeocode(lat, lng);
      },
      (error) => {
        console.log('浏览器定位失败，尝试使用腾讯地图定位:', error);
        useTencentLocation();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    useTencentLocation();
  }
};

// 使用腾讯地图进行定位
const useTencentLocation = () => {
  if (typeof TMap === 'undefined' || !TMap.service) {
    // 如果没有API，使用模拟定位
    mockCurrentLocation();
    return;
  }
  
  const geolocation = new TMap.service.Geolocation();
  geolocation.getLocation({
    timeout: 10000
  }).then((res) => {
    if (res.status === 0 && res.result && res.result.location) {
      const { lat, lng } = res.result.location;
      reverseGeocode(lat, lng);
    } else {
      mockCurrentLocation();
    }
  }).catch(() => {
    mockCurrentLocation();
  });
};

// 逆地理编码（坐标转地址）
const reverseGeocode = (lat, lng) => {
  if (typeof TMap === 'undefined' || !TMap.service) {
    basicInfo.value.community = '当前定位位置';
    return;
  }
  
  const geocoder = new TMap.service.Geocoder();
  geocoder.getAddress({
    location: new TMap.LatLng(lat, lng)
  }).then((res) => {
    if (res.status === 0 && res.result) {
      const address = res.result.address;
      const formattedAddress = res.result.formatted_addresses?.recommend || address;
      basicInfo.value.community = formattedAddress;
    } else {
      basicInfo.value.community = '当前定位位置';
    }
  }).catch(() => {
    basicInfo.value.community = '当前定位位置';
  });
};

// 模拟当前定位
const mockCurrentLocation = () => {
  basicInfo.value.community = '深圳市南山区科技园';
  alert('定位成功：深圳市南山区科技园');
};

// 点击外部关闭地址建议列表
const handleClickOutside = (e) => {
  const addressSection = document.querySelector('.address-section');
  if (addressSection && !addressSection.contains(e.target)) {
    showAddressSuggestions.value = false;
  }
};

// 地图选择相关
const showMapPicker = ref(false);
const mapSearchKeyword = ref('');
const selectedMapLocation = ref(null);
const mapContainer = ref(null);
let mapInstance = null;
let mapMarker = null;

// 打开地图选择器
const openMapPicker = () => {
  showMapPicker.value = true;
  selectedMapLocation.value = null;
  mapSearchKeyword.value = basicInfo.value.community || '';
  
  // 等待DOM更新后初始化地图
  setTimeout(() => {
    initMap();
  }, 100);
};

// 关闭地图选择器
const closeMapPicker = () => {
  showMapPicker.value = false;
  selectedMapLocation.value = null;
  mapInstance = null;
  mapMarker = null;
};

// 初始化地图
const initMap = () => {
  if (typeof TMap === 'undefined') {
    loadTencentMapAPI().then(() => {
      doInitMap();
    });
  } else {
    doInitMap();
  }
};

// 执行初始化地图
const doInitMap = () => {
  if (!mapContainer.value || typeof TMap === 'undefined') {
    // 如果没有API，显示提示
    return;
  }
  
  // 默认中心点（深圳）
  const center = new TMap.LatLng(22.5431, 114.0579);
  
  mapInstance = new TMap.Map(mapContainer.value, {
    center: center,
    zoom: 14,
    mapStyleId: 'style1' // 浅色风格
  });
  
  // 添加点击事件
  mapInstance.on('click', (e) => {
    const lat = e.latLng.getLat();
    const lng = e.latLng.getLng();
    
    // 更新标记位置
    updateMapMarker(lat, lng);
    
    // 逆地理编码获取地址
    getMapAddress(lat, lng);
  });
  
  // 如果有当前地址，搜索并定位
  if (basicInfo.value.community) {
    searchAndCenterLocation(basicInfo.value.community);
  }
};

// 更新地图标记
const updateMapMarker = (lat, lng) => {
  if (mapMarker) {
    mapMarker.setMap(null);
  }
  
  if (typeof TMap !== 'undefined') {
    mapMarker = new TMap.MultiMarker({
      map: mapInstance,
      styles: {
        'default': new TMap.MarkerStyle({
          width: 25,
          height: 35,
          anchor: { x: 12, y: 35 }
        })
      },
      geometries: [{
        id: 'marker',
        position: new TMap.LatLng(lat, lng)
      }]
    });
  }
};

// 获取地图点击位置的地址
const getMapAddress = (lat, lng) => {
  if (typeof TMap === 'undefined' || !TMap.service) {
    selectedMapLocation.value = {
      title: '选定位置',
      address: `纬度: ${lat.toFixed(4)}, 经度: ${lng.toFixed(4)}`,
      lat,
      lng
    };
    return;
  }
  
  const geocoder = new TMap.service.Geocoder();
  geocoder.getAddress({
    location: new TMap.LatLng(lat, lng)
  }).then((res) => {
    if (res.status === 0 && res.result) {
      const address = res.result.address;
      const formattedAddress = res.result.formatted_addresses?.recommend || address;
      const title = res.result.address_component?.street || res.result.address_component?.district || '选定位置';
      
      selectedMapLocation.value = {
        title: title,
        address: formattedAddress,
        lat,
        lng
      };
    } else {
      selectedMapLocation.value = {
        title: '选定位置',
        address: `纬度: ${lat.toFixed(4)}, 经度: ${lng.toFixed(4)}`,
        lat,
        lng
      };
    }
  }).catch(() => {
    selectedMapLocation.value = {
      title: '选定位置',
      address: `纬度: ${lat.toFixed(4)}, 经度: ${lng.toFixed(4)}`,
      lat,
      lng
    };
  });
};

// 搜索地图位置
const searchMapLocation = () => {
  if (!mapSearchKeyword.value.trim()) return;
  
  searchAndCenterLocation(mapSearchKeyword.value);
};

// 搜索并居中定位
const searchAndCenterLocation = (keyword) => {
  if (typeof TMap === 'undefined' || !TMap.service) {
    // 模拟搜索结果
    selectedMapLocation.value = {
      title: keyword,
      address: `深圳市${keyword}附近`,
      lat: 22.5431,
      lng: 114.0579
    };
    return;
  }
  
  const search = new TMap.service.Search({
    pageSize: 1
  });
  
  search.search({
    keyword: keyword,
    region: '',
    pageIndex: 1
  }).then((res) => {
    if (res.data && res.data.length > 0) {
      const result = res.data[0];
      const lat = result.location.lat;
      const lng = result.location.lng;
      
      // 移动地图中心
      if (mapInstance) {
        mapInstance.setCenter(new TMap.LatLng(lat, lng));
      }
      
      // 更新标记
      updateMapMarker(lat, lng);
      
      // 设置选中位置
      selectedMapLocation.value = {
        title: result.title,
        address: result.address,
        lat,
        lng
      };
    }
  });
};

// 确认地图选择的位置
const confirmMapLocation = () => {
  if (selectedMapLocation.value) {
    basicInfo.value.community = selectedMapLocation.value.title;
    showMapPicker.value = false;
  }
};

// 历史房屋信息（模拟数据，实际应从本地存储或接口获取）
const historyHouseInfo = ref({
  area: '120',
  houseType: '3室',
  community: '万科金色家园',
  detailAddress: '5栋2单元801室',
  housePhotos: [],
  floorPlanImages: []
});

// 是否有历史房屋信息
const hasHistoryHouseInfo = computed(() => {
  return !!historyHouseInfo.value.community;
});

// 一键填入历史信息
const autoFillHistoryInfo = () => {
  basicInfo.value.area = historyHouseInfo.value.area;
  basicInfo.value.houseType = historyHouseInfo.value.houseType;
  basicInfo.value.community = historyHouseInfo.value.community;
  basicInfo.value.detailAddress = historyHouseInfo.value.detailAddress;
  // 图片需要重新上传，这里只填充文本信息
};

// 家装户型选项
const homeHouseTypeList = [
  { label: '1室', value: '1室' },
  { label: '2室', value: '2室' },
  { label: '3室', value: '3室' },
  { label: '4室及以上', value: '4室及以上' },
  { label: '别墅/复式', value: '别墅/复式' },
  { label: 'LOFT公寓', value: 'LOFT公寓' }
];

// 公装空间类型选项
const commercialHouseTypeList = [
  { label: '商铺门店', value: '商铺门店' },
  { label: '办公室', value: '办公室' },
  { label: '餐饮门店', value: '餐饮门店' },
  { label: '酒店/民宿', value: '酒店/民宿' },
  { label: '厂房/仓库', value: '厂房/仓库' },
  { label: '其他商业空间', value: '其他商业空间' }
];

// 根据项目类型动态显示户型/空间类型选项
const currentHouseTypeList = computed(() => {
  return projectType.value === 'home' ? homeHouseTypeList : commercialHouseTypeList;
});

const isStep3Valid = computed(() => {
  return basicInfo.value.area && basicInfo.value.houseType && basicInfo.value.community;
});

// 房屋照片
const housePhotos = ref([]);
const housePhotoInput = ref(null);

// 户型图
const floorPlanImages = ref([]);
const floorPlanInput = ref(null);

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const MAX_IMAGE_COUNT = 9;

// 验证文件大小
const validateFileSize = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    alert('单个图片不能超过20M');
    return false;
  }
  return true;
};

// 房屋照片上传
const triggerHousePhotoUpload = () => {
  housePhotoInput.value?.click();
};

const handleHousePhotoChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!validateFileSize(file)) {
      event.target.value = '';
      return;
    }
    if (housePhotos.value.length >= MAX_IMAGE_COUNT) {
      alert('最多只能上传9张照片');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      housePhotos.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
  event.target.value = '';
};

const removeHousePhoto = (index) => {
  housePhotos.value.splice(index, 1);
};

// 户型图上传
const triggerFloorPlanUpload = () => {
  floorPlanInput.value?.click();
};

const handleFloorPlanChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!validateFileSize(file)) {
      event.target.value = '';
      return;
    }
    if (floorPlanImages.value.length >= MAX_IMAGE_COUNT) {
      alert('最多只能上传9张户型图');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      floorPlanImages.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
  event.target.value = '';
};

const removeFloorPlanImage = (index) => {
  floorPlanImages.value.splice(index, 1);
};

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  clearTimeout(addressSearchTimer);
});

// 步骤4：装修偏好
const styleList = ref([
  { label: '现代简约', value: '现代简约', desc: '简洁实用', image: '/images/style/modern-minimal.jpg' },
  { label: '北欧风', value: '北欧', desc: '清新自然', image: '/images/style/nordic.jpg' },
  { label: '新中式', value: '新中式', desc: '东方韵味', image: '/images/style/chinese.jpg' },
  { label: '轻奢风', value: '轻奢', desc: '精致优雅', image: '/images/style/luxury.jpg' },
  { label: '工业风', value: '工业风', desc: '粗犷个性', image: '/images/style/industrial.jpg' },
  { label: '日式风', value: '日式', desc: '禅意静谧', image: '/images/style/japanese.jpg' },
  { label: '美式风', value: '美式', desc: '舒适大气', image: '/images/style/american.jpg' },
  { label: '法式风', value: '法式', desc: '浪漫优雅', image: '/images/style/french.jpg' },
  { label: '地中海', value: '地中海', desc: '蓝白浪漫', image: '/images/style/mediterranean.jpg' },
  { label: '混搭风', value: '混搭', desc: '个性独特', image: '/images/style/mixed.jpg' }
]);

const budgetList = ref([
  { label: '经济型（5-10万）', value: '经济型（5-10万）' },
  { label: '性价比型（10-20万）', value: '性价比型（10-20万）' },
  { label: '品质型（20-30万）', value: '品质型（20-30万）' },
  { label: '高端型（30万以上）', value: '高端型（30万以上）' }
]);

const advancedInfo = ref({
  style: '',
  budget: '性价比型（10-20万）',
  desc: ''
});

const selectedStyleItem = ref(null);

// 选择装修风格
const selectStyle = (item) => {
  advancedInfo.value.style = item.value;
  selectedStyleItem.value = item;
};

// 切换项目类型
const handleProjectTypeChange = (type) => {
  projectType.value = type;
  projectSubType.value = '';
};

// 导航方法
const goBack = () => {
  if (currentStep.value > 1) {
    toPrevStep();
  } else {
    router.back();
  }
};

const toNextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const toPrevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// 获取文本
const getProjectSubTypeText = () => {
  const list = projectType.value === 'home' ? homeSubTypeList : commercialSubTypeList;
  const item = list.find(i => i.value === projectSubType.value);
  return item ? item.label : '';
};

const getServicePartyText = () => {
  const map = {
    'designer': '找设计',
    'worker': '找师傅',
    'company': '找装企'
  };
  return map[serviceParty.value] || '';
};

// 发布需求
const publishDemand = () => {
  console.log('发布需求:', {
    projectType: projectType.value,
    projectSubType: projectSubType.value,
    serviceParty: serviceParty.value,
    ...basicInfo.value,
    ...advancedInfo.value
  });
  // 显示发布成功页面
  publishSuccess.value = true;
};

// 查看需求
const viewDemand = () => {
  // 需求详情页暂未生成，先跳转到需求管理页
  // TODO: 后续改为跳转到具体需求详情页 /demand-detail/:id
  router.push('/demand-manage');
};

// 返回首页
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.publish-demand-page {
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: #F3F7F8;
  position: relative;
  /* iOS 状态栏规范：44px 状态栏 */
  padding: 44px 24px 0;
  box-sizing: border-box;
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
  background: #F9EFD7;
  top: -50px;
  right: -80px;
}

.circle-2 {
  width: 166px;
  height: 166px;
  background: white;
  top: 60px;
  right: 40px;
  filter: blur(40px);
}

.circle-3 {
  width: 302px;
  height: 302px;
  background: #9AD0FF;
  top: 100px;
  left: -100px;
}

.circle-4 {
  width: 510px;
  height: 510px;
  background: #EFFCF8;
  bottom: -200px;
  right: -100px;
}

/* 顶部导航 */
.nav-header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  height: 44px;
  margin-bottom: 24px;
}

.nav-back {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s;
}

.nav-back:active {
  background: rgba(0, 0, 0, 0.05);
}

.nav-actions {
  width: 87px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.capsule-btn {
  width: 87px;
  height: 32px;
  object-fit: contain;
}

/* 页面标题 */
.page-header {
  position: relative;
  z-index: 10;
  margin-bottom: 32px;
}

.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  line-height: 32px;
  margin: 0 0 8px 0;
}

.sub-title {
  font-size: 20px;
  font-weight: 400;
  color: #262626;
  line-height: 32px;
  margin: 0;
}

/* 历史信息提示 */
.history-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(120, 201, 253, 0.1) 0%, rgba(78, 148, 252, 0.1) 100%);
  border-radius: 12px;
  border: 1px solid rgba(120, 201, 253, 0.3);
}

.notice-text {
  font-size: 14px;
  color: #4E94FC;
  flex: 1;
}

.btn-auto-fill {
  padding: 8px 16px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-auto-fill:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(78, 148, 252, 0.3);
}

.btn-auto-fill:active {
  transform: scale(0.98);
}

/* 步骤内容 */
.step-content {
  position: relative;
  z-index: 10;
  padding-bottom: 120px;
  /* 与页面高度保持一致 */
  min-height: calc(100vh - 44px - 44px - 120px);
  min-height: calc(-webkit-fill-available - 44px - 44px - 120px);
}

/* 类型卡片行 */
.type-cards-row {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.type-card-large {
  flex: 1;
  background: linear-gradient(180deg, rgba(243, 249, 255, 0.8) 0%, rgba(248, 251, 255, 0.8) 100%);
  border-radius: 12px;
  padding: 20px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.type-card-large.active {
  border-color: #78C9FD;
  box-shadow: 0 5px 20px rgba(120, 201, 253, 0.3);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: white;
  filter: blur(40px);
  opacity: 0.8;
}

.card-image-wrap {
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.card-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.card-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-text-wrap {
  text-align: center;
  position: relative;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  line-height: 20px;
  margin-bottom: 4px;
}

.card-desc {
  font-size: 12px;
  color: #8C8C8C;
  line-height: 20px;
}

/* 细分类型区域 */
.sub-type-section {
  margin-bottom: 32px;
}

.section-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  line-height: 32px;
  margin-bottom: 12px;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.type-tag {
  padding: 8px 16px;
  background: white;
  border-radius: 32px;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.type-tag:hover {
  background: #f5f5f5;
}

.type-tag.active {
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  color: white;
}

/* 服务列表 */
.service-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.service-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(180deg, rgba(243, 249, 255, 0.8) 0%, rgba(248, 251, 255, 0.8) 100%);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
}

.service-card.active {
  border-color: #78C9FD;
  box-shadow: 0 5px 20px rgba(120, 201, 253, 0.3);
}

.service-icon {
  flex-shrink: 0;
}

.service-icon-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.service-info {
  flex: 1;
}

.service-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.service-title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  line-height: 20px;
}

.service-badge {
  padding: 2px 8px;
  background: linear-gradient(270deg, #FFEFD7 0%, #FFE1B4 100%);
  border-radius: 20px;
  font-size: 12px;
  color: #7E4612;
  font-weight: 500;
}

.service-desc {
  font-size: 12px;
  color: #8C8C8C;
  line-height: 20px;
}

/* 表单区域 */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  margin-bottom: 8px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 12px;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 12px;
  font-size: 14px;
  color: #262626;
  box-sizing: border-box;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #78C9FD;
  box-shadow: 0 0 0 3px rgba(120, 201, 253, 0.1);
}

.form-input::placeholder {
  color: #BFBFBF;
}

.input-with-unit {
  position: relative;
}

.input-with-unit .form-input {
  padding-right: 50px;
}

.unit {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #8C8C8C;
}

/* 小区搜索 */
.community-search {
  position: relative;
}

.community-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  margin-top: 4px;
}

.community-item {
  padding: 12px 16px;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  transition: background 0.2s;
}

.community-item:hover {
  background: #f5f5f5;
}

.community-item:first-child {
  border-radius: 12px 12px 0 0;
}

.community-item:last-child {
  border-radius: 0 0 12px 12px;
}

/* 户型图上传 */
.floor-plan-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.floor-plan-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.toggle-option {
  flex: 1;
  padding: 12px 16px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-option.active {
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  color: white;
}

.upload-area {
  border: 2px dashed #E8E8E8;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #78C9FD;
  background: rgba(120, 201, 253, 0.05);
}

.upload-text {
  display: block;
  font-size: 14px;
  color: #262626;
  margin-top: 12px;
}

.upload-hint {
  display: block;
  font-size: 12px;
  color: #8C8C8C;
  margin-top: 4px;
}

.uploaded-images {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-item .remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
}

.add-more {
  width: 100px;
  height: 100px;
  border: 2px dashed #E8E8E8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-more:hover {
  border-color: #78C9FD;
  background: rgba(120, 201, 253, 0.05);
  color: #8C8C8C;
}

/* 必填标记 */
.required {
  color: #FF4D4F;
  margin-left: 4px;
}

/* 选填标记 */
.optional {
  color: #8C8C8C;
  font-size: 12px;
  font-weight: normal;
  margin-left: 4px;
}

/* 标签提示文字 */
.label-hint {
  display: block;
  font-size: 12px;
  color: #8C8C8C;
  font-weight: normal;
  margin-top: 4px;
}

/* 地址区域 */
.address-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.address-row {
  width: 100%;
}

.address-search-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.address-search-row .form-input {
  flex: 1;
}

.location-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.location-btn:active {
  transform: scale(0.95);
}

/* 地址搜索建议列表 */
.address-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-height: 240px;
  overflow-y: auto;
  z-index: 100;
  margin-top: 4px;
}

.address-suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.address-suggestion-item:last-child {
  border-bottom: none;
}

.address-suggestion-item:hover {
  background: #f5f9ff;
}

.suggestion-info {
  flex: 1;
  min-width: 0;
}

.suggestion-title {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 2px;
}

.suggestion-address {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 地图选择弹窗 */
.map-picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.map-picker-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.map-picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.map-picker-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #262626;
}

.map-picker-header .close-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
}

.map-picker-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.map-search-box {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.map-search-input {
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.map-search-input:focus {
  border-color: #4E94FC;
}

.map-search-btn {
  padding: 0 16px;
  height: 40px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.map-container {
  flex: 1;
  min-height: 250px;
  background: #f5f5f5;
}

.map-selected-info {
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background: #f9f9f9;
}

.selected-title {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 4px;
}

.selected-address {
  font-size: 12px;
  color: #666;
}

.map-picker-footer {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
}

.map-picker-footer .btn-secondary {
  flex: 1;
  height: 44px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
}

.map-picker-footer .btn-primary {
  flex: 1;
  height: 44px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
}

.map-picker-footer .btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 照片上传区域 */
.photo-upload-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.photo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.photo-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-item .remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
}

.photo-add {
  width: 80px;
  height: 80px;
  border: 2px dashed #E8E8E8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.photo-add:hover {
  border-color: #78C9FD;
  background: rgba(120, 201, 253, 0.05);
}

.add-text {
  font-size: 12px;
  color: #4E94FC;
  margin-top: 4px;
}

.add-hint {
  font-size: 10px;
  color: #8C8C8C;
  margin-top: 2px;
}

.upload-limit {
  font-size: 12px;
  color: #8C8C8C;
  margin: 12px 0 0 0;
}

/* 户型图上传区域 */
.floor-plan-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.form-textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px 16px;
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 12px;
  font-size: 14px;
  color: #262626;
  box-sizing: border-box;
  resize: none;
  font-family: inherit;
}

.form-textarea:focus {
  outline: none;
  border-color: #78C9FD;
  box-shadow: 0 0 0 3px rgba(120, 201, 253, 0.1);
}

.form-textarea::placeholder {
  color: #BFBFBF;
}

/* 装修风格标签 */
.style-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.style-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border-radius: 20px;
  font-size: 14px;
  color: #262626;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.style-tag:hover {
  background: #f5f5f5;
}

.style-tag.active {
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  color: white;
}

.tag-check {
  font-size: 12px;
}

/* 风格图片预览 */
.style-preview-wrap {
  margin-top: 16px;
}

.preview-image-wrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-label {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.preview-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

/* 预览区域 */
.preview-section {
  margin-bottom: 24px;
}

.preview-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
}

.preview-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.preview-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F0F0F0;
}

.preview-item:last-child {
  border-bottom: none;
}

.item-label {
  font-size: 14px;
  color: #8C8C8C;
}

.item-value {
  font-size: 14px;
  color: #262626;
  font-weight: 500;
  text-align: right;
  flex: 1;
  margin-left: 16px;
}

/* 发布成功页面 */
.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 40px 0;
}

.success-card {
  background: white;
  border-radius: 16px;
  padding: 40px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: calc(100% - 48px);
  margin: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
}

.success-icon {
  margin-bottom: 24px;
}

.success-title {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 12px 0;
}

.success-desc {
  font-size: 14px;
  color: #8C8C8C;
  line-height: 1.6;
  margin: 0;
  max-width: 280px;
}

.success-actions {
  display: flex;
  gap: 12px;
  width: 100%;
}

.success-actions .btn-secondary,
.success-actions .btn-primary {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.success-actions .btn-secondary {
  background: #f5f5f5;
  color: #666;
}

.success-actions .btn-primary {
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  color: white;
}

/* 底部按钮 */
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px 34px;
  background: linear-gradient(to top, #F3F7F8 0%, #F3F7F8 80%, transparent 100%);
  z-index: 100;
  display: flex;
  justify-content: center;
}

.bottom-actions.dual {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-primary {
  width: 100%;
  max-width: calc(100vw - 48px);
  height: 44px;
  background: linear-gradient(135deg, #78C9FD 0%, #4E94FC 100%);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bottom-actions.dual .btn-primary {
  max-width: calc((100vw - 48px - 12px) / 2);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary:not(:disabled):active {
  transform: scale(0.98);
}

.btn-secondary {
  flex: 1;
  height: 44px;
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:active {
  background: #f5f5f5;
}

/* 安全区域 */
.safe-area {
  height: 34px;
}

/* 动画效果 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
