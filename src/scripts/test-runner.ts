import type {
    TestData,
    TestState,
    TestOption,
    Question,
    SumScoring,
    GroupsScoring,
    ReverseScoring,
} from "../types/test";

export class TestRunner {
    #testData: TestData;
    #state: TestState;
    #isInitialLoad: boolean = true;
    readonly #storageKey: string;

    #questionText: HTMLElement;
    #progressText: HTMLElement;
    #optionsContainer: HTMLElement;
    #questionContainer: HTMLElement;
    #resultContainer: HTMLElement;
    #resultContent: HTMLElement;
    #prevBtn: HTMLElement;
    #nextBtn: HTMLElement;

    constructor(containerElement: HTMLElement, testData: TestData) {
        this.#testData = testData;
        this.#storageKey = `test_state_${this.#testData.id}`;

        this.#questionText = document.getElementById("question-text")!;
        this.#progressText = document.getElementById("test-progress")!;
        this.#optionsContainer = document.getElementById("test-options")!;
        this.#questionContainer = containerElement.querySelector(".test-question-container")!;
        this.#resultContainer = document.getElementById("result-container")!;
        this.#resultContent = document.getElementById("result-content")!;
        this.#prevBtn = document.getElementById("prev-btn")!;
        this.#nextBtn = document.getElementById("next-btn")!;

        this.#state = this.#loadState();
        this.#init();
    }

    #loadState(): TestState {
        try {
            const saved = localStorage.getItem(this.#storageKey);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error("Error loading state:", e);
        }
        return { currentQuestion: 0, answers: {}, completed: false, maxReachedQuestion: 0 };
    }

    #saveState(): void {
        try {
            localStorage.setItem(
                this.#storageKey,
                JSON.stringify(this.#state),
            );
        } catch (e) {
            console.error("Error saving state:", e);
        }
    }

    #withViewTransition(callback: () => void): void {
        if (!document.startViewTransition) {
            callback();
            return;
        }

        document.startViewTransition(callback);
    }

    #init(): void {
        if (this.#state.completed) {
            this.#showResult();
        } else {
            this.#renderQuestion();
        }

        this.#isInitialLoad = false;

        document.getElementById("share-btn")?.addEventListener("click", () => this.#share());
        document.getElementById("restart-btn")?.addEventListener("click", () => this.#restart());
        this.#prevBtn.addEventListener("click", () => this.#goToPrevious());
        this.#nextBtn.addEventListener("click", () => this.#goToNext());
    }

    #getQuestionText(question: Question): string {
        return typeof question === "string" ? question : question.text;
    }

    #getQuestionOptions(question: Question): TestOption[] {
        if (typeof question === "object" && question.options) {
            return question.options;
        }
        return this.#testData.options || [];
    }

    #renderQuestion(): void {
        const question = this.#testData.questions[this.#state.currentQuestion];
        const total = this.#testData.questions.length;
        const questionText = this.#getQuestionText(question);
        const options = this.#getQuestionOptions(question);

        this.#questionText.textContent = questionText;
        this.#progressText.textContent = `Вопрос ${this.#state.currentQuestion + 1} из ${total}`;

        this.#optionsContainer.innerHTML = "";
        const selectedAnswer = this.#state.answers[this.#state.currentQuestion];

        options.forEach((option) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "option-btn";
            if (selectedAnswer === option.value) {
                btn.classList.add("selected");
            }
            btn.textContent = option.text;
            btn.addEventListener("click", (event) => {
                const clickedBtn = event.currentTarget as HTMLButtonElement;
                this.#selectOption(option.value, clickedBtn);
            });
            this.#optionsContainer.appendChild(btn);
        });

        this.#questionContainer.style.display = "block";
        this.#resultContainer.style.display = "none";

        this.#updateNavigationButtons();

        if (!this.#isInitialLoad) {
            this.#questionText.focus();
        }
    }

    #selectOption(value: number, button: HTMLButtonElement): void {
        this.#state.answers[this.#state.currentQuestion] = value;
        this.#state.currentQuestion++;

        if (this.#state.currentQuestion > this.#state.maxReachedQuestion) {
            this.#state.maxReachedQuestion = this.#state.currentQuestion;
        }

        const proceedToNext = () => {
            if (this.#state.currentQuestion >= this.#testData.questions.length) {
                this.#state.completed = true;
                this.#saveState();
                this.#withViewTransition(() => this.#showResult());
            } else {
                this.#saveState();
                this.#withViewTransition(() => this.#renderQuestion());
            }
        };

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            proceedToNext();
        } else {
            button.classList.add("clicked");
            button.addEventListener("transitionend", proceedToNext, { once: true });
        }
    }

    #updateNavigationButtons(): void {
        const isFirst = this.#state.currentQuestion === 0;
        const isAtMax = this.#state.currentQuestion >= this.#state.maxReachedQuestion;

        if (isFirst) {
            this.#prevBtn.setAttribute("hidden", "");
        } else {
            this.#prevBtn.removeAttribute("hidden");
        }

        if (isAtMax) {
            this.#nextBtn.setAttribute("hidden", "");
        } else {
            this.#nextBtn.removeAttribute("hidden");
        }
    }

    #goToPrevious(): void {
        if (this.#state.currentQuestion > 0) {
            this.#state.currentQuestion--;
            this.#saveState();
            this.#withViewTransition(() => this.#renderQuestion());
        }
    }

    #goToNext(): void {
        if (this.#state.currentQuestion < this.#state.maxReachedQuestion) {
            this.#state.currentQuestion++;
            this.#saveState();
            this.#withViewTransition(() => this.#renderQuestion());
        }
    }

    #calculateResult(): string {
        const scoring = this.#testData.scoring;

        switch (scoring.type) {
            case "sum":
                return this.#calculateSumResult(scoring);
            case "groups":
                return this.#calculateGroupsResult(scoring);
            case "reverse":
                return this.#calculateReverseResult(scoring);
            default:
                return "Результат не может быть рассчитан.";
        }
    }

    #calculateSumResult(scoring: SumScoring): string {
        const resultHeading = document.getElementById("result-heading")!;
        const total = Object.values(this.#state.answers).reduce(
            (sum, val) => sum + val,
            0,
        );

        let interpretation = "";
        for (const range of scoring.ranges) {
            if (total <= range.max) {
                interpretation = range.label;
                break;
            }
            interpretation = range.label;
        }

        resultHeading.textContent += ` ${total}`;

        return `
            <p class="result-interpretation">${interpretation}</p>
        `;
    }

    #calculateGroupsResult(scoring: GroupsScoring): string {
        let html = "";

        for (let i = 0; i < scoring.groups.length; i++) {
            const group = scoring.groups[i];
            let groupScore = 0;
            for (const qNum of group.questions) {
                const answer = this.#state.answers[qNum - 1];
                if (answer !== undefined) {
                    groupScore += answer;
                }
            }

            const interpretation = groupScore >= 0 ? group.positive : group.negative;

            html += `
                <div class="result-group">
                    <p class="result-group-name">${i + 1}. ${group.name} ${groupScore}</p>
                    <p class="result-group-interpretation">${interpretation}</p>
                </div>
            `;
        }

        return html;
    }

    #calculateReverseResult(scoring: ReverseScoring): string {
        let html = "";
        const options = this.#testData.options || [];
        const maxOptionValue = Math.max(...options.map((option) => option.value), 5);
        const minOptionValue = Math.min(...options.map((option) => option.value), 1);

        for (let i = 0; i < scoring.factors.length; i++) {
            const factor = scoring.factors[i];
            let factorScore = 0;

            for (const qNum of factor.questions) {
                let answer = this.#state.answers[qNum - 1];
                if (answer === undefined) continue;

                if (factor.reversed.includes(qNum)) {
                    answer = maxOptionValue + minOptionValue - answer;
                }

                factorScore += answer;
            }

            html += `
                <div class="result-group">
                    <p class="result-group-name">${i + 1}. ${factor.name}: ${factorScore}</p>
                    <p class="result-group-interpretation">${factor.description}</p>
                </div>
            `;
        }

        return html;
    }

    #getPluralForm(n: number, one: string, few: string, many: string): string {
        const mod10 = n % 10;
        const mod100 = n % 100;

        if (mod10 === 1 && mod100 !== 11) return one;
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
        return many;
    }

    #getSumResultText(scoring: SumScoring): string {
        const total = Object.values(this.#state.answers).reduce(
            (sum, val) => sum + val,
            0,
        );

        let interpretation = "";
        for (const range of scoring.ranges) {
            if (total <= range.max) {
                interpretation = range.label;
                break;
            }
            interpretation = range.label;
        }

        return `Результат: ${total} ${this.#getPluralForm(total, 'балл', 'балла', 'баллов')}\n${interpretation}`;
    }

    #getGroupsResultText(scoring: GroupsScoring): string {
        const results: string[] = [];

        for (const group of scoring.groups) {
            let groupScore = 0;
            for (const qNum of group.questions) {
                const answer = this.#state.answers[qNum - 1];
                if (answer !== undefined) {
                    groupScore += answer;
                }
            }
            results.push(`• ${group.name}: ${groupScore}`);
        }

        return "Результаты:\n" + results.join("\n");
    }

    #getReverseResultText(scoring: ReverseScoring): string {
        const results: string[] = [];
        const options = this.#testData.options || [];
        const maxOptionValue = Math.max(...options.map((option) => option.value), 5);
        const minOptionValue = Math.min(...options.map((option) => option.value), 1);

        for (const factor of scoring.factors) {
            let factorScore = 0;

            for (const qNum of factor.questions) {
                let answer = this.#state.answers[qNum - 1];
                if (answer === undefined) continue;

                if (factor.reversed.includes(qNum)) {
                    answer = maxOptionValue + minOptionValue - answer;
                }

                factorScore += answer;
            }

            results.push(`• ${factor.name}: ${factorScore}`);
        }

        return "Результаты:\n" + results.join("\n");
    }

    #getResultTextForSharing(): string {
        const scoring = this.#testData.scoring;

        switch (scoring.type) {
            case "sum":
                return this.#getSumResultText(scoring);
            case "groups":
                return this.#getGroupsResultText(scoring);
            case "reverse":
                return this.#getReverseResultText(scoring);
            default:
                return "";
        }
    }

    #showResult(): void {
        this.#questionContainer.style.display = "none";
        this.#resultContainer.style.display = "block";
        this.#resultContent.innerHTML = this.#calculateResult();

        if (!this.#isInitialLoad) {
            document.getElementById("result-heading")?.focus();
        }
    }

    async #share(): Promise<void> {
        const shareBtn = document.getElementById("share-btn");
        if (!shareBtn) return;

        const originalHTML = shareBtn.innerHTML;
        const title = `Я прошёл(а) тест "${this.#testData.title}"`;
        const resultText = this.#getResultTextForSharing();
        const url = window.location.href;
        const plainTextContent = `${title}\n\n${resultText}\n\nПройти тест: ${url}`;

        const showFeedback = (message: string) => {
            shareBtn.textContent = message;
            setTimeout(() => {
                shareBtn.innerHTML = originalHTML;
            }, 2000);
        };

        if (navigator.share) {
            try {
                await navigator.share({ text: plainTextContent });
                showFeedback("Отправлено");
                return;
            } catch (e) {
                if (e instanceof Error && e.name === "AbortError") return;
            }
        }

        if (navigator.clipboard?.write && window.ClipboardItem) {
            try {
                const resultTextHTML = resultText
                    .replace(/\n/g, '<br>')
                    .replace(/• /g, '&bull; ');

                const htmlContent = `<div>
                    <p>${title}</p>
                    <p>${resultTextHTML}</p>
                    <p><a href="${url}">Пройти тест: ${url}</a></p>
                </div>`;


                const clipboardItem = new ClipboardItem({
                    'text/html': new Blob([htmlContent], { type: 'text/html' }),
                    'text/plain': new Blob([plainTextContent], { type: 'text/plain' }),
                });

                await navigator.clipboard.write([clipboardItem]);
                showFeedback("Скопировано");
                return;
            } catch (error) {
                console.error('ClipboardItem failed:', error);
            }
        }

        try {
            await navigator.clipboard.writeText(plainTextContent);
            showFeedback("Скопировано");
        } catch {
            showFeedback("Ошибка");
        }
    }

    #restart(): void {
        this.#state = { currentQuestion: 0, answers: {}, completed: false, maxReachedQuestion: 0 };
        localStorage.removeItem(this.#storageKey);
        this.#withViewTransition(() => this.#renderQuestion());
    }
}
