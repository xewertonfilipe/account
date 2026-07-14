import { useEffect, useState } from "react";

import { Account } from "./components/Account";
import http from "./http";

export default function Root(props) {
  const [user, setUser] = useState(0);

  useEffect(() => {
    getBalance();
  }, []);

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
  return (
    <>
      <Account balanceValue={user?.balance ?? 0} />
    </>
  );
}
