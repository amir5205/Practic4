import React, { useState } from 'react';
import { VULNERABILITIES_DATASET, CWE_MAPPING_DATASET, getVulnerabilitiesCsv, getCweMappingCsv } from '../data/dataset';
import { VulnerabilityRecord, CweMappingRecord } from '../types';
import { Download, Search, Filter, ShieldAlert, FileText, CheckCircle2, ChevronDown } from 'lucide-react';

export const DatasetView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vulnerabilities' | 'cwe_mapping'>('vulnerabilities');
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredVulns = VULNERABILITIES_DATASET.filter(item => {
    const matchesSearch = 
      item.cwe_name.toLowerCase().includes(search.toLowerCase()) ||
      item.cwe_id.toLowerCase().includes(search.toLowerCase()) ||
      item.file.toLowerCase().includes(search.toLowerCase()) ||
      item.cve_example.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesLang = selectedLang === 'all' || item.language === selectedLang;
    const matchesSeverity = selectedSeverity === 'all' || item.severity === selectedSeverity;

    return matchesSearch && matchesLang && matchesSeverity;
  });

  const filteredCwe = CWE_MAPPING_DATASET.filter(item => {
    return (
      item.cwe_name.toLowerCase().includes(search.toLowerCase()) ||
      item.cwe_id.toLowerCase().includes(search.toLowerCase()) ||
      item.owasp_category.toLowerCase().includes(search.toLowerCase()) ||
      item.typical_impact.toLowerCase().includes(search.toLowerCase())
    );
  });

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Header & Controls */}
      <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-sky-400" />
              База данных уязвимостей и классификация CWE/OWASP
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Сформированные машиночитаемые датасеты practical lab #2 (vulnerabilities.csv, cwe_mapping.csv)
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeTab === 'vulnerabilities') {
                  downloadFile(getVulnerabilitiesCsv(), 'vulnerabilities.csv', 'text/csv');
                } else {
                  downloadFile(getCweMappingCsv(), 'cwe_mapping.csv', 'text/csv');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Скачать CSV
            </button>
            <button
              onClick={() => {
                const data = activeTab === 'vulnerabilities' ? VULNERABILITIES_DATASET : CWE_MAPPING_DATASET;
                downloadFile(JSON.stringify(data, null, 2), `${activeTab}.json`, 'application/json');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              JSON
            </button>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 border-b sm:border-b-0 border-slate-800 pb-2 sm:pb-0">
            <button
              onClick={() => setActiveTab('vulnerabilities')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'vulnerabilities'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              vulnerabilities.csv ({VULNERABILITIES_DATASET.length} записей)
            </button>
            <button
              onClick={() => setActiveTab('cwe_mapping')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cwe_mapping'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              cwe_mapping.csv ({CWE_MAPPING_DATASET.length} категорий)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по CWE, языку, файлу..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {activeTab === 'vulnerabilities' && (
              <>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
                >
                  <option value="all">Все языки</option>
                  <option value="Python">Python</option>
                  <option value="C++">C++</option>
                  <option value="JavaScript">JavaScript</option>
                </select>

                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
                >
                  <option value="all">Любая важность</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'vulnerabilities' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <th className="p-2.5 font-semibold text-center w-10">ID</th>
                  <th className="p-2.5 font-semibold">Язык</th>
                  <th className="p-2.5 font-semibold">Файл : Строка</th>
                  <th className="p-2.5 font-semibold">Критичность</th>
                  <th className="p-2.5 font-semibold">CWE ID & Имя</th>
                  <th className="p-2.5 font-semibold">OWASP Top 10</th>
                  <th className="p-2.5 font-semibold">Пример CVE</th>
                  <th className="p-2.5 font-semibold">CVSS</th>
                  <th className="p-2.5 font-semibold">Описание дефекта</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredVulns.map((v) => (
                  <tr key={v.vuln_id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-2.5 text-center font-mono font-bold text-slate-400 bg-slate-950/40">
                      #{v.vuln_id}
                    </td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded font-mono font-medium text-[11px] ${
                        v.language === 'Python' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        v.language === 'C++' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {v.language}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-200">
                      <span className="text-sky-300">{v.file}</span>
                      <span className="text-slate-500">:</span>
                      <span className="text-amber-400">{v.line}</span>
                    </td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase tracking-wider ${
                        v.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        v.severity === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-sky-950 text-sky-300 border border-sky-800'
                      }`}>
                        {v.severity}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <div className="font-mono font-bold text-sky-400">{v.cwe_id}</div>
                      <div className="text-slate-300 text-[11px]">{v.cwe_name}</div>
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-purple-300">
                      {v.owasp}
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-slate-300">
                      <a 
                        href={`https://nvd.nist.gov/vuln/detail/${v.cve_example}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:underline text-sky-400"
                      >
                        {v.cve_example}
                      </a>
                    </td>
                    <td className="p-2.5 font-mono font-bold">
                      <span className={`px-1.5 py-0.5 rounded ${
                        v.cvss >= 9.0 ? 'text-rose-400 bg-rose-950/40' :
                        v.cvss >= 7.0 ? 'text-amber-400 bg-amber-950/40' :
                        'text-blue-400 bg-blue-950/40'
                      }`}>
                        {v.cvss.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-300 text-[11px] max-w-xs leading-relaxed">
                      {v.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <th className="p-2.5 font-semibold">CWE ID</th>
                  <th className="p-2.5 font-semibold">Название слабости</th>
                  <th className="p-2.5 font-semibold">Рейтинг 2025 (MITRE Top 25)</th>
                  <th className="p-2.5 font-semibold">Категория OWASP Top 10</th>
                  <th className="p-2.5 font-semibold">Характер потенциального ущерба</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCwe.map((cwe) => (
                  <tr key={cwe.cwe_id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-2.5 font-mono font-bold text-sky-400 text-sm">
                      {cwe.cwe_id}
                    </td>
                    <td className="p-2.5 font-semibold text-slate-100">
                      {cwe.cwe_name}
                    </td>
                    <td className="p-2.5 font-mono">
                      {typeof cwe.rank_2025 === 'number' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-xs">
                          № {cwe.rank_2025}
                        </span>
                      ) : (
                        <span className="text-slate-500 font-normal">Вне топ-25</span>
                      )}
                    </td>
                    <td className="p-2.5 font-mono text-purple-300 text-[11px]">
                      {cwe.owasp_category}
                    </td>
                    <td className="p-2.5 text-slate-300 text-[11px] leading-relaxed">
                      {cwe.typical_impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
