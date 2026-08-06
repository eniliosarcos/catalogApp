---
name: changelog-discipline
description: "Trigger: commit, commitear, antes de commitear, update changelog, actualizar changelog. Always update CHANGELOG.md before committing significant changes."
license: Apache-2.0
metadata:
  author: eniliosarcos
  version: "1.0"
---

## Activation Contract

Load this skill BEFORE every commit that includes feature, fix, refactor, or architecture changes. Chores and docs-only commits may skip if trivial.

## Hard Rules

- NEVER replace the entire `[Unreleased]` section — only ADD new items
- NEVER delete existing entries from any section
- Preserve the Keep a Changelog format exactly
- Group entries under correct headers: Added, Changed, Fixed, Architecture
- Write entries in English, concise, one bullet per change
- Reference ADR numbers when architectural decisions are made
- Commit the CHANGELOG update as its own commit OR include it in the last feature commit

## Decision Gates

| Change Type | Changelog Section | Example Entry |
|-------------|-------------------|---------------|
| New feature/component | Added | `- Add cart summary with contact links` |
| Modified behavior | Changed | `- Footer uses ContactService instead of @env` |
| Bug fix | Fixed | `- Cart stores full Product object instead of placeholder` |
| Architecture decision | Architecture | `- Added ADR-010: Hybrid contact config pattern` |
| Deprecation | Deprecated | `- Deprecate MockProductService in favor of API service` |
| Removal | Removed | `- Remove legacy cart code` |
| Security fix | Security | `- Sanitize user input in search query` |

## Execution Steps

### 1. Before Committing
Run `git diff --stat` and `git status` to understand all changes.

### 2. Classify Each Change
For every modified/added file, determine: Added, Changed, Fixed, or Architecture.

### 3. Read Current CHANGELOG
Read `CHANGELOG.md` and locate the `[Unreleased]` section.

### 4. Append New Items
Add new bullets UNDER the correct subsection headers. If a header doesn't exist, create it at the end of `[Unreleased]`.

### 5. Never Touch Existing Entries
DO NOT modify, move, or delete any existing bullet point. Only APPEND.

### 6. Verify
Confirm the `[Unreleased]` section contains both old and new entries before committing.

## Output Contract

After updating CHANGELOG.md:
- All new changes are documented under correct headers
- All previous entries are preserved untouched
- Format matches Keep a Changelog spec
- CHANGELOG.md is staged and committed
