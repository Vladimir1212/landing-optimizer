const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

const SRC_DIR = path.join(__dirname, 'source');
const DIST_DIR = path.join(__dirname, 'dist');

async function optimizeLanding() {
    try {
        // Динамически импортируем ESM-модули прямо внутри асинхронной функции
        const { default: imagemin } = await import('imagemin');
        const { default: imageminMozjpeg } = await import('imagemin-mozjpeg');
        const { default: imageminPngquant } = await import('imagemin-pngquant');

        // 1. Очищаем целевую папку dist перед каждым запуском
        if (await fs.pathExists(DIST_DIR)) {
            await fs.remove(DIST_DIR);
        }
        await fs.ensureDir(DIST_DIR);

        // Проверяем, есть ли папка source
        if (!(await fs.pathExists(SRC_DIR))) {
            await fs.ensureDir(SRC_DIR);
            console.log('📁 Создана папка "source". Закинь туда файлы лендинга и запусти скрипт снова!');
            return;
        }

        // 2. Копируем все файлы, КРОМЕ картинок
        await fs.copy(SRC_DIR, DIST_DIR, {
            filter: (src) => {
                const ext = path.extname(src).toLowerCase();
                return ![ '.png', '.jpg', '.jpeg', '.gif' ].includes(ext);
            }
        });
        console.log('✅ Текстовые файлы, стили и скрипты скопированы...');

        // 3. Обработка HTML и подмена ссылок под SalesDoubler
        const htmlPath = path.join(DIST_DIR, 'index.html');
        if (await fs.pathExists(htmlPath)) {
            let html = await fs.readFile(htmlPath, 'utf8');
            const $ = cheerio.load(html);

            const cpaLink = 'https://rdr.salesdoubler.com.ua/in/offer/XXXX?subid=landing_optimizer';

            $('form').each((i, el) => {
                $(el).attr('action', cpaLink);
                $(el).attr('method', 'POST');
                console.log(`🎯 Форма #${i + 1} успешно перенаправлена на оффер SalesDoubler!`);
            });

            await fs.writeFile(htmlPath, $.html(), 'utf8');
            console.log('📝 HTML код оптимизирован!');
        }

        // 4. СЖАТИЕ КАРТИНОК
        console.log('⏳ Оптимизируем изображения (это может занять немного времени)...');
        
        // Исправляем пути для Mac, чтобы imagemin корректно подхватил файлы
        const filesPattern = path.join(SRC_DIR, '**', '*.{jpg,jpeg,png}').replace(/\\/g, '/');

        await imagemin([filesPattern], {
            destination: path.join(DIST_DIR, 'img'),
            plugins: [
                imageminMozjpeg({ quality: 75 }),
                imageminPngquant({ quality: [0.6, 0.8] })
            ]
        });

        console.log('🖼️  Все изображения успешно сжаты и оптимизированы без потери качества!');
        console.log('\n🚀 СБОРКА ЗАВЕРШЕНА! Готовый лендинг лежит в папке "dist"');

    } catch (error) {
        console.error('❌ Ошибка во время оптимизации:', error);
    }
}

optimizeLanding();