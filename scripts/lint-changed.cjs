const fs = require("node:fs");
const cp = require("node:child_process");
const { CLIEngine } = require("eslint");

const base = process.argv[2];
if (!base) throw new Error("Usage: node scripts/lint-changed.cjs <base-commit>");
const files = cp.execFileSync("git", ["diff", "--name-only", base], { encoding: "utf8" })
  .trim().split(/\r?\n/).filter(file => /^src\//.test(file) && /\.(js|vue)$/.test(file) && fs.existsSync(file));
const engine = new CLIEngine({ fix: false });
let errors = 0;
for (const file of files) {
  // Reading text explicitly avoids the old ESLint file-reader failure on this host.
  const report = engine.executeOnText(fs.readFileSync(file, "utf8"), file);
  errors += report.errorCount;
  for (const result of report.results) for (const message of result.messages) {
    console.log(`${file}:${message.line}: ${message.message} (${message.ruleId})`);
  }
}
console.log(`Checked ${files.length} changed source files; errors: ${errors}`);
process.exitCode = errors ? 1 : 0;
