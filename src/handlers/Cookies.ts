import fs from "fs";
import { Cookie } from "playwright";

export default class CookieHandler {
	filePath: string;

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	CacheExists(): boolean {
		return fs.existsSync(this.filePath);
	}

	CacheCookies(cookies: Cookie[]) {
		fs.writeFileSync(this.filePath, JSON.stringify(cookies));
	}

	GetCookies(): Promise<Cookie[]> {
		const cookies = fs.readFileSync(this.filePath);
		return JSON.parse(cookies.toString());
	}
    
}
