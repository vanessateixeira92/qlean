import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppWrapper = () => {
  useEffect(() => {
    // Calculando a altura da viewport e criando a variável --vh
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Atualiza a variável --vh ao redimensionar a janela (para lidar com mudanças de orientação ou redimensionamento)
    updateVH(); // Atualiza inicialmente ao montar o componente
    window.addEventListener("resize", updateVH);

    // Limpeza do event listener para evitar memory leaks
    return () => {
      window.removeEventListener("resize", updateVH);
    };
  }, []);

  return <App />;
};

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
