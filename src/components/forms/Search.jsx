import React, { useState } from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LabelWrapper = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 8px;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  position: relative;
  z-index: 1;
  height: 39px;
  box-sizing: border-box;
  box-shadow: 0px 1px 11px 0px rgba(0, 0, 0, 0.12);
`;

const InputText = styled.input`
  flex-grow: 1;
  padding: 8px;
  font-family: "Alata", sans-serif;
  font-size: 11px;
  border: none;
  outline: none;
`;

const SearchIcon = styled(BiSearchAlt)`
  margin-left: 8px;
  width: 20px;
  height: 20px;
  color: rgba(118, 118, 118, 1);
  cursor: pointer;
`;

const Search = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/laundryresults?search=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <LabelWrapper className={className}>
        <InputText
          id="search"
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

// Add PropTypes validation
Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
