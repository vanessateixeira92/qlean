import { useState, useEffect } from "react";

export const usePaymentStatus = () => {
  const [status, setStatus] = useState("payment");
  const [timer, setTimer] = useState(0); // Gerenciar cronômetro ou tempo restante
  const [rating, setRating] = useState(0); // Avaliação

  // Transições de status
  const transitions = {
    toPaymentDone: () => setStatus("paymentDone"),
    toMachineAvailable: () => setStatus("machineAvailable"),
    toProgramRunning: () => {
      setStatus("programRunning");
      setTimer(10); // Inicia o cronômetro em 10 segundos para teste
    },
    toReview: () => setStatus("review"),
  };

  // Inicia o cronômetro automaticamente no estado "programRunning"
  useEffect(() => {
    if (status === "programRunning" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => Math.max(prev - 1, 0));
      }, 1000); // Decrementa 1 segundo por vez
      return () => clearInterval(interval);
    }
    // Quando o cronômetro chega a 0, o próximo status é "review"
    if (status === "programRunning" && timer === 0) {
      setStatus("showDoneButton");
    }
  }, [status, timer]);

  // Seleção de estrelas na avaliação
  const setRatingValue = (value) => {
    setRating(value);
  };

  return {
    status,
    timer,
    rating,
    transitions,
    setRatingValue,
  };
};
