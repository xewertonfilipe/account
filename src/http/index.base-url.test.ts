type RequestConfig = {
  headers?: Record<string, string>;
};

const mockCreate = jest.fn();

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    create: mockCreate,
  },
}));

describe("http client baseURL", () => {
  const originalEnvValue = process.env.VITE_API_BASE_URL;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.VITE_API_BASE_URL = originalEnvValue;
    jest.restoreAllMocks();
  });

  it("uses VITE_API_BASE_URL when present", async () => {
    const requestUse = jest.fn();

    process.env.VITE_API_BASE_URL = "https://api.bytebank.test";

    mockCreate.mockReturnValue({
      interceptors: {
        request: {
          use: requestUse,
        },
      },
    });

    await import(".");

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: "https://api.bytebank.test/",
    });
    expect(requestUse).toHaveBeenCalledTimes(1);
  });

  it("falls back to localhost when VITE_API_BASE_URL is missing", async () => {
    const requestUse = jest.fn();

    delete process.env.VITE_API_BASE_URL;

    mockCreate.mockReturnValue({
      interceptors: {
        request: {
          use: requestUse,
        },
      },
    });

    await import(".");

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: "http://localhost:3000/",
    });
    expect(requestUse).toHaveBeenCalledTimes(1);
  });

  it("keeps Authorization header behavior", async () => {
    const requestUse = jest.fn();

    mockCreate.mockReturnValue({
      interceptors: {
        request: {
          use: requestUse,
        },
      },
    });

    jest.spyOn(Storage.prototype, "getItem").mockReturnValue("token-123");

    await import(".");

    const onFulfilled = requestUse.mock.calls[0][0] as (
      config: RequestConfig
    ) => RequestConfig;
    const result = onFulfilled({ headers: {} });

    expect(result.headers).toEqual({ Authorization: "Bearer token-123" });
  });
});
