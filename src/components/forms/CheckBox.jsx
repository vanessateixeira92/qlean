import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../generic/Colors";
import Typography from "../generic/Typography";

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 335px;
  margin-top: 10px;
  color: ${Colors.backgroundWhite};
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
  width: 16px;
  height: 16px;
  accent-color: ${Colors.backgroundPrimary};
`;

const CheckboxLabel = styled.label`
  font-size: ${Typography.p.smallFooter.fontSize};
  font-weight: 300;
  line-height: ${Typography.p.smallFooter.lineHeight};
  color: ${Colors.textGrey};
`;

const Checkbox = ({ label, checked, onChange }) => (
  <CheckboxContainer>
    <StyledCheckbox checked={checked} onChange={onChange} />
    <CheckboxLabel>{label}</CheckboxLabel>
  </CheckboxContainer>
);

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
