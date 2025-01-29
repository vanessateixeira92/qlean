import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "../Typography";
import Colors from "../Colors";

const FlexContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.backgroundWhite};
  border-radius: 15px;
  border: 1px solid rgba(131, 80, 219, 1);
  padding: 10px 20px;
  margin: 10px 0;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px;
  }
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

const BaseButton = styled.button`
  border: none;
  font-size: ${Typography.h2.large.fontSize};
  border-radius: 6px;
  color: ${Colors.textWhite};
  padding: 20px 30px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 150px;
  min-width: 150px;

  @media (max-width: 768px) {
    padding: 15px 20px;
    margin: 0;
    font-size: ${Typography.h2.medium.fontSize};
    width: 120px;
    min-width: 120px;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

// Estilo para o botão ShoppingCart
const ShoppingCart = styled(BaseButton)`
  background: ${Colors.backgroundAquaVibrant};
  justify-content: center;
`;

// Estilo para o botão BusyMachine (ocupado)
const BusyMachine = styled(BaseButton)`
  background: ${Colors.backgroundRed};
  img {
    display: none;
  }
`;

const CardWasher = ({
  machineType,
  programPrice,
  machineCapacity,
  machineID,
  machineUnits,
  programTime,
  isAvailable,
  onClick,
}) => {
  return (
    <FlexContainer>
      <CardContent>
        <Washer>{machineID}</Washer>
        <WasherContent>
          <Weight>
            <strong>
              {machineCapacity
                ? `${machineCapacity} ${machineUnits}`
                : "Unknown Capacity"}
            </strong>{" "}
            {machineType || "Unknown Type"}
          </Weight>
          <Time>{programTime} min.</Time>
        </WasherContent>
        {isAvailable === true || isAvailable === "Available" ? (
          <ShoppingCart onClick={onClick}>
            {`€${programPrice}`}{" "}
            <img
              src="/icon/shopper.svg"
              alt="Shopping Cart Icon"
              width="20"
              height="20"
            />
          </ShoppingCart>
        ) : (
          <BusyMachine disabled>Busy</BusyMachine>
        )}
      </CardContent>
    </FlexContainer>
  );
};

// Validação com PropTypes
CardWasher.propTypes = {
  machineType: PropTypes.string.isRequired,
  programPrice: PropTypes.string.isRequired,
  machineCapacity: PropTypes.string.isRequired,
  machineID: PropTypes.string.isRequired,
  machineUnits: PropTypes.string.isRequired,
  programTime: PropTypes.string.isRequired,
  isAvailable: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default CardWasher;
