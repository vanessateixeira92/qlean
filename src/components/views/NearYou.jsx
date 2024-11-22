import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Search from "../forms/Search";
import Location from "../generic/Location";
import HeaderSecondary from "../generic/HeaderSecondary";
import NavBar from "../generic/NavBar";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import VerticalCard from "../generic/cards/VerticalCard";

const NearYouContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
`;

const NearYouContent = styled.div`
  padding: 24px;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 15px;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const ResultsInfo = styled.p`
  font-size: ${Typography.p.regularSearch.fontSize};
  line-height: ${Typography.p.regularSearch.lineHeight};
  color: ${Colors.textMutedLight};
`;

const MostPopularWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
`;

const MostPopular = styled.p`
  font-size: ${Typography.p.regularSearch.fontSize};
  line-height: ${Typography.p.regularSearch.lineHeight};
  color: ${Colors.textMutedLight};
  cursor: pointer;
`;

const DropdownIcon = styled.div`
  width: 6px;
  height: 6px;
  border-left: 2px solid rgba(55, 55, 55, 1);
  border-bottom: 2px solid rgba(55, 55, 55, 1);
  transform: rotate(-45deg);
  margin-left: 5px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  width: 150px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  color: #333;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const GridContent = styled.div`
  width: 100%;
  background: white;
  box-sizing: border-box;
  margin-bottom: 68px;
`;

const NearYouCards = styled.h2`
  margin-bottom: 20px;
  text-align: left;
  font-size: ${Typography.h2.medium.fontSize};
  font-weight: ${Typography.h2.medium.fontWeight};
  line-height: ${Typography.h2.medium.lineHeight};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 16px;
  align-items: start;
`;

const NearYou = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search"); // Captura o parâmetro 'search' da URL

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Most Popular"); // Estado para a opção de ordenação
  const dropdownRef = useRef(null);

  const [laundries] = useState([
    {
      id: 1,
      title: "Wash & Fold",
      image: "/img/nearyou.jpg",
      rating: 4.3,
      distance: "350m | 2 min",
    },
    {
      id: 2,
      title: "Laundry Pro",
      image: "/img/nearyou.jpg",
      rating: 4.0,
      distance: "500m | 3 min",
    },
    {
      id: 3,
      title: "Quick Wash",
      image: "/img/nearyou.jpg",
      rating: 4.5,
      distance: "800m | 5 min",
    },
    {
      id: 4,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },
    {
      id: 5,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 6,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 7,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 8,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 9,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 10,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 11,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 12,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 13,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
    {
      id: 14,
      title: "Clean Laundry",
      image: "/img/nearyou.jpg",
      rating: 4.2,
      distance: "600m | 4 min",
    },
  ]);

  const filteredResults = laundries.filter((item) =>
    item.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  // Função para mudar a opção de ordenação
  const sortResults = (option) => {
    switch (option) {
      case "Most Popular":
        return filteredResults.sort((a, b) => b.rating - a.rating);
      case "Nearest":
        return filteredResults.sort((a, b) => {
          const aDistance = parseInt(a.distance);
          const bDistance = parseInt(b.distance);
          return aDistance - bDistance;
        });
      case "Highest Rated":
        return filteredResults.sort((a, b) => b.rating - a.rating);
      default:
        return filteredResults;
    }
  };

  // Função para selecionar uma opção e fechar o dropdown automaticamente
  const handleSortOptionSelect = (option) => {
    setSortOption(option);
    setDropdownOpen(false); // Fecha o dropdown automaticamente após seleção
  };

  return (
    <NearYouContainer>
      <NearYouContent>
        <HeaderSecondary />
        <br />
        <Search />

        <InfoSection>
          <ResultsInfo>{filteredResults.length} results found</ResultsInfo>
          <MostPopularWrapper ref={dropdownRef}>
            <MostPopular>{sortOption}</MostPopular>
            <DropdownIcon onClick={() => setDropdownOpen(!dropdownOpen)} />
            <DropdownMenu isOpen={dropdownOpen}>
              <DropdownItem
                onClick={() => handleSortOptionSelect("Most Popular")}
              >
                Most Popular
              </DropdownItem>
              <DropdownItem onClick={() => handleSortOptionSelect("Nearest")}>
                Nearest
              </DropdownItem>
              <DropdownItem
                onClick={() => handleSortOptionSelect("Highest Rated")}
              >
                Highest Rated
              </DropdownItem>
            </DropdownMenu>
          </MostPopularWrapper>
        </InfoSection>

        <GridContent>
          <NearYouCards>Near You</NearYouCards>
          <GridContainer>
            {laundries.map((laundry) => (
              <VerticalCard
                key={laundry.id}
                image={laundry.image}
                title={laundry.title}
                rating={laundry.rating}
                distance={laundry.distance}
              />
            ))}
          </GridContainer>
        </GridContent>
      </NearYouContent>
      <NavBar />
    </NearYouContainer>
  );
};

export default NearYou;
