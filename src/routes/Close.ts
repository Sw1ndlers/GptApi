import PlaywrightHandler from "../handlers/Playwright";
import { Request, Response } from "express";
import Logger from "../utils/Logger";

export default async function (
	playwrightHandler: PlaywrightHandler,
	_req: Request,
	res: Response
) {
	await playwrightHandler.Close();

	Logger.info("Browser closed\n");
	res.json({ success: true });
}
