/* =========================================================
   只做两件事：导航滚动加发丝线、待填链接不跳转。
   没有图片、没有依赖、没有装饰性动效。
   ========================================================= */
(function () {
  "use strict";

  function navBorder() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var update = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function placeholders() {
    var links = document.querySelectorAll("a[data-placeholder]");
    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); });
    });
  }

  function init() {
    navBorder();
    placeholders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
