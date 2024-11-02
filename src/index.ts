import { Pluralize, RuleType } from "./types";
import { sanitizeRule } from "./utils/rules";
import { replaceWord, checkWord } from "./core/word-handlers";
import { irregularRules } from "./data/rules/irregular";
import { pluralRules } from "./data/rules/plural";
import { singularRules } from "./data/rules/singular";
import { uncountableRules } from "./data/rules/uncountable";

const pluralRulesStore: RuleType[] = [];
const singularRulesStore: RuleType[] = [];
const uncountables: Record<string, boolean> = {};
const irregularPlurals: Record<string, string> = {};
const irregularSingles: Record<string, string> = {};

const pluralize: Pluralize = (word: string, count?: number, inclusive?: boolean): string => {
  const pluralized = count === 1 ? pluralize.singular(word) : pluralize.plural(word);

  return (inclusive ? `${count} ` : "") + pluralized;
};

// Initialize rules
pluralize.plural = replaceWord(irregularSingles, irregularPlurals, pluralRulesStore, uncountables);
pluralize.isPlural = checkWord(irregularSingles, irregularPlurals, pluralRulesStore, uncountables);
pluralize.singular = replaceWord(irregularPlurals, irregularSingles, singularRulesStore, uncountables);
pluralize.isSingular = checkWord(irregularPlurals, irregularSingles, singularRulesStore, uncountables);

pluralize.addPluralRule = function (rule: string | RegExp, replacement: string): void {
  pluralRulesStore.push([sanitizeRule(rule), replacement]);
};

pluralize.addSingularRule = function (rule: string | RegExp, replacement: string): void {
  singularRulesStore.push([sanitizeRule(rule), replacement]);
};

pluralize.addUncountableRule = function (word: string | RegExp): void {
  if (typeof word === "string") {
    uncountables[word.toLowerCase()] = true;
    return;
  }
  pluralize.addPluralRule(word, "$0");
  pluralize.addSingularRule(word, "$0");
};

pluralize.addIrregularRule = function (single: string, plural: string): void {
  const pluralLower = plural.toLowerCase();
  const singleLower = single.toLowerCase();

  irregularSingles[singleLower] = pluralLower;
  irregularPlurals[pluralLower] = singleLower;
};

// Initialize all rules
irregularRules.forEach(([single, plural]) => pluralize.addIrregularRule(single, plural));
pluralRules.forEach(([rule, replacement]) => pluralize.addPluralRule(rule, replacement));
singularRules.forEach(([rule, replacement]) => pluralize.addSingularRule(rule, replacement));
uncountableRules.forEach((rule) => pluralize.addUncountableRule(rule));

export default pluralize;
