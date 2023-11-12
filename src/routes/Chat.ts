import ActionsHandler from "../handlers/Actions";
import { Request, Response } from "express";
import Logger from "../utils/Logger";

export default async function (
	actions: ActionsHandler,
	req: Request,
	res: Response
) {
	const message = req.query.message as string;

	if (!message) {
		Logger.error("No message provided to /chat");
		Logger.error("Query: " + JSON.stringify(req.query) + "\n");

		return res.status(400).json({ error: "No message provided" });
	}

	Logger.info(`/chat received message: ${message}\n`);

	const response = await actions.SendMessage(message);
	res.json({ response });
}
