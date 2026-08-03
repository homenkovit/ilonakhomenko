import type { Lang } from "../../i18n/utils";

interface EducationContent {
	pageTitle: string;
	introParagraphs: string[];
	certsTitle: string;
}

interface Certificate {
	/** Stable filename (without extension) in src/assets/images/education/ */
	file: string;
	alt: Record<Lang, string>;
}

// Single source of truth for both display order and file-to-alt mapping.
// To reorder: move an entry. To insert: add one entry + one image file. Nothing else changes.
export const certificates: Certificate[] = [
	{
		file: "diploma-rhga-psychologist",
		alt: { ru: "Диплом психолога РХГА", en: "Psychology diploma — RHGA" },
	},
	{
		file: "diploma-higher-education",
		alt: { ru: "Диплом о высшем образовании", en: "Higher education diploma" },
	},
	{
		file: "diploma-qualification",
		alt: { ru: "Диплом о квалификации", en: "Qualification diploma" },
	},
	{
		file: "certificate-rhga",
		alt: { ru: "Сертификат РХГА", en: "RHGA certificate" },
	},
	{
		file: "diploma-manp-clinical-psychologist",
		alt: {
			ru: "Диплом о профессиональной переподготовке МАНП — клинический психолог",
			en: "Professional retraining diploma — MANP, clinical psychologist",
		},
	},
	{
		file: "diploma-manp-clinical-appendix",
		alt: {
			ru: "Диплом о профессиональной переподготовке МАНП — приложение",
			en: "Professional retraining diploma — MANP, appendix",
		},
	},
	{
		file: "diploma-manp-clinical-program",
		alt: {
			ru: "Диплом о профессиональной переподготовке МАНП — содержание и результаты освоения программы",
			en: "Professional retraining diploma — MANP, program content and results",
		},
	},
	{
		file: "diploma-idpo-psychologist-consultant",
		alt: {
			ru: "Диплом о профессиональной переподготовке СПБ ИДПО — психолог-консультант",
			en: "Professional retraining diploma — SPb IDPO, psychologist-consultant",
		},
	},
	{
		file: "diploma-idpo-appendix",
		alt: {
			ru: "Диплом о профессиональной переподготовке СПБ ИДПО — приложение",
			en: "Professional retraining diploma — SPb IDPO, appendix",
		},
	},
	{
		file: "diploma-idpo-course-list",
		alt: {
			ru: "Диплом о профессиональной переподготовке СПБ ИДПО — перечень дисциплин",
			en: "Professional retraining diploma — SPb IDPO, course list",
		},
	},
	{
		file: "certificate-act",
		alt: { ru: "Сертификат ACT", en: "ACT certificate" },
	},
	{
		file: "certificate-manp-1",
		alt: { ru: "Сертификат МАНП", en: "MANP certificate" },
	},
	{
		file: "certificate-manp-2",
		alt: { ru: "Сертификат МАНП", en: "MANP certificate" },
	},
	{
		file: "certificate-manp-addictions",
		alt: {
			ru: "Сертификат МАНП — Стратегии психологической помощи при аддикциях",
			en: "MANP certificate — Strategies of psychological assistance for addictions",
		},
	},
	{
		file: "certificate-docpsyfest-26",
		alt: {
			ru: "Сертификат участника фестиваля ДокПсиФест'26",
			en: "DocPsyFest'26 festival participant certificate",
		},
	},
];

export const educationContent: Record<Lang, EducationContent> = {
	ru: {
		pageTitle: "Образование",
		introParagraphs: [
			"В 2013 году получила квалификацию психолога в Русской Христианской Гуманитарной Академии. В 2026 году прошла профессиональную переподготовку в МАНП по программе «Клиническая психология» (1200 часов) и получила квалификацию клинического психолога.",
			"<strong>Основной подход:</strong> Терапия принятия и ответственности (Acceptance and Commitment Therapy, ACT).",
			"<strong>Дополнительные направления:</strong> ориентированная на решение краткосрочная терапия, ОРКТ (Solution Focused Brief Therapy, SFBT), терапия, сфокусированная на сострадании (Compassion-Focused Therapy, CFT), когнитивно-поведенческая терапия, клиент-центрированный подход.",
			"Ниже вы можете найти все дипломы и сертификаты по обучениям, которые у меня завершены на данный момент.",
		],
		certsTitle: "Дипломы и сертификаты",
	},
	en: {
		pageTitle: "Education",
		introParagraphs: [
			"In 2013, I graduated from the Russian Christian Humanitarian Academy as a psychologist. In 2026, I completed professional retraining at MANP in Clinical Psychology (1200 hours) and earned the qualification of clinical psychologist.",
			"<strong>Main approach:</strong> Acceptance and Commitment Therapy (ACT).",
			"<strong>Additional approaches:</strong> Solution Focused Brief Therapy (SFBT), Compassion-Focused Therapy (CFT), Cognitive Behavioral Therapy (CBT), Client-Centered approach.",
			"Below you can find all the diplomas and training certificates I have.",
		],
		certsTitle: "Diplomas and certificates",
	},
};
