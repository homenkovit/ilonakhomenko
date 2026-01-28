export interface TestOption {
    text: string;
    value: number;
}

export type Question = string | { text: string; options: TestOption[] };

export interface SumScoring {
    type: "sum";
    ranges: Array<{ max: number; label: string }>;
}

export interface GroupsScoring {
    type: "groups";
    groups: Array<{
        name: string;
        questions: number[];
        positive: string;
        negative: string;
    }>;
}

export interface ReverseScoring {
    type: "reverse";
    factors: Array<{
        name: string;
        description: string;
        questions: number[];
        reversed: number[];
        maxScore?: number;
    }>;
}

export type Scoring = SumScoring | GroupsScoring | ReverseScoring;

export interface TestData {
    id: string;
    title: string;
    options?: TestOption[];
    questions: Question[];
    scoring: Scoring;
}

export interface TestState {
    currentQuestion: number;
    answers: Record<number, number>;
    completed: boolean;
    maxReachedQuestion: number;
}

export interface ScoredItem {
    name: string;
    score: number;
    interpretation: string;
}

export type ScoringResult =
    | { type: "sum"; totalScore: number; interpretation: string }
    | { type: "groups"; items: ScoredItem[] }
    | { type: "reverse"; items: ScoredItem[] };

export interface ResultTemplates {
    interpretation: HTMLTemplateElement;
    group: HTMLTemplateElement;
}
