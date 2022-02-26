import config from "./config";

interface AuthResponse {
  root: string;
  nonce: string;
}

function getUrlPathFromRequestInfo(input: RequestInfo) {
  return typeof input === "string" ? input : input.url;
}

function getFullUrl(baseUrl: string, input: RequestInfo, init?: RequestInit) {
  const path = getUrlPathFromRequestInfo(input);

  const url = new URL(`${baseUrl}${path}`);
  const query = new URLSearchParams();
  url.searchParams.forEach((value, key) => query.append(key, value));

  if (
    init &&
    ((typeof input !== "string" && input.method === "GET") ||
      init.method === "GET") &&
    init.body &&
    init.body instanceof URLSearchParams
  ) {
    init.body.forEach((value, key) => query.append(key, value));
    const { body, ...other } = init;
    init = other;
  }

  return `${url.origin}${url.pathname}?${query.toString()}`;
}

function fixInput(input: RequestInfo, init?: RequestInit) {
  const url = getFullUrl(config.apiUrl, input, init);

  if (typeof input === "string") {
    input = url;
  } else {
    input = {
      ...input,
      url,
    };
  }

  return input;
}

function fixInit(input: RequestInfo, init?: RequestInit) {
  if (
    init &&
    ((typeof input !== "string" && input.method === "GET") ||
      init.method === "GET") &&
    init.body &&
    init.body instanceof URLSearchParams
  ) {
    const { body, ...other } = init;
    init = other;
  }

  return init;
}

function createHeadersObject(entries: [string, string][], headers: Headers) {
  const headersObject = new Headers();

  entries.forEach(([key, value]) => headersObject.append(key, value));
  headers.forEach((value, key) => headersObject.append(key, value));

  return headersObject;
}

function injectHeadersIntoRequest(
  headers: Record<string, string>,
  input: RequestInfo,
  init?: RequestInit
): [RequestInfo, RequestInit | undefined] {
  const entries = Object.entries(headers);

  if (input instanceof Request) {
    const headers = createHeadersObject(entries, input.headers);

    input = {
      ...input,
      headers,
    };
  }

  if (init && init.headers) {
    if (init.headers instanceof Headers) {
      const headers = createHeadersObject(entries, init.headers);

      init = {
        ...init,
        headers,
      };
    } else if (Array.isArray(init.headers)) {
      init.headers = [...entries, ...init.headers];
    } else {
      init.headers = {
        ...headers,
        ...init.headers,
      };
    }
  } else if (init) {
    init.headers = headers;
  }

  if (typeof input === "string" && !init) {
    init = {
      headers,
    };
  }

  return [input, init];
}

export default class {
  private nonce: string = "";

  async _fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    input = fixInput(input, init);
    init = fixInit(input, init);

    const res = await fetch(input, init);
    return res;
  }

  async _auth() {
    const headers = {
      "Content-Type": "application/json",
      "X-Secret": config.apiSecret,
    };

    const res = await this._fetch("/security/v1/nonce", { headers });

    const json: AuthResponse = await res.json();

    return json.nonce;
  }

  async _checkAuth() {
    if (this.nonce.length === 0) {
      return false;
    }

    const headers = {
      "Content-Type": "application/json",
      "X-WP-Nonce": this.nonce,
    };

    const res = await this._fetch("/", { headers });

    return res.status === 200;
  }

  async _request(input: RequestInfo, init?: RequestInit) {
    const isAuthenticated = await this._checkAuth();
    if (!isAuthenticated) {
      this.nonce = await this._auth();
    }

    const headers = {
      "Content-Type": "application/json",
      "X-WP-Nonce": this.nonce,
    };
    [input, init] = injectHeadersIntoRequest(headers, input, init);

    return this._fetch(input, init);
  }
}
