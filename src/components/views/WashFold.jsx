import React from "react";
import styled from "styled-components";
import Location from "../generic/Location";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";
import ReturnButton from "../generic/ReturnButton.jsx";

const WashFoldContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const WashFoldContent = styled.div`
  padding: 10px 20px;
`;

// Estilos do cabeçalho com o nome de boas-vindas
const TitleContainer = styled.div``;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  font-size: ${Typography.h1.small.fontSize};
  color: ${Colors.textPrimary};
  font-weight: ${Typography.h1.small.fontWeight};
`;

const Laundry = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  justify-content: center;

  /* Media Query (mobile) */
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const LocationWrapper = styled.div`
  text-align: center;
  font-size: ${Typography.p.smallLocation.fontSize};
  color: ${Colors.textPrimary};
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 9.5px;
  padding: 16px;
  max-width: 200px;
`;

const RatingBadge = styled.div`
  display: flex;
  gap: 5px;
  border-radius: 9.5px;
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 16px;
  background: linear-gradient(
    100.77deg,
    rgba(255, 255, 255, 0.64) 0%,
    rgba(255, 255, 255, 0.26) 100%
  );
  backdrop-filter: blur(8px);
  font-size: ${Typography.p.xsmallCardLocation.fontSize};
  color: ${Colors.textLightGrey};
  max-width: 200px;
`;

const LaundryImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 18px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

// Cards
const FlexContent = styled.div`
  width: 100%;
  background-color: ${Colors.backgroundWhite};
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 70px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.backgroundWhite};
  border-radius: 15px;
  border: 1px solid rgba(131, 80, 219, 1);
  padding: 0 10px;
  margin: 10px 0;
  position: relative;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
`;

const Washer = styled.h2`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 3px solid rgba(131, 80, 219, 1);
  color: ${Colors.textBlueViolet};
  font-size: ${Typography.h2.large.fontSize};
  font-weight: ${Typography.h2.large.fontWeight};
  line-height: ${Typography.h2.large.lineHeight};
  margin-right: 16px;

  /* Media Query (mobile) */
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

const WasherContent = styled.h1`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  margin: 0;
  justify-content: center;
`;

const Weight = styled.p`
  font-size: ${Typography.p.xlarge.fontSize};
  margin-bottom: 0;
`;

const Time = styled.p`
  font-size: ${Typography.p.smallCardTime.fontSize};
  color: ${Colors.textLightGrey};
  margin-top: 0;
`;

const ShoppingCart = styled.button`
  background: ${Colors.backgroundAquaVibrant};
  border: none;
  font-size: ${Typography.h2.large.fontSize};
  border-radius: 6px;
  color: ${Colors.textWhite};
  padding: 20px 30px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  display: flex; /* Usar flexbox */
  align-items: center; /* Alinha os itens verticalmente */
  gap: 10px; /* Espaço entre o preço e o ícone */

  /* Media Query para mobile */
  @media (max-width: 768px) {
    margin-top: 15px; /* Aumentando o espaço superior */
    padding: 15px 20px; /* Reduzindo o padding */
    font-size: ${Typography.h2.medium.fontSize}; /* Font-size reduzido */
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

// About Section
const AboutContent = styled.div`
  background: ${Colors.backgroundBlueViolet};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 5px 24px 100px 24px;
  color: ${Colors.textWhite};
  margin: 0;
`;

const AboutTitle = styled.h2`
  font-size: ${Typography.h2.medium.fontSize};

  margin-bottom: 0%;
`;

const AboutInfo = styled.p`
  font-size: ${Typography.p.medium.fontSize};

  /* Media Query (mobile) */
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const AboutLink = styled.a`
  color: ${Colors.textAquaVibrant};
  text-decoration: none;
`;

const WashFold = () => {
  return (
    <WashFoldContainer>
      <WashFoldContent>
        <ReturnButton to="/nearyou" />
        <TitleContainer>
          <Title>Wash & Fold</Title>
          <Laundry>
            <LocationWrapper>
              <Location />
            </LocationWrapper>
            <RatingBadge>
              <img src="/icon/star.svg" alt="Rating Badge" />
              <strong>4.3</strong>(12,789 Reviews)
            </RatingBadge>
          </Laundry>
          <LaundryImg src="/img/wash-fold.png" alt="Imagem 1"></LaundryImg>
        </TitleContainer>
        <FlexContent>
          <FlexContainer>
            <CardContent>
              <Washer>321</Washer>
              <WasherContent>
                <Weight>
                  <strong>9 KG </strong> Washer
                </Weight>
                <Time>28 min</Time>
              </WasherContent>
              <ShoppingCart>
                €3,80{" "}
                <img
                  src="/icon/shopper.svg"
                  alt="Shopping Cart Icon"
                  width="20"
                  height="20"
                />
              </ShoppingCart>
            </CardContent>
          </FlexContainer>

          <FlexContainer>
            <CardContent>
              <Washer>321</Washer>
              <WasherContent>
                <Weight>
                  <strong>9 KG </strong> Washer
                </Weight>
                <Time>28 min</Time>
              </WasherContent>
              <ShoppingCart>
                €3,80{" "}
                <img
                  src="/icon/shopper.svg"
                  alt="Shopping Cart Icon"
                  width="20"
                  height="20"
                />
              </ShoppingCart>
            </CardContent>
          </FlexContainer>

          <FlexContainer>
            <CardContent>
              <Washer>341</Washer>
              <WasherContent>
                <Weight>
                  <strong>9 KG </strong>Dryer
                </Weight>
                <Time>28 min</Time>
              </WasherContent>
              <ShoppingCart>
                €3,80{" "}
                <img
                  src="/icon/shopper.svg"
                  alt="Shopping Cart Icon"
                  width="20"
                  height="20"
                />
              </ShoppingCart>
            </CardContent>
          </FlexContainer>

          <FlexContainer>
            <CardContent>
              <Washer>341</Washer>
              <WasherContent>
                <Weight>
                  <strong>9 KG </strong> Dryer
                </Weight>
                <Time>28 min</Time>
              </WasherContent>
              <ShoppingCart>
                €3,80{" "}
                <img
                  src="/icon/shopper.svg"
                  alt="Shopping Cart Icon"
                  width="20"
                  height="20"
                />
              </ShoppingCart>
            </CardContent>
          </FlexContainer>
        </FlexContent>
      </WashFoldContent>
      <AboutContent>
        <AboutTitle>About Wash & Fold</AboutTitle>
        <AboutInfo>
          We have redefined Laundry and Dry cleaning services. We are among the
          top Online Dry cleaners in Thane, Navi Mumbai, Mulund & Bhandup. We
          use advanced technology for Laundry and Dry cleaning to enhance and
          maintain beauty of your garments. Finally we are delivering you
          unforgettable.{" "}
          <AboutLink href="" target="blankt">
            See more..
          </AboutLink>
        </AboutInfo>
      </AboutContent>
    </WashFoldContainer>
  );
};

export default WashFold;
