"use strict";
const common_vendor = require("../../common/vendor.js");
const store_useUserStore = require("../../store/useUserStore.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "main_profile",
  setup(__props) {
    const userStore = store_useUserStore.useUserStore();
    common_vendor.storeToRefs(userStore);
    common_vendor.storeToRefs(userStore);
    const headimgpth = common_vendor.ref("/static/OIP-C.jpg");
    const nickname = common_vendor.ref("点击登录");
    const uid = common_vendor.ref(null);
    const isTouching = common_vendor.ref(false);
    const cardScale = common_vendor.reactive({
      transform: "scale(1)",
      transition: "transform 0.1s ease"
    });
    const services = common_vendor.reactive([
      { icon: "location", color: "#4caf50", label: "123", path: "" },
      { icon: "help", color: "#2196f3", label: "帮助中心", path: "" }
    ]);
    const settings = common_vendor.reactive([
      { icon: "gear", color: "#666", label: "账户安全", path: "/pages/security" },
      { icon: "notification", color: "#666", label: "消息通知", path: "/pages/notify" },
      { icon: "clear", color: "#666", label: "清理缓存", action: "clearCache" }
    ]);
    const topage = (url) => {
      common_vendor.index.navigateTo({ url });
    };
    const touchStart = () => {
      isTouching.value = true;
      cardScale.transform = "scale(0.98)";
    };
    const touchEnd = () => {
      isTouching.value = false;
      cardScale.transform = "scale(1)";
    };
    const handleSetting = (item) => {
      if (item.path) {
        common_vendor.index.navigateTo({ url: item.path });
      } else if (item.action === "clearCache") {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定要清除缓存吗？",
          success: (res) => {
            if (res.confirm)
              ;
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: headimgpth.value,
        b: common_vendor.t(nickname.value),
        c: common_vendor.t(uid.value || "--"),
        d: common_vendor.p({
          type: "forward",
          size: "20",
          color: "#999"
        }),
        e: common_vendor.o(($event) => topage("/pages/profileset/profileset")),
        f: common_vendor.o(touchStart),
        g: common_vendor.o(touchEnd),
        h: common_vendor.s(cardScale),
        i: common_vendor.f(services, (item, index, i0) => {
          return {
            a: "0f478f7e-1-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "20",
              color: item.color
            }),
            c: common_vendor.t(item.label),
            d: "0f478f7e-2-" + i0,
            e: index,
            f: common_vendor.o(($event) => handleSetting(item), index)
          };
        }),
        j: common_vendor.p({
          type: "forward",
          size: "16",
          color: "#ccc"
        }),
        k: common_vendor.f(settings, (item, index, i0) => {
          return {
            a: "0f478f7e-3-" + i0,
            b: common_vendor.p({
              type: item.icon,
              size: "20",
              color: item.color
            }),
            c: common_vendor.t(item.label),
            d: "0f478f7e-4-" + i0,
            e: index,
            f: common_vendor.o(($event) => handleSetting(item), index)
          };
        }),
        l: common_vendor.p({
          type: "forward",
          size: "16",
          color: "#ccc"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f478f7e"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/main_profile/main_profile.js.map
