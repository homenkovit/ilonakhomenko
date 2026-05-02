import { contacts } from "../config/contacts";
import type { Lang } from "../i18n/utils";

export interface FaqItem {
	question: string;
	answer: string;
}

export const faqItems: Record<Lang, FaqItem[]> = {
	ru: [
		{
			question: "Могу ли я получить помощь онлайн?",
			answer: `Да, я работаю онлайн, и для многих запросов этот формат хорошо подходит. При этом есть ситуации, когда человеку может быть рекомендован другой формат или дополнительная поддержка у профильных специалистов. Если вы сомневаетесь, подойдёт ли онлайн-консультирование именно в вашем случае, вы можете написать мне в <a href="${contacts.telegram}" target="_blank" rel="noopener noreferrer">telegram</a>, <a href="${contacts.whatsapp}" target="_blank" rel="noopener noreferrer">whatsapp</a> или на <a href="mailto:${contacts.email}">почту</a> и уточнить свой вопрос. Я постараюсь сориентировать вас по формату работы.`,
		},
		{
			question: "Сколько длится первая встреча и как к ней подготовиться?",
			answer:
				"Первая встреча со мной длится 60 минут. Этого чаще всего хватает, чтобы у нас было достаточно пространства для знакомства, обсуждения вашего запроса и формата дальнейшей работы. Как-то специально готовиться не нужно — это не собеседование и не экзамен. Можно взять лист бумаги и ручку, если вам захочется что-то записать. На первой встрече мы знакомимся, обсуждаем, с чем вы пришли, я рассказываю, как может выглядеть наша дальнейшая работа, и вместе принимаем решение о продолжении сотрудничества. Стоимость первой встречи - 60 евро.",
		},
		{
			question: "Что будет на первой встрече? Не знаю, с чего начать",
			answer:
				"Первая встреча часто бывает волнительной — это нормально. Можно начать с того, что сейчас больше всего беспокоит или мешает вам в жизни. В работе со мной нет оценки и критики. Консультирование — это пространство, где вы можете говорить о своём опыте и переживаниях в безопасной и поддерживающей атмосфере.",
		},
		{
			question: "Сколько встреч может понадобиться?",
			answer:
				"Это очень индивидуально и зависит от запроса и вашей ситуации. Очень легко попасть впросак с ответом, когда ещё не знаешь, в чём она заключается. Краткосрочная работа в среднем длится от 10 до 12 сессий, но может занять еще меньше. Долгосрочная занимает от 40 и более, а среднесрочная - это промежуток после 12 сессий и до 40. При легких ситуационных трудностях иногда бывает достаточно до 10 сессий. Ориентиры по продолжительности мы обсуждаем по мере прояснения вашего запроса и можем корректировать их в процессе — это нормальная часть консультативной работы.",
		},
		{
			question:
				"Слышал(а), что в специалисты по психологическому консультированию не дают советов и ничего не обещают. Что тогда происходит на встречах?",
			answer:
				"В консультировании вы сами определяете, какие изменения вам важны и в каком темпе вы готовы к ним идти. Я не навязываю решений и не обещаю конкретных результатов. Моя задача — помочь вам лучше понять себя и свою ситуацию, увидеть возможные варианты и опоры, поддержать вас в поиске подходящих для вас решений. В некоторых сложных жизненных ситуациях (например, при переживании утраты или сильного стресса) я могу давать более поддерживающие и ориентирующие рекомендации — в рамках психологической поддержки, а не медицинской помощи.",
		},
	],
	en: [
		{
			question: "Can I get help online?",
			answer: `Yes, I work online, and for many concerns this format works well. However, there are situations where a different format or additional support from specialized professionals may be recommended. If you're unsure whether online counseling is right for your case, you can message me on <a href="${contacts.telegram}" target="_blank" rel="noopener noreferrer">Telegram</a>, <a href="${contacts.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp</a>, or <a href="mailto:${contacts.email}">email</a> to clarify your question. I'll do my best to help you determine the right format.`,
		},
		{
			question: "How long is the first session and how should I prepare?",
			answer:
				"The first session lasts 60 minutes. This is usually enough for us so we can get to know each other, discuss your questions, and talk about how we’ll proceed from here. No special preparation is needed — it's not an interview or exam. You can use a pen and paper if you'd like to take notes. During our first session, we’ll get to know each other, discuss what brought you to me, I’ll explain what our future work might look like, and together we’ll decide whether to continue. The cost of the first session is €60.",
		},
		{
			question: "What happens in the first session? I don't know where to start",
			answer:
				"The first session feels exciting — that's normal. You can start with whatever concerns or bothers you most in your life right now. In my work, there is no judgment or criticism. Counseling is a space where you can talk about your experience and feelings in a safe and supportive atmosphere.",
		},
		{
			question: "How many sessions might I need?",
			answer:
				"This is very individual and depends on your concern and situation. Short-term work typically lasts 10 to 12 sessions, but can be even shorter. Long-term work takes 40 or more sessions, and medium-term falls between 12 and 40. For mild situational difficulties, sometimes up to 10 sessions are enough. We’ll discuss the estimated timeline as we get a clearer picture of your situation, and we can adjust them along the way — this is a standard part of the consultation process.",
		},
		{
			question:
				"I've heard that counseling professionals don't give advice and don't promise anything. What happens in sessions then?",
			answer:
				"In counseling, you determine what changes are important to you and at what pace you're ready to pursue them. I don’t impose ready-made solutions or promise specific results. My goal is to help you better understand yourself and your situation, identify possible options and points of support, and assist you in finding solutions that work for you in unique way. In certain difficult life situations (for example, when experiencing loss or severe stress), I can offer you more constructive and helpful guidance — as part of psychological support, rather than medical care.",
		},
	],
};
