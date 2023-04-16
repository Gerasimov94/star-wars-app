const { VITE_API_URL } = import.meta.env;

async function apiRequest(
	input: RequestInfo,
	init?: Omit<RequestInit, 'body'> & { body?: object | BodyInit | null },
): Promise<Response>;

async function apiRequest(input: RequestInfo, init?: RequestInit): Promise<Response>;

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
