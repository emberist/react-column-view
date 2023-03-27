// Even if we augment the module below within the directory ./types, commitlint's `ts-node` does not see it due to its own config.
// That's why `ts-ignore` is needed here.
// @ts-ignore
import { utils } from '@commitlint/config-nx-scopes';

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'footer-empty': [0],
    'header-max-length': [2, 'always', 100],
    'references-empty': [0],
    'scope-case': [2, 'always', 'kebab-case'],
    'scope-empty': [2, 'never'],
    'scope-enum': (async (context: any) => [
      2,
      'always',
      [...(await utils.getProjects(context)), 'global'],
    ]) as any, // NOTE It seems like commitlint rules have wrong types when we use functions with a context
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'deps', 'docs', 'feat', 'fix', 'refactor', 'test'],
    ],
  },
};

export default config;
