import type { TestData, ScoringResult } from "../types";
import { SumStrategy } from "./sum-strategy";
import { GroupsStrategy } from "./groups-strategy";
import { ReverseStrategy } from "./reverse-strategy";

export interface ScoringStrategy {
    calculate(answers: Record<number, number>): ScoringResult;
}

export function createScoringStrategy(testData: TestData): ScoringStrategy {
    switch (testData.scoring.type) {
        case "sum":
            return new SumStrategy(testData.scoring);
        case "groups":
            return new GroupsStrategy(testData.scoring);
        case "reverse":
            return new ReverseStrategy(testData.scoring, testData.options);
    }
}
