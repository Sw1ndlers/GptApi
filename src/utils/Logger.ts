import { ChalkColors } from "./Constants";
import { createLogger, transports, format } from "winston";

import fs from "fs";
import chalk from "chalk";

// Handle logs folder
if (!fs.existsSync("logs")) {
    // Create logs folder
	fs.mkdirSync("logs");
} else {
    // Delete previous logs
	fs.readdirSync("logs").map((child) => {
		fs.unlinkSync(`logs/${child}`)
	});
}

const colorReplace = {
    "[Server]": ChalkColors.Green("[Server]"),
	"[Info]": ChalkColors.Blue("[Info]"),
	"[Warn]": ChalkColors.Yellow("[Warn]"),
	"[Error]": ChalkColors.Red("[Error]"),
}

const fileFormat = format.combine(
	format.timestamp({
		format: "YYYY-MM-DD HH:mm:ss",
	}),
	format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const consoleFormat = format.combine(
	format.colorize({}),
	format.timestamp({
		format: "YYYY-MM-DD HH:mm:ss",
	}),
	format.printf((info) => {
		for (const [key, value] of Object.entries(colorReplace)) {
			info.message = info.message.replace(key, value);
		}

		for (const word of info.message.split(" ")) { // replace all numbers and booleans with purple
			if (!isNaN(word) || word == "true" || word == "false") {
				info.message = info.message.replace(word, ChalkColors.Purple(word));
			}
		}

		return `${ChalkColors.Dim(info.timestamp)} ${info.level}: ${info.message}`;
	})
);

const Logger = createLogger({
	level: "info",
	format: fileFormat,
	transports: [
		new transports.File({ filename: "logs/error.log", level: "error" }),
		new transports.File({ filename: "logs/warn.log", level: "warn" }),
		new transports.File({ filename: "logs/info.log", level: "info" }),
		new transports.File({ filename: "logs/combined.log" }),
		new transports.Console({
			format: consoleFormat,
		}),
	],
});

export default Logger;
