import type { SumScoring, ScoringResult } from "../types";
import type { ScoringStrategy } from "./scoring-strategy";

export class SumStrategy implements ScoringStrategy {
    #scoring: SumScoring;

    constructor(scoring: SumScoring) {
        this.#scoring = scoring;
    }

    calculate(answers: Record<number, number>): ScoringResult {
        const total = Object.values(answers).reduce((sum, val) => sum + val, 0);

        let interpretation = "";
        for (const range of this.#scoring.ranges) {
            if (total <= range.max) {
                interpretation = range.label;
                break;
            }
            interpretation = range.label;
        }

        return { type: "sum", totalScore: total, interpretation };
    }
}
