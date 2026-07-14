import { useEffect, useState } from "react";

import { Account } from "./components/Account";
import http from "./http";

const TRANSACTION_CREATED_EVENT = "bank:transaction:created";

export default function Root(props) {
  const getBalance = () => {
    http
      .get("/transactions/balance")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(0);
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

  const [user, setUser] = useState(0);

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Account balanceValue={user?.balance ?? 0} />
    </>
  );
}
