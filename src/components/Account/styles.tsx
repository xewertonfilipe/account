import styled from "styled-components";

export const Card = styled.section`
  background-color: #004d61;
  border-radius: 8px;
  min-height: 400px;
  width: 100%;
  padding: 24px;
  color: #fff;
`;

export const Heading = styled.h2`
  margin: 0;
  margin-bottom: 24px;
  font-weight: 600;
`;

export const DateWrapper = styled.p`
  text-transform: capitalize;
  margin: 0;
  font-size: 13px;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  padding-right: 80px;
  justify-content: flex-end;
`;

export const StyledBalance = styled.div`
  h3 {
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 24px;
    border-bottom: 2px solid #ff5031;
    padding: 16px 0;
    margin: 0;
    margin-bottom: 16px;
  }
  p {
    font-size: 16px;
    margin: 0;
    margin-bottom: 8px;
  }
  strong {
    font-size: 31px;
  }
`;
