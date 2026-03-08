import type { TestState } from "./types";

function createDefaultState(): TestState {
	return {
		currentQuestion: 0,
		answers: {},
		completed: false,
		maxReachedQuestion: 0,
	};
}

export class TestStateManager {
	#state: TestState;
	readonly #storageKey: string;
	readonly #onStorageError: (() => void) | undefined;
	#storageErrorNotified = false;

	constructor(testId: string, onStorageError?: () => void) {
		this.#storageKey = `test_state_${testId}`;
		this.#onStorageError = onStorageError;
		this.#state = this.#load();
	}

	get state(): Readonly<TestState> {
		return this.#state;
	}

	get currentQuestion(): number {
		return this.#state.currentQuestion;
	}

	get answers(): Readonly<Record<number, number>> {
		return this.#state.answers;
	}

	get completed(): boolean {
		return this.#state.completed;
	}

	get maxReachedQuestion(): number {
		return this.#state.maxReachedQuestion;
	}

	recordAnswer(questionIndex: number, value: number): void {
		this.#state.answers[questionIndex] = value;
		this.#state.currentQuestion = questionIndex + 1;
		if (this.#state.currentQuestion > this.#state.maxReachedQuestion) {
			this.#state.maxReachedQuestion = this.#state.currentQuestion;
		}
	}

	markCompleted(): void {
		this.#state.completed = true;
		this.#save();
	}

	goTo(questionIndex: number): void {
		this.#state.currentQuestion = questionIndex;
		this.#save();
	}

	save(): void {
		this.#save();
	}

	reset(): void {
		this.#state = createDefaultState();
		try {
			localStorage.removeItem(this.#storageKey);
		} catch (e) {
			console.error("Error removing state:", e);
		}
	}

	#load(): TestState {
		try {
			const saved = localStorage.getItem(this.#storageKey);
			if (saved) {
				return JSON.parse(saved);
			}
		} catch (e) {
			console.error("Error loading state:", e);
			this.#notifyStorageError();
		}
		return createDefaultState();
	}

	#save(): void {
		try {
			localStorage.setItem(this.#storageKey, JSON.stringify(this.#state));
		} catch (e) {
			console.error("Error saving state:", e);
			this.#notifyStorageError();
		}
	}

	#notifyStorageError(): void {
		if (this.#storageErrorNotified) return;
		this.#storageErrorNotified = true;
		this.#onStorageError?.();
	}
}
