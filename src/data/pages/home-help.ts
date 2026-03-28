import type { Lang } from "../../i18n/utils";

interface HelpTopic {
	title: string;
	items: string[];
}

interface HomeHelpContent {
	topics: HelpTopic[];
	disclaimer: string;
}

export const homeHelpContent: Record<Lang, HomeHelpContent> = {
	ru: {
		topics: [
			{
				title: "Нейроотличия (РАС, СДВГ, высокая чувствительность)",
				items: [
					"Я работаю с запросами, связанными с нейроотличиями и особенностями восприятия и переработки информации.",
					"Вы можете обратиться независимо от того, есть ли у вас официальный диагноз или вы только исследуете свои особенности.",
					"Бережное обсуждение и валидизация вашего опыта.",
					"Поддержка в развитии навыков саморегуляции.",
					"Поиск способов подстройки среды и образа жизни под ваши индивидуальные особенности.",
					"Самоисследование и подбор поддерживающих практик, которые подходят именно вам.",
					"Профилактика эмоционального и профессионального выгорания.",
				],
			},
			{
				title: "Эмиграция и жизнь в другой стране",
				items: [
					"Снижение самооценки и изменение самоощущения после потери прежнего статуса.",
					"Потеря привычных социальных связей, чувство одиночества и непонимания.",
					"Возвращение в страну и повторная адаптация.",
					"Тоска по дому.",
					"Поиск опоры и способов поддерживать себя в процессе обустройства жизни в новой стране.",
					"Разногласия с близкими, в том числе по политическим взглядам.",
				],
			},
			{
				title: "Неуверенность в себе и самокритика",
				items: [
					"Неуверенность в своих решениях и действиях.",
					"Постоянные сомнения и самокопание.",
					"Поиск внутренних опор и понимания, на что можно опираться в себе.",
					"Трудности с принятием решений и откладывание важных шагов.",
					'Самокритика или радио в голове "Закритикуй себя полностью". Работа с внутренним критиком: как снизить его влияние и научиться поддерживать себя.',
				],
			},
			{
				title: "Тревога, подавленность, страхи",
				items: [
					"Тревога в широком смысле, в том числе страх не справиться.",
					"Социальная тревожность.",
					"Повышенная тревожность как личностная особенность.",
					"Состояния усталости, эмоционального истощения и снижения мотивации.",
					"По желанию мы можем использовать опросники и шкалы самонаблюдения, чтобы отслеживать ваше состояние и динамику в процессе нашей работы.",
				],
			},
			{
				title: "Экзистенциальные вопросы и поиск смыслов",
				items: [
					"Если вы чувствуете растерянность, не понимаете, в каком направлении двигаться, чем хотите заниматься и куда идти дальше, мы можем вместе бережно исследовать эти вопросы.",
				],
			},
			{
				title: "Трудности в отношениях",
				items: [
					"Ощущение, что вас не понимают или вы не понимаете партнёра.",
					"Сложности в близости, границах и коммуникации.",
					"Вопросы, связанные с сексуальностью и отношениями.",
					"Трудности в том, чтобы говорить о своих желаниях и потребностях.",
					"Повторяющиеся сложности в построении отношений.",
					"Страхи и неуверенность в общении и знакомстве с новыми людьми.",
				],
			},
			{
				title: "Горевание и утрата",
				items: [
					"Потеря близкого человека.",
					"Расставание или развод.",
					"Потеря значимых отношений.",
					"Психологическая поддержка и сопровождение в период проживания утраты.",
				],
			},
			{
				title: "Другая тема",
				items: [
					"Если у вас есть сомнения, работаю ли я с тем или иным запросом, вы можете написать мне в личные сообщения в телеграме, на почту или уточнить это на первой консультации.",
				],
			},
			{
				title: "С какими запросами я не работаю",
				items: [
					"Не беру в работу запросы, которые предполагают специализированную клиническую или медицинскую помощь.",
					"Острые кризисные и суицидоопасные состояния.",
					"Обсессивно-компульсивные проявления (ОКР).",
					"Расстройства пищевого поведения (РПП).",
					"Не работаю с детьми и подростками до 18 лет и не веду парное консультирование.",
				],
			},
			{
				title: "Что еще важно",
				items: [
					"Я работаю в формате психологического консультирования и поддержки.",
					"Я не ставлю диагнозов и не назначаю медикаменты. Если вы проходите лечение и замечаете изменения в самочувствии или эмоциональном состоянии, важно обсуждать эти вопросы с лечащим врачом или другим профильным специалистом.",
					"В своей работе я не использую эзотерические или оккультные практики.",
					"Если у вас есть выраженные телесные симптомы или жалобы на здоровье, важно обращаться к врачу и не заменять этим консультации у специалистов.",
					"Если вы замечаете, что ваше состояние ухудшается или становится трудно справляться самостоятельно, важно своевременно обращаться за дополнительной профессиональной помощью.",
				],
			},
		],
		disclaimer:
			"*Услуги носят консультативный и поддерживающий характер и не являются медицинской или психотерапевтической помощью.",
	},
	en: {
		topics: [
			{
				title: "Neurodivergence (ASD, ADHD, high sensitivity)",
				items: [
					"I work with concerns related to neurodivergence and differences in perception and information processing.",
					"You can reach out regardless of whether you have an official diagnosis or are just exploring your traits.",
					"Gentle discussion and validation of your experience.",
					"Support in developing self-regulation skills.",
					"Finding ways to adapt your environment and lifestyle to your individual characteristics.",
					"Self-exploration and selecting supportive practices that feels right for you.",
					"Prevention of emotional and professional burnout.",
				],
			},
			{
				title: "Emigration and life in another country",
				items: [
					"Low self-esteem and changes in self-perception after losing previous status.",
					"Loss of familiar social connections, feelings of loneliness and being misunderstood.",
					"Returning to your home country and readjusting.",
					"Homesickness.",
					"Finding support and ways to sustain yourself while building a life in a new country.",
					"Disagreements with loved ones, including over political views.",
				],
			},
			{
				title: "Self-doubt and self-criticism",
				items: [
					"Uncertainty about your decisions and actions.",
					"Constant doubts and overthinking.",
					"Finding inner support and understanding what you can rely on within yourself.",
					"Difficulty making decisions and postponing important steps.",
					"Self-criticism or that inner voice that constantly tears you down. Working with the inner critic: how to reduce its influence and learn to support yourself.",
				],
			},
			{
				title: "Anxiety, low mood, fears",
				items: [
					"Anxiety in a broad sense, including fear of not coping.",
					"Social anxiety.",
					"High anxiety as a personality trait.",
					"States of fatigue, emotional exhaustion, and decreased motivation.",
					"If desired, we can use questionnaires and self-monitoring scales to track your condition and progress during our work.",
				],
			},
			{
				title: "Existential questions",
				items: [
					"If you're feeling lost, unsure of which direction to take, what you want to do, or what to do next, we can gently work through these questions together.",
				],
			},
			{
				title: "Relationship difficulties",
				items: [
					"Feeling misunderstood or not understanding your partner.",
					"Difficulties with intimacy, boundaries, and communication.",
					"Questions related to sexuality and relationships.",
					"Difficulty expressing your desires and needs.",
					"Recurring difficulties in building relationships.",
					"Fears and insecurity in communication and meeting new people.",
				],
			},
			{
				title: "Grief and loss",
				items: [
					"Loss of a loved one.",
					"Breakup or divorce.",
					"Loss of significant relationships.",
					"Psychological support during the grieving process.",
				],
			},
			{
				title: "Other topics",
				items: [
					"If you're not sure whether I handle a specific issue, you can message me on Telegram/whatsApp, send me an email, or ask during your first consultation.",
				],
			},
			{
				title: "What I don't work with",
				items: [
					"I do not take on cases that require specialized clinical or medical care.",
					"Acute crisis and suicidal states.",
					"Obsessive-compulsive manifestations (OCD).",
					"Eating disorders.",
					"I do not work with children and adolescents under 18, and I do not provide couples counseling.",
				],
			},
			{
				title: "What else is important",
				items: [
					"I work in the field of psychological counseling and support.",
					"I do not diagnose medical conditions or prescribe medication. If you are undergoing treatment and notice changes in how you feel or in your emotional state, it is important to discuss this with your doctor or another relevant specialist.",
					"I do not use esoteric or occult practices in my work.",
					"If you are experiencing severe physical symptoms or health issues, it is important to see a doctor and not to substitute professional medical advice with psychological counseling.",
					"If you notice that your condition is getting worse or you’re finding it hard to cope on your own, it’s important to seek additional professional help as soon as possible.",
				],
			},
		],
		disclaimer:
			"*Services are consultative and supportive in nature and do not constitute medical or psychotherapeutic care.",
	},
};
