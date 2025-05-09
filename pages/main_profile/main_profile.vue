<template>
  <view class="main-container">
    <!-- 个人信息卡片 -->
    <view 
      class="mymessage-card" 
      @click="handleSetting('/pages/profileset/profileset')"
      @touchstart="touchStart"
      @touchend="touchEnd"
      :style="cardScale"
    >
      <image 
        class="headimg"
        :src="headimgpth"
        mode="aspectFill"
      />
      <view class="info-wrapper">
        <text class="nickname">{{ nickname }}</text>
        <text class="uid">UID: {{ uid || '--' }}</text>
      </view>
      <uni-icons 
        type="forward" 
        size="20" 
        color="#999" 
        class="arrow-icon"
      />
    </view>
	<view class="section">
		<view class="section-title">服务功能</view>
		<view class="list">
			<view 
			  v-for="(item,index) in services" 
			  :key="index"
			  class="list-item"
			  @click="handleSetting(item)"
			>
				<view class="item-left">
				  <uni-icons 
				    :type="item.icon" 
				    size="20" 
				    :color="item.color"
				  />
				  <text class="item-label">{{ item.label }}</text>
				</view>
				<uni-icons 
				  type="forward" 
				  size="16" 
				  color="#ccc"
				/>
			</view>
		</view>
	</view>

    <!-- 设置列表 -->
    <view class="section">
      <view class="section-title">账户设置</view>
      <view class="list">
        <view 
          v-for="(item, index) in settings"
          :key="index"
          class="list-item"
          @click="handleSetting(item)"
        >
          <view class="item-left">
            <uni-icons 
              :type="item.icon" 
              size="20" 
              :color="item.color"
            />
            <text class="item-label">{{ item.label }}</text>
          </view>
          <uni-icons 
            type="forward" 
            size="16" 
            color="#ccc"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
//import UniIcons from '/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
import uniIconsVue from '../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/useUserStore'

const userStore = useUserStore()
const { displayName, formattedJoinDate } = storeToRefs(userStore)
const { currentUser, defaultAvatars, meta } = storeToRefs(userStore)

// 响应式数据
const headimgpth = ref('/static/OIP-C.jpg')
const nickname = ref('点击登录')
const uid = ref(null)
const isTouching = ref(false)
const urlLogIn:string=''

onMounted(()=>{
	if(currentUser&&meta.value.isLoggedin){
		nickname.value=currentUser.value.nickname;
		uid.value=currentUser.value.uid;
		headimgpth.value=defaultAvatars.value;
		console.log("update successfully");
	}
	else console.log("unloggedin");
}

)


// 触摸动画处理
const cardScale = reactive({
  transform: 'scale(1)',
  transition: 'transform 0.1s ease'
})

const services = reactive([
  { icon: 'location', color: '#4caf50', label: '工地导航', path: '/pages' },
  { icon: 'help', color: '#2196f3', label: '帮助中心', path: '/pages' },
  { 
    icon: 'info', 
    color: '#9c27b0', 
    label: '关于我们', 
    path: '/pages/about_us/about_us'
  }
])
const settings = reactive([
  { icon: 'gear', color: '#666', label: '账户安全', path: '/pages/security' },
  { icon: 'notification', color: '#666', label: '消息通知', path: '/pages/notify' },
  { icon: 'clear', color: '#666', label: '清理缓存', action: 'clearCache' }
])


const touchStart = () => {
  isTouching.value = true
  cardScale.transform = 'scale(0.98)'
}

const touchEnd = () => {
  isTouching.value = false
  cardScale.transform = 'scale(1)'
}

const handleSetting = (item: any) => {
  if(!meta.value.isLoggedin&&!item.path.includes('about_us')){
  	uni.navigateTo({url:urlLogIn})
  }
  else if (item.path) {
    uni.navigateTo({ url: item.path })
  } else if (item.action === 'clearCache') {
    uni.showModal({
      title: '提示',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          // 执行清除缓存逻辑
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  padding: 24rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.mymessage-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);

  .headimg {
    width: 145rpx;
    height: 145rpx;
    border-radius: 35rpx;
    margin-right: 32rpx;
    border: 2rpx solid #f0f0f0;
  }

  .info-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .nickname {
      font-size: 36rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 12rpx;
    }

    .uid {
	  margin-top: 10rpx;
      font-size: 25rpx;
      color: #999;
    }
  }

  .arrow-icon {
    margin-left: auto;
  }
}


.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 0 24rpx;
  margin-bottom: 12rpx;
  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #eee;
  }

  .list {
    .list-item {
      padding: 32rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .item-left {
        display: flex;
        align-items: center;

        .item-label {
          font-size: 30rpx;
          color: #333;
          margin-left: 24rpx;
        }
      }
    }
  }
}

</style>