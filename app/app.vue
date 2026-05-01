<!--
  企业电子名片单页
  功能：双语(中/英)切换、联系方式展示、复制号码、分享名片弹窗
  特性：布局固定防抖动、按钮尺寸统一、图片资源统一配置
-->
<template>
  <div class="page-wrap">
    <!-- ========== 顶部导航栏：Logo + 公司名 ========== -->
    <header class="top-nav">
      <!-- Logo容器 -->
      <div class="logo-container">
        <img src="https://img.jinghorn.com/logo.png" alt="Logo" class="logo-img">
      </div>

      <!-- 公司名称容器：中文在上、英文在下，整体右对齐、垂直居中 -->
      <div class="company-name-container">
        <div class="cn-name">无锡惊鸿科技有限公司</div>
        <div class="en-name">Wuxi Jinghorn Technology Co., Ltd.</div>
      </div>

      <!-- 右侧占位：平衡顶部flex布局，保证公司名位置正确 -->
      <div class="nav-placeholder"></div>
    </header>

    <!-- ========== 姓名职位区域：居中展示姓名、职位，带上下分割线 ========== -->
    <div class="profile-row">
      <!-- 中英切换按钮：固定在右上角，切换全局文案 -->
      <button class="lang-switch" @click="toggleLang">
        <span v-if="isEn">中</span>
        <span v-else>EN</span>
      </button>

      <!-- 姓名职位文字：水平居中 -->
      <div class="profile-info-center">
        <span class="user-name">{{ langData.name }}</span>
        <span class="user-post">&nbsp;&nbsp;{{ langData.post }}</span>
      </div>
    </div>

    <!-- ========== 主内容区：所有联系方式卡片 ========== -->
    <div class="container">
      <!-- 头部栏：联系信息标题 + 分享名片按钮 -->
      <div class="head-row">
        <h2 class="title">{{ langData.contactTitle }}</h2>
        <!-- 分享名片按钮：固定宽度，切换语言不抖动 -->
        <button class="share-btn-fixed" @click="openShareModal">
          <i class="fas fa-share-nodes share-icon-blue"></i>
          <span class="share-text-blue">{{ langData.shareText }}</span>
        </button>
      </div>

      <!-- 电话联系卡片 -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fas fa-phone icon-phone"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.phoneLab }}</div>
            <div class="val">+8618851568563</div>
          </div>
        </div>
        <div class="item-right">
          <button @click="callTel" class="main-btn">{{ langData.callBtn }}</button>
        </div>
      </div>

      <!-- WhatsApp联系卡片：点击复制号码 -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fab fa-whatsapp icon-wa"></i>
          <div class="text-wrap">
            <div class="label">WhatsApp</div>
            <div class="val">+8618851568563</div>
          </div>
        </div>
        <div class="item-right">
          <button @click="copyWa" class="main-btn">{{ langData.waBtn }}</button>
        </div>
      </div>

      <!-- 微信联系卡片：点击复制微信号 -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fab fa-weixin" style="color:#07C160;"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.wechatLab }}</div>
            <div class="val">18851568563</div>
          </div>
        </div>
        <div class="item-right">
          <button @click="copyWechat" class="main-btn">{{ langData.wechatBtn }}</button>
        </div>
      </div>

      <!-- 电子邮箱卡片 -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fas fa-envelope icon-email"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.emailLab }}</div>
            <div class="val">max@jinghorn.com</div>
          </div>
        </div>
        <button @click="goMail" class="main-btn">{{ langData.emailBtn }}</button>
      </div>

      <!-- 官方网站卡片 -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fas fa-globe icon-web"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.webLab }}</div>
            <div class="val">www.jinghorn.com</div>
          </div>
        </div>
        <button @click="goWeb" class="main-btn">{{ langData.webBtn }}</button>
      </div>
    </div>

    <!-- ========== 底部业务标语 ========== -->
    <div class="footer-top-text">
      Gifts & Premiums | OEM & ODM & OBM
    </div>

    <!-- ========== 版权信息底栏 ========== -->
    <footer class="footer">
      <div>© 2026 JINGHORN</div>
    </footer>

    <!-- ========== 分享名片弹窗：横版标准90:54名片比例 ========== -->
    <div v-if="showModal" class="modal-mask" @click.self="closeShareModal">
      <div class="modal-card">
        <img src="https://img.jinghorn.com/13590897.png" alt="名片大图" class="card-img-horizontal">
        <p class="tip">{{ langData.tipText }}</p>
        <button @click="closeShareModal" class="close-btn btn-blue">{{ langData.closeBtnText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入Vue组合式API
import { ref, computed } from 'vue'

// ========== 全局状态定义 ==========
// 分享弹窗显示状态
const showModal = ref(false)
// 语言切换标识：false=中文，true=英文
const isEn = ref(true)

// ========== 双语文案配置：统一管理所有需要切换的文字 ==========
const langData = computed(() => {
  return isEn.value ? {
    name: 'Max Wu',
    post: 'Founder & CEO',
    contactTitle: 'Contact Info',
    shareText: 'Share Card',
    tipText: 'Long press to save / share',
    phoneLab: 'Phone',
    callBtn: 'Call',
    waBtn: 'Copy',
    wechatLab: 'WeChat',
    wechatBtn: 'Copy',
    emailLab: 'Email',
    emailBtn: 'Send',
    webLab: 'Website',
    webBtn: 'Visit',
    closeBtnText: 'Close'
  } : {
    name: '吴景鸿',
    post: '总经理',
    contactTitle: '联系信息',
    shareText: '分享名片',
    tipText: '长按保存/分享名片',
    phoneLab: '电话',
    callBtn: '拨打',
    waBtn: '复制',
    wechatLab: '微信',
    wechatBtn: '复制',
    emailLab: '电子邮箱',
    emailBtn: '发送',
    webLab: '官方网站',
    webBtn: '访问',
    closeBtnText: '关闭'
  }
})

// ========== 业务函数 ==========
/**
 * 切换语言
 */
const toggleLang = () => { isEn.value = !isEn.value }

// 联系方式常量
const phoneNum = '+8618851568563'
const wechatId = '18851568563'
const waNum = '+8618851568563'

/**
 * 复制WhatsApp号码
 */
const copyWa = async () => { 
  await navigator.clipboard.writeText(waNum); 
  alert(isEn.value ? '✅ WhatsApp number copied' : '✅ WhatsApp号已复制');
}

/**
 * 复制微信号
 */
const copyWechat = async () => { 
  await navigator.clipboard.writeText(wechatId); 
  alert(isEn.value ? '✅ WeChat ID copied' : '✅ 微信号已复制');
}

/**
 * 打开分享弹窗
 */
const openShareModal = () => showModal.value = true

/**
 * 关闭分享弹窗
 */
const closeShareModal = () => showModal.value = false

/**
 * 唤起电话拨打
 */
const callTel = () => window.open(`tel:${phoneNum}`)

/**
 * 唤起邮箱发送
 */
const goMail = () => window.open('mailto:max@jinghorn.com')

/**
 * 打开官网
 */
const goWeb = () => window.open('https://www.jinghorn.com')

</script>

<style>
/* 引入FontAwesome图标库 */
@import "@fortawesome/fontawesome-free/css/all.min.css";

/* ========== 全局样式重置 & 基础配置 ========== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.page-wrap {
  max-width: 420px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
   /* 这3行，实现内容区自动挤压，底栏压在最底部 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ========== 顶部导航样式 ========== */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  min-height: 48px;
}
/* Logo容器：高度固定30px */
.logo-container { height: 30px; }
.logo-img { height: 100%; width: auto; object-fit: contain; }
/* 右侧占位宽度 */
.nav-placeholder { width: 36px; }

/* 公司名容器：右对齐、垂直居中 */
.company-name-container {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.cn-name {
  font-size: 16px;
  font-weight: 600;
  color: #1d2129;
  white-space: nowrap;
  margin-bottom: 2px;
}
.en-name {
  font-size: 12px;
  color: #86909c;
  white-space: nowrap;
}

/* ========== 语言切换按钮样式 ========== */
.lang-switch {
  position: absolute;
  top: 6px;
  right: 20px;
  border: 1px solid #0E42D2;
  background: #fff;
  color: #0E42D2;
  width: 32px;
  height: 20px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.lang-switch:hover {
  background: #0E42D2;
  color: #fff;
}

/* ========== 姓名职位区域：高度固定100px ========== */
.profile-row {
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 上下渐变分割线 */
.profile-row::before,
.profile-row::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
}
.profile-row::before { top: 0; }
.profile-row::after { bottom: 0; }

/* 姓名职位居中样式 */
.profile-info-center {
  text-align: center;
}
.user-name {
  font-size: 28px;
  font-weight: 700;
  color: #002D62;
}
.user-post {
  font-size: 15px;
  color: #667285;
}

/* ========== 主内容容器 ========== */
.container { 
  padding: 18px 20px 12px; 
  flex: 1; /* 让内容区自动扩展，挤压底部 */
}
.head-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 24px;
}
.title { font-size: 16px; font-weight: 600; color: #1d2129; }

/* 分享按钮：固定宽度防抖动 */
.share-btn-fixed {
  width: 100px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
}
.share-icon-blue, .share-text-blue { color: #0E42D2; }

/* ========== 联系卡片通用样式：高度固定56px，切换不抖动 ========== */
.contact-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f5f9;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  height: 56px;
}
.item-left { display: flex; align-items: center; gap: 14px; }
.item-right { display: flex; align-items: center; gap: 10px; }

/* 各图标颜色 */
.icon-phone { color: #0052D9; font-size: 20px; }
.icon-wa { color: #25d366; font-size: 20px; }
.icon-email { color: #f56c6c; font-size: 20px; }
.icon-web { color: #0052D9; font-size: 20px; }

/* 文字区域最小宽度，防止挤压 */
.text-wrap { min-width: 120px; }
.text-wrap .label { font-size: 15px; font-weight: 500; color: #1d2129; height: 20px; }
.text-wrap .val { font-size: 13px; color: #86909c; margin-top: 2px; }

/* ========== 按钮统一样式 ========== */
.icon-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #86909c;
}
.main-btn {
  background: #0E42D2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  width: 60px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-btn:hover { background: #0E42D2; }

/* ========== 底部区域 ========== */
.footer-top-text {
  text-align: center;
  font-size: 12px;
  color: #86909c;
  padding: 10px 20px 6px;
}
.footer {
  text-align: center;
  padding: 8px 20px 20px;
  border-top: 1px solid #ebeef5;
  font-size: 12px;
  color: #86909c;
}

/* ========== 分享弹窗样式 ========== */
.modal-mask {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  width: 330px;
}
/* 标准横版名片比例 90:54 */
.card-img-horizontal {
  width: 100%;
  aspect-ratio: 90 / 54;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 16px;
}
.tip { font-size: 14px; color: #4a5d7b; margin-bottom: 16px; }
.close-btn {
  background: #0E42D2;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
}
.btn-blue { color: #fff; font-weight: 500; }
</style>
