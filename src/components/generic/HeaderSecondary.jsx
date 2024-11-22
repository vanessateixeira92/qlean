import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  min-width: 70px;
  top: 28px;

  z-index: 1000;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const HeaderSecondary = () => {
  return (
    <StyledHeader>
      <Logo src="/img/logo.png" alt="Logo" />
    </StyledHeader>
  );
};

export default HeaderSecondary;
