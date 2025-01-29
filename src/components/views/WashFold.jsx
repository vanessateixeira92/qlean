import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Typography from "../generic/Typography.jsx";
import Colors from "../generic/Colors.jsx";
import ReturnButton from "../generic/ReturnButton.jsx";
import CardWasher from "../generic/cards/CardWasher.jsx";

const WashFoldContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  overflow-y: auto;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const WashFoldContent = styled.div`
  padding: 10px 20px;
`;

// Estilos do cabeçalho com o nome de boas-vindas
const TitleContainer = styled.div``;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  font-size: ${Typography.h1.small.fontSize};
  color: ${Colors.textPrimary};
  font-weight: ${Typography.h1.small.fontWeight};
`;

const Laundry = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  justify-content: center;

  /* Media Query (mobile) */
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const LocationWrapper = styled.div`
  text-align: center;
  font-size: ${Typography.p.smallLocation.fontSize};
  color: ${Colors.textPrimary};
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 9.5px;
  padding: 16px;
  max-width: 200px;
`;

const RatingBadge = styled.div`
  display: flex;
  gap: 5px;
  border-radius: 9.5px;
  border: 1px solid rgba(228, 228, 228, 1);
  padding: 16px;
  background: linear-gradient(
    100.77deg,
    rgba(255, 255, 255, 0.64) 0%,
    rgba(255, 255, 255, 0.26) 100%
  );
  backdrop-filter: blur(8px);
  font-size: ${Typography.p.xsmallCardLocation.fontSize};
  color: ${Colors.textLightGrey};
  max-width: 200px;
`;

const LaundryImg = styled.img`
  width: 800px;
  height: auto;
  display: block;
  border-radius: 18px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

// Cards
const FlexContent = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: ${Colors.backgroundWhite};
  box-sizing: border-box;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// About Section
const AboutContent = styled.div`
  background: ${Colors.backgroundBlueViolet};
  font-family: ${Typography.fontFamilyOutfit};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 5px 24px 100px 24px;
  color: ${Colors.textWhite};
  margin: 0;
`;

const AboutTitle = styled.h2`
  font-size: ${Typography.h2.medium.fontSize};
  font-weight: ${Typography.h2.medium.fontWeight};
  margin-bottom: 10px;
  margin-top: 20px;
`;

const AboutInfo = styled.p`
  font-size: ${Typography.p.medium.fontSize};

  /* Media Query (mobile) */
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const WashFold = () => {
  const [searchParams] = useSearchParams();
  const laundryId = searchParams.get("laundry");
  console.log("Laundry ID from useParams: ", laundryId);
  const [laundryInfo, setLaundryInfo] = useState(null);
  const [machineDataState, setMachineData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para erros

  // Fazer a requisição à API para buscar os dados da lavandaria com esse ID
  useEffect(() => {
    const fetchLaundryInfo = async () => {
      try {
        if (!laundryId) {
          console.error("ID da lavanderia não fornecido.");
          navigate("/laundryresults"); // Redirecionar caso o ID não esteja presente
          return;
        }

        setLoading(true); // Inicia carregamento
        setError(null);

        // Fetch da lavanderia
        const laundryResponse = await fetch(
          `${process.env.REACT_APP_GET_LAUNDRIES_API_URL}`
        );

        console.log("Laundry ID:", laundryId);

        const laundryResult = await laundryResponse.json();

        console.log("Laundry Response:", laundryResult);
        if (laundryResponse.ok && laundryResult.data.length > 0) {
          setLaundryInfo(laundryResult.data[0]); // Atualiza os dados da lavanderia
          console.log(
            "Dados da lavanderia armazenados no estado:",
            laundryResult.data[0]
          );
        } else {
          setError("Erro ao carregar os dados da lavanderia.");
        }

        // Fetch das máquinas
        const machineResponse = await fetch(
          `${process.env.REACT_APP_GET_MACHINES_API_URL}`
        );

        const machineResult = await machineResponse.json();

        console.log(
          "Machine Response JSON:",
          JSON.stringify(machineResult, null, 2)
        );

        if (machineResponse.ok && machineResult.data.length > 0) {
          setMachineData(
            machineResult.data.sort((a, b) => a.machineID - b.machineID)
          ); // Ordena por ID
          console.log("Máquinas carregadas:", machineResult.data);
        } else {
          throw new Error("Erro ao carregar os dados das máquinas.");
        }
      } catch (error) {
        setError("Erro ao ir buscar os dados da lavanderia.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchLaundryInfo();
  }, [navigate, laundryId]);

  if (loading) {
    return <div>Loading...</div>; // Indicador de carregamento
  }

  if (error) {
    return <div>{error}</div>; // Mensagem de erro
  }

  if (!laundryInfo) {
    return <div>Dados da lavanderia não encontrados.</div>; // Caso não tenha dados
  }

  const handleCheckOut = (laundryData, machineData, selectedMachineId) => {
    console.log("laundryData:", laundryData);
    console.log("machineData:", machineData);
    console.log("Selected Machine ID antes de navegar:", selectedMachineId);
    navigate("/payment", {
      state: {
        laundryData: laundryData,
        machineData: machineData,
        selectedMachineId: selectedMachineId.machineID,
      },
    });
  };

  return (
    <WashFoldContainer>
      <WashFoldContent>
        <ReturnButton to="/laundryresults" />
        <TitleContainer>
          <Title>{laundryInfo.name || "Unknown Laundry"}</Title>
          <Laundry key={laundryInfo.laundryID}>
            <LocationWrapper>
              {laundryInfo.locationDetail || "No details"},{" "}
              {laundryInfo.locationCity || "No city"}
            </LocationWrapper>
            <RatingBadge>
              <img src="/icon/star.svg" alt="Rating Badge" />
              <strong>
                {" "}
                {(laundryInfo.sumRatings / laundryInfo.numRatings || 0).toFixed(
                  1
                )}
              </strong>
              ({laundryInfo.numRatings || 0} Reviews)
            </RatingBadge>
          </Laundry>
          <LaundryImg
            src={laundryInfo.picture || "/placeholder.png"}
            alt={laundryInfo.name || "Laundry"}
          ></LaundryImg>
        </TitleContainer>
        <FlexContent>
          {machineDataState.length > 0 ? (
            machineDataState.map((machineDataState) => (
              <CardWasher
                key={machineDataState.machineID}
                laundryID={machineDataState.laundryID}
                machineID={machineDataState.machineID}
                machineCapacity={machineDataState.machineCapacity}
                machineUnits={machineDataState.machineUnits}
                programTime={machineDataState.programTime}
                programPrice={machineDataState.programPrice}
                machineType={machineDataState.machineType}
                isAvailable={
                  machineDataState.isAvailable ? "Available" : "Busy"
                }
                onClick={() =>
                  handleCheckOut(
                    laundryInfo,
                    machineDataState,
                    machineDataState.machineID
                  )
                }
              />
            ))
          ) : (
            <div>No machines available</div> // Mensagem caso não haja máquinas
          )}
        </FlexContent>
      </WashFoldContent>
      <AboutContent>
        <AboutTitle>About Wash & Fold</AboutTitle>
        <AboutInfo>
          We have redefined Laundry and Dry cleaning services. We are among the
          top Online Dry cleaners in Thane, Navi Mumbai, Mulund & Bhandup. We
          use advanced technology for Laundry and Dry cleaning to enhance and
          maintain beauty of your garments. Finally we are delivering you
          unforgettable.{" "}
        </AboutInfo>
      </AboutContent>
    </WashFoldContainer>
  );
};

export default WashFold;
