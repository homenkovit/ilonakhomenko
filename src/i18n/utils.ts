import { ui } from "./ui";

export type Lang = "ru" | "en";

export const defaultLang: Lang = "ru";
export const locales: Lang[] = ["ru", "en"];

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split("/");
	if (maybeLang === "en") return "en";
	return "ru";
}

type TranslationKey = keyof (typeof ui)["ru"];

export function useTranslations(lang: Lang) {
	return function t(key: TranslationKey): string {
		const value = ui[lang][key];
		if (value === undefined && import.meta.env.DEV) {
			console.warn(`[i18n] Missing "${lang}" translation for key "${key}"`);
		}
		return value ?? ui[defaultLang][key];
	};
}

export function getLocalizedPath(pathname: string, targetLang: Lang): string {
	const clean = pathname.replace(/\/$/, "") || "/";

	const stripped = clean.startsWith("/en/") ? clean.slice(3) : clean === "/en" ? "/" : clean;

	if (targetLang === "ru") return stripped || "/";
	return `/en${stripped}`;
}

type LocaleParams = { locale: "en" | undefined };
type LocaleProps = { lang: Lang };
type GetLocaleStaticPathsReturn = Array<{ params: LocaleParams; props: LocaleProps }>;

export function getLocaleStaticPaths(): GetLocaleStaticPathsReturn {
	return [
		{
			params: { locale: undefined },
			props: { lang: "ru" },
		},
		{
			params: { locale: "en" },
			props: { lang: "en" },
		},
	];
}
