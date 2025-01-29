import axios from "axios";

const API_KEY = process.env.REACT_APP_DISTANCE_API_KEY;
const BASE_URL = "https://api.openrouteservice.org/v2/matrix/driving-car"; // URL para cálculo de distâncias

export const getDistance = async (userCoords, laundryCoords) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        locations: [userCoords, laundryCoords], // Coordenadas: [long, lat]
        metrics: ["distance"], // Retorna apenas a distância
      },
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    // A distância retornada está em metros
    const distanceInMeters = response.data.distances[0][1];
    return (distanceInMeters / 1000).toFixed(2); // Converte para km e arredonda
  } catch (error) {
    console.error("Erro ao calcular distância:", error);
    throw new Error("Não foi possível calcular a distância.");
  }
};
