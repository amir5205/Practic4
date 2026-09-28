export interface ScreenshotRef {
  id: string;
  title: string;
  category: 'code' | 'terminal' | 'browser' | 'file_manager' | 'report' | 'calc';
  description: string;
  timestamp: string;
  windowTitle: string;
  appType: 'gedit' | 'terminal' | 'firefox' | 'nautilus' | 'libreoffice';
  filePath?: string;
  url?: string;
  command?: string;
  highlightText?: string;
  originalFileName: string;
  details: {
    codeSnippet?: string;
    terminalOutput?: string;
    browserAlert?: string;
    browserContent?: string;
    tableHeaders?: string[];
    tableRows?: (string | number)[][];
  };
}

export interface VulnerabilityRecord {
  vuln_id: number;
  language: 'Python' | 'C++' | 'JavaScript';
  file: string;
  line: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cwe_id: string;
  cwe_name: string;
  owasp: string;
  cve_example: string;
  cvss: number;
  description: string;
}

export interface CweMappingRecord {
  cwe_id: string;
  cwe_name: string;
  rank_2025: number | string;
  owasp_category: string;
  typical_impact: string;
}

export interface SlideContent {
  id: number;
  section: 'intro' | 'code' | 'sast_dast' | 'dataset' | 'remediation' | 'conclusion';
  sectionName: string;
  title: string;
  subtitle: string;
  badge?: string;
  keyPoints: string[];
  screenshotIds: string[];
  speakerNotes: string;
  takeaway?: string;
  codeComparison?: {
    lang: string;
    vulnerable: string;
    safe: string;
    vulnerableFile: string;
    safeFile: string;
  };
  metrics?: { label: string; value: string; hint?: string }[];
}
