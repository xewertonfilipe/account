import { StyledBalance } from "./styles";
import { IconEye } from "../Icons";
import type { AccountStatus } from "../../features/account/account";
import { LoadingBalance } from "./LoadingBalance";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

interface BalanceProps {
  value: number;
  status: AccountStatus;
}

export const Balance = ({ value, status }: BalanceProps) => {
  return (
    <StyledBalance>
      <h3>
        Saldo
        <IconEye />
      </h3>
      <p>Conta Corrente</p>
      {status === "loading" ? (
        <LoadingBalance />
      ) : (
        <strong>{formatter.format(value)}</strong>
      )}
    </StyledBalance>
  );
};
