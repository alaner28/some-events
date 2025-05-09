<template>
	<view class="main-container">
		<view class="section">
		  <view class="list">
			  
		    <view class="list-item">
			  <text>头像</text>
				<view class="input-wrapper">
					
				</view>
			</view>
			
			<view class="list-item">
			  <view class="input-wrapper">
				<text>昵称</text><input type="text" v-model="nickname"/>
			  </view>
			</view>
			<view class="list-item"><text>UID</text>
			  <view class="input-wrapper">
			    <text type="text">{{uid}}</text>
			  </view>
			</view>
			<view class="list-item">
			  <view class="input-wrapper">
				<text>姓名</text><input type="text" v-model="name"/>
			  </view>
			</view>
			<view class="list-item">
			  <view class="input-wrapper">
			    <text>性别</text><input type="text" v-model="sex"/>
			  </view>
			</view>
			<view class="list-item">
			  <view class="input-wrapper">
			    <text>地址</text><input type="text" v-model="address"/>
			  </view>
			</view>
			<view class="list-item save-button">
			  <button 
				class="save-btn" 
				@click="saveData"
				:disabled="!isFormChanged"
			  >
				保存修改
			  </button>
			</view>
		  </view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {onMounted,computed,ref,reactive} from "vue";
	import uniIconsVue from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
	import { storeToRefs } from 'pinia'
	import { useUserStore } from '../../store/useUserStore'
	
	const userStore = useUserStore()
	const { displayName, formattedJoinDate } = storeToRefs(userStore)
	const { currentUser, defaultAvatars, meta } = storeToRefs(userStore)
	
	let nickname=ref("未登录状态")
	let uid=ref("")
	let headimgpth=ref(defaultAvatars.value)
	let sex=ref('')
	let name=ref("")
	let address=ref("")
	
	const originalData = reactive({
	  nickname: '',
	  sex: '',
	  name: '',
	  address: ''
	});
	const isFormChanged = computed(() => {
	  return nickname.value !== originalData.nickname ||
	         sex.value !== originalData.sex ||
	         name.value !== originalData.name ||
	         address.value !== originalData.address;
	});

	onMounted(()=>{
		if(currentUser){
			nickname.value=currentUser.value.nickname
			uid.value=currentUser.value.uid
			headimgpth.value=defaultAvatars.value
			sex.value=currentUser.value.gender
			name.value=currentUser.value.username
			address.value=currentUser.value.address
			
			originalData.nickname = currentUser.value.nickname;
			originalData.sex = currentUser.value.gender;
			originalData.name = currentUser.value.username;
			originalData.address = currentUser.value.address;
			console.log(originalData)
			console.log("update successfully")
		}
	})
	
	
	const saveData = async () => {
	  if(!meta.value.isLoggedin){
		  uni.showToast({
		    title: '请登录',
		    icon: 'error',
		    duration: 2000
		  });
		  return;
	  }
	  if(sex.value!=='男'&&sex.value!=='女'){
		  uni.showToast({
		    title: '请选择正确性别',
		    icon: 'error',
		    duration: 2000
		  });
		  return;
	  }
	  try {
	    const updateParams = {
	      nickname: nickname.value,
	      sex: sex.value,
	      username: name.value,
	      address: address.value
	    };
	
	    // 调用store的更新方法
	    userStore.updateUserProfile(updateParams);
	    
	    uni.showToast({
	      title: '保存成功',
	      icon: 'success',
	      duration: 2000
	    });
		
	// 更新原始数据
		Object.assign(originalData, updateParams);
	  } catch (error) {
		uni.showToast({
		  title: '保存失败',
		  icon: 'error',
		  duration: 2000
		});
		console.error('保存失败:', error);
	  }
	};
		
	
	function listen(){
		console.log(currentUser);
	}
</script>

<style lang="scss" scoped>
.main-container {
  padding: 24rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
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
      padding: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1rpx solid #eee;

      &:last-child {
        border-bottom: none;
      }
      
    }
  }
  input {
	flex: 1;
	text-align: right; // 文本右对齐
	padding-left: 20rpx; // 避免文字贴边
	font-size: 30rpx;
	color: #333;

	::v-deep .uni-input-input {
	  text-align: right;
	}
	/* H5 */
	&[type="text"] {
	  text-align: right;
    }
  }
  .input-wrapper {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

  .save-button {
    margin-top: 40rpx;
    border-bottom: none !important;
    justify-content: center;
    
    .save-btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      background: #007AFF;
      color: #fff;
      border-radius: 40rpx;
      font-size: 32rpx;
      transition: opacity 0.3s;
  
      &[disabled] {
        background: #ccc;
        opacity: 0.6;
      }
  
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>


