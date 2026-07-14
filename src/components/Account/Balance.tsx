import { StyledBalance } from "./styles";
import { IconEye } from "../Icons";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

interface BalanceProps {
  value: number;
}

export const Balance = ({ value }: BalanceProps) => {
  return (
    <StyledBalance>
      <h3>
        Saldo
        <IconEye />
      </h3>
      <p>Conta Corrente</p>
      <strong>{formatter.format(value)}</strong>
    </StyledBalance>
  );
};
