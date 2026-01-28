import type { ReverseScoring, TestOption, ScoringResult, ScoredItem } from "../types";
import type { ScoringStrategy } from "./scoring-strategy";

export class ReverseStrategy implements ScoringStrategy {
    #scoring: ReverseScoring;
    readonly #maxOptionValue: number;
    readonly #minOptionValue: number;

    constructor(scoring: ReverseScoring, options?: TestOption[]) {
        this.#scoring = scoring;
        const values = (options || []).map((o) => o.value);
        this.#maxOptionValue = Math.max(...values, 5);
        this.#minOptionValue = Math.min(...values, 1);
    }

    calculate(answers: Record<number, number>): ScoringResult {
        const items: ScoredItem[] = this.#scoring.factors.map((factor) => {
            let score = 0;

            for (const qNum of factor.questions) {
                let answer = answers[qNum - 1];
                if (answer === undefined) continue;

                if (factor.reversed.includes(qNum)) {
                    answer = this.#maxOptionValue + this.#minOptionValue - answer;
                }

                score += answer;
            }

            return {
                name: factor.name,
                score,
                interpretation: factor.description,
            };
        });

        return { type: "reverse", items };
    }
}
