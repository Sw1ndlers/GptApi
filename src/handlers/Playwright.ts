import { Browser, BrowserContext, Page, chromium } from "playwright";

export default class PlaywrightHandler {
	browser: Browser | undefined;
	context: BrowserContext | undefined;
	page: Page | undefined;

	async Launch(headless: boolean = true) {
		const browser = await chromium.launch({
			headless: headless,
		});
		const context = await browser.newContext();
		const page = await context.newPage();

		this.browser = browser;
		this.context = context;
		this.page = page;

		return { browser, context, page };
	}

	async waitForLoad() {
		await this.page?.waitForLoadState("networkidle");
	}

	async Goto(url: string) {
		this.page?.goto(url);
		await this.waitForLoad();
	}

	async Close() {
		await this.context?.close();
		await this.browser?.close();
	}
}
