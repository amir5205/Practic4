import { ScreenshotRef } from '../types';

export const SCREENSHOTS: Record<string, ScreenshotRef> = {
  'screen-1': {
    id: 'screen-1',
    originalFileName: 'Снимок экрана 2026-09-21 214018.png',
    title: 'Исходный код C++ стенда (vulnerable.cpp)',
    category: 'code',
    windowTitle: 'app.py / vulnerable.cpp — Text Editor',
    appType: 'gedit',
    timestamp: '21 Sep 21:40',
    filePath: '~/lab2_sec/cpp_app/vulnerable.cpp',
    description: 'Реализация уязвимостей переполнения буфера (CWE-120), format string (CWE-134), command injection (CWE-78) и разыменования нулевого указателя (CWE-476).',
    highlightText: 'CWE-120, CWE-134, CWE-78, CWE-476 с аннотациями OWASP в комментариях',
    details: {
      codeSnippet: `using namespace std;

// Buffer Overflow (CWE-120, OWASP A06)
void vulnerable_copy(char* input) {
    char buffer[10];
    strcpy(buffer, input);
    cout << "Copied: " << buffer << endl;
}

// Format String (CWE-134, OWASP A03)
void vulnerable_printf(char* input) {
    printf(input);
    printf("\\n");
}

// Command Injection (CWE-78, OWASP A03)
void vulnerable_system(char* input) {
    char command[100];
    sprintf(command, "echo %s", input);
    system(command);
}

// NULL Pointer Dereference (CWE-476, OWASP A05) - строка 32
void process_data(int* data) {
    *data = 42;
}

int main(int argc, char* argv[]) {
    if (argc < 2) return 1;
    vulnerable_copy(argv[1]);
    vulnerable_printf(argv[1]);
    vulnerable_system(argv[1]);
    return 0;
}`
    }
  },

  'screen-2': {
    id: 'screen-2',
    originalFileName: 'Снимок экрана 2026-09-21 215717.png',
    title: 'Исходный код Python стенда (app.py)',
    category: 'code',
    windowTitle: 'app.py — Text Editor (~/lab2_sec/python_app)',
    appType: 'gedit',
    timestamp: '21 Sep 22:38',
    filePath: '~/lab2_sec/python_app/app.py',
    description: 'Сервер Flask с уязвимым маршрутом авторизации /login (конкатенация SQL f-string) и XSS-маршрутом /review с фильтром | safe.',
    highlightText: 'query = f"SELECT * FROM users WHERE username = \'{username}\' AND password = \'{password}\'"',
    details: {
      codeSnippet: `from flask import Flask, request, jsonify, render_template_string
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)")
    cursor.execute("INSERT OR IGNORE INTO users VALUES (1, 'admin', 'password123')")
    conn.commit()
    conn.close()

# SQL-инъекция (CWE-89, OWASP A03)
@app.route('/login', methods=['GET', 'POST'])
def login():
    username = request.args.get('username') or request.form.get('username', '')
    password = request.args.get('password') or request.form.get('password', '')
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    user = cursor.execute(query).fetchone()
    conn.close()
    if user:
        return f"<h1>Успешный вход! Привет, {user[1]}</h1>"
    return "<h1>Неверный логин или пароль</h1>", 401

# Хранимая/Отраженная XSS (CWE-79, OWASP A03)
@app.route('/review', methods=['GET'])
def review():
    comment = request.args.get('comment', 'Тестовый комментарий')
    template = """
    <h2>Отзывы:</h2>
    <div class="review"><p>{{ comment | safe }}</p></div>
    """
    return render_template_string(template, comment=comment)

if __name__ == '__main__':
    init_db()
    app.run(port=5055, debug=False)`
    }
  },

  'screen-3': {
    id: 'screen-3',
    originalFileName: 'Снимок экрана 2026-09-21 215729.png',
    title: 'Конфигурация зависимостей JS стенда (package.json)',
    category: 'code',
    windowTitle: 'package.json — Text Editor (~/lab2_sec/js_app)',
    appType: 'gedit',
    timestamp: '21 Sep 22:38',
    filePath: '~/lab2_sec/js_app/package.json',
    description: 'Манифест npm с зависимостями express 5.2.1, sqlite3 6.0.1 и плагинами статического анализа eslint-plugin-security.',
    highlightText: '"dependencies": { "express": "^5.2.1", "sqlite3": "^6.0.1" }',
    details: {
      codeSnippet: `{
  "name": "js_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.2.1",
    "sqlite3": "^6.0.1"
  },
  "devDependencies": {
    "eslint": "^10.11.0",
    "eslint-plugin-security": "^4.0.1"
  }
}`
    }
  },

  'screen-4': {
    id: 'screen-4',
    originalFileName: 'Снимок экрана 2026-09-21 223545.png',
    title: 'Дерево зависимостей npm (package-lock.json)',
    category: 'code',
    windowTitle: 'package-lock.json — Text Editor (~/lab2_sec/js_app)',
    appType: 'gedit',
    timestamp: '21 Sep 22:38',
    filePath: '~/lab2_sec/js_app/package-lock.json',
    description: 'Фиксация версий библиотек и контрольных сумм целостности пакетов npm в Node.js стенде.',
    details: {
      codeSnippet: `{
  "name": "js_app",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "js_app",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "express": "^5.2.1",
        "sqlite3": "^6.0.1"
      },
      "devDependencies": {
        "eslint": "^10.11.0",
        "eslint-plugin-security": "^4.0.1"
      }
    }
  }
}`
    }
  },

  'screen-5': {
    id: 'screen-5',
    originalFileName: 'Снимок экрана 2026-09-21 223756.png',
    title: 'Исходный код Node.js стенда (vulnerable.js)',
    category: 'code',
    windowTitle: 'vulnerable.js — Text Editor (~/lab2_sec/js_app)',
    appType: 'gedit',
    timestamp: '21 Sep 22:39',
    filePath: '~/lab2_sec/js_app/vulnerable.js',
    description: 'Сервер Express с тремя уязвимыми эндпоинтами: SQLi в /user, XSS в /hello и Command Injection через child_process.exec в /ping.',
    highlightText: 'exec(`ping -c 1 ${host}`), res.send(`<h1>Hello, ${name}!</h1>`), db.get(`... ${username}`)',
    details: {
      codeSnippet: `const express = require('express');
const sqlite3 = require('sqlite3');
const { exec } = require('child_process');

const app = express();
app.use(express.urlencoded({ extended: true }));
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INT, username TEXT)");
    db.run("INSERT INTO users VALUES (1, 'admin')");
});

// SQL Injection (CWE-89, OWASP A03)
app.get('/user', (req, res) => {
    const username = req.query.username;
    db.get(\`SELECT * FROM users WHERE username = '\${username}'\`, (err, row) => {
        res.json(row || { error: "User not found" });
    });
});

// Reflected XSS (CWE-79, OWASP A03)
app.get('/hello', (req, res) => {
    const name = req.query.name || "Гость";
    res.send(\`<h1>Hello, \${name}!</h1>\`);
});

// Command Injection (CWE-78, OWASP A03)
app.get('/ping', (req, res) => {
    const host = req.query.host;
    exec(\`ping -c 1 \${host}\`, (error, stdout) => {
        res.send(\`<pre>\${stdout}</pre>\`);
    });
});

app.listen(3000, () => {
    console.log("Node.js сервер запущен на http://localhost:3000");
});`
    }
  },

  'screen-6': {
    id: 'screen-6',
    originalFileName: 'Снимок экрана 2026-09-21 223810.png',
    title: 'Запуск Flask приложения и перехват атаки в логах',
    category: 'terminal',
    windowTitle: 'rimot@LinuxVM: ~/lab2_sec/js_app',
    appType: 'terminal',
    timestamp: '21 Sep 22:53',
    command: 'cd ~/lab2_sec/python_app && source venv/bin/activate && python3 app.py',
    description: 'Лог выполнения Flask-сервера. Виден входящий GET-запрос со встроенным эксплойтом SQLi и HTTP статус 200.',
    details: {
      terminalOutput: `rimot@LinuxVM:~/lab2_sec/js_app$ cd ~/lab2_sec/python_app && source venv/bin/activate && python3 app.py
 * Serving Flask app 'app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5055
Press CTRL+C to quit
127.0.0.1 - - [21/Sep/2026 22:53:29] "GET /login?username=admin'%20OR%20'1'='1&password=любой HTTP/1.1" 200 -
127.0.0.1 - - [21/Sep/2026 22:53:29] "GET /favicon.ico HTTP/1.1" 404 -`
    }
  },

  'screen-7': {
    id: 'screen-7',
    originalFileName: 'Снимок экрана 2026-09-21 223827.png',
    title: 'Траблшутинг: Ошибка обновления пакетов Debian Bookworm',
    category: 'terminal',
    windowTitle: 'rimot@LinuxVM: ~',
    appType: 'terminal',
    timestamp: '21 Sep 22:38',
    command: 'sudo apt-get install python3-dev python3-pip',
    description: 'Демонстрация ошибки репозиториев (404 Not Found на security.debian.org) при сборке окружения.',
    details: {
      terminalOutput: `Get:10 http://deb.debian.org/debian bookworm/main amd64 python3-wheel all 0.38.4-2 [30.8 kB]
Get:11 http://deb.debian.org/debian bookworm/main amd64 python3-pip all 23.0.1+dfsg-1 [1,325 kB]
Fetched 8,472 kB in 59s (144 kB/s)
E: Failed to fetch http://security.debian.org/debian-security/pool/updates/main/l/linux/linux-libc-dev_6.1.180-1_amd64.deb  404  Not Found [IP: 146.75.118.132 80]
E: Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?
rimot@LinuxVM:~$ `
    }
  },

  'screen-8': {
    id: 'screen-8',
    originalFileName: 'Снимок экрана 2026-09-21 223845.png',
    title: 'Установка Node.js и npm через системный пакетный менеджер',
    category: 'terminal',
    windowTitle: 'rimot@LinuxVM: ~/lab2_sec/python_app',
    appType: 'terminal',
    timestamp: '21 Sep 22:38',
    command: 'sudo apt update && sudo apt install nodejs npm -y',
    description: 'Успешная конфигурация среды Node.js (v18.20.4) и npm (9.2.0) после корректировки источников APT.',
    details: {
      terminalOutput: `Setting up webpack (5.75.0+dfsg+~cs17.16.14-1+deb12u1) ...
Setting up node-tap (16.3.2+ds1+~cs50.8.16-1+deb12u1) ...
Setting up node-css-loader (6.7.2+~cs14.0.11-1) ...
Setting up npm (9.2.0~ds1-1) ...
Processing triggers for libc-bin (2.36-9+deb12u14) ...
Processing triggers for man-db (2.11.2-2) ...
rimot@LinuxVM:~$ cat /etc/apt/sources.list
#deb cdrom:[Debian GNU/Linux 12.0.0 _Bookworm_ - Official amd64 NETINST with firmware 20230610-10:21]/ bookworm main non-free`
    }
  },

  'screen-9': {
    id: 'screen-9',
    originalFileName: 'Снимок экрана 2026-09-21 223937.png',
    title: 'Траблшутинг: Несовместимость prebuilt binary sqlite3 (GLIBC_2.38)',
    category: 'terminal',
    windowTitle: 'rimot@LinuxVM: ~/lab2_sec/js_app',
    appType: 'terminal',
    timestamp: '21 Sep 22:39',
    command: 'cd ~/lab2_sec/js_app && node vulnerable.js',
    description: 'Конфликт версий glibc (бинарник требовал GLIBC_2.38, тогда как в Debian 12 Bookworm установлена glibc 2.36). Устранено пересборкой из исходников.',
    details: {
      terminalOutput: `rimot@LinuxVM:~/lab2_sec/js_app$ cd ~/lab2_sec/js_app && node vulnerable.js
/home/rimot/lab2_sec/js_app/node_modules/bindings/bindings.js:121
        throw e;
        ^

Error: /lib/x86_64-linux-gnu/libm.so.6: version 'GLIBC_2.38' not found (required by /home/rimot/lab2_sec/js_app/node_modules/sqlite3/build/Release/node_sqlite3.node)
    at Module._extensions..node (node:internal/modules/cjs/loader:1460:18)
    at Module.load (node:internal/modules/cjs/loader:1203:32)
    at Module._load (node:internal/modules/cjs/loader:1019:12)
    at Module.require (node:internal/modules/cjs/loader:1231:19)
    at require (node:internal/modules/helpers:177:18)
    at bindings (/home/rimot/lab2_sec/js_app/node_modules/bindings/bindings.js:112:48)
    code: 'ERR_DLOPEN_FAILED'
}

Node.js v18.20.4
rimot@LinuxVM:~/lab2_sec/js_app$ `
    }
  },

  'screen-10': {
    id: 'screen-10',
    originalFileName: 'Снимок экрана 2026-09-21 225432.png',
    title: 'DAST: Успешная эксплуатация SQL-инъекции (обход пароля)',
    category: 'browser',
    windowTitle: 'localhost:5055/login?username=admin\' OR \'1\'=\'1&password=любой — Firefox',
    appType: 'firefox',
    timestamp: '21 Sep 22:54',
    url: "http://localhost:5055/login?username=admin' OR '1'='1&password=любой",
    description: 'Внедрение нагрузки admin\' OR \'1\'=\'1 привело к истинному условию SQL-запроса и несанкционированному входу администратора без знания пароля.',
    details: {
      browserContent: 'Успешный вход! Привет, admin'
    }
  },

  'screen-11': {
    id: 'screen-11',
    originalFileName: 'Снимок экрана 2026-09-21 225446.png',
    title: 'DAST: Успешная эксплуатация Reflected XSS в браузере',
    category: 'browser',
    windowTitle: 'localhost:3000/hello?name=<script>alert(\'XSS_Detected\')</script> — Firefox',
    appType: 'firefox',
    timestamp: '21 Sep 22:54',
    url: "http://localhost:3000/hello?name=<script>alert('XSS_Detected')</script>",
    description: 'Выполнение внедренного скрипта JavaScript в DOM браузера через параметр name. Отображено модальное окно alert.',
    details: {
      browserAlert: 'XSS_Detected',
      browserContent: 'Hello,'
    }
  },

  'screen-12': {
    id: 'screen-12',
    originalFileName: 'Снимок экрана 2026-09-21 225511.png',
    title: 'DAST: Успешная эксплуатация OS Command Injection',
    category: 'browser',
    windowTitle: 'localhost:3000/ping?host=127.0.0.1;uname -a;whoami — Firefox',
    appType: 'firefox',
    timestamp: '21 Sep 22:55',
    url: 'http://localhost:3000/ping?host=127.0.0.1;uname -a;whoami',
    description: 'Внедрение разделителя команд ";" позволило выполнить системные утилиты Linux (uname, whoami) с правами пользователя rimot.',
    details: {
      browserContent: `PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.908 ms

--- 127.0.0.1 ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 0.908/0.908/0.908/0.000 ms
Linux LinuxVM 6.1.0-52-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.180-1 (2026-08-03) x86_64 GNU/Linux
rimot`
    }
  },

  'screen-13': {
    id: 'screen-13',
    originalFileName: 'Снимок экрана 2026-09-21 225846.png',
    title: 'DAST: Фиксация веб-ответа при SQLi-атаке',
    category: 'browser',
    windowTitle: 'localhost:5055/login — Firefox',
    appType: 'firefox',
    timestamp: '21 Sep 22:58',
    url: "http://localhost:5055/login?username=admin' OR '1'='1&password=любой",
    description: 'Верификация устойчивости эксплойта и корректности рендеринга страницы приветствия учетной записи admin.',
    details: {
      browserContent: 'Успешный вход! Привет, admin'
    }
  },

  'screen-14': {
    id: 'screen-14',
    originalFileName: 'Снимок экрана 2026-09-21 225908.png',
    title: 'Файловая структура проекта в проводнике GNOME (Nautilus)',
    category: 'file_manager',
    windowTitle: 'Home / lab2_sec — Files',
    appType: 'nautilus',
    timestamp: '21 Sep 22:59',
    filePath: '/home/rimot/lab2_sec',
    description: 'Организация каталогов и файлов практической работы: cpp_app, python_app, js_app, reports, датасеты vulnerabilities.csv/.json, cwe_mapping.csv, expert_assessment.md.',
    details: {
      tableHeaders: ['Имя файла / папки', 'Тип', 'Назначение'],
      tableRows: [
        ['cpp_app', 'Папка', 'Исходники и бинарник C++'],
        ['js_app', 'Папка', 'Node.js Express стенд'],
        ['python_app', 'Папка', 'Flask стенд + SQLite'],
        ['reports', 'Папка', 'Отчеты SAST (bandit_report.txt/json, cppcheck)'],
        ['vulnerabilities.csv', 'Файл CSV', 'Основной датасет с 9 уязвимостями'],
        ['vulnerabilities.json', 'Файл JSON', 'Экспорт датасета в формат JSON'],
        ['cwe_mapping.csv', 'Файл CSV', 'Таблица сопоставления CWE и OWASP'],
        ['expert_assessment.md', 'Файл MD', 'Экспертный отчет и рекомендации']
      ]
    }
  },

  'screen-15': {
    id: 'screen-15',
    originalFileName: 'Снимок экрана 2026-09-21 225923.png',
    title: 'Таблица датасета vulnerabilities.csv в LibreOffice Calc',
    category: 'calc',
    windowTitle: 'vulnerabilities.csv — LibreOffice Calc',
    appType: 'libreoffice',
    timestamp: '21 Sep 23:02',
    filePath: '/home/rimot/lab2_sec/vulnerabilities.csv',
    description: 'Табличное представление всех 9 уязвимостей со строгими атрибутами: vuln_id, language, file, line, severity, cwe_id, cwe_name, owasp, cve_example, cvss, description.',
    details: {
      tableHeaders: ['vuln_id', 'language', 'file', 'line', 'severity', 'cwe_id', 'cwe_name', 'owasp', 'cve_example', 'cvss', 'description'],
      tableRows: [
        [1, 'Python', 'app.py', 20, 'Critical', 'CWE-89', 'SQL Injection', 'A03', 'CVE-2019-25676', 9.8, 'Конкатенация строк в SQL-запросе аутентификации'],
        [2, 'Python', 'app.py', 34, 'High', 'CWE-79', 'Stored/Reflected XSS', 'A03', 'CVE-2005-3308', 8.2, 'Отключение экранирования фильтром safe в Jinja2'],
        [3, 'C++', 'vulnerable.cpp', 12, 'Critical', 'CWE-120', 'Buffer Overflow', 'A06', 'CVE-2026-89633', 9.5, 'strcpy без ограничения размера буфера'],
        [4, 'C++', 'vulnerable.cpp', 26, 'Critical', 'CWE-78', 'Command Injection', 'A03', 'CVE-2026-30880', 9.8, 'system() с передачей несанитизированных аргументов'],
        [5, 'C++', 'vulnerable.cpp', 18, 'High', 'CWE-134', 'Format String', 'A03', 'CVE-2020-37243', 7.8, 'Использование printf с внешним спецификатором формата'],
        [6, 'C++', 'vulnerable.cpp', 32, 'Medium', 'CWE-476', 'NULL Pointer Dereference', 'A05', 'CVE-2026-89749', 4.2, 'Разыменование указателя без проверки на nullptr'],
        [7, 'JavaScript', 'vulnerable.js', 18, 'Critical', 'CWE-89', 'SQL Injection', 'A03', 'CVE-2020-37243', 9.8, 'Инъекция SQL-команд через строковый шаблон'],
        [8, 'JavaScript', 'vulnerable.js', 26, 'High', 'CWE-79', 'Reflected XSS', 'A03', 'CVE-2005-3309', 8.2, 'Прямой вывод данных в HTML без санитизации'],
        [9, 'JavaScript', 'vulnerable.js', 33, 'Critical', 'CWE-78', 'Command Injection', 'A03', 'CVE-2026-30880', 9.8, 'Прямой запуск shell-команды через child_process.exec']
      ]
    }
  },

  'screen-16': {
    id: 'screen-16',
    originalFileName: 'Снимок экрана 2026-09-21 230204.png',
    title: 'SAST Отчет сканера Bandit (bandit_report.txt)',
    category: 'report',
    windowTitle: 'bandit_report.txt — Text Editor (~/lab2_sec/reports)',
    appType: 'gedit',
    timestamp: '21 Sep 23:03',
    filePath: '~/lab2_sec/reports/bandit_report.txt',
    description: 'Результаты статического анализатора кода Bandit для Python. Обнаружена уязвимость B608 (CWE-89) на строке 21 в app.py.',
    highlightText: '>> Issue: [B608:hardcoded_sql_expressions] Possible SQL injection vector through string-based query construction.',
    details: {
      codeSnippet: `Run started:2026-09-21 19:41:49.656438+00:00

Test results:
>> Issue: [B608:hardcoded_sql_expressions] Possible SQL injection vector through string-based query construction.
   Severity: Medium  Confidence: Low
   CWE: CWE-89 (https://cwe.mitre.org/data/definitions/89.html)
   More Info: https://bandit.readthedocs.io/en/1.9.4/plugins/b608_hardcoded_sql_expressions.html
   Location: ./app.py:21:12
20      cursor = conn.cursor()
21      query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
22      user = cursor.execute(query).fetchone()

--------------------------------------------------

Code scanned:
    Total lines of code: 33
    Total lines skipped (#nosec): 0

Run metrics:
    Total issues (by severity):
        Medium: 1
    Total issues (by confidence):
        Low: 1`
    }
  },

  'screen-17': {
    id: 'screen-17',
    originalFileName: 'Снимок экрана 2026-09-21 230247.png',
    title: 'Установка SAST сканера Bandit в Python venv',
    category: 'terminal',
    windowTitle: 'rimot@LinuxVM: ~/lab2_sec/python_app',
    appType: 'terminal',
    timestamp: '21 Sep 23:02',
    command: 'pip install bandit',
    description: 'Развертывание анализатора безопасности исходного кода Bandit 1.9.4 в изолированной виртуальной среде Python.',
    details: {
      terminalOutput: `Downloading werkzeug-3.1.8-py3-none-any.whl (226 kB)
Collecting PyYAML>=5.3.1
Downloading pyyaml-6.0.3-cp311-manylinux2014_x86_64.manylinux_2_17_x86_64.whl (806 kB)
Collecting stevedore>=1.20.0
Collecting rich
Collecting markdown-it-py>=2.2.0
Collecting pygments<3.0.0,>=2.13.0
Collecting mdurl~=0.1
Installing collected packages: stevedore, PyYAML, pygments, mdurl, markupsafe, itsdangerous, click, blinker, werkzeug, markdown-it-py, jinja2, rich, flask, bandit
Successfully installed PyYAML-6.0.3 bandit-1.9.4 blinker-1.9.0 click-8.5.0 flask-3.1.3 itsdangerous-2.2.0 jinja2-3.1.6 markdown-it-py-4.2.0 markupsafe-3.0.3 mdurl-0.1.2 pygments-2.21.0 rich-15.0.0 stevedore-5.9.1 werkzeug-3.1.8
(venv) rimot@LinuxVM:~/lab2_sec/python_app$ `
    }
  },

  'screen-18': {
    id: 'screen-18',
    originalFileName: 'Снимок экрана 2026-09-21 230327.png',
    title: 'Компиляция стенда C++ и инициализация проекта JS',
    category: 'terminal',
    windowTitle: 'rimot@LinuxVM: ~/lab2_sec/js_app',
    appType: 'terminal',
    timestamp: '21 Sep 23:03',
    command: 'g++ -Wall -Wextra -g -std=c++17 -o vulnerable vulnerable.cpp && cd ~/lab2_sec && mkdir -p js_app && cd js_app && npm init -y',
    description: 'Успешная сборка бинарного файла vulnerable на C++17 с отладочной информацией и генерация шаблона package.json для JavaScript.',
    details: {
      terminalOutput: `rimot@LinuxVM:~/lab2_sec/cpp_app$ g++ -Wall -Wextra -g -std=c++17 -o vulnerable vulnerable.cpp
rimot@LinuxVM:~/lab2_sec/cpp_app$ cd ~/lab2_sec
rimot@LinuxVM:~/lab2_sec$ mkdir -p ~/lab2_sec/js_app && cd ~/lab2_sec/js_app
rimot@LinuxVM:~/lab2_sec/js_app$ npm init -y
Wrote to /home/rimot/lab2_sec/js_app/package.json:

{
  "name": "js_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

rimot@LinuxVM:~/lab2_sec/js_app$ `
    }
  }
};
