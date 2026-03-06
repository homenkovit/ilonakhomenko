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
		config: { layout: "month_view", theme: "light" },
	});
}
