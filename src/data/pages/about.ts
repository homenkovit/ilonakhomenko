import type { Lang } from "../../i18n/utils";

interface AboutContent {
	introParagraphs: string[];
	principlesTitle: string;
	principles: { title: string; description: string }[];
}

export const aboutContent: Record<Lang, AboutContent> = {
	ru: {
		introParagraphs: [
			"В своей работе я опираюсь на методы ACT (подход, ориентированный на принятие, ценности и осознанные действия в жизни даже при сложных эмоциях), а также CFT (подход, сфокусированный на развитии сострадания к себе и поддерживающего внутреннего отношения). Также использую элементы решение-фокусированного подхода — как способ поиска выходов из трудных жизненных ситуаций и возвращения человеку ощущения авторства собственной жизни. При этом я придерживаюсь гуманистической позиции: с вами изначально всё в порядке.",
			"Почему я сочетаю несколько подходов? Потому что это даёт больше гибкости в работе и позволяет смотреть на сложные ситуации с разных сторон, замечая больше возможных опор и вариантов изменений. В центре нашей совместной работы находитесь вы. С каким бы запросом, трудностью или жизненной дилеммой вы ни пришли, я буду сопровождать вас в процессе исследования вашей ситуации и поиска подходящих именно вам решений. Вы — не проблема и не существуете в вакууме. Я учитываю социальный контекст и условия, в которых вы живёте, и то, как они могут влиять на ваше состояние и выборы. Вместе мы будем постепенно разбираться в этом сложном «клубке» обстоятельств, переживаний и противоречий. Если в процессе работы я пойму, что мой профессиональный опыт и формат консультирования не подходят для вашего запроса, я честно скажу об этом и при необходимости порекомендую коллегу, чья специализация может лучше соответствовать вашей ситуации.",
			"Я стараюсь не использовать устаревшие и стигматизирующие термины (например, «невроз») и регулярно обновляю свои знания, чтобы опираться на современные исследования и практики в области психологического консультирования и смежных дисциплин. В настоящий момент я прохожу дополнительное профессиональное обучение, расширяя свою квалификацию в области психологической помощи и консультирования. Я также хорошо ориентируюсь в теме нейроотличий и подбираю индивидуальный формат работы с учётом особенностей каждого человека.",
		],
		principlesTitle: "Принципы работы",
		principles: [
			{
				title: "Конфиденциальность.",
				description:
					"Я соблюдаю конфиденциальность нашей работы. Если я выношу ваш случай на супервизию, это происходит без какой-либо идентифицирующей информации и только с вашего предварительного согласия.",
			},
			{
				title: "Последовательность и гибкость.",
				description:
					"В первые несколько встреч я помогаю вам собрать и описать вашу жизненную историю и контекст (ваш опыт, важные события, текущую ситуацию). При этом я всегда готова гибко менять структуру встречи, ориентируясь на ваше состояние и запрос в конкретный момент.",
			},
			{
				title: "Индивидуальный подход и атмосфера принятия.",
				description:
					"Я приглашаю вас свободно говорить о любых мыслях и переживаниях — в том числе о страхе быть осуждённым, неловкости или стыде. Я придерживаюсь гуманистической позиции: с вами изначально всё в порядке. Сейчас вам может быть больно и трудно — и моя задача быть рядом и поддерживать вас в этом процессе.",
			},
			{
				title: "Объём встреч по совместной договоренности.",
				description:
					"Количество встреч определяется совместно с вами и может меняться по ходу работы, сколько нужно конкретно вам, ни больше, ни меньше. В зависимости от ваших целей, состояния и жизненной ситуации. У меня нет цели удерживать вас в консультировании дольше необходимого или, наоборот, завершать работу раньше, чем вам будет комфортно.",
			},
			{
				title: "Бережность.",
				description:
					"Мы не будем сразу идти в самые болезненные темы без ощущения опоры и готовности. Иными словами, в бурелом без подготовки лезть не будем. Я стараюсь выстраивать работу так, чтобы у вас было достаточно безопасности и ресурса.",
			},
			{
				title: "Не техниками и ДЗ едиными.",
				description:
					"Самое важное на встречах — вы и ваш опыт, чтобы вы были услышаны. Техники и упражнения используются только при необходимости и при наличии у вас ресурса. Если у вас есть сильная потребность выговориться, я создаю для этого безопасное и поддерживающее пространство.",
			},
			{
				title: "Опыт работы в IT.",
				description:
					"Я несколько лет работала в IT-сфере, поэтому вам не придётся долго объяснять специфику этой среды — многие её особенности мне хорошо знакомы, и мы можем говорить на понятном и близком вам языке.",
			},
			{
				title: "Профессиональная устойчивость и забота о качестве работы.",
				description:
					"Я регулярно посещаю супервизии, интервизии и балинтовские группы, что помогает мне поддерживать профессиональное качество и экологичность работы. Также я уделяю внимание собственному отдыху и восстановлению, занимаюсь хобби.",
			},
			{
				title: "Партнерская модель взаимодействия.",
				description:
					"Я не занимаю экспертную или директивную позицию. Моя роль — быть рядом с вами со-исследователем вашего внутреннего мира и помогать разбираться в сложных переплетениях мыслей, чувств и жизненных обстоятельств. Я не даю готовых решений и универсальных советов. Мы вместе ищем то, что лучше всего подойдёт именно вам, и разделяем ответственность за процесс и изменения.",
			},
			{
				title: "Использование метафор и образов.",
				description:
					"В работе я иногда использую метафоры и образные сравнения — для некоторых людей это помогает легче говорить о сложных вещах. При этом формат работы всегда подбирается индивидуально: кому-то больше подходят схемы и структуры, кому-то — записи, таблицы, образы, рисунки или истории.",
			},
			{
				title: "На моих встречах можно материться.",
				description:
					"Да, если ситуация вопиющая, я скорее это поощряю. После такого эмоционального высказывания становится полегче. Если для вас ненормативная лексика неприемлема, мы подбираем другие формы выражения эмоций.",
			},
			{
				title: "Приветствую обратную связь от вас.",
				description:
					"Наша работа — совместный процесс. Вы можете делиться своими ощущениями и предложениями не только в конце встречи, но и в любой момент. Если во время разговора или выполнения какого-либо упражнения вам стало некомфортно, вы вправе сказать об этом. Это очень важно для нашего контакта.",
			},
			{
				title: "Гибкость и уважение к индивидуальности.",
				description:
					"Мне не близки провокативные форматы работы, идеи «вторичной выгоды», жёсткая шаблонность и упрощённые объяснения человеческих трудностей. Структура в работе важна, но она не должна разрушать контакт. Работа выстраивается вокруг человека, а не человек подстраивается под метод.",
			},
			{
				title: "Дестигматизация.",
				description:
					"Если в процессе обсуждения затрагиваются диагнозы или ярлыки, которые могут быть для вас неприятными или болезненными, мы вместе обсуждаем, какие формулировки и термины вам комфортнее использовать в нашей совместной работе.",
			},
			{
				title: "Здоровое любопытство и уважение к внутреннему миру.",
				description:
					"Я стараюсь задавать вопросы бережно и тактично. Мой интерес направлен на то, как устроены ваши внутренние процессы — и мне важно, чтобы это исследовательское отношение постепенно появлялось и у вас по отношению к себе.",
			},
			{
				title: "Личная практика и профессиональное развитие.",
				description:
					"Я применяю элементы ACT, практики осознанности и самоподдержки в собственной жизни и, при необходимости, сама обращаюсь за профессиональной психологической поддержкой.",
			},
		],
	},
	en: {
		introParagraphs: [
			"In my work, I draw on ACT methods (an approach focused on acceptance, values, and mindful action even in the presence of difficult emotions), as well as CFT (an approach focused on developing self-compassion and a supportive inner relationship). I also use elements of the solution-focused approach as a way to find ways out of difficult life situations and restore a person's sense of authorship over their own life. At the same time, I hold a humanistic stance: there is fundamentally nothing wrong with you.",
			"Why do I combine several approaches? Because it provides greater flexibility in work and allows looking at complex situations from different angles, noticing more possible support points and options for change. You are at the center of our collaborative work. Whatever concern, difficulty, or life dilemma you bring, I will accompany you in exploring your situation and finding solutions that are right for you. You are not the problem, and you don't exist in a vacuum. I take into account the social context and conditions in which you live, and how they may affect your wellbeing and choices. Together, we will gradually work through this complex tangle of circumstances, experiences, and contradictions. If during our work I realize that my professional experience and counseling format are not suitable for your needs, I will honestly say so and, if necessary, recommend a colleague whose specialization may better match your situation.",
			"I try not to use outdated and stigmatizing terms and regularly update my knowledge to rely on current research and practices in psychological counseling and related disciplines. I am currently undergoing additional professional training, expanding my qualifications in psychological support and counseling. I am also well-versed in the topic of neurodivergence and tailor the format of work to each person's individual characteristics.",
		],
		principlesTitle: "Work principles",
		principles: [
			{
				title: "Confidentiality.",
				description:
					"I maintain the confidentiality of our work. If I bring your case to supervision, it happens without any identifying information and only with your prior consent.",
			},
			{
				title: "Consistency and flexibility.",
				description:
					"In the first few sessions, I help you gather and describe your life story and context (your experience, important events, current situation). At the same time, I am always ready to flexibly adjust the session structure based on your state and needs at any given moment.",
			},
			{
				title: "Individual approach and atmosphere of acceptance.",
				description:
					"I invite you to speak freely about any thoughts and feelings — including fear of being judged, awkwardness, or shame. I hold a humanistic stance: there is fundamentally nothing wrong with you. You may be in pain and struggling right now — and my job is to be alongside you and support you in this process.",
			},
			{
				title: "Session volume by mutual agreement.",
				description:
					"The number of sessions is determined together with you and can change as we work — as many as you specifically need, no more, no less. Depending on your goals, condition, and life situation. I have no goal of keeping you in counseling longer than necessary or, conversely, ending the work before you feel comfortable.",
			},
			{
				title: "Gentleness.",
				description:
					"We won't immediately dive into the most painful topics without a sense of grounding and readiness. In other words, we won't rush into the thick of things unprepared. I try to structure our work so that you have enough safety and resources.",
			},
			{
				title: "Not just techniques and homework.",
				description:
					"The most important thing in our sessions is you and your experience — being heard. Techniques and exercises are used only when necessary and when you have the resources for them. If you have a strong need to talk things through, I create a safe and supportive space for that.",
			},
			{
				title: "IT work experience.",
				description:
					"I worked in the IT field for several years, so you won't need to spend a long time explaining the specifics of that environment — many of its features are well familiar to me, and we can speak a language you understand and relate to.",
			},
			{
				title: "Professional resilience and commitment to quality.",
				description:
					"I regularly attend supervisions, intervisions, and Balint groups, which helps me maintain professional quality and sustainability in my work. I also pay attention to my own rest and recovery and engage in hobbies.",
			},
			{
				title: "Partnership model of interaction.",
				description:
					"I don't take an expert or directive position. My role is to be alongside you as a co-explorer of your inner world and help navigate complex tangles of thoughts, feelings, and life circumstances. I don't offer ready-made solutions or universal advice. Together we search for what works best specifically for you, sharing responsibility for the process and changes.",
			},
			{
				title: "Use of metaphors and imagery.",
				description:
					"In my work, I sometimes use metaphors and figurative comparisons — for some people, this helps make it easier to talk about difficult things. The format of work is always tailored individually: some prefer diagrams and structures, others prefer notes, tables, images, drawings, or stories.",
			},
			{
				title: "Swearing is allowed in my sessions.",
				description:
					"Yes, if the situation calls for it, I rather encourage it. After such an emotional expression, things often feel a bit lighter. If profanity is unacceptable to you, we find other forms of emotional expression.",
			},
			{
				title: "I welcome your feedback.",
				description:
					"Our work is a collaborative process. You can share your feelings and suggestions not only at the end of a session but at any time. If during a conversation or exercise you become uncomfortable, you have the right to say so. This is very important for our connection.",
			},
			{
				title: "Flexibility and respect for individuality.",
				description:
					"I don't subscribe to provocative work formats, ideas of 'secondary gain,' rigid templating, or simplified explanations of human difficulties. Structure in work is important, but it shouldn't destroy the connection. The work is built around the person, not the person adapting to the method.",
			},
			{
				title: "Destigmatization.",
				description:
					"If during discussion, diagnoses or labels come up that may be unpleasant or painful for you, we discuss together which formulations and terms you are more comfortable using in our work.",
			},
			{
				title: "Healthy curiosity and respect for the inner world.",
				description:
					"I try to ask questions gently and tactfully. My interest is directed at how your internal processes work — and it's important to me that this exploratory attitude gradually develops in you toward yourself as well.",
			},
			{
				title: "Personal practice and professional development.",
				description:
					"I apply elements of ACT, mindfulness practices, and self-support in my own life and, when necessary, seek professional psychological support myself.",
			},
		],
	},
};
