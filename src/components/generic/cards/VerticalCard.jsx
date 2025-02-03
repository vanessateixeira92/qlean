import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import Colors from "../Colors";

const Card = styled.div`
  background: ${Colors.backgroundWhite};
  border-radius: 12px;
  box-shadow: ${Colors.boxShadow};
  width: 100%;
  max-width: 300px;
  position: relative;
  cursor: pointer;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 152px;
    height: 220px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: 220px;
  display: block;
  border-radius: 12px;

  @media (max-width: 768px) {
    max-width: 152px;
    height: 126px;
  }
`;

const CardContent = styled.div`
  margin: 10px 13px;
  text-align: left;
`;

const LaundryName = styled.p`
  font-size: ${Typography.p.xlarge.fontSize};
  line-height: ${Typography.p.xlarge.lineHeight};
  font-weight: ${Typography.p.medium.fontWeight};
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: ${Typography.p.medium.fontSize};
    line-height: ${Typography.p.medium.lineHeight};
  }
`;

const Description = styled.p`
  color: ${Colors.textMutedBlack};
  font-size: ${Typography.p.smallCardTime.fontSize};
  line-height: ${Typography.p.smallCardTime.lineHeight};
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: ${Typography.p.xsmallCardLocation.fontSize};
    line-height: ${Typography.p.xsmallCardLocation.lineHeight};
  }
`;

const Distance = styled.p`
  color: ${Colors.textMutedBlackStrong};
  font-size: ${Typography.p.medium.fontSize};
  line-height: ${Typography.p.medium.lineHeight};
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: ${Typography.p.smallFooter.fontSize};
    line-height: ${Typography.p.smallFooter.lineHeight};
  }
`;

const LocationInfo = styled.p`
  color: ${Colors.textLightGrey};
  font-size: ${Typography.p.smallCardTime.fontSize};
  line-height: ${Typography.p.smallCardTime.lineHeight};
  margin-top: 5px;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 5px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 9.5px;
  opacity: 1;
  background: linear-gradient(
    100.77deg,
    rgba(255, 255, 255, 0.64) 0%,
    rgba(255, 255, 255, 0.26) 100%
  );
  backdrop-filter: blur(8px);
  font-size: ${Typography.p.medium.fontSize};
  line-height: ${Typography.p.xsmallCardLocation.lineHeight};

  @media (max-width: 768px) {
    font-size: ${Typography.p.xsmallCardLocation.fontSize};
  }
`;

const LocationIcon = styled.img`
  width: 10px;
  height: auto;
  margin-right: 5px;
`;

const StarIcon = styled.img`
  width: 12px;
  height: auto;
`;

const VerticalCard = ({
  picture,
  name,
  description,
  numRatings,
  sumRatings,
  locationDetail,
  locationCity,
  onClick,
}) => {
  const calculateRating = (sum, count) => {
    console.log("Calcula a avaliação:", sum, count); // Verifica os valores de sum e count
    return count && parseInt(count) > 0
      ? (parseFloat(sum) / parseInt(count)).toFixed(1) // Arredonda para uma casa decimal
      : "N/A";
  };

  return (
    <Card onClick={onClick}>
      {" "}
      <CardImage src={picture} alt={name} />
      <CardContent>
        <LaundryName>{name}</LaundryName>
        {description && <Description>{description}</Description>}
        <LocationInfo>
          <LocationIcon src="/icon/maps.svg" alt="Location" />
          {locationDetail}, {locationCity}
        </LocationInfo>
        <RatingBadge>
          <StarIcon src="/icon/star.svg" alt="Rating Star" />
          {calculateRating(sumRatings, numRatings)}
        </RatingBadge>
        <Distance></Distance>
      </CardContent>
    </Card>
  );
};

// Validação com PropTypes
VerticalCard.propTypes = {
  laundryID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  description: PropTypes.string,
  numRatings: PropTypes.string,
  sumRatings: PropTypes.string,
  locationDetail: PropTypes.string.isRequired,
  locationCity: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default VerticalCard;
