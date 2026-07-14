import { useEffect } from "react";
import { Provider } from "react-redux";

import { Account } from "./components/Account";
import { fetchBalance, selectBalance } from "./features/account/account";
import store from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const TRANSACTION_CREATED_EVENT = "bank:transaction:created";

function AccountApp() {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectBalance);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    const handleTransactionCreated = () => {
      dispatch(fetchBalance());
    };

    document.addEventListener(
      TRANSACTION_CREATED_EVENT,
      handleTransactionCreated
    );

    return () => {
      document.removeEventListener(
        TRANSACTION_CREATED_EVENT,
        handleTransactionCreated
      );
    };
  }, [dispatch]);

  return (
    <>
      <Account balanceValue={balance} />
    </>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <AccountApp />
    </Provider>
  );
}
