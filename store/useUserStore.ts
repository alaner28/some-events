import { defineStore } from 'pinia'
interface User{
	uid:string
	username:string
	nickname:string
	email:string
	avatar:string//头像
	phone?:string
	gender:'男'|'女'|'unknown'
	address?:string
	createdAt:Date
	lastLogin?:Date
}
export const useUserStore=defineStore('user',{
	state:()=>({
		currentUser:null as User | null,//创建一个对象实例
		defaultAvatars:'/static/OIP-C.jpg',
		//用户状态元数据
		meta:{
			isLoggedin:false,
			tokenExpiresAt:0//token过期时间戳
		}
	}),
	
	getters:{
		displayName(state):string{
			return state.currentUser?.username||'未登录用户'
		},
		formattedJoinDate(state):string{
			if(!state.currentUser)return ''
			return new Date(state.currentUser.createdAt).toLocaleDateString('zh-CN')
		},
		
		getDefaltAvatar(state):string{
			return state.defaultAvatars
		}	
	},
	
	actions:{
		async initializeUser(){
			try{
				const token=uni.getStorageSync('token')//读取本地保存的登录凭证
				if(token){
					//获得新数据
					const user=await this.fetchUserProfile()
					//替换数据
					this.setUser(user)//更新用户状态
				}
			}catch(error){
				console.error('用户初始化失败:',error)
			}
		},
		
		//获取用户资料
		async fetchUserProfile():Promise<User>{
			const response:any =await uni.request({
				url:'',
				method:'GET'
			})
			if(response.statusCode!==200){
				throw new Error('获取用户信息失败')
			}
			return {
				...response.data,
				createdAt: new Date(response.data.createdAt),
				lastLogin: new Date(response.data.lastLogin)
			}
		},
		//替换新的 userprofile
		setUser(userData:User){
			this.currentUser={
				...userData,
				avatar:userData.avatar||this.getDefaltAvatar
			}
			this.meta.isLoggedIn=true
			//同步到本地存储
			uni.setStorageSync('userData',JSON.stringify(userData))
		},
		
		
		updateUserProfile(partialData: Partial<User>) {
			if (!this.currentUser) return
		  
			this.currentUser = {
				...this.currentUser,
				...partialData
			}
			uni.setStorageSync('userData', JSON.stringify(this.currentUser))
		},
		clearUser() {
			this.currentUser = null
			this.meta.isLoggedIn = false
			uni.removeStorageSync('token')
			uni.removeStorageSync('userData')
		}
	}
}
)