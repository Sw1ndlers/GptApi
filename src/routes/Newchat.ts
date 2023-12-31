import ActionsHandler from "../handlers/Actions";
import { Request, Response } from "express";
import Logger from "../utils/Logger";

export default async function (
	actions: ActionsHandler,
	_req: Request,
	res: Response
) {
	await actions.NewChat();

	Logger.info("New chat created\n");
	res.json({ success: true });
}
