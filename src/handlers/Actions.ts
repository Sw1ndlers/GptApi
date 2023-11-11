import assert from "assert";
import PlaywrightHandler from "./Playwright";

import { Locator, Page } from "playwright";

export default class ActionsHandler {
	playWrightHandler: PlaywrightHandler;

	page: Page;
	inputBox: Locator | undefined;
	sendButton: Locator | undefined;

	clickDelay: number;

	constructor(playWrightHandler: PlaywrightHandler, clickDelay: number) {
		this.playWrightHandler = playWrightHandler;
		this.clickDelay = clickDelay;

		assert(
			this.playWrightHandler.page,
			"PlaywrightHandler page is not defined (did you run PlaywrightHandler.Launch()?)"
		);

		this.page = playWrightHandler.page!;
	}

	async Login(email: string, password: string) {
		const handler = this.playWrightHandler;

		await handler.Goto("https://chat.openai.com/auth/login");
		const page = handler.page!;

		// Move to login page
		await page.getByTestId("login-button").click();

		// Get continue button
		let continueButton = await page.getByRole("button", {
			name: "Continue",
			exact: true,
		});

		// Enter email
		await page.locator("input[id='username']").fill(email);
		continueButton.click();

		handler.waitForLoad();

		await page.locator("input[id='password']").fill(password);
		continueButton.click({
			delay: this.clickDelay,
		});

		handler.waitForLoad();
	}

	async DismissPopup() {
		await this.page.getByText("Okay, let’s go").click({
			delay: this.clickDelay,
		});
	}

	async GetUserMessagesAmt() {
		const userMessages = await this.page.$$(
			"[data-message-author-role='user']"
		);
		return userMessages.length;
	}

	async GetResponses() {
		let userMessagesAmt = await this.GetUserMessagesAmt();
		let responses: string[] = [];

		while (true) {
			const responseElements = await this.page.$$(
				".markdown.w-full:not(.result-streaming)"
			);

			responseElements.forEach(async (response) => {
				const text = await response.innerText();
				responses.push(text);
			});

			if (responses.length == userMessagesAmt) {
				break;
			}

			responses = []; // Reset responses to ensure we don't get duplicates
		}

		return responses;
	}

	private async getMessageElements() {
		if (this.inputBox == undefined || this.sendButton == undefined) {
			const page = this.page;

			this.inputBox = page.getByPlaceholder("Send a message");
			this.sendButton = page.getByTestId("send-button");
		}

		return { inputBox: this.inputBox, sendButton: this.sendButton };
	}

	// private async getResponseCode(): Promise<number> {
	//     let responseCode: number;

	//     await this.page.route("*/backend-api/conversation", async route => {
	//         const response = await route.fetch();
	//         responseCode = response.status();
	//     })

	//     return responseCode!;
	// }

	async SendMessage(message: string): Promise<string> {
		const { inputBox, sendButton } = await this.getMessageElements();

		await inputBox.fill(message);
		await sendButton.click();

		// const responseCode = await this.getResponseCode();
		// if (responseCode != 200) {
		//     throw new Error(`Response code is ${responseCode}`);
		// }

		const responses = await this.GetResponses();
		return responses[responses.length - 1]; // Return last response
	}
}
