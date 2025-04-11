import styled from "styled-components";

export const TableContainer = styled.div`
  position: relativ;
  background-color: #2a2a2a;
  border: solid 1px gold;
  border-radius: 10px;
  width: 810px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 60%;
    padding: 15px;
    height: 380px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const CenterLogo = styled.h1`
  font-size: 2.5em;
  color: gold;
  font-family: "Audiowide", sans-serif;
`;
