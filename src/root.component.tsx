import { useEffect, useState } from "react";

import { Account } from "./components/Account";
import http from "./http";
import type { AccountBalanceResponse } from "./interfaces";

const TRANSACTION_CREATED_EVENT = "bank:transaction:created";

export default function Root() {
  const [balance, setBalance] = useState<number>(0);

  const getBalance = (): void => {
    http
      .get<AccountBalanceResponse>("/transactions/balance")
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch(() => {
        setBalance(0);
      });
  };

  useEffect(() => {
    const handleTransactionCreated = () => {
      getBalance();
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
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Account balanceValue={balance} />
    </>
  );
}
