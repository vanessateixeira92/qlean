import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Colors from "./Colors";

// Container da NavBar
const NavBarContainer = styled.nav`
  width: 100%;
  height: 67px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: fixed;
  bottom: 0;

  @media (min-width: 768px) {
    height: 80px;
  }
`;

// Items da NavBar
const NavItem = styled.div`
  color: ${(props) =>
    props.isActive ? Colors.textAquaVibrant : Colors.textLightGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", serif;
  font-size: 9.88px;
  cursor: pointer;
  transition: color 0.3s ease;
  gap: 5px;

  &:hover {
    color: ${Colors.textAquaVibrant};
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

// Items de navegação com novos caminhos para os ícones SVG
const navItems = [
  { label: "Home", icon: "/icon/navbar/home.svg", path: "/home" },
  { label: "History", icon: "/icon/navbar/history.svg", path: "" },
  { label: "Search", icon: "/icon/navbar/search.svg", path: "/nearyou" },
  { label: "Profile", icon: "/icon/navbar/profile.svg", path: "" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavBarContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          isActive={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          <img src={item.icon} alt={item.label} />
          <span>{item.label}</span>
        </NavItem>
      ))}
    </NavBarContainer>
  );
};

export default NavBar;
