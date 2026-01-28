import type { TestData, Question, TestOption } from "./types";
import { TestStateManager } from "./test-state";
import { createScoringStrategy, type ScoringStrategy } from "./scoring/scoring-strategy";
import { formatResultAsHtml, formatResultAsText, getResultHeadingSuffix } from "./result-formatter";

export class TestRunner {
    #testData: TestData;
    #stateManager: TestStateManager;
    #scoringStrategy: ScoringStrategy;
    #isInitialLoad = true;

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
        this.#stateManager = new TestStateManager(testData.id);
        this.#scoringStrategy = createScoringStrategy(testData);

        this.#questionText = document.getElementById("question-text")!;
        this.#progressText = document.getElementById("test-progress")!;
        this.#optionsContainer = document.getElementById("test-options")!;
        this.#questionContainer = containerElement.querySelector(".test-question-container")!;
        this.#resultContainer = document.getElementById("result-container")!;
        this.#resultContent = document.getElementById("result-content")!;
        this.#prevBtn = document.getElementById("prev-btn")!;
        this.#nextBtn = document.getElementById("next-btn")!;

        this.#init();
    }

    #init(): void {
        if (this.#stateManager.completed) {
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
        const q = this.#stateManager.currentQuestion;
        const question = this.#testData.questions[q];
        const total = this.#testData.questions.length;
        const questionText = this.#getQuestionText(question);
        const options = this.#getQuestionOptions(question);

        this.#questionText.textContent = questionText;
        this.#progressText.textContent = `Вопрос ${q + 1} из ${total}`;

        this.#optionsContainer.innerHTML = "";
        const selectedAnswer = this.#stateManager.answers[q];

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
        this.#stateManager.recordAnswer(this.#stateManager.currentQuestion, value);

        const proceedToNext = () => {
            if (this.#stateManager.currentQuestion >= this.#testData.questions.length) {
                this.#stateManager.markCompleted();
                this.#withViewTransition(() => this.#showResult());
            } else {
                this.#stateManager.save();
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
        const isFirst = this.#stateManager.currentQuestion === 0;
        const isAtMax = this.#stateManager.currentQuestion >= this.#stateManager.maxReachedQuestion;

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
        const q = this.#stateManager.currentQuestion;
        if (q > 0) {
            this.#stateManager.goTo(q - 1);
            this.#withViewTransition(() => this.#renderQuestion());
        }
    }

    #goToNext(): void {
        const q = this.#stateManager.currentQuestion;
        if (q < this.#stateManager.maxReachedQuestion) {
            this.#stateManager.goTo(q + 1);
            this.#withViewTransition(() => this.#renderQuestion());
        }
    }

    #withViewTransition(callback: () => void): void {
        if (!document.startViewTransition) {
            callback();
            return;
        }

        document.startViewTransition(callback);
    }

    #showResult(): void {
        const result = this.#scoringStrategy.calculate(this.#stateManager.answers);

        this.#questionContainer.style.display = "none";
        this.#resultContainer.style.display = "block";
        this.#resultContent.innerHTML = formatResultAsHtml(result);

        const heading = document.getElementById("result-heading");
        const suffix = getResultHeadingSuffix(result);
        if (heading && suffix) {
            heading.textContent += suffix;
        }

        if (!this.#isInitialLoad) {
            heading?.focus();
        }
    }

    async #share(): Promise<void> {
        const shareBtn = document.getElementById("share-btn");
        if (!shareBtn) return;

        const originalHTML = shareBtn.innerHTML;
        const title = `Я прошёл(а) тест "${this.#testData.title}"`;

        const result = this.#scoringStrategy.calculate(this.#stateManager.answers);
        const resultText = formatResultAsText(result);

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
        this.#stateManager.reset();
        this.#withViewTransition(() => this.#renderQuestion());
    }
}
