export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiEnvelope<T> = {
  success: true;
  message?: string;
  data: T;
  pagination?: PaginationMeta;
};

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getBaseUrl() {
  const configuredUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  const baseUrl = configuredUrl?.replace(/\/+$/, "");
  const authority = baseUrl?.match(/^https?:\/\/([^/?#]+)/i)?.[1];

  if (!baseUrl || !authority || authority.includes("@")) {
    throw new ApiError(
      "Configure EXPO_PUBLIC_API_BASE_URL with a credential-free HTTP(S) URL.",
    );
  }

  return baseUrl;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getResponseMessage(payload: unknown, fallback: string) {
  if (isRecord(payload) && typeof payload.message === "string") {
    return payload.message;
  }
  return fallback;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiEnvelope<T>> {
  const baseUrl = getBaseUrl();
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, { ...options, headers });
  } catch (error) {
    if (options.signal?.aborted) {
      throw error;
    }
    throw new ApiError(
      "Unable to reach the ShikshaSathi API. Make sure your phone and Mac are on the same Wi-Fi, the backend is running, and EXPO_PUBLIC_API_BASE_URL uses your Mac's LAN IP instead of localhost.",
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError(
      "The server returned an unreadable response.",
      response.status,
    );
  }

  if (!response.ok) {
    throw new ApiError(
      getResponseMessage(payload, "The request could not be completed."),
      response.status,
    );
  }

  if (
    !isRecord(payload) ||
    payload.success !== true ||
    !Object.hasOwn(payload, "data")
  ) {
    throw new ApiError(
      "The server returned an unexpected response.",
      response.status,
    );
  }

  return payload as ApiEnvelope<T>;
}
