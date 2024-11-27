import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo src={logo} alt="Logo" />
    </StyledHeader>
  );
};

export default Header;
