import type { IBalance } from "../../interfaces";
import type { AccountStatus } from "../../features/account/account";
import { Balance } from "./Balance";
import { BalanceWrapper, Card, DateWrapper, Heading } from "./styles";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

interface AccountProps extends IBalance {
  status: AccountStatus;
}

export const Account = ({ balanceValue, status }: AccountProps) => {
  return (
    <Card>
      <div>
        <Heading>Olá! :)</Heading>
        <DateWrapper>
          {new Date().toLocaleDateString("pt-BR", options)}
        </DateWrapper>
      </div>
      <BalanceWrapper>
        <Balance value={balanceValue} status={status} />
      </BalanceWrapper>
    </Card>
  );
};
