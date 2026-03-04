# 化化 APP UI 视觉规范文档

> 版本：v1.0  
> 更新日期：2025-02-27  
> 适用范围：化化 APP 全平台

---

## 一、字体规范 / Font System

### 1.1 字体家族

| 平台 | 中文字体 | 英文字体 | 数字字体 |
|------|---------|---------|---------|
| iOS | 苹方 (PingFang SC) | San Francisco | DIN Pro |
| Android | 思源黑体 (Source Han Sans) | Roboto | Roboto |
| Web | PingFang SC, -apple-system, sans-serif | system-ui | DIN Pro |

**CSS 定义：**
```css
font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### 1.2 字号层级

| 层级 | 名称 | 字号 | 行高 | 字重 | 使用场景 |
|------|------|------|------|------|----------|
| T1 | 大标题 | 26px | 34px | 500 | 页面主标题、导航栏标题 |
| T2 | 标准标题 | 20px | 28px | 500 | 模块标题、卡片标题 |
| T3 | 小标题 | 18px | 24px | 500 | 子模块标题、列表标题 |
| T4 | 大正文 | 17px | 23px | 400 | 大段正文文字、重要内容 |
| T5 | 正文 | 16px | 22px | 400 | 常规正文文字、描述信息 |
| T6 | 小正文 | 14px | 20px | 400 | 辅助正文、次要内容 |
| T7 | 辅助文字 | 12px | 18px | 400 | 说明文字、提示信息 |
| T8 | 最小文字 | 11px | 15px | 400 | 标签、时间戳、次要信息 |
| T9 | 超小文字 | 10px | 14px | 400 | 徽章、最小标签 |

**CSS 工具类：**
```css
.font-t1 { font-size: 26px; line-height: 34px; font-weight: 500; }
.font-t2 { font-size: 20px; line-height: 28px; font-weight: 500; }
.font-t3 { font-size: 18px; line-height: 24px; font-weight: 500; }
.font-t4 { font-size: 17px; line-height: 23px; font-weight: 400; }
.font-t5 { font-size: 16px; line-height: 22px; font-weight: 400; }
.font-t6 { font-size: 14px; line-height: 20px; font-weight: 400; }
.font-t7 { font-size: 12px; line-height: 18px; font-weight: 400; }
.font-t8 { font-size: 11px; line-height: 15px; font-weight: 400; }
.font-t9 { font-size: 10px; line-height: 14px; font-weight: 400; }
```

### 1.3 字重使用规则

| 字重 | 数值 | 使用场景 |
|------|------|----------|
| Regular | 400 | 正文、辅助文字、描述信息 |
| Medium | 500 | 标题、强调文字、按钮文字、选中状态 |

---

## 二、颜色规范 / Color System

### 2.1 CSS 变量定义

```css
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
  --color-text-1: #262626;  /* 主文字 */
  --color-text-2: #595959;  /* 次文字 */
  --color-text-3: #8C8C8C;  /* 辅助文字 */
  --color-text-4: #BFBFBF;  /* 禁用文字 */
  
  /* 中性色 - 背景 */
  --color-fill-1: #F5F5F5;  /* 页面背景 */
  --color-fill-2: #F0F0F0;  /* 卡片背景、hover背景 */
  --color-fill-3: #D9D9D9;  /* 分割线、边框 */
  --color-white: #FFFFFF;   /* 纯白背景 */
}
```

### 2.2 主题色（品牌色）

| 名称 | 色值 | 使用场景 |
|------|------|----------|
| 主题色-常态 | #1677FF | 主按钮、链接、选中状态、主要操作 |
| 主题色-浅色 | #E6F4FF | 背景、hover状态、浅色标签 |
| 主题色-深色 | #0958D9 | 按下状态、强调色 |

### 2.3 辅助色

| 名称 | 色值 | 使用场景 |
|------|------|----------|
| 成功/安全 | #52C41A | 成功提示、通过状态、完成标记 |
| 警告/注意 | #FAAD14 | 警告提示、待处理状态、提醒 |
| 错误/危险 | #FF4D4F | 错误提示、删除操作、紧急提醒 |
| 信息/提示 | #1677FF | 信息提示、帮助引导、链接 |

### 2.4 中性色 - 文字

| 名称 | 色值 | 使用场景 |
|------|------|----------|
| 文字-1（主文字） | #262626 | 标题、重要文字、主要内容 |
| 文字-2（次文字） | #595959 | 正文、常规内容、描述 |
| 文字-3（辅助文字） | #8C8C8C | 辅助说明、占位符、提示 |
| 文字-4（禁用文字） | #BFBFBF | 禁用状态、最弱文字、不可用 |

### 2.5 中性色 - 背景与边框

| 名称 | 色值 | 使用场景 |
|------|------|----------|
| 填充色-1 | #F5F5F5 | 页面背景、底层背景 |
| 填充色-2 | #F0F0F0 | 卡片背景、hover背景、分割线 |
| 填充色-3 | #D9D9D9 | 边框、分割线、禁用背景 |
| 纯白 | #FFFFFF | 卡片背景、浮层背景、输入框背景 |

---

## 三、阴影规范 / Shadow System

基于 Material Design 阴影系统，按海拔高度定义：

### 3.1 CSS 变量

```css
:root {
  /* 阴影层级 */
  --shadow-0: none;
  --shadow-1: 0 1px 2px rgba(0,0,0,0.08);
  --shadow-2: 0 2px 4px rgba(0,0,0,0.08);
  --shadow-3: 0 3px 6px rgba(0,0,0,0.1);
  --shadow-4: 0 4px 8px rgba(0,0,0,0.1);
  --shadow-6: 0 6px 12px rgba(0,0,0,0.12);
  --shadow-8: 0 8px 16px rgba(0,0,0,0.12);
  --shadow-12: 0 12px 24px rgba(0,0,0,0.15);
  --shadow-16: 0 16px 32px rgba(0,0,0,0.15);
  --shadow-24: 0 24px 48px rgba(0,0,0,0.2);
}
```

### 3.2 阴影使用表

| 海拔高度 | 阴影参数 | 使用组件 |
|---------|---------|---------|
| 0pt | 无阴影 | 文字按钮、扁平卡片 |
| 1pt | `0 1px 2px rgba(0,0,0,0.08)` | 搜索栏、开关、输入框 |
| 2pt | `0 2px 4px rgba(0,0,0,0.08)` | 按钮（静止）、小卡片 |
| 3pt | `0 3px 6px rgba(0,0,0,0.1)` | 刷新提示、轻量浮层 |
| 4pt | `0 4px 8px rgba(0,0,0,0.1)` | 顶部应用栏、导航栏 |
| 6pt | `0 6px 12px rgba(0,0,0,0.12)` | 悬浮按钮（静止）、下拉菜单 |
| 8pt | `0 8px 16px rgba(0,0,0,0.12)` | 底部标签栏、底部应用栏、菜单 |
| 12pt | `0 12px 24px rgba(0,0,0,0.15)` | 悬浮按钮（按下）、对话框 |
| 16pt | `0 16px 32px rgba(0,0,0,0.15)` | 模态底板、抽屉导航 |
| 24pt | `0 24px 48px rgba(0,0,0,0.2)` | 对话框、重要弹窗 |

---

## 四、圆角规范 / Border Radius

### 4.1 CSS 变量

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;    /* 小圆角 */
  --radius-md: 8px;    /* 中圆角 */
  --radius-lg: 16px;   /* 大圆角 */
  --radius-xl: 20px;   /* 超大圆角 */
  --radius-full: 9999px; /* 全圆角/胶囊形 */
  --radius-circle: 50%;  /* 圆形 */
}
```

### 4.2 圆角使用表

| 组件类型 | 圆角值 | 说明 |
|---------|-------|------|
| 默认卡片 | 8px | 常规卡片、列表项、模块容器 |
| 按钮 | 4px | 常规按钮、操作按钮 |
| 悬浮按钮 | 50%（圆形） | 圆形悬浮操作按钮 |
| 胶囊按钮 | 9999px | 标签按钮、筛选按钮 |
| 输入框 | 4px | 搜索框、表单输入 |
| 对话框 | 16px | 弹窗、对话框、提示框 |
| 模态面板 | 20px | 底部弹出面板、抽屉 |
| 标签/徽章 | 4px | 小标签、状态徽章 |
| 头像 | 50%（圆形） | 用户头像、圆形图标 |
| 大卡片 | 12px | 金刚区卡片、banner卡片 |

---

## 五、间距规范 / Spacing System

### 5.1 基础间距单位

以 4px 为基础单位，建立间距体系：

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

### 5.2 间距使用建议

| 间距 | 数值 | 使用场景 |
|------|------|----------|
| 4px | 极小间距 | 图标与文字间距、紧凑元素间距 |
| 8px | 小间距 | 组件内部间距、小元素间距 |
| 12px | 中间距 | 列表项间距、卡片内边距 |
| 16px | 标准间距 | 页面边距、模块间距、卡片间距 |
| 20px | 大间距 | 大模块间距、重要内容间距 |
| 24px | 超大间距 | 页面顶部间距、大模块分隔 |
| 32px | 特大间距 | 章节分隔、重要模块间距 |

### 5.3 页面边距规范

- **页面左右边距**：16px（移动端标准）
- **页面顶部安全区**：状态栏高度 + 8px
- **页面底部安全区**：底部导航高度 + env(safe-area-inset-bottom)

---

## 六、组件规范 / Component System

### 6.1 按钮规范

#### 主按钮
```css
.btn-primary {
  height: 44px;
  padding: 0 24px;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 500;
  box-shadow: var(--shadow-2);
}
```

#### 次按钮
```css
.btn-secondary {
  height: 44px;
  padding: 0 24px;
  background: var(--color-white);
  color: var(--color-text-1);
  border: 1px solid var(--color-fill-3);
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 400;
}
```

#### 文字按钮
```css
.btn-text {
  height: 36px;
  padding: 0 12px;
  background: transparent;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 400;
}
```

### 6.2 输入框规范

```css
.input {
  height: 44px;
  padding: 0 16px;
  background: var(--color-white);
  border: 1px solid var(--color-fill-3);
  border-radius: var(--radius-sm);
  font-size: 16px;
  color: var(--color-text-1);
}

.input::placeholder {
  color: var(--color-text-3);
}
```

### 6.3 卡片规范

```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-2);
}
```

### 6.4 标签/徽章规范

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 400;
}

.badge {
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: var(--color-error);
  color: var(--color-white);
  border-radius: var(--radius-sm);
  font-size: 10px;
}
```

---

## 七、布局规范 / Layout System

### 7.1 页面结构

```
┌─────────────────────────┐
│      状态栏 (44px)       │
├─────────────────────────┤
│      导航栏 (44px)       │
├─────────────────────────┤
│                         │
│      内容区域            │
│    (可滚动，flex: 1)     │
│                         │
├─────────────────────────┤
│      底部导航 (70px)     │
└─────────────────────────┘
```

### 7.2 安全区域适配

```css
.page {
  padding-top: env(safe-area-inset-top);
  padding-bottom: calc(70px + env(safe-area-inset-bottom));
}
```

### 7.3 响应式断点

| 设备类型 | 宽度范围 | 布局调整 |
|---------|---------|---------|
| 小屏手机 | < 375px | 紧凑布局，减小间距 |
| 标准手机 | 375px - 414px | 标准布局 |
| 大屏手机 | > 414px | 适当增加间距 |
| 平板 | > 768px | 居中显示，最大宽度 430px |

---

## 八、动效规范 / Motion System

### 8.1 过渡时间

| 类型 | 时长 | 使用场景 |
|------|------|----------|
| 快速 | 100ms | 按钮点击、状态切换 |
| 标准 | 200ms | 元素显隐、颜色变化 |
| 慢速 | 300ms | 页面切换、弹窗出现 |
| 弹性 | 400ms | 重要交互、特殊效果 |

### 8.2 缓动函数

```css
:root {
  --ease-default: ease;
  --ease-in: ease-in;
  --ease-out: ease-out;
  --ease-in-out: ease-in-out;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 8.3 常用动效

```css
/* 淡入 */
.fade-in {
  animation: fadeIn 200ms ease-out;
}

/* 滑入 */
.slide-up {
  animation: slideUp 300ms ease-out;
}

/* 缩放 */
.scale-in {
  animation: scaleIn 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 九、图标规范 / Icon System

### 9.1 图标尺寸

| 尺寸 | 使用场景 |
|------|----------|
| 16px | 小图标、内联图标 |
| 20px | 列表图标、辅助图标 |
| 24px | 标准图标、导航图标 |
| 32px | 大图标、功能图标 |
| 48px | 超大图标、空状态图标 |

### 9.2 图标颜色

- **默认**：跟随文字颜色（currentColor）
- **主色**：--color-primary
- **辅助**：--color-text-3
- **禁用**：--color-text-4

### 9.3 图标命名规范

```
icon-[功能]-[状态].png

例如：
- nav-home.png (未激活)
- nav-home-active.png (激活)
- btn-search.png
- ic-location.png
```

---

## 十、使用示例

### 10.1 完整 CSS 变量文件

```css
/* design-system.css */

:root {
  /* 颜色 */
  --color-primary: #1677FF;
  --color-primary-light: #E6F4FF;
  --color-success: #52C41A;
  --color-warning: #FAAD14;
  --color-error: #FF4D4F;
  
  --color-text-1: #262626;
  --color-text-2: #595959;
  --color-text-3: #8C8C8C;
  --color-text-4: #BFBFBF;
  
  --color-fill-1: #F5F5F5;
  --color-fill-2: #F0F0F0;
  --color-fill-3: #D9D9D9;
  --color-white: #FFFFFF;
  
  /* 阴影 */
  --shadow-1: 0 1px 2px rgba(0,0,0,0.08);
  --shadow-2: 0 2px 4px rgba(0,0,0,0.08);
  --shadow-4: 0 4px 8px rgba(0,0,0,0.1);
  --shadow-8: 0 8px 16px rgba(0,0,0,0.12);
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  
  /* 间距 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
}
```

### 10.2 Vue 组件中使用

```vue
<template>
  <div class="card">
    <h2 class="font-t2">卡片标题</h2>
    <p class="font-t6">卡片描述内容</p>
    <button class="btn-primary">主要操作</button>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-2);
}

.btn-primary {
  height: 44px;
  padding: 0 var(--space-6);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 500;
}
</style>
```

---

## 附录：快速参考表

### 颜色速查

| 用途 | 变量名 | 色值 |
|------|--------|------|
| 主按钮 | --color-primary | #1677FF |
| 成功 | --color-success | #52C41A |
| 警告 | --color-warning | #FAAD14 |
| 错误 | --color-error | #FF4D4F |
| 主文字 | --color-text-1 | #262626 |
| 次文字 | --color-text-2 | #595959 |
| 辅助文字 | --color-text-3 | #8C8C8C |
| 页面背景 | --color-fill-1 | #F5F5F5 |

### 字号速查

| 用途 | 类名 | 字号/行高 |
|------|------|----------|
| 页面标题 | .font-t1 | 26/34px |
| 模块标题 | .font-t2 | 20/28px |
| 卡片标题 | .font-t3 | 18/24px |
| 正文 | .font-t5 | 16/22px |
| 辅助文字 | .font-t6 | 14/20px |
| 标签 | .font-t8 | 11/15px |

---

**文档维护：** 前端开发团队  
**审核：** UI/UX 设计团队  
**更新周期：** 每月评审，按需更新
