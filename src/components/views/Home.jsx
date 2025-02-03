import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../forms/Search";
import Location from "../generic/Location/Location";
import HeaderSecondary from "../generic/HeaderSecondary";
import NavBar from "../generic/NavBar";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import VerticalCard from "../generic/cards/VerticalCard";
import HorizontalCard from "../generic/cards/HorizontalCard";

const HomeContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 100vh;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const HomeContent = styled.div`
  padding: 10px 20px;
`;

// Vector
const VectorContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
`;

const Vector = styled.img`
  width: auto;
  max-width: 255px;
  height: auto;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    max-width: 200px;
    margin: 0 auto;
  }
`;

const TitleContainer = styled.div`
  text-align: left;
  margin-top: 20px;
`;

const WelcomeName = styled.h1`
  font-size: ${Typography.h1.medium.fontSize};
  line-height: ${Typography.h1.medium.lineHeight};
  font-weight: ${Typography.h1.regular.fontWeight};
  margin-bottom: 0;

  @media (max-width: 768px) {
    font-size: ${Typography.h1.regular.fontSize};
    line-height: ${Typography.h1.regular.lineHeight};
  }
`;

const CurrentLocation = styled.p`
  text-align: left;
  font-size: ${Typography.p.large.fontSize};
  color: ${Colors.textLightGrey};
  line-height: ${Typography.p.large.lineHeight};
  margin-bottom: 5px;
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 20px;
    font-size: ${Typography.p.smallFooter.fontSize};
    line-height: ${Typography.p.smallFooter.lineHeight};
  }
`;

const GridContent = styled.div`
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 45px;
  }
`;

const TitleCards = styled.h2`
  font-size: ${Typography.h2.large.fontSize};
  line-height: ${Typography.h2.large.lineHeight};
  font-weight: ${Typography.h2.medium.fontWeight};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: ${Typography.h2.medium.fontSize};
    line-height: ${Typography.h2.medium.lineHeight};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  padding: 2px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FlexContent = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const Home = () => {
  const [searchParams] = useSearchParams();
  const laundryId = searchParams.get("laundry");
  console.log("laundryID recuperado da URL:", laundryId);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxCards, setMaxCards] = useState(6);
  const [laundries, setLaundries] = useState([]);
  const navigate = useNavigate();

  // Fazer a requisição ao endpoint para ir buscar as lavandarias
  useEffect(() => {
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
        setLaundries(responseData.data || []);
        console.log("Laundries:", responseData.data || []);
      } catch (error) {
        console.error("Failed to fetch laundries:", error.message);
      }
    };

    fetchLaundries();
  }, [laundryId]);

  // Navegação com a barra de pesquisa
  const handleSearch = () => {
    console.log("Navigating with search query:", searchQuery);
    navigate(`/laundryresults?search=${searchQuery}`);
  };

  // Efeito para detectar a mudança do tamanho de ecra
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMaxCards(2); // Exibe apenas 2 cards em ecras pequenas
      } else {
        setMaxCards(6); // Exibe todos os cards em ecras grandes
      }
    };

    // Adiciona o evento de resize ao redimensionar a janela
    window.addEventListener("resize", handleResize);

    // Chama a função inicial para definir o maxCards baseado no tamanho atual
    handleResize();

    // Limpeza do evento ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <HomeContainer>
      <VectorContainer>
        <Vector src="/vector/laundry-vector.png" alt="Imagem 1" />
      </VectorContainer>
      <HomeContent>
        <HeaderSecondary />

        <TitleContainer>
          <WelcomeName>Welcome</WelcomeName>
        </TitleContainer>
        <CurrentLocation>Current Location</CurrentLocation>
        <Location />
        <br />
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <GridContent>
          <TitleCards>Near You</TitleCards>
          <GridContainer>
            {console.log("Detalhes da lavanderia:", laundries)}
            {laundries.slice(0, maxCards).map((laundry) => (
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

        <FlexContent>
          <TitleCards>Recently Used</TitleCards>

          {laundries.map((laundry) => (
            <HorizontalCard
              key={laundry.laundryID}
              laundryID={laundry.laundryID}
              picture={laundry.picture}
              name={laundry.name}
              numRatings={laundry.numRatings}
              sumRatings={laundry.sumRatings}
              locationDetail={laundry.locationDetail}
              locationCity={laundry.locationCity}
              onClick={() => navigate(`/washfold?laundry=${laundry.laundryID}`)}
            />
          ))}
        </FlexContent>
      </HomeContent>
      <NavBar />
    </HomeContainer>
  );
};

export default Home;
