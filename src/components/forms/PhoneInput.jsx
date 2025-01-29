import React, { useState } from "react";
import PhoneInputComponent, {
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styled from "styled-components";
import Typography from "../generic/Typography";
import Colors from "../generic/Colors";

const StyledPhoneInput = styled.div`
  font-family: ${Typography.fontFamilyOutfit};
  width: 335px;
  margin: 0 auto;

  .PhoneInputInput {
    border: 1px solid ${Colors.textBlueViolet};
    border-radius: 6px;
    padding: 10px 22px;
    height: 45px;
    width: 100%;
    font-size: 16px;
  }

  .PhoneInputCountry {
    margin-right: 8px;
  }

  .error {
    color: ${Colors.backgroundRed};
    font-size: 14px;
    margin-top: 5px;
  }
`;

const PhoneInput = () => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (value && isValidPhoneNumber(value)) {
      setIsValid(true); // Número válido
    } else {
      setIsValid(false); // Número inválido
    }
  };

  return (
    <StyledPhoneInput>
      <PhoneInputComponent
        id="contact"
        defaultCountry="PT" // País padrão
        placeholder="Enter phone number"
        value={phone}
        onChange={handlePhoneChange}
      />
      {!isValid && phone && <p className="error">Invalid phone number</p>}
    </StyledPhoneInput>
  );
};

export default PhoneInput;
