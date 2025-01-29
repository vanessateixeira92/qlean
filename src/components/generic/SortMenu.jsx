import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Colors from "./Colors";
import Typography from "./Typography";

const MostPopularWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
`;

const MostPopularButton = styled.button`
  font-size: ${Typography.p.xlarge.fontSize};
  line-height: ${Typography.p.xlarge.lineHeight};
  color: ${Colors.textMutedLight};
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: ${Typography.p.regularSearch.fontSize};
    line-height: ${Typography.p.regularSearch.lineHeight};
  }
`;

const DropdownIcon = styled.div`
  width: 6px;
  height: 6px;
  border-left: 2px solid rgba(55, 55, 55, 1);
  border-bottom: 2px solid rgba(55, 55, 55, 1);
  transform: rotate(-45deg);
  margin-left: 5px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 150px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  z-index: 1000;
  list-style: none;
  margin: 0;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SortMenu = ({ sortOption, onSelectSortOption }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleOptionSelect = useCallback(
    (option) => {
      onSelectSortOption(option); // Atualiza a opção no componente pai
      setDropdownOpen(false); // Fecha o menu
    },
    [onSelectSortOption]
  );

  return (
    <MostPopularWrapper>
      <MostPopularButton onClick={toggleDropdown}>
        {sortOption}
      </MostPopularButton>
      <DropdownIcon />
      <DropdownMenu $isOpen={dropdownOpen}>
        {["Most Popular", "Nearest", "Highest Rated"].map((option) => (
          <DropdownItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </MostPopularWrapper>
  );
};

// Validação de props
SortMenu.propTypes = {
  sortOption: PropTypes.string.isRequired,
  onSelectSortOption: PropTypes.func.isRequired,
};

export default SortMenu;
