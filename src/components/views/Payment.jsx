import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Typography from "../generic/Typography.jsx";
import Colors from "../generic/Colors.jsx";
import ReturnButton from "../generic/ReturnButton.jsx";
import Button from "../generic/Buttons.jsx";
import PhoneInput from "../forms/PhoneInput.jsx";
import CardPayment from "../generic/cards/CardPayment.jsx";

const PaymentContainer = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const WashFoldContent = styled.div`
  padding: 10px 20px;
`;

const TitleContainer = styled.div``;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  font-size: ${Typography.h1.small.fontSize};
  color: ${Colors.textPrimary};
  font-weight: ${Typography.h1.small.fontWeight};
`;

// Image and Card Section
const LaundryImgContent = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
  margin-bottom: 20px;
`;

const LaundryImg = styled.img`
  width: 800px;
  height: auto;
  display: block;
  border-radius: 18px;
  margin: 0 auto;
  box-shadow: 0px 12px 15px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

// About Section
const AboutContent = styled.div`
  padding: 5px 24px 100px 24px;
  margin: 0;
`;

const AboutTitle = styled.h2`
  font-size: ${Typography.h2.medium.fontSize};
  font-family: ${Typography.fontFamilyAlata};
  font-weight: ${Typography.h2.small.fontWeight};
  color: ${Colors.textPrimary};
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const AboutInfo = styled.p`
  font-size: ${Typography.p.smallFooter.fontSize};
  font-family: ${Typography.fontFamilyAlata};
  color: ${Colors.textMutedBlack};
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const RatingBadge = styled.div`
  display: flex;
  gap: 5px;
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

// Status Section
const StatusContainer = styled.div`
  font-size: ${Typography.p.medium.fontSize};
  color: ${Colors.textPrimary};
  margin-top: 15px;
  text-align: center;
  width: 100%;
`;

const TitleStatus = styled.h1`
  font-size: ${Typography.h2.medium.fontSize};
  font-family: ${Typography.fontFamilyAlata};
  font-weight: ${Typography.h2.small.fontWeight};
  color: ${Colors.textPrimary};
  text-align: left;
  margin-left: 550px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

const StatusContent = styled.div`
  display: flex;
  width: 100%;
  margin-left: 15px;
  margin-right: 15px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const StatusImg = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  background-color: ${Colors.backgroundBlueViolet};
  padding: 12px;
  border-radius: 6px;
`;

const InfoWasher = styled.p`
  font-size: 7px;
  color: rgba(120, 120, 120, 1);
`;

const StatusMessage = styled.p`
  font-size: 18px;
  color: ${Colors.textPrimary};
  text-align: left;
  margin-bottom: 10px;
`;

const StatusTiming = styled.p`
  color: ${Colors.textBlueViolet};
  font-size: 18px;
  margin-left: 20px;
  margin-bottom: 35px;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  align-items: center;

  span {
    font-size: 43px;
    cursor: pointer;
    margin: 0 5px;
    color: ${Colors.textMutedBlack};
  }

  span.selected {
    color: gold;
  }
`;

const Payment = () => {
  const location = useLocation();
  console.log("Location State:", location.state);
  // Acessa os dados passados por 'state' via 'navigate' em WasherFold
  const { laundryData, machineData, selectedMachineId } = location.state || {};
  console.log("laundryData", laundryData);
  console.log("machineData", machineData);
  console.log("Selected Machine ID in Payment:", selectedMachineId);

  const [laundryInfo, setLaundryInfo] = useState(laundryData); // Armazena os dados da lavanderia
  const [machineDataState, setMachineData] = useState(machineData); // Armazena os dados da máquina
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("payment"); // Estados: payment, paymentDone, machineAvailable, programRunning, review
  const [timer, setTimer] = useState(0); // Contagem regressiva
  const [rating, setRating] = useState(0); // Avaliação por estrelas
  const [countdown, setCountdown] = useState(5); // Contagem regressiva para iniciar (5 segundos)
  const [phone, setPhone] = useState("");

  // Simula o redirecionamento para o MBWAY
  const handleMBWAYClick = () => {
    setStatus("paymentDone");
    setTimeout(() => setStatus("machineAvailable"), 3000); // Simula o tempo de espera até a máquina ficar disponível
  };

  const startProgram = () => {
    setStatus("programRunning");
    setTimer(10); // Configura o cronômetro para 10 segundos (teste)
  };

  const finishProgram = () => {
    setStatus("review");
  };

  const giveRating = (star) => {
    setRating(star);
  };

  // Efeitos
  const machineId =
    selectedMachineId || (machineDataState ? machineDataState.machineID : null);
  console.log("Machine ID:", machineId);

  useEffect(() => {
    if (!selectedMachineId) {
      console.log("Machine ID não encontrado.");
      setIsLoading(false);
      return; // Evita continuar a execução sem o selectedMachineId
    }
    console.log(machineData);
    // Se o selectedMachineId estiver disponível, faz a busca pelos dados
    const selectedMachine = machineData.find(
      (machine) => machine.machineID === selectedMachineId
    );

    if (selectedMachine) {
      setMachineData(selectedMachine); // Atualiza os dados da máquina
      console.log("Máquina selecionada:", selectedMachine);
    } else {
      console.log("Máquina com ID não encontrada.");
    }
    const fetchMachineData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_GET_MACHINES_API_URL}${machineId}`
        );
        console.log("API Response:", response.data);
        setLaundryInfo(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados da máquina:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMachineData();
    console.log("MachineData recebido:", machineData);
  }, [selectedMachineId, machineData, machineId]);

  // Lógica para a contagem regressiva e cronômetro
  useEffect(() => {
    if (status === "machineAvailable" && countdown > 0) {
      const timeout = setTimeout(() => {
        setCountdown((prev) => prev - 1); // Diminui a contagem regressiva a cada segundo
      }, 1000); // Decrementa a cada segundo
      return () => clearTimeout(timeout);
    }

    if (status === "machineAvailable" && countdown === 0) {
      // Quando a contagem chega a zero, inicia o programa
      startProgram();
    }

    if (status === "programRunning" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000); // Decrementa 1 segundo a cada 1000ms
      return () => clearInterval(interval);
    }

    // Quando o cronômetro chega a 0, transita para o próximo estado
    if (status === "programRunning" && timer === 0) {
      setStatus("done"); // Altera para o status "done" antes de exibir o botão Done
    }
  }, [status, countdown, timer]);

  // Formatar o tempo para "MM:SS" formato
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!laundryInfo || !machineDataState) {
    return <div>Erro ao carregar os dados da máquina.</div>;
  }

  return (
    <PaymentContainer>
      <WashFoldContent>
        <ReturnButton to="/washfold" />
        <TitleContainer>
          <Title>{laundryInfo.name || "Unknown Laundry"}</Title>
          <LaundryImgContent>
            <LaundryImg
              src={laundryInfo.picture || "/placeholder.png"}
              alt={laundryInfo.name || "Laundry"}
            />
            <CardPayment
              key={machineDataState.machineID}
              laundryID={machineDataState.laundryID}
              machineID={machineDataState.machineID}
              name={laundryInfo.name || "Unknown Laundry"}
              machineType={machineDataState.machineType || "Unknown Type"}
              programPrice={machineDataState.programPrice || "0.00"}
              machineCapacity={
                machineDataState.machineCapacity || "Unknown Capacity"
              }
              machineUnits={machineDataState.machineUnits || "kg"}
              programTime={machineDataState.programTime || "0"}
            />
          </LaundryImgContent>
        </TitleContainer>

        {/* Renderização condicional para status */}

        {status === "payment" && (
          <StatusContainer>
            <PhoneInput
              defaultCountry="PT"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </StatusContainer>
        )}

        {status === "payment" && (
          <StatusContainer>
            <ButtonContainer>
              <Button
                text="Use now with "
                variant="mbway"
                onClick={handleMBWAYClick}
              />
            </ButtonContainer>
          </StatusContainer>
        )}

        {status === "paymentDone" && (
          <StatusContainer>
            <TitleStatus>Status</TitleStatus>
            <StatusContent>
              <StatusImg>
                <Img src="/icon/status.svg" alt="Status" />
                <InfoWasher>Washing</InfoWasher>
              </StatusImg>
              <StatusMessage>
                Payment Done!
                <br /> Waiting for Machine
              </StatusMessage>
            </StatusContent>
          </StatusContainer>
        )}

        {status === "machineAvailable" && (
          <StatusContainer>
            <TitleStatus>Status</TitleStatus>
            <StatusContent>
              <StatusImg>
                <Img src="/icon/status.svg" alt="Status" />
                <InfoWasher>Washing</InfoWasher>
              </StatusImg>
              <StatusMessage>
                Machine 2
                <br /> Start your program
              </StatusMessage>
              <StatusTiming>{formatTime(countdown)}</StatusTiming>
            </StatusContent>
          </StatusContainer>
        )}

        {status === "programRunning" && (
          <StatusContainer>
            <TitleStatus>Status</TitleStatus>
            <StatusContent>
              <StatusImg>
                <Img src="/icon/status.svg" alt="Status" />
                <InfoWasher>Washing</InfoWasher>
              </StatusImg>
              <StatusMessage>
                Machine 2 <br />
                {timer > 0
                  ? `${formatTime(timer)} Minutes Remaining`
                  : "Time's Up"}
              </StatusMessage>
            </StatusContent>
          </StatusContainer>
        )}

        {status === "done" && (
          <StatusContainer>
            <TitleStatus>Status</TitleStatus>
            <ButtonContainer>
              <Button text="Done" variant="done" onClick={finishProgram} />
            </ButtonContainer>
          </StatusContainer>
        )}

        {status === "review" && (
          <StatusContainer>
            <TitleStatus>Reviews</TitleStatus>

            <StarsContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={rating >= star ? "selected" : ""}
                  onClick={() => giveRating(star)}
                >
                  ★
                </span>
              ))}
            </StarsContainer>
          </StatusContainer>
        )}
      </WashFoldContent>

      <AboutContent>
        <AboutTitle>About Us</AboutTitle>
        <RatingBadge>
          <img src="/icon/star.svg" alt="Rating Badge" />
          <strong>
            {" "}
            {(laundryInfo.sumRatings / laundryInfo.numRatings || 0).toFixed(1)}
          </strong>
          ({laundryInfo.numRatings || 0} Reviews)
        </RatingBadge>
        <AboutInfo>
          We have redefined Laundry and Dry cleaning services. We are among the
          top Online Dry cleaners in Thane, Navi Mumbai, Mulund & Bhandup. We
          use advanced technology for Laundry and Dry cleaning to enhance and
          maintain beauty of your garments. Finally we are delivering you
          unforgettable.{" "}
        </AboutInfo>
      </AboutContent>
    </PaymentContainer>
  );
};

export default Payment;
