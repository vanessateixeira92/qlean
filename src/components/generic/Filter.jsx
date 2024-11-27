import React, { useState } from "react";
import styled from "styled-components";

// Estilos do botão de filtro e do menu
const FilterButton = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 10px; /* Adiciona uma margem para o botão de filtro */

  img {
    width: 50px;
    height: 50px;
  }

  &:focus {
    outline: none;
  }
`;

// Overlay para fundo escurecido
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo cinza transparente */
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 9998; /* Um nível abaixo do menu de filtros */
`;

// Menu de Filtros
const FilterMenu = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  max-height: 80vh;

  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  z-index: 9999;

  @media (max-width: 768px) {
    width: 90%;
    height: 60%;
  }
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px; /* Adiciona o espaçamento entre o checkbox e o texto */
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 9px;

  &:focus {
    outline: none;
  }
`;

const SelectedFilters = styled.div`
  border-top: 1px solid #ddd;
  display: ${({ selectedFilters }) =>
    selectedFilters.length > 0 ? "block" : "none"};
`;

const Filter = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para mostrar/esconder o menu
  const [selectedFilters, setSelectedFilters] = useState([]); // Estado para armazenar filtros selecionados

  // Função para alternar a visibilidade do menu de filtros
  const toggleFilterMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Função para aplicar o filtro (Exemplo: filtrar por categoria)
  const handleFilterChange = (filter) => {
    setSelectedFilters((prevState) =>
      prevState.includes(filter)
        ? prevState.filter((item) => item !== filter)
        : [...prevState, filter]
    );
  };

  // Função para remover todos os filtros
  const removeAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div>
      {/* Overlay para escurecer o fundo */}
      <Overlay isVisible={isMenuVisible} onClick={toggleFilterMenu} />

      {/* Botão de Filtro */}
      <FilterButton onClick={toggleFilterMenu}>
        <img src="icon/filter.svg" alt="Filter Icon" />
      </FilterButton>

      {/* Menu de Filtro */}
      <FilterMenu isVisible={isMenuVisible}>
        <MenuItem>
          <Label>
            <input
              type="checkbox"
              checked={selectedFilters.includes("Category 1")}
              onChange={() => handleFilterChange("Category 1")}
            />
            Category 1
          </Label>
        </MenuItem>
        <MenuItem>
          <Label>
            <input
              type="checkbox"
              checked={selectedFilters.includes("Category 2")}
              onChange={() => handleFilterChange("Category 2")}
            />
            Category 2
          </Label>
        </MenuItem>
        <MenuItem>
          <Label>
            <input
              type="checkbox"
              checked={selectedFilters.includes("Category 3")}
              onChange={() => handleFilterChange("Category 3")}
            />
            Category 3
          </Label>
        </MenuItem>
      </FilterMenu>

      {/* Mostrar Cruz de Remover Filtros somente se houver filtros selecionados */}
      {selectedFilters.length > 0 && (
        <SelectedFilters selectedFilters={selectedFilters}>
          <RemoveFilterButton onClick={removeAllFilters}>
            Clear Filters
          </RemoveFilterButton>
        </SelectedFilters>
      )}
    </div>
  );
};

export default Filter;
