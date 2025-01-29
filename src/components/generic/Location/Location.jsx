import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import Colors from "../Colors";
import Typography from "../Typography";

// Styled Components
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: ${Colors.errorRed};
  font-size: ${Typography.p.large.fontSize};
  font-weight: ${Typography.p.large.fontWeight};
  line-height: ${Typography.p.large.lineHeight};
`;

const LoadingMessage = styled.p`
  color: ${Colors.textLightGrey};
  font-size: ${Typography.p.medium.fontSize};
  font-weight: ${Typography.p.medium.fontWeight};
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const Icon = styled.span`
  font-size: 20px;
  color: ${Colors.backgroundBlueViolet};
  font-family: "Material Icons";
`;

const AddressText = styled.p`
  margin: 0;
  font-size: ${Typography.p.large.fontSize};
  font-weight: ${Typography.p.large.fontWeight};
  line-height: ${Typography.p.large.lineHeight};
  color: ${Colors.textPrimary};
`;

const buildApiUrl = (latitude, longitude, apiKey) =>
  `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    `${latitude},${longitude}`
  )}&key=${apiKey}&pretty=1&no_annotations=1`;

const Location = () => {
  const [location, setLocation] = useState(null); // Coordenadas
  const [error, setError] = useState(null); // Mensagem de erro
  const [address, setAddress] = useState(""); // Endereço incompleto
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleGeolocationSuccess = useCallback(
    async (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      const requestUrl = buildApiUrl(latitude, longitude, apiKey);

      try {
        const response = await axios.get(requestUrl);
        if (response.data.results && response.data.results.length > 0) {
          const components = response.data.results[0].components;
          const city =
            components.city || components.town || components.village || "";
          const county = components.county || "";

          setAddress(`${city}, ${county}`.trim());
        } else {
          setError("Address not found.");
        }
      } catch (err) {
        console.error("API request failed:", err);
        setError(
          `Error fetching location: ${
            err.response?.data?.message || err.message
          }`
        );
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  const handleGeolocationError = (err) => {
    setLoading(false);
    switch (err.code) {
      case err.PERMISSION_DENIED:
        setError("User denied access to location.");
        break;
      case err.POSITION_UNAVAILABLE:
        setError("Geographic position is unavailable.");
        break;
      case err.TIMEOUT:
        setError("Location request timed out.");
        break;
      default:
        setError("Unknown error while fetching location.");
        break;
    }
  };

  useEffect(() => {
    if (!apiKey) {
      setError("API Key is missing.");
      return;
    }

    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, [apiKey, handleGeolocationSuccess]);

  return (
    <LocationWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && !error && <LoadingMessage>Loading...</LoadingMessage>}
      {!loading && location && !error && (
        <AddressWrapper>
          <IconWrapper>
            <Icon>location_on</Icon>
          </IconWrapper>
          <AddressText>{address || "Address not found."}</AddressText>
        </AddressWrapper>
      )}
    </LocationWrapper>
  );
};

export default Location;
