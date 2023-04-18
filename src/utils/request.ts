const { VITE_API_URL } = import.meta.env;

export function makeURLString<T extends Record<string, string | number>>(
	tail: string,
	data: {
		[K in keyof T]: T[K];
	},
) {
	const url = new URL(`${VITE_API_URL}${tail}`);

	Object.keys(data).forEach((key) => {
		if (data[key]) {
			url.searchParams.set(key, `${data[key]}`);
		}
	});

	return url;
}

async function apiRequest(input: RequestInfo | URL, init?: Omit<RequestInit, 'body'> & { body?: object | BodyInit | null }): Promise<Response>;

async function apiRequest(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;

async function apiRequest(input: any, init: any = {}) {
	let requestBody = init.body;
	const hasObjectInBody = typeof requestBody === 'object';
	if (hasObjectInBody) requestBody = JSON.stringify(requestBody);
	const preFetched = fetch(typeof input === 'string' ? `${VITE_API_URL}${input}` : input, {
		...init,
		headers: {
			...(hasObjectInBody ? { 'Content-Type': 'application/json' } : {}),
			...(init.headers || {}),
		},
		...(hasObjectInBody ? { body: requestBody } : {}),
	});

	return preFetched;
}

export default apiRequest;
