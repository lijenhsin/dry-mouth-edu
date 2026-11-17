#!/usr/bin/env node
// 靜態站點產生器：讀取 content/*.json → 產生 dist/*.html

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = 'content';
const ASSETS_DIR = 'assets';
const DIST_DIR = 'dist';
const TEMPLATE_FILE = 'template.html';
const INDEX_TEMPLATE = 'index-template.html';

const CATEGORIES = [
  '症狀緩解',
  '飲食建議',
  '用藥照護',
  '就醫指引',
  '生活調適'
];

function readContentFiles() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
  return files.map(f => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8');
    return JSON.parse(raw);
  });
}

function renderCard(item, isIndex = false) {
  const img = item.image ? `<img src="../${item.image}" alt="" class="card-img">` : '';
  const tags = item.tags ? item.tags.map(t => `<span class="tag">${t}</span>`).join('') : '';
  const refs = item.references.map(r => 
    `<a href="${r.url}" target="_blank" rel="noopener" class="ref-${r.type}">${r.title}</a>`
  ).join(' · ');
  
  return `
  <article class="card" data-category="${item.category}">
    ${img}
    <div class="card-body">
      <div class="card-meta">
        <span class="category">${item.category}</span>
        <time datetime="${item.updatedAt}">${item.updatedAt}</time>
      </div>
      <h2 class="card-title"><a href="${item.slug}.html">${item.title}</a></h2>
      <p class="card-summary">${item.summary}</p>
      <div class="card-tags">${tags}</div>
      <div class="card-actions">
        <a href="${item.slug}.html" class="btn">閱讀全文</a>
      </div>
    </div>
  </article>`;
}

function renderDetailPage(item) {
  const img = item.image ? `<img src="../${item.image}" alt="${item.title}" class="detail-img">` : '';
  const keyPoints = item.keyPoints.map(p => `<li>${p}</li>`).join('');
  const actions = item.actionItems.map(a => `<li>${a}</li>`).join('');
  const refs = item.references.map(r => 
    `<li><a href="${r.url}" target="_blank" rel="noopener" class="ref-${r.type}">[${r.type}] ${r.title}</a></li>`
  ).join('');
  
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${item.title} | 乾了嗎？口乾衛教小站</title>
  <meta name="description" content="${item.summary}">
  <link rel="stylesheet" href="../styles.css">
  <link rel="canonical" href="https://your-domain.github.io/dry-mouth-edu/${item.slug}.html">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="../index.html" class="logo">💧 乾了嗎？口乾衛教小站</a>
      <nav><a href="../index.html">首頁</a> <a href="../index.html#categories">分類</a></nav>
    </div>
  </header>
  <main class="container">
    <article class="detail">
      <header class="detail-header">
        <span class="category">${item.category}</span>
        <h1>${item.title}</h1>
        <div class="detail-meta">
          <span>審核：${item.reviewedBy}</span>
          <span>審核日期：${item.reviewedAt}</span>
          <span>更新：${item.updatedAt}</span>
        </div>
      </header>
      ${img}
      <div class="detail-content">
        <section class="summary-box"><p>${item.summary}</p></section>
        <section>
          <h2>🔑 重點整理</h2>
          <ul class="key-points">${keyPoints}</ul>
        </section>
        <section>
          <h2>✅ 你可以這樣做</h2>
          <ul class="action-items">${actions}</ul>
        </section>
        <section>
          <h2>📚 參考來源</h2>
          <ul class="references">${refs}</ul>
        </section>
      </div>
      <footer class="disclaimer">
        <p>⚠️ 本內容僅供衛教參考，不替代專業醫療建議。請諮詢您的醫師或藥師以獲得個人化照護方案。</p>
      </footer>
      <nav class="detail-nav">
        <a href="../index.html" class="btn">← 回首頁</a>
      </nav>
    </article>
  </main>
  <footer class="site-footer">
    <div class="container">
      <p>© 2026 乾了嗎？口乾衛教小站 | 以 AGENTS.md 為員工手冊持續維護</p>
    </div>
  </footer>
</body></html>`;
}

function renderIndexPage(items) {
  const byCategory = {};
  CATEGORIES.forEach(c => byCategory[c] = items.filter(i => i.category === c));
  
  const categorySections = CATEGORIES.map(cat => {
    const catItems = byCategory[cat];
    if (catItems.length === 0) return '';
    return `
    <section id="cat-${cat}" class="category-section">
      <h2>${cat} <span class="count">(${catItems.length})</span></h2>
      <div class="card-grid">${catItems.map(renderCard).join('')}</div>
    </section>`;
  }).join('');

  const allCards = items.map(renderCard).join('');

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>乾了嗎？口乾衛教小站 | 口乾症患者的交流空間</title>
  <meta name="description" content="提供口乾症患者可信的衛教資訊與交流空間，涵蓋症狀緩解、飲食建議、用藥照護、就醫指引、生活調適">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="logo">💧 乾了嗎？口乾衛教小站</a>
      <p class="tagline">口乾症患者的交流空間</p>
      <nav><a href="#categories">分類瀏覽</a> <a href="https://github.com/your-username/dry-mouth-edu" target="_blank" rel="noopener">GitHub</a></nav>
    </div>
  </header>
  <main class="container">
    <section class="hero">
      <h1>口乾不只「喝水」就好</h1>
      <p>這裡蒐集經醫師審核的衛教卡片，幫你找到適合自己的緩解方式。每篇卡片都有具體可執行的建議與可查證的來源。</p>
      <a href="#categories" class="btn btn-primary">開始瀏覽分類</a>
    </section>
    <section id="categories" class="categories">${categorySections}</section>
    <section class="all-cards-section">
      <h2>所有卡片</h2>
      <div class="card-grid">${allCards}</div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container">
      <p>© 2026 乾了嗎？口乾衛教小站 | <a href="https://github.com/your-username/dry-mouth-edu" target="_blank">原始碼</a> | 以 AGENTS.md 為員工手冊持續維護</p>
    </div>
  </footer>
  <script src="app.js"></script>
</body></html>`;
}

function copyAssets() {
  if (fs.existsSync(ASSETS_DIR)) {
    fs.cpSync(ASSETS_DIR, path.join(DIST_DIR, ASSETS_DIR), { recursive: true });
  }
}

function main() {
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
  
  const items = readContentFiles();
  items.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  // 產生首頁
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), renderIndexPage(items));
  
  // 產生詳細頁
  items.forEach(item => {
    fs.writeFileSync(path.join(DIST_DIR, `${item.slug}.html`), renderDetailPage(item));
  });
  
  // 複製樣式與腳本
  ['styles.css', 'app.js'].forEach(f => {
    if (fs.existsSync(f)) fs.copyFileSync(f, path.join(DIST_DIR, f));
  });
  
  copyAssets();
  
  console.log(`✅ 建置完成：${items.length} 篇卡片 → ${DIST_DIR}/`);
}

main();