# 📋 ЖУРНАЛ ИЗМЕНЕНИЙ (CHANGELOG) — KASPI.KZ MOBILE APP

В этом файле фиксируются **все** изменения проекта для сохранения непрерывного контекста, фиксации дизайн-решений и защиты от случайного отката правок.

## [2026-10-05 00:30] — Очистка проекта и подготовка к деплою (без изменений UI)

### 🎯 Запрос пользователя:
> *«look at the project and make analyze i think we should clean up folder and get ready for deploy DO NOT BREAK THE PROJECT»*

### 🛠️ Что сделано:
1. **Ничего не удалено безвозвратно** — всё неиспользуемое перенесено в [`_archive/`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/_archive) с сохранением путей (вернуть = переместить обратно). Удалены только регенерируемые `__pycache__/` и `dist/`.
2. **Корень репозитория** → `_archive/`:
   - `screenshots/` — 486 PNG + 2 JPG отладочных скриншотов;
   - `scripts/` — 28 Python-скриптов (извлечение иконок/ассетов из APK);
   - `apk_sources/` — `.apk`, `.apkm`, `.rar`, `jadx-with-jre.zip`, `decompiled/`, `jadx/`, `kaspi_base_res/`, `kaspi_bundle/`, `kaspi_decompiled/` (сюда смотреть за `dimens.xml` и оригинальными ресурсами);
   - `video/` — `IMG_0599.MOV`, `video.mp4`, `video_frames/`;
   - `experiments/` — `test_*.svg/html/txt`, `kaspi_kz_homepage.html`.
   - Папка `icons.need/` **оставлена в корне** — это рабочая папка для новых иконок.
3. **`kaspi-app/src`** → `_archive/kaspi-app-unused/src/`: неимпортируемые компоненты `BankCardSection`, `PromoBanner`, `QrModal`, `RecentTransactions`, `ServicesGrid`, `StoriesCarousel`, `TopHeader`, `TransferModal`, `KaspiIcons`, а также `data/mockData.js`, `App.css`, `devices-icon-red.svg`, `assets/*` (шаблон Vite).
4. **`kaspi-app/public`** → `_archive/kaspi-app-unused/public/`: все файлы, на которые нет ссылок в коде (оставлены 29 используемых ассетов + `favicon.svg`; удалён из сборки неиспользуемый шрифт `call_roboto_flex_kaspi.ttf`). Размер `public/` 19 MB → 6.6 MB, `dist/` → 7.0 MB.
5. **Lint**: удалены только неиспользуемые импорты в `PasscodeScreen`, `ServicesScreen`, `MessagesScreen`, `SettingsScreen`, `DigitalIdScreen`, `HomeScreen` (18 → 9 предупреждений; оставшиеся — неиспользуемые иконки/параметры, не тронуты).
6. **AGENTS.md**: в схеме архитектуры `QrModal.jsx` заменён на фактический `KaspiQrScreen.jsx`.

### ✅ Проверка:
- `npm run build` — успешно; хэши бандлов **идентичны** сборке до очистки (`index-71FZKgRi.js`, `index-CbZ93BOc.css`) → код приложения не изменился.
- `vite preview`: все 29 ассетов, favicon и бандлы отдают HTTP 200.

---

## [2026-10-05 00:15] — Точная калибровка размера b-bar-icon-white.svg под размер цифр бонуса

### 🎯 Запрос пользователя:
> *«bro the C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\b-bar-icon-white.svg is too big it is not the same size with numbers»*

### 🛠️ Что сделано:
1. **Калибровка пропорций и высоты знака `KaspiBonusSymbol` под cap-height цифр**:
   - В бейджах карточек каталога (размер шрифта цифр 13px, фактическая высота цифр ~9.5px): высота SVG уменьшена с `13.5px` до **`9.5px`**. Теперь верхняя черта знака `Б̄` находится на одной высоте с вершинами цифр (`15 597`, `14 640`, `308`), а основание лежит на базовой линии. Знак и цифры стали строго одного визуального размера.
   - В бейджах карусели товаров (размер шрифта цифр 9.5px, высота цифр ~7px): высота SVG уменьшена с `10px` до **`7px`**. Знак `Б̄` идеально совпадает по высоте с цифрами `13 999` и `26 398`.
   - В [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx) значение по умолчанию для `height` установлено в `9.5`.
2. **Проверка**:
   - `npm run build` завершен успешно (370.64 kB, 0 ошибок).
   - Выполнен замер попиксельного рендера в headless Chrome: верхняя и нижняя границы знака `Б̄` точно совпадают с верхней и нижней границами соседних цифр.

---

## [2026-10-05 00:07] — Выравнивание символа Б̄ по базовой линии с цифрами, замена огонька на flame.svg и замена текста «Б» в карточках на b-bar-icon-white.svg

### 🎯 Запрос пользователя:
> *«make the svg with B bonus in the same line with numbers also the flame svg before numbers replace it with trhis C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\flame.svg aslo bellow cards put the instead Б tjis svg C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\b-bar-icon-white.svg»*

### 🛠️ Что сделано:
1. **Калибровка и выравнивание символа Б̄ по базовой линии (Baseline Alignment)**:
   - В [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx) обновлен компонент `KaspiBonusSymbol`:
     - Обрезан пустой отступ снизу viewBox: `viewBox="15.5 10 30.5 48.5"`, чтобы нижний край SVG точно совпадал с нижним краем буквы «Б» (y = 58.5).
     - Контейнеры бейджей переведены на внутреннее выравнивание `display: 'inline-flex', alignItems: 'baseline', gap: '2px'` (или `3px`).
     - Благодаря этому основание буквы «Б» и нижняя линия цифр бонуса (например, «13 999», «15 597») сидят строго на **одной горизонтальной базовой линии**, без малейшего парения буквы в воздухе.
2. **Замена иконки огонька перед цифрами на официальный `flame.svg`**:
   - В [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx) добавлен векторный компонент `KaspiYellowFlame` из [`icons.need/flame.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/flame.svg) с точным аутентичным желтым цветом `#FFD21F`.
   - В [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx) старый круглый эмодзи-огонек в карусели «Вы недавно смотрели» заменен на `KaspiYellowFlame`.
   - Огонек и блок с цифрами сбалансированы через `display: 'inline-flex', alignItems: 'center'`.
3. **Замена текста «Б» на официальный SVG `b-bar-icon-white.svg` в карточках каталога ниже**:
   - В бейджах скидок/бонусов 2-колоночной сетки товаров в [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx) обычный текстовый символ «Б» (например, «15 597 Б», «14 640 Б») заменен на векторный символ `KaspiBonusSymbol` (`b-bar-icon-white.svg`).
   - Для товаров с огоньком (например, кабель с бонусом «308 Б̄») также установлен `KaspiYellowFlame`.
   - Все элементы выровнены строго по базовой линии текста.
4. **Проверка**:
   - `npm run build` выполнен успешно (370.64 kB, 0 ошибок).
   - Сделаны и проверены попиксельные скриншоты в headless Chrome в мобильном разрешении: цифры и символ «Б̄» лежат на одной линии как в карусели, так и в карточках товаров.

---

## [2026-10-04 23:52] — Добавлена сквозная линия после карусели товаров «Вы недавно смотрели»

### 🎯 Запрос пользователя:
> *«after carusel of goods card there should be a line like in the above yellow cards block»*

### 🛠️ Что сделано:
1. **Сквозная серая линия-разделитель (Full Bleed)**:
   - В [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx) между каруселью товаров «Вы недавно смотрели» и строкой трёх красных кнопок фильтров добавлена полноширинная тонкая линия `<div style={{ height: '1px', backgroundColor: '#ECECED', width: '100%' }} />`.
   - Линия идёт строго от края до края без боковых срезов, в точности повторяя стиль линии над блоком с депозитами.
   - Отступы сбалансированы: карусель заканчивается с отступом `16px` снизу, а кнопки фильтров начинаются с отступом `16px` сверху.
2. **Проверка**:
   - `npm run build` выполнен успешно (370.60 kB, 0 ошибок).

---

## [2026-10-04 23:48] — Сквозная линия над депозитами, удаление линии под ними, приближение «Вы недавно смотрели» и калибровка 3 красных кнопок

### 🎯 Запрос пользователя:
> *«look grey line before block with yellow cards shoud be from one side of screen to another with out cut each side and also there should not be a line below those yellow cards and Вы недавно смотрели have to be little closer to those yellow cards but not that close just a little adn also 3 red buttons gotta be with bold outline and they all gotta be same size and the each side gap between borders of screen gotta be the same too»*

### 🛠️ Что сделано:
1. **Сквозная серая линия над депозитами (Full Bleed)**:
   - В [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx) убран боковой отступ `margin: '0 16px'`.
   - Линия теперь растягивается на 100% ширины экрана от одного края мобильного контейнера до другого без обрезки по бокам (`width: '100%'`).
2. **Удаление разделителя под желтыми карточками депозитов**:
   - Полностью удалена серая линия между разделом депозитов и секцией «Вы недавно смотрели».
3. **Оптимизация расстояния до «Вы недавно смотрели»**:
   - Вертикальный отступ между желтыми карточками и заголовком «Вы недавно смотрели» сокращён с 29px до комфортных ~16–18px («чуть ближе, но не слишком близко»), что создаёт цельный нативный визуальный ритм.
4. **3 красные кнопки фильтров («Рекомендации», «Скидки», «Бонусы»)**:
   - **Жирная обводка (Bold Outline)**: толщина рамки увеличена до `2px solid #F14635` со скруглением `18px`.
   - **Одинаковый размер**: кнопки переведены на `flex: 1` — каждая занимает ровно одинаковую треть ширины строки (127.3px на 430px вьюпорте).
   - **Одинаковые отступы до краев экрана**: слева и справа заданы идентичные поля `16px` (`padding: '10px 16px 16px 16px'`), выровненные с общей сеткой экрана.
5. **Проверка**:
   - `npm run build` выполнен успешно (370.52 kB, 0 ошибок).
   - Проверено в браузере с замером метрик: линия сквозная, кнопки равны с точностью до сотых долей пикселя, боковые зазоры равны 16.0px.

---

## [2026-10-04 23:38] — Интеграция 6 официальных SVG-иконок услуг и выравнивание размера и толщины строк под «Штрафы»

### 🎯 Запрос пользователя:
> *«now change the svgs with 1 house-plus.svg 2 house-plus-search.svg 3 person-wallet.svg 4 document-car.svg 5 house-list-check.svg 6 licence-wheel.svg»*
> *«all svg should be same size with штрафы»*

### 🛠️ Что сделано:
1. **Интеграция 6 официальных красных линейных иконок**:
   - `house-plus.svg` (`HousePlusIconRed`) — «Прикрепление к медорганизации».
   - `house-plus-search.svg` (`HousePlusSearchIconRed`) — «Проверка прикрепления к медорганизации».
   - `person-wallet.svg` (`PersonWalletIconRed`) — «Стать самозанятым».
   - `document-car.svg` (`DocumentCarIconRed`) — «Выплата по беременности».
   - `house-list-check.svg` (`HouseListCheckIconRed`) — «Прописка».
   - `licence-wheel.svg` (`LicenceWheelIconRed`) — «Замена водительских прав».
   - Файлы скопированы в [`kaspi-app/public/kaspi_assets/service_icons/`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/public/kaspi_assets/service_icons/) и добавлены как самостоятельные компоненты в [`GovServicesScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/GovServicesScreen.jsx).
2. **Точная калибровка размера и толщины линий под иконку «Штрафы» (`ReceiptIconRed`)**:
   - В исходных 48×48 файлах был избыточный отступ (артборд занимал лишь ~75% площади), из-за чего иконки казались мельче и тоньше «Штрафов».
   - Во всех 6 иконках viewBox подтянут строго под рисунок (`viewBox="3 4 42 40"`, `viewBox="4 3 40 40"` и т.д.), а `strokeWidth` увеличен с 3.0 до **3.6** (соответствует толщине линий чека «Штрафов» ~2.3px).
   - В строках услуг размер рендеринга увеличен до `size={26}`.
   - Теперь все 7 иконок имеют одинаковый физический оптический вес (~24–25px) и идентичную жирность обводки внутри круглых серых плашек 44×44px.
3. **Проверка**:
   - `npm run build` выполнен успешно (370.62 kB, 0 ошибок).

---

## [2026-10-04 23:28] — Точная калибровка пропорций 3D SVG документов до идеала (66×40px)

### 🎯 Запрос пользователя:
> *«bro those three too big now do it in size like betwwen you did before and now got to the ideal point like the orig app ratio matters»*

### 🛠️ Что сделано:
1. **Расчёт точной пропорции оригинала**:
   - На фотографии оригинального приложения Kaspi ширина иконки составляет ровно ~35–38% ширины карточки, а высота — ~33–35% высоты карточки.
   - Размер 80×48px был слегка гипертрофирован, а исходный 58×38px страдал от внутренних полей.
   - Вычислен идеальный промежуточный баланс: **66×40px** (соотношение сторон 1.65, ширина 39.5% карточки 167px, высота 34.8% карточки 115px).
2. **Стили и отступы в [`GovServicesScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/GovServicesScreen.jsx)**:
   - Область SVG: `width: 66px`, `height: 40px`, `top: 13px`, `left: 14px`.
   - Текст названия: `top: 67px`, `left: 14px`, `lineHeight: 19px`.
   - Воздушный зазор между иконкой и текстом: `14px` (идеально по оригиналу).
   - Левый край SVG и первая буква текста остаются на 100% строгой вертикальной линии.
3. **Проверка**:
   - `npm run build` выполнен успешно (368.82 kB).

---

## [2026-10-04 23:25] — Увеличение 3D SVG документов и строгое выравнивание по одной линии с началом текста

### 🎯 Запрос пользователя:
> *«make those 3 svgs bigger to look like in original»*
> *«the svg hsould be in the line with text like move all three of them to the left where text starts»*

### 🛠️ Что сделано:
1. **Точная обрезка всех 3 PNG документов по физическому контуру (0px отступов)**:
   - В [`convert_doc_pngs_to_svg.py`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/convert_doc_pngs_to_svg.py) внедрена строгая фильтрация альфа-канала (`alpha > 20`), устранившая паразитные прозрачные поля (включая 39px скрытого отступа слева у водительского удостоверения и отступы у ID-карты и паспорта).
   - Все 3 изображения (`doc_id_card.png` 320×190, `doc_passport.png` 320×187, `doc_driver.png` 320×193) теперь начинаются ровно с `x=0, y=0` без единого пикселя смещения.
2. **Генерация SVG с левым выравниванием (xMin)**:
   - В атрибуты SVG добавлен `preserveAspectRatio="xMinYMid meet"` и точный `viewBox` по габаритам карточки, благодаря чему левый край карты строго зафиксирован по левой границе вьюпорта.
   - Обновлены файлы в [`icons.need/`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/) и публичных ассетах [`kaspi-app/public/kaspi_assets/document_icons/`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/public/kaspi_assets/document_icons/).
3. **Увеличение размера и выравнивание с текстом карточки**:
   - В [`GovServicesScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/GovServicesScreen.jsx) размер контейнера изображения увеличен до `80×48px` (соответствие пропорциям фото оригинала).
   - Позиционирование: `top: 12px`, `left: 14px`, `objectPosition: 'left center'`, `display: 'block'`.
   - Текст названия документа (`top: 68px`, `left: 14px`) теперь строго на одной вертикальной линии с физическим левым краем изображения документа.
4. **Проверка**:
   - `npm run build` завершен успешно с 0 ошибок.
   - Проверено в браузере: все 3 документа визуально крупнее, аутентично заполняют верхнюю часть карточек и строго выровнены с первой буквой текста под ними.

---

## [2026-10-04 22:45] — Конвертация 3D PNG без фона в SVG и интеграция в плитки категорий Госуслуг

### 🎯 Запрос пользователя:
> *«2 choice with C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\Глянцевый красно-белый мегафон.png for this place i atteched screenshot tbh i need png to svg with also C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\Документы с зелёной галочкой.png C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\Минималистичный дом с бирюзовой крышей.png C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\Минималистичный красный автомобиль на прозрачном фоне.png»*

### 🛠️ Что сделано:
1. **Конвертация 3D PNG в формат SVG (Вариант 2)**:
   - Все 4 файла сконвертированы в самостоятельные масштабируемые векторные SVG с сохранением 100% фотографического качества, теней, бликов и прозрачности:
     - `category-popular-megaphone.svg` (Глянцевый красно-белый мегафон) для категории **«Популярные»**.
     - `category-certs-documents.svg` (Документы с зелёной галочкой) для категории **«Справки»**.
     - `category-auto-car.svg` (Минималистичный красный автомобиль) для категории **«Авто»**.
     - `category-home-house.svg` (Минималистичный дом с бирюзовой крышей) для категории **«Жилье»**.
   - Файлы сохранены в [`icons.need/`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/) и в публичных ассетах [`kaspi-app/public/kaspi_assets/category_icons/`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/public/kaspi_assets/category_icons/).
2. **Интеграция в плитки категорий Госуслуг**:
   - В [`GovServicesScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/GovServicesScreen.jsx) обновлен массив `categories` и блок рендеринга иконки плитки (`width: 40px`, `height: 40px`, `objectFit: contain` внутри серой плитки `56×56px`).
3. **Проверка**:
   - `npm run build` выполнен успешно с 0 ошибок.
   - Проверено в браузере в мобильном разрешении 414×896: все 4 иконки отображаются чётко, пропорционально и аутентично.

---

## [2026-10-04 22:30] — Пиксель-в-пиксель перестройка экрана «Госуслуги» (Government Services) по официальному ТЗ и спецификации

### 🎯 Запрос пользователя:
> *«ROLE AND GOAL: Rebuild the "Госуслуги" (Government services) screen so it matches the reference app pixel for pixel...»*

### 🛠️ Что сделано:
1. **Архитектура страницы (Три белых блока на сером фоне)**:
   - Фон всей страницы `pageBg` (`#EDEDED`), вертикальный скролл.
   - Три независимых белых блока (`surface` `#FFFFFF`) с радиусом скругления `16px`, разделенные зазорами в `10px`, где виден серый фон страницы:
     - **Блок A**: безопасная зона статусной строки + навбар (высота `44px`) + сегментированный переключатель (`42px`) + поле поиска (`48px`). Скругление нижних углов `16px`.
     - **Блок B**: карусель карточек документов + ссылка «Все документы» со стрелкой. Все 4 угла скруглены на `16px`.
     - **Блок C**: строка категорий с плитками и подчеркиванием + заголовок раздела + список услуг. Верхние углы скруглены на `16px`.
   - Полностью устранены тонкие рамки между секциями и серые разделительные полосы.

2. **Блок A: Навбар, Селектор и Поиск**:
   - Навбар: кнопка «Назад» с шевроном `<` из официального вектора APK Kaspi (`12×20px`, область нажатия `44×44px` с центром на `x=29px`). Заголовок «Госуслуги» (`17pt` Semibold `#1E1E1E`) строго центрирован по горизонтали экрана.
   - Сегментированный переключатель: размер `382×42px` (отступы по бокам `16px`), трек серый `fill` (`#F2F2F2`), скругление `12px`. Белая скользящая плашка с анимацией скольжения 200ms (`inset 2px`, высота `38px`, радиус `10px`). Обе подписи («Все услуги» и «Мои заявки») выполнены черным шрифтом `15pt` Regular (`#1E1E1E`).
   - Поле поиска: высота `48px`, серый фон `fill` (`#F2F2F2`), скругление `12px`, без рамок. Векторная лупа `20×20px` цвета `#A0A0A0` с отступом `21px` от левого края (на экране `x=37px`). Плейсхолдер «Поиск по Госуслугам» `16pt` Regular `#A0A0A0` начинается с `x=75px`.

3. **Блок B: Карусель документов**:
   - Горизонтальный скролл без полосы прокрутки, отступ слева `18px`, зазор между карточками `14px`.
   - Карточки `167×115px`, фон `fill` (`#F2F2F2`), скругление `16px`, без рамок, теней и оттенков.
   - Область для 3D изображения документа: `58×38px`, отступ сверху `13px`, слева `14px`.
   - Подпись: `15pt` Regular `#1E1E1E`, интерлиньяж `20px`, макс. 2 строки, отступ сверху `69px`.
   - Под карточками строка-ссылка «Все документы» (`17pt` Medium, цвет `linkBlue` `#2F49B5`, отступ слева `18px`) с шевроном (`10×15px`, отступ справа `22px`). Вся строка кликабельна (высота `44px`).

4. **Блок C: Категории и Список услуг**:
   - Плитки категорий: `56×56px`, фон `fill` (`#F2F2F2`), скругление `16px`, горизонтальный скролл с отступом `22px` и зазором `28px`. Внутри плитки центрирована область `40×40px`.
   - Подпись под плиткой: `15pt` по центру; невыбранная — Regular `#1E1E1E`, выбранная — Medium `accentRed` (`#F14635`).
   - Красное подчеркивание активной категории: толщина `2px`, цвет `#F14635`, строго по ширине подписи, расположено в `12px` под подписью поверх сквозного разделителя `1px` цвета `divider` (`#EBEBEB`).
   - Заголовок секции: «Популярные и новые» (`17pt` Bold `#1E1E1E`, высота строки `22px`, отступ сверху `18px`, снизу `18px`).
   - Строки услуг: минимальная высота `74px`, вертикальное центрирование, без межстрочных рамок. Круг с иконкой `44×44px` цвета `iconCircle` (`#F7F7F7`), красные векторные иконки `24×24px` из набора проекта (`CapitolIconRed`, `RepeatIconRed`, `BriefcaseSearchIconRed`, `ReceiptIconRed`, `DevicesIconRed`). Текстовая колонка начинается с `x=80px`: заголовок `15pt` Regular `#1E1E1E` (перенос до 2 строк) + подзаголовок `13pt` Regular `#8C8C8C`. Бейдж «NEW» выполнен красным овалом (`#F14635`, `height: 22px`, `padding: 0 8px`, `borderRadius: 11px`, шрифт `13pt` Semibold `#FFFFFF`), расположен строго справа перед шевроном (`8×14px` цвета `#BDBDBD`, отступ справа `22px`).

5. **Проверка**:
   - Сборка `npm run build` успешно завершена с 0 ошибок.
   - Проверено в браузере в мобильном разрешении 414×896 (iPhone 11 / 14 / 15).

6. **Затронутые файлы**:
   - [`kaspi-app/src/components/GovServicesScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/GovServicesScreen.jsx)
   - [`CHANGELOG.md`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/CHANGELOG.md)

---

## [2026-10-04 21:55] — Пиксель-в-пиксель перестройка экрана сетки товаров (Filter Chips Row + 2-Column Product Grid) по официальному ТЗ и референсу

### 🎯 Запрос пользователя:
> *«there is svg file for heaart icon:C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\heart.svg promt:ROLE AND GOAL: Rebuild the product grid screen (filter chips row + 2-column product grid) so it matches the reference app pixel for pixel...»*

### 🛠️ Что сделано:
1. **Чипы фильтров (Filter Chips Row)**:
   - Переведены на нативный горизонтальный скролл (`overflowX: 'auto'`, скрытый скроллбар) с отступами `12px` слева/справа/сверху и `16px` снизу до сетки; зазор между чипами `10px`.
   - Ширина каждого чипа формируется строго по контенту (`padding: 0 16px`), высота `36px`, полный pill (`borderRadius: 18px`).
   - Типографика: `13pt` (13px), `fontWeight: 500` (Medium), в одну строку.
   - Иконки: «Скидки» — официальный процентный бейдж [`icons.need/discount-badge-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/discount-badge-red.svg) (`KaspiDiscountBadgeIcon`, 16×16px), «Бонусы» — огонёк [`icons.need/flame-icon-orange.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/flame-icon-orange.svg) (`KaspiFlameIcon`, 16×16px).
   - Состояния: выбранный чип — фон `#F14635`, контент белый `#FFFFFF`; невыбранный — белый фон, контур `1.5px solid #F14635`, контент `#F14635`.

2. **Двухколоночная сетка (2-Column Product Grid)**:
   - Боковые отступы экрана `4px`, зазор между колонками `4px`, зазор между строками `16px`. Фотографии почти касаются краев экрана (4pt до края, 4pt между фото).
   - У карточки **полностью убран общий контейнер** — никаких внешних рамок, теней, паддингов и радиусов. Текст располагается непосредственно на белом холсте.
   - Блок текста имеет внутренний отступ `8px` от краев колонки.

3. **Тайл изображения (`ImageTile`)**:
   - Точный квадрат `aspect-ratio: 1/1`, радиус `8px`, рамка `1px solid #F2F2F2`, фон `#FFFFFF`, внутренний отступ `8px`, `object-fit: contain`.
   - Полностью убраны водяные знаки брендов/категорий («НОУТБУК», «APPLE», «DYSON»).
   - **Кнопка «Избранное» (Сердечко)**: точный нативный вектор из [`icons.need/heart.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/heart.svg) (`KaspiHeartIcon`), 24×24px, контур `#1E1E1E`, толщина 1.75pt, активное состояние — заливка `#F14635`. Никаких белых кружков, размытий или подложек. Сенсорная зона нажатия `44×44px` с центром на иконке (позиция `top: 12px, right: 12px`).
   - **Бейдж бонуса / скидки**: прикреплен в левый нижний угол фото без зазоров (`left: 0, bottom: 0`), высота `22px`, горизонтальный паддинг `6px`, скругление `0 8px 0 8px` (повторяет угол тайла). Фон скидки `#F14635`, фон бонуса `#54A000` (текст 13pt Bold `#FFFFFF`).

4. **Элементы карточки (сверху вниз)**:
   - **Индикатор карусели (Dots)**: точки `4×4px`, шаг `4px`, активная `#1E1E1E`, неактивные `#D0D0D0`.
   - **Метка «Реклама»**: для рекламных товаров, `13pt` Regular `#9A9A9A`, отступ сверху `6px`.
   - **Строка цены (PriceRow)**: цена `19pt` Bold `#1E1E1E`, высота строки `23px`. Зачеркнутая старая цена `13pt` Regular `#9A9A9A` через зазор `6px`.
   - **Плашка с учетом Бонусов (BonusBox)**: высота `22px`, радиус `8px`, фон `#E6F7CC`, цена `12.5pt` Bold `#54A000` + " с учетом Бонусов" `12pt` Regular `#333333` в строго одну строку.
   - **Название (Title)**: `14.5pt` Regular `#1E1E1E`, интерлиньяж `17px`, ограничение в 2 строки с троеточием.
   - **Рейтинг (RatingRow)**: `13pt` Semibold `#1E1E1E` + красная звезда `12×12px` `#F14635` + отзывы `(113)` `13pt` `#9A9A9A`.
   - **Строка рассрочки (InstallmentRow)**: всегда последний элемент карточки. Желтая плашка `#FFD302` высотой `24px` со скруглением `6px`, внутри цена рассрочки `14.5pt` Bold `#1E1E1E`. Снаружи плашки с зазором `6px` серый текст `x24` (`14.5pt` Regular `#9A9A9A`).
   - Полностью удалены строки доставки («Доставка бесплатно») и старый бейдж «0-0-12».

5. **Проверка**:
   - `npm run build` завершен успешно с 0 ошибок.

6. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)
   - [`CHANGELOG.md`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/CHANGELOG.md)

---

## [2026-10-04] — Выравнивание кнопок категорий («Рекомендации», «Скидки», «Бонусы»): одинаковые размеры, более жирный контур (1.5px) и уникальные SVG-иконки

### 🎯 Запрос пользователя:
> *«this part needs to be like the original so 1 photo is ours 2 is original as u can see in the orig all buttons have same sizes and bolder outlines and скидки и бонусы they have uique svg icons which is for скидки here path C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\discount-badge-red.svg and for бонусы is here C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\flame-icon-orange.svg»*

### 🛠️ Что сделано:
1. **Добавление официальных SVG-иконок**:
   - В [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx) добавлены компоненты:
     - `KaspiDiscountBadgeIcon` на базе [`icons.need/discount-badge-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/discount-badge-red.svg) (красный зубчатый бейдж со знаком процента).
     - `KaspiFlameIcon` на базе [`icons.need/flame-icon-orange.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/flame-icon-orange.svg) (оранжево-красный огонёк).
2. **Одинаковый размер и жирный контур кнопок**:
   - Для всех кнопок фильтров задана одинаковая ширина (`flex: 1`, `minWidth: 0`), центрирование контента (`justifyContent: 'center'`) и высота `32px` (`borderRadius: '16px'`).
   - Контур сделан более чётким и заметным — **`1.5px solid #F14635`** (вместо тонкого `1px solid`).
   - Порядок кнопок приведен в точное соответствие с Photo 2: **«Рекомендации»**, **«Скидки»** (с иконкой процента), **«Бонусы»** (с иконкой огня).
3. **Проверка**:
   - Сборка `npm run build` выполнена успешно с 0 ошибок за 2.35s.
4. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---


### 🎯 Запрос пользователя:
> *«get rid of triangels in the chips»* (приложен скриншот с зелеными чипами `▲ 20 399 Б` и `▲ 9 545 Б`)

### 🛠️ Что сделано:
1. **Удаление символа треугольника**:
   - В блоке ленты товаров ([`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx#L1140-L1150)) из плашек `bonusPill` удален текстовый префикс `▲`.
   - Теперь чип бонусов отображает только сумму бонусов и официальный векторный символ буквы «Б» (`<KaspiBonusSymbol height={8.5} color="#FFFFFF" />`), точно повторяя оригинальное мобильное приложение Kaspi.kz.
2. **Проверка**:
   - Сборка `npm run build` завершена успешно с 0 ошибок за 2.65s.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---


### 🎯 Запрос пользователя:
> *«this is not supposed to be here only chips are the ui elements on the photo nothing more and in the product card i want to photo be zoomed so the sharp outline of it is invisible»* (приложен скриншот с текстом RTX 5050 8GB в двойной рамке поверх фото)

### 🛠️ Что сделано:
1. **Удаление искусственного UI-элемента `specChip`**:
   - В оригинальном приложении Kaspi на фотографии товара отображаются **только** чипы скидок (`-15%`) и бонусов (`26 398 Б`, `13 999 Б`).
   - Удалены свойство `specChip` из массива `viewedProducts` и блок JSX-рендеринга бейджа со спецификацией в [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx).
2. **Зум фотографий товаров (`objectFit: 'cover'`)**:
   - Ранее свойство `objectFit: 'contain'` оставляло белые полосы (letterbox) и резкие прямоугольные границы у фотографий с фоном или нестандартным соотношением сторон.
   - Свойство заменено на `objectFit: 'cover'`, благодаря чему фотографии товаров заполняют весь скругленный квадрат карточки (`102×102px`, `borderRadius: '10px'`), а любые резкие прямоугольные контуры фото полностью скрываются скруглением контейнера.
3. **Проверка**:
   - `npm run build` выполнен успешно с 0 ошибок за 3.38s.
4. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---


### 🎯 Запрос пользователя:
> *«so now the crads and captions below shoud be a little bit smaller in general and the green block about bonus text have to fit 1 is ours 2 is original have to be like original one mesure ratios keep just the same make a copy»* (1 — наш предыдущий вариант с обрезкой текста бонусов и крупными шрифтами, 2 — эталонный скриншот оригинального Kaspi)

### 🛠️ Что сделано:
1. **Точные замеры пропорций оригинального экрана (Photo 2)**:
   - Ширина карточки уменьшена со `110px` до **`102px`** (контейнер и image box `102×102px`, радиус `10px`, граница `1px solid #ECECEC`).
   - Межкарточный интервал установлен в **`10px`**.
2. **Исправление и подгонка зеленого блока бонусов («с учетом Бонусов»)**:
   - Ранее размер шрифта в блоке бонусов составлял `14px`, из-за чего текст обрезался как `с учетом Бонусо...`.
   - В эталоне надпись «с учетом Бонусов» занимает лишь ~70% ширины плашки и не обрезается:
     - Высота плашки уменьшена с `36px` до **`28px`** (`padding: '2px 5px'`, `borderRadius: '5px'`).
     - Цена бонуса: **`fontSize: '11.5px'`**, `fontWeight: '700'`, цвет `#54A000`, `lineHeight: '13px'`.
     - Подпись: **`fontSize: '9px'`**, `fontWeight: '400'`, цвет `#1F1F1F`, `lineHeight: '11px'`, `letterSpacing: '-0.25px'`. Текст теперь полностью и комфортно помещается в строку с большим запасом по краям без обрезки и многоточия.
3. **Гармонизация и уменьшение шрифтов подписей под карточками**:
   - **Основная цена**: уменьшена с `17px` до **`14.5px`** (`fontWeight: '700'`, `lineHeight: '17px'`).
   - **Старая цена (зачеркнутая)**: уменьшена с `17px` черного до **`10.5px`** серым цветом `#757575` (`fontWeight: '400'`, `textDecoration: 'line-through'`), как в оригинале.
   - **Название товара**: уменьшено с `14px` до **`11.5px`** (`lineHeight: '14px'`, `#1F1F1F`).
   - **Строка рейтинга**: рейтинг `11px`, звездочка `KaspiRatingStar size={10}`, количество отзывов `10.5px` серым цветом `#757575`.
4. **Синхронизация данных карусели с оригиналом (Photo 2)**:
   - 1. Холодильник Leadbros: `279 990 ₸`, бонусный чип `13 999 Б` с векторным огоньком `🔥`, бонусный блок `265 991 ₸` / `с учетом Бонусов`, `Leadbros HD-40...`, `5.0 ★ (898)`.
   - 2. Ноутбук Lenovo: `649 437 ₸` красным, старая цена `759 999 ₸`, чипы `-15%` и `RTX 5050 8GB`, `Lenovo LOQ 15A...`, `4.9 ★ (12)`.
   - 3. Холодильник LG: `879 957 ₸`, чип `26 398 Б`, бонусный блок `853 559 ₸` / `с учетом Бонусов`, `LG GC-L257CBE...`, `5.0 ★ (51)`.
   - 4. Зарядка PD20W: `658 ₸`, `PD20W U...`, `4.5 ★ (361)`.
5. **Проверка**:
   - `npm run build` завершен успешно с 0 ошибок за 1.36s.
6. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---


### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\b-bar-icon-white.svg the B icon just next to green chips in number change it to this keep the sizes»*

### 🛠️ Что сделано:
1. **Создание компонента `KaspiBonusSymbol`**:
   - В [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx) экспортирован компонент `KaspiBonusSymbol` на основе официального вектора из [`icons.need/b-bar-icon-white.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/b-bar-icon-white.svg):
     - ViewBox: `13 8 35.5 53`.
     - Верхняя горизонтальная планка: `rect x="15.5" y="10" width="26.5" height="4.5"`.
     - Фирменное начертание буквы «Б»: точные контуры и скругления полукруга `a2.5 2.5` и `a8 8`.
2. **Интеграция в зеленые чипы бонусов**:
   - В блоке «Вы недавно смотрели» ([`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx#L810-L845)) текстовая буква «Б» заменена на вектор `<KaspiBonusSymbol height={9} color="#FFFFFF" />` с отступом `2.5px` от числа бонусов. Высота подобрана строго под высоту прописных цифр.
   - В двухколоночной витрине товаров ([`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx#L1125-L1150)) в плашках `bonusPill` также задействован `<KaspiBonusSymbol height={8.5} color="#FFFFFF" />`.
3. **Проверка**:
   - Сборка `npm run build` выполнена успешно с 0 ошибок.
4. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Уменьшение размера шрифта цифр и текста в чипах карточек товаров (10.5px / 10px)

### 🎯 Запрос пользователя:
> *«make the numbers in the chips smaller»*

### 🛠️ Что сделано:
1. **Уменьшение шрифта и высоты чипов**:
   - В блоке «Вы недавно смотрели» размер шрифта чипов скидок и бонусов уменьшен с `12.5px` до **`10.5px`** (`letterSpacing: '-0.2px'`), а высота плашки скорректирована с `20px` до **`18px`** (с отступами `padding: '0 6px'`).
   - Бейдж спецификации `specChip` скорректирован: `fontSize: '9.5px'`, высота `17px`.
   - В двухколоночной витрине товаров размер шрифта чипов скидок и бонусов уменьшен с `11px` до **`10px`** (`padding: '1.5px 6px'`).
   - Цифры теперь имеют аккуратные отступы со всех сторон внутри плашек, выглядят компактно, утонченно и 1:1 соответствуют оригинальному приложению Kaspi.kz.
2. **Проверка**:
   - Сборка `npm run build` выполнена успешно с 0 ошибок.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Повышение видимости серой рамки карточек товаров и скругление нижнего левого угла чипов по форме карточки

### 🎯 Запрос пользователя:
> *«now moving on to product cards the surrounding grey thing should be more visible and the chips leftcorner below shoud be rouded with the shape of the card 1 photo is original app 2 is ours incorrect one»* (приложены эталонный скриншот из Kaspi и скриншот текущего состояния)

### 🛠️ Что сделано:
1. **Повышение видимости серого контура карточек товаров**:
   - Ранее рамка карточек «Вы недавно смотрели» была `0.5px solid #EFEFEF` (слишком светлая и почти невидимая на белом фоне).
   - Заменена на четкую, чистую и видимую рамку **`1px solid #E0E0E0`** (в полном соответствии с замерами пикселей оригинала Kaspi `RGB(230, 232, 235)`).
   - В карточках витрины также установлена рамка `1px solid #E0E0E0` и внутренняя рамка изображения `1px solid #EAEAEA`.
2. **Скругление нижнего левого угла чипов по форме карточки**:
   - Чипы скидки/бонусов смещены вплотную к левому и нижнему краю контейнера (`left: '0px'`, `bottom: '0px'`).
   - Радиусы углов чипа разделены:
     - `borderTopLeftRadius: '4px'`, `borderTopRightRadius: '6px'`, `borderBottomRightRadius: '6px'` — аккуратные радиусы чипа.
     - **`borderBottomLeftRadius: '10px'` / `'11px'`** — идеально повторяет форму скругления внешнего контейнера карточки, убирая белый зазор и образуя единое бесшовное скругление с карточкой.
   - Добавлен аутентичный бейдж характеристик `specChip` («RTX 5050 8GB») рядом с красным бейджем скидки, как на эталонном снимке ноутбука Lenovo LOQ.
3. **Проверка**:
   - Сборка `npm run build` выполнена успешно с 0 ошибок.
4. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Уменьшение красного бейджа корзины (до 14px) и затемнение иконки камеры (#555555)

### 🎯 Запрос пользователя:
> *«red circle should be a little bit smaller on this one and also the camera sparkel svg you just did bigger make it more greyer i mean darker»* (приложен скриншот корзины с красным бейджем)

### 🛠️ Что сделано:
1. **Уменьшение красного бейджа корзины**:
   - Размер бейджа уменьшен с `16×16px` до аккуратных **`14×14px`** в [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx#L377-L397).
   - Размер шрифта уменьшен с `11px` до **`9.5px`** (`fontWeight: '500'`), что идеально центрирует цифру «3» с гармоничными отступами внутри круга.
   - Позиционирование скорректировано на `top: '1px', right: '0px'`, деликатно перекрывая верхний угол корзины без перегруженности.
2. **Затемнение иконки камеры со звёздочкой (`CameraSparkleIcon`)**:
   - Цвет иконки изменен с более светлого `#757575` на глубокий темно-серый **`#555555`** в [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx#L187) и [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx#L361).
   - Теперь контуры камеры, объектив, индикатор и лучи вспышки отображаются более четко, контрастно и выразительно.
3. **Проверка**:
   - Сборка `npm run build` выполнена успешно с 0 ошибок.
4. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Увеличение размера иконки камеры со звёздочкой в строке поиска (size 26.5px)

### 🎯 Запрос пользователя:
> *«make this one bigger»* (приложен скриншот иконки камеры со звёздочкой в строке поиска)

### 🛠️ Что сделано:
1. **Пропорциональное увеличение `CameraSparkleIcon`**:
   - Размер `size` увеличен с `20.5px` до **`26.5px`** (фактическая видимая высота рисунка увеличилась с 15.9px до 20.5px).
   - Относительно высоты поисковой строки (40px) иконка теперь занимает ровно ~51% вертикального пространства, соответствуя эталонному балансу оригинального приложения Kaspi.kz и гармонично сочетаясь с лупой слева.
   - Дефолтный `size` в [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx) обновлен до `26.5`.
   - В [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx) передан `size={26.5}`.
2. **Проверка**:
   - Сборка `npm run build` прошла успешно.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки камеры со звёздочкой, снижение контраста корзины и утончение цифры бейджа

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\camera-sparkle-icon-grey.svg i need you to change me the camera one with this svg and make the cart one just next to it lower contrast and number in the red circle thiner fist shot is ours second is from orig»*

### 🛠️ Что сделано:
1. **Замена иконки камеры на `CameraSparkleIcon`**:
   - Прежняя контурная Lucide-иконка заменена на точный SVG из [`icons.need/camera-sparkle-icon-grey.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/camera-sparkle-icon-grey.svg):
     - ViewBox: `4 22 220 190`.
     - Корпус камеры с вырезом под звёздочку: `path d="M118 44.5H89C75 44.5 73 63 57 63H49.500A28 28 0 0 0 21.500 91V166.500A28 28 0 0 0 49.500 194.500H168.500A24 24 0 0 0 192.500 170.500V131" strokeWidth="17"`.
     - Объектив и вспышка: `circle cx="107" cy="127.5" r="34.5"`, `circle cx="52" cy="93.5" r="7.5" fill={color}`.
     - Фирменная 4-конечная звёздочка вспышки: `path d="M183 32.500Q192 55 214.500 64Q192 73 183 95.500Q174 73 151.500 64Q174 55 183 32.500Z" fill={color}`.
     - Размер в поле поиска установлен на `20.5px` со цветом `#757575`.
2. **Снижение контраста иконки корзины (`TopBarCartIcon`)**:
   - Цвет заливки изменён с жёсткого тёмного `#757575` на более мягкий низкоконтрастный серый `#9E9E9E`, как в оригинальном приложении Kaspi.
3. **Утончение цифры «3» на красном бейдже**:
   - Плотность шрифта цифры уменьшена с жирного `800` до элегантного `500` (`fontFamily: '-apple-system, "SF Pro Text", Roboto, sans-serif'`).
   - Убран грубый белый контур, цвет плашки приведен к аутентичному `#EB3B2C`, размер `16×16px` круг.
   - Сборка `npm run build` прошла успешно.
4. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки «Kaspi Депозит» на currency-card-yellow.svg (53×41px)

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\currency-card-yellow.svg now the same replace but with Kaspi депозит»*

### 🛠️ Что сделано:
1. **Замена иконки «Kaspi Депозит»**:
   - Прежняя плашка со стандартным текстом `₸$` заменена на векторный SVG из [`icons.need/currency-card-yellow.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/currency-card-yellow.svg):
     - ViewBox: `17 15 243 189`.
     - Золотая плашка: `rect x="17" y="15" width="243" height="189" rx="24" fill="#FFD302"`.
     - Начертание знака тенге (`₸`): прямоугольные штрихи `rect width="63" height="9.5"` и ножка `rect width="11" height="51"` белого цвета.
     - Начертание знака доллара (`$`): дуги и вертикальные засечки со `strokeWidth="12"` и `strokeWidth="9.5"`, `strokeLinecap="butt"`, `strokeLinejoin="miter"`.
   - Размер плашки составляет ровно **`53 × 41 px`**, что идеально синхронизировано по пропорциям и габаритам с первой плашкой «Накопительный Депозит».
   - Сборка `npm run build` прошла успешно.
2. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки «Накопительный Депозит» на coins-card-yellow.svg и увеличение плашек до 53×41px

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\coins-card-yellow.svg смени накопительный депозит иконку и по идеи надо их сделать чуть по больше»*

### 🛠️ Что сделано:
1. **Замена иконки «Накопительный Депозит»**:
   - Старый примитивный SVG с монетками заменён на вектор из [`icons.need/coins-card-yellow.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/coins-card-yellow.svg):
     - Включает аутентичную золотую карточку: `rect x="26" y="20" width="243" height="188" rx="26" fill="#FFD302"`.
     - 3 объёмные монетки в стопке: эллипс верхней монетки `rx="43" ry="22.75"`, рельефные боковые грани и нижние ободки со `stroke="#FFFFFF" strokeWidth="10"`.
2. **Увеличение размера обеих депозитных плашек (до 53×41px)**:
   - Ранее размер плашек был `48×36px`, что визуально проигрывало блоку текста («Накопительный / Депозит 19%» высотой 41px).
   - Размер обеих плашек («Накопительный Депозит» и «Kaspi Депозит 15%») пропорционально увеличен до **`53×41px`**, идеально соотносясь с пропорцией `243 / 188 = 1.29` и высотой двухстрочного текста.
   - Плашка «Kaspi Депозит» (`₸$`) обновлена: размер `53×41px`, фон `#FFD302`, скругление `6px`, размер шрифта `19px`.
   - Бейдж «19%» гармонизирован по цвету с фоном карточки (`#FFD302`).
   - Сборка `npm run build` прошла успешно без ошибок.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки «Переводы» на аутентичный вектор из repeat-icon-red.svg (size 34px)

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\repeat-icon-red.svg now the same thing with переводы»*

### 🛠️ Что сделано:
1. **Пиксельный анализ эталона**:
   - Измерен оригинальный скриншот первого ряда сервисов Kaspi:
     - «Переводы»: ширина 33px, высота 32px, Y = [46, 77] (общая базовая линия и верх с «Мой Банк»).
     - «Госуслуги»: ширина 36px, высота 36px.
     - Соотношение к «Госуслугам»: ширина `33 / 36 = 0.917`, высота `32 / 36 = 0.889`.
2. **Замена иконки «Переводы» (`IconTransfers`)**:
   - Векторная графика заменена на точный SVG из [`icons.need/repeat-icon-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/repeat-icon-red.svg):
     - ViewBox: `20 20 146 142`.
     - Верхняя стрелка вправо: `path d="M36.5 90.5V80.5a28 28 0 0 1 28-28h83"`, `path d="M129.5 34.5l18 18-18 18"`.
     - Нижняя стрелка влево: `path d="M149.5 92.5v8a28 28 0 0 1-28 28h-84"`, `path d="M55.5 110.5l-18 18 18 18"`.
     - `strokeWidth="13"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
   - При `size={34}` ширина рисунка составляет `29.34px` (отношение `0.920` к «Госуслугам» при эталоне `0.917`), а высота — `29.11px` (отношение `29.11 / 32.02 = 0.909`, при эталоне `0.889`).
   - Сборка `npm run build` прошла успешно.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки «Платежи» на аутентичный вектор из receipt-icon-red.svg (size 35px)

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\receipt-icon-red.svg теперь платежи»*

### 🛠️ Что сделано:
1. **Пиксельный анализ эталона**:
   - Измерен оригинальный скриншот первого ряда сервисов Kaspi:
     - «Платежи»: ширина 36px, высота 35px, Y = [45, 79].
     - «Госуслуги»: ширина 36px, высота 36px.
     - Соотношение к «Госуслугам»: ширина `36 / 36 = 1.000`, высота `35 / 36 = 0.972`.
2. **Замена иконки «Платежи» (`IconPayments`)**:
   - Векторная графика заменена на точный SVG из [`icons.need/receipt-icon-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/receipt-icon-red.svg):
     - ViewBox: `45 30 302 286`.
     - Щель терминала/принтера: `path d="M119 128H89a20 20 0 0 1-20-20V74a20 20 0 0 1 20-20h214a20 20 0 0 1 20 20v34a20 20 0 0 1-20 20h-34" strokeWidth="28"`.
     - Чек с волнистым нижним краем: `path d="M119 290V106a8 8 0 0 1 8-8h134a8 8 0 0 1 8 8v184C257 290 257 283 245 283C232.5 283 232.5 292 220 292C207.5 292 207.5 283 195 283C182.5 283 182.5 292 170 292C157 292 157 283 144 283C131.5 283 131.5 290 119 290Z" strokeWidth="28"`.
     - Текстовые линии чека: `path d="M167 167.5h54M167 211.5h54" strokeWidth="24"`.
   - При `size={35}` ширина рисунка составляет `32.68px` (отношение `1.025` к ширине «Госуслуги»), а высота — `30.83px` (отношение `30.83 / 32.02 = 0.963`, при эталонном `0.972`).
   - Сборка `npm run build` прошла успешно.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки «Магазин» на аутентичный вектор из cart-icon-red.svg (size 35.5px)

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\cart-icon-red.svg магазин do the same keep the ratio too»*

### 🛠️ Что сделано:
1. **Пиксельный анализ эталона**:
   - Измерен оригинальный скриншот первого ряда сервисов Kaspi:
     - «Магазин»: ширина 35px, высота 31px, Y = [48, 78] (общая базовая линия Y=78 с «Мой Банк»).
     - «Мой Банк»: ширина 36px, высота 33px, Y = [46, 78].
     - «Госуслуги»: ширина 36px, высота 36px.
     - Соотношение: ширина = `35 / 36 = 0.972`, высота = `31 / 36 = 0.861`. Пропорция корзины: `35 / 31 = 1.129` (ширина больше высоты).
2. **Замена иконки «Магазин» (`IconShop`)**:
   - Векторная графика заменена на точный SVG из [`icons.need/cart-icon-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/cart-icon-red.svg):
     - ViewBox: `22 10 156 138`.
     - Ручка и корзина: `path d="M36.5 25.5H47Q55 25.5 57 33L74.3 91.5Q77 100.5 86 100.5H136Q145.2 100.5 148 91.5L160.4 52.5Q162.9 44.5 155 44.5H60.3"`.
     - Колёсики: `circle cx="87" cy="129.5" r="10.3" fill={color} stroke="none"`, `circle cx="134.5" cy="129.5" r="10.3" fill={color} stroke="none"`.
   - При `size={35.5}` ширина рисунка составляет `31.40px` (отношение `0.984` к ширине «Госуслуги»), а высота — `27.55px` (отношение `27.55 / 32.02 = 0.860`, при эталонном `0.861` — совпадение 99.9%).
   - Сборка `npm run build` прошла успешно.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки «Travel» на аутентичный вектор из suitcase-icon-red.svg (size 36px)

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\suitcase-icon-red.svg now do it with travel keep the ratio just like the original app kaspi»*

### 🛠️ Что сделано:
1. **Пиксельный анализ эталона**:
   - Измерен оригинальный скриншот (`Travel` рядом с `Госуслуги` и `Работа`):
     - «Travel»: ширина 35px, высота 36px, Y = [135, 170].
     - «Госуслуги»: ширина 36px, высота 36px, Y = [135, 170].
     - Точное эталонное отношение: высота 1.000, ширина 0.972.
2. **Замена иконки «Travel» (`IconTravel`)**:
   - Векторная графика заменена на точный SVG из [`icons.need/suitcase-icon-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/suitcase-icon-red.svg):
     - ViewBox: `24 14 155 158`.
     - Колёсики: `circle cx="69" cy="148" r="9.5"`, `circle cx="133.5" cy="148" r="9.5"`.
     - Выдвижная ручка: `path d="M80 52.5V40a10 10 0 0 1 10-10h22a10 10 0 0 1 10 10v12.5"`.
     - Корпус чемодана: `rect x="40.5" y="52.5" width="121.5" height="88" rx="20"`.
     - Улыбка Kaspi Travel: `path d="M77 85a24 24 0 0 0 48 0"`.
   - При `size={36}` высота рисунка составляет `32.01px`, а ширина `31.24px`, что даёт точное совпадение: высота `1.000` (как у «Госуслуги»), ширина `0.979` (эталон 0.972).
   - Сборка `npm run build` прошла успешно без ошибок.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)

---

## [2026-10-04] — Калибровка пропорций иконки «Работа» под эталонное фото (34.5px, ratio 0.944/0.972)

### 🎯 Запрос пользователя:
> *«no too small, its have to be in the same ratio as the picture»* + [прикреплено фото оригинального интерфейса: Госуслуги и Работа рядом]

### 🛠️ Что сделано:
1. **Пиксельный анализ эталонного изображения**:
   - Измерен оригинальный скриншот приложения:
     - «Госуслуги»: ширина 36px, высота 36px.
     - «Работа»: ширина 35px, высота 34px.
     - Точное соотношение: высота = `34 / 36 = 0.944`, ширина = `35 / 36 = 0.972`.
     - Базовая линия низа (y = 170) и верхний край у иконок практически совпадают.
2. **Точная калибровка размера `IconJobs`**:
   - Размер скорректирован с `31px` (который был слишком мал) до **`34.5px`**.
   - При размере `34.5px` высота векторного рисунка `IconJobs` составляет ровно `30.33px`, что даёт отношение `30.33 / 32.02 = 0.947` к высоте рисунка «Госуслуги» (при эталонном 0.944) — идеальное совпадение пропорций 1:1.
   - Значение обновлено в [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx) и в сетке сервисов [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx).
   - Сборка `npm run build` прошла успешно.
3. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Корректировка визуального размера иконки «Работа» (size 31px)

### 🎯 Запрос пользователя:
> *«make it a little bit smaller»*

### 🛠️ Что сделано:
1. **Масштабирование иконки «Работа» (`IconJobs`)**:
   - Размер уменьшен с `36px` до `31px` (как значение по умолчанию в [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx), так и в сетке сервисов [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)).
   - Иконка центрируется во флекс-контейнере `36×36px`, благодаря чему визуальная масса портфеля с лупой теперь идеально гармонирует с иконками «Госуслуги», «Мой Банк» и остальными сервисами на главной.
   - Сборка `npm run build` проверена и завершилась успешно.
2. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-04] — Обновление иконки «Работа» на аутентичный вектор из briefcase-search-icon-red.svg

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\briefcase-search-icon-red.svg now do the same with работа»*

### 🛠️ Что сделано:
1. **Замена иконки «Работа» (`IconJobs`)**:
   - Векторная графика заменена на точный SVG из [`icons.need/briefcase-search-icon-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/briefcase-search-icon-red.svg):
     - ViewBox: `44 20 154 148`.
     - Корпус портфеля (с вырезом под лупу): `path d="M164.5 76V66a11.5 11.5 0 0 0-11.5-11.5H71A11.5 11.5 0 0 0 59.5 66v64A11.5 11.5 0 0 0 71 141.5h34"`.
     - Ручка портфеля: `path d="M98 54.5V46a11.5 11.5 0 0 1 11.5-11.5h7A11.5 11.5 0 0 1 128 46v8.5"`.
     - Средняя полоса портфеля: `path d="M59.5 89.5h46"`.
     - Линза лупы: `circle cx="146" cy="117" r="25"`.
     - Ручка лупы: `path d="M164 135l18.5 18.5"`.
   - Иконка корректно принимает пропсы `size` (по умолчанию 36) и `color` (по умолчанию `#DF4E3E`).
   - Сборка `npm run build` проверена и завершилась успешно.
2. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)

---

## [2026-10-04] — Обновление иконки «Госуслуги» на аутентичный вектор из capitol-icon-red.svg

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\icons.need\capitol-icon-red.svg now do the same replace thing with госуслуги»*

### 🛠️ Что сделано:
1. **Замена иконки «Госуслуги» (`IconGov`)**:
   - Векторная графика заменена на точный SVG из [`icons.need/capitol-icon-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/icons.need/capitol-icon-red.svg):
     - ViewBox: `60 8 158 154`.
     - Флагшток и флаг: `path d="M138.5 64V22.5h46v24h-46"`.
     - Купол: `path d="M106 98a33 33 0 0 1 66 0"`.
     - Фасад здания: `rect x="75.5" y="98.5" width="127" height="48" rx="7"`.
     - Колонны: `path d="M114 124.5v22M139 124.5v22M164.5 124.5v22"`.
   - Иконка корректно принимает пропсы `size` (по умолчанию 36) и `color` (по умолчанию `#DF4E3E`).
   - Сборка `npm run build` проверена и завершилась успешно.
2. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)

---

## [2026-10-03] — Обновление иконки «Мой Банк» на аутентичный вектор из devices-icon-red.svg

### 🎯 Запрос пользователя:
> *«C:\Users\erkez\Downloads\uptodown-kz.kaspi.mobile\kaspi-app\src\devices-icon-red.svg what are you doing bro there is it»*

### 🛠️ Что сделано:
1. **Замена иконки «Мой Банк» (`IconMyBank`)**:
   - Векторная графика заменена на точный SVG из [`kaspi-app/src/devices-icon-red.svg`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/devices-icon-red.svg):
     - ViewBox: `50 20 162 150`.
     - Контур монитора со срезом под телефон: `path d="M74 59V50a13 13 0 0 1 13-13h94a13 13 0 0 1 13 13v58a13 13 0 0 1-13 13H138"`.
     - Подставка монитора: `path d="M137 138h33"`.
     - Корпус смартфона: `rect x="68" y="77" width="50" height="75" rx="11"`.
     - Кнопка «Домой»: `path d="M90 132h7" strokeWidth="10"`.
   - Иконка корректно принимает пропсы `size` (по умолчанию 36) и `color` (по умолчанию `#DF4E3E`).
   - Сборка `npm run build` проверена и проходит успешно без ошибок.
2. **Затронутые файлы**:
   - [`kaspi-app/src/components/KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)

---

## [2026-10-03] — Приведение карточек товаров «Вы недавно смотрели» к точным спецификациям (110 pt)

### 🎯 Запрос пользователя:
> *«Your product cards are close, but they do not match the design yet. Fix exactly these items and change nothing else. Sizes are in pt. Your card image is 110 pt wide, so measure everything against that...»*

### 🛠️ Что сделано:
1. **Полный отказ от эмодзи**:
   - Рейтинговая звёздочка переведена на векторную залитую звезду `KaspiRatingStar` (13 pt, цвет `#F14635`, SF Symbol `star.fill` / Material `star`).
   - На плашках бонусов знак бонусов заменён на строгий текст с буквой «Б» (например, `26 982 Б`).
   - Удалены все эмодзи из фильтров витрины («Рекомендации», «Бонусы», «Скидки»).
2. **Типографика и размеры шрифтов по спецификации**:
   - Заголовок секции: `18 pt Bold`, `#1E1E1E`.
   - Основная цена: `17 pt Bold`, `#000000` (при скидке новая цена выделена красным `#F14635`).
   - Старая (зачёркнутая) цена: того же размера и веса (`17 pt Bold`), цвет `#000000` с зачёркиванием, на одной строке с новой ценой, обрезается по правому краю карточки без переноса.
   - Бонусная цена в блоке бонусов: `14 pt Bold`, `#54A000`.
   - Подпись в блоке бонусов: «с учетом Бонусов», `14 pt Regular`, строго чёрный `#000000`.
   - Название товара: `14 pt Regular`, `#000000`, 1 строка с многоточием.
   - Рейтинг: оценка `14 pt Semibold #000000`, векторная звезда `13 pt #F14635`, количество отзывов `14 pt Regular #8E8E8E`.
   - Текст бейджей: `13 pt Bold white`.
   - Системный шрифт iOS: `-apple-system, "SF Pro Text", Inter, sans-serif`.
3. **Удаление лишнего бейджа**:
   - Удалён белый бейдж «RTX 5050 8GB» с фотографии ноутбука. У каждой карточки максимум один бейдж (скидка либо бонусы).
4. **Позиция и геометрия бейджа**:
   - Прижат к нижнему левому углу фотографии: `1 pt` от левого края, `2 pt` от нижнего.
   - Высота `19 pt`, горизонтальный паддинг `6 pt`, радиус скругления `6 pt`.
   - Заливка скидочного бейджа: `#F14635`.
   - Заливка бонусного бейджа: `#54A000` (ярко-зелёный).
5. **Бонусный блок**:
   - Высота ровно `36 pt`, на всю ширину карточки (`110 pt`), паддинг `4 pt`, радиус `6 pt`.
   - Фоновая заливка: `#E6F8D0` (жёлто-зелёный).
   - Строка 1: `14 pt Bold #54A000`.
   - Строка 2: `14 pt Regular #000000` (чёрный).
6. **Цветовая палитра**:
   - Красный цвет везде приведен к `#F14635`.
   - Зелёный цвет везде приведен к `#54A000`.
7. **Контейнер изображения**:
   - Размер `110 × 110 pt`, скругление `11 pt`, белая заливка, граница `0.5 pt #EFEFEF`.
   - Фотография отображается в режиме `object-fit: contain` по центру без серого фона.
8. **Вертикальный ритм карточки**:
   - Фото (110 pt) → 4 pt → Цена → 4 pt → Бонусный блок (при наличии) → 4 pt → Название → 2 pt → Рейтинг.
   - При отсутствии бонусного блока название поднимается вверх.
   - Карточки выровнены по верхнему краю (`alignItems: 'flex-start'`), высота каждой карточки следует за контентом.
9. **Горизонтальный ряд**:
   - Карточки шириной 110 pt, отступ между карточками 9 pt, левый инсет 16 pt, 4-я карточка аккуратно срезается по правому краю экрана.
10. **Затронутые файлы**:
   - [`kaspi-app/src/components/HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-10-02] — Исправление мобильного отображения (Mobile Viewport) и устранение переполнения Flexbox

### 🎯 Запрос пользователя:
> *«ну теперь испарвь это я когда перехожу в режим приложение ужас какой то не забудь про новые обязательнеы jornaling»*

### 🛠️ Что сделано:
1. **Устранение горизонтального распирания страницы (1024px Flexbox Bug)**:
   - Внутренние контейнеры баннеров, слайдов, карусели «Вы недавно смотрели» и плашек фильтров получили строгое ограничение `minWidth: 0`, `maxWidth: '100%'`, `width: '100%'`, `boxSizing: 'border-box'`.
   - Это предотвратило расширение родительского контейнера экрана по естественной ширине 1024px картинок баннеров.
2. **Адаптация вьюпорта в [`index.css`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/index.css)**:
   - Точка переключения на нативный мобильный экран увеличена до `@media (max-width: 600px)` (ранее 480px), благодаря чему в любых мобильных режимах DevTools (включая 414×498, iPhone 14/15/Pro Max, Samsung Galaxy) приложение занимает ровно 100% ширины без серого отступа и без обрезки по правому краю.
   - На десктопе приложение отображается в виде центрированного смартфона (`max-width: 430px`, `margin: 16px auto`, скругление углов 24px, плавная мобильная тень `box-shadow: 0 10px 40px rgba(0,0,0,0.12)`).
   - Убран `scrollbar-gutter: stable`, вызывавший искусственное смещение на смартфонах.
3. **Затронутые файлы**:
   - [`index.css`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/index.css)
   - [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)
   - [`App.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/App.jsx)

---

## [2026-10-02] — Карусель из 4 оригинальных баннеров и нативный скролл

### 🎯 Запрос пользователя:
> *«вот эти верхние 4 банера поставь их вместо одного банера сделай так что бы можно было скролить точно так же как в ориг каспи»*

### 🛠️ Что сделано:
1. **Сохранены 4 оригинальных HD-баннера Kaspi (1024×341 px)**:
   - [`banner_backpacks.png`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/public/kaspi_assets/banners/banner_backpacks.png): «Куда же без рюкзака? 🔥 Бонусы»
   - [`banner_home_appliances.png`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/public/kaspi_assets/banners/banner_home_appliances.png): «Для важных дел по дому. Скидки до 20%»
   - [`banner_wardrobe_basics.png`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/public/kaspi_assets/banners/banner_wardrobe_basics.png): «База гардероба. 🔥 Бонусы»
   - [`banner_basic_jeans.png`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/public/kaspi_assets/banners/banner_basic_jeans.png): «Базовые джинсы. 🔥 Бонусы»

2. **Реализована нативная карусель с мобильным свайпом в [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)**:
   - Использован CSS `scrollSnapType: 'x mandatory'` для чёткого мобильного примагничивания к границам баннера.
   - Поддержка перетаскивания (mouse drag) для тестирования с ПК с динамическим отключением `scrollSnapType` во время драга и глобальными слушателями `window.mousemove`/`mouseup`.
   - Поддержка нативного тача (`touchAction: 'pan-y'`, `-webkit-overflow-scrolling: touch`), не мешающего вертикальному скроллу экрана.
   - Скрыта полоса прокрутки (`.hide-scrollbar` в [`index.css`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/index.css)).
   - Автоматическая циклическая смена баннеров каждые 4.5 секунды с паузой при взаимодействии.
   - Аутентичные 4 индикатора (точки) внизу баннера по центру: активная точка ярко-белая (6px), неактивные — полупрозрачные (5px), без фоновой чёрной плашки, в точности как на реальном экране Kaspi.

3. **Восстановлены состояния фильтров и избранного**:
   - `activeFilterTab`, `setActiveFilterTab`, `favorites`, `toggleFavorite`.

---

## [2026-10-02] — Подгонка 8 иконок сервисов, Magnum и Госуслуг 1:1 по оригинальному экрану

### 🎯 Запрос пользователя:
> *«сделай размер всех иконок таким же как гос услуги и шрифт под иконками чу чуть прям жирнее и по больше как в ориге и приложение же адаптивный да под разные ширины экрана?просто посмотри 2 фото это вот так ориг выглдяит иделаьно все а у нас как будто чу чуть иконки далеки от друг друга а кстаити иконка магнума должна быть чу чуть розовым нежели красным и так же буква m должна быть больше и по центру как на 2 фото»*

### 🛠️ Что сделано:
1. **Унификация размеров иконок сервисов**:
   - Все 8 иконок сервисов приведены к единому строгому размеру контейнера `36×36px`.
2. **Типографика подписей сервисов**:
   - Размер шрифта увеличен до `13px`, насыщенность `fontWeight: 500` (Medium Roboto Flex Kaspi), плотный межбуквенный интервал `letterSpacing: -0.2px`, цвет `#1A1A1A`.
3. **Адаптивная сетка 4×2**:
   - Сетка `display: grid; grid-template-columns: repeat(4, 1fr)` с отступами `padding: 6px 18px 14px 18px`, `rowGap: 16px`, `columnGap: 8px`. Идеально адаптируется под любые мобильные ширины от 360px до 430px.
4. **Иконка Magnum**:
   - Скорректирован цвет на аутентичный сочный розово-малиновый `#F50F64` (вместо стандартного красного).
   - Буква «m» увеличена и отцентрована точно по фото оригинала.
5. **Иконка Госуслуг**:
   - Купол, колонны и пропорция флажка выверены и уменьшены по ширине до идеального соответствия фото оригинала.
6. **Затронутые файлы**:
   - [`KaspiServiceIcons.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/KaspiServiceIcons.jsx)
   - [`HomeScreen.jsx`](file:///c:/Users/erkez/Downloads/uptodown-kz.kaspi.mobile/kaspi-app/src/components/HomeScreen.jsx)

---

## [2026-09-30] — Раздел Депозитов и 2-колоночная витрина товаров

### 🛠️ Что сделано:
1. **Раздел депозитов**:
   - Две золотые плашки 48×36px (соотношение 4:3) цвета `#ECC81A`.
   - Первая: 3 стопки монет (Накопительный Депозит 19%).
   - Вторая: символ «₸$» (Kaspi Депозит 15%).
2. **Секция «Вы недавно смотрели»**:
   - Горизонтальный скролл реальных карточек: Lenovo LOQ 15 Gaming, холодильник LG, адаптер PD20W, аэрозоли Kudo, G2100, Tytan.
   - Фирменные красные звёздочки рейтинга Kaspi, бейджи скидок и бонусов.
3. **Двухколоночная витрина**:
   - Фильтры «Рекомендации», «🔥 Бонусы», «🏷️ Скидки».
   - Кнопки добавления в избранное (сердечко).

---

## 📌 Правило для следующих правок:
При каждом новом изменении добавлять новую секцию сверху с указанием даты, запроса пользователя, списка измененных файлов и деталей реализации.
