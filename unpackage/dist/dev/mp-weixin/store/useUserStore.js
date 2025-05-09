"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore(
  "user",
  {
    state: () => ({
      currentUser: null,
      //创建一个对象实例
      defaultAvatars: "/static/OIP-c.jpg",
      //用户状态元数据
      meta: {
        isLoggedin: false,
        tokenExpiresAt: 0
        //token过期时间戳
      }
    }),
    getters: {
      displayName(state) {
        var _a;
        return ((_a = state.currentUser) == null ? void 0 : _a.username) || "未登录用户";
      },
      formattedJoinDate(state) {
        if (!state.currentUser)
          return "";
        return new Date(state.currentUser.createdAt).toLocaleDateString("zh-CN");
      },
      getDefaltAvatar(state) {
        return state.defaultAvatars;
      }
    },
    actions: {
      async initializeUser() {
        try {
          const token = common_vendor.index.getStorageSync("token");
          if (token) {
            const user = await this.fetchUserProfile();
            this.setUser(user);
          }
        } catch (error) {
          common_vendor.index.__f__("error", "at store/useUserStore.ts:50", "用户初始化失败:", error);
        }
      },
      //获取用户资料
      async fetchUserProfile() {
        const response = await common_vendor.index.request({
          url: "",
          method: "GET"
        });
        if (response.statusCode !== 200) {
          throw new Error("获取用户信息失败");
        }
        return {
          ...response.data,
          createdAt: new Date(response.data.createdAt),
          lastLogin: new Date(response.data.lastLogin)
        };
      },
      //替换新的 userprofile
      setUser(userData) {
        this.currentUser = {
          ...userData,
          avatar: userData.avatar || this.getDefaltAvatar
        };
        this.meta.isLoggedIn = true;
        common_vendor.index.setStorageSync("userData", JSON.stringify(userData));
      },
      updateUserProfile(partialData) {
        if (!this.currentUser)
          return;
        this.currentUser = {
          ...this.currentUser,
          ...partialData
        };
        common_vendor.index.setStorageSync("userData", JSON.stringify(this.currentUser));
      },
      clearUser() {
        this.currentUser = null;
        this.meta.isLoggedIn = false;
        common_vendor.index.removeStorageSync("token");
        common_vendor.index.removeStorageSync("userData");
      }
    }
  }
);
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/useUserStore.js.map
