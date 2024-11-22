import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  position: fixed;
  width: 100%;
  min-width: 126px;
  top: 28px;
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
