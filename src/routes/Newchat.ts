import Logger from "../utils/Logger";

export default async function (actions: any, req: any, res: any) {
    await actions.NewChat();

    Logger.info("New chat created\n");

    res.json({ success: true });
}

