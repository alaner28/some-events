"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_useUserStore = require("../../store/useUserStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "main_page",
  setup(__props) {
    const userStore = store_useUserStore.useUserStore();
    common_vendor.storeToRefs(userStore);
    common_vendor.storeToRefs(userStore);
    common_vendor.onMounted(() => {
      userStore.initializeUser();
    });
    const topage = (url) => {
      if (url.includes("main_page") || url.includes("main_profile")) {
        common_vendor.index.switchTab({ url });
      } else {
        common_vendor.index.navigateTo({ url });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => topage("/pages/cost_chart/cost_chart")),
        c: common_vendor.p({
          type: "eye",
          size: "40",
          color: "#FF6A6A"
        }),
        d: common_vendor.o(($event) => topage("/pages/warning_system/warning_system")),
        e: common_vendor.p({
          type: "medal",
          size: "40",
          color: "#52C41A"
        }),
        f: common_vendor.o(($event) => topage("/pages/ai_analysis/ai_analysis"))
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3264d9be"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/main_page/main_page.js.map
