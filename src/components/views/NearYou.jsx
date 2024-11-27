import { useLocation } from "react-router-dom";
import React, { useState, useRef } from "react";
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
  padding: 10px 20px 10px 20px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSearch = styled(Search)`
  width: 100%; /* Por padrão ocupa todo o espaço */
  min-width: 400px; /* Limita a largura */
  @media (max-width: 768px) {
    min-width: 300px; /* Para telas menores */
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
    grid-template-columns: repeat(auto-fit, minmax(152px, 2fr));
  }
`;

const NearYou = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || ""; // Captura o parâmetro 'search' da URL

  const [sortOption, setSortOption] = useState("Most Popular"); // Estado para a opção de ordenação
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  // Função para converter distâncias para metros
  const parseDistance = (distance) => {
    if (distance.includes("km")) {
      return parseFloat(distance) * 1000;
    }
    return parseInt(distance);
  };

  // Filtrar resultados com base na busca
  const filteredResults = laundries.filter((laundry) =>
    laundry.title.toLowerCase().includes(searchQuery)
  );

  // Ordenar os resultados filtrados
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

  // Número total de laundries (não filtrados)
  const totalResults = laundries.length;
  // Número de resultados visíveis após filtro e ordenação
  const visibleResults = sortedResults.length;

  return (
    <NearYouContainer>
      <NearYouContent>
        <HeaderSecondary />
        <br />
        <SearchAndFilterContainer>
          <StyledSearch />
          <Filter />
        </SearchAndFilterContainer>
        {/* Exibir o número de resultados no formato "X of Y results" */}
        <InfoSection></InfoSection>
        <InfoSection>
          <ResultsInfo>
            {visibleResults} of {totalResults} results
          </ResultsInfo>
          {/* Componente SortMenu */}
          <SortMenu
            sortOption={sortOption}
            onSelectSortOption={(option) => {
              setSortOption(option); // Atualiza o estado de sortOption
              setDropdownOpen(false); // Fecha o menu suspenso, se necessário
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
