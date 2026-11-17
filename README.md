# 乾了嗎？口乾衛教小站

> 口乾症患者的交流空間 — 提供經醫師審核的衛教卡片，涵蓋症狀緩解、飲食建議、用藥照護、就醫指引、生活調適

## 專案簡介
靜態網站，採資料驅動架構：`content/*.json` 為單一真相來源，經 `build.js` 產生 `dist/*.html`，部署至 GitHub Pages。每篇卡片遵循 AGENTS.md 規範，包含固定欄位、來源可查證、具體可執行建議。

## 線上瀏覽
- **GitHub Pages**：https://lijenhsin.github.io/dry-mouth-edu/
- **GitHub Repo**：https://github.com/lijenhsin/dry-mouth-edu

## 快速開始

### 安裝依賴
```bash
npm install
```

### 本機開發
```bash
npm run preview
# 或分步：npm run build && npx serve dist
```

### 新增卡片
1. 複製 `content/dry-mouth-3-tips.json` 為新檔 `content/<slug>.json`
2. 依 AGENTS.md 規範填寫所有必填欄位
3. 準備圖片放入 `assets/<slug>-1.webp`
4. `npm run build` 產生靜態頁
5. `npm run dev` 本機預覽確認無誤
6. `git add . && git commit -m "Add: <標題>" && git push`

## 專案結構
```
dry-mouth-edu/
├── AGENTS.md              # 員工手冊：內容規範、新增流程、風格指南
├── build.js               # 靜態站點產生器
├── package.json
├── styles.css             # 樣式表（支援深色模式、列印樣式）
├── app.js                 # 互動腳本（分類摺疊、回到頂端、深色模式切換）
├── content/               # 卡片資料（JSON，單一真相來源）
│   ├── dry-mouth-3-tips.json
│   ├── diet-soft-food.json
│   ├── medication-saliva-substitute.json
│   ├── when-to-see-doctor.json
│   └── lifestyle-habits.json
├── assets/                # 圖片資源
│   ├── *.webp
│   └── placeholder.svg
└── dist/                  # 建置產出（GitHub Pages 部署目標）
    ├── index.html
    ├── *.html
    ├── styles.css
    ├── app.js
    └── assets/
```

## 卡片欄位規範（摘要）
| 欄位 | 必填 | 說明 |
|------|------|------|
| title, summary, category | ✅ | 標題、摘要、五大分類之一 |
| keyPoints, actionItems | ✅ | 重點條列、至少 1 項可執行建議 |
| references | ✅ | 來源陣列，含 type（guideline/paper/expert） |
| reviewedBy, reviewedAt | ✅ | 審核醫師、審核日期 |
| updatedAt, slug | ✅ | 更新日期、URL 識別碼 |
| tags, image | ❌ | 標籤、卡片圖片 |

## 部署至 GitHub Pages
1. GitHub 建立新 repo `dry-mouth-edu`
2. 本機推送：
   ```bash
   git init
   git add .
   git commit -m "Week 9 作業：AGENTS.md + 靜態站點"
   git branch -M main
   git remote add origin https://github.com/你的帳號/dry-mouth-edu.git
   git push -u origin main
   ```
3. Repo Settings → Pages → Source: `main` / `(root)` → Save
4. 等待幾十秒，網站即上線

## 授權
MIT License — 歡迎 Fork、貢獻、改作為其他衛教主題站點。

## 致謝
- 參考範例：呆一布講義 https://diveai-lab.github.io/diveai-lessons/
- 課程：生成式 AI 應用實務（第九堂・換你當老闆：Agentic Work 與 AI 工作現場）
- 員工手冊：AGENTS.md 讓 AI 也能依規範持續維護本站
