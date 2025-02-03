import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../forms/Search";
import HeaderSecondary from "../generic/HeaderSecondary";
import NavBar from "../generic/NavBar";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import VerticalCard from "../generic/cards/VerticalCard";
import SortMenu from "../generic/SortMenu";

const LaundryContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 100vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const LaundryContent = styled.div`
  padding: 10px 20px;
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  padding: 2px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LaundryResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const laundryId = searchParams.get("laundry");
  const [laundries, setLaundries] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const initialSearchQuery = queryParams.get("search")?.toLowerCase() || ""; // Captura o parâmetro 'search' da URL

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery); // Definir o estado de pesquisa
  const [sortOption, setSortOption] = useState("Most Popular");
  const [isSortMenuOpen, setSortMenuOpen] = useState(false); // Estado para controlar o menu de ordenação

  // Fazer a requisição ao endpoint para buscar as lavandarias
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const updatedSearchQuery = queryParams.get("search")?.toLowerCase() || "";
    setSearchQuery(updatedSearchQuery); // Atualiza o estado sempre que a URL mudar

    const fetchLaundries = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_GET_LAUNDRIES_API_URL}${laundryId}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching laundries: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Resposta da API:", responseData);
        if (responseData.data && responseData.data.length > 0) {
          setLaundries(responseData.data);
          console.log("Laundries:", responseData.data);
        } else {
          console.warn("No laundries found.");
          setLaundries([]); // Define como array vazio para evitar erro
        }
      } catch (error) {
        console.error("Failed to fetch laundries:", error.message);
        setLaundries([]); // Define como array vazio em caso de erro
      }
    };

    fetchLaundries();
  }, [location.search, laundryId]);

  // Navegação com a barra de pesquisa
  const handleSearch = () => {
    console.log("Navigating with search query:", searchQuery);
    navigate(`/laundryresults?search=${searchQuery}`);
  };

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

  const filteredResults = laundries.filter(
    (laundry) =>
      laundry.name.toLowerCase().includes(searchQuery) ||
      laundry.description.toLowerCase().includes(searchQuery) ||
      laundry.locationCity.toLowerCase().includes(searchQuery)
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

  console.log("searchQuery:", searchQuery);
  console.log("Filtered Results:", filteredResults);

  return (
    <LaundryContainer>
      <LaundryContent>
        <HeaderSecondary />
        <br />

        <StyledSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <InfoSection>
          <ResultsInfo>
            {visibleResults === 0
              ? "0 results"
              : `${visibleResults} of ${totalResults} results`}{" "}
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
          <GridContainer>
            {console.log("Detalhes da lavanderia:", laundries)}
            {sortedResults.map((laundry) => (
              <VerticalCard
                key={laundry.laundryID}
                laundryID={laundry.laundryID}
                picture={laundry.picture}
                name={laundry.name}
                description={laundry.description}
                numRatings={laundry.numRatings}
                sumRatings={laundry.sumRatings}
                locationDetail={laundry.locationDetail}
                locationCity={laundry.locationCity}
                onClick={() =>
                  navigate(`/washfold?laundry=${laundry.laundryID}`)
                }
              />
            ))}
          </GridContainer>
        </GridContent>
      </LaundryContent>
      <NavBar />
    </LaundryContainer>
  );
};

export default LaundryResults;
