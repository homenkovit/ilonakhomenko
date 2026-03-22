import { readFile, writeFile } from "node:fs/promises";

const SCREENSHOT_LABELS = {
	"Главная страница — десктоп": "Homepage — desktop",
	"Главная страница — мобильная": "Homepage — mobile",
};

const ruPath = "dist/manifest.webmanifest";
const enPath = "dist/manifest-en.webmanifest";

const ru = JSON.parse(await readFile(ruPath, "utf-8"));

const en = {
	...ru,
	name: "Psychologist Ilona Khomenko",
	short_name: "Ilona Khomenko",
	description: "Psychologist Ilona Khomenko. Individual online counseling.",
	lang: "en",
	start_url: "/en/",
	scope: "/",
};

if (en.screenshots) {
	en.screenshots = en.screenshots.map((s) => {
		const label = SCREENSHOT_LABELS[s.label];
		if (label === undefined) {
			throw new Error(`[manifest] No EN translation for screenshot label: "${s.label}"`);
		}
		return { ...s, label };
	});
}

await writeFile(enPath, JSON.stringify(en, null, "\t"));
console.log(`Generated ${enPath}`);
