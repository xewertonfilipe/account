import http from "../../http";
import reducer, {
  fetchBalance,
  selectAccountError,
  selectAccountStatus,
  selectBalance,
} from "./account";

jest.mock("../../http", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("fetchBalance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns fulfilled action with balance payload", async () => {
    const mockedHttp = http as unknown as { get: jest.Mock };

    mockedHttp.get.mockResolvedValue({
      data: { balance: 250.5 },
    });

    const action = await fetchBalance()(jest.fn(), jest.fn(), undefined);

    expect(mockedHttp.get).toHaveBeenCalledWith("/transactions/balance");
    expect(action.type).toBe("account/fetchBalance/fulfilled");
    expect(action.payload).toEqual({ balance: 250.5 });
  });

  it("returns rejected action with friendly message on API failure", async () => {
    const mockedHttp = http as unknown as { get: jest.Mock };

    mockedHttp.get.mockRejectedValue(new Error("network"));

    const action = await fetchBalance()(jest.fn(), jest.fn(), undefined);

    expect(action.type).toBe("account/fetchBalance/rejected");
    expect(action.payload).toBe("Nao foi possivel carregar o saldo.");
  });
});

describe("account reducer and selectors", () => {
  it("updates state for pending, fulfilled and rejected", () => {
    const pendingState = reducer(undefined, fetchBalance.pending("req-1"));

    expect(pendingState.status).toBe("loading");
    expect(pendingState.error).toBeNull();

    const fulfilledState = reducer(
      pendingState,
      fetchBalance.fulfilled({ balance: 500 }, "req-1", undefined)
    );

    expect(fulfilledState.status).toBe("succeeded");
    expect(fulfilledState.balance).toBe(500);

    const rejectedState = reducer(
      fulfilledState,
      fetchBalance.rejected(
        new Error("network"),
        "req-2",
        undefined,
        "Nao foi possivel carregar o saldo."
      )
    );

    expect(rejectedState.status).toBe("failed");
    expect(rejectedState.balance).toBe(0);
    expect(rejectedState.error).toBe("Nao foi possivel carregar o saldo.");
  });

  it("uses default error message when rejected action has no payload", () => {
    const state = reducer(
      undefined,
      fetchBalance.rejected(new Error("network"), "req-3", undefined)
    );

    expect(state.status).toBe("failed");
    expect(state.balance).toBe(0);
    expect(state.error).toBe("Nao foi possivel carregar o saldo.");
  });

  it("reads balance, status and error selectors", () => {
    const state = {
      account: {
        balance: 1200,
        status: "succeeded" as const,
        error: null,
      },
    };

    expect(selectBalance(state)).toBe(1200);
    expect(selectAccountStatus(state)).toBe("succeeded");
    expect(selectAccountError(state)).toBeNull();
  });
});
