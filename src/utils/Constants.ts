import assert from 'assert';

const constants = {
	email: process.env.EMAIL!,
	password: process.env.PASSWORD!,
	cookiesPath: process.env.COOKIES_PATH!,
	clickDelay: parseInt(process.env.CLICK_DELAY!),
    port: parseInt(process.env.PORT!),
};

// Ensure all constants are defined
for (const [key, value] of Object.entries(constants)) {
    assert(value, `${key} is not defined (check .env file)`);
}

export default constants;