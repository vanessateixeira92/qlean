import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../forms/Search";
import Location from "../generic/Location";
import HeaderSecondary from "../generic/HeaderSecondary";
import NavBar from "../generic/NavBar";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import VerticalCard from "../generic/cards/VerticalCard";
import HorizontalCard from "../generic/cards/HorizontalCard";

// Estilos do layout
const HomeContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 100vh;
`;

const HomeContent = styled.div`
  padding: 10px 20px;
`;

// Vetor
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

const NameUser = styled.h1`
  font-size: ${Typography.h1.medium.fontSize};
  line-height: ${Typography.h1.medium.lineHeight};
  font-weight: ${Typography.h1.regular.fontWeight};
  margin-top: 0;

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
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 20px;
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  padding: 2px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FlexContent = styled.div`
  margin-top: 30px;
  margin-bottom: 70px;
`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");

  const handleSearch = () => {
    navigate(`/near-you?search=${searchQuery}`);
  };

  useEffect(() => {
    // Verifica se o nome do usuário já está no localStorage
    const storedName = localStorage.getItem("userName");

    if (!storedName) {
      // Se o nome não estiver no localStorage, define um valor padrão
      localStorage.setItem("userName", "Vanessa");
    }

    // Atualiza o estado com o nome armazenado ou o valor padrão
    setUserName(storedName || "Vanessa");
  }, []);

  // Simulação de dados de lavandarias
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
  ]);

  return (
    <HomeContainer>
      <VectorContainer>
        <Vector src="/vector/laundry-vector.png" alt="Imagem 1" />
      </VectorContainer>
      <HomeContent>
        <HeaderSecondary />

        <TitleContainer>
          <WelcomeName>Welcome,</WelcomeName>
          <NameUser>{userName}</NameUser>
        </TitleContainer>
        <CurrentLocation>Current Location</CurrentLocation>
        <Location />
        <br />
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch} // Função chamada ao buscar
        />

        <GridContent>
          <TitleCards>Near You</TitleCards>
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

        <FlexContent>
          <TitleCards>Recently Used</TitleCards>

          {laundries.map((laundry) => (
            <HorizontalCard
              key={laundry.id}
              image={laundry.image}
              title={laundry.title}
              rating={laundry.rating}
            />
          ))}
        </FlexContent>
      </HomeContent>
      <NavBar />
    </HomeContainer>
  );
};

export default Home;
