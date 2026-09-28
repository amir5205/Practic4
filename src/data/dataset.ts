import { VulnerabilityRecord, CweMappingRecord } from '../types';

export const VULNERABILITIES_DATASET: VulnerabilityRecord[] = [
  {
    vuln_id: 1,
    language: 'Python',
    file: 'app.py',
    line: 20,
    severity: 'Critical',
    cwe_id: 'CWE-89',
    cwe_name: 'SQL Injection',
    owasp: 'A03:2021-Injection',
    cve_example: 'CVE-2019-25676',
    cvss: 9.8,
    description: 'Конкатенация строк в SQL-запросе аутентификации'
  },
  {
    vuln_id: 2,
    language: 'Python',
    file: 'app.py',
    line: 34,
    severity: 'High',
    cwe_id: 'CWE-79',
    cwe_name: 'Stored/Reflected XSS',
    owasp: 'A03:2021-Injection',
    cve_example: 'CVE-2005-3308',
    cvss: 8.2,
    description: 'Отключение экранирования фильтром safe в Jinja2'
  },
  {
    vuln_id: 3,
    language: 'C++',
    file: 'vulnerable.cpp',
    line: 12,
    severity: 'Critical',
    cwe_id: 'CWE-120',
    cwe_name: 'Buffer Overflow',
    owasp: 'A06:2021-Vulnerable Components',
    cve_example: 'CVE-2026-89633',
    cvss: 9.5,
    description: 'strcpy без ограничения размера буфера'
  },
  {
    vuln_id: 4,
    language: 'C++',
    file: 'vulnerable.cpp',
    line: 26,
    severity: 'Critical',
    cwe_id: 'CWE-78',
    cwe_name: 'Command Injection',
    owasp: 'A03:2021-Injection',
    cve_example: 'CVE-2026-30880',
    cvss: 9.8,
    description: 'system() с передачей несанитизированных аргументов'
  },
  {
    vuln_id: 5,
    language: 'C++',
    file: 'vulnerable.cpp',
    line: 18,
    severity: 'High',
    cwe_id: 'CWE-134',
    cwe_name: 'Format String',
    owasp: 'A03:2021-Injection',
    cve_example: 'CVE-2020-37243',
    cvss: 7.8,
    description: 'Использование printf с внешним спецификатором формата'
  },
  {
    vuln_id: 6,
    language: 'C++',
    file: 'vulnerable.cpp',
    line: 32,
    severity: 'Medium',
    cwe_id: 'CWE-476',
    cwe_name: 'NULL Pointer Dereference',
    owasp: 'A05:2021-Security Misconfiguration',
    cve_example: 'CVE-2026-89749',
    cvss: 4.2,
    description: 'Разыменование указателя без проверки на nullptr'
  },
  {
    vuln_id: 7,
    language: 'JavaScript',
    file: 'vulnerable.js',
    line: 18,
    severity: 'Critical',
    cwe_id: 'CWE-89',
    cwe_name: 'SQL Injection',
    owasp: 'A03:2021-Injection',
    cve_example: 'CVE-2020-37243',
    cvss: 9.8,
    description: 'Инъекция SQL-команд через строковый шаблон'
  },
  {
    vuln_id: 8,
    language: 'JavaScript',
    file: 'vulnerable.js',
    line: 26,
    severity: 'High',
    cwe_id: 'CWE-79',
    cwe_name: 'Reflected XSS',
    owasp: 'A03:2021-Injection',
    cve_example: 'CVE-2005-3309',
    cvss: 8.2,
    description: 'Прямой вывод данных в HTML без санитизации'
  },
  {
    vuln_id: 9,
    language: 'JavaScript',
    file: 'vulnerable.js',
    line: 33,
    severity: 'Critical',
    cwe_id: 'CWE-78',
    cwe_name: 'Command Injection',
    owasp: 'A03:2021-Injection',
    cve_example: 'CVE-2026-30880',
    cvss: 9.8,
    description: 'Прямой запуск shell-команды через child_process.exec'
  }
];

export const CWE_MAPPING_DATASET: CweMappingRecord[] = [
  {
    cwe_id: 'CWE-79',
    cwe_name: 'Cross-site Scripting (XSS)',
    rank_2025: 1,
    owasp_category: 'A03:2021-Injection',
    typical_impact: 'Захват пользовательской сессии, кража куки и конфиденциальных данных'
  },
  {
    cwe_id: 'CWE-89',
    cwe_name: 'SQL Injection',
    rank_2025: 2,
    owasp_category: 'A03:2021-Injection',
    typical_impact: 'Полная утечка базы данных, обход аутентификации, подмена записей'
  },
  {
    cwe_id: 'CWE-78',
    cwe_name: 'OS Command Injection',
    rank_2025: 9,
    owasp_category: 'A03:2021-Injection',
    typical_impact: 'Удаленное выполнение произвольных команд (RCE), компрометация ОС'
  },
  {
    cwe_id: 'CWE-120',
    cwe_name: 'Buffer Overflow',
    rank_2025: 11,
    owasp_category: 'A06:2021-Vulnerable Components',
    typical_impact: 'Перезапись памяти процесса, повреждение стека, удаленное исполнение кода'
  },
  {
    cwe_id: 'CWE-476',
    cwe_name: 'NULL Pointer Dereference',
    rank_2025: 14,
    owasp_category: 'A05:2021-Security Misconfiguration',
    typical_impact: 'Аварийное завершение процесса ядра/приложения (Denial of Service)'
  },
  {
    cwe_id: 'CWE-134',
    cwe_name: 'Format String Vulnerability',
    rank_2025: '—',
    owasp_category: 'A03:2021-Injection',
    typical_impact: 'Утечка содержимого стека памяти, перезапись указателей адресов'
  }
];

export function getVulnerabilitiesCsv(): string {
  const headers = ['vuln_id', 'language', 'file', 'line', 'severity', 'cwe_id', 'cwe_name', 'owasp', 'cve_example', 'cvss', 'description'];
  const rows = VULNERABILITIES_DATASET.map(v => [
    v.vuln_id,
    v.language,
    v.file,
    v.line,
    v.severity,
    v.cwe_id,
    `"${v.cwe_name}"`,
    v.owasp,
    v.cve_example,
    v.cvss,
    `"${v.description}"`
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function getCweMappingCsv(): string {
  const headers = ['cwe_id', 'cwe_name', 'rank_2025', 'owasp_category', 'typical_impact'];
  const rows = CWE_MAPPING_DATASET.map(m => [
    m.cwe_id,
    `"${m.cwe_name}"`,
    m.rank_2025,
    `"${m.owasp_category}"`,
    `"${m.typical_impact}"`
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
