import type { Lang } from "../../i18n/utils";

interface HomePriceContent {
	cardTitle: string;
	features: string[];
	price: string;
	infoText: string;
	contactText: string;
}

export const homePriceContent: Record<Lang, HomePriceContent> = {
	ru: {
		cardTitle: "Онлайн консультация",
		features: [
			"Встреча длится 60 минут",
			"Отвечу на интересующие вас вопросы",
			"Соберу основную информацию",
			"Всё, что для этого нужно - стабильное интернет-соединение и помещение, где вас не будут отвлекать",
		],
		price: "€50 / $55",
		infoText:
			"Работаю только онлайн, по всему миру, по предоплате. Оплату принимаю в евро и долларах. Буду рада вам помочь!",
		contactText: "Для связи:",
	},
	en: {
		cardTitle: "Online consultation",
		features: [
			"Session lasts 60 minutes",
			"I will answer your questions",
			"I will gather key information",
			"All you need is a stable internet connection and a private space where you won't be disturbed",
		],
		price: "€50 / $55",
		infoText:
			"I work online only, worldwide, with prepayment. I accept payment in euros and dollars. I'd be happy to help you!",
		contactText: "Contact me:",
	},
};
