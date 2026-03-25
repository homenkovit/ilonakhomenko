import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const CONTENT_DIRS = [
	{
		label: "Articles",
		ru: "src/data/articles/ru",
		en: "src/data/articles/en",
		idField: "articleId",
	},
	{ label: "Tests", ru: "src/data/tests/ru", en: "src/data/tests/en", idField: "testId" },
];

function getMdFiles(dir) {
	const fullPath = resolve(dir);
	if (!existsSync(fullPath)) return [];
	return readdirSync(fullPath).filter((f) => f.endsWith(".md"));
}

function extractId(dir, file, idField) {
	const content = readFileSync(join(resolve(dir), file), "utf-8");
	const match = content.match(new RegExp(`${idField}:\\s*"([^"]+)"`));
	return match ? match[1] : null;
}

let hasMismatch = false;

for (const { label, ru, en, idField } of CONTENT_DIRS) {
	const ruFiles = getMdFiles(ru);
	const enFiles = getMdFiles(en);

	const ruIds = new Map();
	for (const file of ruFiles) {
		const id = extractId(ru, file, idField);
		if (id) ruIds.set(id, file);
	}

	const enIds = new Map();
	for (const file of enFiles) {
		const id = extractId(en, file, idField);
		if (id) enIds.set(id, file);
	}

	const missingEn = [...ruIds.entries()].filter(([id]) => !enIds.has(id));
	const missingRu = [...enIds.entries()].filter(([id]) => !ruIds.has(id));

	if (missingEn.length > 0) {
		hasMismatch = true;
		console.warn(`\n⚠  ${label}: missing English translation`);
		for (const [, file] of missingEn) console.warn(`   - ${file}`);
	}

	if (missingRu.length > 0) {
		hasMismatch = true;
		console.warn(`\n⚠  ${label}: missing Russian translation`);
		for (const [, file] of missingRu) console.warn(`   - ${file}`);
	}

	const ruMissingId = ruFiles.filter((f) => !extractId(ru, f, idField));
	const enMissingId = enFiles.filter((f) => !extractId(en, f, idField));

	if (ruMissingId.length > 0) {
		hasMismatch = true;
		console.warn(`\n⚠  ${label}: missing ${idField} in Russian files`);
		for (const file of ruMissingId) console.warn(`   - ${file}`);
	}

	if (enMissingId.length > 0) {
		hasMismatch = true;
		console.warn(`\n⚠  ${label}: missing ${idField} in English files`);
		for (const file of enMissingId) console.warn(`   - ${file}`);
	}
}

if (hasMismatch) {
	console.warn("\n⚠  Some content is missing translations (see above)\n");
} else {
	console.log("✓ i18n content parity check passed\n");
}
