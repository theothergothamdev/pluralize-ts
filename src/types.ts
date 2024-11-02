export type RuleType = [RegExp, string];
export type RuleFunction = (word: string) => string;
export type CheckFunction = (word: string) => boolean;

export interface Pluralize {
  (word: string, count?: number, inclusive?: boolean): string;
  plural: RuleFunction;
  isPlural: CheckFunction;
  singular: RuleFunction;
  isSingular: CheckFunction;
  addPluralRule: (rule: string | RegExp, replacement: string) => void;
  addSingularRule: (rule: string | RegExp, replacement: string) => void;
  addUncountableRule: (word: string | RegExp) => void;
  addIrregularRule: (single: string, plural: string) => void;
}
