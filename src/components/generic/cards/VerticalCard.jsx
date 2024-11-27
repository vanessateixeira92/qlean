import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Location from "../Location";
import Typography from "../Typography";
import Colors from "../Colors";

const Card = styled.div`
  background: ${Colors.backgroundWhite};
  border-radius: 12px;
  box-shadow: ${Colors.boxShadow};
  width: 100%;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  display: block;
  border-radius: 12px;
`;

const CardTitle = styled.div`
  margin: 10px 13px;
  text-align: left;
`;

const Title = styled.p`
  font-size: ${Typography.p.xlarge.fontSize};
  line-height: ${Typography.p.xlarge.lineHeight};
  font-weight: ${Typography.p.medium.fontWeight};
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: ${Typography.p.medium.fontSize};
    line-height: ${Typography.p.medium.lineHeight};
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

const StarIcon = styled.img`
  width: 12px;
  height: auto;
`;

const VerticalCard = ({ image, title, rating, distance }) => {
  return (
    <Card>
      <CardImage src={image} alt={title} />
      <CardTitle>
        <Title>{title}</Title>
        <Location
          fontSize="10px"
          fontWeight="400"
          lineHeight="12.6px"
          color=" rgba(118, 118, 118, 1)"
        />
        <RatingBadge>
          <StarIcon src="/icon/star.svg" alt="Rating Star" />
          {rating}
        </RatingBadge>
        <Distance>{distance}</Distance>
      </CardTitle>
    </Card>
  );
};

// Define PropTypes
VerticalCard.propTypes = {
  image: PropTypes.string.isRequired, // Validate as a required string
  title: PropTypes.string.isRequired, // Validate as a required string
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Validate as required string or number
  distance: PropTypes.string.isRequired, // Validate as a required string
};

export default VerticalCard;
