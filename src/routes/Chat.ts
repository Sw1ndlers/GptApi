import Logger from "../utils/Logger";

export default async function (actions: any, req: any, res: any) {
	const message = req.query.message as string;

	if (!message) {
        Logger.error("No message provided to /chat\n");
        Logger.error("Query: " + JSON.stringify(req.query));

		return res.status(400).json({ error: "No message provided" });
	}

    Logger.info(`/chat received message: ${message}\n`)

	const response = await actions.SendMessage(message);
	res.json({ response });
}
