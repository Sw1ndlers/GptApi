export default async function (actions: any, req: any, res: any) {
    await actions.NewChat();
    res.json({ success: true });
}

