import type { IBalance } from "../../interfaces";
import { Balance } from "./Balance";
import { BalanceWrapper, Card, DateWrapper, Heading } from "./styles";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

export const Account = ({ balanceValue }: IBalance) => {
  return (
    <Card>
      <div>
        <Heading>Olá! :)</Heading>
        <DateWrapper>
          {new Date().toLocaleDateString("pt-BR", options)}
        </DateWrapper>
      </div>
      <BalanceWrapper>
        <Balance value={balanceValue} />
      </BalanceWrapper>
    </Card>
  );
};
