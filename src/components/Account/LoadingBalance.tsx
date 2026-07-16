import { LoadingBalanceContainer, LoadingLine, LoadingValue } from "./styles";

export const LoadingBalance = () => {
  return (
    <LoadingBalanceContainer role="status" aria-live="polite">
      <LoadingLine />
      <LoadingValue />
      <span>Carregando saldo...</span>
    </LoadingBalanceContainer>
  );
};
