import assert from 'assert';

const enviornmentArgs = {
	email: process.env.EMAIL!,
	password: process.env.PASSWORD!,
	cookiesPath: process.env.COOKIES_PATH!,
	clickDelay: parseInt(process.env.CLICK_DELAY!),
    port: parseInt(process.env.PORT!),
};

// Ensure all enviornment args are defined
for (const [key, value] of Object.entries(enviornmentArgs)) {
    assert(value, `${key} is not defined (check .env file)`);
}

export default enviornmentArgs;