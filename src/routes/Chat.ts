export default async function (actions: any, req: any, res: any) {
    const message = req.query.message as string;

    if (!message) {
        return res.status(400).json({ error: "No message provided" });
    }

    const response = await actions.SendMessage(message);

    res.json({ response });
}

