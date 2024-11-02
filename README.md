# Pluralize-TS

<!-- [START badges] -->

[![NPM version](https://img.shields.io/npm/v/@theothergothamdev/pluralize-ts.svg)](https://www.npmjs.com/package/@theothergothamdev/pluralize-ts)
[![NPM downloads](https://img.shields.io/npm/dm/@theothergothamdev/pluralize-ts.svg)](https://www.npmjs.com/package/@theothergothamdev/pluralize-ts)

![build](https://github.com/theothergothamdev/pluralize-ts/actions/workflows/build.yml/badge.svg)

<!-- [END badges] -->

> A TypeScript port of the popular pluralize library - Pluralize and singularize any word with full type safety.

This is a TypeScript fork of the original [pluralize](https://github.com/blakeembrey/pluralize) library, modernized with full type definitions, ESM support, and modern testing infrastructure.

## Features

- 📦 Full TypeScript support with accurate type definitions
- 🚀 ESM and CommonJS dual package
- ✨ Modern build tooling with esbuild
- 🧪 Comprehensive test suite using Vitest
- 💪 Same powerful API as the original, now with type safety

## Installation

```bash
# npm
npm install @theothergothamdev/pluralize-ts

# yarn
yarn add @theothergothamdev/pluralize-ts

# pnpm
pnpm add @theothergothamdev/pluralize-ts
```

## Usage

### ESM

```typescript
import pluralize from "@theothergothamdev/pluralize-ts";

pluralize("test"); //=> "tests"
pluralize("test", 0); //=> "tests"
pluralize("test", 1); //=> "test"
pluralize("test", 5); //=> "tests"
pluralize("test", 1, true); //=> "1 test"
pluralize("test", 5, true); //=> "5 tests"
```

### CommonJS

```typescript
const pluralize = require("pluralize-ts").default;
```

### API

The library exports a default function with additional methods:

```typescript
// Main function
pluralize(word: string, count?: number, inclusive?: boolean): string

// Additional methods
pluralize.plural(word: string): string
pluralize.singular(word: string): string
pluralize.isPlural(word: string): boolean
pluralize.isSingular(word: string): boolean

// Add custom rules
pluralize.addPluralRule(rule: string | RegExp, replacement: string): void
pluralize.addSingularRule(rule: string | RegExp, replacement: string): void
pluralize.addIrregularRule(single: string, plural: string): void
pluralize.addUncountableRule(word: string | RegExp): void
```

### Examples

```typescript
// Basic usage
pluralize("test"); //=> "tests"
pluralize("test", 1); //=> "test"
pluralize("test", 5); //=> "tests"
pluralize("test", 1, true); //=> "1 test"

// Custom rules
pluralize.addPluralRule(/gex$/i, "gexii");
pluralize.plural("regex"); //=> "regexii"

pluralize.addSingularRule(/singles$/i, "singular");
pluralize.singular("singles"); //=> "singular"

pluralize.addIrregularRule("irregular", "regular");
pluralize.plural("irregular"); //=> "regular"

pluralize.addUncountableRule("paper");
pluralize.plural("paper"); //=> "paper"

// Check word form
pluralize.isPlural("tests"); //=> true
pluralize.isSingular("test"); //=> true
```

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests
pnpm test

# Run tests with watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage

# Lint
pnpm lint

# Format
pnpm format
```

## Project Structure

```
src/
├── __tests__/          # Test files
│   ├── fixtures/       # Test data
│   ├── unit/          # Unit tests
│   └── pluralize.test.ts
├── core/              # Core functionality
├── utils/             # Utility functions
├── types/             # TypeScript types
└── index.ts          # Main entry point
```

## Why This Fork?

This fork modernizes the original pluralize library by:

1. Adding full TypeScript support with proper type definitions
2. Modernizing the build system with esbuild
3. Updating the testing infrastructure to use Vitest
4. Supporting both ESM and CommonJS
5. Maintaining the same powerful API while adding type safety

## License

MIT

[Original project](https://github.com/blakeembrey/pluralize) by Blake Embrey
