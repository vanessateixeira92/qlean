import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Search from "../forms/Search";
import HeaderSecondary from "../generic/HeaderSecondary";
import NavBar from "../generic/NavBar";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import VerticalCard from "../generic/cards/VerticalCard";
import SortMenu from "../generic/SortMenu";
import Filter from "../generic/Filter";

const NearYouContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 100vh;
  overflow-y: auto;
`;

const NearYouContent = styled.div`
  padding: 10px 20px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSearch = styled(Search)`
  width: 100%;
  min-width: 400px;
  @media (max-width: 768px) {
    min-width: 300px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const ResultsInfo = styled.p`
  font-size: ${Typography.p.xlarge.fontSize};
  line-height: ${Typography.p.xlarge.lineHeight};
  color: ${Colors.textMutedLight};

  @media (max-width: 768px) {
    font-size: ${Typography.p.regularSearch.fontSize};
    line-height: ${Typography.p.regularSearch.lineHeight};
  }
`;

const GridContent = styled.div`
  width: 100%;
  background: white;
  box-sizing: border-box;
  margin-bottom: 68px;
`;

const TitleCards = styled.h2`
  font-size: ${Typography.h2.large.fontSize};
  line-height: ${Typography.h2.large.lineHeight};
  font-weight: ${Typography.h2.medium.fontWeight};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: ${Typography.h2.medium.fontSize};
    line-height: ${Typography.h2.medium.lineHeight};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 24px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NearYou = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search")?.toLowerCase() || ""; // Captura o parâmetro 'search' da URL

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery); // Definir o estado de pesquisa
  const [sortOption, setSortOption] = useState("Most Popular");
  const [isSortMenuOpen, setSortMenuOpen] = useState(false); // Estado para controlar o menu de ordenação

  const laundries = [
    {
      id: 1,
      title: "Wash & Fold",
      image: "/img/nearyou.jpg",
      rating: 4.3,
      distance: "3350m | 2 min",
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
      rating: 4.8,
      distance: "1.2km | 6 min",
    },

    {
      id: 5,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },

    {
      id: 6,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },

    {
      id: 7,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },

    {
      id: 8,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.5,
      distance: "1.2km | 6 min",
    },

    {
      id: 9,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.3,
      distance: "1.2km | 6 min",
    },

    {
      id: 10,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },

    {
      id: 11,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },

    {
      id: 12,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },

    {
      id: 13,
      title: "Speed Wash",
      image: "/img/nearyou.jpg",
      rating: 4.7,
      distance: "1.2km | 6 min",
    },
  ];

  const parseDistance = (distance) => {
    if (!distance) return Infinity;
    if (distance.includes("km")) {
      const valueInKm = parseFloat(distance.replace("km", "").trim());
      return valueInKm * 1000;
    }
    if (distance.includes("m")) {
      const valueInM = parseInt(distance.replace("m", "").trim(), 10);
      return valueInM;
    }
    return Infinity;
  };

  const filteredResults = laundries.filter((laundry) =>
    laundry.title.toLowerCase().includes(searchQuery)
  );

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortOption) {
      case "Nearest":
        return parseDistance(a.distance) - parseDistance(b.distance);
      case "Highest Rated":
        return b.rating - a.rating;
      default: // "Most Popular"
        return b.rating - a.rating;
    }
  });

  const totalResults = laundries.length;
  const visibleResults = sortedResults.length;

  return (
    <NearYouContainer>
      <NearYouContent>
        <HeaderSecondary />
        <br />
        <SearchAndFilterContainer>
          {/* Passa o valor e a função setSearchQuery */}
          <StyledSearch
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Filter />
        </SearchAndFilterContainer>

        <InfoSection>
          <ResultsInfo>
            {visibleResults} of {totalResults} results
          </ResultsInfo>
          <SortMenu
            isOpen={isSortMenuOpen}
            onToggle={() => setSortMenuOpen(!isSortMenuOpen)}
            sortOption={sortOption}
            onSelectSortOption={(option) => {
              setSortOption(option);
              setSortMenuOpen(false);
            }}
          />
        </InfoSection>

        <GridContent>
          <TitleCards>Near You</TitleCards>
          <GridContainer>
            {sortedResults.map((laundry) => (
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
