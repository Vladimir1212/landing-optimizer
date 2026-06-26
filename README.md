# 🚀 Node.js Landing Optimizer & CPA-Automator

Консольная утилита (CLI) на Node.js для автоматической подготовки, оптимизации и кастомизации партнерских (CPA/Affiliate) лендингов перед запуском трафика. 

## 🛠️ Что делает этот скрипт?

1. **CPA Integration:** Автоматически парсит HTML-код лендинга, находит все лид-формы (`<form>`) и бесшовно подменяет их атрибуты `action` и `method` на твою реферальную ссылку (например, SalesDoubler, Everad и др.).
2. **Image Optimization:** Проводит глубокое асинхронное сжатие изображений (`.png`, `.jpg`, `.jpeg`) без визуальной потери качества с помощью плагинов `imagemin-mozjpeg` и `imagemin-pngquant`. Это критически снижает вес страницы и поднимает ROI за счет мгновенной загрузки на мобильных устройствах.
3. **Asset Build:** Очищает рабочую среду, копирует стили, скрипты и структуру проекта, выдавая на выходе готовую к деплою папку `dist`.

---

## 💻 Технологический стек

* **Runtime:** Node.js (v17+)
* **HTML Parsing / DOM Manipulation:** Cheerio (jQuery-like синтаксис для бэкенда)
* **Image Compression:** Imagemin (MozJPEG / Pngquant)
* **File System:** FS-Extra (продвинутая асинхронная работа с директориями)
* **Architecture:** Асинхронный JavaScript (ESM Dynamic Imports в CommonJS среде)

---

## ⚙️ Инструкция по запуску

1. Склонируйте репозиторий и установите зависимости:
   ```bash
   git clone [https://github.com/Vladimir1212/landing-optimizer.git](https://github.com/Vladimir1212/landing-optimizer.git)
   cd landing-optimizer
   npm install
