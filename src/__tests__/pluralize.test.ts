import { describe, it, expect, beforeEach } from "vitest";
import pluralize from "../index";
import { BASIC_TESTS, SINGULAR_TESTS, PLURAL_TESTS } from "./fixtures/word-lists";

describe("pluralize", () => {
  describe("methods", () => {
    describe("plural()", () => {
      it.each([...BASIC_TESTS, ...PLURAL_TESTS])("should pluralize %s to %s", (singular, expected) => {
        expect(pluralize.plural(singular)).toBe(expected);
      });
    });

    describe("isPlural()", () => {
      it.each([...BASIC_TESTS, ...PLURAL_TESTS])("should identify %s as plural", (_, plural) => {
        expect(pluralize.isPlural(plural)).toBe(true);
      });
    });

    describe("singular()", () => {
      it.each([...BASIC_TESTS, ...SINGULAR_TESTS])("should singularize %s to %s", (expected, plural) => {
        expect(pluralize.singular(plural)).toBe(expected);
      });
    });

    describe("isSingular()", () => {
      it.each([...BASIC_TESTS, ...SINGULAR_TESTS])("should identify %s as singular", (singular) => {
        expect(pluralize.isSingular(singular)).toBe(true);
      });
    });
  });

  describe("automatic conversion", () => {
    describe("pluralization", () => {
      it.each([...BASIC_TESTS, ...PLURAL_TESTS])("should keep %s plural with count of 5", (_, plural) => {
        expect(pluralize(plural, 5)).toBe(plural);
      });

      it.each([...BASIC_TESTS, ...PLURAL_TESTS].filter(([s, p]) => s !== p))(
        "should pluralize %s to %s with count of 5",
        (singular, plural) => {
          expect(pluralize(singular, 5)).toBe(plural);
        }
      );
    });

    describe("singularization", () => {
      it.each([...BASIC_TESTS, ...SINGULAR_TESTS])("should keep %s singular with count of 1", (singular) => {
        expect(pluralize(singular, 1)).toBe(singular);
      });

      it.each([...BASIC_TESTS, ...SINGULAR_TESTS].filter(([s, p]) => s !== p))(
        "should singularize %s to %s with count of 1",
        (singular, plural) => {
          expect(pluralize(plural, 1)).toBe(singular);
        }
      );
    });
  });

  describe("count prefixing", () => {
    it("should prefix plural words with count", () => {
      expect(pluralize("test", 5, true)).toBe("5 tests");
    });

    it("should prefix singular words with count", () => {
      expect(pluralize("test", 1, true)).toBe("1 test");
    });
  });

  describe("rule addition", () => {
    beforeEach(() => {
      // Reset rules before each test if needed
      // You might want to add a reset mechanism to your pluralize module
    });

    describe("uncountable rules", () => {
      it("should allow adding new uncountable words", () => {
        expect(pluralize("paper")).toBe("papers");
        pluralize.addUncountableRule("paper");
        expect(pluralize("paper")).toBe("paper");
      });
    });

    describe("irregular rules", () => {
      it("should allow adding new irregular words", () => {
        expect(pluralize("irregular")).toBe("irregulars");
        pluralize.addIrregularRule("irregular", "regular");
        expect(pluralize("irregular")).toBe("regular");
      });
    });

    describe("plural rules", () => {
      it("should allow adding new plural regex rules", () => {
        expect(pluralize.plural("regex")).toBe("regexes");
        pluralize.addPluralRule(/gex$/i, "gexii");
        expect(pluralize.plural("regex")).toBe("regexii");
      });

      it("should allow adding new plural string rules", () => {
        expect(pluralize.plural("person")).toBe("people");
        pluralize.addPluralRule("person", "peeps");
        expect(pluralize.plural("person")).toBe("peeps");
      });
    });

    describe("singular rules", () => {
      it("should allow adding new singular regex rules", () => {
        expect(pluralize.singular("singles")).toBe("single");
        pluralize.addSingularRule(/singles$/, "singular");
        expect(pluralize.singular("singles")).toBe("singular");
      });

      it("should allow adding new singular string rules", () => {
        expect(pluralize.singular("mornings")).toBe("morning");
        pluralize.addSingularRule("mornings", "suck");
        expect(pluralize.singular("mornings")).toBe("suck");
      });
    });
  });
});
