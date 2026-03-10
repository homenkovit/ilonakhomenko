import { CAL_EMBED_SCRIPT_URL, CAL_ORIGIN, CAL_USERNAME } from "../config/cal";

type CalArgs = unknown[];

export interface CalFunction {
	(...args: CalArgs): void;
	q?: unknown[][];
	ns?: Record<string, CalFunction>;
	loaded?: boolean;
}

function enqueueArgs(target: CalFunction, args: CalArgs) {
	target.q?.push(args);
}

function loadCalEmbed() {
	const cal: CalFunction = function Cal(...args: CalArgs) {
		if (!cal.loaded) {
			cal.ns = {};
			cal.q ||= [];

			const script = document.createElement("script");
			script.src = CAL_EMBED_SCRIPT_URL;
			script.onerror = () => {
				cal.loaded = false;
				window.Cal = undefined;
				script.remove();
				window.dispatchEvent(new Event("cal-embed-error"));
			};
			document.head.appendChild(script);

			cal.loaded = true;
		}

		const [mode, namespace] = args;

		if (mode === "init") {
			const api: CalFunction = (...apiArgs: CalArgs) => {
				enqueueArgs(api, apiArgs);
			};

			api.q ||= [];

			if (typeof namespace === "string") {
				cal.ns![namespace] ||= api;
				enqueueArgs(cal.ns![namespace], args);
				enqueueArgs(cal, ["initNamespace", namespace]);
			} else {
				enqueueArgs(cal, args);
			}

			return;
		}

		enqueueArgs(cal, args);
	};

	window.Cal ||= cal;
}

export function initCalInlineWidget(elementOrSelector: string) {
	loadCalEmbed();

	window.Cal?.("init", { origin: CAL_ORIGIN });
	window.Cal?.("inline", {
		calLink: CAL_USERNAME,
		elementOrSelector,
		config: { layout: "month_view", theme: "auto" },
	});
	window.Cal?.("ui", {
		cssVarsPerTheme: {
			light: {
				"cal-bg": "#ffffff",
				"cal-bg-subtle": "#f5f0f8",
				"cal-bg-muted": "#ede8f0",
				"cal-bg-emphasis": "#ddc0e3",
				"cal-text-emphasis": "#0d0911",
				"cal-text": "#3a2c44",
				"cal-text-subtle": "#8169ab",
				"cal-border": "#a393bf",
				"cal-border-subtle": "#ddc0e3",
				"cal-brand": "#3a2c44",
				"cal-brand-emphasis": "#0d0911",
				"cal-brand-text": "#ffffff",
			},
			dark: {
				"cal-bg": "#1a1520",
				"cal-bg-subtle": "#1e1828",
				"cal-bg-muted": "#221b2c",
				"cal-bg-emphasis": "#2a2235",
				"cal-text-emphasis": "#ede8f0",
				"cal-text": "#c4a8d8",
				"cal-text-subtle": "#a88ec5",
				"cal-border": "#5a4870",
				"cal-border-subtle": "#2a2235",
				"cal-brand": "#c4a8d8",
				"cal-brand-emphasis": "#ede8f0",
				"cal-brand-text": "#1a1520",
			},
		},
	});
}
