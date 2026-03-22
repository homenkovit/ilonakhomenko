import type { Lang } from "../../i18n/utils";

interface BookingContent {
	title: string;
	subtitle: string;
	offlineMessage: string;
}

export const bookingContent: Record<Lang, BookingContent> = {
	ru: {
		title: "Запись на консультацию",
		subtitle: "Выберите удобную дату и время.",
		offlineMessage:
			"Календарь недоступен без подключения к интернету. Пожалуйста, проверьте соединение.",
	},
	en: {
		title: "Book a session",
		subtitle: "Choose a convenient date and time.",
		offlineMessage:
			"The calendar is unavailable without an internet connection. Please check your connection.",
	},
};
