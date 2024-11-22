import React, { useState } from "react";
import styled from "styled-components";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";
import Colors from "../generic/Colors";

const FieldContainer = styled.div`
  width: 335px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: none;
  border-bottom: 1px solid ${Colors.textGrey};
  font-size: 15px;
  font-weight: 500;
  color: ${Colors.textPrimary};
  outline: none;
  background-color: transparent;

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }

  &:focus {
    border-bottom: 1px solid ${Colors.textPrimary};
  }
`;

const IconToggle = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: ${Colors.textGrey};
`;

const PasswordInput = ({ placeholder, value, onChange }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <FieldContainer>
      <InputLabel>
        <span style={{ position: "absolute", left: "10px" }}>
          <FaLock color={Colors.textGrey} />
        </span>
        <StyledInput
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <IconToggle onClick={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <FaEye color={Colors.textGrey} />
          ) : (
            <FaEyeSlash color={Colors.textGrey} />
          )}
        </IconToggle>
      </InputLabel>
    </FieldContainer>
  );
};

PasswordInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordInput;
