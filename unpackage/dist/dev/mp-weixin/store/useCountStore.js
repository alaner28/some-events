"use strict";
const common_vendor = require("../common/vendor.js");
const useCounterStore = common_vendor.defineStore("counter", {
  // 推荐使用箭头函数保持类型推断
  state: () => ({
    count: 0,
    user: null
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    },
    async fetchUser() {
      const res = await api.getUser();
      this.user = res.data;
    }
  }
});
exports.useCounterStore = useCounterStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/useCountStore.js.map
