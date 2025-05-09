"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "profileset",
  setup(__props) {
    const userStore = useUserStore();
    storeToRefs(userStore);
    storeToRefs(userStore);
    const messages = common_vendor.ref([
      { label: "头像", path: "", content: "" },
      { label: "昵称", path: "", content: "" },
      { label: "uid", path: "", content: "" },
      { label: "姓名", path: "", content: "" },
      { label: "性别", path: "", content: "" },
      { label: "地址", path: "", content: "" }
    ]);
    const handleSetting = (item) => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index,
            c: common_vendor.o(($event) => handleSetting(), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32d6ed29"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profileset/profileset.js.map
