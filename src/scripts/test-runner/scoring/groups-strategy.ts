import type { GroupsScoring, ScoringResult, ScoredItem } from "../types";
import type { ScoringStrategy } from "./scoring-strategy";

export class GroupsStrategy implements ScoringStrategy {
    #scoring: GroupsScoring;

    constructor(scoring: GroupsScoring) {
        this.#scoring = scoring;
    }

    calculate(answers: Record<number, number>): ScoringResult {
        const items: ScoredItem[] = this.#scoring.groups.map((group) => {
            let score = 0;
            for (const qNum of group.questions) {
                const answer = answers[qNum - 1];
                if (answer !== undefined) {
                    score += answer;
                }
            }

            const interpretation = score >= 0 ? group.positive : group.negative;

            return {
                name: group.name,
                score,
                interpretation,
            };
        });

        return { type: "groups", items };
    }
}
