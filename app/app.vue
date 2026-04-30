<template>
  <div class="page-wrap">
    <!-- 顶部导航：Logo高度改为30 + 公司名垂直居中 + 和切换按钮右侧对齐 -->
    <header class="top-nav">
      <div class="logo-container">
        <img src="https://img.jinghorn.com/logo.png" alt="Logo" class="logo-img">
      </div>
      <!-- 公司名：垂直居中 + 和切换按钮右侧红线对齐 -->
      <div class="company-name-container">
        <div class="cn-name">无锡惊鸿科技有限公司</div>
        <div class="en-name">Wuxi Jinghorn Technology Co., Ltd.</div>
      </div>
      <div class="nav-placeholder"></div>
    </header>

    <!-- 姓名职位区域：高度改为100 -->
    <div class="profile-row">
      <!-- 中英切换按钮 -->
      <button class="lang-switch" @click="toggleLang">
        <span v-if="isEn">中</span>
        <span v-else>EN</span>
      </button>

      <div class="profile-info-center">
        <div class="user-name">{{ langData.name }}</div>
        <div class="user-post">{{ langData.post }}</div>
      </div>
    </div>

    <!-- 联系区域 -->
    <div class="container">
      <div class="head-row">
        <h2 class="title">{{ langData.contactTitle }}</h2>
        <!-- 分享名片：固定宽度不抖动 -->
        <button class="share-btn-fixed" @click="openShareModal">
          <i class="fas fa-share-nodes share-icon-blue"></i>
          <span class="share-text-blue">{{ langData.shareText }}</span>
        </button>
      </div>

      <!-- 电话（已删除保存图标） -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fas fa-phone icon-phone"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.phoneLab }}</div>
            <div class="val">+8613800138000</div>
          </div>
        </div>
        <div class="item-right">
          <button @click="callTel" class="main-btn">{{ langData.callBtn }}</button>
        </div>
      </div>

      <!-- WhatsApp（改为复制功能） -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fab fa-whatsapp icon-wa"></i>
          <div class="text-wrap">
            <div class="label">WhatsApp</div>
            <div class="val">+8613800138000</div>
          </div>
        </div>
        <div class="item-right">
          <button @click="copyWa" class="main-btn">{{ langData.waBtn }}</button>
        </div>
      </div>

      <!-- 微信（改为复制功能） -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fab fa-weixin" style="color:#07C160;"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.wechatLab }}</div>
            <div class="val">SmartLinkFuture</div>
          </div>
        </div>
        <div class="item-right">
          <button @click="copyWechat" class="main-btn">{{ langData.wechatBtn }}</button>
        </div>
      </div>

      <!-- 邮箱 -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fas fa-envelope icon-email"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.emailLab }}</div>
            <div class="val">contact@smartlinkfuture.com</div>
          </div>
        </div>
        <button @click="goMail" class="main-btn">{{ langData.emailBtn }}</button>
      </div>

      <!-- 官网 -->
      <div class="contact-card">
        <div class="item-left">
          <i class="fas fa-globe icon-web"></i>
          <div class="text-wrap">
            <div class="label">{{ langData.webLab }}</div>
            <div class="val">www.smartlinkfuture.com</div>
          </div>
        </div>
        <button @click="goWeb" class="main-btn">{{ langData.webBtn }}</button>
      </div>
    </div>

    <!-- 底栏上方业务文字 -->
    <div class="footer-top-text">
      Gifts & Premiums | OEM & ODM & OBM
    </div>

    <!-- 底栏版权 居中 -->
    <footer class="footer">
      <div>© 2026 JINGHORN</div>
    </footer>

    <!-- 标准横版名片弹窗 90*54mm 比例 -->
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
import { ref, computed } from 'vue'
const showModal = ref(false)
const isEn = ref(false)

// 完整双语（新增弹窗关闭按钮文字、更新其他文字）
const langData = computed(() => {
  return isEn.value ? {
    name: 'Max Wu',
    post: 'Founder & CEO',
    contactTitle: 'Contact Info',
    shareText: 'Save Card',
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
    closeBtnText: 'Close' // 英文：Close
  } : {
    name: '吴先生',
    post: '创始人 & 首席执行官',
    contactTitle: '联系信息',
    shareText: '分享名片',
    tipText: '长按保存 / 分享名片',
    phoneLab: '电话',
    callBtn: '拨打',
    waBtn: '复制',
    wechatLab: '微信',
    wechatBtn: '复制',
    emailLab: '电子邮箱',
    emailBtn: '发送',
    webLab: '官方网站',
    webBtn: '访问',
    closeBtnText: '关闭' // 中文：关闭（替换原Close）
  }
})

const toggleLang = () => { isEn.value = !isEn.value }

const phoneNum = '+8613800138000'
const wechatId = 'SmartLinkFuture'
const waNum = '+8613800138000'

// WhatsApp复制功能：复制号码 + 弹窗提示
const copyWa = async () => { 
  await navigator.clipboard.writeText(waNum); 
  alert(isEn.value ? '✅ WhatsApp number copied' : '✅ WhatsApp号已复制');
}

// 微信复制功能：复制微信号 + 弹窗提示
const copyWechat = async () => { 
  await navigator.clipboard.writeText(wechatId); 
  alert(isEn.value ? '✅ WeChat ID copied' : '✅ 微信号已复制');
}

const saveToContact = () => { window.open(`tel:${phoneNum}`); alert('📒 Saved') }

const openShareModal = () => showModal.value = true
const closeShareModal = () => showModal.value = false

const callTel = () => window.open(`tel:${phoneNum}`)
const goMail = () => window.open('mailto:contact@smartlinkfuture.com')
const goWeb = () => window.open('https://www.smartlinkfuture.com')
</script>

<style>
@import "@fortawesome/fontawesome-free/css/all.min.css";

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
}

/* 顶部导航：Logo高度改为30 + 公司名垂直居中 */
.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  min-height: 48px; /* 顶栏最小高度，保证垂直居中空间 */
}
/* Logo高度改为30px */
.logo-container { height: 30px; }
.logo-img { height: 100%; width: auto; object-fit: contain; }
.nav-placeholder { width: 36px; }

/* ========== 公司名：顶栏垂直居中 + 右侧对齐 ========== */
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
  margin-bottom: 2px; /* 中英文之间小间距 */
}
.en-name {
  font-size: 12px;
  color: #86909c;
  white-space: nowrap;
}

/* 中英切换按钮 */
.lang-switch {
  position: absolute;
  top: 6px;
  right: 20px;
  border: 1px solid #0052D9;
  background: #fff;
  color: #0052D9;
  width: 32px;
  height: 20px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* 保证按钮在公司名上层 */
}
.lang-switch:hover {
  background: #0052D9;
  color: #fff;
}

/* 姓名职位区域：高度改为100px */
.profile-row {
  position: relative;
  height: 100px; /* 原80px → 改为100px */
  display: flex;
  align-items: center;
  justify-content: center;
}
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

/* 姓名职位居中 */
.profile-info-center {
  text-align: center;
}
.user-name {
  font-size: 26px;
  font-weight: 700;
  color: #1d2129;
  margin-bottom: 4px;
}
.user-post {
  font-size: 15px;
  color: #667285;
}

/* 容器 */
.container { padding: 18px 20px 12px; }
.head-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 24px;
}
.title { font-size: 16px; font-weight: 600; color: #1d2129; }

/* 分享名片 固定宽度不抖动 */
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
.share-icon-blue, .share-text-blue { color: #0052D9; }

/* 卡片 绝对固定 */
.contact-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f8fa;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  height: 56px;
}
.item-left { display: flex; align-items: center; gap: 14px; }
.item-right { display: flex; align-items: center; gap: 10px; }

.icon-phone { color: #0052D9; font-size: 20px; }
.icon-wa { color: #25d366; font-size: 20px; }
.icon-email { color: #f56c6c; font-size: 20px; }
.icon-web { color: #0052D9; font-size: 20px; }

.text-wrap { min-width: 120px; }
.text-wrap .label { font-size: 15px; font-weight: 500; color: #1d2129; height: 20px; }
.text-wrap .val { font-size: 13px; color: #86909c; margin-top: 2px; }

/* 按钮 统一固定宽度 */
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
  background: #0052D9;
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
.main-btn:hover { background: #0047b3; }

/* 底部 */
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

/* 名片弹窗 */
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
.card-img-horizontal {
  width: 100%;
  aspect-ratio: 90 / 54;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 16px;
}
.tip { font-size: 14px; color: #667285; margin-bottom: 16px; }
.close-btn {
  background: #f7f8fa;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
}
.btn-blue { color: #0052D9; font-weight: 500; }
</style>