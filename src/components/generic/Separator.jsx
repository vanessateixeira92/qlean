import React from "react";
import styled from "styled-components";
import Colors from "../generic/Colors";

const SeparatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 335px;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: ${Colors.backgroundGrey};
  margin: 5px;
  width: 100%;
`;

const SeparatorText = styled.span`
  color: ${Colors.textGrey};
  margin-bottom: 4px;
  font-size: 10px;
  font-family: "Alata", sans-serif;
`;

const Separator = () => {
  return (
    <SeparatorContainer>
      <Line />
      <SeparatorText>or</SeparatorText>
      <Line />
    </SeparatorContainer>
  );
};

export default Separator;
