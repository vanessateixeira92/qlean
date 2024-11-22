import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Colors from "./Colors";
import Typography from "./Typography";

// Styled Components
const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: ${Colors.textLightGrey};
  font-size: ${Typography.p.large.fontSize};
  font-weight: ${Typography.p.large.fontWeight};
  line-height: ${Typography.p.large.lineHeight};
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

// React Component
const Location = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");

  const apiKey = "b60de5b899034ae1971e9536c77af832";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          const query = `${latitude},${longitude}`;
          const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            query
          )}&key=${apiKey}&pretty=1&no_annotations=1`;

          try {
            const response = await axios.get(requestUrl);
            if (response.data.results && response.data.results.length > 0) {
              const components = response.data.results[0].components;
              let city =
                components.city || components.town || components.village || "";
              let county = components.county || "";

              setAddress(`${city}, ${county}`.trim());
            } else {
              setError("Address not found.");
            }
          } catch (error) {
            setError(`Error fetching location: ${error.message}`);
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied access to location.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Geographic position is unavailable.");
              break;
            case error.TIMEOUT:
              setError("Location request timed out.");
              break;
            default:
              setError("Unknown error while fetching location.");
              break;
          }
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <LocationWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {location && !error && (
        <AddressWrapper>
          <IconWrapper>
            <Icon>location_on</Icon>
          </IconWrapper>
          <AddressText>{address || "Searching for the address..."}</AddressText>
        </AddressWrapper>
      )}
    </LocationWrapper>
  );
};

export default Location;
