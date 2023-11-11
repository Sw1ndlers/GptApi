import "dotenv/config";

import PlaywrightHandler from "@handlers/Playwright";
import ActionsHandler from "@handlers/Actions";
import CookieHandler from "@handlers/Cookies";

import Constants from "@utils/constants";

async function startChat(
	cookieHandler: CookieHandler,
	playWrightHandler: PlaywrightHandler,
	actions: ActionsHandler
) {
	const context = playWrightHandler.context!;

	if (cookieHandler.CacheExists()) {
		const cookies = await cookieHandler.GetCookies();
		await context.addCookies(cookies);

		await playWrightHandler.Goto("https://chat.openai.com/"); // Go to chat page
	} else {
		await actions.Login(Constants.email, Constants.password); // Login to OpenAI
		cookieHandler.CacheCookies(await context.cookies()); // Cache cookies
	}

	await actions.DismissPopup();
}

(async () => {
	const handler = new PlaywrightHandler();
	await handler.Launch();

	const actions = new ActionsHandler(handler, Constants.clickDelay);
	const cookieHandler = new CookieHandler(Constants.cookiesPath);

	await startChat(cookieHandler, handler, actions);
})();
