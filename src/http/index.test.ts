import type { InternalAxiosRequestConfig } from "axios";

import http from ".";

const getRequestInterceptorHandlers = () => {
  const manager = http.interceptors.request as unknown as {
    handlers: Array<{
      fulfilled: (
        config: InternalAxiosRequestConfig
      ) => InternalAxiosRequestConfig;
      rejected: (error: unknown) => Promise<unknown>;
    }>;
  };

  const handlers = manager.handlers.filter(Boolean);
  return handlers[handlers.length - 1];
};

describe("http request interceptor", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("adds Authorization header when token exists", () => {
    sessionStorage.setItem("token", "token-123");

    const interceptor = getRequestInterceptorHandlers();
    const config = {
      headers: {},
    } as unknown as InternalAxiosRequestConfig;

    const nextConfig = interceptor.fulfilled(config);

    expect(nextConfig.headers["Authorization"]).toBe("Bearer token-123");
  });

  it("does not add Authorization header when token does not exist", () => {
    const interceptor = getRequestInterceptorHandlers();
    const config = {
      headers: {},
    } as unknown as InternalAxiosRequestConfig;

    const nextConfig = interceptor.fulfilled(config);

    expect(nextConfig.headers["Authorization"]).toBeUndefined();
  });

  it("rejects when request interceptor fails", async () => {
    const interceptor = getRequestInterceptorHandlers();
    const error = new Error("interceptor failure");

    await expect(interceptor.rejected(error)).rejects.toBe(error);
  });
});
