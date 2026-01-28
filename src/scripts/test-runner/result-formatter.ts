import type { ScoringResult, ResultTemplates } from "./types";

export function renderResultToContainer(
    result: ScoringResult,
    container: HTMLElement,
    templates: ResultTemplates,
): void {
    container.innerHTML = "";

    switch (result.type) {
        case "sum": {
            const p = templates.interpretation.content.firstElementChild!.cloneNode(true) as HTMLElement;
            p.textContent = result.interpretation;
            container.appendChild(p);
            break;
        }

        case "groups":
        case "reverse": {
            result.items.forEach((item, i) => {
                const group = templates.group.content.firstElementChild!.cloneNode(true) as HTMLElement;
                const nameElement = group.querySelector(".result-group-name")!;
                const interpretationElement = group.querySelector(".result-group-interpretation")!;

                nameElement.textContent = result.type === "reverse"
                    ? `${i + 1}. ${item.name}: ${item.score}`
                    : `${i + 1}. ${item.name} ${item.score}`;
                interpretationElement.textContent = item.interpretation;

                container.appendChild(group);
            });
            break;
        }
    }
}

export function getResultHeadingSuffix(result: ScoringResult): string {
    return result.type === "sum" ? ` ${result.totalScore}` : "";
}

export function formatResultAsText(result: ScoringResult): string {
    switch (result.type) {
        case "sum": {
            const { totalScore, interpretation } = result;
            const word = getPluralForm(totalScore, "балл", "балла", "баллов");
            return `Результат: ${totalScore} ${word}\n${interpretation}`;
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
