export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export interface RequestOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(options?: ApiClientOptions) {
    this.baseUrl = options?.baseUrl ?? "";
    this.defaultHeaders = options?.headers ?? {};
  }

  private async request<T>(
    url: string,
    method: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...options?.headers,
    };

    if (body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(this.baseUrl + url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: options?.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    return response.json() as Promise<T>;
  }

  get<T>(url: string, options?: RequestOptions) {
    return this.request<T>(url, "GET", undefined, options);
  }

  post<T>(url: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(url, "POST", body, options);
  }
}
