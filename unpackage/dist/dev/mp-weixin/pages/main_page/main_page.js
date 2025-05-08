"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_uni_icons = common_vendor.resolveComponent("uni-icons");
  _component_uni_icons();
}
const _sfc_main = {
  __name: "main_page",
  setup(__props) {
    const topage = (url) => {
      if (url.includes("main_page") || url.includes("main_profile")) {
        common_vendor.index.switchTab({ url });
      } else {
        common_vendor.index.navigateTo({ url });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "pie-chart",
          size: "40",
          color: "#1890FF"
        }),
        b: common_vendor.o(($event) => topage("/pages/cost_chart/cost_chart")),
        c: common_vendor.p({
          type: "bell",
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
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/main_page/main_page.js.map
