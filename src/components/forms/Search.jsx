import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa"; // Ícone de lupa
import { useNavigate } from "react-router-dom"; // Para navegar para a página de resultados

const LabelWrapper = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  max-width: 335px;
  position: relative; /* Garantir que o z-index tenha efeito */
  z-index: 1; /* Garante que a label de pesquisa fique na frente do vetor */
`;

const InputText = styled.input`
  flex-grow: 1;
  padding: 8px;
  font-family: "Alata", sans-serif;
  font-size: 11px;
  border: none;
  outline: none;
`;

const SearchIcon = styled(FaSearch)`
  margin-left: 8px;
  width: 20px;
  color: rgba(118, 118, 118, 1);
  cursor: pointer;
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Para navegar para a página NearYou

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navega para a página NearYou e passa o parâmetro de pesquisa na URL
      navigate(`/nearyou?search=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <LabelWrapper>
        <InputText
          type="text"
          placeholder="Search Laundry..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchIcon onClick={handleSearchSubmit} />
      </LabelWrapper>
    </form>
  );
};

export default Search;
