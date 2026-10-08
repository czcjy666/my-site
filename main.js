/* =========================================================
   只做三件事：截图缺失降级、导航描边、占位链接不跳转。
   没有装饰性动效，没有外部依赖。
   ========================================================= */
(function () {
  "use strict";

  /* 截图缺失时露出占位框：把图放进 assets/shots/ 对应文件名即自动显示 */
  function shotFallback() {
    var shots = document.querySelectorAll(".shot");
    Array.prototype.forEach.call(shots, function (figure) {
      var img = figure.querySelector("img");
      if (!img) return;
      var missing = function () { figure.classList.add("is-missing"); };
      if (img.complete) {
        if (!img.naturalWidth) missing();
        return;
      }
      img.addEventListener("error", missing);
    });
  }

  /* 滚动后给导航加一条发丝线 */
  function navBorder() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var update = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* 待填链接不跳转 */
  function placeholders() {
    var links = document.querySelectorAll("a[data-placeholder]");
    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); });
    });
  }

  function init() {
    shotFallback();
    navBorder();
    placeholders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
