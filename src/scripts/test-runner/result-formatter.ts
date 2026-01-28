import type { ScoringResult } from "./types";

/** Возвращает HTML для вставки в #result-content */
export function formatResultAsHtml(result: ScoringResult): string {
    switch (result.type) {
        case "sum":
            return `<p class="result-interpretation">${result.interpretation}</p>`;

        case "groups":
            return result.items
                .map((item, i) => `
                    <div class="result-group">
                        <p class="result-group-name">${i + 1}. ${item.name} ${item.score}</p>
                        <p class="result-group-interpretation">${item.interpretation}</p>
                    </div>`)
                .join("");

        case "reverse":
            return result.items
                .map((item, i) => `
                    <div class="result-group">
                        <p class="result-group-name">${i + 1}. ${item.name}: ${item.score}</p>
                        <p class="result-group-interpretation">${item.interpretation}</p>
                    </div>`)
                .join("");
    }
}

/** Возвращает суффикс для заголовка (например, " 42" для sum-типа) */
export function getResultHeadingSuffix(result: ScoringResult): string {
    return result.type === "sum" ? ` ${result.totalScore}` : "";
}

/** Возвращает plain text для шаринга через Web Share / Clipboard */
export function formatResultAsText(result: ScoringResult): string {
    switch (result.type) {
        case "sum": {
            const n = result.totalScore;
            const word = getPluralForm(n, "балл", "балла", "баллов");
            return `Результат: ${n} ${word}\n${result.interpretation}`;
        }

        case "groups":
            return "Результаты:\n" + result.items
                .map((item) => `• ${item.name}: ${item.score}`)
                .join("\n");

        case "reverse":
            return "Результаты:\n" + result.items
                .map((item) => `• ${item.name}: ${item.score}`)
                .join("\n");
    }
}

function getPluralForm(n: number, one: string, few: string, many: string): string {
    const mod10 = n % 10;
    const mod100 = n % 100;

    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
}
