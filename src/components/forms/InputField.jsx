import React from "react";
import styled from "styled-components";
import { FaUser, FaEnvelope } from "react-icons/fa";
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
`;

const InputField = ({ type, placeholder, icon, value, onChange }) => {
  const iconComponents = {
    user: <FaUser color={Colors.textGrey} />,
    email: <FaEnvelope color={Colors.textGrey} />,
  };

  return (
    <FieldContainer>
      <InputLabel>
        <span style={{ position: "absolute", left: "10px" }}>
          {iconComponents[icon]}
        </span>
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </InputLabel>
    </FieldContainer>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(["user", "email"]).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
