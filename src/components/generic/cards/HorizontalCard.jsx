import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import Colors from "../Colors";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${Colors.backgroundWhite};
  border-radius: 12px;
  width: 100%;
  margin: 10px 0;
  position: relative;
  cursor: pointer;
  padding: 2px;
`;

const HorizontalCardImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;

  @media ((max-width: 768px)) {
    width: 52px;
    height: 61px;
  }
`;

const HorizontalCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HorizontalCardTitle = styled.p`
  font-size: ${Typography.p.xlarge.fontSize};
  line-height: ${Typography.p.xlarge.lineHeight};
  font-weight: ${Typography.p.large.fontWeight};

  @media (max-width: 768px) {
    font-size: ${Typography.p.medium.fontSize};
    line-height: ${Typography.p.medium.lineHeight};
  }
`;

const LocationInfo = styled.p`
  color: ${Colors.textLightGrey};
  font-size: ${Typography.p.smallCardTime.fontSize};
  line-height: ${Typography.p.smallCardTime.lineHeight};
`;

const HorizontalRatingBadge = styled.div`
  width: 36px;
  height: 19px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  border-radius: 9.5px;
  background: linear-gradient(
    100.77deg,
    rgba(255, 255, 255, 0.64) 0%,
    rgba(255, 255, 255, 0.26) 100%
  );
  backdrop-filter: blur(8px);
  font-size: ${Typography.p.medium.fontSize};
  line-height: ${Typography.p.xsmallCardLocation.lineHeight};
  margin-left: auto;

  @media (max-width: 768px) {
    font-size: ${Typography.p.xsmallCardLocation.fontSize};
  }
`;

const StarIcon = styled.img`
  width: 12px;
  height: auto;
`;

const HorizontalCards = ({
  picture,
  name,
  laundryID,
  numRatings,
  sumRatings,
  locationDetail,
  locationCity,
}) => {
  const navigate = useNavigate();

  const calculateRating = (sum, count) => {
    console.log("Calcula a avaliação:", sum, count); // Verifica os valores de sum e count
    return count && parseInt(count) > 0
      ? parseFloat(sum) / parseInt(count) // Retorna o valor calculado sem arredondar
      : "N/A";
  };

  return (
    <FlexContainer onClick={() => navigate(`/washfold?laundry=${laundryID}`)}>
      <HorizontalCardImage src={picture} alt={name} />
      <HorizontalCardContent>
        <HorizontalCardTitle>{name}</HorizontalCardTitle>
        <LocationInfo>
          {locationDetail}, {locationCity}
        </LocationInfo>
      </HorizontalCardContent>

      <HorizontalRatingBadge>
        <StarIcon src="/icon/star.svg" alt="Rating Star" />
        {calculateRating(sumRatings, numRatings)}
      </HorizontalRatingBadge>
    </FlexContainer>
  );
};

// Validação com PropTypes
HorizontalCards.propTypes = {
  laundryID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  description: PropTypes.string,
  numRatings: PropTypes.string,
  sumRatings: PropTypes.string,
  locationDetail: PropTypes.string.isRequired,
  locationCity: PropTypes.string.isRequired,
};

export default HorizontalCards;
