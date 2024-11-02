export const BASIC_TESTS = [
  // Uncountables
  ["firmware", "firmware"],
  ["fish", "fish"],
  ["media", "media"],
  // ... rest of basic tests
] as const;

export const SINGULAR_TESTS = [
  ["dingo", "dingos"],
  ["mango", "mangoes"],
  ["echo", "echos"],
  ["ghetto", "ghettoes"],
  ["nucleus", "nucleuses"],
  ["bureau", "bureaux"],
  ["seraph", "seraphs"],
] as const;

export const PLURAL_TESTS = [
  ["plateaux", "plateaux"],
  ["axis", "axes"],
  ["basis", "bases"],
  ["automatum", "automata"],
  ["thou", "you"],
  ["axiS", "axes"],
  ["passerby", "passersby"],
] as const;
