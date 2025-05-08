<template>
  <view class="main-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="title">工程成本管理系统</text>
    </view>

    <!-- 功能导航卡片 -->
    <view class="function-grid">
      <!-- 成本曲线 -->
      <view class="function-card" @click="topage('/pages/cost_chart/cost_chart')">
        <view class="card-content">
          <uni-icons type="pie-chart" size="40" color="#1890FF"></uni-icons>
          <text class="card-title">成本消耗曲线</text>
          <text class="card-desc">查看周/月/施工段成本趋势</text>
        </view>
      </view>
      <!-- 预警系统 -->
      <view class="function-card" @click="topage('/pages/warning_system/warning_system')">
        <view class="card-content">
          <uni-icons type="bell" size="40" color="#FF6A6A"></uni-icons>
          <text class="card-title">红绿灯预警</text>
          <text class="card-desc">实时监控预算消耗状态</text>
        </view>
      </view>

      <!-- AI分析 -->
      <view class="function-card" @click="topage('/pages/ai_analysis/ai_analysis')">
        <view class="card-content">
          <uni-icons type="medal" size="40" color="#52C41A"></uni-icons>
          <text class="card-title">AI根由分析</text>
          <text class="card-desc">智能预测成本风险</text>
        </view>
      </view>
    </view>

    
  </view>
</template>

<script setup>
import { ref } from 'vue'

const topage = (url) => {

  if (url.includes('main_page') || url.includes('main_profile')) {
    uni.switchTab({ url })
  } 

  else {
    uni.navigateTo({ url })
  }
}

</script>

<style lang="scss">
.main-container {
  padding: 24rpx;
  background-color: #f5f7fa;
  min-height: 100vh;

  .header {
    padding: 40rpx 0;
    text-align: center;
    
    .title {
      font-size: 38rpx;
      font-weight: 600;
      color: #1a1a1a;
    }
  }

  .function-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24rpx;
    padding: 0 20rpx;

    .function-card {
      background: #ffffff;
      border-radius: 16rpx;
      padding: 32rpx;
      box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
      transition: transform 0.2s;

      &:active {
        transform: scale(0.98);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20rpx;

        .card-title {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
        }

        .card-desc {
          font-size: 24rpx;
          color: #666;
          text-align: center;
          line-height: 1.4;
        }
      }
    }
  }

  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -4rpx 12rpx rgba(0,0,0,0.06);

    .tab-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8rpx;
      color: #999;
      font-size: 24rpx;

      &.active {
        color: #1890FF;
      }

      uni-icons {
        font-size: 40rpx;
      }
    }
  }
}
</style>