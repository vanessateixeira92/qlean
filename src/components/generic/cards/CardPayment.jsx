import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Colors from "../Colors";
import Typography from "../Typography";

const CardOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  max-width: 780px;
  padding: 35px 45px;
  border-radius: 15px;
  background: linear-gradient(
    100.77deg,
    rgba(255, 255, 255, 0.87) 0%,
    rgba(255, 255, 255, 0.34) 100%
  );
  backdrop-filter: blur(3px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* Proteger o texto do blur */
  & > * {
    position: relative;
    z-index: 1;
  }
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 23px 15px;
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const WasherContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  font-family: ${Typography.fontFamilyAlata};
`;

const WasherContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0;
  font-family: ${Typography.fontFamilyAlata};
`;

const CardName = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.textPrimary};
  margin-bottom: 25px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const CardWeight = styled.p`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 400;
`;

const CardPrice = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: ${Colors.textPrimary};
  margin-bottom: 25px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const CardTime = styled.p`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 400;
`;

const CardPayment = ({
  name,
  machineType,
  programPrice,
  machineCapacity,
  machineUnits,
  programTime,
}) => {
  return (
    <CardOverlay>
      <CardContent>
        <WasherContentLeft>
          <CardName>{name}</CardName>
          <CardWeight>
            <strong>
              {machineCapacity
                ? `${machineCapacity} ${machineUnits}`
                : "Unknown Capacity"}
            </strong>{" "}
            {machineType || "Unknown Type"}
          </CardWeight>
        </WasherContentLeft>
        <WasherContentRight>
          <CardPrice>{programPrice}€</CardPrice>
          <CardTime>{programTime} min.</CardTime>
        </WasherContentRight>
      </CardContent>
    </CardOverlay>
  );
};

// Validação com PropTypes
CardPayment.propTypes = {
  name: PropTypes.string.isRequired,
  machineType: PropTypes.string.isRequired,
  programPrice: PropTypes.string.isRequired,
  machineCapacity: PropTypes.string.isRequired,
  machineUnits: PropTypes.string.isRequired,
  programTime: PropTypes.string.isRequired,
};

export default CardPayment;
