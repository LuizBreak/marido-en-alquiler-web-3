const fs = require("node:fs");
const cp = require("node:child_process");
const { ESLint } = require("eslint");

const base = process.argv[2];
if (!base) throw new Error("Usage: node scripts/lint-changed.cjs <base-commit>");
const files = cp.execFileSync("git", ["diff", "--name-only", base], { encoding: "utf8" })
  .trim().split(/\r?\n/).filter(file => /^src\//.test(file) && /\.(js|vue)$/.test(file) && fs.existsSync(file));
const engine = new ESLint({ fix: false });
async function main() {
  let errors = 0;
  for (const file of files) {
    // Read text explicitly so lint uses the same source path on every host.
    const results = await engine.lintText(fs.readFileSync(file, "utf8"), { filePath: file });
    for (const result of results) {
      errors += result.errorCount;
      for (const message of result.messages) {
        console.log(`${file}:${message.line}: ${message.message} (${message.ruleId})`);
      }
    }
  }
  console.log(`Checked ${files.length} changed source files; errors: ${errors}`);
  process.exitCode = errors ? 1 : 0;
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
