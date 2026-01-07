/**
 * GRAIL CRediT Namespace - Contributor Roles Taxonomy
 * @module grail::credit
 * @description ANSI/NISO Z39.104-2022 compliant contributor role classification
 * @version 1.0.0
 * @standard ANSI/NISO Z39.104-2022
 *
 * CRediT (Contributor Roles Taxonomy) integration for machine-native
 * contribution tracking with governance DAG validation.
 */

// ============================================================================
// CREDIT ROLE DEFINITIONS (ANSI/NISO Z39.104-2022)
// ============================================================================

/**
 * The 14 CRediT contributor roles as defined by ANSI/NISO Z39.104-2022
 */
export const CREDIT_ROLES = {
  /** Ideas; formulation or evolution of overarching research goals and aims */
  CONCEPTUALIZATION: 'conceptualization',

  /** Management activities to annotate, scrub data and maintain research data */
  DATA_CURATION: 'data_curation',

  /** Application of statistical, mathematical, computational techniques */
  FORMAL_ANALYSIS: 'formal_analysis',

  /** Acquisition of the financial support for the project */
  FUNDING_ACQUISITION: 'funding_acquisition',

  /** Conducting a research and investigation process */
  INVESTIGATION: 'investigation',

  /** Development or design of methodology; creation of models */
  METHODOLOGY: 'methodology',

  /** Management and coordination responsibility for research activity planning */
  PROJECT_ADMINISTRATION: 'project_administration',

  /** Provision of study materials, reagents, materials, patients, samples */
  RESOURCES: 'resources',

  /** Programming, software development; designing computer programs */
  SOFTWARE: 'software',

  /** Oversight and leadership responsibility for research activity planning */
  SUPERVISION: 'supervision',

  /** Verification of overall replication/reproducibility of results */
  VALIDATION: 'validation',

  /** Preparation, creation and/or presentation of the published work */
  VISUALIZATION: 'visualization',

  /** Preparation, creation of the published work - original draft */
  WRITING_ORIGINAL_DRAFT: 'writing_original_draft',

  /** Critical review, commentary or revision of the published work */
  WRITING_REVIEW_EDITING: 'writing_review_editing'
} as const;

/**
 * CRediT role identifier type
 */
export type CreditRoleId = typeof CREDIT_ROLES[keyof typeof CREDIT_ROLES];

/**
 * Complete CRediT role definition with metadata
 */
export interface CreditRoleDefinition {
  /** Role identifier (snake_case) */
  readonly id: CreditRoleId;

  /** Display name (Title Case) */
  readonly name: string;

  /** Chinese translation */
  readonly nameCN: string;

  /** Full description from ANSI/NISO Z39.104-2022 */
  readonly description: string;

  /** Chinese description */
  readonly descriptionCN: string;

  /** Role category */
  readonly category: CreditRoleCategory;

  /** Governance role mapping */
  readonly governanceRole: GovernanceRoleId;

  /** DAG dependencies (must complete before this role) */
  readonly dependsOn: CreditRoleId[];

  /** Order in typical research workflow (1-14) */
  readonly workflowOrder: number;
}

/**
 * CRediT role categories aligned with KAI Governance
 */
export type CreditRoleCategory =
  | 'structural'    // A類: Structural / Conceptual Governance
  | 'operational'   // B類: Operational / Execution Roles
  | 'validation';   // C類: Validation / Oversight Roles

// ============================================================================
// GOVERNANCE ROLE MAPPING (KAI Governance Roles)
// ============================================================================

/**
 * KAI Governance role identifiers
 */
export const GOVERNANCE_ROLES = {
  // A類: Structural / Conceptual Governance
  ARCHITECTURE: 'governance.architecture',
  METHOD_DESIGN: 'governance.method-design',
  EXECUTION_ORCHESTRATION: 'governance.execution-orchestration',
  RESOURCE_ALLOCATION: 'governance.resource-allocation',

  // B類: Operational / Execution Roles
  DATA_COLLECTION: 'ops.data-collection',
  DATA_GOVERNANCE: 'ops.data-governance',
  ANALYSIS: 'ops.analysis',
  SOFTWARE_ENGINEERING: 'ops.software-engineering',
  RESOURCE_PROVIDER: 'ops.resource-provider',
  VISUALIZATION: 'ops.visualization',
  AUTHORING_DRAFT: 'ops.authoring-draft',
  AUTHORING_REVIEW: 'ops.authoring-review',

  // C類: Validation / Oversight Roles
  VALIDATION: 'qa.validation',
  SUPERVISION: 'qa.supervision'
} as const;

export type GovernanceRoleId = typeof GOVERNANCE_ROLES[keyof typeof GOVERNANCE_ROLES];

/**
 * Machine-native CRediT to Governance role mapping
 * Single-line JSON format for .governance files
 */
export const CREDIT_TO_GOVERNANCE_MAP: Record<CreditRoleId, GovernanceRoleId> = {
  conceptualization: 'governance.architecture',
  data_curation: 'ops.data-governance',
  formal_analysis: 'ops.analysis',
  funding_acquisition: 'governance.resource-allocation',
  investigation: 'ops.data-collection',
  methodology: 'governance.method-design',
  project_administration: 'governance.execution-orchestration',
  resources: 'ops.resource-provider',
  software: 'ops.software-engineering',
  supervision: 'qa.supervision',
  validation: 'qa.validation',
  visualization: 'ops.visualization',
  writing_original_draft: 'ops.authoring-draft',
  writing_review_editing: 'ops.authoring-review'
};

// ============================================================================
// COMPLETE ROLE DEFINITIONS
// ============================================================================

/**
 * Complete definitions for all 14 CRediT roles
 */
export const CREDIT_ROLE_DEFINITIONS: readonly CreditRoleDefinition[] = [
  {
    id: 'conceptualization',
    name: 'Conceptualization',
    nameCN: '概念化',
    description: 'Ideas; formulation or evolution of overarching research goals and aims.',
    descriptionCN: '構思；制定或發展整體研究目標和目的。',
    category: 'structural',
    governanceRole: 'governance.architecture',
    dependsOn: [],
    workflowOrder: 1
  },
  {
    id: 'methodology',
    name: 'Methodology',
    nameCN: '方法論',
    description: 'Development or design of methodology; creation of models.',
    descriptionCN: '方法論的發展或設計；模型的創建。',
    category: 'structural',
    governanceRole: 'governance.method-design',
    dependsOn: ['conceptualization'],
    workflowOrder: 2
  },
  {
    id: 'funding_acquisition',
    name: 'Funding Acquisition',
    nameCN: '資金籌集',
    description: 'Acquisition of the financial support for the project leading to this publication.',
    descriptionCN: '為促成本次出版的計畫籌集資金。',
    category: 'structural',
    governanceRole: 'governance.resource-allocation',
    dependsOn: ['conceptualization'],
    workflowOrder: 3
  },
  {
    id: 'project_administration',
    name: 'Project Administration',
    nameCN: '專案管理',
    description: 'Management and coordination responsibility for the research activity planning and execution.',
    descriptionCN: '負責研究活動規劃和執行的管理和協調。',
    category: 'structural',
    governanceRole: 'governance.execution-orchestration',
    dependsOn: ['conceptualization', 'methodology'],
    workflowOrder: 4
  },
  {
    id: 'resources',
    name: 'Resources',
    nameCN: '資源',
    description: 'Provision of study materials, reagents, materials, patients, laboratory samples, animals, instrumentation, computing resources, or other analysis tools.',
    descriptionCN: '提供學習材料、試劑、材料、病人、實驗室樣本、動物、儀器、計算資源或其他分析工具。',
    category: 'operational',
    governanceRole: 'ops.resource-provider',
    dependsOn: ['funding_acquisition'],
    workflowOrder: 5
  },
  {
    id: 'investigation',
    name: 'Investigation',
    nameCN: '調查',
    description: 'Conducting a research and investigation process, specifically performing the experiments, or data/evidence collection.',
    descriptionCN: '進行研究和調查過程，具體而言，就是進行實驗或數據/證據收集。',
    category: 'operational',
    governanceRole: 'ops.data-collection',
    dependsOn: ['methodology', 'resources'],
    workflowOrder: 6
  },
  {
    id: 'data_curation',
    name: 'Data Curation',
    nameCN: '資料整理',
    description: 'Management activities to annotate (produce metadata), scrub data and maintain research data for initial use and later reuse.',
    descriptionCN: '管理活動包括註釋（產生元資料）、清理資料以及維護研究資料，以供初始使用和後續重複使用。',
    category: 'operational',
    governanceRole: 'ops.data-governance',
    dependsOn: ['investigation'],
    workflowOrder: 7
  },
  {
    id: 'formal_analysis',
    name: 'Formal Analysis',
    nameCN: '形式分析',
    description: 'Application of statistical, mathematical, computational, or other formal techniques to analyse or synthesize study data.',
    descriptionCN: '運用統計學、數學、計算或其他正式技術來分析或綜合研究資料。',
    category: 'operational',
    governanceRole: 'ops.analysis',
    dependsOn: ['data_curation'],
    workflowOrder: 8
  },
  {
    id: 'software',
    name: 'Software',
    nameCN: '軟體',
    description: 'Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms; testing of existing code components.',
    descriptionCN: '程式設計、軟體開發；設計電腦程式；實作電腦程式碼和支援演算法；測試現有程式碼組件。',
    category: 'operational',
    governanceRole: 'ops.software-engineering',
    dependsOn: ['methodology'],
    workflowOrder: 9
  },
  {
    id: 'visualization',
    name: 'Visualization',
    nameCN: '視覺化',
    description: 'Preparation, creation and/or presentation of the published work, specifically visualization/data presentation.',
    descriptionCN: '準備、創作和/或展示已發表的作品，特別是視覺化/資料展示。',
    category: 'operational',
    governanceRole: 'ops.visualization',
    dependsOn: ['formal_analysis'],
    workflowOrder: 10
  },
  {
    id: 'validation',
    name: 'Validation',
    nameCN: '驗證',
    description: 'Verification, whether as a part of the activity or separate, of the overall replication/reproducibility of results/experiments and other research outputs.',
    descriptionCN: '驗證（無論是作為活動的一部分還是單獨進行）結果/實驗和其他研究成果的整體可重複性/可再現性。',
    category: 'validation',
    governanceRole: 'qa.validation',
    dependsOn: ['formal_analysis', 'software'],
    workflowOrder: 11
  },
  {
    id: 'writing_original_draft',
    name: 'Writing – Original Draft',
    nameCN: '寫作 - 初稿',
    description: 'Preparation, creation and/or presentation of the published work, specifically writing the initial draft (including substantive translation).',
    descriptionCN: '準備、創作和/或展示已出版的作品，特別是撰寫初稿（包括實質翻譯）。',
    category: 'operational',
    governanceRole: 'ops.authoring-draft',
    dependsOn: ['formal_analysis', 'visualization'],
    workflowOrder: 12
  },
  {
    id: 'writing_review_editing',
    name: 'Writing – Review & Editing',
    nameCN: '寫作 - 審閱與編輯',
    description: 'Preparation, creation and/or presentation of the published work by those from the original research group, specifically critical review, commentary or revision.',
    descriptionCN: '由原研究小組的成員準備、創作和/或展示已發表的作品，特別是批判性審查、評論或修訂。',
    category: 'operational',
    governanceRole: 'ops.authoring-review',
    dependsOn: ['writing_original_draft'],
    workflowOrder: 13
  },
  {
    id: 'supervision',
    name: 'Supervision',
    nameCN: '監督',
    description: 'Oversight and leadership responsibility for the research activity planning and execution, including mentorship external to the core team.',
    descriptionCN: '負責研究活動規劃和執行的監督和領導工作，包括對核心團隊外部人員的指導。',
    category: 'validation',
    governanceRole: 'qa.supervision',
    dependsOn: ['validation'],
    workflowOrder: 14
  }
] as const;

// ============================================================================
// ROLE LOOKUP UTILITIES
// ============================================================================

/**
 * Get role definition by ID
 */
export function getRoleDefinition(roleId: CreditRoleId): CreditRoleDefinition | undefined {
  return CREDIT_ROLE_DEFINITIONS.find(r => r.id === roleId);
}

/**
 * Get roles by category
 */
export function getRolesByCategory(category: CreditRoleCategory): CreditRoleDefinition[] {
  return CREDIT_ROLE_DEFINITIONS.filter(r => r.category === category);
}

/**
 * Get governance role for a CRediT role
 */
export function getGovernanceRole(creditRole: CreditRoleId): GovernanceRoleId {
  return CREDIT_TO_GOVERNANCE_MAP[creditRole];
}

/**
 * Get CRediT role for a governance role
 */
export function getCreditRole(governanceRole: GovernanceRoleId): CreditRoleId | undefined {
  for (const [credit, gov] of Object.entries(CREDIT_TO_GOVERNANCE_MAP)) {
    if (gov === governanceRole) {
      return credit as CreditRoleId;
    }
  }
  return undefined;
}

/**
 * Get roles in workflow order
 */
export function getRolesInWorkflowOrder(): CreditRoleDefinition[] {
  return [...CREDIT_ROLE_DEFINITIONS].sort((a, b) => a.workflowOrder - b.workflowOrder);
}

// ============================================================================
// MACHINE-NATIVE JSON EXPORTS
// ============================================================================

/**
 * Single-line JSON for .governance/roles.json
 */
export const CREDIT_TO_GOVERNANCE_JSON = JSON.stringify({
  creditToGovernance: CREDIT_TO_GOVERNANCE_MAP
});

/**
 * Minified role definitions for machine consumption
 */
export const CREDIT_ROLES_MINIFIED = JSON.stringify(
  CREDIT_ROLE_DEFINITIONS.map(r => ({
    id: r.id,
    cat: r.category[0], // s=structural, o=operational, v=validation
    gov: r.governanceRole,
    ord: r.workflowOrder,
    dep: r.dependsOn
  }))
);
