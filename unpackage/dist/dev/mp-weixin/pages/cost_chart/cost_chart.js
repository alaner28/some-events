"use strict";
const common_vendor = require("../../common/vendor.js");
const store_useCountStore = require("../../store/useCountStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cost_chart",
  setup(__props) {
    let counterStore = store_useCountStore.useCounterStore();
    common_vendor.index.__f__("log", "at pages/cost_chart/cost_chart.vue:11", counterStore.count);
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8322792d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cost_chart/cost_chart.js.map
