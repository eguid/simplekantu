/* 简单看图官网 · 交互脚本（无依赖、无统计、无第三方资源） */
(function () {
  'use strict';

  /* ---------------- 顶栏滚动状态 ---------------- */
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- 移动端导航 ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobileNav');

  function setNav(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    mobileNav.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    header.classList.toggle('is-open', open);
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      setNav(mobileNav.hidden);
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNav(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobileNav.hidden) setNav(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && !mobileNav.hidden) setNav(false);
    });
  }

  /* ---------------- 滚动揭示 ---------------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 同一组内的元素依次入场
  document.querySelectorAll('.pillars, .scenarios-grid, .download-grid, .log-list').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, index) {
      if (child.classList.contains('reveal')) {
        child.style.transitionDelay = Math.min(index * 60, 300) + 'ms';
      }
    });
  });

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealItems.forEach(function (el) {
      el.classList.add('is-in');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
  );

  revealItems.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------------- 版权年份 ---------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
