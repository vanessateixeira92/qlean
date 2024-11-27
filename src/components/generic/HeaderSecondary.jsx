import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: start;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;

  @media (max-width: 768px) {
    height: 30px;
  }
`;

const HeaderSecondary = () => {
  return (
    <StyledHeader>
      <Logo src="/img/logo.png" alt="Logo" />
    </StyledHeader>
  );
};

export default HeaderSecondary;
