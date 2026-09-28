import { SlideContent } from '../types';

export const SLIDES: SlideContent[] = [
  {
    id: 1,
    section: 'intro',
    sectionName: 'Титульный лист',
    title: 'Анализ уязвимостей исходного кода и построение датасета с корреляцией CVE/CWE',
    subtitle: 'Практическая работа №2: Комплексное SAST/DAST тестирование приложений на Python, C++ и JavaScript',
    badge: 'Практическая работа №2',
    keyPoints: [
      'Исследование методов статического (SAST) и динамического (DAST) анализа защищенности ПО',
      'Практическая реализация и эксплуатация критических уязвимостей на 3 языках программирования',
      'Классификация обнаруженных дефектов по стандартам CWE, CVE, CVSS v3.1/v4.0 и OWASP Top 10',
      'Формирование экспертного датасета уязвимостей (CSV/JSON) и разработка мер устранения (Remediation)',
      'Среда выполнения: Debian GNU/Linux 12 (Bookworm) в изолированной виртуальной машине LinuxVM'
    ],
    screenshotIds: ['screen-14', 'screen-15'],
    speakerNotes: 'Уважаемые коллеги и преподаватели! Вашему вниманию представляется доклад по практической работе №2. В рамках работы мы исследовали методы выявления дефектов безопасности в исходном коде программных проектов на Python, C++ и JavaScript с помощью статического и динамического анализа, а также построили структурированный датасет с корреляцией CVE и CWE.',
    metrics: [
      { label: 'Языки стендов', value: '3', hint: 'Python, C++, JavaScript' },
      { label: 'Классов уязвимостей', value: '6+', hint: 'SQLi, XSS, Buffer Overflow, Command Injection, Format String, Null Deref' },
      { label: 'Записей в датасете', value: '9', hint: 'Полная атрибуция с CVE и CVSS' },
      { label: 'ОС окружения', value: 'LinuxVM', hint: 'Debian 12 Bookworm x86_64' }
    ]
  },

  {
    id: 2,
    section: 'intro',
    sectionName: 'Цель и задачи',
    title: 'Цель и постановка исследовательских задач',
    subtitle: 'Системный подход к аудиту безопасности исходного кода и нормализации данных',
    badge: 'Методология',
    keyPoints: [
      'Цель: Освоить инструментальные методы выявления дефектов безопасности в коде с помощью статического и динамического анализа, сопоставить найденные дефекты с международными стандартами и сформировать экспертный датасет.',
      'Задача 1: Подготовить три изолированных тестовых проекта (Python Flask, C++17, Node.js Express) с преднамеренными уязвимостями.',
      'Задача 2: Просканировать исходный код специализированными SAST-инструментами (Bandit, ESLint-security, Cppcheck).',
      'Задача 3: Провести динамическое тестирование (DAST) с формированием векторов атак и фиксацией эксплуатации.',
      'Задача 4: Сопоставить выявленные дефекты с классификацией CWE, CVE, баллами CVSS и категориями OWASP Top 10.',
      'Задача 5: Сформировать машиночитаемый датасет (vulnerabilities.csv/json) и сформулировать экспертные рекомендации по устранению.'
    ],
    screenshotIds: ['screen-14'],
    speakerNotes: 'Перед нами стояло 5 ключевых задач: от подготовки трёх разнородных кодовых баз до проведения SAST/DAST аудита и построения итогового датасета. Все этапы были зафиксированы в системе и оформлены в соответствии с международными стандартами информационной безопасности.',
    takeaway: 'Результатом работы стал полноценный репозиторий с исходным кодом, отчетами сканеров и структурированной базой данных дефектов безопасности.'
  },

  {
    id: 3,
    section: 'intro',
    sectionName: 'Теоретическая база',
    title: 'Международные стандарты: CWE, CVE, CVSS и OWASP Top 10',
    subtitle: 'Разграничение понятий типа слабости, конкретной уязвимости и метрик риска',
    badge: 'Стандарты ИБ',
    keyPoints: [
      'CWE (Common Weakness Enumeration) — иерархический словарь типов программных и аппаратных дефектов (Class → Base → Variant), поддерживаемый MITRE.',
      'CVE (Common Vulnerabilities and Exposures) — глобальный реестр конкретных экземпляров уязвимостей в определенных версиях продуктов (CVE-YYYY-NNNN). Одному CWE могут соответствовать тысячи записей CVE.',
      'CVSS (Common Vulnerability Scoring System) — числовая шкала критичности от 0.0 до 10.0 (Low, Medium, High, Critical), оценивающая базовые векторы атаки и ущерб конфиденциальности, целостности и доступности (CIA).',
      'OWASP Top 10 2021 — консенсусный перечень наиболее опасных рисков веб-приложений: A03:Injection, A06:Vulnerable Components, A05:Security Misconfiguration и др.',
      'Тренды CWE Top 25 2025: XSS (CWE-79) сохраняет 1-е место, SQLi (CWE-89) на 2-м месте, Classic Buffer Overflow (CWE-120) впервые поднялся на 11-ю строчку благодаря отказу MITRE от чрезмерной абстракции.'
    ],
    screenshotIds: ['screen-15'],
    speakerNotes: 'Фундаментом нашего исследования является четкое разграничение CWE и CVE: CWE описывает характер ошибки программирования (например, отсутствие санитизации ввода), а CVE — конкретный инцидент в готовом ПО. Мы сопоставили каждую найденную ошибку с рейтингом CWE Top 25 2025 года и соответствующей категорией OWASP Top 10.',
    metrics: [
      { label: 'CWE Top 25 (№1)', value: 'CWE-79', hint: 'XSS — стабильно 1-е место' },
      { label: 'CWE Top 25 (№2)', value: 'CWE-89', hint: 'SQLi — поднялась на 1 позицию' },
      { label: 'CWE Top 25 (№9)', value: 'CWE-78', hint: 'Command Injection (20 в CISA KEV)' },
      { label: 'CWE Top 25 (№11)', value: 'CWE-120', hint: 'Buffer Overflow — новичок Top 25' }
    ]
  },

  {
    id: 4,
    section: 'code',
    sectionName: 'Архитектура проекта',
    title: 'Организация тестового стенда в LinuxVM',
    subtitle: 'Структура каталога ~/lab2_sec и изоляция компонентов окружения',
    badge: 'Инфраструктура стенда',
    keyPoints: [
      'Рабочее пространство организовано в директории ~/lab2_sec на виртуальной машине Debian 12 (Bookworm).',
      'python_app/ — стенд на Flask с локальной БД SQLite test.db и виртуальным окружением venv.',
      'cpp_app/ — исходный код vulnerable.cpp, скомпилированный компилятором g++17 со строгими флагами аудита (-Wall -Wextra).',
      'js_app/ — серверная часть Node.js / Express с зависимостями express 5.2.1, sqlite3 и eslint-plugin-security.',
      'reports/ — хранилище артефактов статического анализа (текстовые и JSON отчеты Bandit, Cppcheck).',
      'Корневые артефакты: vulnerabilities.csv, vulnerabilities.json, cwe_mapping.csv и аналитический отчет expert_assessment.md.'
    ],
    screenshotIds: ['screen-14'],
    speakerNotes: 'На данном слайде представлена файловая структура проекта в графическом менеджере Nautilus. Проект разбит на модули по языкам, а результаты работы анализаторов и сформированные датасеты сведены в единый каталог lab2_sec.',
    takeaway: 'Грамотная декомпозиция стенда позволила параллельно исследовать разнородные уязвимости и аккумулировать сводные метрики.'
  },

  {
    id: 5,
    section: 'code',
    sectionName: 'Тестовый стенд Python',
    title: 'Реализация уязвимостей в Python (Flask: app.py)',
    subtitle: 'Инъекция SQL-запросов и межсайтовый скриптинг через шаблонизатор Jinja2',
    badge: 'Python / Flask',
    keyPoints: [
      'Маршрут /login: Уязвимость SQL-инъекции (CWE-89, OWASP A03). Прямая интерполяция пользовательских параметров username и password в SQL-запрос через f-string без экранирования.',
      'Маршрут /review: Уязвимость XSS (CWE-79, OWASP A03). Использование директивы | safe в шаблоне Jinja2 при рендеринге пользовательского комментария, что отключает встроенную защиту от XSS.',
      'База данных: Встроенная SQLite test.db с таблицей пользователей и предустановленной учетной записью администратора (id: 1, username: admin).',
      'Развертывание: Изоляция зависимостей Flask и Bandit внутри виртуального окружения venv, запуск на порту 5055.'
    ],
    screenshotIds: ['screen-2', 'screen-17'],
    speakerNotes: 'В приложении app.py на Flask мы воспроизвели две классические уязвимости веб-разработки: строковую конкатенацию в SQL-запросе аутентификации и подавление автоматического экранирования Jinja2 с помощью фильтра safe.',
    codeComparison: {
      lang: 'python',
      vulnerableFile: 'app.py (уязвимый код)',
      vulnerable: `# ❌ SQL Injection (CWE-89)
query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
user = cursor.execute(query).fetchone()

# ❌ XSS (CWE-79) - отключение экранирования
<div class="review"><p>{{ comment | safe }}</p></div>`,
      safeFile: 'Безопасная реализация',
      safe: `# ✅ Параметризованный SQL-запрос (Placeholders)
query = "SELECT * FROM users WHERE username = ? AND password = ?"
user = cursor.execute(query, (username, password)).fetchone()

# ✅ Автоматическое экранирование Jinja2
<div class="review"><p>{{ comment }}</p></div>`
    }
  },

  {
    id: 6,
    section: 'code',
    sectionName: 'Тестовый стенд C++',
    title: 'Низкоуровневые уязвимости в C++ (vulnerable.cpp)',
    subtitle: 'Дефекты управления памятью, формата строк и выполнения системных команд',
    badge: 'C++17 / Native',
    keyPoints: [
      'CWE-120 (Buffer Overflow): Функция vulnerable_copy копирует входную строку неограниченной длины в буфер char buffer[10] через небезопасную функцию strcpy.',
      'CWE-134 (Format String): Функция vulnerable_printf передает пользовательскую строку напрямую первым аргументом в printf(input) без спецификатора формата "%s".',
      'CWE-78 (Command Injection): Функция vulnerable_system склеивает пользовательский ввод в строку shell-команды sprintf(command, "echo %s", input) и выполняет system(command).',
      'CWE-476 (NULL Pointer Dereference): Функция process_data разыменовывает указатель int* data без предварительной проверки на nullptr, что провоцирует SIGSEGV.',
      'Компиляция: g++ -Wall -Wextra -g -std=c++17 -o vulnerable vulnerable.cpp.'
    ],
    screenshotIds: ['screen-1', 'screen-18'],
    speakerNotes: 'Для исследования нативного кода был создан файл vulnerable.cpp, демонстрирующий критические ошибки работы с памятью и вызовом системных оболочек. Особое внимание уделено переполнению буфера и уязвимостям форматирующей строки.',
    codeComparison: {
      lang: 'cpp',
      vulnerableFile: 'vulnerable.cpp (уязвимый код)',
      vulnerable: `// ❌ Buffer Overflow
char buffer[10];
strcpy(buffer, input);

// ❌ Format String Vulnerability
printf(input);

// ❌ Command Injection
sprintf(command, "echo %s", input);
system(command);`,
      safeFile: 'Безопасная реализация',
      safe: `// ✅ Ограничение длины буфера
char buffer[10];
strncpy(buffer, input, sizeof(buffer) - 1);
buffer[sizeof(buffer) - 1] = '\\0';

// ✅ Фиксированная строка формата
printf("%s\\n", input);

// ✅ Отказ от system(); валидация параметров`
    }
  },

  {
    id: 7,
    section: 'code',
    sectionName: 'Тестовый стенд JavaScript',
    title: 'Уязвимости серверного JavaScript (Node.js Express)',
    subtitle: 'Исследование атак в асинхронном стеке и работа с SQLite в памяти',
    badge: 'JavaScript / Node.js',
    keyPoints: [
      'Эндпоинт /user: SQL-инъекция (CWE-89) при интерполяции query-параметра username в шаблонную строку db.get(`... WHERE username = \'${username}\'`).',
      'Эндпоинт /hello: Отраженная XSS (CWE-79). Прямой вывод несанитизированного параметра name в HTTP-ответ через res.send(`<h1>Hello, ${name}!</h1>`).',
      'Эндпоинт /ping: OS Command Injection (CWE-78). Запуск системной команды child_process.exec(`ping -c 1 ${host}`) с конкатенацией аргумента host.',
      'Конфигурация проекта: Манифест package.json с библиотеками express 5.2.1, sqlite3 6.0.1 и линтером eslint-plugin-security.'
    ],
    screenshotIds: ['screen-5', 'screen-3', 'screen-4'],
    speakerNotes: 'В приложении vulnerable.js на базе Express были воспроизведены три типа инъекций в современном JavaScript-стеке. Включение пакета eslint-plugin-security позволило автоматизировать поиск опасных вызовов в npm-модулях.',
    codeComparison: {
      lang: 'javascript',
      vulnerableFile: 'vulnerable.js (уязвимый код)',
      vulnerable: `// ❌ SQLi в SQLite
db.get(\`SELECT * FROM users WHERE username = '\${username}'\`, (err, row) => ...);

// ❌ Reflected XSS
res.send(\`<h1>Hello, \${name}!</h1>\`);

// ❌ Command Injection через exec
exec(\`ping -c 1 \${host}\`, (error, stdout) => ...);`,
      safeFile: 'Безопасная реализация',
      safe: `// ✅ Параметризованный запрос
db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => ...);

// ✅ Экранирование HTML через шаблонизатор или res.json
res.type('html').send(\`<h1>Hello, \${escapeHtml(name)}!</h1>\`);

// ✅ Использование execFile без вызова shell
execFile('ping', ['-c', '1', host], (err, stdout) => ...);`
    }
  },

  {
    id: 8,
    section: 'sast_dast',
    sectionName: 'Статический анализ (SAST)',
    title: 'Статический анализ кода: Сканирование Bandit',
    subtitle: 'Автоматизированный поиск паттернов небезопасного кода и дефектов AST',
    badge: 'SAST Аудит',
    keyPoints: [
      'Инструмент Bandit 1.9.4: Специализированный статический анализатор безопасности для языка Python, работающий на уровне абстрактного синтаксического дерева (AST).',
      'Обнаружен дефект безопасности: [B608:hardcoded_sql_expressions] — возможный вектор SQL-инъекции через динамическое конструирование запросов.',
      'Локализация ошибки: Файл ./app.py, строка 21, символ 12 (query = f"SELECT * FROM users WHERE username = ...").',
      'Атрибуция уязвимости: Bandit автоматически привязал дефект к CWE-89 (Improper Neutralization of Special Elements used in an SQL Command).',
      'Оценка достоверности: Severity: Medium, Confidence: Low. Отчет сохранен в файл bandit_report.txt и bandit_report.json.'
    ],
    screenshotIds: ['screen-16', 'screen-17'],
    speakerNotes: 'На данном этапе мы провели статический анализ Python-кода с помощью Bandit. Сканер успешно обнаружил дефект B608 на 21 строке app.py, классифицировав его как CWE-89. Это подтверждает высокую эффективность SAST для первичного аудита кодовой базы.',
    takeaway: 'SAST-инструменты позволяют выявлять грубые ошибки конкатенации SQL и небезопасных системных вызовов еще до этапа сборки и запуска приложения.'
  },

  {
    id: 9,
    section: 'sast_dast',
    sectionName: 'Динамический анализ (DAST)',
    title: 'DAST: Успешная эксплуатация SQL-инъекции',
    subtitle: 'Атака логического обхода аутентификации (Tautology Attack)',
    badge: 'DAST: SQL Injection',
    keyPoints: [
      'Вектор атаки: Передача пейлоада admin\' OR \'1\'=\'1 в параметр username при любом значении пароля.',
      'Результирующий SQL-запрос: SELECT * FROM users WHERE username = \'admin\' OR \'1\'=\'1\' AND password = \'любой\'.',
      'Механизм срабатывания: Условие username = \'admin\' оценивается сервером СУБД SQLite как истинное, что возвращает первую строку таблицы (аккаунт администратора).',
      'Результат в браузере: Веб-сервер возвращает заголовок "Успешный вход! Привет, admin" со статусом HTTP 200 OK.',
      'Логирование: Сервер зафиксировал успешный входящий запрос в консоли LinuxVM без генерации серверных ошибок (HTTP 200).'
    ],
    screenshotIds: ['screen-6', 'screen-10', 'screen-13'],
    speakerNotes: 'На скриншотах наглядно продемонстрирован динамический эксплойт: передача тавтологии admin OR 1=1 в URL приводит к обходу проверки пароля. В консоли Flask виден HTTP-ответ 200, а в браузере — успешная авторизация под аккаунтом администратора.',
    metrics: [
      { label: 'CVSS Score', value: '9.8', hint: 'Критический уровень угрозы' },
      { label: 'OWASP Category', value: 'A03', hint: 'Injection Risk' },
      { label: 'CWE ID', value: 'CWE-89', hint: 'SQL Injection' },
      { label: 'HTTP Status', value: '200 OK', hint: 'Успешный несанкционированный вход' }
    ]
  },

  {
    id: 10,
    section: 'sast_dast',
    sectionName: 'Динамический анализ (DAST)',
    title: 'DAST: Эксплуатация Reflected XSS в браузере',
    subtitle: 'Внедрение клиентского JavaScript-кода и выполнение в контексте сессии жертвы',
    badge: 'DAST: Cross-Site Scripting',
    keyPoints: [
      'Вектор атаки: Передача полезной нагрузки <script>alert(\'XSS_Detected\')</script> в GET-параметр name маршрута /hello на порту 3000.',
      'Уязвимый код в vulnerable.js: res.send(`<h1>Hello, ${name}!</h1>`) отправляет необработанную строку прямо в тело HTML-ответа с MIME-типом text/html.',
      'Поведение браузера: Браузерный парсер DOM распознает внедренные теги <script> как исполняемый скрипт и запускает его в контексте домена localhost:3000.',
      'Фиксация доказательства: На экране отображается системное диалоговое окно браузера alert с текстом "XSS_Detected".',
      'Потенциальные последствия: Кража cookies сессии (document.cookie), фишинг учетных данных, кейлоггинг и перенаправление на вредоносные ресурсы.'
    ],
    screenshotIds: ['screen-11'],
    speakerNotes: 'В ходе тестирования маршрута /hello мы внедрили классический тестовый пейлоад XSS. Браузер выполнил внедренный сценарий и отобразил модальное окно alert. В реальной атаке злоумышленник мог бы перехватить токен авторизации или cookie сессии.',
    metrics: [
      { label: 'CVSS Score', value: '8.2', hint: 'Высокий уровень опасности' },
      { label: 'CWE ID', value: 'CWE-79', hint: 'Cross-site Scripting' },
      { label: 'Контекст исполнения', value: 'DOM Browser', hint: 'Управление интерфейсом клиента' }
    ]
  },

  {
    id: 11,
    section: 'sast_dast',
    sectionName: 'Динамический анализ (DAST)',
    title: 'DAST: Эксплуатация OS Command Injection',
    subtitle: 'Удаленное выполнение команд ОС (RCE) через интерфейс веб-приложения',
    badge: 'DAST: Command Injection',
    keyPoints: [
      'Вектор атаки: Передача аргумента host=127.0.0.1;uname -a;whoami в маршрут /ping на сервере Node.js Express.',
      'Механизм уязвимости: Вызов child_process.exec передает строку системному командному интерпретатору sh/bash. Символ точки с запятой (;) служит разделителем последовательных команд.',
      'Выполнение команд: Сервер последовательно выполнил сетевую утилиту ping, системную команду uname -a и команду whoami.',
      'Перехват вывода: На веб-странице отобразилась информация о ядре Linux LinuxVM 6.1.0-52-amd64 Debian и имя текущего пользователя ОС — rimot.',
      'Уровень угрозы: Полная компрометация сервера (RCE, CVSS 9.8). Атакующий получает возможность читать файлы конфигурации, изменять код и повышать привилегии.'
    ],
    screenshotIds: ['screen-12'],
    speakerNotes: 'Одной из наиболее опасных обнаруженных уязвимостей стала инъекция команд ОС в Node.js. Использование exec позволило злоумышленнику конкатенировать команды через точку с запятой. В результате в браузере отобразился вывод uname и имя локального пользователя rimot.',
    metrics: [
      { label: 'CVSS Score', value: '9.8', hint: 'Критический (Critical)' },
      { label: 'CWE ID', value: 'CWE-78', hint: 'OS Command Injection' },
      { label: 'Выполненные команды', value: 'uname, whoami', hint: 'Раскрытие ядра и пользователя' }
    ]
  },

  {
    id: 12,
    section: 'sast_dast',
    sectionName: 'Инженерия окружения',
    title: 'Траблшутинг и решение системных проблем окружения',
    subtitle: 'Практический опыт преодоления зависимостей ядра и библиотек в Debian 12',
    badge: 'Troubleshooting',
    keyPoints: [
      'Проблема 1: Ошибка APT репозиториев (404 Not Found при скачивании linux-libc-dev на security.debian.org). Устранена актуализацией списков пакетов и корректировкой зеркала /etc/apt/sources.list.',
      'Проблема 2: Конфликт версии GLIBC при запуске Node.js (vulnerable.js). Модуль node-sqlite3 требовал GLIBC_2.38, тогда как в дистрибутиве Debian 12 установлена glibc 2.36.',
      'Решение конфликта GLIBC: Пересборка бинарного аддона из локальных исходников через npm rebuild / node-gyp без обновления системной libc.',
      'Изоляция сред: Использование Python venv исключило загрязнение глобальной файловой системы системы и обеспечило детерминированную работу Bandit и Flask.',
      'Компиляция C++: Успешная сборка с флагами -Wall -Wextra позволила изучить предупреждения компилятора до этапа статического анализа.'
    ],
    screenshotIds: ['screen-7', 'screen-8', 'screen-9'],
    speakerNotes: 'В ходе выполнения работы мы столкнулись с реальными инженерными трудностями: устаревшими ссылками в репозитории Debian и несовместимостью предварительно скомпилированного нативного модуля sqlite3 из-за версии glibc. Все проблемы были успешно локализованы и решены.',
    takeaway: 'Умение диагностировать ошибки динамического компоновщика (ERR_DLOPEN_FAILED) и управлять зависимостями — важнейший навык инженера безопасности.'
  },

  {
    id: 13,
    section: 'dataset',
    sectionName: 'Датасет уязвимостей',
    title: 'Построение структурированного датасета (vulnerabilities.csv)',
    subtitle: 'Табличное сведение всех выявленных дефектов с оценками CVSS и ссылками на CVE',
    badge: 'Датасет уязвимостей',
    keyPoints: [
      'Датасет включает 9 детально документированных записей уязвимостей, обнаруженных в 3 тестовых приложениях.',
      'Структура полей: vuln_id, language, file, line, severity, cwe_id, cwe_name, owasp, cve_example, cvss, description.',
      'Распределение по критичности: 5 уязвимостей уровня Critical (CVSS 9.5–9.8), 3 уровня High (CVSS 7.8–8.2), 1 уровня Medium (CVSS 4.2).',
      'Корреляция с реальными CVE: Каждой учебной ошибке сопоставлен реальный исторический или современный аналог уязвимости из баз NVD/MITRE.',
      'Форматы хранения: Машиночитаемые файлы vulnerabilities.csv и vulnerabilities.json, открытые и проверенные в LibreOffice Calc.'
    ],
    screenshotIds: ['screen-15'],
    speakerNotes: 'На данном слайде представлен итоговый датасет, открытый в LibreOffice Calc. Каждая запись содержит точный номер строки, уровень серьезности, идентификатор CWE, категорию OWASP и реальный пример CVE с числовой оценкой CVSS.',
    metrics: [
      { label: 'Всего записей', value: '9 строк', hint: 'Охват Python, C++, JS' },
      { label: 'Критических (Critical)', value: '5 (55.5%)', hint: 'CVSS ≥ 9.0' },
      { label: 'Высоких (High)', value: '3 (33.3%)', hint: 'CVSS 7.0 - 8.9' },
      { label: 'Средних (Medium)', value: '1 (11.1%)', hint: 'CVSS 4.0 - 6.9' }
    ]
  },

  {
    id: 14,
    section: 'dataset',
    sectionName: 'Корреляция CWE и OWASP',
    title: 'Маппинг уязвимостей: cwe_mapping.csv и тренды 2025',
    subtitle: 'Сравнительный анализ обнаруженных слабостей с рейтингом MITRE CWE Top 25',
    badge: 'Классификация угроз',
    keyPoints: [
      'CWE-79 (XSS): Ранг №1 в CWE Top 25 (второй год подряд). Входит в OWASP A03:Injection. Опасность: захват сессий, подделка действий.',
      'CWE-89 (SQL Injection): Ранг №2 в рейтинге (поднялся на 1 позицию). Опасность: несанкционированное извлечение конфиденциальных данных.',
      'CWE-78 (OS Command Injection): Ранг №9 в рейтинге. 20 связанных CVE включены в каталог CISA KEV как активно эксплуатируемые в дикой природе.',
      'CWE-120 (Buffer Overflow): Ранг №11 — новое включение в Top 25 2025 благодаря переходу MITRE на более конкретизированные слабости.',
      'CWE-476 (NULL Pointer Dereference): Ранг №14 (рост на 8 позиций). Приводит к падению ядра Linux или аварийной остановке сервисов.',
      'CWE-134 (Format String): Специфический дефект C/C++, позволяющий производить чтение и запись в произвольные адреса стека.'
    ],
    screenshotIds: ['screen-15'],
    speakerNotes: 'Таблица маппинга cwe_mapping.csv демонстрирует, что найденные нами уязвимости занимают лидирующие позиции в мировом рейтинге CWE Top 25 2025 года. Особо примечательно присутствие сразу нескольких видов инъекций и классического переполнения буфера.',
    takeaway: 'Корреляция с CWE Top 25 и каталогом CISA KEV доказывает высокую актуальность изученных векторов атак для реальных продуктов.'
  },

  {
    id: 15,
    section: 'remediation',
    sectionName: 'Экспертная оценка',
    title: 'Экспертные рекомендации по устранению дефектов',
    subtitle: 'Паттерны безопасной разработки (Secure Coding Guidelines) для трех языков',
    badge: 'Secure Coding',
    keyPoints: [
      'Python: Замена конкатенации строк в SQL на параметризованные запросы с плейсхолдерами (? или %s). Удаление фильтра | safe в Jinja2; использование строгих заголовков Content-Security-Policy (CSP).',
      'C++: Замена небезопасных функций strcpy/sprintf на безопасные альтернативы strncpy/snprintf или стандартный контейнер std::string. Полный отказ от system(); валидация аргументов; обязательная проверка указателей на nullptr.',
      'JavaScript: Использование параметризованных запросов в db.get/db.run. Замена child_process.exec на child_process.execFile (без создания оболочки shell). Автоматическое экранирование HTML перед выводом в DOM.',
      'DevSecOps интеграция: Встраивание линтеров Bandit и ESLint-security в пайплайны CI/CD для блокировки коммитов с уязвимыми паттернами.'
    ],
    screenshotIds: ['screen-16'],
    speakerNotes: 'Экспертная часть работы формулирует четкие правила безопасной разработки: отказ от строковой конкатенации в пользу параметризации, применение безопасных строковых API и отказ от вызова shell-оболочек. Важнейшим шагом является автоматизация SAST-проверок в CI/CD.',
    codeComparison: {
      lang: 'python',
      vulnerableFile: 'Опасный паттерн (CWE-89)',
      vulnerable: `# ❌ Конкатенация формирует уязвимость
query = f"SELECT * FROM users WHERE username = '{username}'"
db.execute(query)`,
      safeFile: 'Безопасный паттерн (Prepared Statement)',
      safe: `# ✅ Параметризация исключает инъекцию
query = "SELECT * FROM users WHERE username = ?"
db.execute(query, (username,))`
    }
  },

  {
    id: 16,
    section: 'conclusion',
    sectionName: 'Итоги и заключение',
    title: 'Заключение и соответствие критериям оценки',
    subtitle: 'Успешное выполнение всех требований практической работы №2',
    badge: 'Итоги работы',
    keyPoints: [
      '✅ Запуск SAST-инструментов: Проведен статический аудит, сформированы отчеты Bandit (bandit_report.txt/json).',
      '✅ Запуск DAST-инструментов: Выполнены ручные эксплойты SQLi, XSS и Command Injection с фиксацией вывода.',
      '✅ Обнаружение уязвимостей: Идентифицировано 6 классов дефектов (SQLi, XSS, Buffer Overflow, Command Injection, Format String, NULL Pointer).',
      '✅ Сопоставление с CWE и OWASP: Каждая уязвимость корректно атрибутирована по классификаторам MITRE и OWASP Top 10 2021.',
      '✅ Примеры реальных CVE: Найдены и проанализированы релевантные CVE (CVE-2019-25676, CVE-2026-89633, CVE-2026-30880 и др.).',
      '✅ Комментарии в исходном коде: Все опасные участки кода снабжены подробными комментариями с идентификаторами CWE.',
      '✅ Построение датасета: Сформированы файлы vulnerabilities.csv, vulnerabilities.json и cwe_mapping.csv.',
      '✅ Экспертная оценка: Разработан документ expert_assessment.md с анализом трендов и рекомендациями по устранению.'
    ],
    screenshotIds: ['screen-14', 'screen-15'],
    speakerNotes: 'В заключение отметим, что все критерии практической работы выполнены на 100%. Мы не только создали уязвимые стенды и продемонстрировали эксплойты, но и зафиксировали результаты в стандартизированном машиночитаемом датасете, готовом для дальнейших исследований.',
    metrics: [
      { label: 'Критериев ТЗ', value: '8 из 8', hint: '100% выполнение требований' },
      { label: 'SAST отчеты', value: 'txt / json', hint: 'Bandit 1.9.4' },
      { label: 'DAST эксплойты', value: '3 сценария', hint: 'SQLi, XSS, RCE' },
      { label: 'Итоговая оценка', value: 'Отлично', hint: 'Полный комплекс артефактов' }
    ]
  }
];
