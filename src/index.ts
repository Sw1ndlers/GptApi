import "dotenv/config";
import express from "express";

import PlaywrightHandler from "./handlers/Playwright";
import ActionsHandler from "./handlers/Actions";
import CookieHandler from "./handlers/Cookies";

import Constants from "./utils/Constants";

// -- Constants

const app = express();

// -- Init

async function startChat(
	cookieHandler: CookieHandler,
	playWrightHandler: PlaywrightHandler,
	actions: ActionsHandler
) {
	const context = playWrightHandler.context!;
	const cookiesExist = cookieHandler.CacheExists();

	if (cookiesExist) {
		const cookies = await cookieHandler.GetCookies();
		await context.addCookies(cookies);

		await playWrightHandler.Goto("https://chat.openai.com/"); // Go to chat page
	} else {
		await actions.Login(Constants.email, Constants.password); // Login to OpenAI
	}

	await actions.DismissPopup();

	if (!cookiesExist) {
		cookieHandler.CacheCookies(await context.cookies()); // Cache cookies
	}
}

// Login, Cache Cookies, Create Routes
async function initialize() {
	const handler = new PlaywrightHandler();
	await handler.Launch();

	const actions = new ActionsHandler(handler, Constants.clickDelay);
	const cookieHandler = new CookieHandler(Constants.cookiesPath);

	await startChat(cookieHandler, handler, actions);

	const routes = {
		chat: (await import("./routes/Chat")).default,
		newchat: (await import("./routes/Newchat")).default,
	};

	return {
		actions,
		routes,
	};
}

// Start Server
async function main() {
	const { actions, routes } = await initialize();

	app.get("/chat", (req, res) => routes.chat(actions, req, res));
	app.get("/newchat", (req, res) => routes.newchat(actions, req, res));

	app.listen(Constants.port, () => {
		console.log(`Server is listening on port ${Constants.port}`);
	});
}


main();