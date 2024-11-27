import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Estilo do botão
const BackButton = styled.button`
  border: 1px solid rgba(228, 228, 228, 1);
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const ReturnButton = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <BackButton onClick={handleClick}>
      <svg
        width="19"
        height="16"
        viewBox="0 0 19 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Return"
      >
        <path
          d="M8.47712 0.234613C8.55072 0.308906 8.60911 0.397133 8.64895 0.494245C8.68879 0.591357 8.70929 0.69545 8.70929 0.800576C8.70929 0.9057 8.68879 1.0098 8.64895 1.10691C8.60911 1.20402 8.55072 1.29224 8.47712 1.36654L2.70309 7.20015L18.2084 7.20015C18.4183 7.20015 18.6197 7.28442 18.7681 7.43444C18.9166 7.58446 19 7.78793 19 8.00009C19 8.21225 18.9166 8.41572 18.7681 8.56574C18.6197 8.71576 18.4183 8.80004 18.2084 8.80004L2.70309 8.80004L8.47712 14.6336C8.62566 14.7837 8.70911 14.9873 8.70911 15.1996C8.70911 15.4119 8.62566 15.6155 8.47712 15.7656C8.32857 15.9157 8.1271 16 7.91703 16C7.70696 16 7.50549 15.9157 7.35694 15.7656L0.232177 8.56606C0.158573 8.49176 0.100183 8.40354 0.060344 8.30642C0.0205053 8.20931 -3.45092e-07 8.10522 -3.49687e-07 8.00009C-3.54282e-07 7.89497 0.0205052 7.79087 0.060344 7.69376C0.100183 7.59665 0.158573 7.50842 0.232177 7.43413L7.35694 0.234613C7.43047 0.160237 7.51777 0.101233 7.61388 0.0609766C7.70998 0.0207201 7.813 6.12157e-07 7.91703 6.0761e-07C8.02106 6.03062e-07 8.12408 0.0207201 8.22018 0.0609766C8.31628 0.101233 8.40359 0.160237 8.47712 0.234613Z"
          fill="black"
        />
      </svg>
    </BackButton>
  );
};
ReturnButton.propTypes = {
  to: PropTypes.string.isRequired,
};
export default ReturnButton;
