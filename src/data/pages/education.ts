import type { Lang } from "../../i18n/utils";

interface EducationContent {
	pageTitle: string;
	introParagraphs: string[];
	certsTitle: string;
	certificateAlts: string[];
}

export const educationContent: Record<Lang, EducationContent> = {
	ru: {
		pageTitle: "Образование",
		introParagraphs: [
			"В 2013 году получила квалификацию психолога в Русской Христианской Гуманитарной Академии. Сейчас я еще прохожу программу повышения квалификации в МАНП на клинического психолога, соответственно, диплом прикреплю по ее завершении.",
			"<strong>Основной подход:</strong> Терапия принятия и ответственности (Acceptance and Commitment Therapy, ACT).",
			"<strong>Дополнительные направления:</strong> ориентированная на решение краткосрочная терапия, ОРКТ (Solution Focused Brief Therapy, SFBT), терапия, сфокусированная на сострадании (Compassion-Focused Therapy, CFT), когнитивно-поведенческая терапия, клиент-центрированный подход.",
			"Ниже вы можете найти все дипломы и сертификаты по обучениям, которые у меня завершены на данный момент.",
		],
		certsTitle: "Дипломы и сертификаты",
		certificateAlts: [
			"Диплом психолога РХГА",
			"Диплом о высшем образовании",
			"Диплом о квалификации",
			"Сертификат РХГА",
			"Сертификат ACT",
			"Сертификат МАНП",
			"Сертификат МАНП",
		],
	},
	en: {
		pageTitle: "Education",
		introParagraphs: [
			"In 2013, I received my psychology qualification from the Russian Christian Humanitarian Academy. I am currently completing an advanced training program at MANP to become a clinical psychologist; I will attach the diploma upon completion.",
			"<strong>Primary approach:</strong> Acceptance and Commitment Therapy (ACT).",
			"<strong>Additional modalities:</strong> Solution Focused Brief Therapy (SFBT), Compassion-Focused Therapy (CFT), Cognitive Behavioral Therapy (CBT), Client-Centered approach.",
			"Below you can find all diplomas and certificates for the trainings I have completed to date.",
		],
		certsTitle: "Diplomas and certificates",
		certificateAlts: [
			"Psychology diploma — RHGA",
			"Higher education diploma",
			"Qualification diploma",
			"RHGA certificate",
			"ACT certificate",
			"MANP certificate",
			"MANP certificate",
		],
	},
};
