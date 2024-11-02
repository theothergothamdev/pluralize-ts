import { RuleType } from "../types";
import { interpolate, restoreCase } from "./string";

export function sanitizeRule(rule: string | RegExp): RegExp {
  if (typeof rule === "string") {
    return new RegExp("^" + rule + "$", "i");
  }
  return rule;
}

export function replace(word: string, rule: RuleType): string {
  return word.replace(rule[0], function (match: string, index: number) {
    const result = interpolate(rule[1], arguments);

    if (match === "") {
      return restoreCase(word[index - 1], result);
    }

    return restoreCase(match, result);
  });
}

export function sanitizeWord(
  token: string,
  word: string,
  rules: RuleType[],
  uncountables: Record<string, boolean>
): string {
  if (!token.length || uncountables.hasOwnProperty(token)) {
    return word;
  }

  let len = rules.length;

  while (len--) {
    const rule = rules[len];
    if (rule[0].test(word)) return replace(word, rule);
  }

  return word;
}
