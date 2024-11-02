import { RuleType, RuleFunction, CheckFunction } from "../types";
import { sanitizeWord } from "../utils/rules";
import { restoreCase } from "../utils/string";

export function replaceWord(
  replaceMap: Record<string, string>,
  keepMap: Record<string, string>,
  rules: RuleType[],
  uncountables: Record<string, boolean>
): RuleFunction {
  return (word: string) => {
    const token = word.toLowerCase();

    if (keepMap.hasOwnProperty(token)) {
      return restoreCase(word, token);
    }

    if (replaceMap.hasOwnProperty(token)) {
      return restoreCase(word, replaceMap[token]);
    }

    return sanitizeWord(token, word, rules, uncountables);
  };
}

export function checkWord(
  replaceMap: Record<string, string>,
  keepMap: Record<string, string>,
  rules: RuleType[],
  uncountables: Record<string, boolean>
): CheckFunction {
  return (word: string) => {
    const token = word.toLowerCase();

    if (keepMap.hasOwnProperty(token)) return true;
    if (replaceMap.hasOwnProperty(token)) return false;

    return sanitizeWord(token, token, rules, uncountables) === token;
  };
}
