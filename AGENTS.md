# AGENTS.md - 乾了嗎？口乾衛教小站 員工手冊

## 專案目的
建立一個靜態網站，提供口乾症患者可信的衛教資訊與交流空間。每篇文章採固定卡片格式，內容經醫師審核，支援持續新增主題。

## 核心規則

### 1. 內容原則
- **醫療準確性優先**：所有衛教內容需標註來源（指南、文獻、醫師建議），嚴禁臆測
- **病人視角**：用淺顯白話文，避免專業術語堆砌
- **可行動**：每篇卡片至少提供 1 個具體可執行的建議

### 2. 頁面結構（固定欄位）
每篇卡片必須包含：

| 欄位 | 說明 | 必填 |
|------|------|------|
| `title` | 主標題（如：口乾怎麼辦？3 招日常緩解） | ✅ |
| `summary` | 一句話摘要（< 160 字，用於列表預覽） | ✅ |
| `category` | 分類：`症狀緩解`、`飲食建議`、`用藥照護`、`就醫指引`、`生活調適` | ✅ |
| `keyPoints` | 3-5 項重點條列 | ✅ |
| `actionItems` | 至少 1 項具體可執行建議 | ✅ |
| `references` | 來源陣列：`[{title, url, type}]`，type 為 `guideline`/`paper`/`expert` | ✅ |
| `reviewedBy` | 審核醫師姓名/單位 | ✅ |
| `reviewedAt` | 審核日期（YYYY-MM-DD） | ✅ |
| `updatedAt` | 最後更新日期（YYYY-MM-DD） | ✅ |
| `slug` | URL 友善識別碼（kebab-case，如 `dry-mouth-3-tips`） | ✅ |
| `tags` | 標籤陣列（選填） | ❌ |
| `image` | 卡片圖片路徑（相對 `assets/`） | ❌ |

### 3. 命名規範
- 檔案：`content/<slug>.json`（資料分離，靜態站點產生時讀取）
- 圖片：`assets/<slug>-<序號>.webp`（優先 WebP，寬度 ≤ 800px）
- 分類頁：自動由產生腳本依 `category` 聚合

### 4. 新增流程（給 AI/人類）
1. 決定主題 → 檢查現有 `content/` 是否重複
2. 建立 `content/<slug>.json` 依照上述結構填寫
3. 準備圖片 → 放入 `assets/`，檔名對應 slug
4. 執行 `npm run build` 產生靜態頁面
5. 本機 `npx serve dist` 預覽無誤
6. `git add . && git commit -m "Add: <title>" && git push`

### 5. 風格指南
- 標題：口語化、具體、含數字（如「3 招」、「5 分鐘」）
- 正文：短段落、項目符號、關鍵字**粗體**
- 語氣：陪伴、鼓勵、不焦慮
- 免責聲明：每頁頁尾自動附加「本內容僅供參考，請諮詢醫師」

### 6. 技術棧
- 純靜態：HTML + CSS + Vanilla JS（無框架，易維護、GitHub Pages 原生支援）
- 資料驅動：`content/*.json` → `build.js` → `dist/*.html`
- 樣式：CSS 變數、響應式、深色模式支援

## 給 AI 的指令
- **新增內容時**：嚴格遵循 JSON Schema，缺欄位直接報錯
- **修改現有卡片**：保留 `reviewedBy`、`reviewedAt`，只更新 `updatedAt` 與內容欄位
- **重構時**：不得改動 `content/` 結構，僅調整產生邏輯或樣式
- **圖片處理**：若無現成圖，建議用佔位圖或建議使用者提供，勿自行生成醫療示意圖

## 部署
- `main` 分支 → GitHub Pages（`/docs` 或 `root`）
- 自訂網域：可於 `CNAME` 設定
- 更新頻率：視內容新增而定，CI 可選用 GitHub Actions 自動建置