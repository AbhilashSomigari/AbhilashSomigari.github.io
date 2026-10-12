// Run with: npm test   (node --test, no extra dependencies)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  buildSnapshot,
  extractReadmeSummary,
  isStructuralRepo,
  mergeAliases,
  normalizeRepo,
  sanityCheck,
  serialize,
} from './sync-github.mjs'

const USER = 'AbhilashSomigari'

function rawRepo(overrides = {}) {
  return {
    id: 1,
    name: 'opspilot',
    html_url: 'https://github.com/AbhilashSomigari/opspilot',
    description: 'AI incident-response agent',
    homepage: '',
    has_pages: false,
    language: 'Python',
    topics: ['sre', 'langgraph'],
    stargazers_count: 1,
    forks_count: 0,
    license: { spdx_id: 'MIT' },
    fork: false,
    archived: false,
    private: false,
    created_at: '2026-09-17T17:42:43Z',
    pushed_at: '2026-10-08T18:05:23Z',
    ...overrides,
  }
}

test('normalizeRepo keeps only the fields the site uses, deterministically', () => {
  const repo = normalizeRepo(rawRepo(), USER)
  assert.deepEqual(repo.topics, ['langgraph', 'sre'])
  assert.equal(repo.homepage, null)
  assert.equal(repo.pagesUrl, null)
  assert.equal(repo.license, 'MIT')
  assert.equal(repo.description, 'AI incident-response agent')
})

test('normalizeRepo derives a live demo URL from GitHub Pages', () => {
  const repo = normalizeRepo(rawRepo({ name: 'tic-tac-toe', has_pages: true }), USER)
  assert.equal(repo.pagesUrl, 'https://abhilashsomigari.github.io/tic-tac-toe/')
})

test('normalizeRepo treats blank descriptions and NOASSERTION licenses as missing', () => {
  const repo = normalizeRepo(rawRepo({ description: '  ', license: { spdx_id: 'NOASSERTION' } }), USER)
  assert.equal(repo.description, null)
  assert.equal(repo.license, null)
})

test('the profile and site repos are excluded (prevents a self-triggering sync loop)', () => {
  assert.ok(isStructuralRepo('AbhilashSomigari', USER))
  assert.ok(isStructuralRepo('abhilashsomigari.github.io', USER))
  assert.ok(!isStructuralRepo('opspilot', USER))
})

test('metadata changes produce a different snapshot; identical data does not', () => {
  const before = buildSnapshot(USER, [normalizeRepo(rawRepo(), USER)], null)
  const same = buildSnapshot(USER, [normalizeRepo(rawRepo(), USER)], before)
  assert.equal(serialize(same), serialize(before))

  const starred = buildSnapshot(USER, [normalizeRepo(rawRepo({ stargazers_count: 5 }), USER)], before)
  assert.notEqual(serialize(starred), serialize(before))
  assert.equal(starred.repos[0].stars, 5)

  const archived = buildSnapshot(USER, [normalizeRepo(rawRepo({ archived: true }), USER)], before)
  assert.equal(archived.repos[0].archived, true)
})

test('snapshot ordering is independent of API ordering', () => {
  const a = normalizeRepo(rawRepo({ id: 1, name: 'b-repo' }), USER)
  const b = normalizeRepo(rawRepo({ id: 2, name: 'a-repo' }), USER)
  assert.equal(serialize(buildSnapshot(USER, [a, b], null)), serialize(buildSnapshot(USER, [b, a], null)))
})

test('renames are tracked by repo ID and chains collapse to the newest name', () => {
  const v1 = buildSnapshot(USER, [normalizeRepo(rawRepo({ id: 7, name: 'old-name' }), USER)], null)
  const v2 = buildSnapshot(USER, [normalizeRepo(rawRepo({ id: 7, name: 'mid-name' }), USER)], v1)
  assert.deepEqual(v2.aliases, { 'old-name': 'mid-name' })
  const v3 = buildSnapshot(USER, [normalizeRepo(rawRepo({ id: 7, name: 'new-name' }), USER)], v2)
  assert.deepEqual(v3.aliases, { 'mid-name': 'new-name', 'old-name': 'new-name' })
})

test('an alias is dropped when a new repo reuses the old name', () => {
  const previous = { aliases: { 'old-name': 'new-name' }, repos: [] }
  const repos = [
    normalizeRepo(rawRepo({ id: 7, name: 'new-name' }), USER),
    normalizeRepo(rawRepo({ id: 8, name: 'old-name' }), USER),
  ]
  assert.deepEqual(mergeAliases(previous, repos), {})
})

test('sanityCheck refuses empty or sharply shrunken results', () => {
  const previous = { repos: new Array(10).fill({}) }
  assert.match(sanityCheck(previous, []), /zero/)
  assert.match(sanityCheck(previous, new Array(4).fill({})), /dropped/)
  assert.equal(sanityCheck(previous, new Array(9).fill({})), null)
  assert.equal(sanityCheck(null, [{}]), null)
})

test('extractReadmeSummary skips headings, badges, and code to find prose', () => {
  const md = [
    '# Project',
    '',
    '[![CI](https://x/badge.svg)](https://x)',
    '',
    '```bash',
    'pip install thing',
    '```',
    '',
    'A **debate-style** RAG pipeline where [two agents](https://x) argue over `retrieved` evidence before a judge answers.',
  ].join('\n')
  assert.equal(
    extractReadmeSummary(md),
    'A debate-style RAG pipeline where two agents argue over retrieved evidence before a judge answers.',
  )
  assert.equal(extractReadmeSummary('# Only a heading'), null)
  assert.equal(extractReadmeSummary(null), null)
})

test('extractReadmeSummary truncates on a word boundary', () => {
  const summary = extractReadmeSummary(`${'word '.repeat(100)}end`, 50)
  assert.ok(summary.length <= 51)
  assert.ok(summary.endsWith('…'))
})
