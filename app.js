// 乾了嗎？口乾衛教小站 - 互動腳本
(function() {
  'use strict';

  // 分類篩選
  const categoryButtons = document.querySelectorAll('.category-section h2');
  const cards = document.querySelectorAll('.card');

  categoryButtons.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => {
      const section = btn.closest('.category-section');
      section.classList.toggle('collapsed');
    });
  });

  // 搜尋功能（若未來加入搜尋框）
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(() => {
      const query = searchInput.value.toLowerCase().trim();
      cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const summary = card.querySelector('.card-summary').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
        const match = !query || title.includes(query) || summary.includes(query) || tags.some(t => t.includes(query));
        card.style.display = match ? 'flex' : 'none';
      });
    }, 150));
  }

  // 平滑滾動到分類
  document.querySelectorAll('a[href^="#cat-"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.remove('collapsed');
      }
    });
  });

  // 回到頂端按鈕
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', '回到頂端');
    Object.assign(btn.style, {
      position: 'fixed', bottom: '1.5rem', right: '1.5rem',
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'var(--color-primary)', color: '#fff',
      border: 'none', cursor: 'pointer', opacity: '0',
      visibility: 'hidden', transition: 'all 0.3s',
      zIndex: '1000', boxShadow: 'var(--shadow)', fontSize: '1.25rem'
    });
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    });
    
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 深色模式切換（可選）
  function initThemeToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.innerHTML = '🌓';
    toggle.setAttribute('aria-label', '切換深色模式');
    Object.assign(toggle.style, {
      position: 'fixed', bottom: '1.5rem', left: '1.5rem',
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'var(--color-card)', color: 'var(--color-text)',
      border: '1px solid var(--color-border)', cursor: 'pointer',
      zIndex: '1000', boxShadow: 'var(--shadow)', fontSize: '1.25rem'
    });
    document.body.appendChild(toggle);
    
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }

  // 工具函式
  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initBackToTop();
    initThemeToggle();
    
    // 為卡片添加進場動畫
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.animationDelay = `${i * 0.05}s`;
      observer.observe(card);
    });
  });

  // 動畫關鍵幀（動態注入）
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .category-section.collapsed .card-grid { display: none; }
    .category-section.collapsed h2::after { content: ' ▸'; }
    .category-section h2::after { content: ' ▾'; float: right; transition: transform 0.2s; }
    .category-section.collapsed h2::after { transform: rotate(-90deg); }
    [data-theme="dark"] { --color-bg: #1a1a1a; --color-card: #242424; --color-text: #f0f0f0; --color-text-light: #a0a0a0; --color-border: #3d3d3d; --color-accent: #3d2b1f; --color-disclaimer: #3d2b1f; }
  `;
  document.head.appendChild(style);
})();