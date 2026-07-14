import { fetchBalance } from "../features/account/account";

const getFreshStore = async () => {
  jest.resetModules();
  const module = await import(".");
  return module.default;
};

describe("store", () => {
  it("starts with expected initial state", async () => {
    const store = await getFreshStore();
    const state = store.getState();

    expect(Object.keys(state)).toEqual(["account"]);
    expect(state.account.balance).toBe(0);
    expect(state.account.status).toBe("idle");
    expect(state.account.error).toBeNull();
  });

  it("updates account state for pending, fulfilled and rejected", async () => {
    const store = await getFreshStore();

    store.dispatch(fetchBalance.pending("req-1", undefined));
    expect(store.getState().account.status).toBe("loading");
    expect(store.getState().account.error).toBeNull();

    store.dispatch(
      fetchBalance.fulfilled({ balance: 350 }, "req-1", undefined)
    );
    expect(store.getState().account.status).toBe("succeeded");
    expect(store.getState().account.balance).toBe(350);

    store.dispatch(
      fetchBalance.rejected(
        new Error("network"),
        "req-2",
        undefined,
        "Nao foi possivel carregar o saldo."
      )
    );
    expect(store.getState().account.status).toBe("failed");
    expect(store.getState().account.balance).toBe(0);
    expect(store.getState().account.error).toBe(
      "Nao foi possivel carregar o saldo."
    );
  });
});
