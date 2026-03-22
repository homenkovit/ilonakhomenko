import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const CONTENT_DIRS = [
	{ label: "Articles", ru: "src/data/articles/ru", en: "src/data/articles/en" },
	{ label: "Tests", ru: "src/data/tests/ru", en: "src/data/tests/en" },
];

function getFiles(dir) {
	const fullPath = resolve(dir);
	if (!existsSync(fullPath)) return new Set();
	return new Set(readdirSync(fullPath));
}

let hasMismatch = false;

for (const { label, ru, en } of CONTENT_DIRS) {
	const ruFiles = getFiles(ru);
	const enFiles = getFiles(en);

	const missingEn = [...ruFiles].filter((file) => !enFiles.has(file));
	const missingRu = [...enFiles].filter((file) => !ruFiles.has(file));

	if (missingEn.length > 0) {
		hasMismatch = true;
		console.warn(`\n⚠  ${label}: missing English translation`);
		for (const file of missingEn) console.warn(`   - ${file}`);
	}

	if (missingRu.length > 0) {
		hasMismatch = true;
		console.warn(`\n⚠  ${label}: missing Russian translation`);
		for (const file of missingRu) console.warn(`   - ${file}`);
	}
}

if (hasMismatch) {
	console.warn("\n⚠  Some content is missing translations (see above)\n");
} else {
	console.log("✓ i18n content parity check passed\n");
}
