import type { TestData } from "../scripts/test-runner";
import type { CalFunction } from "../scripts/cal-embed";

declare global {
	interface Window {
		__TEST_DATA__: TestData;
		Cal?: CalFunction;
	}
}
