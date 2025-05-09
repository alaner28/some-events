<template>
	<view class="main-container">
		
	</view>
</template>

<script setup lang='ts'>
	import { useCounterStore } from '../../store/useCountStore';
	import { ref,reactive } from 'vue'
	let counterStore = useCounterStore();
	console.log(counterStore.count)
</script>

<style lang="scss" scoped>
.main-container {
  padding: 24rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
  
}
</style>