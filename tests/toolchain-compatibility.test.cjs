const test = require('node:test');
const assert = require('node:assert/strict');
const { compileStyle, compileStyleAsync } = require('@vue/component-compiler-utils');

test('legacy compiler can still scope CSS using the patched PostCSS dependency', async () => {
  const input = { source: '.fixture > .child:hover { color: red; }', filename: 'compat.vue', id: 'data-v-security', scoped: true };
  for (const result of [compileStyle(input), await compileStyleAsync(input)]) {
    assert.deepEqual(result.errors, []);
    assert.match(result.code, /data-v-security/);
    assert.match(result.code, /color: red/);
    assert.match(result.code, /:hover/);
  }
});
