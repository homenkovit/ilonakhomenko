import type { TestData } from "./test";

declare global {
    interface Window {
        __TEST_DATA__: TestData;
    }
}