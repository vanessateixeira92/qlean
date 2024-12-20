import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Location from "../Location";
import Typography from "../Typography";
import Colors from "../Colors";

// Estilo do Card Horizontal
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
    height: 52px;
  }
`;

const HorizontalCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HorizontalCardTitle = styled.p`
  margin-bottom: 5px;
  font-size: ${Typography.p.xlarge.fontSize};
  line-height: ${Typography.p.xlarge.lineHeight};
  font-weight: ${Typography.p.large.fontWeight};
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: ${Typography.p.medium.fontSize};
    line-height: ${Typography.p.medium.lineHeight};
  }
`;

const HorizontalRatingBadge = styled.div`
  width: 36px;
  height: 19px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  border-radius: 9.5px;
  padding: 5px 7px;
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

const HorizontalCards = ({ image, title, rating }) => {
  return (
    <FlexContainer>
      <HorizontalCardImage src={image} alt={title} />
      <HorizontalCardContent>
        <HorizontalCardTitle>{title}</HorizontalCardTitle>

        <Location
          fontSize="10px"
          fontWeight="400"
          lineHeight="12.6px"
          color=" rgba(118, 118, 118, 1)"
        />
      </HorizontalCardContent>
      <HorizontalRatingBadge>
        <StarIcon src="/icon/star.svg" alt="Rating Star" />
        {rating}
      </HorizontalRatingBadge>
    </FlexContainer>
  );
};

// Validação com PropTypes
HorizontalCards.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default HorizontalCards;
