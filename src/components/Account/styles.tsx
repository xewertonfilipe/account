import styled from "styled-components";

export const Card = styled.section`
  background-color: #004d61;
  border-radius: 8px;
  min-height: clamp(280px, 45vw, 400px);
  width: 100%;
  padding: clamp(16px, 4vw, 24px);
  color: #fff;
`;

export const Heading = styled.h2`
  margin: 0;
  margin-bottom: clamp(16px, 4vw, 24px);
  font-size: clamp(22px, 5vw, 28px);
  line-height: 1.2;
  font-weight: 600;
`;

export const DateWrapper = styled.p`
  text-transform: capitalize;
  margin: 0;
  font-size: clamp(12px, 2.8vw, 13px);
`;

export const BalanceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: clamp(20px, 5vw, 28px);

  @media (min-width: 768px) {
    justify-content: flex-end;
    padding-right: clamp(20px, 6vw, 80px);
  }
`;

export const StyledBalance = styled.div`
  h3 {
    font-size: clamp(18px, 4.5vw, 20px);
    line-height: 1.2;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: clamp(12px, 3vw, 24px);
    border-bottom: 2px solid #ff5031;
    padding: clamp(12px, 3.5vw, 16px) 0;
    margin: 0;
    margin-bottom: clamp(12px, 3vw, 16px);

    svg {
      width: clamp(16px, 4vw, 20px);
      height: auto;
      flex-shrink: 0;
    }
  }

  p {
    font-size: clamp(14px, 3.5vw, 16px);
    margin: 0;
    margin-bottom: 8px;
  }

  strong {
    font-size: clamp(24px, 8vw, 31px);
    line-height: 1.2;
  }
`;
