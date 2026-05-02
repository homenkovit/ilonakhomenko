import { contacts } from "../../config/contacts";
import type { Lang } from "../../i18n/utils";

interface HomeAboutContent {
	title: string;
	paragraphs: string[];
	learnMoreText: string;
	photoAlt: string;
}

export const homeAboutContent: Record<Lang, HomeAboutContent> = {
	ru: {
		title: "Бережный онлайн подход в\u00A0удобном для вас темпе",
		paragraphs: [
			`Меня зовут Илона. Я нейроотличный специалист по психологическому консультированию с высшим психологическим образованием и опытом частной практики. Живу в Нидерландах и работаю онлайн по всему миру в формате консультирования и поддержки, соблюдая профессиональные и этические стандарты. Оплату принимаю в евро. Я помогаю русскоязычным людям за пределами РФ справляться с тревогой, эмоциональным выгоранием, сложными жизненными этапами и адаптацией в новой стране, без давления и универсальных шаблонов, с опорой на современные доказательные подходы и практики психологической поддержки. Моя работа — это пространство для бережного разговора, осмысления происходящего и поиска устойчивых решений. Веду уютный <a href="${contacts.telegramChannel}" target="_blank" rel="noopener noreferrer">телеграм канал "Безоценочно с поддержкой"</a>. С уважением и принятием отношусь к людям любой сексуальной ориентации и гендерной идентичности.`,
			"Консультации проходят онлайн — в комфортной для вас обстановке и в удобное для вас время.",
		],
		learnMoreText: "Подробнее обо мне",
		photoAlt: "Илона Хоменко — психолог",
	},
	en: {
		title: "A\u00A0gentle online approach at\u00A0your own pace",
		paragraphs: [
			`My name is Ilona. I am a neurodivergent counseling professional with a degree in psychology and experience in private practice. I live in the Netherlands and work online worldwide, providing counseling and support while maintaining professional and ethical standards. I accept payment in euros. I help people cope with anxiety, emotional burnout, difficult life transitions, and adaptation in a new country — without pressure or one-size-fits-all approaches, drawing on modern evidence-based practices of psychological support. My work is a space for gentle conversation, making sense of what's happening, and finding sustainable solutions. I run a cozy <a href="${contacts.telegramChannel}" target="_blank" rel="noopener noreferrer">Telegram channel "Without judgment, with support"</a>. I treat people of all sexual orientations and gender identities with respect and acceptance.`,
			"Sessions take place online — in a comfortable setting and at a convenient time for you.",
		],
		learnMoreText: "Learn more about me",
		photoAlt: "Ilona Khomenko — psychologist",
	},
};
